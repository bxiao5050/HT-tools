from tkinter import *
from tkinter import ttk


class MyTreeview(Frame):
    def __init__(self, master):
        super().__init__(master)
        self.treeview = ttk.Treeview(self)
        # attach a vertical scrollbar to the frame
        verbar = ttk.Scrollbar(self, orient='vertical')
        verbar.pack(side = 'right', fill = 'y')
        verbar.configure(command=self.treeview.yview)
        self.treeview.configure(yscrollcommand=verbar.set)
        self.treeview.pack(fill = 'both',expand= True)

        #button
        bf =Frame(self)
        bf.pack()

        Button(self, text = '    ', bg = 'lightgreen', command = self._on_mark).pack(side = 'left')
        Button(self, text = '    ', bg = 'white', command = self._on_unmark).pack(side = 'left')
        Button(self, text = 'clear all marks', command = self._on_clear).pack(side = 'left')
        ttk.Style().theme_use('clam')

    def _on_mark(self):
        for index in self.treeview.selection():
            text = self.treeview.item(index, 'tags')
            self.treeview.tag_configure(text, background = 'lightgreen')
    def _on_unmark(self):
        for index in self.treeview.selection():
            text = self.treeview.item(index, 'tags')
            self.treeview.tag_configure(text, background = 'white')
    def _on_clear(self):
        for index in self.treeview.get_children():
            text = self.treeview.item(index, 'tags')
            self.treeview.tag_configure(text, background = 'white')
def main():
    root = Tk()
    MyTreeview(root).pack()
    root.mainloop()

if __name__ == '__main__':
    main()
