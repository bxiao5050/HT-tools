package com.sevenroad.oas.userPermiss;

import com.sevenroad.oas.userPermiss.model.GamePermiss;
import com.sevenroad.oas.userPermiss.model.MenuPermiss;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/20.
 */
public interface IGetPermiss {
    List<MenuPermiss> getMenus(String menuIds);
    List<GamePermiss> getGames(String menudIds);
}
