package com.sevenroad.job.task;

import com.sevenroad.dao.DBUtils;
import com.sevenroad.dao.connection.SystemConnection;
import com.sevenroad.dao.data.errorMessage;
import com.sevenroad.dao.data.jobItem;
import com.sevenroad.utils.Logger;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2017/1/5.
 */
public class fiveMinTask implements Runnable {
    private jobItem job;
    public fiveMinTask(jobItem job){this.job = job;}
    @Override
    public void run() {
        try {
            LinkedList<errorMessage> result = DBUtils.executeNoQuery(job.getSql(), job.getConnectionId());
            for(int i = 0;i<result.size();i++){
                errorMessage item = result.get(i);
                item.setError_message(job.getMessage() +"-"+ item.getError_message());
                item.setJob_id(job.getJobId());
            }
            SystemConnection conn = new SystemConnection();
            if(result.size() > 0) {
                conn.insertErrorMessage(result.toArray(new errorMessage[result.size()]));
            }
            Calendar now = Calendar.getInstance();
            now.add(Calendar.MILLISECOND,job.getInterval());
            job.setStartTime(new Timestamp(now.getTimeInMillis()));
            conn.updateJob(job);
        }
        catch (Exception ex){
            Logger.getInstance().Error(ex);
        }
    }
}
