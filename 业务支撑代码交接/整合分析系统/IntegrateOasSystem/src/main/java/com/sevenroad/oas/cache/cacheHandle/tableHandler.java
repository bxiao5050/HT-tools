package com.sevenroad.oas.cache.cacheHandle;

import com.sevenroad.oas.cache.Imp.TableResultCache;
import com.sevenroad.oas.cache.model.HandlerContext;
import com.sevenroad.oas.cache.model.TableResultModel;
import com.sevenroad.oas.dao.imp.SqlProxyImp;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.TableResult;
import com.xiaoleilu.hutool.date.DateUtil;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/14.
 *转换
 */
public class tableHandler implements IHandler {


    private SqlProxyImp proxyImp;


    public tableHandler(SqlProxyImp proxyImp){
        this.proxyImp = proxyImp;
    }

    @Override
    public Boolean execute(HandlerContext ctx) {
        ExcuteModel excuteModel = ctx.getModel();
        TableResultModel model = new TableResultModel();
        List<TableResult> results = proxyImp.select(excuteModel);
        model.setKey(ctx.getKey());
        model.setCreateDate(DateUtil.formatDate(Calendar.getInstance().getTime()));
        model.setTables(results);
        ctx.setResult(model);
        return true;
    }
}
