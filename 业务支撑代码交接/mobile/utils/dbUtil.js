/**
 * Created by jishan.fan on 2016/8/9.
 */
"use strict";
var when        = require('when');
var mysql          = require("mysql");
var pg          = require('pg');
var dbConfig = require('../config/dbConfig');
var pool = new pg.Pool(dbConfig.poolConfig);
var mySqlPool = mysql.createPool(dbConfig.mysqlPoolConfig);
function execSQL(sql,params){
    var defer = when.defer();
    //var obj ={
    //    rowCount:0,
    //    result:[]
    //}
    pool.connect(function (err, client, done) {
        //console.info("-------"+conString);
        if (err) {
            defer.reject('数据库连接异常！' + err);
            return;
        }
        client.query(sql, params, function (err, result) {
            //call `done()` to release the client back to the pool
            done();
            if(err){
                console.dir(err);
                defer.reject(err);
            }else{
                //console.log(result);
                defer.resolve({rowCount:result.rowCount, result:result.rows});
            }
        });
    });
    return defer.promise;
};
pool.on('err',function(err,client){
    console.error('idle client error', err.message, err.stack);
});
function execMySQL(sql,params){
    var defer = when.defer();
    //var obj ={
    //    rowCount:0,
    //    result:[]
    //}
    mySqlPool.getConnection(function (err, client) {
        //console.info("-------"+conString);
        if (err) {
            defer.reject('数据库连接异常！' + err);
            return;
        }
        client.query(sql, function (err, result) {
            //call `done()` to release the client back to the pool
            client.release();
            if(err){
                console.dir(err);
                defer.reject(err);
            }else{
                //console.log(result);
                defer.resolve(result);
            }
        });
    });
    return defer.promise;
};
mySqlPool.on('err',function(err,client){
    console.error('idle client error', err.message, err.stack);
});


var dbUtil ={
    execSQL : execSQL,
    execMySQL:execMySQL
}

module.exports = dbUtil;
