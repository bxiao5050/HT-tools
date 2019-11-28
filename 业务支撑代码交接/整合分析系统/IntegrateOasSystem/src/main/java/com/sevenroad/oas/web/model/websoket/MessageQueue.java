package com.sevenroad.oas.web.model.websoket;

import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.MessageCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.imp.SqlDbImp;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.Message;
import com.sevenroad.oas.dao.repository.MessageRepository;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by Administrator on 2017/5/7 0007.
 */
@Repository
public class MessageQueue{
    @Resource
    private MessageCache messageCache;
    @Resource
    MessageRepository messageRepository;
    @Resource
    ConnectionManager connectionManager;
    Gson gson = new Gson();
    public void put(message... message){
        for(int i = 0;i<message.length;i++) {
            messageCache.putCache(message[i].getUserName(), gson.toJson(message[i]), -1);
        }
    }

    /**
     * 从缓存中获取消息
     * @param userName
     * @return
     */
    public List<message> getMessage(String userName){
        List<message> list = new ArrayList<message>();
        List<String> msgList =  messageCache.getMessage(userName);
        for(int i = 0;i<msgList.size();i++){
            list.add(gson.fromJson(msgList.get(i),message.class));
        }
       return list;
    }

    /**
     * 移除时入数据库
     * @param message
     */
    public void remove(message message){
        messageCache.removeCahce(message.getId());
        Message msg = new Message();
        msg.setUserName(message.getUserName());
        msg.setId(message.getId());
        msg.setCreateTime(message.getDate());
        msg.setMessageType(message.getMessageType());
        msg.setMessageContent(gson.toJson(message));
        messageRepository.AddMessage(connectionManager.getConnection(0),msg);
    }

}
