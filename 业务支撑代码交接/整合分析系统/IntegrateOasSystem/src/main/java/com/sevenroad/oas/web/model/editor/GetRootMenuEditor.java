package com.sevenroad.oas.web.model.editor;

import com.sevenroad.oas.dao.model.tables.UserMenusInfo;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;
import com.xiaoleilu.hutool.lang.Editor;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/26.
 */
public class GetRootMenuEditor implements Editor<UserMenusInfo> {
    private List<MenuPermiss> result = new ArrayList<MenuPermiss>();

    public List<MenuPermiss> getResult() {
        return result;
    }

    public UserMenusInfo edit(UserMenusInfo menuPermiss) {
        if(menuPermiss.getParenteId() == 0) {
            for(int i = 0;i<result.size();i++){
                if(result.get(i).getMenuId() == menuPermiss.getMenuId())
                    return null;
            }
            MenuPermiss menu = new MenuPermiss();
            menu.setMenuId(menuPermiss.getMenuId());
            menu.setMenuName(menuPermiss.getMenuName());
            result.add(menu);
        }
        return null;
    }
}
