package com.sevenroad.facebook.singleton;

import com.facebook.ads.sdk.APIContext;
import com.sevenroad.facebook.common.consts;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by linlin.zhang on 2017/7/20.
 */
public class FBConfig {
    private static ConcurrentHashMap<String,APIContext> contexts = new ConcurrentHashMap<>();
    public static APIContext getContext(String token){

        if(contexts.containsKey(token)){
            return contexts.get(token);
        }else {
            synchronized (contexts){
                if(contexts.containsKey(token)){
                    return contexts.get(token);
                }
                APIContext context = new APIContext(token);
//                context.enableDebug(true);
                contexts.put(token,context);
                return context;
            }
        }
    }
}
