
from usefulModules.waferCanvas import WaferCanvas
from auto.showStatus import PhaseResultStatus

import threading
import time
import matplotlib
matplotlib.use("TkAgg")
from matplotlib import colors
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
import matplotlib.pyplot as plt
from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
#show result in pie chatr form
class ShowResult():
    def __init__(self, matrix, getPhaseIdentificationResult, colName):
        self.matrix = matrix
        self.getPhaseIdentificationResult = getPhaseIdentificationResult

        self.normPercentage = {}#record phase normPercentage = {pos: [s1, s2]}
                                #s1 phase list, s2 percentage list
        self.colName = colName

        self.pieCharWindow = Toplevel()
        self.pieCharWindow.title('Phases in each position')

        self.waferC = WaferCanvas(self.pieCharWindow)

        self.pieCharWindow.protocol('WM_DELETE_WINDOW', lambda: self.waferC.on_closeAll(self.pieCharWindow))
        self.fB = Frame(self.pieCharWindow)

        self.waferC.grid(row = 0, column = 0, sticky = 'news', padx = (10, 10), pady = (10, 10))
        self.fB.grid(row = 0, column = 1, sticky = 's', padx = (10, 10), pady = (0, 30))


        self.bStatus = Button(self.fB, text = 'Status', command = self.showthreeD)
        self.bStatus.pack(pady = (5, 50), fill = 'y', padx = (10, 10))

        #legend
        self.myColormap = self.getColorMap()
        fLegend = Frame(self.fB, relief = 'sunken')
        fLegend.pack()
        for i, name in enumerate(self.colName[2:]):
            Label(fLegend, bg = colors.rgb2hex(self.myColormap.get(name)), width = 3).grid(row = i, column = 0)
            Label(fLegend, text = name).grid(row = i, column = 1, sticky = 'w')

        #override wafer canvas bind
        for pos in self.waferC.getPAC():
            self.waferC.pAC.get(pos).bind("<Enter>", lambda event, pos = pos: self.on_enter(event, pos))


        self.on_BExpPiechart()




    def on_BExpPiechart(self):
        threading.Thread(target=self.plotPiechart).start()

    #     #plot pie chart
    def plotPiechart(self):
        positions = self.matrix.iloc[:,0] if len(self.matrix) > 0 else []
        for pos in positions:
            fig = Figure(figsize = (0.43, 0.43))
            ax = fig.add_subplot(111)

            dataSeries = self.matrix.loc[self.matrix['pos'] == pos]# get row
            #get identified pahses
            phases= [col for col in dataSeries.columns.tolist()[2:] if float(dataSeries[col]) > 0]
            d= dataSeries[phases].iloc[0,:].values
            # d= dataSeries[phases].iloc[0,:].values
            data = self.normalization(d.astype(np.float))
            self.normPercentage[pos] = [phases, data]

            #get color
            mycolors = [self.myColormap.get(name) for name in phases]

            ax.pie(data, colors = mycolors)

            FigureCanvasTkAgg(fig, master = self.waferC.pAC[pos]).get_tk_widget().pack()
            ax.set_xticks([])
            ax.set_yticks([])
            fig.subplots_adjust(left=-0.1, bottom=-0.1, right=1.1, top=1.1, wspace=0, hspace=0)
            time.sleep(0.02)




    def on_enter(self,e, pos):
        self.waferC.l2.configure(text= self.getposPhase(pos))


    #assign each potential phase a color
    def getColorMap(self):
        number = len(self.colName)
        if number < 20:
            cmap = plt.get_cmap('brg')
        else:
            cmap = plt.get_cmap('nipy_spectral')
        colormap = [cmap(i) for i in np.linspace(0, 1, number)]

        myColormap = {}
        for i, name in enumerate(self.colName):
            myColormap[name] = colormap[i]
        return myColormap

    #return [row, col, 'status']
    def getposStatus(self, pos):
        index = self.waferC.pALoc.get(pos)
        status = self.matrix.loc[self.matrix['pos'] == pos]['status'].values[0]
        return [index[0], index[1], status]

    def getposPhase(self, pos):
        text = ''
        s = self.getPhaseIdentificationResult.get(pos)
        if s is not None and self.normPercentage.get(pos) is not None:
            text = f'pos: {pos}' + '\n' + f'status: {s[1]}' + '\n'
            phase, percentage = self.normPercentage.get(pos)
            for i in range(len(phase)):
                text = text + f'{phase[i]}: ' + "{:.2f}".format(percentage[i]) + '\n'
            return text
        else:
            return f'pos: {pos}'


    #new winow will come out
    def showthreeD(self):
        w = Toplevel(self.pieCharWindow)
        w.title('Identification status of each position')
        positions = self.matrix.iloc[:,0] if len(self.matrix) > 0 else []
        data = {}
        for pos in positions:
            data[pos] = self.getposStatus(pos)

        if len(data) > 0:
            threeD = PhaseResultStatus(w)
            threeD.setData(data)
            threeD.threeDStatus()

    def normalization(self, df):
        #df_norm = (df - df.min()) / (df.max() - df.min())

        df_norm = df/sum(df)
        return df_norm
