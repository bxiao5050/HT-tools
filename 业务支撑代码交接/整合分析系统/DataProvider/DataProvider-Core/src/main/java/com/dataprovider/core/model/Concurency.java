package com.dataprovider.core.model;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Created by linlin.zhang on 2017/8/1.
 */
public class Concurency {
    private static ConcurrentMap<String,Object> cacheLocked = new ConcurrentHashMap<String,Object>();
    public static Object getWait(String cacheId){
        return cacheLocked.get(cacheId);
    }
    public static Object addWait(String cacheId){
        Object wait = new Object();
        cacheLocked.putIfAbsent(cacheId,wait);
        return  wait;
    }
    public static void releaseWait(String cacheId){
        cacheLocked.remove(cacheId);
    }
}
