from tkinter import *
from tkinter.scrolledtext import ScrolledText


import pandas as pd

# from automation import Automation

class GUIi(Frame):
    def __init__(self, master):
        super().__init__(master)

        lf1 = LabelFrame(self, text = 'folder path')
        lf2 = LabelFrame(self, text = 'time for each convert (s)')
        self.countL1 = Label(self,font=("Times New Roman", 18, 'bold'), width = 50)
        self.countL2 = Label(self,font=("Times New Roman", 10, 'bold'), width = 105)
        self.countL3 = Label(self,font=("Times New Roman", 13, 'bold'))
        lf3 = LabelFrame(self, text = 'log')
        self.startB = Button(self, text = 'start', fg = 'blue')
        self.startB.grid(row = 0, column = 0, padx = (5,5))

        lf1.grid(row = 0, column = 1, padx = (5,5))
        lf2.grid(row = 0, column = 2, padx = (5,5))
        self.countL1.grid(row = 1, column = 0,  columnspan =3, pady = (5,5))
        self.countL2.grid(row = 2, column = 0,  columnspan =3, pady = (5,5))
        self.countL3.grid(row = 3, column = 0,  columnspan =3, pady = (5,5))
        lf3.grid(row = 4, column = 0, columnspan =3, pady = (20,5))
        Label(self, text = 'put diffrac.eva software on the 1st position of Taskbar, then press "start"', fg = 'red').grid(row = 5, column = 0, columnspan =3)
        self.stopB = Button(self, text = 'STOP' +'\n'+ 'or press <Esc>', width = 80, height = 5, bg = 'lightgray')
        self.stopB.grid(row = 6, column = 0, columnspan = 3, pady = (5,5))

        self.folderPath = Entry(lf1, width = 85)
        self.folderPath.pack()

        self.pauseTime = Entry(lf2, width = 6)
        self.pauseTime.insert(0, '3')
        self.pauseTime.pack()

        self.log = ScrolledText(lf3, height = 20, width = 120, font=("Times New Roman", 9))
        self.log.pack()

        master.bind("<F5>", self.on_start)


    def on_start(self, e):
        return
        print('df')














def main():
    root = Tk()
    root.title('convert 2D XRD to 1D pattern')
    app = GUI(root)
    app.pack()

    root.mainloop()



if __name__ == '__main__':
    main()
