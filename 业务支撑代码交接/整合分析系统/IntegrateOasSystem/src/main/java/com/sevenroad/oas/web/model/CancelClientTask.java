package com.sevenroad.oas.web.model;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.client.WebSocketClient;

/**
 * Created by Administrator on 2017/4/29 0029.
 */
public class CancelClientTask implements Runnable {
    private WebSoketClient client;
    public CancelClientTask(WebSoketClient client){
        this.client = client;
    }
    public void run()  {
        try {
            client.close(CloseStatus.NO_STATUS_CODE);
        }catch (Exception e){

        }
    }
}
