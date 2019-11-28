package com.sevenroad.cache.data;

import com.sevenroad.cache.user.bindUserCacheModel;
import com.sevenroad.dao.data.userInfo;
import com.sevenroad.utils.exception.userPermException;
import org.ehcache.Cache;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;

import java.util.Iterator;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * Created by linlin.zhang on 2016/12/29.
 */
public class bindUserInfoCache  extends cacheManage   {
    public bindUserCacheModel getBindUserMode(String key) throws Exception{
        bindUserCacheModel result = (bindUserCacheModel) this.getInstance(key);
        return result;
    }
    public String addbindUserInfo(String accessToken,userInfo oldUser,userInfo newUser) throws Exception{
        String key = UUID.randomUUID().toString();
        Cache<String,bindUserCacheModel> cache = cacheManager.getCache("bindUserCache",String.class,bindUserCacheModel.class);
        if(cache  == null)
            cache = getCacheManager().createCache("bindUserCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class, bindUserCacheModel.class, ResourcePoolsBuilder.heap(10)).withExpiry(Expirations.timeToIdleExpiration(Duration.of(5, TimeUnit.MINUTES))).build());
        Iterator<Cache.Entry<String,bindUserCacheModel>> users = cache.iterator();
        bindUserCacheModel result = null;
        while (users.hasNext()) {
            result = users.next().getValue();
            if (result.getNewUser().getUserName().compareTo(newUser.getUserName()) == 0){
                throw new userPermException(userPermException.BINDING_USER);
            }
        }
        cache.put(key,new bindUserCacheModel(accessToken,oldUser,newUser));
        return key;
    }
    public void removeBindUserInfo(String key){
        Cache<String,bindUserCacheModel> cache = cacheManager.getCache("bindUserCache",String.class,bindUserCacheModel.class);
        if(cache  == null)
            cache = getCacheManager().createCache("bindUserCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class, bindUserCacheModel.class, ResourcePoolsBuilder.heap(10)).withExpiry(Expirations.timeToIdleExpiration(Duration.of(5, TimeUnit.MINUTES))).build());
        cache.remove(key);
    }
    @Override
    protected Object getCache(String CacheName) {
        Cache<String,bindUserCacheModel> cache = cacheManager.getCache("bindUserCache",String.class,bindUserCacheModel.class);
        if(cache  == null)
            cache = getCacheManager().createCache("bindUserCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class, bindUserCacheModel.class, ResourcePoolsBuilder.heap(10)).withExpiry(Expirations.timeToIdleExpiration(Duration.of(5, TimeUnit.MINUTES))).build());
        return cache.get(CacheName);
    }

    @Override
    public void clearCache() throws Exception{
        Cache<String, bindUserCacheModel> myCache = getCacheManager().getCache("bindUserCache", String.class, bindUserCacheModel.class);
        if (myCache == null)
            myCache = getCacheManager().createCache("bindUserCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class, bindUserCacheModel.class, ResourcePoolsBuilder.heap(10)).withExpiry(Expirations.timeToIdleExpiration(Duration.of(5, TimeUnit.MINUTES))).build());
        else
        myCache.clear();
    }
}
