package com.sevenroad.oas.dao.repository;

import com.sevenroad.oas.dao.model.Message;
import com.sevenroad.oas.dao.model.tables.MenuMapDataView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/5/7 0007.
 */
@Repository
public class MessageRepository {
    Logger logger = LoggerFactory.getLogger(MessageRepository.class);
    public List<Message> GetMessage(Connection connection, String getMessage) {
        try {
            PreparedStatement statement = connection.prepareStatement(getMessage);
            List<Message> result = new ArrayList<Message>();
            if(statement.execute()) {
                do {
                    ResultSet rs = statement.getResultSet();
                    if (rs != null) {
                        while(rs.next()) {
                            Message item = new Message();
                            item.setId(rs.getString("id"));
                            item.setUserName(rs.getString("user_name"));
                            item.setMessageType(rs.getInt("message_type"));
                            item.setMessageContent(rs.getString("message_content"));
                            item.setCreateTime(rs.getString("crate_time"));
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

    public int AddMessage(Connection connection, Message message){
        try {
            Statement statement = connection.createStatement();
           int result = 0;
            String sql = String.format("INSERT INTO `integrate_oas_system`.`t_e_user_message` " +
                    "(`id`, `user_name`, `message_type`, `message_content`, `create_time`, `state`) VALUES " +
                    "('%s', '%s', %d, '%s', '%s', 1);",message.getId(),message.getUserName(),message.getMessageType(),
                    message.getMessageContent(),message.getCreateTime());
            result = statement.executeUpdate(sql);
            statement.close();
            return result;
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
        return 0;
    }
}
