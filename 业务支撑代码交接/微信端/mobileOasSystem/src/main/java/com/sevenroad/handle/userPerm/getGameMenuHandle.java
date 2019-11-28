package com.sevenroad.handle.userPerm;

import com.sevenroad.cache.data.queryResultCache;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.perm.PermissUtils;
import com.sevenroad.perm.model.GameMenu;
import com.sevenroad.perm.model.PermissResource;
import com.sevenroad.perm.model.SystemGame;
import com.sevenroad.perm.model.userInfo;
import com.sevenroad.perm.permUtil;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.CustomParamType;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.data.paramsList;
import com.sevenroad.utils.exception.severnroadException;
import com.sevenroad.utils.exception.userPermException;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by linlin.zhang on 2016/11/23.
 */
public class getGameMenuHandle implements handleImp {
    private String accessToken;
    private int game_id;
    @Override
    public void setParams(HttpServletRequest request) throws Exception {
        if(!request.getParameterMap().containsKey("access_token"))
            throw new severnroadException(severnroadException.LOST_PARAMS);
        if(!request.getParameterMap().containsKey("game_id"))
            throw new severnroadException(severnroadException.LOST_PARAMS);
        game_id = Integer.valueOf(request.getParameter("game_id"));
        accessToken = request.getParameter("access_token");
    }
    @Override
    public resultModel execute() throws Exception {
        session user = SessionManage.getSession(accessToken);
        if(user == null) throw new userPermException(userPermException.UNOAUTH_ACCESS_TOKEN);
        //userInfo userInfo = permUtil.getUserPermiss(user.getUserName());
        String menu_ids = permUtil.getGameMenu(game_id,user.getPerms("mobileOasSystemWebMenu"));
        if(menu_ids.isEmpty()) throw new userPermException(userPermException.EMPTY_PERM);
        queryResultCache cache  = CacheSigleton.getQueryResultCache();
        CustomParam param1 = new CustomParam("menu_id", CustomParamType.String.getType(),menu_ids,1);
        CustomParam param2 = new CustomParam("game_id", CustomParamType.Int.getType(),game_id,2);
        paramsList paramList = new paramsList();
        paramList.setParams(new CustomParam[]{param1,param2});
        return new jsonStringResult(JsonUtils.getJsonByString(cache.getQueryResult(CacheSigleton.getDataViewCache().getDataView("getGameMenu"),paramList)));
    }
//    public resultModel execute() throws Exception {
//        session user = SessionManage.getSession(accessToken);
//        if(user == null) throw new userPermException(userPermException.UNOAUTH_ACCESS_TOKEN);
//
//        List<PermissResource> list = user.getSystemGameList();
//        if(list == null) {
//            list = PermissUtils.GetPermiss(user.getUserInfo().getUserid(),0 ,"wechat_menu").getState();
//            user.setSystemGameList(list);
//        }
//        List<GameMenu> result = PermissUtils.GetGameMenus(game_id,list);
//        return new jsonStringResult(com.sevenroad.utils.JsonUtils.getInstance().toJson(new Object[]{result}));
//    }
}
