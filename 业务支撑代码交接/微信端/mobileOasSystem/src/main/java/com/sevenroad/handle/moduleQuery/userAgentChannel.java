package com.sevenroad.handle.moduleQuery;

import com.sevenroad.handle.channelImp;
import com.sevenroad.model.session;
import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.exception.moduleQueryException;
import com.sevenroad.utils.exception.severnroadException;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by linlin.zhang on 2016/11/28.
 */
public class userAgentChannel extends channelImp {
    private String userAgent;
    private String referer;

    public userAgentChannel(HttpServletRequest request) {
        this.userAgent = request.getHeader("User-Agent");
        this.referer = request.getHeader("referer");
    }

    @Override
    public channelImp execute(session session) throws Exception {
//        if(userAgent.toLowerCase().contains("micromessenger") == false) throw new ("请使用微信登陆");
//        if(this.referer != systemConfig.getOtherConfig().referer) throw new severnroadException(severnroadException.ERRO_CROSS_DOMIN);
        if (next == null) return this;
        else return next.execute(session);
    }
}
