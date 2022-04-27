import sys
path = 'C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\final'
sys.path.append(path)
path = 'C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\final\\mywidgets\\treeviewXRD'
sys.path.append(path)

from tkinter import *
from tkinter import ttk
import os

from treeXRD import TheoreticalTreeview
import xrdSimulation

from usefulModules import choosefiles

class TVCanvas(TheoreticalTreeview):
    """
    interactive with canvas
    """

    def __init__(self, master, canvas, **kw):
        TheoreticalTreeview.__init__(self, master, canvas, **kw)





    #return calculated XRD pattern
    def get_calXRDs(self):
        return self.cal_patterns








