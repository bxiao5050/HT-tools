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
/**
 * 五分钟视图
 * @param req
 * @param res
 */
function fiveMinRegExport(req, res) {
    var arg = req.query;
    /**五分钟注册**/
    var reg_sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_5min_reg('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3']  + "','" + arg['channel2']+ "','" + arg['channel3']
        + "','" + arg['agent_id'] + "','CHS','" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    /**嵌套获取五分钟注册、在线、充值数据**/
    var sql=[reg_sql];
    var pageName=['五分钟注册'];
    var excleName = '五分钟注册';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function fiveMinPayExport(req, res) {
    var arg = req.query;
    /**五分钟充值**/
    var pay_sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_5min_pay('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3']  + "','" + arg['channel2']+ "','" + arg['channel3']
        + "','" + arg['agent_id'] + "','CHS','" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    /**嵌套获取五分钟注册、在线、充值数据**/
    var sql=[pay_sql];
    var pageName=['五分钟充值'];
    var excleName = '五分钟充值';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
/**
 * 指标趋势看盘
 * @param req
 * @param res
 */
function indexTrendDayExport(req,res){
    var arg = req.query;
    var day_sql =  "SELECT * from sc_game_foreign_data_mobile."+'"fn_oas_indicator_trend_day"'+"('" + arg['date1'] + "','" +arg['date2']+ "','"+ arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
        + "','CHS'," + arg['game_id'] + "," + "1,'r1');FETCH ALL IN r1;";
    var sql=[day_sql];
    var pageName=['指标趋势日看盘'];
    var excleName = '指标趋势日看盘';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function indexTrendWeekExport(req,res){
    var arg = req.query;
    var week_sql =  "SELECT * from sc_game_foreign_data_mobile."+'"fn_oas_indicator_trend_week"'+"('" + arg['date1'] + "','" +arg['date2']+ "','"+ arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
        + "','CHS'," + arg['game_id'] + "," + "1,'r1');FETCH ALL IN r1;";
    var sql=[week_sql];
    var pageName=['指标趋势周看盘'];
    var excleName = '指标趋势周看盘';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function indexTrendMonthExport(req,res){
    var arg = req.query;
    var month_sql =  "SELECT * from sc_game_foreign_data_mobile."+'"fn_oas_indicator_trend_month"'+"('" + arg['date1'] + "','" +arg['date2']+ "','"+ arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
        + "','CHS'," + arg['game_id'] + ","  + "1,'r1');FETCH ALL IN r1;";
    var sql=[month_sql];
    var pageName=['指标趋势月看盘'];
    var excleName = '指标趋势月看盘';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
/**
 * 五力模型
 * @param req
 * @param res
 * **/
function fivePowerDayExport(req,res){
    var arg = req.query;
    //console.dir(params);
    var day_sql =  "SELECT * from sc_game_foreign_data_mobile.fn_oas_fivepower_day('" + arg['curDate'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ",'CHS','"
        + arg['channel2'] + "','" + arg['channel3'] + "','r1');FETCH ALL IN r1;";
    var sql=[day_sql];
    var pageName=["五力模型日看盘"];
    var excleName="五力模型日看盘";
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function fivePowerWeekExport(req,res){
    var arg = req.query;
    //console.dir(params);
    var week_sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_fivepower_week('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
        + arg['game_id'] + ",'CHS','" + arg['channel2'] + "','" + arg['channel3'] + "','r1');FETCH ALL IN r1;";
    var sql=[week_sql];
    var pageName=["五力模型周看盘"];
    var excleName="五力模型周看盘";
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function fivePowerMonthExport(req,res){
    var arg = req.query;
    //console.dir(params);
    var month_sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_fivepower_month('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
        + arg['game_id'] + ",'CHS','" + arg['channel2'] + "','" + arg['channel3'] + "','r1');FETCH ALL IN r1;";
    var sql=[month_sql];
    var pageName=["五力模型月看盘"];
    var excleName="五力模型月看盘";
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
/**
 * 大R帐号
 * @param req
 * @param res
 */
function bigRDataExport(req,res){
    var arg = req.query;
    var R_sql =  "SELECT * from sc_game_foreign_data_mobile."+'"fn_oas_R_player"'+"('" + arg['date1'] + "','" +arg['date2']+ "','"+ arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
        + "','CHS'," + arg['game_id'] + "," +arg['select_id'] + ",'r1');FETCH ALL IN r1;";
    var sql=[R_sql];
    var pageName=["大R帐号"];
    var excleName="大R帐号";
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName,'pgLog');
}

/**
 * 新用户留存率
 * @param req
 * @param res
 */
function newUserRetainRateExport(req,res){
    var arg=req.query;
    var retain_sql = "SELECT * from sc_game_foreign_data_mobile."+'"fn_oas_login_translate"'+"('" + arg['date1'] + "','" +arg['date2']+ "','"+ arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
        + "','CHS'," + arg['game_id'] + ",1,'r1');FETCH ALL IN r1;";
    var sql=[retain_sql];
    var pageName=["新用户留存率"];
    var excleName="新用户留存率";
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

/**
 * 新用户注收比
 * @param req
 * @param res
 * **/
function newUserRegIncomeRateExport(req,res){
    var arg=req.query;
    var reg_rql = "SELECT * from sc_game_foreign_data_mobile."+'"fn_oas_pay_translate"'+"('" + arg['date1'] + "','" +arg['date2']+ "','"+ arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
        + "','CHS'," + arg['game_id'] + ",1,'r1');FETCH ALL IN r1;";
    var sql=[reg_rql];
    var pageName=["新用户注收比"];
    var excleName="新用户注收比";
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function plateformDate(req,res){
    var arg = req.query;
    var system_id = arg["system_id"];
    var sql1 = "select * from sc_game_foreign_data_mobile.fn_h5plateform_data('"+arg['date1']+"','" +arg['date2']+"','"+ arg['channel3']+"','r1');FETCH all in r1;";
    var sql=[sql1];
    var pageName=["h5平台数据"];
    var excleName="h5平台数据";
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
var exportAPI = {
    fiveMinRegExport: fiveMinRegExport,
    fiveMinPayExport: fiveMinPayExport,
    indexTrendDayExport:indexTrendDayExport,
    indexTrendWeekExport:indexTrendWeekExport,
    indexTrendMonthExport:indexTrendMonthExport,
    fivePowerDayExport : fivePowerDayExport,
    fivePowerWeekExport : fivePowerWeekExport,
    fivePowerMonthExport : fivePowerMonthExport,
    bigRDataExport:bigRDataExport,
    plateformDate:plateformDate,
    newUserRetainRateExport:newUserRetainRateExport,
    newUserRegIncomeRateExport:newUserRegIncomeRateExport

}
module.exports = exportAPI;