package com.dataprovider.core.model;

/**
 * Created by linlin.zhang on 2017/7/29.
 */
public class InputModel {

    private int connectionId;

    private String executeCommand;

    private String executeParams;

    private String type;

    public int getConnectionId() {
        return connectionId;
    }

    public void setConnectionId(int connectionId) {
        this.connectionId = connectionId;
    }

    public String getExecuteCommand() {
        return executeCommand;
    }

    public void setExecuteCommand(String executeCommand) {
        this.executeCommand = executeCommand;
    }

    public String getExecuteParams() {
        return executeParams;
    }

    public void setExecuteParams(String executeParams) {
        this.executeParams = executeParams;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
