from tkinter import *

class Popup():
 def __init__(self, text):
  self.text = text
  self.functions_binding_key()
  self.functions_configurations()

 def functions_configurations(self):
  self.menu = Menu(self.text.master)
  self.menu.add_command(label="Copy", command=self.text.storeobj['Copy'])
  self.menu.add_command(label="Cut", command=self.text.storeobj['Cut'])
  self.menu.add_command(label="Paste", command=self.text.storeobj['Paste'])
  self.menu.add_separator()
  self.menu.add_command(label="Select All", command=self.text.storeobj['SelectAll'])
  self.menu.add_separator()
  return

 def functions_binding_key(self):
  self.text.bind("<Button-3>",self.show_menu_)

  return

 def show_menu_(self, event):
  self.menu.tk_popup(event.x, event.y)

  return

if __name__ == '__main__':
 root = Tk()
 text = Text()
 text.pack()
 text.storeobj={'SelectAll':None,
 "Copy":None,
 "Cut":None,
 "Paste":None}
 Popup(text)
 root.mainloop()
