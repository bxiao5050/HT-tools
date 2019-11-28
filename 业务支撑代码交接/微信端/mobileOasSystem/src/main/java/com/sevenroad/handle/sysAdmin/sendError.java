package com.sevenroad.handle.sysAdmin;

import com.github.sd4324530.fastweixin.api.entity.TemplateMsg;
import com.github.sd4324530.fastweixin.api.response.SendTemplateResponse;
import com.sevenroad.dao.data.appConfig;
import com.sevenroad.dao.data.errorMessage;
import com.sevenroad.dao.data.userInfo;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.msg.WeiXinMsg;
import com.sevenroad.model.result.errorResult;
import com.sevenroad.model.result.jsonStringResult;
import com.sevenroad.model.result.successResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.singleton.wxConfigSigleton;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.exception.userPermException;
import com.xiaoleilu.hutool.crypto.SecureUtil;
import com.xiaoleilu.hutool.log.Log;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Collections;

/**
 * Created by linlin.zhang on 2018/1/30.
 */
public class sendError implements handleImp {

    private String sign = "";
    private String appId = "";
    private String from = "";
    private String msg = "";
    private String userName = "";
    private long time;
    @Override
    public void setParams(HttpServletRequest request) throws Exception {
        sign = request.getParameter("sign");
        appId = request.getParameter("appId");
        from = request.getParameter("from");
        msg = request.getParameter("msg");
        time = Long.parseLong(request.getParameter("time"));
        userName = request.getParameter("userName");
    }

    @Override
    public resultModel execute() throws Exception {
        appConfig appConfig = CacheSigleton.getAppConfigCache().getAppConfig(appId);
        userInfo userInfo = CacheSigleton.getUserInfoCache().get(userName);
        if(appConfig == null){
            return new successResult<>(400,"failure","app invalid");
        }
        if(userInfo == null){
            return new successResult<>(400,"failure","user not exist");
        }
        String signTrue = SecureUtil.md5(appId +from + msg + appConfig.getSecret() +time + userName);
        if(signTrue.equals(sign)){
            errorMessage errorMessage = new errorMessage();
            errorMessage.setWx_user_name(userInfo.getWxUserName());
            errorMessage.setUser_name(userInfo.getUserName());
            errorMessage.setUnite_id(userInfo.getUniteId());
            errorMessage.setError_message(this.msg);
            errorMessage.setError_date(new Timestamp(System.currentTimeMillis()));
            errorMessage.setMessage_type(from);
            TemplateMsg msg = WeiXinMsg.createMsgFromSafeOpera(errorMessage);
            SendTemplateResponse SendTemplateResponse = wxConfigSigleton.getTemplateAPI().send(msg);
            if(SendTemplateResponse.getErrcode().equals("0")){
                return new successResult<>(200,"success","send successed");
            }
        }else {
            return new successResult<>(400,"failure","sign error");
        }
        return new successResult<>(400,"failure","send failure");
    }
}
