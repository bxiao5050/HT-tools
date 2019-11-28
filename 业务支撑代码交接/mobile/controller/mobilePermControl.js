/**
 * Created by jishan.fan on 2016/8/9.
 */
"use strict";
var dbUtil = require('../utils/dbUtil');
/**
 * 根据系统ID获取系统信息
 * @param system_id 系统Id
 * **/
var getSystem = function (system_id, callback) {
    var sql = 'select system_id,description from sc_oas_db_mobile.t_oas_system where system_id =' + system_id;
    dbUtil.execSQL(sql, []).then(function (data) {
        var system = {};
        system.id = data.result[0].system_id;
        system.key = 's' + data.result[0].system_id;
        system.title = data.result[0].description
        callback(null, system);
    }).catch(function (err) {
        console.error('获取系统信息失败,err:' + err.message);
    });
}
/**
 * 根据系统ID获取系统下游戏信息
 * @param system 系统信息
 * **/
var getSystemGame = function (system, callback) {
    var sql = 'select a.id,game_id,game_name from sc_oas_db_mobile.t_oas_system_game a left join sc_oas_db_mobile.t_oas_game b ' +
        'on a.game_id =b.id where a.system_id =' + system.id + ' order by a.sort';
    dbUtil.execSQL(sql, []).then(function (data) {
        system.children = [];
        for (var i = 0; i < data.result.length; i++) {
            //console.log(data.result[i]);
            var game = {};
            game.id = data.result[i].id;
            game.key = system.key + 'g' + data.result[i].game_id;
            game.title = data.result[i].game_name;
            game.children = [];
            system.children.push(game);
        }
        callback(null, system);
    }).catch(function (err) {
        console.error('获取系统下游戏信息失败,err:' + err);
    })
}
/**
 * 根据系统ID获取系统下菜单信息
 * @param system_id 系统ID
 * **/
var getSystemMenu = function (system, callback) {
    var sql = 'select * from sc_oas_db_mobile.t_oas_system_menu a left join sc_oas_db_mobile.t_oas_menu b on a.menu_id = b.id where system_id ='+system.id;
    system.children = [];
    dbUtil.execSQL(sql, [])
        .then(function (data) {
            for (var i = 0; i < data.result.length; i++) {
                var tempData = data.result[i];
                if (tempData['parent_menu_id'] === 0) {
                    var topMenu = {};
                    topMenu.id = tempData.id;
                    topMenu.key = system.key + 'a' + tempData.id;
                    topMenu.title = tempData.menu_name;
                    var secondMenus = [];
                    for (var j = 0; j < data.result.length; j++) {
                        var tempData2 = data.result[j];
                        if (tempData2['parent_menu_id'] == tempData.id) {
                            var secondMenu = {};
                            secondMenu.id = tempData2.id;
                            secondMenu.key = topMenu.key + 'b' + tempData2.id;
                            secondMenu.title = tempData2.menu_name;
                            secondMenu.children = [];
                            for(var k = 0; k< data.result.length; k++){
                                var tempData3 = data.result[k];
                                if(tempData3['parent_menu_id'] === tempData2.id){
                                    var grandsonMenu = {};
                                    grandsonMenu.id =tempData3.id;
                                    grandsonMenu.key = secondMenu.key+'c' + tempData3.id
                                    grandsonMenu.title = tempData3.menu_name;
                                    secondMenu.children.push(grandsonMenu);
                                }
                            }
                            //console.log(secondMenu);
                            secondMenus.push(secondMenu);
                        }
                        if (j == data.result.length - 1) {
                            topMenu.children = secondMenus;
                        }
                    }
                    system.children.push(topMenu);
                }
                if (i == data.result.length - 1) {
                    callback(null, system);
                }
            }
        }).catch(function (err) {
            console.error('获取系统菜单列表失败,错误：' + err);
        });
}
/**根据游戏ID获取游戏下菜单信息**/
var getGameMenu = function (system, callback) {
    var sql = 'select game_id,menu_id,menu_name,parent_menu_id from sc_oas_db_mobile.t_oas_system_game_menu a ' +
        'join sc_oas_db_mobile.t_oas_menu b on a.menu_id=b.id and b.menu_status=1 order by game_id,menu_id ';
    dbUtil.execSQL(sql, []).then(function (data) {
        var menus = data.result;
        //获取顶级菜单
        for (var index in menus) {
            if (menus[index].parent_menu_id === 0) {
                for (var i = 0; i < system.children.length; i++) {
                    if (system.children[i].id === menus[index].game_id) {
                        system.children[i].children=[];
                        var topMenu = {};
                        topMenu.id = menus[index].menu_id;
                        topMenu.key = system.children[i].key + 'a' + menus[index].menu_id;
                        topMenu.title = menus[index].menu_name;
                        topMenu.children = [];
                        for (var index2 in menus) {
                            if (menus[index2].parent_menu_id === topMenu.id && menus[index2].game_id === menus[index].game_id) {
                                var sonMenu = {};
                                sonMenu.id = menus[index2].menu_id;
                                sonMenu.key = topMenu.key + 'b' + menus[index2].menu_id;
                                sonMenu.title = menus[index2].menu_name;
                                topMenu.children.push(sonMenu);
                            }
                        }
                        system.children[i].children.push(topMenu);
                    }
                }
            }
        }
        callback(null, system);
    }).catch(function (err) {
        console.error('获取游戏下菜单列表失败,错误：' + err);
    })

}
/**
 * 根据游戏ID获取游戏代理商信息
 * **/
