package com.sevenroad.oas.cache.Imp;

import com.google.gson.Gson;
import com.sevenroad.oas.cache.RedisCache;
import com.sevenroad.oas.cache.RedisProvider;
import com.sevenroad.oas.cache.cacheHandle.*;
import com.sevenroad.oas.cache.model.HandlerContext;
import com.sevenroad.oas.cache.model.TableResultModel;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.imp.SqlDbImp;
import com.sevenroad.oas.dao.imp.SqlProxyImp;
import com.sevenroad.oas.dao.model.*;
import com.sevenroad.oas.web.common.SystemConfig;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.imp.jsonQueryResult;
import com.xiaoleilu.hutool.date.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.DependsOn;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by linlin.zhang on 2017/4/21.
 */
@DependsOn(value = "redisProvider,connectionCache,connectionManager,sqlDbImp")
public class TableResultCache extends RedisCache {
    @Resource
    ConnectionCache connectionCache;
    @Resource
    ConnectionManager connectionManager;
    @Resource
    ColumnNameCache columnNameCache;
    @Resource
    TranslateColumnCache translateColumnCache;
    @Resource
    SqlDbImp sqlDbImp;
    @Resource
    SqlProxyImp sqlProxyImp;
    Logger logger = LoggerFactory.getLogger(TableResultCache.class);
    @Resource
    RedisProvider redisProvider;
    @Resource
    SystemConfig systemConfig;



    Gson gson = new Gson();
    public static String MODULE_K_QUERY = "k:query";


    IHandler[] proxyhandlers = null,ownerHandlers = null;
    protected IHandler[] getProxyhandlers() {
        if (proxyhandlers == null) {
            proxyhandlers = new IHandler[]{new cacheHandler(this), new tableHandler(sqlProxyImp), new transformHandler(columnNameCache, translateColumnCache, systemConfig)};
        }
        return proxyhandlers;
    }

    protected IHandler[] getOwnerHhandlers() {
        if (ownerHandlers == null) {
            ownerHandlers = new IHandler[]{new cacheHandler(this), new QueryHandler(sqlDbImp), new transformHandler(columnNameCache, translateColumnCache, systemConfig)};
        }
        return ownerHandlers;
    }

    public String getTableResult(ExcuteModel excuteModel,Boolean isGetCache){
        try {
            int connectionId = excuteModel.getDataView().getConnectionId();
            if (connectionId == 0) {
                connectionId = connectionCache.getCache(excuteModel.getGameId()).getConnectionId();
                excuteModel.setConnectionId(connectionId);
            }
            excuteModel.setConnectionId(connectionId);
            excuteModel.setConnection(connectionManager.getConnection(connectionId));
            HandlerContext ctx = new HandlerContext();
            ctx.setModel(excuteModel);
            ctx.setTranslateType(1);
            for(int i = 0; i< getOwnerHhandlers().length; i++){
                if(ownerHandlers[i]!=null&& ownerHandlers[i].execute(ctx) == false){
                    break;
                }
            }
            putCache(ctx.getKey(), gson.toJson(ctx.getResult()), excuteModel.getDataView().getCacheTime());
            return Utils.jsonResultGenerate(excuteModel.getDataView(),ctx.getResult().getTables());
        }finally {
            try {
                if (excuteModel.getConnection() != null)
                    excuteModel.getConnection().close();
            }catch (Exception e){
                logger.error("query error : {} ",e);
            }
        }
    }

    public TableResultModel getTableResultModel(ExcuteModel excuteModel,Boolean isGetCache){
        try {
            int connectionId = excuteModel.getDataView().getConnectionId();
            if (connectionId == 0) {
                connectionId = connectionCache.getCache(excuteModel.getGameId()).getConnectionId();
                excuteModel.setConnectionId(connectionId);
            }
            String key = Utils.queryKeyGenerate(excuteModel.getDataView().getDataviewName(), excuteModel.getParams());
            if (containKey(key)) {
                return gson.fromJson(getCache(key), TableResultModel.class);
            }
            TableResultModel model = new TableResultModel();
            excuteModel.setConnection(connectionManager.getConnection(connectionId));
            List<TableResult> results = sqlDbImp.select(excuteModel);
            model.setTables(results);
            model.setKey(key);
            model.setCreateDate(DateUtil.format(Calendar.getInstance().getTime(), DateUtil.NORM_DATETIME_MS_PATTERN));
            return model;
        } finally {
        try {
            if (excuteModel.getConnection() != null)
                excuteModel.getConnection().close();
        }catch (Exception e){
            logger.error("query error : {} ",e);
        }
    }
    }

