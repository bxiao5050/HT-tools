from tkinter import *
from matplotlib import colors
from matplotlib.backends.backend_tkagg import (
                                    FigureCanvasTkAgg, NavigationToolbar2Tk)
from matplotlib.figure import Figure
from mywidgets.wafer.myWafer import WaferArrange
import numpy as np
from matplotlib.widgets import Cursor
class Unnormalized(Toplevel):
    def __init__(self, master, expData=None):
        super().__init__(master)
        self.expData = expData


        self.title('unnormalized data')
        f = Frame(self)
        self.lPos = Label(f, width = 8)
        self.wafer = WaferArrange(f)
        self.lPos.pack()
        self.wafer.pack()

        fig = Figure(figsize=(5, 4), dpi=100)
        fig.subplots_adjust(left=0.1, right=0.9, top=0.9, bottom=0.1)

        self.canvas = FigureCanvasTkAgg(fig, master=self)  # A tk.DrawingArea.

        self.ax = fig.add_subplot(111)
        self.ax.set_xlabel('2Theta')
        self.ax.set_ylabel('Intensity (unnormalized)')
        self.cursor = Cursor(self.ax, useblit=True, horizOn = True, linewidth=1, alpha = 0.8, linestyle = ':')

        toolbar = NavigationToolbar2Tk(self.canvas, self)
        toolbar.update()
        f.pack(side = 'left')
        self.canvas.get_tk_widget().pack( fill='both', expand=1)

        self.posAndexpLine = {}# exp file names and plot
        self.posAndNoneOffsetExpLines = {}# eposAndNoneOffsetExpLines = {pos:[x, y, color]}

        #button override press command
        for  k, b in self.wafer.pAB.items():
            b.mouse_enter(self.on_enter)
            b.configure(command = lambda k = k : self.on_buttonPress(k))
            b.configure(relief = 'ridge', state = 'disable')

        if self.expData is not None:
            x = self.expData.iloc[:, 0]
            xlim1, xlim2 = [min(x), max(x)]
            self.ax.set_xlim(xlim1, xlim2)

        for i in range(len(self.expData.columns) -1):
            pos = i + 1
            self.wafer.pAB[pos].config(state = 'normal', relief = 'raised')
    #override mouse enter
    def on_enter(self, e):
        e.widget.config(bg =  'SkyBlue3')
        self.lPos.config(text = f'''pos: {e.widget.cget('text')}''') # pos
        # self.textArea.insert('end', f'''pos: {e.widget.cget('text')}''')

    #override button press command
    def on_buttonPress(self, pos):
        b = self.wafer.pAB[pos]
        b.oneOrTwoclick()
        #plot
        if b.cget('relief') == 'sunken':
            x = self.expData.iloc[:,0]

            y = self.expData.iloc[:, pos]
            # y = self.dataExpPanel.normalization(self.expData.iloc[:, pos])
            self.plotExpLine(x.tolist(), y.tolist(), pos)
            #button has the same color as its line
            b.setBColor(self.getLineColor(pos))
            b.config(bg = b.getBColor())
        elif b.cget('relief') == 'raised' and pos in self.posAndexpLine:
            self.deleteExpLine(pos)
            b.setBColor(b.getDefaultColor())
            b.config(bg = b.getDefaultColor())

    #plot one exp XRD data
    def plotExpLine(self, x, y, pos):
        expLine, = self.ax.plot(x, np.array(y), label = f'pos{pos}')
        color = expLine.get_color()

        self.posAndexpLine[pos] = expLine
        self.posAndNoneOffsetExpLines[pos] = [np.array(x),np.array(y), color] #record line data
        self.setLegend()

    #deleta an exp line
    def deleteExpLine(self, pos):
        expLine = self.posAndexpLine.get(pos)
        expLine.remove()# remove vertical line from canvas
        # self.posAndexpLine.pop(pos, None) #remove exp file name and its data
        self.posAndNoneOffsetExpLines.pop(pos, None)
        self.setLegend()

    #set legend
    def setLegend(self):
        self.ax.legend(loc='upper left', ncol=3, fontsize = 'small').set_draggable(True)
        self.canvas.draw()

    #get color of exp line
    def getLineColor(self, pos):
        return colors.rgb2hex(self.posAndexpLine.get(pos).get_color())

def main():
    root = Tk()
    Unnormalized(root)

    root.mainloop()

if __name__ == '__main__':
    main()
