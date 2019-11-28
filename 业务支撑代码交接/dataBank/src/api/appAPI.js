/**
 * Created by xiaoyi on 2015/4/15.
 */
var when            = require('when');
var log             = require('../utils/logUtil');
var dbUtil          = require('../utils/dbPoolUtil');
var resDataUtil     = require('../utils/resDataUtil');
var url             = require('url');
/**
 * 查询所有app 包列表
 * @param req
 * @param res
 */
function query(req, res){
    var sql = 'select id, app_id, app_name, package_name, os from sc_sdk_databank.t_c_app_package where status = true order by id desc;';
    dbUtil.execSQL(sql,[],'pgLog')
        .then(function(data){
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}
/**
 * 查询所有游戏
 * @param req
 * @param res
 */
function queryGames(req, res){
    //var sql = 'select distinct game_id,game_name from oas_system_2_0.dbo.t_pdm_channel';
    //dbUtil.execSQL(sql)
    //    .then(function(data){
    //        res.end(resDataUtil.success(data.result));
    //    })
    //    .catch(function (err) {
    //        res.end(resDataUtil.error('failed',err))
    //    });
    var sql ='select distinct game_id,game_name from sc_game_public_conf.t_c_channel where game_id not in (35) order by game_id'
    dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        }).catch(function(err){
            res.end(resDataUtil.err('failed',err))
        });

}
/**
 * 修改app信息
 * @param req
 * @param res
 */
function updateApp(req, res){
    var arg = url.parse(req.url, true).query;
    //var parameters = [
    //    {
    //        name:'id',
    //        type:'Int',
    //        value:arg.id
    //    },
    //    {
    //        name:'app_name',
    //        type:'NVarChar',
    //        value:arg.app_name
    //    },
    //    {
    //        name:'package_name',
    //        type:'NVarChar',
    //        value:arg.package_name
    //    },
    //    {
    //        name:'os',
    //        type:'Int',
    //        value:arg.os
    //    }
    //
    //];
    var sql = "update sc_sdk_databank.t_c_app_package  set app_name ='"+arg.app_name+"', os ="+ arg.os+",package_name ='"+arg.package_name+"', modify_time = getdate() where id = "+arg.id +";";
    dbUtil.execSQL(sql, [],'pgLog')
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

/**
 * 添加app
 * @param req
 * @param res
 */
function addApp(req, res){
    var arg = url.parse(req.url, true).query;
    //var parameters = [
    //    {
    //        name:'app_id',
    //        type:'Int',
    //        value:arg.app_id
    //    },
    //    {
    //        name:'app_name',
    //        type:'NVarChar',
    //        value:arg.app_name
    //    },
    //    {
    //        name:'package_name',
    //        type:'NVarChar',
    //        value:arg.package_name
    //    },
    //    {
    //        name:'os',
    //        type:'Int',
    //        value:arg.os
    //    }
    //
    //];

    var sql = "select fn_report_add_app_package  status from sc_sdk_databank.fn_report_add_app_package("+arg.app_id+",'"+arg.app_name+"','"+arg.package_name+"',"+arg.os+"::int2);" ;
    //console.log(sql);
    dbUtil.execSQL(sql,[],'pgLog')
        .then(function(data){
            console.dir(data);
            //console.log(data.result[0].status);
            if( data.result[0].status ===true){
                res.end(resDataUtil.success('ok'));
                //query(req.res);
            }else{
                res.end(resDataUtil.error('failed','添加游戏package重复，请核实！'))
            }
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });

}

/**
 * 删除app
 * @param req
 * @param res
 */
function deleteApp(req, res){
    var arg = url.parse(req.url, true).query;
    //var id = arg.id;
    //var parameters = [
    //    {
    //        name:'id',
    //        type:'Int',
    //        value:id
    //    }];
    var sql = "update sc_sdk_databank.t_c_app_package set status =false   where id ="+arg.id;
    //console.log(sql);
    dbUtil.execSQL(sql,[],'pgLog')
        .then(function(data){
            if(data.rowCount>0){
                res.end(resDataUtil.success('ok'));
            }else{
                res.end(resDataUtil.error('failed','包不存在'))
            }
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed',err))
        });
}

var appAPI ={
    addApp: addApp,
    deleteApp: deleteApp,
    updateApp: updateApp,
    query:query,
    queryGames:queryGames
}

module.exports = appAPI;