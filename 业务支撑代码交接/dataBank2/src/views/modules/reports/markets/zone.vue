<template>
  <div>
    <div style="margin-left: 25px" v-if="$data.$_curCountry">
      <el-button size="medium" @click="back()">
        <span>
          当前地区:
          <span style="color:#5b5691;font-weight:700">{{this.$store.state.overseas_common.regionMap[$data.$_curCountry] || $data.$_curCountry}}</span>
          —— 返回
        </span>
      </el-button>
    </div>
    <div v-if="$$data">
      <div class="chart-area" ref="chart"></div>
      <el-select class="zones" v-model="zones" multiple placeholder="请选择">
        <el-option v-for="item in $$data.zones" :key="item" :label="$store.state.overseas_common.regionMap[item] || item" :value="$store.state.overseas_common.regionMap[item] || item">
        </el-option>
      </el-select>
      <div class="table-item">
        <!-- :summary-method="getSummaries" show-summary  -->
        <el-table :default-sort="{prop: $data.$_sortKey, order: $data.$_order}" :data="$$data.list" :cell-style="addStyle" :cell-class-name="cellClassName" @cell-click="cellClick">
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
import { regionMap } from '../../../../utils/regionMap.js'
export default {
  components: {
    totalFloat
  },
  props: ['_config', '_types'],
  watch: {
    zones(zones) {
      this.$store.commit("o_r_delivery/set_zones", zones);
    }
  },
  data() {
    return {
      $_order: 'descending',
      $_chartIsReady: 0,
      $_curCountry: null,
      $_mainKey: null,
      $_sortKey: null,
      $_mainTag: null,
      $_regionMap: null,
      zones: [],
      newlist: [],
      selectList: []
    }
  },
  computed: {
    $$data() {
      var data
      if (this.$data.$_curCountry) {
        data = this.$store.getters["o_r_delivery/getChannel"];
      } else {
        data = this.$store.getters["o_r_delivery/getZone"];

      }
      if (data) {
        for (let i = 0; i < data.list.length; i++) {
          if (regionMap[data.list[i].country_name]) {
            data.list[i].country_name = regionMap[data.list[i].country_name]
          }
          this.selectList.push(data.list[i])
        }
        this.$nextTick(() => {
          this.createChart();
        });
      }

      console.log(data)
      return data;
    },
    $$config() {
      var config
      if (this.$data.$_curCountry) {
        this.$data.$_mainTag = 'channel'
        config = this.$store.state.o_r_delivery.configs[this.$data.$_mainTag]
        this.$data.$_sortKey = this.$data.$_mainKey = config.keys[config.index.channelIndex]
      } else {
        this.$data.$_mainTag = 'zone'
        config = this._config
        this.$data.$_mainKey = config.keys[config.index.countryIndex]
        this.$data.$_sortKey = config.keys[config.index.activeIndex]
        this.$data.zones = config.zones
      }
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
          sums[index] = '综合';
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
    selectChange() {
      if (this.value5.length == 0) {
        this.$$data.list = this.selectList;
        return;
      }
      this.$$data.list = this.selectList;
      let list = this.$$data.list;
      this.newlist = [];
      for (let i = 0; i < this.value5.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (list[j].country_name == this.value5[i]) {
            this.newlist.push(list[j])
            break;
          }
        }
      }
      this.$$data.list = this.newlist;
    },
    back() {
      this.$data.$_curCountry = null
      this.$store.commit("o_r_delivery/set_is2", false);
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

      if (!this.$data.$_curChannel) {
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
      }
    },
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (!this.$data.$_curCountry) {
        var { label } = column
        var { keys, index } = this.$$config
        if (label === keys[index.countryIndex]) {
          return 'country'
        }
      }
    },
    cellClick(row, column, cell, event) {
      if (!this.$data.$_curCountry) {
        var { label } = column
        var { keys, index } = this.$$config
        if (label === keys[index.countryIndex]) {
          var country = row[keys[index.countryIndex]]
          var params = {
            querytype: this._types['channel'],
            begin_date: this.$store.state.o_r_delivery.date[0],
            end_date: this.$store.state.o_r_delivery.date[1],
            os: this.$store.state.o_r_delivery.os,
            gameIds: this.$store.getters["o_r_delivery/getIdStr"],
            media_source: '',
            country: country
          };
          this.$store.dispatch("o_r_delivery/getReportInfo", { params, tag: 'channel2', is2: true }).then(data => {
            this.$data.$_curCountry = country;
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
      if (!this.$data.$_curCountry && label === keys[index.countryIndex]) {
        value = this.$store.state.overseas_common.regionMap[value] || value
      }
      else if (
        label === keys[index.registerRateIndex]
        || label === keys[index.createRateIndex]
        || label === keys[index.roiIndex]
      ) {
        value += '%'
      }
      else if (
        label === keys[index.keep1Index]
        || label === keys[index.keep2Index]
        || label === keys[index.keep3Index]
      ) {
        value = (value / row[keys[index.activeIndex]] * 100).format(2) + '%';
      }
      return value
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
        if (!this.$data.$_curCountry) {
          return this.$$data[this.$data.$_mainTag].map(name => {
            return this.$store.state.overseas_common.regionMap[name] || name
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

}
</script>
<style lang="scss">
.reports-market {
  .el-table__row {
    td.country {
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
.el-select.zones {
  display: flex;
  margin: 2px 15px;
}
</style>


