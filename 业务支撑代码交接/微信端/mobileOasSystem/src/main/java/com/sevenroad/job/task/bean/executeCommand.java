package com.sevenroad.job.task.bean;

import java.util.List;

/**
 * Created by linlin.zhang on 2018/4/10/010.
 */
public class executeCommand {
    private String taskName;
    private int connectionId;
    private String command;
    private List<String> userList;
    private int taskId;

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public int getConnectionId() {
        return connectionId;
    }

    public void setConnectionId(int connectionId) {
        this.connectionId = connectionId;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public  List<String> getUserList() {
        return userList;
    }

    public void setUserList( List<String> userList) {
        this.userList = userList;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }
}
