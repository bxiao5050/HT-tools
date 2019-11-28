<template>
  <div v-if="$$data">
    <div class="chart-area" ref="chart"></div>
    <div class="table-item" v-for="(region, i) in $$data.category" :key="i">
      <el-table :default-sort="{prop: _config.keys[_config.index.activeIndex], order: $data.$_order}" :data="$$data[region]" :cell-style="addStyle">
        <el-table-column v-for="(item, i) in _config.tableKey" :key="i" :prop="item.key" :label="item.key" :sortable="item.sortable" :width="item.width" :formatter="formatter" :render-header="renderHeader.bind(this, region)" v-if="!item.hide"></el-table-column>
        <div slot="append">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" :style="{width:getTotalWidth()}">
            <colgroup>
              <col :class="'el-table_1_column_'+(i++)" v-for="(item, i) in _config.tableKey" :key="i" :width="item.width" v-if="!item.hide">
            </colgroup>
            <tbody>
              <tr class="el-table__row total">
                <td :class="'el-table_1_column_'+(i++)" v-for="(item, i) in _config.tableKey" :key="i" v-if="!item.hide">
                  <div class="cell">{{$$data.total[region][item.key]}}</div>
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
      $_order: 'descending'
    }
  },
  computed: {
    $$data() {
      var _ = this.$store.getters['o_r_delivery/getComprehensive']
      if (_) {
        this.$nextTick(() => {
          this.createChart()
        })
      }
      return _
    }
  },
  methods: {
    getTotalWidth() {
      var width = 0
      this._config.tableKey.forEach(item => {
        if (!item.hide) width += item.width
      })
      return width + 'px'
    },
    renderHeader(region, h, { column, $index }) {
      if (!$index) {
        return h(
          'div',
          {
            class: 'region'
          },
          region
        )
      }
      return column.label
    },
    formatter(row, column, value) {
      var {
        index, keys
      } = this._config
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
      return value
    },
    createChart() {
      var serials = (() => {
        return this._config.chartKey.map(key => {
          var data = this.$$data.category.map(region => {
            return this.$$data.total[region][key]
          })
          return { name: key, data: data }
        })
      })()
      highchartUtil.drawChart(this.$refs.chart, 'column', this.$$data.category, serials)
    },
    addStyle({ row, column, rowIndex, columnIndex }) {
      function r2g(value, avg) {
        var percent = value;
        if (percent < 30)
          return '#f9686a'
        else if (percent <= 50)
          return '#ffc0cb'
        else if (percent <= 70)
          return '#ffeb85'
        else if (percent <= 90)
          return '#98fb98'
        else
          return '#228b22'
      }
      function g2r(value, avg) {
        var middle = avg / 0.5;
        var percent = value / middle;
        if (percent <= 0.2)
          return '#228b22'
        else if (percent <= 0.4)
          return '#98fb98'
        else if (percent <= 0.6)
          return '#ffeb85'
        else if (percent <= 0.8)
          return '#ffc0cb'
        else
          return '#f9686a'
      }
      function retColor(mmaObj, data) {
        var avg = mmaObj.avg;
        var isReversal = mmaObj.isReversal;
        var style = {
          fontWeight: 700,
          color: '#000'
        }
        // if (avg === 0) return;
        if (isReversal == true) {
          style['background'] = g2r(data, avg);
        } else {
          style['background'] = r2g(data, avg);
        }
        return style
      }
      var { keys, index } = this._config
      var { label } = column
      var mmaObj = this.$$data.mmas[row[keys[index.countryIndex]]][label]
      switch (label) {
        case keys[index.registerRateIndex]:
          return retColor(mmaObj, row[label])
          break;
        case keys[index.createRateIndex]:
          return retColor(mmaObj, row[label])
          break;
        case keys[index.activeCostIndex]:
          return retColor(mmaObj, row[label])
          break;
        case keys[index.registerCostIndex]:
          return retColor(mmaObj, row[label])
          break;
        case keys[index.createCostIndex]:
          return retColor(mmaObj, row[label])
          break;
      }
    }
  }
}
</script>

<style lang="scss">
.el-table {
  tr:first-child {
    th {
      .region {
        font-family: "黑体";
        color: #5b5691;
        font-size: 16px;
      }
    }
  }
}
</style>



