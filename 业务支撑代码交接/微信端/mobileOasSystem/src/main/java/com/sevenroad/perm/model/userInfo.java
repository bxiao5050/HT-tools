package com.sevenroad.perm.model;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by linlin.zhang on 2016/11/3.
 */
public class userInfo {
    private String username;
    private String password;
    private String usercomment;
    private int userid;
    private int status;
    private HashMap<String,ArrayList<String>> permList;
    public String getUsername(){
        return username;
    }
    public String getPassword(){
        return password;
    }
    public String getUsercomment(){
        return usercomment;
    }
    public int getUserid(){
        return userid;
    }
    public int getStatus(){
        return status;
    }
    public HashMap<String,ArrayList<String>> getPermList(){
        return permList;
    }
    public void setUsername(String username){
        this.username = username;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public void setUsercomment(String usercomment){
        this.usercomment = usercomment;
    }
    public void setUserid(int userid){
        this.userid = userid;
    }
    public void setStatus(int status){
        this.status = status;
    }
    public void setPermList(HashMap<String,ArrayList<String>> permList){
        this.permList = permList;
    }
}
