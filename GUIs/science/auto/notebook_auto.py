from tkinter import *
from tkinter import ttk

import pandas as pd
try:
    from auto.autoMannually import AutoMannually
    from auto.mainauto import MainAuto
except ModuleNotFoundError:
    import sys
    sys.path.append('C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\final')
    from auto.autoMannually import AutoMannually
    from auto.mainauto import MainAuto

class Notebook_auto(ttk.Notebook):
    def __init__(self, master, app = None, **kw):
        ttk.Notebook.__init__(self, master, **kw)
        if app is None:
            data = pd.read_csv('C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\Cantor alloy\\XRD_Cantor_400_backg_norm.csv')
        else:
            data = app.getExpData()
        self.master = master
        # w = Toplevel(self)
        # w.title('Automation of mannully specified peaks')


        tab_auto = MainAuto(self, app = app, autowindow = self.master)
        tab_mannully = AutoMannually(self, app = app, autowindow = self.master)


        self.add(tab_auto, text = "Peaks from reference")
        self.add(tab_mannully, text = "Mannually specified peaks")


    def on_closeAll(self):
        self.master.withdraw()

