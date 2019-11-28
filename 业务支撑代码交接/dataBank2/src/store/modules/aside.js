const state = {
  async: false,
  key: 0,
  isShow: {
    0: false, // game list
    1: false, // agent list
    2: false, // channel register
    3: false //  channel payment
  },
  transing: false
}

const mutations = {
  AsideToggleShow(state, key) {
    if (!state.transing) {
      state.transing = true
      if (!state.isShow[key]) {
        let flag = false
        for (let name in state.isShow) {
          if (state.isShow[name]) {
            flag = true
            state.isShow[name] = false
            state.async = true
            state.key = key
          }
        }
        if (!flag) state.isShow[key] = true
      } else {
        state.isShow[key] = false
      }
    }
  }
}
const getters = {
  cover: (state) => {
    for (let n in state.isShow) {
      if (state.isShow[n]) return false
    }
    return true
  }
}

export default {
  state,
  mutations,
  getters,
}