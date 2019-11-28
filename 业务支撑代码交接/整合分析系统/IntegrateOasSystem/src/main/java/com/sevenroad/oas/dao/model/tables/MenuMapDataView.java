package com.sevenroad.oas.dao.model.tables;

/**
 * Created by linlin.zhang on 2017/4/24.
 */
public class MenuMapDataView {
    private int gameId;
    private int menuId;
    private int dataViewId;
    private String dataViewName;

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    public int getDataViewId() {
        return dataViewId;
    }

    public void setDataViewId(int dataViewId) {
        this.dataViewId = dataViewId;
    }

    public String getDataViewName() {
        return dataViewName;
    }

    public void setDataViewName(String dataViewName) {
        this.dataViewName = dataViewName;
    }
}
