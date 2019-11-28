package com.sevenroad.job;

import com.sevenroad.utils.config.systemConfig;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * Created by linlin.zhang on 2017/1/6.
 */
public class configJob  implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        systemConfig.reload();
    }
}
