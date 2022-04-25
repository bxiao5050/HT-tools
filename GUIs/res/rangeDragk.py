# draggable rectangle with the animation blit techniques; see
# http://www.scipy.org/Cookbook/Matplotlib/Animations
import numpy as np
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

from tkinter import *

class RangeDrag():
    def __init__(self, master, color = 'blue', ax = None, startPos_left = None,startPos_right = None):


        if ax is None:
            f = Figure(figsize=(5, 4), dpi=100)
            ax = f.add_subplot(111, picker = True)
            # ax.set_xlim(0, 20)

            self.canvas = FigureCanvasTkAgg(f, master=master)
            self.canvas.get_tk_widget().pack(side=TOP, fill=BOTH, expand=1)

        self.inf = Label(master)

        self.width = ax.get_xlim()[1]/200


        xmin, xmax = ax.get_xlim()
        ymin, ymax = ax.get_ylim()
        if startPos_left is None:
            startPos_left = np.random.randint(xmin - self.width, xmax, size = 1)
        if startPos_right is None:
            startPos_right = startPos_left + self.width*5

        self.rect1 = ax.bar(startPos_left+self.width/2,bottom = ymin, height = abs(ymax-ymin),  color = color, width = self.width, alpha = 0.6)[0]
        self.rect2 = ax.bar(startPos_right+self.width/2,bottom = ymin, height = abs(ymax-ymin),  color = color, width = self.width, alpha = 0.6)[0]

        self.middle = ax.bar((self.rect2.xy[0] + self.rect1.xy[0] + self.width)/2,bottom = ymin, height = abs(ymax-ymin),  color = color, alpha = 0.05, width = self.rect2.xy[0] - self.rect1.xy[0] - self.width)[0]
        # self.middle = ax.bar((self.rect2.xy[0] + self.rect1.xy[0])/2, ymax,  color = color, alpha = 0.1, width = self.rect2.xy[0] - self.rect1.xy[0] )[0]
        l1 = self.rect1.xy[0]
        l2 = self.rect2.xy[0]
        self.inf.config(text = '{:.3f}'.format(min(l1, l2)) + ' - ' + '{:.3f}'.format(max(l1, l2)))

        self.dr1 = self.DraggableRectangle(self.rect1, self.middle, self.rect2, self.inf, self.width)
        self.dr2 = self.DraggableRectangle(self.rect2, self.middle, self.rect1, self.inf, self.width )
        self.dr3 = self.DraggableRectangle(self.middle, self.rect1, self.rect2, self.inf, self.width, ismiddle = True)
        self.dr1.connect()
        self.dr2.connect()
        self.dr3.connect()
        # plt.show()

    def getXrange(self):
        return self.inf.cget('text')

    def getRangeV(self):
        return [float(i) for i in self.getXrange().split(' - ')]


    def changeColor(self, color):
        self.rect1.set_color(color)
        self.rect2.set_color(color)
        self.middle.set_color(color)
        self.rect1.figure.canvas.draw()



    class DraggableRectangle:
        lock = None  # only one can be animated at a time

        def __init__(self, rect, middle, other, inf, width, ismiddle = False):

            self.middle = middle
            self.rect = rect
            self.other = other
            self.press = None
            self.background = None
            self.width = width
            self.inf = inf
            self.ismiddle = ismiddle



        def connect(self):
            'connect to all the events we need'

            self.cidpress = self.rect.figure.canvas.mpl_connect(
                'button_press_event', lambda event: self.on_press(event))
            self.cidrelease = self.rect.figure.canvas.mpl_connect(
                'button_release_event', lambda event: self.on_release(event))
            self.cidmotion = self.rect.figure.canvas.mpl_connect(
                'motion_notify_event', lambda event: self.on_motion(event))

        def on_press(self, event):
            'on button press we will see if the mouse is over us and store some data'
            if event.inaxes != self.rect.axes: return
            if self.lock is not None: return
            contains, attrd = self.rect.contains(event)
            if not contains: return

            if self.ismiddle == True:
                self.l10 = self.middle.xy[0]
                self.l20 = self.other.xy[0]
                self.other.set_animated(True)


            x0, y0 = self.rect.xy
            self.press = x0, y0, event.xdata, event.ydata
            self.lock = self

            # draw everything but the selected rectangle and store the pixel buffer
            canvas = self.rect.figure.canvas
            axes = self.rect.axes
            self.rect.set_animated(True)
            self.middle.set_animated(True)
            canvas.draw()
            self.background = canvas.copy_from_bbox(self.rect.axes.bbox)

            # now redraw just the rectangle
            axes.draw_artist(self.rect)

            # and blit just the redrawn area
            canvas.blit(axes.bbox)

        def on_motion(self, event):
            self.motion(event)

        def motion(self, event):
            'on motion we will move the rect if the mouse is over us'
            if self.lock is not self:
                return
            if event.inaxes != self.rect.axes: return
            x0, y0, xpress, ypress = self.press
            dx = event.xdata - xpress


            if self.ismiddle == False:
                l1 = self.rect.xy[0]
                l2 = self.other.xy[0]
                self.rect.set_x(x0+dx)
                self.middle.set_x(min(l1, l2) + self.width)
                self.middle.set_width(max(l1, l2) - min(l1, l2) - self.width)
            elif self.ismiddle == True:
                l1 = self.middle.xy[0]
                l2 = self.other.xy[0]

                self.middle.set_x(self.l10+dx)
                self.other.set_x(self.l20+dx)

                self.rect.set_x(min(l1, l2) + self.width)
                self.rect.set_width(max(l1, l2) - min(l1, l2) - self.width)

            self.inf.config(text = '{:.3f}'.format(min(l1, l2)) + ' - ' + '{:.3f}'.format(max(l1, l2)))


            canvas = self.rect.figure.canvas
            axes = self.rect.axes



            # restore the background region
            canvas.restore_region(self.background)
            axes.draw_artist(self.rect)
            canvas.blit(axes.bbox)

        def on_release(self, event):
            'on release we reset the press data'
            if self.lock is not self:
                return

            self.press = None
            self.lock = None

            # turn off the rect animation property and reset the background
            self.rect.set_animated(False)
            self.middle.set_animated(False)
            self.other.set_animated(False)
            self.background = None

            # redraw the full figure
            self.rect.figure.canvas.draw()




def main():
    root = Tk()

    RangeDrag(root)
    root.mainloop()



if __name__ == '__main__':
    main()
