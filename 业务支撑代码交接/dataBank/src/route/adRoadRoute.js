/**
 * 七道投放系统路由配置
 * Created by jishan.fan on 2016/8/11.
 */
"use strict";
var sevenRoadAPI = require('../api/7roadReportAPI');
var sevenRoadExportAPI =require('../api/7roadReportExportAPI');
var adRoadRoute = function(app){
    //获取符文投放渠道数据
    app.get('/api/7roadReport/popularize_getchannel',sevenRoadAPI.popularize_getchannel);
    app.get('/api/7roadReport/costmanage_getchannel',sevenRoadAPI.costmanage_getchannel);

    //获取推广明细分析数据
    app.get('/api/7roadReport/getPopularize_list',sevenRoadAPI.popularize_list);

    app.get('/api/7roadReport/export/getPopularize_list',sevenRoadExportAPI.popularize_list);
    //获取推广汇总分析数据
    app.get('/api/7roadReport/getPopularize_total',sevenRoadAPI.popularize_total);
    app.get('/api/7roadReport/export/getPopularize_total',sevenRoadExportAPI.popularize_total);
    //获取实时数据
    app.get('/api/7roadReport/getPopularize_realtime',sevenRoadAPI.popularize_realtime);
    app.get('/api/7roadReport/export/getPopularize_realtime',sevenRoadExportAPI.popularize_realtime);
    //获取留存数据
    app.get('/api/7roadReport/getPopularize_liucun',sevenRoadAPI.popularize_liucun);
    app.get('/api/7roadReport/export/getPopularize_liucun',sevenRoadExportAPI.popularize_liucun);

    app.get('/api/7roadReport/export/getAdGroupList',sevenRoadExportAPI.getAdGroupList);
    app.get('/api/7roadReport/export/getAdActivityList',sevenRoadExportAPI.getAdActivityList);

    app.get('/api/7roadReport/getAdGroupByGame',sevenRoadAPI.getAdGroupByGame);
    app.get('/api/7roadReport/adgroup_getchannel',sevenRoadAPI.adgroup_getchannel);
    app.get('/api/7roadReport/addAdgroup',sevenRoadAPI.addAdgroup);
    app.get('/api/7roadReport/delAdgroup',sevenRoadAPI.delAdgroup);
    app.get('/api/7roadReport/editAdgroup',sevenRoadAPI.editAdgroup);
    app.get('/api/7roadReport/getAdGroupUser',sevenRoadAPI.getAdGroupUser);
    app.get('/api/7roadReport/powerAdgroupUser',sevenRoadAPI.powerAdgroupUser);
    app.get('/api/7roadReport/getUserAdPower',sevenRoadAPI.getUserAdPower);
    app.get('/api/7roadReport/delUserPower',sevenRoadAPI.delUserPower);
    app.get('/api/7roadReport/getAdGroupByUserName',sevenRoadAPI.getAdGroupByUserName);
    app.get('/api/7roadReport/getUserActivity',sevenRoadAPI.getUserActivity);
    app.get('/api/7roadReport/adGroupPowerActivity',sevenRoadAPI.adGroupPowerActivity);
    app.get('/api/7roadReport/adGroupEditActivity',sevenRoadAPI.adGroupEditActivity);
    app.get('/api/7roadReport/delUserActivity',sevenRoadAPI.delUserActivity);
    app.get('/api/7roadReport/adActivity_getchannel',sevenRoadAPI.adActivity_getchannel);
    app.get('/api/7roadReport/getAdGroupList',sevenRoadAPI.getAdGroupList);
    app.get('/api/7roadReport/getAdActivityList',sevenRoadAPI.getAdActivityList);
    app.get('/api/7roadReport/newUserRegPayRate',sevenRoadAPI.newUserRegPayRate);
    app.get('/api/7roadReport/export/newUserRegPayRate',sevenRoadExportAPI.newUserRegPayRate);

    app.post('/api/7roadReport/costManage_upload',sevenRoadAPI.costManage_upload);
    app.get('/api/7roadReport/costManage_list',sevenRoadAPI.costManage_list);
    app.post('/api/7roadReport/costManage_add',sevenRoadAPI.costManage_add);
    app.post('/api/7roadReport/costManage_del',sevenRoadAPI.costManage_del);
    app.post('/api/7roadReport/costManage_update',sevenRoadAPI.costManage_update);
};
module.exports = adRoadRoute;