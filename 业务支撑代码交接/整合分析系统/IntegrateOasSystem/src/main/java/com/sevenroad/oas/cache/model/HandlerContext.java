package com.sevenroad.oas.cache.model;

import com.sevenroad.oas.dao.model.ExcuteModel;

/**
 * Created by linlin.zhang on 2017/8/14.
 */
public class HandlerContext {
    ExcuteModel model;

    TableResultModel result;

    String key;

    int translateType;

    Boolean isCache = false;

    public ExcuteModel getModel() {
        return model;
    }

    public void setModel(ExcuteModel model) {
        this.model = model;
    }

    public TableResultModel getResult() {
        return result;
    }

    public void setResult(TableResultModel result) {
        this.result = result;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public int getTranslateType() {
        return translateType;
    }

    public void setTranslateType(int translateType) {
        this.translateType = translateType;
    }

    public Boolean getCache() {
        return isCache;
    }

    public void setCache(Boolean cache) {
        isCache = cache;
    }
}
