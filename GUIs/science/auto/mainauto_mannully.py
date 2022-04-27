from mywidgets.wafer import wafer_visual
from auto.main_panel import MainResult

from auto.chooseRunRange import RunRange

from auto.autoResult import autoRes
from auto.phaseCom import Auto
from auto.showStatus import PhaseResultStatus
from scipy.signal import find_peaks

from matplotlib import colors
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
import threading
import time
import sys

class MainAuto_mannully():
    '''run automation mannully
    '''
    def __init__(self, app = None, expData = None, para = None, advancedP = None, **kw):

        self.app = app

        self.expData = expData
        self.para = para
        self.advancedP = advancedP

        self.chooseRange = self.para['chooseRange']
        self.stop_threads = False
        # self.master = master

        self.fitResult = {}# keep all the fitting results
                            # fitResult = {'pos': per, matchpeak, unmatchpeak},

        self.autoComman = self.app.BAuto.cget('command')
        # self.phasecom = Auto(self.master)
        self.pngImage = {1: PhotoImage(file = 'yes.png'), 0.6: PhotoImage(file = 'triangle.png'), 0.3: PhotoImage(file = 'rectangle.png'), 0: PhotoImage(file = 'no.png')}

        self.on_auto()

    def on_rightClick(self, pos):

        x = self.expData.iloc[:, 0]
        y = self.expData.iloc[:, pos]
        y = self.app.dataExpPanel.normalization(y)
        # autoRes(self.master, self.fitResult.get(pos), x, y, pos)

        w = Toplevel()
        w.title(f'pos : {pos} (result from mannully selected peaks)')

        fig = Figure()
        canvas = FigureCanvasTkAgg(fig, master = w)
        ax = fig.add_subplot(111)
        canvas._tkcanvas.pack(fill = 'both', expand = True)
        toolbar = NavigationToolbar2Tk(canvas, w)
        toolbar.update()
        toolbar.pack()
        ax.set_xlim(min(x), max(x))
        ax.set_ylim(0, 1.35)

        [per, peaks, matchpeak, unmatchpeak] = self.fitResult[pos]


        ax.plot(x, y, color = 'black')
        color = 'orange'
        for logic, selRange in [[v[1].logicDroplist.get(), np.array(v[1].rangeInf.cget('text').split(' - ')).astype(np.float)] for v in self.advancedP.peakAndRange]:
            if logic == 'AND':
                ax.bar((selRange[0] + selRange[1])/2, 1.35,  color = 'orange', alpha = 0.2, width = max(selRange) - min(selRange))
            elif logic == 'NOT':
                ax.bar((selRange[0] + selRange[1])/2, 1.35,  color = 'tan', alpha = 0.1, width = max(selRange) - min(selRange))

        # print(matchpeak)
        line, = ax.plot(x[peaks], y[peaks], 'x', color = 'orange')
        matchedpeak_vline = ax.vlines(matchpeak[0], np.zeros(len(matchpeak[1])), matchpeak[1], color = 'red', label = 'Matched peaks')
        unmatchedpeak_vline =  ax.vlines(unmatchpeak[0], np.zeros(len(unmatchpeak[1])), unmatchpeak[1], linestyle = 'dashed', color = 'gray', label = 'Unmatched peaks')
        minHeight = ax.hlines(self.para['minHeight'], min(x), max(x), linestyle="dotted", color = 'firebrick', label = f'minHeight')
        ax.legend(loc='upper left', ncol=2, fontsize = 'small').set_draggable(True)

        canvas.draw()


    def on_auto(self):
        threading.Thread(target=self.plotter).start()

    def on_abort(self):
        self.stop_threads = True

    def plotter(self):
        positions = self.chooseRange.sel()
        if len(positions):# change status of auto match button
            self.app.BAuto.config(text = 'Abort!', command = self.on_abort)

        try:
            for num_iterate, pos in enumerate(positions):
                #bind right-click to every buttons in Wafer
                self.app.waferPanel.wafer.pAB.get(pos).bind("<Button-3>", lambda event, pos = pos: self.on_rightClick(pos))
                if self.stop_threads:
                    self.stop_threads = False
                    self.app.BAuto.config(text = 'Auto Match', command = self.autoComman)
                    self.app.waferPanel.textArea.insert('end', 'Auto Match Abort!')
                    self.app.waferPanel.textArea.see('end')
                    return

                x = self.expData.iloc[:,0]
                y = self.expData.iloc[:, pos]
                y = self.app.dataExpPanel.normalization(y)

                #2. calculate its peaks
                peaks,_ = find_peaks(y, height = self.para['minHeight'],
                    distance = self.para['xDistance']*len(np.atleast_1d(x))/(max(x) - min(x)),
                    width = self.para['width'])

                #. see if the peaks are in the range
                matchpeak = [[], []] # used for plot vilne
                unmatchpeak = [[], []]
                match_num = 0
                for logic, selRange in [[v[1].logicDroplist.get(),
                np.array(v[1].rangeInf.cget('text').split(' - ')).astype(np.float)] for v in self.advancedP.peakAndRange]:
                    index = (x[peaks] >= min(selRange)) & (x[peaks] <= max(selRange))
                    x_matchpeak = x[peaks][index]
                    y_matchpeak = y[peaks][index]
                    if logic == 'AND':
                        if len(x_matchpeak) > 0:
                            match_num += 1
                            matchpeak[0] = np.append(matchpeak[0], x_matchpeak)
                            matchpeak[1] = np.append(matchpeak[1], y_matchpeak)
                        elif len(x_matchpeak) == 0:
                            match_num -= 1
                    elif logic == 'NOT':
                        if len(x_matchpeak) == 0:
                            match_num += 1
                        elif len(x_matchpeak) > 0:
                            match_num -= 1
                            unmatchpeak[0] = np.append(unmatchpeak[0], x_matchpeak)
                            unmatchpeak[1] = np.append(unmatchpeak[1], y_matchpeak)

                # get FOM percentage value
                try:
                    per = match_num/len(self.advancedP.peakAndRange)
                except ZeroDivisionError:
                    messagebox.showerror('Error', 'No mannually identified range!')

                time.sleep(0.03)


                text = f'Pos {pos}: '+ '{:3.4f}'.format(per) + '\n\n'
                self.app.waferPanel.textArea.insert('end', text)
                self.app.waferPanel.textArea.see('end')

                self.fitResult[pos] = [per, peaks, matchpeak, unmatchpeak]


                #write status to Buttonsana
                b = self.app.waferPanel.wafer.pAB[pos]
                b.config(image = self.pngImage[self.getPPer(per)] )

            self.app.BAuto.config(text = 'Auto Match',command = self.autoComman)
            self.stop_threads = False
            self.app.waferPanel.textArea.insert('end', 'Auto Match finished!')
            self.app.waferPanel.textArea.see('end')
        except Exception as e:
            print(sys.exc_info())
            self.app.BAuto.config(text = 'Auto Match',command = self.autoComman)
            self.stop_threads = False


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
        if 1 in s1.values():
            return 'Match'
        elif 0.6 in s1.values():
            return 'Doubt'
        elif 0.3 in s1.values():
            return 'Difficult'
        else:
            return 'Not match'
