package com.sevenroad.oas.web.common;

import com.xiaoleilu.hutool.setting.Setting;
import java.util.*;

import java.util.HashMap;

/**
 * Created by linlin.zhang on 2017/4/19.
 */
public class SystemConfig {
    private Setting setting;
    private final static String userPermissUrl = "userPermissUrl";
    private final static String userChangePwd = "userChangePwd";
    private final static String dataProviderUrl = "dataProvider";
    private final static String CHSTranslate = "CHSTranslate";
    private final static String ENTranslate = "ENTranslate";
    private final static String TraditionTranslate = "TraditionTranslate";
    private final static String Phantomjs = "phantomjs.path";
    private final static String MailHtml= "mail.html.path";
    private final static String PermissProxy = "PermissProxy";
    private final static String Webshot = "phantomjs.webshot.path";
    public SystemConfig(String setPath){
        setting = new Setting(setPath,true);
    }

    public String getProperty(String propertyName){
        return setting.getStr(propertyName);
    }

    public String getUserPermissUrl(){
        return setting.getStr(userPermissUrl);
    }

    private Map<String,String> translateMap = new HashMap<String,String>();

    public String getUserChangePwd() {
        return setting.getStr(userChangePwd);
    }

    public String getDataProviderUrl() {
        return setting.getStr(dataProviderUrl);
    }

    public String getPermissProxy(){
            return setting.getStr(PermissProxy);
    }

    public String getTranslateUrl(String language){
        if(translateMap.containsKey(language) == false)
        {
            if(language.equals("CHS"))
                translateMap.put(language,setting.getStr(CHSTranslate));
            else if(language.equals("EN")){
                translateMap.put(language,setting.getStr(ENTranslate));
            }else if(language.equals("Tradition")){
                translateMap.put(language,setting.getStr(TraditionTranslate));
            }
        }
        return translateMap.get(language);
    }

    public String getPhantomjs(){
        return setting.getStr(Phantomjs);
    }

    public String getMailHtml(){
        return setting.getStr(MailHtml);
    }

    public String getWebshot() {
        return setting.getStr(Webshot);
    }
}
