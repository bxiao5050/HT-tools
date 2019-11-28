package com.sevenroad.oas.mail.task;

import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.ExcuteProxy;
import com.sevenroad.oas.mail.task.bean.DayReport;
import com.sevenroad.oas.mail.task.bean.TotalReport;
import com.sevenroad.oas.web.common.SystemConfig;
import org.apache.commons.collections4.Get;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.concurrent.Callable;

/**
 * Created by linlin.zhang on 2018/3/13/013.
 */
public class GetTotalDataTask implements Callable<List<TotalReport>> {
    Logger logger = LoggerFactory.getLogger(GetTotalDataTask.class);

    DataViewCache dataViewCache;

    TableResultCache tableResultCache;

    SystemConfig systemConfig;

    Gson gson;

    private String countDate;
    private String gameIds;
    public GetTotalDataTask(DataViewCache dataViewCache,TableResultCache tableResultCache,SystemConfig systemConfig,Gson gson,String gameId,String countDate){
        this.dataViewCache = dataViewCache;
        this.tableResultCache = tableResultCache;
        this.systemConfig = systemConfig;
        this.gson = gson;
        this.countDate = countDate;
        this.gameIds = gameId;
    }

    @Override
    public List<TotalReport> call() throws Exception {
        logger.info("----------------------start getTotalDataTask--------------------");
        DataView dataView = dataViewCache.getCache("fn_mail_get_total");
        List<DBParam> paramList = Lists.newArrayList();
        paramList.add(new DBParam(DBParam.DATE_PARAM,"in_end_date",countDate));
        paramList.add(new DBParam(DBParam.DATE_PARAM,"in_game_id",gameIds));
        ExcuteProxy query = new ExcuteProxy(dataView,0,paramList);
        query.setDataProviderUrl(systemConfig.getDataProviderUrl());
        String result = tableResultCache.getTableResultFromProxy(query);
        JsonParser parser = new JsonParser();
        JsonElement data = parser.parse(result).getAsJsonArray().get(0).getAsJsonArray();
        List<TotalReport> list = gson.fromJson(data.toString(),new TypeToken<List<TotalReport>>() {
        }.getType());
        logger.info(result);
        logger.info("----------------------end getTotalDataTask--------------------");
        return list;
    }
}
