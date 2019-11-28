package com.sevenroad.oas.dao.imp;

import com.sevenroad.oas.dao.DBModel;
import com.sevenroad.oas.dao.IDBInterceptor;
import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.model.TableResult;
import com.xiaoleilu.hutool.http.HttpUtil;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/26.
 */

public class SqlRateInterceptor implements IDBInterceptor {
    @Override
    public boolean afterExecute(List<TableResult> model) {
        return true;
    }


    @Override
    public boolean preExecute(DBModel model) {
        String sql = Utils.sqlGenerate(model.getExecute(),model.getParams());
        return true;
    }
}
