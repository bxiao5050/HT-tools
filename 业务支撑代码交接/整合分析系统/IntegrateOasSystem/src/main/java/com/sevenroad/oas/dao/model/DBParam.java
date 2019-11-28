package com.sevenroad.oas.dao.model;

import java.sql.Types;

/**
 * Created by linlin.zhang on 2017/4/20.
 */
public class DBParam {
    public static final int STRING_PARAM = Types.VARCHAR;
    public static final int INT_PARAM = Types.INTEGER;
    public static final int DATE_PARAM = Types.DATE;
    public static final int DOUBLE_PARAM  = Types.DOUBLE;
    private int dbType;
    private String paramName;
    private String paramValue;

    /**
     *
     * @param dbType 类型
     * @param paramName  参数名
     * @param paramValue 参数值
     */
    public DBParam(int dbType,String paramName,String paramValue){
        this.dbType = dbType;
        this.paramName = paramName;
        this.paramValue = paramValue;
    }

    public int getDbType() {
        return dbType;
    }

    public void setDbType(int dbType) {
        this.dbType = dbType;
    }

    public String getParamName() {
        return paramName;
    }

    public void setParamName(String paramName) {
        this.paramName = paramName;
    }

    public String getParamValue() {
        return paramValue;
    }

    public void setParamValue(String paramValue) {
        this.paramValue = paramValue;
    }
}
