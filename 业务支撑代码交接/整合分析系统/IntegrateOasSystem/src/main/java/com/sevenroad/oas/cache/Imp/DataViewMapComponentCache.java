package com.sevenroad.oas.cache.Imp;

import com.sevenroad.oas.cache.MemCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.tables.DataViewMapComponent;
import com.sevenroad.oas.dao.repository.DataViewRepository;

import javax.annotation.Resource;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/19.
 */
public class DataViewMapComponentCache extends MemCache<Integer,List<DataViewMapComponent>> {
    @Resource
    ConnectionManager connectionManager;
    @Resource
    private DataViewRepository dataViewRepository;

    private String getDataSql;

    public DataViewMapComponentCache(String getData){
        this.getDataSql = getData;
    }
    public void refleshCache() {
        Connection connection = connectionManager.getConnection(0);
        List<DataViewMapComponent> dataViewList = dataViewRepository.getComponent(connection,getDataSql);
        for(int i = 0;i<dataViewList.size();i++){
            DataViewMapComponent component = dataViewList.get(i);
            List<DataViewMapComponent> list = getCache(component.getDataViewId());
            if(list == null) {
                list = new ArrayList<>();
                putCache(component.getDataViewId(), list, FOREVER_CACHE);
            }
            list.add(component);
        }
    }
}
