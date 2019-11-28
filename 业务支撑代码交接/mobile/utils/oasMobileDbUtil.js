/**
 * Created by linlin.zhang on 2016/11/21.
 */
var mysql          = require("mysql");
var pg          = require('pg');
var mssql = require('mssql');
var when = require('when');

var executeMSSQL = function(Pool,sql,params){
    var defer = when.defer();
    var connection = new mssql.Connection(Pool, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var ps = new mssql.PreparedStatement(connection);
        ps.prepare(sql, function (err) {
            if (err){
                console.log(err);
                return;
            }
            ps.execute('', function (err, result) {
                if (err){
                    console.log(err);
                    return;
                }

                ps.unprepare(function (err) {
                    if (err){
                        console.log(err);
                        defer.resolve(err);
                    }
                    defer.resolve(result);
                });
            });
        });
    });
    return defer.promise;
}
var executePgSQL = function(Pool,sql,params){
    var defer = when.defer();
    //var obj ={
    //    rowCount:0,
    //    result:[]
    //}
    Pool.connect(function (err, client, done) {
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
                defer.resolve(result.rows);
            }
        });
    });
    return defer.promise;
}


function executeMySQL(Pool,sql,params){
    var defer = when.defer();
    Pool.getConnection(function (err, client) {
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
module.exports = {
    getPool:function(type,poolConfig){
        if(type == 3) {
            //mysql
            poolConfig.port = 3306;
            return  mysql.createPool(poolConfig);
        }else if(type == 1) {
            //mssql

            poolConfig.port = 1433;
            poolConfig.pool = {
                min: 0,
                max: 10,
                idleTimeoutMillis: 100000
            };
            poolConfig.server = poolConfig.host;
            return poolConfig;
        }else if(type == 2) {
            //pgsql
            poolConfig.port = 5432;
            return new pg.Pool(poolConfig);
        }
    },
    executeSQL:function(connection,sql,params){
        if(connection.type == 1){
            return executeMSSQL(connection.pool,sql,params);
        }else if(connection.type == 2){
            return executePgSQL(connection.pool,sql,params);
        }else if(connection.type == 3){
            return executeMySQL(connection.pool,sql,params);
        }
    }
};