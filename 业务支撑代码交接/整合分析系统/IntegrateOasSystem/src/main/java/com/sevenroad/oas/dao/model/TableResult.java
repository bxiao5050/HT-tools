package com.sevenroad.oas.dao.model;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/18.
 */
public class TableResult {
    private List<Column> result;
    private int rowCount;
    public List<Column> getResult() {
        return result;
    }

    public void setResult(List<Column> result) {
        this.result = result;
    }

    public int getRowCount() {
        return rowCount;
    }

    public void setRowCount(int rowCount) {
        this.rowCount = rowCount;
    }
}
