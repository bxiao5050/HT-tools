/**
 * Created by xiaoyi on 2015/4/18.
 */
var when            = require('when');
var log             = require('../utils/logUtil');
var dbUtil          = require('../utils/dbPoolUtil');
var resDataUtil     = require('../utils/resDataUtil');
var url             = require('url');
/**
 * 获取国家列表
 * @param req
 * @param res
 */
function query(req, res){
    var sql = 'select e_name, name, code, [status] from [runningDbName].[dbo].[t_c_country]';
    dbUtil.execSQL(sql)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}

/**
 * 获取已选中的国家列表
 * @param req
 * @param res
 * @returns {*}
 */
function queryUseCountry(req, res){
    var sql = 'select e_name, name, code, [status] from [runningDbName].[dbo].[t_c_country] where [status] = 1';
    dbUtil.execSQL(sql)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}

/**
 * 修改国家选中状态
 * @param req
 * @param res
 */
function updateCountryStatus(req, res){
    var arg = url.parse(req.url, true).query;
    var parameters = [
        {
            name:'code_str',
            type:'VarChar',
            value:arg.codeStr
        }
    ];
    var sql = "exec [runningDbName].[dbo].[update_country_status] @code_str" ;
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });

}

var API ={
    query:query,
    updateCountryStatus: updateCountryStatus,
    queryUseCountry: queryUseCountry
}
module.exports = API;

