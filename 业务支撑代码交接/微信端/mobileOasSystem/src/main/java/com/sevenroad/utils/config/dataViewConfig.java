package com.sevenroad.utils.config;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by linlin.zhang on 2016/11/4.
 */
public class dataViewConfig implements configHandle {
    private boolean isloaded = false;
    public String sysGetDataView;
    public String sysGetGameConfig;
    public String sysGetPGDataView;
    public String sysGetConnection;
    public String sysGetUserInfo;
    public String sysAddWxUser;
    public String sysReleaseUser;
    public String sysEnableUser;
    public String sysChangePwd;
    public String sysGetGameChannel;
    @Override
    public boolean isloaded() {
        return isloaded;
    }

    @Override
    public void load(String filePath) {
        Properties pros = new Properties();
        try {
            InputStream is = new FileInputStream(filePath);
            pros.load(is);
            this.sysGetDataView = pros.getProperty("sysGetDataView");
            this.sysGetGameConfig = pros.getProperty("sysGetGameConfig");
            this.sysGetConnection = pros.getProperty("sysGetConnection");
            this.sysGetUserInfo = pros.getProperty("sysGetUserInfo");
            this.sysAddWxUser = pros.getProperty("sysAddWxUser");
            this.sysReleaseUser =  pros.getProperty("sysReleaseUser");
            this.sysGetPGDataView = pros.getProperty("sysGetPGDataView");
            this.sysEnableUser = pros.getProperty("sysEnableUser");
            this.sysChangePwd = pros.getProperty("sysChangePwd");
            this.sysGetGameChannel = pros.getProperty("sysGetGameChannel");
            isloaded = true;
            is.close();
        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
        }
    }
}
