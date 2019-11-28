package com.sevenroad.model.result;

import com.sevenroad.model.resultModel;

/**
 * Created by linlin.zhang on 2018/1/30.
 */
public class successResult <T> extends resultModel {
    private int code;
    private String msg;
    private T state;

    public successResult(int code,String msg,T state){
        this.code = code;
        this.msg = msg;
        this.state = state;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getState() {
        return state;
    }

    public void setState(T state) {
        this.state = state;
    }
}
