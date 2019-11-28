import api from 'src/services/api'
import store  from 'src/store'

/**
 * @typedef NewServerMonitor
 */

export default {
  data(state, { isCache, in_date1, dataview, in_gamezoneid, in_regchannel, platformId }) {
    // console.log({
    //   isCache: isCache,
    //   in_date1: in_date1,
    //   dataview: dataview,
    //   in_gamezoneid: in_gamezoneid,
    //   reg_channel: in_regchannel,
    //   in_platform: platformId,
    // })
    api.user.getQuery({
      isCache: isCache,
      in_date1: in_date1,
      dataview: dataview,
      in_gamezoneid: in_gamezoneid,
      reg_channel: in_regchannel,
      in_platform: platformId,
    }).then(data => {
      store.commit('NewServerMonitor/data', data.state[0])
    })
  }
}