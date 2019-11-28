package com.sevenroad.oas.cache.Imp;

import com.sevenroad.oas.cache.MemCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.tables.GameZoneInfo;
import com.sevenroad.oas.dao.repository.DataViewRepository;
import com.sevenroad.oas.dao.repository.GameRepository;

import javax.annotation.Resource;
import java.sql.Connection;
import java.util.*;

/**
 * Created by linlin.zhang on 2017/5/17.
 */
public class GameZoneCache extends MemCache<Integer,Map<String,Integer>> {
    @Resource
    ConnectionManager connectionManager;
    @Resource
    private GameRepository gameRepository;

    private String getDataSql;

    public GameZoneCache(String getData){
        this.getDataSql = getData;
    }

    public Map<String,Integer> getCache(int connectionId,int gameId) {
        if(!containKey(gameId)){
            List<DBParam> params = new ArrayList<>();
            params.add(new DBParam(DBParam.INT_PARAM,"gameId",String.valueOf(gameId)));
            putCache(gameId,gameRepository.getGameZoneInfo(connectionManager.getConnection(connectionId),getDataSql,params),FIVEMIN_CACHE);
        }
        return  super.getCache(gameId);
    }
}
