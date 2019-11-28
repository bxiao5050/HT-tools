<template>
  <div>
    <card>
      <div slot="header">{{now?(now.name+'-'):''}}关键指标</div>
      <div slot="body" class="row">
        <div class="col-md-6 chart-group">
          <div id="marryPie"></div>
          <div class="chart-desc">玩家结婚率</div>
        </div>
        <div class="col-md-6 chart-group">
          <div id="divorcePie"></div>
          <div class="chart-desc">玩家离婚率</div>
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
          <normalTable :tableData="tableData"></normalTable>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import card from 'src/components/card.vue'
import normalTable from 'src/components/table/element-table.vue'
export default{
  name:'marry-system',
  components:{
    card,normalTable
  },
  props:["now"],
  data(){
    return{
      tableData: [],
      columnData: []
    }
  },
  mounted(){
    this.$emit('query',{in_select_id:1})
    // this.initPage()
  },
  methods:{
    dataProvider(pdata){
      this.tableData = pdata[0]||[]
      this.drawPieChart()
    },
    exportData(){
      this.$emit('exportData',{in_select_id:1})
    },
    drawPieChart(){
      let template_name = utils.getColumnByIndex(0,this.tableData)
      let marry_rate = utils.getColumnByIndex(6,this.tableData)
      let divorce_rate = utils.getColumnByIndex(7,this.tableData)
      let marrySeries=[
        {name:'玩家结婚率',data:[]},
      ]
      let divorceSeries=[
        {name:'玩家离婚率',data:[]},
      ]
      this.tableData.forEach(item => {
        marrySeries[0].data.push([item[template_name],Number(item[marry_rate].split('%')[0])])
        divorceSeries[0].data.push([item[template_name],Number(item[divorce_rate].split('%')[0])])
      })
      highchartUtil.drawPieChart('marryPie',marrySeries)
      highchartUtil.drawPieChart('divorcePie',divorceSeries)
    }
  },
  // watch:{
  //   dataProvider:{
  //     deep:true,
  //     handler(v,ov){
  //       if(v!=ov){
  //         this.initPage()
  //       }
  //     }
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.chart-group{
  padding: 0 20px 20px 20px;
  text-align:center;
  // height:400px;
  .chart-desc{
    line-height:30px;
    width:200px;
    display: inline-block;
    background-color:rgba(242, 242, 242, 1);
  }
}
</style>