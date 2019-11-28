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
@TableName("t_e_game")
public class Game extends Model<Game> {

    private static final long serialVersionUID = 1L;

    @TableId("game_id")
	private Integer gameId;
	@TableField("main_game_id")
	private Integer mainGameId;
	@TableField("game_name")
	private String gameName;
	@TableField("language_id")
	private Integer languageId;
	@TableField("connection_id")
	private Integer connectionId;
	private Integer state;
	private Integer sort;


	public Integer getGameId() {
		return gameId;
	}

	public void setGameId(Integer gameId) {
		this.gameId = gameId;
	}

	public Integer getMainGameId() {
		return mainGameId;
	}

	public void setMainGameId(Integer mainGameId) {
		this.mainGameId = mainGameId;
	}

	public String getGameName() {
		return gameName;
	}

	public void setGameName(String gameName) {
		this.gameName = gameName;
	}

	public Integer getLanguageId() {
		return languageId;
	}

	public void setLanguageId(Integer languageId) {
		this.languageId = languageId;
	}

	public Integer getConnectionId() {
		return connectionId;
	}

	public void setConnectionId(Integer connectionId) {
		this.connectionId = connectionId;
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

	@Override
	protected Serializable pkVal() {
		return this.gameId;
	}

}
