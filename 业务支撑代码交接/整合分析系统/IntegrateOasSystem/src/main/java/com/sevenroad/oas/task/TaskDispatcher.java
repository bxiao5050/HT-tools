package com.sevenroad.oas.task;

import com.baomidou.mybatisplus.mapper.Condition;
import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.GameZoneCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.entity.Task;
import com.sevenroad.oas.dao.mapper.TaskMapper;
import com.sun.org.apache.bcel.internal.generic.GOTO;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.Trigger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

import java.lang.reflect.Type;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

/**
 * Created by linlin.zhang on 2017/5/17.
 */
public class TaskDispatcher {

    public static final String JOB_NAME = "FIVEMIN_JOB";
    public static final String GROUP_NAME = "FIVEMIN_GROUP";
    public static final String TRIGGER_NAME = "FIVEMIN_TRIGGER";
    public static final String JOB_INFO = "JOB_INFO";
    public static final String GAME_ZONE_CACHE = "GAME_ZONE_CACHE";
    public static final String CONNECTION_MAMAGE = "CONNECTION_MANAGE";
    @Autowired
    GameZoneCache gameZoneCache;
    @Autowired
    ConnectionManager connectionManager;
    @Autowired
    private SchedulerFactoryBean schedulerFactoryBean;
    @Autowired
    TaskMapper taskMapper;
    Logger logger = LoggerFactory.getLogger(TaskDispatcher.class);
    static Gson gson = new Gson();
    private Trigger trigger;
    public List<Task> getTask(){
        Condition condition = new Condition();
        condition.ne("state",0);
        return taskMapper.selectList(condition);
    }
    public static <T> String toJson(T model){
       return  gson.toJson(model);
    }
    public static <T> T fromJson(String json,Class<T> t){
        return gson.fromJson(json,t);
    }
    public void start(){
        trigger = newTrigger()
                .withSchedule(simpleSchedule().withIntervalInMinutes(5))
                .withIdentity(TRIGGER_NAME, GROUP_NAME)
                .build();
    }
    public void execute(){
        try {
            Scheduler scheduler = schedulerFactoryBean.getScheduler();
            List<Task> task  = getTask();
            Iterator<Task> iterator = task.iterator();
            logger.info("TaskDispatcher start ----------------------------task:{}",task.size());
            while (iterator.hasNext()) {
                Task item = iterator.next();
                if (!scheduler.checkExists(new JobKey(JOB_NAME + item.getId()))
                        &&item.getNextTime().before(Calendar.getInstance().getTime())) {
                    JobDetail jobDetail = newJob(GetFiveMinTask.class)
                            .usingJobData(JOB_INFO,toJson(item))
                            .withIdentity(JOB_NAME + item.getId(), GROUP_NAME)
                            .build();
                    jobDetail.getJobDataMap().put(GAME_ZONE_CACHE,gameZoneCache);
                    jobDetail.getJobDataMap().put(CONNECTION_MAMAGE,connectionManager);
                    scheduler.scheduleJob(jobDetail, trigger);
                }
            }
            logger.info("TaskDispatcher end ----------------------------task:{}",task.size());
        }
        catch (Exception e){
            logger.error("TaskDispatcher error : {} "+ e);
        }
    }
}
