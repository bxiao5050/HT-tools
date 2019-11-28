/**
 * Created by linlin.zhang on 2016/11/21.
 */
var dbUtil = require('../utils/dbUtil');
var oasMobileDbUtil = require('../utils/oasMobileDbUtil');
var when = require('when');
var arrayUtil = require('../utils/arrayUtil')
var connectionPools = [];
var getConnection = function (conection_id, sql, params) {
    var result = null;

    connectionPools.forEach(function (connection) {
        if (conection_id == connection.id) {
            result = connection;
            return false;
        }
        return true;
    });
    return oasMobileDbUtil.executeSQL(result, sql, params);
}

var getConnectionPools = function () {
    var sql = "select * from t_e_connection";
    var defer = when.defer();
    dbUtil.execMySQL(sql, []).then(function (rows) {
        if (connectionPools == null) connectionPools = [];
        rows.forEach(function (row) {
            var isLive = false;
            connectionPools.forEach(function (conection) {
                if (row.id == conection.id) {
                    isLive = true;
                    return false;
                }
            })
            if (isLive == false) {
                var config = {
                    host: row.server,
                    user: row.user_name,
                    database: row.db_name,
                    password: row.password,
                    idleTimeoutMillis: 100000,
                    max: 300
                };
                connectionPools.push({
                    id: row.id,
                    type: row.type,
                    pool: oasMobileDbUtil.getPool(row.type, config)
                });
            }
        });
        defer.resolve()
    });
    return defer.promise;
}

var getSystemInfo = function () {
    var defer = when.defer();
    var sql = "select a.id system_id,system_name,a.sort system_sort,game_id,game_name," +
        " connection_id,agent_id,menu_id,channel_id,b.sort game_sort " +
        " from t_e_system a join t_e_game b on a.id = b.system_id ";
    dbUtil.execMySQL(sql, []).then(function (rows) {
        var systems = [];
        rows.forEach(function (row) {
            var system = arrayUtil.getFirst(systems,function(ele){ return ele.id == row.system_id;});
            if (system == null){
                system = {
                id: row.system_id,
                title: row.system_name,
                key: 's' + row.system_id,
                children: [{
                    id: row.game_id,
                    title: row.game_name,
                    key: 's' + row.system_id + 'g' + row.game_id,
                    connection_id: row.connection_id,
                    agent_id: row.agent_id,
                    menu_id: row.menu_id,
                    channel_id: row.channel_id
                }]
            };
                systems.push(system);
            }
            else {
                system.children.push({
                    id: row.game_id,
                    title: row.game_name,
                    key:'s'+row.system_id+'g'+ row.game_id,
                    connection_id: row.connection_id,
                    agent_id: row.agent_id,
                    menu_id: row.menu_id,
                    channel_id: row.channel_id
                });
            }

        });

        defer.resolve(systems);
    });
    return defer.promise;
}
var getAgentInfo = function (systems, callback) {
    var tasks = [];
    systems.forEach(function(system){
        if(system.id == 1) //页游
        {
            system.children.forEach(function (game) {

                var sql = "select agent_id,agent_name,agent_pid from v_w_i_agent where agent_pid = 0  and agent_status = 1 and agent_id in (" + game.agent_id + ")" +
                    " union " +
                    "select agent_id,agent_name,agent_pid from v_w_i_AGENT where agent_pid in (select agent_id from v_w_i_agent where agent_pid = 0  and agent_id in (" + game.agent_id + ")) and agent_status = 1";
                if(game.connection_id == 6)
                    sql = "select DISTINCT region_id agent_id,region_name agent_name,0 agent_pid from sc_game_public_conf.t_c_game_zone where app_id = "+game.id
                " union "
                " select DISTINCT agent_id,agent_name,region_id agent_pid from sc_game_public_conf.t_c_game_zone where app_id = "+game.id
                tasks.push(getConnection(game.connection_id, sql, []).then(function (rows) {
                    var firstAgent = arrayUtil.grep(rows, function (item) {
                        return item.agent_pid == 0;
                    }, function (item) {
                        return {
                            id: item.agent_id,
                            title: item.agent_name,
                            key: game.key + 'a' + item.agent_id
                        };
                    });
                    firstAgent.forEach(function (parent_agent) {
                        parent_agent.children = arrayUtil.grep(rows, function (second_agent) {
                            return second_agent.agent_pid == parent_agent.id;
                        }, function (second_agent) {
                            return {
                                id: second_agent.agent_id,
                                title: second_agent.agent_name,
                                key: parent_agent.key + 'b' + second_agent.agent_id
                            };
                        });
                    });
                    game.children = firstAgent;


                }));


            })
        } else {
            //手游
            system.children.forEach(function (game) {
                var sql = "select DISTINCT region_id agent_id,region_name agent_name,0 agent_pid from sc_oas_db_mobile.v_c_game_zone where app_id = " + game.id +
                    " union "+
                    " select DISTINCT agent_id,agent_name,region_id agent_pid from sc_oas_db_mobile.v_c_game_zone where app_id = " + game.id ;
                tasks.push(getConnection(game.connection_id, sql, []).then(function (rows) {
                    var firstAgent = arrayUtil.grep(rows, function (item) {
                        return item.agent_pid == 0;
                    }, function (item) {
                        return {
                            id: item.agent_id,
                            title: item.agent_name,
                            key: game.key + 'a' + item.agent_id
                        };
                    });
                    firstAgent.forEach(function (parent_agent) {
                        parent_agent.children = arrayUtil.grep(rows, function (second_agent) {
                            return second_agent.agent_pid == parent_agent.id;
                        }, function (second_agent) {
                            return {
                                id: second_agent.agent_id,
                                title: second_agent.agent_name,
                                key: parent_agent.key + 'b' + second_agent.agent_id
                            };
                        });
                    });
                    game.children = firstAgent;


                }));


            })
        }
    })

    when.all(tasks).then(function(){
        systems.forEach(function(system){
            system.children.forEach(function(item){
                delete item.connection_id;
                delete item.agent_id;
                delete item.menu_id;
                delete item.channel_id;
            });
        })
        callback(null, systems);
    });
}

