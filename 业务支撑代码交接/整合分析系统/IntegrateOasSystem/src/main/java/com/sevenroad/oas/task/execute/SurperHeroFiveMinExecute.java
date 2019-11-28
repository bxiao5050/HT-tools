package com.sevenroad.oas.task.execute;

import com.sevenroad.oas.cache.Imp.GameZoneCache;
import com.sevenroad.oas.dao.model.tables.GameZoneInfo;
import com.sevenroad.oas.task.TaskDispatcher;
import com.sevenroad.oas.task.TaskService;
import com.sevenroad.oas.task.annotation.TaskAnnotation;
import com.sevenroad.oas.task.model.FiveMinDataResult;
import com.sevenroad.oas.task.model.FiveMinOnlineParams;
import com.xiaoleilu.hutool.crypto.digest.DigestUtil;
import com.xiaoleilu.hutool.date.DateUnit;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.http.HttpUtil;

import javax.xml.crypto.Data;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.*;

/**
 * Created by linlin.zhang on 2017/5/17.
 */
@TaskAnnotation(appId = 10002,appName = "越南超级英雄")
public class SurperHeroFiveMinExecute implements IExecute {
    private FiveMinOnlineParams params;
    public static final String secret = "cd24fb0d6963f";
    public static String INSERT = "insert into %s (count_time,gamezone_id,app_id,value)values(?,?,?,?)";
    public static String DELETE = "delete from %s where app_id = %d and count_time = '%s';";
    private Connection connection;
    private Map<String,Integer> gameZoneInfos;
    public SurperHeroFiveMinExecute(Connection connection,Map<String,Integer> gameZoneInfos,FiveMinOnlineParams params){
        this.gameZoneInfos = gameZoneInfos;
        this.params = params;
        this.connection = connection;
    }
    @Override
    public void execute(Date currentTime) throws Exception {
        try {
            params.getApiUrl();
            Map<String,Object> getParams = new HashMap<>();
            getParams.put("time",currentTime.getTime());
            getParams.put("secret", DigestUtil.md5Hex(currentTime.getTime()+secret));
            String jsonResult = HttpUtil.get(params.getApiUrl(),getParams);
            FiveMinDataResult result = TaskDispatcher.fromJson(jsonResult, FiveMinDataResult.class);
            //入库
            String deleteSql = String.format(DELETE,params.getInputTable(),params.getAppId(), DateUtil.format(currentTime,DateUtil.NORM_DATETIME_PATTERN));
            String insertSql = String.format(INSERT,params.getInputTable());
            Statement statement = connection.createStatement();
            statement.execute(deleteSql);
            PreparedStatement preparedStatement = connection.prepareStatement(insertSql);
            Iterator<FiveMinDataResult.FiveMinRow> rows = result.getMsg().iterator();
            Calendar current = Calendar.getInstance();
            current.setTime(currentTime);
            current.set(Calendar.MILLISECOND,0);
            current.set(Calendar.SECOND,0);
            connection.setAutoCommit(false);
            while (rows.hasNext()){
                FiveMinDataResult.FiveMinRow row = rows.next();
                preparedStatement.setTimestamp(1, new Timestamp(current.getTimeInMillis()));
                preparedStatement.setInt(2, gameZoneInfos.get(row.getGamezone_id()));
                preparedStatement.setInt(3,params.getAppId());
                preparedStatement.setInt(4,row.getValue());
                preparedStatement.addBatch();
            }
            preparedStatement.executeBatch();

        }
        finally {
            connection.commit();
            connection.setAutoCommit(true);
            connection.close();
        }
    }

    @Override
    public void setParams(String params) {
       this.params = TaskDispatcher.fromJson(params,FiveMinOnlineParams.class);
    }
}
