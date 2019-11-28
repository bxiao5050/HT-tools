package com.sevenroad.oas.web.controllers;

import com.sevenroad.oas.userPermiss.model.UserPermiss;
import com.sevenroad.oas.web.appConfig;
import com.sevenroad.oas.web.handler.WebSocketRepository;
import com.sevenroad.oas.web.utils.Consts;
import com.sevenroad.oas.web.utils.JsonPResult;
import com.sevenroad.oas.web.utils.imp.jsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;

import java.security.Principal;
import java.util.*;
/**
 * Created by linlin.zhang on 2017/8/16.
 */
@RestController
@RequestMapping(value = appConfig.APP_VERSION+"/ws",produces="application/json;charset=UTF-8")
public class WebSocketController  extends BaseController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    WebSocketRepository repository;

    @RequestMapping(value = "/sendMessage")
    @ResponseBody
    public String sendMessage(@RequestParam String userName, @RequestParam String message){
        messagingTemplate.convertAndSendToUser(userName,"/info",message);
        return new jsonResult<>(Consts.QUERY_SUCCESSED,
                        Consts.Strings.QUERY_SUCCESSED, message).getResult();
    }

    @RequestMapping(value = "/onlines")
    @ResponseBody
    public String onlineUser(){
       return new jsonResult(Consts.QUERY_SUCCESSED,"success",repository.GetOnline()).getResult();
    }

    @RequestMapping(value = "/notice")
    @ResponseBody
    public String notice(String message){
        messagingTemplate.convertAndSend("/topic/info",message);
        return new jsonResult(Consts.QUERY_SUCCESSED,"success",repository.GetOnline()).getResult();
    }
    @Override
    public boolean Permiss(String url, Map<String, String[]> parems, UserPermiss userPermiss) {
        return true;
    }
}