var getGameAgent = function (system, callback) {
    var sql = 'select app_id as game_id,agent_id,agent_name,agent_pid from(' +
        'select distinct b.id as app_id,region_id as agent_id,region_name as agent_name,0 as agent_pid from sc_oas_db_mobile.v_c_game_zone a' +
        ' join sc_oas_db_mobile.t_oas_system_game b on a.app_id =b.game_id and b.system_id ='+system.id+' where game_zone_status =1 ' +
        ' union all ' +
        'select distinct b.id as app_id,agent_id,agent_name ,region_id as agent_pid from sc_oas_db_mobile.v_c_game_zone a' +
        ' join sc_oas_db_mobile.t_oas_system_game b on a.app_id =b.game_id and b.system_id ='+system.id+' where game_zone_status =1 )f order by app_id,agent_id';
    dbUtil.execSQL(sql, []).then(function (data) {
        var agents = data.result;
        //获取顶级代理商
        for (var index in agents) {
            if (agents[index].agent_pid === 0) {
                for (var i = 0; i < system.children.length; i++) {
                    if (agents[index].game_id === system.children[i].id) {
                        var topAgent = {};
                        topAgent.id = agents[index].agent_id;
                        topAgent.key = system.children[i].key + 'a' + topAgent.id;
                        topAgent.title = agents[index].agent_name;
                        topAgent.children = [];
                        for (var index2 in agents) {
                            if (agents[index2].game_id === agents[index].game_id && agents[index2].agent_pid === topAgent.id) {
                                var sonAgent = {};
                                sonAgent.id = agents[index2].agent_id;
                                sonAgent.key = topAgent.key + 'b' + sonAgent.id;
                                sonAgent.title = agents[index2].agent_name;
                                topAgent.children.push(sonAgent);
                            }
                        }
                        system.children[i].children.push(topAgent);
                    }
                }
            }
        }
        callback(null, system);
    }).catch(function (err) {
        console.error('获取游戏下代理商失败,错误：' + err);
    })
}
/**
 * 根据游戏ID获取游戏注册渠道信息
 * **/
