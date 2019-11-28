package com.sevenroad.cache.data;

import com.sevenroad.cache.user.queryResultCacheModel;
import com.sevenroad.dao.DBUtils;
import com.sevenroad.dao.data.gameInfo;
import com.sevenroad.dao.data.systemInfo;
import org.ehcache.Cache;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;

/**
 * Created by linlin.zhang on 2016/11/4.
 */
public class systemCache extends cacheManage {
    public gameInfo[] getSystemGame(int system_id) throws Exception{
        systemInfo result = (systemInfo) this.getInstance(String.valueOf(system_id));
        if(result == null){
            Cache<String,systemInfo> cache = getCacheManager().getCache("gameInfoCache",String.class,systemInfo.class);
            cache.clear();
            cache.putAll(DBUtils.getSystemInfo());
            result = cache.get(String.valueOf(system_id));
        }
        return result.gameInfos.toArray(new gameInfo[result.gameInfos.size()]);
    }
    public gameInfo getSystemGame(int system_id,int game_id)throws Exception{
        systemInfo result = (systemInfo) this.getInstance(String.valueOf(system_id));
        if(result == null) {
            Cache<String,systemInfo> cache = getCacheManager().getCache("gameInfoCache",String.class,systemInfo.class);
            cache.clear();
            cache.putAll(DBUtils.getSystemInfo());
            result = cache.get(String.valueOf(system_id));
        }
        if(result == null || result.gameInfos == null) return null;
        for(int i = 0;i<result.gameInfos.size();i++){
            if(result.gameInfos.get(i).getGameid() == game_id)
                return result.gameInfos.get(i);
        }
        return null;
    }

    @Override
    protected Object getCache(String CacheName) throws Exception {
        Cache<String,systemInfo> cache = getCacheManager().getCache("gameInfoCache",String.class,systemInfo.class);
        if(cache  == null){
          cache =  getCacheManager().createCache("gameInfoCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,systemInfo.class, ResourcePoolsBuilder.heap(128)).build());
          cache.putAll(DBUtils.getSystemInfo());
        }
        return cache.get(CacheName);
    }

    @Override
    public void clearCache() {
        Cache<String,systemInfo> cache = getCacheManager().getCache("gameInfoCache",String.class,systemInfo.class);
        if(cache  == null){
            cache =  getCacheManager().createCache("gameInfoCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,systemInfo.class, ResourcePoolsBuilder.heap(128)).build());
        }
        else cache.clear();
    }
}
