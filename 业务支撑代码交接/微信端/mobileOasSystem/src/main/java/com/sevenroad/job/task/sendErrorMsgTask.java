package com.sevenroad.job.task;

import com.github.sd4324530.fastweixin.api.entity.TemplateMsg;
import com.github.sd4324530.fastweixin.api.response.SendTemplateResponse;
import com.sevenroad.dao.connection.SystemConnection;
import com.sevenroad.dao.data.errorMessage;
import com.sevenroad.model.msg.WeiXinMsg;
import com.sevenroad.utils.Logger;
import com.sevenroad.singleton.wxConfigSigleton;
import com.sevenroad.utils.config.systemConfig;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/1/6.
 */
public class sendErrorMsgTask implements Runnable {
    @Override
    public void run() {
        SystemConnection conn = new SystemConnection();
        try {
            LinkedList<errorMessage> msgs = conn.getErrorMessage();
            int[] errorMsg = new int[msgs.size()];
            for(int j = 0;j<msgs.size();j++) {
                TemplateMsg msg = WeiXinMsg.createMsgFromSystemNotify(msgs.get(j));
                SendTemplateResponse SendTemplateResponse = wxConfigSigleton.getTemplateAPI().send(msg);
                System.out.println(SendTemplateResponse.toJsonString());
                errorMsg[j] = msgs.get(j).getId();
            }
            conn.updateErrorMessage(errorMsg);
        } catch (Exception ex){
            Logger.getInstance().Error(ex);
        }

    }
}
