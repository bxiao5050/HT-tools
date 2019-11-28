var log4js = require('log4js');
var config = require('../config/log4js.config');

/**
 * 载入配置
 */
log4js.configure(config);

/**
 * 导出日志接口
 */
module.exports = {
  access: function () {
    return log4js.connectLogger(log4js.getLogger('access'), { level: 'auto', format: ':method  :hostname  :url  :protocol  :response-time' });
  },
  system: function () {
    return log4js.getLogger('system');
  },
  database: function () {
    return log4js.getLogger('database');
  },
  data: function () {
    return log4js.getLogger('data');
  },
  schedule: function () {
    return log4js.getLogger('schedule');
  },
  rerunSchedule: function () {
    return log4js.getLogger('rerunSchedule');
  }
};