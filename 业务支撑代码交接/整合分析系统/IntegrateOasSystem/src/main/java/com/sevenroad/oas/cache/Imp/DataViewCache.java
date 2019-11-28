package com.sevenroad.oas.cache.Imp;

import com.sevenroad.oas.cache.MemCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.repository.DataViewRepository;
import org.springframework.context.annotation.DependsOn;

import javax.annotation.Resource;
import java.sql.Connection;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/21.
 */
@DependsOn(value = "connectionManager,dataViewRepository")
public class DataViewCache extends MemCache<String,DataView> {
    @Resource
    ConnectionManager connectionManager;
    @Resource
    private DataViewRepository dataViewRepository;

    private String getDataSql;


    public DataViewCache(String getData){
        this.getDataSql = getData;
    }

    public String getSelectedCommand(String dataviewName){
        DataView model = getCache(dataviewName);

        if(model!= null)
            return model.getSelectCommand();
        else {
            refleshCache();
            return getCache(dataviewName).getSelectCommand();
        }
    }
    @Override
    public void refleshCache() {
        Connection connection = connectionManager.getConnection(0);
        List<DataView> dataViewList = dataViewRepository.getDataView(connection,getDataSql);
        for(int i = 0;i<dataViewList.size();i++){
            DataView dataView = dataViewList.get(i);
            putCache(dataView.getDataviewName(),dataView,FOREVER_CACHE);
        }
    }
}
