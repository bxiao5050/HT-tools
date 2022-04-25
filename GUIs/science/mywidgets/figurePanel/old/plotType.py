
import matplotlib
matplotlib.use("TkAgg")
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from matplotlib.figure import Figure

from  tkinter import *
from tkinter import ttk


LARGE_FONT= ("Verdana", 12)


class CanvasFrame(ttk.Frame):

    def __init__(self, *args, **kwargs):

        ttk.Frame.__init__(self, *args, **kwargs)

       # ttk.ttk.iconbitmap(self, default="clienticon.ico")


        #Bpanel
        BFrame = ttk.Frame(self)
        BNormal = ttk.Button(BFrame, text = 'normal', width = 7, command=lambda: self.show_frame(normalPage))
        BOffset = ttk.Button(BFrame, text = 'offset', width = 7, command=lambda: self.show_frame(offsetPage))
        BWaterfall = ttk.Button(BFrame, text = '3D', width = 7, command=lambda: self.show_frame(threeDPage))
        BFrame.pack(side="left", fill = 'x')
        BFrame.grid_rowconfigure(0, weight=1)
        BFrame.grid_columnconfigure(0, weight=1)
        # buttons in Bpanel
        BNormal.grid(row = 0, column = 0, pady = (5,5), padx = (5, 0), sticky = 'n')
        BOffset.grid(row = 1, column = 0, pady = (5,5), padx = (5, 0), sticky = 'n')
        BWaterfall.grid(row = 2, column = 0, pady = (5,5), padx = (5, 0), sticky = 'n')

        container = ttk.Frame(self)
        container.pack(side="right", fill="both", expand = True)
        container.grid_rowconfigure(0, weight=1)
        container.grid_columnconfigure(0, weight=1)

        self.pages = {}

        for F in (normalPage, offsetPage, threeDPage):

            frame = F(container, self)

            self.pages[F] = frame

            frame.grid(row=0, column=0, sticky="nsew")

        self.show_frame(normalPage)

    def show_frame(self, cont):

        frame = self.pages[cont]
        frame.tkraise()


class normalPage(ttk.Frame):

    def __init__(self, parent, controller):
        ttk.Frame.__init__(self,parent)


class offsetPage(ttk.Frame):

    def __init__(self, parent, controller):
        ttk.Frame.__init__(self, parent)




class threeDPage(ttk.Frame):

    def __init__(self, parent, controller):
        ttk.Frame.__init__(self, parent)

        f = Figure(figsize=(5,5), dpi=100)
        a = f.add_subplot(111)
        a.plot()


        canvas = FigureCanvasTkAgg(f, self)

        canvas.get_tk_widget().pack(side = 'bottom', fill = 'both', expand=True)

        toolbar = NavigationToolbar2Tk(canvas, self)
        toolbar.update()
        canvas._tkcanvas.pack(side = 'top', fill = 'both', expand=True)



