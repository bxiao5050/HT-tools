/**
 * 投放系统 系统及地区游戏数据源
 * 
 */
const state = {
  oldMenu: null,
  launchType: 0,
  os: [{
    id: '0,1',
    name: '安卓&IOS'
  }, {
    id: 0,
    name: '安卓'
  }, {
    id: 1,
    name: 'IOS'
  }],
  nowos: {
    id: '0,1',
    name: '安卓&IOS'
  },
  appData: [], //地区游戏数据源
  appList: [],
  nowApp: {},
  nowAppArea: {},
  nowAppCountry: {},
  nowAppGame: {},
  appState: 1,

  launchReportData: [],
  launchReportChartData: [],

  dataRepairData: []
}

const mutations = {
  setOldMenu: (state, menu) => {
    state.oldMenu = menu;
  },

  selectOs: (state, item) => {
    state.nowos = item;
  },
  setLaunchType: (state, type) => {
    state.launchType = type;
  },
  setAppData: (state, apps) => {
    state.appData = apps;
  },
  setAppList: (state, apps) => {
    state.appList = apps;
  },
  setNowApp: (state, nowapp) => {
    state.nowApp = nowapp;
  },
  setAppArea: (state, area) => {
    state.nowAppArea = area;
  },
  setAppCountry: (state, country) => {
    state.nowAppCountry = country;
  },
  setAppGame: (state, game) => {
    state.nowAppGame = game;
  },
  setAppState: (state, appState) => {
    state.appState = appState;
  },
  appStateAdd: (state, add) => {
    state.appState += add;
  },

  setLaunchReportData: (state, data) => {
    state.launchReportData = data;
  },
  setLaunchReportChartData: (state, data) => {
    state.launchReportChartData = data;
  },
  setDataRepairData: (state, data) => {
    state.dataRepairData = data;
  }
}

const actions = {
  setOldMenu: ({
    commit
  }, menu) => {
    commit("setOldMenu", menu)
  },

  selectOs: ({
    commit
  }, item) => {
    commit("selectOs", item)
  },
  setLaunchType: ({
    commit
  }, type) => {
    commit("setLaunchType", type);
  },

  initApps: ({
    commit,
    dispatch
  }, apps) => {
    var appData = initAppData(apps);
    dispatch("setAppData", appData);
  },

  initDataRepairApps: ({
    commit,
    dispatch
  }, apps) => {
    var appData = initAppData(apps);
    dispatch("setDataRepairAppData", appData);
  },

  setAppData: ({
    commit
  }, apps) => {
    commit("setAppData", apps);
    commit("setAppList", apps[0].childNode);
    commit("setNowApp", apps[0]);
    commit("setAppState", 1);
  },
  setDataRepairAppData: ({
    commit,
    dispatch
  }, apps) => {
    commit("setAppData", apps);
    commit("setAppList", apps[0].childNode[0].childNode[0].childNode);

    dispatch("setAppArea", apps[0].childNode[0]);
    dispatch("setAppCountry", apps[0].childNode[0].childNode[0]);

    commit("setNowApp", apps[0].childNode[0].childNode[0].childNode[0]);
    commit("setAppState", 3);

  },

  setAppList: ({
    commit
  }, list) => {
    commit("setAppList", list);
  },
  setNowApp: ({
    commit
  }, nowapp) => {
    commit("setNowApp", nowapp);
  },
  setAppArea: ({
    commit
  }, area) => {
    commit("setAppArea", area);
    commit("setAppCountry", {});
    commit("setAppGame", {});
  },
  setAppCountry: ({
    commit
  }, country) => {
    commit("setAppCountry", country);
    commit("setAppGame", {});
  },
  setAppGame: ({
    commit
  }, third) => {
    commit("setAppGame", third);
  },
  setAppState: ({
    commit
  }, channelState) => {
    commit("setAppState", channelState);
  },
  appStateAdd: ({
    commit
  }, add) => {
    commit("appStateAdd", add);
  },

  setLaunchReportData: ({
    commit
  }, data) => {
    commit("setLaunchReportData", data);
  },
  setLaunchReportChartData: ({
    commit
  }, data) => {
    commit("setLaunchReportChartData", data);
  },
  setDataRepairData: ({
    commit
  }, data) => {
    commit("setDataRepairData", data);
  }
}

const initAppData = (apps) => {
  var appData = [{
    unite_id: 1,
    type: -1,
    parent_id: 0,
    area_app_id: 0,
    area_app_name: "全部地区",
    sort: 0,
    childNode: []
  }];
  appData[0].childNode = getSonByParent(1, apps, 1);
  for (var i = 0; i < appData.length; i++) {
    appData[i].childNode = getSonByParent(appData[i].unite_id, apps, 2)
    for (var j = 0; j < appData[i].childNode.length; j++) {
      appData[i].childNode[j].childNode = getSonByParent(appData[i].childNode[j].unite_id, apps, 3)
      for (var k = 0; k < appData[i].childNode[j].childNode.length; k++) {
        appData[i].childNode[j].childNode[k].childNode = getSonByParent(appData[i].childNode[j].childNode[k].unite_id, apps, 4)
      }
    }
  }
  return appData;
}
const getSonByParent = (pid, apps, level) => {
  var result = [];
  for (var i = 0; i < apps.length; i++) {
    if (apps[i].parent_id == pid)
      result.push({
        unite_id: apps[i].unite_id,
        type: apps[i].type,
        parent_id: apps[i].parent_id,
        area_app_id: apps[i].app_id,
        area_app_name: apps[i].area_app_name,
        sort: apps[i].sort,
        childNode: []
      });
  }
  result.sort(function(a,b){
    return a.sort-b.sort;
  })
  return result;
}

const getters = {
  appData: state => state.appData,
  appList: state => state.appList,
  nowApp: state => state.nowApp,
  nowAppArea: state => state.nowAppArea,
  nowAppCountry: state => state.nowAppCountry,
  nowAppGame: state => state.nowAppGame,
  appState: state => state.appState
}

export default {
  state,
  mutations,
  actions,
  getters
}
