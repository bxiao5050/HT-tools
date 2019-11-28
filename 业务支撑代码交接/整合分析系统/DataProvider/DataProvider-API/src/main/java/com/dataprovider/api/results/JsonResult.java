package com.dataprovider.api.results;

import com.google.gson.Gson;
import com.xiaoleilu.hutool.json.JSON;
import com.xiaoleilu.hutool.json.JSONUtil;

/**
 * Created by linlin.zhang on 2017/7/31.
 */
public class JsonResult <T> {
    private int code;
    private String message;
    private T state;
    public JsonResult(int code,String message,T state){
        this.code = code;
        this.message = message;
        this.state = state;
    }
    public String GetResult(Gson gson){
       return gson.toJson(this);
    }
}
