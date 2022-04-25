
import pandas as pd
import numpy as np
from tkinter import *
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from tkinter.filedialog import askopenfilenames, askopenfilename
import os

class ShowResult(Frame):

    def __init__(self, *args, **kwargs):

        Frame.__init__(self, *args, **kwargs)


        self.frames = {}
        self.b = {}
        bFrame = Frame(self)
        container = Frame(self)

        bFrame.pack()
        container.pack( fill="both", expand = True)

        for i, count in enumerate([1, 2, 3]):
            self.b[count] = Button(bFrame, text = count, command = lambda count = count: self.show_panel(count))
            self.b.get(count).grid(row = 0, column = i, padx = (5,5), pady = (5, 20))
            self.frames[count] = Result_panel(container)
            self.frames.get(count).grid(row=0, column=0, sticky="nsew")

        self.show_panel(1)

    def show_panel(self, count):
        frame = self.frames[count]
        frame.tkraise()
        for b in self.b.values():
            b.config(relief = 'raised')
        self.b.get(count).config(relief = 'sunken')


class Result_panel(Frame):
    def __init__(self, master, **kw):
        Frame.__init__(self, master, **kw)
        coordinates = pd.read_csv('Coords.csv')
        addB = Button(self, text = '>', fg = 'red', command = self.on_addScatter)
        self.scatterF = Frame(self)

        self.scatterF.pack(side = 'left')
        addB.pack(side = 'right')

        self.num = 0
        self.row = 0
        self.col = 0

    def on_addScatter(self):
        if self.num%5 == 0:
            self.row += 1
            self.col = 0
        Result_scatter(self.scatterF).grid(row = self.row, column = self.col+1)
        self.num += 1
        self.col += 1




class Result_scatter(Frame):
    def __init__(self, master, **kw):
        Frame.__init__(self, master, **kw)


        self.importB = Button(self, text = 'import data', command = self.on_import)
        self.importB.grid(row = 0, column = 0)
        self.importBLegend = Button(self, text = '!', fg = 'blue', command = self.on_importLegend)
        self.importBLegend.grid(row = 0, column = 1)

        self.f = Figure(figsize=(3,3), dpi=100)
        self.ax = self.f.add_subplot(111, picker = True)

        self.ax.axis('off')
        self.canvas = FigureCanvasTkAgg(self.f, master=self)
        self.canvas.get_tk_widget().grid(row = 1, column = 0, columnspan = 2, sticky = 'news')
        self.cax = None
        self.im = None



    def on_import(self):

        self.ax.clear()
        self.ax.axis('off')

        path = OpenCSV(self).getFilePath()
        if len(path) != 0:
            self.title = path
            basename = os.path.basename(path[0])
            filebase = os.path.splitext(basename)[1]
            self.ax.set_title(os.path.splitext(basename)[0], fontsize = 16)
        if len(path) != 0 and filebase == '.csv':
            resultData = pd.read_csv(path[0])

        coordinates = pd.read_csv('Coords.csv')

        self.cax= self.ax.scatter(coordinates.values[:,1][0:len(resultData)], coordinates.values[:,2][0:len(resultData)], c = resultData.iloc[:,1], s=30, marker = 's',cmap='rainbow')
        self.canvas.draw()

    def on_importLegend(self):

        self.ax.clear()
        self.ax.set_xticks([])
        data = np.arange(0, 1010 , 1).reshape(101, 10)
        self.im = self.ax.imshow(data, cmap = 'rainbow', origin = 'lower')
        self.ax.set_title('probability%')
        # self.cbar = self.f.colorbar(im, ax = self.ax)
        # self.cbar.ax.set_title('per%')
        self.canvas.draw()

class OpenCSV(Frame):
    def __init__(self,master, **kw):
        Frame.__init__(self, **kw)
        #self.withdraw() #hide the window
        self.filez = askopenfilename(parent=master ,title='Choose a csv file', filetypes = (("csv files","*.csv"),("all files","*.*")))

    def getFilePath(self):
        s = []
        s.append(self.filez)
        return s


