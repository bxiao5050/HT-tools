package com.sevenroad.singleton;

import com.sevenroad.cache.data.*;

/**
 * Created by linlin.zhang on 2016/11/15.
 */
public class CacheSigleton {
    private static queryResultCache queryResultCache = new queryResultCache();
    private static dataViewCache dataViewCache = new dataViewCache();
    private static systemCache  systemCache = new systemCache();
    private static userInfoCache userInfoCache = new userInfoCache();
    private static connectionCache connectionCache = new connectionCache();
    private static bindUserInfoCache bindUserInfoCache = new bindUserInfoCache();
    private static appConfigCache appConfigCache = new appConfigCache();
    public static queryResultCache getQueryResultCache() {
        if(queryResultCache == null)
            queryResultCache = new queryResultCache();
        return queryResultCache;
    }
    public static dataViewCache getDataViewCache(){
        if(dataViewCache == null)
            dataViewCache = new dataViewCache();
        return dataViewCache;
    }
    public static systemCache getSystemCache(){
        if(systemCache == null)
            systemCache = new systemCache();
        return systemCache;
    }
    public static userInfoCache getUserInfoCache(){
        if(userInfoCache == null)
            userInfoCache = new userInfoCache();
        return userInfoCache;
    }
    public static connectionCache getconnectionCache(){
        if(connectionCache == null)
            connectionCache = new connectionCache();
        return connectionCache;
    }

    public static bindUserInfoCache getBindUserInfoCache(){
        if(bindUserInfoCache == null)
            bindUserInfoCache = new bindUserInfoCache();
        return bindUserInfoCache;
    }

    public static appConfigCache getAppConfigCache() {
        if(appConfigCache == null)
            appConfigCache = new appConfigCache();
        return appConfigCache;
    }
}
