import paramsMethod from './paramsMethod'

const getFiveForceParams = (param) => {
  var system_id = paramsMethod.getSystemId();
  var params = [];
  if (system_id == 1) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 2
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 3
    }, {
      param: "language",
      type: 2,
      value: paramsMethod.getLanguage(),
      index: 4
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 5
    }]
  } else if (system_id == 3) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 2
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 3
    }, {
      param: "language",
      type: 2,
      value: paramsMethod.getLanguage(),
      index: 4
    }, {
      param: "channel_id",
      type: 2,
      value: paramsMethod.getChannel().channelId,
      index: 5
    }, {
      param: "package_id",
      type: 2,
      value: paramsMethod.getChannel().packageId,
      index: 6
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 7
    }]
  }  else  {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 2
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 3
    }, {
      param: "language",
      type: 2,
      value: paramsMethod.getLanguage(),
      index: 4
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 5
    }, {
      param: "channel_id",
      type: 2,
      value: paramsMethod.getChannelId(),
      index: 6
    }]
  }
  return params;
}

const getFiveMinParams = (param) => {
  var system_id = paramsMethod.getSystemId();
  var params = [];
  if (system_id == 1) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "date2",
      type: 2,
      value: param.date2,
      index: 2
    }, {
      param: "date3",
      type: 2,
      value: param.date3,
      index: 3
    }, {
      param: "config_id",
      type: 1,
      value: 0,
      index: 4
    }, {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 5
    }, {
      param: "language",
      type: 2,
      value: paramsMethod.getLanguage(),
      index: 6
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 7
    }, {
      param: "rand",
      type: 3,
      value: "1",
      index: 8
    }, {
      param: "select_id",
      type: 1,
      value: 0,
      index: 9
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 10
    }];
  } else if (system_id == 2) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "date2",
      type: 2,
      value: param.date2,
      index: 2
    }, {
      param: "date3",
      type: 2,
      value: param.date3,
      index: 3
    }, {
      param: "channel_id",
      type: 2,
      value: paramsMethod.getChannelId(),
      index: 4
    }, {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 5
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 6
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 7
    }];
  } else if (system_id == 3) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "date2",
      type: 2,
      value: param.date2,
      index: 2
    }, {
      param: "date3",
      type: 2,
      value: param.date3,
      index: 3
    }, {
      param: "channel_id",
      type: 2,
      value: paramsMethod.getChannel().channelId,
      index: 4
    }, {
      param: "package_id",
      type: 2,
      value: paramsMethod.getChannel().packageId,
      index: 5
    }, {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 6
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 7
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 7
    }];
  }
  return params;
}

const getNewUserRetainParams = (param) => {
  var system_id = paramsMethod.getSystemId();
  var params = [];
  if (system_id == 1) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "date2",
      type: 2,
      value: param.date2,
      index: 2
    }, {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 3
    }, {
      param: "select_id",
      type: 1,
      value: param.select_id,
      index: 4
    }, {
      param: "language",
      type: 2,
      value: paramsMethod.getLanguage(),
      index: 5
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 6
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 7
    }];
  } else if (system_id == 2) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "date2",
      type: 2,
      value: param.date2,
      index: 2
    }, {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 3
    }, {
      param: "select_id",
      type: 1,
      value: param.select_id,
      index: 4
    }, {
      param: "language",
      type: 2,
      value: paramsMethod.getLanguage(),
      index: 5
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 6
    }, {
      param: "channel_id",
      type: 2,
      value: paramsMethod.getChannelId(),
      index: 7
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 8
    }];
  } else if (system_id == 3) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "date2",
      type: 2,
      value: param.date2,
      index: 2
    }, {
      param: "channel_id",
      type: 2,
      value: paramsMethod.getChannel().channelId,
      index: 3
    }, {
      param: "package_id",
      type: 2,
      value: paramsMethod.getChannel().packageId,
      index: 4
    }, {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 5
    }, {
      param: "language",
      type: 2,
      value: paramsMethod.getLanguage(),
      index: 6
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 7
    }, {
      param: "select_id",
      type: 1,
      value: param.select_id,
      index: 8
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 9
    }];
  }
  return params;
}

const getAppsParams = () => {
  var system_id = paramsMethod.getSystemId();
  var params = [];
  if (system_id == 4) {
    params = [{
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 1
    }, {
      param: "game_id",
      type: 2,
      value: paramsMethod.getGameId(),
      index: 2
    }]
  }
  return params;
}

