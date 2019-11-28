package com.sevenroad.cache.data;

import com.sevenroad.dao.DBUtils;
import org.ehcache.Cache;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;

/**
 * Created by linlin.zhang on 2017/1/4.
 */
public class channelCache extends cacheManage  {
    protected Object getCache(String CacheName) throws Exception {
        Cache<String,String> cache = getCacheManager().getCache("channelInfoCache",String.class,String.class);
        if(cache  == null){
            cache =  getCacheManager().createCache("channelInfoCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,String.class, ResourcePoolsBuilder.heap(128)).build());
            cache.putAll(DBUtils.getChannel());
        }
        return cache.get(CacheName);
    }
    public String getChannel(String game_id) throws Exception{
        String result = (String) this.getInstance(game_id);
        if(result == null){
            Cache<String,String> cache = getCacheManager().getCache("channelInfoCache",String.class,String.class);
            cache.clear();
            cache.putAll(DBUtils.getChannel());
        }
        return result;
    }
    @Override
    public void clearCache() throws Exception {
        Cache<String,String> cache = getCacheManager().getCache("channelInfoCache",String.class,String.class);
        if(cache  == null){
            cache =  getCacheManager().createCache("channelInfoCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,String.class, ResourcePoolsBuilder.heap(128)).build());
            cache.putAll(DBUtils.getChannel());
        }
        else cache.clear();
    }
}
