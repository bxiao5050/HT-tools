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
        self.xlim1 = 20
        self.xlim2 = 90
        #Frame.__init__(self, master, **kw)

        self.filenameAndV_lines = {}# cif file names and corresponding vertical line
        self.posAndexpLine = {}# exp file names and plot
        self.posAndNoneOffsetExpLines = {}# eposAndNoneOffsetExpLines = {pos:[x, y, color]}

        #multiple pages
        self.pageLine = Frame(master)
        self.pageThreeD = Frame(master)

        self.multipages()

    def multipages(self):
        #1.preparation draw for line page
        self.fig_line = Figure()
        self.canvas_line = FigureCanvasTkAgg(self.fig_line, master = self.pageLine)

        self.ax_line = self.fig_line.add_subplot(111)
        #cursor
        self.cursor_line = None
        self.canvas_line.get_tk_widget().pack(side=TOP, fill=BOTH, expand=1)
        self.canvas_line._tkcanvas.pack(expand=1, fill = 'both')

        self.ax_line.set_ylim(0, 1.3)
        self.ax_line.set_xlabel('2Theta')
        self.ax_line.set_ylabel('Intensity')
        self.canvas_line.draw()
        self.fig_line.subplots_adjust(left=0.06, bottom=0.1, right=0.99, top=1, wspace=0, hspace=0)


        self.offset = 0 #set the first offset value
        self.offset_base = 0
        self.poly = None
        ymax = IntVar()

        fOffset = Frame(self.pageLine)
        fOffset.pack(expand=0, fill = 'x')
        self.bUp = Button(fOffset, text = 'offset ++', width = 9, command = self.up)
        self.bdown = Button(fOffset, text = 'offset --', width = 9, command = self.down)
        self.yscale = Scale(fOffset, from_=1.3, to=15.0, resolution = 0.1, variable = ymax, length = 300, showvalue = 0, orient=HORIZONTAL, command = self.set_ymax)

        ftoolbar = Frame(fOffset)
        toolbar = NavigationToolbar2Tk(self.canvas_line, ftoolbar)
        toolbar.update()
        self.bUp.grid(row = 0, column = 0, padx = (0,10), sticky = 'n')
        self.bdown.grid(row = 0, column = 1, sticky = 'n')
        Label(fOffset, text = 'set y-axis:').grid(row = 0, column =2, sticky = 'n', padx = (10,0))
        self.yscale.grid(row = 0, column = 3, sticky = 'n')
        ftoolbar.grid(row = 0, column = 4,padx = (20,10),  sticky = 'nw')


        #2.preparation draw for threeD page
        self.fig_threeD = Figure()

        self.canvas_threeD = FigureCanvasTkAgg(self.fig_threeD, master = self.pageThreeD)
        self.canvas_threeD.get_tk_widget().pack(side=TOP, fill=BOTH, expand=1)

        self.ax_threeD = self.fig_threeD.add_subplot(111, projection='3d')
        self.z_len = 4
        self.ax_threeD.set_xlabel('2Theta')
        self.ax_threeD.set_zlabel('Intensity')
        self.ax_threeD.set_zlim3d(0, 1)

        self.canvas_threeD.draw()

        fThreeD = Frame(self.pageThreeD)
        fThreeD.pack(expand=0, fill = 'x')
        bwide = Button(fThreeD, text = 'narrow', width = 9, command = self.wide)
        bnarrow = Button(fThreeD, text = 'wide', width = 9, command = self.narrow)
        ftoolbar2 = Frame(fThreeD)
        toolbar2 = NavigationToolbar2Tk(self.canvas_threeD, ftoolbar2)
        toolbar2.update()
        self.canvas_threeD._tkcanvas.pack(side=TOP, fill=BOTH, expand=1)
        bwide.grid(row = 0, column = 0, padx = (0,10), sticky = 'n')
        bnarrow.grid(row = 0, column = 1, sticky = 'n')
        ftoolbar2.grid(row = 0, column = 2, padx = (20,10), sticky = 'nw')


    def set_ymax(self, val):
        self.ax_line.set_ylim(0, float(val))
        self.canvas_line.draw()



