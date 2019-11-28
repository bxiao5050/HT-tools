package com.sevenroad.oas.mail.task;

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
import com.sevenroad.oas.mail.task.bean.DayReport;
import com.sevenroad.oas.mail.task.bean.MediaReport;
import com.sevenroad.oas.web.common.SystemConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.concurrent.Callable;

/**
 * Created by linlin.zhang on 2018/3/16/016.
 */
public class GetMediaDataTask implements Callable<List<MediaReport>> {
    Logger logger = LoggerFactory.getLogger(GetTotalDataTask.class);

    DataViewCache dataViewCache;

    TableResultCache tableResultCache;

    SystemConfig systemConfig;

    private String gameId;
    private String countDate;

    Gson gson;

    public GetMediaDataTask(DataViewCache dataViewCache,TableResultCache tableResultCache,SystemConfig systemConfig,Gson gson,String countDate,String gameId){
        this.dataViewCache = dataViewCache;
        this.tableResultCache = tableResultCache;
        this.systemConfig = systemConfig;
        this.gson = gson;
        this.countDate = countDate;
        this.gameId = gameId;
    }

    @Override
    public List<MediaReport> call() throws Exception {
        logger.info("----------------------start GetMediaDataTask--------------------");
        DataView dataView = dataViewCache.getCache("fn_report_data_media");
        List<DBParam> paramList = Lists.newArrayList();
        paramList.add(new DBParam(DBParam.DATE_PARAM,"in_begin_date",countDate));
        paramList.add(new DBParam(DBParam.DATE_PARAM,"in_end_date",countDate));
        paramList.add(new DBParam(DBParam.DATE_PARAM,"in_os","0,1"));
        paramList.add(new DBParam(DBParam.DATE_PARAM,"in_game_id",gameId));
        ExcuteProxy query = new ExcuteProxy(dataView,0,paramList);
        query.setDataProviderUrl(systemConfig.getDataProviderUrl());
        String result = tableResultCache.getTableResultFromProxy(query);
        JsonParser parser = new JsonParser();
        JsonElement data = parser.parse(result).getAsJsonArray().get(0).getAsJsonArray();
        List<MediaReport> list = gson.fromJson(data.toString(),new TypeToken<List<MediaReport>>() {
        }.getType());
        logger.info(result);
        logger.info("----------------------end GetMediaDataTask--------------------");
        return list;
    }
}
