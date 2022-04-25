from tkinter import *
from tkinter import ttk
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
import pandas as pd

try:
    from auto.rangeDrag import RangeDrag
except ModuleNotFoundError:
    import sys
    sys.path.append('C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\final')
    from auto.rangeDrag import RangeDrag

class AdvancedRange(LabelFrame):
    '''panel for mannual range identification
    '''
    def __init__(self, master, data = None, **kw):
        LabelFrame.__init__(self, master, **kw)

        if data is None:
            self.data = pd.read_csv('C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\Cantor alloy\\XRD_Cantor_400_backg_norm.csv')
        else: self.data = data

        self.peakAndRange = []# peak and its X-range information
        '''
        drag = RangeDrag(self.canvas, ax = self.ax)
        pl = peakLogic(self.logicF)
        self.peakAndRange.append([drag, pl])
        '''

        self.canvas = Canvas(self, width = 400, height = 400)
        panel = LabelFrame(self, text = 'Choose data')
        self.droplist = ttk.Combobox(panel, values = [f'pos {i}' for i in range(1, len(self.data.columns))], state = 'readonly')
        # self.droplist.current(0)
        self.droplist.bind('<<ComboboxSelected>>', self.callback)

        self.addB = Button(panel, text = '+', width = 5, command = self.add_range, state = 'disabled')
        self.logicF = Frame(panel)# peak information

        self.canvas.grid(row = 0, column = 0, sticky = 'news', padx = (5,5), pady = (5,5))
        panel.grid(row = 0, column = 1, sticky = 'ne', padx = (5,5), pady = (5,5))
        self.droplist.pack()
        self.addB.pack(padx = (5,5), pady = (20,0))
        self.logicF.pack(padx = (5,5), pady = (3,5))

        Grid.rowconfigure(self, 0, weight=1)
        Grid.columnconfigure(self, 0, weight=1)

        #for canvas
        self.line = None
        fig = Figure()
        self.ax = fig.add_subplot(111)
        self.ax.set_ylim(0, 1.3)

        # ax.plot(self.data.iloc[:,0], self.data.iloc[:,pos])

        self.mycanvas = FigureCanvasTkAgg(fig, master = self.canvas)
        self.mycanvas.get_tk_widget().pack()
        # toolbar = NavigationToolbar2Tk(self.mycanvas, self.canvas)
        # toolbar.update()
        # toolbar.pack()


    #get ax
    def getAx(self):
        return self.ax

    #get selected exp data
    def getSelectedData(self):
        return self.line


        #
    def add_range(self):
        #add x-range choose
        drag = RangeDrag(self.canvas, ax = self.ax)
        drag.dr1.rect.figure.canvas.mpl_connect('motion_notify_event', self.on_motion)
        drag.dr2.rect.figure.canvas.mpl_connect('motion_notify_event', self.on_motion)

        #add logic status and x-range information
        pl = peakLogic(self.logicF)
        self.peakAndRange.append([drag, pl])
        #range
        pl.rangeInf.config(text = drag.getXrange())
        pl.logicDroplist.bind('<<ComboboxSelected>>', lambda event, drag= drag, pl = pl: self.changeLogic(event, drag, pl))

        # self.peakAndRange.append([RangeDrag(ax = self.ax), peakLogic(self.logicF)])
        self.peakAndRange[-1][1].pack()
        self.mycanvas.draw()

        #choose exp data
    def callback(self, e):
        self.selectExp(e)

    def selectExp(self, e):
        self.addB.config(state= 'normal')
        x = self.data.iloc[:, 0]
        y = self.data.iloc[:,int(e.widget.get().replace('pos', ''))]

        y = self.normalization(y)

        self.ax.set_xlim(min(x), max(x))

        if self.line is not None:
            self.line.remove()

        self.line, = self.ax.plot(x, y, 'black', label = f'{e.widget.get()}')
        self.ax.legend(loc='upper left', ncol=2, fontsize = 'small').set_draggable(True)
        self.mycanvas.draw()
        # print(self.line.get_xdata())

    #override drag method
    def on_motion(self, event):
        for i in range(len(self.peakAndRange)):
            self.peakAndRange[i][1].rangeInf.config(text = self.peakAndRange[i][0].getXrange())

    #bind for combobox
    def changeLogic(self, e, drag, pl):
        if e.widget.get() == 'AND':
            drag.changeColor('orange')
            pl.rangeInf.config(bg = 'moccasin')
        elif e.widget.get() == 'NOT':
            drag.changeColor('tan')
            pl.rangeInf.config(bg = 'seashell3')
        # self.mycanvas.draw()

    def normalization(self, df):
        df_norm = (df - df.min()) / (df.max() - df.min())
        return df_norm




class peakLogic(Frame):
    def __init__(self, master, **kw):
        Frame.__init__(self, master, **kw)

        self.logicDroplist = ttk.Combobox(self, values = ['AND', 'NOT'], state = 'readonly', width = 5)
        self.logicDroplist.current(0)
        self.rangeInf = Label(self, width = 8, relief = 'sunken', bg = 'moccasin')

        self.logicDroplist.grid(row = 0, column = 0, padx = (2,2))
        self.rangeInf.grid(row = 0, column = 1, padx = (2,2))

