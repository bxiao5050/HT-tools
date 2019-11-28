package com.sevenroad.oas.cache.model;

import com.sevenroad.oas.dao.model.TableResult;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/22.
 */
public class TableResultModel {
    private String key;
    private String createDate;
    private List<TableResult> tables;
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public List<TableResult> getTables() {
        return tables;
    }

    public void setTables(List<TableResult> tables) {
        this.tables = tables;
    }
}
