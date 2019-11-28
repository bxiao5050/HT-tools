package com.dataprovider.dao.entitys;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import java.sql.Timestamp;

/**
 * Created by linlin.zhang on 2017/8/1.
 */
@TableName("t_e_foreign_cache")
public class ForeignCache {
    /**
     * 连接id
     */
    @TableField(value = "connection_id")
    int connectionId;

    /**
     * 缓存id,是否是同一个查询
     */
    @TableId(value = "cache_id")
    String cacheId;
    /**
     * 查询是否改变
     */
    @TableField(value = "change_id")
    String changeId;
    /**
     * 执行命令
     */
    @TableField(value = "command")
    String command;
    /**
     * 执行结果
     */
    @TableField(value = "execute_result")
    String executeResult;

    /**
     * 最后更新时间
     */
    @TableField(value = "update_time")
    Timestamp updateTime;

    /**
     * 更新次数
     */
    @TableField(value = "update_count")
    int updateCount;


    public int getConnectionId() {
        return connectionId;
    }

    public void setConnectionId(int connectionId) {
        this.connectionId = connectionId;
    }

    public String getCacheId() {
        return cacheId;
    }

    public void setCacheId(String cacheId) {
        this.cacheId = cacheId;
    }

    public String getChangeId() {
        return changeId;
    }

    public void setChangeId(String changeId) {
        this.changeId = changeId;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        command = command;
    }

    public String getExecuteResult() {
        return executeResult;
    }

    public void setExecuteResult(String executeResult) {
        this.executeResult = executeResult;
    }

    public Timestamp getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    public int getUpdateCount() {
        return updateCount;
    }

    public void setUpdateCount(int updateCount) {
        this.updateCount = updateCount;
    }
}
