package com.sevenroad.cache.data;

import com.sevenroad.cache.user.queryResultCacheModel;
import com.sevenroad.dao.DBUtils;
import com.sevenroad.dao.data.DataView;
import com.sevenroad.utils.LogUtils;
import com.sevenroad.utils.data.DataTable;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.paramsList;
import org.ehcache.Cache;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;

import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

import static org.ehcache.xml.model.TimeUnit.*;

/**
 * Created by linlin.zhang on 2016/10/28.
 */
public class queryResultCache extends cacheManage {
    public String  createQueryResultKey(String dataview, paramsList params){
        String paramString ="s" + params.getSystem_id()+"g"+params.getGame_id();
        if(params == null || params.getParams().length == 0) return  dataview;
        for(int i = 0;i<params.getParams().length;i++){
            paramString+=','+params.getParams()[i].getParamName()+ params.getParams()[i].getStringValue();
        }
        return dataview+paramString;
    }
    public LinkedList<DataTable> getQueryResult(DataView dataview,paramsList params) throws Exception{
        String key = createQueryResultKey(dataview.getDataViewName(),params);
        queryResultCacheModel result = (queryResultCacheModel) this.getInstance(key);
        //没有查询缓存
        System.out.println("Cache key:"+key);
        if(result == null){
            Cache<String, queryResultCacheModel> myCache  = getCacheManager().getCache("queryResultCache",String.class,queryResultCacheModel.class);
            //缓存未建立
            if(myCache == null) myCache = getCacheManager().createCache("queryResultCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,queryResultCacheModel.class, ResourcePoolsBuilder.heap(1024)).
                            withExpiry(Expirations.timeToIdleExpiration(Duration.of(1, TimeUnit.DAYS))).build());
            LinkedList<DataTable> dataTables = DBUtils.getQueryResult(dataview,params);
            result = new queryResultCacheModel(dataview.getExpiredTime(),dataTables);
            myCache.put(key,result);

        } else{//有缓存
            //过期
            if(Calendar.getInstance().getTimeInMillis() - result.getExpiredTime().getTimeInMillis() >= 0){
                LinkedList<DataTable> dataTables = DBUtils.getQueryResult(dataview,params);
                Cache<String, queryResultCacheModel> myCache  = getCacheManager().getCache("queryResultCache",String.class,queryResultCacheModel.class);
                result = new queryResultCacheModel(dataview.getExpiredTime(),dataTables);
                myCache.replace(key,result);
            }
        }
        return result.getQueryResult();
    }

    @Override
    protected Object getCache(String CacheName) {
        //取缓存
        Cache<String,queryResultCacheModel> cache = getCacheManager().getCache("queryResultCache",String.class,queryResultCacheModel.class);
        //无缓存
        if(cache  == null)
            return null;
        else//有缓存无查询
            return cache.get(CacheName);
    }
    @Override
    public void clearCache() {
        Cache<String, queryResultCacheModel> myCache = getCacheManager().getCache("queryResultCache",String.class,queryResultCacheModel.class);
        if(myCache == null)
            myCache = getCacheManager().createCache("queryResultCache",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,queryResultCacheModel.class, ResourcePoolsBuilder.heap(1024))
                            .withExpiry(Expirations.timeToIdleExpiration(Duration.of(1, TimeUnit.DAYS))).build());
        else myCache.clear();
    }
}
