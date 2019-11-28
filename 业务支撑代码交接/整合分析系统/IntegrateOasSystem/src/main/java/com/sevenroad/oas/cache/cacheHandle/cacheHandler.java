package com.sevenroad.oas.cache.cacheHandle;

import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.cache.model.HandlerContext;
import com.sevenroad.oas.cache.model.TableResultModel;
import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.model.ExcuteModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by linlin.zhang on 2017/8/14.
 * 缓存
 */
public class cacheHandler implements IHandler {
    private Gson gson = new Gson();
    private TableResultCache cache;

    public cacheHandler(TableResultCache cache){
        this.cache = cache;
    }
    Logger logger = LoggerFactory.getLogger(cacheHandler.class);
    @Override
    public Boolean execute(HandlerContext ctx) {
        ExcuteModel excuteModel = ctx.getModel();
        String key = Utils.queryKeyGenerate(excuteModel.getDataView().getDataviewName(), excuteModel.getParams());
        if (cache.containKey(key)) {
            logger.info("get Query data from cache : connection - {} , key - {} params - {}", excuteModel.getConnectionId(), key, gson.toJson(excuteModel.getParams()));
            TableResultModel model = gson.fromJson(cache.getCache(key), TableResultModel.class);
            ctx.setResult(model);
            ctx.setKey(key);
            ctx.setCache(true);
            return false;
        }
        ctx.setKey(key);
        return true;
    }
}