    public String getTableResultFromProxy(ExcuteModel excuteModel){
        try {
            int connectionId = excuteModel.getDataView().getConnectionId();
            if (connectionId == 0) {
                connectionId = connectionCache.getCache(excuteModel.getGameId()).getConnectionId();
                excuteModel.setConnectionId(connectionId);
            }
            excuteModel.setConnectionId(connectionId);
            excuteModel.setConnection(connectionManager.getConnection(connectionId));
            HandlerContext ctx = new HandlerContext();
            ctx.setModel(excuteModel);
            ctx.setTranslateType(2);
            for(int i = 0; i< getProxyhandlers().length; i++){
                logger.info("handler idle {} - {}:" ,i , System.currentTimeMillis());
                if(proxyhandlers[i]!=null&& proxyhandlers[i].execute(ctx) == false){
                    break;
                }
            }
            if(ctx.getCache() == false){
                putCache(ctx.getKey(),gson.toJson(ctx.getResult()),excuteModel.getDataView().getCacheTime());
            }
            return Utils.jsonResultGenerate(excuteModel.getDataView(),ctx.getResult().getTables());
        }finally {
            try {
                if (excuteModel.getConnection() != null)
                    excuteModel.getConnection().close();
            }catch (Exception e){
                logger.error("query error : {} ",e);
            }
        }
    }

    public List<EffectResult> getEffectResult(ExcuteModel excuteModel){
        try {
            int connectionId = excuteModel.getDataView().getConnectionId();
            if (excuteModel.getConnection() == null) {
                if (connectionId == 0) {
                    connectionId = connectionCache.getCache(excuteModel.getGameId()).getConnectionId();
                }
                excuteModel.setConnection(connectionManager.getConnection(connectionId));
            }
            return sqlDbImp.execute(excuteModel);
        }finally {
            try {
                if (excuteModel.getConnection() != null)
                    excuteModel.getConnection().close();
            } catch (Exception e) {
                logger.error("query error : {} ", e);
            }
        }
    }

    public jsonQueryResult importDataProxy(ExcuteModel excuteModel){
        try{
            int connectionId = excuteModel.getDataView().getConnectionId();
            if (connectionId == 0) {
                connectionId = connectionCache.getCache(excuteModel.getGameId()).getConnectionId();
                excuteModel.setConnectionId(connectionId);
            }
            excuteModel.setConnectionId(connectionId);
            excuteModel.setConnection(connectionManager.getConnection(connectionId));
            excuteModel.setExecuteType(ExcuteModel.ADD_COMMAND);
            HandlerContext ctx = new HandlerContext();
            ctx.setModel(excuteModel);
            ctx.setTranslateType(2);
            for(int i = 0; i< getProxyhandlers().length; i++){
                logger.info("handler idle {} - {}:" ,i , System.currentTimeMillis());
                if(proxyhandlers[i]!=null&& proxyhandlers[i].execute(ctx) == false){
                    break;
                }
            }
            return new jsonQueryResult(Consts.OPERATION_SUCCESSED,Consts.Strings.OPERATION_SUCCESSED,"");
        }catch (Exception ex){
            logger.error("import data has error:{}",ex.getMessage(),ex);
            return new jsonQueryResult(Consts.OPERATION_FAIURE,Consts.Strings.OPERATION_FAIURE,"");
        }finally {
            try {
                if (excuteModel.getConnection() != null)
                    excuteModel.getConnection().close();
            }catch (Exception e){
                logger.error("importdata error : {} ",e);
            }
        }
    }

    @Override
    protected String getKey() {
        return MODULE_K_QUERY;
    }

    @Override
    protected RedisProvider getJedisPool() {
        return redisProvider;
    }

    public void refleshCache() {
        this.clearCache();
    }

}
