package com.sevenroad.oas.dao.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author linlin.zhang
 * @since 2017-07-12
 */
@TableName("t_e_column_language")
public class ColumnLanguage extends Model<ColumnLanguage> {

    private static final long serialVersionUID = 1L;

	@TableId("id")
	private int id;
	@TableField("language_type")
	private String languageType;
	@TableField("column_name")
	private String columnName;
	@TableField("column_value")
	private String columnValue;


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLanguageType() {
		return languageType;
	}

	public void setLanguageType(String languageType) {
		this.languageType = languageType;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getColumnValue() {
		return columnValue;
	}

	public void setColumnValue(String columnValue) {
		this.columnValue = columnValue;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "ColumnLanguage{" +
			"languageType=" + languageType +
			", columnName=" + columnName +
			", columnValue=" + columnValue +
			"}";
	}
}
