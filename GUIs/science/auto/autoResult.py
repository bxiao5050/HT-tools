import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk


from mywidgets.figurePanel import plotFig
from mywidgets.treeviewXRD import treeCalXRD
from mywidgets.treeviewDataExp import treeviewExp
from mywidgets.wafer import wafer_visual
import pandas as pd
import numpy as np

from tkinter import *
from tkinter import ttk

class autoRes(Toplevel):
    '''
    right click and show the fitting result
    '''
    def __init__(self, master, fitResultPos = dict(), x = [], y = [], pos = 0, **kw):
        Toplevel.__init__(self, master, **kw)
        self.master = master
        self.fitResultPos = fitResultPos

        self.x = x
        self.y = y

        self.p_findpeaks = None
        self.p_matchpeaks = None
        self.p_nonmatchedpeaks = None

        self.pos = pos
        self.title(f'pos : {self.pos} (result from automation)')
        contant = Frame(self)
        contant.pack(fill = 'both', expand = True)

        #layout
        self.canvasP = Frame(contant)
        list2 = Frame(contant, width = 300, height = 600)
        self.mycanvas() # Bframe on the left and container on the right

        #GUI widegts
        self.tv = treeCalXRD.CalTree(list2, None)

        self.tv.config(text = 'Rererence XRD')
        self.tv.pack()
        self.tv.set_treeview_click(self.on_treeview)

        self.canvasP.grid(row = 0, column = 0, sticky = ('n', 'w', 'e', 's'))
        list2 .grid(row = 0, column = 1, sticky = ('n', 'w', 'e', 's'))

        contant.columnconfigure(0, weight = 3)
        contant.rowconfigure(0, weight = 3)

        #set the treeview
        self.tv.readButton.grid_forget()
        self.tv.addButton.grid_forget()
        self.tv.bb.grid_forget()
        self.tv.by.grid_forget()
        self.tv.br.grid_forget()
        self.tv.bw.grid_forget()
        self.tv.deleteButton.grid_forget()
        self.tv.bRevomeTags.pack_forget()

        self.populateTV()

        #plot exp
        self.ax.plot(self.x, self.y, label = f'pos: {pos}')


    def mycanvas(self):
        fig = Figure()
        self.canvas = FigureCanvasTkAgg(fig, master = self.canvasP)
        self.ax = fig.add_subplot(111)
        self.canvas._tkcanvas.pack(fill = 'both', expand = True)
        toolbar = NavigationToolbar2Tk(self.canvas, self.canvasP)
        toolbar.update()
        toolbar.pack()
        self.ax.set_xlim(min(self.x), max(self.x))
        self.ax.set_ylim(0, 1.35)

        self.canvas.draw()

    def populateTV(self):
        if self.fitResultPos is not None:
            self.tv.tv.heading('%', command=lambda: self.treeview_sort_column(self.tv.tv, '%', False))

            for filename, cR in self.fitResultPos.items():
                self.tv.insertItem(filename, "{:3.4f}".format(cR['per']))


    def treeview_sort_column(self, tv, col, reverse):
        l = [(tv.set(k, col), k) for k in tv.get_children('')]
        l.sort(reverse=reverse)

        # rearrange items in sorted positions
        for index, (val, k) in enumerate(l):
            tv.move(k, '', index)
        # reverse sort next time
        tv.heading(col, command=lambda: self.treeview_sort_column(tv, col, not reverse))

    #when the items in treeview are selected
    def on_treeview(self, e):
        #1. get selected items
        selItem = [self.tv.tv.item(se)['text'] for se in self.tv.tv.selection() ]

        #2. remove old
        if len(selItem) != 0:
            if self.p_findpeaks is not None:
                self.p_findpeaks.remove()
                self.p_matchpeaks.remove()
                self.p_nonmatchedpeaks.remove()
                self.p_minHeight.remove()

            cR = self.fitResultPos.get(selItem[0])

            self.p_findpeaks, = self.ax.plot(cR['expPeaks_x'], cR['expPeaks_y'], 'x', color = 'orange', label = f'calculated peaks from experimental data')
            self.p_matchpeaks = self.ax.vlines(cR['cal_mx'], np.zeros(len(np.atleast_1d(cR['cal_mx']))), cR['cal_my'], color = 'red', label = f'Matched peaks')
            self.p_nonmatchedpeaks = self.ax.vlines(cR['cal_nonmx'], np.zeros(len(np.atleast_1d(cR['cal_nonmx']))), cR['cal_nonmy'], linestyle="dashed", color = 'gray', label = f'Unmatched peaks')
            self.p_minHeight = self.ax.hlines(cR['minHeight'], min(self.x), max(self.x), linestyle="dotted", color = 'firebrick', label = f'minHeight')

            self.ax.legend(loc='upper left', ncol=2, fontsize = 'small').set_draggable(True)

            self.ax.set_xlim(min(self.x), max(self.x))
            self.ax.set_ylim(0, 1.35)
            self.canvas.draw()



