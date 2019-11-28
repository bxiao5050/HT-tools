package com.sevenroad.oas.web.handler;

import com.google.gson.Gson;
import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.model.*;
import com.sevenroad.oas.web.model.websoket.message;
import com.sevenroad.oas.web.utils.Consts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 * Created by linlin.zhang on 2017/4/27.
 */
public class WebSocketHandle extends TextWebSocketHandler {

    @Autowired
    WebSocketClientManage webSocketClientManage;

    Gson gson = new Gson();
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            String userName = ((UserPermiss)session.getAttributes().get(Consts.Strings.USER_PREMISS)).getUserName();
            if (userName == null) session.close(CloseStatus.NOT_ACCEPTABLE);
            else {
                WebSoketClient client = new WebSoketClient();
                client.setSession(session);
                client.setUserName(userName);
                client.startHeartBeat();
                client.setWebSocketClientManage(webSocketClientManage);
                webSocketClientManage.addClient(userName, client);
            }
        }
        catch (Exception e){
            session.close(CloseStatus.NOT_ACCEPTABLE);
        }

    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        super.handleTransportError(session, exception);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session,
                                     TextMessage msg) throws Exception {
        try {
            String userName = ((UserPermiss)session.getAttributes().get(Consts.Strings.USER_PREMISS)).getUserName();
            message model = gson.fromJson(msg.getPayload(), message.class);
            model.setUserName(userName);
            switch (model.getMessageType()) {
                case message.TYPE_CLOSE:
                    webSocketClientManage.closeClient(userName);
                    break;
                case message.TYPE_HEARTBEAT:webSocketClientManage.getClinet(model.getUserName()).getHeartBeatCount().set(0);
                    break;
            }
        }
        catch (Exception e){
            session.close();
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String userName = ((UserPermiss)session.getAttributes().get(Consts.Strings.USER_PREMISS)).getUserName();
        webSocketClientManage.closeClient(userName);

    }
}
