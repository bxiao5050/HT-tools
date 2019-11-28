package com.sevenroad.oas.web.model;

import com.google.gson.Gson;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.model.Message;
import com.sevenroad.oas.dao.repository.MessageRepository;
import com.sevenroad.oas.web.model.websoket.MessageQueue;
import com.sevenroad.oas.web.model.websoket.message;
import com.sevenroad.oas.web.model.websoket.notifyMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.WebSocketClient;
import rx.internal.schedulers.CachedThreadScheduler;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.*;

/**
 * Created by linlin.zhang on 2017/4/28.
 */
public class WebSocketClientManage {
    ConcurrentMap<String,WebSoketClient> clientConcurrentMap = new ConcurrentHashMap<String, WebSoketClient>();
  //  ConcurrentLinkedQueue<message> messageQueue = new ConcurrentLinkedQueue<message>();
    @Resource
    MessageQueue messageQueue;
    @Resource
    MessageRepository messageRepository;
    @Resource
    ConnectionManager connectionManager;
    Gson gson = new Gson();
    Logger logger = LoggerFactory.getLogger(WebSocketClientManage.class);
    ExecutorService  cancelClientService = Executors.newCachedThreadPool();
    public void addClient(String userName,WebSoketClient client) throws Exception{
        closeClient(userName);
        //从消息队列中收取消息
        Iterator<message> msgList = messageQueue.getMessage(userName).iterator();
        notifyMessage msg = new notifyMessage();
        List<String> list = new ArrayList<String>();
        while (msgList.hasNext()){
            message msgItem = msgList.next();
            if(msgItem.getUserName().compareTo(userName) == 0) {
                list.add( msgItem.getMessage());
                messageQueue.remove(msgItem);
            }
        }
        msg.setMessageList(list);
        client.sendMessage(msg);
        clientConcurrentMap.put(userName,client);
    }
    public WebSoketClient getClinet(String userName){
        return  clientConcurrentMap.get(userName);
    }
    public void sendMessage(String userName,message... msgs) throws Exception{
        try {
            WebSoketClient client = clientConcurrentMap.get(userName);
            if (client == null) {
                messageQueue.put(msgs);
                throw new Exception("user offline!");
            }
            for (int i = 0; i < msgs.length; i++) {
                message msg = msgs[i];
                client.sendMessage(msg);
                Message msgItem = new Message();
                msgItem.setUserName(msg.getUserName());
                msgItem.setId(msg.getId());
                msgItem.setCreateTime(msg.getDate());
                msgItem.setMessageType(msg.getMessageType());
                msgItem.setMessageContent(gson.toJson(msg));
                messageRepository.AddMessage(connectionManager.getConnection(0), msgItem);
            }
        }catch (Exception e){
            logger.info("send mesg to {} error:{}!",userName,e.getMessage());
        }
    }
    public void closeClient(String userName) throws Exception{
        WebSoketClient client = clientConcurrentMap.remove(userName);
        if(client != null) {
            CancelClientTask task = new CancelClientTask(client);
            cancelClientService.execute(task);
        }
    }
    public String[] getOnlinesUser(){
       return  clientConcurrentMap.keySet().toArray(new String[clientConcurrentMap.size()]);
    }
}
