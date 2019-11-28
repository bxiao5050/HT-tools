package com.sevenroad.cache.data;

import com.sevenroad.dao.DBUtils;
import com.sevenroad.dao.data.appConfig;
import com.sevenroad.dao.data.userInfo;
import com.sevenroad.utils.LogUtils;
import com.sevenroad.utils.Logger;
import org.ehcache.Cache;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;

/**
 * Created by linlin.zhang on 2018/1/30.
 */
public class appConfigCache extends cacheManage {
    @Override
    protected Object getCache(String CacheName) throws Exception {
        //取缓存
        Cache<String,appConfig> cache = getCacheManager().getCache("appConfigCache",String.class,appConfig.class);
        //无缓存
        if(cache  == null) {
            cache =  getCacheManager().createCache("appConfigCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,appConfig.class, ResourcePoolsBuilder.heap(1024)).build());
            cache.putAll(DBUtils.getAppConfig());
        }
        return   cache.get(CacheName);
    }

    public appConfig getAppConfig(String appId){
        try {
            return (appConfig) this.getInstance(appId);
        }catch (Exception e){
            Logger.getInstance().Error(e);
        }
        return null;
    }

    @Override
    public void clearCache() throws Exception {
        Cache<String,appConfig> cache = getCacheManager().getCache("appConfigCache",String.class,appConfig.class);
        if(cache  == null){
            cache =  getCacheManager().createCache("appConfigCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,appConfig.class, ResourcePoolsBuilder.heap(1024)).build());
        }
        else cache.clear();
    }
}
