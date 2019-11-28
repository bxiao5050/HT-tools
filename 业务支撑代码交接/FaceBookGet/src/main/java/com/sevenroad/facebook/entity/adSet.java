package com.sevenroad.facebook.entity;

import java.sql.Date;

/**
 * Created by linlin.zhang on 2017/7/20.
 */
public class adSet {
    private int appId;
    private String campaignId;
    private String fbAppId;
    private String userOs;
    private String adsetId;
    private String adsetName;
    private Date createTime;
    private String status;

    public int getAppId() {
        return appId;
    }

    public void setAppId(int appId) {
        this.appId = appId;
    }

    public String getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(String campaignId) {
        this.campaignId = campaignId;
    }

    public String getFbAppId() {
        return fbAppId;
    }

    public void setFbAppId(String fbAppId) {
        this.fbAppId = fbAppId;
    }

    public String getUserOs() {
        return userOs;
    }

    public void setUserOs(String userOs) {
        this.userOs = userOs;
    }

    public String getAdsetId() {
        return adsetId;
    }

    public void setAdsetId(String adsetId) {
        this.adsetId = adsetId;
    }

    public String getAdsetName() {
        return adsetName;
    }

    public void setAdsetName(String adsetName) {
        this.adsetName = adsetName;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
