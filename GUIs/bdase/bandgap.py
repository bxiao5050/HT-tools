from tkinter import *
from tkinter import ttk
from scipy.signal import savgol_filter, hilbert
import pandas as pd
import numpy as np
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

class diff1(Frame):
    def __init__(self, master):
        super().__init__(master)
        self.x = pd.read_csv('190817-k3-1_Energy.txt', sep = '\t')
        self.y = pd.read_csv('190817-k3-1_direct.txt', sep = '\t')

        droplist = ttk.Combobox(master, values = [i for i in range(1, len(self.y.iloc[0,:]) + 1)], state = 'readonly')
        droplist.bind('<<ComboboxSelected>>', self.on_select)
        droplist.pack()

        self.f = Figure()
        self.ax = {}
        for i in range(1, 4):
            self.ax[i] = self.f.add_subplot(3, 1, i)

        self.canvas = FigureCanvasTkAgg(self.f, master = master)
        self.canvas.get_tk_widget().pack(fill = 'both', expand = True)
        toolbar = NavigationToolbar2Tk(self.canvas, master)
        toolbar.update()
        self.index = np.logical_and(self.x>1.5, self.x<3.4)

        x = self.x.to_numpy()[self.index]
        y = self.y.iloc[:,0].to_numpy()[self.index.iloc[:,0]]

        self.myPlot(x, y)

    def myPlot(self, x, y):
        for i in range(1, 4):
            self.ax[i].clear()
        y0 = y

        y = savgol_filter(y, 49, 3)

        x_de1, y_de1 = self.derivative(x,y)
        x_de2, y_de2 = self.derivative(x_de1, y_de1)
        x_de3, y_de3 = self.derivative(x_de2, y_de2)

        self.ax[1].plot(x,y0, color = 'black', label = 'original')
        self.ax[1].plot(x,y,  '-', color = 'red', label = 'smooth')
        self.ax[1].legend()

        self.ax[2].plot(x_de1, y_de1)
        self.ax[3].plot(x_de2, y_de2)


        # restrain x, obtain right coner
        index2 = np.logical_and(x_de2>2.78, x_de2<3.27)

        x_right = self._AICPicker(y_de2[index2])
        x_left = self._AICPicker(np.flip(y_de2[index2]))
        x_thirdEnvelop = x_de2[index2]

        self.ax[1].vlines(x_thirdEnvelop[x_right], self.ax[1].get_ylim()[0],self.ax[1].get_ylim()[1], color = 'red', linewidth = 3)
        self.ax[2].vlines(x_thirdEnvelop[x_right], self.ax[2].get_ylim()[0],self.ax[2].get_ylim()[1], color = 'red', linewidth = 3)
        self.ax[3].vlines(x_thirdEnvelop[x_right], self.ax[3].get_ylim()[0],self.ax[3].get_ylim()[1], color = 'red', linewidth = 3)

        self.ax[1].vlines(np.flip(x_thirdEnvelop)[x_left], self.ax[1].get_ylim()[0],self.ax[1].get_ylim()[1], color = 'red', linewidth = 3)
        self.ax[2].vlines(np.flip(x_thirdEnvelop)[x_left], self.ax[2].get_ylim()[0],self.ax[2].get_ylim()[1], color = 'red', linewidth = 3)
        self.ax[3].vlines(np.flip(x_thirdEnvelop)[x_left], self.ax[3].get_ylim()[0],self.ax[3].get_ylim()[1], color = 'red', linewidth = 3)

        index3 = np.logical_and(x_de2>1.7, x_de2<2)
        x_start = self._AICPicker(np.flip(y_de2[index3]))
        x_firstEnvelop = np.flip(x_de2[index3])
        self.ax[1].vlines(x_firstEnvelop[x_start], self.ax[1].get_ylim()[0],self.ax[1].get_ylim()[1], color = 'red', linewidth = 3)
        self.ax[2].vlines(x_firstEnvelop[x_start], self.ax[2].get_ylim()[0],self.ax[2].get_ylim()[1], color = 'red', linewidth = 3)
        self.ax[3].vlines(x_firstEnvelop[x_start], self.ax[3].get_ylim()[0],self.ax[3].get_ylim()[1], color = 'red', linewidth = 3)

        print(f'x_right: {x_thirdEnvelop[x_right]}')
        print(f'x_left: {np.flip(x_thirdEnvelop)[x_left]}')
        print(f'x_start: {x_firstEnvelop[x_start]}' + '\n')



        # self.ax[3].plot(x_de2[index2], np.abs(hilbert(y_de2[index2])))
        # self.ax[3].plot(x_de)



        self.canvas.draw()

    def derivative(self, x, y):
        y_de = np.diff(y) / np.diff(x)
        x_de = (np.array(x)[:-1] + np.array(x)[1:]) / 2

        return (x_de, y_de)

    def on_select(self, e):
        self.myPlot(self.x.to_numpy()[self.index], self.y.iloc[:,int(e.widget.get())].to_numpy()[self.index.iloc[:,0]])


    def _AICPicker(self,chdata):
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

