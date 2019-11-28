package com.sevenroad.oas.userPermiss.model;

import com.sevenroad.oas.dao.model.tables.UserPermissInfo;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/19.
 */
public class UserPermiss {

    private int userId;

    private String userName;

    private GamePermiss currentGame;

    private String language;

    private List<GamePermiss> gamePermisses;

    private List<UserPermissInfo> permissList;

    private int userType = 1;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }

    public GamePermiss getCurrentGame() {
        return currentGame;
    }

    public void setCurrentGame(GamePermiss currentGame) {
        this.currentGame = currentGame;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<GamePermiss> getGamePermisses() {
        return gamePermisses;
    }

    public void setGamePermisses(List<GamePermiss> gamePermisses) {
        this.gamePermisses = gamePermisses;
    }

    public List<UserPermissInfo> getPermissList() {
        return permissList;
    }

    public void setPermissList(List<UserPermissInfo> permissList) {
        this.permissList = permissList;
    }

}
