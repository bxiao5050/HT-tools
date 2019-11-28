package com.sevenroad.model;

import java.util.Collection;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Administrator on 2016/10/22.
 */
public class SessionManage {
    private static ConcurrentHashMap<String,session> Sessions;
    private static ConcurrentHashMap<String,session> UnOauthSessions;
    public static ConcurrentHashMap<String,session>  getAllSessions(){
        if(Sessions == null) Sessions= new ConcurrentHashMap<String,session>();
        return Sessions;
    }
    public static ConcurrentHashMap<String,session>  getAllUnOauthSessions(){
        if(UnOauthSessions == null) UnOauthSessions= new ConcurrentHashMap<String,session>();
        return UnOauthSessions;
    }
    public static session getSession(String access_token){
        if(Sessions == null) Sessions = new ConcurrentHashMap<String,session>();
        if(Sessions.containsKey(access_token)) return Sessions.get(access_token);
        else return null;
    }
    public static session oauthSession(String access_token){
        if(getAllSessions().containsKey(access_token) == false) {
            session user = getAllUnOauthSessions().remove(access_token);
            getAllSessions().put(access_token, user);
            return user;
        }
        return null;
    }
    public static String getUser(String unite_id){
        Enumeration<String> users = getAllUnOauthSessions().keys();
        while(users.hasMoreElements()){
            String item = users.nextElement();
           if(getAllUnOauthSessions().get(item).getUniteId().compareTo(unite_id)==0)
               return item;
        }
        return "";
    }
    public static session getUnOauthSession(String access_token){
        if(UnOauthSessions == null) UnOauthSessions = new ConcurrentHashMap<String,session>();
        if(UnOauthSessions.containsKey(access_token)) return UnOauthSessions.get(access_token);
        else return null;
    }
    public static void addUser(String access_token,session session){
        String oldAccessToken = getUser(session.getUniteId());
       if(oldAccessToken.isEmpty()){
           getAllUnOauthSessions().put(access_token,session);
       }
        else {
           getAllUnOauthSessions().remove(oldAccessToken);
           getAllUnOauthSessions().put(access_token, session);
       }
    }
    public static void removeUser(String sessionId){
        Enumeration<session> list = getAllSessions().elements();
        String key = "";
         while(list.hasMoreElements()){
            session item = list.nextElement();
             if(item.getSessionId().compareTo(sessionId) == 0)
                 key = item.getAccessToken();
         }
         if(!key.isEmpty())
             Sessions.remove(key);
    }
}
