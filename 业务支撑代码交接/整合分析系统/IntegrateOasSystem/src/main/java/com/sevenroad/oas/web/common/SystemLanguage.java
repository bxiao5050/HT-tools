package com.sevenroad.oas.web.common;

import com.xiaoleilu.hutool.setting.Setting;
import com.xiaoleilu.hutool.system.SystemUtil;

import java.nio.charset.Charset;

/**
 * Created by linlin.zhang on 2017/4/19.
 */
public class SystemLanguage {
    private Setting setting;
    public SystemLanguage(String setPath){
        setting = new Setting(setPath, Charset.forName("utf-8"),true);
    }
    public String getProperty(String language,String propertyName){
        return setting.getByGroup(propertyName,language);
    }
}
