/**
 * Created by jishan.fan on 2016/4/13.
 */
var when = require('when');
var log = require('../utils/logUtil');
var dbUtil = require('../utils/dbPoolUtil');
var resDataUtil = require('../utils/resDataUtil');
var url = require('url');

var getGames = function (req, res) {
	var sql = 'select distinct app_id as game_id,app_name as game_name from sc_game_public_conf.t_c_game_zone where app_id in(SELECT area_app_id FROM "sc_sdk_databank"."t_c_area_app" where type = 1 and status = 1) order by app_id;'
	sql = 'select distinct app_id as game_id,app_name as game_name from sc_game_public_conf.t_c_game_zone where app_id in(SELECT area_app_id::int4 FROM "sc_sdk_databank"."t_c_area_app" where type = 1 and status = 1) order by app_id;'
	dbUtil.execSQL(sql, [], 'pgLog').then(function (data) {
		result = resDataUtil.success(data.result);
		res.end(result);
	}).catch(function (err) {
		res.end(resDataUtil.error('failed', err))
	});
};

var getAgentByGame = function (req, res) {
	var arg = req.query;
	var sql = 'select * from (' +
		'select DISTINCT region_id "id",region_name "name",app_id parent from sc_game_public_conf.t_c_game_zone where app_id =' + arg.app_id +
		' union select DISTINCT agent_id,agent_name,region_id from sc_game_public_conf.t_c_game_zone where app_id =' + arg.app_id +
		' union select DISTINCT game_zone_id,game_zone_name,agent_id from sc_game_public_conf.t_c_game_zone where app_id = ' + arg.app_id + ') a order by a.id';
	console.log(sql);
	dbUtil.execSQL(sql, [], 'pgLog').then(function (data) {
		result = resDataUtil.success(data.result);
		res.end(result);
	}).catch(function (err) {
		res.end(resDataUtil.error('failed', err))
	});
};
/**
 * ROI
 * **/
var getROITotalData = function (req, res) {
	var arg = req.query;
	var sql = "select * from sc_sdk_databank.fn_report_ROI_data('" + arg.begin_date + "','" + arg.end_date + "'," + arg['date_type'] + ",'" + arg['app_ids'] + "','" + arg['agent_ids'] + "','r1');fetch all in r1 ";
	console.log(sql);
	dbUtil.execSQL(sql, [], 'pgLog').then(function (data) {
		result = resDataUtil.success(data.result);
		res.end(result);
	}).catch(function (err) {
		res.end(resDataUtil.error('failed', err))
	});
};
/**ROI**/
var getROIChannelData = function (req, res) {
	var arg = req.query;
	var sql = "select * from sc_sdk_databank.fn_report_roi_day_channel('" + arg.begin_date + "'," + arg.game_id + ",'" + arg['agent_ids'] + "','r1');fetch all in r1 ";
	console.log(sql);
	dbUtil.execSQL(sql, [], 'pgLog').then(function (data) {
		result = resDataUtil.success(data.result);
		res.end(result);
	}).catch(function (err) {
		res.end(resDataUtil.error('failed', err))
	});
};
/**
 * ROI
 * **/
var getROIAgentData = function (req, res) {
	var arg = req.query;
	var sql = "select * from sc_sdk_databank.fn_report_roi_gamezone_data('" + arg.begin_date + "'," + arg.app_id + ",'r1');fetch all in r1 ";
	console.log(sql);
	dbUtil.execSQL(sql, [], 'pgLog').then(function (data) {
		result = resDataUtil.success(data.result);
		res.end(result);
	}).catch(function (err) {
		res.end(resDataUtil.error('failed', err))
	});
};
var API = {
	getGames: getGames,
	getAgentByGame: getAgentByGame,
	getROITotalData: getROITotalData,
	getROIChannelData: getROIChannelData,
	getROIAgentData: getROIAgentData
}

module.exports = API;