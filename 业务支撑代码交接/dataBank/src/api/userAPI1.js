/**
 * Created by jishan.fan on 2016/4/21.
 */
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
var str = require('string');
var systemData = require('../interface/initSystemData').systemData;
var sessionManager = session.SessionManager;
//var userNameFilter =  require('../config/userNameFilterConfig');
var rf=require("fs");
// 改为：crypto.createHash('md5').update(data).digest('hex')
//var md5 = crypto.createHash('md5'); // 这样声明，第一次MD5OK，后面都会报错 Caught exception: TypeError: HashUpdate fail
/**
 * 获取用户权限
 * @param req
 * @param res
 * @returns {*}
 */
function getUserAccess(req, res) {
    var args = req.query;
    var userName = args.username;
    var pwd = args.password;
    //if( req.session === null || req.session ==='') {
    //    res.redirect('http://10.10.4.14:9999');
    //}else {
    //    var userName = req.session.get("username");
    //    var pwd = req.session.get("password");
        var md5Pwd = crypto.createHash('md5').update(pwd).digest('hex');
        //console.log(crypto.createHash('md5').update(pwd).digest('hex'));
        if (!userName || !pwd) {
            res.end(resDataUtil.error('failed', '用户名或者密码不合法！'))
            return
        }
        //+'&pwd=' + crypto.createHash('md5').update(pwd).digest('hex')
        var options = {
            //hostname: '121.10.141.219',
            //正式环境
            hostname: '113.107.167.6',
            //测试环境
            //hostname : '10.10.4.14',
            port: 8998,
            path: '/query?type=username&id=' + userName,
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
                //console.log('11111');
                var json = JSON.parse(data);
                //console.dir(json);
                if (json == null) {
                    res.end(resDataUtil.error('failed', '用户不存在！'));
                    return;
                } else if (json['user_password'] != md5Pwd) {
                    res.end(resDataUtil.error('failed', '密码错误！'));
                    return;
                } else if (json.configs.length <= 0) {
                    res.end(resDataUtil.error('failed', 'sorry，当前帐号没有任何菜单权限！'));
                    return;
                } else {
                    getPermission(userName, json, req, res);
                }
            });
        });
        request.on('error', function (e) {
            res.end(resDataUtil.error('failed', 'problem with request: ' + e.message))
        });
        request.end();
    //}
}

