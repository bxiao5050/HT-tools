/**
 * Created by xiaoyi on 2015/8/5.
 */
var when = require('when');
var log = require('../utils/logUtil');
var dbUtil = require('../utils/dbPoolUtil');
var resDataUtil = require('../utils/resDataUtil');
var url = require('url');
var http = require('http');
var crypto = require('crypto');
var session = require("../cookie/session");
var sessionManager = session.SessionManager;
// 改为：crypto.createHash('md5').update(data).digest('hex')
//var md5 = crypto.createHash('md5'); // 这样声明，第一次MD5OK，后面都会报错 Caught exception: TypeError: HashUpdate fail
/**
 * 校验用户
 * @param req
 * @param res
 */
function checkUser(req, res) {
    var args = req.query;
    var userName = args.username;
    var pwd = args.password;
    if (!userName || !pwd) {
        res.end(resDataUtil.error('failed', '用户名或者密码不合法！'))
        return
    }
    var options = {
        hostname: '119.147.247.34',
        port: 6664,
        path: '/query?type=username&id=xiaoyi',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    var request = http.get(options, function (response) {
        response.on('data', function (chunk) {
            var result = JSON.parse(chunk);
            if (result['user_password'] === crypto.createHash('md5').update(pwd).digest('hex')) {
                sessionManager.get(req.sessionId).set('username', userName);
                res.end(resDataUtil.success('login success'));
            } else {
                res.end(resDataUtil.error('failed', '密码错误'))
            }
        });
    });
    request.on('error', function (e) {
        res.end(resDataUtil.error('failed', 'problem with request: ' + e.message))
    });
}


/**
 * 获取用户权限
 * @param req
 * @param res
 * @returns {*}
 */
function getPermission(req, res) {

    var args = req.query;
    var userName = args.username;
    var pwd = args.password;
    if (!userName || !pwd) {
        res.end(resDataUtil.error('failed', '用户名或者密码不合法！'))
        return
    }
    var options = {
        hostname: '121.10.141.219',
        //hostname:'10.10.15.66',
        port: 8600,
        path: '/access/user/login?username=' + userName + '&pwd=' + crypto.createHash('md5').update(pwd).digest('hex'),
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    var request = http.get(options, function (response) {

        var data = "";
        response.on('data', function (chunk) {
            data += chunk
        });
        response.on('end', function () {
            var json = JSON.parse(data);
            if (json.code == 0) {
                res.end(resDataUtil.error('failed', '用户名或者密码错误！'))
            } else {
                if (json.menus.length <= 0) {
                    res.end(resDataUtil.error('failed', 'sorry，当前帐号没有任何菜单权限！'))
                    return;
                }
                var menuJsonData = {
                    "menus": [
                        {
                            "menu_id": 1,
                            "menu_name": "首页",
                            "menu_url": "app.home",
                            "children": []
                        },
                        {
                            "menu_id": 2,
                            "menu_name": "自研业务分析",
                            "menu_url": null,
                            "children": [
                                {
                                    "menu_id": 201,
                                    "menu_name": "五分钟视图",
                                    "menu_url": "app.oas5MinData",
                                    "children": []
                                },
                                {
                                    "menu_id": 202,
                                    "menu_name": "五力模型",
                                    "menu_url": "app.fiveForcesModel",
                                    "children": []
                                },
                                {
                                    "menu_id": 206,
                                    "menu_name": "新手阶段留存",
                                    "menu_url": "app.stepLost",
                                    "children": []
                                },
                                {
                                    "menu_id": 207,
                                    "menu_name": "新增用户",
                                    "menu_url": "app.newUser",
                                    "children": []
                                },
                                {
                                    "menu_id": 208,
                                    "menu_name": "活跃用户",
                                    "menu_url": "app.activeUser",
                                    "children": []
                                },
                                {
                                    "menu_id": 209,
                                    "menu_name": "在线用户",
                                    "menu_url": "app.onlineUser",
                                    "children": []
                                },
                                {
                                    "menu_id": 210,
                                    "menu_name": "留存用户",
                                    "menu_url": "app.retainUser",
                                    "children": []
                                },
                                {
                                    "menu_id": 212,
                                    "menu_name": "登录比",
                                    "menu_url": "app.loginRate",
                                    "children": []
                                }
                            ]
                        },
                        {
                            "menu_id": 3,
                            "menu_name": "投放分析",
                            "menu_url": null,
                            "children": [
                                {
                                    "menu_id": 302,
                                    "menu_name": "渠道分析",
                                    "menu_url": "app.channelDetail",
                                    "children": []
                                },
                                {
                                    "menu_id": 301,
                                    "menu_name": "常用配置",
                                    "menu_url": null,
                                    "children": [
                                        {
                                            "menu_id": 30101,
                                            "menu_name": "APP包管理",
                                            "menu_url": "app.channelAppList"
                                        },
                                        {
                                            "menu_id": 30102,
                                            "menu_name": "单价配置",
                                            "menu_url": "app.channelPrice"
                                        },
                                        {
                                            "menu_id": 30103,
                                            "menu_name": "数据补充",
                                            "menu_url": "app.channelDataRepair"
                                        },
                                        {
                                            "menu_id": 30104,
                                            "menu_name": "预算录入",
                                            "menu_url": "app.budget"
                                        },
                                        {
                                            "menu_id": 30105,
                                            "menu_name": "备注录入",
                                            "menu_url": "app.channelRemark"
                                        }
                                    ]
                                },
                                {
                                    "menu_id": 303,
                                    "menu_name": "投放报表",
                                    "menu_url": "app.reportMap",
                                    "children": []
                                },
                                {
                                    "menu_id": 304,
                                    "menu_name": "实时报表",
                                    "menu_url": "app.realtimereport",
                                    "children": []
                                },
                                {
                                    "menu_id": 305,
                                    "menu_name": "ROI数据",
                                    "menu_url": null,
                                    "children": [
                                        {
                                            "menu_id": 30501,
                                            "menu_name": "整体状况",
                                            "menu_url": "app.overallStatus"
                                        },
                                        {
                                            "menu_id": 30502,
                                            "menu_name": "分服状况",
                                            "menu_url": "app.ServiceStatus"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
                //var menuData= JSON.parse(menuJsonData);
                var menus = [];
                for (var i = 0; i < menuJsonData.menus.length; i++) {
                    //var temp  = json.menus[i];
                    var temp = menuJsonData.menus[i];
                    console.log(temp.menu_id);
                    if (temp.menu_id != 4) {
                        menus.push(temp);
                    }
                }
                json.menus = menus;
                req.session.set('username', userName)
                req.session.set('menuAccess', getAccessMenuIds(json));
                res.end(resDataUtil.success({access: json.result, menus: json.menus}));
            }
        });
    });
    request.on('error', function (e) {
        res.end(resDataUtil.error('failed', 'problem with request: ' + e.message))
    });
    request.end();
}

function getAccessAgentIds(json) {
    var gamesAccess = json.result;
    var arr = [];
    for (var i = 0; i < gamesAccess.length; i++) {
        arr.push(gamesAccess.children.agent);
    }
}

function getAccessMenuIds(json) {
    var menuIDs = [];

    function getId(menus) {
        if (menus.children) {
            for (var i = 0; i < menus.children.length; i++) {
                var temp = menus.children[i];
                if (temp.menu_url) {
                    menuIDs.push(temp.menu_id);
                }
                getId(temp);
            }
        }
    }

    for (var i = 0; i < json.menus.length; i++) {
        var temp = json.menus[i];
        if (temp.menu_url) {
            menuIDs.push(temp.menu_id);
        }
        getId(temp);
    }
    return menuIDs.join(',');
}
function setCookie(req, res) {
    var args = req.query;
    var userName = args.userName;
    var pwd = args.password;
    req.session.set('username', userName);
    req.session.set('password', pwd);
    res.redirect('http://localhost:8899/#/login');
    //res.redirect('http://10.10.4.14:8899/#/login');
}

var API = {
    //checkUser: checkUser,
    getUserAccess: getPermission,
    setCookie: setCookie
}
module.exports = API;