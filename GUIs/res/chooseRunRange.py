from tkinter import *
import numpy as np

import myWaferk



class RunWafer(Frame):
    def __init__(self,master, **kw ):
        Frame.__init__(self, master, **kw)

        f = Frame(self)
        f.pack(fill ='both')
        self.wf = myWaferk.WaferArrange(f)
        self.lPos = Label(f, width = 8, font=("Courier", 14)) # shwo move over position

        self.wf.pack(side = 'left')
        self.lPos.pack(side = 'right', fill = 'y')

        #button override press command
        for  b in self.wf.pAB.values():
            b.mouse_enter(self.on_enter)
            b.config(width = 4, height =4)
            b.config(relief = 'groove', state = 'disabled')

        #override mouse enter
    def on_enter(self, e):
        e.widget.config(bg =  'SkyBlue3')
        self.lPos.config(text = f'''pos: {e.widget.cget('text')}''') # pos

    def waferOn(self):
        for  b in self.wf.pAB.values():
            b.config(state = 'normal')
        self.lPos.config(state = 'normal')

    def waferOff(self):
        for  b in self.wf.pAB.values():
            b.config(state = 'disabled')
        self.lPos.config(state = 'disabled')

class RunRange(LabelFrame):
    def __init__(self,master, **kw ):
        LabelFrame.__init__(self, master, **kw)
        self.config(text = 'Select positions')

        self.var = IntVar()
        # self.var = 1

        R1 = Radiobutton(self, text="All positions", variable=self.var, value=0,
                          command=self.sel)
        R2 = Radiobutton(self, text="Choose:", variable=self.var, value=1,
                          command=self.sel)
        self.R2e = Entry(self)
        self.R2e.insert(0, '1-5, 7, 12')
        self.R2e.config(state = 'disabled')

        R3 = Radiobutton(self, text="Select on wafer", variable=self.var, value=2,
                          command=self.sel)
        self.R3wf = RunWafer(self)
        self.R3wf.waferOff()

        R1.grid(row = 0, column = 0, sticky = 'w')
        R2.grid(row = 1, column = 0, sticky = 'w')
        self.R2e.grid(row = 1, column = 1, sticky = 'w')
        R3.grid(row = 2, column = 0, sticky = 'w')
        self.R3wf.grid(row = 3, column = 1, columnspan = 3)



# return selected positions.
    def sel(self):
        selPos = []
        selection = self.var.get()
        if selection == 0:
            self.R2e.config(state = 'disabled')
            self.R3wf.waferOff()
            selPos = list(range(1, 343))
        elif selection == 1:
            self.R2e.config(state = 'normal')
            self.R3wf.waferOff()
            selPos = self.rangeParse(self.R2e.get())
        elif selection ==2:
            self.R2e.config(state = 'disabled')
            self.R3wf.waferOn()
            # return 'waferOn'
            selPos = self.getpressedButtons()
        # print(selPos)
        return selPos


# '3-4, 5, 8' = [3, 5, 8]
    def rangeParse(self, s):
        if len(s) == 0:
            return []

        pos = []
        for r in s.replace(' ', '').split(','):
            if '-' in r:
                ind = r.split('-')
                pos.extend(list(range(int(ind[0]), int(ind[1]) + 1)))
            else:
                pos.append(int(r))
        return np.unique(pos)

    #get pressed button positions
    def getpressedButtons(self):
        return self.R3wf.wf.getpressedButtonPos()





