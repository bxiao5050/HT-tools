from tkinter import *
import tkinter.ttk as ttk
import pandas as pd
import numpy as np

try:
    from Input_a_composition import Input_a_composition
    from MultiSel_inf import MultiSel_inf
except:
    from version_Wafer.Input_a_composition import Input_a_composition
    from version_Wafer.MultiSel_inf import MultiSel_inf

class Search_composition(Frame):
    def __init__(self, master, df):
        super().__init__(master)
        self.df = df

        self.input_f = Input_a_composition(self, df)
        self.multisel_f = MultiSel_inf(self, df)

        # inp = [17.6,  6.7,  3.9,  42.6,  29.2]
        # for mul, v in zip(self.input_f.ele_guis, inp):
        #     mul.input_v.set(v)

        self.input_f.pack(side = 'left', padx = (5,10), pady = (20,5), fill = 'y', expand = 1)
        self.multisel_f.pack(side = 'left', fill = 'y', expand = 1)

        ttk.Button(self.input_f, text = 'search', command = self.on_search).pack(pady = (5,5))

    def on_search(self):
        #1. find
        input_values = self.input_f.get_values() # input ranges
        col_id = []
        ele_names = self.df.columns[3:]
        for ele in input_values.keys():
            mi, mx = min(input_values[ele]), max(input_values[ele])
            col_data = self.df[ele].to_numpy()
            idx = np.where(np.logical_and(col_data>=mi, col_data<=mx))[0]
            # print(f'{ele} {mi}, {mx}')

            if len(col_id) == 0:
                col_id =  idx
            else:
                col_id = list(set(col_id).intersection(idx))
                if len(col_id) == 0:
                    self.multisel_f.on_clear()
                    self.multisel_f.inf.insert('1.0', 'no match')
                    return
            # print(f'col_id: {col_id}')
            # print(f'idx: {idx}'  +'\n')

        find_xy = [(row['x'], row['y']) for index, row in self.df.loc[col_id].iterrows()]

        #2.draw
        self.multisel_f.set_find_results(find_xy)










