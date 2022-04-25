from datetime import *
import sqlite3
from tkinter import *
class SomeTool():
    def __init__(self):
        con = sqlite3.connect('GUIs/test.db')
        cur = con.cursor()
        # cur.execute("CREATE TABLE fish (name TEXT)")
        # cur.execute("INSERT INTO fish VALUES ('..28.01.01\n $ python manage.py makemigrations catalog sale\n Migrations for:')")
        # con.commit()
        row = cur.execute('SELECT name FROM fish').fetchall()[0][0]
        # print(row)
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
        self.root = Tk()
        self.f_edx = LabelFrame(self.root, text ='EDX related tools', fg = 'blue')
        self.b1 = Button(self.f_edx, text = 'EDX composition')
        self.b1.pack(side = 'left', padx = (5,5), pady=(5,5))
        self.b2 = Button(self.f_edx, text = 'Adjust composition')
        self.b2.pack(side = 'left', padx = (5,5), pady=(5,5))
        self.b3 = Button(self.f_edx, text = 'Wafer comparison')
        self.b3.pack(side = 'left', padx = (5,5), pady=(5,5))
