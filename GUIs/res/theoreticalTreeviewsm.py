import sys
from tkinter import *
from tkinter import ttk
import os
import numpy as np
import pandas as pd

from treeview_2_delete_color_buttonssm import MyTreeview

import choosefilessm

import threading
import time
import sys
"""
Treeview with all the buttons being set, which deals with theoretical data import
"""
class TheoreticalTreeview(MyTreeview):
    def __init__(self, master, format_filename, **kw):
        MyTreeview.__init__(self, master, **kw)
        self.directoryname = None
        self.paths = None
        self.import_succeed_N = 0
        self.import_failed_N = 0

        self.log = pd.DataFrame()

        self.format_filename = format_filename ##['composition', 'ICSD', 'structure_type', 'space_group']


        # set commands for read, add files ...
        # self.set_treeview_click(self.on_treeview_click)
        # self.set_addfiles(self.on_addfiles)
        self.set_readfiles(self.on_readfiles)


        #self.cal_patterns = []# keep calculated patterns

        self.fileAndPattern = {} # key: filename, value: diffraction pattern
        # self.canvasPanel = canvas #get the canvas GUI handle

        #add percentage column to treeview
        self.tv.config(columns = ('%'))
        self.tv.column('%', width = 20, anchor = 'n')
        self.tv.heading('%', text = '%')

        self.tv.column('#0', width = 700)
        self.tv.bind('<Double-Button-1>', self.on_doubleClick)

        self.by.grid_forget()
        self.br.grid_forget()
        self.bb.grid_forget()
        self.bw.grid_forget()



    def on_doubleClick(self, e):
        s = self.tv.selection()[0] + '.cif'
        path = os.path.join(self.directoryname, s)
        # with open(os.path.normpath(path), "r") as f:
        top = Toplevel()
        top.title(self.tv.selection()[0])
        filename = os.path.normpath(path)

        S = Scrollbar(top)
        T = Text(top, height=50, width=120)
        S.pack(side= 'right', fill= 'y')
        T.pack(side= 'left', fill='y')
        S.config(command=T.yview)
        T.config(yscrollcommand=S.set)
        T.insert('end', open(filename,'r').read())



    #read files + parse cifs
    def on_readfiles(self):
        #1. get file names
        paths = choosefilessm.Openf(self).getFilePaths()

        if paths is not None:
            # self.folderpath = paths[0]
            self.cifToXRD(paths)



    #parse cifs
    def cifToXRD(self, paths):
        self.paths = paths
        threading.Thread(target=self.plotter).start()

    def plotter(self):
        top = Toplevel()
        textArea = Text(top, wrap="word", height=20, width=120) # show other information
        scrolly = Scrollbar(top)
        scrolly.config(command=textArea.yview)
        textArea.config(yscrollcommand=scrolly.set)
        scrolly.pack(side=RIGHT, fill=Y)
        textArea.pack(side = 'left', fill = 'both', expand = True)


        for path in self.paths:
            basename = os.path.basename(path)
            self.directoryname = os.path.dirname(path)

            filename, suffix = os.path.splitext(basename)

            new_filename = {'composition': '', 'ICSD': '', 'structure_type': '', 'space_group': '', 'space_group_num': ''}
            cellPara = {'333a':'', '333b':'', '333c':'', '444alpha':'', '444beta':'', '444gamma':''}
            norm_composi_pd = pd.DataFrame() # dataframe for a row
            try:
            # if True:
                f = open(path)
                line = f.readline()
                c = ''
                while line:
                    if "_chemical_formula_sum" in line:
                        c = line.split()[1:]

                        cc = ''.join(c)
                        composi = cc.replace('\n', '').replace(' ','').replace('\'', '')
                        new_filename['composition']= composi
                        norm_composi_pd = self.get_norm_compo(composi)
                    if '_cell_length_a' in line:
                        cellPara['333a'] = re.findall(r"[-+]?\d*\.\d+|\d+",line.replace('_cell_length_a ', ''))[0]
                    if '_cell_length_b' in line:
                        cellPara['333b'] = re.findall(r"[-+]?\d*\.\d+|\d+",line.replace('_cell_length_b ', ''))[0]
                    if '_cell_length_c' in line:
                        cellPara['333c'] = re.findall(r"[-+]?\d*\.\d+|\d+",line.replace('_cell_length_c ', ''))[0]
                    if '_cell_angle_alpha' in line:
                        cellPara['444alpha'] = re.findall(r"[-+]?\d*\.\d+|\d+",line.replace('_cell_angle_alpha ', ''))[0]
                    if '_cell_angle_beta' in line:
                        cellPara['444beta'] = re.findall(r"[-+]?\d*\.\d+|\d+",line.replace('_cell_angle_beta ', ''))[0]
                    if '_cell_angle_gamma' in line:
                        cellPara['444gamma'] = re.findall(r"[-+]?\d*\.\d+|\d+",line.replace('_cell_angle_gamma ', ''))[0]


                    if '_database_code_ICSD' in line:
                        new_filename['ICSD'] = line.replace('_database_code_ICSD ', 'ICSD-').replace('\n', '').replace(' ','') #icsd logo1
                    if '_chemical_name_structure_type' in line:
                        new_filename['structure_type'] = line.replace('_chemical_name_structure_type ', '').replace('\n', '').replace(' ','').replace('\'', '')

                    if '_symmetry_space_group_name_H-M' in line:
                        new_filename['space_group'] = line.replace('_symmetry_space_group_name_H-M ', '').replace('\n', '').replace(' ','').replace('\'', '').replace('/', '%')
                    if '_space_group_name_H-M_alt' in line:
                        new_filename['space_group'] = line.replace('_space_group_name_H-M_alt ', '').replace('\n', '').replace(' ','').replace('\'', '').replace('/', '%')

                    if '_symmetry_Int_Tables_number' in line:
                        new_filename['space_group_num'] = line.replace('_symmetry_Int_Tables_number ', '').replace('\n', '').replace(' ','').replace('\'', '').replace('/', '%')
                    if '_space_group_IT_number' in line:
                        new_filename['space_group_num'] = line.replace('_space_group_IT_number ', '').replace('\n', '').replace(' ','').replace('\'', '').replace('/', '%')

                        f.close()
                        break

                    line = f.readline()
                f.close()


                newfilename3 = ''
                for i, item in enumerate(self.format_filename):
                    if len(item) > 0:
                        newfilename3 += new_filename[item] + '_'
                        norm_composi_pd.insert(i+1, '111'+item, new_filename[item])
                for i, item in enumerate(cellPara):
                    if len(item) > 0:
                        # newfilename3 += new_filename[item] + '_'
                        norm_composi_pd.insert(len(norm_composi_pd.columns), item, cellPara[item])
                # print(norm_composi_pd)

                newfilename3 = newfilename3[0:len(newfilename3)-1].replace('__', '_') #remove the last '_', also change double underline to underline
                # newfilename3 = newfilename3 + suffix

                dst = os.path.normpath(os.path.join(self.directoryname, newfilename3 + suffix))
                os.rename(path, dst)
                textArea.insert('end', f'rename {filename} to {newfilename3}' + '\n')
                textArea.see('end')
                self.import_succeed_N += 1

                self.insertItem(newfilename3)

                norm_composi_pd.insert(0, '111after rename (filename)', newfilename3)

                # print(norm_composi_pd)
                self.log = pd.concat([self.log, norm_composi_pd], axis = 0, sort = True).fillna(0)
                time.sleep(0.05)
            except Exception as e:
                textArea.insert('end', sys.exc_info())
                self.import_failed_N += 1
                continue
            # self.fileAndPattern[filename] = pattern # add cif file name and corresponding XRD
            #.insert files


        textArea.insert('end', f'\n\nsucceed files: {self.import_succeed_N},  falied files: {self.import_failed_N}' + '\n\n')
        textArea.see('end')
        self.log.columns = [col.replace('111','').replace('222','').replace('333','').replace('444','') for col in self.log.columns]
        # print(self.log.columns)





        self.log.to_csv(os.path.join(self.directoryname , 'log_En.csv'), index = False)
        self.log.to_csv(os.path.join(self.directoryname , 'log_De.csv'), sep = ';', index = False)

    #return normalized compostion in the DataFRame form
    def get_norm_compo(self, composi):
        #'Co0.34Ni0.34Pi2'
        letter =  re.findall("[a-zA-Z]+", composi) #['Co', 'Ni', 'Pi']
        digital = np.array([float(n) for n in re.findall('\d*\.?\d+',composi)]) #['0.34', '0.34', '2']
        norm_digital = digital/digital.sum(0)
        #normalized formula
        norm_composi = ''.join([le+str(np.round(di, 2)) for le, di in zip(letter, norm_digital)])

        norm_composi_pd = pd.DataFrame(columns = ['222'+col for col in letter], index = [composi])
        norm_composi_pd.loc[composi] = norm_digital
        norm_composi_pd.insert(0, '111norm_composition', norm_composi)

        # return {'norm_composi':norm_composi, 'norm_composi_pd':norm_composi_pd}
        return norm_composi_pd






    # diaglog to select a file, return the full file path
    def diaglogFileSelect(self, master):
        filez = askopenfilenames(parent = master)
        return master.tk.splitlist(filez)

    #reset
    def resetAll(self):
        self.treeview_deleteAll()
        self.fileAndPattern.clear()
        self.canvasPanel.deleteAllPlot()

    #insert new item to treeview
    def insertItem(self, filename, status = 0):
        item = filename
        self.tv.insert('', 'end', item, text = item)
        self.tv.set(item, '%', status)

    def getFileAndPatterns(self):
        return self.fileAndPattern




