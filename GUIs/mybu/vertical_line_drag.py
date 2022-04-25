# draggable rectangle with the animation blit techniques; see
# http://www.scipy.org/Cookbook/Matplotlib/Animations
import numpy as np
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

from tkinter import *

class LineDrag():
    def __init__(self, master, color = 'blue', ax = None, v1 = None,v2 = None):


        if ax is None:
            f = Figure(figsize=(5, 4), dpi=100)
            ax = f.add_subplot(111, picker = True)

            self.canvas = FigureCanvasTkAgg(f, master=master)
            self.canvas.get_tk_widget().pack(side=TOP, fill=BOTH, expand=1)


        self.inf = Label(master)

        xmin, xmax = ax.get_xlim() #fix ax
        ax.set_xlim(ax.get_xlim())
        ax.set_ylim(ax.get_ylim())

        ymin, ymax = ax.get_ylim()
        if v1 is None:
            v1 = 0.9*ymax
            # v1 = np.random.randint(xmin - self.width, xmax, size = 1)
        if v2 is None:
            v2 = 0.2*ymax

        self.rect1 = ax.bar(0,bottom = v1, height = abs(ymax-ymin)/30,  color = color, width = xmax*2, alpha = 0.1)[0]
        self.rect2 = ax.bar(0,bottom = v2, height = abs(ymax-ymin)/30,  color = color, width = xmax*2, alpha = 0.1)[0]

        yLow = min(self.rect1.get_xy()[1], self.rect2.get_xy()[1])
        yHigh = max(self.rect1.get_xy()[1], self.rect2.get_xy()[1])
        first_line1 = ax.hlines([yHigh], xmin, xmax, colors = 'red', linestyles = '--')
        first_line2 = ax.hlines([yLow], xmin, xmax, colors = 'red', linestyles = '--')
        ax.annotate('', (xmax/10, yLow), (xmax/10, yHigh), arrowprops={'arrowstyle':'<->'})
        ax.text(xmax/9, (yHigh + yLow)/2, f'h = {np.round(abs(yHigh-yLow),2)}')

        self.dr1 = self.DraggableRectangle(self.rect1, self.rect2, ax, first_line1)
        self.dr2 = self.DraggableRectangle(self.rect2, self.rect1, ax, first_line2)
        self.dr1.connect()
        self.dr2.connect()



    def getRangeV(self):
        yLow = min(self.rect1.get_xy()[1], self.rect2.get_xy()[1])
        yHigh = max(self.rect1.get_xy()[1], self.rect2.get_xy()[1])
        return [yLow, yHigh]

    def changeColor(self, color):
        self.rect1.set_color(color)
        self.rect2.set_color(color)
        self.middle.set_color(color)
        self.rect1.figure.canvas.draw()


    class DraggableRectangle:
        lock = None  # only one can be animated at a time

        def __init__(self, rect1, rect2, ax, first_line):
            self.line_and_text = []
            self.line_and_text.append(first_line)

            self.rect1 = rect1
            self.rect2 = rect2
            self.ax = ax

            self.press = None
            self.background = None

        def connect(self):
            'connect to all the events we need'

            self.cidpress = self.rect1.figure.canvas.mpl_connect(
                'button_press_event', lambda event: self.on_press(event))
            self.cidrelease = self.rect1.figure.canvas.mpl_connect(
                'button_release_event', lambda event: self.on_release(event))
            self.cidmotion = self.rect1.figure.canvas.mpl_connect(
                'motion_notify_event', lambda event: self.on_motion(event))

        def on_press(self, event):
            'on button press we will see if the mouse is over us and store some data'
            if event.inaxes != self.rect1.axes: return
            if self.lock is not None: return
            contains, attrd = self.rect1.contains(event)
            if not contains: return

            for d in self.ax.texts:
                d.set_visible(False)

            for d in self.line_and_text:
                d.remove()
            self.line_and_text = []

            # if self.ismiddle == True:
            self.l10 = self.rect1.xy[1]
            self.l20 = self.rect2.xy[1]

            x0, y0 = self.rect1.xy
            self.press = x0, y0, event.xdata, event.ydata
            self.lock = self

            # draw everything but the selected rectangle and store the pixel buffer
            canvas = self.rect1.figure.canvas
            axes = self.rect1.axes
            self.rect1.set_animated(True)
            # self.rect2.set_animated(True)
            # self.middle.set_animated(True)
            canvas.draw()
            self.background = canvas.copy_from_bbox(self.rect1.axes.bbox)

            # now redraw just the rectangle
            axes.draw_artist(self.rect1)

            # and blit just the redrawn area
            canvas.blit(axes.bbox)

        def on_motion(self, event):
            self.motion(event)

        def motion(self, event):
            'on motion we will move the rect if the mouse is over us'
            if self.lock is not self:
                return
            if event.inaxes != self.rect1.axes: return
            x0, y0, xpress, ypress = self.press
            dy = event.ydata - ypress

            self.rect1.set_y(self.l10+dy)

            canvas = self.rect1.figure.canvas
            axes = self.rect1.axes

            # restore the background region
            canvas.restore_region(self.background)
            axes.draw_artist(self.rect1)
            canvas.blit(axes.bbox)

        def on_release(self, event):
            'on release we reset the press data'
            if self.lock is not self:
                return

            self.press = None
            self.lock = None
            xmin, xmax = self.ax.get_xlim()
            yLow = min(self.rect1.get_xy()[1], self.rect2.get_xy()[1])
            yHigh = max(self.rect1.get_xy()[1], self.rect2.get_xy()[1])

            self.line_and_text.append(self.ax.hlines([self.rect1.get_xy()[1]], xmin, xmax, colors = 'red', linestyles = '--'))
            self.ax.annotate('', (xmax/10, yLow), (xmax/10, yHigh), arrowprops={'arrowstyle':'<->'})
            self.ax.text(xmax/9, (yHigh + yLow)/2, f'h = {np.round(abs(yHigh-yLow),2)}')
            # turn off the rect animation property and reset the background
            self.rect1.set_animated(False)
            # self.middle.set_animated(False)
            self.rect2.set_animated(False)
            self.background = None

            # redraw the full figure
            self.rect1.figure.canvas.draw()




def main():
    root = Tk()

    LineDrag(root)
    root.mainloop()



if __name__ == '__main__':
    main()
