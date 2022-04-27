from tkinter import *
from tkinter import ttk
from tkinter import messagebox
from scipy.signal import argrelextrema, find_peaks, savgol_filter, peak_widths
import math
from scipy.ndimage.filters import gaussian_filter1d
import pandas as pd
import numpy as np
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from scipy.interpolate import splrep, sproot, splev

class MultiplePeaks(Exception): pass
class NoPeaksFound(Exception): pass

import resistance

class P_cal(LabelFrame):
    def __init__(self, master, x0 = None, y0 = None):
        super().__init__(master)
        # data = pd.read_csv('first batch\\_test_1_-13500_9000.csv', header = 1)
        if x0 is None:
            self.x0, self.y0 = resistance.InputData(master).line[4]
        else:
            self.x0, self.y0 = x0, y0


        #para
        # self.sampleNum = 600
        self.polynorm1 = 59
        self.polynorm2 = 3

        paraF = Frame(self)

        # sampleNum_l = Label(paraF, text = 'sample Num')
        # self.sampleNum_e = Entry(paraF)
        # self.sampleNum_e.insert(0, self.sampleNum)

        polynorm1_l = Label(paraF, text = 'polynorm1')
        self.polynorm1_e = Entry(paraF)
        self.polynorm1_e.insert(0, self.polynorm1)

        polynorm2_l = Label(paraF, text = 'polynorm2')
        self.polynorm2_e = Entry(paraF)
        self.polynorm2_e.insert(0, self.polynorm2)

        # sampleNum_l.grid(row = 0, column = 0, padx = (5,5))
        # self.sampleNum_e.grid(row = 0, column = 1, padx = (5,5))
        polynorm1_l.grid(row = 1, column = 0, padx = (5,5))
        self.polynorm1_e.grid(row = 1, column = 1, padx = (5,5))
        polynorm2_l.grid(row = 2, column = 0, padx = (5,5))
        self.polynorm2_e.grid(row = 2, column = 1, padx = (5,5))
        Button(paraF, text = 're-cal', command = self.on_OK).grid(row = 2, column = 2, padx = (5,5))

        #show result
        self.inf = Label(paraF)
        self.inf.grid(row = 0, column = 3, rowspan = 3, padx = (5,5), sticky = 'nw')

        paraF.pack()

        f2 = Figure()
        self.canvas2 = FigureCanvasTkAgg(f2, master = self)
        self.canvas2.get_tk_widget().pack(fill=BOTH, expand=1)
        toolbar = NavigationToolbar2Tk(self.canvas2, self)
        toolbar.update()
        self.ax_topl = f2.add_subplot(221)
        self.ax_topr = f2.add_subplot(222)
        # self.ax_down = f2.add_subplot(223)
        self.ax_bottom = f2.add_subplot(2,2,(3,4))
        self.line_log = None

        self.cal(self.x0, self.y0)

    def cal(self, x0, y0):
        if self.line_log is not None:
            self.ax_topl.clear()
            self.ax_topr.clear()
            # self.ax_down.clear()
            self.ax_bottom.clear()

        xvals = np.linspace(min(self.x0), max(self.x0), num = len(self.x0))
        self.y1 = np.interp(xvals, self.x0, self.y0)
        self.x1 = xvals

        # y_log = np.log10(self.y0)
        y_log = np.log10(self.y0)

        #smooth method 1
        y_smooth = savgol_filter(y_log, int(self.polynorm1_e.get()), int(self.polynorm2_e.get()))
        #smooth method 2
        # y_smooth = gaussian_filter1d( y_log, sigma=25)

        x_de, y_de = self.derivative(self.x1, y_smooth)

        #find lowest point
        #1. smooth again, then flip
        yy = -savgol_filter(y_de, 99, 3)
        peaks, _ = find_peaks(yy)
        #find fwhm
        results_half = peak_widths(yy, peaks, rel_height=0.5)

        self.ax_topl.plot(self.x0, self.y0)
        # self.ax_topl.set_ylabel('normal')
        self.line_log = self.ax_topr.plot(self.x0, y_log)[0]
        self.ax_topr.plot(self.x1, y_smooth, ':', color = 'red')

        self.ax_topr.set_ylabel('log, smooth')
        self.ax_bottom.plot(x_de, y_de) # fliped derivative curve
        self.ax_bottom.plot(x_de[peaks], y_de[peaks], 'rx') # peaks
        self.ax_bottom.set_ylabel('log + FWHM')

        print(results_half)
        # Tc = np.round(x_de[peaks][0], 4)
        try:
            left = x_de[int(results_half[2])]
            right = x_de[int(results_half[3])]
            self.ax_bottom.hlines(-results_half[1], left, right)
            self.ax_bottom.bar((right + left)/2, self.ax_bottom.get_ylim(),  color = 'g', width = (right - left), alpha = 0.3)
            self.canvas2.draw()
            self.inf.config(text = f'R_max: {np.round(max(self.y0), 2)};  R_min: {np.round(min(self.y0), 2)}' +'\n' + \
                f'delta_R (R_max/R_min): {np.round(max(self.y0)/min(self.y0), 3)}' +'\n' + \
                # f'Tc: {Tc}'+'\n' + \
                f'FWHM: {abs(np.round(right - left, 3))}', justify = 'left')

        except TypeError:
            # self.inf.config(text = 'fail, try different parameters')
            self.canvas2.draw()


    def derivative(self, x, y):
        y_de = np.diff(y) / np.diff(x)
        x_de = (np.array(x)[:-1] + np.array(x)[1:]) / 2
        return (x_de, y_de)

    def on_OK(self):
        self.cal(self.x0, self.y0)




