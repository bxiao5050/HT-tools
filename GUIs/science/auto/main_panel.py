
import matplotlib
matplotlib.use("TkAgg")
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

from tkinter import filedialog
from mywidgets.figurePanel import plotFig
from mywidgets.treeviewXRD import treeCalXRD
from mywidgets.treeviewDataExp import treeviewExp
from mywidgets.wafer import wafer_visual
from main_GUI import MainGUIWidgets

from auto.showResult import ShowResult

from matplotlib import colors
from tkinter import *
from tkinter import ttk
import pandas as pd



class MainResult(MainGUIWidgets):
    '''
    save result, export resultB as pie chart...
    '''
    def __init__(self, master):
        MainGUIWidgets.__init__(self, master)
        self.master = master

        self.matrix = pd.DataFrame()

        # self.BExpPatterns.config(command = self.on_BExpPatterns)
        self.BExpCSV.config(command = self.on_BExpCSV)
        self.BExpPiechart.config(command = self.on_BExpPiechart)


    #put result data in Dataframe: matrix
    def getMatrix(self):
        phaseNames = {}# record the phases wihich are choosen
        #1. get the phases that have been choosen
        for s in self.getPhaseIdentificationResult().values():
            for phase in s[0].keys():
                phaseNames[phase] = 0


        self.colName = list(phaseNames.keys())
        self.colName.insert(0, 'pos')
        self.colName.insert(1, 'status')

        rowlist = []
        for pos, s in self.getPhaseIdentificationResult().items():
            row = {}
            row['pos'] = pos
            row['status'] = s[1]
            phaseAndPercentage = phaseNames.copy()
            for phase, percentage in s[0].items():
                phaseAndPercentage[phase] = percentage
            row.update(phaseAndPercentage)
            rowlist.append(row)
        self.matrix = pd.DataFrame(rowlist)

        #a new window will appear
    def on_BExpPiechart(self):
        self.getMatrix()
        ShowResult(self.matrix, self.getPhaseIdentificationResult(), self.colName)


    # def on_BExpPatterns(self):
    #     pass

    #export result as matrix
    #only the phase which is choosed by at least once will be counted
    def on_BExpCSV(self):
        self.getMatrix()
        export_file_path = filedialog.asksaveasfilename(defaultextension='.csv')
        self.matrix.to_csv(export_file_path, index = None, header=True)


def main():

    root = Tk()
    root.title("XRD phase identification")
    MainResult(root)

    root.mainloop()

if __name__ == '__main__': main()




