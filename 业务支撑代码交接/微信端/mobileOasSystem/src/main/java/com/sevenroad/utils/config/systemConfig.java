package com.sevenroad.utils.config;

import com.xiaoleilu.hutool.util.ClassUtil;

/**
 * Created by linlin.zhang on 2016/10/18.
 */
public class systemConfig {
    private static dataBaseConfig dbConfig;
    private static dataViewConfig dataViewConfig;
    private static String filePath = ClassUtil.getClassLoader().getResource("config.properties").getFile();

    private static otherConfig otherConfig;
    public static dataBaseConfig getDBConfig() {
        if(dbConfig == null) dbConfig = new dataBaseConfig();
        if (dbConfig.isloaded()) {
            return dbConfig;
        } else{
            dbConfig.load(filePath);
        }
        return dbConfig;
    }
    public static dataViewConfig getDataViewConfig(){
        if(dataViewConfig == null) dataViewConfig = new dataViewConfig();
        if (dataViewConfig.isloaded()) {
            return dataViewConfig;
        } else{
            dataViewConfig.load(filePath);
        }
        return dataViewConfig;
    }
    public static otherConfig getOtherConfig(){
        if(otherConfig == null) otherConfig = new otherConfig();
        if (otherConfig.isloaded()) {
            return otherConfig;
        } else{
            otherConfig.load(filePath);
        }
        return otherConfig;
    }
    public static void reload(){
        getDBConfig().load(filePath);
        getDataViewConfig().load(filePath);
        getOtherConfig().load(filePath);
    }
}
