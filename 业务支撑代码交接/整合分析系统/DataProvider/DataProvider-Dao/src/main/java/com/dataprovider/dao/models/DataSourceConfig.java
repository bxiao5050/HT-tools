package com.dataprovider.dao.models;

/**
 * Created by linlin.zhang on 2017/7/31.
 */
public class DataSourceConfig {
    private String driver;
    private String url;
    private String userName;
    private String password;

    private String entityMapper;

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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

    public String getEntityMapper() {
        return entityMapper;
    }

    public void setEntityMapper(String entityMapper) {
        this.entityMapper = entityMapper;
    }
}
