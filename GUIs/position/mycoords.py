from tkinter import *
from tkinter import ttk
from datetime import *

from version_random.textbox import TextBox
from version_Wafer.EDS_main import EDS_Main
from menu.sort_EDS import Sort_EDS

def func():
    print('sdfsf')

class Myc(Frame):

    def __init__(self, master):
        super().__init__(master)

        # filemenu.add_command(label="Exit", command=root.quit)


        notebook = ttk.Notebook(master)
        EDS_wafer = EDS_Main(master)
        notebook.add(EDS_wafer,text='Whole wafer')
        notebook.pack()

        EDS_fromText = TextBox(master)
        notebook.add(EDS_fromText,text='from text')
        notebook.pack()


    def add_tab(self,title, f):
        frame = ttk.Frame(self.notebook)
        self.notebook.add(frame,text=title)
        self.notebook.pack()






