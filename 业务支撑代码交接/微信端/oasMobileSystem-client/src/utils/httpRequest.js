import axios from 'axios'
import qs from 'querystring'
import store from '../vuex/'
import dataviewConfig from './dataviewConfig'
import paramsMethod from './paramsMethod'
import paramFormater from './paramFormater.js'
import {
  Toast
} from 'mint-ui'
// const baseUrl = "http://wx.data.7road.com" //正式
// const httpUrl = "http://10.10.15.39:8080" //test
// const userPerm = "/userPerm" //用户权限url
// const moduleQuery = "/getQuery" //模块查询url
const version = "v1.3";

const method = "post"

/**
 * http请求
 */
const httpRequestClient = (url, data, callback) => {
    store.commit("showLoading");
    axios({
       baseURL: 'http://wx.data.7road.com/',
        //baseURL: 'http://127.0.0.1:8080/',
        method: method,
        url: url,
        data: qs.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: paramsMethod.getSystemId() != 4 ? 30000 : 100000,
      }).then(function (response) {
        if (response.data.result == "null") {
          store.commit("hideLoading");
          Toast("未知的异常发生了!");
        } else {
          store.commit("hideLoading");
          callback(response.data);
        }
      }, function (err) {
        console.error(err);
        Toast(err);
        store.commit("hideLoading");
      })
      .catch(function(err){
        console.error(err);
        Toast(err);
        store.commit("hideLoading");
      })

  }
  /**
   * 获取access_token
   */
const getAccessToken = () => {
  return store.state.basestore.accessToken;
}

/**
 * 绑定微信帐号
 */
const bindWeChat = (params, callback) => {
    var data = {
      user_name: params.username,
      password: params.password,
      safe_code: params.safecode,
      access_token: getAccessToken()
    }
    httpRequestClient("/api/" + version + "/bind", data, callback)
  }
  /**
   * 确认转移绑定
   */
const checkBind = (params, callback) => {
    var data = {
      key: params.key,
      isAccept: params.isAccept
    }
    httpRequestClient("/api/" + version + "/confire", data, callback)
  }
  /**
   * 重置安全码
   */
const resetCode = (params, callback) => {
    var data = {
      user_name: params.username,
      password: params.password,
      safe_code: params.safecode,
      access_token: getAccessToken()
    }
    httpRequestClient("/api/" + version + "/reset", data, callback)
  }
  /**
   * 登录系统
   */
const loginSys = (params, callback) => {
    var data = {
      safe_code: params.safecode,
      access_token: getAccessToken()
    }
    httpRequestClient("/api/" + version + "/login", data, callback)
  }
  /**
   * 获取游戏(包括系统)
   */
