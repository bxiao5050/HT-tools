//定义全局变量:项目根目录
"use strict";
global.APP_PATH = __dirname;
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var Route = require('./src/route/route');
var env = require('./src/envConfig')();
var sessionUtil = require('./src/utils/sessionUtil');
var redisConfig = require('./src/config/dbConfig').redisTestConfig;
var permFactory = require('./src/perm/permFactory');
var schedule = require('node-schedule');
var app = express();
app.set('port', env == 'production' ? 4700 : 10001);
app.set('views', path.join(__dirname, 'views'));
/**
 * 设置模板解析
 * **/
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(session({
	// 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
	// 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
	// 编写自己的 store 也很简单
	// store: new redisStore(redisConfig),
	secret: 'somesecrettoken',
	resave: false,
	saveUninitialized: true
}));
permFactory.cachePermData();
var rule = new schedule.RecurrenceRule();
rule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
var j = schedule.scheduleJob(rule, function () {
	permFactory.cachePermData();
});
app.use('/api/*', sessionUtil.check());
app.use(express.static(path.join(__dirname, 'public')));
// API接口路由
Route(app);

var server = require('http').createServer(app)
var ip = '0.0.0.0';
if (app.get('env') === 'production') {
	console.log('正式环境');
}

server.listen(3002, ip, function () {
	console.log(ip + ', Express server listening on port ' + 3002);
});

// app.use(function (req, res, next) {
// 	var serverDomain = domain.create();
// 	// 监听domain的错误时间
// 	serverDomain.on('error', function (err) {
// 		res.statusCode = 500;
// 		log.error('服务器异常:' + err);
// 		res.json({ success: false, message: '服务器异常', err: err.message });
// 		serverDomain.dispose();
// 	});
// 	serverDomain.add(req);
// 	serverDomain.add(res);
// 	serverDomain.run(next);
// });
// process.on('uncaughtException', function (err) {
// 	console.error('uncaughtException:', err);
// });

global.app = app;
module.exports = app