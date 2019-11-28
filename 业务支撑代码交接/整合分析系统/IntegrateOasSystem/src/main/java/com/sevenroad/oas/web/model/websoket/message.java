package com.sevenroad.oas.web.model.websoket;

import java.util.UUID;

/**
 * Created by linlin.zhang on 2017/4/28.
 */
public class message {
    //心跳报
    public static final int TYPE_HEARTBEAT = 0;
    //开始连接
    public static final int TYPE_CONNECTION = 1;
    //断开连接
    public static final int TYPE_CLOSE = 2;
    //通知消息
    public static final int TYPE_NOTIFY = 3;
    //异地登录消息
    public static final int TYPE_REMOTE_LOGIN = 4;

    private String id = UUID.randomUUID().toString();
    private int messageType;
    private String date;
    private String message;
    private String userName;
    public int getMessageType() {
        return messageType;
    }
    public void setMessageType(int messageType) {
        this.messageType = messageType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
