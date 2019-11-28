<template>
  <div>
    <div v-if="$data.$_curChannel">
      <el-button size="medium" @click="back()">
        <span>
          当前渠道:
          <span style="color:#5b5691;font-weight:700">{{$data.$_curChannel}}</span>
          —— 返回
        </span>
      </el-button>
    </div>
    <div v-if="$$data">
      <div class="chart-area" ref="chart"></div>
      <el-select class="channels" v-model="channels" multiple placeholder="请选择">
        <el-option v-for="item in $$data.channel" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <div class="table-item">
        <!-- :summary-method="getSummaries"  show-summary-->
        <el-table :default-sort="{prop: $data.$_mainKey, order: $data.$_order}" :data="$$data.list" :cell-style="addStyle" :cell-class-name="cellClassName" @cell-click="cellClick">
          <el-table-column v-for="(item, i) in $$config.tableKey" :key="i" :prop="item.key" :label="item.key" :sortable="item.sortable" :width="item.width" :formatter="formatter" v-if="!item.hide"></el-table-column>
          <div slot="append">
            <total-float :_config="{
            _config: $$config,
            $$data: $$data,
            key: $data.$_mainKey,
            sortKey: $data.$_sortKey,
          }" :_chart="$data.$_chartIsReady" />
          </div>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import totalFloat from "./total-float";