const getGames = (params, callback) => {
  var data = {
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/games", data, callback)
}
const changeGame = (callback) => {
    var system_id = paramsMethod.getSystemId();
    var game_id = paramsMethod.getGameId();
    var data = {
      access_token:getAccessToken()
    }
    httpRequestClient("/api/" + version + "/change/" + system_id + "/" + game_id, data, callback)
  }
  /**
   * 获取菜单
   */
const getMenus = (params, callback) => {
    var data = {
      access_token: getAccessToken()
    }
    httpRequestClient("/api/" + version + "/menus/" + params.system_id + "/" + params.game_id, data, callback)
  }
  /**
   * 获取代理商信息
   */
const getAgents = (params, callback) => {
    var data = {
      agent_id: params.agent_id,
      access_token: getAccessToken()
    }
    httpRequestClient("/api/" + version + "/agents/" + params.system_id + "/" + params.game_id, data, callback)
  }
  /**
   * 获取渠道信息
   */
const getChannels = (params, callback) => {
    var data = {
      channel_id: params.channel_id,
      access_token: getAccessToken()
    }
    httpRequestClient("/api/" + version + "/channels/" + params.system_id + "/" + params.game_id, data, callback)
  }
  /**
   * 投放系统 获取地区游戏信息
   */
const getApps = (callback) => {
    var params = paramFormater.getAppsParams();
    var dataview = dataviewConfig.getModuleDataView("getApps");
    var data = {
      params: JSON.stringify(params),
      access_token: getAccessToken()
    }
    httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
  }
  /**
   * 投放系统 获取综合报表数据
   */
const getLaunchReportData = (param, callback) => {
    var params = paramFormater.getLaunchReportParams(param);
    var dataview = dataviewConfig.getModuleDataView("launchReport");
    var data = {
      params: JSON.stringify(params),
      access_token: getAccessToken()
    }

    httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
  }
  /**
   * 投放系统 获取媒体信息
   */
const getMedias = (param, callback) => {
    var params = paramFormater.getMediasParams(param);
    var dataview = dataviewConfig.getModuleDataView("getMedias");
    var data = {
      params: JSON.stringify(params),
      access_token: getAccessToken()
    }
    httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
  }
  /**
   * 投放系统 获取数据补录数据
   */
const getDataRepairData = (param, callback) => {
  var params = paramFormater.getDataRepairParams(param);
  var dataview = dataviewConfig.getModuleDataView("dataRepairQuery");
  var data = {
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }

  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}

/**
 * 投放系统 数据补录
 */
const dataRepairAdd = (param, callback) => {
    var params = paramFormater.getDataRepairAddParams(param);
    var dataview = dataviewConfig.getModuleDataView("dataRepairAdd");
    var data = {
      params: JSON.stringify(params),
      access_token: getAccessToken()
    }

    httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
  }
  /**
   * 投放系统 数据删除
   */
const dataRepairDel = (param, callback) => {
    var params = paramFormater.getDataRepairDelParams(param);
    var dataview = dataviewConfig.getModuleDataView("dataRepairDel");
    var data = {
      params: JSON.stringify(params),
      access_token: getAccessToken()
    }

    httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
  }
  /**
   * 投放系统 数据修改
   */
const dataRepairEdit = (param, callback) => {
  var params = paramFormater.getDataRepairEditParams(param);
  var dataview = dataviewConfig.getModuleDataView("dataRepairEdit");
  var data = {
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }

  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}


/**
 * 清理查询缓存
 */
const clearCache = (param,callback) => {
    var data = {
      type: param.type,
      access_token: getAccessToken()
    }
    httpRequestClient("/sysAdmin", data, callback)
  }
  /**
   * 获取五力模型数据
   */
const getFiveForceData = (param, callback) => {
  var params = paramFormater.getFiveForceParams(param);
  var dataview;
  if (param.datetype == 1) {
    dataview = dataviewConfig.getModuleDataView("fiveForce_day");
  } else if (param.datetype == 2) {
    dataview = dataviewConfig.getModuleDataView("fiveForce_week");
  } else if (param.datetype == 3) {
    dataview = dataviewConfig.getModuleDataView("fiveForce_month");
  }

  var data = {
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}

/**
 * 获取五分钟视图数据
 */
const getFiveMinData = (param, callback) => {
  var params = paramFormater.getFiveMinParams(param);
  var dataview;
  if (param.type == 1) {
    dataview = dataviewConfig.getModuleDataView("fiveMin_pay");
  } else if (param.type == 2) {
    dataview = dataviewConfig.getModuleDataView("fiveMin_create");
  } else if (param.type == 3) {
    dataview = dataviewConfig.getModuleDataView("fiveMin_online");
  } else if (param.type == 4) {
    dataview = dataviewConfig.getModuleDataView("fiveMin_paycount");
  } else if(param.type == 5){
    dataview = dataviewConfig.getModuleDataView("fiveMin_reg");
  } else if(param.type == 6){
    dataview = dataviewConfig.getModuleDataView("fiveMin_activity");
  }

  var data = {
    dataview: dataview,
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}

/**
 * 获取新用户留存数据
 */
const getNewUserRetainData = (param, callback) => {
  var params = paramFormater.getNewUserRetainParams(param);
  var dataview = dataviewConfig.getModuleDataView("newUserRetain");
  var data = {
    dataview: dataview,
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}

/**
 * 获取游戏概况指标数据
 */
const getGameGKData = (param, callback) => {
  var params = paramFormater.getGameGKParams(param);
  var dataview;
  if (param.datetype == 1) {
    dataview = dataviewConfig.getModuleDataView("gameGK_key_day");
  } else if (param.datetype == 2) {
    dataview = dataviewConfig.getModuleDataView("gameGK_key_week");
  } else if (param.datetype == 3) {
    dataview = dataviewConfig.getModuleDataView("gameGK_key_month");
  }
  var data = {
    dataview: dataview,
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}

const getGameGKKeyChartData = (param, callback) => {
  var params = paramFormater.getGameGKKeyChartParams(param);
  var dataview;
  dataview = dataviewConfig.getModuleDataView("gameGK_key_detail_chart");
  var data = {
    dataview: dataview,
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}

const getGameGKPlayerRetainData = (param, callback) => {
  var params = paramFormater.getGameGKPlayerRetainParams(param);
  var dataview;
  dataview = dataviewConfig.getModuleDataView("gameGK_player_retain");
  var data = {
    dataview: dataview,
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}

const getGameGKLoseRetainData = (param, callback) => {
  var params = paramFormater.getGameGKLoseRetainParams(param);
  var dataview;
  dataview = dataviewConfig.getModuleDataView("gameGK_lose_retain");
  var data = {
    dataview: dataview,
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}

const getGameGKLoseDetailData = (param, callback) => {
  var params = paramFormater.getGameGKLoseDetailParams(param);
  var dataview;
  dataview = dataviewConfig.getModuleDataView("gameGK_lose_detail");
  var data = {
    dataview: dataview,
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}

let getMediaReportData = (param,callback)=>{
  var params = paramFormater.getMediaReportParams(param);
  var dataview;
  dataview = dataviewConfig.getModuleDataView("mediaReportData");
  var data = {
    dataview: dataview,
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}

let getMediaReportBySystemCompareData = (param,callback)=>{
  var params = paramFormater.getMediaReportParams(param);
  var dataview;
  dataview = dataviewConfig.getModuleDataView("mediaReportDataSystemCompare");
  var data = {
    dataview: dataview,
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}

let getMobileReportHourlyData = (param,callback)=>{
  var params = paramFormater.getMediaReportParams(param);
  var dataview;
  dataview = dataviewConfig.getModuleDataView("mobileReportHourly");
  var data = {
    dataview: dataview,
    params: JSON.stringify(params),
    access_token: getAccessToken()
  }
  httpRequestClient("/api/" + version + "/query/" + dataview, data, callback)
}
export default {
  bindWeChat,
  checkBind,
  loginSys,
  resetCode,
  getGames,
  changeGame,
  getMenus,
  getAgents,
  getChannels,
  getApps,
  getLaunchReportData,
  clearCache,
  getFiveForceData,
  getFiveMinData,
  getNewUserRetainData,
  getMedias,
  getDataRepairData,
  dataRepairAdd,
  dataRepairDel,
  dataRepairEdit,
  getGameGKData,
  getGameGKKeyChartData,
  getGameGKPlayerRetainData,
  getGameGKLoseRetainData,
  getGameGKLoseDetailData,
  getMediaReportData,
  getMediaReportBySystemCompareData,
  getMobileReportHourlyData
}
