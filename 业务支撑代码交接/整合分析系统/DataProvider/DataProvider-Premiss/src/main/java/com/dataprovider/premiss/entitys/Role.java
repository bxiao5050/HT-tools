package com.dataprovider.premiss.entitys;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

/**
 * Created by linlin.zhang on 2017/8/21.
 */
@TableName("t_e_role")
public class Role {
    /**
     * 角色id
     */
    @TableId(value = "id")
    private int roleId;
    /**
     * 角色名称
     */
    @TableField(value = "actor_name")
    private String roleName;
    /**
     * 角色名称
     */
    @TableField(value = "actor_description")
    private String roleDescription;

    /**
     * 角色状态
     */
    @TableField(value = "actor_state")
    private int status;

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDescription() {
        return roleDescription;
    }

    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
