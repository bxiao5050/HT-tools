package com.sevenroad.oas.userPermiss.transaction;

import com.baomidou.mybatisplus.mapper.Condition;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.dao.DBModel;
import com.sevenroad.oas.dao.entity.User;
import com.sevenroad.oas.dao.entity.UserActor;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.EffectResult;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.service.IUserActorService;
import com.sevenroad.oas.userPermiss.TransactionPermiss;
import com.sevenroad.oas.web.utils.Consts;
import com.xiaoleilu.hutool.util.StrUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/17.
 */
public class ActorPermissTransaction extends TransactionPermiss {

    private String actorId;

    private IUserActorService userActorService;

    public String getActorId() {
        return actorId;
    }

    public void setActorId(String actorId) {
        this.actorId = actorId;
    }

    public void setUserActorService(IUserActorService userActorService) {
        this.userActorService = userActorService;
    }

    @Override
    public ExcuteModel Permiss(DataViewCache dataViewCache) {
        DataView dataView = dataViewCache.getCache(Consts.DataViews.permissGetActor);
        List<DBParam> params = new ArrayList<>();
        params.add(new DBParam(DBParam.INT_PARAM,"user_id",String.valueOf(getUserId())));
        params.add(new DBParam(DBParam.INT_PARAM,"actors",String.valueOf(getActorId())));
        ExcuteModel model = new ExcuteModel(dataView,0,params);
        model.setExecuteType(DBModel.ADD_COMMAND);
        return model;
    }
}
