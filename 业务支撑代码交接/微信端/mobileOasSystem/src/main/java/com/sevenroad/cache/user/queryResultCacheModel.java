package com.sevenroad.cache.user;

import com.sevenroad.utils.data.DataTable;

import java.util.Calendar;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/11/18.
 */
public class queryResultCacheModel {
    private Calendar cachedTime;
    private Calendar expiredTime;
    private LinkedList<DataTable> Data ;
    public queryResultCacheModel(int expiredTime,LinkedList<DataTable> data){
        this.cachedTime = Calendar.getInstance();
        this.expiredTime = Calendar.getInstance();
        this.expiredTime.add(Calendar.MILLISECOND,expiredTime);
        this.Data = data;
    }
    public Calendar getCachedTime(){
        return cachedTime;
    }
    public Calendar getExpiredTime(){
        return expiredTime;
    }
    public LinkedList<DataTable>  getQueryResult(){
        return Data;
    }
}
