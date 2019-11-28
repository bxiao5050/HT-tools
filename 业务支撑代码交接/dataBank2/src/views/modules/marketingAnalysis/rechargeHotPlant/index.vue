<template>
  <section id="recharge-hot-plant">
    <div class="content-header">
      <moduleHeader :isShowReg="true" :isShowPay="true" :dateList="dateList" :disabledOption="disabledOption">
        <!-- <dayselect slot="after-datepicker" v-model="time_type" :confirm="confirm" :disabledOption="disabledOption"></dayselect> -->
        <div class="dayselect" slot="after-datepicker">
    <elSelect v-model="time_type" placeholder="请选择" @change="changeSelected">
      <elOption v-for="(item,index) in dayOption" :key="index" :label="item.key" :value="item.value" :disabled="disabledOption(item,index)">
      </elOption>
    </elSelect>
    <!-- <div class="btn-primary" @click="confirm(selected)" noselect>查询</div> -->
  </div>
      </moduleHeader>
    </div>

    <div class="content-body">
        <card>
          <div slot="header">趋势图</div>
          <div slot="body">
            <div class="chart-body">
              <div class="charts">
                <div id="hotPie"></div>
                <div class="chartDesc">充值金额占比</div>
              </div>
              <div class="charts">
                <div id="hotChart"></div>
                <div class="chartDesc">充值金额、次数、人数分布</div>
              </div>
            </div>
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
              <!-- <normalTable :tableData="tableData"></normalTable> -->
                <el-table ref="singleTable" :data="filterData" @row-click="rowClick" :highlight-current-row="true" max-height="500" style="width:100%;" fit border>
                  <el-table-column v-for="(column,cindex) in columnArr" :key="column" :prop="column" :label="column">
                    <template slot-scope="scope">
                      <a class="detail-column" href="javascript:void(0)" @click="showDetail(scope.row)" v-if="cindex==(columnArr.length-1)">详</a>
                      <span v-else>{{scope.row[column]}}</span>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
          </div>
          <div slot="footer" style="line-height:30px; text-align:center; padding-bottom:20px;">
            <el-pagination
              layout="prev, pager, next"
              :total="tableData.length" :current-page.sync="current" :page-size="size" @current-change="pageChange">
            </el-pagination>
          </div>
        </card>
    </div>
     <Modal headerName="充值明细" width="1000" v-if="isShowDetail" @close="isShowDetail=false">
       <normalTable :tableData="detailData" slot="modal-body" :columnWidthObj="{0:200,1:150,2:150,5:200}"></normalTable>
     </Modal>
  </section>
</template>

