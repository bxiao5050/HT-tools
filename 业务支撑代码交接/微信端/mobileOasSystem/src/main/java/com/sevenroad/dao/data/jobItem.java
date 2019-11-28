package com.sevenroad.dao.data;

import java.sql.Timestamp;

/**
 * Created by linlin.zhang on 2017/1/4.
 */
public class jobItem {
    public static final int SUCCESSED = 1;
    public static final int FAILURE = 0;
    private int jobId;
    private int connectionId;
    private String sql;
    private Timestamp startTime;
    private int interval;
    private String message;
    private int State;
    private int type;

    public int getConnectionId() {
        return connectionId;
    }

    public int getInterval() {
        return interval;
    }

    public int getJobId() {
        return jobId;
    }

    public String getSql() {
        return sql;
    }

    public int getState() {
        return State;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setConnectionId(int connectionId) {
        this.connectionId = connectionId;
    }

    public String getMessage() {
        return message;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public void setInterval(int interval) {
        this.interval = interval;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public void setState(int state) {
        State = state;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
