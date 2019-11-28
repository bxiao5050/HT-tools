/**
 * 海外投放系统路由配置
 * Created by jishan.fan on 2016/8/11.
 */
var AppAPI = require('../api/appAPI');
var channelPriceAPI = require('../api/channelPriceAPI');
var countryAPI = require('../api/countryAPI');
var channelAPI = require('../api/channelAPI');
var channelRemarkAPI = require('../api/channelRemarkAPI');
var UploadAPI = require('../api/repairDataUpload');
var reportMapAPI = require('../api/reportMapAPI');
var roiApi = require('../api/roiApi');
var roiExportAPI = require('../api/roiExportAPI');
var fbReportAPI = require('../api/fbReportAPI');
var budgetManage = require('../api/budgetManage');
var adRoute = function (app) {
    /**
     * 【APP包名配置】查询接口
     */
    app.get('/api/app', AppAPI.query);

    app.get('/api/games', AppAPI.queryGames);
    /**
     * 【APP包名配置】修改接口
     */
    app.get('/api/app/update', AppAPI.updateApp);

    /**
     * 【APP包名配置】删除接口
     */
    app.post('/api/app/delete', AppAPI.deleteApp);

    /**
     * 【APP包名配置】增加接口
     */
    app.post('/api/app/add', AppAPI.addApp);


    /**
     * 查询渠道定价
     */
    app.get('/api/channelPrice', channelPriceAPI.queryChannelPrice);

    /**
     * 删除花费
     */
    app.post('/api/channelPrice/delete', channelPriceAPI.delPrice);

    /**
     * 增加固定花费
     */
    app.post('/api/channelPrice/cfc/add', channelPriceAPI.addFixedCost);
    /**
     * 增加固定单价
     */
    app.post('/api/channelPrice/cfp/add', channelPriceAPI.addFixedPrice);
    /**
     * 新加国定单价或固定花费时 重算花费数据
     * **/
    app.post('/api/channelPrice/cfp/recalculateCost', channelPriceAPI.recalculateCost);
    /**
     * 查询固定国家价格
     */
    app.get('/api/channelPrice/cfcp/query', channelPriceAPI.queryFixedCountryPriceById);

    /**
     * 增加固定国家价格
     */

    //app.post('/api/channelPrice/cfcp/add', channelPriceAPI.addFixedCountryPrice);


    /**
     * 获取国家列表
     */
    app.get('/api/country', countryAPI.query);

    /**
     * 获取status = 1的国家列表
     */
    app.get('/api/country/use', countryAPI.queryUseCountry);

    /**
     * 批量修改国家的状态
     */
    app.post('/api/country/update', countryAPI.updateCountryStatus);

    /**
     * 获取渠道详情
     */
    app.get('/api/channel/detail', channelAPI.query);

    /**
     * 获取该段时间所有的投放数据
     */
    app.get('/api/channel/total', channelAPI.queryTotalValue);
    /**
     * 获取该段时间每天的投放数据
     */
    app.get('/api/channel/total/perday', channelAPI.queryTotalValuePerDay);
    /**
     * 获取该段时间每天渠道(子渠道)的投放占比
     */
    app.get('/api/channel/detail/perday', channelAPI.queryDetailValuePerDay);
    /**
     * 获取该段时间每天渠道(子渠道)的投放数据-所有纬度
     */
    app.get('/api/channel/all', channelAPI.queryAllValueForTable);

    /**
     * 获取该段时间，游戏、类型下的数据备注
     */
    app.get('/api/channel/remark', channelAPI.queryRemark);

    /**
     * 获取游戏机型下的所有备注信息
     */
    app.get('/api/channel/remark/list', channelRemarkAPI.queryList);

    app.post('/api/channel/remark/add', channelRemarkAPI.add);

    app.post('/api/channel/remark/update', channelRemarkAPI.update);

    app.post('/api/channel/remark/delete', channelRemarkAPI.delete);
    /**
     * 查询一段时间内，某游戏os下的所有Media source
     */
    app.get('/api/media_source/query', channelAPI.queryMediaSource);

    /**
     * 查询游戏下所有的media source
     */
    app.get('/api/app/media_source/All', channelAPI.queryGameAllMediaSource);

    /**查询补录游戏的渠道包含自定义渠道**/
    app.get('/api/channel/media_source/query', channelAPI.getGameMediaSource);
    /**
     * 渠道手动录入激活、注册、花费
     */
    app.post('/api/channel/data/repair/add', channelAPI.addRepairData);
    /**
     * 修改补充数据
     */
    app.post('/api/channel/data/repair/edit', channelAPI.editRepairData);

    app.post('/api/upload/channel-repair-data', UploadAPI.uploadCSVForChanneDataRepair);

    app.get('/api/budgetManage/getBudgetData', budgetManage.getBudgetData);
    app.post('/api/budgetManage/importBudgetData', budgetManage.importBudgetData);
    /**
     * 根据时间、app_id、os查询录入数据
     */
    app.get('/api/channel/data/repair/query', channelAPI.queryRepairData);
    /**
     * 删除补充数据
     */
    app.post('/api/channel/data/repair/delete', channelAPI.delRepairData);




    ///**
    // * 获取地区
    // */
    //app.get('/api/reportmap/areas',reportMapAPI.getAreas);
    ///**
    // * 获取地区下面所有的国家信息
    // */
    //app.get('/api/reportmap/countrys',reportMapAPI.getAreaCountrys);
    ///**
    // * 获取国家下面所有的游戏信息
    // */
    //app.get('/api/reportmap/apps',reportMapAPI.getCountryApps);
    ///**
    // * 获取报表数据
    // */
    //app.get('/api/reportmap/data',reportMapAPI.getData);
    /**
     * 获取地区国家游戏表
     */
    app.get('/api/reportmap/getAreaCountryGame', reportMapAPI.getAreaCountryGame);
    /**
     * 获取综合报表
     */
    app.get('/api/reportmap/comprehensiveReport', reportMapAPI.comprehensiveReport);
    /**
     * 获取每日报表
     */
    app.get('/api/reportmap/dailyRp', reportMapAPI.dailyReport);
    /**
     * 获取媒体报表
     */
    app.get('/api/reportmap/mediaRp', reportMapAPI.mediaReport);
    /**
     * 获取系统对比
     */
    app.get('/api/reportmap/sysCompare', reportMapAPI.sysCompare);
    /**
     * 获取综合媒体报表
     */
    app.get('/api/reportmap/datamediaRp', reportMapAPI.datamediaReport);
    /**
     * 获取各国所占比
     */
    app.get('/api/reportmap/countryshow', reportMapAPI.countryShow);

    /**
     * 获取每小时报表
     */
    app.get('/api/reportmap/hourlyRp', reportMapAPI.hourlyReport);

    /*
     * ROI获取游戏列表接口
     * */
    app.get('/api/roi/getGames', roiApi.getGames);
    /*
     * 获取游戏区服
     * */
    app.get('/api/roi/getAgentByGame', roiApi.getAgentByGame);
    /**
     * ROI获取整体分布情况
     * **/
    app.get('/api/roi/getROITotalData', roiApi.getROITotalData);
    /**ROI整体状况导出**/
    app.get('/api/roi/export/ROITotalData', roiExportAPI.ROITotalDataExport);
    /**
     * ROI获取区服分布情况 查询导出
     * **/
    app.get('/api/roi/getROIAgentData', roiApi.getROIAgentData);
    app.get('/api/roi/export/ROIAgentData', roiExportAPI.ROIAgentDataExport);

    app.get('/api/reportmap/sendMail', fbReportAPI.sendMail);
    app.get('/api/reportmap/getMail', fbReportAPI.getMail);
    /**
     * ROI获取渠道媒体分布情况 查询 导出
     * **/
    app.get('/api/roi/getROIChannelData', roiApi.getROIChannelData);
    app.get('/api/roi/export/ROIChannelData', roiExportAPI.ROIChannelDataExport);


    app.get('/api/fbReport/getRunCountry', fbReportAPI.getRunCountry);
    app.get('/api/fbReport/getAreacompare', fbReportAPI.getAreacompare);
    app.get('/api/fbReport/getAreaGame', fbReportAPI.getAreaGame);
    app.get('/api/fbReport/getTotalData', fbReportAPI.getTotalData);
    app.get('/api/fbReport/getTotalCompare', fbReportAPI.getTotalCompare);
    app.get('/api/fbReport/getListData', fbReportAPI.getListData);
    app.get('/api/fbReport/getCreativeData', fbReportAPI.getCreativeData);
    app.get('/api/fbReport/getAnalysisData', fbReportAPI.getAnalysisData);

};
module.exports = adRoute;