package com.sevenroad.model;

import com.sevenroad.perm.model.*;
import com.sevenroad.utils.exception.userPermException;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by Administrator on 2016/10/22.
 */
public class session {
    private String accessToken;
    private Calendar createTime;
    private int currentGameId;
    private int currentSystemId;
    private userInfo userInfo;
    private String sessionId;
    private String uniteId;
    private String openId;
    private String wx_user_name;
    private String image_head;
    private Map<Integer,String> agentList;
    private Map<Integer,String> channelList;
    private AtomicInteger errorCount;

    private Map<Integer,PermissList> permissList;

    private List<PermissResource> systemGameList;

    public int addErrorCode(){
        if(errorCount == null) errorCount = new AtomicInteger(0);
       return errorCount.addAndGet(1);
    }
    public session(String accessToken,String uniteId,String openId,String wx_user_name,String image_head) {
        this.accessToken = accessToken;
        this.createTime = Calendar.getInstance();
        this.uniteId = uniteId;
        this.openId = openId;
        this.wx_user_name = wx_user_name;
        this.image_head = image_head;
        agentList = new HashMap<Integer, String>();
        channelList = new HashMap<Integer, String>();
    }
    public void setAgentList(int game_id,String agent){
        if(!agentList.containsKey(game_id))
            agentList.put(game_id,agent);
    }
    public void setChannelList(int game_id,String channel){
        if(!channelList.containsKey(game_id))
            channelList.put(game_id,channel);
    }
    public String getAgents(int game_id){
        if(agentList.containsKey(game_id))
            return agentList.get(game_id);
        return null;
    }
    public String getChannels(int game_id){
        if(channelList.containsKey(game_id))
            return channelList.get(game_id);
        return null;
    }
    public String getUniteId(){return uniteId;}
    public String getOpenId(){return  openId;}
    public String getAccessToken(){
        return accessToken;
    }
    public String getUserName(){
        return this.userInfo.getUsername();
    }
    public void setSessionId(String sessionId){
        this.sessionId = sessionId;
    }
    public userInfo getUserInfo(){return userInfo;}
    public void setUserInfo(userInfo userInfo){
        this.userInfo = userInfo;
    }
    public String getImage_head(){
        return image_head;
    }
    public ArrayList<String> getPerms(String permName) throws Exception
    {
        if(userInfo.getPermList().containsKey(permName))
        return userInfo.getPermList().get(permName);
        else throw new userPermException(userPermException.EMPTY_PERM);
    }
    public String getSessionId(){
        return sessionId;
    }
    public String getWx_user_name(){ return wx_user_name;}

    public int getCurrentGameId() {
        return currentGameId;
    }

    public int getCurrentSystemId() {
        return currentSystemId;
    }

    public void setCurrentGameId(int currentGameId) {
        this.currentGameId = currentGameId;
    }

    public void setCurrentSystemId(int currentSystemId) {
        this.currentSystemId = currentSystemId;
    }

    public Map<Integer, PermissList> getPermissList() {
        return permissList;
    }

    public void setPermissList(Map<Integer, PermissList> permissList) {
        this.permissList = permissList;
    }

    public List<PermissResource> getSystemGameList() {
        return systemGameList;
    }

    public void setSystemGameList(List<PermissResource> systemGameList) {
        this.systemGameList = systemGameList;
    }
}
