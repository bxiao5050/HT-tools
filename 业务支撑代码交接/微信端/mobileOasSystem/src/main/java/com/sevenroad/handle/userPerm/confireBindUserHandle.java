package com.sevenroad.handle.userPerm;

import com.github.sd4324530.fastweixin.api.entity.TemplateMsg;
import com.sevenroad.cache.user.bindUserCacheModel;
import com.sevenroad.dao.data.DataView;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.msg.WeiXinMsg;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.model.result.userInfoResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.singleton.wxConfigSigleton;
import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.CustomParamType;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.data.paramsList;
import com.sevenroad.utils.exception.lostParamException;
import com.sevenroad.utils.exception.userPermException;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by linlin.zhang on 2016/12/29.
 */
public class confireBindUserHandle implements handleImp {
    private String key;
    private Boolean isAccept;
    @Override
    public resultModel execute() throws Exception {

        bindUserCacheModel model = CacheSigleton.getBindUserInfoCache().getBindUserMode(key);
        if(model == null) throw new userPermException(userPermException.EXPIRED_USER);
        session user = SessionManage.getUnOauthSession(model.getAccessToken());
        if(user == null)  throw new userPermException(userPermException.EXPIRED_USER);
        if(isAccept == false){
            CacheSigleton.getBindUserInfoCache().removeBindUserInfo(key);
            TemplateMsg msg = WeiXinMsg.createMsgFromBindFailed(model.getNewUser().getOpenId(),"","");
            wxConfigSigleton.getTemplateAPI().send(msg);
            return new jsonStringResult("\"拒绝绑定成功\"");
        }
        CustomParam[] params = {
                new CustomParam("unite_id", CustomParamType.String.getType(),model.getNewUser().getUniteId(),1),
                new CustomParam("open_id", CustomParamType.String.getType(),model.getNewUser().getOpenId(),2),
                new CustomParam("wx_user_name", CustomParamType.String.getType(),model.getNewUser().getWxUserName(),3),
                new CustomParam("user_name", CustomParamType.String.getType(),model.getNewUser().getUserName(),4),
                new CustomParam("safe_code", CustomParamType.String.getType(),model.getNewUser().getSafeCode(),5)
        };
        paramsList paramList = new paramsList();
        paramList.setParams(params);
        DataView dataView = CacheSigleton.getDataViewCache().getDataView(systemConfig.getDataViewConfig().sysAddWxUser);
        String result = CacheSigleton.getQueryResultCache().getQueryResult(dataView,paramList).get(0).getRows().get(0)[0];
        CustomParam param1 = new CustomParam("unite_id", CustomParamType.String.getType(),model.getOldUser().getOpenId(),1);
        dataView = CacheSigleton.getDataViewCache().getDataView(systemConfig.getDataViewConfig().sysEnableUser);
        paramList.setParams(new CustomParam[]{param1});
        JsonUtils.getJsonByString(CacheSigleton.getQueryResultCache().getQueryResult(dataView,paramList));
        CacheSigleton.getUserInfoCache().delete(model.getOldUser().getUniteId());
        SessionManage.oauthSession(model.getAccessToken());
        TemplateMsg msg = WeiXinMsg.createMsgFromBindSuccessed(model.getNewUser().getOpenId(),model.getNewUser().getUserName(),model.getNewUser().getUserName()+"绑定成功",systemConfig.getOtherConfig().userLoginPage+model.getAccessToken());
        CacheSigleton.getBindUserInfoCache().removeBindUserInfo(key);
        wxConfigSigleton.getTemplateAPI().send(msg);
        return new jsonStringResult("\"授权绑定成功\"");
    }

    @Override
    public void setParams(HttpServletRequest request) throws Exception {
        if(!request.getParameterMap().containsKey("key"))
            throw new lostParamException("key");
        this.key = request.getParameter("key");
        if(!request.getParameterMap().containsKey("isAccept"))
            throw new lostParamException("isAccept");
        this.isAccept = Boolean.valueOf(request.getParameter("isAccept"));

    }
}
