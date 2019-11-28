package com.sevenroad.utils.exception;

/**
 * Created by linlin.zhang on 2016/11/28.
 */
public class severnroadException extends Exception {
    private int errorCode;
    public static final int ERRO_CROSS_DOMIN =  1001;
    public static final int CONNECTED_SERVER_TIMEOUT = 1002;
    public static final int LOST_PARAMS = 1003;
    public int getErrorCode(){
        return errorCode;
    }
    public severnroadException(int errorCode){
        this.errorCode = errorCode;
    }

    @Override
    public String getMessage() {
        return this.getMsg(errorCode);
    }

    protected String getMsg(int errorCode){

        switch (errorCode){
            case ERRO_CROSS_DOMIN:return "拒绝跨域访问";
            case CONNECTED_SERVER_TIMEOUT:return "连接服务器超时";
            case LOST_PARAMS:return "缺少参数值";
            default:return "未知错误";
        }
    }
}
