package com.sevenroad.handle.moduleQuery;

import com.sevenroad.dao.connection.SystemConnection;
import com.sevenroad.dao.data.systemLog;
import com.sevenroad.dao.data.systemLogEventType;
import com.sevenroad.handle.channelImp;
import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.utils.data.JsonUtils;
import com.sevenroad.utils.exception.lostParamException;
import com.sevenroad.utils.exception.moduleQueryException;
import com.sevenroad.utils.exception.severnroadException;
import com.sevenroad.utils.exception.userPermException;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;

/**
 * Created by linlin.zhang on 2016/11/25.
 */
public class accessTokenChannel extends channelImp {
    private String access_token;
    private String remote_ip;
    private String params;
    private String dataview;

    public accessTokenChannel(HttpServletRequest request)throws Exception {
        if(!request.getParameterMap().containsKey("access_token"))throw new lostParamException("access_token");
        this.access_token = request.getParameter("access_token");
        this.remote_ip = request.getRemoteAddr();
        if(!request.getParameterMap().containsKey("dataview"))throw new lostParamException("dataview");
        this.dataview = request.getParameter("dataview");
    }
    @Override
    public  channelImp execute(session session) throws Exception {
        session user = SessionManage.getSession(access_token);
        if (user == null)  throw new userPermException(userPermException.INVALID_ACCESS_TOKEN);
        systemLogEventType eventInfo = new systemLogEventType(systemLogEventType.MODULE_QUERY,dataview,params);
        systemLog log = new systemLog(user.getUserName(),user.getWx_user_name(),eventInfo, Calendar.getInstance().getTime(),remote_ip);
        SystemConnection conn = new SystemConnection();
        conn.writeSystemLogInfo(log);
        if (next == null) return this;
        else return next.execute(user);
    }
}
