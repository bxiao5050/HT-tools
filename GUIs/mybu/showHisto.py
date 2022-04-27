import pandas as pd
import numpy as np
from scipy import signal
from tkinter import *
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from matplotlib.figure import Figure
import matplotlib.mlab as mlab
import matplotlib.ticker as ticker
class ShowHist(LabelFrame):
    def __init__(self, master):
        super().__init__(master)
        self.config(text = f'distribution')
        fig = Figure(figsize = (4.5,3))
        fig.subplots_adjust( bottom=0.15, top=0.9, wspace=0, hspace=0)
        self.ax = fig.add_subplot(111)
        self.canvas = FigureCanvasTkAgg(fig, master = self)
        self.canvas.get_tk_widget().pack(fill = 'both', expand = True)
        # toolbar = NavigationToolbar2Tk(self.canvas, self)
        # toolbar.update()

    def update(self, results):
        self.config(text = f'distribution for all {len(results)}')
        self.ax.clear()

        values = [v for v in results.values()]

        self.ax.grid(zorder=0)
        n, bins, patches=self.ax.hist(x = values, facecolor='green', alpha=0.5, rwidth=0.85)
        self.ax.set_xlabel('thickness')
        self.ax.set_ylabel('numbers')
        start, end = self.ax.get_ylim()
        self.ax.yaxis.set_ticks(np.round(np.linspace(start, end, num=10)))

        # self.ax.set_title(f'Thickness distribution for all {len(results)}')
        self.canvas.draw()


def main():
    root = Tk()
    results = {1: 2.33, 2:3.33, 3: 3.433, 4:5.33}

    app = ShowHist(root)
    app.pack()

    app.update( results)
    root.mainloop()

if __name__ == '__main__':
    main()









