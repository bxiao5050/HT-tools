package com.sevenroad.oas.web.utils.imp;

import com.sevenroad.oas.web.utils.IResult;

/**
 * Created by Administrator on 2017/4/30 0030.
 */
public class jsonQueryResult implements IResult {
    private int code;
    private String message;
    private String state;

    public jsonQueryResult(int code,String msg,String state){
        this.code = code;
        this.message = msg;
        this.state = state;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
    public String getResult() {
       return String.format("{\"code\":%s,\"message\":\"%s\",\"state\":%s }",code,message,state);
    }
}
