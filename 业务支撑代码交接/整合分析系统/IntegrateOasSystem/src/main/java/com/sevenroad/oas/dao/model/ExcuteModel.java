package com.sevenroad.oas.dao.model;

import com.sevenroad.oas.dao.DBModel;

import java.sql.Connection;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/25.
 */
public class ExcuteModel extends DBModel {
    private DataView dataView;
    private int gameId;
    private List<DBParam> params;
    private Connection connection;
    public ExcuteModel(DataView dataView,int gameId,List<DBParam> Params){
        this.dataView = dataView;
        this.gameId = gameId;
        this.params = Params;
    }
    public Connection getConnection() {
        return connection;
    }

    public List<DBParam> getParams() {
        return params;
    }

    public DataView getDataView() {
        return dataView;
    }

    @Override
    public String getExecute() {
        switch (getExecuteType())
        {
            case ADD_COMMAND:return dataView.getInsertCommand();
            case DELETE_COMMAND:return dataView.getDelCommand();
            case EDIT_COMMAND:return dataView.getEditCommand();
            case QUERY_COMMAND:return dataView.getSelectCommand();
            case EXPORT_COMMAND:return dataView.getExportCommand();
        }
        return dataView.getSelectCommand();
    }

    public void setDataView(DataView dataView) {
        this.dataView = dataView;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public void setParams(List<DBParam> params) {
        this.params = params;
    }

    public void setConnection(Connection connection) {
        this.connection = connection;
    }
}
