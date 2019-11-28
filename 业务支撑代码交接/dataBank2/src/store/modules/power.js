const state = {
  powerUser: {
    userName: "",
    nickName: ""
  },
  currentGame: "",
  roleSelected: null,
}

const mutations = {
  setPowerUser: (state, powerUser) => {
    state.powerUser = powerUser;
  },
  setPowerCurGame: (state, currentGame) => {
    state.currentGame = currentGame;
  },
  setRoleSelected: (state, item) => {
    state.roleSelected = item;
  },
  clearPowerInfo: (state) => {
    state.powerUser = {
      userName: "",
      nickName: ""
    }
    state.currentGame = ""
    state.roleSelected = null
  },
}

export default {
  state,
  mutations
}
