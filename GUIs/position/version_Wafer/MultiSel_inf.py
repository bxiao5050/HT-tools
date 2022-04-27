import pandas as pd
import numpy as np

import glob
import os
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from tkinter import *
import matplotlib
from matplotlib.figure import Figure
from matplotlib.widgets import RectangleSelector
from tkinter import messagebox, filedialog



class Coords_canvas(Frame):
    '''show canvas in scatter
    '''
    def __init__(self, master, x= None, y= None):
        super().__init__(master)
        # coords = pd.read_csv('coords.txt', header = 0, index_col = 0)
        self.width = 4
        # self.width = 4000
        self.x, self.y = x, y
        # self.x, self.y = coords.iloc[:,0], coords.iloc[:,1]

        self.b_clear = Button(self, text = 'clear selections', fg = 'blue', command = self.on_clear)
        self.b_clear.pack()

        fig = Figure(figsize=(4, 4))
        self.canvas = FigureCanvasTkAgg(fig, master=self)  # A tk.DrawingArea.
        self.ax = fig.add_subplot(111)
        self.canvas.get_tk_widget().pack()
        # toolbar = NavigationToolbar2Tk(self.canvas, self)
        # toolbar.update()
        # self.ax.invert_yaxis()
        self.ax.scatter(self.x, self.y, marker = 's', linewidths = 2, color = 'gray')# plot all the coords

        self.clicked_xy=[]
        self.plot_clicked = []


        self.cid1 = self.canvas.mpl_connect('button_press_event', self.on_click)
        # #__________________uncomment when multi-mouse selection needed______________
        self.RS = RectangleSelector(self.ax, self.line_select_callback,
                                               drawtype='box', useblit=True,
                                               button=[1, 3],  # don't use middle button
                                               minspanx=5, minspany=5,
                                               spancoords='pixels',
                                               interactive=False)

    #return clicked positions
    def get_clicked(self):
        return self.unique(self.clicked_xy)

    def set_clicked(self, xy):
        self.clicked_xy = xy

    def unique(self,sequence):
        seen = set()
        return [x for x in sequence if not (x in seen or seen.add(x))]

    def on_clear(self):
        self._on_clear()

    def _on_clear(self):
        for line in self.plot_clicked:
            line.remove()
        self.clicked_xy.clear()
        self.plot_clicked.clear()
        self.canvas.draw()

    #execute when click
    def on_click(self, event):
        self._on_click(event)

    #execute when multi selection
    def line_select_callback(self, eclick, erelease):
        self._line_select_callback(eclick, erelease)


    # execute when clicked
    def _on_click(self, event):
        # print(f'{event.xdata}, {event.ydata}')
        if event.inaxes!=self.ax: return
        # print(f'{event.xdata}, {event.ydata}')
        self.get_click_xy(event.xdata, event.ydata)


    # return clicked x, y
    def get_click_xy(self, xdata, ydata):
        index_x = np.abs(self.x-xdata) < self.width/2
        index_y = np.abs(self.y-ydata) < self.width/2
        list1 = self.x[index_x].index
        list2 = self.y[index_y].index

        #get the common index from x and y index
        index = list(set(list1).intersection(list2))
        if len(index): #find commen value between two arrays
            click_x, click_y = self.x.loc[index].iat[0], self.y.loc[index].iat[0]
            if (click_x, click_y) in self.get_clicked(): # click again then remove
                self.clicked_xy.remove((click_x, click_y))
            else:
                self.clicked_xy.append((click_x, click_y))

        self.updata_canvas()


    #execute when multiselections
    def _line_select_callback(self, eclick, erelease):
        'eclick and erelease are the press and release events'
        x1, y1 = eclick.xdata, eclick.ydata
        x2, y2 = erelease.xdata, erelease.ydata

        # self.clicked_xy = []
        for x, y in zip(self.x, self.y):
            if x> min(x1, x2) and x < max(x1, x2) and y > min(y1, y2) and y< max(y1, y2):
                self.clicked_xy.append((x,y))

        self.updata_canvas()
        # return clicked_xy

    def updata_canvas(self):
        #clear all highlights
        for line in self.plot_clicked:
            line.remove()
        self.plot_clicked.clear()

        x = [x for x, y in self.clicked_xy]
        y = [y for x, y in self.clicked_xy]
        line, = self.ax.plot(x, y,linestyle='none', marker='s', markeredgecolor="green",markersize = 7, markerfacecolor='orange',markeredgewidth =2)
        self.plot_clicked.append(line)
        self.canvas.draw()


class Mytext(Text):
    def __init__(self, master):
        super().__init__(master)
        S = Scrollbar(master)
        # T = Text(master, height=4, width=50)
        S.pack(side='right', fill='y')
        self.pack(side='left', fill='y', expand = 1)
        S.config(command=self.yview)
        self.config(yscrollcommand=S.set, width = 50, height = 20)


