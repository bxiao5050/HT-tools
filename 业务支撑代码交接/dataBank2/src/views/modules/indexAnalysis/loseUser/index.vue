<template>
  <div id="lose-user">
    <div class="content-header">
      <moduleHeader :isShowReg="true" :dateList="dateList"></moduleHeader>
      <div class="switchs">
        <div class="switch-group">
          <div class="switchs-item">
            <span class="item-header">{{$t('loseUser.filterConditions')}}:</span>
             <div class="item-content" v-if="type==0">
              <div class="bt-item" :class="{'check':playerType===1}"  @click="playerType=1">{{$t('loseUser.allPlayer')}}</div>
              <div class="bt-item" :class="{'check':playerType===2}"  @click="playerType=2">{{$t('loseUser.payPlayer')}}</div>
            </div>
            <div class="item-content" v-if="type==1">
              <div class="bt-item" :class="{'check':playerType===3}"  @click="playerType=3">{{$t('loseUser.loseLevel')}}</div>
              <div class="bt-item" :class="{'check':playerType===4}"  @click="playerType=4">{{$t('loseUser.payMoney')}}</div>
              <div class="bt-item" :class="{'check':playerType===5}"  @click="playerType=5">{{$t('loseUser.payCount')}}</div>
              <div class="bt-item" :class="{'check':playerType===6}"  @click="playerType=6">{{$t('loseUser.userLifeCycle')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <div class="card-box">
        <card>
          <div slot="header">
            <div class="card-header-title">{{$t('common.IndexKey')}}</div>
            <div class="tabs">
              <div class="tab-item" :class="{'active':type==0}" @click="type=0">{{$t('loseUser.loseRate')}}</div>
              <div class="tab-item" :class="{'active':type==1}" @click="type=1">{{$t('loseUser.loseDetailAnalysis')}}</div>
            </div>
          </div>
          <div slot="body">
            <div id="loseUserChart" class="charts"></div>
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

      playerType: 1,
      type: 0,

      tableData: [],
      columnData: [],
    }
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
        in_type_id:this.playerType,
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
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
      let lost_user=utils.getColumnByIndex(1,this.tableData)//utils.getColumnKey('lost_user',this.columnData)
      let lost_rate=utils.getColumnByIndex(2,this.tableData)//utils.getColumnKey('lost_rate',this.columnData)

      let lost_user_level=utils.getColumnByIndex(0,this.tableData)//utils.getColumnKey('lost_user_level',this.columnData)
      let zhanbi=utils.getColumnByIndex(2,this.tableData)//utils.getColumnKey('zhanbi',this.columnData)

      let lost_user_paymoney=utils.getColumnByIndex(0,this.tableData)//utils.getColumnKey('lost_user_paymoney',this.columnData)

      let lost_user_paycount=utils.getColumnByIndex(0,this.tableData)//utils.getColumnKey('lost_user_paycount',this.columnData)

      let lost_user_life=utils.getColumnByIndex(0,this.tableData)//utils.getColumnKey('lost_user_life',this.columnData)

      var categories = [];
      var seriesData = [];
      if(this.playerType==1||this.playerType==2){
      seriesData = [
        { name: lost_user, data: [], type: 'column'},
        { name: lost_rate, data: [], type: 'spline'},
      ]
      this.tableData.forEach(item=>{
        categories.push(item[count_date])
        seriesData[0].data.push(Number(item[lost_user].replace(/,/g,'')))
        seriesData[1].data.push(Number(item[lost_rate]))
      })
      }
      else{
        seriesData = [
        { name: lost_user, data: [], type: 'column'},
        { name: zhanbi, data: [], type: 'spline'},
      ]
      this.tableData.forEach(item=>{
        let str;
        if(this.playerType==3){
            str=lost_user_level
        } else if(this.playerType==4){
            str=lost_user_paymoney
        } else if(this.playerType==5){
            str=lost_user_paycount
        } else if(this.playerType==6){
            str=lost_user_life
        }
        categories.push(item[str])
        seriesData[0].data.push(Number(item[lost_user].replace(/,/g,'')))
        seriesData[1].data.push(Number(item[lost_rate].split('%')[0]))
      })
      }
      highchartUtil.drawChart('loseUserChart', 'spline', categories, seriesData, true)
    }
  },
  watch:{
    type(v,ov){
      if(v!=ov){
        if(v==0){
          this.playerType=1;
        }
        else{
          this.playerType=3;
        }
      }
    },
    playerType(v,ov){
      if(v!=ov){
        this.query()
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
