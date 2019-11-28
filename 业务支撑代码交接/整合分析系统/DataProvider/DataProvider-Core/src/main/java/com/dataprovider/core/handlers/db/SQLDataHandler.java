package com.dataprovider.core.handlers.db;

import com.dataprovider.core.helpers.FutureExecutor;
import com.dataprovider.core.interfaces.DataHandler;
import com.dataprovider.core.model.Concurency;
import com.dataprovider.core.model.InputModel;
import com.dataprovider.core.model.OutputModel;
import com.dataprovider.core.utils;
import com.dataprovider.dao.CustomDBQuery;
import com.dataprovider.dao.DaoFactory;
import com.dataprovider.dao.entitys.Cache;
import com.dataprovider.dao.mappers.CacheMapper;
import com.dataprovider.dao.models.Table;
import com.google.common.base.Strings;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;
import com.xiaoleilu.hutool.crypto.SecureUtil;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.util.StrUtil;
import org.apache.ibatis.session.SqlSession;

import java.sql.Timestamp;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * Created by linlin.zhang on 2017/7/30.
 */
@com.dataprovider.core.annotations.DataHandler(index = 1,description = "sql查询数据处理")
public class SQLDataHandler implements DataHandler {

    public OutputModel handler(InputModel model) {
        OutputModel out = (OutputModel) model;
        try {
            if(!Strings.isNullOrEmpty(out.getExecuteResult())){
                String result = FutureExecutor.updateCache(out.getCacheId(), model).get(2,TimeUnit.SECONDS);
                if(!Strings.isNullOrEmpty(result)) {
                    out.setExecuteResult(result);
                }
            }else{
                out.setExecuteResult(FutureExecutor.updateCache(out.getCacheId(), model).get());
            }
        }catch (Exception e){
            return out;
        }
        return out;

    }
}
