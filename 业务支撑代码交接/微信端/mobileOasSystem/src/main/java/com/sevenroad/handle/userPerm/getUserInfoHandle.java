package com.sevenroad.handle.userPerm;

import com.sevenroad.dao.DBUtils;
import com.sevenroad.dao.connection.SystemConnection;
import com.sevenroad.dao.data.DataView;
import com.sevenroad.dao.data.systemLog;
import com.sevenroad.dao.data.systemLogEventType;
import com.sevenroad.dao.data.userInfo;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.result.userInfoResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.perm.permUtil;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.CustomParamType;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.data.paramsList;
import com.sevenroad.utils.exception.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.UUID;

/**
 * Created by linlin.zhang on 2016/11/23.
 */
public class getUserInfoHandle implements handleImp {
    private String accessToken;
    private String remote_ip;
    private String session_id;
    private String safeCode;
    @Override
    public void setParams(HttpServletRequest request) throws Exception {
        if(!request.getParameterMap().containsKey("access_token"))
            throw new lostParamException("access_token");
        if(!request.getParameterMap().containsKey("safe_code"))
            throw new lostParamException("safe_code");
        this.accessToken = request.getParameter("access_token");
        this.remote_ip =  request.getRemoteAddr();
        this.session_id = request.getSession().getId();
        this.safeCode = request.getParameter("safe_code");
    }

    @Override
    public resultModel execute() throws Exception {
        SessionManage.addUser(accessToken,new session(accessToken,"ozhDDwm3LkszZ4hpkCkV22yWrRS0","ozhDDwm3LkszZ4hpkCkV22yWrRS0","linlin.zhang",safeCode));
        session session = SessionManage.getSession(accessToken);
        if(session == null) {
            session = SessionManage.getUnOauthSession(accessToken);
            if(session == null) throw new userPermException(userPermException.UNOAUTH_ACCESS_TOKEN);
            SessionManage.oauthSession(accessToken);
        }
        userInfo userinfo =  CacheSigleton.getUserInfoCache().getUserInfo(session.getUniteId());
        if(userinfo == null) throw new userPermException(userPermException.UN_BIND_USER);
        if(userinfo.getSafeCode().compareTo(this.safeCode) != 0){
            int errorCode = session.addErrorCode();
            if(errorCode >= 5){
               CustomParam param1 = new CustomParam("unite_id", CustomParamType.String.getType(),userinfo.getOpenId(),1);
                DataView dataView = CacheSigleton.getDataViewCache().getDataView(systemConfig.getDataViewConfig().sysEnableUser);
                paramsList paramList = new paramsList();
                paramList.setParams(new CustomParam[]{param1});
                JsonUtils.getJsonByString(CacheSigleton.getQueryResultCache().getQueryResult(dataView,paramList));
                CacheSigleton.getUserInfoCache().delete(session.getUniteId());
                throw new userPermException(userPermException.ENABLE_USER);
            }
            throw new userPermException(userPermException.ERROR_SAFE_CODE);
        }
        session.setSessionId(session_id);
        session.setUserInfo(permUtil.getUserPermiss(userinfo.getUserName()));
        systemLogEventType eventInfo = new systemLogEventType(systemLogEventType.LOGIN_EVENT,"","");
        systemLog log = new systemLog(session.getUserName(),session.getWx_user_name(),eventInfo, Calendar.getInstance().getTime(),remote_ip);
        SystemConnection conn = new SystemConnection();
        conn.writeSystemLogInfo(log);
        return new userInfoResult(userinfo.getUserName(),session.getImage_head(),accessToken,"登陆成功");
    }
}
