/**
 * 代理商数据源
 * 
 */
const state = {
  agentType: 0,
  // 代理商层级
  agentSource: [],
  agents: [],
  nowAgent: {},
  firstAgent: {},
  secondAgent: {},
  thirdAgent: {},
  nowAgentParam: [],
  agentState: 1,
  agentSearchText: "",
  searchResult: [],
  clearSearchText:null
}

const mutations = {
    clearAgentInfo: (state) => {
      state.agentType = 0;
      // 代理商层级
      state.agentSource = [];
      state.agents = [];
      state.nowAgent = {};
      state.firstAgent = {};
      state.secondAgent = {};
      state.thirdAgent = {};
      state.nowAgentParam = [];
      state.agentState = 1;
      state.agentSearchText = "";
      state.searchResult = []
  },
  clearAgentSearchInfo:(state)=>{
    state.agentSearchText="";
    state.searchResult=[];
    state.clearSearchText();
  },
  setClearSearchText:(state,func)=>{
    state.clearSearchText=func;
  },
  setAgentSource: (state, agents) => {
    state.agentSource = agents;
  },
  setAgentType: (state, type) => {
    state.agentType = type;
  },
  setAgents: (state, Agent) => {
    state.agents = Agent;
  },
  setNowAgent: (state, nowAgent) => {
    state.nowAgent = nowAgent;
  },
  setNowAgentParam: (state, agent) => {
    state.nowAgentParam = agent;
  },
  setFirstAgent: (state, first) => {
    state.firstAgent = first;
  },
  setSecondAgent: (state, second) => {
    state.secondAgent = second;
  },
  setThirdAgent: (state, third) => {
    state.thirdAgent = third;
  },
  agentStateAdd: (state, add) => {
    state.agentState += add;
  },
  setAgentState: (state, agentState) => {
    state.agentState = agentState;
  },
  agentStateBack: (state) => {
    state.agentState -= 1;
  },
  setAgentSearchText: (state, text) => {
    state.agentSearchText = text;
  },
  agentSearch: (state, agent) => {
    state.searchResult = agent;
  }
}

const actions = {
  clearAgentInfo:({commit})=>{
    commit("clearAgentInfo");
  },
  clearAgentSearchInfo:({commit})=>{
    commit("clearAgentSearchInfo");
    state.clearSearchText();
  },
  setAgentSource: ({
    commit
  }, agents) => {
    commit("setAgentSource", agents);
  },
  setAgentType: ({
    commit
  }, type) => {
    commit("setAgentType", type);
  },
  setAgents: ({
    commit
  }, agent) => {
    var agents = agent;
    if(agents.length>0){
    for (var i = 0; i < agents.length; i++) {
      agents[i].AGENT_NAME = agents[i].AGENT_NAME.replace(" ", "");
    }
    }
    commit("setAgents", agents)
  },
  setNowAgent: ({
    commit
  }, nowAgent) => {
    commit("setNowAgent", nowAgent);
  },
  setNowAgentParam: ({
    commit
  }, agent) => {
    commit("setNowAgentParam", agent);
  },
  setFirstAgent: ({
    commit
  }, first) => {
    commit("setFirstAgent", first);
    commit("setSecondAgent", {});
    commit("setThirdAgent", {});
  },
  setSecondAgent: ({
    commit
  }, second) => {
    commit("setSecondAgent", second);
    commit("setThirdAgent", {});
  },
  setThirdAgent: ({
    commit
  }, third) => {
    commit("setThirdAgent", third);
  },
  setAgentState: ({
    commit
  }, agentState) => {
    commit("setAgentState", agentState);
  },
  agentStateAdd: ({
    commit
  }, add) => {
    commit("agentStateAdd", add);
  },
  agentStateBack: ({
    commit
  }) => {
    commit("agentStateBack");
  },
  agentSearch: ({
    commit
  }, serchText) => {
    commit("setAgentSearchText", serchText)
    var agents = state.agents;
    var searchResult = [];
    for (var i = 0; i < agents.length; i++) {
      if (agents[i].AGENT_NAME.toUpperCase().indexOf(state.agentSearchText.toUpperCase()) != -1) {
        searchResult.push(agents[i])
      }
    }
    commit("agentSearch", searchResult);
  }
}

const getters = {
  agents: state => state.agents,
  nowAgent: state => state.nowAgent,
  // selectedAgent: state => state.selectedAgent,
  agentState: state => state.agentState,
  firstAgent: state => state.firstAgent,
  secondAgent: state => state.secondAgent,
  thirdAgent: state => state.thirdAgent,
  agentSearchText: state => state.agentSearchText,
  searchResult: state => state.searchResult
}

export default {
  state,
  mutations,
  actions,
  getters
}
