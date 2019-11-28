/**
 * Created by jo.chan on 2016/10/31.
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state= {
    // 用户信息
    userInfo: {
      nick_name:'xiaoyi',
      avatar_url:'http://www.16sucai.com/uploadfile/2013/0616/20130616030823418.png',
      accessToken:'f4ff28b0-0a4e-4530-b5d4-91abb64f0340'
    },

    // 查询状态
    // isQuerying:false,

    requestCount: 0,

    // 选中的代理商
    choaseAgent:{
      agent_id:'',
      agent_name: ''
    },

    // 游戏权限列表
    games:[],
    nowgame:{},

    // 代理商层级
    agents:[],
    // nowAgent:{},
    selectedAgent:{
      nowAgent:{},
      firstAgent:{},
      secondAgent:{},
      thirdAgent:{}
    },
    agentState:1,

    //菜单列表
    menus:[],
    nowmenu:{}
    
  }
 const getters= {
    getUserInfo(state) {
      return state.userInfo;
    },
    getDate(state){
      return state.choseDate;
    },

    games(state){
      return state.games;
    },
    nowgame(state){
      return state.nowgame;
    },

    menus(state){
      return state.menus;
    },
    nowmenu(state){
      return state.nowmenu;
    },

    agents(state){
      return state.agents;
    },
    selectedAgent(state){
      return state.selectedAgent;
    },
    agentState(state){
      return state.agentState;
    }

  }
 const mutations= {

    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },

    setDate(state, date){
      state.choseDate = date;
    },

    setGames(state,games){
      state.games=games;
    },
    setNowGame(state,game){
      state.nowgame=game;
    },

    setAgents(state,Agent){
      state.agents=Agent;
    },
    setSelectedAgent(state,selectedAgent){
      state.selectedAgent=selectedAgent;
    },
    agentStateForward(state){
      state.agentState+=1;
    },
    agentStateBack(state){
      state.agentState-=1;
    },

    setMenus(state,menus){
      state.menus=menus;
    },
    setNowMenu(state,menu){
      state.nowmenu=menu;
    }
  }
 const actions= {
    setUserInfo({ commit }, user) {
      commit('setUserInfo', user);
    },
    setDate({ commit }, date){
      commit('setDate', date);
    },

    setGames({commit},games){
      commit("setGames",games);
    },
    setNowGame({commit},game){
      commit("setNowGame",game);
    },

    setAgents({commit},Agent){
      commit("setAgents",Agent)
    },
    setSelectedAgent:({commit},nowAgent)=>{
      var selectedAgent=state.selectedAgent;
      selectedAgent.nowAgent=nowAgent;
      if(state.agentState==1){
        selectedAgent.firstAgent=nowAgent
        selectedAgent.secondAgent={}
        selectedAgent.thirdAgent={}
      }
      else if(state.agentState==2){
        selectedAgent.secondAgent=nowAgent
        selectedAgent.thirdAgent={}
      }
      else if(state.agentState==3){
        selectedAgent.thirdAgent=nowAgent
      }

      commit("setSelectedAgent",selectedAgent);
    },
    agentStateForward({commit}){
      commit("agentStateForward");
    },
    agentStateBack({commit}){
      commit("agentStateBack");
    },

    setMenus({commit},menus){
      commit("setMenus",menus);
    },
    setNowMenu({commit},nowmenu){
      commit("setNowMenu",nowmenu);
    }
  }

export default new Vuex.Store({
  state,getters,mutations,actions
})
