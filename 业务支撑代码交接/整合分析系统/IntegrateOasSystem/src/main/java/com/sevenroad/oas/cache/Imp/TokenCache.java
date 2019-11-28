package com.sevenroad.oas.cache.Imp;

import com.sevenroad.oas.cache.MemCache;
import com.sevenroad.oas.cache.RedisCache;
import com.sevenroad.oas.cache.RedisProvider;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.tables.UserToken;
import com.sevenroad.oas.dao.repository.PermissRepository;
import org.springframework.context.annotation.DependsOn;

import javax.annotation.Resource;
import java.sql.Connection;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/28.
 */
@DependsOn(value = "connectionManager,permissRepository")
public class TokenCache extends MemCache<String,UserToken> {
    @Resource
    ConnectionManager connectionManager;
    @Resource
    PermissRepository permissRepository;

    String getDataSql;

    public TokenCache(String getDataSql){
        this.getDataSql = getDataSql;
    }
    @Override
    public void refleshCache() {
        Connection connection = connectionManager.getConnection(0);
        List<UserToken> tokenList = permissRepository.GetUserToken(connection,getDataSql);
        for(int i = 0;i<tokenList.size();i++){
            UserToken token = tokenList.get(i);
            putCache(token.getToken(),token,FOREVER_CACHE);
        }
    }

}
