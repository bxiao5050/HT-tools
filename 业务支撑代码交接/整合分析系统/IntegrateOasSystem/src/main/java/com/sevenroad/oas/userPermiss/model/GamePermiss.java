package com.sevenroad.oas.userPermiss.model;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/20.
 */
public class GamePermiss {
    private int systemId;
    private String systemName;
    private int gameId;
    private int mainGameId;
    private String gameName;
    private String gameType;
    private List<MenuPermiss> menuPermisses;
    private String agentIds;
    private String payChannelIds;
    private String regChannelIds;

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
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public String getGameType() {
        return gameType;
    }

    public void setGameType(String gameType) {
        this.gameType = gameType;
    }

    public List<MenuPermiss> getActionPermissList() {
        return menuPermisses;
    }

    public void setActionPermissList(List<MenuPermiss> menuPermisses) {
        this.menuPermisses = menuPermisses;
    }

    public String getAgentIds() {
        return agentIds;
    }

    public void setAgentIds(String agentIds) {
        this.agentIds = agentIds;
    }

    public String getPayChannelIds() {
        return payChannelIds;
    }

    public void setPayChannelIds(String payChannelIds) {
        this.payChannelIds = payChannelIds;
    }

    public String getRegChannelIds() {
        return regChannelIds;
    }

    public void setRegChannelIds(String regChannelIds) {
        this.regChannelIds = regChannelIds;
    }

    public List<MenuPermiss> getMenuPermisses() {
        return menuPermisses;
    }
    public void setMenuPermisses(List<MenuPermiss> menuPermisses) {
        this.menuPermisses = menuPermisses;
    }
}
