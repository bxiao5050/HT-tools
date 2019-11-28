package com.sevenroad.services;

import com.sevenroad.facebook.service.*;
import com.sevenroad.google.service.GoogleConfigService;


/**
 * Created by linlin.zhang on 2017/7/20.
 */
public class serviceFactory {
    private static adService adService;
    private static adsetService adsetService;
    private static campaignService campaignService;
    private static dbService dbService;
    private static recordService recordService;

    private static GoogleConfigService googleConfigService;

    public static adService getAdService() {
        if(adService == null)
            adService = new adService();
        return adService;
    }

    public static adsetService getAdsetService() {
        if(adService == null)
            adsetService = new adsetService();
        return adsetService;
    }

    public static campaignService getCampaignService() {
        if(campaignService == null)
            campaignService = new campaignService();
        return campaignService;
    }

    public static dbService getDbService() {
        if(dbService == null)
            dbService = new dbService();
        return dbService;
    }

    public static recordService getRecordService() {
        if(recordService == null)
            recordService = new recordService();
        return recordService;
    }

    public static GoogleConfigService getGoogleConfigService() {
        if(googleConfigService == null)
            googleConfigService = new GoogleConfigService();
        return googleConfigService;
    }
}
