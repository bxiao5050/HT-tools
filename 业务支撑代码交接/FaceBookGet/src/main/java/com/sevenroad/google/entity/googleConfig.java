package com.sevenroad.google.entity;

/**
 * Created by linlin.zhang on 2018/1/15.
 */
public class googleConfig {
    private int id;
    private int appId;
    private String clientCustomId;
    private String clientId;
    private String clientSecrent;
    private String developerToken;
    private String refreshToken;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAppId() {
        return appId;
    }

    public void setAppId(int appId) {
        this.appId = appId;
    }

    public String getClientCustomId() {
        return clientCustomId;
    }

    public void setClientCustomId(String clientCustomId) {
        this.clientCustomId = clientCustomId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecrent() {
        return clientSecrent;
    }

    public void setClientSecrent(String clientSecrent) {
        this.clientSecrent = clientSecrent;
    }

    public String getDeveloperToken() {
        return developerToken;
    }

    public void setDeveloperToken(String developerToken) {
        this.developerToken = developerToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
