/**
 * Created by xiaoyi on 2015/4/9.
 */
var when = require('when');
var postgreUtil = require('./postgreUtil');
var mssqlUtil = require('./mssqlUtil');

function execSQL(sql, parameters, dbPoolId) {
    var deferred = when.defer();
    // if (!dbPoolId) { // 默认为mssql数据库
    //     mssqlUtil.execSQL(sql, parameters)
    //         .then(function (data) {
    //             deffered.resolve(data);
    //         })
    //         .catch(function (err) {
    //             deffered.reject(err);
    //         });
    // } else
    if (dbPoolId === 'pg') { // postgre数据库

        if (sql.startsWith("SELECT * from sc_game_foreign_data_mobile.fn_oas_5min_")) {
            console.log(
                'fn_oas_5min_execSQL',
            )
        }
        postgreUtil.query(sql, parameters)
            .then(function (data) {
                deferred.resolve(data);
            })
            .catch(function (err) {
                deferred.reject(err);
            });
    } else if (dbPoolId === 'pgTest') { // postgre测试数据库
        postgreUtil.queryTest(sql, parameters)
            .then(function (data) {
                deferred.resolve(data);
            })
            .catch(function (err) {
                deferred.reject(err);
            });
    } else if (dbPoolId === 'pgLog') {
        postgreUtil.queryFromPgLog(sql, parameters)
            .then(function (data) {
                deferred.resolve(data);
            })
            .catch(function (err) {
                deferred.reject(err);
            });
    } else if (dbPoolId === 'sqlServer')
        mssqlUtil.execSQL(sql, parameters).then(function (data) {
            deferred.resolve(data);
        }).catch(function (err) {
            deferred.reject(err);
        });

    return deferred.promise;
}

var dbUtil = {
    execSQL: execSQL
}


module.exports = dbUtil;