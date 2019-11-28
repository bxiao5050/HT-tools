import http from 'src/services/http'

function getObjectByTimestamp() {
  return {
    timestamp: new Date().getTime()
  }
}

function getWidth(str) {
  var len = str.length
  if (len <= 2) {
    return 80
  }
  if (len <= 3) {
    return 90
  }
  if (len <= 4) {
    return 100
  }
  if (len <= 6) {
    return 150
  }
}


export default {
  namespaced: true,
  state: {

    lastQueryParam: {
      comprehensive: null,
      daily: null,
      zone: null,
      channel: null,
      system: null,
    },

    date: null,
    os: null,

    region: null,
    regionArr: [],
    game: null,
    gameArr: [],
    mailUrl: null,
    taging: null,

    comprehensive: {},
    daily: {},
    zone: {},
    channel: {},
    system: {},
    zone2: {},
    channel2: {},
    is2: false,

    configs: {
      comprehensive: {},
      daily: {},
      system: {},
      zone: {
        zones: []
      },
      channel: {
        channels: []
      },
    }

  },
  mutations: {
    setTaging(state, data) {
      state.taging = data
    },
    setDate(state, data) {
      state.date = data
    },
    setOs(state, data) {
      state.os = data
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
    set_comprehensive(state, [key, data]) {
      var _ = getObjectByTimestamp()
      _[key] = data
      state.comprehensive = _
    },
    set_daily(state, [key, data]) {
      var _ = getObjectByTimestamp()
      _[key] = data
      state.daily = _
    },
    set_system(state, [key, data]) {
      var _ = getObjectByTimestamp()
      _[key] = data
      state.system = _
    },
    set_zone(state, [key, data]) {
      var _ = getObjectByTimestamp()
      _[key] = data
      state.zone = _
    },
    set_channel(state, [key, data]) {
      var _ = getObjectByTimestamp()
      _[key] = data
      state.channel = _
    },

    set_zone2(state, [key, data]) {
      var _ = getObjectByTimestamp()
      _[key] = data
      state.zone2 = _
    },
    set_channel2(state, [key, data]) {
      var _ = getObjectByTimestamp()
      _[key] = data
      state.channel2 = _
    },
    set_is2(state, data) {
      state.is2 = data
    },
    set_channels(state, data) {
      state.configs.channel.channels = data
    },
    set_zones(state, data) {
      state.configs.zone.zones = data
    }
  },
  getters: {
    tellTagStatus(state, getters, state_, getters_) {
      var _ = {
        comprehensive: false,
        daily: false,
        zone: false,
        channel: false,
        system: false,
      }
      var gameId = state.gameArr[0]
      var regionId = state.regionArr[0]
      var hasGame = gameId ? true : false
      var hasRegion = regionId ? true : false
      var list1 = state_.overseas_common.list1
      var getList1 = getters_['overseas_common/getList1']
      if (list1 && list1.length) {
        _.comprehensive = !hasGame
        _.daily = true
        _.zone = hasGame
        _.channel = hasGame
        _.system = hasGame
      }
      return _
    },
    getIdStr(state) {
      if (state.gameArr.length) {
        return state.gameArr[0]
      }
      if (state.regionArr.length) {
        return state.regionArr.join(',')
      }
      return ''
    },
    getComprehensive(state, getters) {
      var field = 'comprehensive'

      function initMma() {
        var mma = {}
        colorKey.forEach(key => {
          mma[key] = {
            min: Infinity,
            max: 0,
            avg: 0,
            isReversal: [keys[index.createCostIndex], keys[index.activeCostIndex], keys[index.registerCostIndex]].indexOf(key) === -1 ? false : true,
            total: 0,
            count: 0
          }
        })
        return mma
      }

      function assignment(data, mma, isLast) {
        colorKey.forEach(key => {
          var val = data[key]
          if (val !== 0) {
            mma[key].count++;
            mma[key].total += val
          }
          if (val > mma[key].max) {
            mma[key].max = val
          }
          if (val < mma[key].min) {
            mma[key].min = val
          }
          if (isLast) {
            mma[key].avg = mma[key].count ? (mma[key].total / mma[key].count).format(2) : 0
          }
        })
      }

      function getTotal(data, regionName, isLast) {
        var total = comprehensiveData.total[regionName]
        tableKey.forEach(({ key }) => {
          switch (key) {
            case keys[index.gameIndex]:
              if (!comprehensiveData.total[regionName].hasOwnProperty(key)) {
                comprehensiveData.total[regionName][key] = "全部"
              }
              break;
            case keys[index.dimensionIndex]:
              if (!comprehensiveData.total[regionName].hasOwnProperty(key)) {
                comprehensiveData.total[regionName][key] = data[key]
              }
              break;
            default:
              if (!comprehensiveData.total[regionName].hasOwnProperty(key)) {
                comprehensiveData.total[regionName][key] = 0
              }
              if (data[key]) {
                comprehensiveData.total[regionName][key] += data[key];
                comprehensiveData.total[regionName][key] = comprehensiveData.total[regionName][key].format(2);
              }
              break;
          }
          if (isLast) {
            switch (key) {
              case keys[index.registerRateIndex]:
                var active = comprehensiveData.total[regionName][keys[index.activeIndex]]
                var register = comprehensiveData.total[regionName][keys[index.registerIndex]]
                comprehensiveData.total[regionName][key] = ((register / active) * 100).format(2) + '%'
                break;
              case keys[index.createRateIndex]:
                var active = comprehensiveData.total[regionName][keys[index.activeIndex]]
                var create = comprehensiveData.total[regionName][keys[index.createIndex]]
                comprehensiveData.total[regionName][key] = ((create / active) * 100).format(2) + '%'
                break;
              case keys[index.activeCostIndex]:
                var active = comprehensiveData.total[regionName][keys[index.activeIndex]]
                var cost = comprehensiveData.total[regionName][keys[index.costIndex]]
                comprehensiveData.total[regionName][key] = (cost / active).format(2)
                break;
              case keys[index.registerCostIndex]:
                var register = comprehensiveData.total[regionName][keys[index.registerIndex]]
                var cost = comprehensiveData.total[regionName][keys[index.costIndex]]
                comprehensiveData.total[regionName][key] = (cost / register).format(2)
                break;
              case keys[index.createCostIndex]:
                var create = comprehensiveData.total[regionName][keys[index.createIndex]]
                var cost = comprehensiveData.total[regionName][keys[index.costIndex]]
                comprehensiveData.total[regionName][key] = (cost / create).format(2)
                break;
              case keys[index.roiIndex]:
                var cost = comprehensiveData.total[regionName][keys[index.costIndex]]
                var recharge = comprehensiveData.total[regionName][keys[index.rechargeIndex]]
                comprehensiveData.total[regionName][key] = ((recharge / cost) * 100).format(2) + '%'
                break;
              case keys[index.ltvIndex]:
                var mounthActiveKey = keys[index.mounthActiveIndex]
                var mounthChargeKey = keys[index.mounthChargeIndex]
                total.LTV = (!total[mounthChargeKey] || !total[mounthActiveKey]) ? 0 : (total[mounthChargeKey] / total[mounthActiveKey]).format(2);
                break
              default:
                var keyValue = comprehensiveData.total[regionName][key]
                var active = comprehensiveData.total[regionName][keys[index.activeIndex]]
                if (key === keys[index.keep1Index] || key === keys[index.keep2Index] || key === keys[index.keep3Index]) {
                  comprehensiveData.total[regionName][key] = ((keyValue / active) * 100).format(2) + '%'
                }
                break;
            }
          }
        })
      }

      class ComprehensiveData {
        constructor() {
          this.category = [];
          this.mmas = {};
          this.total = {};
        }
      }

      function init(arr, config) {
        if (!config.keys) {
          config.keys = Object.keys(arr[0]).map(item => item);
          config.keys.push('LTV');
          console.log(config.keys)
        }
        if (!config.index) {
          config.index = {
            regionIndex: 3,
            gameIndex: 5,
            dimensionIndex: 6,
            activeIndex: 7,
            registerIndex: 8,
            createIndex: 9,
            costIndex: 10,
            registerRateIndex: 11,
            createRateIndex: 12,
            activeCostIndex: 13,
            registerCostIndex: 14,
            createCostIndex: 15,
            rechargeIndex: 21,
            roiIndex: 22,
            ltvIndex: 25,
            keep1Index: 18,
            keep2Index: 19,
            keep3Index: 20,
            countryIndex: 3,
            newCreateIndex: 16,
            mounthChargeIndex: 23,
            mounthActiveIndex: 24
          }
        }
        if (!config.colorKey) {
          config.colorKey = [
            config.keys[config.index.registerRateIndex],
            config.keys[config.index.createRateIndex],
            config.keys[config.index.activeCostIndex],
            config.keys[config.index.registerCostIndex],
            config.keys[config.index.createCostIndex]
          ]
        }
        if (!config.tableKey) {
          config.tableKey = [{
            key: config.keys[config.index.gameIndex],
            sortable: false,
            width: 150
          }, {
            key: config.keys[config.index.dimensionIndex],
            sortable: false,
          }, {
            key: config.keys[config.index.activeIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.registerIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.createIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.registerRateIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.createRateIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.activeCostIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.registerCostIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.createCostIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.costIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.rechargeIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.roiIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.mounthChargeIndex],
            sortable: true,
            hide: true
          }, {
            key: config.keys[config.index.mounthActiveIndex],
            sortable: true,
            hide: true
          }, {
            key: config.keys[config.index.ltvIndex],
            sortable: true,
          }, {
            key: config.keys[config.index.keep1Index],
            sortable: true,
          }, {
            key: config.keys[config.index.keep2Index],
            sortable: true,
          }, {
            key: config.keys[config.index.keep3Index],
            sortable: true,
          }, {
            key: config.keys[config.index.newCreateIndex],
            sortable: true,
            hide: true
          }]
          config.tableKey.map(item => {
            if (!item.width && !item.hide) return item.width = getWidth(item.key)
          })
        }
        if (!config.chartKey) {
          config.chartKey = [
            config.keys[config.index.activeIndex],
            config.keys[config.index.registerIndex],
            config.keys[config.index.createIndex],
            config.keys[config.index.costIndex],
            config.keys[config.index.activeCostIndex],
            config.keys[config.index.registerCostIndex],
            config.keys[config.index.createCostIndex],
            config.keys[config.index.newCreateIndex],
          ]
        }
      }
      var comprehensiveData = new ComprehensiveData;
      if (state.comprehensive[getters.getIdStr]) {
        var arr = state.comprehensive[getters.getIdStr][0];
        var config = state.configs.comprehensive;
        init(arr, config);
        var {
          keys,
          index,
          colorKey,
          tableKey,
          chartKey
        } = config
        var temp = [];

        arr.forEach(item => {
          keys.forEach(key => {
            var _ = item[key] * 1
            if (!isNaN(_)) {
              item[key] = _
            }
          })

          /**
           * ltv handler
           */
          var mounthActiveKey = keys[index.mounthActiveIndex]
          var mounthChargeKey = keys[index.mounthChargeIndex]
          item.LTV = (!item[mounthChargeKey] || !item[mounthActiveKey]) ? 0 : (item[mounthChargeKey] / item[mounthActiveKey]).format(2);

          var regionName = item[keys[index.regionIndex]]
          if (!comprehensiveData.hasOwnProperty(regionName)) {
            comprehensiveData.category.push(regionName)
            comprehensiveData[regionName] = []
            comprehensiveData.total[regionName] = {}
            comprehensiveData.mmas[regionName] = initMma()
          }
          comprehensiveData[regionName].push(item)
        })
        comprehensiveData.category.forEach(regionName => {
          var list = comprehensiveData[regionName]
          var len = list.length
          var isLast
          list.forEach((data, i) => {
            isLast = len === i + 1
            assignment(data, comprehensiveData.mmas[regionName], isLast)
            getTotal(data, regionName, isLast)
          })
        })
        console.log('comprehensiveData:->', comprehensiveData)
        return comprehensiveData
      } else {
        return null
      }
    },
    getDaily(state, getters) {
      let field = 'daily'
      function initMma() {
        var mma = {}
        colorKey.forEach(key => {
          mma[key] = {
            min: Infinity,
            max: 0,
            avg: 0,
            isReversal: [keys[index.createCostIndex], keys[index.activeCostIndex], keys[index.registerCostIndex]].includes(key) ? true : false,
            total: 0,
            count: 0
          }
        })
        return mma
      }
      function assignment(data, mma, isLast) {
        colorKey.forEach(key => {
          var val = data[key]
          if (val !== 0) {
            mma[key].count++;
            mma[key].total += val
          }
          if (val > mma[key].max) {
            mma[key].max = val
          }
          if (val < mma[key].min) {
            mma[key].min = val
          }
          if (isLast) {
            mma[key].avg = mma[key].count ? (mma[key].total / mma[key].count).format(2) : 0
          }
        })
      }

      function init(arr, config) {
        if (!config.keys) {
          config.keys = Object.keys(arr[0]).map(item => item);
          config.keys.push('LTV');
          console.log(config.keys)
        }
        if (!config.index) {
          config.index = {
            dateIndex: 0,
            systemIndex: 1,
            activeIndex: 2,
            registerIndex: 3,
            createIndex: 4,
            costIndex: 5,
            registerRateIndex: 13,
            createRateIndex: 14,
            activeCostIndex: 10,
            registerCostIndex: 11,
            createCostIndex: 12,
            rechargeIndex: 6,
            roiIndex: 9,
            ltvIndex: 20,
            keep1Index: 15,
            keep2Index: 16,
            keep3Index: 17,
            newCreateIndex: 7,
            newCreateCostIndex: 8,
            mounthChargeIndex: 18,
            mounthActiveIndex: 19,
          }
        }
        if (!config.colorKey) {
          config.colorKey = [
            config.keys[config.index.registerRateIndex],
            config.keys[config.index.createRateIndex],
            config.keys[config.index.activeCostIndex],
            config.keys[config.index.registerCostIndex],
            config.keys[config.index.createCostIndex]
          ]
        }
        if (!config.tableKey) {
          config.tableKey = [{
            key: config.keys[config.index.dateIndex],
            sortable: true,
            width: 150
          }, {
            key: config.keys[config.index.systemIndex],
            sortable: true
          }, {
            key: config.keys[config.index.activeIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerRateIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createRateIndex],
            sortable: true
          }, {
            key: config.keys[config.index.activeCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.costIndex],
            sortable: true
          }, {
            key: config.keys[config.index.rechargeIndex],
            sortable: true
          }, {
            key: config.keys[config.index.roiIndex],
            sortable: true
          }, {
            key: config.keys[config.index.mounthActiveIndex],
            sortable: true,
            hide: true
          }, {
            key: config.keys[config.index.mounthChargeIndex],
            sortable: true,
            hide: true
          }, {
            key: config.keys[config.index.ltvIndex],
            sortable: true
          }, {
            key: config.keys[config.index.keep1Index],
            sortable: true
          }, {
            key: config.keys[config.index.keep2Index],
            sortable: true
          }, {
            key: config.keys[config.index.keep3Index],
            sortable: true
          }, {
            key: config.keys[config.index.newCreateIndex],
            sortable: true,
            hide: true
          }, {
            key: config.keys[config.index.newCreateCostIndex],
            sortable: true,
            hide: true
          }]

          config.tableKey.map(item => {
            if (!item.width && !item.hide)
              return item.width = getWidth(item.key)
          })
        }
        if (!config.chartKey) {
          config.chartKey = [
            config.keys[config.index.activeIndex],
            config.keys[config.index.registerIndex],
            config.keys[config.index.createIndex],
            config.keys[config.index.costIndex],
            config.keys[config.index.rechargeIndex],
            config.keys[config.index.activeCostIndex],
            config.keys[config.index.registerCostIndex],
            config.keys[config.index.createCostIndex],
            config.keys[config.index.newCreateIndex],
          ]
        }
      }
      var dailyData
      if (state.daily[getters.getIdStr]) {
        var arr = state.daily[getters.getIdStr][0];
        var config = state.configs.daily;
        dailyData = {
          list: arr,
          date: [],
          total: {},
          mmas: null
        }
        init(arr, config)
        var {
          keys,
          index,
          colorKey,
          tableKey,
          chartKey
        } = config
        dailyData.mmas = initMma()
        var isLast
        arr.forEach((item, i) => {
          keys.forEach(key => {
            var _ = item[key] * 1
            if (!isNaN(_)) {
              item[key] = _
            }
          })
          isLast = i + 1 === arr.length
          assignment(item, dailyData.mmas, isLast)
          dailyData.date.push(item[keys[index.dateIndex]])


          /**
           * ltv handler
           */
          var mounthChargeKey = keys[index.mounthChargeIndex]
          var mounthActiveKey = keys[index.mounthActiveIndex]
          item.LTV = !item[mounthChargeKey] || !item[mounthActiveKey] ? 0 : (item[mounthChargeKey] / item[mounthActiveKey]).format(2);

          tableKey.forEach(({ key }) => {
            switch (key) {
              case keys[index.dateIndex]:
                if (!dailyData.total.hasOwnProperty(key)) {
                  dailyData.total[key] = "全部"
                }
                break
              case keys[index.systemIndex]:
                if (!dailyData.total.hasOwnProperty(key)) {
                  dailyData.total[key] = item[key]
                }
                break
              default:
                if (!dailyData.total.hasOwnProperty(key)) {
                  dailyData.total[key] = item[key]
                } else {
                  dailyData.total[key] = (item[key] + dailyData.total[key]).format(2)
                }
                break
            }
            if (isLast) {

            }
          })
        })

        tableKey.forEach(({ key }) => {
          var total = dailyData.total
          switch (key) {
            case keys[index.registerRateIndex]:
              var active = dailyData.total[keys[index.activeIndex]]
              var register = dailyData.total[keys[index.registerIndex]]
              dailyData.total[key] = ((register / active) * 100).format(2) + '%'
              break;
            case keys[index.createRateIndex]:
              var active = dailyData.total[keys[index.activeIndex]]
              var create = dailyData.total[keys[index.createIndex]]
              dailyData.total[key] = ((create / active) * 100).format(2) + '%'
              break;
            case keys[index.activeCostIndex]:
              var active = dailyData.total[keys[index.activeIndex]]
              var cost = dailyData.total[keys[index.costIndex]]
              dailyData.total[key] = (cost / active).format(2)
              break;
            case keys[index.registerCostIndex]:
              var register = dailyData.total[keys[index.registerIndex]]
              var cost = dailyData.total[keys[index.costIndex]]
              dailyData.total[key] = (cost / register).format(2)
              break;
            case keys[index.createCostIndex]:
              var create = dailyData.total[keys[index.createIndex]]
              var cost = dailyData.total[keys[index.costIndex]]
              dailyData.total[key] = (cost / create).format(2)
              break;
            case keys[index.roiIndex]:
              var cost = dailyData.total[keys[index.costIndex]]
              var recharge = dailyData.total[keys[index.rechargeIndex]]
              dailyData.total[key] = ((recharge / cost) * 100).format(2) + '%'
              break;
            case keys[index.ltvIndex]:
              var mounthChargeKey = keys[index.mounthChargeIndex]
              var mounthActiveKey = keys[index.mounthActiveIndex]
              total.LTV = !total[mounthChargeKey] || !total[mounthActiveKey] ? 0 : (total[mounthChargeKey] / total[mounthActiveKey]).format(2);
            default:
              var keyValue = dailyData.total[key]
              var active = dailyData.total[keys[index.activeIndex]]
              if (key === keys[index.keep1Index] || key === keys[index.keep2Index] || key === keys[index.keep3Index]) {
                dailyData.total[key] = ((keyValue / active) * 100).format(2) + '%'
              }
              break;
          }
        })

      } else {
        dailyData = null
      }
      console.log('dailyData:->', dailyData)
      return dailyData
    },

    getChannel(state, getters) {
      var field = state.is2 ? 'channel2' : 'channel'
      var data, total = {}
      function initMma() {
        var mma = {}
        colorKey.forEach(key => {
          mma[key] = {
            min: Infinity,
            max: 0,
            avg: 0,
            isReversal: [keys[index.createCostIndex], keys[index.activeCostIndex], keys[index.registerCostIndex]].includes(key) ? true : false,
            total: 0,
            count: 0
          }
        })
        return mma
      }
      function assignment(item, mma, isLast) {
        colorKey.forEach(key => {
          var val = item[key]
          if (val !== 0) {
            mma[key].count++;
            mma[key].total += val
          }
          if (val > mma[key].max) {
            mma[key].max = val
          }
          if (val < mma[key].min) {
            mma[key].min = val
          }
          if (isLast) {
            mma[key].avg = mma[key].count ? mma[key].total / mma[key].count : 0
          }
        })
      }
      function init(arr, config) {
        if (!config.keys) {
          config.keys = Object.keys(arr[0]).map(item => item);
          config.keys.push('LTV')
        }
        if (!config.index) {
          config.index = {
            channelIndex: 1,
            osIndex: 2,
            activeIndex: 3,
            registerIndex: 4,
            createIndex: 5,
            costIndex: 6,
            activeCostIndex: 7,
            registerRateIndex: 8,
            createRateIndex: 9,
            registerCostIndex: 10,
            createCostIndex: 11,
            newCreateIndex: 12,
            newCreateCostIndex: 13,
            rechargeIndex: 17,
            roiIndex: 18,
            ltvIndex: 21,
            keep1Index: 14,
            keep2Index: 15,
            keep3Index: 16,
            mounthChargeIndex: 19,
            mounthActiveIndex: 20
          }
        }
        if (!config.colorKey) {
          config.colorKey = [
            config.keys[config.index.registerRateIndex],
            config.keys[config.index.createRateIndex],
            config.keys[config.index.activeCostIndex],
            config.keys[config.index.registerCostIndex],
            config.keys[config.index.createCostIndex]
          ]
        }
        if (!config.tableKey) {
          config.tableKey = [{
            key: config.keys[config.index.channelIndex],
            sortable: true,
            width: 150
          }, {
            key: config.keys[config.index.osIndex],
            sortable: true
          }, {
            key: config.keys[config.index.activeIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerRateIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createRateIndex],
            sortable: true
          }, {
            key: config.keys[config.index.activeCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.costIndex],
            sortable: true
          }, {
            key: config.keys[config.index.rechargeIndex],
            sortable: true,
            width: 200
          }, {
            key: config.keys[config.index.roiIndex],
            sortable: true
          }, {
            key: config.keys[config.index.mounthActiveIndex],
            sortable: true,
            hide: true
          }, {
            key: config.keys[config.index.mounthChargeIndex],
            sortable: true,
            hide: true
          }, {
            key: config.keys[config.index.ltvIndex],
            sortable: true
          }, {
            key: config.keys[config.index.keep1Index],
            sortable: true
          }, {
            key: config.keys[config.index.keep2Index],
            sortable: true
          }, {
            key: config.keys[config.index.keep3Index],
            sortable: true
          }]
          config.tableKey.map(item => {
            if (!item.width && !item.hide)
              return item.width = getWidth(item.key)
          })

        }
        if (!config.chartKey) {
          config.chartKey = [
            config.keys[config.index.activeIndex],
            config.keys[config.index.registerIndex],
            config.keys[config.index.createIndex],
            config.keys[config.index.costIndex],
            config.keys[config.index.createRateIndex],
          ]
        }
      }
      if (state[field][getters.getIdStr]) {
        var arr = state[field][getters.getIdStr][0];
        var arr_ = arr
        if (!arr.length) return null
        var config = state.configs['channel'];
        init(arr, config)
        if (state.configs.channel.channels.length) {
          arr_ = []
          arr.forEach(item => {
            var channelName = config.keys[config.index.channelIndex]
            var channel = item[channelName]
            if (state.configs.channel.channels.includes(channel)) arr_.push(item)
          })
        }
        data = {
          list: arr_,
          channel: []
        }
        var {
          keys,
          index,
          colorKey,
          tableKey
        } = config
        data.mmas = initMma()
        var isLast
        arr.forEach((item, i) => {
          keys.forEach(key => {
            var _ = item[key] * 1
            if (!isNaN(_)) {
              item[key] = _
            }
          })
          isLast = i === arr.length - 1
          assignment(item, data.mmas, isLast)
          data.channel.push(item[keys[index.channelIndex]])
          /**
           * ltv handler
           */
          var mounthChargeKey = keys[index.mounthChargeIndex]
          var mounthActiveKey = keys[index.mounthActiveIndex]
          item.LTV = !item[mounthChargeKey] || !item[mounthActiveKey] ? 0 : (item[mounthChargeKey] / item[mounthActiveKey]).format(2);
        })

        arr_.forEach((item, i) => {
          isLast = i + 1 === arr_.length
          tableKey.forEach(({ key }) => {
            switch (key) {
              case keys[index.channelIndex]:
                if (!total.hasOwnProperty(key)) {
                  total[key] = "全部"
                }
                break
              case keys[index.osIndex]:
                if (!total.hasOwnProperty(key)) {
                  total[key] = item[key]
                }
                break
              default:
                if (!total.hasOwnProperty(key)) {
                  total[key] = item[key]
                } else {
                  total[key] = (item[key] + total[key]).format(2)
                }
                break
            }
          })
        })

        var active = total[keys[index.activeIndex]]
        var register = total[keys[index.registerIndex]]
        total[keys[index.registerRateIndex]] = ((register / active) * 100).format(2) + '%'

        var active = total[keys[index.activeIndex]]
        var create = total[keys[index.createIndex]]
        total[keys[index.createRateIndex]] = ((create / active) * 100).format(2) + '%'

        var active = total[keys[index.activeIndex]]
        var cost = total[keys[index.costIndex]]
        total[keys[index.activeCostIndex]] = (cost / active).format(2)

        var register = total[keys[index.registerIndex]]
        var cost = total[keys[index.costIndex]]
        total[keys[index.registerCostIndex]] = (cost / register).format(2)

        var create = total[keys[index.createIndex]]
        var cost = total[keys[index.costIndex]]
        total[keys[index.createCostIndex]] = (cost / create).format(2)

        var cost = total[keys[index.costIndex]]
        var recharge = total[keys[index.rechargeIndex]]
        total[keys[index.roiIndex]] = ((recharge / cost) * 100).format(2) + '%'

        var mounthChargeKey = keys[index.mounthChargeIndex]
        var mounthActiveKey = keys[index.mounthActiveIndex]
        total[keys[index.ltvIndex]] = !total[mounthChargeKey] || !total[mounthActiveKey] ? 0 : (total[mounthChargeKey] / total[mounthActiveKey]).format(2);

        [keys[index.keep1Index], keys[index.keep2Index], keys[index.keep3Index]].forEach(key => {
          var keyValue = total[key]
          var active = total[keys[index.activeIndex]]
          total[key] = ((keyValue / active) * 100).format(2) + '%'
        })

        data.total = total
      } else {
        data = null
      }
      console.log(field + 'Data:->', data)
      return data
    },

    getZone(state, getters) {
      var field = state.is2 ? 'zone2' : 'zone'
      var data, total = {}
      function initMma() {
        var mma = {}
        colorKey.forEach(key => {
          mma[key] = {
            min: Infinity,
            max: 0,
            avg: 0,
            isReversal: [keys[index.createCostIndex], keys[index.activeCostIndex], keys[index.registerCostIndex]].indexOf(key) === -1 ? false : true,
            total: 0,
            count: 0
          }
        })
        return mma
      }

      function assignment(item, mma, isLast) {
        colorKey.forEach(key => {
          var val = item[key]
          if (val !== 0) {
            mma[key].count++;
            mma[key].total += val
          }
          if (val > mma[key].max) {
            mma[key].max = val
          }
          if (val < mma[key].min) {
            mma[key].min = val
          }
          if (isLast) {
            mma[key].avg = mma[key].count ? mma[key].total / mma[key].count : 0
          }
        })
      }

      function init(arr, config) {
        if (!config.keys) {
          config.keys = Object.keys(arr[0]).map(item => item);
          config.keys.push('LTV')
          config.keys.push('激活成本')
          console.log(config.keys)
        }
        if (!config.index) {
          config.index = {
            countryIndex: 0,
            osIndex: 1,
            activeIndex: 2,
            registerIndex: 3,
            createIndex: 4,
            registerRateIndex: 5,
            createRateIndex: 6,
            registerCostIndex: 7,
            createCostIndex: 8,
            rechargeIndex: 9,
            costIndex: 10,
            keep1Index: 11,
            keep2Index: 12,
            keep3Index: 13,
            roiIndex: 14,
            mounthChargeIndex: 15,
            mounthActiveIndex: 16,
            ltvIndex: 17,
            activeCostIndex: 18
          }
        }
        if (!config.colorKey) {
          config.colorKey = [
            config.keys[config.index.registerRateIndex],
            config.keys[config.index.createRateIndex],
            config.keys[config.index.registerCostIndex],
            config.keys[config.index.createCostIndex],
            config.keys[config.index.activeCostIndex]
          ]
        }
        if (!config.tableKey) {
          config.tableKey = [{
            key: config.keys[config.index.countryIndex],
            sortable: true,
            width: 150
          },
          {
            key: config.keys[config.index.osIndex],
            sortable: false
          }, {
            key: config.keys[config.index.activeIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerRateIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createRateIndex],
            sortable: true
          }, {
            key: config.keys[config.index.activeCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.costIndex],
            sortable: true
          }, {
            key: config.keys[config.index.rechargeIndex],
            sortable: true,
            width: 200
          }, {
            key: config.keys[config.index.roiIndex],
            sortable: true
          }, {
            key: config.keys[config.index.mounthChargeIndex],
            hide: true
          }, {
            key: config.keys[config.index.mounthActiveIndex],
            hide: true
          }, {
            key: config.keys[config.index.ltvIndex],
            sortable: true
          }, {
            key: config.keys[config.index.keep1Index],
            sortable: true
          }, {
            key: config.keys[config.index.keep2Index],
            sortable: true
          }, {
            key: config.keys[config.index.keep3Index],
            sortable: true
          }]

          config.tableKey.map(item => {
            if (!item.hasOwnProperty('width'))
              return item.width = getWidth(item.key)
          })
        }
        if (!config.chartKey) {
          config.chartKey = [
            config.keys[config.index.activeIndex],
            config.keys[config.index.registerIndex],
            config.keys[config.index.createIndex],
          ]
        }
      }
      if (state[field][getters.getIdStr]) {
        var arr = state[field][getters.getIdStr][0];
        var arr_ = arr
        if (!arr.length) return null
        var config = state.configs['zone'];
        init(arr, config)
        if (state.configs.zone.zones.length) {
          arr_ = []
          arr.forEach(item => {
            var zoneName = config.keys[config.index.countryIndex]
            var zone = item[zoneName]
            zone = arguments[2].overseas_common.regionMap[zone] || zone
            if (state.configs.zone.zones.includes(zone)) arr_.push(item)
          })
        }

        data = {
          list: arr_,
          zone: [],
          zones: []
        }

        var {
          keys,
          index,
          colorKey,
          tableKey,
          chartKey
        } = config

        data.mmas = initMma()
        var isLast
        arr.forEach((item, i) => {
          keys.forEach(key => {
            var _ = item[key] * 1
            if (!isNaN(_)) {
              item[key] = _
            }
          })

          /**
          * ltv handler
          */
          var mounthChargeKey = keys[index.mounthChargeIndex]
          var mounthActiveKey = keys[index.mounthActiveIndex]
          item.LTV = !item[mounthChargeKey] || !item[mounthActiveKey] ? 0 : (item[mounthChargeKey] / item[mounthActiveKey]).format(2);

          /**
          * activeCost handler
          */
          var recharge = item[keys[index.rechargeIndex]]
          var _cost = item[keys[index.costIndex]]
          var active = item[keys[index.activeIndex]]
          item[keys[index.activeCostIndex]] = !_cost || !active ? 0 : (_cost / active).format(2);

          if (i < 5) {
            data.zone.push(arr[i][keys[index.countryIndex]])
          }
          data.zones.push(arr[i][keys[index.countryIndex]])
          isLast = i + 1 === arr.length
          assignment(item, data.mmas, isLast)



        })

        arr_.forEach((item, i) => {
          isLast = i + 1 === arr_.length
          tableKey.forEach(({ key }) => {
            switch (key) {
              case keys[index.countryIndex]:
                if (!total.hasOwnProperty(key)) {
                  total[key] = "全部"
                }
                break
              case keys[index.osIndex]:
                if (!total.hasOwnProperty(key)) {
                  total[key] = item[key]
                }
                break
              default:
                if (!total.hasOwnProperty(key)) {
                  total[key] = item[key]
                } else {
                  total[key] = (item[key] + total[key]).format(2)
                }
                break
            }
          })
        })


        var active = total[keys[index.activeIndex]]
        var register = total[keys[index.registerIndex]]
        total[keys[index.registerRateIndex]] = ((register / active) * 100).format(2) + '%'

        var active = total[keys[index.activeIndex]]
        var create = total[keys[index.createIndex]]
        total[keys[index.createRateIndex]] = ((create / active) * 100).format(2) + '%'

        var active = total[keys[index.activeIndex]]
        var cost = total[keys[index.costIndex]]
        total[keys[index.activeCostIndex]] = (cost / active).format(2)

        var register = total[keys[index.registerIndex]]
        var cost = total[keys[index.costIndex]]
        total[keys[index.registerCostIndex]] = (cost / register).format(2)

        var create = total[keys[index.createIndex]]
        var cost = total[keys[index.costIndex]]
        total[keys[index.createCostIndex]] = (cost / create).format(2)

        var cost = total[keys[index.costIndex]]
        var recharge = total[keys[index.rechargeIndex]]
        total[keys[index.roiIndex]] = ((recharge / cost) * 100).format(2) + '%'

        var mounthChargeKey = keys[index.mounthChargeIndex]
        var mounthActiveKey = keys[index.mounthActiveIndex]
        total[keys[index.ltvIndex]] = !total[mounthChargeKey] || !total[mounthActiveKey] ? 0 : (total[mounthChargeKey] / total[mounthActiveKey]).format(2);

        [keys[index.keep1Index], keys[index.keep2Index], keys[index.keep3Index]].forEach(key => {
          var keyValue = total[key]
          var active = total[keys[index.activeIndex]]
          total[key] = ((keyValue / active) * 100).format(2) + '%'
        })

        data.total = total
      } else {
        data = null
      }
      console.log(field + 'Data:->', data)
      return data
    },

    getSystem(state, getters) {
      var field = 'system'
      class Data {
        constructor() {
          this.channelData = {}
          this.regionData = {}
        }
      }

      function init(arr, config) {
        if (!config.keys) {
          config.keys = Object.keys(arr[0]).map(item => item);
          config.keys.push('LTV')
          console.log(config.keys)
        }
        if (!config.index) {
          config.index = {
            appidIndex: 0,
            regionIndex: 1,
            channelIndex: 2,
            osIndex: 3,
            activeIndex: 4,
            registerIndex: 5,
            createIndex: 6,
            costIndex: 7,
            activeCostIndex: 8,
            registerRateIndex: 9,
            createRateIndex: 10,
            registerCostIndex: 11,
            createCostIndex: 12,
            newCreateIndex: 13,
            newCreateCostIndex: 14,
            keep1Index: 15,
            keep2Index: 16,
            keep3Index: 17,
            rechargeIndex: 18,
            roiIndex: 19,
            mounthChargeIndex: 20,
            mounthActiveIndex: 21,
            sortIndex: 22,
            ltvIndex: 23,
          }
        }
        if (!config.colorKey) {
          config.colorKey = []
        }
        if (!config.tableKey) {
          config.tableKey = [{
            key: config.keys[config.index.osIndex],
            sortable: false
          }, {
            key: config.keys[config.index.activeIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerRateIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createRateIndex],
            sortable: true
          }, {
            key: config.keys[config.index.activeCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.registerCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.createCostIndex],
            sortable: true
          }, {
            key: config.keys[config.index.costIndex],
            sortable: true
          }, {
            key: config.keys[config.index.rechargeIndex],
            sortable: true
          }, {
            key: config.keys[config.index.roiIndex],
            sortable: true
          }, {
            key: config.keys[config.index.ltvIndex],
            sortable: true
          }, {
            key: config.keys[config.index.keep1Index],
            sortable: true
          }, {
            key: config.keys[config.index.keep2Index],
            sortable: true
          }, {
            key: config.keys[config.index.keep3Index],
            sortable: true
          }]

          config.tableKey.map(item => {
            if (!item.hasOwnProperty('width'))
              return item.width = getWidth(item.key)
          })
        }
        if (!config.chartKey) {
          config.chartKey = [
            '安卓',
            'IOS',
          ]
        }
        if (!config.chartList) {
          config.chartList = [
            config.keys[config.index.activeIndex],
            config.keys[config.index.costIndex],
            config.keys[config.index.registerIndex],
            config.keys[config.index.registerRateIndex],
          ];
        }
        if (!config.curChartKey) {
          config.curChartKey = config.chartList[0]
        }
        if (!config.tag) {
          config.tag = "channelData"
        }
        if (!config.category) {
          config.category = null
        }
      }
      var data = null
      if (state[field][getters.getIdStr]) {
        var arr = state[field][getters.getIdStr][0];
        if (!arr.length) return null

        var config = state.configs[field];
        init(arr, config)
        var {
          keys,
          index,
          colorKey,
          tableKey,
          chartKey
        } = config
        var channelKey = keys[index.channelIndex]
        var osKey = keys[index.osIndex]
        var regionKey = keys[index.regionIndex]
        var isNaNList = []
        var totalList = []
        data = new Data()
        arr.forEach((item, i) => {
          keys.forEach(key => {
            var _ = item[key] * 1
            if (!isNaN(_)) {
              item[key] = _
            } else {
              !i && isNaNList.push(key)
            }
          })

          var channel = item[channelKey]
          var os = item[osKey]
          var region = item[regionKey]

          /**channel 1 */
          if (!data.channelData.hasOwnProperty(channel)) {
            data.channelData[channel] = {
              system: {},
              category: {},
              total: Object.assign({}, item)
            }
            data.channelData[channel].total[osKey] = "全部"
            totalList.push(data.channelData[channel].total)
          } else {
            var total = data.channelData[channel].total
            for (var key in item) {
              if (isNaNList.indexOf(key) === -1) {
                total[key] = (total[key] + item[key]).format(2)
              }
            }
          }
          /**region 1 */
          if (!data.regionData.hasOwnProperty(region)) {
            data.regionData[region] = {
              system: {},
              category: {},
              total: Object.assign({}, item)
            }
            data.regionData[region].total[osKey] = "全部"
            totalList.push(data.regionData[region].total)
          } else {
            var total = data.regionData[region].total
            for (var key in item) {
              if (isNaNList.indexOf(key) === -1) {
                total[key] = (total[key] + item[key]).format(2)
              }
            }
          }

          /**channel 2 */
          if (!data.channelData[channel].system.hasOwnProperty(os)) {
            data.channelData[channel].system[os] = Object.assign({}, item)
            totalList.push(data.channelData[channel].system[os])
          } else {
            var total = data.channelData[channel].system[os]
            for (var key in item) {
              if (isNaNList.indexOf(key) === -1) {
                total[key] = (total[key] + item[key]).format(2)
              }
            }
          }
          /**region 2 */
          if (!data.regionData[region].system.hasOwnProperty(os)) {
            data.regionData[region].system[os] = Object.assign({}, item)
            totalList.push(data.regionData[region].system[os])
          } else {
            var total = data.regionData[region].system[os]
            for (var key in item) {
              if (isNaNList.indexOf(key) === -1) {
                total[key] = (total[key] + item[key]).format(2)
              }
            }
          }

          /**channel 3 */
          if (!data.channelData[channel].category.hasOwnProperty(region)) {
            data.channelData[channel].category[region] = {
              system: {},
              total: Object.assign({}, item)
            }
            data.channelData[channel].category[region].total[osKey] = "全部"
            totalList.push(data.channelData[channel].category[region].total)
          } else {
            var total = data.channelData[channel].category[region].total
            for (var key in item) {
              if (isNaNList.indexOf(key) === -1) {
                total[key] = (total[key] + item[key]).format(2)
              }
            }
          }
          /**region 3 */
          if (!data.regionData[region].category.hasOwnProperty(channel)) {
            data.regionData[region].category[channel] = {
              system: {},
              total: Object.assign({}, item)
            }
            data.regionData[region].category[channel].total[osKey] = "全部"
            totalList.push(data.regionData[region].category[channel].total)
          } else {
            var total = data.regionData[region].category[channel].total
            for (var key in item) {
              if (isNaNList.indexOf(key) === -1) {
                total[key] = (total[key] + item[key]).format(2)
              }
            }
          }

          /**channel 4 */
          if (!data.channelData[channel].category[region].system.hasOwnProperty(os)) {
            data.channelData[channel].category[region].system[os] = Object.assign({}, item)
            totalList.push(data.channelData[channel].category[region].system[os])
          } else {
            var total = data.channelData[channel].category[region].system[os]
            for (var key in item) {
              if (isNaNList.indexOf(key) === -1) {
                total[key] = (total[key] + item[key]).format(2)
              }
            }
          }
          /**region 4 */
          if (!data.regionData[region].category[channel].system.hasOwnProperty(os)) {
            data.regionData[region].category[channel].system[os] = Object.assign({}, item)
            totalList.push(data.regionData[region].category[channel].system[os])
          } else {
            var total = data.regionData[region].category[channel].system[os]
            for (var key in item) {
              if (isNaNList.indexOf(key) === -1) {
                total[key] = (total[key] + item[key]).format(2)
              }
            }
          }
        })
        handler()

        function handler() {
          totalList.forEach(total => {

            var charge = total[keys[index.mounthChargeIndex]]
            var active = total[keys[index.mounthActiveIndex]]
            total.LTV = !charge || !active ? 0 : (charge / active).format(2)

            var keeps = [
              keys[index.keep1Index],
              keys[index.keep2Index],
              keys[index.keep3Index]
            ]
            keeps.forEach(keep => {
              total[keep] = (total[keep] / total[keys[index.activeIndex]] * 100).format(2) + '%'
            })

            for (var key in total) {
              switch (key) {
                case keys[index.registerRateIndex]:
                  var active = total[keys[index.activeIndex]]
                  var register = total[keys[index.registerIndex]]
                  total[key] = ((register / active) * 100).format(2) + '%'
                  break;
                case keys[index.createRateIndex]:
                  var active = total[keys[index.activeIndex]]
                  var create = total[keys[index.createIndex]]
                  total[key] = ((create / active) * 100).format(2) + '%'
                  break;
                case keys[index.activeCostIndex]:
                  var active = total[keys[index.activeIndex]]
                  var cost = total[keys[index.costIndex]]
                  total[key] = (cost / active).format(2)
                  break;
                case keys[index.registerCostIndex]:
                  var register = total[keys[index.registerIndex]]
                  var cost = total[keys[index.costIndex]]
                  total[key] = (cost / register).format(2)
                  break;
                case keys[index.createCostIndex]:
                  var create = total[keys[index.createIndex]]
                  var cost = total[keys[index.costIndex]]
                  total[key] = (cost / create).format(2)
                  break;
                case keys[index.roiIndex]:
                  var cost = total[keys[index.costIndex]]
                  var recharge = total[keys[index.rechargeIndex]]
                  total[key] = ((recharge / cost) * 100).format(2) + '%'
                  break;
              }
            }
          })
        }
      }
      console.log(field + 'Data:->', data)
      return data
    },

  },
  actions: {
    getReportInfo(context, {
      params,
      tag,
      is2
    }) {
      var {
        commit,
        state,
        dispatch,
        getters,
        rootGetters,
        rootState,
      } = context

      if (is2) {
        commit('set_is2', true)
      } else {
        commit('set_is2', false)
      }
      var url = '/query/' + rootGetters.getMenu[Config.deliveryMenuId].dataView[0]
      console.log("Params:->", params)

      var promise1 = new Promise((resolve) => {
        http.post(url, params).then(data => {
          if (data.code == 401) {
            commit("set_" + tag, [params.gameIds, data.state]);
            resolve(data.state)
          } else {
            this.$notify.warning({
              message: data.message
            })
            consoel.error(message)
          }
        })
      })
      if (tag.indexOf('zone') !== -1 || tag === 'system') {
        var promise2 = new Promise(resolve => {
          this.dispatch('overseas_common/getRegionMap').then(() => {
            resolve()
          })
        })
        return Promise.all([
          promise1,
          promise2
        ])
      } else {
        return promise1
      }


    }
  }
}