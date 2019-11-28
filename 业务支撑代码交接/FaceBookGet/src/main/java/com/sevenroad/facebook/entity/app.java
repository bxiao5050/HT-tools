package com.sevenroad.facebook.entity;

/**
 * Created by linlin.zhang on 2017/7/19.
 */
public class app {
    private int appId;
    private String fbAppId;
    private String appSecret;
    private String appName;
    private String fbAccountId;
    private String token;

    public int getAppId() {
        return appId;
    }

    public void setAppId(int appId) {
        this.appId = appId;
    }

    public String getFbAppId() {
        return fbAppId;
    }

    public void setFbAppId(String fbAppId) {
        this.fbAppId = fbAppId;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getFbAccountId() {
        return fbAccountId;
    }

    public void setFbAccountId(String fbAccountId) {
        this.fbAccountId = fbAccountId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getAppSecret() {
        return appSecret;
    }

    public void setAppSecret(String appSecret) {
        this.appSecret = appSecret;
    }
}
