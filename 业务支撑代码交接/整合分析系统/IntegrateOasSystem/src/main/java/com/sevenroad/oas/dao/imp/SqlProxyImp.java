package com.sevenroad.oas.dao.imp;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sevenroad.oas.dao.DBModel;
import com.sevenroad.oas.dao.IDao;
import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.model.EffectResult;
import com.sevenroad.oas.dao.model.ExcuteProxy;
import com.sevenroad.oas.dao.model.TableResult;
import com.sevenroad.oas.userPermiss.model.ItemPermiss;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import com.xiaoleilu.hutool.http.HttpUtil;
import com.xiaoleilu.hutool.json.JSONUtil;
import com.xiaoleilu.hutool.util.CharsetUtil;
import org.apache.commons.collections.map.HashedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.util.*;

/**
 * Created by linlin.zhang on 2017/8/2.
 */
@Service
public class SqlProxyImp implements IDao<TableResult> {

    private Gson gson = new Gson();

    public List<EffectResult> execute(DBModel model){
        return null;
    }
    Logger logger = LoggerFactory.getLogger(SqlProxyImp.class);
    public List<TableResult> select(DBModel model) {
        String sql = Utils.sqlGenerate(model.getExecute(),model.getParams());
        ExcuteProxy proxy = (ExcuteProxy)model;
        try {
            Map<String, Object> params = new HashedMap();
            params.put("sql", sql);
            params.put("connectionId", proxy.getConnectionId());
            String result = HttpUtil.post(proxy.getDataProviderUrl() ,params);
            List<TableResult> tables = gson.fromJson(result, new TypeToken<List<TableResult>>() {
            }.getType());
            return tables;
        }
        catch (Exception e){
            logger.info("query error :{},stack:{}",e.getMessage(),ExceptionUtil.stacktraceToString(e));
        }
        finally {
            if(proxy.getConnection()!= null )
                try {
                    proxy.getConnection().close();
                }catch (Exception e){
                    logger.error("proxy query error :"+ ExceptionUtil.getMessage(e)+ExceptionUtil.stacktraceToString(e));
                }
        }
        return null;
    }
}
