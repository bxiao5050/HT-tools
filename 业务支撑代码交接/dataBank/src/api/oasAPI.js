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
 * 根据系统获取注册渠道
 * @param req
 * @param res
 */
function getRegChannelByOS(req, res) {
    var arg = req.query;
    var sql = "with channel as(SELECT  CAST(regexp_split_to_table AS int4) as channel_id FROM  regexp_split_to_table('"+arg['regchannel']+"', E',') where regexp_split_to_table <> '')" +
        "select channel_id,channel_name,package_id,package_name,os from sc_game_public_conf.t_c_etl_channel where game_id = 10003 and channel_id in (select channel_id from channel)";
    console.log(sql);
    dbUtil.execSQL(sql, [], 'pg')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
}
/**
 * 五分钟注册数据
 * @param req
 * @param res
 */
function fiveMinRegData(req, res) {
    var arg = req.query;
    var argString = 'fiveMinutesReg';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_5min_reg('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['regchannel'] + "','" + arg['agent_id']
        + "','CHS',1,'" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    //var sql='select * from sc_oas_db_mobile.fn_7road_oas_5min_reg(\'$1\',\'$2\',\'$3\',\'$4\',\'$5\',\'CHS\',1,$6,\'r1\');fetch all in r1;';
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
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_5min_pay('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['regchannel'] + "','" + arg['paychannel']
        + "','" + arg['agent_id'] + "','CHS','" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    //console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
function fiveMinRechargeDataNoPay(req, res) {
    var arg = req.query;
    var argString = 'fiveMinutesPay';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_5min_zero_pay('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['regchannel'] + "','" + arg['paychannel']
        + "','" + arg['agent_id'] + "','CHS','" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}
/**
 * 五分钟在线数据
 * @param req
 * @param res
 */
function fiveMinOnlineData(req, res) {
    var arg = req.query;
    var argString = 'fiveMinutesOnline';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_5min_online('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['date3'] + "','" + arg['regchannel'] + "','" + arg['agent_id']
        + "','CHS',1,'" + arg['game_id'] + "','refcursor');FETCH ALL IN refcursor;";
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
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_day('" + arg['curDate'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ",'CHS','"
        + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
function fiveForceDayDataNoPay(req, res) {
    var arg = req.query;
    var argString = 'fivePowerDay_no_pay';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_day_no_pay('" + arg['curDate'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ",'CHS','"
        + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
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
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_week('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
        + arg['game_id'] + ",'CHS','" + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}
function fiveForceWeekDataNoPay(req, res) {
    var arg = req.query;
    var argString = 'fivePowerWeek_no_pay';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_week_no_pay('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
        + arg['game_id'] + ",'CHS','" + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
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
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_month('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
        + arg['game_id'] + ",'CHS','" + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}
function fiveForceMonthDataNoPay(req, res) {
    var arg = req.query;
    var argString = 'fivePowerMonth_no_pay';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_fivepower_month_no_pay('" + arg['curDate'] + "','" + arg['agent_id'] + "',"
        + arg['game_id'] + ",'CHS','" + arg['regchannel'] + "','" + arg['paychannel'] + "','r1');FETCH ALL IN r1;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}
/**
 * 新增用户
 * @param req
 * @param res
 * **/
function newUser(req, res) {
    var arg = req.query;
    var argString = 'newUser';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_newuser('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id'] + "',"
        + arg['game_id'] + ",'CHS','" + arg['regchannel'] + "','r1');FETCH ALL IN r1;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}

/**
 * 活跃用户
 * @param req
 * @param res
 * **/
function activeUser(req, res) {
    var arg = req.query;
    var argString = 'activeUser';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_activeUser('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id'] + "',"
        + arg['game_id'] + ",'CHS','" + arg['regchannel'] + "','r1');FETCH ALL IN r1;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}

/**
 * 在线用户
 * @param req
 * @param res
 * **/
function onlineUser(req, res) {
    var arg = req.query;
    var argString = 'onlineUser';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_onlineuser('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['regchannel'] + "','"
        + arg['agent_id'] + "'," + arg['game_id'] + "," + arg['datetype'] + ",'r1');FETCH ALL IN r1;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}


/**
 * 留存用户
 * @param req
 * @param res
 * **/
function retainUser(req, res) {
    var arg = req.query;
    var argString = 'retainUser';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_liucun_day('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id'] + "',"
        + arg['select_id'] + ",'CHS'," + arg['game_id'] + ",'" + arg['regchannel'] + "','r1');FETCH ALL IN r1;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}
/**
 * 新手阶段节点留存
 * @param req
 * @param res
 * **/
function newUserStepLost(req, res) {
    var arg = req.query;
    var argString = 'newUserStepLost';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_newuser_steplost(" + arg['game_id'] + ",'" + arg['agent_id'] + "','" + arg['curDate'] + "','" + arg['regchannel'] + "'," + arg['configid'] + ",'r1');FETCH ALL IN r1;";
    //console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}

/**
 * 虚拟货币消费类型
 * @param req
 * @param res
 * **/
function virtualPointCatalog(req, res) {
    var arg = req.query;
    var argString = 'virtualPointCatalog';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_virual_point_catalog(" + arg['mastertype'] + ",'r1');FETCH ALL IN r1;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}

/**
 * 虚拟货币汇总数据
 * @param req
 * @param res
 * **/
function virtualPointDetail(req, res) {
    var arg = req.query;
    var argString = 'virtualPointDetail';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_virual_point_detail('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ","
        + "'CHS','" + arg['regchannel'] + "','" + arg['paychannel'] + "'," + arg['usertype'] + "," + arg['moneytype'] + "," + arg['mastertype'] + ",'" + arg['sontypelist'] + "'," + "'r1');FETCH ALL IN r1;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}

/**
 * 虚拟货币详细数据
 * @param req
 * @param res
 * **/
function virtualPointList(req, res) {
    var arg = req.query;
    var argString = 'virtualPointList';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_virual_point_list('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ","
        + "'CHS','" + arg['regchannel'] + "','" + arg['paychannel'] + "'," + arg['usertype'] + "," + arg['moneytype'] + ",'r1');FETCH ALL IN r1;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}

/**
 * 登录比
 * @param req
 * @param res
 * **/
function loginRate(req, res) {
    var arg = req.query;
    var argString = 'loginRate';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_loginrate('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ","
        + "'CHS','" + arg['regchannel'] + "','r1');FETCH ALL IN r1;";
    cacheUtil.getFromCache(argString, arg, sql, res);
}
function loginRateNoPay(req, res) {
    var arg = req.query;
    var argString = 'loginRate_no_pay';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_loginrate_no_pay('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ","
        + "'CHS','" + arg['regchannel'] + "','r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}

function regPayRate(req, res) {
    var arg = req.query;
    var argString = 'regPayRate';
    var sql = "SELECT * from sc_oas_db_mobile.fn_7road_oas_zhushoubi_newuser('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['regchannel'] + "','" + arg['paychannel'] + "','" + arg['agent_id'] + "'," + arg['game_id'] + ","
        + arg['select_id'] + ",'r1');FETCH ALL IN r1;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
/**
 * 余量分析 用户金币钻石库存
 * **/
function userStock(req, res) {
    var arg = req.query;
    var argString = 'userStock';
    var sql = "select sc_oas_db_mobile.fn_7road_oas_userstock('" + arg['date1'] + "', '" + arg['date2'] + "', '" + arg['regchannel'] + "', '" + arg['agent_id'] + "'," + arg['game_id'] + ",'0,1','rr');FETCH ALL from rr;";
    console.log(sql);
    cacheUtil.getFromCache(argString, arg, sql, res);
}
/**
 * 余量分析 魔灵
 * **/
function petStock(req, res) {
    var arg = req.query;
    var argString = 'petStock';
    var sql = "select sc_oas_db_mobile.fn_7road_oas_petstock_kanpan('" + arg['date1'] + "', '" + arg['date2'] + "','" + arg['regchannel']
        + "','" + arg['agent_id'] + "'," + arg['game_id'] + ",'0,1', " + arg['quality_id'] + ", " + arg['select_id'] + ",'r1');fetch all in r1;";
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
    getRegChannelByOS: getRegChannelByOS,
    fiveMinRegData: fiveMinRegData,
    fiveMinRechargeData: fiveMinRechargeData,
    fiveMinRechargeDataNoPay: fiveMinRechargeDataNoPay,
    fiveMinOnlineData: fiveMinOnlineData,
    fiveForceDayData: fiveForceDayData,
    fiveForceDayDataNoPay: fiveForceDayDataNoPay,
    fiveForceWeekData: fiveForceWeekData,
    fiveForceWeekDataNoPay: fiveForceWeekDataNoPay,
    fiveForceMonthData: fiveForceMonthData,
    fiveForceMonthDataNoPay: fiveForceMonthDataNoPay,
    newUser: newUser,
    activeUser: activeUser,
    onlineUser: onlineUser,
    retainUser: retainUser,
    newUserStepLost: newUserStepLost,
    virtualPointCatalog: virtualPointCatalog,
    virtualPointDetail: virtualPointDetail,
    virtualPointList: virtualPointList,
    loginRate: loginRate,
    loginRateNoPay: loginRateNoPay,
    regPayRate: regPayRate,
    userStock: userStock,
    petStock: petStock,
    clearCache: clearCache
}
module.exports = API;