package com.sevenroad.oas.userPermiss.transaction;

import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.dao.DBModel;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.sevenroad.oas.userPermiss.TransactionPermiss;
import com.sevenroad.oas.web.model.consumer.GetZoneItemPremissConsumer;
import com.sevenroad.oas.web.model.editor.UserPermissInfoEditor;
import com.sevenroad.oas.web.utils.Consts;
import com.xiaoleilu.hutool.util.CollectionUtil;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/7/27.
 */
public class PayChannelPermissTransaction extends TransactionPermiss {
    private String channelIds;

    public String getChannelIds() {
        return channelIds;
    }

    public void setChannelIds(String channelIds) {
        this.channelIds = channelIds;
    }

    @Override
    public ExcuteModel Permiss(DataViewCache dataViewCache) {
        Collection<UserPermissInfo> userPermissInfoCollection = CollectionUtil.filter(getPermissInfoList(), new UserPermissInfoEditor(Consts.PermissKey.OAS_PAYCHANNEL));
        if(userPermissInfoCollection.size() == 0) {
            UserPermissInfo newPermissInfo = new UserPermissInfo();
            userPermissInfoCollection.add(newPermissInfo);
        }
        Iterator<UserPermissInfo> nextPermissInfo = userPermissInfoCollection.iterator();

        GetZoneItemPremissConsumer consumer = new GetZoneItemPremissConsumer(new Gson(),getGameId(),channelIds);
        CollectionUtil.forEach(nextPermissInfo,consumer);

        //取菜单权限数据
        List<DBParam> params = new ArrayList<DBParam>();
        params.add(new DBParam(DBParam.INT_PARAM, "systemId", String.valueOf(getSystemId())));
        params.add(new DBParam(DBParam.INT_PARAM, "gameId", String.valueOf(getGameId())));
        params.add(new DBParam(DBParam.STRING_PARAM, "premissKey", Consts.PermissKey.OAS_PAYCHANNEL));
        params.add(new DBParam(DBParam.STRING_PARAM, "premissInfo", consumer.getPremissInfo()));
        params.add(new DBParam(DBParam.STRING_PARAM, "userName", getUserName()));
        ExcuteModel excuteModel = new ExcuteModel(dataViewCache.getCache(Consts.DataViews.permissGet88BoxPayChannels), getGameId(), params);
        excuteModel.setExecuteType(DBModel.ADD_COMMAND);
        return excuteModel;
    }
}