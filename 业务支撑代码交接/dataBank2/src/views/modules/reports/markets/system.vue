<template>
  <div v-if="__data">

    <my-row style="justify-content: center;" v-if="!$data.__category">
      <el-radio-group v-model="$data.__tag" size="medium" @change="selectTag" style="margin: 0 0 -8px 0">
        <el-radio-button label="channelData">{{_config.keys[_config.index.channelIndex]}}</el-radio-button>
        <el-radio-button label="regionData">{{_config.keys[_config.index.regionIndex]}}</el-radio-button>
      </el-radio-group>
    </my-row>
    <my-row style="justify-content: center;" v-else>
      <el-button @click="goBack()">{{__backStr}}</el-button>
    </my-row>

    <my-col class="chart-area">
      <el-radio-group v-model="$data.__curChartKey" size="medium" @change="createChart">
        <el-radio-button :label="label" v-for="(label, index) in _config.chartList" :key="index"></el-radio-button>
      </el-radio-group>
      <div ref="chart" style="margin-top:5px"></div>
    </my-col>

    <div v-for="(item, itemName) in __data" :key="itemName" class="table-item">
      <div class="channel-name" @click="getDetail(itemName)">{{getRealName(itemName)}}</div>
      <el-table :default-sort="{prop: _config.keys[_config.index.activeIndex], order: $data.__order}" :data="getData(itemName)">
        <el-table-column v-for="(item, i) in _config.tableKey" :key="i" :prop="item.key" :label="item.key" :sortable="item.sortable" :width="item.width"  v-if="!item.hide"/>
        <div slot="append">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" :style="{width:getTotalWidth()}">
            <colgroup>
              <col :class="'el-table_1_column_'+(i++)" v-for="(item, i) in _config.tableKey" :key="i" :width="item.width" v-if="!item.hide">
            </colgroup>
            <tbody>
              <tr class="el-table__row total">
                <td :class="'el-table_1_column_'+(i++)" v-for="(item, i) in _config.tableKey" :key="i" v-if="!item.hide">
                  <div class="cell">{{__data[itemName].total[item.key]}}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['_config'],
  data() {
    return {
      __tag: null,
      __category: null,
      __curChartKey: null,
      __order: 'descending',
    }
  },
  computed: {
    __data() {
      var __data = this.$store.getters['o_r_delivery/getSystem']

      if (!this.init.isInit) {
        this.init()
      }

      if (__data) {
        this.selectTag()
      }

      if (this.$data.__category) {
        __data = __data[this.$data.__tag][this.$data.__category].category
      } else if (this.$data.__tag) {
        __data = __data[this.$data.__tag]
      } else {
        __data = null;
      }
      return __data
    },
    __backStr() {
      if (this.$data.__category) {
        if ('channelData' === this.$data.__tag) {
          return `返回 - 当前： 渠道 ${this.$data.__category} 的 地区数据`
        } else {
          return `返回 - 当前： ${this.getRealName(this.$data.__category)}地区的 渠道数据`
        }
      }
      return ''
    }
  },
  watch: {},
  methods: {
    getTotalWidth() {
      var width = 0
      this._config.tableKey.forEach(item => {
        if (!item.hide)
          width += item.width
      })
      return width + 'px'
    },
    getRealName(name) {
      return this.$store.state.overseas_common.regionMap[name] || name
    },
    getData(itemName) {
      return Object.keys(this.__data[itemName].system).map(os => this.__data[itemName].system[os])
    },
    getDetail(itemName) {
      if (!this.$data.__category) {
        this._config.category = this.$data.__category = itemName
        this.createChart()
      }
    },
    goBack() {
      if (this.$data.__category) {
        this._config.category = this.$data.__category = null
        this.createChart()
      }
    },
    selectTag() {
      this._config.tag = this.$data.__tag
      this.$nextTick(() => {
        this.createChart()
      })
    },
    createChart() {
      this._config.curChartKey = this.$data.__curChartKey
      var { chartKey, curChartKey, keys, index } = this._config
      var dataList = Object.keys(this.__data)
      var series = (() => {
        return chartKey.map((name, i) => {
          var os = ['android', 'ios'][i]
          var data = dataList.map(item => {
            var value
            if (this.__data[item].system.hasOwnProperty(os)) {
              value = this.__data[item].system[os][curChartKey]
            } else {
              value = 0
            }
            return value.replace ? value.replace('%', '') * 1 : value
          })
          return { name, data }
        })
      })()
      Highcharts.chart(this.$refs.chart, {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: dataList.map(item => {
            return this.getRealName(item)
          })
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            },
            formatter: function () {
              return curChartKey === keys[index.registerRateIndex] ? this.total + '%' : this.total
            }
          }
        },
        legend: {
          align: 'right',
          x: -30,
          verticalAlign: 'top',
          y: 25,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br>',
          pointFormat: '{series.name}：{point.y}'// <br/> Total: {point.stackTotal}'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: true,
              color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
              formatter: function () {
                return curChartKey === keys[index.registerRateIndex] ? this.y + '%' : this.y
              }
            }
          }
        },
        series: series
      })
    },
    init() {
      if (this._config.tag) {
        this.$data.__tag = this._config.tag
        this.$data.__curChartKey = this._config.curChartKey;
        this.$data.__category = this._config.category;
        this.init.isInit = true
      }
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.channel-name {
  color: #5b5691;
  font-family: "\9ED1\4F53";
  font-size: 22px;
  margin: -5px 0 9px 0;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: #fff;
    background: #5b5691;
  }
}
.active {
  color: #fff;
  background: #409eff !important;
}
</style>

