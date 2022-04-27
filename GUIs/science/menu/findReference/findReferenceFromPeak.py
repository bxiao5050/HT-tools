import pandas as pd
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
import numpy as np
from tkinter import *

try:
    from menu.findReference.rangeDrag import RangeDrag
    from menu.findReference.sWafer import SWafer
except ModuleNotFoundError:
    from rangeDrag import RangeDrag
    from sWafer import SWafer



class FindReferenceFromPeak(Frame):
    def __init__(self, master, data = None, fileAndPatterns = None):
        super().__init__(master)

        self.searchResult = {}# search result
        self.vline =None

        self.canvasF = Frame(self)
        self.wafer = SWafer(self)

        self.wafer.grid(row =0, column = 0, sticky ='n')
        Button(self, text = '+', command = self.on_setRange).grid(row =0, column = 1, sticky ='w')
        Button(self, text = 'search', command = self.on_searchReference).grid(row =0, column =2 , sticky ='w',padx = (20,20))
        self.listbox = Listbox(self, width = 50,height = 20)
        self.listbox.grid(row =0, column = 3,  sticky ='n', padx = (10,10))
        self.canvasF.grid(row =1, column = 0, columnspan = 4, sticky ='news')

        self.listbox.bind('<<ListboxSelect>>', self.onselect)

        Grid.rowconfigure(self, 1, weight = 1)
        Grid.columnconfigure(self, 0, weight = 1) # listbox


        self.xRange =[]
        self.setFigure()

        if data is None:
            self.data = pd.read_csv('C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\Cantor alloy\\XRD_Cantor_400_backg_norm.csv')
        else:
            self.data = data
            self.fileAndPatterns = fileAndPatterns
        for pos, b in self.wafer.pAB.items():
            b.config(command = lambda pos = pos:self.on_buttonPress(pos))

    def onselect(self, evt):
        # Note here that Tkinter passes an event object to onselect()
        w = evt.widget
        try:
            index = int(w.curselection()[0])
        except IndexError:
            return
        filename = w.get(index)
        data = self.fileAndPatterns.get(filename)
        if self.vline is not None:
            self.vline.remove()
        self.vline = self.ax.vlines(data.x, np.zeros(len(data.x)), data.y/100, label = filename)
        self.canvas.draw()

    #override
    def on_buttonPress(self, pos):
        self.wafer.buttonPress(pos)
        #clear old plot
        line = self.ax.get_lines()
        if len(line) > 0:
            line[0].remove()
        x = self.data.iloc[:, 0]
        y = self.normalization(self.data.iloc[:, pos])
        self.ax.plot(x, y)
        self.ax.set_xlim(min(x), max(x))
        self.canvas.draw()

    def on_searchReference(self):
        # cal_x = np.array([23, 38.6900003422052,    44.0900002215058, 51.630000057444, 75.3999995194376, 91.76999915577471, 98.13229999031499])
        # cal_y = np.array([0.02, 0.30510278688188974, 1, 0.1908212497628754, 0.10010422419992095, 0.05947139954324105, 0.07971985410125])
        #clear listbox
        self.listbox.delete(0,'end')
        self.searchResult  = {}
        for filename, pattern in self.fileAndPatterns.items():
            cal_x= pattern.x
            x_find = self.compare(cal_x)
            if len(x_find) >0:
                self.searchResult[filename] = x_find
        for i, filename in enumerate(self.searchResult.keys()):
            #populate the list
            self.listbox.insert(i, filename)

    def compare(self, cal_x):
        #1. get x range
        x_find = []
        for rangex in self.xRange:
            x_set = rangex.getRangeV()
            index = np.where(np.logical_and(cal_x>x_set[0], cal_x<x_set[1]))[0]
            if len(index) == 0:
                return []
            else:
                x_find.append(cal_x[index])

        return x_find

    def normalization(self, df):
        df_norm = (df - df.min()) / (df.max() - df.min())
        return df_norm


    def on_setRange(self):
        line = self.ax.get_lines()[0]
        y = line.get_ydata()
        self.ax.set_ylim(min(y), max(y))
        self.xRange.append(RangeDrag(self, ax = self.ax))
        self.canvas.draw()


    def setFigure(self):
        f2 = Figure()
        self.canvas = FigureCanvasTkAgg(f2, master = self.canvasF)
        self.canvas.get_tk_widget().pack(fill=BOTH, expand=1)
        toolbar = NavigationToolbar2Tk(self.canvas, self.canvasF)
        toolbar.update()
        self.ax = f2.add_subplot(111)

def main():
    root = Tk()
    app = FindReferenceFromPeak(root)
    app.pack(side=TOP, fill=BOTH, expand=1)






