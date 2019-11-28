package com.sevenroad.oas.userPermiss;

import com.google.gson.Gson;
import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.sevenroad.oas.userPermiss.transaction.*;
import com.sevenroad.oas.web.utils.Consts;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/24.
 */
public class TransactionPermissProxy implements Comparable {

    private String transactionPermiss;

    private List<UserPermissInfo> permissInfoList;

    private int gameId;

    private String userName;

    private String createTime;

    private String descrption;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<UserPermissInfo> getPermissInfoList() {
        return permissInfoList;
    }

    public void setPermissInfoList(List<UserPermissInfo> permissInfoList) {
        this.permissInfoList = permissInfoList;
    }

    private String type;

    public void setTransactionPermiss(String transactionPermiss) {
        this.transactionPermiss = transactionPermiss;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getDescrption() {
        return descrption;
    }

    public void setDescrption(String descrption) {
        this.descrption = descrption;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public ExcuteModel execute(Gson gson, DataViewCache dataViewCache){
        TransactionPermiss permiss = null;
        switch (type)
        {
            case Consts.PermissKey.OAS_MENU:permiss = gson.fromJson(transactionPermiss,MenuPermissTransaction.class);break;
            case Consts.PermissKey.OAS_ZONE:permiss = gson.fromJson(transactionPermiss, GameZonePermissTransaction.class);break;
            case Consts.PermissKey.OAS_CHANNEL:permiss = gson.fromJson(transactionPermiss, ChannelPermissTransaction.class);break;
            case Consts.PermissKey.OAS_ACTOR:permiss = gson.fromJson(transactionPermiss, ActorPermissTransaction.class);break;
            case Consts.PermissKey.OAS_PAYCHANNEL:permiss = gson.fromJson(transactionPermiss, PayChannelPermissTransaction.class);break;
        }
        permiss.setPermissInfoList(permissInfoList);
        return permiss.Permiss(dataViewCache);
    }

    @Override
    public int compareTo(Object o) {
        TransactionPermissProxy other = (TransactionPermissProxy)o;
        return this.createTime.compareTo(other.createTime);
    }
}
