import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk


from mywidgets.figurePanel import plotFig
from mywidgets.treeviewXRD import treeCalXRD
from mywidgets.treeviewDataExp import treeviewExp
from mywidgets.wafer import wafer_visual
import pandas as pd

from tkinter import *
from tkinter import ttk

class MainGUIGeometry():
    '''
    the GUI panel with 4 sub panels in grid geometry
    '''
    def __init__(self, master):

        contant = Frame(master)
        contant.pack(fill = 'both', expand = True)

        #layout
        list1 = Frame(contant, width = 200, height = 600)
        self.canvasP = Frame(contant, width = 1000, height = 600) # Bframe on the left and container on the right
        list2 = Frame(contant, width = 300, height = 600)
        frame = Frame(contant, width = 1300, height = 200)


        #st the canvas panel
        self.multiPage()

        #GUI widegts
        self.waferPanel = wafer_visual.WaferPanel(frame)
        self.dataExpPanel = treeviewExp.TvDataExp(list1)
        self.dataCalPanel = treeCalXRD.CalTree(list2, self.pCanvas)

        self.fB = Frame(frame)#frame to contain export buttons...
        # self.BExpPatterns = Button(self.fB, text = 'Export all Patterns', width = 12)
        self.BExpCSV = Button(self.fB, text = 'Export results', width = 12)
        self.BExpPiechart = Button(self.fB, text = 'Export Piechart', width = 12)
        self.BAuto = Button(self.fB, text = 'Auto Match', width = 12, foreground = 'red')

        self.resultSaveB()

        self.dataExpPanel.config(text = 'Experimental XRD')
        self.dataCalPanel.config(text = 'Rererence XRD')

        self.dataExpPanel.pack()
        self.dataCalPanel.pack()
        self.waferPanel.pack(side = 'left', fill = 'both', expand = 1)
        self.fB.pack(padx = (5,5))
        # frame.columnconfigure(0, weight = 3)
        # frame.rowconfigure(0, weight = 3)

        list1 .grid(row = 0, column = 0, rowspan = 2, sticky = ('n', 'w'))
        self.canvasP.grid(row = 0, column = 1, sticky = ('n', 'w', 'e', 's'))
        list2 .grid(row = 0, column = 2, sticky = ('n', 'e'))
        frame .grid(row = 1, column = 1, columnspan = 2, padx = (20, 0), pady = (10, 10), sticky = ('w', 's', 'e', 'n'))

        contant.columnconfigure(1, weight = 3)
        contant.rowconfigure(0, weight = 3)


    def multiPage(self):
        BFrame = Frame(self.canvasP)
        self.BNormal = Button(BFrame, text = '2D', width = 4, relief = 'sunken')
        self.BWaterfall = Button(BFrame, text = '3D', width = 4, relief = 'raised')
        self.BNormal.config( command=lambda b = self.BNormal: self.show_frame(b))
        self.BWaterfall.config(command=lambda b = self.BWaterfall : self.show_frame(b))

        BFrame.pack(side="left")
        BFrame.grid_rowconfigure(0, weight=1)
        BFrame.grid_columnconfigure(0, weight=1)

       # buttons in Bpanel
        self.BNormal.grid(row = 0, column = 0, pady = (5,5), padx = (2, 2), sticky = 'nw')
        self.BWaterfall.grid(row = 2, column = 0, pady = (5,5), padx = (2, 2), sticky = 'nw')
        #container panel
        container = Frame(self.canvasP)
        container.pack(side="right", fill="both", expand = True)
        container.grid_rowconfigure(0, weight=3)
        container.grid_columnconfigure(0, weight=3)

        #multiple pages
        self.pCanvas = plotFig.PlotCanvas(container)
        self.canvas_norml = self.pCanvas.pageLine
        self.canvas_threeD = self.pCanvas.pageThreeD


        self.canvas_norml.grid(row = 0, column = 0, sticky = 'nsew')
        self.canvas_threeD.grid(row = 0, column = 0, sticky = 'nsew')

        # self.show_frame(self.BNormal)
        self.canvas_norml.tkraise()

    def resultSaveB(self):
        # self.BExpPatterns.grid(row = 0, column = 0, pady = (20, 5), sticky = 'n')
        self.BExpCSV.grid(row = 0, column = 0, pady = (5, 5), sticky = 'n')
        self.BExpPiechart.grid(row = 1, column = 0, pady = (5, 5), sticky = 'n')
        self.BAuto.grid(row = 2, column = 0, pady = (5, 5), sticky = 'n')


    def show_frame(self, b):
        cont = b.cget('text')
        if cont == '2D' and b.cget('relief') == 'raised':
            self.canvas_norml.tkraise()
            self.BWaterfall.config(relief = 'raised')
        elif cont == '3D' and b.cget('relief') == 'raised':
            self.canvas_threeD.tkraise()
            self.BNormal.config(relief = 'raised')

        b.config(relief = 'sunken')



