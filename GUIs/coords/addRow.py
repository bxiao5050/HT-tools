from tkinter import *

from myPeriodic import MyPeriodic
class AddRow(Frame):
    def __init__(self, master):
        super().__init__(master)

        periodicB = Button(self, text = '*', fg = 'blue', command = self.on_periodic)
        self.ele_name = Entry(self, width = 25, fg = 'red', relief = 'flat')
        self.ele_per = Entry(self, width = 6)
        self.ele_R = Entry(self, width = 10)
        self.ele_V = Label(self, width = 10, text = '0', anchor = 'w', relief = 'sunken')
        self.ele_D = Label(self, width = 10, text = '0', anchor = 'w', relief = 'sunken')
        self.ele_W = Label(self, width = 10, text = '0', anchor = 'w', relief = 'sunken')

        self.ele_per.insert(0, '0')
        self.ele_R.insert(0, '0E+0')

        periodicB.grid(row = 0, column = 0, padx = (2,0), pady = (5,5))
        self.ele_name.grid(row = 0, column = 1, padx = (5, 15), pady = (5,5))
        self.ele_per.grid(row = 0, column = 2, padx = (15, 15), pady = (5,5))
        self.ele_R.grid(row = 0, column = 3, padx = (15, 15), pady = (5,5))
        self.ele_V.grid(row = 0, column = 4, padx = (15, 15), pady = (5,5))
        self.ele_D.grid(row = 0, column = 5, padx = (15, 15), pady = (5,5))
        self.ele_W.grid(row = 0, column = 6, padx = (15, 15), pady = (5,5))

    def on_periodic(self):
        ele = MyPeriodic(Toplevel(), self.ele_name)




def main():
    root = Tk()
    app = AddRow(root)
    app.pack()
    root.mainloop()


if __name__ == '__main__':
    main()

