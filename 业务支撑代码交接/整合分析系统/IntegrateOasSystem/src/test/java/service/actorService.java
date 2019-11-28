package service;

import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.dao.mapper.ActorPremissMapper;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.sevenroad.oas.web.services.ActorServices;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.scheduling.concurrent.DefaultManagedTaskScheduler;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/7.
 */
@SuppressWarnings("ALL")
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration(value = "src/main/webapp")
@ContextHierarchy({
        @ContextConfiguration(name = "parent", locations = "classpath:/spring/applicationContext.xml")
})
public class actorService {
    @Autowired
    ActorServices actorServices;
    @Autowired
    TableResultCache tableResultCache;
    @Test
    public void userMenu(){
//        List<MenuPermiss> re = actorServices.actorMenus(9,301,3,"CHS");
    }

    @Test
    public void grantZone(){
       Boolean re = actorServices.grantChannel(1,1,"3,4,5,21");
    }


    public static class MyStompSessionHandler extends StompSessionHandlerAdapter {

        @Override
        public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
            session.send("/topic/foo", "payload");
        }
    }

    public static void main(String[] args){
        WebSocketClient webSocketClient = new StandardWebSocketClient();
        WebSocketStompClient stompClient = new WebSocketStompClient(webSocketClient);
        stompClient.setMessageConverter(new StringMessageConverter());
        stompClient.setTaskScheduler(new DefaultManagedTaskScheduler()); // for heartbeats
        String url = "ws://127.0.0.1:9090/login";
        StompSessionHandler sessionHandler = new actorService.MyStompSessionHandler();
        stompClient.connect(url, sessionHandler);
    }
}
