package com.sevenroad.oas.dao.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author linlin.zhang
 * @since 2017-05-31
 */
@TableName("t_e_user_actor")
public class UserActor extends Model<UserActor> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "user_actor_id",type = IdType.AUTO)
	private Integer userActorId;
	@TableField("user_id")
	private Integer userId;
	@TableField("actor_id")
	private Integer actorId;


	public Integer getUserActorId() {
		return userActorId;
	}

	public void setUserActorId(Integer userActorId) {
		this.userActorId = userActorId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getActorId() {
		return actorId;
	}

	public void setActorId(Integer actorId) {
		this.actorId = actorId;
	}

	@Override
	protected Serializable pkVal() {
		return this.userActorId;
	}

}
