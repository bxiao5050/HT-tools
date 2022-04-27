
import tkinter as tk
from tkinter.ttk import Combobox

from theoreticalTreeviewsm import TheoreticalTreeview

class Ren(tk.Frame):
    def __init__(self, master):
        super().__init__(master)

        title = tk.Label(self, text = 'selection information: ', font = ("Times New Roman", 14, "bold"))
        self.cb = [Combobox(self, width = 25,  values = ['', 'composition: (Co0.115Fe0.885)','ICSD: (ICSD-102382)',  'structure_type: (fcc)', 'space_group: (Fm-3m)', 'space_group_num: (225)']) for i in range(5)]
        self.lresult = tk.Label(self, font = ("Times New Roman", 15), fg = 'blue')

        for i in range(len(self.cb)):
            self.cb[i].current(0)
            self.cb[i].bind('<<ComboboxSelected>>', self.show_format)
            self.cb[i].grid(row = 1, column =i, padx = (5,5))

        title.grid(row = 0, column =0, columnspan = 4, sticky = 'nw')
        tk.Label(self, text = 'example of renamed file name:', font =(14), fg = 'blue').grid(row = 2, column =0, columnspan = 4, sticky = 'nw', pady = (45,5))
        self.lresult.grid(row = 3, column =0, columnspan = 4, pady = (5,5))
        tk.Button(self, text = 'next', fg = 'red', command = self.on_next).grid(row = 4, column =5,  pady = (5,5), padx = (5,5))

    def show_format(self, e):
        self.format_filename = ['' for i in range(len(self.cb))]#['composition', 'ICSD', 'structure_type', 'space_group']
        self.example = ''

        for i in range(len(self.cb)):
            if len(self.cb[i].get()) > 0:
                self.format_filename[i] = self.cb[i].get().split('(')[0].replace(':','').replace(' ', '') # first part
                self.example += self.cb[i].get().split('(')[1].replace(')','') + '_' #second part

        self.example = self.example[0:len(self.example)-1] # remove the last

        self.lresult.config(text = self.example)


    def on_next(self):
        w = tk.Toplevel()
        w.title(self.example)
        a = TheoreticalTreeview(w, self.format_filename)
        a.pack()




