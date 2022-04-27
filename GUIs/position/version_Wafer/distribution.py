from tkinter import filedialog
import numpy as np
from tkinter import *
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from matplotlib.transforms import Bbox
from matplotlib.path import Path
import matplotlib.patches as patches
import pandas as pd
import math
import pandas as pd

class Distribution():
    def __init__(self, ax = None, canvas = None, deviation = 4.5/2, data_good = None, ele_name = None):

        self.ax = ax
        self.canvas = canvas

        self.deviation = deviation
        self.data_good = data_good
        self.ele_name = ele_name


        self.bbox = {} # key = bbox, value = coords, data
        self.dot = [] #click
        self.dot_marker = [] #plot
        self.line = {}


        self.intersec_marker = []



        # self.ax.scatter(x,self.y, marker = 's', linewidths = 3, s =30)
        # ax.plot((testline[0][0],testline[1][0]), (testline[0][1],testline[1][1]))
        # self.canvas.draw()
        x, y = self.data_good['x'], self.data_good['y']
        for index, row in self.data_good['data'].iterrows():
            self.bbox[self.getBbox(x[index], y[index], self.deviation)] = [x[index], y[index], row]

    def on_export(self):
        export_file_path = filedialog.asksaveasfilename(defaultextension='.csv')
        df = pd.DataFrame()

        for ele, per in self.ele_data.items():
            df.insert(0, ele, per , False )
        df.insert(0, 'distance (mm)', self.dist , False )
        df.set_index('distance (mm)', inplace=True)
        df.to_csv(export_file_path)

    def showDistribution(self, sortedvalues):
        #for plot
        self.dist = [] #related to starting point
        self.ele_data = {}
        for ele in self.ele_name:
            self.ele_data[ele] = []

        for i, value in enumerate(sortedvalues):
            self.dist.append(value[0])
            for k, ele in enumerate(self.ele_name):
                self.ele_data[ele].append(value[1][k])

        w = Toplevel()
        w.title('show distribution')
        Button(w, text = 'export to .csv', command = self.on_export).pack()
        f = Figure()
        ax = f.add_subplot(111)
        canvas = FigureCanvasTkAgg(f, master = w)
        canvas.get_tk_widget().pack(fill = 'both', expand = False)
        toolbar = NavigationToolbar2Tk(canvas, w)
        toolbar.update()
        ax.set_title('distribution figure from selected {} points'.format(len(sortedvalues)))
        for k, ele in enumerate(self.ele_name):
            ax.plot(self.dist,  self.ele_data.get(ele),'o-', label = ele)
            ax.legend(loc='upper right', ncol = 3)
            ax.set_xlabel('distance related to arrow starting point (mm)')
            ax.set_ylabel('per %')


    def getIntersection(self, line):
        intects = {}
        path = Path(line)

        for box, value  in self.bbox.items():
            if path.intersects_bbox(box):
                intects[box] = value
                for i, ax in self.ax.items():
                    p, = ax.plot(value[0], value[1],marker='D',color='b',linewidth=1,markerfacecolor='white',markeredgecolor='green',markeredgewidth=1,markersize=3)
                    self.intersec_marker.append(p)

        return intects

    def sortIntersection(self, startCoords, intects):
        dist = []
        sortedIntersectCoords = []

        x1, y1 = startCoords
        for box, value in intects.items():
            x2, y2, row = value

            dist.append(math.sqrt((x1 - x2)**2 + (y1 - y2)**2))
            sortedIntersectCoords.append([dist[-1], row])

        return [sortedIntersectCoords[i] for i in np.argsort(dist)]



    def onclick_distribution(self, event):
        click = event.xdata, event.ydata

        if None not in click :
            self.dot.append(click)


            if len(self.dot) ==1:
                for i, ax in self.ax.items():
                    p, = ax.plot(click[0], click[1],marker='*',color='b',linewidth=1,markerfacecolor='white',markeredgecolor='green',markeredgewidth=1,markersize=4)
                    self.dot_marker.append(p)
                    self.canvas.get(i).draw()

            if len(self.dot) ==2:
                #plot intersection
                intects = self.getIntersection(self.dot)
                #plot result in new window
                # print(self.sortIntersection(startCoords = self.dot[0], intects = intects)[1:])
                sortedvalues = self.sortIntersection(startCoords = self.dot[0], intects = intects)
                self.showDistribution(sortedvalues)
                for i, ax in self.ax.items():
                    self.line[i] = ax.arrow(self.dot[0][0],self.dot[0][1], self.dot[1][0]-self.dot[0][0], self.dot[1][1]-self.dot[0][1], head_width=4, linewidth = 2, head_length=3,fc = 'white', edgecolor='red', length_includes_head= True)
                for d in self.dot_marker:
                    d.remove()
                self.dot_marker = []

                for i, ax in self.ax.items():
                    self.canvas.get(i).draw()


                #remove markers and line
                for p in self.intersec_marker:
                    p.remove()
                self.intersec_marker = []
                for i, ax in self.ax.items():
                    self.line.get(i).remove()

                self.dot = []




    def getBbox(self, x, y, deviation):
        left, bottom, width, height = (x-deviation/2, y-deviation/2, deviation, deviation)

        # rect = patches.Rectangle((left, bottom), width, height,linewidth=1,edgecolor='r',facecolor='none')
        # self.ax.add_patch(rect)

        return Bbox.from_bounds(left, bottom, width, height)

