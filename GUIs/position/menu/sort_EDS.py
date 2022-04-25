from tkinter import *
import pandas as pd
import numpy as np
from io import StringIO
import os

try:
    from choosefiles import OpenCSV
except:
    from menu.choosefiles import OpenCSV

class Sort_EDS(Frame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master

        Button(self, text = 'input', command = self.on_run).pack()
        self.pack()

    def on_run(self):
        # input_f = pd.read_csv(r'test file_0004540@20kV.txt',  header = 0)
        self.fileName = ''
        self.workingPath = ''
        try:
            template = pd.read_csv(r'test file-Dario.csv',  header = 0)
        except:
            template = pd.read_csv(r'menu\test file-Dario.csv',  header = 0)

        data = self.inputf() # input unorganized data

        formatted_data = self.formatdata(template, data)

        #output
        # os.mkdir('formatted')
        formatted_data.to_csv(os.path.join(self.workingPath, f'{self.fileName}-3_formatted_Origin.csv'), sep = ',', index = False)
        formatted_data.drop(formatted_data.columns[3], axis =1, inplace = True)
        formatted_data.insert(1, 'In stats.', 'Yes')
        formatted_data.iloc[:,2] = formatted_data.iloc[:,2]/1000
        formatted_data.iloc[:,3] = formatted_data.iloc[:,3]/1000
        formatted_data.to_csv(os.path.join(self.workingPath, f'{self.fileName}-2_formatted_.txt'), sep = '\t', index = False)

        data.to_csv(os.path.join(self.workingPath, f'{self.fileName}-1_deleteExtra.txt'), sep = '\t', index = False)

        self.master.destroy()



        # print(len(data))

    def formatdata(self, template, data):
        formatted_data = self.createOutput(template, data)

        for index_data, row_data in data.iterrows():
            for index_format, row_format in formatted_data.iterrows():
                if row_format[3] == 1:
                    formatted_data.iloc[index_format,4:] = [v for v in row_data[4:]]
                    # print(formatted_data.iloc[:,4:])
                    formatted_data.iloc[index_format,3] = 0
                    # row_format[3] = 0
                    break
        formatted_data.iloc[:,3] = template.iloc[:,3]
        return formatted_data



    def createOutput(self, template, data):
        formatted_data = template.copy()
        for col in data.columns[4:]:
            formatted_data[col] = 0
        return formatted_data


    def inputf(self):
        path = OpenCSV(self).getFilePath()[0]
        self.workingPath = os.path.split(path)[0]
        self.fileName = os.path.splitext(os.path.basename(path))[0]
        lines = ''
        columnFlag = True
        if len(path) > 0:
            fh = open(path)
            for line in fh:
                if columnFlag and ('Spectrum' in line or  'Spektrum' in line):
                    lines += line.rstrip() + '\n'
                    columnFlag = False
                if 'Spectrum 1' in line or  'Spektrum 1' in line:
                    lines += line.rstrip() + '\n'
            fh.close()
            return pd.read_csv(StringIO(lines), sep = '\t')

