package com.dataprovider.core.helpers;

import com.dataprovider.core.model.BaiduTranslateResponse;
import com.dataprovider.dao.entitys.Language;
import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import com.google.gson.Gson;
import com.xiaoleilu.hutool.crypto.SecureUtil;
import com.xiaoleilu.hutool.http.HttpUtil;
import com.xiaoleilu.hutool.json.JSON;
import com.xiaoleilu.hutool.json.JSONObject;
import com.xiaoleilu.hutool.json.JSONUtil;
import com.xiaoleilu.hutool.system.SystemUtil;
import com.xiaoleilu.hutool.util.CharsetUtil;
import com.xiaoleilu.hutool.util.RandomUtil;
import com.xiaoleilu.hutool.util.StrUtil;

import java.net.URLEncoder;
import java.util.*;

/**
 * Created by linlin.zhang on 2017/8/9.
 */
public class TranslateService {
    private static String TranslateUrl = "http://api.fanyi.baidu.com/api/trans/vip/translate";
    private static String appId = "20170801000070018";
    private static String appSecert = "POH5rypmO5wI4jorPI_X";


    private static Joiner joiner = Joiner.on("\n").skipNulls();
    private static Splitter splitter = Splitter.on("\n");
    private static Gson gson = new Gson();


    public static List<Language> translateLanguage(List<String> list, String language){
        String data = joiner.join(list);
        long salt = System.currentTimeMillis();
        Map<String, Object> params = new HashMap<String,Object>();
        params.put("q", data);
        params.put("from","auto");
        params.put("to",language);
        params.put("appid",appId);
        params.put("salt",salt);
        //appid+q+salt+密钥 的MD5值
        params.put("sign", SecureUtil.md5(appId+data+salt+appSecert));
        String response = HttpUtil.post(TranslateUrl,params);
        List<Language> result = new ArrayList<Language>();
        if(StrUtil.isNotEmpty(response)) {
            BaiduTranslateResponse ok = gson.fromJson(response,BaiduTranslateResponse.class);
            for (int i = 0; i < ok.getTrans_result().size(); i++) {
                BaiduTranslateResponse.TransResult tr = ok.getTrans_result().get(i);
                List<String> slist = splitter.splitToList(tr.getSrc());
                List<String> dlist = splitter.splitToList(tr.getDst());
                for(int j = 0;j<slist.size();j++) {
                    Language item = new Language();
                    item.setLanguageKey(slist.get(j));
                    item.setLanguageId(SecureUtil.md5(slist.get(j)));
                    item.setLanguageValue(dlist.get(j).replaceAll("\"",""));
                    item.setLanguageType(ok.getTo());
                    result.add(item);
                }
            }
        }
        return result;
    }
}