var getGameRegChannel = function (system,callback) {
    var sql = 'select distinct b.id as game_id,channel_id,channel_name from sc_oas_db_mobile.v_c_channel a' +
        ' join sc_oas_db_mobile.t_oas_system_game b on a.game_id =b.game_id and b.system_id ='+system.id +'order by channel_id'
    dbUtil.execSQL(sql,[]).then(function(data){
        var regChannels = data.result;
        for(var index in regChannels){
            for(var i = 0;i<system.children.length;i++){
                if(regChannels[index].game_id === system.children[i].id){
                    var regChannel = {};
                    regChannel.id = regChannels[index].channel_id;
                    regChannel.key = system.children[i].key + 'a' + regChannels[index].channel_id;
                    regChannel.title = regChannels[index].channel_name;
                    system.children[i].children.push(regChannel);
                }
            }
        }
        callback(null, system);
    }).catch(function(err){
        console.err('获取自研业务分析游戏注册渠道失败,err:'+err);
    })
}
/**
 * 根据游戏ID获取游戏付费渠道信息
 * **/
var getGamePayChannel = function (system,callback) {
    var sql = 'select c.id as game_id,b.channel_id,b.channel_name from sc_oas_db.t_oas_game_paychannel a ' +
        'join sc_oas_db.t_oas_paychannel b on a.channel_id=b.id ' +
        'join sc_oas_db_mobile.t_oas_system_game c on a.game_id =c.game_id and c.system_id ='+system.id
        + 'order by c.id,channel_sort ';
    dbUtil.execSQL(sql, []).then(function (data) {
        for (var index in data.result)
            for (var i = 0; i < system.children.length; i++) {
                var tempData = data.result[index];
                var payChannel = {};
                payChannel.id = tempData.channel_id;
                payChannel.key = system.children[i].key + 'a' + tempData.channel_id;
                payChannel.title = tempData.channel_name;
                //payChannel.children = [];
                if (tempData.game_id === system.children[i].id) {
                    system.children[i].children.push(payChannel);
                }
            }
        callback(null, system);
    }).catch(function (err) {
        console.error('获取自研业务分析游戏付费渠道失败,err：' + err);
    });
}
/**
 * 根据游戏ID获取渠道信息（针对海外发行业务）
 * **/
var getGameChannel = function (system,callback) {
    var sql ='select b.id as game_id,channel_id,channel_name,channel_pid from(' +
        'select  distinct game_id,channel_id,channel_name,-200 as channel_pid from sc_game_public_conf.t_c_channel a ' +
        ' union ALL ' +
        'select distinct game_id,sub_channel_id as channel_id,sub_channel_name as chnanel_name,channel_id as channel_pid' +
        ' from sc_game_public_conf.t_c_channel union ALL ' +
        'select distinct game_id,package_id as channel_id,package_name as chnanel_name,sub_channel_id as channel_pid ' +
        'from sc_game_public_conf.t_c_channel)f' +
        ' join sc_oas_db_mobile.t_oas_system_game b on f.game_id =b.game_id and b.system_id ='+system.id +' order by id,channel_pid';
    console.log(sql);
    dbUtil.execSQL(sql,[]).then(function(data){
        var channels = data.result;
        for(var index in channels){
            if(channels[index].channel_pid === -200){
                for(var i = 0;i<system.children.length;i++) {
                    if (channels[index].game_id === system.children[i].id) {
                        var parentChannel = {};
                        parentChannel.id = channels[index].channel_id;
                        parentChannel.key = system.children[i].key +'a'+ parentChannel.id;
                        parentChannel.title = channels[index].channel_name;
                        parentChannel.children = [];
                        for (var index2 in channels) {
                            if (channels[index2].game_id === channels[index].game_id && channels[index2].channel_pid === parentChannel.id) {
                                var sonChannel = {};
                                sonChannel.id = channels[index2].channel_id;
                                sonChannel.key =parentChannel.key+'b'+channels[index2].channel_id;
                                sonChannel.title = channels[index2].channel_name;
                                sonChannel.children = [];
                                for (var index3 in channels) {
                                    if (channels[index3].game_id === channels[index2].game_id && channels[index3].channel_pid === sonChannel.id) {
                                        var grandsonChannel = {};
                                        grandsonChannel.id = channels[index3].channel_id;
                                        grandsonChannel.key = sonChannel.key +'c'+channels[index3].channel_id;
                                        grandsonChannel.title = channels[index3].channel_name;
                                        //grandsonChannel.children = [];
                                        sonChannel.children.push(grandsonChannel);
                                    }
                                }
                                parentChannel.children.push(sonChannel);
                            }
                        }
                        //console.log(parentChannel);
                        system.children[i].children.push(parentChannel);
                    }
                }
            }
        }
        callback(null,system);
    }).catch(function(err){
        console.error('获取海外发行业务游戏渠道失败,err:'+err);
    })
}
/**
 * 根据游戏ID获取游戏代理商信息
 * **/
