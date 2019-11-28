/**
 * Created by jishan.fan on 2016/8/11.
 */
"use strict";
var oasAPI = require('../api/oasAPI');
var oasExportAPI = require('../api/oasExportAPI');
var oasRoute = function(app){
    /**
     * 分析系统 根据系统获取注册渠道
     */
    app.get('/api/oas/getRegChannelByOS',  oasAPI.getRegChannelByOS);
    /**
     * 分析系统 五分钟注册数据
     */
    app.get('/api/oas/5min-reg',oasAPI.fiveMinRegData);
    /**
     * 分析系统 五分钟充值数据
     */
    app.get('/api/oas/5min-recharge',oasAPI.fiveMinRechargeData);

    /**
     * 分析系统 五分钟在线数据
     */
    app.get('/api/oas/5min-online',oasAPI.fiveMinOnlineData);

    /**
     * 分析系统 五分钟数据导出
     */
    app.get('/api/oas/export/5min-reg',oasExportAPI.fiveMinRegExport);
    app.get('/api/oas/export/5min-online',oasExportAPI.fiveMinOnlineExport);
    app.get('/api/oas/export/5min-pay',oasExportAPI.fiveMinPayExport);
    //app.file()
    /**
     * 分析系统 五力模型 日数据
     */
    /*查询*/
    app.get('/api/oas/5li-day',oasAPI.fiveForceDayData);
    /*导出*/
    app.get('/api/oas/export/5li-day',oasExportAPI.fivePowerDayExport);
    /**
     * 分析系统 五力模型 周数据
     */
    /*查询*/
    app.get('/api/oas/5li-week',oasAPI.fiveForceWeekData);
    /*导出*/
    app.get('/api/oas/export/5li-week',oasExportAPI.fivePowerWeekExport);
    /**
     * 分析系统 五力模型 月数据
     */
    /*查询*/
    app.get('/api/oas/5li-month', oasAPI.fiveForceMonthData);
    /*导出*/
    app.get('/api/oas/export/5li-month',oasExportAPI.fivePowerMonthExport);

    app.get('/api/oas/nopay/5min-recharge',oasAPI.fiveMinRechargeDataNoPay);
    /**
     * 分析系统 五分钟数据导出
     */
    app.get('/api/oas/export/nopay/5min-reg',oasExportAPI.fiveMinExportRegNoPay);
    app.get('/api/oas/export/nopay/5min-online',oasExportAPI.fiveMinExportOnlineNoPay);
    //app.file()
    /**
     * 分析系统 五力模型 日数据
     */
    /*查询*/
    app.get('/api/oas/nopay/5li-day',oasAPI.fiveForceDayDataNoPay);
    /*导出*/
    app.get('/api/oas/export/nopay/5li-day',oasExportAPI.fivePowerDayExportNoPay);
    /**
     * 分析系统 五力模型 周数据
     */
    /*查询*/
    app.get('/api/oas/nopay/5li-week',oasAPI.fiveForceWeekDataNoPay);
    /*导出*/
    app.get('/api/oas/export/nopay/5li-week',oasExportAPI.fivePowerWeekExportNoPay);
    /**
     * 分析系统 五力模型 月数据
     */
    /*查询*/
    app.get('/api/oas/nopay/5li-month',oasAPI.fiveForceMonthDataNoPay);
    /*导出*/
    app.get('/api/oas/export/nopay/5li-month',oasExportAPI.fivePowerMonthExportNoPay);
    /**
     * 分析系统 新增用户
     */
    /*查询*/
    app.get('/api/oas/newUser',oasAPI.newUser);
    /*导出*/
    app.get('/api/oas/export/newUser',oasExportAPI.newUserExport);
    /**
     * 分析系统 活跃用户
     */
    /*查询*/
    app.get('/api/oas/activeUser',oasAPI.activeUser);
    /*导出*/
    app.get('/api/oas/export/activeUser',oasExportAPI.activeUserExport);
    /**
     * 分析系统 在线用户
     */
    /**查询**/
    app.get('/api/oas/onlineUser',oasAPI.onlineUser);
    /**导出**/
    app.get('/api/oas/export/onlineUser',oasExportAPI.onlineUserExport);
    /**
     * 分析系统 留存用户
     */
    /**查询**/
    app.get('/api/oas/retainUser',oasAPI.retainUser);
    /**导出**/
    app.get('/api/oas/export/retainUser',oasExportAPI.retainUserExport);
    /**
     * 分析系统 新手节点留存
     */
    /**查询**/
    app.get('/api/oas/steplost-newuser',oasAPI.newUserStepLost);
    /**导出**/
    app.get('/api/oas/export/steplost-newuser',oasExportAPI.NewUserLostStepExport);
    /**
     * 分析系统 虚拟货币消费类型
     */
    app.get('/api/oas/vpCatalog',oasAPI.virtualPointCatalog);
    /**
     * 分析系统 虚拟货币汇总数据
     */
    app.get('/api/oas/vpDetail',oasAPI.virtualPointDetail);
    /**
     * 分析系统 虚拟货币详细数据
     */
    app.get('/api/oas/vpList',oasAPI.virtualPointList);
    /**导出**/
    app.get('/api/oas/export/virtualPoint',oasExportAPI.virtualPointExport);
    /**
     * 分析系统 登录比
     */
    /**查询**/
    app.get('/api/oas/loginrate',oasAPI.loginRate);
    /**导出**/
    app.get('/api/oas/export/loginrate',oasExportAPI.loginrateExport);

    app.get('/api/oas/nopay/loginrate',oasAPI.loginRateNoPay);
    /**导出**/
    app.get('/api/oas/export/nopay/loginrate',oasExportAPI.loginrateExport);
    /**新用户注收比**/
    /**查询**/
    app.get('/api/oas/regPayRate',oasAPI.regPayRate);
    /**导出**/
    app.get('/api/oas/export/regPayRate',oasExportAPI.regPayRate);
    /**余量分析**/
    app.get('/api/oas/userStock',oasAPI.userStock);
    app.get('/api/oas/petStock',oasAPI.petStock);
    app.get('/api/oas/export/userCurStock',oasExportAPI.userCurStock);
    app.get('/api/oas/export/userPetStock',oasExportAPI.userPetStock);
    app.get('/api/oas/clearCache',oasAPI.clearCache);
};
module.exports = oasRoute;