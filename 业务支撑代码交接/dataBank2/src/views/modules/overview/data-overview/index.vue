<template>
  <div>
    <div class="filters">
      <div class="filter-item">
        <!-- <el-radio-group v-model="datetype">
      <el-radio-button :label="1">日</el-radio-button>
      <el-radio-button :label="2">周</el-radio-button>
      <el-radio-button :label="3">月</el-radio-button>
    </el-radio-group> -->
        <!-- <div class="item-content">
      <div class="bt-item" :class="{'check':datetype==1}" @click="datetype=1">日</div>
      <div class="bt-item" :class="{'check':datetype==2}" @click="datetype=2">周</div>
      <div class="bt-item" :class="{'check':datetype==3}" @click="datetype=3">月</div>
    </div> -->
        <radio-btn-group v-model="datetype" :startIndex="1" :list="['日','周','月']"></radio-btn-group>
      </div>
      <div class="filter-item">
        <div class="filter-label">日期：</div>
        <!--日-->
        <el-date-picker v-show="datetype===1" v-model="date" :clearable="false" :picker-options="pickerOptions" placeholder="选择日期范围">
        </el-date-picker>
        <!--周-->
        <el-date-picker v-show="datetype===2" v-model="date" :clearable="false" type="week" :picker-options="pickerOptions" format="yyyy 第 WW 周" placeholder="选择日期范围">
        </el-date-picker>
        <!--月-->
        <el-date-picker v-show="datetype===3" v-model="date" :clearable="false" type="month" placeholder="选择日期范围">
        </el-date-picker>
      </div>
      <div class="filter-item">
        <div class="filter-label">国家：</div>
        <!-- <el-select class="filter-content" v-model="countryValue">
           <el-option :value="0" label="全球"></el-option>
           <el-option v-for="item in countryList" :key="item.country_id" :value="item.country_id" :label="item.country_name"></el-option>
        </el-select> -->
        <select class="filter-content my-select" v-model="countryValue">
          <option :value="0">全球</option>
          <option v-for="item in countryList" :key="item.country_id" :value="item.country_id">{{item.country_name}}</option>
        </select>
      </div>
    </div>
    <div class="overview-content">
      <onlineData ref="onlineData" :datetype="datetype" :onlineData="onlineData"></onlineData>
      <overviewChart ref="overviewChart" :datetype="datetype" :chartData="chartData"></overviewChart>
      <countryTable :countryValue="countryValue" :tableData="tableData"></countryTable>
    </div>
    <!-- <div class="chart-group"></div>
    <div class="table-group"></div> -->
  </div>
