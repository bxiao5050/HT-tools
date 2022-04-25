from tkinter import *
from tkinter import ttk
"""
turn green when mouse moves over
need to call two functions, mouse_enter and mouse_leave
"""
class MyButton(Button):
    def __init__(self, master, **kw):
        Button.__init__(self,master=master,  **kw)

        self.config(relief = 'raised')


        self.defaultBackground = self["background"]
        self.bgColor =  self["background"]

        # mouse moving
        self.mouse_enter(self.on_enter)
        self.mouse_leave(self.on_leave)

        self.set_buttonPress(self.on_buttonPress)



        #bind mouse moving over
    def mouse_enter(self, fn):
        self.bind("<Enter>", fn)
    def mouse_leave(self, fn):
        self.bind("<Leave>", fn)

    def set_buttonPress(self, fn):
        self.config(command = fn)



    def on_buttonPress(self):
        self.oneOrTwoclick()

    def on_enter(self, e):
        self.config(bg =  'SkyBlue3')
        # print(self.getPosition())

    def on_leave(self, e):
        self.config(bg =  self.bgColor)



    #one click or two clicks
    def oneOrTwoclick(self):
        if self.cget('relief') == 'raised':
            self.config(relief = 'sunken')
        elif self.cget('relief') == 'sunken':
            self.config(relief = 'raised')

    def getDefaultColor(self):
        return self.defaultBackground

    def setBColor(self, color):
        self.bgColor = color

    def getBColor(self):
        return self.bgColor













