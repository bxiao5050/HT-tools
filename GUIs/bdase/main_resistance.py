from tkinter import *
from tkinter import ttk
from scipy.signal import argrelextrema, find_peaks, savgol_filter

import pandas as pd
import numpy as np
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

import resistance

import p_import
from p_cal_new import P_cal_new
from auto_parameter_set import Auto_parameter_set

class Maink(Frame):
    def __init__(self, master):
        super().__init__(master)

        self.x0 = None
        self.y0 = None

        self.leftP = p_import.P_import(self)
        # self.rightP = resistance.InputData(self)
        self.rightP = None
        self.calB = Button(self, state = 'disabled')
        self.leftP.grid(row = 0, column = 0, padx = (5,5), sticky = 'nw')
        # self.rightP.grid(row = 0, column = 1, padx = (5,5), sticky = 'nw')
        self.calB.grid(row = 1, column = 0, padx = (5,5),  pady = (20,5), sticky = 'nw')

        #override
        for pos, b in self.leftP.wafer.pAB.items():
            b.config(command = lambda pos = pos: self.on_click(pos))

    def on_showResult(self, pos, section, x, y ):
        w = Toplevel()
        title = f'pos: {pos}, section: {section+1}'
        w.title(title)
        result = Auto_parameter_set(w, x, y, title = title, section = section + 1)
        result.get_pAData(self.leftP.pAData) # send Pos and Data for automation
        result.pack(fill = 'both', expand = True)
        #populate buttons for next step
        for pos, b in self.leftP.wafer.pAB.items():
            if b.cget('state' ) == 'normal':
                result.runRange.R3wf.wf.pAB.get(pos).config(relief = 'raised', state = 'normal')




    #override
    def on_click(self, pos):
        self.pos = pos
        self.leftP.wafer.buttonPress(pos)
        data = self.leftP.pAData.get(pos)
        x0 = data.iloc[:, 0].to_numpy()
        y0 = data.iloc[:, 1].to_numpy()

        #draw
        if self.rightP is not None:
            self.rightP.destroy()
        self.rightP = resistance.InputData(self, x0, y0)
        self.rightP.grid(row = 0, column = 1, padx = (5,5), sticky = 'nw')
        self.rightP.myPlot()
        self.rightP.config(text = f'pos: {pos}')
        #override radiobuttons
        for b in self.rightP.R:
            b.config(command = self.on_selection)

    def on_selection(self):
        section = self.rightP.var.get()
        [x, y] = self.rightP.line[section]
        self.calB.config(text = f'show result on section {section + 1}', state = 'normal',
            command = lambda pos = self.pos, section = section, x = x, y = y: self.on_showResult(pos,section, x, y))
        # print(section)






def main():
    root = Tk()
    root.title('resistance')
    app = Main(root)
    app.pack(side=TOP, fill=BOTH, expand=1)
    root.mainloop()

if __name__ == '__main__':
    main()