</template>
<script>
import api from 'src/services/api'
import radioBtnGroup from 'src/components/radio-btn-group'
import onlineData from './component/onlineData'
import overviewChart from './component/overviewChart'
import countryTable from './component/countryTable'
export default {
  name: 'data-overview',
  components: {
    radioBtnGroup,
    onlineData,
    overviewChart,
    countryTable
  },
  data() {
    return {
      datetype: 1,
      date: moment()
        .add(-1, 'day')
        .format('YYYY-MM-DD'),
      countryValue: 0,
      areaList: [],
      countryList: [],

      onlineData: [],
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
    this.getCountryList()
    this.query()
  },
  methods: {
    query() {
      this.getOnlineData()
      this.getChartData()
      this.getTableData()
    },
    // 获取国家列表
    getCountryList() {
      let params = {
        isCache: 1,
        dataview: this.$store.state.common.nowmenu.dataView[0],
        in_date1: moment(this.date).format('YYYY-MM-DD'),
        in_date2: moment(this.date).format('YYYY-MM-DD'),
        in_game_id: this.countryValue,
        in_type: 4, // 国家列表
        in_selected: this.countryValue == 0 ? 1 : 2
      }
      api.user.getQuery(params).then(data => {
        if (data.code == 401) {
          this.areaList = data.state[0]
          let list = []
          this.areaList.forEach(item => {
            list.push(
              JSON.stringify({
                country_id: item.country_id,
                country_name: item.country_name
              })
            )
          })
          list = Array.from(new Set(list))
          list = list.map(item => {
            return JSON.parse(item)
          })
          this.countryList = list
        } else {
          Utils.Notification.error({ message: data.message })
          console.error(data.message)
        }
      })
    },
    // 获取top数据
    getOnlineData() {
      console.log('getOnlineData')
      let params = {
        isCache: 1,
        dataview: this.$store.state.common.nowmenu.dataView[0],
        in_date1: moment(this.date).format('YYYY-MM-DD'),
        in_date2: moment(this.date).format('YYYY-MM-DD'),
        in_game_id: this.countryValue,
        in_type: this.datetype == 1 ? 1 : this.datetype == 2 ? 5 : 6, // 前N天数据 in_type 1 top日数据 5 top周数据 6 top月数据
        in_selected: this.countryValue == 0 ? 1 : 2
      }
      api.user.getQuery(params).then(data => {
        if (data.code == 401) {
          this.onlineData = data.state[0]
        } else {
          Utils.Notification.error({ message: data.message })
          console.error(data.message)
        }
      })
    },
    getDate() {
      let dateObj = {
        date1: '',
        date2: ''
      }

      if (this.datetype == 1) {
        dateObj.date1 = moment(this.date).format('YYYY-MM-DD')
        dateObj.date2 = moment(this.date).format('YYYY-MM-DD')
      } else if (this.datetype == 2) {
        dateObj.date1 = moment(this.date)
          .day(1)
          .format('YYYY-MM-DD')
        dateObj.date2 = moment(this.date)
          .day(7)
          .format('YYYY-MM-DD')
      } else if (this.datetype == 3) {
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
    // 获取图表数据
    getChartData() {
      let dateObj = this.getDate()
      console.log('getChartData')
      let params = {
        isCache: 1,
        dataview: this.$store.state.common.nowmenu.dataView[0],
        in_date1: dateObj.date1,
        in_date2: dateObj.date2,
        in_game_id: this.countryValue,
        in_type: 2, // 图表数据
        in_selected: this.countryValue == 0 ? 1 : 2
      }
      api.user.getQuery(params).then(data => {
        if (data.code == 401) {
          this.chartData = data.state[0]
        } else {
          Utils.Notification.error({ message: data.message })
          console.error(data.message)
        }
      })
    },
    // 获取表格数据
    getTableData() {
      let dateObj = this.getDate()
      console.log('getTableData')
      let params = {
        isCache: 1,
        dataview: this.$store.state.common.nowmenu.dataView[0],
        in_date1: dateObj.date1,
        in_date2: dateObj.date2,
        in_game_id: this.countryValue,
        in_type: 3, // 表格数据
        in_selected: this.countryValue == 0 ? 1 : 2
      }
      api.user.getQuery(params).then(data => {
        if (data.code == 401) {
          this.tableData = data.state[0]
        } else {
          Utils.Notification.error({ message: data.message })
          console.error(data.message)
        }
      })
    }
  },
  watch: {
    datetype(v, ov) {
      if (v != ov && ov) {
        // this.drawChart()
        // this.query()
        this.date = moment().add(-1, 'day')
      }
    },
    date(v, ov) {
      if (v != ov && ov) {
        // this.drawChart()
        this.query()
      }
    },
    countryValue(v, ov) {
      if (v != ov) {
        // this.drawChart()
        this.query()
      }
    },
    overviewType(v, ov) {
      if (v != ov) {
        this.drawCommonChart()
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
  }
}

.my-select {
  width: 193px;
  height: 36px;
  border: 1px solid #bfcbd9;
  color: #1f2d3d;
  border-radius: 5px;
  padding: 0 5px;
}

// .item-content {
//   margin-right: 15px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: flex-start;
//   flex-wrap: wrap;
//   line-height: 30px;
//   .bt-item {
//     cursor: pointer;
//     padding: 0 15px;
//     float: left;
//     background-color: #fff;
//     border: 1px solid #ddd;
//     text-align: center;
//     &:last-child {
//       border-right: 1px solid #ddd;
//     }
//   }
//   .bt-item.check {
//     font-weight: 700;
//     color: #fff;
//     background-color: #fc9153;
//     border: 1px solid #fc9153;
//   }
// }
// .charts{
//   height:300px;
// }
</style>