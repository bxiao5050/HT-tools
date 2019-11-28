/**
 * Created by jishan.fan on 2016/8/11.
 */
var session = require('express-session');
var resDataUtil = require('../utils/resDataUtil');
exports.check = function () {
    return function (req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.writeHead(403, "TIME OUT | NO LOGIN");
            res.end(resDataUtil.accessError('relogin', 'session超时或者验证失败，请重新登录！'));
        };
    }
};
