package com.sevenroad.facebook.common;

import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by linlin.zhang on 2018/3/12/012.
 */
public class FixTimeJobListener implements JobListener {
    Logger logger = LoggerFactory.getLogger(FixTimeJobListener.class);
    @Override
    public String getName() {
        return "�̶�����е���";
    }

    @Override
    public void jobToBeExecuted(JobExecutionContext context) {
        logger.info("--------------------------��ʼִ��-------------------------");
    }

    @Override
    public void jobExecutionVetoed(JobExecutionContext context) {
        logger.info("--------------------------��ʼִ��-------------------------");
    }

    @Override
    public void jobWasExecuted(JobExecutionContext context, JobExecutionException jobException) {
        if(jobException == null) {
            logger.info("--------------------------ִ�����-------------------------");
        }else {
            logger.info("--------------------------������-------------------------");

            logger.info(" error info : {} ,", ExceptionUtil.getMessage(jobException));
            logger.info("--------------------------������-------------------------");
        }
    }
}
