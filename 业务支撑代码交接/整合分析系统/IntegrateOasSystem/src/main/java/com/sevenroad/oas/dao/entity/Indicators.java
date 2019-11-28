package com.sevenroad.oas.dao.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author linlin.zhang
 * @since 2017-05-24
 */
@TableName("t_e_indicators")
public class Indicators extends Model<Indicators> {

    private static final long serialVersionUID = 1L;

    @TableId("indicate_id")
	private Integer indicateId;
	@TableField("indicate_name")
	private String indicateName;
	@TableField("indicate_description")
	private String indicateDescription;
	@TableField("game_id")
	private int gameId;
	@TableField("menu_id")
	private int menuId;
	private Integer state;
	private Integer sort;


	public Integer getIndicateId() {
		return indicateId;
	}

	public void setIndicateId(Integer indicateId) {
		this.indicateId = indicateId;
	}

	public String getIndicateName() {
		return indicateName;
	}

	public void setIndicateName(String indicateName) {
		this.indicateName = indicateName;
	}

	public String getIndicateDescription() {
		return indicateDescription;
	}

	public void setIndicateDescription(String indicateDescription) {
		this.indicateDescription = indicateDescription;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	public int getMenuId() {
		return menuId;
	}

	public void setMenuId(int menuId) {
		this.menuId = menuId;
	}

	@Override
	protected Serializable pkVal() {
		return this.indicateId;
	}

}
