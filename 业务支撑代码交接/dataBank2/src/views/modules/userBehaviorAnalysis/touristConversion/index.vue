<template>
  <div>
     <div class="content-header">
    <moduleHeader :dateList="dateList" @datetypeChange="datetypeChange"></moduleHeader>
       <div class="switchs-item">
        <span class="item-header">渠道:</span>
        <div class="item-content">
          <div class="bt-item" :class="{'check': plate_id===0 }" @click="plate_id=0">全部</div>
          <div class="bt-item" v-for="item in plateList" :class="{'check': item.plat_id===plate_id}" @click="plate_id=item.plat_id">{{item.plat_desc}}</div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <card>
      <div slot="header">关键指标数据</div>
      <div slot="body">
        <div id="touristChart" class="charts"></div>
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
          <normalTable :tableData="reverseTableData"></normalTable>
        </div>
      </div>
    </card>
    </div>
  </div>
</template>
<script>
import moduleHeader from 'src/views/modules/module-header.vue'
import card from 'src/components/card.vue'
import normalTable from 'src/components/table/element-table.vue'
import api from 'src/services/api'
import utils from 'src/utils/utils.js'
export default{
  name:'tourists-conversion',
  components:{
    card,moduleHeader,normalTable
  },
  data(){
    return {
      date1:moment().add(-1,'day').format('YYYY-MM-DD'),
      datetype:1,
      plate_id:0,

      plateList:[],

      tableData:[],
      columnData:[]
    }
  },
  computed:{
    dateList(){
      return [{
          single: true,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: '',
          isShowDatetype: true,
          datetype: this.datetype,
          change: (newDate) => {
            this.date1 = newDate.startDate;
            this.query();
          }
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
  mounted(){
    this.query()
  },
  methods:{
    datetypeChange(newVal) {
        this.datetype = newVal
        if (newVal === 1) {
          this.date1 = moment().add(-1, 'day').format('YYYY-MM-DD')
        } else if (newVal === 2) {
           this.date1 = moment().add(-1, 'week').format('YYYY-MM-DD')
        } else if (newVal === 3) {
           this.date1 = moment().add(-1, 'month').format('YYYY-MM-DD')
        }
        this.query();
      },
      getParams(){
        return {
        isCache:1,
        in_date1: this.date1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
        in_plate_id:this.plate_id,
        in_select_id:this.datetype
      }
      },
    query(){
       var params=this.getParams()
      api.user.getQuery(params).then(data=>{
        if(data.code==401){
          this.plateList=data.state[0];
          this.tableData=data.state[1];
          this.columnData=data.state[2]?data.state[2]:[];
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
    drawChart(){
      let count_date = utils.getColumnByIndex(0,this.tableData)
      let guest_reg_count =  utils.getColumnByIndex(1,this.tableData)
      let guest_bind_count =  utils.getColumnByIndex(2,this.tableData)
      let guest_pay_count =  utils.getColumnByIndex(3,this.tableData)
      let categories = []
      let seriesData= [
        {
          name:guest_reg_count,
          data:[]
        },
        {
          name:guest_bind_count,
          data:[]
        },
        {
          name:guest_pay_count,
          data:[]
        }]
        this.tableData.forEach( item => {
          categories.push(item[count_date])
          seriesData[0].data.push(Number(item[guest_reg_count].replace(/,/g,'')))
          seriesData[1].data.push(Number(item[guest_bind_count].replace(/,/g,'')))
          seriesData[2].data.push(Number(item[guest_pay_count].replace(/,/g,'')))
        })
        
      highchartUtil.drawChart('touristChart','spline',categories,seriesData)
    }
  },
  watch:{
    plate_id(v,ov){
      if(v!=ov){
        this.query()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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