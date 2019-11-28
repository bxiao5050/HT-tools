package com.sevenroad.dao.data;

import sun.security.krb5.internal.crypto.Des;

/**
 * Created by linlin.zhang on 2016/10/28.
 */
public class DataView {
    private String DataViewName;
    private int ConnctionId;
    private String SelectCommand;
    private String ExportCommand;
    private String Description;
    private int[] ExportTable;
    private String[] ExportTableName;
    private int expiredTime;
    public DataView(String dataViewName,int connctionId,String selectCommand,String exportCommand,int[] exportTable,String[] exportTableName,int expiredTime,String Description){
        this.DataViewName = dataViewName;
        this.ConnctionId = connctionId;
        this.SelectCommand = selectCommand;
        this.ExportCommand = exportCommand;
        this.ExportTable = exportTable;
        this.ExportTableName = exportTableName;
        this.expiredTime = expiredTime;
        this.Description = Description;
    }
    public String getDataViewName(){
        return DataViewName;
    }
    public int getConnctionId(){
        return ConnctionId;
    }
    public String getSelectCommand(){
        return SelectCommand;
    }
    public String getExportCommand(){
        return ExportCommand;
    }
    public int[] getExportTable(){
        return ExportTable;
    }
    public String[] getExportTableName() {
        return ExportTableName;
    }
    public int getExpiredTime(){return expiredTime;}

    public String getDescription() {
        return Description;
    }
}
