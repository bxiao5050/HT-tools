package com.sevenroad.handle.moduleQuery;

import com.sevenroad.handle.channelImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.session;
import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.CustomParamType;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.data.SystemUtils;
import com.sevenroad.utils.exception.moduleQueryException;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by linlin.zhang on 2016/11/25.
 */
public class paramsChannel extends channelImp {
    private HttpServletRequest request;
    private CustomParam[] params;
    private int system_id;
    private int game_id;
    public paramsChannel(HttpServletRequest request){
        this.request = request;
        params = JsonUtils.getCustomParams(request.getParameter("params"));
    }
    public CustomParam[] getParams(){
        return params;
    }
    public  channelImp execute(session session) throws Exception {
        system_id = session.getCurrentSystemId();
        game_id = session.getCurrentGameId();
        //json解析
        for(int i = 0;i<params.length;i++) {
            if(params[i].getParamName().compareTo("system_id") == 0) system_id = params[i].getIntValue();
            if(params[i].getParamName().compareTo("game_id") == 0) game_id = params[i].getIntValue();
            if (params[i].getParamType() == CustomParamType.String.getType())
                params[i].setParamValue(SystemUtils.grepSql(params[i].getStringValue(), systemConfig.getOtherConfig().grepSQL));
        }
        return this;
    }

    public int getGameId() {
        return game_id;
    }

    public int getSystemId() {
        return system_id;
    }
}
