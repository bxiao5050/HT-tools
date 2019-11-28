/**
 * Created by jishan.fan on 2016/7/8.
 */
"use strict";
var oasRoute = require('./oasRoute');
var adRoadRoute = require('./adRoadRoute');
var adRoute = require('./adRoute');
var foreignOasRoute = require('./foreignOasRoute');
var userAPI = require('../api/userAPI');
var foreignOas = require('../api/foreignOasAPI');
// var menuCheck = require('../common/menuPowerCheck')
var route = function (app) {
	app.get('/user/login', userAPI.login);
	app.get('/user/logout', userAPI.loginOut);
	app.get('/user/system/clearCache', foreignOas.clearCache);
	app.get('/user/system/game/perm', userAPI.getUserPerm); // userAPI.getUserPerm
	app.get('/user/system/perm', userAPI.getUserSystemPerm);
	app.get('/user/online/count', userAPI.getOnlineCount);
	app.get('/user/online/isAlive', userAPI.isAlive)
	// app.all(/api/,menuCheck.checkedMenuPower);
	oasRoute(app);
	adRoadRoute(app);
	adRoute(app);
	foreignOasRoute(app);
	// app.get('*', function (req, res) {
	// 	res.end(404);
	// });
};
module.exports = route;