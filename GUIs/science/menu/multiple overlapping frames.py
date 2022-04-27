import matplotlib
matplotlib.use("TkAgg")
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from matplotlib.figure import Figure

from tkinter import *
from tkinter import ttk

from showResult import ShowEDS


LARGE_FONT= ("Verdana", 12)


class SeaofBTCapp(Tk):

    def __init__(self, *args, **kwargs):

        Tk.__init__(self, *args, **kwargs)

       # Tk.iconbitmap(self, default="clienticon.ico")
        Tk.wm_title(self, "Sea of BTC client")


        # container.grid_rowconfigure(0, weight=1)
        # container.grid_columnconfigure(0, weight=1)

        self.frames = {}
        self.b = {}

        bFrame = Frame(self)
        container = Frame(self)

        bFrame.pack()
        container.pack( fill="both", expand = True)

        for i, count in enumerate([200, 300, 400]):
            self.b[count] = Button(bFrame, text = count, command = lambda count = count: self.show_panel(count))
            self.b.get(count).grid(row = 0, column = i, padx = (5,5), pady = (5, 20))

            self.frames[count] = ShowEDS(container)
            self.frames.get(count).grid(row=0, column=0, sticky="nsew")


        self.show_panel(200)

    def show_panel(self, count):

        frame = self.frames[count]
        frame.tkraise()
        for b in self.b.values():
            b.config(relief = 'raised')
        self.b.get(count).config(relief = 'sunken')




app = SeaofBTCapp()
app.mainloop()