const getLaunchReportParams = (param) => {
  var system_id = paramsMethod.getSystemId();
  var params = [];
  if (system_id == 4) {
    params = [{
      param: "begin_date",
      type: 2,
      value: param.begin_date,
      index: 1
    }, {
      param: "end_date",
      type: 2,
      value: param.end_date,
      index: 2
    }, {
      param: "in_os",
      type: 2,
      value: paramsMethod.getOsId(),
      index: 3
    }, {
      param: "area_app_ids",
      type: 2,
      value: paramsMethod.getAppId(),
      index: 4
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 5
    }, {
      param: "game_id",
      type: 2,
      value: paramsMethod.getGameId(),
      index: 6
    }]
  }
  return params;
}

const getMediasParams = (param) => {
  var system_id = paramsMethod.getSystemId();
  var params = [];
  if (system_id == 4) {
    params = [{
      param: "app_id",
      type: 1,
      value: Number(paramsMethod.getAppId()),
      index: 1
    }, {
      param: "in_os",
      type: 2,
      value: param.os_id.toString(),
      index: 2
    }, {
      param: "system_id",
      type: 2,
      value: paramsMethod.getSystemId(),
      index: 3
    }, {
      param: "game_id",
      type: 2,
      value: paramsMethod.getGameId(),
      index: 4
    }]
  }
  return params;
}

const getDataRepairParams = (param) => {
  var system_id = paramsMethod.getSystemId();
  var params = [];
  if (system_id == 4) {
    params = [{
      param: "area_app_ids",
      type: 1,
      value: Number(paramsMethod.getAppId()),
      index: 1
    }, {
      param: "in_os",
      type: 2,
      value: paramsMethod.getOsId(),
      index: 2
    }, {
      param: "count_date",
      type: 2,
      value: param.date1,
      index: 3
    }, {
      param: "media_source",
      type: 2,
      value: param.media_source,
      index: 4
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 5
    }, {
      param: "game_id",
      type: 2,
      value: paramsMethod.getGameId(),
      index: 6
    }]
  }
  return params;
}

const getDataRepairAddParams = (param) => {
  var system_id = paramsMethod.getSystemId();
  var params = [];
  if (system_id == 4) {
    params = [{
      param: "count_date",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "app_id",
      type: 1,
      value: Number(paramsMethod.getAppId()),
      index: 2
    }, {
      param: "in_os",
      type: 3,
      value: param.os_id.toString(),
      index: 3
    }, {
      param: "media_source",
      type: 3,
      value: param.media_source,
      index: 4
    }, {
      param: "installs",
      type: 1,
      value: param.installs,
      index: 5
    }, {
      param: "regs",
      type: 1,
      value: param.regs,
      index: 6
    }, {
      param: "roles",
      type: 1,
      value: param.roles,
      index: 7
    }, {
      param: "costs",
      type: 3,
      value: param.cost.toString(),
      index: 8
    }, {
      param: "addType",
      type: 1,
      value: param.type,
      index: 9
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 10
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 11
    }]
  }
  return params;
}
const getDataRepairDelParams = (param) => {
  var system_id = paramsMethod.getSystemId();
  var params = [];
  if (system_id == 4) {
    params = [{
      param: "in_id",
      type: 3,
      value: param.in_id,
      index: 1
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 2
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 3
    }]
  }
  return params;
}

const getDataRepairEditParams = (param) => {
  var system_id = paramsMethod.getSystemId();
  var params = [];
  if (system_id == 4) {
    params = [{
      param: "in_id",
      type: 3,
      value: param.id,
      index: 1
    }, {
      param: "count_date",
      type: 2,
      value: param.count_date,
      index: 2
    }, {
      param: "app_id",
      type: 4,
      value: param.app_id,
      index: 3
    }, {
      param: "in_os",
      type: 3,
      value: param.os,
      index: 4
    }, {
      param: "media_source",
      type: 3,
      value: param.media_source,
      index: 5
    }, {
      param: "installs",
      type: 1,
      value: param.installs,
      index: 6
    }, {
      param: "regs",
      type: 1,
      value: param.regs,
      index: 7
    }, {
      param: "roles",
      type: 1,
      value: param.roles,
      index: 8
    }, {
      param: "costs",
      type: 3,
      value: param.cost.toString(),
      index: 9
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 10
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 11
    }]
  }
  return params;
}


