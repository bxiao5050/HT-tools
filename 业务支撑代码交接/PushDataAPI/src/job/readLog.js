/**
 * Created by xiaoyi on 2016/8/9.
 */
var readline = require('linebyline');
//var fs = require('fs');
var fs = require('fs-extra');
var path = require('path');

var afpushService = require('../services/afpush.service');
var logger = require('../../lib/logger.lib');

exports.readFile = function (filepath, callback) {
    logger.system().info('开始读取文件：' + filepath);
    var rl = readline(filepath);
    var data = [], count = 0;

    rl.on('line', function (line, lineCount, byteCount) {
        count = lineCount;
        data.push(line.substring(40));
    })
        .on('error', function (e) {
            if (e.code === 'ENOENT' && e.errno === -4058) {
                return logger.system().info('no such file or directory, open ' + filepath);
            }
            logger.system().error(e);
            callback(e);
        })
        .on('end', function () {
            logger.system().info('读取文件成功：' + filepath + ' ,准备插入数据，共' + count + '条。');
            afpushService.insert(data, function (error) {
                if (!error) {
                    logger.system().info('读取文件成功：' + filepath + ' ,数据插入成功');
                    if(filepath.indexOf('errors') > -1){
                        fs.unlink(filepath);
                    }
                    return callback();
                }
                logger.system().info('读取文件失败：' + filepath);
                logger.database().error(error);
                fs.move(filepath, path.join('../../logs/errors/data/' + filepath), function (err) {
                    if (err) {
                        logger.system().error(filepath + ' ,文件copy到logs/errors/data目录失败!!!!');
                        logger.system().error(err);
                        return callback(err);
                    }
                    logger.system().info(filepath + ' ,文件已经copy到logs/errors/data目录，等待下次重写读取');
                    callback(error);
                });
            })
        });

}
