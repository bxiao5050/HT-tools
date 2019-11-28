package com.sevenroad.dao.connection;

import com.sevenroad.utils.exception.DBTypeException;

/**
 * Created by Administrator on 2016/10/30.
 */
public class DBType {
    public static final int MSSQL = 1;
    public static final int PGSQL = 2;
    public static final int MYSQL = 3;
    private int type;
    private DBType(int value){
        this.type = value;
    }

    public int getType() {
        return type;
    }

    public static String getTypeName(int type) throws DBTypeException {
        switch (type){
            case 1: return  "微软SQLServer" ;
            case 2:return "PostgraSQL";
            case 3: return "MySql";
            default:throw new DBTypeException(999);
        }
    }
}