export default {
  props: ['_config', '_types'],
  components: {
    totalFloat
  },
  watch: {
    channels(channels) {
      this.$store.commit("o_r_delivery/set_channels", channels);
    }
  },
  data: () => {
    return {
      $_order: "ascending",
      $_chartIsReady: 0,
      $_curChannel: null,
      $_mainKey: null,
      $_sortKey: null,
      $_mainTag: null,
      channels: [],
      newlist: [],
      // selectList: []
    };
  },
  computed: {
    $$data() {
      var data
      if (this.$data.$_curChannel) {
        data = this.$store.getters["o_r_delivery/getZone"];
      } else {
        data = this.$store.getters["o_r_delivery/getChannel"];
      }
      if (data) {
        // for (let i = 0; i < data.list.length; i++) {
        //   this.selectList.push(data.list[i])
        // }
        this.$nextTick(() => {
          this.createChart();
        });
      }
      console.log(data)
      return data;
    },
    $$config() {
      var config
      if (this.$data.$_curChannel) {
        this.$data.$_mainTag = 'zone'
        config = this.$store.state.o_r_delivery.configs[this.$data.$_mainTag]
        console.log('channel.vue', config)
        this.$data.$_mainKey = config.keys[config.index.countryIndex]
        this.$data.$_sortKey = config.keys[config.index.activeIndex]
      } else {
        this.$data.$_mainTag = 'channel'
        config = this._config
        this.$data.$_sortKey = this.$data.$_mainKey = config.keys[config.index.channelIndex]

        this.$data.channels = config.channels
      }
      console.log(config)
      return config
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '全部';
          return;
        }
        if (index === 1) {
          sums[index] = '全部';
          return;
        }

        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return (prev + curr).format(2);
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = 'N/A';
        }
        if (column.property == '注册率') {
          sums[index] = (sums[3] / sums[2] * 100).format(2) + '%';
        }
        if (column.property == '创角率') {
          sums[index] = (sums[4] / sums[2] * 100).format(2) + '%';
        }
      });
      sums[7] = (sums[10] / sums[2]).format(2);
      sums[8] = (sums[10] / sums[3]).format(2);
      sums[9] = (sums[10] / sums[4]).format(2);
      sums[12] = (sums[11] / sums[10]).format(2);
      sums[14] = (sums[14] / sums[2]).format(2) + '%';
      sums[15] = (sums[15] / sums[2]).format(2) + '%';
      sums[16] = (sums[16] / sums[2]).format(2) + '%';
      return sums;
    },
    back() {
      this.$data.$_curChannel = null
      this.$store.commit("o_r_delivery/set_is2", false);
    },
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (!this.$data.$_curChannel) {
        var { label } = column
        var { keys, index } = this.$$config
        if (label === keys[index.channelIndex]) {
          return 'channel'
        }
      }
    },
    cellClick(row, column, cell, event) {
      if (!this.$data.$_curChannel) {
        var { label } = column
        var { keys, index } = this.$$config
        if (label === keys[index.channelIndex]) {
          var channel = row[keys[index.channelIndex]]
          var params = {
            querytype: this._types['zone'],
            begin_date: this.$store.state.o_r_delivery.date[0],
            end_date: this.$store.state.o_r_delivery.date[1],
            os: this.$store.state.o_r_delivery.os,
            gameIds: this.$store.getters["o_r_delivery/getIdStr"],
            media_source: channel,
            country: ''
          }
          this.$store.dispatch("o_r_delivery/getReportInfo", { params, tag: 'zone2', is2: true }).then(data => {
            this.$data.$_curChannel = channel;
          })
        }
      }
    },
    formatter(row, column, value) {
      var {
        index, keys
      } = this.$$config
      var {
        label
      } = column
      if (
        label === keys[index.registerRateIndex]
        || label === keys[index.createRateIndex]
        || label === keys[index.roiIndex]
      ) {
        value += '%'
      } else if (
        label === keys[index.keep1Index]
        || label === keys[index.keep2Index]
        || label === keys[index.keep3Index]
      ) {
        value = (value / row[keys[index.activeIndex]] * 100).format(2) + '%';
      }
      if (this.$data.$_curChannel && label === keys[index.countryIndex]) {
        value = this.$store.state.overseas_common.regionMap[value] || value
      }
      return value
    },
    addStyle({ row, column, rowIndex, columnIndex }) {
      function r2g(value, avg) {
        var percent = value;
        if (percent < 30) return "#f9686a";
        else if (percent <= 50) return "#ffc0cb";
        else if (percent <= 70) return "#ffeb85";
        else if (percent <= 90) return "#98fb98";
        else return "#228b22";
      }
      function g2r(value, avg) {
        var middle = avg / 0.5;
        var percent = value / middle;
        if (percent <= 0.2) return "#228b22";
        else if (percent <= 0.4) return "#98fb98";
        else if (percent <= 0.6) return "#ffeb85";
        else if (percent <= 0.8) return "#ffc0cb";
        else return "#f9686a";
      }
      function retColor(mmaObj, data) {
        var avg = mmaObj.avg;
        var isReversal = mmaObj.isReversal;
        var style = {
          fontWeight: 700,
          color: "#000"
        };
        if (isReversal == true) {
          style["background"] = g2r(data, avg);
        } else {
          style["background"] = r2g(data, avg);
        }
        return style;
      }


      var { keys, index } = this.$$config;
      var { label } = column;
      switch (label) {
        case keys[index.registerRateIndex]:
          return retColor(this.$$data.mmas[label], row[label]);
          break;
        case keys[index.createRateIndex]:
          return retColor(this.$$data.mmas[label], row[label]);
          break;
        case keys[index.activeCostIndex]:
          return retColor(this.$$data.mmas[label], row[label]);
          break;
        case keys[index.registerCostIndex]:
          return retColor(this.$$data.mmas[label], row[label]);
          break;
        case keys[index.createCostIndex]:
          return retColor(this.$$data.mmas[label], row[label]);
          break;
      }

    },
    createChart() {
      var serials = (() => {
        return this.$$config.chartKey.map(key => {
          var data = this.$$data[this.$data.$_mainTag].map((date, i) => {
            return this.$$data.list[i][key];
          });
          return { name: key, data: data };
        });
      })();
      var x = (() => {
        if (this.$data.$_curChannel) {
          return this.$$data[this.$data.$_mainTag].map(name => {
            return this.$store.state.overseas_common.regionMap[name]
          })
        }
        return this.$$data[this.$data.$_mainTag]
      })()
      highchartUtil.drawChart(
        this.$refs.chart,
        "column",
        x,
        serials
      );
      this.$data.$_chartIsReady = Math.random()
      console.log(this.$data.$_chartIsReady)
    }
  }
};
</script>

<style lang="scss">
.reports-market {
  .el-table__row {
    td.channel {
      padding: 0;
      .cell {
        cursor: pointer;
        line-height: 48px;
        &:hover {
          background: #5b5691;
          color: #fff;
        }
      }
    }
  }
}
.el-select.channels {
  display: flex;
  margin: 2px 15px;
}
</style>




