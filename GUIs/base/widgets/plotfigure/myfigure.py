from tkinter import *
from tkinter import ttk
from tkinter.filedialog import askopenfilenames, askopenfilename, askdirectory, asksaveasfilename
import pandas as pd
import matplotlib
import subprocess
import os
from matplotlib.backends.backend_tkagg import (
    FigureCanvasTkAgg, NavigationToolbar2Tk)
from matplotlib.figure import Figure
from GUIs.bdase.gui_toolbar import Baseline_bar
class Myfigure(Baseline_bar):

    def __init__(self, master):
        super().__init__(master)
        self.master = master
        f = Figure(figsize=(5,5), dpi=100)
        self.ax = f.add_subplot(111)
        self.canvas = FigureCanvasTkAgg(f, master = self.f_left)
        self.ax.set_xlabel(self.name.name[1])
        self.ax.set_ylabel(self.name.name[2])
        toolbar = NavigationToolbar2Tk(self.canvas, self.f_left)
        toolbar.update()
        self.lf1.pack()
        self.canvas.get_tk_widget().pack( side = self.side.side[2], fill= self.side.side[1], expand=self.boolean.boolean[0])
        self.canvas._tkcanvas.pack(side = self.side.side[3], fill= self.side.side[1], expand=self.boolean.boolean[0])
        self.lf_x = LabelFrame(self.f_left, text = self.name.name[3], fg = self.color.color[0])
        self.lf_x.pack()

    #updata status
    def update(self):
        self.drag.set_Xrange(left = float(self.x1.get()), right = float(self.x2.get()))
        self.baseline(self.basesel)

    def refe(self):
        subprocess.Popen(os.path.join('files', self.other.other[7]), shell = self.boolean.boolean[0])

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
        # print(float(self.p_l.cget(self.other.other[2])))
        self.baseline(self.other.other[4])#update line
