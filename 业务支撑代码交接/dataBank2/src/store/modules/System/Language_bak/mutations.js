import store from 'src/store'

export default {
  cur : (state, cur) => {
    localStorage.LangCur = state.cur = cur
    if (store.state.common.userInfo) {
      store.dispatch('Common/changeLanguage')
    }
  }
}