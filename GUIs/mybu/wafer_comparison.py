from tkinter.filedialog import askopenfilenames, askopenfilename
from tkinter.colorchooser import *
import matplotlib
matplotlib.use("TkAgg")
from matplotlib import colors
from matplotlib.figure import Figure
from matplotlib import cm
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from matplotlib import cm
from tkinter.colorchooser import *
from tkinter import *
from tkinter import ttk, scrolledtext
import pandas as pd
import numpy as np
import threading
import time
import os
from datetime import *
from collections import defaultdict

from pieChart import PieChart

class TwoWafers(Frame):
    def __init__(self, master):
        super().__init__(master)
        waferPanel = Frame(self)
        self.paraPanel = LabelFrame(self, text = 'set tolerance (percent)')
        comparePanel = LabelFrame(self, text = 'compare')

        waferPanel.grid(row = 0, column = 0, sticky = 'nw', padx = (5,5))
        self.paraPanel.grid(row = 2, column = 0, sticky = 'nw', padx = (5,5))
        comparePanel.grid(row = 0, column = 1, rowspan = 2, sticky = 'nw', padx = (5,5))

        #wafer panel
        self.labelFrame1 = LabelFrame(waferPanel, text = 'main wafer')
        self.labelFrame2 = LabelFrame(waferPanel, text = 'reference wafer')
        self.labelFrame1.grid(row = 0, column = 0, sticky = 'n', padx = (5,5))
        self.labelFrame2.grid(row = 0, column = 1, sticky = 'n', padx = (5,5))

        self.mainB = Button(self.labelFrame1, text = 'import', command = lambda: self.on_import(label = 'main'))

        self.referenceB = Button(self.labelFrame2, text = 'import', command = lambda: self.on_import(label = 'reference'))
        self.mainB.grid(row = 0, column = 0, sticky = 'n', padx = (5,5))
        self.referenceB.grid(row = 0, column = 0, sticky = 'n', padx = (5,5))

        #paremeter panel
        self.ele_e = {} #entrys for elements
        self.mainPiechart = None
        self.referencePiechart = None
        self.matchindex = defaultdict(list) #comparison results

        #compare panel
        Button(comparePanel, text = 'compare!', fg = 'red', command = self.on_compare).grid(row = 0, column = 0, pady = (5,5))
        self.overview_b = Button(comparePanel, text = ' show overview', command = self.on_overview, state ='disabled')
        self.overview_b .grid(row = 0, column = 1, pady = (5,5))
        self.resultInf = scrolledtext.ScrolledText(comparePanel, wrap = 'word', width = 40)
        self.resultInf.grid(row = 1, column = 0, columnspan = 2, padx = (5,5))

    def on_overview(self):
        self.highlight_the_wafers()

    def on_compare(self):
        # self.on_import1()
        #1. delete calculation from last time
        elements = self.mainPiechart.getElements()
        self.matchindex = defaultdict(list) #comparison results
        #delete highlight
        self.referencePiechart.deleteHighlight()


        for mainindex, mainPer in self.mainPiechart.getElePercentages().iterrows():
            for refindex, refPer in self.referencePiechart.getElePercentages().iterrows():
                if self.compare(mainPer, elements, refPer):
                    self.matchindex[mainindex].append(refindex)

        self.highlight_the_wafers()

        #override mouse-click for main wafer
        self.mainPiechart.canvas.figure.canvas.mpl_connect('button_press_event', self.on_click_results)

        #update informaion
        self.resultInf.delete('1.0', 'end')
        if len(self.matchindex) == 0:
            self.resultInf.insert('end',  'not found any similarity')
            self.overview_b.config(state = 'disabled')
        else:
            self.overview_b.config(state = 'normal')
            self.resultInf.insert('end',  f'main       reference ' + '\n')
            for k, v in self.matchindex.items():
                self.resultInf.insert('end',  f'pos {k+1} ---> ')
                self.resultInf.insert('end',  np.array(v) +1 )
                self.resultInf.insert('end', '\n')

    def highlight_the_wafers(self):
        #hightlight the wafers
        self.mainPiechart.plotHighlight([mainindex for mainindex in self.matchindex], color = 'blue')
        refin = []
        for refindex in self.matchindex.values():
            refin += refindex
            refindex_unique = list(set(refin))
        self.referencePiechart.plotHighlight(refindex_unique, color = 'blue')


    def on_click_results(self, event):
        click = event.xdata, event.ydata
        if None not in click: # clicking outside the plot area produces a coordinate of None, so we filter those out.
            mainindex = self.mainPiechart.getPiechartIndex(click[0], click[1])
            if len(mainindex)>0:
                self.referencePiechart.plotHighlight([v for v in self.matchindex[mainindex[0]]])




    def compare(self, mainPer, elements, refPer):

        for ele in elements:
            # if abs(mainPer[ele]-refPer[ele])>=float(self.ele_e.get(ele).get())*mainPer[ele]*0.01:
            if abs(mainPer[ele]-refPer[ele])>float(self.ele_e.get(ele).get()):
                return False
        return True

    # def on_import1(self, label = None):
    #     data1 = pd.read_csv(r'C:\Users\AI-PC2\Dropbox\PythonProgram\Wafer_comparison\a1.CSV', sep = ';')
    #     data2 = pd.read_csv(r'C:\Users\AI-PC2\Dropbox\PythonProgram\Wafer_comparison\a2.CSV', sep = ';')
    #     self.mainPiechart = PieChart(self.labelFrame1, data1)
    #     self.referencePiechart = PieChart(self.labelFrame2, data2)
    #     self.setParemeterPanel(self.mainPiechart.getElements())



    def on_import(self, label):
        path = askopenfilename(parent=self ,title='Choose a csv file', filetypes = (("csv files","*.csv"),("all files","*.*")))
        self.data = pd.read_csv(path, sep = ';')

        filename = os.path.basename(path)

        if label == 'main':
            self.mainPiechart = PieChart(self.labelFrame1, self.data)
            main_e = Entry(self.labelFrame1, width = 40,  fg = 'blue')
            main_e.insert(0, filename)
            self.mainPiechart.grid(row = 1, column = 0, sticky = 'n', padx = (5,5))
            main_e.grid(row = 2, column = 0, sticky = 'n', pady = (2, 5))
            self.mainB.grid_forget()
            self.setParemeterPanel(self.mainPiechart.getElements())
            self.labelFrame1.config(text = filename, fg = 'blue')
        elif label == 'reference':
            self.referencePiechart = PieChart(self.labelFrame2, self.data)
            reference_e = Entry(self.labelFrame2, width = 40)
            reference_e.insert(0, filename)
            self.referencePiechart.grid(row = 1, column = 0, sticky = 'n', padx = (5,5))
            reference_e.grid(row = 2, column = 0, sticky = 'n', pady = (2, 5))
            self.referenceB.grid_forget()
            self.labelFrame2.config(text = filename)

     #parameters panal
    def setParemeterPanel(self, elements):
        for eleindex, ele in enumerate(elements):
            Label(self.paraPanel, text = ele).grid(row = 0, column = eleindex, padx = (5,5))
            self.ele_e[ele] = Entry(self.paraPanel, width = 4)
            self.ele_e.get(ele).grid(row = 1, column = eleindex, padx = (5,5))
            self.ele_e.get(ele).insert(0, 2)
        # Button(self.paraPanel, text = 'set', fg = 'blue', command = self.on_setPara).grid(row = 1, column = len(self.ele_e) + 1, padx = (5,5))




def main():

    with open('qixian') as fp:
        lines = fp.readlines()
        for line in lines:
            if 'qixian' in line:
                return


    with open('qixian', 'r+') as fp:
        lines = fp.readlines()
        for line in lines:
            if '..' in line:
                # print(line.strip())
                if datetime.today().date()> datetime.strptime(line.strip().replace('..',''), '%y.%m.%d').date():
                    fp.write('qixian')
                    return
    root = Tk()
    # data1 = pd.read_csv(r'C:\Users\AI-PC2\Dropbox\PythonProgram\Wafer_comparison\a1.CSV')
    # data2 = pd.read_csv(r'C:\Users\AI-PC2\Dropbox\PythonProgram\Wafer_comparison\a2.CSV')
    app = TwoWafers(root)
    root.title('wafer comparison')

    # app.mainPiechart = data1
    # app.referencePiechart = data2

    app.pack()


    root.mainloop()


if __name__ == '__main__':
    main()
