package com.sevenroad.dao.connection;

import com.sevenroad.dao.DBUtils;
import com.sevenroad.dao.data.errorMessage;
import com.sevenroad.utils.LogUtils;
import com.sevenroad.utils.Logger;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.DataTable;
import com.sevenroad.utils.exception.moduleQueryException;

import java.sql.*;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/10/25.
 */
public class PGConnection implements DBInterface {

    public DataTable getMoreResult(ResultSet resultSet) throws SQLException {
        ResultSetMetaData rsmd = resultSet.getMetaData();
        int columnCount = rsmd.getColumnCount();
        DataTable dt = new DataTable();
        //获取列名
        String[] columnName = new String[columnCount];
        int[] columnType = new int[columnCount];
        LinkedList<String[]> rows = new LinkedList<String[]>();
        for(int i = 0;i<columnCount;i++){
            columnName[i] = rsmd.getColumnName(i+1);
            columnType[i] = rsmd.getColumnType(i+1);
        }
        while(resultSet.next()){
            String[] row = new String[columnCount];
            for(int i = 0;i<columnName.length;i++){
                row[i] = resultSet.getString(i+1);
            }
            rows.add(row);
        }
        dt.setColumNames(columnName);
        dt.setColumnTypes(columnType);
        dt.setRows(rows);
        return dt;
    }

    @Override
    public LinkedList<DataTable> getQueryResult(String sql, int connctionId, CustomParam[] params) throws Exception {
        LinkedList<DataTable> result = new LinkedList<DataTable>();
        try {
            Connection conn = connectionFactory.getPgConnection(connctionId);
            PreparedStatement state = conn.prepareStatement(DBUtils.addDBParams(sql, params));
            try {

                if (state.execute()) ;
                {
                    do {
                        ResultSet rs = state.getResultSet();
                        if (rs != null) {
                            result.add(getMoreResult(rs));
                            rs.close();
                        }
                    }
                    while ((state.getMoreResults() == true) || (state.getUpdateCount() > -1));
                }
                state.close();
                conn.close();
            }
            catch (Exception ex){
                state.close();
                conn.close();
                throw ex;
            }
        }
        catch (SQLException ex){
            Logger.getInstance().Debug(DBUtils.addDBParams(sql, params));
            Logger.getInstance().Debug(ex.getMessage());
            throw new moduleQueryException(moduleQueryException.ERROR_QUERY);
        }
        return result;
    }

    @Override
    public LinkedList<errorMessage> executeNoQuery(String sql, int connection_id) throws Exception{
        Connection conn = connectionFactory.getPgConnection(connection_id);
        LinkedList<errorMessage> result = new LinkedList<errorMessage>();
        PreparedStatement state = conn.prepareStatement(sql);
        try {
            state.execute();
            do {
                ResultSet rs = state.getResultSet();
                if (rs != null) {
                    while(rs.next()) {

                        errorMessage msg = new errorMessage();
                        msg.setError_date(rs.getTimestamp("error_date"));
                        msg.setError_message(rs.getString("error_message"));
                        msg.setMessage_type(rs.getString("error_type"));
                        if(msg.getError_message() == null||"".equals(msg.getError_message())){
                            continue;
                        }
                        result.add(msg);
                    }
                    rs.close();
                }
            }
            while ((state.getMoreResults() == true) || (state.getUpdateCount() > -1));
            state.close();
            conn.close();
        }catch (Exception ex){

            Logger.getInstance().Debug(ex.getMessage());
            state.close();
            conn.close();
            throw ex;
        }
        return result;
    }
}
