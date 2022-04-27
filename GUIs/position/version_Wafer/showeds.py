from tkinter.filedialog import askopenfilenames, askopenfilename
from tkinter.colorchooser import *
import matplotlib
matplotlib.use("TkAgg")
from matplotlib import colors
from matplotlib.figure import Figure
from matplotlib import cm
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt

from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
import threading
import time
try:
   from version_Wafer.waferCanvas import WaferCanvas
except :
   from waferCanvas import WaferCanvas

# from version_Wafer.waferCanvas import WaferCanvas

class SmallWaferCanvas(WaferCanvas):
    def __init__(self, master, **kw):
        WaferCanvas.__init__(self, master, **kw)
        self.l2.grid_forget()
        #override wafer canvas bind
        for pos in self.getPAC():
            self.pAC.get(pos).config(width = 10, height = 10)




class ShowEDS(WaferCanvas):
    def __init__(self, master, **kw):
        WaferCanvas.__init__(self, master, **kw)

        self.matrix = pd.DataFrame()# CSV data, has title

        '''
    Index     Cr         Mn         Fe         Co         Ni
      1  12.968270  11.914023  39.396111  25.803480   9.918117
      2  14.019548  12.176746  39.472613  24.404398   9.926695
      3  14.927209  11.882305  39.963092  22.647119  10.580275


'''
        self.config(height = 900)
        self.fCanvas = {} #panel for sub elements
        self.legendB = {} #legend color buttons
        self.pieCharColor = {}
        self.pieCharColor_canvas = {}

        self.fPanel = Frame(self)
        #add a import file button
        importB = Button(self, text = 'import EDS data', command = self.importEDS)

        self.fB = Frame(self)
        self.fB.grid(row = 0, column = 1, sticky = 's', padx = (10, 10), pady = (0, 30))
        importB.grid(row = 0, column = 2, sticky = 'n', padx = (5,5), pady = (5,5) )
        self.fPanel.grid(row = 1, column = 0, columnspan = 3)
        #override wafer canvas bind
        for pos in self.getPAC():
            self.pAC.get(pos).bind("<Enter>", lambda event, pos = pos: self.on_enter(event, pos))
            self.pAC.get(pos).config(width = 25, height = 25)

        # self.individual_colors = [cm.jet(i) for i in np.linspace(0.0, 100.0, 1000)]

    def on_BExpPiechart(self):
        threading.Thread(target = self.plotPiechart).start()

    #     #plot pie chart
    def plotPiechart(self):
        #colors for small wafers

        for pos in self.matrix.iloc[:,0]:
            fig = Figure(figsize = (0.27, 0.27))
            ax = fig.add_subplot(111)

            data = self.matrix.iloc[pos - 1, 1:] #
            #get color

            self.pieCharColor[pos], t1 = ax.pie(data, colors = self.myColormap.values())

            self.pieCharColor_canvas[pos] = FigureCanvasTkAgg(fig, master = self.pAC[pos])
            self.pieCharColor_canvas.get(pos).get_tk_widget().pack()

            ax.set_xticks([])
            ax.set_yticks([])
            fig.subplots_adjust(left=-0.1, bottom=-0.1, right=1.1, top=1.1, wspace=0, hspace=0)

            #deal with small wafers
            for name in self.matrix.columns[1:]:
                per = self.matrix.at[pos - 1, name]
                val = np.sort(self.matrix[name].values)

                self.fCanvas.get(name).pAC.get(pos).config(bg = self.colorChoose(val, per))

            time.sleep(0.01)

    def getColorMap(self):
        number = len(self.matrix.columns[1:])

        cmap = plt.get_cmap('coolwarm')
        colormap = [cmap(i) for i in np.linspace(0, 1, number)]
        myColormap = {}
        for i, name in enumerate(self.matrix.columns[1:]):
            myColormap[name] = colormap[i]
        return myColormap


    def on_enter(self,e, pos):
        return []
        self.l2.configure(text= self.getposPhase(pos))

    def getposPhase(self, pos):
        text = 'pos: {}'.format(pos) + '\n'
        if len(self.matrix.columns) > 1: # if EDS data is imported
            for i, ele in enumerate(self.matrix.iloc[pos - 1, 1:]):
                text = text + '{}: '.format(self.matrix.columns[i + 1]) + "{:.2f}".format(ele) + '%'+ '\n'
            return text
        else:
            return text


    def importEDS(self):
        # path = r'C:\Users\AI-PC2\Dropbox\PythonProgram\EDS_composition\xp Version_done\version_Wafer\a.CSV'
        path = askopenfilename(parent=self ,title='Choose a csv file', filetypes = (("csv files","*.csv"),("all files","*.*")))
        self.data = pd.read_csv(path)
        self.matrix = self.data.iloc[:,3:]# CSV data, has title
        self.matrix.insert(0,'Index', np.arange(1, len(self.matrix)+1), True)
        #legend
        self.myColormap = self.getColorMap()
        fLegend = Frame(self.fB, relief = 'sunken')
        fLegend.pack()
        for i, name in enumerate(self.matrix.columns[1:]):
            self.legendB[i] = Button(fLegend, bg = colors.rgb2hex(self.myColormap.get(name)), width = 3, command =lambda i = i: self.onLegendB(i))
            self.legendB.get(i).grid(row = i, column = 0)

            Label(fLegend, text = name).grid(row = i, column = 1, sticky = 'w')
            #panel for individual element
            self.fCanvas[name] = SmallWaferCanvas(self.fPanel)
            self.fCanvas.get(name).grid(row = 0, column = i, padx = (5,5), pady = (5,5))
            Label(self.fPanel, text = name).grid(row = 1, column = i)

            #override
            for pos in self.fCanvas.get(name).getPAC():
                self.fCanvas.get(name).pAC.get(pos).bind("<Enter>", lambda event, pos = pos, name = name : self.on_enter_ele(event, pos, name))

        self.on_BExpPiechart()

    # def setLegend(self):


    def onLegendB(self, i):
        color = colorchooser.askcolor()[1] #select color
        #change
        self.legendB.get(i).config(bg = color)
        for pos, pie in self.pieCharColor.items():
            pie[i].set_color(color)
            self.pieCharColor_canvas.get(pos).draw()






    #override information panel for each small wafer
    def on_enter_ele(self, e, pos, name):
        return []
        text = 'pos: {}'.format(pos) + '\n'

        if len(self.matrix.columns) > 1: # if EDS data is imported
            text = text + '{}: '.format(name) + "{:.2f}".format(self.matrix.at[pos - 1, name]) + '%'+ '\n'
        self.l2.configure(text= text)


    def colorChoose(self, v, x):

        normalized = (v - min(v))/(max(v) - min(v))
        index = np.where(v == x)[0][0]

        return colors.rgb2hex(cm.jet(normalized[index]))


    def on_closeAll(self, w):
        threading.Thread(target=lambda: self.closeAll(w)).start()

    def closeAll(self, w):
        for pos in self.getPAC():
            self.pAC[pos].destroy()
            #deal with small wafers
            for name in self.matrix.columns[1:]:
                self.fCanvas.get(name).pAC.get(pos).destroy()
            time.sleep(0.001)
        w.destroy()




