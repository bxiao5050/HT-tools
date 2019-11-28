/**
 * Created by jishan.fan on 2016/7/28.
 */
"use strict";
var url = require('url');
var resDataUtil = require('../utils/resDataUtil');
var logUtil = require('../utils/logUtil');
var routeMenuConfig = require('../config/routeMenuConfig');
var checkLogin = function (req, res, next) {
    console.log('session.username='+req.session.user);
    console.log(!req.session.user);
    if (!req.session.user) {
        res.writeHead(403, "TIME OUT | NO LOGIN");
        res.end(resDataUtil.accessError('relogin', 'session超时或者验证失败，请重新登录！'));
    }else{
        next();
    }
}
var checkAccess = function (req, res, next) {
    //res.setHeader('Content-Type', 'application/json; charset=utf-8')
    console.log('------'+req.session.id);
    console.log(req.session['menuAccess']);
    var pathName = url.parse(req.url).pathname;
    var menus = req.session['menuAccess'].split(',');
    var pathMenu = routeMenuConfig[pathName];
    // 如果该请求路径属于任何一个有权限的菜单，则放行
    var pass = false;
    for (var i = 0; i < menus.length; i++) {
        var menuId = menus[i];
        if (pathMenu.indexOf(menuId)) {
            pass = true;
            break;
        }
    }
    console.log(pass);
    if (!pass) {
        console.error('非法请求path:' + pathName);
        res.writeHead(403, "NO This request {" + pathName + "} Access");
        res.end(resDataUtil.accessError('relogin', '非法请求！'));
    }
    next();
};
var accessMiddleware = {
    checkLogin: checkLogin,
    checkAccess: checkAccess
}


module.exports = accessMiddleware;