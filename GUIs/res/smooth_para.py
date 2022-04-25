from tkinter import *
from tkinter import ttk

import pandas as pd
from math import ceil
import numpy as np
from scipy import linalg
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

import resistance
from Algorithm_smooth.cookb_signalsmooth import smooth
from Algorithm_smooth.savitzkyGolay import savitzky_golay
from loess.loess_1d import loess_1d

class Smooth_para(LabelFrame):
    def __init__(self, master, x = None, y = None, mycanvas = True):
        super().__init__(master)
        self.config(text = 'set smooth parameters', fg = 'blue')


        self.mycanvas = mycanvas

        if x is None:
            x, y = resistance.InputData(master).line[4]

        self.upF = Frame(self)
        figF = Frame(self)
        self.upF.pack(fill = 'both', side = 'top', expand = True)
        figF.pack(fill = 'both', side = 'bottom', expand = True)

        self.smoothChoose = ttk.Combobox(self.upF, values = ['Savitzky Golay', 'FFT', 'loess', 'lowess'])
        self.smoothChoose.bind("<<ComboboxSelected>>", lambda event, x = x, y = y: self.callbackFunc(event, x, y))
        self.smoothChoose.current(2)
        self.paraF_1D = LabelFrame(self.upF, text ='set parameters')
        self.paraF_savitzky = LabelFrame(self.upF, text ='set parameters')
        self.paraF_loess = LabelFrame(self.upF, text ='set parameters')
        #
        if self.mycanvas:
            #fig panel
            fig = Figure()
            self.canvas = FigureCanvasTkAgg(fig, master = figF)
            self.canvas.get_tk_widget().pack(fill=BOTH, expand=1)
            toolbar = NavigationToolbar2Tk(self.canvas, figF)
            toolbar.update()
            self.ax = fig.add_subplot(111)

        # FFT panel
        Label(self.paraF_1D, text ='window lenth (odd number):').grid(row = 0 , column = 0, padx = (5,5), pady = (5, 10))
        self.win_len = Entry(self.paraF_1D)
        self.win_len.insert(0, '11')
        self.win_len.grid(row = 0, column = 1)
        Label(self.paraF_1D, text ='window type:').grid(row = 1 , column = 0, padx = (5,5))
        self.win_type = ttk.Combobox(self.paraF_1D, values = ['flat', 'hanning', 'hamming', 'bartlett', 'blackman'])
        self.win_type.current(1)
        self.win_type.grid(row = 1, column = 1)
        # Savitzky Golay panel
        Label(self.paraF_savitzky, text ='window lenth (odd number):').grid(row = 0 , column = 0, padx = (5,5), pady = (5, 10))
        self.window_size = Entry(self.paraF_savitzky)
        self.window_size.insert(0, '41')
        self.window_size.grid(row = 0, column = 1)
        Label(self.paraF_savitzky, text ='order:').grid(row = 1 , column = 0, padx = (5,5))
        self.order = Entry(self.paraF_savitzky)
        self.order.insert(0, '4')
        self.order.grid(row = 1, column = 1)
        #loess panel
        Label(self.paraF_loess, text ='span (0-1):').grid(row = 0 , column = 0, padx = (5,5))
        self.span = Entry(self.paraF_loess)
        self.span.insert(0, '0.05')
        self.span.grid(row = 0 , column = 1, padx = (5,5))


        self.smooth = 'loess'  #initialization
        self.paraPanel_loess(x,y)

        self.smoothChoose.grid(row = 0, column = 0, columnspan = 3, pady =(5,5))
        self.ok_B = Button(self.upF, text = 'OK', command =lambda x = x, y= y: self.on_OK(x, y))
        self.ok_B.grid(row = 2, column = 2, padx =(5,5), sticky = 'ne')
        self.plot(x, y)
        self.plot(x, y)

#change panel outlook
    def callbackFunc(self, event, x,y):
        self.smooth = self.smoothChoose.get()
        if self.smooth == 'FFT':
            self.paraPanel_1D(x,y)
        elif self.smooth == 'Savitzky Golay':
            self.paraPanel_savitzky(x,y)
        elif self.smooth == 'loess' or self.smooth == 'lowess':
            self.paraPanel_loess(x,y)

    def paraPanel_loess(self, x,y):
        self.paraF_savitzky.grid_forget()
        self.paraF_1D.grid_forget()
        self.paraF_loess.grid(row = 1, column = 2, padx =(5,5))

        self.plot(x, y)
        #paremeter panel
    def paraPanel_1D(self, x, y):
        self.paraF_savitzky.grid_forget()
        self.paraF_loess.grid_forget()
        self.paraF_1D.grid(row = 1, column = 2, padx =(5,5))

        self.plot(x, y)

    def paraPanel_savitzky(self, x, y):
        self.paraF_1D.grid_forget()
        self.paraF_loess.grid_forget()
        self.paraF_savitzky.grid(row = 1, column = 2, padx =(5,5))

        self.plot(x, y)

    def plot(self, x, y ):
        if self.mycanvas:
            self.ax.clear()
        if self.smooth == 'FFT':
            self.smooth_y = smooth(y, window_len=int(self.win_len.get()), window= self.win_type.get())
        elif self.smooth == 'Savitzky Golay':
            self.smooth_y = savitzky_golay(y, window_size=int(self.window_size.get()), order= int(self.order.get()))
        elif self.smooth == 'loess':
            x, self.smooth_y, weights = loess_1d(x, y, frac = float(self.span.get()))
        elif self.smooth == 'lowess':
            self.smooth_y = self.lowess(x, y, f = float(self.span.get()))

        if self.mycanvas:
            self.ax.plot(x, y, 'b', label = 'original')
            self.ax.plot(x, self.smooth_y, 'r:', label = 'smooth')
            self.ax.legend()
            self.canvas.draw()



    def on_OK(self, x, y):
        self.plot(x, y)

    def get_smoothed(self):
        return self.smooth_y


    def lowess(self, x, y, f=2. / 3., iter=3):
        n = len(x)
        r = int(ceil(f * n))
        h = [np.sort(np.abs(x - x[i]))[r] for i in range(n)]
        w = np.clip(np.abs((x[:, None] - x[None, :]) / h), 0.0, 1.0)
        w = (1 - w ** 3) ** 3
        yest = np.zeros(n)
        delta = np.ones(n)
        for iteration in range(iter):
            for i in range(n):
                weights = delta * w[:, i]
                b = np.array([np.sum(weights * y), np.sum(weights * y * x)])
                A = np.array([[np.sum(weights), np.sum(weights * x)],
                              [np.sum(weights * x), np.sum(weights * x * x)]])
                beta = linalg.solve(A, b)
                yest[i] = beta[0] + beta[1] * x[i]
            residuals = y - yest
            s = np.median(np.abs(residuals))
            delta = np.clip(residuals / (6.0 * s), -1, 1)
            delta = (1 - delta ** 2) ** 2
        return yest



def main():
    root = Tk()
    Smooth_para(root).pack(fill=BOTH, expand=1)
    root.mainloop()

if __name__ == '__main__':
    main()
