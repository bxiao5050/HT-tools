package com.sevenroad.utils.exception;

/**
 * Created by linlin.zhang on 2016/11/21.
 */
public class dataViewException extends severnroadException {
    public static final int NOT_FIND_DATAVIEW = 301;
    public dataViewException(int errorCode){
        super(errorCode);
    }
    @Override
    protected String getMsg(int errorCode) {
        switch (errorCode)
        {
            case NOT_FIND_DATAVIEW:return "未知的视图";
            default:return "未知的错误";
        }
    }
}
