package com.sevenroad.utils.data;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.sql.Types;
import java.util.LinkedList;

/**
 * Created by Administrator on 2016/10/22.
 */
public class JsonUtils {
    public static CustomParam[] getCustomParams(String params){
        if(params == null||params == "") return new CustomParam[0];
        JSONArray json = JSONArray.fromObject(params);
        CustomParam[] result = new CustomParam[json.size()];
        for(int i = 0;i<json.size();i++){
            JSONObject item = json.getJSONObject(i);
            CustomParam  param =  new CustomParam(item.getString("param"),item.getInt("type"),item.get("value"),item.getInt("index"));
            result[i] = param;
        }
        return result;
    }
    public static String getDBValue(String Value,int type)
    {
        switch (type)
        {
            case Types.INTEGER:
            case Types.BIGINT:
            case Types.SMALLINT:
            case Types.DOUBLE:
            case Types.FLOAT:
            case Types.DECIMAL:
            case Types.NUMERIC:return Value;
            default:return "\""+Value+"\"";
        }
    }
    public static String getJsonByString(LinkedList<DataTable> dataTables){
        if(dataTables == null || dataTables.size() == 0) return "[]";
        StringBuilder stringBuilder = new StringBuilder();
        String[] row = null,columns = null;
        stringBuilder.append("[");
        for(int i = 0;i<dataTables.size();i++){
           DataTable table = dataTables.get(i);
            columns = table.getColumnNames();
            stringBuilder.append("[");
            if(table.getRows() == null ||table.getRows().size() == 0) continue;
            for(int j = 0;j<table.getRows().size();j++){
                stringBuilder.append("{");
                for(int z = 0;z<columns.length;z++)
                  stringBuilder.append("\""+columns[z]+"\":"+getDBValue(table.getRows().get(j)[z],table.getColumnTypes()[z])+",");
                stringBuilder.delete(stringBuilder.length()-1,stringBuilder.length());
                stringBuilder.append("},");
            }
            stringBuilder.delete(stringBuilder.length()-1,stringBuilder.length());
            stringBuilder.append("],");
        }
        stringBuilder.delete(stringBuilder.length()-1,stringBuilder.length());
        stringBuilder.append("]");
        return stringBuilder.toString();
    }

    public static String getJsonFromObject(Object obj){
       return JSONObject.fromObject(obj).toString();
    }
    public static String getJsonFromArray(Object obj){
        return JSONArray.fromObject(obj).toString();
    }
}
