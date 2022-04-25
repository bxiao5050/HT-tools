from tkinter.filedialog import askopenfilenames, askopenfilename
from tkinter.colorchooser import *
import matplotlib
matplotlib.use("TkAgg")
from matplotlib import colors
from matplotlib.figure import Figure
from matplotlib import cm
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from matplotlib import cm
from tkinter.colorchooser import *
from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
import threading
import time



class PieChart(Frame):
    def __init__(self, master, data = None):
        super().__init__(master)


        if data is not None:
            self.data = data
        """
          Spectrum         x        y    Ru     Pd  Ag   Ir      Pt
        Spectrum 1 {6}  -22,67  -40,969 21,5    5,9 3   50,4    19,1
        Spectrum 1 {7}  -18,169 -40,969 19,6    5,3 2,5 52,6    20
        Spectrum 1 {8}  -13,67  -40,969 18,5    6,5 2,5 51,9    20,5
        """
        self.pieChars = {}#piecharts
        self.legendB = {}
        self.ax_sub = {}
        self.click_highlight = None
        self.last_click_index = None
        self.last_click_color = []


        self.inf = LabelFrame(self, text = ' ' + '\n' + ' ')
        plotF = Frame(self, bg = 'white')
        self.inf.pack()
        plotF.pack()


        f = Figure(figsize = (4,4))
        self.canvas = FigureCanvasTkAgg(f, master = plotF)

        self.canvas.figure.canvas.mpl_connect('button_press_event', self.on_click)
        self.ax = f.add_subplot(111)
        # toolbarF = Frame(plotF)
        # toolbar = NavigationToolbar2Tk(self.canvas, toolbarF)
        # toolbar.update()
        f.set_facecolor('white')

        self.legengF = Frame(plotF, bg = 'white')


        self.canvas.get_tk_widget().grid(row = 0, column = 0)
        # toolbarF.grid(row = 1, column = 0)
        self.legengF.grid(row = 0, column = 1, sticky = 'sw', pady = (0,60), padx = (0, 5))

        self.ax.set_xlim(-49, 49)
        self.ax.set_ylim(-49, 49)
        self.ax.axis('off')
        f.subplots_adjust(left=-0.01, bottom=-0.01, right=1, top=1, wspace=0, hspace=0)

        # threading.Thread(target = self.plotPiechart).start()

        self.drawPiechart()

    def drawPiechart(self):
        insetsize = 4.8
        #draw piechart
        self.deviation = 4.5/2
        elements = [v for v in self.data.columns[3:]]
        colorlist = cm.Set3(np.linspace(0, 1, len(elements)))

        # infomaiton panel
        self.ele_l = {} # ele name and the corresponding values
        self.ele_v = {}
        for eleindex, ele in enumerate(elements):
            self.ele_l[eleindex] = Label(self.inf, width = 4, text = ele)
            self.ele_v[eleindex] = Label(self.inf, width = 4, text = '')
            self.ele_l.get(eleindex).grid(row = 0, column = eleindex)
            self.ele_v.get(eleindex).grid(row = 1, column = eleindex)
        for index, row in self.data.iterrows():
            x = row[1]-insetsize/2
            y = row[2]-insetsize/2

            self.ax_sub[index] = self.ax.inset_axes([x, y, insetsize, insetsize], transform=self.ax.transData)
            self.pieChars[index], t1 = self.ax_sub[index].pie([v for v in row[3:]], colors = colorlist, wedgeprops = {'linewidth' :0.5, 'edgecolor' :'black'})
            self.ax_sub[index].axis('off')
        #draw legend
        for eleindex, ele in enumerate(elements):
            self.legendB[eleindex] = Button(self.legengF, width = 3, bg = colors.rgb2hex(colorlist[eleindex]), relief = 'flat', command = lambda eleindex = eleindex: self.on_legend(eleindex))
            self.legendB.get(eleindex).grid(row = eleindex, column = 0)
            Label(self.legengF, width = 3, text = ele, bg = 'white').grid(row = eleindex, column = 1)

        self.canvas.draw()

    def on_legend(self, eleindex):
        color = colorchooser.askcolor()[1] #select color
        #change
        self.legendB.get(eleindex).config(bg = color)
        for pie in self.pieChars.values():
            # if pie[eleindex].get_facecolor() != (1.0, 0.0, 0.0, 1.0): #red color
            pie[eleindex].set_color(color)
            pie[eleindex].set_linewidth(0.5)
            pie[eleindex].set_edgecolor('black')

        self.canvas.draw()

    def on_click(self, event):
        click = event.xdata, event.ydata
        if None not in click: # clicking outside the plot area produces a coordinate of None, so we filter those out.
            index = self.getPiechartIndex(click[0], click[1])
            if len(index):
                if self.last_click_index is not None:
                    #dehighlight last clicked
                    [pie.set_facecolor(c) for pie, c in zip(self.pieChars[self.last_click_index], self.last_click_color)]

                self.last_click_index =index[0]
                self.last_click_color = [pie.get_facecolor() for pie in self.pieChars[index[0]]]

                #highlight clicked
                [pie.set_facecolor('red') for pie in self.pieChars[index[0]]]
                # print(self.pieChars[index[0]][0].get_facecolor())

                self.canvas.draw()

                self.inf.config(text =  'pos: {}'.format(index[0] + 1)+ '\n'+ self.data.iat[index[0], 0])
                for eleindex in range(len(self.data.columns[3:])):
                    self.ele_v.get(eleindex).config(text = self.data.iat[index[0], eleindex + 3])

    def getPiechartIndex(self, r, c):
        x = self.data.iloc[:, 1].to_numpy()
        y = self.data.iloc[:, 2].to_numpy()
        return np.where(np.logical_and(abs(r-x)<self.deviation, abs(c-y)<self.deviation) == True)[0]


    def plotHighlight(self, indices, color='red'):
        for line in self.ax.get_lines():
            line.remove()

        for index in indices:
            self.ax.plot(self.data.iloc[index, 1], self.data.iloc[index, 2], 'o',markeredgecolor=color,markeredgewidth=3,markersize=12)
        self.canvas.draw()

    def deleteHighlight(self):
         for line in self.ax.get_lines():
            line.remove()



    def getElements(self):
        elements = [v for v in self.data.columns[3:]]
        return elements

    def getElePercentages(self):
        return self.data.iloc[:, 3:]







def main():
    root = Tk()
    data = pd.read_csv('../main_wafer.CSV', sep = ';')
    app = PieChart(root, data)
    app.pack()

    # print(app.getElePercentages().head())
    # for index, row in app.getElePercentages().iterrows():
    #     print(row['Ru'])
    #     break


    root.mainloop()


if __name__ == '__main__':
    main()

