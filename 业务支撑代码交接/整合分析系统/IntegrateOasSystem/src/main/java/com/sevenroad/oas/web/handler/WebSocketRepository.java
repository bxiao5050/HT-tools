package com.sevenroad.oas.web.handler;

import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.utils.Consts;
import com.sun.security.auth.UserPrincipal;
import io.netty.util.internal.ConcurrentSet;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import sun.security.jca.GetInstance;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Created by linlin.zhang on 2017/8/17.
 */
@Repository
public class WebSocketRepository {

    private Set<String> stompMap = new ConcurrentSet<>();

    public WebSocketRepository(){
        System.out.println("WebSocketRepository initail");
    }

    public Boolean GetInstance(String userName){
        if(stompMap.contains(userName))return true;
        else  return false;
    }
    public void addInstance(String userName){
        if(!stompMap.contains(userName))
            stompMap.add(userName);
    }
    public void removeInstance(String userName){
        if(!stompMap.contains(userName))
            stompMap.remove(userName);
    }
    public Object[] GetOnline(){
        return  stompMap.toArray();
    }

}
