from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
import os

import choosefilesb
import rangeDrags
import p_calp

class P_import(Frame):
    def __init__(self, master):
        super().__init__(master)
        frame1 = Frame(self)
        self.energy_B =  Button(frame1, text = 'import Energy', command = lambda text = 'Energy': self.readfiles(text))
        self.direct_B = Button(frame1, text = 'import direct', command = lambda text = 'direct': self.readfiles(text))
        self.energy_L = Label(frame1)
        self.direct_L = Label(frame1)

        self.droplist = ttk.Combobox(frame1, state = 'readonly')
        self.droplist.bind('<<ComboboxSelected>>', self.on_select)

        self.energy_B.grid(row = 0, column = 0, padx = (5,5))
        self.direct_B.grid(row = 0, column = 1, padx = (5,5))
        self.droplist.grid(row = 0, column = 2, padx = (5,5))
        self.energy_L.grid(row = 1, column = 0, pady = (5,5), columnspan = 3, sticky = 'w')
        self.direct_L.grid(row = 2, column = 0, columnspan = 3, sticky = 'w')
        Button(frame1, text = 'select range', command = self.on_range).grid(row = 3, column = 0)
        Button(frame1, text = 'Preview', fg = 'blue', command = self.on_preview).grid(row = 3, column = 1)
        Button(frame1, text = 'Next', fg = 'red', command = self.on_next).grid(row = 3, column = 2)

        frame1.pack()

        self.f = Figure()
        self.ax_up = self.f.add_subplot(211)
        self.ax_down = self.f.add_subplot(212)
        self.canvas = FigureCanvasTkAgg(self.f, master = self)
        self.canvas.get_tk_widget().pack(side=TOP, fill=BOTH, expand=1)
        toolbar = NavigationToolbar2Tk(self.canvas, self)
        toolbar.update()

        self.x = None
        self.y = None
        self.line_up = None # original exp line
        self.line_down = None # constrained exp line
        self.drag = None # range drag widget
        self.index = None # select x range
        self.pos = None

    def on_next(self):
        if self.index is not None:
            w = Toplevel()
            p_calp.diff1(w, x = self.x, y = self.y, index = self.index)



    def on_range(self):
        if self.drag is None:
            self.drag = rangeDrags.RangeDrag(self, ax = self.ax_up)
            self.canvas.draw()


    def on_preview(self):
        if self.drag is not None:
            x_range = [float(i) for i in self.drag.getXrange().split(' - ')]
            self.index = np.logical_and(self.x >= x_range[0], self.x <= x_range[1])
            if self.line_down is not None:
                self.line_down.remove()
            self.line_down = self.ax_down.plot(self.x.to_numpy()[self.index], self.y.iloc[:,self.pos].to_numpy()[self.index.iloc[:,0].to_numpy()], color = 'blue', label = self.pos)[0]
            self.ax_up.set_title('Energy range: '+self.drag.getXrange(), color = 'blue')
            self.canvas.draw()

    def get_range_index(self):
        return self.index



    def readfiles(self, text):
        #2. get XRD from a csv file
        path = choosefilesb.OpenCSV(self).getFilePath()
        if len(path) != 0:
            # self.title = path
            basename = os.path.basename(path[0])
            # filebase = os.path.splitext(basename)[1]
            # self.config(text = os.path.splitext(basename)[0])
            try:
                if text == 'Energy':
                    self.x = pd.read_csv(path[0], sep = '\t')
                    if len(self.x) > 0:
                        self.energy_B.config(fg = 'blue')
                        self.energy_L.config(text = 'Energy: '+ os.path.splitext(basename)[0])
                elif text == 'direct':
                    self.y = pd.read_csv(path[0], sep = '\t')
                    if len(self.y) > 0:
                        self.direct_B.config(fg = 'blue')
                        self.direct_L.config(text = 'direct: '+ os.path.splitext(basename)[0])
            except:
                pass


        #add droplist
        if self.x is not None and self.y is not None:
            self.droplist.config(values = [i for i in range(1, len(self.y.iloc[0,:]) + 1)])


    def on_select(self, e):
        if self.line_up is not None:
            self.line_up.remove()
        self.pos = int(e.widget.get()) - 1
        self.line_up = self.ax_up.plot(self.x, self.y.iloc[:,self.pos], color = 'black', label = self.pos + 1)[0]
        self.ax_up.legend()
        self.canvas.draw()

        self.on_preview()



