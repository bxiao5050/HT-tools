/**
 * Created by linlin.zhang on 2016/9/22.
 */
var arrayUtil = require('./ArrayUtil');
var permUtil = {
    getProfix: function (type) {
        switch (type) {
            case 'system':
                return 's';
            case 'game':
                return 'g';
            case 'agent':
            case 'menu':
            case 'pay_channel':
            case 'reg_channel':
                return 'a';
            case 'second_agent':
            case 'second_menu':
            case 'reg_second_channel':
                return 'b';
            case 'third_agent':
            case 'third_menu':
            case 'reg_third_channel':
                return 'c';
        }
    },
    changedNodeInfo: function (node) {
        //菜单
        if (node.node_type == 'menu' || node.node_type == 'second_menu' || node.node_typ == 'third_menu') {
            node.menu_id = node.node_id;
            node.menu_name = node.node_name;
            node.menu_url = node.node_info.indexOf(".")< 0?'':node.node_info;
        }
        //区服
        else if (node.node_type == 'agent' || node.node_type == 'second_agent' || node.node_type == 'third_agent') {
            node.agent_id = node.node_id;
            node.agent_name = node.node_name;
            node.agent_pid = node.parent_id;;

        }
        //注册渠道
        else if (node.node_type == 'reg_channel' || node.node_type == 'reg_second_channel'||node.node_type == 'reg_third_channel') {
            node.channel_id = node.node_id;
            node.channel_name = node.node_name;
        }
        //pay_channel
        else if (node.node_type == 'pay_channel') {
            node.channel_id = node.node_id;
            node.channel_name = node.node_name;
            node.channel_pid = node.parent_id;
        }
        //系统
        else if (node.node_type == 'system') {
            node.system_id = node.node_id;
            node.system_name = node.node_name;
        }
        //游戏
        else if (node.node_type == 'game') {
            node.game_id = node.node_id;
            node.id =  node.node_id;;
            node.sort =  node.node_id;
            node.game_name = node.node_name;
            node.system_id = node.parent_id;
        }
        delete node.node_id;
        delete node.node_name;
        delete node.node_info;
        delete node.node_type;
        delete node.config_value;
        delete node.parent_id;
    },
    getPermList: function (permlist, permName) {
        var OASystemPermName = permName;
        var permArr = [];
        arrayUtil.grep(permlist,
            function (ele) {
                return arrayUtil.contain(OASystemPermName, ele.config_item_name);
            }).forEach(function (perm) {
                //合并权限信息并去重
                var permItem = null;
                if (arrayUtil.contain(OASystemPermName, perm.config_item_name))
                    permItem = arrayUtil.get(permArr, function (ele) {
                        return ele.config_item_name == perm.config_item_name;
                    });
                if (permItem == null) {
                    permItem = {
                        config_item_name: perm.config_item_name,
                        config_item_value: perm.config_item_value.split(',')
                    };
                    permArr.push(permItem);
                }
                else arrayUtil.uniquePush(permItem.config_item_value, perm.config_item_value.split(','));
            });
        return permArr;
    },
    getLevel: function (permlist, levellist) {
        var levelData = [];
        //数据筛选
        for (var i = 0; i < levellist.length; i++) {
            levelData.push(arrayUtil.grep(permlist, function (li) {
                if (li.node_type == levellist[i]) return true;
                else return false;
            }));
        }
        //结构构造
        for (var i = levellist.length - 1; i > 0; i--) {
            levelData[i - 1].forEach(function (ele) {
                ele.children = [];
                for (var j = 0; j < levelData[i].length; j++) {
                    if (ele.node_id == levelData[i][j].parent_id) {
                        ele.children.push(levelData[i][j]);
                    }
                }
            });
        }
        if (levelData[0])
            return levelData[0];
        else return [];
    },
    getMenuLevel:function(channels,level_item_name){
    var channelData = [],nodeType = 0,nodeId;
    for(var i = 0;i<level_item_name.length;i++) {
        channelData.push(arrayUtil.grep(channels, function (channel) {
            return channel.node_type == level_item_name[i];
        }));
    }
    for (var i = channelData.length - 1; i > 0; i--) {
        channelData[i-1].forEach(function (ele) {
            ele.children = [];
            nodeType = ele.node_info.indexOf(".");
            if(nodeType >= 0){
                //url
                nodeId = ele.node_id
            }else{
                //node_id
                nodeId = ele.node_info;
            }
            for (var j = 0; j < channelData[i].length; j++) {
                if (nodeId == channelData[i][j].parent_id) {
                    ele.children.push(channelData[i][j]);
                }
            }
        });
    }
    if(channelData[0])
        return channelData[0];
    else return [];
},
    getGameLevel : function(channels,level_item_name){
        var channelData = [];
        for(var i = 0;i<level_item_name.length;i++) {
            channelData.push(arrayUtil.grep(channels, function (channel) {
                return channel.node_type == level_item_name[i];
            }));
        }
        for (var i = channelData.length - 1; i > 0; i--) {
            channelData[i-1].forEach(function (ele) {
                ele.children = [];
                for (var j = 0; j < channelData[i].length; j++) {
                    if (ele.node_id == channelData[i][j].parent_id && channelData[i][j].node_info == ele.node_info) {
                        ele.children.push(channelData[i][j]);
                    }
                }
            });
        }
        if(channelData[0])
            return channelData[0];
        else return [];
    },
    appendLevelConfigValue: function (permNode, permChildren, profix) {
        permNode.config_value = profix + this.getProfix(permNode.node_type) + permNode.node_id;
        if (permChildren) {
            permChildren.forEach(function (node) {
                node.config_value = permNode.config_value + permUtil.getProfix(node.node_type) + node.node_id;
                permUtil.appendLevelConfigValue(node, node.children, permNode.config_value);
            });
        }
    },
    checkNodes: function (permNode, checked, permItem, nodeStack) {
        var nextStack = nodeStack.map(function (ele) {
            return ele
        });
        nextStack.push(permNode);
        if(checked){
            permNode.checked = true;
            for (var i = 0; i < nextStack.length; i++) {
                nextStack[i].checked = true;
            }
            if (permNode.children)
                for (var i = 0; i < permNode.children.length; i++) {
                    this.checkNodes(permNode.children[i], true, permItem, nextStack);
                }
        }
        else {
            if(!permNode.checked)
                permNode.checked = false;
            if (permNode.children) {
                for (var i = 0; i < permNode.children.length; i++) {
                    if (permItem == permNode.children[i].config_value) {
                        this.checkNodes(permNode.children[i], true, permItem, nextStack);
                    }
                    else  this.checkNodes(permNode.children[i], false, permItem, nextStack);
                }
            }
        }
    },
    filtNodes: function (permNode) {
        this.changedNodeInfo(permNode);
        if (permNode.children) {
            permNode.children = arrayUtil.grep(permNode.children, function (ele) {
                return ele.checked;
            });
            for (var i = 0; i < permNode.children.length; i++) {
                this.filtNodes(permNode.children[i]);
            }
        }else permNode.children = [];
    },
    getGameMenu:function(menu,menus){
        menus.push(menu.menu_id);
        if(menu.children)
        for(var i = 0;i<menu.children.length;i++){
            this.getGameMenu(menu.children[i],menus);
        }
    }
};
module.exports = permUtil;