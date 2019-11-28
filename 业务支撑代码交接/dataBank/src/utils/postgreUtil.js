/**
 * Created by xiaoyi on 2015/8/4.
 */
var when = require('when');
var pg = require('pg');
var poolConfig = require('../config/dbConfig');
var log = require('./logUtil');

/**
 * postgre https://github.com/brianc/node-postgres
 * @type {string}
 */

/**
 * @连接池方式
 */
var pool = new pg.Pool(poolConfig.pgConfig);
var testPool = new pg.Pool(poolConfig.pgTestConfig);
var PgLogPool = new pg.Pool(poolConfig.pgLogConfig);

function query(sql, params) {
    var deferred = when.defer();
    pool.connect(function (err, client, done) {

        if (sql.startsWith("SELECT * from sc_game_foreign_data_mobile.fn_oas_5min_")) {
            console.log(
                'clientclientclientclient',
                "err" + err
            )
        }

        if (err) {
            deferred.reject('数据库连接异常！' + err);
            return;
        }
        client.query(sql, params, function (err, result) {
            // call `done()` to release the client back to the pool

            if (sql.startsWith("SELECT * from sc_game_foreign_data_mobile.fn_oas_5min_")) {
                console.log(
                    'fn_oas_5min_',
                    err ? err : "err: false"
                )
            }

            done();

            if (err) {
                log.error(err);
                deferred.reject(err);
            } else {
                deferred.resolve({
                    rowCount: result.rows.length,
                    result: result.rows
                });
            }
        });
    });
    return deferred.promise;
}

function queryFromPgLog(sql, params) {
    var deferred = when.defer();
    PgLogPool.connect(function (err, client, done) {
        if (err) {
            deferred.reject('数据库连接异常！' + err);
            return;
        }
        client.query(sql, params, function (err, result) {
            //call `done()` to release the client back to the pool
            done();
            if (err) {
                log.error(err);
                deferred.reject(err);
            } else {
                //console.log(result);
                deferred.resolve({
                    rowCount: result.rows.length,
                    result: result.rows
                });
            }
        });
    });
    return deferred.promise;
}

function queryTest(sql, params) {
    var deferred = when.defer();
    testPool.connect(function (err, client, done) {
        if (err) {
            deferred.reject('数据库连接异常！' + err);
            return;
        }
        client.query(sql, params, function (err, result) {
            //call `done()` to release the client back to the pool
            done();
            if (err) {
                log.error(err);
                deferred.reject(err);
            } else {
                //console.log(result);
                deferred.resolve({
                    rowCount: result.rows.length,
                    result: result.rows
                });
            }
        });
    });
    return deferred.promise;
}

pool.on('err', function (err, client) {
    log.error('数据库连接异常:' + err);
});

testPool.on('err', function (err, client) {
    log.error('数据库连接异常:' + err);
});

var pgUtil = {
    query: query,
    queryTest: queryTest,
    queryFromPgLog: queryFromPgLog
}

module.exports = pgUtil;