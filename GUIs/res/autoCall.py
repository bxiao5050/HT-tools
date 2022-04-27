import pandas as pd
import numpy as np
from scipy import signal
import matplotlib.pyplot as plt
from matplotlib import cm, colors
from tkinter import *
from tkinter import ttk
from tkinter import filedialog
from tkinter import messagebox
import threading
import time
import pickle

import rangeDrago
from vertical_line_drag import LineDrag
from myPlott import MyPlot
from sWafer2o import SWafer2
from showStatuso import PhaseResultStatus
from showHisto import ShowHist
from showOverview11 import ShowOverview
from rangeSliderDemo import RangeSliderDemo

from result_342 import Result_342

#results
class AutoCal():
    def __init__(self, pAData, master, filename = ''):
        self.pAData = pAData #pos and row data
        self.filename = filename
        self.master = master
        self.w = Toplevel()
        self.w.protocol("WM_DELETE_WINDOW", self.on_closing)
        self.w.title('thickness calcation results')

        self.upImage = PhotoImage(file = 'GUIs/up.png')
        self.downImage = PhotoImage(file = 'GUIs/down.png')
        self.logo = PhotoImage(width = 10, height = 10)

        waferFrame = LabelFrame(self.w, text = 'wafer')#for wafer and others
        butonF = LabelFrame(self.w, text = 'save')
        self.plotF = Frame(self.w)#for canvas


        self.rangeSlider = RangeSliderDemo(waferFrame)
        self.wafer2 = SWafer2(waferFrame)
        Button(waferFrame, text = ' 3D ', command = self.on_show3D).grid(row = 0, column = 0, sticky = 'nw', pady=(12,0), padx=(10,0))
        Button(waferFrame, text = 'overview', command = self.on_showOverview).grid(row = 0, column = 1, sticky = 'nw', pady=(12,0))
        # Button(waferFrame, text = 'results', fg = 'red', command = self.on_show_results).grid(row = 0, column = 2, sticky = 'nw', pady=(12,0))
        com_l = LabelFrame(waferFrame, text = 'interpolate'+'\n'+ 'to 342 MAs', fg = 'blue')
        self.interp_com = ttk.Combobox(com_l, values = ['default', 'nearest'], width = '7')
        self.interp_com.bind('<<ComboboxSelected>>', self.on_show_results)
        self.interp_com.pack()

        self.mannuallyChange_LabelFrame = LabelFrame(waferFrame, text = 'set value')

        self.showHistF = ShowHist(waferFrame)

        self.mannuallyChange_LabelFrame.grid(row = 0, column = 2, sticky = 'nw')
        com_l.grid(row = 0, column = 3, sticky = 'nw')
        self.wafer2.grid(row = 1, column = 0, columnspan = 4, sticky = 'nw')
        self.rangeSlider.grid(row =2, column = 0,columnspan = 4, padx = (5,5), sticky = 'nw')
        self.showHistF.grid(row = 3, column = 0, columnspan = 4, padx = (5,5), sticky = 'nw')#plot histogram for results

        self.mannuallyV = StringVar()
        self.mannuallyChange_e = Entry(self.mannuallyChange_LabelFrame, textvariable = self.mannuallyV, font = "Verdana 10 bold")
        self.mannuallyChange_ok = Button(self.mannuallyChange_LabelFrame, text = 'set!', fg = 'red', underline = 0)

        self.mannuallyChange_e.pack(side = 'left')
        self.mannuallyChange_ok.pack(side = 'right', padx = (5,5))


        Button(butonF, text = 'save to .csv', command = self.on_saveToCSV).grid(row = 0, column = 0,padx = (5,5), sticky = 'n')
        Button(butonF, text = 'save as project', command = self.on_saveProject, bg = 'blue', fg = 'white').grid(row = 0, column = 1,padx = (5,5), sticky = 'n')



        # self.rangeSlider.grid(row =0, column = 0, sticky = 'nw')
        waferFrame.grid(row =0, column = 0, sticky = 'nw')
        butonF.grid(row =1, column = 0, sticky = 'n')
        self.plotF.grid(row =0, column = 1, rowspan =3, sticky = 'news')
        Frame(self.w).grid(row = 2, column = 0, sticky = 'news') #buffer frame

        Grid.rowconfigure(self.w, 0, weight = 1) # listbox
        Grid.rowconfigure(self.w, 2, weight = 20) # listbox
        # Grid.columnconfigure(self.w, 0, weight = 2) # canvas
        Grid.columnconfigure(self.w, 1, weight = 1) # canvas

        self.showResult2 = {}#prepare to plot result
        self.results_constrained = {}
        self.results = {} #pos and result

        self.first_click = True


    def on_show_results(self, e):
        w = Toplevel(self.w)
        w.title(f'extrapolated thickness results from "{self.interp_com.get()}" function')
        Result_342(w, value_340 = self.results_constrained, method = self.interp_com.get()).pack()
        # if len(self.results_constrained) == 340:
        #     w = Toplevel(self.w)
        #     w.title('extrapolated thickness results')
        #     Result_342(w, value_340 = self.results_constrained, method = self.interp_com.current()).pack()
        # else:
        #     messagebox.showinfo(message = 'need complete 320 data points')



    def on_closing(self):
        self.w.withdraw()
        self.master.destroy()


    def on_saveProject(self):
        drag_range = {}# save drag parameters
        line_drag = {} #save two baselines

        for pos, data in self.pAData.items():
            drag_range[pos] = self.showResult2.get(pos).get_all_range()
            line_drag[pos] = self.showResult2.get(pos).get_line_drag()
        range_and_boundary = self.rangeSlider.get_range_and_boundary()

        path = filedialog.asksaveasfilename(title = "Save project")

        with open(path + '.thickness', 'wb') as f:
            pickle.dump([self.pAData, self.results, self.results_constrained, range_and_boundary, drag_range, line_drag], f)
        messagebox.showinfo('save thickness project', 'thickness project saved!')


    def on_showOverview(self):
        w = Toplevel()
        w.title('overview of thickness')
        show = ShowOverview(w, self.showResult2, self.pAData)
        w.protocol('WM_DELETE_WINDOW', lambda w=w: show.on_closeAll(w))


    def on_show3D(self):
        w = Toplevel()
        w.title('3D view')
        PhaseResultStatus(w, self.results_constrained).pack(fill = 'both', expand = True)



    def assign_variables(self, pAData, results, results_constrained, range_and_boundary, drag_range, line_drag):
        self.pAData, self.results, self.results_constrained = pAData, results, results_constrained
        self.w.title(f'imported Thickness project: {self.filename}')
        for pos, data in self.pAData.items():
            x, y = data.iloc[:,0], data.iloc[:,1]
            self.showResult2[pos] = MyPlot(self.plotF)

            #set drag range
            ax_up = self.showResult2.get(pos).ax_up
            drag_h1 = rangeDrago.RangeDrag(self.showResult2.get(pos), ax = ax_up, startPos_left = drag_range.get(pos)[0], startPos_right = drag_range.get(pos)[1])
            drag_l = rangeDrago.RangeDrag(self.showResult2.get(pos), ax = ax_up, color = 'orange', startPos_left = drag_range.get(pos)[2], startPos_right = drag_range.get(pos)[3])
            drag_h2 = rangeDrago.RangeDrag(self.showResult2.get(pos), ax = ax_up, startPos_left = drag_range.get(pos)[4], startPos_right = drag_range.get(pos)[5])
            self.showResult2.get(pos).setParameters(drag_h1,drag_l,drag_h2)

            #set line drag
            ax_middle = self.showResult2.get(pos).ax_middle
            linedrag = LineDrag(self.showResult2.get(pos), color = 'red', ax = ax_middle, v1 = line_drag.get(pos)[1], v2 = line_drag.get(pos)[0])
            self.showResult2.get(pos).setParameters_line_drag(linedrag)

        #set command for wafer buttons
            # self.wafer2.getPAB().get(pos).config(bg = 'blue')
            self.wafer2.getPAB().get(pos).config(relief = 'raised', command = lambda  pos = pos: self.on_plotresult( pos))

            time.sleep(0.01)

        time.sleep(1)
        #colored buttons
        v = [res for res in self.results.values()]
        LowerBound, UpperBound, Lower, Upper = range_and_boundary
        try:
            self.rangeSlider.firstTime(LowerBound, UpperBound, Lower, Upper)
        except:
            time.sleep(2)
            self.rangeSlider.firstTime(LowerBound, UpperBound, Lower, Upper)


        self.wafer2.showLegend('', np.linspace(min(v), max(v), num =5).astype(int))
        for pos in self.pAData.keys():
            x = self.results.get(pos)
            self.wafer2.getPAB().get(pos).config(bg = self.colorChoose(v, x))
            self.wafer2.getPAB().get(pos).mouse_enter(lambda event, pos = pos: self.on_enter(event, pos))
        self.rangeSlider.rs.subscribe(self.slider_changeState)



    #cal thickness for all of the positions
    def on_auto(self, drag_h1,drag_l,drag_h2):
        for pos, data in self.pAData.items():
            x, y = data.iloc[:,0].to_numpy(), data.iloc[:,1].to_numpy()
            self.showResult2[pos] = MyPlot(self.plotF)
            self.showResult2.get(pos).setParameters(drag_h1,drag_l,drag_h2)

            # self.results[pos] = self.showResult2.get(pos).calThickness(x, y)['thickness']
            self.results[pos], y_flat, yHigh, yLow = [v for v in self.showResult2.get(pos).calThickness(x, y).values()]
            #set line drag
            ax_middle = self.showResult2.get(pos).ax_middle
            linedrag = LineDrag(self.showResult2.get(pos), color = 'red', ax = ax_middle, v1 = yHigh, v2 = yLow)
            self.showResult2.get(pos).setParameters_line_drag(linedrag)

            self.results_constrained[pos] = self.showResult2.get(pos).calThickness(x, y)['thickness']
        #set command for wafer buttons
            self.wafer2.getPAB().get(pos).config(bg = 'blue')
            self.wafer2.getPAB().get(pos).config(relief = 'raised', command = lambda  pos = pos: self.on_plotresult( pos))

            time.sleep(0.01)

        time.sleep(1)
        #colored buttons
        v = [res for res in self.results.values()]
        time.sleep(2)
        self.rangeSlider.firstTime(LowerBound=min(v),UpperBound=max(v))
        self.wafer2.showLegend('', np.linspace(min(v), max(v), num =5).astype(int))
        for pos in self.pAData.keys():
            x = self.results.get(pos)
            self.wafer2.getPAB().get(pos).config(bg = self.colorChoose(v, x))
            self.wafer2.getPAB().get(pos).mouse_enter(lambda event, pos = pos: self.on_enter(event, pos))
        #override
        self.rangeSlider.rs.subscribe(self.slider_changeState)
        # self.updateInformation() #update colormap


        #override
    def slider_changeState(self, e):
        # self.rangeSlider.set_changeState()
        self.updateInformation()



    def updateInformation(self):
        self.results_constrained = {}
        # add corlormap after calculation
        sliderValue =self.rangeSlider.get_range()
        v = np.array([res for res in self.results.values()])
        v_constrained = v[np.logical_and(v>=sliderValue[0],v<=sliderValue[1])]
        for pos in self.pAData.keys():
            x = self.results.get(pos)
            if x > sliderValue[1]:
                self.wafer2.getPAB().get(pos).config(image = self.upImage, bg = 'white')
            elif x < sliderValue[0]:
                self.wafer2.getPAB().get(pos).config(image = self.downImage, bg = 'white')
            else:
                self.wafer2.getPAB().get(pos).config(bg = self.colorChoose(v_constrained, x), image = self.logo)
        #legend
        try:
            self.wafer2.updateLegend('', np.linspace(min(v_constrained), max(v_constrained), num =5).astype(int))
        except:
            pass

       # update results
        for pos, value in self.results.items():
            if (value >= sliderValue[0] and value <= sliderValue[1]):
                self.results_constrained[pos] = value
        self.showHistF.update(self.results_constrained)

        try:
            self.updateMouse_enter(self.wafer2.getpressedButtonPos()[0])
        except: pass



    def on_saveToCSV(self):
        export_file_path = filedialog.asksaveasfilename(defaultextension='.csv')
        df = pd.Series(self.results_constrained).to_frame('thickness')
        df.to_csv(export_file_path, sep = ';')
        messagebox.showinfo( message ='file saved!')

    #override
    def on_enter(self,e, pos):
        self.updateMouse_enter(pos)

    def updateMouse_enter(self, pos):
        try:
            if self.first_click:
                self.updateInformation() #update colormap
                self.first_click = False

            sliderValue =self.rangeSlider.get_range()
            v = np.array([res for res in self.results.values()])
            if len(sliderValue) > 0:
                v_constrained = v[np.logical_and(v>=sliderValue[0],v<=sliderValue[1])]
            else:
                v_constrained =v

            low = min(v_constrained)
            high = max(v_constrained)
            low_pos = list(self.results_constrained.keys())[list(self.results_constrained.values()).index(low)]
            high_pos = list(self.results_constrained.keys())[list(self.results_constrained.values()).index(high)]
            text = f'pos: {pos}' + '\n' + f'thickness: {self.results.get(pos)}' + '\n\n' +\
                    f'total pos: {len(self.results)}; shown {len(self.results_constrained)}'+ '\n\n'+ \
                    f'min: {low} in pos {low_pos}' + '\n'+ \
                    f'max: {high} in pos {high_pos}'
            self.wafer2.lPos.configure(text= text, justify = 'left')
        except:
            pass

    #show result
    def on_plotresult(self, pos):
        self.wafer2.buttonPress(pos)
        #delete old one
        for widget in self.plotF.winfo_children():
            widget.pack_forget()

        self.showResult2.get(pos).pack(fill='both',expand=True)
        self.showResult2.get(pos).config(text = 'thickness result', fg = 'blue')
        # self.showResult2.get(pos).paraB.config(state = 'normal')
        self.showResult2.get(pos).OKB.config( command = lambda pos = pos: self.on_OK(pos))
        # x, y = self.pAData.get(pos).iloc[:,0], self.pAData.get(pos).iloc[:,1]
        self.showResult2.get(pos).canvasPlot(self.pAData.get(pos), pos)
        #show thickness value in mannually change panel
        self.mannuallyChange_LabelFrame.config(text = f'value for pos: {pos}', fg = 'red')
        self.mannuallyV.set(f'{self.results.get(pos)}')
        self.mannuallyChange_ok.config(command = lambda pos = pos: self.on_changeThickness(pos))
        #keybord shortcur fo value input
        self.w.bind('<Control-s>', lambda e, pos = pos:self.on_changeThickness_pre(pos))
        self.showHistF.update(self.results_constrained)

        #keybord shortcur
        self.w.bind('<Control-e>', lambda e, pos = pos:self.on_measure(pos))

        #release drag
        self.showResult2.get(pos).linedrag.rect1.figure.canvas.mpl_connect(
                'button_release_event', lambda event, pos = pos: self.on_release_(event, pos))

    def on_release_(self, event, pos):
        #1. copy thickness value to entry
        v= self.showResult2.get(pos).linedrag.getRangeV()
        thickness = np.round(abs(v[1] - v[0]),2)
        self.mannuallyV.set(f'{thickness}')
        #2. show corresponding value in histogram
        ax = self.showResult2.get(pos).ax_hist
        ymin, ymax = ax.get_ylim()
        ax.set_ylim(ymin, ymax) #fix y-axs
        for vline in ax.collections:
            vline.remove()

        ax.vlines(v, ymin, ymax, colors = 'red', linestyles = 'dotted')
        self.showResult2.get(pos).canvas.draw()



    #measure tool
    def on_measure(self, pos):
        self.showResult2.get(pos).on_measure()
        self.mannuallyV.set(f'{self.showResult2.get(pos).thickness_mannual}')
    #short cut for value input
    def on_changeThickness_pre(self, pos):
        threading.Thread(target= lambda pos = pos:self.on_changeThickness_pre_go(pos)).start()
        self.on_changeThickness(pos)

    def on_changeThickness_pre_go(self, pos):
        bg = self.mannuallyChange_ok.cget('bg')
        self.mannuallyChange_ok.config(relief = 'sunken', bg = 'orange')
        time.sleep(.1)
        self.mannuallyChange_ok.config(relief = 'raised', bg = bg)

    def on_changeThickness(self, pos):
        self.results[pos] = np.array(float(self.mannuallyV.get()))
        #update showing information
        self.updateInformation()
        v = np.array([res for res in self.results.values()])
        self.rangeSlider.set_boundary(LowerBound=min(v),UpperBound=max(v))




    #override
    def on_OK(self, pos):
        self.showResult2.get(pos).refresh_hist()
        self.showResult2.get(pos).updateAx_middle(True)
        #update result and legend

        thickness = self.showResult2.get(pos).getThickness()
        self.mannuallyV.set(f'{thickness}')
        #update showing information
        # self.mannuallyV.set(f'{self.results.get(pos)}')
        # self.updateInformation()
        # v = np.array([res for res in self.results.values()])
        # self.rangeSlider.set_boundary(LowerBound=min(v),UpperBound=max(v))
            #set line drag
        # ax_middle = self.showResult2.get(pos).ax_middle
        # linedrag = LineDrag(self.showResult2.get(pos), color = 'red', ax = ax_middle, v1 = line_drag.get(pos)[1], v2 = line_drag.get(pos)[0])
        # self.showResult2.get(pos).setParameters_line_drag(linedrag)




    def colorChoose(self, v, x):
        normalized = (v - min(v))/(max(v) - min(v))
        index = np.where(v == x)[0][0]
        return colors.rgb2hex(cm.jet(normalized[index]))
