/**
 * Created by linlin.zhang on 2016/9/22.
 */
var arrayUtil = require('./ArrayUtil');
var when = require('when');
var permConfig = require('./permDataConfig');
var dbUtil = require('../utils/dbPoolUtil');
var cacheUtil = require('../utils/cacheUtil');
var permUtil = require('./permUtil');
var OASystemFactory = require('./OASSystemPerm');
var Ad7roadFactory = require('./ad7roadSystemPerm');
var foreighOASystemFactory = require('./foreighOASystemPerm');
var AdForeighSystemFactory = require('./foreighAdSystemPerm');
var webOasSystemFactory = require('./webOasSystemPerm');
var env = require('../envConfig')();

var dbType = env == 'production' ? "pg" : "pgTest";
var createOASSystem = function (permlist) {
	var configItem = arrayUtil.get(permConfig, function (sys) {
		return sys.system = 1
	});
	//获取系统
	var system = arrayUtil.grep(permlist, function (li) {
		if (li.node_type == 'system') return true;
		else return false;
	});
	//获取游戏
	var games = arrayUtil.grep(permlist, function (li) {
		if (li.node_type == 'game') return true;
		else return false;
	});
	var menus = permUtil.getMenuLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'mobile_oas_menu';
		})
		.level_config_item_name);
	var channel = permUtil.getLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'mobile_oas_regChannel';
		})
		.level_config_item_name);
	var agent = permUtil.getLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'mobile_oas_agent';
		})
		.level_config_item_name);
	var payChannel = permUtil.getLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'mobile_oas_payChannel';
		})
		.level_config_item_name);
	games.forEach(function (ele) {
		ele.menus = arrayUtil.grep(menus, function (menu) {
			return ele.node_id == menu.parent_id
		});
		ele.regChannels = arrayUtil.grep(channel, function (node) {
			return ele.node_id == node.parent_id
		});
		ele.agents = arrayUtil.grep(agent, function (node) {
			return ele.node_id == node.parent_id
		});
		ele.payChannels = arrayUtil.grep(payChannel, function (node) {
			return ele.node_id == node.parent_id
		});
	});
	system[0].systemGames = games;
	return OASystemFactory.appendConfigValue(system[0]);
}
var getOASSystemPerm = function (permlist) {
	var permArr = permUtil.getPermList(permlist, arrayUtil.get(permConfig, function (sys) {
		return sys.system == 1
	}).level_config_item_name);
	// var menuPerm = arrayUtil.grep(permArr,function(perm){ return perm.config_item_name == 'mobile_oas_menu'; });
	var deffed = when.defer();
	var result = cacheUtil.getCache('OASystemPermData');
	if (result != null) {
		OASystemFactory.getPermTree(result, permArr)
		OASystemFactory.filtPermTree(result);
		deffed.resolve(result);
	} else {
		var sql = cacheUtil.getDataView('oaSSsytemPermSQL') + ' ';
		dbUtil.execSQL(sql, [], dbType).then(function (data) {
			result = permFactory.createOASSystem(data.result);
			cacheUtil.setCache('OASystemPermData', result, 1000 * 60 * 5);
			OASystemFactory.getPermTree(result, permArr);
			OASystemFactory.filtPermTree(result);
			deffed.resolve(result);
		}).catch(function (err) {
			deffed.reject(err);
		});
	}

	return deffed.promise;
}
var createAd7roadSystem = function (permlist) {
	var configItem = arrayUtil.get(permConfig, function (sys) {
		return sys.system == 3
	});
	//获取系统
	var system = arrayUtil.grep(permlist, function (li) {
		if (li.node_type == 'system') return true;
		else return false;
	});
	//获取游戏
	var games = arrayUtil.grep(permlist, function (li) {
		if (li.node_type == 'game') return true;
		else return false;
	});
	var menus = permUtil.getMenuLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'mobile_adRoad_menu';
		})
		.level_config_item_name);
	games.forEach(function (ele) {
		ele.menus = arrayUtil.grep(menus, function (menu) {
			return ele.node_id == menu.parent_id
		});
	});
	system[0].systemGames = games;
	return Ad7roadFactory.appendConfigValue(system[0]);
}
var getAd7roadSystemPerm = function (permlist) {
	var permArr = permUtil.getPermList(permlist, arrayUtil.get(permConfig, function (sys) {
		return sys.system == 3
	}).level_config_item_name);
	// var menuPerm = arrayUtil.grep(permArr,function(perm){ return perm.config_item_name == 'mobile_oas_menu'; });
	var deffed = when.defer();
	var result = cacheUtil.getCache('Ad7roadSystemPermData');
	if (result != null) {

		Ad7roadFactory.getPermTree(result, permArr)
		Ad7roadFactory.filtPermTree(result);
		deffed.resolve(result);
	} else {
		var sql = cacheUtil.getDataView('ad7roadSystemPermSQL') + ' ';
		dbUtil.execSQL(sql, [], dbType).then(function (data) {
			result = createAd7roadSystem(data.result);
			cacheUtil.setCache('Ad7roadSystemPermData', result, 1000 * 60 * 5);
			Ad7roadFactory.getPermTree(result, permArr);
			Ad7roadFactory.filtPermTree(result);
			deffed.resolve(result);
		}).catch(function (err) {
			deffed.reject(err);
		});
	}

	return deffed.promise;
}
var createForighOASystemPerm = function (permlist) {
	var configItem = arrayUtil.get(permConfig, function (sys) {
		return sys.system == 4;
	});
	//获取系统
	var system = arrayUtil.grep(permlist, function (li) {
		if (li.node_type == 'system') return true;
		else return false;
	});
	//获取游戏
	var games = arrayUtil.grep(permlist, function (li) {
		if (li.node_type == 'game') return true;
		else return false;
	});
	var menus = permUtil.getMenuLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'mobile_foreignOas_menu';
		})
		.level_config_item_name);
	var channel = permUtil.getGameLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'mobile_foreignOas_channel';
		})
		.level_config_item_name);
	var agent = permUtil.getGameLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'mobileforeignOas_agent';
		})
		.level_config_item_name);
	games.forEach(function (ele) {
		ele.menus = arrayUtil.grep(menus, function (menu) {
			return ele.node_id == menu.parent_id
		});
		ele.channels = arrayUtil.grep(channel, function (node) {
			return ele.node_id == node.parent_id
		});
		ele.agents = arrayUtil.grep(agent, function (node) {
			return ele.node_id == node.parent_id
		});
	});
	system[0].systemGames = games;
	return foreighOASystemFactory.appendConfigValue(system[0]);
}
var getForeighOASystemPerm = function (permlist) {
	var permArr = permUtil.getPermList(permlist, arrayUtil.get(permConfig, function (sys) {
		return sys.system == 4
	}).level_config_item_name);


	// var menuPerm = arrayUtil.grep(permArr,function(perm){ return perm.config_item_name == 'mobile_oas_menu'; });
	var deffed = when.defer();
	var result = cacheUtil.getCache('ForeighOASystemPermData');

	if (result != null) {
		foreighOASystemFactory.getPermTree(result, permArr);
		foreighOASystemFactory.filtPermTree(result);
		deffed.resolve(result);
	} else {
		var sql = cacheUtil.getDataView('foreighOASystemPermSQL') + ' ';
		dbUtil.execSQL(sql, [], dbType).then(function (data) {
			result = createForighOASystemPerm(data.result);
			cacheUtil.setCache('ForeighOASystemPermData', result, 1000 * 60 * 5);
			foreighOASystemFactory.getPermTree(result, permArr);
			foreighOASystemFactory.filtPermTree(result);
			deffed.resolve(result);
		}).catch(function (err) {
			deffed.reject(err);
		});
	}

	return deffed.promise;
}
var createAdForeighSystem = function (permlist) {
	var configItem = arrayUtil.get(permConfig, function (sys) {
		return sys.system == 2;
	});
	//获取系统
	var system = arrayUtil.grep(permlist, function (li) {
		if (li.node_type == 'system') return true;
		else return false;
	});
	var menus = permUtil.getMenuLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'mobile_ad_menu';
		})
		.level_config_item_name);
	system[0].menus = menus;
	return AdForeighSystemFactory.appendConfigValue(system[0]);
}
var getAdForeighSystemPerm = function (permlist) {
	var permArr = permUtil.getPermList(permlist, arrayUtil.get(permConfig, function (sys) {
		return sys.system == 2
	}).level_config_item_name);
	// var menuPerm = arrayUtil.grep(permArr,function(perm){ return perm.config_item_name == 'mobile_oas_menu'; });
	var deffed = when.defer();
	var result = cacheUtil.getCache('ForeighAdSystemPermData');
	if (result != null) {

		AdForeighSystemFactory.getPermTree(result, permArr)
		AdForeighSystemFactory.filtPermTree(result);
		deffed.resolve(result);
	} else {
		var sql = cacheUtil.getDataView('adForeighSystemPermSQL') + ' ';
		dbUtil.execSQL(sql, [], dbType).then(function (data) {
			result = createAdForeighSystem(data.result);
			cacheUtil.setCache('ForeighAdSystemPermData', result, 1000 * 60 * 5);
			AdForeighSystemFactory.getPermTree(result, permArr);
			AdForeighSystemFactory.filtPermTree(result);
			deffed.resolve(result);
		}).catch(function (err) {
			deffed.reject(err);
		});
	}
	return deffed.promise;
}

