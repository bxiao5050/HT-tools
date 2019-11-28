/**
 * Created by xiaoyi on 2015/8/4.
 */
var when = require('when');
var log = require('../utils/logUtil');
var dbUtil = require('../utils/dbPoolUtil');
var resDataUtil = require('../utils/resDataUtil');
var cacheUtil = require('../utils/cacheUtil');
var cacheTimeConfig = require('../config/cacheTimeConfig');
var url = require('url');

/**
 * 五分钟注册数据
 * @param req
 * @param res
 */
function fiveMinRegData(req, res) {
    var arg = req.query;
    var argString = 'fiveMinutesReg';
    var system_id = arg["system_id"];
    if (system_id == 5)
        var sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_5min_reg('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['game_id'] + "','" + arg['channel3']
            + "','" + arg['agent_id'] + "','CHS','" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    else
        var sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_5min_reg('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['channel2'] + "','" + arg['channel3']
            + "','" + arg['agent_id'] + "','CHS','" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    console.log(111111);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
/**
 * 五分钟充值数据
 * @param req
 * @param res
 */
function fiveMinRechargeData(req, res) {
    var arg = req.query;
    var argString = 'fiveMinutesPay';
    var system_id = arg["system_id"];
    // console.log(system_id);
    if (system_id == 5)
        var sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_5min_pay('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['game_id'] + "','" + arg['channel3']
            + "','" + arg['agent_id'] + "','CHS','" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    else
        var sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_5min_pay('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['channel2'] + "','" + arg['channel3']
            + "','" + arg['agent_id'] + "','CHS','" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    console.log(222222);
    cacheUtil.getFromCache(argString, arg, sql, res);
}

function indexTrendDay(req, res) {
    var arg = req.query;
    var argString = 'indexTrendDay';
    var system_id = arg["system_id"];
    if (system_id == 5)
        var sql = "SELECT * from sc_game_foreign_data_mobile." + '"fn_oas_indicator_trend_day"' + "('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['game_id'] + "','" + arg['channel3'] + "','" + arg['agent_id']
            + "','CHS'," + arg['game_id'] + "," + "1,'r1');FETCH ALL IN r1;";
    else
        var sql = "SELECT * from sc_game_foreign_data_mobile." + '"fn_oas_indicator_trend_day"' + "('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
            + "','CHS'," + arg['game_id'] + "," + "1,'r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
function indexTrendWeek(req, res) {
    var arg = req.query;
    var argString = 'indexTrendWeek';
    var system_id = arg["system_id"];
    if (system_id == 5)
        var sql = "SELECT * from sc_game_foreign_data_mobile." + '"fn_oas_indicator_trend_week"' + "('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['game_id'] + "','" + arg['channel3'] + "','" + arg['agent_id']
            + "','CHS'," + arg['game_id'] + "," + "1,'r1');FETCH ALL IN r1;";
    else
        var sql = "SELECT * from sc_game_foreign_data_mobile." + '"fn_oas_indicator_trend_week"' + "('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
            + "','CHS'," + arg['game_id'] + "," + "1,'r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
function indexTrendMonth(req, res) {
    var arg = req.query;
    var argString = 'indexTrendMonth';
    var system_id = arg["system_id"];
    if (system_id == 5)
        var sql = "SELECT * from sc_game_foreign_data_mobile." + '"fn_oas_indicator_trend_month"' + "('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['game_id'] + "','" + arg['channel3'] + "','" + arg['agent_id']
            + "','CHS'," + arg['game_id'] + "," + "1,'r1');FETCH ALL IN r1;";
    else
        var sql = "SELECT * from sc_game_foreign_data_mobile." + '"fn_oas_indicator_trend_month"' + "('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
            + "','CHS'," + arg['game_id'] + "," + "1,'r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
/**
 * 五力模型 日数据
 * @param req
 * @param res
 */
function fiveForceDayData(req, res) {
    var arg = req.query;
    var argString = 'fivePowerDay';
    var system_id = arg["system_id"];
    if (system_id == 5)
        var sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_fivepower_day('" + arg['curDate'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ",'CHS','"
            + arg['game_id'] + "','" + arg['channel3'] + "','r1');FETCH ALL IN r1;";
    else
        var sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_fivepower_day('" + arg['curDate'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ",'CHS','"
            + arg['channel2'] + "','" + arg['channel3'] + "','r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
/**
 * 五力模型 周数据
 * @param req
 * @param res
 */
function fiveForceWeekData(req, res) {
    var arg = req.query;
    var argString = 'fivePowerWeek';
    var system_id = arg["system_id"];
    if (system_id == 5)
        var sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_fivepower_week('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
            + arg['game_id'] + ",'CHS','" + arg['game_id'] + "','" + arg['channel3'] + "','r1');FETCH ALL IN r1;";
    else
        var sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_fivepower_week('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
            + arg['game_id'] + ",'CHS','" + arg['channel2'] + "','" + arg['channel3'] + "','r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
/**
 * 五力模型 月数据
 * @param req
 * @param res
 */
function fiveForceMonthData(req, res) {
    var arg = req.query;
    var argString = 'fivePowerMonth';
    var system_id = arg["system_id"];
    if (system_id == 5)
        var sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_fivepower_month('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
            + arg['game_id'] + ",'CHS','" + arg['game_id'] + "','" + arg['channel3'] + "','r1');FETCH ALL IN r1;";
    else
        var sql = "SELECT * from sc_game_foreign_data_mobile.fn_oas_fivepower_month('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
            + arg['game_id'] + ",'CHS','" + arg['channel2'] + "','" + arg['channel3'] + "','r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
/**
 * 大R帐号
 * @param req
 * @param res
 */
function bigRData(req, res) {
    var arg = req.query;
    var argString = 'bigR';
    var sql = "SELECT * from sc_game_foreign_data_mobile." + '"fn_oas_R_player"' + "('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
        + "','CHS'," + arg['game_id'] + "," + arg['select_id'] + ",'r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}

function newUserRetainRate(req, res) {
    var arg = req.query;
    var argString = 'newUserRetainRate';
    var system_id = arg["system_id"];
    if (system_id == 5)
        var sql = "SELECT * from sc_game_foreign_data_mobile." + '"fn_oas_login_translate"' + "('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['game_id'] + "','" + arg['channel3'] + "','" + arg['agent_id']
            + "','CHS'," + arg['game_id'] + ",1,'r1');FETCH ALL IN r1;";
    else
        var sql = "SELECT * from sc_game_foreign_data_mobile." + '"fn_oas_login_translate"' + "('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
            + "','CHS'," + arg['game_id'] + ",1,'r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
function newUserRegIncomeRate(req, res) {
    var arg = req.query;
    var argString = 'newUserRegIncomeRate';
    var system_id = arg["system_id"];
    if (system_id == 5)
        var sql = "SELECT * from sc_game_foreign_data_mobile." + '"fn_oas_pay_translate"' + "('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['game_id'] + "','" + arg['channel3'] + "','" + arg['agent_id']
            + "','CHS'," + arg['game_id'] + ",1,'r1');FETCH ALL IN r1;";
    else
        var sql = "SELECT * from sc_game_foreign_data_mobile." + '"fn_oas_pay_translate"' + "('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['channel2'] + "','" + arg['channel3'] + "','" + arg['agent_id']
            + "','CHS'," + arg['game_id'] + ",1,'r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
/**
 * 清除缓存
 * **/
function clearCache(req, res) {
    cacheUtil.clearCache(req, res);
}

var API = {
    fiveMinRegData: fiveMinRegData,
    fiveMinRechargeData: fiveMinRechargeData,
    indexTrendDay: indexTrendDay,
    indexTrendWeek: indexTrendWeek,
    indexTrendMonth: indexTrendMonth,
    fiveForceDayData: fiveForceDayData,
    fiveForceWeekData: fiveForceWeekData,
    fiveForceMonthData: fiveForceMonthData,
    newUserRetainRate: newUserRetainRate,
    newUserRegIncomeRate: newUserRegIncomeRate,
    bigRData: bigRData,
    clearCache: clearCache
};
module.exports = API;