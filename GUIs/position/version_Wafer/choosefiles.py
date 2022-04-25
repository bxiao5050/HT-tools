from tkinter import *
from tkinter.filedialog import askopenfilenames, askopenfilename
import ctypes

class Openf(Frame):
    def __init__(self,master, **kw):
        Frame.__init__(self, **kw)
        #self.withdraw() #hide the window
        self.filez = askopenfilenames(parent=master ,title='Choose a file', filetypes = (("dat files","*.dat"),("csv files","*.csv"),("all files","*.*")))

    def getFilePaths(self):
        return self.tk.splitlist(self.filez)
        # file_list = []
        # for file in self.filez:
        #     file_list.append(file)
        # return file_list




class OpenCSV(Frame):
    def __init__(self,master, **kw):
        Frame.__init__(self, **kw)
        #self.withdraw() #hide the window
        self.filez = askopenfilename(parent=master ,title='Choose a file', filetypes = (("txt files","*.txt"),("all files","*.*")))

    def getFilePath(self):
        s = []
        s.append(self.filez)
        return s
        # return self.tk.splitlist(self.filez)



class OtherModule():
    #massage box
    def Mbox(self, title = '', text = '', style = 0):
        return ctypes.windll.user32.MessageBoxW(0, text, title, style)








