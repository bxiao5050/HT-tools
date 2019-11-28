package com.sevenroad.oas.userPermiss.transaction;

import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.dao.DBModel;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.sevenroad.oas.userPermiss.TransactionPermiss;
import com.sevenroad.oas.web.model.consumer.GetMenuItemPremissConsumer;
import com.sevenroad.oas.web.model.editor.UserPermissInfoEditor;
import com.sevenroad.oas.web.utils.Consts;
import com.xiaoleilu.hutool.util.CollectionUtil;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/23.
 * 菜单权限事务
 */
public class MenuPermissTransaction extends TransactionPermiss {

    private String menuId1;
    private String menuId2;
    private String menuId3;
    private String menuId4;

    public String getMenuId1() {
        return menuId1;
    }

    public void setMenuId1(String menuId1) {
        this.menuId1 = menuId1;
    }

    public String getMenuId2() {
        return menuId2;
    }

    public void setMenuId2(String menuId2) {
        this.menuId2 = menuId2;
    }

    public String getMenuId3() {
        return menuId3;
    }

    public void setMenuId3(String menuId3) {
        this.menuId3 = menuId3;
    }

    public String getMenuId4() {
        return menuId4;
    }

    public void setMenuId4(String menuId4) {
        this.menuId4 = menuId4;
    }
    @Override
    public ExcuteModel Permiss(DataViewCache dataViewCache) {


        List<UserPermissInfo> userPermissInfos = getPermissInfoList();
        //无历史权限处理
        Collection<UserPermissInfo> userPermissInfoCollection = CollectionUtil.filter(userPermissInfos, new UserPermissInfoEditor(Consts.PermissKey.OAS_MENU));

        Iterator<UserPermissInfo> nextPermissInfo = userPermissInfoCollection.iterator();
        Boolean[] isExit = new Boolean[]{false,false,false,false};
        if(userPermissInfoCollection.size() < 4) {
            while (nextPermissInfo.hasNext()){
                isExit[nextPermissInfo.next().getPremissExtraId()-1] = true;
            }
            for(int i = 0;i<isExit.length;i++){
                if(isExit[i] == false){
                    UserPermissInfo newPermissInfo = new UserPermissInfo();
                    newPermissInfo.setPremissExtraId(i+1);
                    userPermissInfoCollection.add(newPermissInfo);
                }
            }
        }
        nextPermissInfo = userPermissInfoCollection.iterator();
        GetMenuItemPremissConsumer consumer = new GetMenuItemPremissConsumer(new Gson(),getGameId(),menuId1,menuId2,menuId3,menuId4);
        CollectionUtil.forEach(nextPermissInfo,consumer);
        //取菜单权限数据
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.STRING_PARAM, "user_name", getUserName()));
        params.add(new DBParam(DBParam.INT_PARAM, "systemId", String.valueOf(getSystemId())));
        params.add(new DBParam(DBParam.INT_PARAM, "gameId", String.valueOf(getGameId())));
        params.add(new DBParam(DBParam.STRING_PARAM, "premissKey", Consts.PermissKey.OAS_MENU));
        params.add(new DBParam(DBParam.STRING_PARAM, "premissInfo1", consumer.getPremissInfo1()));
        params.add(new DBParam(DBParam.STRING_PARAM, "premissInfo2", consumer.getPremissInfo2()));
        params.add(new DBParam(DBParam.STRING_PARAM, "premissInfo3", consumer.getPremissInfo3()));
        params.add(new DBParam(DBParam.STRING_PARAM, "premissInfo4", consumer.getPremissInfo4()));
        params.add(new DBParam(DBParam.STRING_PARAM, "userName", getUserName()));
        ExcuteModel excuteModel = new ExcuteModel(dataViewCache.getCache(Consts.DataViews.permissGetGameMenus), getGameId(), params);
        excuteModel.setExecuteType(DBModel.ADD_COMMAND);
        return excuteModel;
    }
}
