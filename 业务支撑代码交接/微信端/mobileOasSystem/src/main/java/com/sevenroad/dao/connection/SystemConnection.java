package com.sevenroad.dao.connection;

import com.sevenroad.cache.data.systemCache;
import com.sevenroad.dao.data.*;
import com.sevenroad.dao.data.Connection;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.sql.*;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by linlin.zhang on 2016/11/4.
 */
public class SystemConnection {
    public Connection[] getConnections(String sql) {
        LinkedList<Connection> result = new LinkedList<Connection>();
        try {
            java.sql.Connection conn = connectionFactory.getSystemConnection();
            Statement state = conn.createStatement();
            ResultSet rs = state.executeQuery(sql);
            try {
                while (rs.next()) {
                    Connection connInfo = new Connection();
                    connInfo.connectionId = rs.getInt("id");
                    connInfo.dbName = rs.getString("db_name");
                    connInfo.server = rs.getString("server");
                    connInfo.userName = rs.getString("user_name");
                    connInfo.password = rs.getString("password");
                    connInfo.dbType = rs.getInt("type");
                    result.add(connInfo);
                }
                rs.close();
                state.close();
                conn.close();
            } catch (Exception ex) {
                rs.close();
                state.close();
                conn.close();
                throw ex;
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return result.toArray(new Connection[result.size()]);
    }

    public HashMap<String, DataView> getDataView(String sql) {
        HashMap<String, DataView> result = new HashMap<String, DataView>();
        try {
            java.sql.Connection conn = connectionFactory.getSystemConnection();
            Statement state = conn.createStatement();
            try {
                ResultSet rs = state.executeQuery(sql);
                while (rs.next()) {
                    String[] exported_table = rs.getString("exported_table").split(",");
                    int[] exported_index = new int[exported_table.length];
                    for (int i = 0; i < exported_table.length; i++)
                        exported_index[i] = Integer.parseInt(exported_table[i]);
                    DataView dataView = new DataView(rs.getString("dataview_name"), rs.getInt("conection_id"),
                            rs.getString("selected_command"), rs.getString("exported_command"), exported_index,
                            rs.getString("exported_table_name").split(","), rs.getInt("cache_time"), rs.getString("description"));
                    ;
                    result.put(dataView.getDataViewName(), dataView);
                }
                state.close();
                conn.close();
            } catch (Exception ex) {
                state.close();
                conn.close();
                throw ex;
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return result;
    }

    public HashMap<String, systemInfo> getSystemInfo(String sql) {
        HashMap<String, systemInfo> result = new HashMap<String, systemInfo>();
        try {
            java.sql.Connection conn = connectionFactory.getSystemConnection();
            Statement state = conn.createStatement();
            ResultSet rs = state.executeQuery(sql);
            try {
                while (rs.next()) {
                    systemInfo systemInfo = null;
                    int system_id = rs.getInt("system_id");
                    if (result.containsKey(String.valueOf(system_id))) {
                        systemInfo = result.get(String.valueOf(system_id));
                        systemInfo.gameInfos.add(new gameInfo(rs.getInt("game_id"), rs.getString("game_name"), rs.getString("agent_id"),
                                rs.getString("channel_id"), rs.getString("menu_id"), rs.getInt("connection_id"), rs.getInt("type"), rs.getString("image_url")));
                    } else {
                        systemInfo = new systemInfo();
                        systemInfo.system_id = system_id;
                        systemInfo.system_name = rs.getString("system_name");
                        systemInfo.gameInfos.add(new gameInfo(rs.getInt("game_id"), rs.getString("game_name"), rs.getString("agent_id"),
                                rs.getString("channel_id"), rs.getString("menu_id"), rs.getInt("connection_id"), rs.getInt("type"), rs.getString("image_url")));
                        result.put(String.valueOf(system_id), systemInfo);
                    }
                }
                rs.close();
                state.close();
                conn.close();
            } catch (Exception ex) {
                rs.close();
                state.close();
                conn.close();
                throw ex;
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return result;
    }

    //id	open_id	unite_id	wx_user_name	user_name	wx_image_head	language
    public HashMap<String, userInfo> getUserInfo(String sql) throws Exception{
        HashMap<String, userInfo> result = new HashMap<String, userInfo>();
        try {
            java.sql.Connection conn = connectionFactory.getSystemConnection();
            Statement state = conn.createStatement();
            try {
                ResultSet rs = state.executeQuery(sql);
                while (rs.next()) {
                    result.put(rs.getString("unite_id"), new userInfo(
                            rs.getString("unite_id"),
                            rs.getString("open_id"),
                            URLDecoder.decode(rs.getString("wx_user_name"),"utf-8"),
                            rs.getString("user_name"),
                            rs.getString("safe_code")
                    ));
                }
                rs.close();
                state.close();
                conn.close();
            } catch (Exception ex) {
                state.close();
                conn.close();
                throw ex;
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return result;
    }

    public int writeSystemLogInfo(systemLog log) throws Exception {
        java.sql.Connection conn = connectionFactory.getSystemConnection();
        int result = 0;
        String sql = "INSERT INTO `mobile_oas_system`.`t_l_user_login` ( `user_name`, `wx_user_name`, `event_type`, `event_info`, `login_date`, `ip`) VALUES (?, ?, ?, ?, ?, ?);";
        PreparedStatement state = conn.prepareStatement(sql);
        try {
            state.setString(1, log.getUser_name());
            state.setString(2, URLEncoder.encode(log.getWx_user_name(), "utf-8"));
            state.setString(3, log.getEvent_type());
            state.setString(4, log.getEvent_info());
            state.setTimestamp(5, new Timestamp(log.getLogin_date().getTime()));
            state.setString(6, log.getRemote_ip());
            result = state.executeUpdate();
            state.close();
            conn.close();
        } catch (Exception ex) {
            state.close();
            conn.close();
            throw ex;
        }
        return result;

    }
    public LinkedList<jobItem> getJob() throws Exception{
        java.sql.Connection conn = connectionFactory.getSystemConnection();
        Statement state = conn.createStatement();
        LinkedList<jobItem> result = new LinkedList<jobItem>();
        try {
            ResultSet rs = state.executeQuery("select * from t_e_job where state = 1");

            while (rs.next()) {
                jobItem item = new jobItem();
                item.setJobId(rs.getInt("job_id"));
                item.setConnectionId(rs.getInt("connection_id"));
                item.setSql(rs.getString("sql"));
                item.setStartTime(rs.getTimestamp("start_time"));
                item.setInterval(rs.getInt("interval"));
                item.setMessage(rs.getString("message"));
                item.setType(rs.getInt("type"));
                result.add(item);
            }
            rs.close();
            state.close();
            conn.close();
        }
        catch (Exception ex){
            state.close();
            conn.close();
        }
        return result;

    }
    public int updateJob(jobItem job) throws Exception{
        java.sql.Connection conn = connectionFactory.getSystemConnection();
        int count = 0;
        PreparedStatement state = conn.prepareStatement("update t_e_job set start_time = ?,message = ? where job_id = ? ");
        try {
            state.setTimestamp(1, job.getStartTime());
            state.setString(2, job.getMessage());
            state.setInt(3, job.getJobId());
            count = state.executeUpdate();
            state.close();
            conn.close();
        }catch (Exception ex) {
            state.close();
            conn.close();
            throw ex;
        }
        return count;
    }
    public int updateErrorMessage(int[] msgId) throws Exception{
        java.sql.Connection conn = connectionFactory.getSystemConnection();
        int[] count;
        conn.setAutoCommit(false);
        PreparedStatement state = conn.prepareStatement("update t_e_error_message set state = 0 where id = ? ");
        try {
            for(int i = 0;i<msgId.length;i++) {
                state.setInt(1, msgId[i]);
                state.addBatch();
            }
            count = state.executeBatch();
            state.close();
            conn.setAutoCommit(true);
            conn.close();
        }catch (Exception ex) {
            state.close();
            conn.setAutoCommit(true);
            conn.close();
            throw ex;
        }
        return count.length;
    }
    public int insertErrorMessage(errorMessage[] msg) throws Exception{
        java.sql.Connection conn = connectionFactory.getSystemConnection();
        int[] count;
        conn.setAutoCommit(false);
        PreparedStatement state = conn.prepareStatement("insert into t_e_error_message(error_type,error_message,error_date,job_id,state)values(?,?,?,?,?);");
        try {
            for(int i = 0;i<msg.length;i++) {
                state.setString(1, msg[i].getMessage_type());
                state.setString(2, msg[i].getError_message());
                state.setTimestamp(3, msg[i].getError_date());
                state.setInt(4,msg[i].getJob_id());
                state.setInt(5,1);
                state.addBatch();
            }
            count = state.executeBatch();
            state.close();
            conn.setAutoCommit(true);
            conn.close();
        }catch (Exception ex) {
            state.close();
            conn.setAutoCommit(true);
            conn.close();
            throw ex;
        }
        return count.length;
    }
    public LinkedList<errorMessage> getErrorMessage() throws Exception{
        java.sql.Connection conn = connectionFactory.getSystemConnection();
        Statement state = conn.createStatement();
        LinkedList<errorMessage> result = new LinkedList<errorMessage>();
        try {
            ResultSet rs = state.executeQuery("select unite_id,c.user_name,c.wx_user_name,d.* from t_e_user_job a \n" +
                    "join t_e_job b on a.job_id = b.job_id  and b.state = 1 and a.state = 1\n" +
                    "join t_e_user_info c on a.user_id = c.id and c.state = 1\n" +
                    "join t_e_error_message d on d.state = 1 and b.job_id = d.job_id");
            while (rs.next()) {
                errorMessage item = new errorMessage();
                item.setId(rs.getInt("id"));
                item.setError_message(rs.getString("error_message"));
                item.setMessage_type(rs.getString("error_type"));
                item.setError_date(rs.getTimestamp("error_date"));
                item.setUnite_id(rs.getString("unite_id"));
                item.setUser_name(rs.getString("user_name"));
                item.setWx_user_name(rs.getString("wx_user_name"));
                result.add(item);
            }
            rs.close();
            state.close();
            conn.close();
        }
        catch (Exception ex){
            state.close();
            conn.close();
        }
        return result;

    }
    public HashMap<String, String> getChannle(DataView dataView,int dbType) throws Exception {
        java.sql.Connection conn = null;
        HashMap<String, String> result = new HashMap<String, String>();
        switch (dbType)
        {
            case DBType.MSSQL:conn = connectionFactory.getMSSQLConnection(dataView.getConnctionId());break;
            case DBType.MYSQL:conn = connectionFactory.getMySQLConnection(dataView.getConnctionId());break;
            case DBType.PGSQL:conn = connectionFactory.getPgConnection(dataView.getConnctionId());break;
        }
        ResultSet rs = null;
        Statement state = null;
        try {
            state = conn.createStatement();
            rs = state.executeQuery(dataView.getSelectCommand());
            while (rs.next()) {
                result.put(rs.getString("game_id"),rs.getString("channel_id") );
            }
            rs.close();
            state.close();
            conn.close();
        } catch (Exception ex) {
                state.close();
                conn.close();
            throw ex;
        }
        return result;
    }

    public HashMap<String, appConfig> getAppConfig()throws Exception  {
        java.sql.Connection conn = connectionFactory.getSystemConnection();
        Statement state = conn.createStatement();
        HashMap<String, appConfig> result = new HashMap<String, appConfig>();
        try {

            ResultSet rs = state.executeQuery("select * from t_e_app_config where state = 1");
            while (rs.next()) {
                appConfig item = new appConfig();
                item.setId(rs.getInt("id"));
                item.setAppId(rs.getString("app_id"));
                item.setAppName(rs.getString("app_name"));
                item.setIp(rs.getString("ip"));
                item.setSecret(rs.getString("secret"));
                result.put(item.getAppId(),item);
            }
            rs.close();
            state.close();
            conn.close();
        }
        catch (Exception ex){
            state.close();
            conn.close();
        }
        return result;
    }
}
