package com.sevenroad.oas.dao;

import com.sevenroad.oas.dao.model.Column;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.TableResult;
import com.xiaoleilu.hutool.crypto.digest.DigestUtil;
import com.xiaoleilu.hutool.util.CharsetUtil;
import com.xiaoleilu.hutool.util.StrUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/20.
 */
public class Utils {
    /**
     * sql脚本替换
     *
     * @param sql    sql脚本
     * @param params 参数列表
     * @return 替换后的参数
     */
    public static String sqlGenerate(String sql, List<DBParam> params) {
        String result = sql;
        if (params != null)
            for (int i = 0; i < params.size(); i++) {
                String paramName = "#" + params.get(i).getParamName() + "#";
                result = result.replaceAll(paramName, getSqlParamValue(params.get(i)));
            }
        return result;
    }

    public static String getSqlParamValue(DBParam param) {
        switch (param.getDbType()) {
            case Types.INTEGER:
            case Types.DOUBLE:
                return sqlFilter(param.getParamValue());
            case Types.VARCHAR:
            case Types.DATE:
                return "'" + sqlFilter(param.getParamValue()) + "'";
            default:
                return "'" + sqlFilter(param.getParamValue()) + "'";
        }
    }

    public static String getSqlRowValue(String value, int type) {
        switch (type) {
            case Types.INTEGER:
            case Types.BIGINT:
            case Types.SMALLINT:
            case Types.DOUBLE:
                return value;
            case Types.VARCHAR:
            case Types.DATE:
                return "\"" + value + "\"";
            default:
                return "\"" + value + "\"";
        }
    }

    /**
     * 根据脚本名和参数生成唯一md5值用作缓存key
     *
     * @param dataview
     * @param params
     * @return
     */
    public static String queryKeyGenerate(String dataview, List<DBParam> params) {
        StringBuffer sb = new StringBuffer(dataview);
        if (params != null)
            for (int i = 0; i < params.size(); i++) {
                sb.append(params.get(i).getParamValue());
            }
        return DigestUtil.md5Hex(sb.toString());
    }

    public static TableResult getMoreResult(ResultSet resultSet) {
        TableResult dt = new TableResult();
        try {
            ResultSetMetaData rsmd = resultSet.getMetaData();
            int columnCount = rsmd.getColumnCount();

            List<Column> columns = new ArrayList<Column>();
            for (int i = 1; i <= columnCount; i++) {
                Column column = new Column();
                column.setColumnIndex(i);
                column.setColumnName(rsmd.getColumnName(i));
                column.setColumnType(rsmd.getColumnType(i));
                column.setRowData(new ArrayList());
                columns.add(column);
            }
            int rowCount = 0;
            while (resultSet.next()) {
                for (int i = 0; i < columns.size(); i++) {
                    Column column = columns.get(i);
                    column.getRowData().add(resultSet.getString(column.getColumnIndex()));
                }
                rowCount++;
            }
            dt.setResult(columns);
            dt.setRowCount(rowCount);
        } catch (Exception e) {
        }

        return dt;
    }

    public static int[] convertStringToInterger(String[] list) {
        int[] result = new int[list.length];
        for (int i = 0; i < list.length; i++) {
            result[i] = Integer.parseInt(list[i]);
        }
        return result;
    }

    public static String jsonResultGenerate(DataView dataView, List<TableResult> tableResults) {
        int[] exports = dataView.getExportTable();
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        String[] exportTables = new String[exports.length];
        for (int i = 0; i < exports.length; i++) {
            if (exports[i] > 0 && exports[i] <= tableResults.size()) {
                TableResult item = tableResults.get(exports[i] - 1);
                List<Column> columns = item.getResult();
                String[] rows = new String[item.getRowCount()];
                String[] cells = new String[columns.size()];
                for (int z = 0; z < item.getRowCount(); z++) {
                    for (int j = 0; j < columns.size(); j++) {
                        Column column = columns.get(j);
                        cells[j] = "\"" + column.getColumnName() + "\":" + getSqlRowValue(column.getRowData().get(z), column.getColumnType());
                    }
                    rows[z] = "{" + StrUtil.join(",", cells) + "}";
                }
                exportTables[i] = "[" + StrUtil.join(",", rows) + "]";
            }
        }
        sb.append(StrUtil.join(",", exportTables));
        sb.append("]");
        return sb.toString();
    }

    /**
     * 过滤敏感sql
     */
    static String[] filterKey = new String[]{" select ", " insert ", " update ", " delete ", "'", " drop ", "[*]", "/", " and ", " or ", "[(]", "[)]"};

    public static String sqlFilter(String str) {
        for (int i = 0; i < filterKey.length; i++) {
            str = str.replaceAll(filterKey[i], "");
        }
        return str;
    }

    /**
     * 获取指定参数
     * @param name
     * @param params
     * @return
     */
    public static DBParam getParam(String name,List<DBParam> params){
        if(params != null) {
            for (int i = 0; i < params.size(); i++) {
                if (params.get(i).getParamName().equals(name)) {
                    return params.get(i);
                }
            }
        }
        return null;
    }


}
