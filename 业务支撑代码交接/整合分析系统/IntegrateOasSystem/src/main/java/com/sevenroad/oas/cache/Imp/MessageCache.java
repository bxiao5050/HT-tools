package com.sevenroad.oas.cache.Imp;

import com.google.common.base.Strings;
import com.sevenroad.oas.cache.RedisCache;
import com.sevenroad.oas.cache.RedisProvider;
import com.sevenroad.oas.web.utils.Consts;
import org.springframework.context.annotation.DependsOn;
import redis.clients.jedis.Jedis;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/5/6 0006.
 */
@DependsOn(value = "redisProvider")
public class MessageCache extends RedisCache {
    public static String MESSAGE_K_QUEUE = "l:message:";
    @Resource
    RedisProvider redisProvider;
    @Override
    protected String getKey() {
        return MESSAGE_K_QUEUE;
    }

    @Override
    protected RedisProvider getJedisPool() {
        return redisProvider;
    }

    public void refleshCache() {
        this.clearCache();
    }


    @Override
    public void putCache(String key, String value, long CacheTime) {
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            String redisKey = getKey() + key;
            jedis.lpush(redisKey,value);
        }finally {
            jedis.close();
        }
    }

    public List<String> getMessage(String userName){
        List<String> result = new ArrayList<String>();
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            String redisKey = getKey() + userName;
            String value = jedis.lpop(redisKey);
            while (Strings.isNullOrEmpty(value) == false){
                result.add(value);
                value =  jedis.lpop(redisKey);
            };
        }finally {
            jedis.close();
        }
        return result;
    }

    @Override
    public String getCache(String key) {
        throw new NotImplementedException();
    }

    @Override
    public void removeCahce(String key) {
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            String redisKey = getKey() + key;
            jedis.del(redisKey);
        }finally {
            jedis.close();
        }
    }
}
