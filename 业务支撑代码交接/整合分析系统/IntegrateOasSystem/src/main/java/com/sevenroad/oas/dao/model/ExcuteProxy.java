package com.sevenroad.oas.dao.model;

import com.sevenroad.oas.dao.DBModel;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/2.
 */
public class ExcuteProxy extends ExcuteModel {


    private String dataProviderUrl;

    public ExcuteProxy(DataView dataView,int gameId,List<DBParam> Params) {
        super(dataView,gameId,Params);
    }

    public String getDataProviderUrl() {
        return dataProviderUrl;
    }

    public void setDataProviderUrl(String dataProviderUrl) {
        this.dataProviderUrl = dataProviderUrl;
    }
}
