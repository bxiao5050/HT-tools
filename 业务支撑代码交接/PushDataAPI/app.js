var async = require('async');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./lib/logger.lib');
var port = require('./lib/port.lib.js')();
var database = require('./lib/database.lib');
var errors = require('./src/controllers/errors.controller').error;
var router = require('./src/router');

var app = express();

/**
 * 中间件
 */
app.use(logger.access());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * 转给 Roter 处理路由
 */
app.use(router);

/**
 * 错误处理程序
 */
app.use(errors);

/**
 * 设置端口
 */
app.set('port', port);

/**
 * 启动服务器
 */
async.waterfall([
    function(callback){
      database.connect(function(err){
        if(err){
          return callback(err);
        }
        callback();
      })
    }
], function(err){
  if (err) throw err;

  //创建 HTTP 服务器
  var server = http.createServer(app);

  //监听端口
  server.listen(port);

  server.on('listening', function () {
    var addr = server.address();

    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

    logger.system().info('正在监听 ' + bind);
  });
});



