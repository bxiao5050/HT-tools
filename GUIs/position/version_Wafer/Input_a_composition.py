import tkinter as tk
import tkinter.ttk as ttk

import numpy as np
import pandas as pd

class Input_a_composition(tk.Frame):
    '''search from a given composition
    '''
    def __init__(self, master, df):
        super().__init__(master)
        self.ele_columns = df.columns[3:]
        f_top = tk.LabelFrame(self, text = 'input a composition range')


        self.ele_guis = [Search_one(f_top, df[ele].min(), df[ele].max(), ele) for ele in self.ele_columns]

        for ele_gui in self.ele_guis:
            ele_gui.pack(side = 'left')

        # tk.Button(self, text = 'search', fg = 'red', command = self.on_search)
        f_top.pack()

    # return values for the activated checkbox
    def get_values(self):
        values = {}
        for ele, ele_gui in zip(self.ele_columns, self.ele_guis):
            if ele_gui.checkbox_v.get():
                values[ele] = ele_gui.get_value()
        return values






class Search_one(tk.LabelFrame):
    ''' a frame containing a scale, a spinbox, a entry and a check box for one element
    '''
    def __init__(self, master, v_min, v_max, ele):
        super().__init__(master)
        self.ele = ele

        self.input_v = tk.DoubleVar()
        self.error_v = tk.DoubleVar()
        self.checkbox_v = tk.IntVar()
        self.checkbox_v.set(1)

        checkb = tk.Checkbutton(self, text = f'{self.ele} ({v_min} - {v_max})', fg = 'blue', width = 10, variable = self.checkbox_v)
        scale = tk.Scale(self, from_ = v_min, to = v_max, resolution = 0.1, orient = 'vertical', length = 640, variable = self.input_v, command = self.on_scale)
        spinbox = tk.Spinbox(self, from_ = v_min, to = v_max, increment = 0.1, textvariable = self.input_v, width = 10, wrap = False, command = self.on_spinbox, state = 'readonly')
        # spinbox.bind('<FocusOut>', self.on_mouse_leave_spinbox)
        entry_f =tk.LabelFrame(self, text = 'error')
        entry = tk.Entry(entry_f, textvariable = self.error_v, width = 10)
        entry.delete(0, 'end')
        entry.insert(0, 1)
        entry.bind('<FocusOut>', self.on_mouse_leave_entry)
        entry.pack()

        self.inf = tk.Label(self, fg = 'red')

        checkb.pack()
        scale.pack()
        spinbox.pack(pady = (5,0))
        entry_f.pack(pady = (5,5))
        self.inf.pack(pady = (0, 5))
        self._set_value()


    def get_value(self):
        return [self.input_v.get() - self.error_v.get(), self.input_v.get() + self.error_v.get()]


    def on_scale(self, e):
        self._set_value()

    def on_spinbox(self):
        self._set_value()

    def on_mouse_leave_entry(self, e):
        self._set_value()

    def _set_value(self):
        self.inf.config(text = f'{round(self.input_v.get()-self.error_v.get(),1)} < {self.ele} < {round(self.input_v.get()+self.error_v.get(),1)}')

