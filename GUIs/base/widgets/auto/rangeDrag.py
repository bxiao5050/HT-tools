

class RangeDrag():
    def __init__(self, master, color = 'green', ax = None, startPos_left = None,startPos_right = None, left_e = None, right_e = None):


        if ax is None:
            f = Figure(figsize=(5, 4), dpi=100)
            self.ax = f.add_subplot(111, picker = True)

            self.canvas = FigureCanvasTkAgg(f, master=master)
            self.canvas.get_tk_widget().pack(side=TOP, fill=BOTH, expand=1)
        else:
            self.ax = ax

        if left_e is None:
            self.left_e = Entry(master)
            self.right_e = Entry(master)
        else:
            self.left_e = left_e
            self.right_e = right_e

        self.width = self.ax.get_xlim()[1]/200
        xmin, xmax = self.ax.get_xlim()
        ymin, ymax = self.ax.get_ylim()

        if startPos_left is None:
            startPos_left = np.random.randint(xmin - self.width, xmax, size = 1)
        if startPos_right is None:
            startPos_right = startPos_left + self.width*5

        self.rect1 = self.ax.bar(startPos_left+self.width/2,bottom = ymin, height = abs(ymax-ymin),  color = color, width = self.width, alpha = 0.6)[0]
        self.rect2 = self.ax.bar(startPos_right+self.width/2,bottom = ymin, height = abs(ymax-ymin),  color = color, width = self.width, alpha = 0.6)[0]

        self.middle = self.ax.bar((self.rect2.xy[0] + self.rect1.xy[0] + self.width)/2,bottom = ymin, height = abs(ymax-ymin),  color = color, alpha = 0.05, width = self.rect2.xy[0] - self.rect1.xy[0] - self.width)[0]

        l1 = self.rect1.xy[0]
        l2 = self.rect2.xy[0]

        self.left_e.insert(0, '{:.3f}'.format(min(l1, l2)))
        self.right_e.insert(0, '{:.3f}'.format(max(l1, l2)))


        self.dr1 = self.DraggableRectangle(self.rect1, self.middle, self.rect2, self.left_e, self.right_e, self.width)
        self.dr2 = self.DraggableRectangle(self.rect2, self.middle, self.rect1, self.left_e, self.right_e, self.width )
        self.dr3 = self.DraggableRectangle(self.middle, self.rect1, self.rect2, self.left_e, self.right_e, self.width, ismiddle = True)
        self.dr1.connect()
        self.dr2.connect()
        self.dr3.connect()


    def set_Xrange(self, left, right):
        self.rect1.set_x(left)
        self.middle.set_x(left+ self.width)
        self.middle.set_width(max(left, right) - min(left, right) - self.width)
        self.rect2.set_x(right)

        self.rect1.figure.canvas.draw()
    def update_ylim(self):
        ymin, ymax = self.ax.get_ylim()
        self.rect1.set_height(abs(ymax-ymin))
        self.rect2.set_height(abs(ymax-ymin))
        self.middle.set_height(abs(ymax-ymin))

        self.rect1.figure.canvas.draw()



    def getXrange(self):
        return (self.rect1.xy[0], self.rect2.xy[0])



    def changeColor(self, color):
        self.rect1.set_color(color)
        self.rect2.set_color(color)
        self.middle.set_color(color)
        self.rect1.figure.canvas.draw()



    class DraggableRectangle:
        lock = None  # only one can be animated at a time

        def __init__(self, rect, middle, other, left_e,right_e, width, ismiddle = False):

            self.middle = middle
            self.rect = rect
            self.other = other
            self.press = None
            self.background = None
            self.width = width
            self.left_e = left_e
            self.right_e = right_e
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


            self.left_e.delete(0, 'end')
            self.right_e.delete(0, 'end')
            self.left_e.insert(0, '{:.3f}'.format(min(l1, l2)))
            self.right_e.insert(0, '{:.3f}'.format(max(l1, l2)))

            canvas = self.rect.figure.canvas
            axes = self.rect.axes
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


