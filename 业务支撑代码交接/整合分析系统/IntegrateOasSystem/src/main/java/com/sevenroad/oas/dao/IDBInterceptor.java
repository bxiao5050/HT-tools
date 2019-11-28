package com.sevenroad.oas.dao;

/**
 * Created by linlin.zhang on 2017/4/21.
 */

import com.sevenroad.oas.dao.model.TableResult;

import java.util.List;

/**
 * 数据操作拦截器
 */
public interface IDBInterceptor {
    public boolean preExecute(DBModel model);
    public boolean afterExecute(List<TableResult> model);
}
