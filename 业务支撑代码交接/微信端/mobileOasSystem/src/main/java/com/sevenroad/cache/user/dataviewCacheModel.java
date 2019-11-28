package com.sevenroad.cache.user;

import com.sevenroad.dao.connection.DBType;
import com.sevenroad.dao.data.DataView;

import java.util.HashMap;

/**
 * Created by linlin.zhang on 2016/12/16.
 */
public class dataviewCacheModel {
    private int DBType;
    private HashMap<String,DataView> dataview;
    public dataviewCacheModel(int dbType,HashMap<String,DataView> list){
        this.DBType = dbType;
        this.dataview = list;
    }
    public DataView getDataView(String dataview_name){
         return dataview.get(dataview_name);
    }
}
