<template>
  <section id="area-analysis">
    <div class="content-header">
      <moduleHeader :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
        <card>
          <div slot="header">
            <div class="card-header-title">关键指标分析</div>
            <div class="tabs">
              <div class="tab-item" :class="{'active':type==0}" @click="type=0">新老用户</div>
              <div class="tab-item" :class="{'active':type==1}" @click="type=1">充值数据</div>
            </div>
          </div>
          <div slot="body">
          <div id="areaChart" class="charts" v-show="type==0"></div>
          <div class="recharge-chart-group" v-show="type==1">
            <chartPayCount ref="countChart" pieUid="rechargeCountPie" barUid="rechargeCountBar" :chartData="tableData" :columnData="columnData"></chartPayCount>
            <chartPayMoney ref="moneyChart" pieUid="rechargeMoneyPie" barUid="rechargeMoneyBar" :chartData="tableData" :columnData="columnData"></chartPayMoney>
          </div>
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

import chartPayCount from './components/chartPayCount.vue'
import chartPayMoney from './components/chartPayMoney.vue'

 
import utils from 'src/utils/utils.js'
export default {
  name: 'area-analysis',
  components: {
    card, moduleHeader, normalTable,chartPayCount,chartPayMoney
  },
  data() {
    return {
      date1: moment().add(-2,"day").format("YYYY-MM-DD"),
      date2: moment().format("YYYY-MM-DD"),
      nowTime: '',
      type: 0,
      tableData:[],
      columnData:[],//表格列名数据
    }
  },
  computed:{
    dateList(){
      return [
        {
          single: false,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: this.date2,
          change: (newDate) => { this.date1 = newDate.startDate; this.date2 = newDate.endDate; this.query(); }
        }]
    }
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      var params={
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date1:this.date1,
        in_date2:this.date2,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
        in_platform: '1,2',
        isCache:1,
      }
      api.user.getQuery(params).then((data)=>{
        if(data.code==401){
          this.tableData=data.state[0];
          this.columnData=data.state[1]?data.state[1]:[];
          this.drawChart();
          this.initRechargeData();
        }
        else{
          Utils.Notification.error({message:data.message})
          console.error(data.message);
        }
      })
    },
    drawChart() {
      let reg_count=utils.getColumnKey('reg_count',this.columnData)
      let login_count=utils.getColumnKey('login_count',this.columnData)
      let country=utils.getColumnKey('country',this.columnData)
      var categories = [];
      var seriesData = [
        { name: reg_count, data: []},
        { name: login_count, data: []}
      ]
      this.tableData.forEach((item)=>{
        categories.push(item[country]);
        seriesData[0].data.push(Number(-item[reg_count]))
        seriesData[1].data.push(Number(item[login_count]))
      })
      highchartUtil.drawOppositeBar("areaChart",categories, seriesData)
    },
    initRechargeData() {
      this.$refs.countChart.drawChart()
      this.$refs.moneyChart.drawChart()
    }
  },
  watch: {
    type(v, ov) {
      if (v != ov) {
        if (v == 0) {
          this.drawChart()
        }
        else if (v == 1) {
          this.initRechargeData();
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

    .key-index-group {
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: center;
      line-height: 40px;
      .key-index-item {
        -webkit-box-flex: 1;
        border-right: 1px solid #bbb;
        text-align: center;
        .item-top {}
        .item-middle {
          font-weight: bold;
          vertical-align: middle;
          .item-add-rate {
            font-size: 12px;
            font-weight: 200;
            color: red;
            vertical-align: super;
          }
        }
        .item-bottom {}
      }
      .key-index-item:last-child {
        border: 0;
      }
    }
    .recharge-chart-group{
      width:100%;
      .chart-comb{
        width:100%;
        height:auto;
      }
    }
    .table-content{
      width:100%;
      max-height:500px;
      overflow:auto;
      white-space:nowrap;
    }
</style>