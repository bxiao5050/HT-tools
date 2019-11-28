package com.sevenroad.utils.exception;

/**
 * Created by linlin.zhang on 2016/11/25.
 */
public class moduleQueryException extends  severnroadException  {
    public static final int ERROR_PARAM = 201;
    public static final int ERROR_QUERY = 202;
    public moduleQueryException(int errorCode){
        super(errorCode);
    }
    @Override
    protected String getMsg(int errorCode) {
        switch (errorCode)
        {
            case ERROR_PARAM:return "参数错误";
            case ERROR_QUERY:return "查询错误，";
            default:return "未知的错误";
        }
    }
}
