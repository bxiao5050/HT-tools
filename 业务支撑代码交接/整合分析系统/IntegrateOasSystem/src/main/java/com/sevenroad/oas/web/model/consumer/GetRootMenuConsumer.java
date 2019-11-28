package com.sevenroad.oas.web.model.consumer;

import com.sevenroad.oas.dao.model.tables.UserMenusInfo;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.xiaoleilu.hutool.util.CollectionUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/3.
 */
public class GetRootMenuConsumer implements CollectionUtil.Consumer<UserMenusInfo>  {
    private List<MenuPermiss> result = new ArrayList<MenuPermiss>();

    public List<MenuPermiss> getResult() {
        return result;
    }

    public void accept(UserMenusInfo userMenusInfo, int i) {
        if(userMenusInfo.getParenteId() == 0) {
            for(int ii = 0;ii<result.size();ii++){
                if(result.get(ii).getMenuId() == userMenusInfo.getMenuId())
                    return ;
            }
            MenuPermiss menu = new MenuPermiss();
            menu.setMenuId(userMenusInfo.getMenuId());
            menu.setMenuName(userMenusInfo.getMenuName());
            result.add(menu);
        }
    }
}
