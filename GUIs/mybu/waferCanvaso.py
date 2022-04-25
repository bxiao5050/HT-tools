import threading
import time

import matplotlib
import numpy as np
matplotlib.use("TkAgg")
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

from tkinter import *

class WaferCanvas(Frame):

    def __init__(self, master):
        Frame.__init__(self, master )
        # self.config(width = 1000, height = 800, extend = False)

        self.waferF = Frame(self)
        self.l2 = Label(self, width = 20, justify = LEFT, font=("Courier", 14))#show pos
        self.legendF = Frame(self)

        # self.legendF.grid(row = 0, column = 1, sticky = 'n')
        self.l2.grid(row = 0, column = 0, sticky = 'n')
        self.waferF.grid(row = 1, column = 0, sticky = 'e')
        self.f = None



        self.pAC = {} #position and canvas
        self.pALoc = {} #pos and row, column

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
                # elif row >= 16 and row <= 19 and col >= row - 14 and col <= row + ll[row - 15]:
                #     self.newB(row, col, self.pos)

    # def showLegend(self, title, yticklabels):
    #     if self.f is None:
    #         self.f = Figure(figsize=(6,4))
    #         self.ax = self.f.add_subplot(111, picker = True)
    #         self.canvas = FigureCanvasTkAgg(self.f, master=self.legendF)
    #         self.canvas.get_tk_widget().pack()
    #         data = np.arange(0, 1010 , 1).reshape(101, 10)

    #     # self.ax.set_title('probability%')
    #         self.im = self.ax.imshow(data, cmap = 'rainbow', origin = 'lower')
    #     self.ax.set_yticklabels(yticklabels)
    #     self.ax.set_xticks([])


        # self.canvas.draw()



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
        for pos in self.getPAC():
            self.pAC[pos].destroy()
            time.sleep(0.001)
        w.destroy()


def main():
    app = Tk()

    wc = WaferCanvas(app)
    # wc.showLegend('title', [-3507.23,  -2561.682, -1616.134,  -670.586,   274.962,  1220.51, 2000 ])
    wc.pack()

    app.mainloop()

if __name__ == '__main__':
    main()


