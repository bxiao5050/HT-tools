package com.sevenroad.oas.mail.task;

import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.ExcuteProxy;
import com.sevenroad.oas.mail.task.bean.AppReport;
import com.sevenroad.oas.mail.task.bean.DayReport;
import com.sevenroad.oas.web.common.SystemConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.concurrent.Callable;

/**
 * Created by linlin.zhang on 2018/3/19/019.
 */
public class GetGameAppTask implements Callable<List<AppReport>> {

    Logger logger = LoggerFactory.getLogger(GetGameAppTask.class);

    DataViewCache dataViewCache;

    TableResultCache tableResultCache;

    SystemConfig systemConfig;

    String gameIds;

    Gson gson;

    public GetGameAppTask(DataViewCache dataViewCache,TableResultCache tableResultCache,SystemConfig systemConfig,Gson gson,String gameIds){
        this.dataViewCache = dataViewCache;
        this.tableResultCache = tableResultCache;
        this.systemConfig = systemConfig;
        this.gson = gson;
        this.gameIds = gameIds;
    }

    @Override
    public List<AppReport> call() throws Exception {
        logger.info("----------------------start GetGameAppTask--------------------");
        DataView dataView = dataViewCache.getCache("t_c_area_app");
        List<DBParam> paramList = Lists.newArrayList();
        paramList.add(new DBParam(DBParam.DATE_PARAM,"gameIds",gameIds));
        ExcuteProxy query = new ExcuteProxy(dataView,0,paramList);
        query.setDataProviderUrl(systemConfig.getDataProviderUrl());
        String result = tableResultCache.getTableResultFromProxy(query);
        JsonParser parser = new JsonParser();
        JsonElement data = parser.parse(result).getAsJsonArray().get(0).getAsJsonArray();
        List<AppReport> list = gson.fromJson(data.toString(),new TypeToken<List<AppReport>>() {
        }.getType());
        logger.info(result);
        logger.info("----------------------end GetGameAppTask--------------------");
        return list;
    }
}