class MultiSel_inf(Coords_canvas):
    def __init__(self, master, df):
        super().__init__(master, x = df['x'], y = df['y'])

        self.df = df
        self.eles = self.df.columns[3:]

        self.mouse_inf = Label(self, text = '\n') #mouse move information
        self.mouse_inf.pack(side= 'top')
        inf_f = LabelFrame(self, text = 'information of selected MAs')
        self.inf = Mytext(inf_f) #main_text widegt
        inf_f.pack(pady = (5,5), fill = 'y', expand = 1)
        self.inf.pack(fill = 'y', expand = 1)

        b_f = LabelFrame(self, text = 'selected MAs') #buttons
        b_f.pack()

        Button(b_f, text = 'plot', command = self.on_plot).pack(side = 'left', padx = (5,5))
        Button(b_f, text = 'save to .csv', command = self.on_save).pack(side = 'left')


    def on_plot(self):
        if len(self.get_clicked()) == 0:
            return
        w = Toplevel(self)
        w.title('composition distribution')

        fig = Figure()
        canvas = FigureCanvasTkAgg(fig, master=w)  # A
        ax = fig.add_subplot(111)
        canvas.get_tk_widget().pack(fill = 'both', expand = 1)
        toolbar = NavigationToolbar2Tk(canvas, w)
        toolbar.update()

        sel = self._get_selected_df()
        lines = ax.plot(sel, '-o')
        legend = ax.legend(lines, list(self.eles), fancybox = True, framealpha = 0.5).set_draggable(True)

        ax.set_title('distribution of selected MAs against positions')
        ax.set_xlabel('position')
        ax.set_ylabel('at.%')
        canvas.draw()





    def on_save(self):
        if len(self.get_clicked()) == 0:
            return
        f = filedialog.asksaveasfilename(title = "Select file",filetypes = (("csv","*.csv"),("all files","*.*")))

        if len(f) ==0: return
        self._get_selected_df().to_csv(f+'.csv', sep = ';')
        messagebox.showinfo(message = 'file saved')



    def set_find_results(self, find_xy):
        if len(find_xy) == 0:
            return
        self.set_clicked(find_xy)
        self.updata_canvas()
        self._insert_inf()
        self.on_selected()

    def on_selected(self):
        if len(self.get_clicked()) == 0:
            return
        elif len(self.get_clicked()) == 1:
            x, y = self.get_clicked()[-1]
            values = self._find_values_from_xy(x, y)
            pos = self._get_pos_from_xy(x,y)

            t1 = '{:8s}'.format('pos')+''.join(['{:8s}'.format(ele) for ele in self.eles])
            t2 = '{:3d}'.format(pos) + ''.join(['{:7.1f}'.format(v) for v in values])
            self.mouse_inf.config(text = t1+'\n'+t2, fg = 'blue')
        else: # summation
            ele_ranges = [[] for ele in self.eles]
            for (x,y) in self.get_clicked():
                values = self._find_values_from_xy(x,y)
                [ele_range.append(v) for ele_range, v in zip(ele_ranges, values)]

            t1 = ''.join([ele.center(14) for ele in self.eles])
            t2 = ''.join(['  {:3.1f}-{:3.1f}  '.format(min(ele_range), max(ele_range)) for ele_range in ele_ranges])
            self.mouse_inf.config(text = t1+'\n'+t2, fg = 'blue')

        self._get_selected_df()




    #override
     #execute when click
    def on_click(self, event):
        self._on_click(event)
        self._insert_inf()
        self.on_selected()

    #override
    #execute when multi selection
    def line_select_callback(self, eclick, erelease):
        self._line_select_callback(eclick, erelease)
        self._insert_inf()
        self.on_selected()

    #override
    def on_clear(self):
        self._on_clear()
        self.inf.delete('1.0', 'end')
        self.mouse_inf.config(text = '\n')


    def _insert_inf(self):
        if len(self.get_clicked()) == 0: return

        self.inf.delete('1.0', 'end')
        self.inf.insert('end', 'pos   '+''.join(['{:6s}'.format(ele) for ele in self.eles]) + '\n')
        for (x, y) in self.get_clicked():
            values = self._find_values_from_xy(x, y)
            pos = self._get_pos_from_xy(x,y)
            self.inf.insert('end', '{:3d}'.format(pos) + ''.join(['{:6.1f}'.format(v) for v in values]) + '\n')

    def _find_values_from_xy(self, x, y):
        df_x = self.x[np.abs(x- self.x).idxmin()]
        df_y = self.y[np.abs(y- self.y).idxmin()]

        return self.df.loc[(self.df['x'] == df_x )& (self.df['y'] ==df_y)].iloc[0, 3:].to_numpy()

    def _get_pos_from_xy(self, x,y):
        coord_std = pd.read_csv('GUIs/coords.txt', header = 0)
        x0, y0 = coord_std['x'], coord_std['y']

        df_x = x0[np.abs(x- x0).idxmin()]
        df_y = y0[np.abs(y- y0).idxmin()]

        return coord_std.loc[(coord_std['x'] == df_x )& (coord_std['y'] ==df_y)].iloc[0, 0]



    def _get_selected_df(self):
        '''return
               Ru   Pd   Ag    Ir    Pt
          133  10.8  9.9  3.0  38.5  37.8
          187  15.4  6.9  6.5  35.8  35.5
          246  19.0  6.5  7.5  31.1  35.9
            '''
        sel_dict = {}
        for (x,y) in self.get_clicked():
            values = self._find_values_from_xy(x,y)
            pos = self._get_pos_from_xy(x,y)
            sel_dict[pos] = values
        # print(sel_dict)
        sel_df = pd.DataFrame.from_dict(sel_dict, orient = 'index', columns = self.eles)
        return sel_df








