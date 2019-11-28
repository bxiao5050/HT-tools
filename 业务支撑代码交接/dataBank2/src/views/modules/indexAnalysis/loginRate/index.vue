<template>
  <div id="login-rate">
    <div class="content-header">
      <moduleHeader :isShowReg="true" :isShowPay="true" :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
      <div class="card-box">
        <card>
          <div slot="header">{{$t('common.IndexKey')}}</div>
          <div slot="body">
            <div id="loginRateChart" class="charts"></div>
          </div>
        </card>
      </div>

      <div class="card-box">
        <card>
          <div slot="header">
            <div class="card-header-title">{{$t('common.DataDetails')}}</div>
            <div class="export-link">
              <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
            </div>
          </div>
          <div slot="body">
            <div class="table-content">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th v-for="column in columnArr" :key="column">{{column}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in tableData" :key="index" v-if="tableData">
                    <td v-for="column in columnArr" :key="column">
                      <div v-if="progressArr.length>0&&progressArr.includes(column)" class="progress progress-xs progress-striped active" :title="item[column]+'%'">
                        <div class="progress-bar progress-bar-success lr-progress" :style="{width: Number(item[column])+'%'}"><span>{{item[column]+'%'}}</span></div>
                      </div>
                      <span v-else>{{item[column]}}</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot v-if="!tableData||tableData.length==0">
                  <tr>
                    <td>无数据</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
  import moduleHeader from 'src/views/modules/module-header.vue'
  import card from 'src/components/card.vue'
  import api from 'src/services/api'
  import normalTable from 'src/components/normal-table.vue'
  export default {
    components: {
      moduleHeader,
      card,
      normalTable
    },
    data() {
      return {
        date1: moment().add(-7, "day").format("YYYY-MM-DD"),
        date2: moment().add(-1, "day").format("YYYY-MM-DD"),

        tableData: [],
        columnData: []
      }
    },
    computed: {
      dateList() {
        return [{
          single: false,
          uid: 'date1',
          label: this.$t('common.Date'),
          startDate: this.date1,
          endDate: this.date2,
          isShowDatetype: false,
          change: (newDate) => {
            this.date1 = newDate.startDate;
            this.date2 = newDate.endDate;
            this.query();
          }
        }]
      },
      progressArr() {
        let remain_valid_rate = utils.getColumnByIndex(6, this.tableData)//utils.getColumnKey('remain_valid_rate', this.columnData)
        let remain_valid_rate_second = utils.getColumnByIndex(7, this.tableData)//utils.getColumnKey('remain_valid_rate_second', this.columnData)
        return [remain_valid_rate, remain_valid_rate_second]
      },
      columnArr() {
        let result = [];
        if (this.tableData && this.tableData.length > 0) {
          for (let index in this.tableData[0]) {
            result.push(index);
          }
        }
        return result;
      }
    },
    mounted() {
      this.query();
    },
    methods: {
      getParams() {
        return {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS']
        }
      },
      query() {
        var params = this.getParams()
        api.user.getQuery(params).then(data => {
          if (data.code == 401) {
            this.tableData = data.state[0];
            this.columnData = data.state[1] ? data.state[1] : [];
            this.drawChart();
          } else {
            // console.log(data)
            Utils.Notification.error({
              message: data.message
            })
          }
        })
      },
      exportData() {
        var params = this.getParams()
        api.user.exportData(params)
      },
      drawChart() {
        let count_date = utils.getColumnByIndex(0, this.tableData)//utils.getColumnKey('统计时间', this.columnData)
        let remain_valid_rate = utils.getColumnByIndex(6, this.tableData)//utils.getColumnKey('remain_valid_rate', this.columnData)
        let remain_valid_rate_second = utils.getColumnByIndex(7, this.tableData)//utils.getColumnKey('remain_valid_rate_second', this.columnData)
        var categories = [];
        var seriesData = [
          { name: remain_valid_rate, data: [], type: 'spline' },
          { name: remain_valid_rate_second, data: [], type: 'spline' }
        ]
        let chartData = this.tableData.map(item => {
          return item
        })
        chartData.reverse()
        chartData.forEach((item) => {
          categories.push(item[count_date])
          seriesData[0].data.push(Number(item[remain_valid_rate]))
          seriesData[1].data.push(Number(item[remain_valid_rate_second]))
        })
        highchartUtil.drawChart('loginRateChart', 'spline', categories, seriesData, true)
      }
    }
  }

</script>
<style lang="scss" scoped>
.progress{
  background-color:#dadcdd;
  cursor:pointer;
  .lr-progress{
    background-color:#9D88DB;
    text-align: left;
    // padding: 0 5px;
    color:#333;
    span{
      margin-left:5px;
    }
  }
}
</style>