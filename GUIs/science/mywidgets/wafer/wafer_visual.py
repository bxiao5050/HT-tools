# import sys
# path = 'C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\final\\mywidgets\\wafer'
# sys.path.append(path)

#from PIL import Image, ImageTk

import os
import sys

from tkinter import *
from tkinter import ttk
import pandas as pd
try:

    from phaseIdentification.mywidgets.wafer.myWafer import WaferArrange
except:
    from mywidgets.wafer.myWafer import WaferArrange

from PIL import Image, ImageTk

"""wafer with extended color buttons
"""
class WaferPanel(Frame):
    def __init__(self, master, **kw):
        Frame.__init__(self, master, **kw)


        self.wafer = WaferArrange(self)
        self.colorButtons = []
        self.fColorB = Frame(self) # frame for color buttons
        self.ftext = Frame(self) #frame for log and info textarea
        self.fInf = LabelFrame(self.ftext, text = 'Information for all the selected positions') #frame for other informations
        self.fLog = LabelFrame(self.ftext, text = 'Wafer status log') #frame for other informations

        self.fInf.pack(side = 'top', fill= 'both',expand = True)
        self.fLog.pack(side = 'bottom', fill= 'both',expand = True)

        # self.fInf.grid(row = 0, column = 0, pady = (20, 5), sticky = 'n, w, e, s')
        # self.fLog.grid(row = 1, column = 0, pady = (0, 20), sticky = 'n, w, e, s')


        #geometry in container
        self.wafer.grid(row = 0, column = 0, sticky = 'w')
        self.fColorB.grid(row = 0, column = 1,padx = (20, 20), sticky = 'w')
        self.ftext.grid(row = 0, column = 2, pady = (0, 30), sticky = 'n, w, e, s')

        # filename1 = os.path.join(os.path.dirname(sys.executable), 'yes.png')
        # filename2 = os.path.join(os.path.dirname(sys.executable), 'triangle.png')
        # filename3 = os.path.join(os.path.dirname(sys.executable), 'rectangle.png')
        # filename4 = os.path.join(os.path.dirname(sys.executable), 'no.png')
        # filename5 = os.path.join(os.path.dirname(sys.executable), 'default.png')



        # self.pngImage = [PhotoImage(file = filename1), PhotoImage(file = filename2), PhotoImage(file = filename3), PhotoImage(file = filename4), PhotoImage(file = filename5)]




        self.lPos = Label(self.fColorB, width = 8, font=("Courier", 14)) # shwo move over position

        self.textArea = Text(self.fInf, width = 400, wrap="word") # show other information
        scrolly = Scrollbar(self.textArea)
        scrolly.config(command=self.textArea.yview)
        self.textArea.config(yscrollcommand=scrolly.set)
        scrolly.pack(side=RIGHT, fill=Y)
        self.textArea.pack(expand=YES, fill=BOTH)

        #show log
        self.log = Text(self.fLog, width = 400, wrap="word") # show other information
        scrolly2 = Scrollbar(self.log)
        scrolly2.config(command=self.log.yview)
        self.log.config(yscrollcommand=scrolly2.set)
        scrolly2.pack(side=RIGHT, fill=Y)
        self.log.pack(expand=YES, fill=BOTH)

        self.columnconfigure(2, weight = 3)
        self.rowconfigure(0, weight = 3)


        self.bText = ['Match        ', 'Doubt        ', 'Difficult     ', 'Not match', 'Erase          ']
        #add colored button
        self.pngImage = [ImageTk.PhotoImage(Image.open('GUIs/yes.png'), master=self), ImageTk.PhotoImage(Image.open('GUIs/triangle.png'), master=self), ImageTk.PhotoImage(Image.open('GUIs/rectangle.png'), master=self), ImageTk.PhotoImage(Image.open('GUIs/no.png'), master=self), ImageTk.PhotoImage(Image.open('GUIs/default.png'), master=self)]
        for k in range(5):
            self.colorButtons.append(Button(self.fColorB,  image = self.pngImage[k], text = self.bText[k], compound = 'left'))
            self.colorButtons[k].image = self.pngImage[k]
            self.colorButtons[k].grid(row = k, column = 0,sticky="W", pady = (2, 2))
        #add command to each colored button
            self.colorButtons[k].config(command = lambda k = k: self.on_changeButtonColor(k))

        self.lPos.grid(row = 5, column = 0,  pady = (30, 0))

        #button override press command
        for  b in self.wafer.pAB.values():
            b.mouse_enter(self.on_enter)

    ## assign colored button to the pressed button
    def on_changeButtonColor(self, chose_id):
        self.changeBcolor(chose_id)

    def changeBcolor(self, chose_id):
        if chose_id == 4:
            self.wafer.raiseButtons() #reset all the buttons
        else:
            for pressedButton in self.wafer.getpressedButtons():
                pressedButton.config(image = self.pngImage[chose_id], width = 4, height =4, relief = 'raised')


    #override mouse enter
    def on_enter(self, e):
        e.widget.config(bg =  'SkyBlue3')
        self.lPos.config(text = f'''pos: {e.widget.cget('text')}''') # pos
        # self.textArea.insert('end', f'''pos: {e.widget.cget('text')}''')






