/**
 * Created by jishan.fan on 2016/8/11.
 */
/**
 * 海外发行路由配置
 * Created by jishan.fan on 2016/8/11.
 */
"use strict";
var overSeasAPI = require('../api/overSeasAPI');
var overSeasExportAPI = require('../api/overSeasExportAPI');
var foreignOasRoute = function (app) {
    /**
     * 五分钟在线数据
     */
    app.get('/api/overSeas/5min-online', overSeasAPI.fiveMinOnlineData)
    /**
     * 五分钟注册数据
     */
    app.get('/api/overSeas/5min-reg', overSeasAPI.fiveMinRegData);
    /**
     * 海外发行 五分钟充值数据
     */
    app.get('/api/overSeas/5min-pay', overSeasAPI.fiveMinRechargeData);

    /**
     * 海外发行 五分钟数据导出
     */
    app.get('/api/overSeas/export/5min-reg', overSeasExportAPI.fiveMinRegExport);
    app.get('/api/overSeas/export/5min-pay', overSeasExportAPI.fiveMinPayExport);
    //app.file()
    /**
     * 海外发行 五力模型 日数据
     */
    /*查询*/
    app.get('/api/overSeas/5li-day', overSeasAPI.fiveForceDayData);
    /*导出*/
    app.get('/api/overSeas/export/5li-day', overSeasExportAPI.fivePowerDayExport);
    /**
     * 海外发行 五力模型 周数据
     */
    /*查询*/
    app.get('/api/overSeas/5li-week', overSeasAPI.fiveForceWeekData);
    /*导出*/
    app.get('/api/overSeas/export/5li-week', overSeasExportAPI.fivePowerDayExport);
    /**
     * 海外发行 五力模型 月数据
     */
    /*查询*/
    app.get('/api/overSeas/5li-month', overSeasAPI.fiveForceMonthData);
    /*导出*/
    app.get('/api/overSeas/export/5li-month', overSeasExportAPI.fivePowerMonthExport);

    app.get('/api/overSeas/bigRData', overSeasAPI.bigRData);
    app.get('/api/overSeas/export/bigRData', overSeasExportAPI.bigRDataExport);
    /*指标趋势看盘*/
    app.get('/api/overSeas/indexTrendDay', overSeasAPI.indexTrendDay);
    app.get('/api/overSeas/export/indexTrendDay', overSeasExportAPI.indexTrendDayExport);
    app.get('/api/overSeas/indexTrendWeek', overSeasAPI.indexTrendWeek);
    app.get('/api/overSeas/export/indexTrendWeek', overSeasExportAPI.indexTrendWeekExport);
    app.get('/api/overSeas/indexTrendMonth', overSeasAPI.indexTrendMonth);
    app.get('/api/overSeas/export/indexTrendMonth', overSeasExportAPI.indexTrendMonthExport);
    /*新用户留存率*/
    app.get('/api/overSeas/newUserRetainRate', overSeasAPI.newUserRetainRate);
    app.get('/api/overSeas/export/newUserRetainRate', overSeasExportAPI.newUserRetainRateExport);
    /*新用户注收比*/
    app.get('/api/overSeas/newUserRegIncomeRate', overSeasAPI.newUserRegIncomeRate);
    app.get('/api/overSeas/export/newUserRegIncomeRate', overSeasExportAPI.newUserRegIncomeRateExport);
    /*h5平台数据*/
    app.get('/api/overSeas/plateformDate', overSeasAPI.plateformDate);
    app.get('/api/overSeas/export/plateformDate', overSeasExportAPI.plateformDate);
};
module.exports = foreignOasRoute;
