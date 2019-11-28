/**
 * Created by xiaoyi on 2015/9/17.
 */
/**
 * Created by xiaoyi on 2015/4/15.
 */
var when            = require('when');
var log             = require('../utils/logUtil');
var dbUtil          = require('../utils/dbPoolUtil');
var resDataUtil     = require('../utils/resDataUtil');
var url             = require('url');
/**
 * 查询游戏、机型下面的所有数据备注
 * @param req
 * @param res
 */
function queryList(req, res){
    var arg = url.parse(req.url, true).query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'os',
            type:'Int',
            value:arg.os
        }
    ];
    var sql = "exec [runningDbName].[dbo].[pro_query_remark_list] @app_id, @os" ;
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}

/**
 * 增加游戏、机型下的数据备注
 * @param req
 * @param res
 */
function add(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'os',
            type:'Int',
            value:arg.os
        },
        {
            name:'remark',
            type:'NVarChar',
            value:arg.remark
        },
        {
            name:'count_date',
            type:'Date',
            value:arg.count_date
        }
    ];
    var sql = "exec [runningDbName].[dbo].[pro_add_remark] @app_id, @os, @remark, @count_date" ;
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            console.log(data);
            if(data.rowCount > 1){
                res.end(resDataUtil.success('ok'));
            }else{
                res.end(resDataUtil.error('failed','update failed, rowCount <= 0'))
            };
        })
        .catch(function (err) {
            log.error(err);
            res.end(resDataUtil.error('failed',err))
        });
}


function update(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'os',
            type:'Int',
            value:arg.os
        },
        {
            name:'remark',
            type:'NVarChar',
            value:arg.remark
        },
        {
            name:'count_date',
            type:'Date',
            value:arg.count_date
        }
    ];
    var sql = "exec [runningDbName].[dbo].[pro_update_remark] @app_id, @os, @remark, @count_date" ;
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            if(data.rowCount>0){
                res.end(resDataUtil.success('ok'));
            }else{
                res.end(resDataUtil.error('failed','update failed, rowCount <= 0'))
            };
        })
        .catch(function (err) {
            log.error(err);
            res.end(resDataUtil.error('failed',err))
        });
}

function deleteRemark(req, res){
    var arg = req.query;
    var parameters = [
        {
            name:'app_id',
            type:'Int',
            value:arg.app_id
        },
        {
            name:'os',
            type:'Int',
            value:arg.os
        },
        {
            name:'count_date',
            type:'Date',
            value:arg.count_date
        }
    ];
    var sql = "update [runningDbName].[dbo].[t_c_data_remark] set status = 0 where game_id = @app_id and os = @os and count_date = @count_date and status =1" ;
    dbUtil.execSQL(sql, parameters)
        .then(function(data){
            if(data.rowCount>0){
                res.end(resDataUtil.success('ok'));
            }else{
                res.end(resDataUtil.error('failed','update failed, rowCount <= 0'))
            };
        })
        .catch(function (err) {
            log.error(err);
            res.end(resDataUtil.error('failed',err))
        });
}
var channelRemarkAPI ={
    queryList: queryList,
    add:add,
    update:update,
    delete:deleteRemark
}

module.exports = channelRemarkAPI;