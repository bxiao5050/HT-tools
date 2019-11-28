package com.sevenroad.oas.web.handler;

import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.utils.Consts;
import com.sun.security.auth.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

import java.security.Principal;
import java.util.Map;

/**
 * Created by linlin.zhang on 2017/8/18.
 */
public class ChannleInterceptor extends ChannelInterceptorAdapter  {

    @Autowired
    WebSocketRepository repository;
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    UserPermiss userPermiss = (UserPermiss) accessor.getSessionAttributes().get(Consts.Strings.USER_PREMISS);
                    Principal principal = new UserPrincipal(userPermiss.getUserName());
                    repository.addInstance(userPermiss.getUserName());
                    accessor.setUser(principal);
                }else if(StompCommand.DISCONNECT.equals(accessor.getCommand())){
                    UserPermiss userPermiss = (UserPermiss) accessor.getSessionAttributes().get(Consts.Strings.USER_PREMISS);
                    repository.removeInstance(userPermiss.getUserName());
                }
                return message;
            }
}