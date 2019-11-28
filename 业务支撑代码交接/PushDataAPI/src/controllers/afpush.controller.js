/**
 * Created by xiaoyi on 2016/8/9.
 */
var logger = require('../../lib/logger.lib');

/**
 * 接受Appsflyer数据上报
 * @param req
 * @param res
 * @param next
 */
exports.receiveData = function(req, res, next){
    var dataStr = "";
    try{
        dataStr = JSON.stringify(req.body);
        logger.data().info(dataStr);
    }catch(err){
        console.error(err);
    }
    res.status(200).end();
}