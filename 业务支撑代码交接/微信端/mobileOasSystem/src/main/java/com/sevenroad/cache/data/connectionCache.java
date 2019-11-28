package com.sevenroad.cache.data;

import com.sevenroad.dao.DBUtils;
import com.sevenroad.dao.connection.SystemConnection;
import com.sevenroad.dao.data.Connection;

/**
 * Created by linlin.zhang on 2016/11/4.
 */
public class connectionCache  {
    private Connection[] Connection = null;
    public Connection getConnection(int connectionId){
        if(Connection == null) {
           Connection = DBUtils.getConnection();
        }
        for(int i = 0;i<Connection.length;i++){
            if(Connection[i].connectionId == connectionId)
                return Connection[i];
        }
        return null;
    }
    public Connection[] getConnections(){
        if(Connection == null) {
            Connection = DBUtils.getConnection();
        }
        return Connection;
    }
}
