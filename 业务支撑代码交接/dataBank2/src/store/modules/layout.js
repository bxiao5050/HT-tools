const state = {
  isCompact: innerWidth < 768 ? true : false
}

const mutations = {
  switchCompactStatus: state => state.isCompact = !state.isCompact,
}

export default {
  state,
  mutations
}