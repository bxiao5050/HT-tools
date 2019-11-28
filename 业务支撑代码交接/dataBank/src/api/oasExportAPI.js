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
 * 五分钟视图
 * @param req
 * @param res
 */
function fiveMinRegExport(req, res) {
    var arg = req.query;
    /**五分钟注册**/
    var reg_sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_5min_reg('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['regchannel'] + "','" + arg['agent_id']
        + "','CHS',1,'" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    /**嵌套获取五分钟注册、在线、充值数据**/
    var sql=[reg_sql];
    var pageName=[baseConfig.excleName.fiveMinutesReg];
    var excleName = baseConfig.excleName.fiveMinutesReg;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function fiveMinOnlineExport(req, res) {
    var arg = req.query;
    /**五分钟在线**/
    var online_sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_5min_online('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['regchannel'] + "','" + arg['agent_id']
        + "','CHS',1,'" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    /**嵌套获取五分钟注册、在线、充值数据**/
    var sql=[online_sql];
    var pageName=[baseConfig.excleName.fiveMinutesOnline];
    var excleName = baseConfig.excleName.fiveMinutesOnline;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function fiveMinPayExport(req, res) {
    var arg = req.query;
    /**五分钟注册**/
    /**五分钟充值**/
    var pay_sql ="SELECT * from sc_oas_db_mobile.fn_7road_oas_5min_pay('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['regchannel'] + "','" + arg['paychannel']
        + "','" + arg['agent_id'] + "','CHS','" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    /**嵌套获取五分钟注册、在线、充值数据**/
    var sql=[pay_sql];
    var pageName=[baseConfig.excleName.fiveMinutesPay];
    var excleName = baseConfig.excleName.fiveMinutesPay;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function fiveMinExportRegNoPay(req, res) {
    var arg = req.query;
    /**五分钟注册**/
    var reg_sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_5min_reg('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['regchannel'] + "','" + arg['agent_id']
        + "','CHS',1,'" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    /**嵌套获取五分钟注册、在线、充值数据**/
    var sql=[reg_sql];
    var pageName=[baseConfig.excleName.fiveMinutesReg];
    var excleName = baseConfig.excleName.fiveMinutesReg;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function fiveMinExportOnlineNoPay(req, res) {
    var arg = req.query;
    /**五分钟在线**/
    var online_sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_5min_online('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['regchannel'] + "','" + arg['agent_id']
        + "','CHS',1,'" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    /**嵌套获取五分钟注册、在线、充值数据**/
    var sql=[online_sql];
    var pageName=[baseConfig.excleName.fiveMinutesOnline];
    var excleName = baseConfig.excleName.fiveMinutesOnline;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
/**
 * 五力模型日看盘
 * @param req
 * @param res
 * **/
function fivePowerDayExport(req,res){
    var arg = req.query;
    //console.dir(params);
    var day_sql =  "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_day('" + arg['curDate'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ",'CHS','"
        + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
    var sql=[day_sql];
    var pageName=[baseConfig.excleName.fivePowerDay];
    var excleName=baseConfig.excleName.fivePowerDay;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

/**
 * 五力模型周看盘
 * @param req
 * @param res
 * **/
function fivePowerWeekExport(req,res){
    var arg = req.query;
    //console.dir(params);
    var day_sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_week('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
        +arg['game_id']+",'CHS','" + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
    var sql=[day_sql];
    var pageName=[baseConfig.excleName.fivePowerWeek];
    var excleName=baseConfig.excleName.fivePowerWeek;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

/**
 * 五力模型月看盘
 * @param req
 * @param res
 * **/
function fivePowerMonthExport(req,res){
    var arg = req.query;
    //console.dir(params);
    var day_sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_month('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
        +arg['game_id']+",'CHS','" + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
    var sql=[day_sql];
    var pageName=[baseConfig.excleName.fivePowerMonth];
    var excleName=baseConfig.excleName.fivePowerMonth;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
/**
 * 五力模型日看盘
 * @param req
 * @param res
 * **/
function fivePowerDayExportNoPay(req,res){
    var arg = req.query;
    //console.dir(params);
    var day_sql =  "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_day_no_pay('" + arg['curDate'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ",'CHS','"
        + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
    var sql=[day_sql];
    var pageName=[baseConfig.excleName.fivePowerDay];
    var excleName=baseConfig.excleName.fivePowerDay;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

/**
 * 五力模型周看盘
 * @param req
 * @param res
 * **/
function fivePowerWeekExportNoPay(req,res){
    var arg = req.query;
    //console.dir(params);
    var day_sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_week_no_pay('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
        +arg['game_id']+",'CHS','" + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
    var sql=[day_sql];
    var pageName=[baseConfig.excleName.fivePowerWeek];
    var excleName=baseConfig.excleName.fivePowerWeek;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

/**
 * 五力模型月看盘
 * @param req
 * @param res
 * **/
function fivePowerMonthExportNoPay(req,res){
    var arg = req.query;
    //console.dir(params);
    var day_sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_month_no_pay('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
        +arg['game_id']+",'CHS','" + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
    var sql=[day_sql];
    var pageName=[baseConfig.excleName.fivePowerMonth];
    var excleName=baseConfig.excleName.fivePowerMonth;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
/**
 * 新增用户
 * @param req
 * @param res
 * **/
function newUserExport(req,res){
    var arg = req.query;
    var newUserSql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_newuser('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id']  +"',"
        + arg['game_id'] + ",'CHS','" + arg['regchannel'] + "','r1');FETCH ALL IN r1;";
    var sql=[newUserSql];
    var pageName=[baseConfig.excleName.newUser];
    var excleName=baseConfig.excleName.newUser;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

/**
 * 活跃用户
 * @param req
 * @param res
 * **/
function activeUserExport(req,res){
    var arg=req.query;
    var activeUserSql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_activeUser('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id'] +"',"
        + arg['game_id'] + ",'CHS','" + arg['regchannel'] + "','r1');FETCH ALL IN r1;";
    var sql=[activeUserSql];
    var pageName=[baseConfig.excleName.activeUser];
    var excleName=baseConfig.excleName.activeUser;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

/**
 * 在线用户
 * @param req
 * @param res
 * **/
function onlineUserExport(req,res){
    var arg=req.query;
    var onlineUserSql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_onlineuser('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['regchannel']  +"','"
        + arg['agent_id']  +"'," + arg['game_id'] + ","+ arg['datetype'] + ",'r1');FETCH ALL IN r1;";
    var sql=[onlineUserSql];
    var pageName=[baseConfig.excleName.onlineUser];
    var excleName=baseConfig.excleName.onlineUser;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}

/**
 * 留存用户
 * @param req
 * @param res
 * **/
function retainUserExport(req,res){
    var arg = req.query;
    var retainSql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_liucun_day('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id'] +"',"
        + arg['select_id'] + ",'CHS',"+arg['game_id']+",'" + arg['regchannel'] + "','r1');FETCH ALL IN r1;";
    var sql=[retainSql];
    var pageName=[baseConfig.excleName.retainUser];
    var excleName=baseConfig.excleName.retainUser;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
/**
 * 新手留存
 * @param req
 * @param res
 * **/
function NewUserLostStepExport(req,res){
    var arg = req.query;
    var nuloststepSql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_newuser_steplost(" + arg['game_id'] + ",'" + arg['agent_id'] + "','" + arg['date1']  +"','" + arg['regchannel']  + "',"+ arg['configid'] + ",'r1');FETCH ALL IN r1;";
    var sql=[nuloststepSql];
    var pageName=[baseConfig.excleName.newUserLostStep];
    var excleName=baseConfig.excleName.newUserLostStep;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
/**
 * 虚拟货币
 * @param req
 * @param res
 * **/
function virtualPointExport(req,res){
    var arg = req.query;
    var sql1 = "SELECT * from sc_oas_db_mobile.fn_7road_oas_virual_point_list('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id']+ "'," + arg['game_id'] + ","
        + "'CHS','" + arg['regchannel'] + "','"+ arg['paychannel'] +"',"+  arg['usertype'] +","+ arg['moneytype']+",'r1');FETCH ALL IN r1;";
    var sql2 = "SELECT * from sc_oas_db_mobile.fn_7road_oas_virual_point_detail('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id']+ "'," + arg['game_id'] + ","
        + "'CHS','" + arg['regchannel'] + "','"+ arg['paychannel'] +"',"+  arg['usertype'] +","+ arg['moneytype']+","+ arg['mastertype']+",'"+arg['sontypelist'] +"',"+"'r1');FETCH ALL IN r1;";
    var sql=[sql1,sql2];
    var pageName=[baseConfig.excleName.virtualList,baseConfig.excleName.virtualDetail];
    var excleName=baseConfig.excleName.virtuaPoint;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
/**
 * 登录比
 * @param req
 * @param res
 * **/
function loginrateExport(req,res){
    var arg = req.query;
    var loginrateSql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_loginrate('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id']+ "'," + arg['game_id'] + ","
        + "'CHS','" + arg['regchannel'] + "','r1');FETCH ALL IN r1;";
    var sql=[loginrateSql];
    var pageName=[baseConfig.excleName.loginRate];
    var excleName=baseConfig.excleName.loginRate;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function loginrateExportNoPay(req,res){
    var arg = req.query;
    var loginrateSql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_loginrate_no_pay('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id']+ "'," + arg['game_id'] + ","
        + "'CHS','" + arg['regchannel'] + "','r1');FETCH ALL IN r1;";
    var sql=[loginrateSql];
    var pageName=[baseConfig.excleName.loginRate];
    var excleName=baseConfig.excleName.loginRate;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function regPayRate(req,res){
    var arg = req.query;
    var regPayRateSql =  "SELECT * from sc_oas_db_mobile.fn_7road_oas_zhushoubi_newuser('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['regchannel'] + "','" + arg['paychannel']+ "','" + arg['agent_id']+ "'," + arg['game_id'] + ","
        + arg['select_id'] + ",'r1');FETCH ALL IN r1;";
    var sql=[regPayRateSql];
    var pageName=[baseConfig.excleName.regPayRate];
    var excleName=baseConfig.excleName.regPayRate;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);
}
function userCurStock(req,res){
    var arg = req.query;
    var sql1 ="select sc_oas_db_mobile.fn_7road_oas_userstock('"+arg['date1']+"', '"+arg['date2']+"', '"+arg['regchannel']+"', '"
        +arg['agent_id']+"'," +arg['game_id']+",'0,1','rr');FETCH ALL from rr;";
    var sql =[sql1];
    var pageName=[baseConfig.excleName.userStock];
    var excleName = baseConfig.excleName.userPetStock;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);

}
function userPetStock(req,res){
    var arg = req.query;
    var sql2 = "select sc_oas_db_mobile.fn_7road_oas_petstock('"+arg['date1']+"', '"+arg['date2']+"', '"+arg['regchannel']+"', '"
        +arg['agent_id']+"'," +arg['game_id']+",'0,1','rr');fetch all in rr;"
    var sql =[sql2];
    var pageName=[baseConfig.excleName.petStock];
    var excleName = baseConfig.excleName.userPetStock;
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName);

}
var exportAPI = {
    fiveMinRegExport: fiveMinRegExport,
    fiveMinOnlineExport: fiveMinOnlineExport,
    fiveMinPayExport: fiveMinPayExport,
    fivePowerDayExport : fivePowerDayExport,
    fivePowerWeekExport : fivePowerWeekExport,
    fivePowerMonthExport : fivePowerMonthExport,
    fiveMinExportRegNoPay: fiveMinExportRegNoPay,
    fiveMinExportOnlineNoPay:fiveMinExportOnlineNoPay,
    fivePowerDayExportNoPay : fivePowerDayExportNoPay,
    fivePowerWeekExportNoPay : fivePowerWeekExportNoPay,
    fivePowerMonthExportNoPay : fivePowerMonthExportNoPay,
    newUserExport : newUserExport,
    activeUserExport : activeUserExport,
    onlineUserExport:onlineUserExport,
    retainUserExport : retainUserExport,
    virtualPointExport:virtualPointExport,
    NewUserLostStepExport:NewUserLostStepExport,
    loginrateExport :loginrateExport,
    loginrateExportNoPay :loginrateExportNoPay,
    regPayRate : regPayRate,
    userCurStock:userCurStock,
    userPetStock : userPetStock
}
module.exports = exportAPI;