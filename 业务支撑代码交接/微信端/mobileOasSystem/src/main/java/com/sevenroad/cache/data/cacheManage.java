package com.sevenroad.cache.data;


import com.sevenroad.dao.data.DataView;
import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;

import java.util.Hashtable;
import java.util.concurrent.ConcurrentHashMap;
/**
 * Created by Administrator on 2016/10/22.
 */
public abstract class cacheManage {
    protected static  CacheManager cacheManager;
    protected CacheManager getCacheManager(){
        if (cacheManager == null)
        {
            cacheManager = CacheManagerBuilder.newCacheManagerBuilder().build();
            cacheManager.init();
        }
        return cacheManager;
    }
    protected abstract Object getCache(String CacheName) throws Exception;
    protected Object getInstance(String CachName) throws Exception {
        if (cacheManager == null)
        {
            cacheManager = CacheManagerBuilder.newCacheManagerBuilder().build();
            cacheManager.init();
        }
        return getCache(CachName);
    }
    public abstract void clearCache() throws Exception;
}
