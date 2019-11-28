package com.sevenroad.perm.model;

import java.util.List;

/**
 * Created by linlin.zhang on 2018/2/26/026.
 */
public class PermissList {
    private List<PermissResource> agentList;
    private List<PermissResource> menuList;
    private List<PermissResource> channelList;

    public List<PermissResource> getAgentList() {
        return agentList;
    }

    public void setAgentList(List<PermissResource> agentList) {
        this.agentList = agentList;
    }

    public List<PermissResource> getMenuList() {
        return menuList;
    }

    public void setMenuList(List<PermissResource> menuList) {
        this.menuList = menuList;
    }

    public List<PermissResource> getChannelList() {
        return channelList;
    }

    public void setChannelList(List<PermissResource> channelList) {
        this.channelList = channelList;
    }
}
