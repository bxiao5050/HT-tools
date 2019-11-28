package com.sevenroad.oas.web.model;

/**
 * Created by linlin.zhang on 2017/4/19.
 */
public class CustomUser {

    private int user_id;

    /**
     *
     */
    private String user_name;
    /**
     *
     */
    private String user_password;
    /**
     *
     */
    private String user_comment;
    /**
     */
    private int user_status;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public String getUser_comment() {
        return user_comment;
    }

    public void setUser_comment(String user_comment) {
        this.user_comment = user_comment;
    }

    public int getUser_status() {
        return user_status;
    }

    public void setUser_status(int user_status) {
        this.user_status = user_status;
    }
}
