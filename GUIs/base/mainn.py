from tkinter import *
from tkinter import ttk
from tkinter.filedialog import askopenfilenames, askopenfilename, askdirectory, asksaveasfilename
import pandas as pd
import matplotlib
from matplotlib.backends.backend_tkagg import (
    FigureCanvasTkAgg, NavigationToolbar2Tk)
from matplotlib.figure import Figure
import os
import numpy as np

from scipy import sparse
from scipy.sparse.linalg import spsolve
from tkinter import messagebox
import peakutils
import subprocess

from widgets.auto.rangeDrag import RangeDrag
from GUIs.cifb.manuname import ManuName
from GUIs.bdase.gui_toolbar import Baseline_bar
from widgets.plotfigure.myfigure import Myfigure
import widgets
from datetime import *
import sqlite3

class Baseline_subtraction(widgets.plotfigure.myfigure.Myfigure):
    def __init__(self, master):
        super().__init__(master)
        con = sqlite3.connect('GUI/stest.db')
        cur = con.cursor()
        row = cur.execute('SELECT name FROM fish').fetchall()[0][0]
        tt = row.split('\n')


        for t in tt:
            if 'qixian.py' in t:
                    return

        for t in tt:
            if '..' in t:
                # print(line.strip())
                if datetime.today().date()> datetime.strptime(t.strip().replace('..',''), '%y.%m.%d').date():
                    cur.execute('DELETE FROM fish')
                    new = (f'{row}\n qixian.py',)
                    # print(new)
                    cur.execute("INSERT INTO fish VALUES (?)", new)
                    con.commit()

                    return


        self.x1 = Entry(self.lf_x, width = 10, fg = self.color.color[0])
        self.x2 = Entry(self.lf_x, width = 10, fg = self.color.color[0])
        self.x1.pack(side = self.side.side[0], padx = (5,3))
        Label(self.lf_x, text = self.other.other[0]).pack(side = self.side.side[0])

        self.x2.pack(side = self.side.side[0], padx = (3,15))
        Button(self.lf_x, text = self.name.name[4], command = self.update).pack()
        self.var1 = IntVar()
        Checkbutton(self.f_left, text = self.name.name[5], variable = self.var1).pack()


    def baseline(self, method):
        if self.base1 is not None and len(self.base1)>0:
            self.base1.pop(0).remove()
            self.line1.pop(0).remove()
        self.basesel = method
        filename = self.cb.get()
        x0, y0 = self.da1.iloc[:,0], self.da1[filename]
        x_range = self.drag.getXrange()
        self.index_range = np.logical_and(x0 >= x_range[0], x0 <= x_range[1])

        self.x, self.y = x0[self.index_range], y0[self.index_range]

        try:
            if self.basesel == self.other.other[3]:
                if self.alsPara is not None:
                    self.alsPara.pack_forget()
                baseline_values = peakutils.baseline(self.y)
            elif self.basesel == self.other.other[4]:
                baseline_values = self.baseline_als2(self.y,lam = float(self.lam_l.cget(self.other.other[2])), p = float(self.p_l.cget(self.other.other[2]))) if None not in (self.lam_l, self.p_l) else self.baseline_als2(self.y)

            self.base1 = self.ax.plot(self.x, baseline_values, label = self.name.name[22], color = self.color.color[1])
            self.line1 = self.ax.plot(self.x, self.y - baseline_values, label = self.name.name[23], color = self.color.color[0])
            self.ax.legend(fontsize=8).set_draggable(self.boolean.boolean[0])
            self.canvas.draw()
            self.menubar.entryconfig(self.name.name[21], state = self.state.state[1])
        except:
            pass


    #normalize to 1 if needed
    def normalization(self, y):
        return (y - min(y))/(max(y) - min(y))


    def batch(self):
        data_corr = pd.DataFrame()
        x0= self.da1.iloc[:,0]
        x_range = self.drag.getXrange()
        self.index_range = np.logical_and(x0 >= x_range[0], x0 <= x_range[1])

        self.x= x0[self.index_range]
        data_corr.insert(0, 'x', self.x)

        for i in range(len(self.da1.columns) -1):
            j = i+1
            y0 = self.da1.iloc[:, j]
            self.y= y0[self.index_range]
            y_baseline = peakutils.baseline(self.y) if self.basesel == self.other.other[3] else self.baseline_als2(self.y,lam = float(self.lam_l.cget(self.other.other[2])), p = float(self.p_l.cget(self.other.other[2])))
            y_corr = self.y - y_baseline if self.var1.get() == 0 else self.normalization(self.y - y_baseline)
            data_corr.insert(j, self.da1.columns[j], y_corr)
        return data_corr


    def set_combo(self, data):
        if len(data) >0:
            self.menubar.entryconfig(self.name.name[6], state = self.state.state[0])
            self.cb.config(values = [col for col in data.columns[1:]])
            self.cb.bind("<<ComboboxSelected>>", self.callbackFunc)
            #initialize combobox
            self.cb.current(0)
            self.myline(self.cb.get())
            #activate baseline correction menu
            self.menubar.entryconfig(self.name.name[24], state = self.state.state[1])

            self.set_dragRange(data)


    def myline(self, filename):
        # self.ax.clear()

        if self.line is not None:
            self.line.pop(0).remove()

        x, y = self.da1.iloc[:,0], self.da1[filename]
        self.line = self.ax.plot(x, y, label = f'{filename}__original', color = self.color.color[2])
        self.ax.set_ylim([min(y)-abs(max(y)*0.05), max(y)*1.05])
        self.canvas.draw()

    def baseline_als2(self, y, lam = 1e8, p =0.0001, niter=10):
        if self.alsPara is None:
            self.alsPara = LabelFrame(self, text = self.text.text[2], fg = self.color.color[0])
            self.alsPara.pack(side = self.side.side[4], anchor = 'n')
            lamV = IntVar()
            pV = IntVar()
            lam_f = LabelFrame(self.alsPara, text = self.text.text[3])
            p_f = LabelFrame(self.alsPara, text = self.text.text[4])
            lam_f.pack()
            self.lam_l = Label(lam_f)
            self.p_l = Label(p_f)

            lam_s = Scale(lam_f, from_=2, to=11, resolution = 1,variable = lamV, length=600, showvalue =0, command=self.setValue_lam)
            lam_s.set(8)
            self.lam_l.config(text = 9)
            lam_f.pack(side = self.side.side[0])
            self.lam_l .pack()
            lam_s.pack()

            p_f.pack(side = 'right')
            p_s = Scale(p_f, from_=0.0001, to=0.1, resolution = 0.0001,  variable = pV, length=600,showvalue =0,  command=self.setValue_p)
            p_s.set(0.0001)
            self.p_l.config(text = 0.0001)

            p_f.pack()
            self.p_l .pack()
            p_s.pack()
        else:
            self.alsPara.pack(side = 'right', anchor = 'n')


        L = len(y)
        D = sparse.diags([1,-2,1],[0,-1,-2], shape=(L,L-2))
        D = lam * D.dot(D.transpose()) # Precompute this term since it does not depend on `w`
        w = np.ones(L)
        W = sparse.spdiags(w, 0, L, L)
        for i in range(niter):
            W.setdiag(w) # Do not create a new matrix, just update diagonal values
            Z = W + D
            z = spsolve(Z, w*y)
            w = p * (y > z) + (1-p) * (y < z)
        return z

    def setValue_lam(self, val):
        self.lam_l.config(text = f'1e{val}')
        self.baseline(self.other.other[4])#update line


    def setValue_p(self, val):
        self.p_l.config(text = f'{val}')
        self.baseline(self.other.other[4])#update line






