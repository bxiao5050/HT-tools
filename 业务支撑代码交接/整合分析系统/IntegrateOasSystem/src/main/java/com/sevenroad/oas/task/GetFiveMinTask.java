package com.sevenroad.oas.task;

import com.fasterxml.jackson.databind.util.ClassUtil;
import com.sevenroad.oas.cache.Imp.GameZoneCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.entity.Task;
import com.sevenroad.oas.task.execute.IExecute;
import com.sevenroad.oas.task.execute.SurperHeroFiveMinExecute;
import com.sevenroad.oas.task.model.FiveMinOnlineParams;
import org.quartz.*;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by linlin.zhang on 2017/5/15.
 */
public class GetFiveMinTask implements Job {
    private Task task;
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {

        String jobInfo = jobExecutionContext.getJobDetail().getJobDataMap().getString(TaskDispatcher.JOB_INFO);
        GameZoneCache gameZoneCache = (GameZoneCache)jobExecutionContext.getJobDetail().getJobDataMap().get(TaskDispatcher.GAME_ZONE_CACHE);
        ConnectionManager connectionManager = (ConnectionManager) jobExecutionContext.getJobDetail().getJobDataMap().get(TaskDispatcher.CONNECTION_MAMAGE);
        task = TaskDispatcher.fromJson(jobInfo, Task.class);
        try {
            if (task != null) {
                String params = task.getParams();
                FiveMinOnlineParams fiveMinParams = TaskDispatcher.fromJson(params,FiveMinOnlineParams.class);
                Date now = Calendar.getInstance().getTime();
                IExecute execute = null;
                while(task.getNextTime().before(now)){
                    //执行
                    switch (fiveMinParams.getAppId())
                    {
                        case 10002:execute = new SurperHeroFiveMinExecute(connectionManager.getConnection(fiveMinParams.getConnectionId()),
                                gameZoneCache.getCache(fiveMinParams.getConnectionId(),
                                fiveMinParams.getAppId())
                        ,fiveMinParams);break;
                    }
                    execute.execute(task.getNextTime());
                    //更新任务表
                    task.setStartTime(task.getNextTime());
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(task.getNextTime());
                    calendar.add(Calendar.SECOND,task.getTaskInterval());
                    task.setMessage("successed");
                    task.setState(1);
                    task.setNextTime(calendar.getTime());
                    task.updateById();

                }
            }
        } catch (Exception ex) {
            task.setState(-1);
            task.setMessage(ex.getMessage());
            task.updateById();
        }

    }
}
