/**
 * Created by linlin.zhang on 2017/2/20.
 */
var cache = require('memory-cache');
var request = require('request');
var when = require('when');

var paths = {
    getAgents:"http://121.10.141.196:8088/pdm/zone/tree?gameZoneId=0&gameId=",
    getSystem:"http://121.10.141.206:8088/syscat?type=0",
    getFirstAgent:"http://121.10.141.206:8088/querygamezoneinfo?type=1&returnType=json&gameId=",
    getSecondAgent:function (game_id,pid) {
        return "http://121.10.141.206:8088/querygamezoneinfo?type=2&returnType=json&gameId="+game_id+"&pid="+pid;
    }
};
var contains = function(array,value){
    for(var i = 0;i< array.length;i++) {
        if(array[i] == value) return true;
    }
    return false;
}
var sendRequire = function (url,repeatDeffed) {
    var deffed = when.defer();
    var requestUrl = url;
    request({url:url,timeout:60*1000}, function (error, response, body) {
        try {
            if(!error) {
                if(repeatDeffed){
                    repeatDeffed.resolve(JSON.parse(body));
                }else {
                    deffed.resolve(JSON.parse(body));
                }
            }
        }
        catch(err){
            console.error(body);
            console.error(requestUrl);
            console.log(err);
            sendRequire(requestUrl,deffed);
        }
    });
    return deffed.promise;
}
var bigGame = [19,22,29];
var getGameAgent = function (game) {
    var game_id = game.game_id;
    var deffed = when.defer();
    var agents = cache.get(paths.getAgents+game_id);
    if(agents == null){
        var result = {
            id:game_id,
            title:game.game_name,
            key:"g"+game_id,
            children:[]
        };
        if(contains(bigGame,game_id)){
            sendRequire(paths.getFirstAgent+game_id).then(function (firstAgents) {
                var allJob = [];
                firstAgents.forEach(function (first) {
                    var firstModel = {
                        id:first.gamezone_id,
                        title:first.gamezone_name,
                        key:result.key+"a"+first.gamezone_id,
                        children:[]
                    };
                    allJob.push(sendRequire(paths.getSecondAgent(game_id,first.gamezone_id)));
                    result.children.push(firstModel);
                })
                when.all(allJob).then(function (allsencond) {
                    for(var i = 0;i<result.children.length;i++)
                        result.children[i].children = allsencond[i].map(function (ele) {
                            return {
                                id:ele.gamezone_id,
                                title:ele.gamezone_name,
                                key:result.children[i].key+"b"+ele.gamezone_id,
                                children:[]
                            };
                        });
                    cache.get(paths.getAgents+game_id,result,1000*60*10);
                    deffed.resolve(result);
                });
            });
        }
        else {
            sendRequire(paths.getAgents + game_id).then(function (game) {
                game.children.forEach(function (firstAgent) {
                    try {
                        var firstModel = {
                            id: firstAgent.gamezone_id,
                            title: firstAgent.gamezone_name,
                            key: result.key + "a" + firstAgent.gamezone_id,
                            children: []
                        };
                        firstAgent.children.forEach(function (secondAgent) {
                            firstModel.children.push({
                                id: secondAgent.gamezone_id,
                                title: secondAgent.gamezone_name,
                                key: firstModel.key + "b" + secondAgent.gamezone_id,
                                children: []
                            });
                        });
                        cache.get(paths.getAgents+game_id,result,1000*60*10);
                        result.children.push(firstModel);
                    }
                    catch (err) {
                        console.log(paths.getAgents + game_id);
                    }

                });
                deffed.resolve(result);
            });
        }
    }else  deffed.resolve(agents);
    return deffed.promise;
}
var getSystems = function () {
    var deffed = when.defer();
    var Systems = cache.get(paths.getSystem);
    if(Systems == null){
        sendRequire(paths.getSystem).then(function (data) {
            var result = [];
            data.forEach(function (l1) {
                l1.key = "a"+l1.key;
                l1.children.forEach(function (l2) {
                    l2.key = l1.key+"b"+l2.key;
                })
            });
            cache.put(paths.getSystem,data,1000*60*10);
            deffed.resolve(data);

        });
    }else  deffed.resolve(Systems);
    return deffed.promise;
}

module.exports = {
    getMonitorGameAgent:getGameAgent,
    getMonitorSystem:getSystems
};