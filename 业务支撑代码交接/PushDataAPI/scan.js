/**
 * Created by xiaoyi on 2016/8/9.
 */
var schedule = require("node-schedule");
var fs = require('fs-extra');
var path = require('path');
var async = require('async');
var logger = require('./lib/logger.lib');
var database = require('./lib/database.lib');

var readFile = require('./src/job/readLog').readFile;

/**
 * 定时扫描没有入库成功的日志文件名，并扫描入库
 * @type {exports.RecurrenceRule}
 */

function scan(){
    fs.readdir(path.join('./logs/errors/data'), function(err, files){
        logger.rerunSchedule().info('扫描失败日志文件作业开始，共扫描到文件数：' + files.length);
        if(files && files.length > 0){
            async.eachLimit(files, 1, function(filename, callback){
                readFile(path.join('./logs/errors/data/',filename), callback);
            },function(err){
                if(err){
                    return logger.rerunSchedule().info('扫描失败文件入库有错误~');
                }
                logger.rerunSchedule().info('扫描失败文件入库成功');
            });
        }
    });
}
console.log('start-scan');

scan();


