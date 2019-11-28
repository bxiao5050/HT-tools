package com.sevenroad.cache.data;

import com.sevenroad.cache.user.queryResultCacheModel;
import com.sevenroad.dao.DBUtils;
import com.sevenroad.utils.exception.userPermException;
import org.ehcache.Cache;
import org.ehcache.CacheManager;
import com.sevenroad.dao.data.userInfo;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;

import java.util.Iterator;

/**
 * Created by linlin.zhang on 2016/11/23.
 */
public class userInfoCache extends cacheManage  {
    @Override
    public void clearCache() {
        Cache<String,userInfo> cache = getCacheManager().getCache("gameInfoCache",String.class,userInfo.class);
        if(cache  == null){
            cache =  getCacheManager().createCache("gameInfoCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,userInfo.class, ResourcePoolsBuilder.heap(1024)).build());
        }
        else cache.clear();
    }

    @Override
    protected Object getCache(String CacheName) throws Exception {
        //取缓存
        Cache<String,userInfo> cache = getCacheManager().getCache("userInfoCache",String.class,userInfo.class);
        //无缓存
        if(cache  == null) {
            cache =  getCacheManager().createCache("userInfoCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,userInfo.class, ResourcePoolsBuilder.heap(1024)).build());
            cache.putAll(DBUtils.getUserInfo());
        }
        return   cache.get(CacheName);
    }
    public userInfo getUserInfo(String unite_id)throws Exception {
        userInfo result = (userInfo)this.getInstance(unite_id);
        if(result == null) {
            Cache<String,userInfo> cache = getCacheManager().getCache("userInfoCache",String.class,userInfo.class);
            cache.clear();
            cache.putAll(DBUtils.getUserInfo());
            result = cache.get(unite_id);
        }
        return result;
    }
    public userInfo delete(String unite_id) throws Exception{
        userInfo result = (userInfo)this.getInstance(unite_id);
        Cache<String,userInfo> cache = getCacheManager().getCache("userInfoCache",String.class,userInfo.class);
        cache.remove(unite_id);
        if(result == null) {
            throw new userPermException(userPermException.UN_BIND_USER);
        }
        return result;
    }

    /**
     *
     * @param user_name
     * @return 存在返回用户信息，不存在返回null
     * @throws Exception
     */
    public userInfo get(String user_name)throws Exception{
        Cache<String,userInfo> cache = getCacheManager().getCache("userInfoCache",String.class,userInfo.class);
        if(cache == null){
            cache =  getCacheManager().createCache("userInfoCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,userInfo.class, ResourcePoolsBuilder.heap(1024)).build());
            cache.putAll(DBUtils.getUserInfo());
        }
        Iterator<Cache.Entry<String,userInfo>> users = cache.iterator();
        userInfo result = null;
        while (users.hasNext()) {
            result = users.next().getValue();
            if (result.getUserName().compareTo(user_name) == 0){
                return result;
            }
        }
        return null;
    }
}
