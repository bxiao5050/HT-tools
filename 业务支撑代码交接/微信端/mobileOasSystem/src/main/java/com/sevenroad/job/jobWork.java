package com.sevenroad.job;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;

import java.util.Date;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

/**
 * Created by linlin.zhang on 2017/1/5.
 */
public class jobWork {
    private static ExecutorService threadPool= Executors.newScheduledThreadPool(50);
    public static ExecutorService getThreadPool(){
        if(threadPool == null )threadPool= Executors.newScheduledThreadPool(50);
        return threadPool;
    }
    private static Scheduler sched ;
    public static Scheduler getScheduler() throws Exception{
        if(sched == null ) {
            SchedulerFactory sf = new StdSchedulerFactory();
            sched = sf.getScheduler();
        }
        return sched;
    }
    public static void shutDown() throws Exception{
        if(threadPool != null) threadPool.shutdown();
        if(sched != null) sched.shutdown();
    }
    public static void run() throws Exception{

        JobDetail fiveMinJob = newJob(fiveMinJob.class).withIdentity("fiveMinJob", "MobileOasJob").build();
        JobDetail connectionJob = newJob(connectionJob.class).withIdentity("connectionJob", "MobileOasJob").build();
        JobDetail dayJob = newJob(dayJob.class).withIdentity("dayJob", "MobileOasJob").build();
        JobDetail configJob = newJob(configJob.class).withIdentity("configJob", "MobileOasJob").build();
        JobDetail sendErrorJob = newJob(sendErrorJob.class).withIdentity("sendErrorJob", "MobileOasJob").build();
        Date startTime = DateBuilder.evenMinuteDateAfterNow();
        SimpleTrigger fiveMinTrigger = newTrigger().withIdentity("fiveMinForever", "MobileOasJob").startAt(startTime)
                .withSchedule(simpleSchedule().withIntervalInMinutes(5).repeatForever()).build();
        SimpleTrigger connectionTrigger = newTrigger().withIdentity("connectionForever", "MobileOasJob").startAt(startTime)
                .withSchedule(simpleSchedule().withIntervalInMinutes(5).repeatForever()).build();
        SimpleTrigger configTrigger = newTrigger().withIdentity("configTrigger", "MobileOasJob").startAt(startTime)
                .withSchedule(simpleSchedule().withIntervalInMinutes(5).repeatForever()).build();
        SimpleTrigger sendErrorTrigger = newTrigger().withIdentity("sendErrorTrigger", "MobileOasJob").startAt(startTime)
                .withSchedule(simpleSchedule().withIntervalInMinutes(5).repeatForever()).build();
        SimpleTrigger dayTrigger = newTrigger().withIdentity("dayForever", "MobileOasJob").startAt(DateBuilder.dateOf(9,0,0))
                .withSchedule(simpleSchedule().withIntervalInHours(24).repeatForever()).build();
        getScheduler().scheduleJob(fiveMinJob, fiveMinTrigger);
        getScheduler().scheduleJob(connectionJob,connectionTrigger);
        getScheduler().scheduleJob(dayJob,dayTrigger);
        getScheduler().scheduleJob(configJob,configTrigger);
        getScheduler().scheduleJob(sendErrorJob,sendErrorTrigger);
        getScheduler().start();
    }

}
