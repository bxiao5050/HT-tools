from tkinter import *
from tkinter import ttk
"""
turn green when mouse moves over
need to call two functions, mouse_enter and mouse_leave
"""
class HoverButton(Button):
    def __init__(self, master, position = None, **kw):
        Button.__init__(self,master=master,  **kw)

        #set position
        self.position = position
        self.defaultBackground = self["background"]

        #mouse moving over
    def mouse_enter(self, fn):
        self.bind("<Enter>", fn)
    def mouse_leave(self, fn):
        self.bind("<Leave>", fn)

    # return the position, default value is None
    def getPosition(self):
        return str(self.position)

    def setPosition(self, pos):
        self.position = pos


"""
similar to checkbutton, one-click is sunken, two-click is raised
need to call buttonPress to set the command
"""
class SunkenButton(HoverButton):
    def __init__(self, master, **kw):
        HoverButton.__init__(self, master, **kw)

    def on_buttonPress(self, pos):
        self.one_buttonPress_1()
        #add pressed button names
    def one_buttonPress_1(self):
        self.oneOrTwoclick()



"""
small button
"""
class WaferButton(SunkenButton):

    def __init__(self, master, **kw):
        SunkenButton.__init__(self, master,**kw)

        #set mouse moving
        self.mouse_enter(self.on_enter)
        self.mouse_leave(self.on_leave)

    def on_enter(self, e):
        self['background'] = self['activebackground']
        # print(self.getPosition())

    def on_leave(self, e):
        self['background'] = self.defaultBackground


"""
wafter button which can show its position to label
label: show information
label_pressedbutton: show all other information
"""
class WaferButton_label(WaferButton):

    def __init__(self, master, position = None, label = None, label_pressedbutton = None, **kw):
        WaferButton.__init__(self, master, **kw)
        self.label = label

        #set pressed button names
        self.label_pressedbutton = label_pressedbutton

        #set position value
        self.setPosition(position)

        self.config(relief = 'raised')

        #when the button is pressed
        pos = 2
        self.config(command = lambda: self.on_buttonPress(pos))

    #one click or two clicks
    def oneOrTwoclick(self):
        if self.cget('relief') == 'raised':
            self.config(relief = 'sunken')
        elif self.cget('relief') == 'sunken':
            self.config(relief = 'raised')


    def on_buttonPress(self, e):
        self.one_buttonPress_1()

    #add pressed button names
    def one_buttonPress_1(self):
        self.oneOrTwoclick()
        buttonStatus = self.cget('relief')

        # add or delete the pressed button information depending on button status
        # only if label is not empty
        s = self.label_pressedbutton.cget('text').split(',') if self.label_pressedbutton.cget('text') else []
        if buttonStatus == 'sunken' and (self.getPosition() not in s):
            s.append(self.getPosition())
        elif buttonStatus == 'raised' and (self.getPosition() in s):
            s.remove(self.getPosition())

        self.label_pressedbutton.config(text = ','.join(s))










