package com.sevenroad.listener;

import com.sevenroad.model.SessionManage;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * Created by linlin.zhang on 2016/10/25.
 */
public class sessionListenner implements HttpSessionListener {
    @Override
    public void sessionCreated(HttpSessionEvent httpSessionEvent) {

        System.out.println("sessionCreated");
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
        String session_id = httpSessionEvent.getSession().getId();
        SessionManage.removeUser(session_id);
    }
}
