package com.sevenroad.oas.dao.imp;

import com.sevenroad.oas.dao.IDBInterceptor;
import com.sevenroad.oas.dao.DBModel;
import com.sevenroad.oas.dao.IDao;
import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.model.EffectResult;
import com.sevenroad.oas.dao.model.TableResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/20.
 */
@Service
public class SqlDbImp implements IDao<TableResult> {

    private List<IDBInterceptor> interceptors = new ArrayList<IDBInterceptor>();
    public void setInterceptors(List<IDBInterceptor> interceptors) {
        this.interceptors = interceptors;
    }
    public List<EffectResult> execute(DBModel model) {
        Connection connection = null;
        PreparedStatement statement = null;
        try {
            //参数替换
            String sql = Utils.sqlGenerate(model.getExecute(),model.getParams());
            connection = model.getConnection();
            statement = connection.prepareStatement(sql);
            List<EffectResult> result = new ArrayList<EffectResult>();
            statement.execute();
            do {
                ResultSet rs = statement.getResultSet();
                if (rs != null) {
                    while(rs.next()) {
                        EffectResult effectResult = new EffectResult();
                        effectResult.setConnectionName(connection.toString());
                        effectResult.setEffectRows(rs.getInt("effect_row"));
                        effectResult.setTable(rs.getString("effect_table"));
                        result.add(effectResult);
                    }
                }
            }
            while ((statement.getMoreResults() == true) || (statement.getUpdateCount() > -1));
            return result;
        }
        catch (SQLException e){
            logger.error("select error {}",e);
        }
        finally {
            try {
                connection.close();
            }
            catch (SQLException e){
                logger.error("select error {}",e);
            }
        }
        return null;
    }
    Logger logger = LoggerFactory.getLogger(SqlDbImp.class);
    public List<TableResult> select(DBModel model) {
        //查询之前的拦截器
        for(int i = 0;i<interceptors.size();i++){
            if(interceptors.get(i).preExecute(model) == false )
                return null;
        }
        Connection connection = null;
        PreparedStatement statement = null;

        try {
            //参数替换
            String sql = Utils.sqlGenerate(model.getExecute(),model.getParams());
            connection = model.getConnection();
            statement = connection.prepareStatement(sql);
            List<TableResult> result = new ArrayList<TableResult>();
            statement.execute();
            do {
                ResultSet rs = statement.getResultSet();
                if (rs != null) {
                    result.add(Utils.getMoreResult(rs));
                    rs.close();
                }
            }
            while ((statement.getMoreResults() == true) || (statement.getUpdateCount() > -1));
            //查询完成后的拦截器
            for(int i = 0;i<interceptors.size();i++){
                if(interceptors.get(i).afterExecute(result) == false )
                    return null;
            }
            statement.close();
            return result;
        }
        catch (SQLException e){
            logger.error("select error {}",e);
        }
        finally {
            try {
                connection.close();
            }
            catch (SQLException e){
                logger.error("select error {}",e);
            }
        }
        return null;
    }
}
