package com.sevenroad.oas.dao.repository;

import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.model.*;
import com.sevenroad.oas.dao.model.tables.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/25.
 */
@Repository
public class PermissRepository {
    Logger logger = LoggerFactory.getLogger(PermissRepository.class);

    public List<PermissKeyInfo> getPermissKeyInfo(Connection connection, String getPermissKey){

        try {
            PreparedStatement statement = connection.prepareStatement(getPermissKey);
            if(statement.execute()){
                List<PermissKeyInfo> result = new ArrayList<PermissKeyInfo>();
                if(statement.execute()) {
                    do {
                        ResultSet rs = statement.getResultSet();
                        if (rs != null) {
                            while(rs.next()) {
                                PermissKeyInfo item = new PermissKeyInfo();
                                item.setPermissKeyId(rs.getInt("premiss_key_id"));
                                item.setPermissKey(rs.getString("premiss_key"));
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
            logger.error("获取PermissKeyInfo信息失败：{}",e);
        }
        finally {
            try {
                connection.close();
            }catch (SQLException e){
                logger.error("获取PermissKeyInfo信息失败：{}",e);
            }
        }
        return null;
    }

    /**
     * 获取用户权限信息
     * @param connection 连接对象
     * @param sql sql脚本
     * @return
     */
    public List<UserPermissInfo> getPermissInfo(Connection connection, String sql, List<DBParam> params){
        try {
            PreparedStatement statement = connection.prepareStatement(Utils.sqlGenerate(sql,params));
                List<UserPermissInfo> result = new ArrayList<UserPermissInfo>();
                if(statement.execute()) {
                    do {
                        ResultSet rs = statement.getResultSet();
                        if (rs != null) {
                            while(rs.next()) {
                                UserPermissInfo item = new UserPermissInfo();
                                item.setPremissExtraId(rs.getInt("premiss_key_extra_id"));
                                item.setPremissKey(rs.getString("premiss_key"));
                                item.setPremissInfo(rs.getString("premiss_info"));
                                item.setExtraName(rs.getString("extra_name"));
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
            logger.error("获取PermissKeyInfo信息失败：{}",e);
        }
        finally {
            try {
                connection.close();
            }catch (SQLException e){
                logger.error("获取PermissKeyInfo信息失败：{}",e);
            }
        }
        return null;
    }


    /**
     * 获取用户菜单权限信息
     * @param connection
     * @param sql
     * @return
     */
    public List<UserMenusInfo> getPermissMenuInfo(Connection connection, String sql){
        try {
            Statement statement = connection.createStatement();
                List<UserMenusInfo> result = new ArrayList<UserMenusInfo>();
                statement.execute(sql);
                    do {
                        ResultSet rs = statement.getResultSet();
                        if (rs != null) {
                            while(rs.next()) {
                                //system_id	system_name	game_id	main_game_id	game_name	game_menu_id	menu_id	menu_name	parent_id
                                UserMenusInfo item = new UserMenusInfo();
                                item.setMenuId(rs.getInt("menu_id"));
                                item.setMenuName(rs.getString("menu_name"));
                                item.setParenteId(rs.getInt("parent_id"));
                                item.setLeaf(rs.getBoolean("is_leaf"));
                                item.setDataView(rs.getString("dataview_name"));
                                result.add(item);
                            }
                            rs.close();
                        }
                    }
                    while ((statement.getMoreResults() == true) || (statement.getUpdateCount() > -1));
                    statement.close();
                    return result;
        }catch (Exception e){
            logger.error("获取PermissKeyInfo信息失败：{}",e);
        }
        finally {
            try {
                connection.close();
            }catch (SQLException e){
                logger.error("获取PermissKeyInfo信息失败：{}",e);
            }
        }
        return null;
    }

    /**
     * 获取用户游戏权限信息
     * @param connection
     * @param sql
     * @param params
     * @return
     */
    public List<UserGameInfo> GetPermissGameInfo(Connection connection, String sql, List<DBParam> params){
        try {
            Statement statement = connection.createStatement();
            List<UserGameInfo> result = new ArrayList<UserGameInfo>();
            statement.execute(Utils.sqlGenerate(sql,params));
            do {
                ResultSet rs = statement.getResultSet();
                if (rs != null) {
                    while(rs.next()) {
                        //system_id	system_name	game_id	main_game_id	game_name	game_menu_id	menu_id	menu_name	parent_id
                        UserGameInfo item = new UserGameInfo();
                        item.setSystemId(rs.getInt("system_id"));
                        item.setSystemName(rs.getString("system_name"));
                        item.setGameId(rs.getInt("game_id"));
                        item.setMainGameId(rs.getInt("main_game_id"));
                        item.setGameName(rs.getString("game_name"));
                        result.add(item);
                    }
                    rs.close();
                }
            }
            while ((statement.getMoreResults() == true) || (statement.getUpdateCount() > -1));
            statement.close();
            return result;
        }catch (Exception e){
            logger.error("获取PermissKeyInfo信息失败：{}",e);
        }
        finally {
            try {
                connection.close();
            }catch (SQLException e){
                logger.error("获取PermissKeyInfo信息失败：{}",e);
            }
        }
        return null;
    }
    /**
     * 获取用户区服权限信息
     * @param connection
     * @param sql
     * @param params
     * @return
     */
    public List<UserZoneInfo> GetPermissZoneInfo(Connection connection, String sql, List<DBParam> params){
        try {
            Statement statement = connection.createStatement();
            List<UserZoneInfo> result = new ArrayList<UserZoneInfo>();
            statement.execute(Utils.sqlGenerate(sql,params));
            do {
                ResultSet rs = statement.getResultSet();
                if (rs != null) {
                    while(rs.next()) {
                        //system_id	system_name	game_id	main_game_id	game_name	game_menu_id	menu_id	menu_name	parent_id
                        UserZoneInfo item = new UserZoneInfo();
                        item.setZoneId(rs.getInt("zoneId"));
                        item.setZoneName(rs.getString("zoneName"));
                        result.add(item);
                    }
                    rs.close();
                }
            }
            while ((statement.getMoreResults() == true) || (statement.getUpdateCount() > -1));
            statement.close();
            return result;
        }catch (Exception e){
            logger.error("获取UserZoneInfo信息失败：{}",e);
        }
        finally {
            try {
                connection.close();
            }catch (SQLException e){
                logger.error("获取UserZoneInfo信息失败：{}",e);
            }
        }
        return null;
    }

    public List<UserToken> GetUserToken(Connection connection,String sql){
        try {
            Statement statement = connection.createStatement();
            List<UserToken> result = new ArrayList<UserToken>();
            statement.execute(sql);
            do {
                ResultSet rs = statement.getResultSet();
                if (rs != null) {
                    while(rs.next()) {
                        //system_id	system_name	game_id	main_game_id	game_name	game_menu_id	menu_id	menu_name	parent_id
                        UserToken item = new UserToken();
                        item.setUserId(rs.getInt("user_id"));
                        item.setToken(rs.getString("token"));
                        item.setUserName(rs.getString("user_name"));
                        result.add(item);
                    }
                    rs.close();
                }
            }
            while ((statement.getMoreResults() == true) || (statement.getUpdateCount() > -1));
            statement.close();
            return result;
        }catch (Exception e){
            logger.error("获取UserZoneInfo信息失败：{}",e);
        }
        finally {
            try {
                connection.close();
            }catch (SQLException e){
                logger.error("获取UserZoneInfo信息失败：{}",e);
            }
        }
        return null;
    }
}
