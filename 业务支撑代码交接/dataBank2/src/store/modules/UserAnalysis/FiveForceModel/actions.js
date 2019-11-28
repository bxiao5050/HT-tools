import api from 'src/services/api'

/**
 * @typedef FiveForceModel
 */

export default {
  data({ dispatch,commit },params) {
    commit('data', null)
    // dispatch('paramsBuilder').then(data => {
      api.user.getQuery(params).then(data => {
        if (data.code === 401) {
          commit('data', data.state)
        } else {
          Utils.Notification.error({ message: data.message })
        }
      })
    // })
  },
  exportData({dispatch},params){
    // dispatch('paramsBuilder').then(data => {
      api.user.exportData(params)
    // })
  },
  // paramsBuilder() {
  //   const config = {
  //     '1': { // 自研系统 
  //       isCache: 1,
  //       dataview: store.state.common.nowmenu.dataView,
  //       in_date: store.state.FiveForceModel.curDate,
  //       in_type_id: store.state.FiveForceModel.dateType,
  //       in_gamezone_id: store.getters['Agent/selectedIdList'],
  //       in_reg_channel: store.getters['RegChannel/selectedIdList'],
  //       in_pay_channel: store.getters['PayChannel/selectedIdList'],
  //       in_os: store.getters['OS/nowOS'],
  //     },
  //     '3': { // efunfun
  //       isCache: 1,
  //       dataview: store.state.common.nowmenu.dataView,
  //       data_type: store.state.FiveForceModel.dateType,
  //       count_date: store.state.FiveForceModel.curDate,
  //       gameZoneId: store.getters['Agent/selectedIdList'],
  //       channelId: store.getters['RegChannel/selectedIdList'],
  //       platformId: '1,2',
  //     }
  //   }
  //   return config[store.state.common.systems.systemId]
  // },
}