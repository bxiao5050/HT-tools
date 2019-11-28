package com.sevenroad.oas.cache.Imp;

import com.baomidou.mybatisplus.mapper.Condition;
import com.sevenroad.oas.cache.MemCache;
import com.sevenroad.oas.dao.entity.TranslateColumn;
import com.sevenroad.oas.dao.mapper.TranslateColumnMapper;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/10.
 */
public class TranslateColumnCache extends MemCache<String,String> {
    @Resource
    TranslateColumnMapper translateColumnMapper;

    @Override
    public void refleshCache() {
        List<TranslateColumn> all = translateColumnMapper.selectList(Condition.create());
        clearCache();
        for(int i = 0;i<all.size();i++){
            TranslateColumn language = all.get(i);
            putCache(language.getColumnName(),"",FOREVER_CACHE);
        }
    }
}
