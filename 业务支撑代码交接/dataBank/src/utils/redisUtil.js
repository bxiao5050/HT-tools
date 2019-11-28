/**
 * Created by jishan.fan on 2016/7/19.
 */
var redis = require("redis");
var dbConfig = require('../config/dbConfig');
var redisPool = require("../model/redisConnectionPool")
var when = require('when');
//var node = hashingRing.select(id);
var redisClient = redis.createClient(dbConfig.menuPowerConfig);
//redisClient.auth('foobared', function (err) {
//    if (err) {
//        console.log("auth Error " + err);
//    }
//});
redisClient.on("error", function (err) {
    //console.log("Error " + err);
});
redisClient.on('connect', function () {
  //  console.log('Redis连接成功.');
})
redisClient.on('end', function () {
//    console.log('Redis关闭.');
})
var getRedis = function (key,callback) {
     redisClient.get(key, function (err,reply) {
   //      console.log('------redis reply--------');
 //        console.log(reply);//
         console.log('------redis reply end--------');
        if(err){
           console.err('get redis err:'+err);
        }
         callback(reply)
    });
};
var setRedis = function (key, val,callback) {
    redisClient.set(key, val, function (err,reply) {
        if (err){
//            console.log('set ' + key + 'error: ' + err);
        }
        callback(reply);
    });
};
var delRedis = function (key,callback) {
    redisClient.del(key, function (err,reply) {
        if (err){
            console.log('hdel error:' + err);
        }
        if(callback)
        callback(reply)
    });
};
var setHashMap = function(hmName,values,callback){
    redisClient.hmset(hmName,values,function(err, obj){
        if(err){
            console.log('HMSET error:' + err);
        }
        callback(obj);
    });
}
var getHashMap = function(hmName,callback){
    redisClient.hgetall(hmName,function(err, obj){
        if(err){
            console.log('HMSET error:' + err);
        }
        callback(obj);
    });
}
var getRedisKey = function(dbId,key){
    var def = when.defer();
    console.log(dbId);
    var connction = redisPool.getConncection(dbId);
    connction.locked();
    connction.connection.get(key, function (err,reply) {
        def.resolve(reply);
    });
    connction.unlocked();
    return def.promise;
}
var setRedisKey = function(dbId,key,value){
    var def = when.defer();
    var connction = redisPool.getConncection(dbId);
    connction.locked();
    connction.connection.set(key,value,function (err,reply) {
        connction.connection.expire(key, dbConfig.redisTestConfig.ttl);
        connction.unlocked();
        def.resolve(reply);
    });
    return def.promise;
}
var delRedisKey= function(dbId,key){
    var def = when.defer();
    var connction = redisPool.getConncection(dbId);
    connction.locked();
    connction.connection.del(key, function (err,reply){
        connction.unlocked();
        def.resolve(reply);
    });

    return def.promise;
}
var scanRedis = function(dbId,key){
    var connction = redisPool.getConncection(dbId);
    connction.locked();
    var cursor = '0';
    var deferred = when.defer();
    connction.connection.scan(cursor,'MATCH', key+'*',function(err,res){
        cursor = res[0];
        var keys = res[1];
        if (keys.length > 0) {
            connction.unlocked();
            deferred.resolve(keys);
        }
    })

    return deferred.promise;
}
var redisUtil = {
    //openClient :openClient,
    getRedis: getRedis,
    setRedis: setRedis,
    delRedis: delRedis,
    setHashMap:setHashMap,
    getHashMap:getHashMap,
    scanRedis:scanRedis,
    delRedisKey:delRedisKey,
    getRedisKey:getRedisKey,
    setRedisKey:setRedisKey
}


module.exports = redisUtil;