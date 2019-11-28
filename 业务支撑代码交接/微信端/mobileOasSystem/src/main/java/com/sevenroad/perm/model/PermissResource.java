package com.sevenroad.perm.model;

import java.util.List;

/**
 * Created by linlin.zhang on 2018/2/26/026.
 */
public class PermissResource implements Comparable {
    private int id;
    private String resourceId;
    private String resourceName;
    private String url;
    private int gameId;
    private List<PermissResource> children;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public List<PermissResource> getChildren() {
        return children;
    }

    public void setChildren(List<PermissResource> children) {
        this.children = children;
    }

    @Override
    public int compareTo(Object o) {
        return this.id - ((PermissResource)o).getId();
    }
}
