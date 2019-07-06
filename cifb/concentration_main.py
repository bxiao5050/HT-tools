from tkinter import *
from tkinter import messagebox, filedialog


import pandas as pd
# import pyautogui
# from PIL import ImageGrab
import subprocess
import time

from addRow import AddRow
class Main_concentration(Frame):
    def __init__(self, master):
        super().__init__( master)
        self.master = master

        self.data = pd.read_csv('GUIs/Elements.csv')
        # self.data.set_index('ele')


        # thickness, time, remainder
        Label(self, text = 'Total thickniss (nm)', font='Helvetica 8 bold').grid(row = 0, column = 0, pady = (10,0))
        self.thickness = Entry(self, width = 5)
        self.thickness.grid(row = 1, column = 0, pady = (0, 30))

        Label(self,  text = 'Deposition time (s)', font='Helvetica 8 bold').grid(row = 0, column = 1, columnspan = 2, pady = (10,0))
        self.time = Entry(self, width = 5)
        self.time.grid(row = 1, column = 1, columnspan = 2, pady = (0, 30))

        Label(self,  text = 'Remainder (at.%)', font='Helvetica 8 bold').grid(row = 0, column = 3, columnspan = 3, pady = (10,0))
        self.remainder = Label(self, text = '0', width = 5, relief = 'sunken')
        self.remainder.grid(row = 1, column = 3, columnspan = 3, pady = (0, 30))


        # title
        Label(self, text = 'Element', font='Helvetica 8 bold').grid(row = 2, column = 0, sticky = 's')
        Label(self, text = 'Required\nComposition\n(at.%)', font='Helvetica 8 bold').grid(row = 2, column = 1, sticky = 'e')
        Label(self, text = 'Measured\nRate\n(nm/W.s)', font='Helvetica 8 bold').grid(row = 2, column = 2)
        Label(self, text = 'Molar\nVolumn\n(cm\u00b2)', font='Helvetica 8 bold').grid(row = 2, column = 3)
        Label(self, text = 'Calculated\nThickness\n(nm)', font='Helvetica 8 bold').grid(row = 2, column = 4)
        Label(self, text = 'Calculated\nPower\n(W)', font='Helvetica 8 bold').grid(row = 2, column = 5)

        #element row
        self.rowN = 0
        self.nAR = {} #num and row
        self.addB = Button(self, text = '+', command = self.on_addrow)
        self.calB = Button(self, text = 'save image', fg = 'blue', command = self.on_screenshot)
        self.addB.grid(row = 3, column = 0, sticky = 'w', pady = (15,5))
        self.calB.grid(row = 3, column = 5, sticky = 'w', pady = (15,5))

        #add 3 row:
        for i in range(2):
            self.on_addrow()

    def on_screenshot(self):
        subprocess.call(r'print.exe')


    def on_addrow(self):
        self.rowN += 1
        self.nAR[self.rowN] = AddRow(self)
        self.nAR.get(self.rowN).grid(row = 2 + self.rowN, column = 0, columnspan = 6)
        #bind mouse focus
        self.nAR.get(self.rowN).ele_per.bind('<FocusOut>', self.focus_leave)
        self.nAR.get(self.rowN).ele_name.bind('<FocusOut>', lambda event, rowN = self.rowN: self.focus_leaveVolumn(event, rowN))
        self.nAR.get(self.rowN).ele_name.bind('<FocusIn>', lambda event, rowN = self.rowN: self.focus_leaveVolumn(event, rowN))
        self.nAR.get(self.rowN).ele_R.bind('<FocusIn>', self.focus_leave)
        self.nAR.get(self.rowN).ele_R.bind('<FocusOut>', self.focus_leave)

        self.addB.grid(row = 3 + self.rowN, column = 0)
        self.calB.grid(row = 3 + self.rowN, column = 5)

    def focus_leave(self, e):
        v = 0
        for row in self.nAR.values():
            v += float(row.ele_per.get())
        text = 100 - v
        self.remainder.config(text = text)
        self.on_cal()

    def focus_leaveVolumn(self, e, rowN):
        ele = e.widget.get()
        if len(ele) > 0:
            # print(self.data.head())
            try:
                molarVolumn = round(self.data[self.data['ele'] == ele].iat[0, 1], 4)
            except IndexError:
                return
                molarVolumn = None
            if molarVolumn is not None:
                self.nAR.get(rowN).ele_V.config(text = molarVolumn)
        self.on_cal()
    #parse the formular


    def on_cal(self):
        if len(self.thickness.get()) > 0 and len(self.thickness.get()) > 0:
            D = float(self.thickness.get())
            T = float(self.time.get())
        #1. get normalized PV_i = Per_i*V_i
        pvi = []
        pv = 0
        try:
            for i, row in enumerate(self.nAR.values()):
                pvi.append(float(row.ele_per.get())*float(row.ele_V.cget('text')))
                pv += pvi[i]

            for i, row in enumerate(self.nAR.values()):
                ri = float(row.ele_R.get()) # get Rate
                if ri < 0.00001:
                    break
                di = round(pvi[i]/pv*D, 4) #thickness
                pi = round(di/T/ri, 4) #power
                row.ele_D.config(text = di)
                row.ele_W.config(text = pi)
        except:
            pass





def main():
    root = Tk()
    root.title('Co-deposition')
    app = Main_concentration(root)
    app.pack()

    # Gets the requested values of the height and widht.
    windowWidth = root.winfo_reqwidth()
    windowHeight = root.winfo_reqheight()
    print("Width",windowWidth,"Height",windowHeight)

    # Gets both half the screen width/height and window width/height
    positionRight = int(root.winfo_screenwidth()/2 - windowWidth/2)
    positionDown = int(root.winfo_screenheight()/2 - windowHeight/2)

    # Positions the window in the center of the page.
    root.geometry("+{}+{}".format(positionRight, positionDown))
    root.mainloop()


if __name__ == '__main__':
    main()
