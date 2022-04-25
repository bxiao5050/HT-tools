from tkinter import *
import pandas as pd
from tkinter.filedialog import askopenfilenames, askopenfilename, askdirectory, asksaveasfilename
try:
    from names.manuname import ManuName
except:
    from manuname import ManuName
import numpy as np
class Baseline_frame(Frame):
    '''
    parameters set up for GUI

    '''
    def __init__(self, master):
        super().__init__(master)
        self.master = master

        #set parameters for baseline
        self.basesel = ''
        self.line = None
        self.base1 = None
        self.line1 = None
        self.alsPara = None
        self.lam_l = None
        self.p_l = None
        self.da1 = pd.DataFrame()
        self.side, self.name, self.state, self.boolean, self.other, self.text, self.color = [ManuName() for i in range(7)]
        self.f_left = Frame(self) # contain combobox+canvas
        self.f_left.pack(side = self.side.side[0], fill = self.side.side[1], expand = self.boolean.boolean[0])
        self.lf1 = LabelFrame(self.f_left, text = self.name.name[0])
        self.cb= ttk.Combobox(self.lf1, width = 60)
        self.cb.pack()
        self.x_left, self.x_right = None, None




    #calculate baseline
    def baseline(self, method):
        if self.base1 is not None and len(self.base1)>0:
            self.base1.pop(0).remove()
            self.line1.pop(0).remove()

        self.basesel = method
        filename = self.cb.get()
        x0, y0 = self.da1.iloc[:,0], self.da1[filename]
        x_range = self.drag.getXrange()
        self.index_range = np.logical_and(x0 >= x_range[0], x0 <= x_range[1])

        self.x, self.y = x0[self.index_range], y0[self.index_range]

        try:
            if self.basesel == self.other.other[3]:
                if self.alsPara is not None:
                    self.alsPara.pack_forget()
                baseline_values = peakutils.baseline(self.y)
            elif self.basesel == self.other.other[4]:
                baseline_values = self.baseline_als2(self.y,lam = float(self.lam_l.cget(self.other.other[2])), p = float(self.p_l.cget(self.other.other[2]))) if None not in (self.lam_l, self.p_l) else self.baseline_als2(self.y)

            self.base1 = self.ax.plot(self.x, baseline_values, label = self.name.name[22], color = self.color.color[1])
            self.line1 = self.ax.plot(self.x, self.y - baseline_values, label = self.name.name[23], color = self.color.color[0])
            self.ax.legend(fontsize=8).set_draggable(self.boolean.boolean[0])
            self.canvas.draw()
            self.menubar.entryconfig(self.name.name[21], state = self.state.state[1])
        except:
            pass

    #normalize to 1 if needed
    def normalization(self, y):
        return (y - min(y))/(max(y) - min(y))

    #plot resutlts
    def myline(self, filename):
        # self.ax.clear()

        if self.line is not None:
            self.line.pop(0).remove()

        x, y = self.da1.iloc[:,0], self.da1[filename]
        self.line = self.ax.plot(x, y, label = f'{filename}__original', color = self.color.color[2])
        self.ax.set_ylim([min(y)-abs(max(y)*0.05), max(y)*1.05])
        self.canvas.draw()
    def format_ax(self):
        self.ax.format_coord = self.format_coord
        xmin, xmax = self.ax.get_xlim()
        ymin, ymax = self.ax.get_ylim()
        self.ax.set_xlabel('X (mm)')
        self.ax.set_ylabel('Y (mm)')

        self.ax.invert_yaxis()


        self.cid1 = self.canvas.mpl_connect('button_press_event', self.on_click)
        #__________________uncomment when multi-mouse selection needed______________
        # self.RS = RectangleSelector(self.ax, self.line_select_callback,
        #                                        drawtype='box', useblit=True,
        #                                        button=[1, 3],  # don't use middle button
        #                                        minspanx=5, minspany=5,
        #                                        spancoords='pixels',
        #                                        interactive=False)

  #for porject import
    def set_clicked(self, wafer_clicked):
        self.clicked_xy = wafer_clicked
        self.updata_canvas()

    def xy_files(self):
        directory = askdirectory()
        if directory !=  '':
            data_corr = self.batch()
            x = data_corr.iloc[:, 0]
            for i in range(len(data_corr.columns) -1):
                j = i+1
                y = data_corr.iloc[:, j]
                df = pd.DataFrame()
                df.insert(0,'x', x)
                df.insert(1, 'y', y)
                df.to_csv(os.path.join(directory, f'{self.da1.columns[j]}_corr.xy'), sep = ' ', index = self.boolean.boolean[1])
            messagebox.showinfo(self.text.text[0], "finished!")

    def mycsv(self):
        path = asksaveasfilename(initialdir = "/",title = "Select file",filetypes = (("csv files","*.csv"),("all files","*.*")))
        data_corr = self.batch()
        data_corr.to_csv(path + '.csv', index = self.boolean.boolean[1])
        messagebox.showinfo(self.text.text[1], "finished!")


   #formatted coordinates
    def format_coord(self, xdata,ydata):
        try:
            index_x = np.abs(self.x-xdata) < self.width/2
            index_y = np.abs(self.y-ydata) < self.width/2
            click_x = self.x[index_x][0] if len(self.x[index_x]) >0 else None
            click_y = self.y[index_y][0] if len(self.y[index_y]) >0 else None
            X = np.where(self.x == click_x)[0]
            Y =np.where(self.y == click_y)[0]

            if len(np.intersect1d(X, Y)): #find commen value between two arrays
                return f'(x, y) = ({click_x}, {click_y})'
            else:
                return []
        except:
            pass

    #return clicked positions
    def get_clicked(self):
        return list(set(self.clicked_xy))

    def _on_clear(self):
        for line in self.plot_clicked:
            line.remove()
        self.clicked_xy.clear()
        self.plot_clicked.clear()
        self.canvas.draw()


    def on_click(self, event):
        if event.inaxes!=self.ax: return
        self.get_click_xy(event.xdata, event.ydata)


    # return clicked x, y
    def get_click_xy(self, xdata, ydata):
        index_x = np.abs(self.x-xdata) < self.width/2
        index_y = np.abs(self.y-ydata) < self.width/2
        click_x = self.x[index_x][0] if len(self.x[index_x]) >0 else None
        click_y = self.y[index_y][0] if len(self.y[index_y]) >0 else None
        X = np.where(self.x == click_x)[0]
        Y =np.where(self.y == click_y)[0]

        if len(np.intersect1d(X, Y)): #find commen value between two arrays
            if (click_x, click_y) in self.get_clicked(): # click again then remove
                self.clicked_xy.remove((click_x, click_y))
            else:
                self.clicked_xy.append((click_x, click_y))

        self.updata_canvas()

    def line_select_callback(self, eclick, erelease):
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
        line, = self.ax.plot(x, y,linestyle='none', marker='s', markeredgecolor="orange",markersize = 7, markerfacecolor='red',markeredgewidth =2)
        self.plot_clicked.append(line)
        self.canvas.draw()

