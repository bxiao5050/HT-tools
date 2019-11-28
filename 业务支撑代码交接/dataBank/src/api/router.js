/**
 * Created by xiaoyi on 2015/4/15.
 */

var Router = require('router')
var when = require('when');
var AppAPI = require('./appAPI');
var channelPriceAPI = require('./channelPriceAPI');
var channelAPI = require('./channelAPI');
var countryAPI = require('./countryAPI');
var UploadAPI = require('./repairDataUpload');
var OasAPI = require('./oasAPI');
var OasExportAPI = require('./oasExportAPI');
var userAPI = require('./userAPI');
var sdkApi = require('./sdkApi');
var ReportMapAPI = require('./reportMapAPI');
var roiApi = require('./roiApi');
var sevenRoadAPI = require('./7roadReportAPI');
var roiExportAPI = require('./roiExportAPI');
var channelRemarkAPI = require('./channelRemarkAPI');
var sessionMiddleware = require('../common/sessionMiddleware');
var accessMiddleware = require('../common/accessMiddleware');
var multiparty = require('connect-multiparty'), multipartyMiddleware = multiparty();
var masterInterface = require('../interface/masterInterface');
module.exports = function (app) {

    /**
     * 用户登录接口
     */
    // app.get('/login', sessionMiddleware.support, function (req, res) {
    //     var session = req.session;
    //     session.set('username', 'xiaoyi');
    //     session.set('admin', 'true');
    //     //res.end("已获得管理员权限，session时效2小时。主页地址：http://192.168.60.84:3000/index.html#/app/main");
    //     //res.render('index', { msg: '已获得管理员权限，session时效2小时。过时请刷新！', url:'http://www.baidu.com' });
    //     res.sendStatus(200);
    // });
    app.get('/api/user/loginInterface', userAPI.setCookie);
    app.get('/api/user/login', userAPI.getUserAccess);
    app.get('/api/user/getUser', userAPI.getUser);
    // app.get('/api/user/loginTest', sessionMiddleware.support, userAPI.checkUser);
    /**
     * 【APP包名配置】查询接口
     */
    app.get('/api/app', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, AppAPI.query);

    app.get('/api/games', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, AppAPI.queryGames);
    /**
     * 【APP包名配置】修改接口
     */
    app.get('/api/app/update', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, AppAPI.updateApp);

    /**
     * 【APP包名配置】删除接口
     */
    app.post('/api/app/delete', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, AppAPI.deleteApp);

    /**
     * 【APP包名配置】增加接口
     */
    app.post('/api/app/add', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, AppAPI.addApp);
    /**
     * 查询渠道定价
     */
    app.get('/api/channelPrice', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelPriceAPI.queryChannelPrice);

    /**
     * 删除花费
     */
    app.post('/api/channelPrice/delete', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelPriceAPI.delPrice);

    /**
     * 增加固定花费
     */
    app.post('/api/channelPrice/cfc/add', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelPriceAPI.addFixedCost);
    /**
     * 增加固定单价
     */
    app.post('/api/channelPrice/cfp/add', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelPriceAPI.addFixedPrice);
    /**
     * 新加国定单价或固定花费时 重算花费数据
     * **/
    app.post('/api/channelPrice/cfp/recalculateCost', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelPriceAPI.recalculateCost);
    /**
     * 查询固定国家价格
     */
    app.get('/api/channelPrice/cfcp/query', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelPriceAPI.queryFixedCountryPriceById);

    /**
     * 增加固定国家价格
     */

    app.post('/api/channelPrice/cfcp/add', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelPriceAPI.addFixedCountryPrice);


    /**
     * 获取国家列表
     */
    app.get('/api/country', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, countryAPI.query);

    /**
     * 获取status = 1的国家列表
     */
    app.get('/api/country/use', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, countryAPI.queryUseCountry);

    /**
     * 批量修改国家的状态
     */
    app.post('/api/country/update', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, countryAPI.updateCountryStatus);

    /**
     * 获取渠道详情
     */
    app.get('/api/channel/detail', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, sessionMiddleware.support, sessionMiddleware.checkUser, channelAPI.query);

    /**
     * 获取该段时间所有的投放数据
     */
    app.get('/api/channel/total', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.queryTotalValue);
    /**
     * 获取该段时间每天的投放数据
     */
    app.get('/api/channel/total/perday', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.queryTotalValuePerDay);
    /**
     * 获取该段时间每天渠道(子渠道)的投放占比
     */
    app.get('/api/channel/detail/perday', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.queryDetailValuePerDay);
    /**
     * 获取该段时间每天渠道(子渠道)的投放数据-所有纬度
     */
    app.get('/api/channel/all', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.queryAllValueForTable);

    /**
     * 获取该段时间，游戏、类型下的数据备注
     */
    app.get('/api/channel/remark', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.queryRemark);

    /**
     * 获取游戏机型下的所有备注信息
     */
    app.get('/api/channel/remark/list', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelRemarkAPI.queryList);

    app.post('/api/channel/remark/add', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelRemarkAPI.add);

    app.post('/api/channel/remark/update', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelRemarkAPI.update);

    app.post('/api/channel/remark/delete', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelRemarkAPI.delete);
    /**
     * 查询一段时间内，某游戏os下的所有Media source
     */
    app.get('/api/media_source/query', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.queryMediaSource);

    /**
     * 查询游戏下所有的media source
     */
    app.get('/api/app/media_source/All', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.queryGameAllMediaSource);

    /**查询补录游戏的渠道包含自定义渠道**/
    app.get('/api/channel/media_source/query', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.getGameMediaSource);
    /**
     * 渠道手动录入激活、注册、花费
     */
    app.post('/api/channel/data/repair/add', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.addRepairData);
    /**
     * 修改补充数据
     */
    app.post('/api/channel/data/repair/edit', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.editRepairData);

    app.post('/api/upload/channel-repair-data', UploadAPI.uploadCSVForChanneDataRepair);
    /**
     * 根据时间、app_id、os查询录入数据
     */
    app.get('/api/channel/data/repair/query', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.queryRepairData);
    /**
     * 删除补充数据
     */
    app.post('/api/channel/data/repair/delete', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.delRepairData);

    /**
     * 增加游戏预算
     */
    app.post('/api/app/data/budget/add', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.addGameBudget);
    /**
     * 查询预算信息
     */
    app.get('/api/app/data/budget/query', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.queryGameBudget);

    /**
     * 删除预算信息
     */
    app.post('/api/app/data/budget/delete', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.delGameBudget);

    /**
     * HOME页查询 各个游戏花费、充值数据
     */
    app.get('/api/app/cost-recharge', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, channelAPI.queryTotalCostAndRechargePerGame);
    /**
     * 分析系统 五分钟注册数据
     */
    app.get('/api/oas/5min-reg', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.fiveMinRegData);
    /**
     * 分析系统 五分钟充值数据
     */
    app.get('/api/oas/5min-recharge', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.fiveMinRechargeData);

    /**
     * 分析系统 五分钟在线数据
     */
    app.get('/api/oas/5min-online', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.fiveMinOnlineData);

    /**
     * 分析系统 五分钟数据导出
     */
    app.get('/api/oas/export/5min', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.fiveMinExport);
    //app.file()
    /**
     * 分析系统 五力模型 日数据
     */
    /*查询*/
    app.get('/api/oas/5li-day', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.fiveForceDayData);
    /*导出*/
    app.get('/api/oas/export/5li-day', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.fivePowerDayExport);
    /**
     * 分析系统 五力模型 周数据
     */
    /*查询*/
    app.get('/api/oas/5li-week', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.fiveForceWeekData);
    /*导出*/
    app.get('/api/oas/export/5li-week', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.fivePowerWeekExport);
    /**
     * 分析系统 五力模型 月数据
     */
    /*查询*/
    app.get('/api/oas/5li-month', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.fiveForceMonthData);
    /*导出*/
    app.get('/api/oas/export/5li-month', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.fivePowerMonthExport);

    app.get('/api/oas/nopay/5min-recharge', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.fiveMinRechargeDataNoPay);
    /**
     * 分析系统 五分钟数据导出
     */
    app.get('/api/oas/export/nopay/5min', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.fiveMinExportNoPay);
    //app.file()
    /**
     * 分析系统 五力模型 日数据
     */
    /*查询*/
    app.get('/api/oas/nopay/5li-day', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.fiveForceDayDataNoPay);
    /*导出*/
    app.get('/api/oas/export/nopay/5li-day', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.fivePowerDayExportNoPay);
    /**
     * 分析系统 五力模型 周数据
     */
    /*查询*/
    app.get('/api/oas/nopay/5li-week', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.fiveForceWeekDataNoPay);
    /*导出*/
    app.get('/api/oas/export/nopay/5li-week', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.fivePowerWeekExportNoPay);
    /**
     * 分析系统 五力模型 月数据
     */
    /*查询*/
    app.get('/api/oas/nopay/5li-month', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.fiveForceMonthDataNoPay);
    /*导出*/
    app.get('/api/oas/export/nopay/5li-month', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.fivePowerMonthExportNoPay);
    /**
     * 分析系统 新增用户
     */
    /*查询*/
    app.get('/api/oas/newUser', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.newUser);
    /*导出*/
    app.get('/api/oas/export/newUser', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.newUserExport);
    /**
     * 分析系统 活跃用户
     */
    /*查询*/
    app.get('/api/oas/activeUser', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.activeUser);
    /*导出*/
    app.get('/api/oas/export/activeUser', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.activeUserExport);
    /**
     * 分析系统 在线用户
     */
    /**查询**/
    app.get('/api/oas/onlineUser', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.onlineUser);
    /**导出**/
    app.get('/api/oas/export/onlineUser', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.onlineUserExport);
    /**
     * 分析系统 留存用户
     */
    /**查询**/
    app.get('/api/oas/retainUser', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.retainUser);
    /**导出**/
    app.get('/api/oas/export/retainUser', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.retainUserExport);
    /**
     * 分析系统 新手节点留存
     */
    /**查询**/
    app.get('/api/oas/steplost-newuser', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.newUserStepLost);
    /**导出**/
    app.get('/api/oas/export/steplost-newuser', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.NewUserLostStepExport);
    /**
     * 分析系统 虚拟货币消费类型
     */
    app.get('/api/oas/vpCatalog', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.virtualPointCatalog);
    /**
     * 分析系统 虚拟货币汇总数据
     */
    app.get('/api/oas/vpDetail', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.virtualPointDetail);
    /**
     * 分析系统 虚拟货币详细数据
     */
    app.get('/api/oas/vpList', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.virtualPointList);
    /**导出**/
    app.get('/api/oas/export/virtualPoint', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.virtualPointExport);
    /**
     * 分析系统 登录比
     */
    /**查询**/
    app.get('/api/oas/loginrate', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.loginRate);
    /**导出**/
    app.get('/api/oas/export/loginrate', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.loginrateExport);

    app.get('/api/oas/nopay/loginrate', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.loginRateNoPay);
    /**导出**/
    app.get('/api/oas/export/nopay/loginrate', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.loginrateExport);
    /**新用户注收比**/
    /**查询**/
    app.get('/api/oas/regPayRate', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasAPI.regPayRate);
    /**导出**/
    app.get('/api/oas/export/regPayRate', sessionMiddleware.support, sessionMiddleware.checkUser, accessMiddleware.checkAccess, OasExportAPI.regPayRate);
    /**余量分析**/
    app.get('/api/oas/userStock', sessionMiddleware.support, sessionMiddleware.checkUser, OasAPI.userStock);
    app.get('/api/oas/petStock', sessionMiddleware.support, sessionMiddleware.checkUser, OasAPI.petStock);
    app.get('/api/oas/export/userPetStock', sessionMiddleware.support, sessionMiddleware.checkUser, OasExportAPI.userPetStock);
    app.get('/api/oas/clearCache', OasAPI.clearCache);
    /**
     * SDK自动化打包相关接口
     * 主要进行请求转发
     */
    /**
     *  SDK自动化打包 - 查看游戏列表接口
     */
    app.get('/pocketgames/web/game/list', sdkApi.getGameList);
    /**
     * SDK自动化打包 - 查看游戏详情
     */
    app.get('/pocketgames/web/game/find', sdkApi.getGameDetail);

    /**
     * SDK自动化打包 - 添加游戏信息
     */
    app.post('/pocketgames/web/game/add', multipartyMiddleware, sdkApi.addGame);

    /**
     * SDK自动化打包 - 修改游戏信息
     */
    app.post('/pocketgames/web/game/edit', multipartyMiddleware, sdkApi.updateGame);

    /**
     *  SDK自动化打包 -查看同步数据
     */
    app.get('/pocketgames/web/game/refresh', sdkApi.refreshGame);
    /**
     * SDK自动化打包 - 签名列表
     */
    app.get('/pocketgames/web/cert/list', sdkApi.getCertList);
    /**
     * SDK自动化打包 - 删除签名
     */
    app.get('/pocketgames/web/cert/delete', sdkApi.delCert);
    /**
     * SDK自动化打包 - 添加签名
     */
    app.post('/pocketgames/web/cert/add', multipartyMiddleware, sdkApi.addCert);

    /**
     * SDK自动化打包 - 查看渠道
     */
    app.get('/pocketgames/web/channel/list', sdkApi.getChannelList);

    /**
     *SDK自动化打包 - 查看游戏当前渠道
     */
    app.get('/pocketgames/web/packageConfig/list', sdkApi.getGameChannelList);

    /**
     * SDK自动化打包 - 添加渠道
     */
    app.post('/pocketgames/web/packageConfig/add', multipartyMiddleware, sdkApi.addChannel);
    /**
     * SDK自动化打包 - 获取渠道配置参数信息
     */
    app.get('/pocketgames/web/packageConfigDetail/show', sdkApi.getChannelConfigs);
    /**
     * SDK自动化打包 - 修改渠道包名、参数配置
     */
    app.post('/pocketgames/web/packageConfigDetail/save', sdkApi.updateChannelConfig);

    /**
     *SDK自动化打包 - 获取渠道回调配置信息
     */
    app.get('/pocketgames/web/channelConfig/callback/detail', sdkApi.callbackConfigs);

    /**
     * SDK自动化打包 - 添加回调地址
     */
    app.post('/pocketgames/web/channelConfig/callback/add', sdkApi.addCallbackConfig);

    /**
     * SDK自动化打包-闪屏接口
     */
    app.get('/pocketgames/web/packageConfigDetail/splash/show', sdkApi.getSplashConfigs);

    /**
     * SDK自动化打包-闪屏上传接口
     */
    app.post('/pocketgames/web/packageConfigDetail/splash/save', multipartyMiddleware, sdkApi.addSplashConfig);

    /**
     * SDK自动化打包-获取游戏图标配置
     */
    app.get('/pocketgames/web/packageConfigDetail/icon/show', sdkApi.getIconConfigs);

    /**
     * SDK自动化打包-保存游戏图标配置
     */
    app.post('/pocketgames/web/packageConfigDetail/icon/save', multipartyMiddleware, sdkApi.addIconConfig);

    /**
     * SDK自动化打包-证书详情接口
     */
    app.get('/pocketgames/web/packageConfigDetail/cert/show', sdkApi.getCertConfigs);

    /**
     * SDK自动化打包-证书添加接口
     */
    app.post('/pocketgames/web/packageConfigDetail/cert/save', sdkApi.addCertChannel);

    /**
     * SDK自动化打包 -同步渠道接口
     */
    app.get('/pocketgames/web/packageConfig/refresh', sdkApi.refreshPackageConfig);

    /**
     * SDK自动化打包 -同步渠道配置详情接口
     */
    app.get('/pocketgames/web/packageConfigDetail/refresh', sdkApi.refreshPackageConfigDetail);

    /**
     * SDK自动化打包 - 查看版本
     */
    app.get('/pocketgames/web/gameVersion/list', sdkApi.getVersionList);

    /**
     * SDK自动化打包 - 添加版本
     */
    app.post('/pocketgames/web/gameVersion/add', multipartyMiddleware, sdkApi.addVersion);

    /**
     * SDK自动化打包 - 修改版本
     */
    app.post('/pocketgames/web/gameVersion/edit', multipartyMiddleware, sdkApi.updateVersion);


    /**
     * SDK自动化打包 -获取打包列表
     */
    app.get('/pocketgames/web/gamepackage/list', multipartyMiddleware, sdkApi.getPackageList);

    /**
     * SDK自动化打包 -打包添加接口
     */
    app.post('/pocketgames/web/gamepackage/add', sdkApi.addPackage);

    /**
     * SDK自动化打包 -获取打包状态
     */
    app.get('/pocketgames/web/gamepackage/find', sdkApi.getPackageStatus);

    /**
     * SDK自动化打包 -获取历史记录列表
     */
    app.get('/pocketgames/web/gamepackage/history', sdkApi.getHistoryList);

    /**
     * SDK自动化打包 -SDK资源包上传接口
     */
    app.post('/pocketgames/web/channel/upload', multipartyMiddleware, sdkApi.addPocketConfig);

    /**
     *  SDK自动化打包 -渠道包版本列表
     */
    app.get('/pocketgames/web/package/version/list', sdkApi.getChannelPackageList);

    /**
     * SDK自动化打包 -渠道包版本添加保存
     */
    app.post('/pocketgames/web/package/version/save', sdkApi.addPackageVersion);

    /**
     * 获取地区
     */
    app.get('/api/reportmap/areas', ReportMapAPI.getAreas);
    /**
     * 获取地区下面所有的国家信息
     */
    app.get('/api/reportmap/countrys', ReportMapAPI.getAreaCountrys);
    /**
     * 获取国家下面所有的游戏信息
     */
    app.get('/api/reportmap/apps', ReportMapAPI.getCountryApps);
    /**
     * 获取报表数据
     */
    app.get('/api/reportmap/data', ReportMapAPI.getData);
    /**
     * 获取地区国家游戏表
     */
    app.get('/api/reportmap/getAreaCountryGame', ReportMapAPI.getAreaCountryGame);
    /**
     * 获取综合报表
     */
    app.get('/api/reportmap/comprehensiveReport', ReportMapAPI.comprehensiveReport);
    /**
     * 获取每日报表
     */
    app.get('/api/reportmap/dailyRp', ReportMapAPI.dailyReport);
    /**
     * 获取媒体报表
     */
    app.get('/api/reportmap/mediaRp', ReportMapAPI.mediaReport);
    /**
     * 获取综合媒体报表
     */
    app.get('/api/reportmap/datamediaRp', ReportMapAPI.datamediaReport);
    /**
     * 获取各国所占比
     */
    app.get('/api/reportmap/countryshow', ReportMapAPI.countryShow);

    /**
     * 获取每小时报表
     */
    app.get('/api/reportmap/hourlyRp', ReportMapAPI.hourlyReport);

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
    /**
     * ROI获取渠道媒体分布情况 查询 导出
     * **/
    app.get('/api/roi/getROIChannelData', roiApi.getROIChannelData);
    app.get('/api/roi/export/ROIChannelData', roiExportAPI.ROIChannelDataExport);
    app.get('/master/getOASGameMenu', masterInterface.getOASGameMenu);
    app.get('/master/getOASGameAgent', masterInterface.getOASGameAgent);
    app.get('/master/getOASGamePayChannel', masterInterface.getOASGamePayChannel);
    app.get('/master/getOASGameRegChannel', masterInterface.getOASGameRegChannel);
    app.get('/master/getADSystemMenu', masterInterface.getADSystemMenu);
    app.get('/master/getSDKPackSystemMenu', masterInterface.getSDKPackSystemMenu);
    app.get('/master/getADRoadMenu', masterInterface.getADRoadMenu);
    /**
     * 7road符文投放系统
     */
    //获取符文投放渠道数据
    app.get('/api/7roadReport/popularize_getchannel', sevenRoadAPI.popularize_getchannel);
    //获取推广明细分析数据
    app.get('/api/7roadReport/getPopularize_list', sevenRoadAPI.popularize_list);
    //获取推广汇总分析数据
    app.get('/api/7roadReport/getPopularize_total', sevenRoadAPI.popularize_total);
    //获取实时数据
    app.get('/api/7roadReport/getPopularize_realtime', sevenRoadAPI.popularize_realtime);
    //获取留存数据
    app.get('/api/7roadReport/getPopularize_liucun', sevenRoadAPI.popularize_liucun);

    app.post('/api/7roadReport/costManage_upload', sevenRoadAPI.costManage_upload);
    app.get('/api/7roadReport/costManage_list', sevenRoadAPI.costManage_list);
    app.get('/api/7roadReport/costManage_add', sevenRoadAPI.costManage_add);
    app.get('/api/7roadReport/costManage_del', sevenRoadAPI.costManage_del);
    app.get('/api/7roadReport/costManage_update', sevenRoadAPI.costManage_update);
    // app.get('*', function (req, res) {
    //     res.end(404);
    // });
};