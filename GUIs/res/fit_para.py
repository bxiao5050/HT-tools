from tkinter import *
from tkinter import ttk
from scipy.signal import chirp, find_peaks, peak_widths
from scipy.optimize import curve_fit, leastsq
from scipy import asarray as ar,exp
import numpy as np
import pandas as pd

class Fit_para(LabelFrame):
    def __init__(self, master, x=None, y=None):
        super().__init__(master)

        self.config(text = 'set fiting parameters',fg = 'blue')

        self.x, self.y = x, y


        self.smoothChoose = ttk.Combobox(self, values = ['Gaussian fit', 'polynominal fit'])
        self.smoothChoose.bind("<<ComboboxSelected>>", self.callbackFunc)
        self.smoothChoose.current(0)
        self.polynominal_para = LabelFrame(self, text ='set polynominal n')
        self.poly_e = Entry(self.polynominal_para)
        self.poly_e.insert(0, '21')
        self.poly_e.pack()

        self.fit = 'Gaussian fit'
        self.gaussian()

        self.smoothChoose.pack(side = 'top')


    def polynominal(self):
        self.polynominal_para.pack(side = 'bottom')

    def gaussian(self):
        self.polynominal_para.pack_forget()

    def callbackFunc(self, e):
        self.fit = self.smoothChoose.get()
        if self.fit == 'Gaussian fit':
            self.gaussian()
            self.plot()
        elif self.fit == 'polynominal fit':
            self.polynominal()
            self.plot()


    def plot(self):
        dt = pd.DataFrame()
        dt.insert(0, 'x',self.x)
        dt.insert(1, 'y', self.y)
        #dt.to_csv('curve.csv', index = False)
        x, y = self.x, self.y
        if self.fit == 'Gaussian fit':
            mean = sum(x * y) / sum(y)
            sigma = np.sqrt(sum(y * (x - mean)**2) / sum(y))
            # sigma = np.sqrt(sum(y * (x - mean)**2) )
            def Gauss(x, aa, a, x0, sigma):
                return aa  + a*np.exp(-0.5*((x-x0)/sigma)**2)
                # return aa  + bb*x +a*(1/(sigma*(np.sqrt(2*np.pi))))*(np.exp((-0.5)*(((x-x0)/sigma)**2)))
            popt,pcov = curve_fit(Gauss, x, y, p0=[-0.01,  np.absolute(max(y)-min(y)), mean, sigma])
            self.curveFitting = Gauss(x,*popt)
            self.fwhm_gaussian = abs(np.round(2*popt[3]*np.sqrt(2*np.log(2)),3 ))
        elif self.fit == 'polynominal fit':

            f = np.poly1d(np.polyfit(x,y,int(self.poly_e.get())))
            self.curveFitting = f(x)

    def get_fitting(self):
        self.plot()
        return self.curveFitting
    def set_inputXY(self, x, y):
        self.x, self.y = x, y


