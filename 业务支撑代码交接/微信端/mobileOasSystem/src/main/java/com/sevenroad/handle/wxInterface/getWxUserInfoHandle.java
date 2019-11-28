package com.sevenroad.handle.wxInterface;

import com.github.sd4324530.fastweixin.api.OauthAPI;
import com.github.sd4324530.fastweixin.api.UserAPI;
import com.github.sd4324530.fastweixin.api.response.GetUserInfoResponse;
import com.github.sd4324530.fastweixin.api.response.OauthGetTokenResponse;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.result.redirectResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.singleton.wxConfigSigleton;
import com.sevenroad.utils.config.systemConfig;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

/**
 * Created by linlin.zhang on 2016/11/29.
 */
public class getWxUserInfoHandle implements handleImp {
    private String code;
    private String wxAccessToken;
    private String openId;
    private String uniteId;
    private String state;
    @Override
    public void setParams(HttpServletRequest request) throws Exception {
       this.code = request.getParameter("code");
    }

    @Override
    public resultModel execute() throws Exception {
        OauthAPI api = wxConfigSigleton.getOauAPI();
        UserAPI userAPI = wxConfigSigleton.getUserAPI();
        OauthGetTokenResponse response = api.getToken(this.code);
        openId = response.getOpenid();
        GetUserInfoResponse userInfo = userAPI.getUserInfo(openId);
        uniteId = userInfo.getOpenid();
        String accessToken = UUID.randomUUID().toString();

        SessionManage.addUser(accessToken,new session(accessToken,uniteId,openId,userInfo.getNickname(),userInfo.getHeadimgurl()));
        com.sevenroad.dao.data.userInfo userinfo =  CacheSigleton.getUserInfoCache().getUserInfo(uniteId);
        System.out.println("-------------------------------------------------------");
        System.out.println(String.format("code:%s,open_id:%s,accessToken:%s",code,openId,accessToken));
        System.out.println("-------------------------------------------------------");
        if(userinfo == null)
            return new redirectResult(systemConfig.getOtherConfig().wxBindPage,accessToken);
        else
            return new redirectResult(systemConfig.getOtherConfig().userLoginPage,accessToken);
    }
}
