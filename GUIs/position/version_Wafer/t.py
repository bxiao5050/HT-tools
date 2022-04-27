from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from tkinter import *
import matplotlib
from matplotlib.figure import Figure





class Pie_target_positions(Frame):
    def __init__(self, master, labels):
        super().__init__(master)
        self.labels = labels

        frame_f = Frame(self)
        frame_scales = Frame(self)

        frame_f.pack()
        frame_scales.pack()

        self.v_rotation = DoubleVar() #rotation
        frame_r = LabelFrame(frame_scales, text = 'anticlockwise rotation (deg)')
        frame_s = LabelFrame(frame_scales, text = 'element sequence (anticlockwise)')
        frame_r.pack( padx = (5,5), pady = (5,5))
        frame_s.pack( padx = (5,5), pady = (5,5))

        Scale(frame_r, variable = self.v_rotation, from_ = 0, to =360, length = 400, orient = 'horizontal', command = self.on_update_pie).pack()
        self.sequence = Ele_sequence(frame_s, self.labels)
        self.sequence.pack()
        Button(frame_s, text = 'set sequence', fg = 'blue', command = self.update_pie).pack()

        self.init_fig(frame_f)
        self.pie_plot()



    #initialize the canvas
    def init_fig(self, frame_f):
        fig = Figure(figsize=(4,4))
        fig.subplots_adjust(left=0.1, right=0.9, top=0.8, bottom=0.1)
        self.canvas = FigureCanvasTkAgg(fig, master=frame_f)  # A tk.DrawingArea.
        self.ax = fig.add_subplot(111)
        self.canvas.get_tk_widget().pack(fill='both', expand=0)
        toolbar = NavigationToolbar2Tk(self.canvas, self)
        toolbar.update()

    def pie_plot(self, colors = None):
        self.sizes = [1/len(self.labels) for i in self.labels]

        # ax1.pie(self.sizes, labels=labels, autopct='%1.1f%%',startangle=90)
        self.my_pie, t = self.ax.pie(self.sizes, labels=self.labels, wedgeprops = {'linewidth' :0.5, 'edgecolor' :'black'})

        #save colors
        self.piecolors = [pie.get_facecolor() for pie in self.my_pie]

    def on_update_pie(self, event):
        self.update_pie()

    #update pie
    def update_pie(self):

        ele_index = self.sequence.get_sequence()
        newSizes = [self.sizes[i] for i in ele_index]
        newLabels = [self.labels[i] for i in ele_index]
        newColors = [self.piecolors[i] for i in ele_index]

        self.ax.clear()


        self.my_pie, t = self.ax.pie(newSizes, labels=newLabels, colors = newColors, startangle = self.v_rotation.get(), wedgeprops = {'linewidth' :0.5, 'edgecolor' :'black'})
        self.canvas.draw()


class Ele_sequence(Frame):
    def __init__(self, master, labels):
        super().__init__(master)
        self.ele_l, self.ele_e = [], []


        for i, t in enumerate(labels):
            self.ele_l.append(Label(self, text =t))
            self.ele_e.append(Entry(self, width =5))
            self.ele_e[-1].insert(0, i+1)

            self.ele_l[-1].grid(row = i, column = 0, padx = (3,3), pady = (3,3))
            self.ele_e[-1].grid(row = i, column = 1, padx = (3,3), pady = (3,3))

    def get_sequence(self):
        return [int(v.get())-1 for v in self.ele_e]




