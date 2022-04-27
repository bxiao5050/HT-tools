import numpy as np
from tkinter import *
from rangeSlider import RangeSlider
class RangeSliderDemo(LabelFrame):

    def __init__(self, master):
        super().__init__( master)
        self.config(text = 'set boundary')
        self.f = Frame(self)
        self.low_e = Entry(self.f, width = 8)
        self.low_h = Entry(self.f, width = 8)
        self.setl_b = Button(self.f, text = 'set low', command = self.on_setl)
        self.seth_b = Button(self.f, text = 'set high', command = self.on_seth)

        self.low_e.grid(row = 0, column = 1, sticky = 'w')
        self.setl_b.grid(row = 0, column = 2, padx = (5,15), sticky = 'w')
        self.low_h.grid(row = 0, column = 3, sticky = 'w')
        self.seth_b.grid(row = 0, column = 4, padx = (5,5),sticky = 'w')

        self.rs = RangeSlider(self,sliderColor="yellow", sliderHighlightedColor="green",
                            barColor="lightblue",
                            caretColor="red", caretHighlightedColor="green",
                            barWidthPercent=0.85, barHeightPercent=0.2)

        self.config(width = 452, height = 80)
        self.pack_propagate(0)
        # self.lowValue = self.rs.getLower()
        # self.highValue = self.rs.getUpper()

    def on_setl(self):
        self.rs.setLower(float(self.low_e.get()))
    def on_seth(self):
        self.rs.setUpper(float(self.low_h.get()))

        # print(self.low_h.get())


    def firstTime(self,LowerBound=0,UpperBound=100, Lower = None, Upper = None):
        self.f.pack()
        self.rs.pack()

        major = float(abs(UpperBound-LowerBound)/5)
        self.rs.setMajorTickSpacing(major)
        self.rs.setMinorTickSpacing(float(major/5))

        self.rs.setPaintTicks(True)
        self.rs.setSnapToTicks(False)
        self.rs.setFocus()


        self.rs.setLowerBound(LowerBound)
        self.rs.setUpperBound(UpperBound)
        if Lower is None:
            self.rs.setLower(LowerBound)
            self.rs.setUpper(UpperBound)
        else:
            self.rs.setLower(Lower)
            self.rs.setUpper(Upper)
        self.low_e.insert(0, np.round(self.rs.getLower(),2))
        self.low_h.insert(0, np.round(self.rs.getUpper(),2))


        self.rs.subscribe(self.slider_changeState)


    def set_boundary(self, LowerBound=0,UpperBound=100):
        major = float(abs(UpperBound-LowerBound)/5)
        self.rs.setMajorTickSpacing(major)
        self.rs.setMinorTickSpacing(float(major/5))
        self.rs.setLowerBound(LowerBound)
        self.rs.setUpperBound(UpperBound)

        if not (LowerBound <= self.rs.getLower() and UpperBound >= self.rs.getUpper()):
            self.rs.setLower(LowerBound)
            self.rs.setUpper(UpperBound)

    def get_range(self):
        return [self.rs.getLower(), self.rs.getUpper()]

    def get_boundary(self):
        return [self.rs.getLowerBound(), self.rs.getUpperBound()]

    def get_range_and_boundary(self):
        return [self.rs.getLowerBound(), self.rs.getUpperBound(), self.rs.getLower(), self.rs.getUpper()]


    def slider_changeState(self, e):
        self.set_changeState()

    def set_changeState(self):
        self.low_e.delete(0, END)
        self.low_h.delete(0, END)
        self.low_e.insert(0, round(self.rs.getLower(),2))
        self.low_h.insert(0, round(self.rs.getUpper(),2))
    #     self.lowValue = self.rs.getLower()
    #     self.highValue = self.rs.getUpper()

        # print(f'lower: {self.rs.getLower()}')
        # print(f'Upper: {self.rs.getUpper()}')
        # print(f'LowerBound: {self.rs.getLowerBound()}')
        # print(f'UpperBound: {self.rs.getUpperBound()}')



def main():
    root = Tk()
    app = RangeSliderDemo(root)
    app.firstTime(LowerBound=980,UpperBound=981)

    app.pack()
    root.mainloop()





'''
Entry Point
'''
if __name__ == "__main__":
    main()
