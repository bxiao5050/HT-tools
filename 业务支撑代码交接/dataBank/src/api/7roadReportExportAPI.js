/**
 * Created by jishan.fan on 2016/2/29.
 */
var when = require('when');
var log = require('../utils/logUtil');
var dbUtil = require('../utils/dbPoolUtil');
var resDataUtil = require('../utils/resDataUtil');
var url = require('url');
var fs = require('fs-extra');
var xlsx = require('node-xlsx');
var excleHelper = require('../utils/excleHelper');
var baseConfig = require('../config/baseConfig');
/**
 * 推广明细分析
 * @param req
 * @param res
 */
function popularize_list(req, res) {
    var arg = req.query;
    //console.dir(params);
    var list_sql =  "select * from sc_game_dw_ad.fn_redo_ad_detail_day('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['in_os'] + "','" + arg['app_id'] + "','" + arg['channel_id'] + "'," + arg['time_type'] + ",'r1');" +
        "FETCH all in r1;";
    var sql=[list_sql];
    var pageName=['推广明细分析'];
    var excleName = '推广明细分析';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

/**
 * 推广汇总分析
 * @param req
 * @param res
 * **/
function popularize_total(req,res){
    var arg = req.query;
    //console.dir(params);
    var total_sql = "select * from sc_game_dw_ad.fn_redo_ad_total_day('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['count_date'] + "','" + arg['in_os'] + "'," + arg['app_id'] + ",'" + arg['channel_id'] + "'," + arg['time_type'] + ",'r1');" +
        "FETCH all in r1;";
    var sql=[total_sql];
    var pageName=['推广汇总分析'];
    var excleName = '推广汇总分析';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

/**
 * 实时查看
 * @param req
 * @param res
 * **/
function popularize_realtime(req,res){
    var arg = req.query;
    //console.dir(params);
    var realtime_sql = "select * from sc_game_dw_ad.fn_redo_ad_detail_hour('" + arg['curDate'] + "','" + arg['count_date'] + "','" + arg['in_os'] + "'," + arg['app_id'] + ",'" + arg['channel_id'] + "','r1','r2');" +
    "FETCH all in r1;FETCH all in r2;";
    var sql=[realtime_sql];
    var pageName=['实时查看'];
    var excleName = '实时查看';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

/**
 * 用户留存
 * @param req
 * @param res
 * **/
function popularize_liucun(req,res){
    var arg = req.query;
    //console.dir(params);
    var liucun_sql = "select * from sc_game_dw_ad.fn_redo_ad_login_translate_day('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['in_os'] + "'," + arg['app_id'] + ",'" + arg['channel_id'] + "','r1');" +
        "FETCH all in r1;";
    var sql=[liucun_sql];
    var pageName=['用户留存'];
    var excleName = '用户留存';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function newUserRegPayRate(req,res){
    var arg = req.query;
    //console.dir(params);
    var liucun_sql = "select * from sc_game_dw_ad.fn_redo_ad_reg_pay('"+arg['date1']+"','"+arg['date2']+"',"+arg['app_id']+",'"+arg['channel_id']+"','"+arg['in_os']+"','r1');"+
        "FETCH all in r1;";
    var sql=[liucun_sql];
    var pageName=['用户注收比'];
    var excleName = '用户注收比';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

function getAdGroupList(req,res){
    var arg = req.query;
    var sql = "select * from sc_game_dw_ad.fn_oas_ad_activity_list_data_group('"+arg["date1"]+"','"+arg["date2"]+"','"+arg["count_date"]+"','"+arg["in_os"]+"',"+arg["game_id"]+",'"+arg["channel_id"]+"','"+arg["ad_group_id"]+"',"+arg["isShowGroup"]+",'r1');fetch all in r1;"
    console.log(sql);
    var sql=[sql];
    var pageName=['活动组分析'];
    var excleName = '活动组分析';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function getAdActivityList(req,res){
    var arg = req.query;
    var sql = "select * from sc_game_dw_ad.fn_oas_ad_activity_list_data('"+arg["date1"]+"','"+arg["date2"]+"','"+arg["count_date"]+"','"+arg["in_os"]+"',"+arg["game_id"]+",'"+arg["channel_id"]+"','"+arg["user_name"]+"','r1');fetch all in r1;"
    console.log(sql);
    var sql=[sql];
    var pageName=['活动分析'];
    var excleName = '活动分析';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
var exportAPI = {
    popularize_list: popularize_list,
    popularize_total : popularize_total,
    popularize_realtime:popularize_realtime,
    newUserRegPayRate:newUserRegPayRate,
    popularize_liucun:popularize_liucun,
    getAdActivityList:getAdActivityList,
    getAdGroupList:getAdGroupList
}
module.exports = exportAPI;