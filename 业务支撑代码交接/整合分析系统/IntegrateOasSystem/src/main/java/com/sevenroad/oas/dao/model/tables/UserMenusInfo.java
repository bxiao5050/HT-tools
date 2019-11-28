package com.sevenroad.oas.dao.model.tables;


/**
 * Created by linlin.zhang on 2017/4/26.
 */
public class UserMenusInfo {

    private int menuId;
    private String menuName;
    private int parenteId;
    private String dataView;
    private Boolean isLeaf;
    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public int getParenteId() {
        return parenteId;
    }

    public void setParenteId(int parenteId) {
        this.parenteId = parenteId;
    }

    public Boolean getLeaf() {
        return isLeaf;
    }

    public void setLeaf(Boolean leaf) {
        isLeaf = leaf;
    }

    public String getDataView() {
        return dataView;
    }

    public void setDataView(String dataView) {
        this.dataView = dataView;
    }
}
