import http from 'src/services/http'
export default {
  namespaced: true,
  state: {
    date: [
      moment()
        .add(-1, "day")
        .format("YYYY-MM-DD"),
      moment()
        .add(-1, "day")
        .format("YYYY-MM-DD")
    ],
    os: '1',
    region: null,
    regionArr: [],
    game: null,
    gameArr: [],
    channel: null,
    channelList: null,
    level: 3,
    subChannelData: null,
    subChannelRegionData: null,
    subChannelConfig: {},
    subChannelRegionConfig: {}
  },
  mutations: {
    setOs(state, data) {
      state.os = data
    },
    setDate(state, data) {
      state.date = data
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
    },
    setChannel(state, data) {
      state.channel = data
    },
    setChannelList(state, data) {
      state.channelList = data
    },
    setLevel(state, data) {
      state.level = data
    },
    set(state, { key, value }) {
      state[key] = value
    }
  },
  getters: {
    subChannelData(state) {
      if (state.subChannelData && state.subChannelData.length) {
        var config = state.subChannelConfig
        var firstData = state.subChannelData[0]
        if (!config.keys) {
          config.keys = Object.keys(firstData)
          config.keys.push('等级到达率')
        }
        if (!config.index) {
          config.index = {
            appidIndex: 0,
            subChannelIndex: 1,
            osIndex: 2,
            activeIndex: 3,
            registerIndex: 4,
            createIndex: 5,
            levelBfIndex: 6,
            levelAfIndex: 7,
            registerRateIndex: 8,
            createRateIndex: 9,
            levelAfRateIndex: 10
          }
        }
        if (!config.tableKey) {
          var keys = config.keys
          var index = config.index
          config.tableKey = [{
            // site id
            key: keys[index.subChannelIndex],
            width: 200,
            'min-width': 120,
            sortable: true
          }, {
            // weidu
            key: keys[index.osIndex],
            sortable: true
          }, {
            // 激活
            key: keys[index.activeIndex],
            sortable: true
          }, {
            // 注册
            key: keys[index.registerIndex],
            sortable: true
          }, {
            // 创角
            key: keys[index.createIndex],
            sortable: true
          }, {
            // 注册率
            key: keys[index.registerRateIndex],
            sortable: true
          }, {
            // 创角率
            key: keys[index.createRateIndex],
            sortable: true
          }, {
            // 等级前
            key: keys[index.levelBfIndex],
            sortable: true
          }, {
            // 等级后
            key: keys[index.levelAfIndex],
            sortable: true
          }, {
            // 等级到达率
            key: keys[index.levelAfRateIndex],
            sortable: true,
            width: 140
          }]

          config.tableKey.forEach(item => {
            if (!item.width) item.width = 110
          })
        }

        var { keys, index } = config
        var data = {}
        var total
        var numbers = []
        var NaNs = []
        var isLast
        state.subChannelData.forEach((item, i) => {

          { // 数据处理 number 化
            var itemVal
            if (!i) {
              keys.forEach(key => {
                itemVal = item[key] * 1
                if (!isNaN(itemVal)) {
                  numbers.push(key)
                  item[key] = itemVal
                } else {
                  NaNs.push(key)
                }
              })
              total = Object.assign({}, firstData)
            } else {
              numbers.forEach(key => {
                itemVal = item[key] * 1
                item[key] = itemVal
                total[key] += itemVal
              })
            }
          }

          var levelAfRateKey = keys[index.levelAfRateIndex]
          var activeKey = keys[index.activeIndex]
          var levelAfKey = keys[index.levelAfIndex]
          item[levelAfRateKey] = (item[levelAfKey] / item[activeKey] * 100).format(2)

          var activeKey = keys[index.activeIndex]
          var registerKey = keys[index.registerIndex]
          var createKey = keys[index.createIndex]
          var registerRateKey = keys[index.registerRateIndex]
          var createRateKey = keys[index.createRateIndex]

          isLast = state.subChannelData.length === i + 1
          if (isLast) { // handler calculate
            NaNs.forEach(key => {
              if (key !== keys[index.osIndex])
                total[key] = '全部'
            })


            total[registerRateKey] = (total[registerKey] / total[activeKey] * 100).format(2) + '%'
            total[createRateKey] = (total[createKey] / total[activeKey] * 100).format(2) + '%'
            total[levelAfRateKey] = (total[levelAfKey] / total[activeKey] * 100).format(2) + '%'
          }
        })


        data.list = state.subChannelData
        data.total = total

        console.log(
          'subChannelData', data
        )
        return data
      } else {
        return null
      }
    },
    subChannelRegionData(state) {
      if (state.subChannelRegionData && state.subChannelRegionData.length) {
        var config = state.subChannelRegionConfig
        var firstData = state.subChannelRegionData[0]
        if (!config.keys) {
          config.keys = Object.keys(firstData)
          config.keys.push('等级到达率')
        }
        if (!config.index) {
          config.index = {
            appidIndex: 0,
            regionIndex: 1,
            osIndex: 2,
            activeIndex: 3,
            registerIndex: 4,
            createIndex: 5,
            levelBfIndex: 6,
            levelAfIndex: 7,
            registerRateIndex: 8,
            createRateIndex: 9,
            levelAfRateIndex: 10
          }
        }
        if (!config.tableKey) {
          var keys = config.keys
          var index = config.index
          config.tableKey = [{
            // 国家
            key: keys[index.regionIndex],
            width: 150,
            sortable: true
          }, {
            // 维度
            key: keys[index.osIndex],
            sortable: true
          }, {
            // 激活
            key: keys[index.activeIndex],
            sortable: true
          }, {
            // 注册
            key: keys[index.registerIndex],
            sortable: true
          }, {
            // 创角
            key: keys[index.createIndex],
            sortable: true
          }, {
            // 注册率
            key: keys[index.registerRateIndex],
            sortable: true
          }, {
            // 创角率
            key: keys[index.createRateIndex],
            sortable: true
          }, {
            // 等级前
            key: keys[index.levelBfIndex],
            sortable: true
          }, {
            // 等级后
            key: keys[index.levelAfIndex],
            sortable: true
          }, {
            // 等级到达率
            key: keys[index.levelAfRateIndex],
            sortable: true,
            width: 140
          }]

          config.tableKey.forEach(item => {
            if (!item.width) item.width = 110
          })
        }

        var { keys, index } = config
        var data = {}
        var total
        var numbers = []
        var NaNs = []
        var isLast

        state.subChannelRegionData.forEach((item, i) => {
          { // 数据处理 number 化
            var itemVal
            if (!i) {
              keys.forEach(key => {
                itemVal = item[key] * 1
                if (!isNaN(itemVal)) {
                  numbers.push(key)
                  item[key] = itemVal
                } else {
                  NaNs.push(key)
                }
              })
              total = Object.assign({}, firstData)
            } else {
              numbers.forEach(key => {
                itemVal = item[key] * 1
                item[key] = itemVal
                total[key] += itemVal
              })
            }
          }

          var levelAfRateKey = keys[index.levelAfRateIndex]
          var activeKey = keys[index.activeIndex]
          var levelAfKey = keys[index.levelAfIndex]
          item[levelAfRateKey] = (item[levelAfKey] / item[activeKey] * 100).format(2)

          var activeKey = keys[index.activeIndex]
          var registerKey = keys[index.registerIndex]
          var createKey = keys[index.createIndex]
          var registerRateKey = keys[index.registerRateIndex]
          var createRateKey = keys[index.createRateIndex]

          isLast = state.subChannelRegionData.length === i + 1
          if (isLast) { // handler calculate
            NaNs.forEach(key => {
              if (key !== keys[index.osIndex])
                total[key] = '全部'
            })

            total[registerRateKey] = (total[registerKey] / total[activeKey] * 100).format(2) + '%'
            total[createRateKey] = (total[createKey] / total[activeKey] * 100).format(2) + '%'
            total[levelAfRateKey] = (total[levelAfKey] / total[activeKey] * 100).format(2) + '%'
          }
        })

        data.list = state.subChannelRegionData
        data.total = total
        console.log('subChannelRegionData', data)
        return data
      } else {
        return null
      }
    }
  },
  actions: {
    subChannelData(context, params) {
      var {
        commit,
        state,
        dispatch,
        getters,
        rootGetters,
        rootState,
      } = context

      var url = '/query/' + 'foreign_sub_site_query'
      return new Promise((resolve) => {
        http.post(url, params).then(data => {
          if (data.code === 401) {
            var kv = {
              key: 'subChannelData',
              value: data.state[0]
            }
            commit('set', kv)
          }
        })
      })

    },
    subChannelRegionData(context, params) {

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

      var url = '/query/' + 'foreign_sub_site_country_query'
      return new Promise((resolve) => {
        http.post(url, params).then(data => {
          if (data.code === 401) {
            var kv = {
              key: 'subChannelRegionData',
              value: data.state[0]
            }
            regionPromise.then(data => {
              resolve()
              commit('set', kv)
            })
          }
        })
      })
    }
  }
}