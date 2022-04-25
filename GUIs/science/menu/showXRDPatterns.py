from usefulModules.waferCanvas import WaferCanvas
from usefulModules.choosefiles import OpenCSV
import matplotlib
matplotlib.use("TkAgg")
from matplotlib import colors
from matplotlib.figure import Figure
from matplotlib import cm
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
import matplotlib.pyplot as plt

from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
import threading
import time

class ShowXRDPatterns(WaferCanvas):
    def __init__(self, master, data, **kw):
        WaferCanvas.__init__(self, master, **kw)
        self.data = data

        #show zoomed in
        CFrame = Canvas(self, width = 400, height = 400, bg = 'white')
        self.waferF.grid(row = 0, column = 0, rowspan = 2, sticky = 'e')
        CFrame.grid(row = 1, column = 1, sticky = 'n')
        canvas_fig = Figure(figsize = (4, 4))
        self.canvas_ax = canvas_fig.add_subplot(111)
        self.canvas = FigureCanvasTkAgg(canvas_fig, master = CFrame)
        self.canvas.get_tk_widget().pack()

        #override wafer canvas bind
        for pos in self.getPAC():
            self.pAC.get(pos).bind("<Enter>", lambda event, pos = pos: self.on_enter(event, pos))

        self.on_BExpPiechart()

    def on_BExpPiechart(self):
        threading.Thread(target=self.plotPiechart).start()


    #plot pie chart
    def plotPiechart(self):
        for pos in range(1, len(self.data.columns)):
            fig = Figure(figsize = (0.42, 0.42))
            ax = fig.add_subplot(111)

            ax.plot(self.data.iloc[:,0], self.data.iloc[:,pos])

            FigureCanvasTkAgg(fig, master = self.pAC[pos]).get_tk_widget().pack()
            ax.set_xticks([])
            ax.set_yticks([])
            fig.subplots_adjust( wspace=0, hspace=0)
            time.sleep(0.01)

    def on_enter(self,e, pos):
        self.l2.configure(text= pos)
        self.canvas_ax.clear()
        try:
            self.canvas_ax.plot(self.data.iloc[:,0], self.data.iloc[:,pos])
            self.canvas.draw()
        except IndexError:
            pass















