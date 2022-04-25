
from  tkinter import *
from matplotlib.backends.backend_tkagg import (
                                    FigureCanvasTkAgg, NavigationToolbar2Tk)
from tkinter import ttk
from mpl_toolkits.mplot3d import axes3d
from matplotlib.figure import Figure
import numpy as np
from matplotlib import style
from matplotlib import colors, cm
class PhaseResultStatus(Frame):
    """
        show 3D bar for status.
        5 levels
    """
    def __init__(self, master, results):
        super().__init__(master)
        self.data = None
        # window = Toplevel(master)
        self.pALoc = {} #pos and row, column

        self.normalizedB = Button(self, text = '3D Bar (normalized)',width = 20, command= lambda results=results: self.on_normalized(results))
        self.originalB = Button(self, text = '3D Bar (original)',width = 20, command=lambda results=results:self.on_original(results))
        self.trisurfB = Button(self, text = 'surface',width = 20, command=lambda results=results:self.on_surface(results))
        self.normalizedB.pack()
        self.originalB.pack()
        self.trisurfB.pack()

        self.fig = Figure(figsize = (10, 5))
        self.canvas = FigureCanvasTkAgg(self.fig, master = self)
        self.ax = self.fig.add_subplot(111, projection='3d')
        self.canvas._tkcanvas.pack(fill = 'both', expand = True, padx = (20,20))
        toolbar2 = NavigationToolbar2Tk(self.canvas, self)
        toolbar2.update()

        self.cb = None#colorbar


        self.canvasGeo()
        self.on_original(results)

    def on_surface(self, results):
        if self.cb is not None:
            self.cb.remove()
            self.cb = None

        self.ax.clear()
        x = []
        y = []
        dz = []
        for pos, value in results.items():
            x.append(self.pALoc.get(pos)[0])
            y.append(self.pALoc.get(pos)[1])
            dz.append(value)


        # colours = cm.jet(self.normalization(dz))
        # print(self.normalization(dz))
        try:
            self.ax.plot_trisurf(x, y, dz,cmap=cm.jet)
        except:
            pass
        # self.cb = self.fig.colorbar(tt, fraction=0.015)
        # self.cb.ax.yaxis.set_ticks_position('left')
        # self.cb.ax.yaxis.set_ticks([min(dz),max(dz)/2, max(dz)])
        # self.cb.ax.yaxis.set_ticklabels(np.round(np.linspace(min(dz), max(dz), num =6)))

        self.canvas.draw()

    def normalization(self, dz):
        # return [2*(v - min(dz))/(max(dz)-min(dz))-1 for v in dz]
        return [(v - min(dz))/(max(dz)-min(dz)) for v in dz]


    def on_original(self,results):
        if self.cb is not None:
            self.cb.remove()
            self.cb = None
        self.ax.clear()
        v = [vv for vv in results.values()]


        x = []
        y = []
        dz = []
        for pos, value in results.items():
            x.append(self.pALoc.get(pos)[0])
            y.append(self.pALoc.get(pos)[1])
            dz.append(value)

        z = np.zeros(len(x))

        dx = [0.4 for num in range(len(x))]
        dy = [0.4 for num in range(len(x))]

        colours = cm.jet(self.normalization(dz))
        # print(self.normalization(dz))
        tt = self.ax.bar3d(x, y, z, dx, dy, dz, linewidth = 0.2, edgecolor = 'white', color = colours, cmap=cm.jet, shade=True)
        self.cb = self.fig.colorbar(tt, fraction=0.015)
        self.cb.ax.yaxis.set_ticks_position('left')
        # self.cb.ax.yaxis.set_ticks([min(dz),max(dz)/2, max(dz)])
        self.cb.ax.yaxis.set_ticklabels(np.round(np.linspace(min(dz), max(dz), num =6)))

        x = [p[0] for p in self.pALoc.values()]
        y = [p[1] for p in self.pALoc.values()]
        z = np.zeros(len(x))
        dx = [0.4 for num in range(len(x))]
        dy = [0.4 for num in range(len(x))]
        self.ax.bar3d(x, y, z, dx, dy, np.ones(len(x))/50, color = 'blue', alpha = 0.3)
        self.ax.set_xlim3d(0, 20)
        self.ax.set_ylim3d(0, 21)
        if min(v) <0:
            self.ax.set_zlim3d(min(v), max(v))
        else:
            self.ax.set_zlim3d(0, max(v))
        # self.ax.set_zlim3d(0, 4)

        self.ax.set_xlabel('Y')
        self.ax.set_ylabel('X')
        self.ax.set_zlabel('Thickness')
        self.ax.set_xticks([])
        self.ax.set_yticks([])
        # self.ax.set_zticklabels([])
        self.fig.subplots_adjust(left=0, bottom=0, right=1, top=1, wspace=0, hspace=0)
        self.canvas.draw()

    def on_normalized(self,results):

        self.ax.clear()
        if self.cb is not None:
            self.cb.remove()
            self.cb = None
        v = [vv for vv in results.values()]


        x = []
        y = []
        dz = []
        for pos, value in results.items():
            x.append(self.pALoc.get(pos)[0])
            y.append(self.pALoc.get(pos)[1])
            if value >= 0:
                normalized_dz = value/max(v)
            else:
                normalized_dz = -value/min(v)

            dz.append(normalized_dz)


        z = np.zeros(len(x))

        dx = [0.4 for num in range(len(x))]
        dy = [0.4 for num in range(len(x))]
        # colours = cm.jet(np.random.ranf(len(x)))
        colours = cm.jet(dz)

        tt = self.ax.bar3d(x, y, z, dx, dy, dz, color = colours, linewidth = 0.1, edgecolor = 'white', cmap=cm.jet,shade=True)

        self.cb = self.fig.colorbar(tt, ax = self.ax, fraction=0.015)
        self.cb.ax.yaxis.set_ticks_position('left')

        x = [p[0] for p in self.pALoc.values()]
        y = [p[1] for p in self.pALoc.values()]
        z = np.zeros(len(x))
        dx = [0.4 for num in range(len(x))]
        dy = [0.4 for num in range(len(x))]
        self.ax.bar3d(x, y, z, dx, dy, np.ones(len(x))/50, color = 'blue', alpha = 0.3)

        self.ax.set_xlim3d(0, 20)
        self.ax.set_ylim3d(0, 21)
        self.ax.set_zlim3d(-1, 1)
        # self.ax.set_zlim3d(0, 4)

        self.ax.set_xlabel('Y')
        self.ax.set_ylabel('X')
        self.ax.set_zlabel('Thickness')
        self.ax.set_xticks([])
        self.ax.set_yticks([])
        # self.ax.set_aspect('auto')
        # self.ax.set_zticklabels([])
        self.fig.subplots_adjust(left=0, bottom=0, right=1, top=1, wspace=0, hspace=0)
        self.canvas.draw()




    def canvasGeo(self):
        self.pos = 1
        roww = 20
        coll = 22

        ll = [2, 0, -2]
        for row in reversed(range(roww)):
            for col in range(coll):
                if row == 0 and col >= 7 and col <=14:
                    self.newB(row, col, self.pos)
                elif row >= 1 and row <= 4 and col >= 6 - row and col <= row + 15:
                    self.newB(row, col, self.pos)
                elif row ==5 and col >= 7 - row and col <= row + 14:
                    self.newB(row, col, self.pos)
                elif row == 6 and col >=1 and col <= 20:
                    self.newB(row, col, self.pos)
                elif row == 7 and col >= 1 and col <= 20:
                    self.newB(row, col, self.pos)
                elif row <=11 and row >=8:
                    self.newB(row, col, self.pos)
                elif row >=12 and row <=13 and col >= 1 and col <= 20:
                    self.newB(row, col, self.pos)
                elif row >=14 and row <=15 and col >= 2 and col <= 19:
                    self.newB(row, col, self.pos)
                elif row >=16 and row <=18 and col >= row -13 and col <= row + ll[row -16]:
                    self.newB(row, col, self.pos)
                elif row ==19 and col >= 7 and col <= 14:
                    self.newB(row, col, self.pos)





    def newB(self, row, col, pos):
        self.pALoc[pos] = [row, col]

        self.pos += 1

    def getPos(row, col):
        for pos, [r, c] in self.pALoc.values():
            if r == row and c == col:
                return pos

    def setData(self, data):
        self.data = data





def main():
    root = Tk()
    results = {1:250, 2:-330, 3:400, 4: 230, 5:20}
    app = PhaseResultStatus(root, results)
    app.pack(fill = 'both', expand = True)
    # app.threeDStatus(None)
    root.mainloop()

if __name__ == '__main__':
    main()




