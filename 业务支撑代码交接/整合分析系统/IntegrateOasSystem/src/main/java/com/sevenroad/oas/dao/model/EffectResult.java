package com.sevenroad.oas.dao.model;

/**
 * Created by linlin.zhang on 2017/4/20.
 */

import com.sevenroad.oas.dao.DBModel;

import java.sql.Connection;
import java.util.List;

/**
 * 影响结果
 */
public class EffectResult extends DBModel {
    private int effectRows;
    private String table;
    private String connectionName;
    private Connection connection;

    @Override
    public String getExecute() {
        return null;
    }

    @Override
    public List<DBParam> getParams() {
        return null;
    }
    public int getEffectRows() {
        return effectRows;
    }

    public void setEffectRows(int effectRows) {
        this.effectRows = effectRows;
    }

    public String getTable() {
        return table;
    }

    public void setTable(String table) {
        this.table = table;
    }

    public String getConnectionName() {
        return connectionName;
    }

    public void setConnectionName(String connectionName) {
        this.connectionName = connectionName;
    }

    @Override
    public Connection getConnection() {
        return connection;
    }

    public void setConnection(Connection connection) {
        this.connection = connection;
    }
}
