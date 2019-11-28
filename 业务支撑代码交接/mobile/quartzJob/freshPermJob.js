/**
 * Created by jishan.fan on 2016/8/9.
 */
"use strict";
var fs = require('fs');
var http = require('http');
var async = require('async');
var schedule = require("node-schedule");
var mobilePermService = require('../service/mobilePermService');
var writeMobilePerm = function (callback) {
    async.waterfall([
            //生成自研业务分析菜单JSON 自研业务分析系统ID为1
            function (callback) {
                mobilePermService.getSystemGameMenu(1, 'oasGameMenus', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('自研业务分析菜单JSON刷新成功!');
                } else {
                    console.error('自研业务分析菜单JSON刷新失败!');
                }
                mobilePermService.getSystemGameAgent(1, 'oasGameAgents', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('自研业务分析代理商JSON刷新成功!');
                } else {
                    console.error('自研业务分析代理商JSON刷新失败!');
                }
                mobilePermService.getSystemGameRegChannel(1, 'oasGameRegChannel', callback);

            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('自研业务分析游戏注册渠道JSON刷新成功!');
                } else {
                    console.error('自研业务分析游戏注册渠道JSON刷新失败!');
                }
                mobilePermService.getSystemGamePayChannel(1, 'oasGamePayChannel', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('自研业务分析游戏付费渠道JSON刷新成功!');
                } else {
                    console.error('自研业务分析游戏付费渠道JSON刷新失败!');
                }
                //生成海外发行业务代理商JSON 海外发行业务系统ID为4
                mobilePermService.getSystemGameAgent(4, 'foreignOasGameAgents', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('海外发行业务分析代理商JSON刷新成功!');
                } else {
                    console.error('海外发行业务分析代理商JSON刷新失败!');
                }
                mobilePermService.getSystemGameChannel(4, 'foreignOasGameChannel', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('海外发行业务分析渠道JSON刷新成功!');
                } else {
                    console.error('海外发行业务分析渠道JSON刷新失败!');
                }
                mobilePermService.getSystemGameMenu(4, 'foreignOasGameMenus', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('海外发行业务分析菜单JSON刷新成功!');
                } else {
                    console.error('海外发行业务分析菜单JSON刷新失败!');
                }
                //生成海外投放系统菜单信息
                mobilePermService.getSystemMenu(2, 'adMenus', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('海外投放系统菜单JSON刷新成功!');
                } else {
                    console.error('海外投放系统菜单JSON刷新失败!');
                }
                //生成7Road投放系统菜单
                mobilePermService.getSystemGameMenu(3, 'adRoadMenus', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('h5发行系统菜单JSON刷新成功!');
                } else {
                    console.error('h5发行系统菜单JSON刷新失败!');
                }
                //生成7Road投放系统菜单
                mobilePermService.getSystemGameMenu(5, 'webOasMenus', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('h5发行系统代理商JSON刷新成功!');
                } else {
                    console.error('h5发行系统代理商JSON刷新失败!');
                }
                //生成7Road投放系统菜单
                mobilePermService.getSystemGameAgent(5, 'webOasAgents', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('h5发行系统渠道JSON刷新成功!');
                } else {
                    console.error('h5发行系统渠道JJSON刷新失败!');
                }
                mobilePermService.getSystemGameChannel(5, 'webOasChannels', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('mobile版分析系统代理JSON刷新成功!');
                } else {
                    console.error('mobile版分析系统代理JJSON刷新失败!');
                }
                mobilePermService.getMobileOasAgent('mobileOasOasAgents', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('mobile版分析系统代理JSON刷新成功!');
                } else {
                    console.error('mobile版分析系统代理JJSON刷新失败!');
                }
                mobilePermService.getMobileOasMenu(1, 'mobileOasOasMenus', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('mobile版分析系统渠道JSON刷新成功!');
                } else {
                    console.error('mobile版分析系统渠道JJSON刷新失败!');
                }
                mobilePermService.getMobileOasChannel(2, 'mobileOasOasChannel', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('mobile版分析系统代理JSON刷新成功!');
                } else {
                    console.error('mobile版分析系统代理JJSON刷新失败!');
                }
                mobilePermService.getMobileOasAgent('mobileOasOasAgents', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('mobile版分析系统代理JSON刷新成功!');
                } else {
                    console.error('mobile版分析系统代理JJSON刷新失败!');
                }
                mobilePermService.getMobileOasMenu(1, 'mobileOasOasMenus', callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('mobile版分析系统渠道JSON刷新成功!');
                } else {
                    console.error('mobile版分析系统渠道JJSON刷新失败!');
                }
                mobilePermService.getMobileOasChannel(2, 'mobileOasOasChannel', callback);
            },
            // function (flag, callback) {
            //     if (flag === true) {
            //         console.log('mobile版分析系统代理JSON刷新成功!');
            //     } else {
            //         console.error('mobile版分析系统代理JJSON刷新失败!');
            //     }
            //     mobilePermService.getMobileOasMenu(5, 'mobileH5OasOasMenus', callback);
            // },
            // function (flag, callback) {
            //     if (flag === true) {
            //         console.log('mobileH5e版分析系统渠道JSON刷新成功!');
            //     } else {
            //         console.error('mobileH5版分析系统渠道JJSON刷新失败!');
            //     }
            //     mobilePermService.getMobileOasChannel(5, 'mobileH5OasOasChannel', callback);
            // },


            function (flag,  callback) {
                if (flag === true) {
                    console.log('mobileH5版分析系统渠道JSON刷新成功!');
                } else {
                    console.error('mobileH5版分析系统渠道JJSON刷新失败!');
                }
                mobilePermService.getMonitorAgent('monitorAgent',callback);
            },
            function (flag, callback) {
                if (flag === true) {
                    console.log('监控系统周边系统JSON刷新成功!');
                } else {
                    console.error('监控系统周边系统JJSON刷新失败!');
                }
                mobilePermService.getMonitorSystem('monitorSystem',callback);
            }
            ,
            function (flag, callback) {
                if (flag === true) {
                    console.log('监控系统周边系统JSON刷新成功!');
                } else {
                    console.error('监控系统周边系统JJSON刷新失败!');
                }
                mobilePermService.getMonitorMenu('monitorMenu',callback);
            }
        ],
        function (err, flag) {
            if (!err && flag === true) {
                callback(null,true);
                console.log('手游系统权限结构JSON刷新成功!', new Date());
            } else {
                callback(null,false);
                console.error('手游系统权限结构JSON刷新失败,err : ' + err);
            }
        }
    )
}
var getWebPermData = function (type_id,system_id, permissionName,callback) {
    var path = '/PublicInterface/servlet/PublicInterface?type='+type_id+'&sys=36&oasSysId='+system_id;
    var options = {
        hostname: '121.10.141.219',
        port: 8020,
        path: path,
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
            var permissionJson = JSON.parse(data);
            fs.writeFileSync(APP_PATH+'/public/permissionJson/webGame/' + permissionName + '.json', JSON.stringify(permissionJson));
            callback(null,true);
        });
        request.on('error', function (e) {
           log.error('业务支撑平台系统权限结构刷新失败：' + e);
            callback(null,false);
        });
        request.end();
    })
}
var writeWebPerm = function (callback) {
    //var webGamePath = ['/PublicInterface/servlet/PublicInterface?type=11&sys=36&oasSysId=1', //业务支撑平台运营系统菜单
    //    '/PublicInterface/servlet/PublicInterface?type=21&sys=36&oasSysId=1',//业务支撑平台运营系统代理商
    //    '/PublicInterface/servlet/PublicInterface?type=11&sys=36&oasSysId=3',//业务支撑平台营销系统菜单
    //    '/PublicInterface/servlet/PublicInterface?type=21&sys=36&oasSysId=3',//业务支撑平台营销系统代理商
    //    '/PublicInterface/servlet/PublicInterface?type=11&sys=36&oasSysId=2',//业务支撑平台收支系统菜单
    //    '/PublicInterface/servlet/PublicInterface?type=21&sys=36&oasSysId=2'//业务支撑平台收支系统代理商
    //];
    //var webPermissionName = ['oasMenus', 'oasAgents', 'mssMenus', 'mssAgents', 'fadMenus', 'fadAgents'];
    async.waterfall([
        function(callback){
            getWebPermData(11,1,'oasMenus',callback);
        },
        function(flag,callback){
            if(flag === true) {
                console.log('业务支撑平台运营系统菜单JSON刷新成功!', new Date());
            }
            getWebPermData(21,1,'oasAgents',callback);
        },
        function(flag,callback){
            if(flag === true) {
                console.log('业务支撑平台运营系统代理商JSON刷新成功!', new Date());
            }
            getWebPermData(11,2,'fadMenus',callback);
        },
        function(flag,callback){
            if(flag === true) {
                console.log('业务支撑平台收支系统菜单JSON刷新成功!', new Date());
            }
            getWebPermData(21,2,'fadAgents',callback);
        },
        function(flag,callback){
            if(flag === true) {
                console.log('业务支撑平台收支系统代理商JSON刷新成功!', new Date());
            }
            getWebPermData(11,3,'mssMenus',callback);
        },
        function(flag,callback){
            if(flag === true) {
                console.log('业务支撑平台营销系统菜单JSON刷新成功!', new Date());
            }
            getWebPermData(21,3,'mssAgents',callback);
        },

    ],function(err,flag){
        if(flag === true && !err) {
            console.log('业务支撑平台营销系统代理商JSON刷新成功!', new Date());
        }
        console.log('业务支撑平台权限JSON刷新成功!', new Date());
        callback(null,true);
    })

}

var initPerm = function(callback){
    async.waterfall(
        [function(callbcak){
            writeMobilePerm(callbcak)
        },
        function(flag,callback){
            writeWebPerm(callback);
        }],
    function(err,flag){
        if(flag === true && !err){
            callback(null,'系统权限结构刷新成功!');
        }else{
            callback(null,err);
        }
    });
}
var freshPerm =function(){
    //initPerm(function(err,data){
    //    console.log(data);
    //});
    //initPerm(function(err,data){
    //    console.log(data);
    //});
    // initPerm(function(err,data){
    //     console.log(data);
    // });
    // console.log('权限结构JSON刷新成功!',new Date());
    initPerm(function(err,data){
        console.log(data);
    });
    // var rule = new schedule.RecurrenceRule();
    // rule.minute = [0, 3, 6, 9, 12, 15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60];
    // var j = schedule.scheduleJob(rule, function(){
    //    initPerm(function(err,data){
    //        console.log(data);
    //    });
    //    console.log('权限结构JSON刷新成功!',new Date());
    // });
}

var freshPermJob = {
    freshPerm : freshPerm,
    initPerm : initPerm
}

module.exports = freshPermJob;