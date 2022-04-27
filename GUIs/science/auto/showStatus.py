
from  tkinter import *
from matplotlib.backends.backend_tkagg import (
                                    FigureCanvasTkAgg, NavigationToolbar2Tk)
from tkinter import ttk
from mpl_toolkits.mplot3d import axes3d
from matplotlib.figure import Figure
import numpy as np
from matplotlib import style
from matplotlib import colors
import matplotlib.pyplot as plt

class PhaseResultStatus():
    """
        show 3D bar for status.
        5 levels
    """
    def __init__(self, master):
        self.master = master
        self.data = None
        # window = Toplevel(master)
        self.pALoc = {} #pos and row, column

        self.fig = Figure(figsize = (8, 8))
        self.canvas = FigureCanvasTkAgg(self.fig, master = self.master)
        self.ax = self.fig.add_subplot(111, projection='3d')
        self.canvas._tkcanvas.grid(row = 0, column = 0, sticky = 'news', padx = (10,10), pady = (10, 10))
        self.status = {'Match': 4,  'Doubt': 3, 'Difficult': 2, 'Not match': 1}

        self.colormap = [ 'blue','green', 'gold', 'red' ]
        fLegend = Frame(self.master)
        fLegend.grid(row = 0, column = 1, sticky = 's', padx = (15,10), pady = (0, 30))
        for k, v  in self.status.items():
            i = 4 - int(v)
            Label(fLegend, bg = self.colormap[int(v) -1 ], width = 3).grid(row = i, column = 0)
            Label(fLegend, text = k).grid(row = i, column = 1, sticky = 'w')

        self.canvasGeo()


    def canvasGeo(self):
        self.pos = 1
        roww = 20
        coll = 21

        ll = [4, 2, 0, -2, -4]
        for row in reversed(range(roww)):
            for col in range(coll):
                if row == 0 and col >= 7 and col <=13:
                    self.newB(row, col, self.pos)
                elif row >= 1 and row <= 5 and col >= 6 - row and col <= row + 14:
                    self.newB(row, col, self.pos)
                elif row == 6 and col >=1 and col <= 19:
                    self.newB(row, col, self.pos)
                elif row <=13 and row >=7:
                    self.newB(row, col, self.pos)
                elif row == 14 and col >= 1 and col <= 19:
                    self.newB(row, col, self.pos)
                elif row >= 15 and row <= 19 and col >= row - 14 and col <= row + ll[row - 15]:
                    self.newB(row, col, self.pos)



    def newB(self, row, col, pos):
        self.pALoc[pos] = [row, col]
        self.pos += 1

    def threeDStatus(self):
        #draw canvas
        x = [p[0] for p in self.pALoc.values()]
        y = [p[1] for p in self.pALoc.values()]

        z = np.zeros(len(x))

        dx = [0.8 for num in range(len(x))]
        dy = [0.8 for num in range(len(x))]
        dz = [0.1 for num in range(len(x))]
        p = self.ax.bar3d(x, y, z, dx, dy, dz, color = 'lightgray')


        #parse data
        x = [pos[0] for pos in self.data.values()]
        y = [pos[1] for pos in self.data.values()]

        dz = [self.status.get(pos[2]) for pos in self.data.values()]

        z = np.zeros(len(x))
        dx = [0.8 for num in range(len(x))]
        dy = [0.8 for num in range(len(x))]

        #color
        # cmap = plt.get_cmap('jet')
        # self.colormap = [cmap(i) for i in np.linspace(0, 1, 5)]

        mycolors = [self.colormap[s -1] for s in dz]
        self.ax.bar3d(x, y, z, dx, dy, dz, color = mycolors)

        self.canvas.draw()

        self.ax.set_xlim3d(0, 20)
        self.ax.set_ylim3d(0, 21)
        self.ax.set_zlim3d(0, 4)

        self.ax.set_xlabel('Y')
        self.ax.set_ylabel('X')
        self.ax.set_zlabel('Status')
        self.ax.set_xticks([])
        self.ax.set_yticks([])
        self.ax.set_zticklabels([])
        self.fig.subplots_adjust(left=0, bottom=0, right=1, top=1, wspace=0, hspace=0)

    def setData(self, data):
        self.data = data









