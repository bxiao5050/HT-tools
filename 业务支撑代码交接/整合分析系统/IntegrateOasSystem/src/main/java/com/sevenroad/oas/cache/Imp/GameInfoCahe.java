package com.sevenroad.oas.cache.Imp;

import com.baomidou.mybatisplus.mapper.Condition;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.sevenroad.oas.cache.MemCache;
import com.sevenroad.oas.dao.entity.Game;
import com.sevenroad.oas.dao.mapper.GameMapper;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/26.
 */
@Service
public class GameInfoCahe extends MemCache<Integer,Game> {
    @Resource
    GameMapper gameMapper;
    Wrapper condition = new Condition().eq("state",1);

    @PostConstruct
    @Override
    public void refleshCache() {
        List<Game> result = gameMapper.selectList(condition);
        for(int i = 0;i<result.size();i++){
            putCache(result.get(i).getGameId(),result.get(i),FOREVER_CACHE);
        }
    }
}
