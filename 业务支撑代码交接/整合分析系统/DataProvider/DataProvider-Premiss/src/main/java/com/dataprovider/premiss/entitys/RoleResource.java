package com.dataprovider.premiss.entitys;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

/**
 * Created by linlin.zhang on 2017/9/5.
 */
@TableName("t_e_role_resource")
public class RoleResource {

    @TableId(value = "id")
    private int id;

    @TableField(value = "actor_id")
    private int actorId;

    @TableField(value = "resource_id")
    private int resourceId;

    @TableField(value = "status")
    private int status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getActorId() {
        return actorId;
    }

    public void setActorId(int actorId) {
        this.actorId = actorId;
    }

    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
