package com.sevenroad.oas.dao.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import java.util.Date;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author linlin.zhang
 * @since 2017-05-22
 */
@TableName("t_e_task")
public class Task extends Model<Task> {

    private static final long serialVersionUID = 1L;

	private Integer id;
	@TableField("task_interval")
	private Integer taskInterval;
	private String description;
	private String params;
	@TableField("start_time")
	private Date startTime;
	@TableField("next_time")
	private Date nextTime;
	private String message;
	@TableField("taks_type")
	private Integer taksType;
	private Integer state;


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getTaskInterval() {
		return taskInterval;
	}

	public void setTaskInterval(Integer taskInterval) {
		this.taskInterval = taskInterval;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getNextTime() {
		return nextTime;
	}

	public void setNextTime(Date nextTime) {
		this.nextTime = nextTime;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Integer getTaksType() {
		return taksType;
	}

	public void setTaksType(Integer taksType) {
		this.taksType = taksType;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

}
