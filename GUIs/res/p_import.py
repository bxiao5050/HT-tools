from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
from matplotlib.figure import Figure
import os

import choosefiles
import sWaferk

class P_import(Frame):
    def __init__(self, master):
        super().__init__(master)
        self.import_coord = Button(self, text = '1. import coordinates', command = self.on_importCoord)
        self.import_coord_L = Label(self)
        self.import_B =  Button(self, text = '2. import data', command = self.readfiles, state = 'disabled')

        self.droplist = ttk.Combobox(self, state = 'readonly')
        self.wafer = sWaferk.SWafer(self)

        self.import_coord.grid(row = 0, column = 0, padx = (5,5), sticky = 'w')
        self.import_coord_L.grid(row = 0, column = 1, padx = (5,5), sticky = 'w')
        self.import_B.grid(row = 1, column = 0, padx = (5,5), sticky = 'w')
        self.wafer.grid(row = 2, column = 0, columnspan = 2, padx = (5,5), sticky = 'w')

        for b in self.wafer.pAB.values():
            b.config(relief = 'groove', state = 'disabled')


        self.coord = None
        self.pAData = {}


    def on_importCoord(self):
        #2. get XRD from a csv file
        path = choosefiles.OpenCSV(self).getFilePath()
        if len(path) != 0:
            self.import_B.config(state = 'normal')
            # self.title = path
            basename = os.path.basename(path[0])
            # filebase = os.path.splitext(basename)[1]
            # self.config(text = os.path.splitext(basename)[0])
            try:
                self.coord = pd.read_csv(path[0])
                if len(self.coord) > 0:
                    self.import_coord.config(fg = 'blue')
                    self.import_coord_L.config(text = 'Coordi: '+ os.path.splitext(basename)[0])
                    # self.coord.columns = ['p', 'x', 'y']
                    # print(self.coord.columns)
            except:
                pass

    def readfiles(self):
        paths = choosefiles.Openf(self).getFilePaths()
        for path in paths:
            try:
                data = pd.read_csv(path, header = 1)
                y0 = data.iloc[:, 1].to_numpy()
            except IndexError:
                data = pd.read_csv(path, header = 1, sep = '\t')

            # get x, y from file
            # x = int(data.iat[0, 2])
            # y = int(data.iat[0, 3])
            # pos = self.coord['x']
            #get x, y from file name
            basename = os.path.basename(path)
            x = int(basename.split('_')[-2])
            y = int(basename.split('_')[-1].replace('.csv', ''))
            po = self.coord[(self.coord['x'] == x)&(self.coord['y'] == y)]
            #keep data and pos if the pos is found
            if len(po) > 0:
                pos = po.iat[0,0]
                self.wafer.pAB.get(pos).config(relief = 'raised', state = 'normal')
                self.pAData[pos] = data


            # print(y)
            # basename = os.path.basename(path)
            # filename = os.path.splitext(basename)[0]








def main():
    root = Tk()
    app = P_import(root)
    app.pack(side=TOP, fill=BOTH, expand=1)
    root.mainloop()

if __name__ == '__main__':
    main()
