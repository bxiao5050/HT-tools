package com.sevenroad.dao;

import com.sevenroad.cache.data.connectionCache;
import com.sevenroad.cache.data.dataViewCache;
import com.sevenroad.cache.data.systemCache;
import com.sevenroad.dao.connection.*;
import com.sevenroad.dao.data.*;
import com.sevenroad.dao.data.Connection;
import com.sevenroad.utils.data.*;
import com.sevenroad.utils.config.systemConfig;

import java.sql.*;
import java.util.HashMap;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/11/4.
 */
public class DBUtils {
    private static dataViewCache dataviewCache = new dataViewCache();
    protected static dataViewCache getDataviewCache(){
        if(dataviewCache == null) dataviewCache = new  dataViewCache();
        return dataviewCache;
    }
    public static void addDBParams(PreparedStatement state, CustomParam[] params) throws SQLException{
        if(params == null || params.length == 0) return ;
        else
        {
            for (int i = 0; i < params.length; i++) {
                switch (params[i].getParamType()) {
                    case 1:
                        state.setInt(params[i].getIndex(), params[i].getIntValue());
                        break;
                    case 2:
                        state.setString(params[i].getIndex(), params[i].getStringValue());
                        break;
                    case 3:
                        state.setString(params[i].getIndex(), params[i].getStringValue());
                        break;
                    default:
                        state.setString(params[i].getIndex(), params[i].getStringValue());
                        break;
                }
            }
        }
    }
    public static String addDBParams(String sql,CustomParam[] params)throws  SQLException{
        StringBuilder sb = new StringBuilder(sql);
        int pos = sb.indexOf("?"),paramsIndex = 0;
        String value = "";
        while(pos != -1){
            switch (params[paramsIndex].getParamType()){
                case 1 :value = String.valueOf(params[paramsIndex].getIntValue());break;
                case 2 :
                case 3 :value = "'"+ params[paramsIndex].getStringValue()+"'";break;
                default:value = params[paramsIndex].getStringValue();break;
            }
            paramsIndex++;
            sb.replace(pos,pos+1,value);
            pos = sb.indexOf("?",pos+1);
        }
        return sb.toString();
    }
    public static LinkedList<DataTable> getQueryResult(DataView dataView, paramsList params) throws Exception{
        DBInterface dbInterface = null;
        int conneciton_id = dataView.getConnctionId();
        systemCache cache = new systemCache();
        //从游戏配置库里取连接
        if(conneciton_id == 0) {
            conneciton_id =  cache.getSystemGame(params.getSystem_id(),params.getGame_id()).getConnectionId();
        }
        connectionCache connectionCache = new connectionCache();
        switch(connectionCache.getConnection(conneciton_id).dbType)
        {
            case DBType.MSSQL:dbInterface = new MSSQLConnection();break;
            case DBType.PGSQL:dbInterface = new PGConnection();break;
            case DBType.MYSQL:dbInterface = new MySqlConnection();break;
        }
        LinkedList<DataTable> result = dbInterface.getQueryResult(dataView.getSelectCommand(),conneciton_id,params.getParams());

        //过滤表
        int[] exportTable = dataView.getExportTable();
        LinkedList<DataTable> grep = new LinkedList<DataTable>();
        for(int i = 0;i<exportTable.length;i++){
            if(i<result.size()){
                grep.add(result.get(exportTable[i]-1));
            }
        }
        result = grep;
        //添加表名
        String[] tableNames = dataView.getExportTableName();
        for(int i = 0;i<result.size();i++){
            if(tableNames.length > i)
            result.get(i).setTableName(tableNames[i]);
            else result.get(i).setTableName("sheet"+i);
        }
        return result;
    }
    public static Connection[] getConnection(){
        SystemConnection dbInterface = new SystemConnection();
        return dbInterface.getConnections(systemConfig.getDataViewConfig().sysGetConnection);
    }
    public static HashMap<String,DataView> getDataView(){
        SystemConnection dbInterface = new SystemConnection();
        return dbInterface.getDataView(systemConfig.getDataViewConfig().sysGetDataView);
    }

    public static HashMap<String,appConfig> getAppConfig() throws Exception{
        SystemConnection dbInterface = new SystemConnection();
        return dbInterface.getAppConfig();
    }

    public static HashMap<String,DataView> getDataViewFromPG(){
        SystemConnection dbInterface = new SystemConnection();
        return dbInterface.getDataView(systemConfig.getDataViewConfig().sysGetPGDataView);
    }
    public static HashMap<String,systemInfo> getSystemInfo() throws Exception{
        SystemConnection dbInterface = new SystemConnection();
        dataViewCache cache = getDataviewCache();
        DataView dataView = cache.getDataView(systemConfig.getDataViewConfig().sysGetGameConfig);
        return dbInterface.getSystemInfo(dataView.getSelectCommand());
    }
    public static HashMap<String,userInfo> getUserInfo()  throws Exception{
        dataViewCache cache = getDataviewCache();
        DataView dataView = cache.getDataView(systemConfig.getDataViewConfig().sysGetUserInfo);
        SystemConnection dbInterface = new SystemConnection();
        return dbInterface.getUserInfo(dataView.getSelectCommand());
    }
    public static HashMap<String,String> getChannel() throws Exception{
        dataViewCache cache = getDataviewCache();
        DataView dataView = cache.getDataView(systemConfig.getDataViewConfig().sysGetGameChannel,DBType.PGSQL);
        connectionCache conections = new connectionCache();
        int dbype = conections.getConnection(dataView.getConnctionId()).dbType;
        SystemConnection dbInterface = new SystemConnection();
       return dbInterface.getChannle(dataView,dbype);
    }
    public static LinkedList<errorMessage> executeNoQuery(String sql, int connection_id) throws Exception{
        connectionCache connectionCache = new connectionCache();
        DBInterface dbInterface = null;
        switch(connectionCache.getConnection(connection_id).dbType)
        {
            case DBType.MSSQL:dbInterface = new MSSQLConnection();break;
            case DBType.PGSQL:dbInterface = new PGConnection();break;
            case DBType.MYSQL:dbInterface = new MySqlConnection();break;
        }
        return dbInterface.executeNoQuery(sql,connection_id);
    }

}
