package com.sevenroad.dao.data;

import com.sevenroad.utils.data.CustomParam;
import org.omg.CORBA.PUBLIC_MEMBER;

/**
 * Created by linlin.zhang on 2016/12/6.
 */
public class systemLogEventType {
    public static final int LOGIN_EVENT = 1;
    public static final int MODULE_QUERY  = 2;
    public static final int BIND_WX_USER = 3;
    public static final int SELECT_GAME = 4;
    private int event_type;
    private String event_info;
    public systemLogEventType(int event_type,String dataView, String params){
        event_info = "{dataview:" +dataView+ ","+params+"}";
        this.event_type = event_type;
    }

    public String getEvent_info() {
        return event_info;
    }
    public String getEvent_type(){
        switch (event_type){
            case LOGIN_EVENT:return "用户登陆";
            case MODULE_QUERY:return "模块查询";
            case BIND_WX_USER:return "绑定微信用户";
            case SELECT_GAME:return "选择游戏";
            default:return "未知事件";
        }
    }
}
