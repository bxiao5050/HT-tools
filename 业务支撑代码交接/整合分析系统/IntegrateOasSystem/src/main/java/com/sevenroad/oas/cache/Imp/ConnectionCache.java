package com.sevenroad.oas.cache.Imp;

import com.sevenroad.oas.cache.MemCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.model.tables.GameConnecitonMap;
import com.sevenroad.oas.dao.repository.GameRepository;
import org.springframework.context.annotation.DependsOn;

import javax.annotation.Resource;
import java.sql.Connection;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/21.
 */
@DependsOn(value = "connectionManager,gameRepository")
public class ConnectionCache extends MemCache<Integer,GameConnecitonMap> {
    @Resource
    ConnectionManager connectionManager;
    @Resource
    GameRepository gameRepository;

    private String getDataSql;

    public GameConnecitonMap getGameConnectionId(int gameId){
        return getCache(gameId);
    }



    public ConnectionCache(String getData){
        this.getDataSql = getData;
    }

    @Override
    public void refleshCache() {
        Connection connection = connectionManager.getConnection(0);
        List<GameConnecitonMap> gameInfo = gameRepository.getGameInfo(connection,getDataSql);
        for(int i = 0;i<gameInfo.size();i++){
            GameConnecitonMap gameConnecitonMap = gameInfo.get(i);
            this.putCache(gameConnecitonMap.getGameId(),gameConnecitonMap,FOREVER_CACHE);
        }
    }
}
