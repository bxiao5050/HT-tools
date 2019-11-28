/**
 * Created by jishan.fan on 2016/8/9.
 */
var async = require('async');
var fs = require('fs');
var mobilePermControl = require('../controller/mobilePermControl');
var mobileOasPermControl = require('../controller/oasMobilePermControl');
var monitorPermControl = require('../controller/monitorPermControl');
/**
 * 系统权限需要区分游戏的情况下，获取系统游戏菜单
 * @param system_id 系统ID
 * **/
var getSystemGameMenu = function (system_id, permissionName, callback) {
    //console.log(APP_PATH);
    async.waterfall([
            function (callback) {
                mobilePermControl.getSystem(system_id, callback);
            },
            function (system, callback) {
                mobilePermControl.getSystemGame(system, callback);
            },
            function (system, callback) {
                mobilePermControl.getGameMenu(system, callback);
            }
        ],
        function (err, systemGameMenus) {
            if (!err) {
                var systemGameMenusData = [];
                systemGameMenusData.push(systemGameMenus);
                //console.log(systemGameMenus);
                fs.writeFileSync('../public/permissionJson/mobileGame/' + permissionName + '.json', JSON.stringify(systemGameMenusData));
                callback(null, true);
            } else {
                console.log('get systemMenus error：' + err);
            }
        });
}
/**
 * 系统权限需要区分游戏的情况下，获取系统游戏代理商
 * @param system_id 系统ID
 * **/
var getSystemGameAgent = function (system_id, permissionName, callback) {
    async.waterfall([
            function (callback) {
                mobilePermControl.getSystem(system_id, callback);
            },
            function (system, callback) {

                mobilePermControl.getSystemGame(system, callback);
            },
            function (system, callback) {
                // if (system.id == 5)
                //     mobilePermControl.getH5GameAgent(system, callback);
                // else
                    mobilePermControl.getGameAgent(system, callback);
            }
        ],
        function (err, systemGameAgents) {
            if (!err) {
                var systemGameAgentsData = [];
                systemGameAgentsData.push(systemGameAgents);
                fs.writeFileSync('../public/permissionJson/mobileGame/' + permissionName + '.json', JSON.stringify(systemGameAgentsData));
                callback(null, true);
            } else {
                console.log('get systemMenus error：' + err);
                callback(null, false);
            }
        });
}
/**
 * 系统权限需要区分游戏的情况下，获取系统游戏注册渠道
 * @param system_id 系统ID
 * **/
var getSystemGameRegChannel = function (system_id, permissionName, callback) {
    async.waterfall([
            function (callback) {
                mobilePermControl.getSystem(system_id, callback);
            },
            function (system, callback) {
                mobilePermControl.getSystemGame(system, callback);
            },
            function (system, callback) {

                mobilePermControl.getGameRegChannel(system, callback);
            }
        ],
        function (err, systemGameRegChannel) {
            if (!err) {
                var systemGameRegChannelData = [];
                systemGameRegChannelData.push(systemGameRegChannel);
                fs.writeFileSync('../public/permissionJson/mobileGame/' + permissionName + '.json', JSON.stringify(systemGameRegChannelData));
                callback(null, true);
            } else {
                console.log('get systemMenus error：' + err);
                callback(null, false);
            }
        });
}
/**
 * 系统权限需要区分游戏的情况下，获取系统游戏付费渠道
 * @param system_id 系统ID
 * **/
var getSystemGamePayChannel = function (system_id, permissionName, callback) {
    async.waterfall([
            function (callback) {
                mobilePermControl.getSystem(system_id, callback);
            },
            function (system, callback) {
                mobilePermControl.getSystemGame(system, callback);
            },
            function (system, callback) {
                mobilePermControl.getGamePayChannel(system, callback);
            }
        ],
        function (err, systemGameRegChannel) {
            if (!err) {
                var systemGameRegChannelData = [];
                systemGameRegChannelData.push(systemGameRegChannel);
                fs.writeFileSync('../public/permissionJson/mobileGame/' + permissionName + '.json', JSON.stringify(systemGameRegChannelData));
                callback(null, true);
            } else {
                console.log('get systemMenus error：' + err);
                callback(null, false);
            }
        });
}

var getSystemGameChannel = function (system_id, permissionName, callback) {
    async.waterfall([
            function (callback) {
                mobilePermControl.getSystem(system_id, callback);
            },
            function (system, callback) {
                mobilePermControl.getSystemGame(system, callback);
            },
            function (system, callback) {
                // if (system.id == 5)
                //     mobilePermControl.getH5GameChannel(system, callback);
                // else
                    mobilePermControl.getGameChannel(system, callback);
            }
        ],
        function (err, systemGameChannel) {
            if (!err) {
                var systemGameChannelData = [];
                systemGameChannelData.push(systemGameChannel);
                fs.writeFileSync('../public/permissionJson/mobileGame/' + permissionName + '.json', JSON.stringify(systemGameChannelData));
                callback(null, true);
            } else {
                console.log('获取海外发行渠道失败,err：' + err);
                callback(null, false);
            }
        });
}
/**
 * 系统权限不区分游戏的情况，获取游戏菜单
 * @param system_id 系统ID
 * **/
