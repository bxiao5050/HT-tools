import pandas as pd
import numpy as np
from scipy import signal
from scipy.signal import savgol_filter
from tkinter import *
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from matplotlib.figure import Figure

import math

import peakutils
try:
    from thickness.rangeDrago import RangeDrag
except:
    from rangeDrago import RangeDrag
from vertical_line_drag import LineDrag

class MyPlot(LabelFrame):
    def __init__(self, master):
        super().__init__(master)
        self.config(text = 'thickness preview')
        self.frameB = Frame(self)
        self.frameB.pack()
        #set ranges
        self.OKB = Button(self.frameB, text = 'OK', command = self.on_OK)
        self.OKB.pack(side = 'right')
        #draw line by hand
        self.measureTool= Button(self.frameB, text = 'measure tool', fg = 'blue', underline = 1, command = self.on_measure)
        master.bind('<Control-e>', lambda e:self.on_measure())
        self.measureTool.pack(side = 'right', padx = (0, 10))
        self.measure_line = []

        self.drag_h1 = None
        self.drag_l = None
        self.drag_h2 = None

        self.linedrag = None

        self.hist = None

        self.thickness = None
        self.thickness_mannual = None # from mannual measure tool


        self.f = Figure()
        grid = self.f.add_gridspec(3,3, left =0.08, right = 0.98, top =1, bottom = 0.05, hspace = 0.25, wspace = 0.2)
        self.ax_up = self.f.add_subplot(grid[0, :-1])
        self.ax_hist = self.f.add_subplot(grid[0, -1])
        self.ax_middle = self.f.add_subplot(grid[1:3, :])
        self.canvas = FigureCanvasTkAgg(self.f, master = self)
        self.canvas.get_tk_widget().pack(side='bottom', fill=BOTH, expand=1)
        toolbar = NavigationToolbar2Tk(self.canvas, self)
        toolbar.update()

    def on_measure(self):
        try:
            self.measureTool.config(relief = 'sunken')
            #remove old one
            if len(self.measure_line) > 0:
                for line in self.measure_line:
                    line.remove()
                self.measure_line = []
                # self.measure_text.remove()
            xy = self.f.ginput(2, timeout = 20)
            x = [p[0] for p in xy]
            y = [p[1] for p in xy]
            # distance = np.round(np.sqrt((x[0]-x[1])**2 + (y[0]-y[1])**2),2)
            xmax = self.ax_middle.get_xlim()
            xd = abs(min(xmax)-max(xmax))/10
            self.thickness_mannual = round(abs(y[0]-y[1]),2)

            self.measure_line.append(self.ax_middle.text(x[1]+xd/5, (y[0] + y[1])/2, f'y1 = {round(y[0],2)}, y2 = {round(y[1],2)}' + '\n'+f'height = {self.thickness_mannual}', color = 'red'))
            self.measure_line.append(self.ax_middle.plot(x[0],y[0], 'x', color = 'orange')[0])
            self.measure_line.append(self.ax_middle.plot(x[1],y[1], 'x', color = 'orange')[0])
            self.measure_line.append(self.ax_middle.hlines([y[0], y[1]], x-xd, x+xd, colors = 'green', linestyles = ':'))
            self.measure_line.append(self.ax_middle.vlines([x[1]], y[0], y[1], colors = 'green', linestyles = ':'))
            self.measure_line.append(self.ax_middle.plot(x,y,':',color = 'green', alpha =0.2)[0])
            self.canvas.draw()
            self.measureTool.config(relief = 'raised')
        except:
            return



    def setParameters(self, drag_h1 = None,drag_l = None,drag_h2 = None):
        #baseline parameter
        self.drag_h1 = drag_h1
        self.drag_l = drag_l
        self.drag_h2 = drag_h2

    def setParameters_line_drag(self, linedrag):
        self.linedrag = linedrag

    def getPara(self):
        return {'drag_h1':self.drag_h1,'drag_l':self.drag_l,'drag_h2':self.drag_h2}

    #clear the axis
    def axClear(self, ax):
        for artist in ax.lines + ax.patches:
            artist.remove()
            del artist
        ax.clear()



    #refresh the canvas
    def canvasPlot(self, data, pos):
        self.axClear(self.ax_up)
        self.axClear(self.ax_hist)
        self.axClear(self.ax_middle)

        x = data.iloc[:, 0].to_numpy()
        y = data.iloc[:, 1].to_numpy()

        self.ax_up.plot(x,y, label = f'pos:{pos}  original')
        self.ax_up.set_ylim(min(y), max(y) + 0.2*abs(max(y)-min(y)))


        if self.drag_h1 is None: #first time
            self.drag_h1 = RangeDrag(self, ax = self.ax_up, startPos_left = self.ax_up.get_xlim()[1]/100)
            self.drag_l = RangeDrag(self, ax = self.ax_up, color = 'orange', startPos_left = self.ax_up.get_xlim()[1]/2)
            self.drag_h2 = RangeDrag(self, ax = self.ax_up, startPos_left = self.ax_up.get_xlim()[1]/1.1)
        else:
            self.drag_h1 = RangeDrag(self, ax = self.ax_up, startPos_left = self.drag_h1.getRangeV()[0], startPos_right = self.drag_h1.getRangeV()[1])
            self.drag_l = RangeDrag(self, ax = self.ax_up, color = 'orange', startPos_left = self.drag_l.getRangeV()[0], startPos_right = self.drag_l.getRangeV()[1])
            self.drag_h2 = RangeDrag(self, ax = self.ax_up, startPos_left = self.drag_h2.getRangeV()[0], startPos_right = self.drag_h2.getRangeV()[1])


        self.hist = self.ax_hist.hist(self.calThickness(x, y)['y_flat'],40, color = 'green', alpha = 0.8)

        self.ax_up.legend()
        self.calAndDrawAx_middle(x,y)

        self.canvas.draw()

    def get_all_range(self):
        return [self.drag_h1.getRangeV()[0], self.drag_h1.getRangeV()[1], self.drag_l.getRangeV()[0], self.drag_l.getRangeV()[1], self.drag_h2.getRangeV()[0], self.drag_h2.getRangeV()[1]]

    def get_line_drag(self):
        return self.linedrag.getRangeV()

    def on_OK(self):
        self.updateAx_middle()


    def updateAx_middle(self):
        self.axClear(self.ax_middle)
        #get data from upper ax
        line = self.ax_up.lines[0]
        x, y = line.get_xdata(), line.get_ydata()
        self.calAndDrawAx_middle(x,y)


    def calAndDrawAx_middle(self, x,y):
        self.thickness, x_flat, y_flat, yHigh, yLow = [v for v in self.calThickness(x, y).values()]
        self.refresh_middleAx(x, y, x_flat, y_flat, yHigh, yLow)


    def refresh_middleAx(self,x, y, x_flat, y_flat, yHigh, yLow):
        if len(self.ax_middle.lines) > 0:
        #     line = self.ax_middle.lines[0]
             self.ax_middle.clear()
        self.ax_middle.hlines([yHigh, yLow], min(x), max(x), colors = 'red', linestyles = '--', label = 'fitted baselines')
        self.ax_middle.annotate('', (max(x)/10, yLow), (max(x)/10, yHigh), arrowprops={'arrowstyle':'<->'})
        self.ax_middle.text(max(x)/9, (yHigh + yLow)/2, f'h = {self.thickness}')
        # self.ax_middle.vlines(max(x)/10, yLow,yHigh, colors = 'blue', label = 'height', linewidth = 2)

        self.ax_middle.plot(x,y_flat, label = 'flat')
        self.ax_middle.legend(ncol = 1, loc = 'lower right')
        self.canvas.draw()


    def getThickness(self):
        return self.thickness

    #used only for thickniss calculation
    def calThickness(self, x, y):
        def rotate(x,y, deg, origin=(0,0)):
            # shift to origin
            x1 = x - origin[0]
            y1 = y - origin[1]

            #rotate
            x2 = x1*np.cos(deg) - y1*np.sin(deg)
            y2 = x1*np.sin(deg) + y1*np.cos(deg)

            # shift back
            x3 = x2 + origin[1]
            y3 = y2 + origin[0]
            return x3, y3

        def get_center_point(x, y):
            try:
                yhat = savgol_filter(y, 99, 1)
            except:
                yhat = savgol_filter(y, 51, 3)
            index = int(len(x)/2)
            return x[index], yhat[index]

        h_index1 = np.logical_and(x>self.drag_h1.getRangeV()[0], x<self.drag_h1.getRangeV()[1])
        l_index = np.logical_and(x>self.drag_l.getRangeV()[0], x<self.drag_l.getRangeV()[1])
        h_index2 = np.logical_and(x>self.drag_h2.getRangeV()[0], x<self.drag_h2.getRangeV()[1])

        # y_flat = signal.detrend(signal.detrend(signal.detrend(y)))
        y = signal.detrend(signal.detrend(signal.detrend(y)))

        x1, y1 = get_center_point(x[h_index1], y[h_index1])
        x2, y2 = get_center_point(x[h_index2], y[h_index2])

        tan = (y2 - y1)/(x2 - x1)
        deg = np.arctan(tan)

        x_flat, y_flat = rotate(x, y, deg = -deg)

        yHigh1 = np.average(peakutils.baseline(y_flat[h_index1], deg = 1))
        yHigh2 = np.average(peakutils.baseline(y_flat[h_index2], deg = 1))
        yHigh = (yHigh1+yHigh2)/2

        yLow = np.average(peakutils.baseline(y_flat[l_index], deg = 0))
        d = round(abs(yHigh - yLow), 2)
        return {'thickness':d, 'x_flat': x_flat, 'y_flat':y_flat, 'yHigh':yHigh, 'yLow':yLow}



    def getHighIndex(self,n):
        sortedN = sorted(n)
        high_index = np.where(n==sortedN[-1])[0][0]
        low_index = np.where(n==sortedN[-2])[0][0]
        return high_index, low_index




def main():
    root = Tk()
    app = MyPlot(root)
    app.pack(fill=BOTH, expand=1)
    data = pd.read_csv('Ambios_Sigurd\\140714_K2_1_001.dat', skiprows = 6)
    x = data.iloc[:, 0]
    h_index1 = np.logical_and(x>25, x<340)
    h_index2 = np.logical_and(x>700, x<954)
    l_index = np.logical_and(x>420, x<530)
    app.canvasPlot(data, pos=1)
    root.mainloop()

if __name__ == '__main__':
    main()






