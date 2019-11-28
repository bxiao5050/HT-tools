/**
 * Created by linlin.zhang on 2017/2/20.
 */


var dbUtil = require('../utils/dbUtil');
var cacheUtil = require('../utils/cacheUtil')
var arrayUtil = require('../utils/arrayUtil')
var when = require('when');
var getGames = function(){
    var deffed = when.defer();
    var gameSql = "select game_id,game_name from monitor_system.t_e_game where `status` = 1 order by game_sort";
    dbUtil.execMySQL(gameSql,[]).then(function (gams) {
        return deffed.resolve(gams);
    });
    return deffed.promise;
}
var getMenus = function () {
    var deffed = when.defer();
    var menuSql = "select menu_id,menu_name,parent_menu from monitor_system.t_e_menu where `status` = 1 order by menu_sort";
    dbUtil.execMySQL(menuSql,[]).then(function (menus) {
        var parentMenus = arrayUtil.grep(menus,function (item) {
           return item.parent_menu == 0;
        },function (oldItem) {
            return {
                id:oldItem.menu_id,
                title:oldItem.menu_name,
                key:'a'+oldItem.menu_id
            };
        });
        parentMenus.forEach(function (menu) {
            menu.children = arrayUtil.grep(menus,function (item) {
                return item.parent_menu == menu.id
            },function (oldItem) {
                return {
                    id:oldItem.menu_id,
                    title:oldItem.menu_name,
                    key:menu.key+'b'+oldItem.menu_id
                };
            });
        })
        return deffed.resolve(parentMenus);
    });
    return deffed.promise;
}
var getAgents = function () {
    var deffed = when.defer();
    getGames().then(function (games) {
        var agentList = [];
        games.forEach(function (game) {
            agentList.push(cacheUtil.getMonitorGameAgent(game));
            when.all(agentList).then(function (agents) {
                deffed.resolve(agents);
            });
        })
    });
    return deffed.promise;
}

var getSystems = function () {
   return cacheUtil.getMonitorSystem();
}
module.exports = {
    getMonitorAgentPerm:getAgents,
    getMonitorSystemPerm:getSystems,
    getMonitorMenuPerm:getMenus
};