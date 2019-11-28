package com.dataprovider.premiss.entitys;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.dataprovider.premiss.interfaces.IIntTreeNode;

/**
 * Created by linlin.zhang on 2017/8/11.
 */
@TableName("t_e_usergroup")
public class UserGroup extends IIntTreeNode {
    /**
     * 资源id
     */
    @TableId(value = "id")
    int id;

    /**
     * 源id
     */
    @TableField(value = "group_name")
    String groupName;


    @TableField(value = "group_description")
    String groupDescription;

    /**
     * 父资源id
     */
    @TableField(value = "parent_id")
    int parentId;

    @TableField(value = "path")
    String path;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupDescription() {
        return groupDescription;
    }

    public void setGroupDescription(String groupDescription) {
        this.groupDescription = groupDescription;
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

    @Override
    public int TreeNodeParentId() {
        return parentId;
    }

    @Override
    public int TreeNodeId() {
        return id;
    }
}
