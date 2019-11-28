package com.sevenroad.cache.data;

import com.sevenroad.cache.user.dataviewCacheModel;
import com.sevenroad.dao.DBUtils;
import com.sevenroad.dao.connection.DBType;
import com.sevenroad.dao.connection.SystemConnection;
import com.sevenroad.dao.data.DataView;
import com.sevenroad.utils.LogUtils;
import com.sevenroad.utils.data.DataTable;
import org.ehcache.Cache;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;

import java.util.HashMap;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/10/28.
 */
public class dataViewCache extends cacheManage {
    public DataView getDataView(String dataview) throws Exception{
        dataviewCacheModel result = (dataviewCacheModel) this.getInstance(DBType.getTypeName(DBType.MSSQL));
        if(result == null) {
            Cache<String, dataviewCacheModel> myCache = getCacheManager().getCache("dataViewCache",String.class,dataviewCacheModel.class);
            if(myCache == null)
                  myCache = getCacheManager().createCache("dataViewCache",
                         CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,dataviewCacheModel.class, ResourcePoolsBuilder.heap(10)).build());
            HashMap<String,dataviewCacheModel> dataviewList = new HashMap<String,dataviewCacheModel> ();
            //添加pg脚本
            dataviewList.put(DBType.getTypeName(DBType.MSSQL),new dataviewCacheModel(DBType.MSSQL,DBUtils.getDataView()));
            dataviewList.put(DBType.getTypeName(DBType.PGSQL),new dataviewCacheModel(DBType.PGSQL,DBUtils.getDataViewFromPG()));
            //添加MSSQL脚本
            myCache.putAll(dataviewList);
            result = myCache.get(DBType.getTypeName(DBType.MSSQL));
        }
        return result.getDataView(dataview);
    }
    public DataView getDataView(String dataview,int dbType) throws Exception{
        dataviewCacheModel result = (dataviewCacheModel) this.getInstance(DBType.getTypeName(dbType));
        if(result == null) {
            Cache<String, dataviewCacheModel> myCache = getCacheManager().getCache("dataViewCache",String.class,dataviewCacheModel.class);
            if(myCache == null)
                myCache = getCacheManager().createCache("dataViewCache",
                        CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class,dataviewCacheModel.class, ResourcePoolsBuilder.heap(10)).build());
            HashMap<String,dataviewCacheModel> dataviewList = new HashMap<String,dataviewCacheModel> ();
            //添加pg脚本
            dataviewList.put(DBType.getTypeName(DBType.MSSQL),new dataviewCacheModel(DBType.MSSQL,DBUtils.getDataView()));
            dataviewList.put(DBType.getTypeName(DBType.PGSQL),new dataviewCacheModel(DBType.PGSQL,DBUtils.getDataViewFromPG()));
            //添加MSSQL脚本
            myCache.putAll(dataviewList);
            result = myCache.get(DBType.getTypeName(dbType));
        }
        return result.getDataView(dataview);
    }
    @Override
    protected Object getCache(String CacheName) {
        Cache<String,dataviewCacheModel> cache = cacheManager.getCache("dataViewCache",String.class,dataviewCacheModel.class);
        if(cache  == null)
            return null;
        else
             return cache.get(CacheName);
    }

    @Override
    public void clearCache() throws Exception{
            Cache<String, dataviewCacheModel> myCache = getCacheManager().getCache("dataViewCache", String.class, dataviewCacheModel.class);
            if (myCache == null)
                myCache = getCacheManager().createCache("dataViewCache",
                        CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class, dataviewCacheModel.class, ResourcePoolsBuilder.heap(10)).build());
            else myCache.clear();
            HashMap<String, dataviewCacheModel> dataviewList = new HashMap<String, dataviewCacheModel>();
            //添加pg脚本
            dataviewList.put(DBType.getTypeName(DBType.MSSQL), new dataviewCacheModel(DBType.MSSQL, DBUtils.getDataView()));
            dataviewList.put(DBType.getTypeName(DBType.PGSQL), new dataviewCacheModel(DBType.PGSQL, DBUtils.getDataViewFromPG()));
            //添加MSSQL脚本
            myCache.putAll(dataviewList);
    }
}
