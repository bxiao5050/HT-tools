/**
 * Created by jo.chan on 2016/10/31.
 */

import Vue from 'vue'
import Vuex from 'vuex'

import basestore from './module/base_store'  //基本数据源
import channelstore from './module/channel_store' //渠道数据源
import agentstore from './module/agent_store'  //代理商数据源
import fiveforcestore from './module/5li_store'  //五力模型数据源
import fiveminstore from './module/5min_store'  //五分钟视图数据源
import userRetainstore from './module/userRetain_store'  //用户留存数据源

import launchAreaStore from './module/lanuchArea_store'  //投放系统地区游戏数据源

import gameGKStore from './module/gameGK_Store' //游戏概况数据源

import switchChartStore from './module/switchChartStore' //游戏概况数据源

import hourlyStore from './module/hourly_store' //游戏概况数据源

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    basestore,
    agentstore,
    channelstore,
    fiveforcestore,
    fiveminstore,
    userRetainstore,
    launchAreaStore,
    gameGKStore,
    hourlyStore
  }
})
