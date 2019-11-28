package com.sevenroad.facebook.entity;

import java.sql.Date;

/**
 * Created by linlin.zhang on 2017/7/21.
 */
public class record {
    private Date countDate;
    private int appId;
    private String adId;
    private String adName;
    private String adSetId;
    private String adSetName;
    private String campaignId;
    private String campaignName;
    private String country;
    private String region;
    private int mobileAppInstall = 0;
    private int mobileAppRegistration = 0;
    private double spend = 0;
    private double impressions = 0;
    private double uniqueImpressions = 0;
    private double clicks = 0;

    public Date getCountDate() {
        return countDate;
    }

    public void setCountDate(Date countDate) {
        this.countDate = countDate;
    }

    public int getAppId() {
        return appId;
    }

    public void setAppId(int appId) {
        this.appId = appId;
    }

    public String getAdId() {
        return adId;
    }

    public void setAdId(String adId) {
        this.adId = adId;
    }

    public String getAdName() {
        return adName;
    }

    public void setAdName(String adName) {
        this.adName = adName;
    }

    public String getAdSetId() {
        return adSetId;
    }

    public void setAdSetId(String adSetId) {
        this.adSetId = adSetId;
    }

    public String getAdSetName() {
        return adSetName;
    }

    public void setAdSetName(String adSetName) {
        this.adSetName = adSetName;
    }

    public String getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(String campaignId) {
        this.campaignId = campaignId;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public String getCampaignName() {
        return campaignName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getMobileAppInstall() {
        return mobileAppInstall;
    }

    public void setMobileAppInstall(int mobileAppInstall) {
        this.mobileAppInstall = mobileAppInstall;
    }

    public int getMobileAppRegistration() {
        return mobileAppRegistration;
    }

    public void setMobileAppRegistration(int mobileAppRegistration) {
        this.mobileAppRegistration = mobileAppRegistration;
    }

    public double getSpend() {
        return spend;
    }

    public void setSpend(double spend) {
        this.spend = spend;
    }

    public double getImpressions() {
        return impressions;
    }

    public void setImpressions(double impressions) {
        this.impressions = impressions;
    }

    public double getUniqueImpressions() {
        return uniqueImpressions;
    }

    public void setUniqueImpressions(double uniqueImpressions) {
        this.uniqueImpressions = uniqueImpressions;
    }

    public double getClicks() {
        return clicks;
    }

    public void setClicks(double clicks) {
        this.clicks = clicks;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
}
