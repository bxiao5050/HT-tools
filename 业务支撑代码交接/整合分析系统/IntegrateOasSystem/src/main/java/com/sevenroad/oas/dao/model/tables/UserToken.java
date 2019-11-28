package com.sevenroad.oas.dao.model.tables;

/**
 * Created by Administrator on 2017/5/5 0005.
 */
public class UserToken {
    private int userId;
    private String userName;
    private String token;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
