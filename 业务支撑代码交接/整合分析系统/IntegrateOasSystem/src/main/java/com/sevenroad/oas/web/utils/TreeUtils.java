package com.sevenroad.oas.web.utils;

import com.google.common.collect.Lists;
import com.sevenroad.oas.dao.model.tables.UserMenusInfo;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.sevenroad.oas.userPermiss.model.MenuLeafPermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;

import java.util.*;

/**
 * Created by linlin.zhang on 2017/4/26.
 */
public class TreeUtils {
    /**
     *
     */
    public static List<MenuPermiss> generalMenuTree(List<MenuPermiss> rootList, List<UserMenusInfo> menusInfos,List<MenuPermiss> permisses){

        for(int i = 0;i<rootList.size();i++){
            MenuPermiss menuPermiss = rootList.get(i);
            Boolean isPermiss = menuPermiss.isPermiss(permisses);

            List<MenuLeafPermiss> childMenus = new ArrayList<MenuLeafPermiss>();
                for (int j = 0; j < menusInfos.size(); j++) {
                    UserMenusInfo menusInfo = menusInfos.get(j);
                    if (menuPermiss.getMenuId() == menusInfo.getParenteId()) {
                        MenuLeafPermiss leaf = new MenuLeafPermiss();
                        leaf.setMenuId(menusInfo.getMenuId());
                        leaf.setMenuName(menusInfo.getMenuName());
                        leaf.addDataView(menusInfo.getDataView());
                        if(isPermiss) leaf.isPermiss(permisses);
                        childMenus.add(leaf);
                    }
                }

            menuPermiss.setChildrenMenu(childMenus);
        }
        return rootList;
    }

}
