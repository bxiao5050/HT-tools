<template>
  <div>
    <div class="filters">
      <div class="filter-item">
        <!-- <el-radio-group v-model="datetype">
      <el-radio-button :label="1">日</el-radio-button>
      <el-radio-button :label="2">周</el-radio-button>
      <el-radio-button :label="3">月</el-radio-button>
    </el-radio-group> -->
        <radio-btn-group v-model="datetype" :startIndex="0" :list="['日','周','月']"></radio-btn-group>
      </div>
      <div class="filter-item">
        <div class="filter-label">日期：</div>
        <!--日-->
        <el-date-picker v-show="datetype===0" v-model="date" :clearable="false" :picker-options="pickerOptions" placeholder="选择日期范围">
        </el-date-picker>
        <!--周-->
        <el-date-picker v-show="datetype===1" v-model="date" :clearable="false" type="week" :picker-options="pickerOptions" format="yyyy 第 WW 周" placeholder="选择日期范围">
        </el-date-picker>
        <!--月-->
        <el-date-picker v-show="datetype===2" v-model="date" :clearable="false" type="month" placeholder="选择日期范围">
        </el-date-picker>
      </div>
      <div class="filter-item">
        <div class="filter-label">游戏：</div>
        <el-select class="filter-content" v-model="gameSelect" value-key="game_id">
          <!-- <el-option :value="0" label="全球"></el-option> -->
          <el-option v-for="item in gameList" :key="item.game_id" :value="item" :label="item.game_name"></el-option>
        </el-select>
      </div>
    </div>
    <div class="overview-content">

      <div class="overview-row">
        <!-- <el-card class="middle-card">
        <div slot="header">
          收入占比
        </div>
        <div id="over-chart-pie"  class="charts"></div>
      </el-card> -->
        <el-card class="most-card">
          <div slot="header">
            {{gameSelect?gameSelect.game_name:''}}总览
          </div>
          <div class="overview-row">
            <div class="middle-card">
              <div id="over-chart-pie" class="charts"></div>
            </div>
            <div class="most-card">
              <div id="over-chart-common" class="charts"></div>
            </div>
          </div>
        </el-card>
      </div>

      <detailTable :tableData="tableData"></detailTable>
    </div>
    <!-- <div class="chart-group"></div>
    <div class="table-group"></div> -->
  </div>
