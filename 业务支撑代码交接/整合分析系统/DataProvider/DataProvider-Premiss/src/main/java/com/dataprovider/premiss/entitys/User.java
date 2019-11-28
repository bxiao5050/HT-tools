package com.dataprovider.premiss.entitys;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

/**
 * Created by linlin.zhang on 2017/8/21.
 */
@TableName("t_e_user")
public class User {
    /**
     * 用户id
     */
    @TableId(value = "id")
    private int userId;

    /**
     * 用户名称
     */
    @TableField(value = "user_name")
    private String userName;

    /**
     * 用户描述
     */
    @TableField(value = "user_description")
    private String userDescription;

    /**
     * 用户状态
     */
    @TableField(value = "user_state")
    private int status;
    /**
     * 用户描述
     */
    @TableField(value = "user_email")
    private String userEmail;

    /**
     * 用户状态
     */
    @TableField(value = "user_phone")
    private String userPhone;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserDescription() {
        return userDescription;
    }

    public void setUserDescription(String userDescription) {
        this.userDescription = userDescription;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }
}
