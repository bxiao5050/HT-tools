/**
 * Created by jishan.fan on 2016/8/11.
 */
"use strict";
var when = require('when');
var log = require('../utils/logUtil');
var http = require('http');
var env = require('../envConfig')();
var resDataUtil = require('../utils/resDataUtil');
var cryptUtil = require('../utils/cryptUtil');
var userNameFilterConfig = require('../config/userNameFilterConfig');
var dbUtil = require('../utils/dbPoolUtil');
var permFactory = require('../perm/permFactory');
var redisUtil = require('../utils/redisUtil');
var onlineFactory = require('../perm/userOnline');
var cacheUtil = require('../utils/cacheUtil');

var login = function (req, res) {
	var user = {};
	user.userName = req.query['username'];
	user.password = req.query['password'];
	req.session.user = user;
	// console.log(req._remoteAddress);
	log.info(req._remoteAddress);
	var options = getPermOption(user.userName);
	var request = http.get(options, function (response) {
		var data = "";
		response.on('data', function (chunk) {
			data += chunk
		});
		response.on('end', function () {
			var json = JSON.parse(data);
			if (json == null) {
				log.info('用户登录失败，用户名不存在,用户名：' + user.userName + '  密码:' + user.password + '  登录IP:' + req._remoteAddress);
				res.end(resDataUtil.error('failed', '用户不存在!'));
				return;
			} else if (json['user_password'] != cryptUtil.md5(user.password)) {
				log.info('用户登录失败,密码错误，用户名：' + user.userName + '  密码:' + user.password + '  登录IP:' + req._remoteAddress);
				res.end(resDataUtil.error('failed', '密码错误！'));
				return;
			} else if (json.configs.length <= 0) {
				log.info('用户登录失败,当前账号无任何权限，用户名：' + user.userName + '  密码:' + user.password + '  登录IP:' + req._remoteAddress);
				res.end(resDataUtil.error('failed', 'sorry，当前帐号没有任何菜单权限！'));
				return;
			} else {
				//permFactory.getOASSystemPerm(json.configs).then(function (foreighOas) {
				//    res.end(resDataUtil.success(foreighOas));
				//});
				//900215pjpj
				onlineFactory.userOnline.getUser(user.userName, req.sessionID).then(function (perm) {
					// if(perm){
					//     var permObj =  JSON.parse(perm)
					//     req.session.user = permObj.user;
					//     res.end(resDataUtil.success(permFactory.getUserGames(permObj.user.permission)));
					// }
					//else {
					// var oASSystemPerm = permFactory.getOASSystemPerm(json.configs)
					var adForeighSystemPerm = permFactory.getAdForeighSystemPerm(json.configs)
					// var ad7roadSystemPerm = permFactory.getAd7roadSystemPerm(json.configs)
					var foreighOASystemPerm = permFactory.getForeighOASystemPerm(json.configs)
					// var webOasSystem = permFactory.getWebOasSystem(json.configs)
					when.join(
						// oASSystemPerm,
						foreighOASystemPerm,
						adForeighSystemPerm,
						// ad7roadSystemPerm,
						// webOasSystem
					).then(function (oas) {
						// console.log(oas[0])
						// process.exit()
						var sysPerm = [];
						if (oas[0].checked == true) sysPerm.push(oas[0]);
						if (oas[1].checked == true) sysPerm.push(oas[1]);
						// if (oas[2].checked == true) sysPerm.push(oas[2]);
						// if (oas[3].checked == true) sysPerm.push(oas[3]);
						// if (oas[4].checked == true) sysPerm.push(oas[4]);
						req.session.user.permission = sysPerm;
						onlineFactory.userOnline.addOnlineUser(user.userName, req.sessionID);
						redisUtil.setRedisKey(0, req.sessionID, JSON.stringify(permFactory.getUserPerm(sysPerm))).then(function () {
							res.end(resDataUtil.success(permFactory.getUserGames(sysPerm)));
						});
					})
				})
			}
		})
	})
	request.on('error', function (e) {
		return resDataUtil.error('failed', e);
	});
	request.end();
}
/**
 * 获取中控权限获取http请求信息头
 * @param userName 用户名
 * **/
var getPermOption = function (userName) {
	var option = {
		hostname: '10.10.4.14',
		port: 8998,
		path: '/query?type=username&id=' + userName,
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
	};
	if (env === 'production') {
		option.hostname = '113.107.160.70';
		// 10.10.160.70 test
		// http://113.107.160.70:8998/query?type=username
	}
	return option;
}
var loginOut = function (req, res) {
	req.session.destroy(function (msg) {
		redisUtil.delRedisKey(2, 'session' + req.sessionID).then(function () {
			redisUtil.delRedisKey(0, req.sessionID);
		});
		res.end(resDataUtil.success(msg));
	});
}
var getSystem = function (req, res) {
	res.end(resDataUtil.success(cacheUtil.getCache('webOasPermData')));

}
var defaultAgent = {
	children: [{
		children: [{
			checked: true,
			agent_id: 1,
			agent_name: "默认",
			agent_pid: -2,
			children: []
		}],
		checked: true,
		agent_id: -2,
		agent_name: "汇总",
		agent_pid: -1
	}],
	checked: true,
	agent_id: -1,
	agent_name: "汇总",
	agent_pid: 10053
};
var getUserPerm = function (req, res) {
	var systemId = req.query['system_id'];
	var gameId = req.query['game_id'];
	var userName = req.session.user.userName;
	var perm = req.session.user.permission;
	if (perm) {
		perm.forEach(function (sys) {
			if (sys.system_id == systemId) {
				sys.systemGames.forEach(function (game) {
					if (sys.system_id == 1) {
						game.menus.forEach(function (menu) {
							userNameFilterConfig.getMenu(menu, userName);
						});
					} //过滤充值权限
					if (game.game_id == gameId) {
						if (!game.agents) game.agents = [];
						if (game.agents.length == 0) {
							game.agents.push(defaultAgent);
						} else {
							// console.log(game.agents)
							// console.log(game.agents[0].children[0].children.length)
						}
						res.end(resDataUtil.success(game));
						return false;
					}
				})
				return false;
			}

		});
	}
	//getSystemGamePermission(systemId, gameId, req.session.user).then(function (data) {
	//    userCtrl.getMenuFromPower(req,systemId,gameId,data.menus);
	//    res.end(resDataUtil.success(data));
	//});
}

var getUserSystemPerm = function (req, res) {
	var systemId = req.query['system_id'];
	var perm = req.session.user.permission;
	if (perm) {
		perm.forEach(function (sys) {
			if (sys.system_id == systemId) {
				res.end(resDataUtil.success(sys));
				return false;
			}

		});
	}
}
var getOnlineCount = function (req, res) {

}

var isAlive = function (req, res) {
	redisUtil.getRedisKey()
}
var userAPI = {
	login: login,
	loginOut: loginOut,
	getUserPerm: getUserPerm,
	getUserSystemPerm: getUserSystemPerm,
	getOnlineCount: getOnlineCount,
	getSystem: getSystem,
	isAlive: isAlive
}
module.exports = userAPI;