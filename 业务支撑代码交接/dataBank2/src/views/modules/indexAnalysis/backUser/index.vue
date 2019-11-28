<template>
  <div id="back-user">
    <div class="content-header">
      <moduleHeader :isShowReg="true" :dateList="dateList"></moduleHeader>
      <div class="switchs">
        <div class="switch-group">
          <div class="switchs-item">
            <span class="item-header">{{$t('backUser.filterConditions')}}:</span>
             <div class="item-content">
              <div class="bt-item" :class="{'check':playerType===0}"  @click="playerType=0">{{$t('backUser.allPlayer')}}</div>
              <div class="bt-item" :class="{'check':playerType===1}"  @click="playerType=1">{{$t('backUser.payPlayer')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <div class="card-box">
        <card>
          <div slot="header">{{$t('common.IndexKey')}}
          </div>
          <div slot="body">
            <div id="backUserChart" class="charts"></div>
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
            <normalTable :tableData="reverseTableData"></normalTable>
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
import utils from 'src/utils/utils'
export default {
  components: {
    moduleHeader, card,normalTable
  },
  data() {
    return {
      date1: moment().add(-7, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      playerType: 0,

      tableData: [],
      columnData:[],
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
          isShowDatetype: false,
          change: (newDate) => { this.date1 = newDate.startDate; this.date2 = newDate.endDate; this.query(); }
        }]
    },
    reverseTableData(){
        let result = this.tableData.map(item=>{
          return item
        })
        result.reverse()
        return result
      },
  },
  mounted() {
    this.query();
  },
  methods: {
    getParams(){
      return {
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date1:this.date1,
        in_date2:this.date2,
        in_user_type:this.playerType,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        isCache:1
      }
    },
    query() {
      var params=this.getParams()
      api.user.getQuery(params).then((data)=>{
        if(data.code==401){
          this.tableData=data.state[0];
          this.columnData= data.state[1]?data.state[1]:[];
          this.drawChart();
        }
        else{
          Utils.Notification.error({message:data.message})
          console.error(data.message);
        }
      })
    },
    exportData(){
      var params=this.getParams()
      api.user.exportData(params)
    },
    drawChart() {
      let count_date=utils.getColumnByIndex(0,this.tableData)//utils.getColumnKey('统计时间',this.columnData)
      let day_backflow=utils.getColumnByIndex(1,this.tableData)//utils.getColumnKey('day_backflow',this.columnData)
      let backflow_rate=utils.getColumnByIndex(2,this.tableData)//utils.getColumnKey('backflow_rate',this.columnData)

      var categories = [];
      var seriesData = [
        { name: day_backflow, data: [], type: 'column'},
        { name: backflow_rate, data: [], type: 'spline'},
      ]
      this.tableData.forEach(item=>{
        categories.push(item[count_date])
        seriesData[0].data.push(Number(item[day_backflow].replace(/,/g,'')))
        seriesData[1].data.push(Number(item[backflow_rate].split('%')[0]))
      })
      highchartUtil.drawChart('backUserChart', 'spline', categories, seriesData, true)
    }
  },
  watch:{
    playerType(v,ov){
      if(v!=ov){
        this.query();
      }
    }
  }
}
</script>
<style lang="scss">
 .item-content {
    margin-right: 15px;
    float: left;
    line-height: 30px;
    .bt-item {
      cursor: pointer;
      padding: 0 15px;
      float: left;
      background-color: #fff;
      border: 1px solid #bbb;
      border-right: 0;
      text-align: center;
      &:last-child {
        border-right: 1px solid #bbb;
      }
    }
    .bt-item.check {
      font-weight: 700;
      color: #fff;
      background-color: #fc9153;
    }
  }
</style>
