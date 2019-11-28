package com.sevenroad.oas.cache.Imp;

import com.sevenroad.oas.cache.RedisCache;
import com.sevenroad.oas.cache.RedisProvider;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import javax.annotation.Resource;
import java.util.Map;

/**
 * Created by linlin.zhang on 2017/5/23.
 */
@Service
public class PermissTransactionCache extends RedisCache {
    public static String PERMISSTRANSACTION_H_QUERY = "h:permiss:transaction";

    public static final int MONTH_30_DAY_CACHE = 60*60*24*30;

    @Resource
    RedisProvider redisProvider;
    @Override
    protected String getKey() {
        return PERMISSTRANSACTION_H_QUERY;
    }

    public Map<String, String> getPermissList(String oaId) {
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            String redisKey = H_CACHE_PREFIX+ this.getKey()+":"+oaId;
            return jedis.hgetAll(redisKey);
        }finally {
            jedis.close();
        }
    }
    public void addPermiss(String oaId,String trancationId, String value) {
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            String redisKey = H_CACHE_PREFIX+ this.getKey()+":"+oaId;
            jedis.hset(redisKey,trancationId,value);
            jedis.expire(redisKey,MONTH_30_DAY_CACHE);
        }
        finally {
            jedis.close();
        }

    }

    @Override
    public void removeCahce(String key) {
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            String redisKey = H_CACHE_PREFIX+this.getKey()+":"+key;
            jedis.del(redisKey);
        }finally {
            jedis.close();
        }
    }

    public void removePermiss(String oaId, String trancationId){
        Jedis jedis = null;
        try {
            jedis = getJedisPool().getResource();
            String redisKey = H_CACHE_PREFIX+ this.getKey()+":"+oaId;
            jedis.hdel(redisKey,trancationId);
        }
        finally {
            jedis.close();
        }
    }
    @Override
    protected RedisProvider getJedisPool() {
        return redisProvider;
    }
}
