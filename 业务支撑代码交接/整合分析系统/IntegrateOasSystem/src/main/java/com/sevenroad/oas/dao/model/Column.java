package com.sevenroad.oas.dao.model;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/18.
 */
public class Column {
    /**
     * ����������
     */
    private int columnType;
    /**
     * ����
     */
    private String columnName;
    /**
     * ������
     */
    private int columnIndex;
    /**
     * ������
     */
    private List<String> rowData;

    public int getColumnType() {
        return columnType;
    }

    public void setColumnType(int columnType) {
        this.columnType = columnType;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public int getColumnIndex() {
        return columnIndex;
    }

    public void setColumnIndex(int columnIndex) {
        this.columnIndex = columnIndex;
    }

    public List<String> getRowData() {
        return rowData;
    }

    public void setRowData(List<String> rowData) {
        this.rowData = rowData;
    }
}
