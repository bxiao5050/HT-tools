package com.sevenroad.oas.dao.model;

/**
 * Created by linlin.zhang on 2017/4/21.
 */
public class DataView {
    private int dataViewId;
    private int connectionId;
    private String dataviewName;
    private String selectCommand;
    private String exportCommand;
    private String insertCommand;
    private String editCommand;
    private String delCommand;
    private int[] exportTable;
    private String[] exportName;
    private int cacheTime;

    public int getConnectionId() {
        return connectionId;
    }

    public String getDataviewName() {
        return dataviewName;
    }

    public void setDataviewName(String dataviewName) {
        this.dataviewName = dataviewName;
    }

    public void setConnectionId(int connectionId) {
        this.connectionId = connectionId;
    }

    public String getSelectCommand() {
        return selectCommand;
    }

    public void setSelectCommand(String selectCommand) {
        this.selectCommand = selectCommand;
    }

    public String getExportCommand() {
        return exportCommand;
    }

    public void setExportCommand(String exportCommand) {
        this.exportCommand = exportCommand;
    }

    public String getInsertCommand() {
        return insertCommand;
    }

    public void setInsertCommand(String insertCommand) {
        this.insertCommand = insertCommand;
    }

    public String getEditCommand() {
        return editCommand;
    }

    public void setEditCommand(String editCommand) {
        this.editCommand = editCommand;
    }

    public String getDelCommand() {
        return delCommand;
    }

    public void setDelCommand(String delCommand) {
        this.delCommand = delCommand;
    }

    public int[] getExportTable() {
        return exportTable;
    }

    public void setExportTable(int[] exportTable) {
        this.exportTable = exportTable;
    }

    public String[] getExportName() {
        return exportName;
    }

    public void setExportName(String[] exportName) {
        this.exportName = exportName;
    }

    public int getCacheTime() {
        return cacheTime;
    }

    public void setCacheTime(int cacheTime) {
        this.cacheTime = cacheTime;
    }

    public int getDataViewId() {
        return dataViewId;
    }

    public void setDataViewId(int dataViewId) {
        this.dataViewId = dataViewId;
    }
}
