from tkinter import *
import tkinter.ttk as ttk
import pandas as pd
import numpy as np
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

from waferBo import MyButton



class SWafer2(ttk.Frame):
    """
complete wafer with 342 buttons, only allow for single-button click
    """
    def __init__(self, master, **kw):
        ttk.Frame.__init__(self, master, **kw)


        self.waferF = Canvas(self)
        self.lPos = Label(self, text = '', width = 20)

        self.waferF.grid(row = 0, column = 0, rowspan = 2)
        self.lPos.grid(row = 0, column = 1)


        self.logo = PhotoImage(width = 10, height = 10)
        self.pos = 1
        self.f = None
        self.im  =None


        self.pAB = {}

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

        for row in range(21):
            Grid.rowconfigure(self, row, weight = 1)

        for col in range(20):
            Grid.columnconfigure(self, col, weight = 1)

        for b in self.pAB.values():
            b.config(relief = 'groove')

    def showLegend(self, title, yticklabels):

        self.f = Figure(figsize=(1,2))
        self.ax = self.f.add_subplot(111, picker = True)
        self.canvas = FigureCanvasTkAgg(self.f, master=self)
        self.canvas.get_tk_widget().grid(row = 1, column = 1)
        data = np.arange(0, 1010 , 1).reshape(101, 10)
        self.im = self.ax.imshow(data, cmap = 'jet', origin = 'lower')
        # self.ax.set_yticks(range(len(yticklabels)))
        # self.ax.set_yticklabels(['-3421', '-2254,' '-1087', '80', '1247'])
        self.ax.set_yticklabels(['']+[v for v in yticklabels])
        self.ax.set_xticks([])
        # self.ax.margins(0.8)
        self.f.subplots_adjust(left=0.7, right=1, top=0.9, bottom=0.1)

    def updateLegend(self, title, yticklabels):

        self.ax.clear()
        data = np.arange(0, 1010 , 1).reshape(101, 10)
        self.im = self.ax.imshow(data, cmap = 'jet', origin = 'lower')
        self.ax.set_yticklabels(['']+[v for v in yticklabels])
        self.ax.set_xticks([])
        self.f.subplots_adjust(left=0.7, right=1, top=0.9, bottom=0.1)

        self.canvas.draw()
        # self.cb.ax.yaxis.set_ticklabels(np.round(np.linspace(min(dz), max(dz), num =6)))


    def getPAB(self):
        return self.pAB

    def on_buttonPress(self, pos):
        self.buttonPress(pos)

    def buttonPress(self, pos):
        for b in self.getpressedButtons():
            b.config(relief = 'raised')
        self.pAB[pos].oneOrTwoclick()

    #override mouse enter
    def on_enter(self, e):
        pass
        # self.lPos.config(text = f'''pos: {e.widget.cget('text')}''')
        # print(e.widget.cget('text'))
    def on_leave(self, e):
        pass

    # get the names of all pressed button
    def getpressedButtonnames(self):
        return [b.cget('text') for b in self.pAB.values() if b.cget('relief') == 'sunken']

    def getpressedButtons(self):
        return [b for b in self.pAB.values() if b.cget('relief') == 'sunken']

    def getpressedButtonPos(self):
        return [pos for pos, b in self.pAB.items() if b.cget('relief') == 'sunken']

    def getpressedB(self):
        pressedB = {}
        for pos, b in self.pAB.items():
            if b.cget('relief') == 'sunken':
                pressedB[pos] = b
        return pressedB

    #reset buttons
    def raiseButtons(self):
        for b in self.getpressedButtons():
            b.config(relief = 'raised', image = self.logo)



    def newB(self, row, col, pos):
        k = self.pos
        self.pAB[pos] = MyButton(self.waferF, relief = 'raised', image = self.logo)

        #button override press command
        self.pAB[pos].configure(command = lambda k = k : self.on_buttonPress(k))
        self.pAB[pos].mouse_enter(self.on_enter)
        self.pAB[pos].mouse_leave(self.on_leave)


        self.pAB[pos].grid(row = row, column = col, sticky=N+S+E+W)
        self.pos += 1


def main():
    root = Tk()
    app = SWafer2(root)
    app.pack(fill = 'both', expand = True)

    app.showLegend('title', [-3421, -2254, -1087,    80 , 1247])

    root.mainloop()

if __name__ == '__main__':
    main()


