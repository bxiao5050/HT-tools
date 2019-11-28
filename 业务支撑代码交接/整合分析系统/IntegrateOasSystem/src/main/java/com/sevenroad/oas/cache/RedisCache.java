package com.sevenroad.oas.cache;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.util.*;

/**
 * Created by linlin.zhang on 2017/4/21.
 */
public abstract class RedisCache implements ICache<String,String> {
    protected String H_CACHE_PREFIX = "cache:";
    protected abstract String getKey();
    protected abstract RedisProvider getJedisPool();
    public String getCache(String key) {
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            String redisKey = H_CACHE_PREFIX + this.getKey()+key;
            return jedis.get(redisKey);
        }finally {
            jedis.close();
        }
    }

    /**
     *
     * @param key
     * @return
     */
    public boolean containKey(String key) {
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            String redisKey = H_CACHE_PREFIX + this.getKey()+key;
            return jedis.exists(redisKey);
        }finally {
            jedis.close();
        }
    }

    public void putCache(String key, String value, long CacheTime) {
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            String redisKey = H_CACHE_PREFIX+this.getKey()+key;
            jedis.set(redisKey,value);
            jedis.expire(redisKey,(int)CacheTime);
        }
        finally {
            jedis.close();
        }

    }

    public void removeCahce(String key) {
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            String redisKey = H_CACHE_PREFIX+this.getKey()+key;
            jedis.del(redisKey);
        }finally {
            jedis.close();
        }
    }

    public void clearCache() {
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            Iterator<String> keys = jedis.keys(H_CACHE_PREFIX + this.getKey()+"*").iterator();
            while(keys.hasNext()) {
                jedis.del(keys.next());
            }
        }finally {
            jedis.close();
        }
    }

    public List<String> getAllCache() {
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            Iterator<String> keys = jedis.keys( H_CACHE_PREFIX +this.getKey()).iterator();
            List<String> caches = new ArrayList<String>();
           while(keys.hasNext()){
               caches.add(jedis.get(keys.next()));
           }
            return caches;
        }finally {
            jedis.close();
        }
    }

    public void refleshCache() {
        throw new NotImplementedException();
    }
}
