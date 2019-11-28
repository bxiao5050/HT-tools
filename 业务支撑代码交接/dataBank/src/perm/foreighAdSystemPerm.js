/**
 * Created by linlin.zhang on 2016/9/26.
 */
var permUtil = require('./permUtil');
var arrayUtil =  require('./ArrayUtil');
var when = require('when');

var appendConfigValue = function(system){
    //系统
    //system.config_value = permUtil.getProfix(system.node_type) + system.node_id;
    //游戏
    permUtil.appendLevelConfigValue(system,system.menus,'');
    return system;
}
var getPermTree = function(system,permlist){
    permlist.forEach(function(perm){
        //菜单
        if(perm.config_item_name == 'mobile_ad_menu'){
            perm.config_item_value.forEach(function(permItem){
                if(system.config_value == permItem) {
                    system.menus.forEach(function (menu) {
                            permUtil.checkNodes(menu, true, permItem, [system]);
                        })
                }
                else {

                    system.menus.forEach(function (menu) {
                        if(menu.config_value == permItem)
                            permUtil.checkNodes(menu, true, permItem, [system]);
                        else
                            permUtil.checkNodes(menu, false, permItem, [system]);
                    })
                }
            })

        }
    });
}
var filtPermTree = function(system){
    if(system.checked){
        system.menus = arrayUtil.grep(system.menus,function(ele){ return ele.checked;});
        system.menus.forEach(function(menu){
                permUtil.filtNodes(menu);
            });
        permUtil.changedNodeInfo(system);
    } else system = [];
}
module.exports = {
    appendConfigValue:appendConfigValue,
    getPermTree:getPermTree,
    filtPermTree:filtPermTree
}