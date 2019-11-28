package com.sevenroad.facebook.entity;

import java.sql.Date;
import java.sql.Timestamp;

/**
 * Created by linlin.zhang on 2017/7/19.
 */
public class job {
    private int jobId;
    private int appId;
    private String jobName;
    private Timestamp jobTime;
    private Timestamp nextTime;
    private int interval;
    private String description;
    private String logMessage;
    private Boolean status;
    private int jobType;
    private String jobStatus;

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public int getAppId() {
        return appId;
    }

    public void setAppId(int appId) {
        this.appId = appId;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public Timestamp getJobTime() {
        return jobTime;
    }

    public void setJobTime(Timestamp jobTime) {
        this.jobTime = jobTime;
    }

    public Timestamp getNextTime() {
        return nextTime;
    }

    public void setNextTime(Timestamp nextTime) {
        this.nextTime = nextTime;
    }

    public int getInterval() {
        return interval;
    }

    public void setInterval(int interval) {
        this.interval = interval;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLogMessage() {
        return logMessage;
    }

    public void setLogMessage(String logMessage) {
        this.logMessage = logMessage;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public int getJobType() {
        return jobType;
    }

    public void setJobType(int jobType) {
        this.jobType = jobType;
    }

    public String getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }
}
