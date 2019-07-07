from tkinter import *

import pandas as pd
import numpy as np
from io import StringIO
from tkinter import filedialog, messagebox

import subprocess

try:
   from version_Wafer.plotFrame import PlotFrame
   from version_Wafer.choosefiles import OpenCSV
   from version_Wafer.distribution import Distribution
   from version_Wafer.ternaryPlot import TernaryPlot
   from version_Wafer.pieChart import PieChart
   # from version_Wafer.search import Search_composition
   from version_Wafer.Search_composition import Search_composition


except :
   from plotFrame import PlotFrame
   from choosefiles import OpenCSV
   from distribution import Distribution
   from ternaryPlot import TernaryPlot
   from pieChart import PieChart
   # from search import Search_composition
   from Search_composition import Search_composition
# from version_Wafer.plotFrame import PlotFrame
# from version_Wafer.choosefiles import OpenCSV

class ShowEDS(Frame):
    def __init__(self, master, data, ele_index, ele_name):
        super().__init__(master)

        self.deviation = 4.8/2
        self.dist = None

        self.data = data
        self.ele_index = ele_index
        self.ele_name = ele_name
        self.clickedRow = [] # the row shown in the information panel
        self.original_axisRangex = None
        self.original_axisRangey = None
        self.cid = {}
        self.cid_dist = {}
        self.margin_plot = {}
        top_frame = Frame(self)
        self.inf = Label(top_frame, height = 4) #information pannel
        delete_f = LabelFrame(top_frame, text = 'delete positions')
        dist_f = LabelFrame(top_frame, text = 'show distribution')
        diagram_f = LabelFrame(top_frame, text = 'show diagram')
        save_f = LabelFrame(top_frame, text = 'save as')
        search_f = LabelFrame(top_frame, text = 'search')

        self.inf.grid(row= 0, column = 0,  padx= (10,20), sticky = 'nw')
        delete_f.grid(row= 0, column = 1,  padx= (5,5), sticky = 'nw')
        dist_f.grid(row= 0, column = 2,  padx= (5,5), sticky = 'nw')
        diagram_f.grid(row= 0, column = 3,  padx= (5,5), sticky = 'nw')
        save_f.grid(row= 0, column = 4,  padx= (5,5), sticky = 'nw')
        search_f.grid(row= 0, column = 5,  padx= (5,5), sticky = 'nw')

        Button(save_f, text = '.csv', fg = 'blue',width = 7, command = self.on_save).pack()
        Button(save_f, text = 'image', fg = 'blue',width = 7, command = self.on_saveJPG).pack()
        Button(search_f, text = 'find composition',width = 14, command = self.on_find_composition).pack()

        self.multiSelB = Button(delete_f, text = 'select', fg = 'red',width = 9, command = lambda data = data: self.on_multiSel(data))
        self.delB = Button(delete_f, text = 'delete ', state = 'disabled', fg = 'red',width = 8, command = lambda data = data: self.on_delete(data))
        self.multiSelB.pack(side = 'left', padx = (2,2))
        self.delB.pack(side = 'right')

        self.stageB = Button(dist_f, text = 'show in stage',width = 12, command = self.on_showStage)
        self.distB = Button(dist_f, text = 'distribution',width = 12,state = 'disabled', command = lambda data = data:self.on_showDistribution(data))
        self.stageB.pack(side = 'left', padx = (2,2))
        self.distB.pack(side = 'right', padx = (2,2))

        Button(diagram_f, text = 'ternary',width = 7, command = self.show_ternary).pack()
        Button(diagram_f, text = 'piechart',width = 7, command = self.show_piechart).pack()

        # plotFrame = PlotFrame(self, totalNum = 1)
        self.plotFrame = PlotFrame(self, totalNum = len(ele_name))
        top_frame.pack()
        self.plotFrame.pack()

        #override mouse method
        for i, canvas in self.plotFrame.canvas.items():
            self.cid[i] = canvas.figure.canvas.mpl_connect('button_press_event', self.onclick)

        self.updateCanvas(data)

    def on_find_composition(self):
        w = Toplevel()
        w.title('search from given composition')
        Search_composition(w, self.getExportedData()).pack()

    def show_piechart(self):
        w = Toplevel()
        w.title('pie chart')
        showPiechart = PieChart(w, self.getExportedData())
        showPiechart.pack()

    def show_ternary(self):
        df = self.data_good['data'].copy()
        df.columns = self.ele_name
        w = Toplevel()
        w.title('ternary diagram')
        TernaryPlot(w, df)


    def on_showStage(self):
        if self.stageB.cget('relief') == 'raised':
            self.stageB.config(relief = 'sunken')
            self.distB.config(state = 'normal')
            self.original_axisRangex = self.plotFrame.ax.get(0).get_xlim()
            self.original_axisRangey = self.plotFrame.ax.get(0).get_ylim()
            for i,ax in self.plotFrame.ax.items():
                ax.set_xlim(-49, 49)
                ax.set_ylim(-49, 49)
                margin = {'x': [-45.95, -41.449, -36.949, -32.446999999999996, -27.947, 26.05, 30.551, 35.051, 39.551, 44.051, -45.951, -41.448, -36.946, -32.449, 30.55, 35.051, 39.552, 44.05, -45.952, -41.448, -36.946, 35.051, 39.55, 44.05, -45.951, -41.446999999999996, 39.55, 44.051, -45.952, 44.051, -45.95, 44.051, -45.95, 44.05, -45.952, 44.051, -45.951, -41.449, 39.552, 44.051, -45.949, -41.446999999999996, -36.948, 35.052, 39.552, 44.051, -45.95, -41.448, -36.95, -32.448, 30.551, 35.053000000000004, 39.551, 44.05, -45.95, -41.446999999999996, -36.946999999999996, -32.448, -27.948, 26.05, 30.552, 35.051, 39.55, 44.051, -45.951, -41.446999999999996, -36.948, -32.448, -27.948, -23.445999999999998, -18.949, 17.05, 21.551, 26.053, 30.551, 35.051, 39.55, 44.051], 'y': [-40.912, -40.912, -40.912, -40.912, -40.912, -40.912, -40.912, -40.912, -40.912, -40.912, -36.404, -36.404, -36.404, -36.404, -36.404, -36.404, -36.404, -36.404, -31.908, -31.908, -31.908, -31.908, -31.908, -31.908, -27.403000000000002, -27.403000000000002, -27.403000000000002, -27.403000000000002, -22.906999999999996, -22.906999999999996, -18.404, -18.404, 17.592, 17.592, 22.093000000000004, 22.093000000000004, 26.590999999999998, 26.590999999999998, 26.590999999999998, 26.590999999999998, 31.092, 31.092, 31.092, 31.092, 31.092, 31.092, 35.589, 35.589, 35.589, 35.589, 35.589, 35.589, 35.589, 35.589, 40.089, 40.089, 40.089, 40.089, 40.089, 40.089, 40.089, 40.089, 40.089, 40.089, 44.59, 44.59, 44.59, 44.59, 44.59, 44.59, 44.59, 44.59, 44.59, 44.59, 44.59, 44.59, 44.59, 44.59]}
                self.margin_plot[i] = ax.scatter(margin['x'], margin['y'], color = 'lightgray')
                self.plotFrame.canvas.get(i).draw()
        elif self.stageB.cget('relief') == 'sunken':
            self.distB_to_raise()
            self.stageB.config(relief = 'raised')
            self.distB.config(state = 'disabled')
            for i,ax in self.plotFrame.ax.items():
                ax.set_xlim(self.original_axisRangex[0], self.original_axisRangex[1])
                ax.set_ylim(self.original_axisRangey[0], self.original_axisRangey[1])
                self.margin_plot.get(i).remove()
                self.plotFrame.canvas.get(i).draw()


    def on_showDistribution(self, data):
        if self.distB.cget('relief') == 'raised':
            self.distB.config(relief = 'sunken')
            #add distribution function to all the axes
            self.dist = Distribution(ax = self.plotFrame.ax, canvas = self.plotFrame.canvas, data_good =self.data_good, ele_name = self.ele_name,  deviation =self.deviation*1.8)
            for i,ax in self.plotFrame.ax.items():
                self.plotFrame.canvas.get(i).figure.canvas.mpl_disconnect(self.cid.get(i))
                self.cid_dist[i] = self.plotFrame.canvas.get(i).figure.canvas.mpl_connect('button_press_event', self.dist.onclick_distribution)
        elif self.distB.cget('relief') == 'sunken':
            self.distB_to_raise()

    def distB_to_raise(self):
            self.distB.config(relief = 'raised')
            for i,ax in self.plotFrame.ax.items():
                self.plotFrame.canvas.get(i).figure.canvas.mpl_disconnect(self.cid_dist.get(i))
                self.cid[i] = self.plotFrame.canvas.get(i).figure.canvas.mpl_connect('button_press_event', self.onclick)


    def on_multiSel(self, data):
        if self.multiSelB.cget('relief') == 'sunken':
            self.raise_multiSelB()
        elif self.multiSelB.cget('relief') == 'raised':
            self.multiSelB.config(relief = 'sunken')
            self.delB.config(state = 'normal')
            self.plotFrame.deleteHighlight_Normal()

    def raise_multiSelB(self):
            self.multiSelB.config(relief = 'raised')
            self.plotFrame.deleteHighlight()
            self.clickedRow = []
            self.delB.config(state = 'disabled')


    def updateCanvas(self, data):
        #devide data into three types: 1. row containing '-', 2. without '-' (good data), 3 surround (on margin)
        data_empty, self.data_good, data_margin = self.divideData(data, self.ele_index)


        for i in range(len(self.ele_name)):
            x, y = self.data_good['x'], self.data_good['y']
            c = self.data_good['data'][i]
            x_empty = data_empty['x']
            y_empty = data_empty['y']
            x_surround = data_margin['x']
            y_surround = data_margin['y']

            title = '{} ({} - {}%)'.format(self.ele_name[i], min(c),max(c))
            self.plotFrame.plotScatter(i, x, y, c, marker = 's', title = title,
                x_empty = x_empty, y_empty = y_empty, x_surround = x_surround, y_surround = y_surround)

    def on_delete(self, data):
        for clickedR in self.clickedRow:
            data.iat[data.index[data.iloc[:,0] == clickedR[0]].tolist()[0], 1] = '--'
        self.updateCanvas(data)
        self.clickedRow = []
        self.plotFrame.highlight = {}
        self.raise_multiSelB()


    def on_save(self):
        export_file_path = filedialog.asksaveasfilename(defaultextension='.csv')
        df = self.data_good['data'].copy()
        df.columns = self.ele_name

        #add coordinates
        df.insert(0, 'x', self.data_good['x'], False )
        df.insert(1, 'y', self.data_good['y'], False )
        df.index = self.data_good['spectrum']
        # df.index = np.arange(1, len(df) + 1)
        df.to_csv(export_file_path, sep = ';')
        messagebox.showinfo(message = 'file saved!')


    def getExportedData(self):
        df = self.data_good['data'].copy()
        df.columns = self.ele_name

        #add coordinates
        df.insert(0, 'Spectrum', self.data_good['spectrum'], False )
        df.insert(1, 'x', np.round(self.data_good['x'],2), False )
        df.insert(2, 'y', np.round(self.data_good['y'],2), False )
        return df

    def on_saveJPG(self):
        try:
            subprocess.call(r'version_Wafer/print.exe')
        except:
            subprocess.call(r'print.exe')

