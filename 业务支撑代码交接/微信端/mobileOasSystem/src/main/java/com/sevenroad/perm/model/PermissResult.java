package com.sevenroad.perm.model;

import java.util.List;

/**
 * Created by linlin.zhang on 2018/2/26/026.
 */
public class PermissResult {
    private int code;
    private String message;
    private List<PermissResource> state;

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

    public List<PermissResource> getState() {
        return state;
    }

    public void setState(List<PermissResource> state) {
        this.state = state;
    }
}
