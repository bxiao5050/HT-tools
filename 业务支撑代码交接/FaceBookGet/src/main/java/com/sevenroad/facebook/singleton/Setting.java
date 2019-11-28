package com.sevenroad.facebook.singleton;

/**
 * Created by linlin.zhang on 2017/7/19.
 */
public class Setting {
    static com.xiaoleilu.hutool.setting.Setting set;
    public static String getSet(String key){
        if(set == null){
            set = new com.xiaoleilu.hutool.setting.Setting("dataSource.properties");
        }
        return set.getStr(key);
    }
}