#

    def onclick(self, event):
        click = event.xdata, event.ydata
        flag = False
        if None not in click : # clicking outside the plot area produces a coordinate of None, so we filter those out.
            # print('x = {}, y = {}'.format(*click))

            try:
                values, specName, clickedR, flag = self.getRow(click[0], click[1])
                text = specName + '\n\n' + '              '.join(self.ele_name) + '\n' + '           '.join([str(v) for v in values] )
                self.inf.config(text = text)
                if self.multiSelB.cget('relief') == 'raised':
                    self.plotFrame.plotHighlight_Normal(clickedR[2], clickedR[3])
                #for delete
                elif flag and (self.multiSelB.cget('relief') == 'sunken'):
                    self.clickedRow.append(clickedR)
                    self.plotFrame.plotHighlight(clickedR[2], clickedR[3])
                #for distribution
            except TypeError:
                pass
    def getRow(self, r, c):
        for index, row in self.data.iterrows():
            x = row[2]
            y = row[3]
            if abs(r-x)<self.deviation and abs(c-y)<self.deviation:
                specName = row[0]
                return [self.normalize(self.ele_index, row), specName, row, True]


    def divideData(self, data, ele_index):
        data_empty = {'x': [], 'y': []} # empty data, contain only x, y
        data_margin = {'x': [], 'y': []} # empty data, contain only x, y
        data_good = {'spectrum':[], 'x': [], 'y': [], 'data': pd.DataFrame()}  # row containing '-' data_good{'Spectrum 1 {1}'} = [x, y, [ele1, ele2...]]
        for index, row in data.iterrows():
            # print(row)
            if '--' in row['In stats.']:
                data_empty['x'].append(row[2])
                data_empty['y'].append(row[3])
            elif self.isInMargin(row[2], row[3]):
                data_margin['x'].append(row[2])
                data_margin['y'].append(row[3])
            else:
                data_good['spectrum'].append(row[0])
                data_good['x'].append(row[2])
                data_good['y'].append(row[3])
                data_good['data'] = data_good['data'].append([self.normalize(ele_index, row)], ignore_index = True)
        return data_empty, data_good, data_margin


    def isInMargin(self, x, y):
        margin = []
        flag = False
        #bottom left
        margin.append((-46, -24, -42, -39))
        margin.append((-46, -28, -37, -35))
        margin.append((-46, -33, -33, -30))
        margin.append((-46, -38, -28, -25))
        margin.append((-46, -43, -24, -20))
        margin.append((-46, -43, -19, -15))
        # bottom right
        margin.append((24, 46, -42, -39))
        margin.append((28, 46, -37, -35))
        margin.append((33, 46, -33, -30))
        margin.append((38, 46, -28, -25))
        margin.append((43, 46, -24, -20))
        margin.append((43, 46, -19, -15))
        #top left
        margin.append((-46, -16, 43, 47))
        margin.append((-46, -24, 37.8, 42.2))
        margin.append((-46, -28, 33.7, 38.3))
        margin.append((-46, -33, 29, 34))
        margin.append((-46, -38, 24, 28))
        margin.append((-46, -43, 20, 24.4))
        margin.append((-46, -43, 16, 20))
        #top right
        margin.append((16, 46, 43, 47))
        margin.append((24, 46, 37.8, 42.2))
        margin.append((28, 46, 33.7, 38.3))
        margin.append((33, 46, 29, 34))
        margin.append((38, 46, 24, 28))
        margin.append((43, 46, 20, 24.4))
        margin.append((43, 46, 16, 20))

        for v in margin:
            if x>v[0] and x<v[1] and y>v[2] and y<v[3]:
                flag = True
            elif x > 47.5 or x<-47.5 or y> 47.5 or y<-43:
                flag = True
        return flag

    def normalize(self,ele_index, row):
        #1. summ
        summ = 0
        for i, v in enumerate(ele_index):
            if v > 0:
                summ += float(row[4+i])
        #2.result
        norm = []
        for i, v in enumerate(ele_index):
            if v > 0:
                if summ > 0:
                    norm.append(round(float(row[4+i])*100/summ, 1))
                else:
                    norm.append(0)
        return norm


