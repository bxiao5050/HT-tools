import paramsMethod from "./paramsMethod"
/**
 * 查询脚本配置
 */
const dataviewConfig = {
  /**
   * 页游脚本配置
   */
  webConfig: {
    fiveForce_day: 'oas_FivePower_day', //五力模型日看盘
    fiveForce_week: 'oas_FivePower_week', //五力模型周看盘
    fiveForce_month: 'oas_FivePower_month', //五力模型月看盘
    fiveMin_pay: 'oas_FiveMinutes_payMoney', //五分钟充值
    fiveMin_create: 'oas_FiveMinutes_CreateActor', //五分钟创角
    fiveMin_online: 'oas_FiveMinutes_Online', //五分钟在线
    fiveMin_paycount: 'oas_FiveMinutes_payCount', // 五分钟付费人数
    newUserRetain: 'oas_NewUserRetainRate', //新用户留存
    gameGK_key_day:'oas_gameSummary_part1_day',//游戏概况-付费人气流失-日
    gameGK_key_week:'oas_gameSummary_part1_week',//游戏概况-付费人气流失-周
    gameGK_key_month:'oas_gameSummary_part1_month',//游戏概况-付费人气流失-月
    gameGK_key_detail_chart:'oas_gameSummary_detail',//游戏概况指标详细数据
    gameGK_player_retain:'oas_gameSummary_NewUserRetainRate',//游戏概况玩家留存
    gameGK_lose_retain:'oas_gameSummary_lose',//游戏概况玩家流失/回流
    gameGK_lose_detail:'oas_gameSummary_loseAnalysis',//游戏概况玩家流失详细分析
  },
  /**
   * 手游脚本配置
   */
  mobileConfig: {
    fiveForce_day: 'oas_mobile_FivePower_day', //五力模型日看盘
    fiveForce_week: 'oas_mobile_FivePower_week', //五力模型周看盘
    fiveForce_month: 'oas_mobile_FivePower_month', //五力模型月看盘
    fiveMin_pay: 'oas_mobile_FiveMinutes_payMoney', //五分钟充值
    fiveMin_create: 'oas_mobile_FiveMinutes_CreateActor', //五分钟创角
    fiveMin_online: 'oas_mobile_FiveMinutes_Online', //五分钟在线
    fiveMin_paycount: 'oas_mobile_FiveMinutes_payCount', // 五分钟付费人数
    fiveMin_reg:"oas_mobile_FiveMinutes_reg",//五分钟注册
    fiveMin_activity:"oas_mobile_FiveMinutes_activity",//五分钟注册
    newUserRetain: 'oas_mobile_NewUserRetainRate' //新用户留存
  },
  /**
   * 发行游戏脚本配置
   */
  releaseConfig: {
    fiveForce_day: 'oas_foreign_FivePower_day', //五力模型日看盘
    fiveForce_week: 'oas_foreign_FivePower_week', //五力模型周看盘
    fiveForce_month: 'oas_foreign_FivePower_month', //五力模型月看盘
    fiveMin_pay: 'oas_foreign_FiveMinutes_payMoney', //五分钟充值
    fiveMin_create: 'oas_foreign_FiveMinutes_CreateActor', //五分钟创角
    // fiveMin_online: 'oas_FiveMinutes_Online', //五分钟在线
    // fiveMin_paycount: 'oas_FiveMinutes_payCount' // 五分钟付费人数
    newUserRetain: 'oas_foreign_NewUserRetainRate' //新用户留存
  },
  /**
   * 投放系统脚本配置
   */
  launchConfig: {
    getApps: 'mobile_report_getApp',
    launchReport: 'mobile_report_data',
    getMedias: 'mobile_report_repair_getMediaSource',
    dataRepairQuery: 'mobile_report_repair_data',
    dataRepairAdd:'mobile_report_repair_add',
    dataRepairEdit:'mobile_report_repair_edit',
    dataRepairDel:'mobile_report_repair_del',
    mediaReportDataSystemCompare:'mobile_report_meidia',
    mediaReportData:'mobile_report_media_list',
    mobileReportHourly:'mobile_report_hourly_data'
  }
}

const getModuleDataView = (module_name) => {
  var systemId = paramsMethod.getSystemId();
  var res = [];
  var dataview;
  switch (systemId) {
    case 1:
      dataview = dataviewConfig.webConfig;
      break;
    case 2:
      dataview = dataviewConfig.mobileConfig;
      break;
    case 3:
      dataview = dataviewConfig.releaseConfig;
      break;
    case 4:
      dataview = dataviewConfig.launchConfig;
      break;
    case 5:
      dataview = dataviewConfig.mobileConfig;
      break;
    default:
      console.error("系统id不存在");
      break;
  }
  res=dataview[module_name]||"";
  return res;
}

export default {
  getModuleDataView
}
