package com.sevenroad.oas.dao.model.tables;

/**
 * @author shengqiang.wu
 * @date 2018/5/17/017 11:52
 * @desc
 */
public class ImportDataModel {

    private String uuid;

    private String data;

    private String add_time;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getAdd_time() {
        return add_time;
    }

    public void setAdd_time(String add_time) {
        this.add_time = add_time;
    }
}
