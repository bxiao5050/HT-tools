from tkinter import *
import pandas as pd
import numpy as np


from scipy.signal import find_peaks
try:
    from auto.advancedRange import  AdvancedRange
    from auto.chooseRunRange import RunRange
    from auto.mainauto_mannully import MainAuto_mannully
except:

    from advancedRange import  AdvancedRange
    from chooseRunRange import RunRange
    from mainauto_mannully import MainAuto_mannully

class AutoMannually(Frame):
    def __init__(self, master, app = None, autowindow = None, **kw):
        Frame.__init__(self, master, **kw)

        if app is None:
            self.data = pd.read_csv('C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\Cantor alloy\\XRD_Cantor_400_backg_norm.csv')
        else:
            self.data = app.getExpData()

        self.app = app
        self.autowindow = autowindow
        self.per = -1 #percentage
        self.advancedP = AdvancedRange(self, self.data)
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

    def callback(self, e):
        self.clearCompareResult()
        self.advancedP.selectExp(e)

    #clear the result from ax
    def clearCompareResult(self):
        if len(self.compareResult_plot) > 0:
            for v in self.compareResult_plot:
                v.remove()
            self.compareResult_plot = []
            self.advancedP.mycanvas.draw()


    def on_preview(self):
        self.clearCompareResult() # remore previous result
        self.phasecompare()

    def phasecompare(self):
        #1. gget the selected exp data
        x = self.advancedP.getSelectedData().get_xdata()
        y = self.advancedP.getSelectedData().get_ydata()
        y = self.app.dataExpPanel.normalization(y)

        #2. calculate its peaks
        peaks,_ = find_peaks(y, height = self.fp.getPara()['minHeight'],
            distance = self.fp.getPara()['xDistance']*len(np.atleast_1d(x))/(max(x) - min(x)),
            width = self.fp.getPara()['width'])

        #. see if the peaks are in the range
        matchpeak = [[], []] # used for plot vilne
        unmatchpeak = [[], []]
        match_num = 0
        for logic, selRange in [[v[1].logicDroplist.get(), np.array(v[1].rangeInf.cget('text').split(' - ')).astype(np.float)] for v in self.advancedP.peakAndRange]:
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
            self.per = match_num/len(self.advancedP.peakAndRange)
        except:
            pass
        # print(matchpeak)
        line, = self.advancedP.getAx().plot(x[peaks], y[peaks], 'x', color = 'orange')
        matchedpeak_vline = self.advancedP.getAx().vlines(matchpeak[0], np.zeros(len(matchpeak[1])), matchpeak[1], color = 'red', label = 'Matched peaks')
        unmatchedpeak_vline =  self.advancedP.getAx().vlines(unmatchpeak[0], np.zeros(len(unmatchpeak[1])), unmatchpeak[1], linestyle = 'dashed', color = 'gray', label = 'Unmatched peaks')
        minHeight = self.advancedP.getAx().hlines(self.fp.getPara()['minHeight'], min(x), max(x), linestyle="dotted", color = 'firebrick', label = f'minHeight')
        self.advancedP.getAx().legend(loc='upper left', ncol=2, fontsize = 'small').set_draggable(True)
        self.advancedP.mycanvas.draw()

        #store plot information
        self.compareResult_plot.append(line)
        self.compareResult_plot.append(matchedpeak_vline)
        self.compareResult_plot.append(unmatchedpeak_vline)
        self.compareResult_plot.append(minHeight)

# #the waferpanel from mainpanel
#     def getApp(self, app):
#         self.app = app

    #override
    def on_auto(self):
        #
        #pass wafer
        positions = self.fp.getPara()['chooseRange'].sel()
        if len(positions) == 0:
            messagebox.showerror('Error', 'Choose positions!')
        else:
            self.autowindow.withdraw()
            mainauto = MainAuto_mannully(app = self.app, expData = self.data, para = self.fp.getPara(), advancedP = self.advancedP)


class FittingParameter():
    def __init__(self, master, **kw):
        # Frame.__init__(self, master, **kw)
        #part 1: all the fitting parameters
        self.paraP = LabelFrame(master, text = 'parameters for peaks finding and match')

        Label(self.paraP, text = 'minHeight: ').grid(row = 0, column = 0, padx = (10, 10), pady = (50, 10),sticky = 'ne')
        Label(self.paraP, text = 'xDistance: ').grid(row = 1, column = 0, padx = (10, 10), pady = (10, 10),sticky = 'ne')
        Label(self.paraP, text = 'toTimes: ').grid(row = 2, column = 0, padx = (10, 10), pady = (10, 10),sticky = 'ne')
        Label(self.paraP, text = 'width: ').grid(row = 3, column = 0, padx = (10, 10), pady = (10, 10),sticky = 'ne')

        self.eminHeight = Entry(self.paraP)
        self.xDistance = Entry(self.paraP)
        self.toTimes = Entry(self.paraP)
        self.width = Entry(self.paraP)

        self.eminHeight.insert(0,0.02)
        self.xDistance.insert(0, 0.5)
        self.toTimes.insert(0,1.3)
        self.width.insert(0,0.5)

        self.eminHeight.grid(row = 0, column = 1, padx = (10, 10), pady = (50, 10), sticky = 'nw')
        self.xDistance.grid(row = 1, column = 1, padx = (10, 10), pady = (10, 10), sticky = 'nw')
        self.toTimes.grid(row = 2, column = 1, padx = (10, 10), pady = (10, 10), sticky = 'nw')
        self.width.grid(row = 3, column = 1, padx = (10, 10), pady = (10, 10), sticky = 'nw')

        instruction = '\"minHeight\": (for peak fitting) minimum y-axis value used. default value \"0.02\" means the program only considers the peaks located at above 0.02' +'\n' +\
                        '\"xDistance\": (for peak fitting) indicate the minimum distance (x-axis) between fitted peaks\n' +\
                        '\"toTimes\" : (for match) the program uses FWHM*toTimes width from the highest intensity as tolarance'
        Label(self.paraP, text = instruction, justify='left').grid(row = 4, column = 0, columnspan = 3, padx = (10, 10), pady = (10, 10), sticky = 'nw')

        #part 2: panel for positions choose
        self.chooseRange = RunRange(master)

        # self.chooseRange.grid(row = 0, column = 0, columnspan = 3, padx = (10, 10), pady = (10, 10), sticky = 'nw')

        #part 3: button
        self.bRun = Button(master, text = 'Run!', fg = 'red', command = self.on_auto)
        # self.bRun.grid(row = 7, column = 2, padx = (10, 10), pady = (5, 10), sticky = 'nw')

    def on_auto(self):
        pass


    def getPara(self):
        return {'minHeight': float(self.eminHeight.get()), 'chooseRange': self.chooseRange, 'xDistance': float(self.xDistance.get()),
        'toTimes': float(self.toTimes.get()), 'width': float(self.width.get())}


class PerResult(LabelFrame):
    def __init__(self, master, **kw):
        LabelFrame.__init__(self, master, **kw)


