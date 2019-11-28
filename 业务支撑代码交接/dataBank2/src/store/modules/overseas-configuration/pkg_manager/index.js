import http from 'src/services/http'
export default {
  namespaced: true,
  state: {
    pkgList: null,
    keys: null,
    index: {
      idIndex: 0,
      gameIndex: 1,
      pkgIndex: 2,
      osIndex: 3
    },
    tableKey: null
  },
  mutations: {
    setPkgList(state, data) {
      state.pkgList = data
    }
  },
  getters: {
    getPkgList(state) {
      var ret
      if (state.pkgList) {
        ret = {
          list: null
        }
        ret.list = state.pkgList[0]
        ret.list.forEach((item, i) => {
          item['index'] = i
          if (!state.keys) {
            state.keys = Object.keys(item)
          }
          if (!state.tableKey) {
            state.tableKey = [
              state.keys[state.index.gameIndex],
              state.keys[state.index.osIndex],
              state.keys[state.index.pkgIndex]
            ]
          }
          var gameKey = state.keys[state.index.gameIndex]
          var game = item[gameKey] = item[gameKey].trim()
          var pkgKey = state.keys[state.index.pkgIndex]
          var pkg = item[pkgKey]
          var osKey = state.keys[state.index.osIndex]
          var os = item[osKey]
          if (!ret.hasOwnProperty(game)) {
            ret[game] = {}
            ret[game][0] = {}
            ret[game][1] = {}
          }
          ret[game][os][pkg] = item
        })
      }
      return ret
    }
  },
  actions: {
    getPkgList(context, isForce) {
      var {
        commit,
        state,
        dispatch,
        getters,
        rootGetters,
        rootState,
      } = context
      return new Promise(resolve => {
        if (!state.pkgList && !isForce) {
          var url = '/query/' + rootGetters.getMenu[Config.PackageManagerId].dataView[0]
          http.post(url).then(({
            code,
            state
          }) => {
            if (code === 401) {
              commit('setPkgList', state)
              getters.getPkgList
              resolve()
            }
          })
        } else {
          resolve()
        }
      })
    },
    addPkg(context, param) {
      var {
        commit,
        state,
        dispatch,
        getters,
        rootGetters,
        rootState,
      } = context
      return new Promise(resolve => {
        var url = '/query/' + rootGetters.getMenu[Config.PackageManagerId].dataView[1]
        http.post(url, param).then(({
          code
        }) => {
          if (code === 401) {
            var {
              keys,
              index,
              pkgList
            } = state
            var {
              idIndex,
              gameIndex,
              osIndex,
              pkgIndex
            } = index
            var {
              in_app_id,
              in_app_name,
              in_os,
              in_package_name
            } = param
            var list = {}
            list[keys[idIndex]] = in_app_id
            list[keys[gameIndex]] = in_app_name
            list[keys[osIndex]] = in_os
            list[keys[pkgIndex]] = in_package_name
            list = [list].concat(pkgList[0])
            commit('setPkgList', [list])
            getters.getPkgList
            resolve()
          }
        })
      })
    },
    delPkg(context, {
      param,
      game
    }) {
      var {
        commit,
        state,
        dispatch,
        getters,
        rootGetters,
        rootState,
      } = context
      var {
        in_os,
        in_app_id,
        in_package_name
      } = param
      return new Promise(resolve => {
        var url = '/query/' + rootGetters.getMenu[Config.PackageManagerId].dataView[3]
        http.post(url, param).then(({
          code
        }) => {
          if (code === 401) {
            var index = getters.getPkgList[game][in_os][in_package_name].index
            var list = state.pkgList[0]
            list.splice(index, 1)
            commit('setPkgList', [list])
            getters.getPkgList
            resolve()
          }
        })
      })
    }
  }
}