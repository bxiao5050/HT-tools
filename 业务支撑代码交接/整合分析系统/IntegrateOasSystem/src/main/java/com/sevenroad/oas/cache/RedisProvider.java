package com.sevenroad.oas.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * Created by linlin.zhang on 2017/4/21.
 */
public class RedisProvider {
    private String ip;
    private String port;
    private String password;
    private JedisPool jedisPool;
    Logger log = LoggerFactory.getLogger(RedisProvider.class);
    public RedisProvider(String ip,int port,String password,int db){
        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxIdle(8);
        config.setMaxTotal(18);
        jedisPool = new JedisPool(config,ip,port,2000,password ==""?null:password,db);
    }

    public Jedis getResource(){
        try {
            return jedisPool.getResource();
        }
        catch (Exception e){
            log.error("get redis connection error:{}",e);
        }
        return null;
    }
}
