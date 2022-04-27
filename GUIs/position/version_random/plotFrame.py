import pandas as pd
import numpy as np
from tkinter import *
import matplotlib.pyplot as plt
import matplotlib
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

class PlotFrame(Frame):
    def __init__(self, master, totalNum = 5, colNum = 3):
        super().__init__(master)
        self.totalNum = totalNum
        self.colNum = colNum

        self.f = {}
        self.ax = {}
        self.canvas = {}
        self.subFrame = {}

        # self.scatterCanvas = [Canvas(self, width = 40, height = 40) for i in range(self.totalNum)]

        num = 0
        row = 0
        col = 0
        for num in range(self.totalNum):
            if num%colNum == 0:
                row += 1
                col = 0
            self.scatterFrame(num).get_tk_widget().grid(row = row, column = col+1)
            # toolbarFrame = Frame(self)
            # toolbarFrame.grid(row = row +1 , column = col+1)
            # toolbar = NavigationToolbar2Tk(self.canvas.get(num), toolbarFrame)
            # toolbar.update()
            num += 1
            col += 1

    def scatterFrame(self, num):
        # self.f[num] = Figure(figsize = (10, 9))
        self.f[num] = Figure(figsize = (3.8, 3))
        self.ax[num] = self.f.get(num).add_subplot(111)
        self.canvas[num] = FigureCanvasTkAgg(self.f.get(num), master = self)
        # self.canvas.get(num).figure.canvas.mpl_connect('button_press_event', self.onclick)
        return self.canvas.get(num)

    def onclick(self, event):
        click = event.xdata, event.ydata
        if None not in click: # clicking outside the plot area produces a coordinate of None, so we filter those out.
            print('x = {}, y = {}'.format(*click))
            # coords.append(click)



    def plotScatter(self, i, x, y, c, marker = 's', title = '',
                x_empty = None, y_empty = None, x_surround = None, y_surround = None):
        ax = self.ax.get(i)
        f = self.f.get(i)
        canvas = self.canvas.get(i)
        # plot empty data, if exist
        if x_empty is not None:
            ax.scatter(x_empty, y_empty, c = 'black', s=5, marker = '.')
        # plot empty data, if exist
        if x_surround is not None:
            ax.scatter(x_surround, y_suround, c = 'gray', s=5, marker = 's')
        cax = ax.scatter(x, y, c = c, s = 30, marker = marker, cmap = 'jet')
        cbar = self.f.get(i).colorbar(cax, ax = ax, ticks = np.round(np.linspace(c.min(), c.max(), 8, endpoint = True), 2))
        cbar.ax.set_title('at.%', fontsize = 8)

        ax.set_title(title, fontsize = 8)
        canvas.draw()


