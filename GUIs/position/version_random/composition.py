from tkinter import *
from tkinter.filedialog import askopenfilenames, askopenfilename
import pandas as pd
import numpy as np
from io import StringIO
from tkinter import filedialog
import math

try:
   from version_random.plotFrame import PlotFrame
except :
   from plotFrame import PlotFrame


class ShowEDS(Frame):
    def __init__(self, master, data, ele_index, ele_name, center = ''):
        super().__init__(master)
        self.data = data
        self.ele_index = ele_index
        self.ele_name = ele_name
        # inf = Frame(self) #information pannel
        inf_eletitle = ScrollFrame(self, height = 0, scroll = False)
        inf = ScrollFrame(self) #information pannel
        inf_eletitle.pack( fill="both", expand=True)
        inf.pack( fill="both", expand=True)

        #devide data into three types: 1. row containing '-', 2. without '-' (good data), 3 surround (on margin)
        data_empty, data_good = self.divideData(data, ele_index)

        # column names
        for i, ele in enumerate(ele_name):
            Label(inf_eletitle.viewPort, text = '    {}    '.format(ele), fg = 'blue').grid(row = 0, column = i+1)
            Label(inf.viewPort, text = '    {}    '.format(ele)).grid(row = 0, column = i+1)
        Label(inf_eletitle.viewPort, text = ' Spectrum      ').grid(row = 0, column = 0)
        # data
        for i, row in data_good['data'].iterrows():
            Label(inf.viewPort, text = data_good['rowName'][i]).grid(row = i+1, column = 0)
            for j, col in enumerate(ele_name):
                Label(inf.viewPort, text = row[j]).grid(row = i+1, column = j+1)

        #sum and min max deviation
        totalRowN = len(data_good['data'].index)

        Label(inf.viewPort, text = 'Mean (normalized)', fg = 'red').grid(row = totalRowN+1, column = 0 , pady = (15,0))
        ave = []
        for j, col in enumerate(ele_name):
            v = round(data_good['data'].iloc[:, j].sum()/totalRowN, 1)
            ave.append(v)


        ave = np.array(ave)
        ave_mean = np.round(ave/ave.sum(0)*100, 1)#normalization
        for j, col in enumerate(ele_name):
            Label(inf.viewPort, text = ave_mean[j], fg = 'red').grid(row = totalRowN+1, column = j+1, pady = (15,0))

        Label(inf.viewPort, text = 'Mean').grid(row = totalRowN+2, column = 0 , pady = (15,0))
        for j, col in enumerate(ele_name):
            mean = round(data_good['data'].iloc[:, j].sum()/totalRowN, 1)
            Label(inf.viewPort, text = mean).grid(row = totalRowN+2, column = j+1, pady = (15,0))

        Label(inf.viewPort, text = 'Max.').grid(row = totalRowN+3, column = 0 )
        for j, col in enumerate(ele_name):
            mean = max(data_good['data'].iloc[:, j])
            Label(inf.viewPort, text = mean).grid(row = totalRowN+3, column = j+1)

        Label(inf.viewPort, text = 'Min.').grid(row = totalRowN+4, column = 0 )
        for j, col in enumerate(ele_name):
            mean = min(data_good['data'].iloc[:, j])
            Label(inf.viewPort, text = mean).grid(row = totalRowN+4, column = j+1)



    def divideData(self, data, ele_index):
        data_empty = {'x': [], 'y': []} # empty data, contain only x, y
        data_margin = {'x': [], 'y': []} # empty data, contain only x, y
        data_good = {'rowName': [], 'x': [], 'y': [], 'data': pd.DataFrame()}  # row containing '-' data_good{'Spectrum 1 {1}'} = [x, y, [ele1, ele2...]]
        for index, row in data.iterrows():
            if '--' in row['In stats.']:
                data_empty['x'].append(row[2])
                data_empty['y'].append(row[3])
            else:
                data_good['rowName'].append(row[0])
                data_good['x'].append(row[2])
                data_good['y'].append(row[3])
                data_good['data'] = data_good['data'].append([self.normalize(ele_index, row)], ignore_index = True)
        return data_empty, data_good



    def normalize(self,ele_index, row):
        #1. summ
        summ = 0
        for i, v in enumerate(ele_index):
            if v > 0:
                if not math.isnan(float(row[2+i])):
                    summ += float(row[2+i])
        #2.result
        norm = []
        for i, v in enumerate(ele_index):
            if v > 0:
                if summ > 0:
                    norm.append(round(float(row[2+i])*100/summ, 1))
                else:
                    norm.append(0)
        return norm



class ImportData(LabelFrame):
    def __init__(self, master, tt):
        super().__init__(master)

        # path = askopenfilename(parent=master ,title='Choose a file', filetypes = (("txt files","*.txt"),("all files","*.*")))
        # self.data = pd.DataFrame()
        self.center = ''
        lines = ''
        try:

            fh = tt
            for line in fh.split('\n'):
                if 'Spectrum' in line or 'Spektrum' in line:
                    lines += line.rstrip() + '\n'
            self.data = pd.read_csv(StringIO(lines), sep = '\t')

            self.elements = [ele for ele in self.data.columns[2:]]
            Label(self, text = 'Choose elements: ').pack()
            self.chosed = Checkbar(self, self.elements)
            self.chosed.pack()
            self.nextB = Button(self, text = 'go', command = self.on_next).pack(anchor = 'e', padx = (5,5))
            self.ele_name = None
            self.ele_index = None
            self.result = None
        except:
            pass

    def on_next(self):
        self.ele_index = list(self.chosed.state())
        self.ele_name = [self.elements[i] for i, v in enumerate(self.ele_index) if v > 0]

        if self.result is not None:
            self.result.destroy()
        self.result = ShowEDS(self, self.data, self.ele_index, self.ele_name, center = self.center)
        self.result.pack(side = 'bottom', fill="both", expand=True, pady = (15, 0))



# check buttons
class Checkbar(Frame):
   def __init__(self, parent=None, picks=[], side=LEFT, anchor=W):
      Frame.__init__(self, parent)
      self.vars = []
      for pick in picks:
         var = IntVar()
         var.set(1)
         chk = Checkbutton(self, text=pick, variable=var)
         chk.pack(side=side, anchor=anchor, expand=YES)
         self.vars.append(var)
   def state(self):
      return map((lambda var: var.get()), self.vars)


class ScrollFrame(Frame):
    def __init__(self, parent, height = 300, scroll = True):
        super().__init__(parent) # create a frame (self)

        self.canvas = Canvas(self, height = height, borderwidth=0 )          #place canvas on self
        self.viewPort = Frame(self.canvas)
        if scroll:                    #place a frame on the canvas, this frame will hold the child widgets
            self.vsb = Scrollbar(self, orient="vertical", command=self.canvas.yview) #place a scrollbar on self
            self.canvas.configure(yscrollcommand=self.vsb.set)                          #attach scrollbar action to scroll of canvas

            self.vsb.pack(side="right", fill="y")                                       #pack scrollbar to right of self
        self.canvas.pack(side="left", fill="both", expand=True)                     #pack canvas to left of self and expand to fil
        self.canvas.create_window((3,4), window=self.viewPort, anchor="nw",            #add view port frame to canvas
                                  tags="self.viewPort")

        self.viewPort.bind("<Configure>", self.onFrameConfigure)                       #bind an event whenever the size of the viewPort frame changes.

    def onFrameConfigure(self, event):
        '''Reset the scroll region to encompass the inner frame'''
        self.canvas.configure(scrollregion=self.canvas.bbox("all"))                 #whenever the size of the frame changes, alter the scroll region respectively.



