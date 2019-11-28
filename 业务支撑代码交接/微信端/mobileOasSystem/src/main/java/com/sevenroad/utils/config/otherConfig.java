package com.sevenroad.utils.config;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

/**
 * Created by linlin.zhang on 2016/11/21.
 */
public class otherConfig implements  configHandle {
    private boolean isloaded = false;
    public String permUrl;
    public String referer;
    public List<String> permList;
    public List<String> grepSQL;
    public List<String> sendErrorUser;
    public String wx_app_id;
    public String wx_appsecret;
    public String wx_token;
    public String wx_EncodingAESKey;
    public String wxBindPage;
    public String userLoginPage;
    public String bindConfirePage;
    public String exportExcel;
    public String wxAdminUser;
    public String PermissUrl;
    public String exportReport;
    public String exportUrl;
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
            this.permUrl = pros.getProperty("permUrl");
            this.referer = pros.getProperty("referer");
            this.wx_app_id = pros.getProperty("wx_app_id");
            this.wx_appsecret = pros.getProperty("wx_appsecret");
            this.wx_token = pros.getProperty("wx_token");
            this.wxBindPage = pros.getProperty("wxBindPage");
            this.wx_EncodingAESKey = pros.getProperty("wx_EncodingAESKey");
            this.userLoginPage = pros.getProperty("userLoginPage");
            this.bindConfirePage = pros.getProperty("bindConfirePage");
            this.exportExcel = pros.getProperty("exportExcel");
            this.PermissUrl = pros.getProperty("PermissUrl");
            this.wxAdminUser = pros.getProperty("wxAdminUser");
            this.exportReport = pros.getProperty("exportReport");
            this.exportUrl = pros.getProperty("exportUrl");
            this.permList = Arrays.asList(pros.getProperty("permList").split(","));
            this.grepSQL =  Arrays.asList(pros.getProperty("sqlKey").split(","));
            this.sendErrorUser =  Arrays.asList(pros.getProperty("sendErrorUser").split(","));
            isloaded = true;
            is.close();
        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
        }
    }
}
