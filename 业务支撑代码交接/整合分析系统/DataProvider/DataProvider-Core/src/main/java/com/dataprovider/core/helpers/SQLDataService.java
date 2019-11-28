package com.dataprovider.core.helpers;

import com.dataprovider.core.Consts;
import com.dataprovider.core.model.InputModel;
import com.dataprovider.core.model.OutputModel;
import com.dataprovider.core.utils;
import com.dataprovider.dao.CustomDBQuery;
import com.dataprovider.dao.DaoFactory;
import com.dataprovider.dao.entitys.Cache;
import com.dataprovider.dao.mappers.CacheMapper;
import com.dataprovider.dao.models.IntergrateTable;
import com.dataprovider.dao.models.Table;
import com.xiaoleilu.hutool.crypto.SecureUtil;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.json.JSONUtil;
import org.apache.ibatis.session.SqlSession;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/9/11.
 */
public class SQLDataService {
    public static String GetResult(InputModel inputModel,String cacheId){
        SqlSession session = DaoFactory.getInstance(0);
        SqlSession source = DaoFactory.getInstance(inputModel.getConnectionId());
        try {
            CacheMapper mapper = session.getMapper(CacheMapper.class);
            CustomDBQuery query = new CustomDBQuery(source);
            String jsonResult = GetResultString(inputModel,query);
            Cache cache = mapper.selectById(cacheId);
            if(cache == null) {
                cache = new Cache();
                cache.setCacheId(cacheId);
                cache.setExecuteResult(jsonResult);
                cache.setUpdateCount(1);
                cache.setCacheType(inputModel.getType());
                cache.setCommand(inputModel.getExecuteCommand());
                cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                cache.setChangeId(SecureUtil.md5(jsonResult));
                cache.setConnectionId(inputModel.getConnectionId());
                mapper.insert(cache);
            }else {
                cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                cache.setUpdateCount(cache.getUpdateCount()+1);
                String changeId = SecureUtil.md5(jsonResult);
                if(changeId.equals(cache.getChangeId()) == false){
                    cache.setChangeId(changeId);
                    cache.setUpdateTime(new Timestamp(DateUtil.date().getTime()));
                    cache.setExecuteResult(jsonResult);
                }
                mapper.updateById(cache);
            }
            return jsonResult;
        }
        finally {
            session.close();
            source.close();
        }

    }

    public static String GetResultString(InputModel inputModel,CustomDBQuery query){
         if(inputModel.getType().equals(Consts.INTERGRATE_CACHE)){
            List<IntergrateTable> result = query.GetIntergrateResult(inputModel.getExecuteCommand());
            return JSONUtil.toJsonStr(result);
        }else {
            List<Table> result = query.GetQueryResult(inputModel.getExecuteCommand());
            return utils.TableToJson(result);
        }
    }
}
