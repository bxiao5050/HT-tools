package com.dataprovider.premiss.entitys;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

/**
 * Created by linlin.zhang on 2017/9/5.
 */
@TableName("t_e_user_role")
public class UserRole {

    @TableId(value = "id")
    private int id;

    @TableField(value = "actor_id")
    private int roleId;

    @TableField(value = "user_id")
    private int userId;

    @TableField(value = "status")
    private int status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
