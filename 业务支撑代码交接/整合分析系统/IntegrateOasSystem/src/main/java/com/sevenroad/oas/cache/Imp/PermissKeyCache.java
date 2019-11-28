package com.sevenroad.oas.cache.Imp;

import com.sevenroad.oas.cache.MemCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.model.tables.PermissKeyInfo;
import com.sevenroad.oas.dao.repository.PermissRepository;
import org.springframework.context.annotation.DependsOn;

import javax.annotation.Resource;
import java.sql.Connection;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/25.
 */
@DependsOn(value = "connectionManager,permissRepository")
public class PermissKeyCache extends MemCache<String,PermissKeyInfo> {
    @Resource
    ConnectionManager connectionManager;
    @Resource
    PermissRepository permissRepository;

    String getDataSql;

    public PermissKeyCache(String getDataSql){
        this.getDataSql = getDataSql;
    }
    @Override
    public void refleshCache() {
        Connection connection = connectionManager.getConnection(0);
        List<PermissKeyInfo> permissKeyInfo = permissRepository.getPermissKeyInfo(connection,getDataSql);
        for(int i = 0;i<permissKeyInfo.size();i++){
            PermissKeyInfo item = permissKeyInfo.get(i);
            putCache(item.getPermissKey(),item,FOREVER_CACHE);
        }
    }
}
