import http from '../http'

export default {

  /**
   * 系统登录
   */
  loginSystem(params) {
    return http.jsonp('/user/login', params)
  },

  /**
   * 系统登出
   */
  logoutSystem(params) {
    return http.jsonp('/user/logout', params)
  },

  /**
   * 语言切换
   */
  changeLanguage(params) {
    return http.jsonp('/user/changeLanguage', params)
  },
  /**
   * 获取系统游戏
   */
  getSystemGames(params) {
    return http.jsonp('/user/games', params)
  },
  /**
   * 游戏切换
   * @param params {Object} Object
   */
  changeGame(params) {
    return http.jsonp('/user/change', params)
  },

  /**
   * 获取菜单列表
   */
  getMenus(params) {
    return http.jsonp('/user/menus', params)
  },

  /**
   * 获取区服列表
   */
  getAreaZones(params) {
    return http.jsonp('/user/zones', params)
  },

  /**
   * 获取渠道列表
   */
  getChannels(params) {
    return http.jsonp('/user/channels', params)
  },
  /**
   * 获取付费渠道
   */
  getPayChannels(params) {
    return http.jsonp('/user/paychannels', params)
  },
  /**
   * 组件
   */
  getTemplate(params) {
    return http.jsonp('/chart/template/' + params.dataview, params)
  },

  /**
   * 组件输出
   */
  getTemplateOutput(params) {
    return http.jsonp('/chart/' + params.dataview, params)
  },

  /**
   * 模块查询
   */
  getQuery(params) {
    return http.post('/query/' + params.dataview, params)
  },

  /**
   * 模块导出
   */
  exportData(params) {
    return http.exportData('/export/' + params.dataview, params)
  },
  /**
   * 获取指标数据
   * @param {*} params 
   */
  getIndicators(params) {
    return http.jsonp('/user/indicators', params)
  },

  getMail(params) {
    return http.jsonp('/utils/mail/adReport', params)
  }

}