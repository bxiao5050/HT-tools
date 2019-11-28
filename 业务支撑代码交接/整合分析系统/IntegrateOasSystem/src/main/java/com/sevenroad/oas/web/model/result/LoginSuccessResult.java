package com.sevenroad.oas.web.model.result;

import com.sevenroad.oas.dao.model.tables.UserGameInfo;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/28.
 */
public class LoginSuccessResult {
    private String userName;
    private List<UserGameInfo> userGame;

    public LoginSuccessResult(String userName,List<UserGameInfo> userGame){
        this.userGame = userGame;
        this.userName = userName;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<UserGameInfo> getUserGame() {
        return userGame;
    }

    public void setUserGame(List<UserGameInfo> userGame) {
        this.userGame = userGame;
    }
}
