package com.sevenroad.oas.userPermiss.model;

import com.sevenroad.oas.userPermiss.IPermiss;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/19.
 */
public class MenuPermiss implements IPermiss {
    public static final int MENU_ADD = 1;
    public static final int MENU_DEL = 2;
    public static final int MENU_EDIT = 3;
    public static final int MENU_QUERY = 4;

    private int menuId;
    private String menuName;
    private Boolean isOwner;
    private List<MenuLeafPermiss> childrenMenu;

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

    public Boolean getOwner() {
        return isOwner;
    }

    public void setOwner(Boolean owner) {
        isOwner = owner;
    }

    public List<MenuLeafPermiss> getChildrenMenu() {
        return childrenMenu;
    }


    public void setChildrenMenu(List<MenuLeafPermiss> childrenMenu) {
        this.childrenMenu = childrenMenu;
    }

    public int UniteId() {
        return menuId;
    }



    public Boolean isPermiss(List<? extends IPermiss> permisses) {
        if(permisses == null) {
            this.isOwner = false;
            return this.isOwner;
        }
        for(int i = 0;i<permisses.size();i++){
            IPermiss item = permisses.get(i);
            if(item.UniteId() == UniteId()){
                this.isOwner = true;
                return this.isOwner;
            }
        }
        this.isOwner = false;
        return this.isOwner;
    }
}
