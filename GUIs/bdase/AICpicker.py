# -*- coding: utf-8 -*-
"""
Created on Thu Oct 10 21:07:36 2019

@author: Pan_PC
"""

def _AICPicker(self,chdata):
    # set the parameters
        #self.dt = 0.004 # time step (unit:ms)
        data = chdata - np.mean(chdata)
        ind_peak = list(np.where(np.absolute(data) == np.max(np.absolute(data)))[0])
        k0 = ind_peak[0]
        # calculate the onset time with AIC Algorithm in window[0,k0]
        x = data[:k0+1]
        aicP1 = []
        if len(x):
           num = len(x)
           if num > 1:
               k = 1
               while k < num:
                   # calculate variance in first part
                   xLogVar1 = np.var(x[:k])
                   if xLogVar1 <= 0: xLogVar1 = 0
                   else: xLogVar1 = np.log(xLogVar1)
                   
                   # calculate variance in second part 
                   xLogVar2 = np.var(x[k:])
                   if xLogVar2 <= 0: xLogVar2 = 0
                   else: xLogVar2 = np.log(xLogVar2)
                   temp_aick = (k)*(xLogVar1) + (num-k-1)*(xLogVar2) 
                   aicP1.append(temp_aick)
                   k += 1
                   
           else: aicP1 = []
        else: aicP1 = []
        
        # find the position of the minimum
        if len(aicP1)>1:
            indlist = list(np.where(aicP1 == np.min(aicP1))[0])
            ind = indlist[0]+1
        else:
            ind = 0
            
        if ind:
            loc = (ind)*self._dt
        else:
            loc = 0
            
        return loc
