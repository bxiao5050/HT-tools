from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
from scipy.signal import find_peaks

from matplotlib.backends.backend_tkagg import (
                                    FigureCanvasTkAgg, NavigationToolbar2Tk)
from matplotlib.figure import Figure
from scipy.signal import savgol_filter

class Auto():
    def __init__(self, master, **kw):
        self.master = master
        self.errorFold = 1#error
        self.minHeight = 0.5
        self.xDistance = 1
        self.width = 0.5
        #cal
        self.cal_x = np.array([])
        self.cal_y = np.array([])

        #exp
        self.x = np.array([])
        self.y = np.array([])

        #peaks that obtained from fitting result
        self.expPeaks_x = np.array([])
        self.expPeaks_y = np.array([])

    #compare the experimental and calculated XRD peaks
    """
        # 'exp_mx': experimental matched x...
        #'cal_nonmy': theoretical non matched y
        return {'exp_mx': exp_mx, 'exp_my': exp_my, 'cal_mx': cal_mx,
        'cal_my': cal_my, 'per': per, 'cal_nonmx':cal_nonmx,
        'cal_nonmy': cal_nonmy, 'expPeaks_x': self.expPeaks_x, 'expPeaks_y': self.expPeaks_y}

    """

    def expAndCalXRDComparision(self, expx, expy, calx, caly):

        self.x = expx
        self.y = self.smooth(expy)
        # cal_x_1 = calx
        # cal_y_1= caly

        cal_x_1 = calx[self.getExpRangeForCal(self.x, calx)]
        cal_y_1 = caly[self.getExpRangeForCal(self.x, calx)]

        #find exp peaks
        p = self.findPeaks(self.x, self.y)

        #1. prepare for peaks evaluation
        self.expPeaks_x = p['peak_x']
        self.expPeaks_y = p['peak_y']

        #1.1 make sure that the cal data are unique
        self.cal_x = cal_x_1[np.unique(cal_x_1, return_index = True)[1]]
        self.cal_y = cal_y_1[np.unique(cal_x_1, return_index = True)[1]]


        #1.2 fitting peaks should at least equal to cal peaks
        l1 = len(np.atleast_1d(self.expPeaks_x))
        l2 = len(np.atleast_1d(self.cal_x))
        if l1< l2:
            for i in range(l2 - l1):
               self.expPeaks_x = np.append(self.expPeaks_x, 0)
               self.expPeaks_y = np.append(self.expPeaks_y, 0)


        #for selected peaks
        cr = self.comResult(self.cal_x, self.expPeaks_x, p['averageFWHM']/2)
        identifiedCal_index = cr['identifiedCal_index']
        identifiedExp_index = cr['identifiedExp_index']
        identifiedCal_Pos = cr['identifiedCal_Pos']


        cal_mx = self.cal_x[identifiedCal_index]
        cal_my = self.cal_y[identifiedCal_index]
        exp_mx = self.expPeaks_x[identifiedExp_index]# matched exp x values
        exp_my = self.expPeaks_y[identifiedExp_index]


        non_identifiedCal_Pos = np.array([not flag for flag in identifiedCal_Pos])
        cal_nonmx = self.cal_x[non_identifiedCal_Pos]
        cal_nonmy = self.cal_y[non_identifiedCal_Pos]


        std = self.getStd(exp_mx, exp_my, cal_mx, cal_my)

        per = self.matchPercentage(identifiedCal_Pos, self.cal_y, self.expPeaks_y)

        # 'exp_mx': experimental matched x...
        #'cal_nonmy': theoretical non matched y
        #expPeaks_x: the peaks from fitting result
        return {'exp_mx': exp_mx, 'exp_my': exp_my, 'cal_mx': cal_mx,
        'cal_my': cal_my, 'per': per, 'cal_nonmx':cal_nonmx,
        'cal_nonmy': cal_nonmy, 'expPeaks_x': self.expPeaks_x, 'expPeaks_y': self.expPeaks_y,
        'minHeight': self.minHeight}

    #check if abs(x_cal - x_exp) < error
    #get std
    def comResult(self, cal_array, exp_array, error):
        error = error*self.errorFold#two fold error!!!!!!
        identifiedCal_x = np.array([]) #matched x values
        identifiedCal_index = []  #the corresponding index of matched x value
        identifiedCal_Pos = np.array([]) # corresponding 'True' bool for x-index [True, False,...]

        identifiedExp_x = np.array([]) #matched x values
        identifiedExp_index = []  #the corresponding index of matched x value
        identifiedExp_Pos = np.array([]) # corresponding 'True' bool for x-index [True, False,...]
        for i, cal_x in enumerate(cal_array):
            for j, exp_x in enumerate(exp_array):
                if abs(cal_x - exp_x) <= error:
                    if len(np.where(identifiedExp_x == exp_x)[0]) == 0:
                        identifiedCal_x = np.append(identifiedCal_x, cal_x)
                        identifiedExp_x = np.append(identifiedExp_x, exp_x)
                        identifiedCal_index.append(i)
                        identifiedExp_index.append(j)
                    else:
                        continue
                    break

        identifiedCal_Pos = np.full(len(np.atleast_1d(cal_array)), False)
        identifiedExp_Pos = np.full(len(np.atleast_1d(exp_array)), False)


        for i in identifiedCal_index:
            identifiedCal_Pos[i] = True


        for i in identifiedExp_index:
            identifiedExp_Pos[i] = True



        return {'identifiedCal_Pos': identifiedCal_Pos, 'identifiedExp_Pos': identifiedExp_Pos,
        'identifiedCal_index': identifiedCal_index,'identifiedExp_index': identifiedExp_index}


    def normalization(self, df):
        return (df - min(df))/(max(df) - min(df))

    def smooth(self, y, windows = 51, polynominalOrder = 3):
        return savgol_filter(y, windows, polynominalOrder)

    # minHeight: lowest peak
    #xDistance: 2theta width for peak
    #return: peaks = [peak_x, peak_y, peak_FWHM, peak_FWHM_yPos, FWHM_left, FWHM_right]
    def findPeaks(self, x, y):
        p, properties = find_peaks(y, height= self.minHeight ,
            distance = self.xDistance*len(np.atleast_1d(x))/(max(x) - min(x)), width = self.width)

        peak_x = x[p].values
        peak_y = y[p]
        FWHM_left = x[np.round(properties["left_ips"])].values
        FWHM_right = x[np.round(properties["right_ips"])].values

        peak_FWHM = FWHM_right - FWHM_left
        peak_FWHM_yPos = properties["width_heights"]

        #use the highest peak to make the average error range (FWHM/2)

        averageFWHM = peak_FWHM[peak_y.tolist().index(max(peak_y))]

        x_deviation_left = peak_x - averageFWHM/2
        x_deviation_right = peak_x + averageFWHM/2

        return {'peak_x': peak_x, 'peak_y': peak_y, 'peak_FWHM': peak_FWHM,
        'peak_FWHM_yPos': peak_FWHM_yPos,'FWHM_left': FWHM_left,
        'FWHM_right': FWHM_right, 'x_deviation_left': x_deviation_left,
        'x_deviation_right': x_deviation_right, 'averageFWHM': averageFWHM}


    #find the first n largest
    def getLargeN(self, x, n):
        newx = np.sort(x)[::-1][:n]
        index = []
        for i in newx:
            index.append(x.tolist().index(i))
        index.sort()
        return np.array(index)


    #to check how many peaks from cal found in exp data
    #use
    def matchPercentage(self, identifiedCal_Pos, cal_y, exp_y):
        w = []
        mp1 = 0
        mp2 = 0
        fp = np.zeros(len(np.atleast_1d(identifiedCal_Pos)))
        for i, f in enumerate(identifiedCal_Pos):
            if f == True:
                if np.less(cal_y[i], exp_y[i]):
                    w.append(cal_y[i])
                else:
                    w.append(exp_y[i])
                fp[i] = 1
            else:
                fp[i] = 0
                w.append(cal_y[i])
        for i in range(len(np.atleast_1d(cal_y))):
            mp1 = mp1 + (w[i]*fp[i])
            mp2 = mp2 + w[i]

        mp = mp1/mp2
        return mp


    #use
    def getStd(self, exp_mx, exp_my, cal_mx, cal_my):
        w = 0
        variance = 0
        for i in range(len(np.atleast_1d(cal_my))):
            if np.less(cal_my[i], exp_my[i]):
                w = cal_my[i]
            else:
                w = exp_my[i]
            variance = variance + (w*abs(cal_mx[i] - exp_mx[i])**2)/(w*cal_mx[i])

        return np.sqrt(variance)

    #get the nearest value from a given sorted value
    def getValueNearBy(self, array, v):
        x_left = 0
        x_right = 0
        for i in range(len(np.atleast_1d(array))):
            if i + 1< len(np.atleast_1d(array)):
                if (x[i + 1] > v) & (x[i] < v):
                    if abs(x[i] - v) < abs(x[i + 1] - v):
                        return x[i]
                    else:
                        return x[i + 1]



    def seterrorFold(self, n):
        self.errorFold = n

    #cal 2theta should be in the range of exp
    #two parameters, xexp and xcal, return index
    def getExpRangeForCal(self, xexp, xcal):
        #1. check if they have overlap
        if max(xexp) > min(xcal) and min(xexp) < max(xcal):
            index = np.where((xcal >= min(xexp)) & (xcal <= max(xexp)))[0]
        if len(index) == 0:
            index = np.where((xcal >= min(xcal))&(xcal <= max(xcal)))[0]
        return index

    def test(self,x, y, cal_x, cal_y):
        cR = self.expAndCalXRDComparision(x, y, cal_x, cal_y)
        #print result
        # window = Toplevel(self.master)
        fig = Figure()
        canvas = FigureCanvasTkAgg(fig, master = self.master)
        ax = fig.add_subplot(111)
        canvas._tkcanvas.pack(fill = 'both', expand = True)
        toolbar = NavigationToolbar2Tk(canvas, self.master)
        toolbar.update()
        toolbar.pack()

        ax.plot(x, y)
        ax.plot(cR['expPeaks_x'], cR['expPeaks_y'], 'x')
        ax.vlines(cR['cal_mx'], np.zeros(len(np.atleast_1d(cR['cal_mx']))), cR['cal_my'], 'black')
        ax.vlines(cR['cal_nonmx'], np.zeros(len(np.atleast_1d(cR['cal_nonmx']))), cR['cal_nonmy'], 'red')












