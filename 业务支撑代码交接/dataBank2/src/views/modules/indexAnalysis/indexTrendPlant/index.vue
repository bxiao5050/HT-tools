<template>
  <section id="index-trend">
    <div class="content-header">
      <moduleHeader :datetype="datetype" :isShowReg="true" :dateList="dateList" @datetypeChange="datetypeChange"></moduleHeader>
    </div>
    <div class="content-body">
  
        <card>
          <div slot="header">{{$t('common.TrendChart')}}</div>
          <div slot="body">
            <div id="indexTrendChart" class="charts"></div>
          </div>
        </card>
        <card>
          <div slot="header">
            <div class="card-header-title">{{$t('common.DataDetails')}}</div>
              <div class="export-link">
                <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
              </div>
            </div>
          <div slot="body">
            <div class="table-content">
            <normalTable :tableData="reverseTableData"></normalTable>
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
import normalTable from 'src/components/table/element-table.vue'
export default {
  name: 'index-trend',
  components: {
    moduleHeader,
    card,
    normalTable
  },
  data() {
    return {
      datetype: 1,
      date1: moment()
        .add(-7, 'day')
        .format('YYYY-MM-DD'),
      date2: moment()
        .add(-1, 'day')
        .format('YYYY-MM-DD'),
      tableData: []
    }
  },
  mounted() {
    this.query()
  },
  computed: {
    dateList() {
      return [
        {
          single: false,
          uid: 'date1',
          label: this.$t('common.Date'),
          startDate: this.date1,
          endDate: this.date2,
          isShowDatetype: true,
          change: newDate => {
            this.date1 = newDate.startDate
            this.date2 = newDate.endDate
            this.query()
          }
        }
      ]
    },
    systemId() {
      return this.$store.state.common.systems.systemId
    },
    reverseTableData() {
      if (this.systemId == 2) {
        return this.tableData
      } else {
        let result = this.tableData.map(item => {
          return item
        })
        result.reverse()
        return result
      }
    }
  },
  methods: {
    datetypeChange(newVal) {
      this.datetype = newVal
      if (newVal == 1) {
        this.date1 = moment()
          .add(-7, 'day')
          .format('YYYY-MM-DD')
        this.date2 = moment()
          .add(-1, 'day')
          .format('YYYY-MM-DD')
      } else if (newVal == 2) {
        this.date1 = moment()
          .add(-7, 'week')
          .day(1)
          .format('YYYY-MM-DD')
        this.date2 = moment()
          .add(-1, 'day')
          .format('YYYY-MM-DD')
      } else if (newVal == 3) {
        this.date1 = moment()
          .add(-6, 'month')
          .date(1)
          .format('YYYY-MM-DD')
        this.date2 = moment()
          .add(-1, 'day')
          .format('YYYY-MM-DD')
      }
      this.query()
    },
    getParams() {
      if (this.systemId == 1) {
        return {
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: this.date1,
          in_date2: this.date2,
          in_type_id: this.datetype,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_pay_channel: this.$store.getters['PayChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          is_all: this.$store.getters['RegChannel/isAllSelect'],
          isCache: 1
        }
      } else if (this.systemId == 2) {
        return {
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: this.date1,
          in_date2: this.date2,
          in_config_id: this.datetype,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_channel_id: this.$store.getters['RegChannel/selected2IdList'],
          in_package_id: this.$store.getters['RegChannel/selected3IdList'],
          isCache: 1
        }
      } else if (this.systemId == 3) {
        return {
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: this.date1,
          in_date2: this.date2,
          in_config_id: '',
          date_type: this.datetype,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
          in_platform: '1,2',
          isCache: 1
        }
      }
    },
    query() {
      this.tableData = []
      var params = this.getParams()
      api.user.getQuery(params).then(data => {
        if (data.code == 401) {
          this.tableData = data.state[0]
          this.drawChart()
        } else {
          Utils.Notification.error({ message: data.message })
          console.error(data.message)
        }
      })
    },
    exportData() {
      var params = this.getParams()
      api.user.exportData(params)
    },
    drawChart() {
      if (this.systemId == 1) {
        this.drawChart_normal()
      } else if (this.systemId == 2) {
        this.drawChart_oversea()
      } else if (this.systemId == 3) {
        this.drawChart_e8()
      }
    },
    drawChart_normal() {
      // let str = this.datetype==1?'day_':(this.datetype==2?'week_':'month_');
      let count_date = utils.getColumnByIndex(0, this.tableData) //utils.getColumnKey('统计时间',this.columnData);
      let reg_count = utils.getColumnByIndex(1, this.tableData) //utils.getColumnKey(str+'reg_count',this.columnData);
      let active_online = utils.getColumnByIndex(2, this.tableData) //utils.getColumnKey(str+'active_online',this.columnData);
      let max_online = utils.getColumnByIndex(3, this.tableData) //utils.getColumnKey(str+'max_online',this.columnData);
      let pay_count = utils.getColumnByIndex(4, this.tableData) //utils.getColumnKey(str+'pay_count',this.columnData);
      let pay = utils.getColumnByIndex(5, this.tableData) //utils.getColumnKey(str+'pay',this.columnData);
      let arpu = utils.getColumnByIndex(6, this.tableData) //utils.getColumnKey(str+'arpu',this.columnData);

      var categories = []
      var seriesData = []
      let filterName = [
        reg_count,
        active_online,
        max_online,
        pay_count,
        pay,
        arpu
      ]
      let index = 0
      filterName.forEach(item => {
        // if(index==filterName[this.datetype-1].length-1){//当付费金额时使用另一条Y轴,临时方案
        if (item == pay) {
          seriesData.push({ name: item, data: [], yAxis: 1 })
        } else {
          seriesData.push({ name: item, data: [], yAxis: 0 })
        }
        index++
      })
      this.tableData.forEach(item => {
        categories.push(item[count_date])
        seriesData[0].data.push(Number(item[reg_count].replace(/,/g, '')))
        seriesData[1].data.push(Number(item[active_online].replace(/,/g, '')))
        seriesData[2].data.push(Number(item[max_online].replace(/,/g, '')))
        seriesData[3].data.push(Number(item[pay_count].replace(/,/g, '')))
        seriesData[4].data.push(Number(item[pay].replace(/,/g, '')))
        seriesData[5].data.push(Number(item[arpu].replace(/,/g, '')))
      })
      highchartUtil.drawChart(
        'indexTrendChart',
        'spline',
        categories,
        seriesData
      )
    },
    drawChart_oversea() {
      let count_date = utils.getColumnByIndex(0, this.tableData) //utils.getColumnKey('count_date',this.columnData);
      let reg_count = utils.getColumnByIndex(1, this.tableData) //utils.getColumnKey('reg_count',this.columnData);
      let login_count = utils.getColumnByIndex(2, this.tableData) //utils.getColumnKey('login_count',this.columnData);
      let active_count = utils.getColumnByIndex(3, this.tableData)
      // let logincounts_avg=utils.getColumnByIndex(3,this.tableData)//utils.getColumnKey('logincounts_avg',this.columnData);
      // let paycount_avg=utils.getColumnByIndex(4,this.tableData)//utils.getColumnKey('paycount_avg',this.columnData);
      let pay_count = utils.getColumnByIndex(4, this.tableData) //utils.getColumnKey('pay_count',this.columnData);
      // let pay_point=utils.getColumnByIndex(6,this.tableData)//utils.getColumnKey('pay_point',this.columnData);
      let pay_money = utils.getColumnByIndex(5, this.tableData) //utils.getColumnKey('pay_money',this.columnData);
      let web_pay_count = utils.getColumnByIndex(6, this.tableData)
      let web_pay_money = utils.getColumnByIndex(7, this.tableData)

      var categories = []
      var seriesData = []
      // var filterName=[
      //   ['日注册用户数','日活跃用户数','人均登录次数','登付比','日付费用户数','日付费ARPU','日付费金额'],
      //   ['周注册用户数','周活跃用户数','人均登录次数','登付比','周付费用户数','周付费ARPU','周付费金额'],
      //   ['月注册用户数','月活跃用户数','人均登录次数','登付比','月付费用户数','月付费ARPU','月付费金额']
      // ]
      let filterName = [
        reg_count,
        login_count,
        active_count,
        pay_count,
        pay_money,
        web_pay_count,
        web_pay_money
      ]
      // if(this.datetype){
      let index = 0
      filterName.forEach(item => {
        // if(index==filterName[this.datetype-1].length-1){//当付费金额时使用另一条Y轴,临时方案
        if (item == pay_money) {
          seriesData.push({ name: item, data: [], yAxis: 1 })
        } else {
          seriesData.push({ name: item, data: [], yAxis: 0 })
        }
        index++
      })
      // }
      // let chartData = this.tableData.sort((a, b) => {
      //   return moment(a[count_date]) - moment(b[count_date])
      // })
      let chartData = Object.assign([],this.tableData)
      chartData.reverse()
      chartData.forEach(item => {
        categories.push(item[count_date])
        seriesData[0].data.push(Number(item[reg_count]))
        seriesData[1].data.push(Number(item[login_count]))
        seriesData[2].data.push(Number(item[active_count]))
        seriesData[3].data.push(Number(item[pay_count]))
        seriesData[4].data.push(Number(item[pay_money]))
        seriesData[5].data.push(Number(item[web_pay_count]))
        seriesData[6].data.push(Number(item[web_pay_money]))
      })
      highchartUtil.drawChart(
        'indexTrendChart',
        'spline',
        categories,
        seriesData
      )
    },
    drawChart_e8() {
      let count_date = utils.getColumnByIndex(0, this.tableData) //utils.getColumnKey('count_date',this.columnData);
      let reg_count = utils.getColumnByIndex(1, this.tableData) //utils.getColumnKey('reg_count',this.columnData);
      let login_count = utils.getColumnByIndex(2, this.tableData) //utils.getColumnKey('login_count',this.columnData);
      let logincounts_avg = utils.getColumnByIndex(3, this.tableData) //utils.getColumnKey('logincounts_avg',this.columnData);
      let paycount_avg = utils.getColumnByIndex(4, this.tableData) //utils.getColumnKey('paycount_avg',this.columnData);
      let pay_count = utils.getColumnByIndex(5, this.tableData) //utils.getColumnKey('pay_count',this.columnData);
      let pay_point = utils.getColumnByIndex(6, this.tableData) //utils.getColumnKey('pay_point',this.columnData);
      let pay_money = utils.getColumnByIndex(7, this.tableData) //utils.getColumnKey('pay_money',this.columnData);

      var categories = []
      var seriesData = []
      // var filterName=[
      //   ['日注册用户数','日活跃用户数','人均登录次数','登付比','日付费用户数','日付费ARPU','日付费金额'],
      //   ['周注册用户数','周活跃用户数','人均登录次数','登付比','周付费用户数','周付费ARPU','周付费金额'],
      //   ['月注册用户数','月活跃用户数','人均登录次数','登付比','月付费用户数','月付费ARPU','月付费金额']
      // ]
      let filterName = [
        reg_count,
        login_count,
        logincounts_avg,
        paycount_avg,
        pay_count,
        pay_point,
        pay_money
      ]
      // if(this.datetype){
      let index = 0
      filterName.forEach(item => {
        // if(index==filterName[this.datetype-1].length-1){//当付费金额时使用另一条Y轴,临时方案
        if (item == pay_money) {
          seriesData.push({ name: item, data: [], yAxis: 1 })
        } else {
          seriesData.push({ name: item, data: [], yAxis: 0 })
        }
        index++
      })
      // }
      this.tableData.forEach(item => {
        categories.push(item[count_date])
        seriesData[0].data.push(Number(item[reg_count]))
        seriesData[1].data.push(Number(item[login_count]))
        seriesData[2].data.push(Number(item[logincounts_avg]))
        seriesData[3].data.push(Number(item[paycount_avg]))
        seriesData[4].data.push(Number(item[pay_count]))
        seriesData[5].data.push(Number(item[pay_point]))
        seriesData[6].data.push(Number(item[pay_money]))
      })
      highchartUtil.drawChart(
        'indexTrendChart',
        'spline',
        categories,
        seriesData
      )
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
</style>