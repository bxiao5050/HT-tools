package com.dataprovider.dao.entitys;

import com.baomidou.mybatisplus.annotations.*;

/**
 * Created by linlin.zhang on 2017/7/29.
 */
@TableName(value = "t_e_connection")
public class Connection {
    /**
     * 连接id
     */
    @TableId(value = "id")
    private int connectionId;
    /**
     * 连接驱动
     */
    @TableField(value = "driver")
    private String connectionDriver;
    /**
     * url
     */
    @TableField(value = "url")
    private String connectionUrl;
    /**
     * 用户名
     */
    @TableField(value = "user_name")
    private String userName;
    /**
     * 密码
     */
    @TableField(value = "password")
    private String password;

    /**
     * mapper映射
     */
    @TableField(value = "mappers")
    private String mappers;

    public int getConnectionId() {
        return connectionId;
    }

    public void setConnectionId(int connectionId) {
        this.connectionId = connectionId;
    }

    public String getConnectionDriver() {
        return connectionDriver;
    }

    public void setConnectionDriver(String connectionDriver) {
        this.connectionDriver = connectionDriver;
    }

    public String getConnectionUrl() {
        return connectionUrl;
    }

    public void setConnectionUrl(String connectionUrl) {
        this.connectionUrl = connectionUrl;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMappers() {
        return mappers;
    }

    public void setMappers(String mappers) {
        this.mappers = mappers;
    }
}
