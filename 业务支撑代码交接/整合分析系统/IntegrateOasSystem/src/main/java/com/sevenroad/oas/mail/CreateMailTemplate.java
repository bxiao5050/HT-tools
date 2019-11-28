package com.sevenroad.oas.mail;

import com.google.common.base.Function;
import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;
import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.dao.imp.SqlProxyImp;
import com.sevenroad.oas.mail.model.ReportEntity;
import com.sevenroad.oas.mail.task.GetDayDateTask;
import com.sevenroad.oas.mail.task.GetMediaDataTask;
import com.sevenroad.oas.mail.task.GetTotalDataTask;
import com.sevenroad.oas.mail.task.bean.DayReport;
import com.sevenroad.oas.mail.task.bean.MediaReport;
import com.sevenroad.oas.mail.task.bean.TotalReport;
import com.sevenroad.oas.web.common.SystemConfig;
import com.xiaoleilu.hutool.date.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.Executors;

/**
 * Created by linlin.zhang on 2018/3/7/007.
 */
@Service
public class CreateMailTemplate {

    @Autowired
    private SqlProxyImp sqlProxyImp;
    ListeningExecutorService service =  MoreExecutors.listeningDecorator(Executors.newFixedThreadPool(20));
    @Autowired
    DataViewCache dataViewCache;
    @Autowired
    TableResultCache tableResultCache;
    @Autowired
    SystemConfig systemConfig;
    Gson gson = new Gson();

    Logger logger = LoggerFactory.getLogger(CreateMailTemplate.class);

    public CreateMailTemplate(SqlProxyImp sqlProxy){
        this.sqlProxyImp = sqlProxy;
    }

    public ReportEntity GetTotalData(String countDate,List<String> gameIds) throws Exception{
        Joiner joiner = Joiner.on(",");
//        List<AppReport> appList = service.submit(new GetGameAppTask(dataViewCache,tableResultCache,systemConfig,gson,joiner.join(gameIds))).get();
        List<TotalReport> resultTotal = service.submit(new GetTotalDataTask(dataViewCache,tableResultCache,systemConfig,gson,joiner.join(gameIds),countDate)).get();

        ReportEntity report = new ReportEntity();
        report.setCountDate(countDate);
        report.setTitleContent(countDate + "投放日报");
        ReportEntity.TotalData totalData = new ReportEntity.TotalData();
        totalData.transform(resultTotal);
        report.setTotalData(totalData);

        List<ListenableFuture<List<MediaReport>>> mediaResult = Lists.newArrayList();
        List<ListenableFuture<List<DayReport>>> dayResult = Lists.newArrayList();
        for(TotalReport gameId : resultTotal){
            mediaResult.add(service.submit(new GetMediaDataTask(dataViewCache,tableResultCache,systemConfig,gson,countDate,gameId.getGame_id())));
            dayResult.add(service.submit(new GetDayDateTask(dataViewCache,tableResultCache,systemConfig,gson,DateUtil.parseDate(countDate),gameId.getGame_id())));
        }
        List<List<MediaReport>> mediaDate = Futures.successfulAsList(mediaResult).get();
        List<List<DayReport>> dayDate = Futures.successfulAsList(dayResult).get();
        List<ReportEntity.GameData> gameData = Lists.newArrayList();
        for(int i = 0;i<resultTotal.size() - 1;i++){
            if(i == 0) {
               List<String> dateList = Lists.transform(dayDate.get(0), new Function<DayReport, String>() {
                   @Override
                   public String apply(DayReport dayReport) {
                       return dayReport.get日期();
                   }
               });
                report.setDateList(dateList);
            }
            try {
                    ReportEntity.GameData item = new ReportEntity.GameData();
                    item.transform(resultTotal.get(i).getGame_name(), mediaDate.get(i), dayDate.get(i));
                    gameData.add(item);
            }catch (Exception e){
                logger.error(gson.toJson(resultTotal));
            }
        }
        report.setGameData(gameData);
//        logger.info(gson.toJson(report));
        return report;
    }

}
