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
 * @since 2017-05-19
 */
@TableName("t_e_dataview_component")
public class DataviewComponent extends Model<DataviewComponent> {

    private static final long serialVersionUID = 1L;

	@TableId(value="dataview_component_id", type= IdType.AUTO)
	private Integer dataviewComponentId;
	@TableField("component_id")
	private Integer componentId;
	@TableField("dataview_id")
	private Integer dataviewId;


	public Integer getDataviewComponentId() {
		return dataviewComponentId;
	}

	public void setDataviewComponentId(Integer dataviewComponentId) {
		this.dataviewComponentId = dataviewComponentId;
	}

	public Integer getComponentId() {
		return componentId;
	}

	public void setComponentId(Integer componentId) {
		this.componentId = componentId;
	}

	public Integer getDataviewId() {
		return dataviewId;
	}

	public void setDataviewId(Integer dataviewId) {
		this.dataviewId = dataviewId;
	}

	@Override
	protected Serializable pkVal() {
		return this.dataviewComponentId;
	}

}