class MainGUIWidgets(MainGUIGeometry):
    """set variables for all the widgets
    """
    def __init__(self, master):
        MainGUIGeometry.__init__(self, master)
        self.expData = pd.DataFrame() # exp data

        """record pahse identification information
        data format: phaseComData = {pos: [s1, s2]}
           s1: dict with dataformat s1 = {filename: percentage} record the identified pahse names
           s2: status information, such as match, not match....
           filename corresponds to the calculated V line
           percentage is the correspond tag
        """
        self.phaseComData = {}

        #override exp data read
        self.dataExpPanel.set_readfiles(self.on_readEXPfiles)

        #override wafer button press commands
        for  k, b in self.waferPanel.wafer.pAB.items():
            b.configure(command = lambda k = k : self.on_buttonPress(k))
            b.configure(relief = 'ridge', state = 'disable')

        #override colored buttons
        for k in range(5):
            self.waferPanel.colorButtons[k].config(command = lambda k = k: self.on_changeButtonColor(k))


    #override button press command
    def on_buttonPress(self, pos):
        b = self.waferPanel.wafer.pAB[pos]
        b.oneOrTwoclick()
        #plot
        if b.cget('relief') == 'sunken':
            x = self.expData.iloc[:,0]

            y = self.dataExpPanel.normalization(self.expData.iloc[:, pos])
            self.pCanvas.plotExpLine(x.tolist(), y.tolist(), pos)
            #button has the same color as its line
            b.setBColor(self.pCanvas.getLineColor(pos))
            b.config(bg = b.getBColor())
        elif b.cget('relief') == 'raised' and pos in self.pCanvas.posAndexpLine:
            self.pCanvas.deleteExpLine(pos)
            b.setBColor(b.getDefaultColor())
            b.config(bg = b.getDefaultColor())

        #write pressed button information to information panel
        self.getWaferButtonstatus()

    #override mouse leave
    def on_leave(self, e):
        self.config(bg =  self.defaultBackground)


    def on_readEXPfiles(self):
        #get all the exp data
        self.expData = self.dataExpPanel.readfiles()
        #popular the wafer buttons
        if self.expData is not None:
            x = self.expData.iloc[:, 0]
            xlim1, xlim2 = [min(x), max(x)]
            self.pCanvas.setXlim(xlim1, xlim2)
            self.pCanvas.useCursor()# cross cursor
            self.pCanvas.canvas_line.draw()
            for i in range(len(self.expData.columns) -1):
                pos = i + 1
                self.waferPanel.wafer.pAB[pos].config(state = 'normal', relief = 'raised')

    ## record cal XRD
    def on_changeButtonColor(self, chose_id):
        #1. #record or clear phase identification results
        idPhases = self.dataCalPanel.getTVTagedItemFilenames() # the cal XRD wich are taged
        pressedB = self.waferPanel.wafer.getpressedB() # all the buttons which are pressed

        #check if any pressed button has status information
        flag = False
        for bb in pressedB.keys():
            if bb in self.phaseComData.keys():
                flag = True

        if chose_id == 4 and flag:
            msg = messagebox.askquestion(title = None, message = 'Some positions have information. Sure to erase?')
            if msg == 'no':
                return

        self.pCanvas.resetOffsetValue() # reset offset value

        for pos, b in pressedB.items():
            if chose_id !=4:
                s1 = {} #s1 = {vlinename: percentage}, s1 is the value element for phaseComData = {pos: [s1, s2]}
                for filename in idPhases:
                    s1[filename] = self.dataCalPanel.getItemPercentage(filename)
                bStatus = self.pressedBstatus(chose_id)
                s = [s1, bStatus]
                self.phaseComData[pos] = s
            if chose_id == 4 and self.phaseComData.get(pos) is not None:
                self.phaseComData.pop(pos, None)
            #2. remove all the exp lines from canvas
            self.pCanvas.deleteExpLine(pos)
            #2.1 reset button color
            b.setBColor(b.getDefaultColor())
            b.config(bg = b.getDefaultColor())
        #3. change wafer button to the according color and araise them
        self.waferPanel.changeBcolor(chose_id)
        self.waferPanel.textArea.delete('1.0', 'end')# remove old information
        # 4. refresh log
        self.waferPanel.log.delete('1.0', 'end')# remove old information
        log = ''
        for pos, s in self.phaseComData.items():
            s1 = s[0]
            bStatus = s[1]
            calPhases = [f'{filename}[{percentage}]' for filename, percentage in s1.items()]
            log = f'''{log}- {pos}({bStatus}):''' + ' + '.join(calPhases) + '\n'
        self.waferPanel.log.insert('end', log)
        self.waferPanel.log.see('end')
        self.dataCalPanel.removeTags()

    def getWaferButtonstatus(self):
        self.waferPanel.textArea.delete('1.0', 'end')# remove old information
        text = ''
        for pos, b in self.waferPanel.wafer.getpressedB().items():
            if self.phaseComData.get(pos) is None:
                text =  text + '- ' + str(pos) + ': ' + '\n'
            else:
                s1, bstatus = self.phaseComData.get(pos)
                calPhases = [f'{filename}[{percentage}]' for filename, percentage in s1.items()]
                # text = text + str(pos) + b.cget('image') + ': ' + ' + '.join(calPhases) + '\n'
                #bStatus = self.pressedBstatus(b.cget('image'))
                text = f'''{text}- {pos}({bstatus}):''' + ' + '.join(calPhases) + '\n'
        self.waferPanel.textArea.insert('end', text)
        self.waferPanel.textArea.see('end')


    def pressedBstatus(self, key):
        situation = {0: 'Match', 1: 'Doubt',2: 'Difficult' ,3: 'Not match'}
        return situation.get(key)

    def getPhaseIdentificationResult(self):
        return self.phaseComData

    #all of the exp data
    def getExpData(self):
        return self.expData








