package com.sevenroad.oas.dao.model.tables;

/**
 * Created by linlin.zhang on 2017/4/25.
 */
public class UserPermissInfo {
    private String premissKey;
    private int premissExtraId;
    private String premissInfo;
    private String extraName;
    public String getPremissKey() {
        return premissKey;
    }

    public void setPremissKey(String premissKey) {
        this.premissKey = premissKey;
    }

    public int getPremissExtraId() {
        return premissExtraId;
    }

    public void setPremissExtraId(int premissExtraId) {
        this.premissExtraId = premissExtraId;
    }

    public String getPremissInfo() {
        return premissInfo;
    }

    public void setPremissInfo(String premissInfo) {
        this.premissInfo = premissInfo;
    }

    public String getExtraName() {
        return extraName;
    }

    public void setExtraName(String extraName) {
        this.extraName = extraName;
    }
}
