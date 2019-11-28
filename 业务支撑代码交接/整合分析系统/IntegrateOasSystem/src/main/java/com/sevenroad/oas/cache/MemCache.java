package com.sevenroad.oas.cache;

import com.xiaoleilu.hutool.cache.Cache;
import com.xiaoleilu.hutool.cache.CacheUtil;
import org.springframework.stereotype.Repository;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/21.
 */
/**
 * 缓存在内存中
 */
@Repository
public class MemCache <K,V> implements ICache<K,V> {
    public final int FIVEMIN_CACHE = 60*5;
    public final int FOREVER_CACHE = Integer.MAX_VALUE;

    protected Cache<K,V> memCache = CacheUtil.newTimedCache(FOREVER_CACHE);
    public boolean containKey(K key) {
       V item = memCache.get(key);
        if(item == null)
            return false;
        else return true;
    }

    public void removeCahce(K key) {
         memCache.remove(key);
    }

    public List<V> getAllCache() {
       Iterator<V> iterator = memCache.iterator();
        List<V> result = new ArrayList<V>();
       while(iterator.hasNext())
           result.add(iterator.next());
        return result;
    }

    public V getCache(K key) {
        V model = memCache.get(key);
        return memCache.get(key);
    }

    public void putCache(K key, V value, long CacheTime) {
        memCache.put(key,value,CacheTime);
    }

    public void clearCache() {
        memCache.clear();
    }

    public void refleshCache(){
        throw new NotImplementedException();
    }
}
