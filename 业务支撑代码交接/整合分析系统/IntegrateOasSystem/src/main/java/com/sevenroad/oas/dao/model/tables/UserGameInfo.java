package com.sevenroad.oas.dao.model.tables;

/**
 * Created by linlin.zhang on 2017/4/27.
 */
public class UserGameInfo {
    private int systemId;
    private String systemName;
    private int gameId;
    private int mainGameId;
    private String GameName;

    public int getSystemId() {
        return systemId;
    }

    public void setSystemId(int systemId) {
        this.systemId = systemId;
    }

    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(String systemName) {
        this.systemName = systemName;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getMainGameId() {
        return mainGameId;
    }

    public void setMainGameId(int mainGameId) {
        this.mainGameId = mainGameId;
    }

    public String getGameName() {
        return GameName;
    }

    public void setGameName(String gameName) {
        this.GameName = gameName;
    }
}
