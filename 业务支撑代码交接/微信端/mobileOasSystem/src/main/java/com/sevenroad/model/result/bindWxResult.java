package com.sevenroad.model.result;

import com.sevenroad.model.resultModel;
import com.sevenroad.utils.data.JsonUtils;

/**
 * Created by linlin.zhang on 2016/11/24.
 */
public class bindWxResult extends resultModel {
    public static final int BIND_SUCCESSED = 101;
    public static final int BIND_CONFIRING = 102;
    private String msg;
    private int Code;
    private String wx_user_name;
    private String head_url;
    public bindWxResult(int code,String wx_user_name,String head_url){
        this.wx_user_name = wx_user_name;
        this.head_url = head_url;
        this.Code = code;
        switch (code){
            case BIND_CONFIRING:msg = "用户绑定中，成功后将发送消息至微信号，请耐心等候....";break;
            case BIND_SUCCESSED:msg = "绑定成功";break;
        }
    }

    public int getCode() {
        return Code;
    }

    public String getMsg() {
        return msg;
    }
}
