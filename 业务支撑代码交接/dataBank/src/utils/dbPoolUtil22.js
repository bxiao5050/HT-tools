/**
 * Created by xiaoyi on 2015/4/9.
 */

var baseConfig      = require('../config/baseConfig');
var ConnectionPool  = require('tedious-connection-pool');
var dbPool          = new ConnectionPool(baseConfig.db.poolConfig, baseConfig.db.connectionConfig);
var when            = require('when');
var Request         = require('tedious').Request;

function execSQL(sql){
    var deffered = when.defer();
    var data = {
        result:[],
        rowCount:0
    };
    dbPool.acquire(function (err, connection) {
        if (err){
            deffered.reject(err);
        }
        var request = new Request(sql, function(err, rowCount) {
            connection.release();
            if(err){
                deffered.reject('error sql:' +sql + ', error:' + err);
            }
            data.rowCount = rowCount;
            deffered.resolve(data);
        });

        request.on('row', function(columns) {
            var record = {};
            columns.forEach(function(column){
                var value = column.value;
                record[column.metadata.colName] = value;
            });
            data.result.push(record);
        });
        connection.execSql(request);

    });
    dbPool.on('error', function(err) {
        deffered.reject(' error:' + err);
    });
    return deffered.promise;
}

var dbUtil = {
    dbPool              : dbPool,
    execSQL             : execSQL
}


module.exports = dbUtil;