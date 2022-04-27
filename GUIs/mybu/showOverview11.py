from waferCanvaso import WaferCanvas
import matplotlib
matplotlib.use("TkAgg")
from matplotlib import colors
from matplotlib.figure import Figure
from matplotlib import cm
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
import matplotlib.pyplot as plt

from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
import threading
import time

class ShowOverview(WaferCanvas):
    def __init__(self, master, showResult2,pAData, **kw):
        WaferCanvas.__init__(self, master, **kw)
        self.pack(fill= 'both', expand = True)
        self.showResult2 = showResult2.copy()
        self.pAData = pAData


        #show zoomed in
        CFrame = Canvas(self, width = 400, height = 300, bg = 'white')
        # self.waferF.grid(row = 0, column = 0, rowspan = 2, sticky = 'e')
        CFrame.grid(row = 1, column = 1, padx = (5,5), sticky = 'n')
        canvas_fig = Figure(figsize = (7, 5))
        self.canvas_ax_up = canvas_fig.add_subplot(111)
        # self.canvas_ax_middle = canvas_fig.add_subplot(212)
        self.canvas = FigureCanvasTkAgg(canvas_fig, master = CFrame)
        self.canvas.get_tk_widget().pack()

        self.on_BExpPiechart()

    def on_BExpPiechart(self):
        threading.Thread(target=self.plotPiechart).start()

    def on_closeAll(self,w):
        w.withdraw()
        w.destroy()



    #plot pie chart
    def plotPiechart(self):
        for pos, Myplot in self.showResult2.items():
            self.pAC.get(pos).bind("<Enter>", lambda event, pos = pos: self.on_enter(event, pos))

            # Myplot.canvasPlot(self.pAData.get(pos), pos)
            fig = Figure(figsize = (0.42, 0.42))
            ax = fig.add_subplot(111)

            x, y = self.pAData.get(pos).iloc[:,0], self.pAData.get(pos).iloc[:,1]
            ax.plot(x, y)

            # fig = Myplot.f
            # fig.set_size_inches(0.42, 0.42)
            FigureCanvasTkAgg(fig, master = self.pAC[pos]).get_tk_widget().pack()
            ax.set_xticks([])
            ax.set_yticks([])
            fig.subplots_adjust( wspace=0, hspace=0)
            time.sleep(0.01)

    def on_enter(self,e, pos):
        try:
            self.l2.configure(text= f'pos: {pos}')
            self.canvas_ax_up.clear()
            # self.canvas_ax_middle.clear()
            Myplot = self.showResult2.get(pos)
            x, y = self.pAData.get(pos).iloc[:,0], self.pAData.get(pos).iloc[:,1]

            self.canvas_ax_up.plot(x, y)
            # thickness, y_flat, yHigh, yLow = [v for v in Myplot.calThickness(x, y).values()]

            # ymin, ymax = min(y_flat), max(y_flat)
            # self.canvas_ax_middle.set_ylim(ymin, ymax)

            # self.canvas_ax_middle.bar((Myplot.drag_h1.getRangeV()[0]+Myplot.drag_h1.getRangeV()[1])/2,  color = 'blue',height = abs(ymax-ymin),bottom = ymin, width = Myplot.drag_h1.getRangeV()[1] - Myplot.drag_h1.getRangeV()[0], alpha = 0.1)
            # self.canvas_ax_middle.bar((Myplot.drag_l.getRangeV()[0]+Myplot.drag_l.getRangeV()[1])/2,  color = 'orange',height = abs(ymax-ymin),bottom = ymin, width = Myplot.drag_l.getRangeV()[1] - Myplot.drag_l.getRangeV()[0], alpha = 0.1)
            # self.canvas_ax_middle.bar((Myplot.drag_h2.getRangeV()[0]+Myplot.drag_h2.getRangeV()[1])/2,  color = 'blue',height = abs(ymax-ymin),bottom = ymin, width = Myplot.drag_h2.getRangeV()[1] - Myplot.drag_h2.getRangeV()[0], alpha = 0.1)

            # yHigh, yLow = Myplot.linedrag.getRangeV()[1], Myplot.linedrag.getRangeV()[0]
            # self.canvas_ax_middle.hlines([yHigh, yLow], min(x), max(x), colors = 'red', linestyles = '--', label = 'fitted baselines')
            # self.canvas_ax_middle.annotate('', (max(x)/10, yLow), (max(x)/10, yHigh), arrowprops={'arrowstyle':'<->'})
            # self.canvas_ax_middle.text(max(x)/9, (yHigh + yLow)/2, f'h = {np.round(abs(yHigh-yLow),2)}')
            # self.canvas_ax_middle.plot(x,y_flat, label = 'flat')
            # self.canvas_ax_middle.legend(ncol = 1, loc = 'lower right')

            self.canvas.draw()
        except :
            pass












def main():
    root = Tk()
    app = ShowXRDPatterns(root)
    app.pack()

    root.mainloop()

if __name__ == '__main__':
    main()



