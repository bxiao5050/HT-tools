from tkinter import *
from tkinter import ttk
from scipy.signal import savgol_filter, hilbert
import pandas as pd
import numpy as np
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
from matplotlib import cm, colors
import threading
import time
from tkinter import messagebox, filedialog

# import main
import sWafers
import linear
import rangeDrags
import waferCanvass

class diff1(Frame):
    def __init__(self, master, x = None, y = None, index = None):
        super().__init__(master)

        if x is None:
            self.x = pd.read_csv('190513-k3-2_Energy.txt', sep = '\t')
            self.y = pd.read_csv('190513-k3-2_direct.txt', sep = '\t')
        else:
            self.x, self.y, self.index = x, y, index
        self.pos = None
        self.linearFit = linear.Linear()
        self.range_line1 = (1.7, 2) # range of envelop
        self.range_line2 = (2.78, 3.27)

        self.results = {} # fitting results

        #frame for wafer, and buttons
        frame = Frame(master)
        Button(frame, text = 'Set envolop range', command = self.on_setRange).grid(row = 0, column = 0, padx = (5,5), pady = (5,5))
        self.wafer = sWafers.SWafer(frame)
        for pos, b in self.wafer.pAB.items():
            b.config(command = lambda pos = pos: self.on_buttonPress(pos), width = 9, height = 9)

        self.wafer.grid(row = 1, column = 0, columnspan = 2, pady = (5,5))
        self.para1 = Entry(frame,  width = 5)
        self.para2 = Entry(frame, width = 5)
        self.para1.insert(0, '89')
        self.para2.insert(0, '3')
        Label(frame, text = 'Savitzky−Golay filter1: ').grid(row = 2, column = 0, padx = (5,5), pady = (5,5))
        Label(frame, text = 'Savitzky−Golay filter2: ').grid(row = 3, column = 0, padx = (5,5), pady = (5,25))
        self.para1.grid(row = 2, column = 1, sticky = 'w', padx = (5,5), pady = (5,5))
        self.para2.grid(row = 3, column = 1, sticky = 'w', padx = (5,5), pady = (5,5))
        Button(frame, text = 'OK', command = self.on_OK).grid(row = 4, column = 1, pady = (5,5))

        #fitting results
        self.resL = Label(frame, justify = 'left')
        self.resL.grid(row = 5, column = 0, columnspan = 2, sticky = 'w', padx = (5,5))

        # Button(frame, text = 'Show Figure', command = self.on_show).grid(row = 6, column = 1, pady = (5,10))
        #save results
        Button(frame, text = 'Show result', command = self.on_results).grid(row = 7, column = 1, pady = (5,10))

        frame.pack(side = 'left', fill = 'y')

        self.f = Figure()
        self.ax = {}
        for i in range(1, 4):
            self.ax[i] = self.f.add_subplot(3, 1, i)

        self.canvas = FigureCanvasTkAgg(self.f, master = master)
        self.canvas.get_tk_widget().pack(fill = 'both', expand = True)
        toolbar = NavigationToolbar2Tk(self.canvas, master)
        toolbar.update()
        if x is None:
            self.index = np.logical_and(self.x>1.5, self.x<3.4)
            # x = self.x.to_numpy()[self.index]
            # y = self.y.iloc[:,0].to_numpy()[self.index.iloc[:,0]]
            # self.myPlot(x, y)


    def on_results(self):
        threading.Thread(target=self.on_auto).start()

    def on_auto(self):
        w = Toplevel()
        w.title('band gap result')
        self.wafer2 = waferCanvass.WaferCanvas(w)
        self.wafer2.grid(row = 0, column = 0)
        for pos in self.wafer.pAB.keys():
            x, y = self.x.to_numpy()[self.index], self.y.iloc[:,pos-1].to_numpy()[self.index.iloc[:,0]]
            try:
                self.results[pos] = self.calIntersection(x, y)
                self.wafer2.getPAC().get(pos).config(bg = 'blue')
            except:
                self.results[pos] = -1 # bad data
                # self.wafer2.getPAC().get(pos).config(bg = 'red')
            time.sleep(0.01)

        # add corlormap after calculation
        self.v = [v for v in self.results.values() if v != -1]
        for pos, res_v in zip(self.wafer.pAB.keys(),self.results.values()):
            if res_v !=-1:
                x = self.results.get(pos)
                self.wafer2.getPAC().get(pos).config(bg = self.colorChoose(self.v, x))
                self.wafer2.getPAC().get(pos).bind("<Enter>", lambda event, pos = pos: self.on_enter(event, pos))
        # add colorbar
        self.wafer2.showLegend( yticklabels = np.round(np.linspace(start=min(self.v), stop = max(self.v), num =6), 3))

        # cb = ax.colorbar(img)
        Button(w, text = 'save to .csv', command = self.on_saveToCSV).grid(row = 1, column = 0, sticky = 'sw', padx = (10,10), pady=(10,10))

    def colorChoose(self, v, x):
        normalized = (v - min(v))/(max(v) - min(v))
        index = np.where(v == x)[0][0]
        return colors.rgb2hex(cm.jet(normalized[index]))

    def on_saveToCSV(self):
        data = pd.DataFrame.from_dict(self.results, orient = 'index', columns = ['bandgap'])
        filename = filedialog.asksaveasfilename(filetypes = [('csv file', '*.csv')])
        if filename:
            data.to_csv(filename+'.csv')
            messagebox.showinfo(title = '', message = 'file saved!')


        #override
    def on_enter(self,e, pos):
        low = min(self.v)
        high = max(self.v)
        low_pos = list(self.results.keys())[list(self.results.values()).index(low)]
        high_pos = list(self.results.keys())[list(self.results.values()).index(high)]


        text = f'pos: {pos}' + '\n' + f'Intersection: {self.results.get(pos)}' + '\n\n' +\
                f'min: {low} in pos {low_pos}' + '\n'+ \
                f'max: {high} in pos {high_pos}'
        self.wafer2.l2.configure(text= text)

    def on_setRange(self):
        self.w = Toplevel()
        Label(self.w, text = 'set range of line1').grid(row = 0, column = 0)
        Label(self.w, text = 'set range of line2').grid(row = 1, column = 0)
        self.line1_l = Entry(self.w)
        self.line1_l.insert(0, self.range_line1[0])
        self.line1_r = Entry(self.w)
        self.line1_r.insert(0, self.range_line1[1])

        self.line2_l = Entry(self.w)
        self.line2_l.insert(0, self.range_line2[0])
        self.line2_r = Entry(self.w)
        self.line2_r.insert(0, self.range_line2[1])

        self.line1_l.grid(row = 0, column = 1, padx = (5,5), pady = (5,5))
        self.line1_r.grid(row = 0, column = 2, padx = (5,5), pady = (5,5))
        self.line2_l.grid(row = 1, column = 1, padx = (5,5), pady = (5,5))
        self.line2_r.grid(row = 1, column = 2, padx = (5,5), pady = (5,5))

        Button(self.w, text = 'OK', command = self.on_set).grid(row = 2, column = 2, padx = (5,5), pady = (5,5))

    def on_set(self):
        self.range_line1 = (float(self.line1_l.get()), float(self.line1_r.get()))
        self.range_line2 = (float(self.line2_l.get()), float(self.line2_r.get()))
        #redraw
        self.on_select(self.pos)
        self.w.withdraw()


    def on_OK(self):
        self.on_select(self.pos)

    def on_buttonPress(self, pos):
        self.pos = pos
        self.wafer.buttonPress(pos)
        self.on_select(pos)

    def calIntersection(self,x, y):
        y0 = y
        y = savgol_filter(y, int(self.para1.get()), int(self.para2.get()))
        x_de1, y_de1 = self.derivative(x,y)
        x_de2, y_de2 = self.derivative(x_de1, y_de1)
        x_de3, y_de3 = self.derivative(x_de2, y_de2)
        index2 = np.logical_and(x_de2>self.range_line2[0], x_de2<self.range_line2[1])

        x_left = self._AICPicker(np.flip(y_de2[index2]))
        x_right = self._AICPicker(y_de2[index2])
        x_thirdEnvelop = x_de2[index2]

        x_range_thirdEnvelop = (np.flip(x_thirdEnvelop)[x_left], x_thirdEnvelop[x_right])
        index3 = np.logical_and(x_de2>self.range_line1[0], x_de2<self.range_line1[1])
        x_start = self._AICPicker(np.flip(y_de2[index3]))
        x_firstEnvelop = np.flip(x_de2[index3])
        x_range_firstEnvelop = (min(x), x_firstEnvelop[x_start])
        index_firstEnvelop = np.logical_and(x >= x_range_firstEnvelop[0], x<= x_range_firstEnvelop[1])
        index_thirdEnvelop = np.logical_and(x >= x_range_thirdEnvelop[0], x<= x_range_thirdEnvelop[1])
        x_firstEnvolop = x[index_firstEnvelop].reshape((len(x[index_firstEnvelop]), 1))
        y_firstEnvolop = y[index_firstEnvelop].reshape((len(x[index_firstEnvelop]), 1))

        x_thirdEnvolop = x[index_thirdEnvelop].reshape((len(x[index_thirdEnvelop]), 1))
        y_thirdEnvolop = y[index_thirdEnvelop].reshape((len(x[index_thirdEnvelop]), 1))

        slope1, intercept1, error1 = self.linearFit.fit(ax = None, x = x_firstEnvolop, y = y_firstEnvolop, color = 'blue')
        slope2, intercept2, error2 = self.linearFit.fit(ax = None, x = x_thirdEnvolop, y = y_thirdEnvolop, color = 'green')
        intersection = self.linearFit.intersection(x,ax = None, slope1 = slope1, intercept1 = intercept1, slope2 = slope2, intercept2 = intercept2)
        return np.round(intersection, 4)


    def myPlot(self, x, y):
        info = ''
        for i in range(1, 4):
            self.ax[i].clear()
        y0 = y

        y = savgol_filter(y, int(self.para1.get()), int(self.para2.get()))

        x_de1, y_de1 = self.derivative(x,y)
        x_de2, y_de2 = self.derivative(x_de1, y_de1)
        x_de3, y_de3 = self.derivative(x_de2, y_de2)

        self.ax[1].plot(x,y0, color = 'black', label = 'original')
        self.ax[1].plot(x,y, color = 'yellow', label = 'Tauc simulation')
        self.ax[1].legend()

        self.ax[2].plot(x_de1, y_de1)
        self.ax[3].plot(x_de2, y_de2)

        # restrain x, obtain right coner
        index2 = np.logical_and(x_de2>self.range_line2[0], x_de2<self.range_line2[1])

        x_left = self._AICPicker(np.flip(y_de2[index2]))
        x_right = self._AICPicker(y_de2[index2])
        x_thirdEnvelop = x_de2[index2]

        x_range_thirdEnvelop = (np.flip(x_thirdEnvelop)[x_left], x_thirdEnvelop[x_right])

        index3 = np.logical_and(x_de2>self.range_line1[0], x_de2<self.range_line1[1])
        x_start = self._AICPicker(np.flip(y_de2[index3]))
        x_firstEnvelop = np.flip(x_de2[index3])
        x_range_firstEnvelop = (min(x_de2[index3]), x_firstEnvelop[x_start])

        index_firstEnvelop = np.logical_and(x >= x_range_firstEnvelop[0], x<= x_range_firstEnvelop[1])
        index_thirdEnvelop = np.logical_and(x >= x_range_thirdEnvelop[0], x<= x_range_thirdEnvelop[1])
        x_firstEnvolop = x[index_firstEnvelop].reshape((len(x[index_firstEnvelop]), 1))
        y_firstEnvolop = y[index_firstEnvelop].reshape((len(x[index_firstEnvelop]), 1))

        x_thirdEnvolop = x[index_thirdEnvelop].reshape((len(x[index_thirdEnvelop]), 1))
        y_thirdEnvolop = y[index_thirdEnvelop].reshape((len(x[index_thirdEnvelop]), 1))

        slope1, intercept1, error1 = self.linearFit.fit(ax = self.ax[1], x = x_firstEnvolop, y = y_firstEnvolop, color = 'blue')
        slope2, intercept2, error2 = self.linearFit.fit(ax = self.ax[1], x = x_thirdEnvolop, y = y_thirdEnvolop, color = 'green')
        intersection = self.linearFit.intersection(x,ax = self.ax[1], slope1 = slope1, intercept1 = intercept1, slope2 = slope2, intercept2 = intercept2)

        for i in range(1, 4):
            self.ax[i].vlines(x_range_thirdEnvelop[0], self.ax[i].get_ylim()[0],self.ax[i].get_ylim()[1], color = 'red', linewidth = 2)
            self.ax[i].vlines(x_range_thirdEnvelop[1], self.ax[i].get_ylim()[0],self.ax[i].get_ylim()[1], color = 'red', linewidth = 2)
            self.ax[i].vlines(x_range_firstEnvelop[0], self.ax[i].get_ylim()[0],self.ax[i].get_ylim()[1], color = 'red', linewidth = 2)
            self.ax[i].vlines(x_range_firstEnvelop[1], self.ax[i].get_ylim()[0],self.ax[i].get_ylim()[1], color = 'red', linewidth = 2)

        self.canvas.draw()

        info = f'slope1: {np.round(slope1, 4)}' + '\n' +\
                f'intercept1: {np.round(intercept1, 4)}' + '\n' +\
                f'RMS error: {np.round(error1, 4)}' + '\n\n' +\
                f'slope2: {np.round(slope2, 4)}' + '\n' +\
                f'intercept2: {np.round(intercept2, 4)}' + '\n' +\
                f'RMS error: {np.round(error2, 4)}' + '\n\n' +\
                f'intersection: {np.round(intersection, 4)}'
        self.resL.config(text = info)



    def derivative(self, x, y):
        y_de = np.diff(y) / np.diff(x)
        x_de = (np.array(x)[:-1] + np.array(x)[1:]) / 2

        return (x_de, y_de)

    def on_select(self, pos):
        self.myPlot(self.x.to_numpy()[self.index], self.y.iloc[:,pos-1].to_numpy()[self.index.iloc[:,0]])


    def _AICPicker(self,chdata):
        try:
        # set the parameters
            #self.dt = 0.004 # time step (unit:ms)
            data = chdata - np.mean(chdata)
            ind_peak = list(np.where(np.absolute(data) == np.max(np.absolute(data)))[0])
            k0 = ind_peak[0]
            # calculate the onset time with AIC Algorithm in window[0,k0]
            x = data[:k0+1]
            aicP1 = []
            if len(x):
               num = len(x)
               if num > 1:
                   k = 1
                   while k < num:
                       # calculate variance in first part
                       xLogVar1 = np.var(x[:k])
                       if xLogVar1 <= 0: xLogVar1 = 0
                       else: xLogVar1 = np.log(xLogVar1)

                       # calculate variance in second part
                       xLogVar2 = np.var(x[k:])
                       if xLogVar2 <= 0: xLogVar2 = 0
                       else: xLogVar2 = np.log(xLogVar2)
                       temp_aick = (k)*(xLogVar1) + (num-k-1)*(xLogVar2)
                       aicP1.append(temp_aick)
                       k += 1
               else: aicP1 = []
            else: aicP1 = []
            # find the position of the minimum
            if len(aicP1)>1:
                indlist = list(np.where(aicP1 == np.min(aicP1))[0])
                ind = indlist[0]+1
            else:
                ind = 0
            if ind:
                loc = ind
            else:
                loc = 0
            return loc
        except:
            messagebox.showinfo(title = '', message = 'wrong range')
