package com.sevenroad.oas.web.model.result;


import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/26.
 */
public class OALoginSuccessResult {
    private String userName;
    private Object userGame;

    public OALoginSuccessResult(String userName,Object userGame){
        this.userGame = userGame;
        this.userName = userName;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Object getUserGame() {
        return userGame;
    }

    public void setUserGame(String userGame) {
        this.userGame = userGame;
    }
}