</template>
<script>
import api from 'src/services/api'
import radioBtnGroup from 'src/components/radio-btn-group'
import detailTable from './component/detailTable'
export default {
  name: 'data-overview',
  components: {
    radioBtnGroup,
    detailTable
  },
  data() {
    return {
      datetype: 0,
      date: moment()
        .add(-1, 'day')
        .format('YYYY-MM-DD'),

      gameSelect: null,
      gameList: [],

      chartData: [],
      tableData: []
    }
  },
  computed: {
    pickerOptions() {
      return {
        firstDayOfWeek: 1
      }
    }
  },
  mounted() {
    this.getGameList()
  },
  methods: {
    query() {
      this.getChartData()
      this.getTableData()
    },
    getGameList() {
      let params = {
        isCache: 1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date1: moment(this.date).format('YYYY-MM-DD'),
        in_date2: moment(this.date).format('YYYY-MM-DD'),
        in_game_id: '-1',
        in_type_id: 4, // 游戏列表
        in_selected_id: this.datetype
      }
      api.user.getQuery(params).then(data => {
        if (data.code == 401) {
          let gameList = data.state[0]
          let list = []
          let game_name = utils.getColumnByIndex(1, gameList)
          gameList.forEach(item => {
            list.push(
              JSON.stringify({
                game_id: item.game_id,
                game_name: item[game_name]
              })
            )
          })
          list = Array.from(new Set(list))
          list = list.map(item => {
            return JSON.parse(item)
          })
          this.gameList = list
          this.gameSelect = list.length > 0 ? list[0] : null

          // this.query()
        } else {
          this.$notify.error({ message: data.message })
          console.error(data.message)
        }
      })
    },
    getChartData() {
      if (this.gameSelect) {
        let dateObj = this.getDate()
        let params = {
          isCache: 1,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: dateObj.date1,
          in_date2: dateObj.date2,
          in_game_id: this.gameSelect.game_id,
          in_type_id: 1, // 图表数据
          in_selected_id: this.datetype
        }
        api.user.getQuery(params).then(data => {
          if (data.code == 401) {
            this.chartData = data.state[0]
            this.drawLine()
          } else {
            this.$notify.error({ message: data.message })
            console.error(data.message)
          }
        })
      }
    },
    getTableData() {
      if (this.gameSelect) {
        let dateObj = this.getDate()
        let params = {
          isCache: 1,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: dateObj.date1,
          in_date2: dateObj.date2,
          in_game_id: this.gameSelect.game_id,
          in_type_id: 2, // 表格
          in_selected_id: this.datetype
        }
        api.user.getQuery(params).then(data => {
          if (data.code == 401) {
            this.tableData = data.state[0].sort((a, b) => {
              return Number(b['充值']) - Number(a['充值'])
            })
            this.drawPie()
          } else {
            this.$notify.error({ message: data.message })
            console.error(data.message)
          }
        })
      }
    },
    getDate() {
      let dateObj = {
        date1: '',
        date2: ''
      }

      if (this.datetype == 0) {
        dateObj.date1 = moment(this.date).format('YYYY-MM-DD')
        dateObj.date2 = moment(this.date).format('YYYY-MM-DD')
      } else if (this.datetype == 1) {
        dateObj.date1 = moment(this.date)
          .day(1)
          .format('YYYY-MM-DD')
        dateObj.date2 = moment(this.date)
          .day(7)
          .format('YYYY-MM-DD')
      } else if (this.datetype == 2) {
        dateObj.date1 = moment(this.date)
          .date(1)
          .format('YYYY-MM-DD')
        dateObj.date2 = moment(this.date)
          .add(1, 'month')
          .date(1)
          .add(-1, 'day')
          .format('YYYY-MM-DD')
      }
      console.log('类型:', this.datetype)
      console.log('date1:', dateObj.date1)
      console.log('date2:', dateObj.date2)
      return dateObj
    },
    // drawChart() {
    //   this.drawPie()
    //   this.drawLine()
    // },
    drawPie() {
      console.log('drawPie')
      let game_name = utils.getColumnByIndex(0, this.tableData)
      let pay = utils.getColumnByIndex(2, this.tableData)
      let seriesData = [
        {
          name: '充值占比',
          data: []
        }
      ]
      this.tableData.forEach(item => {
        seriesData[0].data.push([item[game_name], Number(item[pay])])
      })
      highchartUtil.drawPieChart('over-chart-pie', seriesData)
    },
    drawLine() {
      console.log('drawLine')
      let count_date = utils.getColumnByIndex(0, this.chartData)
      let create_role = utils.getColumnByIndex(1, this.chartData)
      let pay = utils.getColumnByIndex(2, this.chartData)
      let active = utils.getColumnByIndex(3, this.chartData)

      let categories = []
      let seriesData = [
        {
          name: '创角',
          data: []
        },
        {
          name: '充值',
          data: []
        },
        {
          name: '活跃',
          data: []
        }
      ]
      this.chartData.forEach(item => {
        categories.push(item[count_date])
        seriesData[0].data.push(Number(item[create_role]))
        seriesData[1].data.push(Number(item[pay]))
        seriesData[2].data.push(Number(item[active]))
      })
      highchartUtil.drawChart(
        'over-chart-common',
        'spline',
        categories,
        seriesData
      )
    }
  },
  watch: {
    datetype(v, ov) {
      if (v != ov) {
        // this.drawChart()
        // this.query()
        if (v == 0) {
          this.date = moment().add(-1, 'day')
        } else if (v == 1) {
          this.date = moment().add(-1, 'day').add(-1, 'week')
        } else if (v == 2) {
          this.date = moment().add(-1, 'day').add(-1, 'month')
        }
      }
    },
    date(v, ov) {
      if (v != ov) {
        // this.drawChart()
        this.query()
      }
    },
    gameSelect(v, ov) {
      if (v != ov) {
        // this.drawChart()
        this.query()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./scss/overview.scss";
.filters {
  width: 100%;
  line-height: 30px;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  .filter-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    .filter-label {
      max-width: 120px;
    }
    .filter-content {
      // width: 240px;
    }
  }
}

// .charts{
//   height:300px;
// }
</style>