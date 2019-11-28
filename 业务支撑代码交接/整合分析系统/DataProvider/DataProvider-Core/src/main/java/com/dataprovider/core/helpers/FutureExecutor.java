package com.dataprovider.core.helpers;

import com.dataprovider.core.model.InputModel;
import com.dataprovider.core.utils;
import com.dataprovider.dao.CustomDBQuery;
import com.dataprovider.dao.DaoFactory;
import com.dataprovider.dao.entitys.Cache;
import com.dataprovider.dao.mappers.CacheMapper;
import com.dataprovider.dao.models.IntergrateTable;
import com.dataprovider.dao.models.Table;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;
import com.xiaoleilu.hutool.crypto.SecureUtil;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.json.JSONUtil;
import org.apache.ibatis.session.SqlSession;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by linlin.zhang on 2017/7/31.
 */
public class FutureExecutor {
    private static ExecutorService executor = Executors.newCachedThreadPool();
    private static ListeningExecutorService service =  MoreExecutors.listeningDecorator(Executors.newFixedThreadPool(20));
    public static ListenableFuture<String>   updateCache(final String cacheId, final InputModel inputModel){
       return service.submit(new Callable<String>() {
            @Override
            public String call() throws Exception {
                SqlSession session = DaoFactory.getInstance(0);
                SqlSession source = DaoFactory.getInstance(inputModel.getConnectionId());
                try {
                    CacheMapper mapper = session.getMapper(CacheMapper.class);
                    CustomDBQuery query = new CustomDBQuery(source);
                    List<Table> result = query.GetQueryResult(inputModel.getExecuteCommand());
                    Cache cache = mapper.selectById(cacheId);
                    String jsonResult = utils.TableToJson(result);
                    if(cache == null) {
                        cache = new Cache();
                        cache.setCacheId(cacheId);
                        cache.setExecuteResult(jsonResult);
                        cache.setUpdateCount(1);
                        cache.setCacheType(inputModel.getType());
                        cache.setCommand(inputModel.getExecuteCommand());
                        cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                        cache.setChangeId(SecureUtil.md5(jsonResult));
                        cache.setConnectionId(inputModel.getConnectionId());
                        mapper.insert(cache);
                    }else {
                        cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                        cache.setUpdateCount(cache.getUpdateCount()+1);
                        String changeId = SecureUtil.md5(jsonResult);
                        if(changeId.equals(cache.getChangeId()) == false){
                            cache.setChangeId(changeId);
                            cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                            cache.setExecuteResult(jsonResult);
                        }
                        mapper.updateById(cache);
                    }
                    return jsonResult;
                }
                finally {
                    session.close();
                    source.close();
                }
            }
        });
    }

    public static ListenableFuture<String>  updateForeignCache(final String cacheId, final InputModel inputModel){
        return service.submit(new Callable<String>(){
            @Override
            public String call() throws Exception {
                SqlSession session = DaoFactory.getInstance(0);
                SqlSession source = DaoFactory.getInstance(inputModel.getConnectionId());
                try {
                    CacheMapper mapper = session.getMapper(CacheMapper.class);
                    CustomDBQuery query = new CustomDBQuery(source);
                    List<Table> result = query.GetQueryResult(inputModel.getExecuteCommand());
                    Cache cache = mapper.selectById(cacheId);
                    String jsonResult = utils.TableToRows(result);
                    if(cache == null) {
                        cache = new Cache();
                        cache.setCacheId(cacheId);
                        cache.setExecuteResult(jsonResult);
                        cache.setUpdateCount(1);
                        cache.setCacheType(inputModel.getType());
                        cache.setCommand(inputModel.getExecuteCommand());
                        cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                        cache.setChangeId(SecureUtil.md5(jsonResult));
                        cache.setConnectionId(inputModel.getConnectionId());
                        mapper.insert(cache);
                    }else {
                        cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                        cache.setUpdateCount(cache.getUpdateCount()+1);
                        String changeId = SecureUtil.md5(jsonResult);
                        if(changeId.equals(cache.getChangeId()) == false){
                            cache.setChangeId(changeId);
                            cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                            cache.setExecuteResult(jsonResult);
                        }
                        mapper.updateById(cache);
                    }
                    return jsonResult;
                }
                finally {
                    session.close();
                    source.close();
                }

            }
        });
    }

    public static ListenableFuture<String> updateIntergrateCache(final String cacheId, final InputModel inputModel){
        return service.submit(new Callable<String>(){
            @Override
            public String call() throws Exception {
                SqlSession session = DaoFactory.getInstance(0);
                SqlSession source = DaoFactory.getInstance(inputModel.getConnectionId());
                try {
                    CacheMapper mapper = session.getMapper(CacheMapper.class);
                    CustomDBQuery query = new CustomDBQuery(source);
                    List<IntergrateTable> result = query.GetIntergrateResult(inputModel.getExecuteCommand());
                    Cache cache = mapper.selectById(cacheId);
                    String jsonResult = JSONUtil.toJsonStr(result);
                    if(cache == null) {
                        cache = new Cache();
                        cache.setCacheId(cacheId);
                        cache.setExecuteResult(jsonResult);
                        cache.setUpdateCount(1);
                        cache.setCommand(inputModel.getExecuteCommand());
                        cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                        cache.setChangeId(SecureUtil.md5(jsonResult));
                        cache.setConnectionId(inputModel.getConnectionId());
                        mapper.insert(cache);
                    }else {
                        cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                        cache.setUpdateCount(cache.getUpdateCount()+1);
                        String changeId = SecureUtil.md5(jsonResult);
                        if(changeId.equals(cache.getChangeId()) == false){
                            cache.setChangeId(changeId);
                            cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                            cache.setExecuteResult(jsonResult);
                        }
                        mapper.updateById(cache);
                    }
                    return jsonResult;
                }
                finally {
                    session.close();
                    source.close();
                }

            }
        });
    }
}
