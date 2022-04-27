from mywidgets.wafer import wafer_visual
from auto.main_panel import MainResult

from auto.chooseRunRange import RunRange
from auto.advancedRange import  AdvancedRange
from auto.autoResult import autoRes
from auto.phaseCom import Auto
from auto.showStatus import PhaseResultStatus

from auto.autoMannually import AutoMannually, FittingParameter

from scipy.signal import find_peaks

from matplotlib import colors
from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
import threading
import time
import sys

class MainAuto(Frame):
    '''automation panel
    '''
    def __init__(self, master, app = None, autowindow = None, **kw):
        Frame.__init__(self, master, **kw)

        if app is not None:
            self.BAuto = app.BAuto
            self.expData = app.getExpData()
            self.waferPanel = app.waferPanel
            self.dataExpPanel = app.dataExpPanel
            self.dataCalPanel = app.dataCalPanel
            self.phaseComData = app.phaseComData
            # self.result_whole = app.result_whole
        self.autowindow = autowindow

        self.advancedP = AdvancedRange(self, self.expData)
        self.advancedP.addB.pack_forget()

        # self.advancedP.config(text = )
        #override droplist
        self.advancedP.droplist.bind('<<ComboboxSelected>>', self.callback)

        self.fp = FittingParameter(self)# fitting parameter panel
        self.fp.bRun.config(command = self.on_auto)

        #override
        previewB = Button(self, text = 'Preview', command = self.on_preview)
        self.advancedP.grid(row = 0, column = 0, rowspan = 2)
        self.fp.paraP.grid(row = 2, column = 0)
        previewB.grid(row = 3, column = 0)

        self.fp.chooseRange.grid(row = 0, column = 1, sticky = 'n')
        self.fp.bRun.grid(row = 1, column = 1, pady = (10, 10), padx = (10, 10), sticky = 'ne')

        self.compareResult_plot = []# compare results

        self.stop_threads = False
        self.master = master

        self.fitResult = {}# keep all the fitting results
                            # fitResult = {'pos': t},
                            #t = {'filename': CR},
                            #cR= {'per': per, 'expPeaks_x' = expPeaks_x...}


        self.autoCommand = self.BAuto.cget('command')

        self.phasecom = Auto(self.master)
        self.pngImage = {'Match': PhotoImage(file = 'yes.png'), 'Doubt': PhotoImage(file = 'triangle.png'), 'Difficult': PhotoImage(file = 'rectangle.png'), 'Not match': PhotoImage(file = 'no.png')}

    def callback(self, e):
        self.clearCompareResult()
        self.advancedP.selectExp(e)

    def on_preview(self):
        self.clearCompareResult() # remore previous result
        self.phasecompare()

    #clear the result from ax
    def clearCompareResult(self):
        if len(self.compareResult_plot) > 0:
            for v in self.compareResult_plot:
                v.remove()
            self.compareResult_plot = []
            self.advancedP.mycanvas.draw()

    def phasecompare(self):
        #1. gget the selected exp data
        x = self.advancedP.getSelectedData().get_xdata()
        y = self.advancedP.getSelectedData().get_ydata()

        y = self.dataExpPanel.normalization(y)

        #2. calculate its peaks
        peaks,_ = find_peaks(y, height = self.fp.getPara()['minHeight'],
            distance = self.fp.getPara()['xDistance']*len(np.atleast_1d(x))/(max(x) - min(x)),
            width = self.fp.getPara()['width'])


        line, = self.advancedP.getAx().plot(x[peaks], y[peaks], 'x', color = 'orange')
        minHeight = self.advancedP.getAx().hlines(self.fp.getPara()['minHeight'], min(x), max(x), linestyle="dotted", color = 'firebrick', label = f'minHeight')
        self.advancedP.getAx().legend(loc='upper left', ncol=2, fontsize = 'small').set_draggable(True)
        self.advancedP.mycanvas.draw()

        #store plot information
        self.compareResult_plot.append(line)
        self.compareResult_plot.append(minHeight)


    def on_rightClick(self, pos):
        x = self.expData.iloc[:, 0]
        y = self.expData.iloc[:, pos]
        y = self.dataExpPanel.normalization(y)
        autoRes(self.master, self.fitResult.get(pos), x, y, pos)


    def on_abort(self):
        self.stop_threads = True


    def on_auto(self):
        positions = self.fp.getPara()['chooseRange'].sel()
        if len(positions) == 0:
            messagebox.showerror('Error', 'Choose positions!')
        else:
            self.autowindow.withdraw()
            threading.Thread(target=self.plotter).start()


    def plotter(self):
        positions = self.fp.chooseRange.sel()
        # if  'waferOn' in positions:
        #     positions = self.chooseRange.getpressedButtons()


        if len(positions):# change status of auto match button
            self.BAuto.config(text = 'Abort!', command = self.on_abort)
        # try:
        if 5>3:
            for num_iterate, pos in enumerate(positions):
            #bind right-click to every buttons in Wafer
                self.waferPanel.wafer.pAB.get(pos).bind("<Button-3>", lambda event, pos = pos: self.on_rightClick(pos))
                text = f'pos: {pos}' + '\n'
                self.waferPanel.textArea.insert('end', text)
                self.waferPanel.textArea.see('end')

                x = self.expData.iloc[:,0]

                y = self.dataExpPanel.normalization((self.expData.iloc[:, pos]))
                s1 = {}
                s2 = ''
                t = {}
                num2_iterate = 0
                for filename, calPattern in self.dataCalPanel.getFileAndPatterns().items():
                    if self.stop_threads:
                        self.stop_threads = False
                        self.BAuto.config(text = 'Auto Match', command = self.autoCommand)
                        self.waferPanel.textArea.insert('end', 'Auto Match Abort!')
                        self.waferPanel.textArea.see('end')
                        return

                    start_iterate = time.time()
                    remain_iterate = (len(positions) - num_iterate)*len(self.dataCalPanel.getFileAndPatterns()) - num2_iterate
                    cal_x, cal_y = [calPattern.x, calPattern.y]

                    self.phasecom.errorFold = self.fp.getPara()['toTimes']   #change error
                    self.phasecom.minHeight = self.fp.getPara()['minHeight']  #change error
                    self.phasecom.xDistance = self.fp.getPara()['xDistance']  #change error
                    self.phasecom.width = self.fp.getPara()['width']  #change error


                    cR = self.phasecom.expAndCalXRDComparision(x, y, cal_x, cal_y/100)

                    # write result
                    filePercentage = round(cR['per'], 2)
                    # filePercentage = self.getPPer(cR['per'])

                    s1[filename] = filePercentage
                    t[filename] = cR

                    time.sleep(0.01)
                    #calculate remain time
                    end_iterate = time.time()
                    oneIterateTime = end_iterate - start_iterate
                    num2_iterate += 1

                    text = f'''Reference: {filename}, Match: ''' + "{:3.4f}".format(cR['per']) + '%'+\
                     f',  remaining time: ' + '{:3.2f}'.format(remain_iterate*oneIterateTime/60)+ '(min)' '\n\n'
                    self.waferPanel.textArea.insert('end', text)
                    self.waferPanel.textArea.see('end')

                s2 = self.getWholeResult(s1)
                status = self.getPStatus(s1)
                self.phaseComData[pos] = [s1, s2]
                self.fitResult[pos] = t
                # self.result_whole = getWholeResult(s1)

                #write status to Buttonsana
                b = self.waferPanel.wafer.pAB[pos]
                b.config(image = self.pngImage[status] )

            self.BAuto.config(text = 'Auto Match',command = self.autoCommand)
            self.stop_threads = False
            self.waferPanel.textArea.insert('end', 'Auto Match finished!')
            self.waferPanel.textArea.see('end')
        # except Exception as e:
        #     print(sys.exc_info())
        #     self.BAuto.config(text = 'Auto Match',command = self.autoCommand)
        #     self.stop_threads = False

    def getWholeResult(self, s1):
        v = np.array([s for s in s1.values()])
        if 1 in v:
            return 1
        else:
            return max(v) if len(v) > 0 else 0


    #get phase percentage
    def getPPer(self, per):
        if per >= 0.95:
            return 1.0
        elif per > 0.85:
            return 0.6
        elif per > 0.5:
            return 0.3
        else: return 0

    #get position station
    def getPStatus(self, s1):
        v = np.array([s for s in s1.values()])
        if 1 in v:
            return 'Match'
        elif True in np.logical_and(v<1, v>=0.6):
            return 'Doubt'
        elif True in np.logical_and(v<0.6, v>=0.3):
            return 'Difficult'
        else:
            return 'Not match'
