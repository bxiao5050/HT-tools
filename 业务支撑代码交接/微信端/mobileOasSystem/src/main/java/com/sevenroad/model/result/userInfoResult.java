package com.sevenroad.model.result;

import com.sevenroad.model.resultModel;

/**
 * Created by linlin.zhang on 2016/11/24.
 */
public class userInfoResult extends resultModel {
    private String userName;
    private String ImageHead;
    private String accessToken;
    private String msg;
    public userInfoResult(String userName,String ImageHead,String accessToken,String msg){
        this.userName = userName;
        this.ImageHead = ImageHead;
        this.accessToken = accessToken;
        this.msg = msg;

    }
    public String getUserName(){
        return userName;
    }
    public String getAccessToken(){
        return accessToken;
    }
    public String getMsg(){
        return msg;
    }

    public String getImageHead() {
        return ImageHead;
    }
}
