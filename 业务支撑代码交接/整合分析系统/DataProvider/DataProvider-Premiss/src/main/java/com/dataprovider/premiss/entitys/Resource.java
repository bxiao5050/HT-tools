package com.dataprovider.premiss.entitys;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.dataprovider.premiss.interfaces.IIntTreeNode;
import com.xiaoleilu.hutool.convert.Convert;
import org.apache.ibatis.annotations.Property;

/**
 * Created by linlin.zhang on 2017/8/9.
 */
@TableName("t_e_resource")
public class Resource extends IIntTreeNode implements Comparable<Resource> {
    /**
     * 资源id
     */
    @TableId(value = "id")
    int id;

    /**
     * 源id
     */
    @TableField(value = "resource_id")
    String resourceId;

    /**
     * 源id
     */
    @TableField(value = "resource_name")
    String resourceName;

    /**
     * url
     */
    @TableField(value = "url")
    String url;


    /**
     * 游戏id
     */
    @TableField(value = "game_id")
    int gameId;

    /**
     * 资源类型
     */
    @TableField(value = "resource_type")
    String  resourceType;

    /**
     * 父资源id
     */
    @TableField(value = "parent_id")
    int parentId;

    /**
     * 父资源id
     */
    @TableField(value = "path")
    String path;

    @TableField(exist = false)
    Boolean isOwner;


    public int TreeNodeId() {
        return id;
    }

    public int TreeNodeParentId() {
        return parentId;
    }

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

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public Boolean getOwner() {
        return isOwner;
    }

    public void setOwner(Boolean owner) {
        isOwner = owner;
    }

    @Override
    public int compareTo(Resource o) {
       return Convert.toInt(this.getResourceId()) - Convert.toInt(o.getResourceId());
    }
}
