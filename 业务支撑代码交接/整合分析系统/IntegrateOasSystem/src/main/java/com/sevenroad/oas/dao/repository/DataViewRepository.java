package com.sevenroad.oas.dao.repository;

import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.tables.DataViewMapComponent;
import com.xiaoleilu.hutool.util.StrUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/21.
 */
@Repository
public class DataViewRepository {
    Logger logger = LoggerFactory.getLogger(DataViewRepository.class);
    public List<DataView> getDataView(Connection connection, String sql){

        try {
            PreparedStatement statement = connection.prepareStatement(sql);
                List<DataView> result = new ArrayList<DataView>();
                if(statement.execute()) {
                    do {
                        ResultSet rs = statement.getResultSet();
                        if (rs != null) {
                            while(rs.next()) {
                                DataView item = new DataView();
                                item.setDataViewId(rs.getInt("dataview_id"));
                                item.setConnectionId(rs.getInt("connection_id"));
                                item.setDataviewName(rs.getString("dataview_name"));
                                item.setSelectCommand(rs.getString("select_command"));
                                item.setInsertCommand(rs.getString("insert_command"));
                                item.setExportCommand(rs.getString("export_command"));
                                item.setEditCommand(rs.getString("edit_command"));
                                item.setDelCommand(rs.getString("del_command"));

                                item.setExportTable(Utils.convertStringToInterger(rs.getString("export_table").split(",")));
                                item.setExportName(StrUtil.split(rs.getString("export_name"), ","));
                                item.setCacheTime(rs.getInt("cache_time"));
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
            logger.error("获取DataView信息失败：{}",e);
        }
        finally {
            try {
                connection.close();
            }catch (SQLException e){
                logger.error("获取DataView信息失败：{}",e);
            }
        }
        return null;
    }

    public List<DataViewMapComponent> getComponent(Connection connection,String sql){
        try {
            PreparedStatement statement = connection.prepareStatement(sql);
            List<DataViewMapComponent> result = new ArrayList<DataViewMapComponent>();
            if(statement.execute()) {
                do {
                    ResultSet rs = statement.getResultSet();
                    if (rs != null) {
                        while(rs.next()) {
                            DataViewMapComponent item = new DataViewMapComponent();
                            item.setDataViewId(rs.getInt("dataview_id"));
                            item.setComponentId(rs.getInt("component_id"));
                            item.setComponentName(rs.getString("component_name"));
                            item.setComponentType(rs.getInt("component_type"));
                            item.setxColName(rs.getString("xcol_name"));
                            item.setyColName(StrUtil.split(rs.getString("ycol_name"),","));
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
            logger.error("获取DataView信息失败：{}",e);
        }
        finally {
            try {
                connection.close();
            }catch (SQLException e){
                logger.error("获取DataView信息失败：{}",e);
            }
        }
        return null;
    }
}
