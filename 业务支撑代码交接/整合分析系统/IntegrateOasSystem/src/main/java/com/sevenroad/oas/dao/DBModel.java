package com.sevenroad.oas.dao;

import com.sevenroad.oas.dao.model.DBParam;

import java.sql.Connection;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/18.
 */
public abstract class DBModel {
    public static final int ADD_COMMAND = 1;
    public static final int DELETE_COMMAND = 2;
    public static final int EDIT_COMMAND = 3;
    public static final int QUERY_COMMAND = 4;
    public static final int EXPORT_COMMAND = 5;
    private int executeType = 4;
    private int connectionId;
    public abstract Connection getConnection();
    public abstract String getExecute();
    public abstract List<DBParam> getParams();

    public int getConnectionId() {
        return connectionId;
    }

    public void setConnectionId(int connectionId) {
        this.connectionId = connectionId;
    }

    public int getExecuteType() {
        return executeType;
    }
    public void setExecuteType(int executeType) {
        this.executeType = executeType;
    }
}
