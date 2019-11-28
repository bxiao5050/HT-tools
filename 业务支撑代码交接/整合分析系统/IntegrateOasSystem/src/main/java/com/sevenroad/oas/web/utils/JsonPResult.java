package com.sevenroad.oas.web.utils;

/**
 * Created by linlin.zhang on 2017/4/19.
 */

/**
 */
public class JsonPResult implements IResult {
    private IResult result;
    private String callback;
    public JsonPResult(String callback,IResult result){
        this.callback = callback;
        this.result = result;
    }
    public String getResult() {
        return callback+"("+result.getResult()+")";
    }
}
