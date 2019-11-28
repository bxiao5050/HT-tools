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
import com.sevenroad.oas.web.common.SystemConfig;
import com.xiaoleilu.hutool.date.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Callable;

/**
 * Created by linlin.zhang on 2018/3/16/016.
 */
public class GetDayDateTask implements Callable<List<DayReport>> {
    Logger logger = LoggerFactory.getLogger(GetTotalDataTask.class);

    DataViewCache dataViewCache;

    TableResultCache tableResultCache;

    SystemConfig systemConfig;

    Gson gson;

    private Date countDate;

    private String gameId;

    public GetDayDateTask(DataViewCache dataViewCache, TableResultCache tableResultCache, SystemConfig systemConfig, Gson gson, Date countDate, String gameId){
        this.dataViewCache = dataViewCache;
        this.tableResultCache = tableResultCache;
        this.systemConfig = systemConfig;
        this.gson = gson;
        this.countDate = countDate;
        this.gameId = gameId;
    }

    @Override
    public List<DayReport> call() throws Exception {
        logger.info("----------------------start GetDayDateTask--------------------");
        DataView dataView = dataViewCache.getCache("fn_report_day");
        List<DBParam> paramList = Lists.newArrayList();
        Calendar begin = DateUtil.calendar(countDate);
        begin.add(Calendar.MONTH,-1);
        String start = DateUtil.format(begin.getTime(),"YYYY-MM-dd");
        String end = DateUtil.format(countDate,"YYYY-MM-dd");
        paramList.add(new DBParam(DBParam.DATE_PARAM,"in_begin_date",start));
        paramList.add(new DBParam(DBParam.DATE_PARAM,"in_end_date",end));
        paramList.add(new DBParam(DBParam.DATE_PARAM,"in_os","0,1"));
        paramList.add(new DBParam(DBParam.DATE_PARAM,"in_game_id",gameId));
        ExcuteProxy query = new ExcuteProxy(dataView,0,paramList);
        query.setDataProviderUrl(systemConfig.getDataProviderUrl());
        String result = tableResultCache.getTableResultFromProxy(query);
        JsonParser parser = new JsonParser();
        JsonElement data = parser.parse(result).getAsJsonArray().get(0).getAsJsonArray();
        List<DayReport> list = gson.fromJson(data.toString(),new TypeToken<List<DayReport>>() {
        }.getType());
        logger.info(result);
        logger.info("----------------------end GetDayDateTask--------------------");
        return list;
    }
}
