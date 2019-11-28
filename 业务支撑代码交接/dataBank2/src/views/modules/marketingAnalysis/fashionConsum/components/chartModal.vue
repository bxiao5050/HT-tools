<template>
  <Modal :headerName="modalTitle" width="800" @close="$emit('close')">
    <div slot="modal-body">
      <div class="content-header">
        <moduleHeader :dateList="dateList" @datetypeChange="datetypeChange"></moduleHeader>
        <div class="switch-group">
          <div class="switchs-item">
            <span class="item-header">显示类型:</span>
            <div class="item-content">
              <div class="bt-item" :class="{'check':showType===1}" @click="showType=1">图形</div>
              <div class="bt-item" :class="{'check':showType===2}" @click="showType=2">表格</div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-group" v-show="showType==1">
        <div id="payMoneyChart" class="charts"></div>
        <div id="payCountChart" class="charts"></div>
      </div>
      <div class="table-content" v-show="showType==2">
        <normalTable :tableData="tableData"></normalTable>
      </div>
      <!-- <table class="table table-hover">
        <tbody>
          <tr v-for="(item, index) in indicatorData" :key="index">
            <td>{{item['indicatorName']}}</td>
            <td style="width:70%;">{{item['getIndicatorDescription']}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-if="indicatorData.length==0">
            <td colspan="2">无数据</td>
          </tr>
        </tfoot>
      </table> -->
      <!-- <normalTable :tableData="indicatorData" :isHideHeader="true"></normalTable> -->
    </div>
  </Modal>
</template>
<script>
  import moduleHeader from 'src/views/modules/module-header'
  import Modal from 'src/components/modal.vue'
  import normalTable from 'src/components/table/element-table.vue'
  import api from 'src/services/api'
  export default {
    name: 'chartModal',
    components: {
      Modal, normalTable, moduleHeader
    },
    props: ['type', 'moneyType', 'goodsType', 'searchKey', 'selectedItem'],
    data() {
      return {
        datetype: 1,
        date1: moment().add(-7, 'day').format('YYYY-MM-DD'),
        date2: moment().add(-1, 'day').format('YYYY-MM-DD'),
        tableData: [],
        chartData: [],

        showType: 1,
      }
    },
    computed: {
      dateList() {
        return [
          {
            single: false,
            uid: 'dates',
            label: '日期',
            startDate: this.date1,
            endDate: this.date2,
            isShowDatetype: true,
            datetype: this.datetype,
            change: (newDate) => { this.date1 = newDate.startDate; this.date2 = newDate.endDate; this.getChartData(); }
          }]
      },
      modalTitle() {
        if (this.type == 1) {
          return this.selectedItem.item_name + '详细数据'
        } else {
          return this.selectedItem.agent_name + '详细数据'
        }
      }
    },
    mounted() {
      this.getChartData()
    },
    methods: {
      datetypeChange(newVal) {
        this.datetype = newVal
        if (newVal === 1) {
          this.date1 = moment().add(-7, 'day').format('YYYY-MM-DD')
          this.date2 = moment().add(-1, 'day').format('YYYY-MM-DD')
        } else if (newVal === 2) {
          this.date1 = moment().add(-7, 'week').day(1).format('YYYY-MM-DD')
          this.date2 = moment().add(-1, 'week').day(1).format('YYYY-MM-DD')
        } else if (newVal === 3) {
          this.date1 = moment().add(-7, 'month').date(1).format('YYYY-MM-DD')
          this.date2 = moment().add(-1, 'month').date(1).format('YYYY-MM-DD')
        }
        this.getChartData()
      },
      getChartData() {
        let params = {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          in_type_id: 4,  // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询 4 查询图标明细数据
          in_money_type: this.moneyType,  // 货币类型
          in_item_type: this.goodsType,  // 物品分类
          in_item_id: this.type == 1 ? (this.selectedItem ? this.selectedItem.item_id : 0) : 0,  // 热销物品id
          in_item_search: this.searchKey,  // 查询字符串
          in_select_id: this.datetype,  // 1 日 2 周 3 月
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezone_id: this.type == 1 ? this.$store.getters['Agent/selectedIdList'] : (this.selectedItem ? this.selectedItem.agent_id.toString() : ''),
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_shop_id:1, // 1 为时装消费 2 为热销消费 3 为限时消费
        }
        api.user.getQuery(params).then((data) => {
          if (data.code == 401) {
            this.chartData = data.state[0]
            this.tableData = data.state[1]
            this.drawChart()
          }
          else {
            Utils.Notification.error({ message: data.message })
            console.error(data.message);
          }
        })
      },
      drawChart() {
        let count_date = utils.getColumnByIndex(0, this.chartData)
        let buy_money = utils.getColumnByIndex(1, this.chartData)
        let buy_money_point = utils.getColumnByIndex(2, this.chartData)
        let buy_money_diamond = utils.getColumnByIndex(3, this.chartData)
        let buy_count = utils.getColumnByIndex(4, this.chartData)
        let buy_count_point = utils.getColumnByIndex(5, this.chartData)
        let buy_count_diamond = utils.getColumnByIndex(6, this.chartData)

        let categories = []
        let chartSeries1 = [{
          name: buy_money,
          data: []
        }, {
          name: buy_money_point,
          data: []
        }, {
          name: buy_money_diamond,
          data: []
        }]
        let chartSeries2 = [{
          name: buy_count,
          data: []
        }, {
          name: buy_count_point,
          data: []
        }, {
          name: buy_count_diamond,
          data: []
        }]

        this.chartData.forEach(item => {
          categories.push(item[count_date])
          chartSeries1[0].data.push(item[buy_money])
          chartSeries1[1].data.push(item[buy_money_point])
          chartSeries1[2].data.push(item[buy_money_diamond])
          chartSeries2[0].data.push(item[buy_count])
          chartSeries2[1].data.push(item[buy_count_point])
          chartSeries2[2].data.push(item[buy_count_diamond])
        })
        highchartUtil.drawChart('payMoneyChart', 'spline', categories, chartSeries1, true)
        highchartUtil.drawChart('payCountChart', 'spline', categories, chartSeries2, true)
      }
    },
    watch: {
      showType(v, ov) {
        if (v != ov) {
          this.drawChart()
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  .chart-group {
    .charts {
      height: 300px;
    }
  }

  // .table-content {
  //   overflow: auto;
  //   width: 100%;
  //   max-height: 450px;
  //   white-space: nowrap;
  // }
</style>