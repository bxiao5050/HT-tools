package com.sevenroad.facebook.common;

/**
 * Created by linlin.zhang on 2017/12/29.
 */
public class FaceBookException extends RuntimeException {

    private String stackInfo;
    private String message;

    public FaceBookException(String message,String stackInfo){
        this.stackInfo = stackInfo;
        this.message = message;
    }

    @Override
    public String toString() {
        return message + "- "+stackInfo;
    }
}
