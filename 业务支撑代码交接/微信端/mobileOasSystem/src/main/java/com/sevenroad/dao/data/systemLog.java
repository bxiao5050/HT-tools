package com.sevenroad.dao.data;

import java.util.Date;

/**
 * Created by linlin.zhang on 2016/12/6.
 */
public class systemLog {
    private String user_name;
    private String wx_user_name;
    private String event_type;
    private String event_info;
    private Date login_date;
    private String remote_ip;
    public systemLog(String user_name,String wx_user_name,
                     systemLogEventType event_info,
                     Date login_date,String remote_ip){
        this.event_info = event_info.getEvent_info();
        this.event_type = event_info.getEvent_type();
        this.user_name = user_name;
        this.wx_user_name = wx_user_name;
        this.login_date = login_date;
        this.remote_ip = remote_ip;
    }

    public String getEvent_info() {
        return event_info;
    }

    public String getEvent_type() {
        return event_type;
    }

    public Date getLogin_date() {
        return login_date;
    }

    public String getRemote_ip() {
        return remote_ip;
    }

    public String getUser_name() {
        return user_name;
    }

    public String getWx_user_name() {
        return wx_user_name;
    }
}
