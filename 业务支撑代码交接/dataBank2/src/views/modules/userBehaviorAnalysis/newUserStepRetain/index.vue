<template>
  <div id="new-user-step-retain">
    <div class="content-header">
      <moduleHeader :isShowReg="true" :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
      <div class="card-box">
        <card>
          <div slot="header">
          <div class="card-header-title">{{$t('common.IndexKey')}}</div>
            <div class="tabs">
              <div class="tab-item" :class="{'active':type==1}" @click="type=1">{{$t('newUserStepRetain.oneDayRetain')}}</div>
              <div class="tab-item" :class="{'active':type==2}" @click="type=2">{{$t('newUserStepRetain.twoDayRetain')}}</div>
              <div class="tab-item" :class="{'active':type==7}" @click="type=7">{{$t('newUserStepRetain.sevenDayRetain')}}</div>
            </div>
            </div>
          <div slot="body">
            <div id="stepUserChart" class="charts"></div>
            <!--<div v-if="tableData.length==0" class="no-data">无数据</div>-->
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
            <normalTable :tableData="tableData" :columnWidthObj="{1:300}"></normalTable>
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
import normalTable from 'src/components/table/element-table.vue'
 import api from 'src/services/api'
  // import utils from 'src/utils/utils.js'
export default {
  components: {
    moduleHeader, card,normalTable
  },
  data() {
    return {
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      // date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      tableData: [],
      columnData:[],

      type:1,
    }
  },
  computed: {
    dateList() {
      return [
        {
          single: true,
          uid: 'date1',
          label: this.$t('common.Date'),
          startDate: this.date1,
          endDate: '',
          isShowDatetype: false,
          change: (newDate) => { this.date1 = newDate.startDate; this.query(); }
        }]
    },
  },
  mounted() {
    this.query();
  },
  methods: {
    getParams(){
      return {
        isCache:1,
        in_date1: this.date1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        in_configid:this.type
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
      let node_name=utils.getColumnByIndex(1,this.tableData)//utils.getColumnKey('node_name',this.columnData);
      let remain_user=utils.getColumnByIndex(2,this.tableData)//utils.getColumnKey('remain_user',this.columnData);
      let lost_user=utils.getColumnByIndex(4,this.tableData)//utils.getColumnKey('lost_user',this.columnData);
      var categories = [];
      var seriesData = [
        { name: remain_user,type:'column',yAxis:0, data: [] },
        { name: lost_user,type:'spline',yAxis:1, data: [] }
      ]
      let count = 0
      this.tableData.forEach(item=>{
        if(count <= 9){
          categories.push(item[node_name])
          seriesData[0].data.push(Number(item[remain_user].replace(/,/g,'')))
          seriesData[1].data.push(Number(item[lost_user].replace(/,/g,'')))
        }
        count++
      })
      highchartUtil.drawChart('stepUserChart', 'spline', categories, seriesData, true)
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
