import matplotlib
matplotlib.use("TkAgg")


from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from matplotlib import colors
from matplotlib.collections import PolyCollection
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
import pandas as pd


from tkinter import *
from tkinter import ttk

class PlotCanvas():
#plot XRD data to canvas panel
    def __init__(self, master):
        #Frame.__init__(self, master, **kw)

        self.filenameAndV_lines = {}# cif file names and corresponding vertical line
        self.filenameAndV_lines_offset = {}
        self.posAndexpLine = {}# exp file names and plot
        self.posAndexpLine_offset = {}# exp file names and plot

        #multiple pages
        self.pageLine = Frame(master)
        self.pageOffset = Frame(master)
        self.pageThreeD = Frame(master)

        self.multipages()

    def multipages(self):
        #preparation draw for line page
        self.fig_line = Figure()
        self.ax_line = self.fig_line.add_subplot(111)
        self.ax_line.set_xlim(0, 90)
        self.ax_line.set_ylim(0, 1.3)

        self.canvas_line = FigureCanvasTkAgg(self.fig_line, master = self.pageLine)
        self.canvas_line.get_tk_widget().pack(expand = True, fill = 'both')
        toolbar = NavigationToolbar2Tk(self.canvas_line, self.pageLine)
        toolbar.update()
        self.canvas_line._tkcanvas.pack(side=TOP, fill=BOTH, expand=1)

        #preparation draw for offset page
        self.fig_offset = Figure()
        self.ax_offset = self.fig_offset.add_subplot(111)
        self.ax_offset.set_xlim(0, 90)
        self.ax_offset.set_ylim(0, 1.3)

        self.canvas_offset = FigureCanvasTkAgg(self.fig_offset, master = self.pageOffset)
        self.canvas_offset.get_tk_widget().pack( expand = True, fill = 'both')
        toolbar = NavigationToolbar2Tk(self.canvas_offset, self.pageOffset)
        toolbar.update()
        self.canvas_offset._tkcanvas.pack(side='top', fill=BOTH, expand=1)

        self.offset = 0.1 #set the first offset value
        fOffset = Frame(self.pageOffset)
        fOffset.pack(side = 'top' , expand=1)
        self.bUp = Button(fOffset, text = 'up', width = 5, height = 1, command = self.up)
        self.bdown = Button(fOffset, text = 'down', width = 5, height = 1, command = self.down)
        self.bUp.grid(row = 0, column = 0, padx = (0,10))
        self.bdown.grid(row = 0, column = 1)

        #preparation draw for threeD page
        fig_threeD = Figure()

        self.canvas_threeD = FigureCanvasTkAgg(fig_threeD, master = self.pageThreeD)
        self.canvas_threeD.get_tk_widget().pack(expand = True, fill = 'both')
        self.canvas_threeD.draw()
        self.ax_threeD = fig_threeD.add_subplot(111, projection='3d')
        toolbar = NavigationToolbar2Tk(self.canvas_threeD, self.pageThreeD)
        toolbar.update()
        self.canvas_threeD._tkcanvas.pack(side=TOP, fill=BOTH, expand=1)

        self.z_wide = 1
        self.z_narrow = -1
        self.z_len = 1

        fThreeD = Frame(self.pageThreeD)
        fThreeD.pack(side = 'top' , expand=1)
        bwide = Button(fThreeD, text = 'wide', width = 5, height = 1, command = self.wide)
        bnarrow = Button(fThreeD, text = 'narrow', width = 5, height = 1, command = self.narrow)
        bwide.grid(row = 0, column = 0, padx = (0,10))
        bnarrow.grid(row = 0, column = 1)

    #get current v lines
    def getCalVlineNames(self):
        return list(self.filenameAndV_lines.keys())

    #get color of exp line
    def getLineColor(self, pos):
        return colors.rgb2hex(self.posAndexpLine.get(pos).get_color())

######################################3d###############################
    def draw_3D(self):
        self.ax_threeD.clear()

        zs = range(len(self.posAndexpLine.keys()))
        z = len(self.posAndexpLine.keys())
        verts = []
        colors = []
        for pos, expLine in self.posAndexpLine.items():
            xs = expLine.get_xdata()
            ys = expLine.get_ydata()
            colors.append(expLine.get_color())
            ys[0], ys[-1] = 0, 0
            verts.append(list(zip(xs, ys)))

        poly = PolyCollection(verts, closed = False, edgecolors = colors, linewidths = 1, facecolors = self.ax_threeD.get_facecolor())

        poly.set_alpha(0.5)
        self.ax_threeD.add_collection3d(poly, zs=zs, zdir='y')


        self.ax_threeD.set_xlabel('X')
        self.ax_threeD.set_xlim3d(0, 90)
        self.ax_threeD.set_ylim3d(-1  , z - self.z_len)
        self.ax_threeD.set_zlabel('Y')
        self.ax_threeD.set_zlim3d(0, 1)

        self.canvas_threeD.draw()

