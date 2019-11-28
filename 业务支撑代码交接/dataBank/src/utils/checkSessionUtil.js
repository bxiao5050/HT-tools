/**
 * Created by xiaoyi on 2015/4/15.
 */
var SessionManager = require('../cookie/session').SessionManager;
var baseConfig = require('../config/baseConfig');
var resDataUtil = require('./resDataUtil');
var when = require('when');


function checkUser(http) {
    var deferred = when.defer();
    var session = http.session;
    var res = http.response;
    if (!SessionManager.isTimeout(session) && session.get('username') != "" ) {
        deferred.resolve(http);
    }else{
        res.writeHead(401, "TIME OUT | NO LOGIN");
        res.end(401);
        deferred.reject();
    }
    return deferred.promise;
}
function checkAdmin(http) {
    var deferred = when.defer();
    var session = http.session;
    var res = http.response;
    if (!SessionManager.isTimeout(session) && session.get('username') != "" && session.get('admin') == "true") {
        deferred.resolve(http);
    }else{
        res.writeHead(401, "TIME OUT | NO ACCESS");
        res.end(401);
        deferred.reject('session超时或者验证失败，请重新登录！');
    }
    return deferred.promise;
}

var checkSessionUtil = {
    checkUser : checkUser,
    checkAdmin :checkAdmin
}

module.exports = checkSessionUtil;