import threading
import time

import matplotlib
matplotlib.use("TkAgg")
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

from tkinter import *

class WaferCanvas(Frame):

    def __init__(self, master, **kw):
        Frame.__init__(self, master, **kw)
        # self.config(width = 1000, height = 800, extend = False)

        self.waferF = Frame(self)
        self.l2 = Label(self, width = 40, justify = LEFT, font=("Courier", 14))#show pos

        self.waferF.grid(row = 0, column = 0, sticky = 'e')
        self.l2.grid(row = 0, column = 1, sticky = 'n')

        self.pAC = {} #position and canvas
        self.pALoc = {} #pos and row, column

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
        self.pAC[pos] = Canvas(self.waferF, width = 40, height = 40, highlightthickness=1, bg= 'white')
        self.pAC.get(pos).bind("<Enter>", lambda event, pos = pos: self.on_enter(event, pos))
        self.pAC.get(pos).grid(row = row, column = col, sticky = 'news')

        self.pALoc[pos] = [row, col]
        self.pos += 1

    def on_enter(self,e, pos):
        self.l2.configure(text= pos)
        # self.l2.configure(text= self.getposPhase(pos))

    def getPAC(self):
        return self.pAC

    def on_closeAll(self, w):
        threading.Thread(target=lambda: self.closeAll(w)).start()

    def closeAll(self, w):
        w.withdraw()
        for pos in self.getPAC():
            self.pAC[pos].destroy()
            time.sleep(0.001)
        w.destroy()

