<template>
  <div id="first-pay">
    <div class="content-header">
      <moduleHeader :isShowReg="true" :isShowPay="true" :dateList="dateList" @datetypeChange="datetypeChange"></moduleHeader>
    </div>
    <div class="content-body">
      <div class="card-box">
        <card>
          <div slot="header">
            <div class="card-header-title">关键指标数据</div>
            <div class="tabs">
              <div class="tab-item" :class="{'active':type==1}" @click="type=1">按等级</div>
              <div class="tab-item" :class="{'active':type==2}" @click="type=2">按充值区间</div>
            </div>
          </div>
          <div slot="body">
            <div id="firstPayChart" class="charts"></div>
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
              <normalTable :tableData="tableData"></normalTable>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import moduleHeader from 'src/views/modules/module-header'
import card from 'src/components/card.vue'
import api from 'src/services/api'
import normalTable from 'src/components/table/element-table.vue'
export default {
  components: {
    moduleHeader, card,normalTable
  },
  data() {
    return {
      datetype:1,
      date1: moment().add(-7, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      tableData: [],
      type: 1,
    }
  },
  computed: {
    dateList() {
      return [
        {
          single: false,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: this.date2,
          isShowDatetype: true,
          datetype:this.datetype,
          change: (newDate) => { this.date1 = newDate.startDate; this.date2 = newDate.endDate; this.query(); }
        }]
    },
  },
  mounted() {
    this.query();
  },
  methods: {
    datetypeChange(newVal) {
      this.datetype = newVal;
      if (newVal == 1) {
        this.date1 = moment().add(-7, "day").format('YYYY-MM-DD');
        this.date2 = moment().add(-1, "day").format('YYYY-MM-DD');
      }
      else if (newVal == 2) {
        this.date1 = moment().add(-7, "week").day(1).format('YYYY-MM-DD');
        this.date2 = moment().add(-1, "week").day(7).format('YYYY-MM-DD');
      }
      else if (newVal == 3) {
        this.date1 = moment().add(-7, "month").date(1).format('YYYY-MM-DD');
        this.date2 = moment().date(1).add(-1, 'day').format('YYYY-MM-DD');
      }
      this.query();
    },
    getParams(){
      return {
        isCache:1,
        in_date1: this.date1,
        in_date2: this.date2,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_pay_channel: this.$store.getters['PayChannel/selectedIdList'],
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        in_type:this.type,
        in_select_id:this.datetype
      }
    },
    query() {
       var params=this.getParams()
      api.user.getQuery(params).then(data=>{
        if(data.code==401){
          this.tableData=data.state[0];
          this.columnData=data.state[1]?data.state[1]:[];
          this.drawChart();
        }
        else{
          // console.log(data)
          Utils.Notification.error({message:data.message})
        }
      })
    },
    exportData(){
      var params=this.getParams()
      api.user.exportData(params)
    },
    drawChart() {
      let template_name=utils.getColumnByIndex(0,this.tableData)
      let user_count = utils.getColumnByIndex(1,this.tableData)
      let pay_money = utils.getColumnByIndex(2,this.tableData)
      let arpu = utils.getColumnByIndex(3,this.tableData)
      var categories = [];
      var seriesData = [
        { name: user_count, data: []},
        { name: pay_money, data: []},
        { name: arpu, data: []},
      ]
      this.tableData.forEach(item => {
        categories.push(item[template_name])
        seriesData[0].data.push(Number(item[user_count].replace(/,/g,'')))
        seriesData[1].data.push(Number(item[pay_money].replace(/,/g,'')))
        seriesData[2].data.push(Number(item[arpu].replace(/,/g,'')))
      })
      highchartUtil.drawChart('firstPayChart', 'spline', categories, seriesData, true)
    }
  },
  watch:{
    type(v,ov){
      if(v!=ov){
        this.query()
      }
    }
  }
}
</script>
<style lang="scss">

</style>
