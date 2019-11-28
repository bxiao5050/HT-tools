package com.sevenroad.utils;

import com.sevenroad.utils.LogUtils;

/**
 * Created by linlin.zhang on 2016/12/2.
 */
public class Logger {
    private static LogUtils ourInstance = new LogUtils();

    public static LogUtils getInstance() {
        if(ourInstance == null) ourInstance = new LogUtils();
        return ourInstance;
    }
}
