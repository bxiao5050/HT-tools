package com.sevenroad.dao.data;

/**
 * Created by linlin.zhang on 2016/11/3.
 */
public class gameInfo {
    private int gameid;
    private String gamename;
    private int connectionId;
    private String topAgent;
    private String topChannel;
    private String topMenus;
    private String imageUrl;
    private int type;
    public gameInfo(int gameid,String gamename,String topAgent,String topChannel,String topMenus,int connectionId,int type,String imageUrl){
        this.gameid = gameid;
        this.connectionId = connectionId;
        this.topAgent = topAgent;
        this.gamename = gamename;
        this.topMenus = topMenus;
        this.topChannel = topChannel;
        this.imageUrl = imageUrl;
        this.type= type;
    }
    public int getGameid(){
        return gameid;
    }
    public int getConnectionId(){return connectionId;}
    public String getGamename(){
        return gamename;
    }
    public String getImageUrl(){return imageUrl;}
    public String getTopAgent(){
        return topAgent;
    }
    public String getTopMenus(){
        return topMenus;
    }
    public String getTopChannel(){
        return topChannel;
    }
    public int getType(){return type;}
}
