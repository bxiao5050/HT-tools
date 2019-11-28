package com.sevenroad.oas.web.model.consumer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.sevenroad.oas.userPermiss.model.ItemPermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.xiaoleilu.hutool.util.CollectionUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/4.
 */
public class GetMenuItemPremissConsumer implements CollectionUtil.Consumer<UserPermissInfo> {
    Gson gson;
    int gameId;
    private String premissInfo1 = "";
    private String premissInfo2 = "";
    private String premissInfo3 = "";
    private String premissInfo4 = "";

    public GetMenuItemPremissConsumer(Gson gson,int gameId,String... premissInfo){
        this.gson =gson;
        this.gameId = gameId;
        this.premissInfo1  = premissInfo[0];
        this.premissInfo2  = premissInfo[1];
        this.premissInfo3  = premissInfo[2];
        this.premissInfo4  = premissInfo[3];
    }
    public String getPremissInfo1() {
        return premissInfo1;
    }

    public void setPremissInfo1(String premissInfo1) {
        this.premissInfo1 = premissInfo1;
    }

    public String getPremissInfo2() {
        return premissInfo2;
    }

    public void setPremissInfo2(String premissInfo2) {
        this.premissInfo2 = premissInfo2;
    }

    public String getPremissInfo3() {
        return premissInfo3;
    }

    public void setPremissInfo3(String premissInfo3) {
        this.premissInfo3 = premissInfo3;
    }

    public String getPremissInfo4() {
        return premissInfo4;
    }

    public void setPremissInfo4(String premissInfo4) {
        this.premissInfo4 = premissInfo4;
    }

    public void accept(UserPermissInfo userPermissInfo, int ii) {
        UserPermissInfo permissInfo = userPermissInfo;
        List<ItemPermiss> lsit = gson.fromJson(permissInfo.getPremissInfo(),
                new TypeToken<List<ItemPermiss>>() {
                }.getType());
        if(lsit!= null) {
            for (int i = 0; i < lsit.size(); i++) {
                if (lsit.get(i).getItemId() == gameId) {
                    switch (permissInfo.getPremissExtraId()) {
                        case MenuPermiss.MENU_ADD:lsit.get(i).setPermissInfo(premissInfo1);break;
                        case MenuPermiss.MENU_DEL:lsit.get(i).setPermissInfo(premissInfo2);break;
                        case MenuPermiss.MENU_EDIT:lsit.get(i).setPermissInfo(premissInfo3);break;
                        case MenuPermiss.MENU_QUERY:lsit.get(i).setPermissInfo(premissInfo4);break;
                    }
                    break;
                }
                ItemPermiss itemPermiss = new ItemPermiss();
                itemPermiss.setItemId(gameId);
                switch (permissInfo.getPremissExtraId()) {
                    case MenuPermiss.MENU_ADD:itemPermiss.setPermissInfo(premissInfo1);break;
                    case MenuPermiss.MENU_DEL:itemPermiss.setPermissInfo(premissInfo2);break;
                    case MenuPermiss.MENU_EDIT:itemPermiss.setPermissInfo(premissInfo3);break;
                    case MenuPermiss.MENU_QUERY:itemPermiss.setPermissInfo(premissInfo4);break;
                }
                lsit.add(itemPermiss);
            }
        }else {
            lsit = new ArrayList<ItemPermiss>();
            ItemPermiss itemPermiss = new ItemPermiss();
            itemPermiss.setItemId(gameId);

            switch (permissInfo.getPremissExtraId()) {
                case MenuPermiss.MENU_ADD:itemPermiss.setPermissInfo(premissInfo1);break;
                case MenuPermiss.MENU_DEL:itemPermiss.setPermissInfo(premissInfo2);break;
                case MenuPermiss.MENU_EDIT:itemPermiss.setPermissInfo(premissInfo3);break;
                case MenuPermiss.MENU_QUERY:itemPermiss.setPermissInfo(premissInfo4);break;
            }
            lsit.add(itemPermiss);
        }
        switch (permissInfo.getPremissExtraId()) {
            case MenuPermiss.MENU_ADD:premissInfo1 = gson.toJson(lsit);break;
            case MenuPermiss.MENU_DEL:premissInfo2 = gson.toJson(lsit);;break;
            case MenuPermiss.MENU_EDIT:premissInfo3 = gson.toJson(lsit);;break;
            case MenuPermiss.MENU_QUERY:premissInfo4 = gson.toJson(lsit);;break;
        }
    }
}