class ChooseEle(Frame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master
        self.dataF = Frame(self,width = 500, height = 100)
        self.dataF.pack()
        Button(self, text = 'open +', fg = 'red', command = self.on_openfile).pack(side = 'bottom', pady = (5,5))


    def on_openfile(self):
        self.ImportData(self.dataF).pack(pady = (10,10), padx = (5, 5), anchor = 'w')


    class ImportData(LabelFrame):
        def __init__(self, master):
            super().__init__(master)
            path = OpenCSV(self).getFilePath()[0]
            # self.data = pd.DataFrame()

            lines = ''
            if len(path) > 0:
                # Label(self, text = f'path: {path}', fg = 'blue').pack(anchor = 'w')NavigationToolbar2Tk
                self.config(text = 'path:  {}'.format(path), fg = 'blue', relief = 'ridge')
                fh = open(path)
                for line in fh:
                    if 'Spectrum' in line or  'Spektrum' in line:
                        lines += line.rstrip() + '\n'
                fh.close()
                self.data = pd.read_csv(StringIO(lines), sep = '\t')

            # self.data = pd.read_csv('191017-K2-1_EDX.txt', '\t')
                self.elements = [ele for ele in self.data.columns[4:]]
                Label(self, text = 'Choose elements: ').pack()
                self.chosed = Checkbar(self, self.elements)
                self.chosed.pack()
                self.nextB = Button(self, text = 'next', command = lambda: self.on_next(path)).pack(anchor = 'e')
                self.ele_name = None
                self.ele_index = None

        def on_next(self, path):
            self.ele_index = list(self.chosed.state())
            self.ele_name = [self.elements[i] for i, v in enumerate(self.ele_index) if v > 0]
            w = Toplevel()
            w.title(path)
            ShowEDS(w, self.data, self.ele_index, self.ele_name).pack()



# check buttons
class Checkbar(Frame):
   def __init__(self, parent=None, picks=[], side=LEFT, anchor=W):
      Frame.__init__(self, parent)
      self.vars = []
      for pick in picks:
         var = IntVar()
         var.set(1)
         chk = Checkbutton(self, text=pick, variable=var)
         chk.pack(side=side, anchor=anchor, expand=YES)
         self.vars.append(var)
   def state(self):
      return map((lambda var: var.get()), self.vars)


