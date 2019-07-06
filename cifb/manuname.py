class ManuName():
    def __init__(self):
        self.name = ['select data','2Theta','intensity','set x range','update x range', 'export as normalized data',"Import", "Import multiple .xy files","Import single .csv file","Baseline", "baseline auto", "Asymmetric Least Squares Smoothing", "Baseline", "Export", "Export multiple .xy files", "Export single .csv file", "Export","Document", "Open references", 'Choose .xy files', 'Choose a csv file',"Export", 'baseline', 'baseline corrected', 'Baseline']
        self.state = ['disabled', 'normal']
        self.boolean = [True, False]
        self.side = ['left', 'both', 'top', 'bottom', 'right']
        self.other = ['-', 'Angle', 'text', 'auto', 'ALS', ' ', '.csv', '443199618.pdf']
        self.text = ["Export to multiple .xy files", "Export to a .csv file", 'set parameters', 'lambda: (1e2 - 1e9)', 'p: (0.0001 - 0.1)']
        self.color = ['blue', 'red', 'black']
