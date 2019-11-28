package com.sevenroad.handle;

import com.sevenroad.model.session;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by linlin.zhang on 2016/11/25.
 */
public abstract class channelImp {
   public abstract channelImp execute(session session) throws Exception;
   protected channelImp next;
    public channelImp setChannelImp(channelImp next){
        this.next = next;
        return next;
    }
}