#########################################offset page######################
    #offset command
    def reDraw(self):
        self.ax_offset.clear()

        #offset lines
        yoffset = self.offset
        for pos, expLine in self.posAndexpLine.items():
            offLine, = self.ax_offset.plot(expLine.get_xdata() , expLine.get_ydata() + yoffset, label = pos)
            offLine.set_color(expLine.get_color())
            yoffset += self.offset

        #vline
        for filename, vline in self.filenameAndV_lines.items():
            [x, y] = self.segToLine(vline)
            offvline = self.ax_offset.vlines(x, np.zeros(len(x)), y, label = filename)
            offvline.set_color(vline.get_color())

        self.ax_offset.set_xlim(0, 90)
        self.ax_offset.set_ylim(0, 1.3)
        self.setLegend_offset()



    def up(self):
        self.offset += 0.01
        self.reDraw()

    def down(self):
        self.offset -= 0.01
        self.reDraw()

    def wide(self):
        self.z_wide += 1
        self.z_len += self.z_wide
        self.draw_3D()

    def narrow(self):
        self.z_narrow += 1
        self.z_len -= self.z_narrow
        self.draw_3D()


    #get cal Vline from linecollection
    def segToLine(self, seg):
        a = seg.get_segments()
        x = []
        y = []
        for i in range(len(a)):
          x.append(a[i][0][0])
          y.append(a[i][1][1])
        return [x, y]

    def segToArray(self, seg):
        pass



#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    #plot one simulated XRD data
    def plotLine(self, data, filename):

        #self.ax_line.stem(data.x, data.y/100)
        color = np.random.rand(3)

        vline = self.ax_line.vlines(data.x, np.zeros(len(data.x)), data.y/100, label = filename)
        self.filenameAndV_lines[filename] = vline
        vline.set_color(color)
        self.setLegend()

        offvline = self.ax_offset.vlines(data.x, np.zeros(len(data.x)), data.y/100, label = filename)
        self.filenameAndV_lines_offset[filename] = offvline
        offvline.set_color(color)
        self.setLegend_offset()

        #self.draw_3D()


    #deleta a v line
    def deletePlot(self, filename):
        vline = self.filenameAndV_lines[filename]
        vline.remove()# remove vertical line from canvas
        self.filenameAndV_lines.pop(filename, None) #remove cif file name and its data
        self.setLegend()

        offvline = self.filenameAndV_lines_offset[filename]
        offvline.remove()# remove vertical line from canvas
        self.filenameAndV_lines_offset.pop(filename, None)
        self.setLegend_offset()



    #plot one exp XRD data
    def plotExpLine(self, x, y, pos):
        color = np.random.rand(3)

        expLine, = self.ax_line.plot(x, y, label = pos)
        self.posAndexpLine[pos] = expLine
        expLine.set_color(color)
        self.setLegend()


        offLine, = self.ax_offset.plot(x, np.array(y) + self.offset, label = pos)
        self.posAndexpLine_offset[pos] = expLine
        offLine.set_color(color)
        self.setLegend_offset()

        self.draw_3D()


    #deleta an exp line
    def deleteExpLine(self, pos):
        expLine = self.posAndexpLine.get(pos)
        expLine.remove()# remove vertical line from canvas
        self.posAndexpLine.pop(pos, None) #remove exp file name and its data
        self.setLegend()

        expLine_offset = self.posAndexpLine_offset.get(pos)
        print(expLine_offset)
        expLine_offset.remove()# remove vertical line from canvas
        self.posAndexpLine_offset.pop(pos, None) #remove exp file name and its data
        self.setLegend_offset()

        self.draw_3D()

    #delete all v lines
    def deleteAllPlot(self):
        for vline in self.filenameAndV_lines.values():
            vline.remove()
        self.filenameAndV_lines.clear()
        self.canvas_line.draw()

        self.reDraw()

        self.draw_3D()



########################################################################
    #set legend
    def setLegend(self):
        #self.ax_line.legend()
        self.ax_line.legend(loc='upper left', ncol=3, fontsize = 'small').set_draggable(True)
        # self.ax_threeD.legend(loc='upper left', ncol=3, fontsize = 'small').set_draggable(True)

        self.canvas_line.draw()
        # self.canvas_threeD.draw()

    def setLegend_offset(self):
        self.ax_offset.legend(loc='upper left', ncol=3, fontsize = 'small').set_draggable(True)
        self.canvas_offset.draw()




