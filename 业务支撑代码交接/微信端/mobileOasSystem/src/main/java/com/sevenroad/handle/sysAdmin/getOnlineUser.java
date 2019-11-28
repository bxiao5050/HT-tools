package com.sevenroad.handle.sysAdmin;

import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.exception.lostParamException;
import com.sevenroad.utils.exception.userPermException;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by linlin.zhang on 2016/11/29.
 */
public class getOnlineUser implements handleImp {
    @Override
    public void setParams(HttpServletRequest request) throws Exception {
        if(!request.getParameterMap().containsKey("access_token"))
            throw new lostParamException("access_token");
        String access_token = request.getParameter("access_token");
        session session = SessionManage.getSession(access_token);
        if(session == null)
            throw new userPermException(userPermException.INVALID_ACCESS_TOKEN);
    }

    @Override
    public resultModel execute() throws Exception {
        ConcurrentHashMap<String,session> users = SessionManage.getAllUnOauthSessions();
        return new jsonStringResult(JsonUtils.getJsonFromArray(Collections.list(users.keys()).toArray()));
    }
}
