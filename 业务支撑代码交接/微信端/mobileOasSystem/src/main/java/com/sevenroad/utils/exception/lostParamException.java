package com.sevenroad.utils.exception;

/**
 * Created by linlin.zhang on 2016/12/8.
 */
public class lostParamException extends severnroadException {
    private String paramName;
    public lostParamException(String paramName){
        super(severnroadException.LOST_PARAMS);
        this.paramName = paramName;
    }

    @Override
    public String getMsg(int errorCode) {
        return super.getMsg(errorCode)+":"+this.paramName;
    }
}
