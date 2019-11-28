import http from 'src/services/http'
var _1day = 1000 * 3600 * 24
export default {
  namespaced: true,
  state: {
    date: moment(new Date().getTime() - _1day).format("YYYY-MM-DD"),
    data: null,
    config: {}
  },
  mutations: {
    set(state, { key, val }) {
      state[key] = val
    }
  },
  getters: {
    getData(state) {
      if (state.data && state.data.length) {
        var first = state.data[0]
        var { config } = state
        if (!config.keys) {
          config.keys = Object.keys(first)
          console.log(config.keys)
        }
        if (!config.index) {
          config.index = {
            dateIndex: 0,
            appIdIndex: 1,
            gameIndex: 2,
            budgetIndex: 3
          }
        }
        if (!config.tableKey) {
          config.tableKey = [{
            key: config.keys[config.index.dateIndex],
            sortable: false
          }, {
            key: config.keys[config.index.appIdIndex],
            sortable: false
          }, {
            key: config.keys[config.index.gameIndex],
            sortable: false
          }, {
            key: config.keys[config.index.budgetIndex],
            sortable: false
          }]
        }
        return state.data
      } else {
        return null
      }
    }
  },
  actions: {
    getData(context, param) {

      var {
        commit,
        state,
        dispatch,
        getters,
        rootGetters,
        rootState,
      } = context

      var url = "/query/" + 'fn_oas_budget_costs'
      console.log(param)
      return new Promise(resolve => {
        http.post(url, param).then(data => {
          if (data.code === 401) {
            commit('set', { key: 'data', val: data.state[0] })
            resolve(data)
          }
        })
      })

    },

    updateData(context, param) {

      var {
        commit,
        state,
        dispatch,
        getters,
        rootGetters,
        rootState,
      } = context
      var url = "/import/" + 'fn_oas_budget_costs'
      console.log(param)
      return new Promise(resolve => {
        http.post(url, param).then(data => {
          console.log(data)
          if (data.code === 401) {
            console.log(state.code)
            commit('set', { key: 'data', val: data.state[0] })
            console.log(state)
            getters.getData
          }
        })
      })

    }


  }
}