<script>
  import moduleHeader from 'src/views/modules/module-header'
  import card from 'src/components/card.vue'
  import normalTable from 'src/components/table/element-table.vue'
  import Highcharts from 'highcharts'
  import utils from 'src/utils/utils.js'
  import Modal from 'src/components/modal.vue'
  import api from 'src/services/api'
  export default {
    name: 'recharge-hot-plant',
    components: {
      moduleHeader,
      card,
      normalTable,
      Modal,
      // dayselect
    },
    data() {
      return {
        time_type: 1,
        date1: moment().format('YYYY-MM-DD'),
        categories: [
          '[1-5]',
          '[5-100]',
          '[100-300]',
          '[300-500]',
          '[500-1000]',
          '[1000->]'
        ], // efunfun暂时写死范围
        isShowDetail:false,

        current:1, // 当前页数,支持sync
        size:10, // 每页显示数
      }
    },
    mounted() {
      this.query();
    },
    computed: {
      dateList() {
        return [{
          single: true,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: '',
          isShowDatetype: false,
          change: (newDate) => {
            this.date1 = newDate.startDate;
            this.checkDate()
          }
        }]
      },
      dayOption(){
          let arr = [], i = 9;
          for (let n = 0; n <= 16; n++) {
            switch (n) {
              case 1:
                arr.push({
                  value: n,
                  key: "00:00-09:00"
                })
                break;
              case 0:
                arr.push({
                  value: n,
                  key: "00:00-24:00"
                })
                break;
              default:
              let key = i + ':00-' + ++i + ':00'
              arr.push({
                  value: n,
                  key: key
                })
                break;
            }
          }
          return arr
        },
      columnArr() {
        let result = [];
        if (this.tableData && this.tableData.length > 0) {
          for (let index in this.tableData[0]) {
            result.push(index);
          }
        }
        return result;
      },
      chartData(){
        return this.$store.getters['ChargeHotList/chartData']||[]
      },
      tableData() {
        return this.$store.getters['ChargeHotList/tableData']||[]
      },
      detailData() {
        return this.$store.getters['ChargeHotList/detailData']||[]
      },
      filterData(){
        return this.tableData.filter((item, index)=>{
          return index >= (this.current-1)*this.size && index < this.current*this.size
        })
      }
    },
    methods: {
      // 切换时间
      changeSelected(selected){
        // this.time_type = selected
        this.query()
      },
      checkDate(){
        let nowDate = moment() // 当前时间
        let inDate = this.date1 // 选中日期
        if(moment(nowDate).format('YYYY-MM-DD') === moment(inDate).format('YYYY-MM-DD')){
          // 今天
          this.time_type = 1
        } else if(moment(nowDate) < moment(moment(inDate).format('YYYY-MM-DD'))){
          // 选中日期大于今天
          return
        } else if(moment(nowDate) > moment(moment(inDate).format('YYYY-MM-DD'))){
          // 选中日期小于今天
          this.time_type = 0
        }
        this.query();
      },
      // 禁用选项
      disabledOption(item){
        let nowDate = moment() // 当前时间
        let inDate = this.date1 // 选中日期

        let range = item.key.split('-')
        let start = range[0]
        let end = range[1]
        if(moment(nowDate).format('YYYY-MM-DD') === moment(inDate).format('YYYY-MM-DD')){
          // 今天
          if(moment(inDate+" "+end) < moment(nowDate)) return false
          return true
        } else if(moment(nowDate) < moment(moment(inDate).format('YYYY-MM-DD'))){
          // 选中日期大于今天
          return true
        } else if(moment(nowDate) > moment(moment(inDate).format('YYYY-MM-DD'))){
          // 选中日期小于今天
          return false
        }
        return false
      },
      // 页面变化时
      pageChange(current){
        this.current = current
      },
      rowClick(row){
          this.$refs.singleTable.setCurrentRow(row)
        },
      getParams(){
        let systemId = this.$store.state.common.systems.systemId
        if(systemId==1){
          return {
            isCache: 1,
            dataview: this.$store.state.common.nowmenu.dataView,
            in_date:this.date1,
            in_gamezone_id:this.$store.getters['Agent/selectedIdList'], // 主界面默认传选择的屈服id，详细界面传用户区服id
            in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
            in_pay_channel: this.$store.getters['PayChannel/selectedIdList'],
            in_os:this.$store.getters['OS/nowOS'],
            in_type_id:this.time_type, // 时间id
            in_role_id:0, // 查询明细时 用户id
            in_select_id:1 // 1为主界面  2为明细
          }
        } else if(systemId==3){
          return {
            isCache: 1,
            dataview: this.$store.state.common.nowmenu.dataView,
            in_date1: this.date1,
            time_type: this.time_type,
            in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
            in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
            in_platform: '1,2'
          }
        }
      },
      query() {
        let params = this.getParams()
        // this.drawChart();
        this.current = 1
        this.$store.dispatch('ChargeHotList/data',params )
      },
      exportData(){
        var params = this.getParams()
        api.user.exportData(params)
      },
      draw(){
        let systemId = this.$store.state.common.systems.systemId
        if(systemId == 1){
          let columns = {
           pay_range:utils.getColumnByIndex(0, this.chartData),
           pay_count: utils.getColumnByIndex(1, this.chartData),
           pay_times: utils.getColumnByIndex(2, this.chartData),
           pay_money: utils.getColumnByIndex(3, this.chartData)
          }
          let categories = []
          this.chartData.forEach((e, i) => {
            categories.push(e[columns.pay_range])
          })
          this.drawChart(categories,columns)
        } else if(systemId == 3){
          let categories = this.categories
          let columns = {
            pay_count: utils.getColumnByIndex(3, this.chartData),
            pay_times: utils.getColumnByIndex(2, this.chartData),
            pay_money: utils.getColumnByIndex(1, this.chartData)
          }
          this.drawChart(categories,columns)
        }
      },
      drawChart(categories,columns) {
        // requestAnimationFrame(() => {
          let array1 = [],
            array2 = [],
            array3 = [],
            array4 = []

          if (this.chartData) {
            this.chartData.forEach((e, i) => {
              array1.push([ // 充值金额占比
                categories[i],
                e[columns.pay_money] * 1
              ])
              array2.push( // 充值人数
                // this.categories[i],
                e[columns.pay_count] * 1
              )
              array3.push( // 充值次数
                // this.categories[i],
                e[columns.pay_times] * 1
              )
              array4.push( // 充值金额
                // this.categories[i],
                e[columns.pay_money] * 1
              )
            })
            highchartUtil.drawPieChart('hotPie', [{
              name: '充值金额占比',
              data: array1
            }])

            highchartUtil.draw({
              chart: {
                renderTo: 'hotChart',
                // zoomType: 'xy'
              },
              xAxis: [{
                categories: categories,
              }],
              yAxis: [{ // Primary yAxis
                labels: {
                  format: '{value}',
                  style: {
                    color: Highcharts.getOptions().colors[0]
                  }
                },
                title: {
                  text: columns.pay_count,
                  style: {
                    color: Highcharts.getOptions().colors[0]
                  }
                },
              }, { // Secondary yAxis
                gridLineWidth: 0,
                labels: {
                  format: '{value}',
                  style: {
                    color: Highcharts.getOptions().colors[1]
                  }
                },
                title: {
                  text: columns.pay_times,
                  style: {
                    color: Highcharts.getOptions().colors[1]
                  }
                },
              }, {
                labels: {
                  format: '{value}',
                  style: {
                    color: Highcharts.getOptions().colors[2]
                  }
                },
                title: {
                  text: columns.pay_money,
                  style: {
                    color: Highcharts.getOptions().colors[2]
                  }
                },
                opposite: true
              }],
              series: [{
                name: columns.pay_count,
                type: 'spline',
                yAxis: 0,
                data: array2
              }, {
                name: columns.pay_times,
                type: 'spline',
                yAxis: 1,
                data: array3,
                lineWidth: 3,
              }, {
                name: columns.pay_money,
                type: 'column',
                data: array4,
                lineWidth: 3,
                yAxis: 2,
              }]
            })
          }
        // })
      },
      showDetail(item){
        let pay_detail = utils.getColumnByIndex(this.columnArr.length-1,this.tableData)
        let gamezone = item[pay_detail].split('_')[1]
        let roleId = item[pay_detail].split('_')[0].split('#')[1]
        let params = {
            isCache: 1,
            dataview: this.$store.state.common.nowmenu.dataView,
            in_date:this.date1,
            in_gamezone_id:gamezone, // 主界面默认传选择的屈服id，详细界面传用户区服id
            in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
            in_pay_channel: this.$store.getters['PayChannel/selectedIdList'],
            in_os:this.$store.getters['OS/nowOS'],
            in_type_id:this.time_type, // 时间id
            in_role_id:roleId, // 查询明细时 用户id
            in_select_id:2 // 1为主界面  2为明细
          }
        this.$store.dispatch('ChargeHotList/detailData',params).then(()=>{
          this.isShowDetail = true
        })
      }
    },
    watch:{
      tableData:{
        deep:true,
        handler(v,ov){
          if(v!=ov){
            this.draw()
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .table-content{
    .detail-column{
      color:#333;
      border:1px solid #bbb;
      border-radius:3px;
      background-color:#eee;
      padding:3px 5px;
      text-decoration: none;
      &:hover{
        background-color:#ddd;
      }
      &:active{
        background-color:#ccc;
      }
    }
  }
  </style>
<style lang="scss" scoped>
  .item-content {
    float: left;
    line-height: 30px;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    .bt-item {
      // width:55px;
      // float:left;
      padding: 0 10px;
      -webkit-box-flex: 1;
      background-color: #FFF;
      border: 1px solid #bbb;
      text-align: center;
      white-space: nowrap;
    }
    .bt-item.check {
      background-color: orange;
    }
  }
  
  .table-content {
    overflow: auto;
    width: 100%;
    max-height: 500px;
    white-space: nowrap;
  }
  
  .chartDesc {
    text-align: center;
  }
  
  .chart-body {
    position: relative;
    .charts {
      float: left;
      width: 65%;
      margin-bottom: 16px;
      &:nth-child(1) {
        width: 35%;
      }
    }
  }



    .dayselect {
    display: flex;
    margin-left: 15px;
    .el-select {
      width: 138px !important;
    }
    .btn-primary {
      cursor: pointer;
      line-height: 32px;
      margin-left: 15px;
      width: 54px;
      border-radius: 3px;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
    }
  }

  li.el-select-dropdown__item {
    text-align: center !important;
  }
</style>
<style lang="scss">
  .dayselect {
    .el-input {
      input {
        height: 32px;
        border-radius: 0;
      }
    }
  }
</style>