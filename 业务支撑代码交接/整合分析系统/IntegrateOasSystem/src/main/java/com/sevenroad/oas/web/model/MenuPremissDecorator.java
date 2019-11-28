package com.sevenroad.oas.web.model;

import com.google.common.collect.Lists;
import com.sevenroad.oas.dao.model.tables.UserMenusInfo;
import com.sevenroad.oas.userPermiss.model.MenuLeafPermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;

import java.util.*;

/**
 * Created by linlin.zhang on 2017/8/3.
 */
public class MenuPremissDecorator {
    private Map<Integer,List<UserMenusInfo>> userMenusInfos;
    public MenuPremissDecorator(Map<Integer,List<UserMenusInfo>> userMenusInfos){
        this.userMenusInfos = userMenusInfos;
    }

    public MenuPremissDecorator(){}
    protected void getChildren(MenuPermiss parent, int type, List<UserMenusInfo> list){
        for(int i = 0;i<list.size();i++){
            if(parent.getMenuId() == list.get(i).getParenteId()){
                List<MenuLeafPermiss> children = parent.getChildrenMenu();
                boolean isExit = false;
                for(int j = 0;j<children.size();j++){
                    if(children.get(j).getMenuId() == list.get(i).getMenuId()){
                        switch (type)
                        {
                            case 1 :children.get(j).setAdd(true);break;
                            case 2 :children.get(j).setDel(true);break;
                            case 3 :children.get(j).setEdit(true);break;
                            case 4 :children.get(j).setQeury(true);break;
                            default:;
                        }
                        children.get(j).addDataView(list.get(i).getDataView());
                        isExit = true;break;
                    }
                }
                if(!isExit&&list.get(i).getLeaf()){
                    MenuLeafPermiss leaf = new MenuLeafPermiss();
                    leaf.setMenuId(list.get(i).getMenuId());
                    leaf.addDataView(list.get(i).getDataView());
                    leaf.setMenuName(list.get(i).getMenuName());
                    switch (type)
                    {
                        case 1 :leaf.setAdd(true);break;
                        case 2 :leaf.setDel(true);break;
                        case 3 :leaf.setEdit(true);break;
                        case 4 :leaf.setQeury(true);break;
                        default:;
                    }
                    children.add(leaf);
                }
            }
        }
    }

    protected void  getParent(List<MenuPermiss> parent,List<UserMenusInfo> list){
        for(int i = 0;i<list.size();i++){
            Boolean isExit = false;
            for(int j = 0;j<parent.size();j++){
                if(parent.get(j).getMenuId() == list.get(i).getMenuId()){
                    isExit = true;
                    break;
                }
            }
            if(isExit == false && list.get(i).getParenteId() == 0){
                MenuPermiss menu = new MenuPermiss();
                menu.setChildrenMenu(new ArrayList<MenuLeafPermiss>());
                menu.setMenuId(list.get(i).getMenuId());
                menu.setMenuName(list.get(i).getMenuName());
                parent.add(menu);
            }
        }
    }

    public List<MenuPermiss> getTree(){
        List<MenuPermiss> parents = new ArrayList<>();
        for(int i = 1;i<=4;i++) {
            if(userMenusInfos.containsKey(i)) {
                List<UserMenusInfo> list = userMenusInfos.get(i);
                getParent(parents,list);
            }
        }
        for(int i = 1;i<=4;i++) {
            if (userMenusInfos.containsKey(i)) {
                for(int j = 0;j<parents.size();j++) {
                    List<UserMenusInfo> list = userMenusInfos.get(i);
                    getChildren(parents.get(j),i,list);
                }
            }
        }
        return parents;
    }

    public List<MenuPermiss> getTree(List<UserMenusInfo> userMenusInfos){
        List<MenuPermiss> parents = new ArrayList<>();
        getParent(parents,userMenusInfos);
        for(int j = 0;j<parents.size();j++) {
            getChildren(parents.get(j),0,userMenusInfos);
        }
        return parents;
    }
}
