package com.sevenroad.oas.task.model;

/**
 * Created by linlin.zhang on 2017/5/15.
 */
public class FiveMinOnlineParams {
    private int connectionId;
    private String apiUrl;
    private String inputTable;
    private int appId;

    private String appSecret;

    public int getConnectionId() {
        return connectionId;
    }

    public void setConnectionId(int connectionId) {
        this.connectionId = connectionId;
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public String getInputTable() {
        return inputTable;
    }

    public void setInputTable(String inputTable) {
        this.inputTable = inputTable;
    }

    public int getAppId() {
        return appId;
    }

    public void setAppId(int appId) {
        this.appId = appId;
    }

    public String getAppSecret() {
        return appSecret;
    }

    public void setAppSecret(String appSecret) {
        this.appSecret = appSecret;
    }
}
