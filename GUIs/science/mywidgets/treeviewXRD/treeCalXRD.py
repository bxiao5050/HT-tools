# import sys
# path = 'C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\final'
# sys.path.append(path)
# path = 'C:\\Users\\Yu\\Dropbox\\PythonProgram\\tkinker\\final\\mywidgets\\treeviewXRD'
# sys.path.append(path)

from tkinter import *
from tkinter import ttk
import os


import sys



from usefulModules import choosefiles
import mywidgets.treeviewXRD.xrdSimulation
import threading
import time

class MyTreeview(LabelFrame):
    def __init__(self, master, **kw):
        LabelFrame.__init__(self, master, **kw)
        ttk.Style().theme_use('clam')


        #two frames
        self.bframe = Frame(self)# frame for top bottons
        self.tvframe = Frame(self)# frame for treeview
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
        self.addButton.grid(row = 0, column = 1)
        self.deleteButton.grid(row = 0, column = 6)


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

        #self.filePath = Label(self.tvframe, text = '')# file path
        #self.filePath.pack(side = 'bottom', fill = X)

        xbar.pack(side = 'bottom', fill = 'x')
        ybar.pack(side = 'right', fill = 'y', expand = True)
        self.tv.pack(side = 'left', fill ='both', expand = True)

        self.bRevomeTags.pack(side = 'bottom', fill = 'x')



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
class TheoreticalTreeview(MyTreeview):
    def __init__(self, master, canvas, **kw):
        MyTreeview.__init__(self, master, **kw)
        self.directoryname = None
        self.paths = None


        self.percentage = {'itemYellow': 0.6,'itemRed': 1,'itemBlue': 0.3,'itemWhite': 0}
        #add percentage information to the colored buttons
        self.bb.config(text = '0.3', width = 3,  foreground = 'white')
        self.by.config(text = '0.6', width = 3)
        self.br.config(text = '1.0', width = 3,  foreground = 'white')
        self.bw.config(text = '0', width = 3)

        # set commands for read, add files ...
        self.set_treeview_click(self.on_treeview_click)
        self.set_addfiles(self.on_addfiles)
        self.set_readfiles(self.on_readfiles)
        self.set_deletefiles(self.on_deletefiles)

        #self.cal_patterns = []# keep calculated patterns

        self.fileAndPattern = {} # key: filename, value: diffraction pattern
        self.canvasPanel = canvas #get the canvas GUI handle

        #add percentage column to treeview
        self.tv.config(columns = ('%'))
        self.tv.column('%', width = 20, anchor = 'n')
        self.tv.heading('%', text = '%')

        self.tv.column('#0', width = 200)
        self.tv.bind('<Double-Button-1>', self.on_doubleClick)

        # #populate the treeview
        # for i in range(50):
        #     self.tv.insert('', 'end', i, text = f'item jjjjjjjjjjjgjhghgkgkjghkjgjkhgjkjkkkkkkkkkkkkkkkkkkkkkjjjjjjjjjjjjjjjjjjjjjjjjjjj {i}')
        #     self.tv.set(i, '%', 0)
    def on_doubleClick(self, e):
        s = self.tv.selection()[0] + '.cif'
        path = os.path.join(self.directoryname, s)
        # with open(os.path.normpath(path), "r") as f:
        top = Toplevel()
        top.title(self.tv.selection()[0])
        filename = os.path.normpath(path)

        S = Scrollbar(top)
        T = Text(top, height=50, width=120)
        S.pack(side= 'right', fill= 'y')
        T.pack(side= 'left', fill='y')
        S.config(command=T.yview)
        T.config(yscrollcommand=S.set)
        T.insert('end', open(filename,'r').read())



    #override
    def removeTags(self):
        for item in self.tv.get_children():
            if self.tv.item(item)['tags'] is not None:
                self.tv.item(item, tags = ())
                self.tv.set(item, '%', 0)

    #override colored buttons
    def treeviewColorTags(self, button_id):
        for item in self.tv.selection():
            #remove if 'white' is select
            self.tv.set(item, '%', self.percentage[button_id])
            if button_id == 'itemWhite':
                self.tv.item(item, tags = ())
            else:
                self.tv.item(item, tags = (button_id))

    #read files + parse cifs
    def on_readfiles(self):
        #1. get file names
        paths = choosefiles.Openf(self).getFilePaths()
        if paths is not None:
            self.resetAll()
            self.cifToXRD(paths)


    #add files
    def on_addfiles(self):
        #1. get file names
        paths = choosefiles.Openf(self).getFilePaths() # get cif files
        self.cifToXRD(paths)

    #parse cifs
    def cifToXRD(self, paths):
        self.paths = paths
        threading.Thread(target=self.plotter).start()

    def plotter(self):
        top = Toplevel()
        top.title('import cif files...')
        textArea = Text(top, wrap="word", height=20, width=80) # show other information
        scrolly = Scrollbar(top)
        scrolly.config(command=textArea.yview)
        textArea.config(yscrollcommand=scrolly.set)
        scrolly.pack(side=RIGHT, fill=Y)
        textArea.pack(side = 'left', fill = 'both', expand = True)

        import_succeed_N = 0
        import_failed_N = 0


        for path in self.paths:
            basename = os.path.basename(path)
            self.directoryname = os.path.dirname(path)
            filename = os.path.splitext(basename)[0]
            textArea.insert('end', filename + '\n')
            textArea.see('end')
            time.sleep(0.02)
            if filename not in self.fileAndPattern:
                try:
                    pattern = mywidgets.treeviewXRD.xrdSimulation.Cal_XRD().calXRD(path)
                    import_succeed_N += 1
                except Exception as e:
                    textArea.insert('end', sys.exc_info())
                    import_failed_N += 1
                    continue
                self.fileAndPattern[filename] = pattern # add cif file name and corresponding XRD
                #.insert files
                self.insertItem(filename)
            else:
                choosefiles.OtherModule().Mbox('Add Error', f'{filename}.cif already imported!')
        textArea.insert('end', '\n'+ f'succeed files: {import_succeed_N},  falied files: {import_failed_N}' + '\n\n')
        textArea.see('end')


    def on_deletefiles(self):
        #1.delete selection
        for item in self.tv.selection():
            filename = self.tv.item(item)['text']
            self.tv.delete(item)
            self.fileAndPattern.pop(filename, None)
            #2. delete plot
            self.canvasPanel.deletePlot(filename)


    #when the items in treeview are selected
    def on_treeview_click(self, e):
        #1. get selected items

        selItem = [self.tv.item(se)['text'] for se in self.tv.selection() ]
        #2. remove not selected XRD
        fileAndLines = dict(self.canvasPanel.filenameAndV_lines)
        for filename in fileAndLines:
            if filename not in selItem:
                self.canvasPanel.deletePlot(filename)
        #3. show XRD when the items are selected
        for seI in self.tv.selection():
            filename = self.tv.item(seI)['text']
            if filename not in fileAndLines:
                pattern = self.fileAndPattern.get(filename)
                self.canvasPanel.plotLine(pattern, filename)


    # diaglog to select a file, return the full file path
    def diaglogFileSelect(self, master):
        filez = askopenfilenames(parent = master)
        return master.tk.splitlist(filez)

    #reset
    def resetAll(self):
        self.treeview_deleteAll()
        self.fileAndPattern.clear()
        self.canvasPanel.deleteAllPlot()

    #insert new item to treeview
    def insertItem(self, filename, status = 0):
        item = filename
        self.tv.insert('', 'end', item, text = item)
        self.tv.set(item, '%', status)

    def getFileAndPatterns(self):
        return self.fileAndPattern







"""
Treeview with all the buttons being set, which deals with theoretical data import
"""
class CalTree(TheoreticalTreeview):
    def __init__(self, master, canvas, **kw):
        TheoreticalTreeview.__init__(self, master, canvas, **kw)




    #get the percentage column for given item/filename
    def getItemPercentage(self, filename):
        return self.tv.item(filename)['values'][0]


    def getTVTagedItemFilenames(self):
        return [filename for filename in self.tv.get_children() if self.getItemPercentage(filename) != 0]





