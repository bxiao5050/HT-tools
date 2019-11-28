package com.sevenroad.oas.web.model.consumer;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.sevenroad.oas.userPermiss.model.ItemPermiss;
import com.sevenroad.oas.web.utils.Consts;
import com.xiaoleilu.hutool.util.CollectionUtil;
import com.xiaoleilu.hutool.util.StrUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/3.
 */
public class GetGamePermissConsumer implements CollectionUtil.Consumer<UserPermissInfo> {
    List<String> permissList = new ArrayList<String>();
    Gson gson = new Gson();
    public  String getResult() {
        return StrUtil.join(",",permissList);
    }
    public void accept(UserPermissInfo userPermissInfo, int i) {
        try {
            if (userPermissInfo.getPremissKey().compareTo(Consts.PermissKey.OAS_MENU) == 0) {
                List<ItemPermiss> lsit = gson.fromJson(userPermissInfo.getPremissInfo(),
                        new TypeToken<List<ItemPermiss>>() {
                        }.getType());
                for(int in = 0;in<lsit.size();in++)
                permissList.add(String.valueOf(lsit.get(in).getItemId()));
            }
        }
        catch (Exception e) {
            return ;
        }

    }
}
