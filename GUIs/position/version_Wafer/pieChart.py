from tkinter.filedialog import askopenfilenames, askopenfilename
from tkinter.colorchooser import *
import matplotlib
matplotlib.use("TkAgg")
from matplotlib import colors
from matplotlib.figure import Figure
from matplotlib import cm
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from matplotlib import cm
from tkinter.colorchooser import *
from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
import threading
import time

try:
    from pie_target_positions import Pie_target_positions
except: from version_Wafer.pie_target_positions import Pie_target_positions



class PieChart(Frame):
    def __init__(self, master, data = None):
        super().__init__(master)


        if data is not None:
            self.data = data
        """
          Spectrum         x        y    Ru     Pd  Ag   Ir      Pt
        Spectrum 1 {6}  -22,67  -40,969 21,5    5,9 3   50,4    19,1
        Spectrum 1 {7}  -18,169 -40,969 19,6    5,3 2,5 52,6    20
        Spectrum 1 {8}  -13,67  -40,969 18,5    6,5 2,5 51,9    20,5
        """
        self.pieChars = {}#piecharts
        self.legendB = {}
        self.ax_sub = {}
        self.click_highlight = None

        left_f = Frame(self)
        self.right_f = Frame(self)
        left_f.pack(side = 'left')
        self.right_f.pack(side = 'right')

        self.inf = LabelFrame(left_f, text = ' ' + '\n' + ' ')
        plotF = Frame(left_f, bg = 'white')
        self.inf.pack()
        plotF.pack()


        f = Figure(figsize = (8,8))
        self.canvas = FigureCanvasTkAgg(f, master = plotF)

        self.canvas.figure.canvas.mpl_connect('button_press_event', self.on_click)
        self.ax = f.add_subplot(111)
        toolbarF = Frame(plotF)
        toolbar = NavigationToolbar2Tk(self.canvas, toolbarF)
        toolbar.update()
        f.set_facecolor('white')

        self.legengF = Frame(plotF, bg = 'white')


        self.canvas.get_tk_widget().grid(row = 0, column = 0)
        toolbarF.grid(row = 1, column = 0)
        self.legengF.grid(row = 0, column = 1, sticky = 'sw', pady = (0,60), padx = (0, 5))

        self.ax.set_xlim(-49, 49)
        self.ax.set_ylim(-49, 49)
        self.ax.axis('off')
        f.subplots_adjust(left=0.01, bottom=-0.01, right=1, top=1, wspace=0, hspace=0)

        # threading.Thread(target = self.plotPiechart).start()

        self.drawPiechart()

    def drawPiechart(self):
        insetsize = 5.2
        #draw piechart
        self.deviation = 4.5/2
        elements = [v for v in self.data.columns[3:]]
        colorlist = cm.Set3(np.linspace(0, 1, len(elements)))
        #piechar legend/ target position
        self.pie_setting = Pie_target_positions(self.right_f, labels = elements, colors = colorlist)
        self.pie_setting.pack(anchor = 'n', padx = (5,5))
        self.pie_setting.config(text = 'set target positions')
        Button(self.right_f, text = 'apply', fg = 'red', command = self.on_pie_setting).pack(anchor = 'e', pady = (5,5), padx = (5,5))

        # infomaiton panel
        self.ele_l = {} # ele name and the corresponding values
        self.ele_v = {}
        for eleindex, ele in enumerate(elements):
            self.ele_l[eleindex] = Label(self.inf, width = 4, text = ele)
            self.ele_v[eleindex] = Label(self.inf, width = 4, text = '')
            self.ele_l.get(eleindex).grid(row = 0, column = eleindex)
            self.ele_v.get(eleindex).grid(row = 1, column = eleindex)
        for index, row in self.data.iterrows():
            x = row[1]-insetsize/2
            y = row[2]-insetsize/2

            self.ax_sub[index] = self.ax.inset_axes([x, y, insetsize, insetsize], transform=self.ax.transData)
            self.pieChars[index], t1 = self.ax_sub[index].pie([v for v in row[3:]], colors = colorlist, wedgeprops = {'linewidth' :0.5, 'edgecolor' :'black'})
            self.ax_sub[index].axis('off')
        #draw legend
        for eleindex, ele in enumerate(elements):
            self.legendB[eleindex] = Button(self.legengF, width = 3, bg = colors.rgb2hex(colorlist[eleindex]), relief = 'flat', command = lambda eleindex = eleindex: self.on_legend(eleindex))
            self.legendB.get(eleindex).grid(row = eleindex, column = 0)
            Label(self.legengF, width = 3, text = ele, font='Helvetica 13 bold', bg = 'white').grid(row = eleindex, column = 1)

        self.canvas.draw()

    def on_legend(self, eleindex):
        newcolor = colorchooser.askcolor()[1] #select color
        #change 342 piechart
        self.legendB.get(eleindex).config(bg = newcolor)
        for pie in self.pieChars.values():
            pie[eleindex].set_color(newcolor)
            pie[eleindex].set_linewidth(0.5)
            pie[eleindex].set_edgecolor('black')
        self.canvas.draw()
        #change legend pie
        self.pie_setting.set_slice_color(eleindex, newcolor)


    def on_click(self, event):
        click = event.xdata, event.ydata
        if None not in click: # clicking outside the plot area produces a coordinate of None, so we filter those out.
            index = self.getPiechartIndex(click[0], click[1])
            if len(index):
                self.inf.config(text =  'pos: {}'.format(index[0] + 1)+ '\n'+ self.data.iat[index[0], 0])
                for eleindex in range(len(self.data.columns[3:])):
                    self.ele_v.get(eleindex).config(text = self.data.iat[index[0], eleindex + 3])


    def getPiechartIndex(self, r, c):
        x = self.data.iloc[:, 1].to_numpy()
        y = self.data.iloc[:, 2].to_numpy()
        return np.where(np.logical_and(abs(r-x)<self.deviation, abs(c-y)<self.deviation) == True)[0]

    def on_pie_setting(self):
        # self.ax.clear()
        setting = self.pie_setting.get_pie_setting()



        for index, row in self.data.iterrows():
            d = [v for v in row[3:]]
            sizes = [d[i] for i in setting['sequence']]
            colors = [setting['colors'][i] for i in setting['sequence']]
            self.ax_sub[index].clear()

            self.pieChars[index], t1 = self.ax_sub[index].pie(sizes, colors = colors, startangle = setting['startangle'], wedgeprops = {'linewidth' :0.5, 'edgecolor' :'black'})
        self.canvas.draw()









