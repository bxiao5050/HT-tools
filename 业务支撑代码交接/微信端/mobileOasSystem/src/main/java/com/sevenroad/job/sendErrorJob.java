package com.sevenroad.job;

import com.sevenroad.job.task.sendErrorMsgTask;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * Created by linlin.zhang on 2017/1/6.
 */
public class sendErrorJob implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        jobWork.getThreadPool().execute(new sendErrorMsgTask());
    }
}
