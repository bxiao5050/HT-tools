from tkinter import *
from tkinter import ttk
from matplotlib.backends.backend_tkagg import (
                                    FigureCanvasTkAgg, NavigationToolbar2Tk)
from matplotlib.figure import Figure
import os
from GUIk.image.imageProcess import ImageProcess
from matplotlib.widgets import RectangleSelector
import numpy as np
import pandas as pd
import cv2

class Mannually(Toplevel):
    def __init__(self, master, image, img_name):
        super().__init__(master)
        self.img = image.copy()
        self.img_name = img_name
        self.title(img_name)
        b_f = Frame(self)
        b_f.pack()

        Label(b_f, text = '1. drag the mouse to select four corsses').pack(side = 'left', padx = (5,5))
        Button(b_f, text = '2. crop', command =self._on_crop).pack(side = 'left')
        self.imageList = ttk.Combobox(b_f, values = ['rectangle', 'only wafer', 'RGB figures'], state= 'disabled')
        self.imageList.pack(side = 'left', padx = (5,50))
        self.imageList.current(0)
        self.imageList.bind("<<ComboboxSelected>>", self._onselect)

        Button(b_f, text = '3. save RGB .csv', command =self._on_save).pack(side = 'left')
        #canvas
        fig = Figure(figsize=(5.5, 4))
        canvas_f = Frame(self)
        canvas_f.pack(side = 'bottom', fill = 'both', expand = True)
        self.canvas = FigureCanvasTkAgg(fig, master=canvas_f)
        self.ax = fig.add_subplot()
        self.ax.axis('off')
        fig.subplots_adjust(left=0.05, right=0.95, top=0.95, bottom=0.05)
        toolbar = NavigationToolbar2Tk(self.canvas, canvas_f)
        toolbar.update()
        self.canvas.get_tk_widget().pack(side=TOP, fill=BOTH, expand=1)

        self.ax.imshow(self.img)

        # drawtype is 'box' or 'line' or 'none'
        self.RS = RectangleSelector(self.ax, self.line_select_callback,
                                               drawtype='box', useblit=True,
                                               button=[1, 3],  # disable middle button
                                               minspanx=5, minspany=5,
                                               spancoords='pixels',
                                               interactive=True)
        #define wafer rectangle
    def line_select_callback(self,eclick, erelease):
        x1 = min(eclick.xdata, erelease.xdata)
        y1 = min(eclick.ydata, erelease.ydata)
        x2 = max(eclick.xdata, erelease.xdata)
        y2 = max(eclick.ydata, erelease.ydata)

        #rectangle coords
        self.rx1 = x1- 5000*abs(x2-x1)/90000
        self.rx2 = x2 + 5000*abs(x2-x1)/90000
        self.ry1 = y1 -5000*abs(y1-y2)/85500
        self.ry2 = y2 + 9500*abs(y1-y2)/85500

    def _onselect(self, event):
        self.ax.clear()
        self.ax.axis('off')

        if self.imageList.get() == 'rectangle':
            self.image = self.img_crop
        elif self.imageList.get() == 'only wafer':
            self.image = self.get_wafer()
        elif self.imageList.get() == 'RGB figures':
            self.image = self.get_RGBI()

            w,h = max(self.ax.get_xlim()), max(self.ax.get_ylim())
            pos = [[0,h/2,w/2*0.8,h/2*0.8],[w/2,h/2,w/2*0.8,h/2*0.8],[0,0,w/2*0.8,h/2*0.8],[w/2,0,w/2*0.8,h/2*0.8]]
            title = ['R', 'G', 'B', 'Intensity']
            cmap = ['Reds', 'Greens', 'Blues', 'gray']
            for i in range(4):
                inset = self.ax.inset_axes(pos[i], transform = self.ax.transData)
                inset.set_title(title[i])
                inset.imshow(self.image[0], cmap = cmap[i])
                inset.axis('off')
                self.canvas.draw()
            return


        self.ax.imshow(self.image)
        self.canvas.draw()

    def get_wafer(self):
        img = self.img_crop.copy()

        x=0
        y=0
        r=int(abs(self.rx1-self.rx2)/2)
        # crop image as a square
        img = img[y:y+r*2, x:x+r*2]
        # create a mask
        mask = np.full((img.shape[0], img.shape[1]), 0, dtype=np.uint8)
        # create circle mask, center, radius, fill color, size of the border
        cv2.circle(mask,(r,r), r, (255,255,255),-1)
        # get only the inside pixels
        fg = cv2.bitwise_or(img, img, mask=mask)

        mask = cv2.bitwise_not(mask)
        background = np.full(img.shape, 255, dtype=np.uint8)
        bk = cv2.bitwise_or(background, background, mask=mask)
        final = cv2.bitwise_or(fg, bk)
        # cv2.imshow('image',final)
        return final


    def get_RGBI(self):
        img6767 = self.get_wafer()
        img6767 = cv2.resize(img6767, dsize=(67,67), interpolation=cv2.INTER_AREA)
        MainR=img6767[:,:,0]
        MainG=img6767[:,:,1]
        MainB=img6767[:,:,2]
        MainI = np.array([[MainR[i,j]*0.2989+MainG[i,j]*0.5870+MainB[i,j]*0.1140 for j in range(67) ] for i in range(67)] )# why????

        return MainR, MainG, MainB, MainI

    def save_rgb_data(self, dirname):
        MainR, MainG, MainB, MainI = self.get_RGBI()
        coords = pd.read_csv('Grid1500_plus_Coordinates.txt', sep = ' ')

        MainR1=np.flip(MainR,0)
        MainG1=np.flip(MainG,0)
        MainB1=np.flip(MainB,0)
        MainI1=np.flip(MainI,0)

        coords['R'] =np.reshape(MainR1, (4489, 1))
        coords['G']=np.reshape(MainG1, (4489, 1))
        coords['B']=np.reshape(MainB1, (4489, 1))
        coords['I']=np.reshape(MainI1, (4489, 1))
        #save rows where corsses is not 0
        flag = coords[coords['Crosses'] != 0].to_csv(dirname+'_rgb.csv', index=None, sep=';')

    def _on_crop(self):
        orig = self.img.copy()

        self.img_crop = orig[int(self.ry1):int(self.ry2), int(self.rx1):int(self.rx2)]
        self.ax.imshow(self.img_crop)
        self.canvas.draw()
        self.imageList.config(state = 'normal')


    def _on_save(self):
        path = filedialog.asksaveasfilename()
        #save all images and data
        if path:
            try:
                self.save_rgb_data(path)
            except: return
            messagebox.showinfo(message =f'{self.img_name} saved!')



def main():

    root = Tk()
    imageprocess = ImageProcess('1.jpg')
    Mannually(root,imageprocess.get_circle(), '')



    root.mainloop()

if __name__ == '__main__':
    main()
