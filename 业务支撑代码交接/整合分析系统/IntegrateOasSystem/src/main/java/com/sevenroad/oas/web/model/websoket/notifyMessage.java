package com.sevenroad.oas.web.model.websoket;

import java.util.List;

/**
 * Created by Administrator on 2017/4/29 0029.
 */
public class notifyMessage extends message {
    private List<String> messageList;

    public List<String> getMessageList() {
        return messageList;
    }
    public notifyMessage(){
        this.setMessageType(message.TYPE_NOTIFY);
    }
    public void setMessageList(List<String> messageList) {
        this.messageList = messageList;
    }
}