const getGameGKParams = (param) => {
  var game_id = paramsMethod.getGameId();
  var params = [];
  if (game_id == 1 || game_id == 2 || game_id == 17) {
    params = [{
      param: "count_date",
      type: 2,
      value: param.count_date,
      index: 1
    }, {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 2
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 3
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 4
    }, ]
  }
  return params;
}

const getGameGKKeyChartParams = (param) => {
  var game_id = paramsMethod.getGameId();
  var params = [];
  if (game_id == 1 || game_id == 2 || game_id == 17) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "date2",
      type: 2,
      value: param.date2,
      index: 2
    }, {
      param: "selected_id",
      type: 1,
      value: param.selected_id,
      index: 3
    }, {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 4
    }, {
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 5
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 6
    }, ]
  }
  return params;
}

const getGameGKPlayerRetainParams= (param) => {
  var game_id = paramsMethod.getGameId();
  var params = [];
  if (game_id == 1 || game_id == 2 || game_id == 17) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "date2",
      type: 2,
      value: param.date2,
      index: 2
    },  {
      param: "agent_id",
      type: 2,
      value: paramsMethod.getAgentId(),
      index: 3
    }, {
      param: "select_id",
      type: 1,
      value: 1,
      index: 4
    },{
      param: "language",
      type: 3,
      value: paramsMethod.getLanguage(),
      index: 5
    },{
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 6
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 7
    }, ]
  }
  return params;
}
const getGameGKLoseRetainParams=(param) => {
  var game_id = paramsMethod.getGameId();
  var params = [];
  if (game_id == 1 || game_id == 2 || game_id == 17) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "date2",
      type: 2,
      value: param.date2,
      index: 2
    },  {
      param: "agent_id",
      type: 3,
      value: paramsMethod.getAgentId(),
      index: 3
    }, {
      param: "user_type",
      type: 1,
      value: param.user_type,
      index: 4
    },{
      param: "time_type",
      type: 1,
      value: param.time_type,
      index: 5
    },{
       param: "config_id",
      type: 1,
      value: param.config_id,
      index: 6
    },{
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 7
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 8
    }]
  }
  return params;
}

const getGameGKLoseDetailParams=(param) => {
  var game_id = paramsMethod.getGameId();
  var params = [];
  if (game_id == 1 || game_id == 2 || game_id == 17) {
    params = [{
      param: "date1",
      type: 2,
      value: param.date1,
      index: 1
    }, {
      param: "date2",
      type: 2,
      value: param.date2,
      index: 2
    },  {
      param: "agent_id",
      type: 3,
      value: paramsMethod.getAgentId(),
      index: 3
    }, {
      param: "user_type",
      type: 1,
      value: param.user_type,
      index: 4
    },{
      param: "time_type",
      type: 1,
      value: param.time_type,
      index: 5
    },{
       param: "config_id",
      type: 1,
      value: param.config_id,
      index: 6
    },{
      param: "game_id",
      type: 1,
      value: paramsMethod.getGameId(),
      index: 7
    }, {
      param: "system_id",
      type: 1,
      value: paramsMethod.getSystemId(),
      index: 8
    }, ]
  }
  return params;
}


let getMediaReportParams = (param)=>{
  var params = [{
    param: "date1",
    type: 2,
    value: param.date1,
    index: 1
  }, {
    param: "date2",
    type: 2,
    value: param.date2,
    index: 2
  }, {
    param: "in_os",
    type: 2,
    value: paramsMethod.getOsId(),
    index: 3
  },{
    param: "area_app_ids",
    type: 3,
    value: paramsMethod.getAppId(),
    index: 4
  } ];
  return params;
}

export default {
  getFiveForceParams,
  getFiveMinParams,
  getNewUserRetainParams,
  getAppsParams,
  getLaunchReportParams,
  getDataRepairParams,
  getMediasParams,
  getDataRepairAddParams,
  getDataRepairDelParams,
  getDataRepairEditParams,
  getGameGKParams,
  getGameGKKeyChartParams,
  getGameGKPlayerRetainParams,
  getGameGKLoseRetainParams,
  getGameGKLoseDetailParams,
  getMediaReportParams
}
