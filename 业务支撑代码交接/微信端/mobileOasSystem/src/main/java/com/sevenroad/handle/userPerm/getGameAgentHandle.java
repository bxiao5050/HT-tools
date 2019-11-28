package com.sevenroad.handle.userPerm;

import com.sevenroad.cache.data.queryResultCache;
import com.sevenroad.dao.data.DataView;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.result.successResult;
import com.sevenroad.perm.PermissUtils;
import com.sevenroad.perm.model.GameAgent;
import com.sevenroad.perm.model.PermissList;
import com.sevenroad.perm.model.PermissResource;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.perm.model.PermissResult;
import com.sevenroad.perm.permUtil;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.CustomParamType;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.data.paramsList;
import com.sevenroad.utils.exception.severnroadException;
import com.sevenroad.utils.exception.userPermException;
import com.xiaoleilu.hutool.convert.Convert;
import com.xiaoleilu.hutool.http.HttpUtil;
import com.xiaoleilu.hutool.json.JSONObject;
import com.xiaoleilu.hutool.json.JSONUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by linlin.zhang on 2016/11/23.
 */
public class getGameAgentHandle implements handleImp {
    private String accessToken;
    private int game_id;
    private int system_id;
    private int agent_id;
    @Override
    public void setParams(HttpServletRequest request)  throws Exception  {
            if(!request.getParameterMap().containsKey("access_token"))
                throw new severnroadException(severnroadException.LOST_PARAMS);
            if(!request.getParameterMap().containsKey("game_id"))
                throw new severnroadException(severnroadException.LOST_PARAMS);
            if(!request.getParameterMap().containsKey("system_id"))
                throw new severnroadException(severnroadException.LOST_PARAMS);
            if(!request.getParameterMap().containsKey("agent_id"))
            throw new severnroadException(severnroadException.LOST_PARAMS);
            String str_game_id, str_system_id;
            accessToken = request.getParameter("access_token");
            str_game_id = request.getParameter("game_id");
            str_system_id = request.getParameter("system_id");
            game_id = Integer.valueOf(str_game_id);
            system_id = Integer.valueOf(str_system_id);
            agent_id =Integer.valueOf(request.getParameter("agent_id"));
    }
    @Override
    public resultModel execute() throws Exception {
        session user = SessionManage.getSession(accessToken);
        if(user == null) throw new userPermException(userPermException.UNOAUTH_ACCESS_TOKEN);
        //userInfo userInfo = permUtil.getUserPermiss(user.getUserName());
        String agent_ids = user.getAgents(game_id);
        if(agent_ids == null) {
            agent_ids = permUtil.getGameAgent(game_id, user.getPerms("mobileOasSystemWebAgent"));
            user.setAgentList(game_id,agent_ids);
        }
        if(agent_ids.isEmpty()) throw new userPermException(userPermException.EMPTY_PERM);
        queryResultCache cache  = CacheSigleton.getQueryResultCache();
        CustomParam param1 = new CustomParam("agent_id", CustomParamType.String.getType(),agent_ids,2);
        CustomParam param2 = new CustomParam("game_id", CustomParamType.Int.getType(),game_id,1);
        CustomParam param3 = new CustomParam("system_id", CustomParamType.Int.getType(),system_id,3);
        CustomParam param4 = new CustomParam("top_agent", CustomParamType.Int.getType(),agent_id,4);
        //根据game_id所在的connection选择脚本
        int dbType = CacheSigleton.getSystemCache().getSystemGame(system_id,game_id).getType();
        DataView dataView = CacheSigleton.getDataViewCache().getDataView("getGameAgent",dbType);
        paramsList paramList = new paramsList();
        paramList.setGame_id(game_id);
        paramList.setSystem_id(system_id);
        paramList.setParams(new CustomParam[]{param2,param1,param3,param4});
        //页游-SQL-Server
        return new jsonStringResult(JsonUtils.getJsonByString(cache.getQueryResult(dataView,paramList)));
    }

//    public resultModel execute() throws  Exception{
//        session user = SessionManage.getSession(accessToken);
//        if(user.getPermissList() == null){
//            user.setPermissList(new HashMap<Integer, PermissList>());
//        }
//        PermissList list = user.getPermissList().get(game_id);
//        List<GameAgent> result = new ArrayList<>();
//        if(list == null) list = new PermissList();
//        if(list.getAgentList() == null) {
//            PermissResult permissResult = PermissUtils.GetPermiss(user.getUserInfo().getUserid(),game_id,"game_zone");
//            list.setAgentList(permissResult.getState());
//        }
//        PermissUtils.GetGameAgent(Convert.toStr(agent_id),list.getAgentList(),result);
//        return new jsonStringResult(com.sevenroad.utils.JsonUtils.getInstance().toJson(new Object[]{result}));
//    }
}
