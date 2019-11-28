package com.sevenroad.oas.web.model;

import com.sevenroad.oas.web.model.websoket.heartBeatMessage;
import com.sevenroad.oas.web.model.websoket.message;
import com.xiaoleilu.hutool.json.JSONUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by linlin.zhang on 2017/4/28.
 */
public class WebSoketClient {
    static public final int HEART_BEAT_TIME = 5000;
    static public final int HEART_BEAT_MAX_COUNT = 10;
    private WebSocketSession session;
    private String userName;
    private AtomicInteger heartBeatCount = new AtomicInteger(0);
    private WebSocketClientManage webSocketClientManage;
    Logger logger = LoggerFactory.getLogger(WebSoketClient.class);
    Timer sendHeartBeatMessage;
    public synchronized void sendMessage(message msg) throws IOException{
            TextMessage text = new TextMessage(JSONUtil.toJsonPrettyStr(msg));
            session.sendMessage(text);
    }
    public void close(CloseStatus code){
        try {
            if (sendHeartBeatMessage != null)
                sendHeartBeatMessage.cancel();
            if (session != null && session.isOpen())
                session.close(code);
        } catch (Exception e){
            logger.error("close error : user_name {} - error {}",userName,e);
        }
    }
    public void startHeartBeat() {
        if(sendHeartBeatMessage == null){
            sendHeartBeatMessage = new Timer();
            sendHeartBeatMessage.schedule(new TimerTask() {
                @Override
                public void run() {
                    try {
                        if(session.isOpen()) {
                            heartBeatMessage msg = new heartBeatMessage();
                            msg.setUserName(userName);
                            sendMessage(msg);
                            int count = heartBeatCount.addAndGet(1);
                            if (count > WebSoketClient.HEART_BEAT_MAX_COUNT)
                                getWebSocketClientManage().closeClient(userName);
                        }else getWebSocketClientManage().closeClient(userName);
                    }
                    catch (Exception e){
                        logger.error("close error : user_name {} - error {}",userName,e);
                    }
                }
            },0, HEART_BEAT_TIME);
        }
    }
    public WebSocketSession getSession() {
        return session;
    }

    public void setSession(WebSocketSession session) {
        this.session = session;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public AtomicInteger getHeartBeatCount() {
        return heartBeatCount;
    }

    public void setHeartBeatCount(AtomicInteger heartBeatCount) {
        this.heartBeatCount = heartBeatCount;
    }

    public WebSocketClientManage getWebSocketClientManage() {
        return webSocketClientManage;
    }

    public void setWebSocketClientManage(WebSocketClientManage webSocketClientManage) {
        this.webSocketClientManage = webSocketClientManage;
    }
}
