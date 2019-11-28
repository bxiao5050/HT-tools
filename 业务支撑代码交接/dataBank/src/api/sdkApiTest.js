/**
 * Created by xiaoyi on 2015/10/16.
 *
 * SDK配置相关接口
 */


var request         = require('request');
var when            = require('when');
var log             = require('../utils/logUtil');
var dbUtil          = require('../utils/dbPoolUtil');
var resDataUtil     = require('../utils/resDataUtil');
var url             = require('url');

var BASE_HTTP_URL = 'http://192.168.60.16:8080';

var appList =  [
    {
        "appId": 1,
        "appName": "jo jo jo",
        "icon": "119.147.247.34:8081/oas_mobile/icon/game_icon_1020.png",
        "screen": "1",
        "state": {
            "android": 1,
            "ios": 0
        },
        "onLineChannel": 0,
        "allChannel": 9
    },{
        "appId": 2,
        "appName": "游戏1",
        "icon": "119.147.247.34:8081/oas_mobile/icon/game_icon_10001.png",
        "screen": "1",
        "state": {
            "android": 1,
            "ios": 0
        },
        "onLineChannel": 0,
        "allChannel": 9
    }, {
        "appId": 3,
        "appName": "游戏2",
        "icon": "119.147.247.34:8081/oas_mobile/icon/game_icon_10002.png",
        "screen": "1",
        "state": {
            "android": 1,
            "ios": 1
        },
        "onLineChannel": 0,
        "allChannel": 9
    }
]


/**
 * 获取游戏列表
 */
function getGameList(req, res){
    var data = {
        "code": 200,
        "msg": "",
        "data":appList
    }
    res.end(JSON.stringify(data));
    //req.pipe(request(BASE_HTTP_URL + req.url)).pipe(res);
}

/**
 * 查看游戏详情
 * @param req
 * @param res
 */
function getGameDetail(req, res){
    var data ={
        code:200,
        error_msg:'',
        data:{
            appId:1,
            appName:'jo jo jo',
            appKey:'1122EIDSDNHBBB',
            appSecret:'1122MIYUE',
            appDesc:'我是一只小毛驴。。。',
            appCert:'证书A',
            appIcon:'http://119.147.247.34:8081/oas_mobile/icon/game_icon_1020.png',
            screen:1
        }
    }
    res.end(JSON.stringify(data));
    //req.pipe(request(BASE_HTTP_URL + req.url)).pipe(res);
}
/**
 * 添加游戏
 * @param req
 * @param res
 */
function addGame(req, res){
    req.pipe(request.post(BASE_HTTP_URL + req.url, {form:req.body})).pipe(res);
}

/**
 * 修改游戏
 * @param req
 * @param res
 */
function updateGame(req, res){
    req.pipe(request.post(BASE_HTTP_URL + req.url, {form:req.body})).pipe(res);
}


function test(req, res){
    console.log(req);
    res.end('ok');
}
function test2(req, res){
    req.pipe(request.post(url, {form:req.body})).pipe(res);
}
var API ={
    getGameList:getGameList,
    getGameDetail:getGameDetail,
    addGame:addGame,
    updateGame:updateGame,
    test:test
}
module.exports = API;