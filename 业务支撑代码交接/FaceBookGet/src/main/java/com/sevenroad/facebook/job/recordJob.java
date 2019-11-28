package com.sevenroad.facebook.job;

import com.facebook.ads.sdk.AdAccount;
import com.sevenroad.facebook.common.consts;
import com.sevenroad.facebook.entity.app;
import com.sevenroad.facebook.entity.job;
import com.sevenroad.facebook.entity.record;
import com.sevenroad.facebook.service.recordService;
import com.sevenroad.facebook.singleton.FBConfig;
import com.sevenroad.services.serviceFactory;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.Callable;

/**
 * Created by linlin.zhang on 2017/7/20.
 */
public class recordJob implements Callable<job> {
    private com.sevenroad.facebook.entity.app app;
    private recordService recordService = serviceFactory.getRecordService();
    private com.sevenroad.facebook.service.dbService dbService = serviceFactory.getDbService();
    private job job;
    Logger logger = LoggerFactory.getLogger(recordJob.class);
    public recordJob(job job,app app){
        this.job = job;
        this.app = app;
    }
    public job call() throws Exception {
        try {
            Date startDate = new Date(job.getNextTime().getTime());
            long currentTime = Calendar.getInstance().getTimeInMillis(), nextTime = startDate.getTime();
            if ((job.getJobStatus().equals(consts.jobSuccessState)||job.getJobStatus().equals(consts.jobFailureState))
                    && currentTime > nextTime) {
                job.setJobStatus(consts.jobRunningState);
                dbService.updateJob(job);
                int dateRand = Integer.parseInt(com.sevenroad.facebook.singleton.Setting.getSet(consts.fbDateRand));
                Calendar start = Calendar.getInstance(), end = Calendar.getInstance();
                start.setTime(startDate);
                start.add(Calendar.DAY_OF_MONTH, 0 - dateRand);
                end.setTimeInMillis(currentTime);
                AdAccount adAccount = new AdAccount(app.getFbAccountId(), FBConfig.getContext(app.getToken()));
                while (start.before(end)) {
                    Date current = new Date(start.getTimeInMillis());
                    List<record> records = recordService.getRecord(app, adAccount, current);
                    dbService.updateRecord(app.getAppId(), current, records);
                    job.setJobTime(new Timestamp(start.getTimeInMillis()));
                    dbService.updateJob(job);
                    if(start.getTimeInMillis() + consts.Mili_OF_DAY >= currentTime){
                        start.add(Calendar.MILLISECOND, job.getInterval());
                    }else {
                        start.add(Calendar.MILLISECOND, consts.Mili_OF_DAY);
                    }
                    Thread.sleep(5000);
                }
                job.setNextTime(new Timestamp(start.getTimeInMillis()));
                job.setJobStatus(consts.jobSuccessState);
            }
            return job;
        }
        catch (Exception e){
            job.setLogMessage( ExceptionUtil.getMessage(e)+ExceptionUtil.stacktraceToString(e));
            job.setJobStatus(consts.jobFailureState);
            logger.info("job - {} ,name - {} failure error - {} ", job.getJobId(), job.getJobName(),ExceptionUtil.stacktraceToString(e));
        }
        finally {
            if(job.getJobStatus().equals(consts.jobRunningState)){
                job.setJobStatus(consts.jobFailureState);
            }
            dbService.updateJob(job);
        }
        return job;
    }
}
