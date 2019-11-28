/**
 * Created by xiaoyi on 2015/4/9.
 */

var postgreUtil = require('./postgreUtil');
var mssqlUtil   = require('./mssqlUtil');

var baseConfig      = require('../config/baseConfig');
var ConnectionPool  = require('tedious-connection-pool');
var dbPool          = new ConnectionPool(baseConfig.db.poolConfig, baseConfig.db.connectionConfig);
var when            = require('when');
var Request         = require('tedious').Request;
var TYPES           = require('tedious').TYPES;
function execSQL(sql, parameters){
    var deffered = when.defer();
    sql = sql.replace(/runningDbName/g,baseConfig.getRunningDb());

    parameters = parameters ? parameters :[];
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
        for(var i =0; i < parameters.length; i++){
            if(!TYPES[parameters[i].type]){
                console.dir('参数：'+parameters[i].name + '的Type类型不正确');
            }
            request.addParameter(parameters[i].name, TYPES[parameters[i].type], parameters[i].value);
        }
        request.on('row', function(columns) {
            var record = {};
            //console.log(columns);

            columns.forEach(function(column){
                var value = column.value;
                record[column.metadata.colName] = value;
            });
            data.result.push(record);
        });

        connection.execSql(request);
        //connection.callProcedure(request);
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