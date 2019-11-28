package com.sevenroad.facebook.job;

import com.sevenroad.facebook.common.consts;
import com.sevenroad.facebook.entity.*;
import com.sevenroad.facebook.service.*;
import com.sevenroad.services.JobPool;
import com.sevenroad.services.serviceFactory;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

/**
 * Created by linlin.zhang on 2017/7/20.
 */
public class FixTimeJob implements Job {

    Logger logger = LoggerFactory.getLogger(FixTimeJob.class);

    private dbService dbService = serviceFactory.getDbService();

    private class JobItem{
        private Future<job> runner;
        private job item;
        public JobItem(Future<job> runner,job item){
            this.runner = runner;
            this.item = item;
        }
        public Future<job> getRunner() {
            return runner;
        }

        public void setRunner(Future<job> runner) {
            this.runner = runner;
        }

        public job getItem() {
            return item;
        }

        public void setItem(job item) {
            this.item = item;
        }
    }

    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        try {
            System.out.println("FixTimeJob£º" + DateUtil.format(jobExecutionContext.getFireTime(), consts.UTCFormat));
            List<job> jobs = dbService.getAllJob();
            Map<Integer, app> apps = dbService.getAllApp();
            List<JobItem> futureList = new ArrayList<JobItem>();
            long current = Calendar.getInstance().getTimeInMillis();
            for (int i = 0; i < jobs.size(); i++) {
                job job = jobs.get(i);
                app app = apps.get(job.getAppId());
                if (app != null && job != null && current >= job.getNextTime().getTime()) {
                    Callable<job> task = null;
                    if (job.getJobType() == 2) {
                        task = new levelJob(job, app);
                    }
                    else {
                        task = new recordJob(job, app);
                    }
                    futureList.add(new JobItem(JobPool.start(task),job));
                }
            }
            //Êä³ö½á¹û
            Iterator<JobItem> iterator = futureList.iterator();
            while (iterator.hasNext()) {
                JobItem result = iterator.next();
                try {
                    job jobResult = result.getRunner().get(30, TimeUnit.MINUTES);
                    logger.info("job result : job_name - {} , job_state - {} ", jobResult.getJobName(), jobResult.getJobStatus());
                } catch (Exception e) {
                    result.getItem().setLogMessage(ExceptionUtil.stacktraceToString(e));
                    result.getItem().setJobStatus(consts.jobFailureState);
                    dbService.updateJob(result.getItem());
                    logger.error("job error : {}", e);
                }finally {
                    result.getRunner().cancel(true);
                }
            }
        }catch (Exception e){
            logger.error("job error : {}", e);
           JobExecutionException ex = new JobExecutionException();
            ex.setRefireImmediately(true);
            throw ex;
        }
    }
}