var getH5GameAgent = function (system, callback) {
    var sql = 'select app_id as game_id,agent_id,agent_name,agent_pid from(  '+
    ' select distinct b.id as app_id,game_zone_id agent_id,game_zone_name agent_name,0 as agent_pid from sc_oas_db_mobile.v_c_game_zone a '+
    ' join sc_oas_db_mobile.t_oas_system_game b on a.app_id =b.game_id and b.system_id ='+system.id+' where game_zone_status =1 ' +
    ' )f order by app_id,agent_id;';

    dbUtil.execSQL(sql, []).then(function (data) {
        var agents = data.result;
        //获取顶级代理商
        for (var index in agents) {
            if (agents[index].agent_pid === 0) {
                for (var i = 0; i < system.children.length; i++) {
                    if (agents[index].game_id === system.children[i].id) {
                        var topAgent = {};
                        topAgent.id = agents[index].agent_id;
                        topAgent.key =  system.children[i].key + 'a-1b-2c' + topAgent.id;
                        topAgent.title = agents[index].agent_name;
                        system.children[i].children.push(topAgent);
                    }
                }
            }
        }

        callback(null, system);
    }).catch(function (err) {
        console.error('获取H5游戏下代理商失败,错误：' + err);
    })
}
var getH5GameChannel = function (system, callback) {
    var sql = 'select app_id as game_id,channel_id,channel_name,channel_pid from( '+
        'select distinct b.id as app_id,channel_id,channel_name,0 as channel_pid from "sc_game_foreign_data_mobile".t_p_user_channel a '+
        ' cross join (select * from sc_oas_db_mobile.t_oas_system_game where system_id = '+system.id+') b '+
        ' )f order by app_id,channel_id;';

    dbUtil.execSQL(sql, []).then(function (data) {
        var channels = data.result;
        //获取顶级代理商
        for (var index in channels) {
            if (channels[index].channel_pid === 0) {
                for (var i = 0; i < system.children.length; i++) {
                    if (channels[index].game_id === system.children[i].id) {
                        var topChanel = {};
                        topChanel.id = channels[index].channel_id;
                        topChanel.key =  system.children[i].key + 'a-1b-2c' + topChanel.id;
                        topChanel.title = channels[index].channel_name;

                        system.children[i].children.push(topChanel);
                    }
                }
            }
        }

        callback(null, system);
    }).catch(function (err) {
        console.error('获取H5游戏下渠道失败,错误：' + err);
    })
}
var mobilePermControl = {
    getSystem: getSystem,
    getSystemGame: getSystemGame,
    getSystemMenu: getSystemMenu,
    getGameMenu: getGameMenu,
    getGameAgent :getGameAgent,
    getGameRegChannel : getGameRegChannel,
    getGamePayChannel : getGamePayChannel,
    getGameChannel : getGameChannel,
    getH5GameAgent:getH5GameAgent,
    getH5GameChannel:getH5GameChannel
};

module.exports = mobilePermControl;
