from tkinter import *

import resistance
from p_cal_new import P_cal_new
from chooseRunRange import RunRange

from automation import Automation

class Auto_parameter_set(Frame):
    def __init__(self, master, x = None, y = None, title = None, section = None):
        super().__init__(master)

        if x is None:
            x, y = resistance.InputData(master).line[4]

        if title is None:
            title = 3


        self.pcal = P_cal_new(self, x = x, y = y)
        self.runRange = RunRange(self)
        heatCool = ChooseHeatingCooling(self)

        self.pcal.grid(row = 0, column = 0, rowspan = 30, padx = (5,5), pady = (5,5), sticky = 'nw')
        self.runRange.grid(row = 0, column = 1, padx = (5,5), pady = (5,5), sticky = 'nw')
        heatCool.grid(row = 1, column = 1, padx = (5,5), pady = (5,5), sticky = 'nw')
        Button(self, text = 'auto', fg = 'red', command = self.on_auto).grid(row = 2, column = 1, padx = (5,5), pady = (5,5), sticky = 'ne')

        self.pcal.config(text = title)
        if section is not None:
            self.section = section
            heatCool.e_heating.insert(0, section)
            heatCool.e_cooling.insert(0, section + 1)

    def on_auto(self):
        w = Toplevel()
        w.title('resistance automation')
        automat = Automation(w, pAData = self.pAData, sommth_p = self.pcal.sommth_p, fit_p = self.pcal.fit_p, index_range = self.pcal.index_range)
        automat.pack()
        automat.set_section(self.section - 1)
        automat.set_pos_range(self.runRange.sel()) #set positions
        automat.auto()

    def get_pAData(self, pAData):
        self.pAData = pAData


class ChooseHeatingCooling(LabelFrame):
    def __init__(self, master):
        super().__init__(master)

        self.config(text = 'assign "heating/cooling" for automation')

        Label(self, text = 'heating section:').grid(row = 0, column = 0, padx = (5,5), pady = (5,5), sticky = 'nw')
        self.e_heating = Entry(self)
        self.e_heating.grid(row = 0, column = 1, padx = (5,5), pady = (5,5), sticky = 'nw')

        Label(self, text = 'cooling section:').grid(row = 1, column = 0, padx = (5,5), pady = (5,5), sticky = 'nw')
        self.e_cooling = Entry(self)
        self.e_cooling.grid(row = 1, column = 1, padx = (5,5), pady = (5,5), sticky = 'nw')

