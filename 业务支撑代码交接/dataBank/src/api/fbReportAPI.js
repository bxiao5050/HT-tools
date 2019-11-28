/**
 * Created by linlin.zhang on 2016/7/15.
 */
var when = require('when');
var log = require('../utils/logUtil');
var dbUtil = require('../utils/dbPoolUtil');
var resDataUtil = require('../utils/resDataUtil');
var url = require('url');
var fs = require('fs-extra');
var csv = require('csv-parser');
var formidable = require('formidable');
var util = require('util');
var moment = require('moment');
var xlsx = require('node-xlsx');
var excleHelper = require('../utils/excleHelper');
var mailUtil = require('../mail/emailUtil');

var getAreaGame = function (req, res) {
    // select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    // var sql = 'select a.area_id,a.area_name,b.game_id,b.game_name,a.area_type,to_char(a.create_time,\'yyyy-MM-dd\') "create_time" from sc_osa_db_fb_ad.t_e_area_game a join sc_osa_db_fb_ad.t_e_game b on a.game_id = b.game_id order by a.sort';

    var sql = 'select a.area_id,a.area_name,b.game_id,b.game_name,a.area_type,to_char(a.create_time,\'yyyy-MM-dd\') as create_time from sc_osa_db_fb_ad.t_e_area_game a join sc_osa_db_fb_ad.t_e_game b on a.game_id = b.game_id::varchar order by a.sort';
    
    dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
};
var getRunCountry = function (req, res) {
    var arg = req.query;
    //select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    var sql = 'select * from sc_osa_db_fb_ad.t_e_app_country where game_id = ' + arg['game_id'];
    dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
};
var getTotalData = function (req, res) {
    var arg = req.query;
    var type = arg['type'];
    //select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    var sql = "select * from sc_osa_db_fb_ad.fb_get_total_data('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['os'] + "',\'CHS\','" + arg['game_ids'] + "',\'r1\');FETCH all in r1";
    console.log(sql);
    if (type == 'select')
        dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
    else if (type == 'export')
        excleHelper.exportResultExcle([sql], req, res, ['fb数据分析'], 'fb数据分析');
};
var getTotalCompare = function (req, res) {
    var arg = req.query;
    var type = arg['type'];
    //select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    var sql = "select * from sc_osa_db_fb_ad.fb_get_total_syscompare_data('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['os'] + "',\'CHS\','" + arg['game_ids'] + "',\'r1\',\'r2\');FETCH all in r1;FETCH all in r2;";
    console.log(sql);
    if (type == 'select')
        dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
    else if (type == 'export')
        excleHelper.exportResultExcle([sql], req, res, ['fb数据分析'], 'fb数据分析');
};
var getAreacompare = function (req, res) {
    var arg = req.query;
    var type = arg['type'];
    //select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    var sql = "select * from sc_osa_db_fb_ad.fb_get_areacompare_data('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['os'] + "',\'CHS\','" + arg['game_ids'] + "','" + arg['area_code'] + "',\'r1\');FETCH all in r1;";
    console.log(sql);
    if (type == 'select')
        dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
    else if (type == 'export')
        excleHelper.exportResultExcle([sql], req, res, ['fb数据分析'], 'fb数据分析');
};
var getListData = function (req, res) {
    var arg = req.query;
    var type = arg['type'];
    //select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    var sql = "select * from sc_osa_db_fb_ad.fb_get_list_data('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['os'] + "',\'CHS\','" + arg['game_ids'] + "',\'r1\');FETCH all in r1;";
    console.log(sql);
    if (type == 'select')
        dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
    else if (type == 'export')
        excleHelper.exportResultExcle([sql], req, res, ['fb数据分析'], 'fb数据分析');
};
var getCreativeData = function (req, res) {
    var arg = req.query;
    var type = arg['type'];
    //select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    var sql = "select * from sc_osa_db_fb_ad.fb_get_creative_data('" + arg['date1'] + "','" + arg['date2'] + "','" + arg['os'] + "',\'CHS\','" + arg['game_ids'] + "',\'r1\');FETCH all in r1;";
    console.log(sql);
    if (type == 'select')
        dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
    else if (type == 'export')
        excleHelper.exportResultExcle([sql], req, res, ['fb数据分析'], 'fb数据分析');
};
var getAnalysisData = function (req, res) {
    var arg = req.query;
    var type = arg['type'];
    //select spread_url "id",spread_name||'-'||spread_url "name" from sc_game_dw_ad.t_c_td_spread_info;
    var sql = "select * from sc_osa_db_fb_ad.fb_get_analysis_data('" + arg['date1'] + "','" + arg['date2'] + "',\'CHS\','" + arg['game_ids'] + "'," + arg['time_type'] + ",\'r1\',\'r2\');FETCH all in r1;FETCH all in r2;";
    console.log(sql);
    if (type == 'select')
        dbUtil.execSQL(sql, [], 'pgLog')
        .then(function (data) {
            res.end(resDataUtil.success(data.result));
        })
        .catch(function (err) {
            res.end(resDataUtil.error('failed', err))
        });
    else if (type == 'export')
        excleHelper.exportResultExcle([sql], req, res, ['fb数据分析'], 'fb数据分析');
};
var sendMail = function (req, res) {
    var arg = req.query;
    mailUtil.sendMail(arg["count_date"]).then(function (result) {
        res.end(resDataUtil.success(result));
    });
}
var getMail = function (req, res) {
    var arg = req.query;
    mailUtil.getMail(arg["count_date"]).then(function (result) {
        res.end(resDataUtil.success(result));
    }, function (err) {
        res.end(resDataUtil.error('failed', err))
    });
}
var API = {
    getAreaGame: getAreaGame,
    getRunCountry: getRunCountry,
    getTotalData: getTotalData,
    getTotalCompare: getTotalCompare,
    getListData: getListData,
    getAreacompare: getAreacompare,
    getCreativeData: getCreativeData,
    getAnalysisData: getAnalysisData,
    sendMail: sendMail,
    getMail: getMail
}
module.exports = API;