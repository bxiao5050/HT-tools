/**
 * 渠道数据源
 *
 */
const state = {
  // 渠道层级
  channels: [],  //渠道数据源
  channelList:[],  //当前层级渠道列表
  nowChannel: {},  //当前选中渠道
  firstChannel: {},
  secondChannel: {},
  thirdChannel: {},
  nowChannelParam: [],
  channelState: 1,
  channelSearchText: "",
  searchResult: [],
  clearSearchText:null
}

const mutations = {
  clearChannelInfo: (state) => {
    state.channels = [];
    state.channelList=[];
    state.nowChannel = {};
    state.firstChannel = {};
    state.secondChannel = {};
    state.thirdChannel = {};
    state.nowChannelParam = [];
    state.channelState = 1;
    state.channelSearchText = "";
    state.searchResult = [];
  },
  clearChannelSearchInfo:(state)=>{
    state.channelSearchText="";
    state.searchResult=[];
    state.clearSearchText();
  },
  setClearSearchText:(state,func)=>{
    state.clearSearchText=func;
  },
  setChannels: (state, channels) => {
    state.channels = channels;
  },
  setChannelList:(state,channels) => {
    state.channelList = channels;
  },
  setNowChannel: (state, nowChannel) => {
    state.nowChannel = nowChannel;
  },
  setNowChannelParam: (state, channel) => {
    state.nowChannelParam = channel;
  },
  setFirstChannel: (state, first) => {
    state.firstChannel = first;
  },
  setSecondChannel: (state, second) => {
    state.secondChannel = second;
  },
  setThirdChannel: (state, third) => {
    state.thirdChannel = third;
  },
  channelStateAdd: (state, add) => {
    state.channelState += add;
  },
  setChannelState: (state, channelState) => {
    state.channelState = channelState;
  },
  channelStateBack: (state) => {
    state.channelState -= 1;
  },
  setChannelSearchText: (state, text) => {
    state.channelSearchText = text;
  },
  channelSearch: (state, channel) => {
    state.searchResult = channel;
  }
}

const actions = {
  clearChannelInfo: ({
    commit
  }) => {
    commit("clearChannelInfo");
  },
  clearChannelSearchInfo:({commit})=>{
    commit("clearChannelSearchInfo");
    state.clearSearchText();
  },
  initChannels:({commit},channels)=>{
    var channelData=initChannelData(channels)
    commit("setChannels",channelData)
    commit("setNowChannel",channelData[0]);
    commit("setFirstChannel",channelData[0]);
    commit("setChannelList",channelData);
  },
  setChannels: ({
    commit
  }, channels) => {
    commit("setChannels", channels)
  },
  setNowChannel: ({
    commit
  }, nowChannel) => {
    commit("setNowChannel", nowChannel);
  },
  setChannelList:({commit},list)=>{
    commit("setChannelList",list);
  },
  setNowChannelParam: ({
    commit
  }, channel) => {
    commit("setNowChannelParam", channel);
  },
  setFirstChannel: ({
    commit
  }, first) => {
    commit("setFirstChannel", first);
    commit("setSecondChannel", {});
    commit("setThirdChannel", {});
  },
  setSecondChannel: ({
    commit
  }, second) => {
    commit("setSecondChannel", second);
    commit("setThirdChannel", {});
  },
  setThirdChannel: ({
    commit
  }, third) => {
    commit("setThirdChannel", third);
  },
  setChannelState: ({
    commit
  }, channelState) => {
    commit("setChannelState", channelState);
  },
  channelStateAdd: ({
    commit
  }, add) => {
    commit("channelStateAdd", add);
  },
  channelStateBack: ({
    commit
  }) => {
    commit("channelStateBack");
  },
  channelSearch: ({
    commit
  }, serchText) => {
    commit("setChannelSearchText", serchText)
    var channels = state.channelList;
    var searchResult = [];
    for (var i = 0; i < channels.length; i++) {
      if (channels[i].CHANNEL_NAME.toUpperCase().indexOf(state.channelSearchText.toUpperCase()) != -1) {
        searchResult.push(channels[i])
      }
    }
    commit("channelSearch", searchResult);
  }
}

const getters = {
  channels: state => state.channels,
  nowChannel: state => state.nowChannel,
  channelList:state => state.channelList,
  channelState: state => state.channelState,
  firstChannel: state => state.firstChannel,
  secondChannel: state => state.secondChannel,
  thirdChannel: state => state.thirdChannel,
  channelSearchText: state => state.channelSearchText
}

const initChannelData = (channels) => {
  var channelData = [];
  channelData=getSonChannelByParent(0,channels,1);
  for (var i = 0; i < channelData.length; i++) {
    channelData[i].childNode=getSonChannelByParent(channelData[i].CHANNEL_ID,channels,2)
    for(var j = 0; j < channelData[i].childNode.length; j++){
      channelData[i].childNode[j].childNode=getSonChannelByParent(channelData[i].childNode[j].CHANNEL_ID,channels,3)
      for(var k = 0; k < channelData[i].childNode[j].childNode.length; k++){
      channelData[i].childNode[j].childNode[k].childNode=getSonChannelByParent(channelData[i].childNode[j].childNode[k].CHANNEL_ID,channels,4)
    }
    }
  }
  return channelData;
}
const getSonChannelByParent = (pid, channels,level) => {
  var result = [];
  for (var i = 0; i < channels.length; i++) {
    if (channels[i].CHANNEL_PID == pid)
      result.push({
        CHANNEL_ID: channels[i].CHANNEL_ID,
        CHANNEL_NAME: channels[i].CHANNEL_NAME,
        CHANNEL_PID: channels[i].CHANNEL_PID,
        CHANNEL_LEVEL:level,
        childNode: []
      });
  }
  return result;
}

export default {
  state,
  mutations,
  actions,
  getters
}
