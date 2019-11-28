import store from 'src/store'

const state = {
  userInfo: null,
  systems: null,
  nowgame: null,
  menus: [],
  nowmenu: null,

  curLanguage: 'CHS',
  languages: {
    // CHS: require('src/components/system/language/packs/chs.js'), Tradition:
    // require('src/components/system/language/packs/tradition.js'), EN:
    // require('src/components/system/language/packs/en.js')
  },
  // date curDate:
  hideAside: false
}

const mutations = {
  setSystems(state, systems) {
    state.systems = systems
    // state.nowgame = state.systems.systemId = 4
    // return 
    state.systems[state.systems.systemId].children.forEach((game, index) => {
      if (index == 0) {
        state.nowgame = game.id
      }
      return
    })
  },
  initUserInfo: (state, userInfo) => {
    state.userInfo = userInfo
    // state.systems = data.systems; state.nowsystem = data.nowsystem; state.games =
    // data.games state.nowgame = data.nowgame;
  },
  changeLanguageStatus: (state, language) => {
    state.language = language
  },
  changeSystem: (state, systemId) => {
    state.systems.systemId = systemId
    state.systems[state.systems.systemId].children.forEach((game, index) => {
      if (index == 0) {
        state.nowgame = game.id
      }
      return
    })
  },
  selectGame: (state, newGame) => {
    state.nowgame = newGame
  },
  initMenus: (state, menus) => {
    state.menus = menus
  },
  selectMenu: (state, newMenu) => {
    state.nowmenu = newMenu
    if (newMenu && (newMenu.menuId == 218 || newMenu.menuId == 219)) {
      // 菜单为汇总模块或者游戏概况时隐藏aside
      state.hideAside = true
    } else {
      state.hideAside = false
    }
  },
  changeAside: (state) => {
    state.hideAside = !state.hideAside
  },
  clearInfo: state => {
    // state.nowgame = []
    state.menus = []
    state.nowmenu = []
  }
}

const actions = {
  clearSystemInfo({
    commit
  }) {
    commit('clearInfo')

    store.state.Common.couldQuery = false
    for (let ModuleName in store.state) {
      let Module = store.state[ModuleName]
      if (Module.init) {
        Module.hasOwnProperty('data') && (Module.data = null)
        Module.hasOwnProperty('confirm') && (Module.confirm = null)
      }
    }
  }
}

const getters = {
  games(state) {
    return state.systems ? state.systems[state.systems.systemId].children : null
  },
  system(state) {
    return state.systems ? state.systems[state.systems.systemId] : null
  },
  language(state) {
    return state.languages[state.curLanguage]
  },
  getMenu(state) {
    if (state.menus.length) {
      function Menu() {}
      Menu.prototype.parent = []
      var menu = new Menu
      if (Config.defaultMenu) {
        menu.curMenuId = Config.defaultMenu
      } else {
        menu.curMenuId = state.menus[0].childrenMenu[0].menuId
      }
      state.menus.forEach(parent => {
        var len = menu.parent.push({
          menuId: parent.menuId,
          children: []
        })
        menu[parent.menuId] = parent
        var children = parent.childrenMenu
        children.forEach(child => {
          menu[child.menuId] = child
          menu.parent[len - 1].children.push(child)
        })
      })
      console.log(menu)
      return menu
    } else {
      return null
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}