from tkinter import *
from tkinter import filedialog, messagebox

from batch.batch import Batch
from batch.mannually import Mannually
from GUI.main_GUI import Main_GUI
class Main(Main_GUI):
    def __init__(self, master):
        super().__init__(master)

    def OnDoubleClick(self, event):
        item = self.treeview.treeview.focus()
        imageName = self.treeview.treeview.item(item, 'text')
        Mannually(self, self.myprocess.get_ori(), imageName)

    def on_batch(self):
        batch = Batch(self, self.treeview.treeview,save_path = self.dirname, dirname = self.dirname)

    def _on_save(self):
        path = filedialog.asksaveasfilename()
        #save all images and data
        if path:
            try:
                self.myprocess.save_rgb_data(path)
            except: return
            messagebox.showinfo(message =f'{cur_img_name} saved!')