var getPermission = function (userName, json, req, res) {
    //console.log(systemData.agents);
    var permissionTree = json.configs;
    var menus = [];
    var access = [];
    permissionTree.forEach(function (item) {
        var oasMenu = '';
        var deliveryMenu = '';
        var sdkMenu = '';
        var payChannel = '';
        var regChannel = '';
        var oasAgent = '';
        if ('ChangicSystem_menu' === item['config_item_name']) {
            oasMenu += (oasMenu === "") ? item['config_item_value'] : "," + item['config_item_value'];
        } else if ('payChannel' === item['config_item_name']) {
            payChannel += (payChannel === "") ? item['config_item_value'] : "," + item['config_item_value'];
        } else if ('regChannel' === item['config_item_name']) {
            regChannel += (regChannel === "") ? item['config_item_value'] : "," + item['config_item_value'];
        } else if ('ChangicDelivery_menu' === item['config_item_name']) {
            deliveryMenu += (deliveryMenu === "") ? item['config_item_value'] : "," + item['config_item_value'];
        } else if ('ChangicSDKpack_menu' === item['config_item_name']) {
            sdkMenu += (sdkMenu === "") ? item['config_item_value'] : "," + item['config_item_value'];
        } else if ('ChangicSystem_agent' === item['config_item_name']) {
            oasAgent += (oasAgent === "") ? item['config_item_value'] : "," + item['config_item_value'];
        }
        if (oasMenu != '') {
            var oasMenus = [];
            var oasMenuArray = oasMenu.split(',');
            for (var i = 0; i < oasMenuArray.length; i++) {
                oasMenuArray[i] = oasMenuArray[i] + ',';
                var topMenu = {};
                var topMenuId = str(oasMenuArray[i]).between('a', 'b').toInt();
                // g10003a1 的情况
                if (isNaN(topMenuId)) {
                    topMenuId = str(oasMenuArray[i]).between('a', ',').toInt();
                    if (isNaN(topMenuId)) {
                        for (var j = 0; j < systemData.menus.length; j++) {
                            if (systemData.menus[j]['menu_id'] == 2) {
                                topMenu.menu_id = systemData.menus[j]['menu_id'];
                                topMenu.menu_name = systemData.menus[j]['menu_name'];
                                topMenu.menu_url = systemData.menus[j]['menu_url'];
                                topMenu.children = [];
                                for (var k = 0; k < systemData.menus.length; k++) {
                                    if (systemData.menus[k]['parent_menu_id'] == topMenu.menu_id) {
                                        var secondMenu = {};
                                        secondMenu.menu_id = systemData.menus[k]['menu_id'];
                                        secondMenu.menu_name = systemData.menus[k]['menu_name'];
                                        secondMenu.menu_url = systemData.menus[k]['menu_url'];
                                        secondMenu.children = [];
                                        //console.log(topMenu)
                                        topMenu['children'].push(secondMenu);
                                    }
                                }
                            }
                        }
                        oasMenus.push(topMenu);
                    } else {
                        for (var j = 0; j < systemData.menus.length; j++) {
                            if (systemData.menus[j]['menu_id'] == topMenuId) {
                                topMenu.menu_id = systemData.menus[j]['menu_id'];
                                topMenu.menu_name = systemData.menus[j]['menu_name'];
                                topMenu.menu_url = systemData.menus[j]['menu_url'];
                                topMenu.children = [];
                                for (var k = 0; k < systemData.menus.length; k++) {
                                    if (systemData.menus[k]['parent_menu_id'] == topMenuId) {
                                        var secondMenu = {};
                                        secondMenu.menu_id = systemData.menus[k]['menu_id'];
                                        secondMenu.menu_name = systemData.menus[k]['menu_name'];
                                        secondMenu.menu_url = systemData.menus[k]['menu_url'];
                                        secondMenu.children = [];
                                        //console.log(topMenu)
                                        topMenu['children'].push(secondMenu);
                                    }
                                }

                            }
                        }
                        oasMenus.push(topMenu);
                    }
                }
                    //g10003a2b206的情况
                else {
                        var repeat = false;
                        for (var j = 0; j < systemData.menus.length; j++) {
                            if (systemData.menus[j]['menu_id'] == topMenuId) {
                                topMenu.menu_id = systemData.menus[j]['menu_id'];
                                topMenu.menu_name = systemData.menus[j]['menu_name'];
                                topMenu.menu_url = systemData.menus[j]['menu_url'];
                                topMenu.children = [];
                                var secondMenuId = str(oasMenuArray[i]).between('b', ',').toInt();
                                var secondMenu = {};
                                for (var k = 0; k < oasMenus.length; k++) {
                                    if (oasMenus[k]['menu_id'] == topMenu.menu_id) {
                                        repeat = true;
                                        //console.log(oasMenuArray[i]);
                                        for (var l = 0; l < systemData.menus.length; l++) {
                                            if (systemData.menus[l]['menu_id'] == secondMenuId && systemData.menus[l]['parent_menu_id'] == topMenuId) {
                                                secondMenu.menu_id = secondMenuId;
                                                secondMenu.menu_name = systemData.menus[l]['menu_name'];
                                                secondMenu.menu_url = systemData.menus[l]['menu_url'];
                                                secondMenu.children = [];
                                                oasMenus[k].children.push(secondMenu);
                                            }
                                        }
                                    }
                                }
                                if (repeat == false) {
                                    for (var l = 0; l < systemData.menus.length; l++) {
                                        if (systemData.menus[l]['menu_id'] == secondMenuId && systemData.menus[l]['parent_menu_id'] == topMenuId) {
                                            secondMenu.menu_id = secondMenuId;
                                            secondMenu.menu_name = systemData.menus[l]['menu_name'];
                                            secondMenu.menu_url = systemData.menus[l]['menu_url'];
                                            secondMenu.children = [];
                                            topMenu.children.push(secondMenu);
                                        }
                                    }
                                    oasMenus.push(topMenu);
                                }
                            }
                        }
                    }
                    //var secondMenu =str(oasMenuArray[i]).between('a', 'b').toInt();
                    //console.log(topMenus);
                    //var topMenus = JSON.parse(topMenus);

                }
                if ([] != oasMenus) {
                    menus = oasMenus;
                }
            }
            if ('' != deliveryMenu) {
                var deliveryMenuArray = deliveryMenu.split(',');
                //console.log(deliveryMenu);
                var deliveryMenu = {};
                for (var s = 0; s < systemData.menus.length; s++) {
                    if (systemData.menus[s]['menu_id'] === 3) {
                        deliveryMenu.menu_id = systemData.menus[s]['menu_id'];
                        deliveryMenu.menu_name = systemData.menus[s]['menu_name'];
                        deliveryMenu.menu_url = systemData.menus[s]['menu_url'];
                        deliveryMenu.children = [];
                        //s3,s3a303,s3a301b30101,s3a301b30102,s3a301b30103,s3a304
                        for (var i = 0; i < deliveryMenuArray.length; i++) {
                            deliveryMenuArray[i] = deliveryMenuArray[i] + ',';
                            var deliveryMenuId = str(deliveryMenuArray[i]).between('s', 'a').toInt();
                            // s3 的情况
                            if (isNaN(deliveryMenuId)) {
                                deliveryMenuId = str(deliveryMenuArray[i]).between('s', ',').toInt();
                                for (var k = 0; k < systemData.menus.length; k++) {
                                    if (systemData.menus[k]['parent_menu_id'] == 3) {
                                        var topMenu = {};
                                        topMenu.menu_id = systemData.menus[k].menu_id;
                                        topMenu.menu_name = systemData.menus[k].menu_name;
                                        topMenu.menu_url = systemData.menus[k].menu_url;
                                        topMenu.children = [];
                                        for (var l = 0; l < systemData.menus.length; l++) {
                                            if( systemData.menus[l]['parent_menu_id'] == topMenu.menu_id ) {
                                                var childMenu = {};
                                                childMenu.menu_id = systemData.menus[l].menu_id;
                                                childMenu.menu_name = systemData.menus[l].menu_name;
                                                childMenu.menu_url = systemData.menus[l].menu_url;
                                                childMenu.children = [];
                                                topMenu.children.push(childMenu);
                                            }
                                        }
                                        deliveryMenu.children.push(topMenu);
                                    }
                                }
                            }
                            //s3a301b30102  s3a301的情况
                            else {
                                for (var j = 0; j < systemData.menus.length; j++) {
                                    if (systemData.menus[j]['menu_id'] == deliveryMenuId) {
                                        var topMenu = {};
                                        var topMenuId = str(deliveryMenuArray[i]).between('a', 'b').toInt();
                                        //s3a301的情况
                                        if (isNaN(topMenuId)) {
                                            topMenuId = str(deliveryMenuArray[i]).between('a', ',').toInt();
                                            for (var k = 0; k < systemData.menus.length; k++) {
                                                if (systemData.menus[k]['menu_id'] == topMenuId) {
                                                    topMenu.menu_id = systemData.menus[k]['menu_id'];
                                                    topMenu.menu_name = systemData.menus[k]['menu_name'];
                                                    topMenu.menu_url = systemData.menus[k]['menu_url'];
                                                    topMenu.children = [];
                                                    for (var l = 0; l < systemData.menus.length; l++) {
                                                        if (systemData.menus[l]['parent_menu_id'] == topMenuId) {
                                                            var secondMenu = {};
                                                            secondMenu.menu_id = systemData.menus[l]['menu_id'];
                                                            secondMenu.menu_name = systemData.menus[l]['menu_name'];
                                                            secondMenu.menu_url = systemData.menus[l]['menu_url'];
                                                            secondMenu.children = [];
                                                            //console.log(topMenu)
                                                            topMenu['children'].push(secondMenu);
                                                        }
                                                    }
                                                    deliveryMenu.children.push(topMenu);
                                                }
                                            }
                                        }
                                        //g10003a2b206的情况
                                        else {
                                            var topMenu = {};
                                            for (var k = 0; k < systemData.menus.length; k++) {
                                                if (systemData.menus[k]['menu_id'] == topMenuId) {
                                                    topMenu.menu_id = topMenuId;
                                                    topMenu.menu_name = systemData.menus[k]['menu_name'];
                                                    topMenu.menu_url = systemData.menus[k]['menu_url'];
                                                    topMenu.children = [];
                                                    var repeat = false;
                                                    var secondMenuId = str(deliveryMenuArray[i]).between('b', ',').toInt();
                                                    for (var l = 0; l < deliveryMenu.children.length; l++) {
                                                        if (deliveryMenu.children[l]['menu_id'] == topMenuId) {
                                                            repeat = true;
                                                            for (var m = 0; m < systemData.menus.length; m++) {
                                                                if (systemData.menus[m]['menu_id'] == secondMenuId &&　systemData.menus[m]['parent_menu_id'] ==topMenuId) {
                                                                    var secondMenu = {};
                                                                    secondMenu.menu_id = secondMenuId;
                                                                    secondMenu.menu_name = systemData.menus[m]['menu_name'];
                                                                    secondMenu.menu_url = systemData.menus[m]['menu_url'];
                                                                    secondMenu.children = [];
                                                                    deliveryMenu.children[l].children.push(secondMenu);
                                                                    //console.log(deliveryMenu);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (repeat == false) {
                                                        for (var l = 0; l < systemData.menus.length; l++) {
                                                            if (systemData.menus[l]['menu_id'] == secondMenuId && systemData.menus[l]['parent_menu_id'] == topMenuId) {
                                                                var secondMenu = {};
                                                                secondMenu.menu_id = secondMenuId;
                                                                secondMenu.menu_name = systemData.menus[l]['menu_name'];
                                                                secondMenu.menu_url = systemData.menus[l]['menu_url'];
                                                                secondMenu.children = [];
                                                                topMenu.children.push(secondMenu);
                                                                //console.log(secondMenu);
                                                                deliveryMenu.children.push(topMenu);
                                                                //console.log(deliveryMenu);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                menus.push(deliveryMenu);
            }
            if ('' != sdkMenu) {
                //console.log(sdkMenu);
                var sdkMenuArray = sdkMenu.split(',');
                var sdkMenu = {};
                for (var i = 0; i < systemData.menus.length; i++) {
                    if (systemData.menus[i]['menu_id'] == 4) {
                        sdkMenu.menu_id = systemData.menus[i]['menu_id'];
                        sdkMenu.menu_name = systemData.menus[i]['menu_name'];
                        sdkMenu.menu_url = systemData.menus[i]['menu_url'];
                        sdkMenu.children = [];
                    }
                }
                //console.log(sdkMenu);
                //s3,s3a303,s3a301b30101,s3a301b30102,s3a301b30103,s3a304
                for (var i = 0; i < sdkMenuArray.length; i++) {
                    sdkMenuArray[i] = sdkMenuArray[i] + ',';

                    var topMenuId = str(sdkMenuArray[i]).between('s', 'a').toInt();
                    // s3 的情况
                    if (isNaN(topMenuId)) {
                        topMenuId = str(sdkMenuArray[i]).between('s', ',').toInt();
                        //console.log("11111111111" + topMenuId);
                        for (var j = 0; j < systemData.menus.length; j++) {
                            if (systemData.menus[j]['parent_menu_id'] == topMenuId) {
                                var topMenu = {};
                                topMenu.menu_id = systemData.menus[j]['menu_id'];
                                topMenu.menu_name = systemData.menus[j]['menu_name'];
                                topMenu.menu_url = systemData.menus[j]['menu_url'];
                                topMenu.children = [];
                                sdkMenu.children.push(topMenu);
                            }

                        }

                    }
                    else {
                        var topMenu = {};
                        var topMenuId = str(sdkMenuArray[i]).between('a', 'b').toInt();
                        if (isNaN(topMenuId)) {
                            topMenuId = str(sdkMenuArray[i]).between('a', ',').toInt();
                            for (var j = 0; j < systemData.menus.length; j++) {
                                if (systemData.menus[j]['menu_id'] == topMenuId) {
                                    topMenu.menu_id = systemData.menus[j]['menu_id'];
                                    topMenu.menu_name = systemData.menus[j]['menu_name'];
                                    topMenu.menu_url = systemData.menus[j]['menu_url'];
                                    topMenu.children = [];
                                    for (var k = 0; k < systemData.menus.length; k++) {
                                        if (systemData.menus[j]['menu_parent_id'] == topMenuId) {
                                            var secondMenu = {};
                                            secondMenu.menu_id = systemData.menus[j]['menu_id'];
                                            secondMenu.menu_name = systemData.menus[j]['menu_name'];
                                            secondMenu.menu_url = systemData.menus[j]['menu_url'];
                                            secondMenu.children = [];
                                            //console.log(topMenu)
                                            topMenu['children'].push(secondMenu);
                                        }
                                    }

                                }
                            }
                            sdkMenu.children.push(topMenu);
                        }
                        //g10003a2b206的情况
                        else {
                            var repeat = false;
                            for (var j = 0; j < systemData.menus.length; j++) {
                                if (systemData.menus[j]['menu_id'] == topMenuId) {
                                    topMenu.menu_id = systemData.menus[j]['menu_id'];
                                    topMenu.menu_name = systemData.menus[j]['menu_name'];
                                    topMenu.menu_url = systemData.menus[j]['menu_url'];
                                    topMenu.children = [];
                                    var secondMenuId = str(sdkMenuArray[i]).between('b', ',').toInt();
                                    var secondMenu = {};
                                    for (var k = 0; k < sdkMenu.children.length; k++) {
                                        if (deliveryMenu.children[k]['menu_id'] == topMenu.menu_id) {
                                            repeat = true;
                                            //console.log(oasMenuArray[i]);
                                            for (var l = 0; l < systemData.menus.length; l++) {
                                                if (systemData.menus[l]['menu_id'] == secondMenuId && systemData.menus[l]['parent_menu_id'] == topMenuId) {
                                                    secondMenu.menu_id = secondMenuId;
                                                    secondMenu.menu_name = systemData.menus[l]['menu_name'];
                                                    secondMenu.menu_url = systemData.menus[l]['menu_url'];
                                                    secondMenu.children = [];
                                                    sdkMenu.children[k].children.push(secondMenu);
                                                }
                                            }
                                        }
                                    }
                                    if (repeat == false) {
                                        for (var l = 0; l < systemData.menus.length; l++) {
                                            if (systemData.menus[l]['menu_id'] == secondMenuId && systemData.menus[l]['parent_menu_id'] == topMenuId) {
                                                secondMenu.menu_id = secondMenuId;
                                                secondMenu.menu_name = systemData.menus[l]['menu_name'];
                                                secondMenu.menu_url = systemData.menus[l]['menu_url'];
                                                secondMenu.children = [];
                                                topMenu.children.push(secondMenu);
                                            }
                                        }
                                        sdkMenu.children.push(topMenu);
                                    }
                                }
                            }
                        }

                    }
                }
                menus.push(sdkMenu);
            }
            if ('' != payChannel) {
                var payChannelArray = payChannel.split(',');
                for (var i = 0; i < payChannelArray.length; i++) {
                    payChannelArray[i] = payChannelArray[i] + ',';
                    var game_payChannel = {};
                    game_payChannel.children = {};
                    game_payChannel.children['paychannel'] = [];
                    var game_id = str(payChannelArray[i]).between('g', 'p').toInt();
                    if (isNaN(game_id)) {
                        game_id = str(payChannelArray[i]).between('g', ',').toInt();
                        for (var j = 0; j < systemData.games.length; j++) {
                            if (systemData.games[j].game_id == game_id) {
                                game_payChannel.id = game_id;
                                game_payChannel.game_name = systemData.games[j].game_name;
                                for (var l = 0; l < systemData.payChannels.length; l++) {
                                    if (systemData.payChannels[l]['game_id'] === game_id) {
                                        var payChannel = {};
                                        payChannel['channel_id'] = systemData.payChannels[l].channel_id;
                                        payChannel['channel_name'] = systemData.payChannels[l].channel_name;
                                        payChannel['real_channel_id'] = systemData.payChannels[l].channel_id;
                                        game_payChannel.children['paychannel'].push(payChannel);
                                    }
                                    var repeat = false;
                                    for (var k = 0; k < access.length; k++) {
                                        if (access[k].id === game_id) {
                                            repeat = true;
                                            access[k].children.paychannel = game_payChannel.children['paychannel'];
                                        }
                                    }
                                    if (repeat === false) {
                                        access.push(game_payChannel);
                                    }
                                }
                            }
                        }
                    } else {
                        for (var j = 0; j < systemData.games.length; j++) {
                            if (systemData.games[j].game_id == game_id) {
                                game_payChannel.id = game_id;
                                game_payChannel.game_name = systemData.games[j].game_name;
                                game_payChannel.children = {};
                                game_payChannel.children['paychannel'] = [];
                                var payChannelId = str(payChannelArray[i]).between('p', ',').toInt();
                                for (var l = 0; l < systemData.payChannels.length; l++) {
                                    if (systemData.payChannels[l]['game_id'] == game_id && systemData.payChannels[l]['channel_id'] == payChannelId) {
                                        var payChannel = {};
                                        payChannel['channel_id'] = systemData.payChannels[l].channel_id;
                                        payChannel['channel_name'] = systemData.payChannels[l].channel_name;
                                        payChannel['real_channel_id'] = systemData.payChannels[l].channel_id;
                                        game_payChannel.children['paychannel'].push(payChannel);
                                    }
                                    var repeat = false;
                                    for (var k = 0; k < access.length; k++) {
                                        if (access[k].id == game_id) {
                                            repeat = true;
                                            access[k].children.paychannel = game_payChannel.children['paychannel'];
                                        }
                                    }
                                    if (repeat == false) {
                                        access.push(game_payChannel);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if ('' != regChannel) {
                var regChannelArray = regChannel.split(',');
                var game_regChannel = {};
                game_regChannel.children = {};
                game_regChannel.children['regchannel'] = [];
                for (var i = 0; i < regChannelArray.length; i++) {
                    regChannelArray[i] = regChannelArray[i] + ',';
                    var game_id = str(regChannelArray[i]).between('g', 'r').toInt();
                    if (isNaN(game_id)) {
                        game_id = str(regChannelArray[i]).between('g', ',').toInt();
                        for (var j = 0; j < systemData.games.length; j++) {
                            if (systemData.games[j].game_id == game_id) {
                                game_regChannel.id = game_id;
                                game_regChannel.game_name = systemData.games[j].game_name;
                                for (var l = 0; l < systemData.regChannels.length; l++) {
                                    if (systemData.regChannels[l]['game_id'] == game_id) {
                                        var regChannel = {};
                                        regChannel['channel_id'] = systemData.regChannels[l].channel_id;
                                        regChannel['channel_name'] = systemData.regChannels[l].channel_name;
                                        regChannel['real_channel_id'] = systemData.regChannels[l].channel_id;
                                        game_regChannel.children['regchannel'].push(regChannel);
                                    }
                                    var repeat = false;
                                    for (var k = 0; k < access.length; k++) {
                                        if (access[k].id == game_id) {
                                            repeat = true;
                                            access[k].children.regchannel = game_regChannel.children['regchannel'];
                                        }
                                    }
                                    if (repeat == false) {
                                        access.push(game_regChannel);
                                    }
                                }
                            }
                        }
                    } else {
                        for (var j = 0; j < systemData.games.length; j++) {
                            if (systemData.games[j].game_id == game_id) {
                                game_regChannel.id = game_id;
                                game_regChannel.game_name = systemData.games[j].game_name;
                                var regChannelId = str(regChannelArray[i]).between('r', ',').toInt();
                                for (var l = 0; l < systemData.regChannels.length; l++) {
                                    if (systemData.regChannels[l]['game_id'] == game_id && systemData.regChannels[l]['channel_id'] == regChannelId) {
                                        var regChannel = {};
                                        regChannel['channel_id'] = systemData.regChannels[l].channel_id;
                                        regChannel['channel_name'] = systemData.regChannels[l].channel_name;
                                        regChannel['real_channel_id'] = systemData.regChannels[l].channel_id;
                                        game_regChannel.children['regchannel'].push(regChannel);

                                    }
                                    var repeat = false;
                                    for (var k = 0; k < access.length; k++) {
                                        if (access[k].id == game_id) {
                                            repeat = true;
                                            access[k].children.regchannel = game_regChannel.children['regchannel'];
                                        }
                                    }
                                    if (repeat == false) {
                                        access.push(game_regChannel);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if ('' != oasAgent) {
                //console.log(oasAgent);
                var gameAgentArray = oasAgent.split(',');
                for (var i = 0; i < gameAgentArray.length; i++) {
                    var game_agent = {};
                    game_agent.children = {};
                    game_agent.children['agent']=[];
                    gameAgentArray[i] = gameAgentArray[i] + ',';
                    //console.log(gameAgentArray[i]);
                    var game_id = str(gameAgentArray[i]).between('g', 'a').toInt();
                    if (isNaN(game_id)) {
                        game_id = str(gameAgentArray[i]).between('g', ',').toInt();
                        for (var j = 0; j < systemData.games.length; j++) {
                            if (systemData.games[j].game_id == game_id) {
                                game_agent.id = game_id;
                                game_agent.game_name = systemData.games[j].game_name;
                                //console.log(systemData.agents);
                                for (var l = 0; l < systemData.agents.length; l++) {
                                    if (systemData.agents[l]['agent_pid'] === 0 && systemData.agents[l]['game_id'] == game_id) {
                                        //console.log('循环次数'+l);
                                        var topAgent = {};
                                        topAgent.agent_id = systemData.agents[l].agent_id;
                                        topAgent.agent_name = systemData.agents[l].agent_name;
                                        topAgent.children = [];
                                        for (var m = 0; m < systemData.agents.length; m++) {
                                            var parentAgent = {};
                                            if (systemData.agents[m]['agent_pid'] === topAgent.agent_id && systemData.agents[m]['game_id'] == game_id) {
                                                parentAgent.agent_id = systemData.agents[m].agent_id;
                                                parentAgent.agent_name = systemData.agents[m].agent_name;
                                                parentAgent.children = [];
                                                for (var n = 0; n < systemData.agents.length; n++) {
                                                    var childAgent = {};
                                                    if (systemData.agents[n]['agent_pid'] === parentAgent.agent_id && systemData.agents[n]['game_id'] == game_id) {
                                                        childAgent.agent_id = systemData.agents[n].agent_id;
                                                        childAgent.agent_name = systemData.agents[n].agent_name;
                                                        parentAgent.children.push(childAgent);
                                                    }
                                                }
                                                topAgent.children.push(parentAgent);

                                            }
                                        }
                                        game_agent.children['agent'].push(topAgent);
                                    }
                                }
                                //
                                var repeat1 = false;
                                for (var index = 0; index < access.length; index++) {
                                    if (access[index].id === game_id ) {
                                        repeat1 = true;
                                        access[index].children.agent = game_agent.children['agent'];
                                    }
                                }
                                if (repeat1 === false) {
                                    access.push(game_agent);
                                }
                            }
                        }
                    } else {
                        for (var j = 0; j < systemData.games.length; j++) {
                            if (systemData.games[j].game_id == game_id) {
                                game_agent.id = game_id;
                                game_agent.game_name = systemData.games[j].game_name;
                                var topAgentId = str(gameAgentArray[i]).between('a', 'b').toInt();
                                var topAgent = {};
                                if (isNaN(topAgentId)) {
                                    topAgentId = str(gameAgentArray[i]).between('a', ',').toInt();
                                    for (var k = 0; k < systemData.agents.length; k++) {
                                        if (systemData.agents[k].game_id == game_id && systemData.agents[k].agent_id == topAgentId) {
                                            topAgent.agent_id = topAgentId;
                                            topAgent.agent_name = systemData.agents[k].agent_name;
                                            topAgent.children = [];
                                            for (var m = 0; m < systemData.agents.length; m++) {
                                                if (systemData.agents[m]['agent_pid'] === topAgent.agent_id && systemData.agents[m]['game_id'] == game_id) {
                                                    var parentAgent = {};
                                                    parentAgent.agent_id = systemData.agents[m].agent_id;
                                                    parentAgent.agent_name = systemData.agents[m].agent_name;
                                                    parentAgent.children = [];
                                                    for (var n = 0; n < systemData.agents.length; n++) {
                                                        var childAgent = {};
                                                        if (systemData.agents[n]['agent_pid'] === parentAgent.agent_id && systemData.agents[n]['game_id'] == game_id) {
                                                            childAgent.agent_id = systemData.agents[n].agent_id;
                                                            childAgent.agent_name = systemData.agents[n].agent_name;
                                                            parentAgent.children.push(childAgent);
                                                        }
                                                    }
                                                    topAgent.children.push(parentAgent);
                                                }
                                            }
                                        }
                                    }
                                    game_agent.children['agent'].push(topAgent);
                                } else {
                                    for (var k = 0; k < systemData.agents.length; k++) {
                                        if (systemData.agents[k].game_id == game_id && systemData.agents[k].agent_id == topAgentId) {
                                            topAgent.agent_id = topAgentId;
                                            topAgent.agent_name = systemData.agents[k].agent_name;
                                            topAgent.children = [];
                                            var parentAgentId = str(gameAgentArray[i]).between('b', ',').toInt();
                                            for (var m = 0; m < systemData.agents.length; m++) {
                                                if (systemData.agents[m]['agent_pid'] === topAgent.agent_id && systemData.agents[m]['game_id'] === game_id && systemData.agents[m]['agent_id']==parentAgentId ) {
                                                    var parentAgent = {};
                                                    parentAgent.agent_id = systemData.agents[m].agent_id;
                                                    parentAgent.agent_name = systemData.agents[m].agent_name;
                                                    parentAgent.children = [];
                                                    for (var n = 0; n < systemData.agents.length; n++) {
                                                        var childAgent = {};
                                                        if (systemData.agents[n]['agent_pid'] === parentAgent.agent_id && systemData.agents[n]['game_id'] == game_id) {
                                                            childAgent.agent_id = systemData.agents[n].agent_id;
                                                            childAgent.agent_name = systemData.agents[n].agent_name;
                                                            parentAgent.children.push(childAgent);
                                                        }
                                                    }
                                                    topAgent.children.push(parentAgent);
                                                }
                                            }
                                            var repeat = false;
                                            for (var a = 0; a < game_agent.children['agent'].length; a++) {
                                                if (game_agent.children['agent'][a].agent_id === topAgentId && game_agent.id === game_id) {
                                                    repeat = true;
                                                    game_agent.children['agent'][a].children = topAgent.children;
                                                }
                                            }
                                            if (repeat === false) {
                                                game_agent.children['agent'].push(topAgent);
                                            }
                                        }
                                    }
                                }
                                var repeat2 = false;
                                for (var index2 = 0; index2 < access.length; index2++) {
                                    if (access[index2].id === game_id ) {
                                        repeat2 = true;
                                        access[index2].children.agent = game_agent.children['agent'];
                                    }
                                }
                                if (repeat2 == false) {
                                    access.push(game_agent);
                                }
                            }
                        }
                    }
                }
            }
        }
        );
        //console.log(menus[0].children);
        if (menus == [] || menus.length == 0) {
            res.end(resDataUtil.error('failed', 'sorry，当前帐号没有任何菜单权限！'));
        } else{
            var data=rf.readFileSync('./src/config/userNameFilterConfig.js',"utf-8");
            console.log(data);
            console.log(data.toString());
            console.log("READ FILE SYNC END");
            var userNameStr=data.toString();
            var index = userNameStr.indexOf(userName);
            console.log('---'+userNameStr+'---'+index);
            if(index >= 0){
                console.log('---1---'+index);
                menus = menuFilter(menus);
            }else{
                console.log('---2---'+index);
            }


            menus=[
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
                        },  {
                            "menu_id": 213,
                            "menu_name": "新用户注收比",
                            "menu_url": "app.newUserRegIncomeRate",
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
                },
                {
                    "menu_id": 4,
                    "menu_name": "7道投放",
                    "menu_url": null,
                    "children": [
                        {
                            "menu_id": 401,
                            "menu_name": "推广分析明细",
                            "menu_url": "app.PromotionDetail",
                            "children": []
                        },
                        {
                            "menu_id": 402,
                            "menu_name": "推广分析汇总",
                            "menu_url": "app.PromotionTotal",
                            "children": []
                        },
                        {
                            "menu_id": 403,
                            "menu_name": "实时查看",
                            "menu_url": "app.StillLook",
                            "children": []
                        },
                        {
                            "menu_id": 404,
                            "menu_name": "用户留存",
                            "menu_url": "app.UserRetain",
                            "children": []
                        },
                        {
                            "menu_id": 405,
                            "menu_name": "费用管理",
                            "menu_url": "app.CostManage",
                            "children": []
                        }
                    ]
                }
            ];
            req.session.set('username', userName);
            req.session.set('menuAccess', getAccessMenuIds(menus));
            res.end(resDataUtil.success({access: access, menus: sortMenus(menus)}));
        }
//res.end(resDataUtil.success(menus));
    }
    function getAccessAgentIds(json) {
        var gamesAccess = json.result;
        var arr = [];
        for (var i = 0; i < gamesAccess.length; i++) {
            arr.push(gamesAccess.children.agent);
        }
    }

    function getAccessMenuIds(menus) {
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

        for (var i = 0; i < menus.length; i++) {
            var temp = menus[i];
            if (temp.menu_url) {
                menuIDs.push(temp.menu_id);
            }
            getId(temp);
        }
        return menuIDs.join(',');
    }

    var sortMenus = function (menus) {
        //console.log(menus);
        function sortNumber(a, b) {
            return a.menu_id - b.menu_id;
        }
        for (var i = 0; i < menus.length; i++) {
            //console.log(menus[i].children);
            if(menus[i].children != undefined) {
                menus[i].children.sort(sortNumber);
            }
        }
        return menus;
    }

    var menuFilter = function(menus){
        for(var i=0;i<menus.length;i++){
            if(menus[i].menu_id ===2 && menus[i].children != undefined){
                for(var j=0;j<menus[i].children.length;j++){
                    //if(menus[i].children[j].menu_name == '五力模型'){
                    //    menus[i].children[j].menu_url = 'app.fiveForcesModel'
                    //}
                    console.log('-----'+menus[i].children[j].menu_name);
                    switch (menus[i].children[j].menu_name){
                        case '五力模型':
                            menus[i].children[j].menu_url = 'app.fiveForcesModel';
                            break;
                        case '五分钟视图':
                            menus[i].children[j].menu_url ='app.oas5MinData';
                            break;
                        case '登录比':
                            menus[i].children[j].menu_url ='app.loginRate';
                            break;
                        default :
                            break;
                    }
                }
            }
        }
        return menus;
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
        getUserAccess: getUserAccess,
        setCookie: setCookie
    }
    module.exports = API;