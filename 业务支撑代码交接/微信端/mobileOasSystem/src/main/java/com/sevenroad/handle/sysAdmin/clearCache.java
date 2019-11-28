package com.sevenroad.handle.sysAdmin;

import com.sevenroad.cache.data.bindUserInfoCache;
import com.sevenroad.cache.data.channelCache;
import com.sevenroad.cache.data.userInfoCache;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.exception.lostParamException;
import com.sevenroad.utils.exception.userPermException;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by linlin.zhang on 2016/12/8.
 */
public class clearCache implements handleImp {
    private String cacheName;
    public void setParams(HttpServletRequest request) throws Exception {
        if(!request.getParameterMap().containsKey("access_token"))
            throw new lostParamException("access_token");
        String access_token = request.getParameter("access_token");
        session session = SessionManage.getSession(access_token);
        if(session == null)
            throw new userPermException(userPermException.INVALID_ACCESS_TOKEN);
        if(!request.getParameterMap().containsKey("type"))
            throw new lostParamException("type");
        cacheName = request.getParameter("type");
    }

    @Override
    public resultModel execute() throws Exception {

        CacheSigleton.getDataViewCache().clearCache();
        CacheSigleton.getQueryResultCache().clearCache();
        CacheSigleton.getSystemCache().clearCache();
        (new channelCache()).clearCache();
        (new userInfoCache()).clearCache();
        (new bindUserInfoCache()).clearCache();
//        switch (cacheName)
//        {
//            case "dataview":
//                CacheSigleton.getDataViewCache().clearCache();break;
//            case "query":CacheSigleton.getQueryResultCache().clearCache();;break;
//            case "gameinfo":CacheSigleton.getSystemCache().clearCache();break;
//            case "channel":(new channelCache()).clearCache();break;
//            case "userinfo":(new userInfoCache()).clearCache();break;
//            case "bindUser":(new bindUserInfoCache()).clearCache();break;
//            default:CacheSigleton.getQueryResultCache().clearCache();;break;
//        }
        return new jsonStringResult("\"clear " + cacheName + " successed\"");
    }
}
