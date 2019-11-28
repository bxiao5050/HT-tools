package com.sevenroad.singleton;

import com.github.sd4324530.fastweixin.api.MessageAPI;
import com.github.sd4324530.fastweixin.api.OauthAPI;
import com.github.sd4324530.fastweixin.api.TemplateMsgAPI;
import com.github.sd4324530.fastweixin.api.UserAPI;
import com.github.sd4324530.fastweixin.api.config.ApiConfig;
import com.sevenroad.utils.config.systemConfig;

/**
 * Created by linlin.zhang on 2016/11/29.
 */
public class wxConfigSigleton {
    private static OauthAPI OauAPI ;
    private static UserAPI userAPI;
    private static MessageAPI messageAPI;
    private static ApiConfig apiConfig = new ApiConfig(systemConfig.getOtherConfig().wx_app_id, systemConfig.getOtherConfig().wx_appsecret) ;
    private static TemplateMsgAPI templateAPI;
    public static OauthAPI getOauAPI() {
       if(OauAPI == null)
           OauAPI = new OauthAPI(apiConfig);
        return OauAPI;
    }
    public static UserAPI getUserAPI(){
        if(userAPI == null)
            userAPI = new UserAPI(apiConfig);
        return userAPI;
    }
    public static TemplateMsgAPI getTemplateAPI(){
        if(templateAPI == null)
            templateAPI = new TemplateMsgAPI(apiConfig);
        return templateAPI;
    }
    public static MessageAPI getMessageAPI(){
        if(messageAPI == null)
            messageAPI = new MessageAPI(apiConfig);
        return messageAPI;
    }
}
