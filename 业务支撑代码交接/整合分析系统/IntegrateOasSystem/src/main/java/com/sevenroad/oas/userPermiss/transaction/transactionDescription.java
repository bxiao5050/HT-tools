package com.sevenroad.oas.userPermiss.transaction;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/6.
 */
public class transactionDescription {

    int GameId;

    String GameName;

    List<String> Children;

    public String getGameName() {
        return GameName;
    }

    public void setGameName(String gameName) {
        GameName = gameName;
    }

    public int getGameId() {
        return GameId;
    }

    public void setGameId(int gameId) {
        GameId = gameId;
    }

    public List<String> getChildren() {
        return Children;
    }

    public void setChildren(List<String> children) {
        Children = children;
    }
}