var getMenuInfo = function (systems, callback) {
    var sql = "select a.id,b.menu_name,a.game_id from t_e_game_menu a join t_e_menu b on a.menu_id = b.id";
    dbUtil.execMySQL(sql, []).then(function (rows) {
        systems.forEach(function(system){
            system.children.forEach(function (game) {
                delete game.connection_id;
                delete game.agent_id;
                delete game.menu_id;
                delete game.channel_id;
                game.children = arrayUtil.grep(rows, function (row) {
                    return game.id == row.game_id;
                }, function (item) {
                    return {
                        id: item.id,
                        title: item.menu_name,
                        key: game.key + 'a' + item.id
                    };
                });
            });
        })
        callback(null, systems);
    })
}
var getRegChannel = function(systems, callback){
    var tasks = [];
    systems.forEach(function(system){
        if(system.id == 2 || system.id == 5)
        system.children.forEach(function (game) {
            //console.log(game);
            var sql = "select DISTINCT channel_id,channel_name from sc_oas_db_mobile.v_c_channel where game_id = "+game.id;
            tasks.push(getConnection(game.connection_id, sql, []).then(function (rows) {


                var firstChannel = arrayUtil.grep(rows, function (item) {
                    return true;
                }, function (item) {
                    return {
                        id: item.channel_id,
                        title: item.channel_name,
                        key: game.key + 'a' + item.channel_id
                    };
                });
                game.children = firstChannel;
            }));


        });
        else if(system.id==3){
            system.children.forEach(function (game) {
                //console.log(game);
                var sql = "select DISTINCT channel_id,channel_name,parent_channel_id from sc_oas_db_mobile.v_w_foreign_channel where game_id = "+game.id;
                tasks.push(getConnection(game.connection_id, sql, []).then(function (rows) {


                    var firstChannel = arrayUtil.grep(rows, function (item) {
                        return item.parent_channel_id == -200;
                    }, function (item) {
                        return {
                            id: item.channel_id,
                            title: item.channel_name,
                            key: game.key + 'a' + item.channel_id
                        };
                    });
                    firstChannel.forEach(function(secondChanel){
                        secondChanel.children = arrayUtil.grep(rows,function (item) {
                           return item.parent_channel_id == secondChanel.id;
                        }, function (item) {
                            return {
                                id: item.channel_id,
                                title: item.channel_name,
                                key: secondChanel.key + item.channel_id
                            };
                        });
                        secondChanel.children.forEach(function(thirdChannel){
                            thirdChannel.children = arrayUtil.grep(rows,function (item) {
                                return  item.parent_channel_id == thirdChannel.id;
                            }, function (item) {
                                return {
                                    id: item.channel_id,
                                    title: item.channel_name,
                                    key: thirdChannel.key + item.channel_id
                                };
                            });
                        });
                    });
                    game.children = firstChannel;
                }));


            });
        }
    });
    when.all(tasks).then(function(){
        systems.forEach(function(system){
            system.children.forEach(function(item){
                delete item.connection_id;
                delete item.agent_id;
                delete item.menu_id;
                delete item.channel_id;
            });
        });
        callback(null, systems);
    });
}
module.exports = {
    initailPool: getConnectionPools,
    getSystemInfo: getSystemInfo,
    getAgentInfo: getAgentInfo,
    getMenuInfo: getMenuInfo,
    getRegChannel:getRegChannel
};
