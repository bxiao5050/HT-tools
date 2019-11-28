package com.sevenroad.oas.cache.Imp;

import com.sevenroad.oas.cache.MemCache;
import com.sevenroad.oas.dao.ConnectionManager;
import com.sevenroad.oas.dao.model.tables.MenuMapDataView;
import com.sevenroad.oas.dao.repository.GameRepository;
import org.springframework.context.annotation.DependsOn;

import javax.annotation.Resource;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/24.
 */
@DependsOn(value = "connectionManager,gameRepository")
public class MenuMapDataViewCache extends MemCache<Integer,List<MenuMapDataView>> {
    @Resource
    ConnectionManager connectionManager;
    @Resource
    GameRepository gameRepository;

    private String getDataSql;

    public MenuMapDataViewCache(String getDataSql){
        this.getDataSql = getDataSql;
    }

    public List<Integer> getMenuId(int game_id,String dataview){
        List<Integer> menus = new ArrayList<Integer>();
        List<MenuMapDataView> result = getCache(game_id);
        for(int i = 0;i<result.size();i++){
            if(result.get(i).getDataViewName().equals(dataview))
                menus.add(result.get(i).getMenuId());
        }
        return menus;
    }

    @Override
    public void refleshCache() {
        Connection connection = connectionManager.getConnection(0);
        List<MenuMapDataView> menuMapDataView = gameRepository.getMenuMapDataView(connection,getDataSql);
        for(int i = 0;i<menuMapDataView.size();i++){
            MenuMapDataView dataView = menuMapDataView.get(i);
            List<MenuMapDataView> menuList = getCache(dataView.getGameId());
            if(menuList == null) {
                menuList = new ArrayList<MenuMapDataView>();
                menuList.add(dataView);
            }else {
                menuList.add(dataView);
            }
            putCache(dataView.getGameId(),menuList,FOREVER_CACHE);
        }
    }
}
