package com.sevenroad.handle.userPerm;

import com.sevenroad.cache.data.queryResultCache;
import com.sevenroad.dao.data.DataView;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.perm.PermissUtils;
import com.sevenroad.perm.model.GameAgent;
import com.sevenroad.perm.model.PermissList;
import com.sevenroad.perm.model.PermissResult;
import com.sevenroad.perm.model.SystemChannel;
import com.sevenroad.perm.permUtil;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.CustomParamType;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.data.paramsList;
import com.sevenroad.utils.exception.severnroadException;
import com.sevenroad.utils.exception.userPermException;
import com.xiaoleilu.hutool.convert.Convert;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/1/4.
 */
public class getGameChannelHandle implements handleImp {
    private String access_token;
    private int system_id;
    private int game_id;
    private int channel_id;
    @Override
    public void setParams(HttpServletRequest request) throws Exception {
        if(!request.getParameterMap().containsKey("access_token"))
            throw new severnroadException(severnroadException.LOST_PARAMS);
        if(!request.getParameterMap().containsKey("game_id"))
            throw new severnroadException(severnroadException.LOST_PARAMS);
        if(!request.getParameterMap().containsKey("system_id"))
            throw new severnroadException(severnroadException.LOST_PARAMS);
        if(!request.getParameterMap().containsKey("channel_id"))
            throw new severnroadException(severnroadException.LOST_PARAMS);
        String str_game_id, str_system_id;
        access_token = request.getParameter("access_token");
        str_game_id = request.getParameter("game_id");
        str_system_id = request.getParameter("system_id");
        game_id = Integer.valueOf(str_game_id);
        system_id = Integer.valueOf(str_system_id);
        channel_id =Integer.valueOf(request.getParameter("channel_id"));
    }

    @Override
    public resultModel execute() throws Exception {
        session user = SessionManage.getSession(access_token);
        if(user == null) throw new userPermException(userPermException.UNOAUTH_ACCESS_TOKEN);
        //userInfo userInfo = permUtil.getUserPermiss(user.getUserName());
        String channel_ids = user.getChannels(game_id);
        if(channel_ids == null) {
            channel_ids = permUtil.getGameChannel(game_id, user.getPerms("mobileOasSystemWebChannel"));
            user.setAgentList(game_id,channel_ids);
        }
        if(channel_ids.isEmpty()) throw new userPermException(userPermException.EMPTY_PERM);
        queryResultCache cache  = CacheSigleton.getQueryResultCache();
        CustomParam param1 = new CustomParam("channel_id", CustomParamType.String.getType(),channel_ids,2);
        CustomParam param2 = new CustomParam("game_id", CustomParamType.Int.getType(),game_id,1);
        CustomParam param3 = new CustomParam("system_id", CustomParamType.Int.getType(),system_id,3);
        CustomParam param4 = new CustomParam("top_channel", CustomParamType.Int.getType(),channel_id,4);
        //根据game_id所在的connection选择脚本
        int dbType = CacheSigleton.getSystemCache().getSystemGame(system_id,game_id).getType();
        DataView dataView = CacheSigleton.getDataViewCache().getDataView("getGameChannel",dbType);
        paramsList paramList = new paramsList();
        paramList.setGame_id(game_id);
        paramList.setSystem_id(system_id);
        paramList.setParams(new CustomParam[]{param2,param1,param3,param4});
        //页游-SQL-Server
        return new jsonStringResult(JsonUtils.getJsonByString(cache.getQueryResult(dataView,paramList)));
    }

//    public resultModel execute() throws Exception {
//        session user = SessionManage.getSession(access_token);
//        PermissList list = user.getPermissList().get(game_id);
//        if(user.getPermissList() == null){
//            user.setPermissList(new HashMap<Integer, PermissList>());
//        }
//        if(list == null) list = new PermissList();
//       if(list.getChannelList() == null) {
//            PermissResult permissResult = PermissUtils.GetPermiss(user.getUserInfo().getUserid(),game_id,"game_channel");
//            list.setChannelList(permissResult.getState());
//     }
//        List<SystemChannel> channels = PermissUtils.GetGameChannel(list.getChannelList());
//        return new jsonStringResult(com.sevenroad.utils.JsonUtils.getInstance().toJson(new Object[]{channels}));
//    }
}
