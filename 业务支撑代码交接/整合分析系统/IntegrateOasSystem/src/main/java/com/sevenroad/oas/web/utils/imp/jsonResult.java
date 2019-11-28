package com.sevenroad.oas.web.utils.imp;

import com.google.gson.Gson;
import com.sevenroad.oas.web.utils.IResult;

/**
 * Created by linlin.zhang on 2017/4/19.
 */
public class jsonResult<T> implements IResult {
    private int code;
    private String message;

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

    public T getState() {
        return state;
    }

    public void setState(T state) {
        this.state = state;
    }

    private T state;
    static Gson gson = new Gson();

    public jsonResult(int code,String msg,T state){
        this.code = code;
        this.message = msg;
        this.state = state;
    }
    public String getResult() {
       return gson.toJson(this);
    }
}
