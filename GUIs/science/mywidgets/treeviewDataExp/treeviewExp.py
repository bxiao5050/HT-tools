# import sys
# path = 'C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\final'
# sys.path.append(path)

# path = 'C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\final\\mywidgets\\treeviewDataExp'
# sys.path.append(path)

from mywidgets.treeviewXRD import treeview_2_delete_color_buttons
from usefulModules import choosefiles
from tkinter import *
from tkinter import ttk
import os

import pandas as pd

class TvDataExp(treeview_2_delete_color_buttons.MyTreeview):
    '''
treeview panel to import exp XRD data
'''
    def __init__(self, master,  **kw):
        treeview_2_delete_color_buttons.MyTreeview.__init__(self, master, **kw)

        self.tv.config(height = 38)
        self.tv.column("#0", width = 150, minwidth = 230)

        #hide buttons
        self.addButton.grid_forget()
        self.readButton.grid_forget()
        self.deleteButton.grid_forget()
        self.by.grid_forget()
        self.br.grid_forget()
        self.bb.grid_forget()
        self.bw.grid_forget()
        self.bRevomeTags.pack_forget()

        # set commands for read
        self.set_treeview_click(self.on_treeview_click)
        self.set_readfiles(self.on_readfiles)

        #data
        self.XRDangle = None
        self.expData = pd.DataFrame()

        #title
        self.title = ''

        #file basename
        self.name = ''



    def on_readfiles(self):
        self.readfiles()

    def readfiles(self):
        #2. get XRD from a csv file
        path = choosefiles.OpenCSV(self).getFilePath()
        if len(path) != 0:
            self.title = path
            basename = os.path.basename(path[0])
            filebase = os.path.splitext(basename)[1]
            self.config(text = os.path.splitext(basename)[0], fg ='blue')
        if len(path) != 0 and filebase == '.csv':
            self.expData = pd.read_csv(path[0])
            if self.expData is not None:
                self.readButton.config(state = 'disable')
                try:
                    float(self.expData.columns[0])#mannually set the filenames if there si no header
                    for i in range(len(self.expData.columns) -1 ):
                       j = i + 1
                       self.insertItem(f'Intensity {j}')
                    return self.expData
                except ValueError:
                    for k, col in enumerate(self.expData.columns):
                        if k != 0:
                            self.insertItem(col)
                    return self.expData

    def normalization(self, df):
        df_norm = (df - df.min()) / (df.max() - df.min())
        return df_norm



    def on_treeview_click(self, e):
        pass
        #print(self.tv.selection())

    #insert new item to treeview
    def insertItem(self, col):
        item = col
        self.tv.insert('', 'end', item, text = item)

    def get_Data(self):
        return self.expData








