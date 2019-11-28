/**
 * Created by weiqiang.yu on 2016/12/27.
 * 公用方法库
 */
import store from '../vuex/'
import httpRequest from './httpRequest'
import {
  Toast
} from 'mint-ui'
/**
 * 登录或绑定时获取url中的token
 */
const getUrlToken = () => {
    var url = window.location.href;
    var access_token;
    if (url.indexOf("?") != -1) {
      var para = url.split("?")[1]
      access_token = para.split("=")[0];
      return access_token;
    } else {
      Toast("未获取到参数")
      return "";
    }
  }
  /**
   * 判断当前代理商信息是否缓存
   * 是 从缓存中取值
   * 否 查询取值并保存到缓存中
   */
const judgeIsCacheAgent = (params, getData) => {
    var agentSource = store.state.agentstore.agentSource;
    var key = params.system_id + "|" + params.game_id + "|" + params.agent_id;
    var state = false;
    for (var index in agentSource) {
      if (agentSource[index].key == key) {
        getData(agentSource[index].data);
        return;
      }
    }
    httpRequest.getAgents(params, (data) => {
      agentSource.push({
        key: key,
        data: data
      });
      store.dispatch('setAgentSource', agentSource);
      getData(data)
    });
  }
  /**
   * 判断当前渠道信息是否缓存
   * 是 从缓存中取值
   * 否 查询取值并保存到缓存中
   */
const judgeIsCacheChannel = (params, getData) => {
    // var channelSource = store.state.channelstore.channelSource;
    // var key = params.system_id + "|" + params.game_id + "|" + params.channel_id;
    // var state = false;
    // for (var index in channelSource) {
    //   if (channelSource[index].key == key) {
    //     getData(channelSource[index].data);
    //     return;
    //   }
    // }
    httpRequest.getChannels(params, (data) => {
      // channelSource.push({
      //   key: key,
      //   data: data
      // });
      // store.dispatch('setChannelSource', channelSource);
      getData(data)
    });
  }
  /**
   * 获取五力模型7日时间数组
   */
const getDays = (datetype, date1) => {
  var date = [];

  // var date1 = moment().add(-1, 'day').format('YYYY-MM-DD');
  if (datetype == 1) {
    date1 = moment(date1).startOf('day').format('YYYY-MM-DD');
  } else if (datetype == 2) {
    date1 = moment(date1).startOf('week').format('YYYY-MM-DD');
  } else if (datetype == 3) {
    date1 = moment(date1).startOf('month').format('YYYY-MM-DD');
  }
  var i = 7;
  while (i >= 0) {
    if (datetype == 1) {
      date.push(moment(date1).add(0 - i, 'days').format('YYYY-MM-DD'));
    } else if (datetype == 2) {
      // date.push(moment(date1).add(0 - i, 'weeks').week() + "周")
      date.push(moment(date1).add(0 - i, 'weeks').weekday(1).format('YYYY-MM-DD'))
    } else if (datetype == 3) {
      date.push(moment(date1).add(0 - i, 'months').format('YYYY-MM-DD'));
    }
    i = i - 1;
  }
  return date;
}

/**
 * 根据五力模型外部选择的指标计算出详细指标
 */
const getIndexNameArr = (item) => {
  var indexArr = [];
  switch (item.pointertype_name) {
    case "注册用户数":
      indexArr = ["注册用户数", "滚服新用户数", "全新用户数"]
      break;
    case "新用户活跃人数":
    case "老用户活跃人数":
    case "活跃用户数":
      indexArr = ["新用户活跃人数", "老用户活跃人数", "活跃用户数"]
      break;

    case "老用户登录人数": //老用户登录人数（神曲、弹弹堂、乔峰传）
      indexArr = ["老用户登录人数", "老用户活跃人数"]
      break;
    case "全新用户数":
      indexArr = ["全新用户数"]
      break;
    case "登录用户数":
      indexArr = ["登录用户数"];
      break;
    case "首日注册创角数": //首日注册创角数（超神战队、九州天空城、全民弹弹堂、天龙八部）
      indexArr = ["注册用户数", "首日注册创角数"]
      break;
    case "户均在线时长":
      indexArr = ["户均在线时长"]
      break;
    case "户均在线时长(分)":
      indexArr = ["户均在线时长(分)"]
      break;
    case "在线峰值":
      indexArr = ["在线峰值"] //["在线均值", "最低在线"]
      break;
    case "活跃付费率":
      indexArr = ["活跃付费率", "新用户活跃付费率", "老用户活跃付费率"]
      break;
    case "付费用户数":
      indexArr = ["付费用户数", "新用户付费人数", "老用户付费人数", "全新用户付费人数", "滚服新用户付费人数"]
      break;
    case "付费ARPU":
      indexArr = ["付费ARPU", "注册ARPU", "活跃ARPU"]
      break;
    case "付费金额":
      indexArr = ["付费金额", "新用户付费金额", "老用户付费金额", "全新用户付费金额", "滚服新用户付费金额"]
      break;
  }
  return indexArr;
}
const DateFormat = (date, fmt) => {
    var o = {
      "M+": date.getMonth() + 1, //月份   
      "d+": date.getDate(), //日   
      "h+": date.getHours(), //小时   
      "m+": date.getMinutes(), //分   
      "s+": date.getSeconds(), //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  /**
   * 判断指标在数据源中是否存在
   */
const isExistIndex = (index, data) => {
    for (var i = 0; i < data.length; i++) {
      if (index == data[i].pointertype_name) {
        return true;
      }
    }
    return false;
  }
  /**
   * 检查对象是否为空
   */
const isEmptyObject = (e) => {
  var t;
  for (t in e)
    return !1;
  return !0
}

export default {
  getUrlToken,
  judgeIsCacheAgent,
  judgeIsCacheChannel,
  getDays,
  getIndexNameArr,
  DateFormat,
  isExistIndex,
  isEmptyObject
}
