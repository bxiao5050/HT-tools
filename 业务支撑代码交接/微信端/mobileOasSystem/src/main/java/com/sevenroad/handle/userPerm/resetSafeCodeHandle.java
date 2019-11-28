package com.sevenroad.handle.userPerm;

import com.sevenroad.dao.data.DataView;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.perm.model.userInfo;
import com.sevenroad.perm.permUtil;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.data.*;
import com.sevenroad.utils.exception.lostParamException;
import com.sevenroad.utils.exception.userPermException;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by linlin.zhang on 2016/12/29.
 */
public class resetSafeCodeHandle implements handleImp {
    private String SafeCode;
    private String access_token;
    private String user_name;
    private String password;
    @Override
    public resultModel execute() throws Exception {
        //SessionManage.addUser(access_token,new session(access_token,"ozhDDwm3LkszZ4hpkCkV22yWrRS0","ozhDDwm3LkszZ4hpkCkV22yWrRS0","linlin.zhang",""));
        SessionManage.oauthSession(access_token);
        session session = SessionManage.getSession(access_token);
        if(session == null)
            throw new userPermException(userPermException.UNOAUTH_ACCESS_TOKEN);
        userInfo userInfo = session.getUserInfo();
        if(userInfo == null) userInfo = permUtil.getUserPermiss(user_name);
        String md5Pwn  = SystemUtils.getMd5(password);
        if(userInfo.getPassword().compareTo(md5Pwn) != 0) throw new userPermException(userPermException.ERROR_USER_OR_PWD);
        CustomParam[] params = {
                new CustomParam("safe_code", CustomParamType.String.getType(),this.SafeCode,1),
                new CustomParam("unite_id", CustomParamType.String.getType(),session.getUniteId(),2)
        };
        paramsList paramList = new paramsList();
        paramList.setParams(params);
        DataView dataView = CacheSigleton.getDataViewCache().getDataView(systemConfig.getDataViewConfig().sysChangePwd);
        String result = "\""+CacheSigleton.getQueryResultCache().getQueryResult(dataView, paramList).get(0).getRows().get(0)[0]+"\"";
        com.sevenroad.dao.data.userInfo user = CacheSigleton.getUserInfoCache().getUserInfo(session.getUniteId());
        if(user != null)
            user.setSafeCode(this.SafeCode);
        return new jsonStringResult(result);
    }

    @Override
    public void setParams(HttpServletRequest request) throws Exception {
        if(!request.getParameterMap().containsKey("access_token"))
            throw new lostParamException("access_token");
        this.access_token = request.getParameter("access_token");;
        if(!request.getParameterMap().containsKey("safe_code"))
            throw new lostParamException("safe_code");
        this.SafeCode = request.getParameter("safe_code");
        if(!request.getParameterMap().containsKey("user_name"))
            throw new lostParamException("user_name");
        this.user_name = request.getParameter("user_name");
        if(!request.getParameterMap().containsKey("password"))
            throw new lostParamException("password");
        this.password = request.getParameter("password");
    }
}
