/**
 * 参数方法库
 */
import store from "../vuex/"
import httpRequest from './httpRequest'
/**
 * 获取系统id
 */
const getSystemId = () => {
    return store.state.basestore.nowgame.system_id;
  }
  /**
   * 获取游戏id
   */
const getGameId = () => {
    return store.state.basestore.nowgame.game_id;
  }
  /**
   * 获取代理商id
   */
const getAgentId = () => {
    return store.state.agentstore.nowAgentParam.map(function (node) {
      return node.AGENT_ID;
    }).join(",") || "";
  }
  /**
   * 获取渠道id(手游)
   */
const getChannelId = () => {
    var channels = store.state.channelstore.channels;
    var now = store.state.channelstore.nowChannel;
    var res = [];
    for (var i = 0; i < channels.length; i++) {
      if (channels[i].CHANNEL_ID == now.CHANNEL_ID) {
        for (var j = 0; j < channels[i].childNode.length; j++) {
          res.push(channels[i].childNode[j].CHANNEL_ID);
        }
        break;
      } else {
        res.push(now.CHANNEL_ID)
        break;
      }
    }
    return res.join(",") || "";;
  }
  /**
   * 获取二级渠道id和包id(发行)
   */
const getChannel = () => {
  var channels = store.state.channelstore.channels;
  var now = store.state.channelstore.nowChannel;
  var result;
  var secondRes = [];
  var thirdRes = [];
  var isSecond = false;
  var isThird = false;
  for (var i = 0; i < channels.length; i++) {
    if (channels[i].CHANNEL_ID == now.CHANNEL_ID) {
      for (var j = 0; j < channels[i].childNode.length; j++) {
        secondRes.push(channels[i].childNode[j].CHANNEL_ID);
        for (var k = 0; k < channels[i].childNode[j].childNode.length; k++) {
          thirdRes.push(channels[i].childNode[j].childNode[k].CHANNEL_ID);
        }
      }
      break;
    } else {
      for (var j = 0; j < channels[i].childNode.length; j++) {
        if (channels[i].childNode[j].CHANNEL_ID == now.CHANNEL_ID) {
          secondRes.push(channels[i].childNode[j].CHANNEL_ID);
          for (var k = 0; k < channels[i].childNode[j].childNode.length; k++) {
            thirdRes.push(channels[i].childNode[j].childNode[k].CHANNEL_ID);
          }
          isSecond = true;
          break;
        } else {
          secondRes = [channels[i].childNode[j].CHANNEL_ID];
          for (var k = 0; k < channels[i].childNode[j].childNode.length; k++) {
            if (channels[i].childNode[j].childNode[k].CHANNEL_ID == now.CHANNEL_ID) {
              thirdRes.push(channels[i].childNode[j].childNode[k].CHANNEL_ID);
              isThird = true;
              break;
            }
          }
        }
        if (isThird) break;
      }
      if (isSecond) break;
    }
  }
  result = {
    channelId: Array.from(new Set(secondRes)).join(","),
    packageId: Array.from(new Set(thirdRes)).join(",")
  }
  return result;
}

/**
 * 获取os id
 */
const getOsId = () => {
  return store.state.launchAreaStore.nowos.id;
}

/**
 * 获取多语言language
 */
const getLanguage = () => {
  return "CHS";
}

const getAppId = () => {
  var appData = store.state.launchAreaStore.appData;
  var nowApp = store.state.launchAreaStore.nowApp;
  var unitedIds = [];
  var appIds = [];
  if (nowApp.unite_id == 1) {
    for (var i = 0; i < appData[0].childNode.length; i++) {
      unitedIds.push(appData[0].childNode[i].unite_id);
      appIds.push(appData[0].childNode[i].area_app_id);
    }
  } else {
    if (nowApp.type != 1) {
      unitedIds.push(nowApp.childNode.map(function (node) {
        return node.unite_id;
      }));
      appIds.push(nowApp.childNode.map(function (node) {
        return node.area_app_id;
      }));
    } else {
      unitedIds.push(nowApp.unite_id);
      appIds.push(nowApp.area_app_id);
    }
  }
  if (store.state.launchAreaStore.oldMenu.menu_url == "launchReport") {
    return unitedIds.join(",");
  } else if (store.state.launchAreaStore.oldMenu.menu_url == "dataRepair") {
    return appIds.join(",");
  } else if(store.state.launchAreaStore.oldMenu.menu_url == "gameReport"){
    return unitedIds.join(",");
  }


}


export default {
  getSystemId,
  getGameId,
  getAgentId,
  getChannelId,
  getChannel,
  getOsId,
  getLanguage,
  getAppId
}
