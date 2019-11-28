/**
 * Created by jishan.fan on 2016/5/12.
 */
var when            = require('when');
var log             = require('../utils/logUtil');
var dbUtil          = require('../utils/dbPoolUtil');
var resDataUtil     = require('../utils/resDataUtil');
var url             = require('url');
var excleHelper = require('../utils/excleHelper');
/**
 * ROI 整体情况
 * **/
var ROITotalDataExport = function (req,res){
    var arg=req.query;
    var total_sql = "select * from sc_sdk_databank.fn_report_ROI_data('"+arg.begin_date+"','"+arg.end_date+"',"+arg['date_type']+",'"+arg['app_ids']+"','"+arg['agent_ids']+"','r1');fetch all in r1 ";
    var sql=[total_sql];
    var pageName=['ROI整体状况'];
    var excleName = 'ROI整体状况';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName,'pgLog');
};
/**ROI 渠道状况**/
var ROIChannelDataExport = function(req,res){
    var arg=req.query;
    var channel_sql = "select * from sc_sdk_databank.fn_report_roi_day_channel('"+arg.begin_date+"',"+arg.game_id+",'"+arg['agent_ids']+"','r1');fetch all in r1 ";
    var sql=[channel_sql];
    var pageName=['ROI渠道状况'];
    var excleName = 'ROI渠道状况';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName,'pgLog');
};
/**
 * ROI分服状况
 * **/
var ROIAgentDataExport = function(req,res){
    var arg=req.query;
    var agent_sql = "select * from sc_sdk_databank.fn_report_roi_gamezone_data('"+arg.begin_date+"',"+arg.app_id+",'r1');fetch all in r1 ";
    var sql=[agent_sql];
    var pageName=['ROI分服状况'];
    var excleName = 'ROI分服状况';
    excleHelper.exportResultExcle(sql,req,res,pageName,excleName,'pgLog');
};
var API={
    ROITotalDataExport : ROITotalDataExport,
    ROIChannelDataExport : ROIChannelDataExport,
    ROIAgentDataExport : ROIAgentDataExport
}

module.exports =API;