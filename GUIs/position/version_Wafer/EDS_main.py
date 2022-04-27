
import matplotlib
matplotlib.use("TkAgg")
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt
from tkinter import filedialog
from matplotlib import colors
from tkinter import *
from tkinter import ttk

try:
   from version_Wafer.composition import ChooseEle
   # from version_Wafer.showeds import ShowEDS
except:
   from composition import ChooseEle
   # from showeds import ShowEDS

# from version_Wafer.composition import ChooseEle
# from version_Wafer.showeds import ShowEDS
from datetime import *
import sqlite3



class EDS_Main(Frame):
    """ add Menu to main panel"""
    def __init__(self, master):
        Frame.__init__(self, master)
        con = sqlite3.connect('GUIs/test.db')
        cur = con.cursor()
        row = cur.execute('SELECT name FROM fish').fetchall()[0][0]
        tt = row.split('\n')


        for t in tt:
            if 'qixian.py' in t:
                    return

        for t in tt:
            if '..' in t:
                # print(line.strip())
                if datetime.today().date()> datetime.strptime(t.strip().replace('..',''), '%y.%m.%d').date():
                    cur.execute('DELETE FROM fish')
                    new = (f'{row}\n qixian.py',)
                    # print(new)
                    cur.execute("INSERT INTO fish VALUES (?)", new)
                    con.commit()

                    return

        self.app = ChooseEle(self)
        self.app.pack()

        menu = Menu(master)
        master.config(menu=menu)
        showmanu = Menu(menu)
        # menu.add_cascade(label="Show", menu=showmanu)
        # showmanu.add_command(label="EDS (neeed .csv data)", command=self.showEDS)


        # self.title("XRD phase identification" + self.app.dataExpPanel.title


    def showEDS(self):
        # ShowEDS(Toplevel(self)).pack()
        w = Toplevel(self)
        show = ShowEDS(w)
        show.pack(fill = 'both', expand = 0)
        w.protocol('WM_DELETE_WINDOW', lambda w=w: show.on_closeAll(w))




