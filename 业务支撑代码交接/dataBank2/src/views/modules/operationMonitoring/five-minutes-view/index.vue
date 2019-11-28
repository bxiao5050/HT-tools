<template>
  <section id="five-minutes-view">
    <div class="content-header">
      <moduleHeader :isShowReg="config[systemId].isShowRegChannel" :isShowPay="config[systemId].isShowPayChannel" :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
      <card>
        <div slot="header">
          <div class="card-header-title">{{type?type.name:''}}({{$t('fiveMin.delay10min')}})</div>
          <div class="tabs">
            <div class="tab-item" v-for="(item,index) in config[systemId].list" :key="index" :class="{'active':type&&item.id==type.id}" @click="type=item">{{item.name}}</div>
          </div>
        </div>
        <div slot="body">
          <div id="fiveMinChart" class="charts"></div>
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
import normalTable from 'src/components/table/element-table.vue'
import api from 'src/services/api'
export default {
  name: 'five-minutes-view',
  components: {
    moduleHeader,
    normalTable,
    card
  },
  data() {
    return {
      date1: moment().format('YYYY-MM-DD'),
      date2: moment()
        .add(-1, 'day')
        .format('YYYY-MM-DD'),
      date3: moment()
        .add(-7, 'day')
        .format('YYYY-MM-DD'),

      type: null,
      tableData: [],

      config: {
        1: {
          isShowRegChannel: true,
          isShowPayChannel: true,
          list: [
            {
              id: 1,
              name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Online')
            }, //'五分钟在线',
            {
              id: 2,
              name:
                this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Charge') + '(USD)'
            }, //'五分钟充值'
            {
              id: 3,
              name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Register')
            }, //'五分钟注册'
            {
              id: 4,
              name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Active')
            }, //'五分钟活跃'
            {
              id: 5,
              name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.CreateRole')
            }, //'五分钟活跃'
            {
              id: 6,
              name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.PayCount')
            }
          ] //'五分钟付费人数'
        },
        2: {
          isShowRegChannel: true,
          isShowPayChannel: false,
          list: [
            {
              id: 3,
              name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Register')
            }, //'五分钟注册'
            {
              id: 2,
              name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Charge')
            }, //'五分钟充值'
            {
              id: 1,
              name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Online')
            } //'五分钟在线',
          ]
        },
        3: {
          isShowRegChannel: true,
          isShowPayChannel: true
        }
      }
    }
  },
  computed: {
    dateList() {
      return [
        {
          single: true,
          uid: 'date1',
          label: this.$t('common.BaseTime'), //'基准时间',
          startDate: this.date1,
          endDate: '',
          change: newDate => {
            this.date1 = newDate.startDate
            this.query()
          }
        },
        {
          single: true,
          uid: 'date2',
          label: this.$t('common.CompareTime'), //'对比时间',
          startDate: this.date2,
          endDate: '',
          change: newDate => {
            this.date2 = newDate.startDate
            this.query()
          }
        },
        {
          single: true,
          uid: 'date3',
          label: this.$t('common.CompareTime'), //'对比时间',
          startDate: this.date3,
          endDate: '',
          change: newDate => {
            this.date3 = newDate.startDate
            this.query()
          }
        }
      ]
    },
    // types() {
    //   let types = [
    //     {
    //       id: 1,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Online') //'五分钟在线'
    //     },
    //     {
    //       id: 2,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Charge') + '(USD)' //'五分钟充值'
    //     },
    //     {
    //       id: 3,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Register') //'五分钟注册'
    //     },
    //     {
    //       id: 4,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Active') //'五分钟活跃'
    //     },
    //     {
    //       id: 5,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.CreateRole') //'五分钟活跃'
    //     },
    //     {
    //       id: 6,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.PayCount') //'五分钟付费人数'
    //     }
    //   ]
    //   this.type = types[0]
    //   return types
    // },
    isCompact() {
      return this.$store.state.layout.isCompact
    },
    systemId() {
      return this.$store.state.common.systems.systemId
    }
  },
  mounted() {
    this.type = this.config[this.systemId].list[0]
    window.fiveMinInterval = setInterval(() => {
      this.query()
    }, 300000)
    this.query()
  },
  beforeDestroy() {
    clearInterval(window.fiveMinInterval)
  },
  methods: {
    getParams() {
      if (this.systemId == 1) {
        return {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          in_date3: this.date3,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_pay_channel: this.$store.getters['PayChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_type_id: this.type.id
        }
      } else if (this.systemId == 2) {
        return {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          in_date3: this.date3,
          dataview: this.$store.state.common.nowmenu.dataView[0],
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_channel_id: this.$store.getters['RegChannel/selected2IdList'],
          in_package_id: this.$store.getters['RegChannel/selected3IdList'],
          in_type: this.type.id
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
      let count_date = utils.getColumnByIndex(0, this.tableData)
      var dateList = [this.date3, this.date2, this.date1]
      var categories = []
      var seriesData = []
      this.tableData.map(item => {
        categories.push(item[count_date])
      })
      dateList.forEach(date => {
        seriesData.push({
          name: date,
          data: (() => {
            let array = []
            this.tableData.map(item => {
              array.push(item[date] ? Number(item[date].replace(/,/g, '')) : '')
            })
            return array
          })(),
          max: (() => {
            let max = '0'
            this.tableData.map(item => {
              // if(this.type.id==4){
              //   max += Number(item[date].replace(/,/g,'')*1)
              // }
              // else{
              if (
                Number(max.replace(/,/g, '')) <
                Number(item[date].replace(/,/g, ''))
              ) {
                max = item[date]
              }
              // }
            })
            return max
          })()
        })
      })
      window._1 = categories
      window._2 = seriesData
      highchartUtil.drawFiveMinLine('fiveMinChart', categories, seriesData)
    }
  },
  watch: {
    isCompact(v, ov) {
      if (v != ov) {
        this.query()
      }
    },
    type: {
      deep: true,
      handler(v, ov) {
        if (v != ov && ov) {
          this.query()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-content {
  overflow: auto;
  width: 100%;
}
</style>