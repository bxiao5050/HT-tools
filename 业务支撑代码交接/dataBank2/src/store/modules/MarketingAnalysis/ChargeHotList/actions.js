import api from 'src/services/api'
import store  from 'src/store'

/**
 * ChargeHotList 模块
 */

export default {
  data(state, params) {
    api.user.getQuery(params).then(data => {
      if (data.code == 401) {
        store.commit('ChargeHotList/data', data.state);
      } else {
        Utils.Notification.error({ message: data.message })
      }
    })
  },
  detailData(state, params) {
    store.commit('ChargeHotList/detailData', []);
    api.user.getQuery(params).then(data => {
      if (data.code == 401) {
        store.commit('ChargeHotList/detailData', data.state[0]);
      } else {
        Utils.Notification.error({ message: data.message })
      }
    })
  }
}