package com.sevenroad.cache.user;

import com.sevenroad.dao.data.userInfo;

/**
 * Created by linlin.zhang on 2016/12/29.
 */
public class bindUserCacheModel {
    private userInfo oldUser;
    private userInfo newUser;
    private String accessToken;
    public bindUserCacheModel(String access_token,userInfo oldUser,userInfo newUser){
        this.oldUser = oldUser;
        this.newUser = newUser;
        this.accessToken = access_token;
    }
    public userInfo getOldUser(){
        return oldUser;
    }
    public userInfo getNewUser(){
        return newUser;
    }

    public String getAccessToken(){return accessToken;}
}
