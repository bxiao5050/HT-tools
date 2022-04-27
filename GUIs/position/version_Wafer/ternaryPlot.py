import ternary
import numpy as np

from tkinter import *
from tkinter import ttk
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
import pandas as pd
import math


class TernaryPlot(Frame):
    def __init__(self, master, df = None):
        super().__init__(master)
        self.pack(fill = 'both', expand = True)
        if df is not None:
            ele_name = [v for v in df.columns]
            self.df = df
        else:
            ele_name = ['1', '2', '3']
        lf = LabelFrame(self, text = 'choose elements')
        lf.pack()
        Label(lf, text = 'left').grid(row = 0, column = 0)
        self.ele_left = ttk.Combobox(lf, width =5, values = ele_name)
        self.ele_left.current(0)
        self.ele_left.grid(row = 1, column = 0)

        Label(lf, text = 'bottom').grid(row = 0, column = 1)
        self.ele_bottom = ttk.Combobox(lf, width =5, values = ele_name)
        self.ele_bottom.current(1)
        self.ele_bottom.grid(row = 1, column = 1)

        Label(lf, text = 'right').grid(row = 0, column = 2)
        self.ele_right = ttk.Combobox(lf, width =5, values = ele_name)
        self.ele_right.current(2)
        self.ele_right.grid(row = 1, column = 2)

        Button(lf, text = 'Ok', fg = 'red', command = self.on_OK).grid(row = 1, column = 3, padx = (10,0))


        self.scale = 100
        self.t1 = None
        self.ternaryP = None
        self.l1 = None

        self.on_OK()



    def myPlot(self, points, leftLabel = '', rightLabel = '', bottomLabel = ''):
        # self.f.delaxes(self.tax)

        if self.t1 is not None:
            self.t1.remove()
            self.t2.remove()
            self.t3.remove()
            self.plot_f.pack_forget()



        self.plot_f = Frame(self)
        self.plot_f.pack(fill = 'both', expand = True)

        self.f, self.tax = ternary.figure(scale=self.scale)
        # self.ax = f.add_subplot(111)
        self.canvas = FigureCanvasTkAgg(self.f, master = self.plot_f)
        self.canvas.get_tk_widget().pack(fill = 'both', expand = True)
        toolbar = NavigationToolbar2Tk(self.canvas, self.plot_f)
        toolbar.update()
        self.canvas.figure.canvas.mpl_connect('button_press_event', self.onclick)


        self.ternaryP = self.tax.scatter(points, marker='s', color='red', label="Red Squares", s = 3)
        self.t1 = self.f.text(0.21,0.55, leftLabel, fontsize = 16)
        self.t2 = self.f.text(0.48, 0.05, bottomLabel, fontsize = 16)
        self.t3 = self.f.text(0.76, 0.55, rightLabel, fontsize = 16)
        #draw boundary and gridlines
        self.tax.boundary(linewidth=2.0)
        self.tax.gridlines(multiple=int(self.scale/10), color="blue")


        # self.tax.set_title("Scatter Plot", fontsize=20)
        self.tax.ticks(axis='lbr', linewidth=1, multiple=int(self.scale/10), offset= 0.03)
        self.tax.get_axes().axis('off')
        self.tax.clear_matplotlib_ticks()
        self.canvas.draw()

    def on_OK(self):

        leftLabel = self.ele_left.get()
        rightLabel = self.ele_right.get()
        bottomLabel = self.ele_bottom.get()
        points = self.normalization(self.df[[bottomLabel, rightLabel, leftLabel]].values)
        # print(points)
        self.myPlot(points, leftLabel = leftLabel, rightLabel = rightLabel, bottomLabel = bottomLabel)

    def onclick(self, event):
        click = event.xdata, event.ydata

        if None not in click :
            if self.l1 is not None:
                self.l1.remove()
                self.l2.remove()
                self.l3.remove()


            x = click[0] - math.sqrt(1/3)*click[1]
            z = self.scale - click[0] - math.sqrt(1/3)*click[1]
            y = self.scale - x -z

            p0 = (x,y,z)#click point
            p_bottom = (x, 0, self.scale - x)
            p_right = (self.scale -y, y, 0)
            p_left = (0, self.scale -z, z)

            self.l1, = self.tax.get_axes().plot((click[0], x), (click[1], 0), color = 'green', linestyle = ':')
            self.l2, = self.tax.get_axes().plot((click[0], click[0]+z), (click[1], click[1]), color = 'green', linestyle = ':')
            self.l3, = self.tax.get_axes().plot((click[0], 0.5*(self.scale -z)), (click[1], math.sqrt(3)/2*(self.scale -z)), color = 'green', linestyle = ':')


            self.canvas.draw()



    def normalization(self, points):
        nor_point = []
        for row in points:
            nor_point.append(np.array(row)/sum(row)*100)
        return nor_point










