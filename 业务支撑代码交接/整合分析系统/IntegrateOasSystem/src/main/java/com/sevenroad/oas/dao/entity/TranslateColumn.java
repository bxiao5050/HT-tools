package com.sevenroad.oas.dao.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author linlin.zhang
 * @since 2017-08-10
 */
@TableName("t_e_translate_column")
public class TranslateColumn extends Model<TranslateColumn> {

    private static final long serialVersionUID = 1L;

	private String columnName;


	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	@Override
	protected Serializable pkVal() {
		return this.columnName;
	}

	@Override
	public String toString() {
		return "TranslateColumn{" +
			"columnName=" + columnName +
			"}";
	}
}
