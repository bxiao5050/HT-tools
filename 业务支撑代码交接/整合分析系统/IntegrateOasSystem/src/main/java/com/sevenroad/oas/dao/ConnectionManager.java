package com.sevenroad.oas.dao;

import com.alibaba.druid.pool.DruidDataSource;
import com.sevenroad.oas.dao.imp.SqlDbImp;
import com.sevenroad.oas.dao.model.ApplictionConnection;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;

import java.sql.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * Created by linlin.zhang on 2017/4/21.
 */
@DependsOn(value = "sqlDbImp")
public class ConnectionManager {
    public static final int Fix =  0;
    public static final int MYSQL = 1;
    public static final int PGSQL = 2;
    public static final int SQLSERVER = 3;
    public static final String  SQLSERVER_DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver" ;
    public static final String  POSTGRESQL_DRIVER = "org.postgresql.Driver" ;
    public static final String  MYSQL_DRIVER = "com.mysql.jdbc.Driver" ;
    Timer timer = new Timer();

    @Autowired
    SqlDbImp sqlDbImp;
    private DruidDataSource systemPool = new DruidDataSource();
    private Map<Integer,DruidDataSource> applicationPool = new ConcurrentHashMap<Integer, DruidDataSource>();
    Logger logger = LoggerFactory.getLogger(ConnectionManager.class);
    public ConnectionManager(String driver, String url,
                             String userName, String password,
                             String getConnection){
        try {
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    Enumeration<ConcurrentLinkedQueue<Connection>> ele = workQueue.elements();
                    while (ele.hasMoreElements()){
                        ConcurrentLinkedQueue<Connection> queue = ele.nextElement();
                        if(queue.size() >= 5) {

                            Iterator<Connection> list = queue.iterator();
                            while (list.hasNext()){

                                Connection connection = list.next();
                                logger.info("clear connecitons : name - {} size - {} ",connection.toString(),queue.size());
                                try {
                                    if (!connection.isClosed()) {
                                        connection.close();
                                    }
                                    queue.remove(connection);
                                }catch (Exception e){
                                    logger.error("close connection error : msg - {}", ExceptionUtil.stacktraceToString(e));
                                }
                            }
                        }
                    }
                }
            },Calendar.getInstance().getTime(),60*1000);
            //获取系统连接池
            ApplictionConnection systemConnection = new ApplictionConnection();
            systemConnection.setType(Fix);
            systemConnection.setUser(userName);
            systemConnection.setPassword(password);
            Properties properties = GetProperties(systemConnection);
            properties.setProperty("druid.driverClassName",MYSQL_DRIVER);
            properties.setProperty("druid.url",url);
            systemPool.configFromPropety(properties);
            systemPool.init();
            //尝试获取连接
            List<ApplictionConnection> connections = getConnections(systemPool.getConnection(),getConnection);

            for(int i = 0;i<connections.size();i++){
                properties = GetProperties(connections.get(i));
                DruidDataSource dataSource = new DruidDataSource();
                dataSource.configFromPropety(properties);
                dataSource.init();
                applicationPool.put(connections.get(i).getConnectionId(),dataSource);
            }


            logger.debug("初始化系统库连接池成功:{}",url);
            //获取应用程序数据库
        }
        catch (Exception e){
            logger.error("初始化连接失败：{}",e);
        }
    }


    public Properties GetProperties(ApplictionConnection connection){
        Properties properties = new Properties();

        String jdbcUrl = "";
        switch(connection.getType()){
            case ConnectionManager.SQLSERVER:
                jdbcUrl = "jdbc:sqlserver://"+connection.getServerIp()+":"+ connection.getPort() + ";DatabaseName=" + connection.getDbName();
                properties.setProperty("driverClassName",SQLSERVER_DRIVER);
                break;
            case ConnectionManager.PGSQL:
                jdbcUrl = "jdbc:postgresql://"+connection.getServerIp() +":"+connection.getPort()+ "/" + connection.getDbName();
                properties.setProperty("driverClassName",POSTGRESQL_DRIVER);
                break;
            case ConnectionManager.MYSQL:
                jdbcUrl = "jdbc:mysql://"+connection.getServerIp()+":"+connection.getPort()+"/"+connection.getDbName()+"?allowMultiQueries=true&autoReconnect=true";
                properties.setProperty("driverClassName",MYSQL_DRIVER);
                break;
        }
        properties.setProperty("druid.url",jdbcUrl);
        properties.setProperty("druid.username",connection.getUser());
        properties.setProperty("druid.password",connection.getPassword());
        properties.setProperty("druid.initialSize","1");
        properties.setProperty("druid.minIdle","1");
        properties.setProperty("druid.maxActive","20");
        properties.setProperty("druid.maxWait","60000");
        properties.setProperty("druid.timeBetweenEvictionRunsMillis","600000");
        properties.setProperty("druid.minEvictableIdleTimeMillis","300000");
        return properties;
    }

    /**
     * 获取应用连接信息
     * @param connection 系统连接
     * @param getConnection  获取连接信息sql
     * @return
     */
    public List<ApplictionConnection> getConnections(Connection connection, String getConnection){
        try {
            PreparedStatement statement = connection.prepareStatement(getConnection);
            if(statement.execute()){
                List<ApplictionConnection> result = new ArrayList<ApplictionConnection>();
                if(statement.execute()) {
                    do {
                        ResultSet rs = statement.getResultSet();
                        if (rs != null) {
                            while(rs.next()) {
                                ApplictionConnection item = new ApplictionConnection();
                                item.setConnectionId(rs.getInt("connection_id"));
                                item.setServerName(rs.getString("server_name"));
                                item.setServerIp(rs.getString("server_ip"));
                                item.setPort(rs.getInt("port"));
                                item.setDbName(rs.getString("db_name"));
                                item.setUser(rs.getString("user"));
                                item.setPassword(rs.getString("password"));
                                item.setType(rs.getInt("type"));
                                result.add(item);
                            }
                            rs.close();
                        }
                    }
                    while ((statement.getMoreResults() == true) || (statement.getUpdateCount() > -1));
                    statement.close();
                    return result;
                }
            }
        }catch (Exception e){
            logger.error("获取连接信息失败：{}",e);
        }
        finally {
            try {
                connection.close();
            }catch (SQLException e){
                logger.error("获取连接信息失败：{}",e);
            }
        }
        return null;

    }
    ConcurrentHashMap<Integer,ConcurrentLinkedQueue<Connection>> workQueue = new ConcurrentHashMap<>();

    public Connection getConnection(int connectionId){
        try {
            Connection connection;
            if (connectionId == 0)
                connection = systemPool.getConnection();
            else connection = applicationPool.get(connectionId).getConnection();

            if(!workQueue.containsKey(connectionId)){
                synchronized (workQueue){
                    if(!workQueue.containsKey(connectionId)) {
                        workQueue.put(connectionId, new ConcurrentLinkedQueue<Connection>());
                    }
                }
            }
            workQueue.get(connectionId).add(connection);
            return  connection;
        }catch (Exception e){
            logger.error("获取连接失败：connection_Id-{},error:{}",connectionId,e);
        }
        return null;
    }


}
