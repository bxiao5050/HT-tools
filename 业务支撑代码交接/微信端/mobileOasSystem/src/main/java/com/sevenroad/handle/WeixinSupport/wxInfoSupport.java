package com.sevenroad.handle.WeixinSupport;

import com.github.sd4324530.fastweixin.api.entity.TemplateMsg;
import com.github.sd4324530.fastweixin.api.response.GetUserInfoResponse;
import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.TextMsg;
import com.github.sd4324530.fastweixin.message.req.BaseEvent;
import com.github.sd4324530.fastweixin.message.req.MenuEvent;
import com.github.sd4324530.fastweixin.message.req.TextReqMsg;
import com.github.sd4324530.fastweixin.servlet.WeixinSupport;
import com.sevenroad.dao.data.DataView;
import com.sevenroad.dao.data.userInfo;
import com.sevenroad.model.msg.WeiXinMsg;
import com.sevenroad.singleton.CacheSigleton;
import com.sevenroad.singleton.wxConfigSigleton;
import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.CustomParamType;
import com.sevenroad.utils.data.paramsList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by linlin.zhang on 2016/11/25.
 */
public class wxInfoSupport extends WeixinSupport {
    private static final Logger log = LoggerFactory.getLogger(wxInfoSupport.class);
    @Override
    protected String getToken() {
        return "changicMobileOasSystem";
    }
    @Override
    protected BaseMsg handleTextMsg(TextReqMsg msg) {
        return new TextMsg("欢迎使用7road业务支撑系统");
    }

    @Override
    protected String getAESKey() {
        return systemConfig.getOtherConfig().wx_EncodingAESKey;
    }

    @Override
    protected String getAppId() {
        return systemConfig.getOtherConfig().wx_app_id;
    }

    @Override
    protected BaseMsg handleMenuClickEvent(MenuEvent event) {
        String value = event.getEventKey();
        if(value.compareTo("RELEASE_USER")==0) {
            try {
                String open_id = event.getFromUserName();
                GetUserInfoResponse wxUser = wxConfigSigleton.getUserAPI().getUserInfo(open_id);
                userInfo user = CacheSigleton.getUserInfoCache().getUserInfo(open_id);
                if(user == null) return  new TextMsg(wxUser.getNickname()+"用户未绑定");
                CustomParam[] params = {
                        new CustomParam("unite_id", CustomParamType.String.getType(), open_id, 1),
                };
                paramsList paramList = new paramsList();
                paramList.setParams(params);
                DataView dataView = CacheSigleton.getDataViewCache().getDataView(systemConfig.getDataViewConfig().sysReleaseUser);
                TemplateMsg msg = WeiXinMsg.createMsgFromReaseUser(user.getOpenId(),user.getUserName(),CacheSigleton.getQueryResultCache().getQueryResult(dataView, paramList).get(0).getRows().get(0)[0]);
                CacheSigleton.getUserInfoCache().delete(open_id);
                wxConfigSigleton.getTemplateAPI().send(msg);
                return null;
            }
            catch (Exception ex){
                com.sevenroad.utils.Logger.getInstance().Error(ex);
               return  new TextMsg("解除绑定失败，请联系管理员:"+ex.getMessage());
            }
        }
        return  new TextMsg("无效的操作");
    }

    @Override
    protected BaseMsg handleUnsubscribe(BaseEvent event) {
        String open_id = event.getFromUserName();
        try {
            GetUserInfoResponse wxUser = wxConfigSigleton.getUserAPI().getUserInfo(open_id);
            userInfo user = CacheSigleton.getUserInfoCache().getUserInfo(open_id);
            if(user == null) return  new TextMsg(wxUser.getNickname()+"用户未绑定");
            CustomParam[] params = {
                    new CustomParam("unite_id", CustomParamType.String.getType(), open_id, 1),
            };
            paramsList paramList = new paramsList();
            paramList.setParams(params);
            DataView dataView = CacheSigleton.getDataViewCache().getDataView(systemConfig.getDataViewConfig().sysReleaseUser);
            TemplateMsg msg = WeiXinMsg.createMsgFromReaseUser(user.getOpenId(),user.getUserName(),CacheSigleton.getQueryResultCache().getQueryResult(dataView, paramList).get(0).getRows().get(0)[0]);
            CacheSigleton.getUserInfoCache().delete(open_id);
            wxConfigSigleton.getTemplateAPI().send(msg);
            return null;
        }
        catch (Exception ex){
            com.sevenroad.utils.Logger.getInstance().Error(ex);
            return  new TextMsg("解除绑定失败，请联系管理员");
        }
    }
}
