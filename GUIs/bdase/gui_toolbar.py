from tkinter import *
import pandas as pd
import os
import numpy as np
try:
    from widgets.gui_frame import Baseline_frame
    from widgets.auto.rangeDrag import RangeDrag
except:
    from gui_frame import Baseline_frame
    from rangeDrag import RangeDrag
from tkinter.filedialog import askopenfilenames, askopenfilename, askdirectory, asksaveasfilename
class Baseline_bar(Baseline_frame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master

        self.menubar = Menu(self.master)
        im = Menu(self.menubar)
        self.menubar.add_cascade(label=self.name.name[6], menu=im)
        im.add_command(label=self.name.name[7], command=self.get_file)
        im.add_command(label=self.name.name[8], command=self.get_file2)
        bm = Menu(self.menubar)
        self.menubar.add_cascade(label=self.name.name[9], menu=bm)
        bm.add_command(label=self.name.name[10], command=lambda method = self.other.other[3]: self.baseline(method))
        bm.add_command(label=self.name.name[11], command=lambda method = self.other.other[4]: self.baseline(method))

        self.menubar.entryconfig(self.name.name[12], state = self.state.state[0])
        em = Menu(self.menubar)
        self.menubar.add_cascade(label=self.name.name[13], menu=em)
        em.add_command(label=self.name.name[14], command=self.xy_files)
        em.add_command(label=self.name.name[15], command=self.mycsv)
        self.menubar.entryconfig(self.name.name[16], state = self.state.state[0])
        dm = Menu(self.menubar)
        self.menubar.add_cascade(label=self.name.name[17], menu=dm)
        dm.add_command(label=self.name.name[18], command=self.refe)
        self.master.config(menu=self.menubar)
    #red .xy file
    def get_file(self):
        files = askopenfilenames(parent=self,title=self.name.name[19], filetypes = (("xy files","*.xy"),("all files","*.*")))
        sortedfile = sorted([f for f in self.tk.splitlist(files)])

        for index, f in enumerate(sortedfile):
            df = pd.read_csv(f, header = 0, sep = self.other.other[5])
            if index == 0:
                self.da1.insert(0, self.other.other[1], df.iloc[:,0])
                self.da1.insert(1, os.path.splitext(os.path.basename(f))[0], df.iloc[:,1])
            else:
                self.da1.insert(index + 1, os.path.splitext(os.path.basename(f))[0], df.iloc[:,1])
        self.set_combo(self.da1)

    #read .csv file
    def get_file2(self):
        path = askopenfilename(parent=self ,title=self.name.name[20], filetypes = (("csv files","*.csv"),("all files","*.*")))
        #
        if len(path) != 0:
            self.title = path
            basename = os.path.basename(path)
            filebase = os.path.splitext(basename)[1]
        if len(path) != 0 and filebase == self.other.other[6]:
            self.da1 = pd.read_csv(path, header = 0)
        self.set_combo(self.da1)


    def _on_plot_overview(self):
        w = Toplevel()
        # w.title('overview for curves based on colormap')

        ma = self.mA[self.current_N]

        #self.cax is the scater plot
        Curve_overview_heatmap(w, self.data, ma, self.ax, self.cax, xrange_Value = self.x_range)
        # Curve_overview(w, self.data, self.wafer.ax, self.plot_canvas.get_Xrange_Value())

    def _on_unit_export(self):
        filename = filedialog.asksaveasfilename(title = "Select file",filetypes = (("colorbar unit","*.colorbar_unit"),("all files","*.*")))
        with open(filename + '.colorbar_unit', 'wb') as f:
            d = [self.e_unitV.get(), self.e_unitU.get()]
            pickle.dump(d, f, protocol = -1)
            if len(filename) > 0:
                messagebox.showinfo(title = None, message = f' file "{filename}.colorbar_unit" saved!')

    def _on_unit_import(self):
        filename = filedialog.askopenfilename(title = "choose a colorbar unit",filetypes = (("colorbar unit","*.colorbar_unit"),("all files","*.*")))
        if len(filename) == 0:
            return
        with open(filename, 'rb') as f:
            d = pickle.load(f)
            self.e_unitV.delete(0, 'end'), self.e_unitU.delete(0, 'end')
            self.e_unitV.insert(0, d[0]), self.e_unitU.insert(0, d[1])

    def setup_ax(self):
        self.ax.format_coord = self.format_coord
        self.ax.invert_yaxis()

        self.cid1 = self.canvas.mpl_connect('button_press_event', self.on_click)
        # __________________uncomment when multi-mouse selection needed______________
        self.RS = RectangleSelector(self.ax, self.line_select_callback,
                                               drawtype='box', useblit=True,
                                               button=[1, 3],  # don't use middle button
                                               minspanx=5, minspany=5,
                                               spancoords='pixels',
                                               interactive=False)
    def set_dragRange(self, data):
        xRange = self.ax.get_xlim()
        self.drag = RangeDrag(master = self,  ax = self.ax, startPos_left = xRange[0],startPos_right = xRange[1], left_e =self.x1, right_e = self.x2 )

        self.canvas.draw()


    def callbackFunc(self, event):
        filename = event.widget.get()
        self.myline(filename)
        self.baseline(self.basesel)
        self.drag.update_ylim()


    def _on_unit(self):
        ma = self.mA[self.current_N]
        ma_original = self.mA[0].copy() #original ma, is defined when heatmap is created
        cm = float(self.e_unitV.get())
        for x, y in ma:
            ma[(x, y)] = round(ma_original[(x,y)]/cm,2)

        # self.mA.append(ma)#save it as the new version
        # self.current_N+=1 #establish a new version
        self.plot_scatter() #redraw scatter

        self.l6.config(text = self.e_unitU.get())


    def _on_rotate(self):
        if self.b3D.cget('text') == '2D':
            self.deg_rotate +=45
            self.ax.elev = 90
            self.ax.azim  = self.deg_rotate
            self.canvas.draw()

    def _on_3D(self):
        self.fig.delaxes(self.ax)
        if self.b3D.cget('text') == '3D':
            self.b3D.config(text = '2D')
            self.brotate.config(state = 'normal')
            self.deg_rotate = 90
            self.ax=self.fig.add_subplot(111,projection='3d')
            self.ax.dist = 5.5
            self.ax.elev = 90
            self.ax.azim  = self.deg_rotate
            self.ax.set_zticks([])
            # make the panes transparent
            self.ax.xaxis.set_pane_color((1.0, 1.0, 1.0, 0.0))
            self.ax.yaxis.set_pane_color((1.0, 1.0, 1.0, 0.0))
            self.ax.zaxis.set_pane_color((1.0, 1.0, 1.0, 0.0))
            # make the grid lines transparent
            self.ax.xaxis._axinfo["grid"]['color'] =  (1,1,1,0)
            self.ax.yaxis._axinfo["grid"]['color'] =  (1,1,1,0)
            self.ax.zaxis._axinfo["grid"]['color'] =  (1,1,1,0)
            self.ax.invert_yaxis()
            self.plot_scatter(is_title = False)
            self.cax.set_edgecolors = self.cax.set_facecolors = lambda *args:None
            self.scatter_deleted.set_edgecolors = self.scatter_deleted.set_facecolors = lambda *args:None



        self.canvas.draw()
    def batch(self):
        data_corr = pd.DataFrame()
        x0= self.da1.iloc[:,0]
        x_range = self.drag.getXrange()
        self.index_range = np.logical_and(x0 >= x_range[0], x0 <= x_range[1])

        self.x= x0[self.index_range]
        data_corr.insert(0, 'x', self.x)

        for i in range(len(self.da1.columns) -1):
            j = i+1
            y0 = self.da1.iloc[:, j]
            self.y= y0[self.index_range]
            y_baseline = peakutils.baseline(self.y) if self.basesel == self.other.other[3] else self.baseline_als2(self.y,lam = float(self.lam_l.cget(self.other.other[2])), p = float(self.p_l.cget(self.other.other[2])))
            y_corr = self.y - y_baseline if self.var1.get() == 0 else self.normalization(self.y - y_baseline)
            data_corr.insert(j, self.da1.columns[j], y_corr)
        return data_corr


    def set_combo(self, data):
        if len(data) >0:
            self.menubar.entryconfig(self.name.name[6], state = self.state.state[0])
            self.cb.config(values = [col for col in data.columns[1:]])
            self.cb.bind("<<ComboboxSelected>>", self.callbackFunc)
            #initialize combobox
            self.cb.current(0)
            self.myline(self.cb.get())
            #activate baseline correction menu
            self.menubar.entryconfig(self.name.name[24], state = self.state.state[1])

            self.set_dragRange(data)


    def _on_save_project(self):
        filename = filedialog.asksaveasfilename(title = "Select file",filetypes = (("SDC analysis files","*.SDC"),("all files","*.*")))
        with open(filename + '.SDC', 'wb') as f:
            d = [self.Etitle.get(), self.potential0, self.data, self.mA, self.current_N, self.mA_all, self.wafer_clicked, self.x_range]
            pickle.dump(d, f, protocol = -1)
            if len(filename) > 0:
                messagebox.showinfo(title = None, message = f'project file "{filename}.SDC" saved!')

    def set_project(self, wafer_clicked, x_range):
         self.wafer_clicked =  wafer_clicked
         self.x_range = x_range
