package com.dataprovider.dao;

import com.dataprovider.dao.models.Column;
import com.dataprovider.dao.models.IntergrateTable;
import com.dataprovider.dao.models.Table;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/30.
 */
public class CustomDBQuery {

    private static Logger logger= LoggerFactory.getLogger(CustomDBQuery.class);

    private static Table getResultSetColumn(ResultSet rs) throws Exception{
        ResultSetMetaData metaData = rs.getMetaData();
        int[] types = new int[metaData.getColumnCount()];
        Table table = new Table();
        String[] names = new String[metaData.getColumnCount()];
        for(int i = 0;i<types.length;i++){
            types[i] = metaData.getColumnType(i+1);
            names[i] = metaData.getColumnName(i+1);
        }
        table.setColumnName(names);
        table.setColumnType(types);
        List<String[]> rows = new ArrayList<String[]>();
        while (rs.next()){
            String[] row = new String[metaData.getColumnCount()];
            for(int i = 0;i<names.length;i++){
                row[i] = rs.getString(names[i]);
            }
            rows.add(row);
        }
        table.setRows(rows);
        return table;
    }
    private static IntergrateTable getIntergrateTable(ResultSet resultSet) {
        IntergrateTable dt = new IntergrateTable();
        try {
            ResultSetMetaData rsmd = resultSet.getMetaData();
            int columnCount = rsmd.getColumnCount();

            List<Column> columns = new ArrayList<Column>();
            for (int i = 1; i <= columnCount; i++) {
                Column column = new Column();
                column.setColumnIndex(i);
                column.setColumnName(rsmd.getColumnName(i));
                column.setColumnType(rsmd.getColumnType(i));
                column.setRowData(new ArrayList());
                columns.add(column);
            }
            int rowCount = 0;
            while (resultSet.next()) {
                for (int i = 0; i < columns.size(); i++) {
                    Column column = columns.get(i);
                    column.getRowData().add(resultSet.getString(column.getColumnIndex()));
                }
                rowCount++;
            }
            dt.setResult(columns);
            dt.setRowCount(rowCount);
        } catch (Exception e) {
        }

        return dt;
    }
    private SqlSession session;
    public CustomDBQuery(SqlSession session){
        this.session = session;
    }

    public List<Table> GetQueryResult(String sql){
        List<Table> result = new ArrayList<Table>();
        try {
            Connection connection = session.getConnection();
            Statement statement = connection.createStatement();
            statement.execute(sql);
            do {
                ResultSet rs = statement.getResultSet();
                if(rs == null) continue;
                Table table = getResultSetColumn(rs);
                result.add(table);
            }while (statement.getMoreResults()||statement.getUpdateCount()!=-1);

        }
        catch (Exception e){
            System.out.print("query error : "+ e);
        }
        return result;
    }

    public List<IntergrateTable> GetIntergrateResult(String sql){
        List<IntergrateTable> result = new ArrayList<IntergrateTable>();
        try {
            Connection connection = session.getConnection();
            Statement statement = connection.createStatement();
            statement.execute(sql);
            do {
                ResultSet rs = statement.getResultSet();
                if(rs == null) continue;
                IntergrateTable table = getIntergrateTable(rs);
                result.add(table);
            }while (statement.getMoreResults()||statement.getUpdateCount()!=-1);

        }
        catch (Exception e){
            logger.error("query error:{}",e.getMessage(),e);
            System.out.print("query error : "+ e);
        }
        return result;
    }
}
