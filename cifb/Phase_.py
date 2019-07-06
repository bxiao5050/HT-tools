
import matplotlib
matplotlib.use("TkAgg")
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
import matplotlib.pyplot as plt
from tkinter import filedialog
from mywidgets.figurePanel import plotFig
from mywidgets.treeviewXRD import treeCalXRD
from mywidgets.treeviewDataExp import treeviewExp
from mywidgets.wafer import wafer_visual
from auto.main_panel import MainResult

from auto.chooseRunRange import RunRange
from auto.autoResult import autoRes
from auto.phaseCom import Auto
from auto.showStatus import PhaseResultStatus

from auto.main_panel import MainResult
from auto.notebook_auto import Notebook_auto
from auto.autoMannually import AutoMannually
from usefulModules.waferCanvas import WaferCanvas
from menu.showeds import ShowEDS
from menu.showXRDPatterns import ShowXRDPatterns
from menu.showResult import ShowResult
from menu.unnormalized import Unnormalized
from menu.findReference.findReferenceFromPeak import FindReferenceFromPeak

from matplotlib import colors
from tkinter import *
from tkinter import ttk
from tkinter.filedialog import askopenfilenames
import pandas as pd
import numpy as np
import threading
import time
import os

from datetime import *


class MainAutoMenu(Frame):
    """ add Menu to main panel"""
    def __init__(self, master):
        super().__init__(master)
        # Tk.__init__(self, master)
        # ttk.Style().theme_use('clam')


        self.app = MainResult(master)

        #automation button
        self.app.BAuto.config(command = self.on_automation)
        self.app.BAuto.grid_forget()
        self.autoWindow = None # automation parameter window

        menu = Menu(master)
        master.config(menu=menu)

        importmanu = Menu(menu)
        menu.add_cascade(label="Import", menu=importmanu)
        importmanu.add_command(label="Import multiple .xy files", command=self.import_xy_files)
        importmanu.add_command(label="Import a single .csv file", command=self.import_single_csv)

        showmanu = Menu(menu)
        menu.add_cascade(label="Show", menu=showmanu)
        showmanu.add_command(label="Unnormalized data", command=self.unnormalized)
        showmanu.add_command(label="All XRD patterns", command=self.fullXRDPatterns)
        # showmanu.add_command(label="All XRD patterns", command=self.fullXRDPatterns)
        # showmanu.add_command(label="EDS (neeed EDS data)", command=self.showEDS)
        # showmanu.add_command(label="Phase matching results", command=self.show_result)

        automanu = Menu(menu)
        menu.add_cascade(label="Search/Match", menu=automanu)
        automanu.add_command(label="Automation", command=self.on_automation)
        automanu.add_command(label="Find references for a MA", command=self.mannully)



        # showmanu.add_command(label="EDS (neeed EDS data)", command=self.showEDS)

        # self.mainloop()
        # self.title("XRD phase identification" + self.app.dataExpPanel.title

    def unnormalized(self):
        w = Unnormalized(self, self.app.expData)


    def import_single_csv(self):
        self.app.on_readEXPfiles()


    def import_xy_files(self):
        files = askopenfilenames(parent=self,title='Choose a file', filetypes =[('xy file', '.xy')])
        sortedfile = sorted([f for f in self.tk.splitlist(files)])

        if len(sortedfile) == 0:
            return

        for index, f in enumerate(sortedfile):
            df = pd.read_csv(f, header = 0, sep = ' ')
            if index == 0:
                self.app.dataExpPanel.expData.insert(0, 'Angle', df.iloc[:,0])
                self.app.dataExpPanel.expData.insert(1, os.path.basename(f), df.iloc[:,1])
            else:
                self.app.dataExpPanel.expData.insert(index + 1, os.path.basename(f), df.iloc[:,1])

        #disable import button
        if self.app.dataExpPanel.expData is not None:
            self.app.dataExpPanel.readButton.config(state = 'disable')
        #populate treeview list
        for k, col in enumerate(self.app.dataExpPanel.expData.columns):
            if k != 0:
                self.app.dataExpPanel.insertItem(col)
        #popular the wafer buttons
        if self.app.dataExpPanel.expData is not None:
            x = self.app.dataExpPanel.expData.iloc[:, 0]
            xlim1, xlim2 = [min(x), max(x)]
            self.app.pCanvas.setXlim(xlim1, xlim2)
            self.app.pCanvas.useCursor()# cross cursor
            self.app.pCanvas.canvas_line.draw()
            for i in range(len(self.app.dataExpPanel.expData.columns) -1):
                pos = i + 1
                self.app.waferPanel.wafer.pAB[pos].config(state = 'normal', relief = 'raised')
            self.app.expData = self.app.dataExpPanel.expData


    #Auto Match button
    def on_automation(self):
        if self.autoWindow is None:
            self.autoWindow = Toplevel(self)
            self.autoWindow.title('Automation')
            note = Notebook_auto(self.autoWindow, app = self.app)
            note.pack()
            self.autoWindow.protocol('WM_DELETE_WINDOW', note.on_closeAll)
        else:
            self.autoWindow.update()
            self.autoWindow.deiconify()


    def fullXRDPatterns(self):
        data = self.app.getExpData()
        w = Toplevel(self)
        show = ShowXRDPatterns(w, data)
        show.pack(fill = 'both', expand = 0)
        w.protocol('WM_DELETE_WINDOW', lambda w=w: show.on_closeAll(w))


    def showEDS(self):
        # ShowEDS(Toplevel(self)).pack()
        w = Toplevel(self)
        show = ShowEDS(w)
        show.pack(fill = 'both', expand = 0)
        w.protocol('WM_DELETE_WINDOW', lambda w=w: show.on_closeAll(w))

    def mannully(self):
        data = self.app.getExpData()
        fileAndPatterns = self.app.dataCalPanel.getFileAndPatterns()
        w = Toplevel(self)
        w.title('Find reference from given peaks')
        auto = FindReferenceFromPeak(w, data,fileAndPatterns)
        auto.pack(fill = 'both', expand = 0)
        # w.protocol('WM_DELETE_WINDOW', lambda w=w: show.on_closeAll(w))

    def show_result(self):
        w = Toplevel(self)
        w.title('Phase matching results')
        auto = ShowResult(w)
        auto.pack(fill = 'both', expand = 0)






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
    root.title('Phase identification')
    MainAutoMenu(root).pack(fill='both', expand = True)
    root.mainloop()










