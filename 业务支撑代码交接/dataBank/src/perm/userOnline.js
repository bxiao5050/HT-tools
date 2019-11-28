/**
 * Created by linlin.zhang on 2016/10/10.
 */
var redisUtil = require('../utils/redisUtil');
var when = require('when');
var arrayUtil =  require('./ArrayUtil');
var userOnline = {
    onlineUsers:[],
    getUser:function(userName,sessionId){
        var defed = when.defer();
        var userInfo = null;
        sessionId ="session"+sessionId;
        console.log(this.onlineUsers);
        for(var i = 0;i<this.onlineUsers.length;i++){
            if(this.onlineUsers[i].userName == userName){
                userInfo = this.onlineUsers[i];
                console.log(userInfo.sessionId);
                console.log(sessionId);
                redisUtil.getRedisKey(2,userInfo.sessionId).then(function(perm){
                    redisUtil.delRedisKey(2,userInfo.sessionId).then(function(){
                        redisUtil.delRedisKey(0,userInfo.sessionId).then(function(){
                            userInfo.sessionId = sessionId;
                            defed.resolve(perm);
                        });
                    })
                });
            }
        }
        if(userInfo == null)  defed.resolve(null);
        return defed.promise;
    },
    getOnlineCount:function(){
        return this.onlineUsers.length;
    },
    addOnlineUser:function(userName,sessionId){
        for(var i = 0;i<this.onlineUsers.length;i++){
            if(this.onlineUsers[i].userName == userName){
                this.onlineUsers[i].sessionId = "session"+sessionId;
                return true;
            }
        }
        this.onlineUsers.push({
            userName:userName,
            sessionId:"session"+sessionId
        });
        return true;
    },
    offlineUser:function(userName,sessionId){
        var defed = when.defer();
        for(var i = 0;i<this.onlineUsers.length;i++){
            if(this.onlineUsers[i].userName == userName){
                this.onlineUsers.splice(i,1);
                redisUtil.delRedisKey(0,sessionId).then(function(data){
                    defed.resolve(data);
                });
            }
        }
        return defed.promise;
    }
};
var initalUserOnline = function(){
    redisUtil.scanRedis(2,'session').then(function(keys){
        keys.forEach(function(sessionId){
            redisUtil.getRedisKey(2,sessionId).then(function(perm){
                var permObj = JSON.parse(perm);
                if(permObj.user) {
                    userOnline.onlineUsers.push({
                        userName: permObj.user.userName,
                        sessionId: sessionId
                    });
                }
            });
        });
        var users = keys;
        redisUtil.scanRedis(0,'').then(function(keys){
            console.log(users);
            console.log(keys);
            keys.forEach(function(key){
               if(!arrayUtil.contain(users,'session'+key)){
                   redisUtil.delRedisKey(0,key);
               }
            });
        });
    });

}
initalUserOnline();
module.exports = {
    userOnline:userOnline,
    initalUserOnline:initalUserOnline
};