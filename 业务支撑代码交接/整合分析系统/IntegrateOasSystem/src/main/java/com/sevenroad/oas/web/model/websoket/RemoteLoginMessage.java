package com.sevenroad.oas.web.model.websoket;

/**
 * Created by linlin.zhang on 2017/5/24.
 */
public class RemoteLoginMessage extends message {
    public RemoteLoginMessage(){
        setMessageType(com.sevenroad.oas.web.model.websoket.message.TYPE_REMOTE_LOGIN);
    }
}
