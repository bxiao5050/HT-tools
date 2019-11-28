/**
 * Created by xiaoyi on 2016/8/9.
 */
var schedule = require("node-schedule");
var moment = require('moment');
var fs = require('fs-extra');
var path = require('path');
var async = require('async');
var readFile = require('./src/job/readLog').readFile;
var logger = require('./lib/logger.lib');
var database = require('./lib/database.lib');
/**
 * 每小时的10分钟执行读取日志
 * @type {exports.RecurrenceRule}
 */

function init(){
    var filename = "data-" + moment().add(-1, 'hour').format('YYYY-MM-DD--HH') + '.log';
    var filepath = path.join('./logs/data/' + filename);
    fs.access(filepath, function(err){
        if(err){
            return logger.schedule().info('此次计划作业没有日志文件可以读取,' + filepath);;
        }
        readFile(filepath, function(err){
            if(!err){
                fs.rename(filepath, filepath + '.done',function(err){
                    if(err){
                        logger.schedule().error('文件读取成功，重命名失败，' + filepath);
                    }
                })
            }

            logger.schedule().info('此次计划作业结束');
        });
    })
}

async.waterfall([
    function(callback){
        database.connect(function(err){
            if(err){
                return callback(err);
            }
            callback();
        })
    }
], function(err) {
    if (err) throw err;
    logger.schedule().info('计划作业开始~');
    init();
    var rule = new schedule.RecurrenceRule();
    rule.minute = 05;
    var j = schedule.scheduleJob(rule, function(){
        init();
    });
});
