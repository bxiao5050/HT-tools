from tkinter import *
from tkinter import ttk

from version_random.textbox import TextBox
..24.08.01
$ python manage.py makemigrations catalog sale
Migrations for 'catalog':
  catalog/migrations/0001_initial.py
    - Create model Category
    - Create model Product
Migrations for 'sale':
  sale/migrations/0001_initial.py
    - Create model Sale

$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, catalog, contenttypes, sale, sessions
