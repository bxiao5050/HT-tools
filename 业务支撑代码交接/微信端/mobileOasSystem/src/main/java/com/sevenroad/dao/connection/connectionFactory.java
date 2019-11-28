package com.sevenroad.dao.connection;

import com.alibaba.druid.pool.DruidDataSource;
import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.sevenroad.cache.data.connectionCache;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Properties;

/**
 * Created by linlin.zhang on 2016/10/25.
 */
public class connectionFactory {
    private static DruidDataSource systemDB = new DruidDataSource();
    private static HashMap<String,DruidDataSource> PGDS = new HashMap<String,DruidDataSource>();
    private static HashMap<String,DruidDataSource> MSSQLDS = new HashMap<String,DruidDataSource>();
    private static HashMap<String,DruidDataSource> MySQLDS = new HashMap<String,DruidDataSource>();
    public static void initail(String driver,String url,String userName,String password){
        try {
            Properties properties = new Properties();
            properties.setProperty("driverClassName",driver);
            properties.setProperty("druid.url",url);
            properties.setProperty("druid.username",userName);
            properties.setProperty("druid.password",password);
            properties.setProperty("druid.initialSize","1");
            properties.setProperty("druid.minIdle","1");
            properties.setProperty("druid.maxActive","20");
            properties.setProperty("druid.maxWait","60000");
            properties.setProperty("druid.timeBetweenEvictionRunsMillis","600000");
            properties.setProperty("druid.minEvictableIdleTimeMillis","300000");
            systemDB.setConnectProperties(properties);
            systemDB.init();
        }
        catch (Exception ex){
            System.out.println("初始化系统库失败："+ex.getMessage());
        }
    }
    public static Properties GetProperties(com.sevenroad.dao.data.Connection connInfo ){
        Properties properties = new Properties();

        String jdbcUrl = "";
        switch(connInfo.dbType){
            case DBType.MSSQL:
                jdbcUrl = "jdbc:sqlserver://"+connInfo.server + ";DatabaseName=" + connInfo.dbName;
                properties.setProperty("driverClassName","com.microsoft.jdbc.sqlserver.SQLServerDriver");
                break;
            case DBType.PGSQL:
                jdbcUrl = "jdbc:postgresql://"+connInfo.server + "/" + connInfo.dbName;
                properties.setProperty("driverClassName","org.postgresql.Driver");
                break;
            case DBType.MYSQL:
                jdbcUrl = "jdbc:mysql://"+connInfo.server+"/"+connInfo.dbName+"?allowMultiQueries=true&autoReconnect=true";
                properties.setProperty("driverClassName","com.mysql.jdbc.Driver");
                break;
        }
        properties.setProperty("druid.url",jdbcUrl);
        properties.setProperty("druid.username",connInfo.userName);
        properties.setProperty("druid.password",connInfo.password);
        properties.setProperty("druid.initialSize","1");
        properties.setProperty("druid.minIdle","1");
        properties.setProperty("druid.maxActive","20");
        properties.setProperty("druid.maxWait","60000");
        properties.setProperty("druid.timeBetweenEvictionRunsMillis","600000");
        properties.setProperty("druid.minEvictableIdleTimeMillis","300000");
        return properties;
    }

    public static void initailGameDS(){
        try {
            connectionCache cache = new connectionCache();
            com.sevenroad.dao.data.Connection[] connInfo = cache.getConnections();
           for(int i = 0;i<connInfo.length;i++)
            {
                com.sevenroad.dao.data.Connection connItem = connInfo[i];
                DruidDataSource ds = new DruidDataSource();
                ds.setConnectProperties(GetProperties(connItem));
                ds.init();
                String connctionId = String.valueOf(connItem.connectionId);
                switch (connItem.dbType) {
                    case DBType.MSSQL:MSSQLDS.put(connctionId,ds);break;
                    case DBType.PGSQL:PGDS.put(connctionId,ds);break;
                    case DBType.MYSQL:MySQLDS.put(connctionId,ds);break;
                }
                Connection connection = ds.getConnection();
                connection.close();
            }
        }
        catch (Exception ex){
            System.out.println("初始化游戏失败："+ex.getMessage());
        }
    }
    public static Connection getMySQLConnection(int connectionId){
        try {
            String strConnection = String.valueOf(connectionId);
            if (MySQLDS.containsKey(strConnection))
                return MySQLDS.get(strConnection).getConnection();
            return null;
        }
        catch (SQLException ex){
            System.out.println("获取连接"+connectionId+"失败");
            return null;
        }
    }
    public static Connection getPgConnection(int connectionId){
        try {
            String strConnection = String.valueOf(connectionId);
            if (PGDS.containsKey(strConnection))
                return PGDS.get(strConnection).getConnection();
            return null;
        }
        catch (SQLException ex){
            System.out.println("获取连接"+connectionId+"失败");
            return null;
        }
    }
    public static Connection getMSSQLConnection(int connectionId){
        try {
            String strConnection = String.valueOf(connectionId);
            if (MSSQLDS.containsKey(strConnection))
                return MSSQLDS.get(strConnection).getConnection();
            return null;
        }
        catch (SQLException ex){
            System.out.println("获取连接"+connectionId+"失败");
            return null;
        }
    }
    public static Connection getSystemConnection(){
        try {
            Connection con = systemDB.getConnection();
            return con;
        }  catch (SQLException ex){
            System.out.println("获取系统库连接失败");
            return null;
        }
    }
}
