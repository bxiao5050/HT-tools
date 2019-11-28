package com.sevenroad.handle.userPerm;

import com.sevenroad.cache.data.queryResultCache;
import com.sevenroad.dao.DBUtils;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.perm.PermissUtils;
import com.sevenroad.perm.model.PermissResource;
import com.sevenroad.perm.model.PermissResult;
import com.sevenroad.perm.model.SystemGame;
import com.sevenroad.perm.permUtil;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.CustomParamType;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.data.paramsList;
import com.sevenroad.utils.exception.severnroadException;
import com.sevenroad.utils.exception.userPermException;
import com.sun.javafx.scene.layout.region.Margins;
import com.xiaoleilu.hutool.convert.Convert;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by linlin.zhang on 2016/11/23.
 */
public class getUserGameHandle implements handleImp {
    private String accessToken;
    @Override
    public void setParams(HttpServletRequest request) throws Exception {
        if(!request.getParameterMap().containsKey("access_token"))
            throw new severnroadException(severnroadException.LOST_PARAMS);
        accessToken = request.getParameter("access_token");
    }
    @Override
    public resultModel execute() throws Exception {
       session user = SessionManage.getSession(accessToken);
        if(user == null) throw new userPermException(userPermException.UNOAUTH_ACCESS_TOKEN);
       String game_id = permUtil.getGame(user.getPerms("mobileOasSystemWebMenu"));
        if(game_id.isEmpty()) throw new userPermException(userPermException.EMPTY_PERM);
       queryResultCache cache  = CacheSigleton.getQueryResultCache();
       CustomParam param = new CustomParam("game_id", CustomParamType.String.getType(),game_id,1);
        paramsList paramList = new paramsList();
        paramList.setParams(new CustomParam[]{param});
       return new jsonStringResult(JsonUtils.getJsonByString(cache.getQueryResult(CacheSigleton.getDataViewCache().getDataView("getGameInfo"),paramList)));
    }
//    @Override
//    public resultModel execute() throws Exception {
//        session user = SessionManage.getSession(accessToken);
//        if(user == null) throw new userPermException(userPermException.UNOAUTH_ACCESS_TOKEN);
//        List<PermissResource> list = user.getSystemGameList();
//        if(list == null) {
//            list = PermissUtils.GetPermiss(user.getUserInfo().getUserid(),0,"wechat_menu").getState();
//            user.setSystemGameList(list);
//        }
//        List<SystemGame> result=  PermissUtils.GetUserGames(list);
//        int[] arr = new int[]{1,23};
//        return new jsonStringResult(com.sevenroad.utils.JsonUtils.getInstance().toJson(new Object[]{result}));
//    }
}
