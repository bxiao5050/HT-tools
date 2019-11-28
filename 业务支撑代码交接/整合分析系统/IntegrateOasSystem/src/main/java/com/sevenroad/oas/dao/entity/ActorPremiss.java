package com.sevenroad.oas.dao.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.enums.IdType;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author linlin.zhang
 * @since 2017-05-31
 */
@TableName("t_e_actor_premiss")
public class ActorPremiss extends Model<ActorPremiss> {

    private static final long serialVersionUID = 1L;

	@TableId(value="actor_premiss_id", type= IdType.AUTO)
	private Integer actorPremissId;
	@TableField("actor_id")
	private Integer actorId;
	@TableField("permiss_key_extra_id")
	private Integer permissKeyExtraId;
	@TableField("premiss_key_id")
	private Integer premissKeyId;
	@TableField("premiss_info")
	private String premissInfo;


	public Integer getActorPremissId() {
		return actorPremissId;
	}

	public void setActorPremissId(Integer actorPremissId) {
		this.actorPremissId = actorPremissId;
	}

	public Integer getActorId() {
		return actorId;
	}

	public void setActorId(Integer actorId) {
		this.actorId = actorId;
	}

	public Integer getPermissKeyExtraId() {
		return permissKeyExtraId;
	}

	public void setPermissKeyExtraId(Integer permissKeyExtraId) {
		this.permissKeyExtraId = permissKeyExtraId;
	}

	public Integer getPremissKeyId() {
		return premissKeyId;
	}

	public void setPremissKeyId(Integer premissKeyId) {
		this.premissKeyId = premissKeyId;
	}

	public String getPremissInfo() {
		return premissInfo;
	}

	public void setPremissInfo(String premissInfo) {
		this.premissInfo = premissInfo;
	}

	@Override
	protected Serializable pkVal() {
		return this.actorPremissId;
	}

}
