package com.sevenroad.handle.userPerm;

import com.sevenroad.handle.handleImp;
import com.sevenroad.model.SessionManage;
import com.sevenroad.model.result.changeGameResult;
import com.sevenroad.model.resultModel;
import com.sevenroad.model.session;
import com.sevenroad.utils.exception.lostParamException;
import com.sevenroad.utils.exception.severnroadException;
import com.sevenroad.utils.exception.userPermException;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by linlin.zhang on 2017/2/7.
 */
public class changeGameHandle implements handleImp {
    private String accessToken;
    private int game_id;
    private int system_id;
    @Override
    public resultModel execute() throws Exception {
        session user = SessionManage.getSession(accessToken);
        if(user == null) throw new userPermException(userPermException.UNOAUTH_ACCESS_TOKEN);
        user.setCurrentGameId(this.game_id);
        user.setCurrentSystemId(this.system_id);
        return new changeGameResult(system_id,game_id);
    }

    @Override
    public void setParams(HttpServletRequest request) throws Exception {
        if(!request.getParameterMap().containsKey("access_token"))
            throw new lostParamException("access_token");
        if(!request.getParameterMap().containsKey("game_id"))
            throw new severnroadException(severnroadException.LOST_PARAMS);
        if(!request.getParameterMap().containsKey("system_id"))
            throw new severnroadException(severnroadException.LOST_PARAMS);
        this.accessToken = request.getParameter("access_token");
        game_id = Integer.valueOf(request.getParameter("game_id"));
        system_id = Integer.valueOf(request.getParameter("system_id"));
    }
}
