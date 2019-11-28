/**
 * Created by jo.chan on 2016/10/31.
 */

const state= {
    // 用户信息
    accessToken:'',
    userInfo: {
      nick_name:'',
      avatar_url:'',
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

  }
 const mutations= {
   setAccessToken(state,token){
     state.accessToken=token;
   },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },

    showLoading(state){
        state.requestCount+=1;
    },
    hideLoading(state){
        state.requestCount-=1;
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

    setMenus(state,menus){
      state.menus=menus;
    },
    setNowMenu(state,menu){
      state.nowmenu=menu;
    }
  }
 const actions= {
   setAccessToken({commit},token){
     commit("setAccessToken",token);
   },
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

    setMenus({commit},menus){
      commit("setMenus",menus);
    },
    setNowMenu({commit},nowmenu){
      commit("setNowMenu",nowmenu);
    }
  }

export default{
  state,getters,mutations,actions
}
