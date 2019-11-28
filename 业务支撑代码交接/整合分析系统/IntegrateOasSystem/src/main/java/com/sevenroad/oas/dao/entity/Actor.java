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
@TableName("t_e_actor")
public class Actor extends Model<Actor> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "actor_id",type = IdType.AUTO)
	private Integer actorId;
	@TableField("actor_name")
	private String actorName;
	private String description;
	private Integer state;


	public Integer getActorId() {
		return actorId;
	}

	public void setActorId(Integer actorId) {
		this.actorId = actorId;
	}

	public String getActorName() {
		return actorName;
	}

	public void setActorName(String actorName) {
		this.actorName = actorName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	@Override
	protected Serializable pkVal() {
		return this.actorId;
	}

}
