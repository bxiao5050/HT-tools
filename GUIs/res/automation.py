from tkinter import *
from scipy.signal import chirp, find_peaks, peak_widths
from tkinter.filedialog import  asksaveasfilename

import numpy as np
import pandas as pd
import threading
import time
import os

from resistance import InputData
from sWafer2k import SWafer

class Automation(Frame):
    def __init__(self, master, pAData = None, sommth_p = None, fit_p = None, index_range = None):
        super().__init__(master)
        self.pAData = pAData
        self.sommth_p = sommth_p #smooth
        self.fit_p = fit_p #fit



        self.index_range = index_range

        self.pARes = pd.DataFrame(columns = ['pos', 'R_min', 'R_max', 'delta_R', 'Tc', 'FWHM'])

        self.wafer = SWafer(self)
        scrollbar = Scrollbar(self)
        self.res = Text(self, height = 30, width = 90)

        scrollbar.pack(side = 'right', fill = 'y')
        self.wafer.pack(side = 'left', fill = 'y')
        self.res.pack()
        Button(self, text = 'export result', command = self.export).pack()

        scrollbar.config(command = self.res.yview)
        self.res.config(yscrollcommand = scrollbar.set)

    def export(self):
        path = asksaveasfilename(initialdir = "/",title = "Select file",filetypes = (("csv files","*.csv"),("all files","*.*")))

        self.pARes.to_csv(path + '.csv', index = False)
        messagebox.showinfo("Export to multiple .xy files", "finished!")


    def set_section(self, section):
        self.section = section

    def set_pos_range(self, pos_range):
        self.pos_range = pos_range

    def auto(self):
        threading.Thread(target = self.run_auto).start()

    # def on_enter(self, e):
    #     print('sd')

    def run_auto(self):
        # for pos, data in self.pAData.items():
        for pos in self.pos_range:
            if pos in self.pAData.keys():
                data = self.pAData.get(pos)
                #1.original
                rightP = InputData(self, data.iloc[:, 0].to_numpy(), data.iloc[:, 1].to_numpy())
                [x00, y00] = rightP.line[self.section]
                x0, indices = np.unique(x00, return_index = True) #get unique
                y0 = y00[indices]
                #2.log
                log_y0 = np.log10(y0)
                #3. smooth
                self.sommth_p.on_OK(x0, log_y0)
                smooth_y0 = self.sommth_p.get_smoothed()
                #4. derivation
                smooth_deriv = np.gradient(smooth_y0, x0)
                #5. curve fitting
                try:
                    y = smooth_deriv[self.index_range]
                    x = x0[self.index_range]
                except IndexError:
                    y = smooth_deriv
                    x = x0
                try:
                    self.fit_p.set_inputXY(x, y)
                    curveFitting = self.fit_p.get_fitting()
                    self.fwhm_gaussian = self.fit_p.fwhm_gaussian if self.fit_p.fit == 'Gaussian fit' else None
                    #6. fitting
                    yy = -curveFitting
                    peaks, _ = find_peaks(yy)
                    peak = np.where(y == min(y[peaks]))[0]
                    results_half = peak_widths(yy, peak, rel_height=0.5)

                    left = x[int(results_half[2])]
                    right = x[int(results_half[3])]
                except:
                    pass

                #results:
                R_min, R_max = np.round(min(y0),3), np.round(max(y0),3)
                delta_R = np.round(R_max/R_min, 3)
                Tc = x[peak][0]
                FWHM = self.fwhm_gaussian if self.fit_p.fit == 'Gaussian fit' else round(np.absolute(right - left), 2)

                self.pARes.loc[pos] = [pos, R_min, R_max, delta_R, Tc, FWHM]
                self.wafer.pAB.get(pos).config(bg = 'red', relief = 'sunken', state = 'disabled')
                #self.wafer.pAB.get(pos).mouse_enter(self.on_enter)



                # print(f'pos: {pos}, R_min: {R_min}, R_max: {R_max}, delta_R: {delta_R}, Tc: {Tc}, FWHM: {FWHM}' )
                text = f'pos: {pos }, R_min: { R_min }, R_max: { R_max }, delta_R: {  delta_R  }, Tc: { Tc }, FWHM: { FWHM }'  + '\n'

                self.res.insert('end', text)
                time.sleep(0.05)


