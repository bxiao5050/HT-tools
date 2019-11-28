package com.sevenroad.oas.dao;

import com.sevenroad.oas.dao.model.EffectResult;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/18.
 */
public interface IDao<T>{
     List<T> select(DBModel model);
     List<EffectResult> execute(DBModel model);
}
