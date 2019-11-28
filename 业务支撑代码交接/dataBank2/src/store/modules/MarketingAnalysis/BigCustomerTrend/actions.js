import api from 'src/services/api'
import store  from 'src/store'


/**
 * BigCustomerTrend 模块
 */

export default {
  data(state, {
    dataview,
    isCache,
    in_date1,
    in_gamezoneid,
    in_platform,
    username,
    moneytype,
    pay_money
  }) {
    api
      .user
      .getQuery({
        dataview: dataview,
        isCache: isCache,
        in_date1: in_date1,
        in_gamezoneid: in_gamezoneid,
        in_platform: in_platform,
        username: username,
        moneytype: moneytype,
        pay_money: pay_money
      })
      .then(data => {
        if (data.code == 401) {
          store.commit('BigCustomerTrend/data', data.state[0])
        } else {
          Utils.Notification.error({ message: data.message })
        }
      })
  }
}