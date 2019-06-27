from tkinter import *

from periodicTable import PeriodicTable

class MyPeriodic(PeriodicTable):

    def __init__(self, master, ele_name = None):
        super().__init__(master)
        self.ele_name = ele_name
        self.master = master

        frame = Frame(self)
        frame.grid(row = 13, column = 0, columnspan = 18, padx = (10, 10), pady = (30, 10))

        self.entry = Entry(frame, width = 25)
        self.entry.focus()
        button1 = Button(frame, text = 'OK', fg = 'red', command = self.on_OK)
        button2 = Button(frame, text = 'reset', fg = 'white', bg = 'black', command = self.on_reset)

        self.entry.grid(row = 0, column = 0, padx = (5,5))
        button1.grid(row = 0, column = 1, padx = (5,5))
        button2.grid(row = 0, column = 2, padx = (5,5))

    def on_OK(self):
        text = self.entry.get()
        if text is not None:
            self.ele_name.delete(0, 'end')
        self.ele_name.insert(0, text)
        self.ele_name.focus()
        self.master.destroy()

    def on_reset(self):
        self.entry.delete(0, 'end')

    def on_eleName(self, text):
        self.entry.insert('end', text)

def main():
    root = Tk()

    app = MyPeriodic(root)
    app.pack()
    root.mainloop()


if __name__ == '__main__':
    main()
