/**
 * Created by xiaoyi on 2016/2/23.
 */
var when            = require('when');
var log             = require('../utils/logUtil');
var dbUtil          = require('../utils/dbPoolUtil');
var resDataUtil     = require('../utils/resDataUtil');
var url             = require('url');
var cacheUtil = require('../utils/cacheUtil');

function getAreas(req, res){
    var areas = [{
        area_code:'ASAN',
        area_name:'东南亚'
    },{
        area_code:'SM',
        area_name:'新马地区'
    },{
        area_code:'OTHER',
        area_name:'其他地区'
    }];

    res.send(areas);
}

function getAreaCountrys(req, res){
    var args = req.query;
    var areaCode = args.area_code;
    if(!areaCode){
        return res.send('请添加参数：area_code');
    }

    var contries = [{
        country_code:'VN',
        country_name:'越南'
    },{
        country_code:'TH',
        country_name:'泰国'
    },{
        country_code:'ASAN-OTHER',
        country_name:'其他'
    }];
    res.send(contries);
}
function getCountryApps(req, res){
    var args = req.query;
    var countryCode = args.country_code;
    if(!countryCode){
        return res.send('请添加参数：country_code');
    }

    var apps = [{
        app_id:10002,
        app_name:'越南超级英雄'
    },{
        app_id:10020,
        app_name:'越南口袋联盟'
    }]
    res.send(apps);
}

function getDate(req, res){
    var args = req.query;
    var areaCode = args.area_code;
    var countryCode = args.country_code;
    var appId = args.appId;
    var os = args.os; // 0:ios 1:android 0,1: IOS&android
    var count_date = args.count_date; // 日期

    var data = [{
        countDate:'2015-02-02',
        os:1,
        installs:1000,
        regs:900,
        roles:800,
        cost:188.88,
        newServerRoles:300,
        liucun:300,
        liucun3:200,
        liucun7:100
    },{
        countDate:'2015-02-02',
        os:1,
        installs:1000,
        regs:900,
        roles:800,
        cost:188.88,
        newServerRoles:300,
        liucun:300,
        liucun3:200,
        liucun7:100
    }]

    res.send(data);


}


var getAreaCountryGame =  function(req,res){
    var sql = 'select unite_id,area_app_id,parent_id,area_app_name,sort from sc_sdk_databank.t_c_area_app where status = 1;'
    dbUtil.execSQL(sql,[],'pgLog').then(function(data){
        result = resDataUtil.success(data.result);

        res.end(result);
    }).catch (function (err) {
        res.end(resDataUtil.error('failed', err))
    });
}

/**
 * 综合报表
 * @param req
 * @param res
 */
var comprehensiveReport = function(req,res){
    var arg = req.query;
    var sql = "SELECT * from sc_sdk_databank.fn_report_data('" + arg['date1'] + "','" + arg['date2'] + "','"
        + arg['in_os'] + "','"+arg['area_app_ids']+"','r1');FETCH ALL IN r1;";
    //cacheUtil.getFromCache('oneDay', arg, sql, res,'pgLog');
    dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
}

/**
 * 每日报表
 * @param req
 * @param res
 */
var dailyReport = function(req,res){
    var arg = req.query;
    var sql = "SELECT * from sc_sdk_databank.fn_report_day('" + arg['date1'] + "','" + arg['date2'] + "','"
        + arg['in_os'] + "','"+arg['area_app_ids']+"','r1');FETCH ALL IN r1;";
    //cacheUtil.getFromCache('oneDay', arg, sql, res,'pgLog');
    dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
}

/**
 * 媒体报表
 * @param req
 * @param res
 */
var mediaReport = function(req,res){
    var arg = req.query;
    var sql = "SELECT * from sc_sdk_databank.fn_report_media('" + arg['date1'] + "','" + arg['date2'] + "','"
        + arg['in_os'] + "','"+arg['area_app_ids']+"','"+arg['media']+"','r1');FETCH ALL IN r1;";
     dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
}
/**
 * 系统对比
 * @param req
 * @param res
 */
var sysCompare = function(req,res){
    var arg = req.query;
    // var sql = "SELECT * from sc_sdk_databank.fn_report_data_media('" + arg['date1'] + "','" + arg['date2'] + "','"
    //     + arg['in_os'] + "','"+arg['area_app_ids']+"','r1');FETCH ALL IN r1;";
    var sql = "SELECT * from sc_sdk_databank.fn_report_data_media_sys_compare('" + arg['date1'] + "','" + arg['date2'] + "','"
        + arg['in_os'] + "','"+arg['area_app_ids']+"','r1');FETCH ALL IN r1;";
    dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
}

/**
 * 综合媒体报表
 * @param req
 * @param res
 */
var datamediaReport = function(req,res){
    var arg = req.query;
    var sql = "SELECT * from sc_sdk_databank.fn_report_data_media('" + arg['date1'] + "','" + arg['date2'] + "','"
        + arg['in_os'] + "','"+arg['area_app_ids']+"','r1');FETCH ALL IN r1;";
    // var sql = "SELECT * from sc_sdk_databank.fn_report_data_media_sys_compare('" + arg['date1'] + "','" + arg['date2'] + "','"
    //     + arg['in_os'] + "','"+arg['area_app_ids']+"','r1');FETCH ALL IN r1;";
    dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
}
/**
 * 各国所占比
 * @param req
 * @param res
 */
var countryShow = function(req,res){
    var arg = req.query;
    var sql = "SELECT * from sc_sdk_databank.fn_report_country('" + arg['date1'] + "','" + arg['date2'] + "','"
        + arg['in_os'] + "','"+arg['area_app_ids']+"','r1');FETCH ALL IN r1;";
        dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
}
/**
 * 每小时报表
 * @param req
 * @param res
 */
var hourlyReport = function(req,res){
    var arg = req.query;
    var sql = "SELECT * from sc_sdk_databank.fn_report_hour_data_new('" + arg['date1'] + "','" + arg['date2'] + "','"
        + arg['in_os'] + "','"+arg['area_app_ids']+"','r1');FETCH ALL IN r1;";

    cacheUtil.getFromCache('fiveMinutesReg', arg, sql, res,'pgLog');
}

var API ={
    getAreas:getAreas,
    getAreaCountrys:getAreaCountrys,
    getCountryApps:getCountryApps,
    getData: getDate,
    getAreaCountryGame :getAreaCountryGame,
    comprehensiveReport : comprehensiveReport,
    dailyReport: dailyReport,
    mediaReport: mediaReport,
    datamediaReport: datamediaReport,
    countryShow:countryShow,
    hourlyReport: hourlyReport,
    sysCompare:sysCompare
}
module.exports = API;