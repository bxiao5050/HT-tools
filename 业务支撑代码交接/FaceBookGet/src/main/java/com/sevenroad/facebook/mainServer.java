package com.sevenroad.facebook;

import com.sevenroad.facebook.common.FixTimeJobListener;
import com.sevenroad.facebook.common.consts;
import com.sevenroad.facebook.job.*;
import com.sevenroad.facebook.singleton.Setting;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

/**
 * Created by linlin.zhang on 2017/7/19.
 */
public class mainServer {
    static Logger logger = LoggerFactory.getLogger(mainServer.class);
    public static void main(String[] args) {
        logger.info("start server .....");
        try {
            Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();
            int interval = Integer.parseInt(Setting.getSet(consts.taskInterval));
            JobDetail levelJob = newJob(FixTimeJob.class)
                    .withIdentity("FixTimeJob", "FixTimeJob")
                    .build();
            Trigger fiveMin = newTrigger()
                    .withIdentity("fiveMin", "fiveMin")
                    .startNow()
                    .withSchedule(simpleSchedule().withIntervalInSeconds(interval).repeatForever())
                    .build();
            // and start it off
            scheduler.scheduleJob(levelJob, fiveMin);
            scheduler.getListenerManager().addJobListener(new FixTimeJobListener());
            while (true) {
                Run(scheduler);
                Thread.sleep(1000*60*5);
            }
        }catch (Exception e){
            logger.error("main process error : exit msg - {}  ", ExceptionUtil.stacktraceToString(e));
        }
    }

    public static void Run(Scheduler scheduler) throws Exception{
        if(!scheduler.isStarted()){
            scheduler.start();
        }
        Trigger.TriggerState state = scheduler.getTriggerState(new TriggerKey("fiveMin", "fiveMin"));
        logger.info("scheduler state - {} ",state.toString());
    }


}
