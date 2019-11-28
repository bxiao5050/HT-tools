package com.sevenroad.oas.web.model.consumer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.sevenroad.oas.userPermiss.model.ItemPermiss;
import com.xiaoleilu.hutool.util.CollectionUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/4.
 */
public class GetZoneItemPremissConsumer implements CollectionUtil.Consumer<UserPermissInfo> {
    private int gameId;
    private Gson gson;
    private String premissInfo;
    public GetZoneItemPremissConsumer(Gson gson,int gameId,String premissInfo){
        this.gameId = gameId;
        this.gson = gson;
        this.premissInfo = premissInfo;
    }
    public String getPremissInfo(){
        return premissInfo;
    }
    public void accept(UserPermissInfo userPermissInfo, int in) {
        UserPermissInfo permissInfo = userPermissInfo;
        List<ItemPermiss> lsit = gson.fromJson(permissInfo.getPremissInfo(),
                new TypeToken<List<ItemPermiss>>() {
                }.getType());
        if(lsit!= null) {
            Boolean isExit = false;
            for (int i = 0; i < lsit.size(); i++) {
                if(lsit.get(i).getItemId() == gameId){
                    lsit.get(i).setPermissInfo(premissInfo);
                    isExit = true;
                    break;
                }
            }
            if(!isExit){
                ItemPermiss itemPermiss = new ItemPermiss();
                itemPermiss.setItemId(gameId);
                itemPermiss.setPermissInfo(premissInfo);
                lsit.add(itemPermiss);
            }
        }else{
            lsit = new ArrayList<ItemPermiss>();
            ItemPermiss itemPermiss = new ItemPermiss();
            itemPermiss.setItemId(gameId);
            itemPermiss.setPermissInfo(premissInfo);
            lsit.add(itemPermiss);
        }
        premissInfo = gson.toJson(lsit);
    }
}
