from tkinter import *
from tkinter import ttk



class MyTreeview(ttk.LabelFrame):
    def __init__(self, master, **kw):
        ttk.LabelFrame.__init__(self, master, **kw)


        #two frames
        self.bframe = ttk.Frame(self)# frame for top bottons
        self.tvframe = ttk.Frame(self)# frame for treeview
        self.bframe.pack(fill = 'both', expand =True)
        self.tvframe.pack( fill = 'both', expand =True)


        #buttons
        self.readButton = Button(self.bframe, text = 'read')
        self.addButton = Button(self.bframe, text = 'add ')
        #color buttons to change the color of selected items
        self.by = Button(self.bframe, text = '  ', bg = 'yellow', width = 3, command = lambda: self.treeviewColorTags('itemYellow'))
        self.br = Button(self.bframe, text = '  ', bg = 'plum3',  width = 3, command = lambda: self.treeviewColorTags('itemRed'))
        self.bb = Button(self.bframe, text = '  ', bg = 'green',  width = 3, command = lambda: self.treeviewColorTags('itemBlue'))
        self.bw = Button(self.bframe, text = '  ', bg = 'white', width = 3, command = lambda: self.treeviewColorTags('itemWhite'))

        self.bb.grid(row = 0, column = 2)
        self.by.grid(row = 0, column = 3)
        self.br.grid(row = 0, column = 4)
        self.bw.grid(row = 0, column = 5)



        self.deleteButton = Button(self.bframe, text = 'delete data', foreground = 'red')

        self.readButton.grid(row = 0, column = 0)
        # self.addButton.grid(row = 0, column = 1)
        # self.deleteButton.grid(row = 0, column = 6)


        #1.treeview
        self.tv = ttk.Treeview(self.tvframe, height = 22)

        #remove all the tags
        self.bRevomeTags = Button(self, text = 'Remove all tags', command = self.removeTags)

        #1.1set the item colors

        self.tv.tag_configure('itemRed', background = 'plum3', foreground = 'white')
        self.tv.tag_configure('itemYellow', background = 'yellow', foreground = 'black')
        self.tv.tag_configure('itemBlue', background = 'green', foreground = 'white')
        #self.tv.tag_configure('itemWhite', foreground = 'yellow')


        #scrolbar for treeview
        xbar = ttk.Scrollbar(self.tvframe, orient = 'horizontal', command = self.tv.xview)
        ybar = ttk.Scrollbar(self.tvframe, orient = 'vertical', command = self.tv.yview)
        self.tv.configure(xscroll = xbar.set, yscroll = ybar.set)

        #self.filePath = ttk.Label(self.tvframe, text = '')# file path
        #self.filePath.pack(side = 'bottom', fill = X)

        xbar.pack(side = 'bottom', fill = 'x')
        ybar.pack(side = 'right', fill = 'y', expand = True)
        self.tv.pack(side = 'left', fill ='both', expand = True)

        # self.bRevomeTags.pack(side = 'bottom', fill = 'x')



    def removeTags(self):
        for item in self.tv.get_children():
            print(self.tv.item(item)['tags'])
            if self.tv.item(item)['tags'] is not None:
                self.tv.item(item, tags = ())



    #bind to event
    def set_treeview_click(self, fn):
        self.tv.bind('<<TreeviewSelect>>', fn)

    # set button commands for inheritance
    def set_readfiles(self, fn):
        self.readButton.config(command = fn)

    def set_addfiles(self, fn):
        self.addButton.config(command = fn)

    def set_deletefiles(self, fn):
        self.deleteButton.config(command = fn)

    def setLabelPath(self, s):
        self.filePath.config(text = s)

        #delete all the items
    def treeview_deleteAll(self):
        self.tv.delete(*self.tv.get_children())

    def treeviewColorTags(self, button_id):
        for item in self.tv.selection():
            #remove if 'white' is select
            if button_id == 'itemWhite':
                self.tv.item(item, tags = ())
            else:
                self.tv.item(item, tags = (button_id))

    #disselcet all
    def treeview_deselectAll(self):
        if len(self.tv.selection()) > 0:
            self.tv.selection_remove(self.tv.selection())









