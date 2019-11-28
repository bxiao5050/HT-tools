package com.sevenroad.job;

import com.sevenroad.dao.connection.SystemConnection;
import com.sevenroad.dao.data.jobItem;
import com.sevenroad.job.task.dayReportJob;
import com.sevenroad.job.task.fiveMinTask;
import com.sevenroad.job.task.monthReportJob;
import com.sevenroad.utils.Logger;
import com.xiaoleilu.hutool.date.DateUtil;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2017/1/4.
 */
public class fiveMinJob implements Job {
    public static final  int FIVE_MIN = 300000;
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        SystemConnection conn = new SystemConnection();
        try {
            LinkedList<jobItem> jobs = conn.getJob();
            Date now = DateUtil.date();
            for(int i = 0;i<jobs.size();i++){
                jobItem job = jobs.get(i);
                if(job.getInterval() == FIVE_MIN && job.getType() == 1){
                    jobWork.getThreadPool().execute(new fiveMinTask(job));
                }else if (job.getType() == 2) {

                   Calendar calendar = Calendar.getInstance();
                    calendar.setTime(job.getStartTime());
                    if(job.getStartTime().getTime() <=now.getTime()){
                        if(job.getInterval() == 1) {
                            Logger.getInstance().Info("fiveMinJob report : " + job.getMessage());
                            calendar.add(Calendar.DATE,1);
                            jobWork.getThreadPool().execute(new dayReportJob(job));
                            job.setStartTime(new Timestamp(calendar.getTimeInMillis()));
                            conn.updateJob(job);
                        }
                        else if(job.getInterval() == 7 ) {
                            Logger.getInstance().Info("fiveMinJob report : " + job.getMessage());
                            calendar.add(Calendar.DATE,7);
                            jobWork.getThreadPool().execute(new monthReportJob(job));
                            job.setStartTime(new Timestamp(calendar.getTimeInMillis()));
                            conn.updateJob(job);
                        }else if(job.getInterval() == 30){
                            Logger.getInstance().Info("fiveMinJob report : " + job.getMessage());
                            calendar.add(Calendar.MONTH,1);
                            jobWork.getThreadPool().execute(new monthReportJob(job));
                            job.setStartTime(new Timestamp(calendar.getTimeInMillis()));
                            conn.updateJob(job);
                        }
                    }

                }
            }
        }
        catch (Exception ex){
            Logger.getInstance().Error(ex);
        }
    }
}
