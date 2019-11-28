package com.sevenroad.handle.userPerm;

import com.github.sd4324530.fastweixin.api.entity.TemplateMsg;
import com.github.sd4324530.fastweixin.api.response.SendTemplateResponse;
import com.sevenroad.dao.connection.SystemConnection;
import com.sevenroad.dao.data.DataView;
import com.sevenroad.dao.data.systemLog;
import com.sevenroad.dao.data.systemLogEventType;
import com.sevenroad.dao.data.userInfo;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.msg.WeiXinMsg;
import com.sevenroad.model.result.bindWxResult;
import com.sevenroad.model.result.userInfoResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.perm.permUtil;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.singleton.wxConfigSigleton;
import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.CustomParamType;
import com.sevenroad.utils.data.SystemUtils;
import com.sevenroad.utils.data.paramsList;
import com.sevenroad.utils.exception.lostParamException;
import com.sevenroad.utils.exception.userPermException;

import javax.servlet.http.HttpServletRequest;
import java.net.URLEncoder;
import java.util.Calendar;

/**
 * Created by linlin.zhang on 2016/11/23.
 */
public class bindWxUserHandle implements handleImp {
    private String user_name;
    private String password;
    private String accessToken = "";
    private String sessionId;
    private String unite_id;
    private String open_id;
    private String wx_user_name;
    private String remote_ip;
    private String safeCode;
    @Override
    public void setParams(HttpServletRequest request) throws Exception  {
        if(!request.getParameterMap().containsKey("access_token"))
            throw new lostParamException("access_token");
        if(!request.getParameterMap().containsKey("user_name"))
            throw new lostParamException("user_name");
        if(!request.getParameterMap().containsKey("password"))
            throw new lostParamException("password");
        if(!request.getParameterMap().containsKey("safe_code"))
            throw new lostParamException("safe_code");
        this.accessToken = request.getParameter("access_token");
        this.user_name = request.getParameter("user_name");
        this.password = request.getParameter("password");
        this.sessionId = request.getSession().getId();
        this.remote_ip =  request.getRemoteAddr();
        this.safeCode = request.getParameter("safe_code");
    }

    @Override
    public resultModel execute() throws Exception {
        //是否微信授权
       //SessionManage.addUser(accessToken,new session(accessToken,"ozhDDwjnYX_oPeIDr325C-p6ENoU","ozhDDwjnYX_oPeIDr325C-p6ENoU","ao.xue",safeCode));
        session session = SessionManage.getUnOauthSession(accessToken);
        if(session == null) throw new userPermException(userPermException.INVALID_ACCESS_TOKEN);
        this.unite_id = session.getUniteId();
        this.open_id = session.getOpenId();
        this.wx_user_name = session.getWx_user_name();
        //是否是公司用户
        com.sevenroad.perm.model.userInfo userPermInfo = permUtil.getUserPermiss(this.user_name);
        String userPassword = SystemUtils.getMd5(password);
        System.out.print(String.format("unite_id:%s,open_id:%s,wx_user_name:%s,user_name:%s",unite_id,open_id,wx_user_name,user_name));
        if(userPermInfo.getPassword().compareTo(userPassword) !=0) throw new userPermException(userPermException.ERROR_USER_OR_PWD);
        //是否存在用户表里
        userInfo userinfo =  CacheSigleton.getUserInfoCache().getUserInfo(this.unite_id);
        //if(userinfo != null) throw new userPermException(userPermException.BINDED_USER);
        if(userinfo == null){
            //String id,String uniteId,String openId,String wxUserName,String userName,String safeCode
            userinfo = new userInfo(session.getUniteId(),session.getOpenId(),session.getWx_user_name(),user_name,safeCode);
        }
        session.setUserInfo(userPermInfo);
        session.setSessionId(sessionId);
        userInfo oldUser = CacheSigleton.getUserInfoCache().get(this.user_name);
        if(oldUser != null){
           String key = CacheSigleton.getBindUserInfoCache().addbindUserInfo(accessToken,oldUser,userinfo);
           TemplateMsg msg = WeiXinMsg.createMsgFromBindNotify(oldUser.getOpenId(),this.wx_user_name+"请求用户绑定",systemConfig.getOtherConfig().bindConfirePage+key);
            SendTemplateResponse response = wxConfigSigleton.getTemplateAPI().send(msg);
            return new bindWxResult(bindWxResult.BIND_CONFIRING,session.getWx_user_name(),session.getImage_head());
        }
        CustomParam[] params = {
            new CustomParam("unite_id", CustomParamType.String.getType(),this.unite_id,1),
            new CustomParam("open_id", CustomParamType.String.getType(),this.open_id,2),
            new CustomParam("wx_user_name", CustomParamType.String.getType(), URLEncoder.encode(this.wx_user_name,"utf-8"),3),
            new CustomParam("user_name", CustomParamType.String.getType(),this.user_name,4),
            new CustomParam("safe_code", CustomParamType.String.getType(),this.safeCode,5)
        };
        paramsList paramList = new paramsList();
        paramList.setParams(params);
        DataView dataView = CacheSigleton.getDataViewCache().getDataView(systemConfig.getDataViewConfig().sysAddWxUser);
        systemLogEventType eventInfo = new systemLogEventType(systemLogEventType.BIND_WX_USER,dataView.getDataViewName(),"");
        systemLog log = new systemLog(session.getUserName(),session.getWx_user_name(),eventInfo, Calendar.getInstance().getTime(),remote_ip);
        SystemConnection conn = new SystemConnection();
        conn.writeSystemLogInfo(log);
        String result = CacheSigleton.getQueryResultCache().getQueryResult(dataView,paramList).get(0).getRows().get(0)[0];
        session = SessionManage.oauthSession(accessToken);
        return new userInfoResult(session.getUserName(),session.getImage_head(),accessToken,result);
        //return new bindWxResult(,accessToken);
    }

}
