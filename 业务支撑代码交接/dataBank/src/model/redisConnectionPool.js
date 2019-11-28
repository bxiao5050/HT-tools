/**
 * Created by linlin.zhang on 2016/9/9.
 */
var redis = require("redis");
var when = require('when');
var dbConfig = require('../config/dbConfig');
var connecitonPool = [];
var connctionBase  = function(){
    this.__proto__ = {
        _islocked:false,
        locked: function () {
            this._islocked = true;
        },
        getlockState:function(){
            return this._islocked;
        },
        unlocked:function () {
            this._islocked = false;
        }
    };
};
var getConncection = function(dbId){

    var selectdConnection = null;
    for(var i = 0;i<connecitonPool.length;i++){
       var conn = connecitonPool[i]
        if(conn.dbId == dbId && conn.getlockState() == false) {
            selectdConnection = conn;
            break;
        }
    }
    if(selectdConnection == null){
        selectdConnection = {};
        selectdConnection = new connctionBase();
        selectdConnection.dbId = dbId;
        var redisConnction = dbConfig.menuPowerConfig;
        redisConnction.db = dbId;
        selectdConnection.connection = redis.createClient(redisConnction);
        connecitonPool.push(selectdConnection);
    }

    return selectdConnection;
};
var releaseConnection = function(){
    var releaseArr = [];
    for(var i = 0;i<connecitonPool.length;i++){
        if(connecitonPool[i].getlockState() == false)
            releaseArr.push(i);
    }
    for(var i = 0;i<releaseArr.length;i++){
        connecitonPool.splice(releaseArr[i],1);
    }
}
module.exports = {
    getConncection:getConncection,
    releaseConnection:releaseConnection
};