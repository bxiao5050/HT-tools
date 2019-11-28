package com.dataprovider.core.handlers.db;

import com.dataprovider.core.helpers.SQLDataService;
import com.dataprovider.core.interfaces.DataHandler;
import com.dataprovider.core.model.Concurency;
import com.dataprovider.core.model.InputModel;
import com.dataprovider.core.model.OutputModel;
import com.dataprovider.dao.DaoFactory;
import com.dataprovider.dao.entitys.Cache;
import com.dataprovider.dao.mappers.CacheMapper;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;
import com.xiaoleilu.hutool.crypto.SecureUtil;
import org.apache.ibatis.session.SqlSession;

import java.util.concurrent.Callable;
import java.util.concurrent.Executors;

/**
 * Created by linlin.zhang on 2017/7/29.
 */
@com.dataprovider.core.annotations.DataHandler(index = 0,description = "缓存处理")
public class CachedDataHandler implements DataHandler {
    public OutputModel handler(InputModel model) {
        SqlSession session = DaoFactory.getInstance(0);
        try {
            CacheMapper mapper = session.getMapper(CacheMapper.class);
            String cacheId = SecureUtil.md5(model.getType() + model.getExecuteCommand());
            Cache cache = mapper.selectById(cacheId);
            OutputModel out = new OutputModel();
            out.setCacheId(cacheId);
            out.setConnectionId(model.getConnectionId());
            out.setType(model.getType());
            out.setExecuteCommand(model.getExecuteCommand());
            out.setExecuteParams(model.getExecuteParams());
            if(cache != null)
                out.setExecuteResult(cache.getExecuteResult());
            return out;
        }
        catch (Exception e){
            System.out.println(e);
        }
        finally {
            session.commit();
            session.close();
        }
        return null;
    }
}
