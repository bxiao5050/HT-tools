package com.dataprovider.api.components;

import com.dataprovider.core.Consts;
import com.dataprovider.core.channels.ForeignChannel;
import com.dataprovider.core.channels.GetChannel;
import com.dataprovider.core.channels.IntergrateChannel;
import com.dataprovider.core.model.InputModel;
import com.dataprovider.task.AutoPreparamentTask;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/7.
 */
@Component
public class ScheduledTasks {

    AutoPreparamentTask autoPreparamentTask = new AutoPreparamentTask();

    GetChannel channel = new GetChannel();

    ForeignChannel foreignChannel = new ForeignChannel();

    IntergrateChannel intergrateChannel = new IntergrateChannel();
    /**
     * 每天早上5点执行
     */
    @Scheduled(cron = "0 0 9 * * ?")
    public void dayTaskFiveHour() {
       List<InputModel> result = autoPreparamentTask.getNext();
        for(int i = 0;i<result.size();i++){
            if (result.get(i).getType().equals(Consts.CUSTOMS_CACHE)) {
                channel.doHandler(result.get(i));
            }else if(result.get(i).getType().equals(Consts.INTERGRATE_CACHE)){
                intergrateChannel.doHandler(result.get(i));
            }
            else if(result.get(i).getType().equals(Consts.FOREIGN_CACHE)){
                foreignChannel.doHandler(result.get(i));
            }
        }
    }
    public static void main(String[] arg){
        ScheduledTasks tasks = new ScheduledTasks();
        tasks.dayTaskFiveHour();
    }
}
