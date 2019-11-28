package com.sevenroad.oas.web.model.websoket;

/**
 * Created by linlin.zhang on 2017/4/28.
 */
public class heartBeatMessage extends message {
    public heartBeatMessage(){
        this.setMessageType(TYPE_HEARTBEAT);
        this.setMessage("Pong");
    }
}
