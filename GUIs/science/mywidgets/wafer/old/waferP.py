import sys
path = 'C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\final\\mywidgets\\wafer'
sys.path.append(path)


from wafer_visual import WaferPanel
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.figure import Figure

import os

from tkinter import *
from tkinter import ttk
import pandas as pd

class waferData(WaferPanel):
    def __init__(self, master, canvas, **kw):
        WaferPanel.__init__(self, master, **kw)



        self.canvasPanel = canvas

        expData = pd.DataFrame()

        #button override press command
        for  k, b in self.wafer.pAB.items():
            b.configure(command = lambda k = k : self.on_buttonPress(k))

    #override button press command
    def on_buttonPress(self, pos):
        self.wafer.pAB[pos].oneOrTwoclick()
        print(self.wafer.pAB[pos].cget('text'))




