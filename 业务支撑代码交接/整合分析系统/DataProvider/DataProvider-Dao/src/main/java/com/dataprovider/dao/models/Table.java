package com.dataprovider.dao.models;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/30.
 */
public class Table {
    int[] columnType;
    String[] columnName;
    List<String[]> rows;
    public int[] getColumnType() {
        return columnType;
    }

    public void setColumnType(int[] columnType) {
        this.columnType = columnType;
    }

    public String[] getColumnName() {
        return columnName;
    }

    public void setColumnName(String[] columnName) {
        this.columnName = columnName;
    }

    public List<String[]> getRows() {
        return rows;
    }

    public void setRows(List<String[]> rows) {
        this.rows = rows;
    }
}
