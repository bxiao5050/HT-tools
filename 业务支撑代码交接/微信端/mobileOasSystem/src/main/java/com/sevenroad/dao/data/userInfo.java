package com.sevenroad.dao.data;

import javax.print.DocFlavor;

/**
 * Created by linlin.zhang on 2016/11/23.
 */
public class userInfo {
    private String uniteId;
    private String openId;
    private String WxUserName;
    private String userName;
    private String safeCode;
    public userInfo(String uniteId,String openId,String wxUserName,String userName,String safeCode){
        this.uniteId = uniteId;
        this.openId = openId;
        this.WxUserName = wxUserName;
        this.userName = userName;
        this.safeCode = safeCode;
    }
    public void setSafeCode(String safeCode){
        this.safeCode = safeCode;
    }
    public String getUniteId(){
        return uniteId;
    }
    public String getOpenId(){
        return openId;
    }
    public String getWxUserName(){
        return WxUserName;
    }
    public String getUserName(){
        return userName;
    }
    public String getSafeCode(){return safeCode;}
}
