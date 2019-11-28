package com.sevenroad.oas.web.common;


import java.util.Map;

import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.utils.Consts;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import javax.servlet.http.HttpSession;


/**
 * Created by linlin.zhang on 2017/4/27.
 */
public class HandshakeInterceptor extends HttpSessionHandshakeInterceptor {
    @Override
    public boolean beforeHandshake(ServerHttpRequest request,
                                   ServerHttpResponse response, WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) throws Exception {
        try {
            HttpSession session = ((ServletServerHttpRequest) request).getServletRequest().getSession(false);
            UserPermiss userPermiss = (UserPermiss) session.getAttribute(Consts.Strings.USER_PREMISS);
            attributes.put(Consts.Strings.USER_PREMISS,userPermiss);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

}