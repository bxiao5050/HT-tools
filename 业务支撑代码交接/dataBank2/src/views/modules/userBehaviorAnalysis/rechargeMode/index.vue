<template>
  <section id="recharge-mode">
    <div class="content-header">
      <moduleHeader :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
        <card>
          <div slot="header">趋势图</div>
          <div slot="body" class="row">
            <div id="rechargeChart1" class="charts col-md-6 col-sm-6 col-xs-6"></div>
            <div id="rechargeChart2" class="charts col-md-6 col-sm-6 col-xs-6"></div>
          </div>
        </card>
        <card>
          <div slot="header">详细数据</div>
          <div slot="body">
            <div class="table-content">
            <normalTable :tableData="tableData"></normalTable>
            </div>
          </div>
        </card>
    </div>
  </section>
</template>

<script>
  import moduleHeader from 'src/views/modules/module-header'
  import card from 'src/components/card.vue'
  import api from 'src/services/api'
  import normalTable from 'src/components/normal-table.vue'
   
  import utils from 'src/utils/utils.js'
  export default {
    name: 'recharge-mode',
    components: {
      moduleHeader,
      card,
      normalTable
    },
    data() {
      return {
        date1: moment().add(-1, "day").format("YYYY-MM-DD"),
        date2: moment().format("YYYY-MM-DD"),
        tableData: [],
        columnData: [],
      }
    },
    mounted() {
      this.query();
    },
    computed: {
      dateList() {
        return [{
          single: false,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: this.date2,
          isShowDatetype: false,
          change: (newDate) => {
            this.date1 = newDate.startDate;
            this.date2 = newDate.endDate;
            this.query();
          }
        }]
      }
    },
    methods: {
      query() {
        var params = {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
          in_platform: '1,2'
        }
        api.user.getQuery(params).then((data) => {
          if (data.code == 401) {
            this.tableData = data.state[0];
            this.columnData = data.state[1];
            this.drawMoneyRate();
            this.drawMoneyCount();
          } else {
            Utils.Notification.error({
              message: data.message
            })
            console.error(data.message)
          }
        })
      },
      drawMoneyRate() {
        let payway = utils.getColumnKey('payway', this.columnData)
        let pay_moneypercent = utils.getColumnKey('pay_moneypercent', this.columnData)

        var categories = [];
        var seriesData = [{
          name: pay_moneypercent,
          data: []
        }]
        this.tableData.forEach((item) => {
          categories.push(item[payway])
          seriesData[0].data.push(Number(item[pay_moneypercent].split('%')[0]))
        })
        highchartUtil.drawBarChart('rechargeChart1', categories, seriesData, null, true)
      },
      drawMoneyCount() {
        let payway = utils.getColumnKey('payway', this.columnData)
        let pay_user = utils.getColumnKey('pay_user', this.columnData)
        let paymoney = utils.getColumnKey('paymoney', this.columnData)

        var categories = [];
        var seriesData = [{
          name: pay_user,
          type: 'bar',
          data: []
        }, {
          name: paymoney,
          type: 'bar',
          data: []
        }, ]
        this.tableData.forEach((item) => {
          categories.push(item[payway])
          seriesData[0].data.push(Number(item[pay_user]))
          seriesData[1].data.push(Number(item[paymoney]))
        })
        highchartUtil.drawBarChart('rechargeChart2', categories, seriesData, null)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .table-content {
    overflow: auto;
    width: 100%;
    max-height: 500px;
  }
  
  .charts {
    min-height: 300px;
    height: 300px;
  }
</style>