######################################3d###############################
    def threeDUpdata(self):
        if self.poly is not None:
            self.poly.remove()

        zs = range(len(self.posAndexpLine.keys()))
        # z = len(self.posAndexpLine.keys())
        verts = []
        colors = []
        for pos, data in self.posAndNoneOffsetExpLines.items():
            xs, ys, color = data
            xs = xs[::10] #only use partial data, increase plot speed
            ys = ys[::10]
            colors.append(color)
            ys[0], ys[-1] = 0, 0
            verts.append(list(zip(xs, ys)))

        self.poly = PolyCollection(verts, closed = False, edgecolors = colors, linewidths = 1, facecolors = self.ax_threeD.get_facecolor())

        self.poly.set_alpha(0.9)
        self.ax_threeD.set_ylim3d(-1  , self.z_len)
        self.ax_threeD.add_collection3d(self.poly, zs=zs, zdir='y')
        self.canvas_threeD.draw()
        self.fig_threeD.subplots_adjust(left=0, bottom=0, right=1, top=1, wspace=0, hspace=0)



#########################################offset page######################
    #offset command
    def reDraw(self):
        yoff = 0
        for pos, data in self.posAndNoneOffsetExpLines.items():
            self.posAndexpLine.get(pos).remove()
            x, y, color = data
            offLine, = self.ax_line.plot(x, y + yoff, label = f'pos{pos}')
            offLine.set_color(color)
            self.posAndexpLine[pos] = offLine
            yoff = yoff + self.offset

        self.offset_base = yoff
        self.setLegend()


    def up(self):
        # self.offset_up += 0.01
        self.offset = self.offset + 0.01
        self.reDraw()

    def down(self):
        # self.offset_down -= 0.01
        self.offset = self.offset - 0.01
        self.reDraw()

    def wide(self):
        self.z_len *= 2
        self.threeDUpdata()

    def narrow(self):
        self.z_len /= 2
        self.threeDUpdata()



    #get cal Vline from linecollection
    def segToLine(self, seg):
        a = seg.get_segments()
        x = []
        y = []
        for i in range(len(a)):
          x.append(a[i][0][0])
          y.append(a[i][1][1])
        return [x, y]

#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    #add Vline, one simulated XRD data
    def plotLine(self, data, filename):
        vline = self.ax_line.vlines(data.x, np.zeros(len(data.x)), data.y/100, label = filename)
        self.filenameAndV_lines[filename] = vline
        vline.set_color(np.random.rand(3))
        self.setLegend()


    #deleta a v line
    def deletePlot(self, filename):
        vline = self.filenameAndV_lines.get(filename)
        vline.remove()# remove vertical line from canvas
        self.filenameAndV_lines.pop(filename, None) #remove cif file name and its data
        self.setLegend()


    #plot one exp XRD data
    def plotExpLine(self, x, y, pos):
        expLine, = self.ax_line.plot(x, np.array(y) + self.offset_base, label = f'pos{pos}')
        color = expLine.get_color()

        self.posAndexpLine[pos] = expLine
        self.posAndNoneOffsetExpLines[pos] = [np.array(x),np.array(y), color] #record line data
        self.setLegend()

        self.offset_base = self.offset_base + self.offset
        self.threeDUpdata()



    #deleta an exp line
    def deleteExpLine(self, pos):
        expLine = self.posAndexpLine.get(pos)
        expLine.remove()# remove vertical line from canvas
        self.posAndexpLine.pop(pos, None) #remove exp file name and its data
        self.posAndNoneOffsetExpLines.pop(pos, None)
        self.setLegend()

        self.threeDUpdata()



    #delete all v lines
    def deleteAllPlot(self):
        for vline in self.filenameAndV_lines.values():
            vline.remove()
        self.filenameAndV_lines.clear()
        self.canvas_line.draw()
        self.fig_line.subplots_adjust(left=0.06, bottom=0.1, right=0.99, top=1, wspace=0, hspace=0)




    #set legend
    def setLegend(self):
        self.ax_line.legend(loc='upper left', ncol=3, fontsize = 'small').set_draggable(True)
        self.canvas_line.draw()
        self.fig_line.subplots_adjust(left=0.06, bottom=0.1, right=0.99, top=1, wspace=0, hspace=0)



########################################################################
    #get current v lines
    def getCalVlineNames(self):
        return list(self.filenameAndV_lines.keys())

    #get color of exp line
    def getLineColor(self, pos):
        return colors.rgb2hex(self.posAndexpLine.get(pos).get_color())


    def setXlim(self, xlim1, xlim2):
        self.xlim1 = xlim1
        self.xlim2 = xlim2
        self.ax_line.set_xlim(self.xlim1, self.xlim2)
        self.ax_threeD.set_xlim3d(self.xlim1, self.xlim2)

    def resetOffsetValue(self):
        self.offset = 0
        self.offset_base = 0

        self.z_len = 4

    def useCursor(self):
        self.cursor = matplotlib.widgets.Cursor(self.ax_line, useblit=True, color = 'black',
            linewidth=1, alpha = 0.8, linestyle = ':')



