import pandas as pd
import numpy as np
from matplotlib import cm
# import glob
# import os
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk
from tkinter import *
import matplotlib
from matplotlib.figure import Figure

from tkinter import filedialog
from scipy import interpolate
import subprocess
# from matplotlib.widgets import RectangleSelector
# from sklearn import datasets, linear_model
#single click
class Result_342(LabelFrame):
    '''show canvas in scatter
    '''
    def __init__(self, master, value_340 = None, method = None):
        super().__init__(master)
        menubar = Menu(self)

        docmanu = Menu(menubar)
        docmanu.add_command(label="wafer figure", command=self.on_wafer_figure)
        docmanu.add_command(label="interpolation algorithm", command=self.on_interpolation_algothrim)
        menubar.add_cascade(label="Document", menu=docmanu)
        master.config(menu=menubar)



        self.master = master
        self.value = dict(sorted(value_340.items()))


        self.coords = pd.read_csv('GUIs/340_342_coords.csv', sep = ';', header = 1)

        #information panel
        self.inf = Label(self, text = ''+'\n'+'')

        self.width = 4.5
        #coordinates of 342
        self.x, self.y = self.coords.iloc[:,1], self.coords.iloc[:,2]

        # print(self.x_340)


        fig = Figure(figsize=(4.7,4))
        fig.subplots_adjust(left=0.1, right=0.9, top=0.8, bottom=0.1)
        self.canvas = FigureCanvasTkAgg(fig, master=self)  # A tk.DrawingArea.
        self.ax = fig.add_subplot(111)
        # Button(self, text = 'info',  command = self.on_wafer_figure).pack(anchor = 'w')
        self.inf.pack(padx = (15,5))
        self.canvas.get_tk_widget().pack(fill='both', expand=0)
        Button(self, text = 'save as .cvs', fg = 'red', command = self.on_save).pack()
        # toolbar = NavigationToolbar2Tk(self.canvas, self)
        # toolbar.update()

        if self.value is not None:
            self.x_340, self.y_340 = self.coords.iloc[np.array(list(self.value.keys()))-1,3], self.coords.iloc[np.array(list(self.value.keys()))-1,4]

            # print(self.value)
            if method == 'default':
                if len(self.value) != 340:
                    messagebox.showinfo(message = f'need 340 experiment points in order to use this function. There are only {len(self.value)} points now')
                    master.destroy()
                    return
                self.v_342 = self.get_default_average_values()
                # print(self.value)
            elif method == 'radial':
                self.v_342 = interpolate.griddata((self.x_340, self.y_340), [v for v in self.value.values()], (self.x, self.y), method = 'nearest')
            elif method == 'nearest':
                rbfi = interpolate.Rbf(self.x_340, self.y_340, [v for v in self.value.values()])
                self.v_342 = np.round(rbfi(self.x, self.y), 2)
            # print(self.v_342)
            sc = self.ax.scatter(self.x, self.y, c = self.v_342, marker = 's', s = 50, cmap = cm.jet)
            s1 = min(self.value.values())
            s2 = max(self.value.values())
            cbar = fig.colorbar(sc, ax = self.ax)
            cbar.ax.locator_params(nbins=10)
        else:
            self.ax.scatter(self.x, self.y, marker = 's', cmap = cm.jet)

        self.ax.set_xticks([])
        self.ax.set_yticks([])

        self.clicked_xy = (0, 0)
        self.plot_clicked = []

        self.cid1 = self.canvas.mpl_connect('button_press_event', self.on_click)
        self.canvas.draw()
        # self.get_default_average_values()

    #calculate the 'default' interporate function
    def get_default_average_values(self):
        def distance(x0, y0, x1, y1):
            return np.sqrt((x0-x1)**2 + (y0-y1)**2)

        def isInside(x0, y0, x1, y1, d):
            return True if distance(x0,y0,x1,y1) <= d else False

        def get_surround_coords(x0, y0):
            surround = {}

            for pos, (x1, y1) in enumerate(zip(self.x_340, self.y_340)):
                if isInside(x0, y0, x1, y1, d = 3.3):
                    surround[pos] = (x1, y1)
            return surround

        def average():

            aver = []

            for x0, y0 in zip(self.x, self.y):
                # print((x0, y0))
                v = []
                for pos, (x1, y1) in get_surround_coords(x0, y0).items():
                    v.append(self.value.get(pos+1))
                # print(get_surround_coords(x0, y0).items())
                if len(v) > 0:
                    v = round(np.sum(v)/len(v), 2)
                    aver.append(v)
            return aver

        return average()


    def on_save(self):
        export_file_path = filedialog.asksaveasfilename(defaultextension='.csv')
        df = pd.Series(self.v_342).to_frame('thickness')
        df.index +=1
        df.to_csv(export_file_path, sep = ';')
        messagebox.showinfo( message ='file saved!')

    def on_wafer_figure(self):
        subprocess.Popen('GUIs/340-342_thickness.pdf',shell=True)

    def on_interpolation_algothrim(self):
        subprocess.Popen('GUIs/340-342_thickness.pdf',shell=True)

    #return clicked positions
    def get_clicked(self):
        return self.clicked_xy

    def get_clicked_index(self):
        return self.coords[np.logical_and(self.x == self.clicked_xy[0], self.y == self.clicked_xy[1])].index

    def on_click(self, event):
        if event.inaxes!=self.ax: return
        self.get_singleclick_xy(event.xdata, event.ydata)

    # return clicked x, y
    def get_singleclick_xy(self, xdata, ydata):
        index_x = np.abs(self.x-xdata) < self.width/2
        index_y = np.abs(self.y-ydata) < self.width/2
        click_x = self.x[index_x].iat[0] if len(self.x[index_x]) >0 else None
        click_y = self.y[index_y].iat[0] if len(self.y[index_y]) >0 else None
        X = np.where(self.x == click_x)[0]
        Y =np.where(self.y == click_y)[0]


        if len(np.intersect1d(X, Y)):
            self.clicked_xy= (click_x, click_y)
            index = self.get_clicked_index()
            if self.value is not None:
                self.inf.config(text = f'MA: {index[0]+1}' +'\n'+  f'{np.round(self.v_342[index[0]],2)}')
            else:
                self.inf.config(text = f'pos: {index[0]+1}')
        self.updata_canvas()


    def updata_canvas(self):
        #clear all highlights
        for line in self.plot_clicked:
            line.remove()
        self.plot_clicked.clear()

        x, y = self.clicked_xy
        line, = self.ax.plot(x, y,linestyle='none', marker='s', markeredgecolor="blue",markersize = 7, markerfacecolor='white',markeredgewidth =2)
        self.plot_clicked.append(line)
        self.canvas.draw()







def main():
    root = Tk()
    app = Result_342(root)
    app.pack()
    app.mainloop()

if __name__=='__main__':
    main()
