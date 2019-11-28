/**
 * Created by linlin.zhang on 2016/9/22.
 */
var permUtil = require('./permUtil');
var arrayUtil =  require('./ArrayUtil');
var when = require('when');

var appendConfigValue = function(system){
    //系统
    system.config_value = permUtil.getProfix(system.node_type) + system.node_id;
    //游戏
    system.systemGames.forEach(function(game){
        permUtil.appendLevelConfigValue(game,game.menus,system.config_value);
        permUtil.appendLevelConfigValue(game,game.regChannels,system.config_value);
        permUtil.appendLevelConfigValue(game,game.agents,system.config_value);
        permUtil.appendLevelConfigValue(game,game.payChannels,system.config_value);
    });

    return system;
}
var getPermTree = function(system,permlist){
    permlist.forEach(function(perm){
        //菜单
        if(perm.config_item_name == 'mobile_oas_menu'){
            perm.config_item_value.forEach(function(permItem){
                if(system.config_value == permItem) {
                    system.systemGames.forEach(function (game) {
                        game.menus.forEach(function (menu) {
                            permUtil.checkNodes(menu, true, permItem, [system, game]);
                        })
                    });
                }
                else {

                    system.systemGames.forEach(function (game) {
                        if(game.config_value == permItem)
                            game.menus.forEach(function (menu) {
                                permUtil.checkNodes(menu, true, permItem, [system, game]);
                            });
                        else
                            game.menus.forEach(function (menu) {
                                permUtil.checkNodes(menu, false, permItem, [system, game]);
                            })
                    });
                }
            })

        }//区服
        else if(perm.config_item_name == 'mobile_oas_agent'){

            perm.config_item_value.forEach(function(permItem){
                if(system.config_value == permItem) {
                    system.systemGames.forEach(function (game) {
                        game.agents.forEach(function (menu) {
                            permUtil.checkNodes(menu, true, permItem, [system, game]);
                        })
                    });
                }
                else {
                    system.systemGames.forEach(function (game) {
                        if(game.config_value == permItem)
                            game.agents.forEach(function (agent) {
                                permUtil.checkNodes(agent, true, permItem, [system, game]);
                            });
                        else
                            game.agents.forEach(function (agent) {
                                if(agent.config_value == permItem)
                                    permUtil.checkNodes(agent, true, permItem, [system, game]);
                                else
                                    permUtil.checkNodes(agent, false, permItem, [system, game]);
                            })
                    });
                }
            })
        }
        //注册渠道
        else if(perm.config_item_name == 'mobile_oas_regChannel'){
            perm.config_item_value.forEach(function(permItem){
                if(system.config_value == permItem) {
                    system.systemGames.forEach(function (game) {
                        game.regChannels.forEach(function (channel) {
                            permUtil.checkNodes(channel, true, permItem, [system, game]);
                        })
                    });
                }
                else {
                    system.systemGames.forEach(function (game) {
                        if(game.config_value == permItem)
                            game.regChannels.forEach(function (channel) {
                                permUtil.checkNodes(channel, true, permItem, [system, game]);
                            });
                        else
                            game.regChannels.forEach(function (channel) {
                                if(channel.config_value == permItem)
                                    permUtil.checkNodes(channel, true, permItem, [system, game]);
                                else
                                     permUtil.checkNodes(channel, false, permItem, [system, game]);
                            });
                    });
                }
            })
        }
        //付费渠道
        else if(perm.config_item_name == 'mobile_oas_payChannel'){
            perm.config_item_value.forEach(function(permItem){
                if(system.config_value == permItem) {
                    system.systemGames.forEach(function (game) {
                        game.payChannels.forEach(function (channel) {
                            permUtil.checkNodes(channel, true, permItem, [system, game]);
                        })
                    });
                }
                else {
                    system.systemGames.forEach(function (game) {
                        if(game.config_value == permItem)
                            game.payChannels.forEach(function (channel) {
                                permUtil.checkNodes(channel, true, permItem, [system, game]);
                            });
                        else
                            game.payChannels.forEach(function (channel) {
                                if(channel.config_value == permItem)
                                    permUtil.checkNodes(channel, true, permItem, [system, game]);
                                else
                                    permUtil.checkNodes(channel, false, permItem, [system, game]);
                            });
                    });
                }
            })
        }
    });
}
var filtPermTree = function(system){
    if(system.checked){
        system.systemGames = arrayUtil.grep(system.systemGames,function(ele){ return ele.checked;});
        for(var i = 0;i<system.systemGames.length;i++){

            var game = system.systemGames[i];
            game.system_id = system.node_id;
                game.menus = arrayUtil.grep(game.menus,function(ele){ return ele.checked;});
                game.menus.forEach(function(menu){
                    permUtil.filtNodes(menu);
                });
                game.regChannels = arrayUtil.grep(game.regChannels,function(ele){ return ele.checked;});
                game.regChannels.forEach(function(channel){
                    permUtil.filtNodes(channel);
                });
                game.payChannels = arrayUtil.grep(game.payChannels,function(ele){ return ele.checked;});
                game.payChannels.forEach(function(channel){
                    permUtil.filtNodes(channel);
                });
                game.agents = arrayUtil.grep(game.agents,function(ele){ return ele.checked;});
                game.agents.forEach(function(agent){
                    permUtil.filtNodes(agent);
                });
                permUtil.changedNodeInfo(game);
        }
        permUtil.changedNodeInfo(system);
    } else system = [];
}
module.exports = {
    appendConfigValue:appendConfigValue,
    getPermTree:getPermTree,
    filtPermTree:filtPermTree
}