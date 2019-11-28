package com.sevenroad.perm.model;

/**
 * Created by linlin.zhang on 2018/2/26/026.
 */
public class SystemChannel {
    private int CHANNEL_ID;
    private String CHANNEL_NAME;
    private int CHANNEL_PID;

    public int getCHANNEL_ID() {
        return CHANNEL_ID;
    }

    public void setCHANNEL_ID(int CHANNEL_ID) {
        this.CHANNEL_ID = CHANNEL_ID;
    }

    public String getCHANNEL_NAME() {
        return CHANNEL_NAME;
    }

    public void setCHANNEL_NAME(String CHANNEL_NAME) {
        this.CHANNEL_NAME = CHANNEL_NAME;
    }

    public int getCHANNEL_PID() {
        return CHANNEL_PID;
    }

    public void setCHANNEL_PID(int CHANNEL_PID) {
        this.CHANNEL_PID = CHANNEL_PID;
    }
}
