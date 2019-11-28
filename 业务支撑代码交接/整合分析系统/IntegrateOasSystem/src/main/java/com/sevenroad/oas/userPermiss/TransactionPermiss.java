package com.sevenroad.oas.userPermiss;

import com.sevenroad.oas.cache.Imp.DataViewCache;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.tables.UserPermissInfo;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/23.
 */

/**
 * 权限事务类
 */
public abstract class TransactionPermiss {
    private String transactionId;
    private String oaId;
    private String userName;
    private int gameId;
    private int systemId;
    private String createTime;
    private int userId;

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getOaId() {
        return oaId;
    }

    public void setOaId(String oaId) {
        this.oaId = oaId;
    }

    private List<UserPermissInfo> permissInfoList;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getSystemId() {
        return systemId;
    }

    public void setSystemId(int systemId) {
        this.systemId = systemId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public List<UserPermissInfo> getPermissInfoList() {
        return permissInfoList;
    }

    public void setPermissInfoList(List<UserPermissInfo> permissInfoList) {
        this.permissInfoList = permissInfoList;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public abstract ExcuteModel Permiss(DataViewCache dataViewCache);
}
