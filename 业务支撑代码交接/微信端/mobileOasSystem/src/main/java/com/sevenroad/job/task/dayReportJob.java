package com.sevenroad.job.task;

import com.github.sd4324530.fastweixin.api.entity.TemplateMsg;
import com.github.sd4324530.fastweixin.api.response.SendTemplateResponse;
import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.sevenroad.cache.data.connectionCache;
import com.sevenroad.cache.data.userInfoCache;
import com.sevenroad.dao.connection.DBType;
import com.sevenroad.dao.connection.connectionFactory;
import com.sevenroad.dao.data.*;
import com.sevenroad.job.task.bean.executeCommand;
import com.sevenroad.model.msg.WeiXinMsg;
import com.sevenroad.singleton.wxConfigSigleton;
import com.sevenroad.utils.config.systemConfig;
import com.sun.corba.se.pept.transport.ConnectionCache;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;

import java.sql.*;
import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by linlin.zhang on 2018/4/8/008.
 */
public class dayReportJob implements Runnable {

    protected jobItem job;
    com.sevenroad.cache.data.connectionCache connectionCache = new connectionCache();
    userInfoCache userInfoCache = new userInfoCache();
    @Override
    public void run() {
        try {
            List<executeCommand> list = getExecuteCommand(job.getJobId());
            List<List<Map<String,String>>> reportList = Lists.newArrayList();
            for(executeCommand item : list){
                reportList.add(getReport(item.getConnectionId(),item.getCommand()));
            }
            List<TemplateMsg> msgList = Lists.newArrayList();
                for (int i = 0;i<reportList.size();i++){
                    List<Map<String, String>> data = reportList.get(i);
                    for(String user : list.get(i).getUserList()) {
                        for (Map<String, String> row : data) {
                            TemplateMsg msg = WeiXinMsg.createReportMsg(list.get(i).getTaskName() + "-日关键指标数据（"+ DateUtil.formatDate(DateUtil.yesterday())+"）", row);
//                            userInfo userInfo = userInfoCache.getUserInfo(user);
//                            if(userInfo == null) continue;;
                            msg.setTouser(user);
                            msgList.add(msg);
                        }
                    }
                }
            for(int i = 0;i<msgList.size();i++) {
                SendTemplateResponse SendTemplateResponse = wxConfigSigleton.getTemplateAPI().send(msgList.get(i));
                System.out.print(SendTemplateResponse.toJsonString());
            }

        }catch (Exception e){
            System.out.print(ExceptionUtil.stacktraceToString(e));
        }
    }

    public dayReportJob(jobItem job){
        this.job = job;
    }

    protected List<executeCommand> getExecuteCommand(int taskId) throws SQLException {
        List<executeCommand> list = Lists.newArrayList();
        Connection conn = connectionFactory.getSystemConnection();
        try{
            Statement statement  = conn.createStatement();
            Splitter splitter = Splitter.on(",").omitEmptyStrings();
            ResultSet rs = statement.executeQuery("select * from t_e_job_extra where task_id =  "+taskId+" order by task_id asc");
            while (rs.next()){
                executeCommand item = new executeCommand();
                item.setTaskId(rs.getInt("id"));
                item.setCommand(rs.getString("select_command"));
                item.setConnectionId(rs.getInt("connection_id"));
                item.setTaskName(rs.getString("task_name"));
                item.setUserList(splitter.splitToList(rs.getString("user_list")));
                list.add(item);
            }

        }finally {
            conn.close();
        }
        return list;
    }

    protected List<Map<String,String>> getReport(int connectionId,String command) throws SQLException {
        List<Map<String,String>>  list = Lists.newArrayList();
        com.sevenroad.dao.data.Connection conInfo = connectionCache.getConnection(connectionId);
        Connection conn =  null;
        try{
            if(conInfo.dbType == DBType.MSSQL)
                conn = connectionFactory.getMSSQLConnection(connectionId);
            else if(conInfo.dbType == DBType.PGSQL){
                conn = connectionFactory.getPgConnection(connectionId);
            }
            Statement statement  = conn.createStatement();
            statement.execute(command);
            do {
                ResultSet rs = statement.getResultSet();
                if(rs == null) continue;
                ResultSetMetaData metaData = rs.getMetaData();
                List<String> columns = Lists.newArrayList();
                for(int i = 1;i<=metaData.getColumnCount();i++){
                    columns.add(metaData.getColumnName(i));
                }
                while (rs.next()) {
                    Map<String, String> item = Maps.newLinkedHashMap();
                    for (String col : columns) {
                        item.put(col, rs.getString(col));
                    }
                    list.add(item);
                }
            }while (statement.getMoreResults()||statement.getUpdateCount()!=-1);

        }finally {
            conn.close();
        }
        return list;
    }

    public static void main(String[] args){
//        connectionFactory.initail("com.mysql.jdbc.Driver",
//                "jdbc:mysql://121.10.140.56/mobile_oas_system",
//                "root",
//                "love7road!");
//        connectionFactory.initailGameDS();
//        jobItem item = new jobItem();
//        item.setJobId(8);
//        dayReportJob job = new dayReportJob(item);
//        job.run();

    }
}
