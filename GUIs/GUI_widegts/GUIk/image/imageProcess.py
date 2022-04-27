import cv2
import numpy as np
import pandas as pd

import os
class ImageProcess():
    def __init__(self, image):
        #load an image
        self.img = cv2.cvtColor(cv2.imread(image), cv2.COLOR_BGR2RGB)

        #convert it to grayscale
        self.color1 = cv2.resize(self.img, self._resize(self.img, width = 1000), interpolation = cv2.INTER_AREA)# with circle

        gray = cv2.cvtColor(self.color1, cv2.COLOR_RGB2GRAY)
        self.color = self.color1.copy() # without circle

        # Find circles
        self.circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, dp =1.3, minDist=170,minRadius=170, maxRadius=300)

        # If some circle is found
        if self.circles is not None:
            # Get the (x, y, r) as integers
            self.circles = np.round(self.circles[0, :]).astype("int")
            self.x, self.y, self.r = self.circles[0]
            cv2.circle(self.color1, (self.x, self.y), self.r, (255, 0, 0), 3)
            cv2.circle(self.color1, (self.x, self.y), 2, (255, 0, 0), 5)

    def get_ori(self):
        return self.color.copy()

    def _resize(self, image, width):
        height = int(image.shape[0]*width/image.shape[1])
        return (width, height)

    def isCircle(self):
        return True if self.circles is not None else False

    #original + circle
    def get_circle(self):
        output = self.color1.copy()
        return output

    #rectangle
    def get_crop(self):
        orig = self.color.copy()
        rectX = (self.x - self.r)
        rectY = (self.y - self.r)
        photo = orig[rectY:(rectY+2*self.r), rectX:(rectX+2*self.r)]
        return photo

    # only wafer
    def get_wafer(self):
        crop_img = self.get_crop()
        #create a mask
        r = self.r
        image_black = np.zeros((2*r,2*r))
        mask = cv2.circle(image_black, (r,r), r, (255,255,255), -1)

        BB=np.array(mask, dtype=bool)
        BBB=np.bitwise_not(BB)
        crop_img[BBB] = 255
        return crop_img

    #get_RGB figures
    def get_RGBI(self):
        img6767 = self.get_wafer()
        img6767 = cv2.resize(img6767, dsize=(67,67), interpolation=cv2.INTER_AREA)
        MainR=img6767[:,:,0]
        MainG=img6767[:,:,1]
        MainB=img6767[:,:,2]
        MainI = np.array([[MainR[i,j]*0.2989+MainG[i,j]*0.5870+MainB[i,j]*0.1140 for j in range(67) ] for i in range(67)] )# why????

        return MainR, MainG, MainB, MainI

    def save_rgb_data(self, dirname):
        MainR, MainG, MainB, MainI = self.get_RGBI()
        coords = pd.read_csv('batch\\file\\Grid1500_plus_Coordinates.txt', sep = ' ')

        MainR1=np.flip(MainR,0)
        MainG1=np.flip(MainG,0)
        MainB1=np.flip(MainB,0)
        MainI1=np.flip(MainI,0)

        coords['R'] =np.reshape(MainR1, (4489, 1))
        coords['G']=np.reshape(MainG1, (4489, 1))
        coords['B']=np.reshape(MainB1, (4489, 1))
        coords['I']=np.reshape(MainI1, (4489, 1))
        #save rows where corsses is not 0
        flag = coords[coords['Crosses'] != 0].to_csv(dirname+'_rgb.csv', index=None, sep=';')


    def save_wafer_image(self, dirname):
        cv2.imwrite(dirname+'_wafer.jpg', cv2.cvtColor(self.get_wafer(), cv2.COLOR_RGB2BGR))









