/**
 * Created by xiaoyi on 2015/8/7.
 */
var url = require('url');
var routerMenuConfig = require('./routerConfig');
var resDataUtil = require('../../utils/resDataUtil');
exports.checkAccess = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    var pathName = url.parse(req.url).pathname
    var menus = req.session['menuAccess'].split(',');
    var pathMenu = routerMenuConfig[pathName];
    // 如果该请求路径属于任何一个有权限的菜单，则放行
    var pass = false;
    for(var i = 0; i < menus.length; i++){
        var menuId = menus[i];
        if(pathMenu.indexOf(menuId)){
            pass = true;
            break;
        }
    }
    console.log(pass);
    if(pass){
        next();
    }else{
        console.error('非法请求path:' + pathName);
        res.writeHead(403, "NO This request {" + pathName+"} Access");
        res.end(resDataUtil.accessError('relogin','非法请求！'));
    }
    next();
};