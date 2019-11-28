package com.dataprovider.core.model;

import com.dataprovider.dao.models.Table;
import com.google.common.util.concurrent.ListenableFuture;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/29.
 */
public class OutputModel extends InputModel {
    private String executeResult;

    private String cacheId;

    private ListenableFuture future;

    public String getExecuteResult() {
        return executeResult;
    }

    public void setExecuteResult(String executeResult) {
        this.executeResult = executeResult;
    }

    public String getCacheId() {
        return cacheId;
    }

    public void setCacheId(String cacheId) {
        this.cacheId = cacheId;
    }

    public ListenableFuture getFuture() {
        return future;
    }

    public void setFuture(ListenableFuture future) {
        this.future = future;
    }
}
