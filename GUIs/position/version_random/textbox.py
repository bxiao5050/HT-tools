import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import colors
from matplotlib import cm

from tkinter import *
try:
   from version_random.composition import ImportData
except :
   from composition import ImportData

class TextBox(Frame):
    def __init__(self, master):
        super().__init__(master)
        w = PanedWindow(self)
        w.pack(fill="both", expand=True)


        textF = Frame(w)
        Button(textF, text = 'show', fg = 'blue', command = self.on_textChanged).pack(side = 'top')
        self.text = Text(textF, height = 35)
        self.text.pack(side = 'left', fill = 'y')
        S = Scrollbar(textF, command = self.text.yview)
        S.pack(side = 'right', fill = 'y')
        self.text.config(yscrollcommand = S.set)


        self.eleF = Frame(w)

        w.add(textF)
        w.add(self.eleF)
        self.ele = Label(self.eleF, text = '                                                                                                                                                                  ')
        self.ele.pack()

    def on_textChanged(self):
        if self.ele is not None:
            self.ele.destroy()
        self.ele = ImportData(self.eleF, self.text.get(1.0, 'end'))
        self.ele.pack(side = 'bottom', fill="both", expand=True)



