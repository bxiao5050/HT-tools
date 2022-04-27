import numpy as np
import pandas as pd
from scipy import signal
import matplotlib.pyplot as plt
from matplotlib import cm, colors
from tkinter import *
from tkinter import filedialog
import os
import threading
import time
import pickle
from tkinter import messagebox

from sWaferoo import SWafer
from choosefilest import Openf
from myPlot0t import MyPlot

from GUIs.res.autoCall import AutoCal
from datetime import *




class ImportPanel(Frame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master

        # data = pd.read_csv('Ambios_Sigurd\\140714_K2_1_001.dat', skiprows = 6)

        self.listbox = Listbox(self, width = 40, height = 20)

        self.importB = Button(self, text = 'import data', command = self.on_import)
        self.wafer = SWafer(self)
        self.pAData = {} #pos and data

        self.showResult = MyPlot(self) #prepare to plot result
        self.inF = Label(self) #result information

        self.importB.grid(row = 0, column = 0, padx = (5,5), pady = (5,5), sticky = 'nw')
        Button(self, text = 'import project', command = self.on_import_project, bg = 'blue', fg = 'white').grid(row = 0, column = 1, padx = (5,5), pady = (5,5), sticky = 'nw')
        self.listbox.grid(row = 1, column = 0, columnspan =2, padx = (5,5), pady = (5,5), sticky = 'n')
        self.wafer.grid(row = 2, column = 0, columnspan =2, padx = (5,5), pady = (5,5), sticky = 'nw')
        self.inF.grid(row = 3, column = 0, columnspan =2, padx = (5,5), pady = (5,5), sticky = 'nw')
        self.showResult.grid(row = 0, column = 2, rowspan = 4, padx = (5,5), pady = (5,5), sticky = 'news')
        Button(self, text = 'next', command = self.on_showResult).grid(row = 4, column = 0, padx = (5,5), pady = (5,5), sticky = 'n')

        Grid.rowconfigure(master, 0, weight=1)
        Grid.columnconfigure(master, 0, weight=1)


        Grid.rowconfigure(self, 0, weight = 1)
        Grid.rowconfigure(self, 1, weight = 1) # listbox
        Grid.columnconfigure(self, 2, weight = 1) # canvas

    def on_import_project(self):
        filename = filedialog.askopenfilename(title = "Select *.thickness file",filetypes = (("thickness project","*.thickness"),("all files","*.*")))
        if len(filename) == 0: return
        with open(filename, 'rb') as f:
            self.master.withdraw()
            pAData, results, results_constrained, range_and_boundary, drag_range, line_drag = pickle.load(f)
            autoWindow2 = AutoCal(pAData, self.master, filename)
            # autoWindow2.assign_variables(pAData, results, results_constrained, range_and_boundary, drag_range)
            threading.Thread(target = lambda pAData=pAData, results=results, results_constrained=results_constrained, range_and_boundary=range_and_boundary, drag_range=drag_range: autoWindow2.assign_variables(pAData, results, results_constrained, range_and_boundary, drag_range, line_drag)).start()


    def on_showResult(self):
        self.master.withdraw()
        autoWindow = AutoCal(self.pAData, self.master)
        drag_h1,drag_l,drag_h2 = [v for v in self.showResult.getPara().values()]
        threading.Thread(target=lambda drag_h1=drag_h1,drag_l=drag_l,drag_h2=drag_h2: autoWindow.on_auto(drag_h1,drag_l,drag_h2)).start()


    def on_import(self):
        paths = Openf(self).getFilePaths()
        if len(paths) > 0:
            self.importB.config(state = 'disabled')

            for path in paths:
                basename = os.path.basename(path)
                # self.directoryname = os.path.dirname(path)
                filename = os.path.splitext(basename)[0]
                self.listbox.insert('end', filename)
                pos = int(filename[-3: ])
                data = pd.read_csv(path, skiprows = 6)

                self.pAData[pos] = data
                self.wafer.pAB.get(pos).config(relief = 'raised', command = lambda pos = pos: self.on_plot(pos))

    def on_plot(self, pos):
        self.wafer.buttonPress(pos)
        self.showResult.canvasPlot(self.pAData.get(pos), pos)
        if self.showResult.getThickness() is not None:
            self.inF.config(text = f'thickness: {self.showResult.getThickness()}')


def main():
    with open('qixian.py') as fp:
        lines = fp.readlines()
        for line in lines:
            if 'qixian' in line:
                return


    with open('qixian.py', 'r+') as fp:
        lines = fp.readlines()
        for line in lines:
            if '..' in line:
                # print(line.strip())
                if datetime.today().date()> datetime.strptime(line.strip().replace('..',''), '%y.%m.%d').date():
                    fp.write('qixian')
                    return

    root = Tk()
    app = ImportPanel(root)
    root.title('thickness')
    app.pack(fill = 'both', expand = True)
    root.mainloop()

if __name__ == '__main__':
    main()