var createWebOasSystem = function (permlist) {
	var configItem = arrayUtil.get(permConfig, function (sys) {
		return sys.system == 5;
	});
	//获取系统
	var system = arrayUtil.grep(permlist, function (li) {
		if (li.node_type == 'system') return true;
		else return false;
	});
	//获取游戏
	var games = arrayUtil.grep(permlist, function (li) {
		if (li.node_type == 'game') return true;
		else return false;
	});
	var menus = permUtil.getMenuLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'webOasMenus';
		})
		.level_config_item_name);

	var channel = permUtil.getGameLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'webOasChannels';
		})
		.level_config_item_name);
	var agent = permUtil.getGameLevel(permlist, arrayUtil.get(configItem.son_config_item_name, function (ele) {
			return ele.config_item_name == 'webOasAgents';
		})
		.level_config_item_name);

	games.forEach(function (ele) {
		ele.menus = arrayUtil.grep(menus, function (menu) {
			return ele.node_id == menu.parent_id
		});
		ele.channels = arrayUtil.grep(channel, function (node) {
			return ele.node_id == node.parent_id
		});
		ele.agents = arrayUtil.grep(agent, function (node) {
			return ele.node_id == node.parent_id
		});
	});
	system[0].systemGames = games;
	return webOasSystemFactory.appendConfigValue(system[0]);
}
var getWebOasSystem = function (permlist) {
	var permArr = permUtil.getPermList(permlist, arrayUtil.get(permConfig, function (sys) {
		return sys.system == 5
	}).level_config_item_name);
	// var menuPerm = arrayUtil.grep(permArr,function(perm){ return perm.config_item_name == 'mobile_oas_menu'; });
	var deffed = when.defer();
	var result = cacheUtil.getCache('webOasPermData');
	if (result != null) {
		webOasSystemFactory.getPermTree(result, permArr);
		webOasSystemFactory.filtPermTree(result);
		deffed.resolve(result);
	} else {
		var sql = cacheUtil.getDataView('webOasPerm') + ' ';
		dbUtil.execSQL(sql, [], dbType).then(function (data) {
			result = createWebOasSystem(data.result);
			cacheUtil.setCache('webOasPermData', result, 1000 * 60 * 5);
			webOasSystemFactory.getPermTree(result, permArr);
			webOasSystemFactory.filtPermTree(result);
			deffed.resolve(result);
		}).catch(function (err) {
			deffed.reject(err);
		});
	}
	return deffed.promise;
}
var propertyName = ['game_id', 'game_name', 'id', 'sort', 'system_id']
var getUserGames = function (systems) {
	var sysCopy = JSON.parse(JSON.stringify(systems));
	sysCopy.forEach(function (sys) {
		if (sys.system_id == 2) {
			sys.systemGames = [];
			delete sys.menus;
			sys.flag = false;
		} else {
			sys.systemGames.forEach(function (game) {
				for (var property in game) {
					if (!arrayUtil.contain(propertyName, property))
						delete game[property];
				}
			})
			sys.flag = true;
		}
	});
	return sysCopy;
}
var getUserPerm = function (perm) {
	var userPerm = [];
	perm.forEach(function (sys) {
		var userSys = {
			system_id: sys.system_id
		};
		if (sys.system_id == 2) {
			userSys.menus = [];
			sys.menus.forEach(function (menu) {
				permUtil.getGameMenu(menu, userSys.menus);
			});

		} else {
			userSys.games = [];
			sys.systemGames.forEach(function (game) {
				var userGame = {
					game_id: game.game_id
				};
				userGame.menus = [];
				game.menus.forEach(function (menu) {
					permUtil.getGameMenu(menu, userGame.menus);
				});
				userSys.games.push(userGame);
			});
		}
		userPerm.push(userSys);
	})
	return userPerm;
}
var cachePermData = function () {
	var sql1 = cacheUtil.getDataView('adForeighSystemPermSQL') + ' ';
	dbUtil.execSQL(sql1, [], dbType).then(function (data) {
		cacheUtil.setCache('ForeighAdSystemPermData', createAdForeighSystem(data.result), 1000 * 60 * 60);
	});
	var sql2 = cacheUtil.getDataView('oaSSsytemPermSQL') + ' ';
	dbUtil.execSQL(sql2, [], dbType).then(function (data) {
		cacheUtil.setCache('OASystemPermData', permFactory.createOASSystem(data.result), 1000 * 60 * 60);
	});
	var sql3 = cacheUtil.getDataView('ad7roadSystemPermSQL') + ' ';
	dbUtil.execSQL(sql3, [], dbType).then(function (data) {
		cacheUtil.setCache('Ad7roadSystemPermData', createAd7roadSystem(data.result), 1000 * 60 * 60);
	});
	var sql4 = cacheUtil.getDataView('ad7roadSystemPermSQL') + ' ';
	dbUtil.execSQL(sql4, [], dbType).then(function (data) {
		cacheUtil.setCache('Ad7roadSystemPermData', createAd7roadSystem(data.result), 1000 * 60 * 60);
	});
	var sql = cacheUtil.getDataView('webOasPerm') + ' ';
	dbUtil.execSQL(sql, [], dbType).then(function (data) {
		cacheUtil.setCache('webOasPermData', createWebOasSystem(data.result), 1000 * 60 * 60);
	});
}

var permFactory = {
	createOASSystem: createOASSystem,
	getOASSystemPerm: getOASSystemPerm,
	createAd7roadSystem: createAd7roadSystem,
	getAd7roadSystemPerm: getAd7roadSystemPerm,
	createForighOASystemPerm: createForighOASystemPerm,
	getForeighOASystemPerm: getForeighOASystemPerm,
	getAdForeighSystemPerm: getAdForeighSystemPerm,
	createWebOasSystem: createWebOasSystem,
	getWebOasSystem: getWebOasSystem,
	getUserGames: getUserGames,
	getUserPerm: getUserPerm,
	cachePermData: cachePermData
}
module.exports = permFactory;