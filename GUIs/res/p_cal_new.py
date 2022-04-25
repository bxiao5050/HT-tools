from tkinter import *
from tkinter import filedialog


import pandas as pd
import numpy as np
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

from scipy.signal import chirp, find_peaks, peak_widths
from scipy.optimize import curve_fit, leastsq
from scipy import asarray as ar,exp
from loess.loess_1d import loess_1d
import resistance
from Algorithm_smooth.cookb_signalsmooth import smooth
from astropy import modeling

from smooth_para import Smooth_para
from fit_para import Fit_para
from rangeDragk import RangeDrag

class P_cal_new(LabelFrame):
    def __init__(self, master, x = None, y = None, isPeak = True):
        super().__init__(master)
        self.isPeak = isPeak # peak or valley
        if x is None:
            x, y = resistance.InputData(master).line[4]
        self.x0, indices = np.unique(x, return_index = True) #get unique
        self.y0 = y[indices]

        self.initialization()

    def initialization(self):
        leftF = Frame(self)
        rightF = Frame(self)

        leftF.pack(side = 'left',fill = 'both', expand = 1)
        rightF.pack(fill = 'both', expand = 1)
        fig = Figure(figsize=(8,8))
        self.canvas = FigureCanvasTkAgg(fig, master = leftF)
        self.canvas.get_tk_widget().pack(fill=BOTH, expand=1)
        toolbar = NavigationToolbar2Tk(self.canvas, leftF)
        toolbar.update()
        self.ax_topl = fig.add_subplot(221)
        self.ax_topr = fig.add_subplot(222)
        self.ax_bottom = fig.add_subplot(2,2,(3,4))

        # self.fwhm_line = None
        # self.fitlines = []

        #original
        self.ax_topl.plot(self.x0, self.y0, label = 'original', linewidth = 2, color = 'black')
        self.ax_topl.legend()
        #log
        self.log_y0 = np.log10(self.y0)
        self.ax_topr.plot(self.x0, self.log_y0, 'k-', label = 'log', linewidth =3)
        #loess smooth
        x, self.smooth_y0, weights = loess_1d(self.x0, self.log_y0, frac = 0.05)
        # self.smooth_y0 = smooth(self.log_y0)
        self.ax_topr.plot(self.x0, self.smooth_y0, 'r:', label = 'smooth')[0]
        self.ax_topr.legend()

        #bottom axis
        #derivative
        self.smooth_deriv = np.gradient(self.smooth_y0, self.x0)
        self.ax_bottom.plot(self.x0, self.smooth_deriv, 'k.', label = 'log + drivative')
        # # polynominal fitting
        # f = np.poly1d(np.polyfit(self.x0,self.smooth_deriv,22))
        # self.curveFitting = f(self.x0)


        # right panel
        self.sommth_p =  Smooth_para(rightF,self.x0, self.log_y0, mycanvas = False)
        self.sommth_p.ok_B.grid_forget()
        self.sommth_p.grid(row = 0, column = 0, pady = (5,5), sticky = 'nw')

        self.fit_p =  Fit_para(rightF,self.x0, self.smooth_deriv)
        self.fit_p.grid(row = 1, column = 0, pady = (5,5), sticky = 'nw')

        Button(rightF, text = 'Apply', command = self.on_OK).grid(row = 2, column = 1, pady = (5,5))
        self.inf = Label(rightF)
        self.inf.grid(row = 3, column = 0, columnspan = 2, pady = (15,5))
        Button(rightF, text = 'export this data', fg = 'blue', command = self.on_export).grid(row = 4, column = 0, pady = (15,0))

        #draggable for the bottom axis
        self.drag = RangeDrag(self, color = 'green', ax = self.ax_bottom, startPos_left = min(self.x0),startPos_right = max(self.x0))

        x_range = [float(i) for i in self.drag.getXrange().split(' - ')]
        self.index_range = np.logical_and(self.x0 >= x_range[0], self.x0 <= x_range[1])

        # #gaussian fitting
        x, y = self.x0, self.smooth_deriv
        mean = sum(x * y) / sum(y)
        sigma = np.sqrt(sum(y * (x - mean)**2) / sum(y))
        # sigma = np.sqrt(sum(y * (x - mean)**2) )
        def Gauss(x, aa, a, x0, sigma):
            return aa  + a*np.exp(-0.5*((x-x0)/sigma)**2)
        popt,pcov = curve_fit(Gauss, x, y, p0=[-0.01,  np.absolute(max(y)-min(y)), mean, sigma])
        self.curveFitting = Gauss(x,*popt)
        self.fwhm_gaussian = abs(np.round(2*popt[3]*np.sqrt(2*np.log(2)),3 ))#FWHM = 2*sigma*sqrt(2Ln2)

        self.ax_bottom.plot(self.x0, self.curveFitting, color = 'orange',label='gaussian fit')

        #fitting results
        self.fitting(self.x0, self.curveFitting)
        self.ax_bottom.legend()


    def on_export(self):
        filename = filedialog.asksaveasfilename(filetypes=[('Text File', '*.csv')])
        x_range = [float(i) for i in self.drag.getXrange().split(' - ')]
        self.index_range = np.logical_and(self.x0 >= x_range[0], self.x0 <= x_range[1])
        d = {'x': self.x0[self.index_range], 'y':self.y0[self.index_range], 'log(y)':self.log_y0[self.index_range], 'log(y)+smooth':self.smooth_y0[self.index_range], 'y_derivative':self.smooth_deriv[self.index_range], f'y_{self.fit_p.fit}':self.curveFitting[self.index_range]}
        dt = pd.DataFrame(data = d)
        dt.to_csv(filename + '.csv', index = False)


    def on_OK(self):

        x_range = [float(i) for i in self.drag.getXrange().split(' - ')]
        self.index_range = np.logical_and(self.x0 >= x_range[0], self.x0 <= x_range[1])


        #smooth para
        self.sommth_p.on_OK(self.x0, self.log_y0)
        self.smooth_y0 = self.sommth_p.get_smoothed()

        self.plot()

    def plot(self):
        self.ax_topr.clear()
        self.axClear_lines()
        # self.ax_bottom.clear()
        #log
        self.log_y0 = np.log10(self.y0)
        self.ax_topr.plot(self.x0, self.log_y0, 'k-', label = 'log', linewidth =3)
        self.ax_topr.plot(self.x0, self.smooth_y0, 'r:', label = 'smooth')
        self.ax_topr.legend()

        #bottom axis
        #derivative
        if self.sommth_p.smooth == 'Savitzky Golay' or self.sommth_p.smooth == 'FFT':
            self.smooth_deriv = np.gradient(self.smooth_y0)
        elif self.sommth_p.smooth ==  'loess' or self.sommth_p.smooth == 'lowess':
            self.smooth_deriv = np.gradient(self.smooth_y0, self.x0)
        self.ax_bottom.plot(self.x0, self.smooth_deriv, 'k.', label = 'log + drivative')

        #gaussian fit
        self.setFit()

        self.drag = RangeDrag(self, color = 'green', ax = self.ax_bottom, startPos_left = self.drag.getRangeV()[0], startPos_right = self.drag.getRangeV()[1])
        self.ax_bottom.legend()
        self.canvas.draw()


    def setFit(self):
        y = self.smooth_deriv[self.index_range]
        x = self.x0[self.index_range]
        self.fit_p.set_inputXY(x, y)
        self.curveFitting = self.fit_p.get_fitting()
        self.fwhm_gaussian = self.fit_p.fwhm_gaussian if self.fit_p.fit == 'Gaussian fit' else None

        self.ax_bottom.plot(x, self.curveFitting, color = 'orange',label= self.fit_p.fit)

        self.fitting(x, y)

    def fitting(self, x, y):
        yy = -self.curveFitting if self.isPeak  else self.curveFitting
        peaks, _ = find_peaks(yy)
        peak = np.where(y == min(y[peaks]))[0]
        results_half = peak_widths(yy, peak, rel_height=0.5)
        results_full = peak_widths(yy, peak, rel_height=1)


        left = x[int(results_half[2])]
        right = x[int(results_half[3])]
        left_full = x[int(results_full[2])]
        right_full = x[int(results_full[3])]

        self.ax_bottom.plot(x[peak], -yy[peak], "x", markerfacecolor='red', marker="X", markeredgecolor="white", markersize=12, markeredgewidth = 2,alpha = 0.8, label = 'extreme point')
        self.ax_bottom.hlines(-results_half[1], left, right, color = 'C3', label = 'fwhm')
        self.ax_bottom.hlines(-results_full[1], left_full, right_full, 'b', label = 'full width')

        R_min, R_max = np.round(min(self.y0),3), np.round(max(self.y0),3)
        delta_R = np.round(R_max/R_min, 3)
        fwhm = self.fwhm_gaussian if self.fit_p.fit == 'Gaussian fit' else round(np.absolute(right - left), 2)
        text = f'Rmin: {R_min}' + '\n'+ f'Rmax: {R_max}' + '\n'+ f'delta_R: {delta_R}' + '\n'+ f'extreme point (Tc): x{x[peak]}, y{yy[-peak]}' + '\n'+ f'FWHM: {fwhm}' + '\n' +f'full width: {round(np.absolute(right_full - left_full),2)}' + '\n'
        self.inf.config(text = text, justify = 'left')



    def axClear_lines(self):
        for artist in self.ax_bottom.lines + self.ax_bottom.patches:
            artist.remove()
            del artist
        self.ax_bottom.clear()



    def derivative(self, x, y):
        y_de = np.diff(y) / np.diff(x)
        x_de = (np.array(x)[:-1] + np.array(x)[1:]) / 2
        return (x_de, y_de)



def main():
    root = Tk()
    P_cal_new(root).pack(fill=BOTH, expand=1)
    root.mainloop()

if __name__ == '__main__':
    main()
