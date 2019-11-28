package com.sevenroad.oas.cache.Imp;

import com.baomidou.mybatisplus.mapper.Condition;
import com.sevenroad.oas.cache.MemCache;
import com.sevenroad.oas.dao.entity.ColumnLanguage;
import com.sevenroad.oas.dao.mapper.ColumnLanguageMapper;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/12.
 */
public class ColumnNameCache extends MemCache<String,String> {


    @Resource
    ColumnLanguageMapper columnLanguageMapper;

    @Override
    public void refleshCache() {
        List<ColumnLanguage> all = columnLanguageMapper.selectList(Condition.create());
        clearCache();
        for(int i = 0;i<all.size();i++){
            ColumnLanguage language = all.get(i);
            putCache(language.getLanguageType()+language.getColumnName(),language.getColumnValue(),FOREVER_CACHE);
        }
    }
}
