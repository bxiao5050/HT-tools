import os
import sys


paths = []
root_dir = os.path.join(os.path.dirname(__file__), 'GUIs')
paths.append(os.path.join(os.path.abspath(root_dir), 'position'))
paths.append(os.path.join(os.path.abspath(root_dir), 'GUI_tools'))
paths.append(os.path.join(os.path.abspath(root_dir), 'otherGUI'))
paths.append(os.path.join(os.path.abspath(root_dir), 'mybu'))


for path in paths:
    if not path in sys.path:
        sys.path.insert(1, path)
sys.path.insert(1, root_dir)
del path

import datatime

from tkinter import *

from GUIs.position.mycoords import Myc
from GUIs.GUI_tools.adjust import Adjust
from GUIs.mybu.wafer_comparison import TwoWafers
from GUIs.mybu.bbb import ImportPanel
from GUIs.twoDtoOneD.automation import Automation
from GUIs.base.mainn import Baseline_subtraction
from GUIs.cifb.Phase_ import MainAutoMenu
from GUIs.tools.rename_ import Ren
from GUIs.base.main_bandgap import P_import
from GUIs.bdase.main_resistance import Maink
from GUIs.cifb.concentration_main import Main_concentration
from GUIs.cifb.widg import M
from GUIs.tools.mytools.other import SomeTools
from GUIs.qixiank import NName
class Tools(SomeTool):
    def __init__(self):
        super().__init__()
        self.ca = NName().ca
        try:
            self._init()
        except:
            return

    # @staticmethod
    def _init(self):
        n = self.ca
        self.root.title(n[0])
        self.logo = PhotoImage(file = n[1])
        self.root.iconphoto(False, self.logo)

        self.f1 = LabelFrame(self.root, text =n[2], fg = 'blue')
        self.f11 = LabelFrame(self.root, text =n[3], fg = 'blue')
        self.f12 = LabelFrame(self.root, text =n[4], fg = 'blue')
        self.f19 = LabelFrame(self.root, text = n[5], fg = 'blue')
        Button(self.f1, text = n[6], command = self.on_thickness).pack(side = 'left', padx = (5,5), pady=(5,5))
        Button(self.f12, text = n[11], command = self.on_bandgap).pack(side = 'left', padx = (5,5), pady=(5,5))
        Button(self.f12, text = n[12], command = self.on_resistance).pack(side = 'left', padx = (5,5), pady=(5,5))

        Button(self.f11, text = n[8], command = self.on_baselinesubtraction).pack(side = 'left', padx = (5,5), pady=(5,5))
        Button(self.f11, text = n[9], command = self.on_phaseidentification).pack(side = 'left', padx = (5,5), pady=(5,5))
        Button(self.f11, text = n[10], command = self.on_referencerename).pack(side = 'left', padx = (5,5), pady=(5,5))



        Button(self.f19, text = n[13], command = self.on_sputterconcentration).pack(side = 'left', padx = (5,5), pady=(5,5))
        Button(self.f19, text = n[12], command = self.on_waferphotoRGB).pack(side = 'left', padx = (5,5), pady=(5,5))
        # try:
        #     self.b1.config(command =self.on_edxcomposition)
        #     self.b2.config(command =self.on_edxadjust)
        #     self.b3.config(command =self.on_librariescomparison)
        # except:
        #     return

        # self.f_edx.pack(padx = (5,5), pady=(5,5), anchor = 'w')
        # self.f1.pack(padx = (5,5), pady=(5,5), anchor = 'w')
        # self.f11.pack(padx = (5,5), pady=(5,5), anchor = 'w')
        # self.f12.pack(padx = (5,5), pady=(5,5), anchor = 'w')
        # self.f19.pack(padx = (5,5), pady=(5,5), anchor = 'w')
    def call_func(self, title, func):
        self.root.withdraw()
        self.w.iconphoto(False, self.logo)
        self.w.protocol("WM_DELETE_WINDOW", self.on_closing)
        func(self.w).pack(fill = 'both', expand = True)


    def on_closing(self):
        self.w.withdraw()
        self.root.destroy()
        self.root.mainloop()
    def on_edxcomposition(self):
        self.call_func('EDX composition', Myc)

    def on_edxadjust(self):
        self.call_func('Adjust composition', Adjust)

    def on_librariescomparison(self):
        self.call_func('Wafer comparison',TwoWafers)

class Main(Tools):
    def __init__(self):
        super().__init__()






    def on_bandgap(self):
        self.call_func('Bandgap calculation', P_import)

    def on_resistance(self):
        self.call_func('Resistance calculation', Maink)

    def on_sputterconcentration(self):
        self.call_func('Sputter concentration calculation',Main_concentration)

    def on_waferphotoRGB(self):
        self.call_func('Extract photo RGB', M)





Main()
