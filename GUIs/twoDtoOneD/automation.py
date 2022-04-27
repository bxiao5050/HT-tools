from tkinter import *
from tkinter.filedialog import askdirectory
import pyperclip
import pyautogui
import time
import os
import threading
import random

from formattedScanlist import FormattedScanlist
from GUIs.science.GUIo import GUIi


class Automation(Frame):
    def __init__(self, master):
        super().__init__(master)
        self.gui = GUIi(master)
        self.gui.pack()
        # master.bind("<F5>", self.on_start)
        self.gui.startB.config(command = self.on_start)

        self.gui.stopB.config(command = self.on_terminate)


    def on_terminate(self):
        self.terminate_flag = True


    def on_start(self):
        self.gui.startB.config(state = 'disabled')
        self.gui.folderPath.config(state = 'disabled')
        self.gui.pauseTime.config(state = 'disabled')

        self.gui.log.delete('1.0', 'end')
        self.terminate_flag = False
        self.finished_frames = 0
        self.getFocused = False # win + 1 to get focus
        self.isFirstRound = True

        self.xy_filename = ''
        self.runInf = ''


        try:
            threading.Thread(target=self.run).start()
            threading.Thread(target=self.executionTime).start()
            threading.Thread(target=self.display).start()
        except:
            self.terminate_flag = True
            self.gui.startB.config(state = 'normal')
            self.gui.folderPath.config(state = 'normal')
            self.gui.pauseTime.config(state = 'normal')
            self.gui.countL1.config(text = f'(stopped)    {self.finished_frames} data are finished', fg = 'red')

    def executionTime(self):
        start = time.time()
        while True:
            if self.terminate_flag == False:
                self.gui.countL3.config(text = f'execution time: {self.convert(time.time() - start)}' , fg = 'gray')
            else:
                return
    def display(self):
           while True:
            if self.terminate_flag == False:
                suffix = ''
                for i in range(3):
                    suffix += '.'
                    for j in range(40):
                        self.gui.countL2.config(text =  f'{self.runInf}' + suffix, fg = 'gray')
                        time.sleep(0.02)

            else:
                return

    def run(self):
        pauseTime = float(self.gui.pauseTime.get())
        self.workPath = self.gui.folderPath.get()

        frames = FormattedScanlist(workPath = self.workPath).frames()
        total_frames = len(frames['diffName'])
        self.finished_frames = 0

        stableRunTime = 0

        for frameblock in frames['diffName']:
            if self.terminate_flag == True:
                self.gui.countL1.config(text = f'(stopped)    {self.finished_frames} data are finished', fg = 'red')
                self.initialization()
                return
            self.xy_filename_base = frameblock.split('.gfrm')[0].replace('"','')
            self.xy_filename = self.xy_filename_base + '_exported.xy'
            self.runInf  =  f'convert "{self.xy_filename_base}"'
            #check if the 1D pattern already exists
            if os.path.exists(os.path.join(self.workPath, self.xy_filename)):
                self.finished_frames +=1
                self.gui.log.see('end')
                self.gui.log.insert('end', f'{self.finished_frames} -- exists   "{self.xy_filename}"'+'\n')
                self.gui.countL1.config(text = f'total data: {total_frames}         finished: {self.finished_frames}' ,fg = 'black')
                continue

            self.gui.countL1.config(text = f'total data: {total_frames}         finished: {self.finished_frames}',fg = 'black')
            self.oneround(frameblock, pauseTime)
            iteration_N = 0 # record the iteration times
            stableRunTime += 1
            if stableRunTime >=2 and pauseTime >1:
                pauseTime -= (0.07 + random.random()/20)
                self.gui.pauseTime.config(state = 'normal')
                self.gui.pauseTime.delete(0, 'end')
                self.gui.pauseTime.insert(0, pauseTime)
                self.gui.pauseTime.config(state = 'disabled')
                stableRunTime = 0
            # trialTimes = 0 # how many times did I try
            while True:
                if self.terminate_flag == True:
                    self.gui.countL1.config(text = f'(stopped)    {self.finished_frames} data are finished', fg = 'red')
                    self.initialization()
                    return
                iteration_N +=1
                time.sleep(0.02)
                # if pauseTime > 10:
                #     pauseTime = 5
                #     self.gui.pauseTime.delete(0, 'end')
                #     self.gui.pauseTime.insert(0, pauseTime)
                if os.path.exists(os.path.join(self.workPath, self.xy_filename)):
                    self.finished_frames +=1
                    self.runInf  =  f'obtained "{self.xy_filename_base}"'
                    self.gui.log.see('end')
                    self.gui.log.insert('end', f'{self.finished_frames} ---> obtained   "{self.xy_filename}"'+'\n')
                    self.gui.countL1.config(text = f'total data: {total_frames}         finished: {self.finished_frames}' ,fg = 'black')
                    break
                if iteration_N > 100 and iteration_N < 106: #re-do it after waiting for 5s
                    self.runInf  =  f'failed to obtain "{self.xy_filename_base}", try again'
                    pyautogui.typewrite(['enter','esc','esc'])
                    time.sleep(pauseTime/50)
                    pyautogui.typewrite(['enter','esc','esc'])
                    time.sleep(pauseTime/50)
                    pyautogui.typewrite(['enter','esc','esc'])
                    pauseTime += 0.3 + random.random()/7
                    stableRunTime = 0
                    self.gui.pauseTime.config(state = 'normal')
                    self.gui.pauseTime.delete(0, 'end')
                    self.gui.pauseTime.insert(0, pauseTime)
                    self.gui.pauseTime.config(state = 'disabled')
                    self.oneround(frameblock, pauseTime)
                elif iteration_N >= 106 and iteration_N <108:
                    self.runInf  =  f'failed to obtain "{self.xy_filename_base}", increase time and try again'
                    pyautogui.typewrite(['enter','esc','esc'])
                    time.sleep(pauseTime/50)
                    pyautogui.typewrite(['enter','esc','esc'])
                    time.sleep(pauseTime/50)
                    pyautogui.typewrite(['enter','esc','esc'])
                    pauseTime = 5
                    stableRunTime = 0
                    self.gui.pauseTime.config(state = 'normal')
                    self.gui.pauseTime.delete(0, 'end')
                    self.gui.pauseTime.insert(0, pauseTime)
                    self.gui.pauseTime.config(state = 'disabled')
                elif iteration_N >= 108 :
                    self.gui.log.see('end')
                    self.gui.log.insert('end', f'"{self.xy_filename}" failed'+'\n')
                    break

        self.initialization()
        if total_frames == self.finished_frames:
            self.gui.countL1.config(text = f'all {total_frames} data are finished', fg = 'blue')

    def initialization(self):
        self.terminate_flag = True
        self.gui.startB.config(state = 'normal')
        self.gui.folderPath.config(state = 'normal')
        self.gui.pauseTime.config(state = 'normal')


    def convert(self, seconds):
        return time.strftime("%H:%M:%S", time.gmtime(seconds))


    def oneround(self, frameblock, pauseTime= 5):
        if self.getFocused == False:
            pyautogui.hotkey('winleft', '1')
            self.getFocused = True
        pyautogui.typewrite(['esc', 'esc'])
        time.sleep(pauseTime/50)
        pyautogui.hotkey('ctrlleft', 'n')
        time.sleep(pauseTime/50)
        pyautogui.typewrite(['n'])
        time.sleep(pauseTime/5)
        pyautogui.hotkey('ctrlleft', 'i')
        time.sleep(pauseTime/2)

        # print(path)

        if self.isFirstRound == True:
            self.runInf  =  f'locate file path'
            path = os.path.join(self.workPath)
            pyperclip.copy(path)
            time.sleep(pauseTime/50)
            self.isFirstRound = False
            pyautogui.hotkey('ctrlleft', 'v')
            time.sleep(pauseTime/5)
            pyautogui.typewrite(['enter'])
            time.sleep(pauseTime/10)

        self.runInf  =  f'import 2D raw files of "{self.xy_filename_base}"'

        pyperclip.copy(frameblock)
        time.sleep(pauseTime/5)
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(pauseTime/20)
        pyautogui.typewrite(['enter'])
        time.sleep(pauseTime)

        self.runInf  =  f'convert to "{self.xy_filename_base}"'
        pyautogui.typewrite(['pagedown', 'pagedown'])
        time.sleep(pauseTime/20)

        pyautogui.hotkey('shiftleft', 'f10')
        time.sleep(pauseTime/20)

        pyautogui.typewrite(['up', 'up', 'up', 'right', 'down', 'down', 'enter'])
        time.sleep(pauseTime/5)

        self.runInf  =  f'save 1D diffractio pattern as ".xy"'
        pyautogui.typewrite(['tab'])
        time.sleep(pauseTime/7)
        pyautogui.typewrite(['down'])
        time.sleep(pauseTime/4)
        pyautogui.typewrite([ 'down'])
        time.sleep(pauseTime/30)
        pyautogui.typewrite([ 'down'])
        time.sleep(pauseTime/30)
        pyautogui.typewrite(['enter'])
        time.sleep(pauseTime/10)
        pyautogui.typewrite([ 'enter'])
        time.sleep(pauseTime/5
            )


        pyautogui.typewrite(['left', 'enter'])











def main():
    root = Tk()
    root.title('convert 2D XRD to 1D pattern')
    app = Automation(root)
    app.pack()

    root.mainloop()





if __name__ == '__main__':
    main()






