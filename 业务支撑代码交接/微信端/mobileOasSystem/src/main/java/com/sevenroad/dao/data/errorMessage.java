package com.sevenroad.dao.data;

import java.sql.Timestamp;

/**
 * Created by linlin.zhang on 2017/1/5.
 */
public class errorMessage {
    private int id;
    private String unite_id;
    private String user_name;
    private String wx_user_name;
    private String message_type;
    private String error_message;
    private Timestamp error_date;
    private int job_id;
    public String getError_message() {
        return error_message;
    }

    public int getId() {
        return id;
    }

    public String getMessage_type() {
        return message_type;
    }

    public Timestamp getError_date() {
        return error_date;
    }

    public void setError_message(String error_message) {
        this.error_message = error_message;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setMessage_type(String message_type) {
        this.message_type = message_type;
    }

    public void setError_date(Timestamp error_date) {
        this.error_date = error_date;
    }

    public String getUnite_id() {
        return unite_id;
    }

    public void setUnite_id(String unite_id) {
        this.unite_id = unite_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getWx_user_name() {
        return wx_user_name;
    }

    public void setWx_user_name(String wx_user_name) {
        this.wx_user_name = wx_user_name;
    }

    public int getJob_id() {
        return job_id;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }
}
