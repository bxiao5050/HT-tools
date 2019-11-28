package com.sevenroad.oas.cache.model;

import com.xiaoleilu.hutool.http.HttpUtil;
import com.xiaoleilu.hutool.json.JSONObject;
import com.xiaoleilu.hutool.json.JSONUtil;
import com.xiaoleilu.hutool.util.StrUtil;

import java.util.*;

/**
 * Created by linlin.zhang on 2017/8/10.
 */
public class TranslateProxy {
    private String originString;
    private String translateUrl;

    public TranslateProxy(String originString,String translateUrl){
        this.originString = originString;
        this.translateUrl = translateUrl;
    }

    public Map<String,String> translate(){
        HashMap<String,Object> params = new HashMap<>();
        params.put("translateString",originString);
        String response = HttpUtil.post(translateUrl,params);
        HashMap<String,String> result = new HashMap<>();
        if(StrUtil.isNotEmpty(response)){
            JSONObject jObject = new JSONObject(response);
            Iterator<String> keys = jObject.keySet().iterator();

            while( keys.hasNext() ){
                String key = keys.next();
                String value = jObject.getStr(key);
                result.put(key, value);
            }
        }
        return result;
    }
}
