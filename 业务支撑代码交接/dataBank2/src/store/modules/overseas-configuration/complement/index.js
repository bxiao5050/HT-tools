import http from 'src/services/http'
var date = new Date()
export default {
  namespaced: true,
  state: {
    os: '1',
    onIndex: null,
    region: null,
    regionArr: [],
    game: null,
    gameArr: [],
    curChannel: null,
    curYear: date.getFullYear(),
    curMonth: date.getMonth() + 1,
    channelData: null,
    channel: {
      source: null,
      list: null,
      keys: null,
      index: {
        channelIndex: 0,
        dateIndex: 1
      },
    },
    data: {
      map: null,
      source: null,
      list: null,
      keys: null,
      index: {
        regionIndex: 0,
        dateIndex: 1,
        activeIndex: 2,
        registerIndex: 3,
        createIndex: 4,
        costIndex: 5,
        unitIndex: 6
      },
      types: null,
      typeIndex: {}
    }
  },
  mutations: {
    setCurChannel(state, data) {
      state.curChannel = data
    },
    setOs(state, data) {
      state.os = data
    },
    setOnIndex(state, data) {
      state.onIndex = data
    },
    setCurYear(state, data) {
      state.curYear = data
    },
    setCurMonth(state, data) {
      state.curMonth = data
    },
    setRegion(state, data) {
      state.region = data
    },
    setRegionArr(state, data) {
      state.regionArr = data
    },
    setGame(state, data) {
      state.game = data
    },
    setGameArr(state, data) {
      state.gameArr = data
    }
  },
  getters: {
    getIdStr(state) {
      if (state.gameArr.length) {
        return state.gameArr[0]
      }
      if (state.regionArr.length) {
        return state.regionArr.join(',')
      }
      return ''
    },
    getChannels(state) {
      if (state.channelData && state.channelData.length) {
        state.channel.list = []
        state.channel.source = {}
        if (!state.channel.keys) {
          state.channel.keys = Object.keys(state.channelData[0])
          console.log(state.channel.keys)
        }
        var {
          keys,
          index
        } = state.channel
        state.channelData.forEach(item => {
          var channelName = item[keys[index.channelIndex]]
          var date = item[keys[index.dateIndex]]
          if (!state.channel.source.hasOwnProperty(channelName)) {
            state.channel.source[channelName] = item
            state.channel.list.push({
              channelName,
              date,
              isBulu: (date && date !== 'null') ? 1 : 0
            })
          }
        })
        state.channel.list.sort((a, b) => {
          return b.isBulu - a.isBulu
        })
        return state.channel.list
      } else {
        return null
      }
    },
    getList(state) {
      if (state.data.source && state.data.source.length) {
        state.data.list = {
          dates: {},
          regions: [],
          search: []
        }
        if (!state.data.keys) {
          state.data.keys = Object.keys(state.data.source[0])
          console.log(state.data.keys)
        }
        var {
          keys,
          index,
          source,
          list,
          map
        } = state.data
        if (!state.data.types) {
          state.data.types = [
            index.unitIndex,
            index.activeIndex,
            index.registerIndex,
            index.createIndex,
            index.costIndex,
          ]
          state.data.typeIndex[index.unitIndex] = 1
          state.data.typeIndex[index.activeIndex] = 2
          state.data.typeIndex[index.registerIndex] = 3
          state.data.typeIndex[index.createIndex] = 4
          state.data.typeIndex[index.costIndex] = 5
        }

        var regionKey = keys[index.regionIndex]
        source.forEach(item => {
          var region = item[regionKey]
          var date = item[keys[index.dateIndex]]
          if (!list[region]) {
            list[region] = {}
            list.dates[region] = []
            list.regions.push({
              region
            })
            list.search.push({
              region: map[region] ? [region] + '，' + region : region
            })
          }
          list[region][date] = item
          list.dates[region].push(date)
        })
        list.regions.forEach(_ => {
          list.dates[_.region].sort()
        })
        return state.data
      } else {
        return null
      }
    }
  },
  actions: {
    query(context, param) {
      var {
        commit,
        state,
        dispatch,
        getters,
        rootGetters,
        rootState,
      } = context

      var regionPromise = new Promise(resolve => {
        this.dispatch('overseas_common/getRegionMap').then(() => {
          resolve()
        })
      })

      var url = "/query/" + 'query_app_medissource_country'
      return new Promise(resolve => {
        http.post(url, param).then(data => {
          if (data.code === 401) {
            regionPromise.then(() => {
              state.data.map = rootState.overseas_common.regionMap
              state.data.source = data.state[0];
              resolve(data)
            })
          }
        })
      })
    },
    recalculate(context, param) {
      var {
        commit,
        state,
        dispatch,
        getters,
        rootGetters,
        rootState,
      } = context

      var url = '/query/' + 'recalculate_app_install_country_cost'
      return new Promise((resolve) => {
        http.post(url, param).then(data => {
          resolve(data)
        })
      })
    }

  }
}