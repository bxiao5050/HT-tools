import store from 'src/store'

/**
 * 获取代理商参数
 */
const getZoneParam = () => {
  return store.getters['Agent/selectedIdList']
}

/**
 * 获取注册渠道参数
 */
const getRegChannel = () => {
  return store.getters['RegChannel/selectedIdList']
}

export default {
  getZoneParam,
  getRegChannel
}