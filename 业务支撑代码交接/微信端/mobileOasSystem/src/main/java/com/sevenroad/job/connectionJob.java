package com.sevenroad.job;

import com.sevenroad.dao.connection.DBType;
import com.sevenroad.dao.connection.SystemConnection;
import com.sevenroad.dao.connection.connectionFactory;
import com.sevenroad.dao.data.Connection;
import com.sevenroad.dao.data.errorMessage;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import java.sql.Timestamp;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2017/1/3.
 */
public class connectionJob implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        Connection[] connections = CacheSigleton.getconnectionCache().getConnections();
        SystemConnection conn = new SystemConnection();
        LinkedList<errorMessage> errors = new LinkedList<errorMessage>();
        try {
            for (int i = 0; i < connections.length; i++) {
                java.sql.Connection con = null;
                try {
                    switch (connections[i].dbType) {
                        case DBType.MSSQL:
                            con = connectionFactory.getMSSQLConnection(connections[i].connectionId);
                            break;
                        case DBType.MYSQL:
                            con = connectionFactory.getMySQLConnection(connections[i].connectionId);
                            break;
                        case DBType.PGSQL:
                            con = connectionFactory.getPgConnection(connections[i].connectionId);
                            break;
                    }
                    if (con == null) {
                        errorMessage errorMessage = new errorMessage();
                        errorMessage.setError_date(new Timestamp(java.util.Calendar.getInstance().getTimeInMillis()));
                        errorMessage.setMessage_type("数据库连接异常");
                        errorMessage.setError_message("无法连接到" + connections[i].dbName);
                        errors.add(errorMessage);
                    } else con.close();
                } catch (Exception ex) {
                    Logger.getInstance().Error(ex);
                    con = null;
                }
            }
            if(errors.size()>0) {
                conn.insertErrorMessage(errors.toArray(new errorMessage[errors.size()]));
            }
        }catch (Exception ex){
            Logger.getInstance().Error(ex);
        }
    }
}
