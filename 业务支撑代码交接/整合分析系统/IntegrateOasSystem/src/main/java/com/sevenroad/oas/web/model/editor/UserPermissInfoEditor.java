package com.sevenroad.oas.web.model.editor;

import com.sevenroad.oas.dao.model.tables.UserPermissInfo;
import com.xiaoleilu.hutool.lang.Editor;

/**
 * Created by linlin.zhang on 2017/4/20.
 */
public class UserPermissInfoEditor implements Editor<UserPermissInfo> {
    private String key;
    public UserPermissInfoEditor(String key){
        this.key = key;
    }
    public UserPermissInfo edit(UserPermissInfo infos) {
        if(infos.getPremissKey().compareTo(key)==0){
            return infos;
        }
        return null;
    }
}
