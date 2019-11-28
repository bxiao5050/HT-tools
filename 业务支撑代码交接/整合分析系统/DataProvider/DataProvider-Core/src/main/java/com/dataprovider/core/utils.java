package com.dataprovider.core;

import com.dataprovider.core.interfaces.DataHandler;
import com.dataprovider.dao.models.Column;
import com.dataprovider.dao.models.IntergrateTable;
import com.dataprovider.dao.models.Table;
import com.google.common.base.Joiner;
import com.xiaoleilu.hutool.json.JSONUtil;
import com.xiaoleilu.hutool.util.ClassUtil;
import com.xiaoleilu.hutool.util.StrUtil;

import java.sql.Types;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;


/**
 * Created by linlin.zhang on 2017/7/29.
 */
public class utils {
    private static HashMap<Integer,DataHandler> handlers = new HashMap<Integer, DataHandler>();

    private static final String DataHandlerPackageName = "com.dataprovider.core.handlers";


    public static DataHandler GetDataHandler(int index){
        try {
            if (handlers == null) {
                handlers = new HashMap<Integer, DataHandler>();
            }
            if (handlers.size() == 0) {
                Set<Class<?>> classes = ClassUtil.scanPackage(DataHandlerPackageName);
                Iterator<Class<?>> iterator = classes.iterator();
                while (iterator.hasNext()) {
                    Class<?> type = iterator.next();
                    com.dataprovider.core.annotations.DataHandler mate = type.getAnnotation(com.dataprovider.core.annotations.DataHandler.class);
                    handlers.put(mate.index(), (DataHandler)type.newInstance());
                }
            }
            return handlers.get(index);
        }
        catch (Exception e){
            System.out.println("获取处理器失败");
        }
        return null;
    }

    public static String TableToJson(List<Table> list){
        Joiner joiner = Joiner.on(",");
        String[] tables = new String[list.size()];
        for(int i = 0;i<list.size();i++){
            Table table = list.get(i);
            String[] rows = new String[table.getRows().size()];
            for(int j = 0;j<table.getRows().size();j++){
                String[] cells = new String[table.getColumnName().length];
                for(int z = 0;z<table.getColumnName().length;z++){
                    cells[z] = "\""+JSONUtil.quote(table.getColumnName()[z]) +"\":\""+ JSONUtil.quote(getSqlRowValue(table.getRows().get(j)[z],table.getColumnType()[z]))+"\"";
                }
             rows[j] = "{" + joiner.join(cells) + "}";
            }
            tables[i] = "["+joiner.join(rows)+"]";
        }
       return new StringBuilder("[" + joiner.join(tables) + "]").toString();
    }

    public static String TableToRows(List<Table> list){
        Joiner joiner = Joiner.on(",");
        String[] tables = new String[list.size()];
        for(int i = 0;i<list.size();i++){
            Table table = list.get(i);
            String[] rows = new String[table.getRows().size()];
            for(int j = 0;j<table.getRows().size();j++){
                String[] cells = new String[table.getColumnName().length];
                for(int z = 0;z<table.getColumnName().length;z++){
                    cells[z] = "\""+JSONUtil.quote(table.getColumnName()[z]) +"\":\""+ JSONUtil.quote(getSqlRowValue(table.getRows().get(j)[z],table.getColumnType()[z]))+"\"";
                }
                rows[j] = "{" + joiner.join(cells) + "}";
            }
            tables[i] = joiner.join(rows);
        }
        return new StringBuilder("[" + joiner.join(tables) + "]").toString();
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
}
