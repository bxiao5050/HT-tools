/**
 * Created by xiaoyi on 2015/4/9.
 */
"use strict";
var log4js = require('log4js');
log4js.loadAppender('file');
//信息
log4js.addAppender(log4js.appenders.file(APP_PATH + '/logs/info.log'), 'info');
//警告
log4js.addAppender(log4js.appenders.file(APP_PATH + '/logs/warn.log'), 'warn');
//错误
log4js.addAppender(log4js.appenders.file(APP_PATH + '/logs/error.log'), 'error');
//致命错误
log4js.addAppender(log4js.appenders.file(APP_PATH + '/logs/fatal.log'), 'fatal');

var infoLogger = log4js.getLogger('info');
infoLogger.setLevel('info');

var errorLogger = log4js.getLogger('error');
errorLogger.setLevel('error');

var warnLogger = log4js.getLogger('warn');
warnLogger.setLevel('warn');

var log = {
    info: function (msg) {
        infoLogger.info(msg);
    },
    error: function (error) {
        errorLogger.error(error);
    },
    warn: function (msg) {
        warnLogger.warn(msg);
    },
    use: function (app) {
        app.use(log4js.connectLogger(infoLogger, {
            level: 'info',
            format: ':method  :remote-addr  :url  :protocol  :response-time'
        }));
    }
}

module.exports = log;