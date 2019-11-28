<template>
  <div id="five-force">
    <div class="content-header">
      <moduleHeader :isShowReg="true" :dateList="dateList" @datetypeChange="datetypeChange"></moduleHeader>
    </div>
    <div class="content-body">
      <!-- <keep-alive> -->
        <component :is="currentView" :date1="date1" :tableData="tableData"></component>
      <!-- </keep-alive> -->
      <card>
        <div slot="header">
           <div class="card-header-title">{{$t('common.DataDetails')}}</div>
          <div class="export-link">
            <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
          </div>
        </div>
        <div slot="body">
          <div class="table-content">
            <normal-table :tableData="tableData" hideColumn="id" :trendCol="trend" :columnWidthObj="{0:300}"></normal-table>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import moduleHeader from 'src/views/modules/module-header'
import card from 'src/components/card.vue'
import normalTable from 'src/components/table/element-table.vue'
import Chart_normal from './components/Chart_normal'
import Chart_e8 from './components/Chart_e8'
import Chart_oversea from './components/chart_oversea'
import api from 'src/services/api'

export default {
  name: 'five-force',
  components: {
    moduleHeader,
    card,
    'normal-table': normalTable,
    Chart_normal,
    Chart_e8,
    Chart_oversea
  },
  data() {
    return {
      datetype: 1,
      date1: moment()
        .add(-1, 'day')
        .format('YYYY-MM-DD'),
      // date2: moment().format("YYYY-MM-DD"),
      // defaultDate: moment().add(-1, 'day').format('YYYY-MM-DD'),
      dates: [],

      tableData:[]
    }
  },
  mounted() {
    this.getDays()
    this.query()
  },
  computed: {
    trend() {
      let systemId = this.$store.state.common.systems.systemId
      if(systemId==2){
        return Utils.getColumnByIndex(9, this.tableData)
      }
      return Utils.getColumnByIndex(10, this.tableData)
    },
    // tableData() {
    //   return this.$store.getters['FiveForceModel/tableData']
    // },
    dateList() {
      return [
        {
          single: true,
          uid: 'date1',
          label: this.$t('common.Date'),
          startDate: this.date1, //this.defaultDate,
          endDate: '',
          isShowDatetype: true,
          datetype: this.datetype, //this.$store.state.FiveForceModel.dateType,
          change: newDate => {
            // this.$store.commit('FiveForceModel/curDate', newDate.startDate)
            // this.$store.dispatch('FiveForceModel/data')
            this.date1 = newDate.startDate
            this.query()
          }
        }
      ]
    },
    currentView() {
      let systemId = this.$store.state.common.systems.systemId
      switch(systemId){
        case 1:{
          return 'Chart_normal'
          // break
        }
        case 2:{
          return 'Chart_oversea'
          // break
        }
        case 3:{
          return 'Chart_e8'
          // break
        }
      }
      // return  === 3
      //   ? 'Chart_e8'
      //   : 'Chart_normal'
    }
  },
  methods: {
    datetypeChange(newVal) {
      // this.$store.commit('FiveForceModel/dateType', newVal)
      this.datetype = newVal
      if (newVal === 1) {
        // this.$store.commit('FiveForceModel/curDate', moment().add(-1, 'day').format('YYYY-MM-DD'))
        this.date1 = moment()
          .add(-1, 'day')
          .format('YYYY-MM-DD')
      } else if (newVal === 2) {
        // this.$store.commit('FiveForceModel/curDate', moment().add(-1, 'week').format('YYYY-MM-DD'))
        this.date1 = moment()
          .add(-1, 'week')
          .day(1)
          .format('YYYY-MM-DD')
      } else if (newVal === 3) {
        // this.$store.commit('FiveForceModel/curDate', moment().add(-1, 'month').format('YYYY-MM-DD'))
        this.date1 = moment()
          .add(-1, 'month')
          .date(1)
          .format('YYYY-MM-DD')
      }
      this.getDays()
      // this.$store.dispatch('FiveForceModel/data')
      this.query()
    },
    getDays() {
      var result = []
      var i = 7
      while (i >= 0) {
        if (this.datetype === 1) {
          result.push(
            moment(this.date1)
              .add(0 - i, 'days')
              .format('YYYY-MM-DD')
          )
        } else if (this.datetype === 2) {
          result.push(
            moment(this.date1)
              .add(0 - i, 'weeks')
              .weekday(1)
              .format('YYYY-MM-DD')
          )
        } else if (this.datetype === 3) {
          result.push(
            moment(this.date1)
              .add(0 - i, 'months')
              .format('YYYY-MM-DD')
          )
        }
        i = i - 1
      }
      this.dates = result
    },
    getParams() {
      let config = {
        '1': {
          // 自研系统
          isCache: 1,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date: this.date1,
          in_type_id: this.datetype,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_pay_channel: this.$store.getters['PayChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          is_all: this.$store.getters['RegChannel/isAllSelect']
        },
        '2': {
          // 海外发行系统
          isCache: 1,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date: this.date1,
          in_type: this.datetype,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_channel_id: this.$store.getters['RegChannel/selected2IdList'],
          in_package_id: this.$store.getters['RegChannel/selected3IdList'],
          isCache: 1
        },
        '3': {
          // efunfun
          isCache: 1,
          dataview: this.$store.state.common.nowmenu.dataView,
          data_type: this.datetype,
          count_date: this.date1,
          gameZoneId: this.$store.getters['Agent/selectedIdList'],
          channelId: this.$store.getters['RegChannel/selectedIdList'],
          platformId: '1,2'
        }
      }
      return config[this.$store.state.common.systems.systemId]
    },
    query() {
      this.tableData = []
      let params = this.getParams()
      // this.$store.dispatch('FiveForceModel/data', params)
      api.user.getQuery(params).then(data => {
        if (data.code === 401) {
          // commit('data', data.state)
          this.tableData = data.state[0]
        } else {
          Utils.Notification.error({ message: data.message })
        }
      })
    },
    exportData() {
      let params = this.getParams()
      // this.$store.dispatch('FiveForceModel/exportData', params)
      api.user.exportData(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-body {
  padding: 0;
}
.table-content {
  width: 100%;
}
</style>