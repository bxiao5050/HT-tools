package com.sevenroad.oas.dao.repository;

import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.tables.GameConnecitonMap;
import com.sevenroad.oas.dao.model.tables.GameZoneInfo;
import com.sevenroad.oas.dao.model.tables.MenuMapDataView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.*;

/**
 * Created by linlin.zhang on 2017/4/21.
 */
@Repository
public class GameRepository {
    Logger logger = LoggerFactory.getLogger(GameRepository.class);

    /**
     * 游戏连接关联信息获取
     * @param connection 连接
     * @param getGame 获取游戏的sql
     * @return
     */
    public List<GameConnecitonMap> getGameInfo(Connection connection, String getGame){
        try {
            PreparedStatement statement = connection.prepareStatement(getGame);
                List<GameConnecitonMap> result = new ArrayList<GameConnecitonMap>();
                if(statement.execute()) {
                    do {
                        ResultSet rs = statement.getResultSet();
                        if (rs != null) {
                            while(rs.next()) {
                                GameConnecitonMap item = new GameConnecitonMap();
                                item.setConnectionId(rs.getInt("connection_id"));
                                item.setGameId(rs.getInt("game_id"));
                                result.add(item);
                            }
                            rs.close();
                        }
                    }
                    while ((statement.getMoreResults() == true) || (statement.getUpdateCount() > -1));
                    statement.close();
                    return result;
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



    public List<MenuMapDataView> getMenuMapDataView(Connection connection, String getGame){
        try {
            PreparedStatement statement = connection.prepareStatement(getGame);
                List<MenuMapDataView> result = new ArrayList<MenuMapDataView>();
                if(statement.execute()) {
                    do {
                        ResultSet rs = statement.getResultSet();
                        if (rs != null) {
                            while(rs.next()) {
                                MenuMapDataView item = new MenuMapDataView();
                                item.setGameId(rs.getInt("game_id"));
                                item.setDataViewId(rs.getInt("dataview_id"));
                                item.setMenuId(rs.getInt("menu_id"));
                                item.setDataViewName(rs.getString("dataview_name"));
                                result.add(item);
                            }
                            rs.close();
                        }
                    }
                    while ((statement.getMoreResults() == true) || (statement.getUpdateCount() > -1));
                    statement.close();
                    return result;
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
    public Map<String,Integer> getGameZoneInfo(Connection connection, String sql, List<DBParam> params){
        try {
            PreparedStatement statement = connection.prepareStatement(Utils.sqlGenerate(sql,params));
            Map<String,Integer> result = new HashMap<String,Integer>();
            if(statement.execute()) {
                do {
                    ResultSet rs = statement.getResultSet();
                    if (rs != null) {
                        while(rs.next()) {
                            result.put(rs.getString("third_game_zone_id"),rs.getInt("game_zone_id"));
                        }
                        rs.close();
                    }
                }
                while ((statement.getMoreResults() == true) || (statement.getUpdateCount() > -1));
                statement.close();
                return result;
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
}
