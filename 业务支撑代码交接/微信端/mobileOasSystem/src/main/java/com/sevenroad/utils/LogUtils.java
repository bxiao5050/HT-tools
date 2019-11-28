package com.sevenroad.utils;


import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * Created by linlin.zhang on 2016/12/2.
 */
public class LogUtils {
    private static String LogConfigPath = LogUtils.class.getClassLoader().getResource("").getPath()+"log4j.properties";
    private Logger logger;
    public LogUtils(){
        PropertyConfigurator.configure (LogConfigPath);
        logger = Logger.getLogger(LogUtils.class.getName());
    }
    public void Info(String msg){
        logger.info(msg);
    }
    public void Debug(String msg){
        logger.debug(msg);
    }
    public void Error(Throwable msg){
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        msg.printStackTrace(pw);
        logger.error(sw.toString());
    }
}
