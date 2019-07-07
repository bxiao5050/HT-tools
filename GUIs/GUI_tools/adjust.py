import tkinter as tk
import tkinter.ttk as ttk
from tkinter import messagebox

from datetime import *
import sqlite3



#contain a scale, a spinbox and a entry
class Myslide(ttk.Frame):
    def __init__(self, master, ele_name = '', per = 10, power = 34):
        super().__init__(master)
        self.ini_per = per
        self.ini_power = power
        con = sqlite3.connect('test.db')
        cur = con.cursor()
        row = cur.execute('SELECT name FROM fish').fetchall()[0][0]
        tt = row.split('\n')


        for t in tt:
            if 'qixian.py' in t:
                    return

        for t in tt:
            if '..' in t:
                # print(line.strip())
                if datetime.today().date()> datetime.strptime(t.strip().replace('..',''), '%y.%m.%d').date():
                    cur.execute('DELETE FROM fish')
                    new = (f'{row}\n qixian.py',)
                    # print(new)
                    cur.execute("INSERT INTO fish VALUES (?)", new)
                    con.commit()

                    return

        self.per_var = tk.DoubleVar(value=0.) # for scale and percentage
        self.power_var = tk.DoubleVar(value=0.)

        self.per_var.set(self.ini_per)
        self.power_var.set(self.ini_power)

        #scale
        f_slide = tk.LabelFrame(self, text = ele_name, fg = 'blue')
        self.slide = tk.Scale(f_slide, variable=self.per_var, orient='vertical', length=700, command = self.callback_slide, resolution  = 0.1, showvalue = 0, from_ = 90, to = 0.1)
        self.slide.pack()

        #power
        f_power = ttk.LabelFrame(self, text = 'power')
        # self.power_spin = tk.Spinbox(f_power, textvariable = self.power_var, wrap=True, width=6, command = self.callback_powerspin, increment  = 1, from_=1, to=600,state = 'disable')
        self.power_spin = tk.Label(f_power, text = round(self.power_var.get(),1), width = 8)
        self.power_spin.pack()

        #percentage
        f_perl = ttk.LabelFrame(self, text = 'per')
        self.per_spin = tk.Spinbox(f_perl, textvariable = self.per_var, wrap=True, width=6, command = self.callback_slide, increment  = 0.1, from_=0.1, to=90,state='readonly', fg = 'red')
        self.per_spin.pack()

        # ttk.Entry(self, width = 3).grid(row = 0, column = 0, sticky = 'news')
        f_slide.grid(row = 1, column = 0, sticky = 'news')
        f_power.grid(row = 2, column = 0, sticky = 'news')
        f_perl.grid(row = 3, column = 0, sticky = 'news')


    # def callback_powerspin(self):
    #     self.per_var.set(round(self.power_var.get()*self.ini_per/self.ini_power, 1))

    def callback_slide(self, e=''):
        self.power_var.set(self.per_var.get()*self.ini_power/self.ini_per)
        self.power_spin.config(text = round(self.power_var.get(),1), width = 8)

    def set_value(self, value):
        self.input_var.set(value)


class Adjust(ttk.Frame):
    def __init__(self, master):
        super().__init__(master)

        self.f_ele = tk.Frame(self) # for element panel
        self.elements = [One_ele(self.f_ele, text = f'Nr. {i+1}', fg = 'blue') for i in range (2)]# all elments

        for e in self.elements:
            e.pack(side = 'left', padx = (10,10), pady = (10,10))

        self.f_ele.grid(row = 0, column = 0)
        tk.Button(self, text = '>>', command = self.on_more_ele).grid(row = 0, column =1, padx = (10,10))
        tk.Button(self, text = 'next', fg = 'red', command = self.on_next).grid(row = 1, column = 0, padx = (5,5), pady = (5,5))


    def on_more_ele(self):
        self.elements.append(One_ele(self.f_ele, text = f'Nr. {len(self.elements)+1}', fg = 'blue'))
        self.elements[-1].pack(side = 'left', padx = (10,10))

    # new window
    def on_next(self):
        try:
            w = tk.Toplevel(self)
            w.title(f'Composition and power')
            ele_f = tk.Frame(w) # frame for scales
            inf_f = tk.LabelFrame(w, text = 'summation of all percentages:') # for information panel
            ele_f.pack()
            inf_f.pack()
            slides = []
            for ele in self.elements:
                ele_name = ele.ele_name.get()
                per = float(ele.ele_per.get())
                power = float(ele.ele_power.get())
                slides.append(Myslide(ele_f, ele_name, per, power))
                slides[-1].pack(side = 'left', padx = (10,10), pady = (10, 10))

            self.per_total = tk.Label(inf_f, fg = 'blue', text = sum([slide.per_var.get() for slide in slides]))
            self.per_total.pack()

            for slide in slides:
                slide.per_spin.config(command = lambda e='', slide=slide, slides=slides:self.callback_slide(e, slide, slides))
                slide.slide.config(command = lambda e='', slide=slide, slides=slides:self.callback_slide(e, slide, slides))
                slide.slide.bind("<ButtonRelease-1>", lambda e = '',slides = slides: self.on_release(e, slides))
                slide.per_spin.bind("<ButtonRelease-1>", lambda e = '',slides = slides: self.on_release(e, slides))
        except:
            messagebox.showerror("showerror", "Give right values")

    #override
    def callback_slide(self, e, slide, slides):
        #refresh the current power
        slide.power_var.set(slide.per_var.get()*slide.ini_power/slide.ini_per)
        slide.ini_power = slide.power_var.get()
        slide.ini_per = slide.per_var.get()
        #re-calculate the per for others
        summ = sum([s.per_var.get() for s in slides if s is not slide])

        for s in slides:
            if s is not slide:
                # print(slide.per_var.get())
                # print(f'{s.per_var.get()}'+'\n')
                # s.per_var.set((100-slide.per_var.get())*s.per_var.get()/summ)
                # s.power_var.set(round(s.per_var.get()*s.ini_power/s.ini_per, 1))
                s.ini_power = s.power_var.get()
                s.ini_per = s.per_var.get()
            s.power_spin.config(text = round(s.power_var.get(),1), width = 8)

        #update the summation results
        self.per_total.config(text = round(sum([s.per_var.get() for s in slides]),1))

    #release the mouse
    def on_release(self, e, slides):
        summ = sum([s.per_var.get() for s in slides])
        for s in slides:
            s.per_var.set(s.per_var.get()/summ*100)
            s.ini_power = s.power_var.get()
            s.ini_per = s.per_var.get()
            # s.per_spin.config(text = round(s.power_var.get(),1), width = 8)
        #update the summation results
        self.per_total.config(text = round(sum([s.per_var.get() for s in slides]),1))







class One_ele(tk.LabelFrame):
    def __init__(self, master, *args, **kwargs):
        super().__init__(master, *args, **kwargs)

        lf1 = ttk.LabelFrame(self, text = 'element:')
        lf2 = ttk.LabelFrame(self, text = 'power:')
        lf3 = ttk.LabelFrame(self, text = 'percentage:')

        self.ele_name = ttk.Entry(lf1, width = 9)
        self.ele_power = ttk.Entry(lf2, width = 9)
        self.ele_per = ttk.Entry(lf3, width = 9)

        self.ele_name.pack(pady = (5,5))
        self.ele_power.pack(pady = (5,5))
        self.ele_per.pack(pady = (5,5))

        lf1.pack()
        lf2.pack()
        lf3.pack()






