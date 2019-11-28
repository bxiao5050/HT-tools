package com.sevenroad.oas.web.services;

import com.sevenroad.oas.web.common.SystemConfig;
import com.xiaoleilu.hutool.http.HttpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
/**
 * Created by linlin.zhang on 2017/9/8.
 */
@Service
public class ProxyService {


    @Autowired
    SystemConfig systemConfig;
    public String httpPost(String url,Map<String,Object> params){
       String absUrl = systemConfig.getPermissProxy()+url;
       return  HttpUtil.post(absUrl,params);
    }
}