var getSystemMenu = function (system_id, permissionName, callback) {
    async.waterfall([
            function (callback) {
                mobilePermControl.getSystem(system_id, callback);
            },
            function (system, callback) {
                mobilePermControl.getSystemMenu(system, callback);
            }
        ],
        function (err, systemMenus) {
            if (!err) {
                var systemMenusData = [];
                systemMenusData.push(systemMenus);
                fs.writeFileSync('../public/permissionJson/mobileGame/' + permissionName + '.json', JSON.stringify(systemMenusData));
                callback(null, true);
            } else {
                console.log('get systemMenus error：' + err);
                callback(null, false);
            }
        });
}
var getMobileOasAgent = function (permissionName, callback) {
    mobileOasPermControl.initailPool().then(function(){
        async.waterfall([
            function (callback) {
                mobileOasPermControl.getSystemInfo().then(function (system) {
                    callback(null, system)
                });
            }, function (system, callback) {
                mobileOasPermControl.getAgentInfo(system, callback);
            }], function (err, system) {
            if (!err) {
                fs.writeFileSync('../public/permissionJson/mobileGame/' + permissionName + '.json', JSON.stringify(system));
                callback(null, true);
            } else {
                console.log('get systemMenus error：' + err);
                callback(null, false);
            }

        })
    });

}

var getMobileOasMenu = function(system_id,permissionName,callback){
    mobileOasPermControl.initailPool().then(function(){
        async.waterfall([
            function (callback) {
                mobileOasPermControl.getSystemInfo().then(function (system) {
                    callback(null, system)
                });
            }, function (system, callback) {
                mobileOasPermControl.getMenuInfo(system, callback);
            }], function (err, system) {
            if (!err) {
                fs.writeFileSync('../public/permissionJson/mobileGame/' + permissionName + '.json', JSON.stringify(system));
                callback(null, true);
            } else {
                console.log('get systemMenus error：' + err);
                callback(null, false);
            }

        })
    });
}

var getMobileOasChannel = function(system_id,permissionName,callback){
    mobileOasPermControl.initailPool().then(function(){
        async.waterfall([
            function (callback) {
                mobileOasPermControl.getSystemInfo().then(function (system) {
                    callback(null, system)
                });
            }, function (system, callback) {
                mobileOasPermControl.getRegChannel(system, callback);
            }], function (err, system) {
            if (!err) {
                fs.writeFileSync('../public/permissionJson/mobileGame/' + permissionName + '.json', JSON.stringify(system));
                callback(null, true);
            } else {
                console.log('get systemMenus error：' + err);
                callback(null, false);
            }

        })
    });
}

var getMonitorAgent = function (permissionName,callback) {
    monitorPermControl.getMonitorAgentPerm().then(function (agents) {
        fs.writeFileSync('../public/permissionJson/MonitorSystem/' + permissionName + '.json', JSON.stringify(agents));
        callback(null, true);
    }).catch(function (err) {
        callback(err, false);
    });
}
var getMonitorSystem = function (permissionName,callback) {

    monitorPermControl.getMonitorSystemPerm().then(function (systems) {
        fs.writeFileSync('../public/permissionJson/MonitorSystem/' + permissionName + '.json', JSON.stringify(systems));
        callback(null, true);
    }).catch(function (err) {
        callback(err, false);
    });
}
var getMonitorMenu = function (permissName,callback) {
    monitorPermControl.getMonitorMenuPerm().then(function (systems) {
        fs.writeFileSync('../public/permissionJson/MonitorSystem/' + permissName + '.json', JSON.stringify(systems));
        callback(null, true);
    }).catch(function (err) {
        callback(err, false);
    });
}
var mobilePermService = {
    getSystemGameMenu: getSystemGameMenu,
    getSystemGameAgent: getSystemGameAgent,
    getSystemGameRegChannel: getSystemGameRegChannel,
    getSystemGamePayChannel: getSystemGamePayChannel,
    getSystemGameChannel: getSystemGameChannel,
    getSystemMenu: getSystemMenu,
    getMobileOasAgent:getMobileOasAgent,
    getMobileOasMenu:getMobileOasMenu,
    getMobileOasChannel:getMobileOasChannel,
    getMonitorAgent:getMonitorAgent,
    getMonitorSystem:getMonitorSystem,
    getMonitorMenu:getMonitorMenu
};
module.exports = mobilePermService;
