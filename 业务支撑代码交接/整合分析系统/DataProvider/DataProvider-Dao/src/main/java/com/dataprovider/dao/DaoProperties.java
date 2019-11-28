package com.dataprovider.dao;

import java.io.FileInputStream;
import java.util.Properties;
import java.util.concurrent.ExecutionException;

/**
 * Created by linlin.zhang on 2017/7/29.
 */
public class DaoProperties {
   private  Properties pps = new Properties();
    public String getValue(String key) {
        try {
            if (pps != null && pps.containsKey(key)) {
                return pps.get(key).toString();
            } else {
                pps = new Properties();

                pps.load(ClassLoader.getSystemResourceAsStream("dao.properties"));
                return pps.get(key).toString();
            }
        }catch (Exception e){
            System.out.print("获取属性错误："+key);
        }
        return "";
    }
}
