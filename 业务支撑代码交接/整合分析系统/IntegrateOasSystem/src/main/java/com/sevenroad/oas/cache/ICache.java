package com.sevenroad.oas.cache;


import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/18.
 */
public interface ICache<K,V> {
    //添加缓存

    /**
     * 添加缓存
     * @param key 缓存key
     * @param value 缓存值
     * @param CacheTime 缓存时间秒数
     */
    void putCache(K key,V value,long CacheTime);
    void removeCahce(K key);
    //是否包含缓存
    boolean containKey(K key);
    //获取缓存
    V getCache(K key);

    List<V> getAllCache();

    void clearCache();

    void refleshCache();
}
