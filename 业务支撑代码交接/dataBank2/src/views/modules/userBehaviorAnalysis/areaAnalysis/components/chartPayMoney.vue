<template>
  <div class="chart-group">
    <h6>各地区充值金额分布</h6>
    <div class="row">
      <div :id="pieUid" class="charts col-md-6 col-sm-6 col-xs-6"></div>
      <div :id="barUid" class="charts col-md-6 col-sm-6 col-xs-6"></div>
    </div>
  </div>
</template>
<script>
import utils from 'src/utils/utils.js'
export default{
  props:['pieUid','barUid','chartData','columnData'],
  methods:{
    drawChart(){
      let country=utils.getColumnKey('country',this.columnData)
      let pay_money=utils.getColumnKey('pay_money',this.columnData)
      let bigpaymoney=utils.getColumnKey('bigpaymoney',this.columnData)
      let minbigpaymoney=utils.getColumnKey('minbigpaymoney',this.columnData)
      let midpaymoney=utils.getColumnKey('midpaymoney',this.columnData)
      let litmidpaymoney=utils.getColumnKey('litmidpaymoney',this.columnData)
      let litpaymoney=utils.getColumnKey('litpaymoney',this.columnData)
       var pSeriesData=[{
        name:pay_money,
        type:'pie',
        data:[],
        barTitle:'111',
        barCate:[],
        barData:[]
        }];
        this.chartData.forEach((item)=>{
          pSeriesData[0].barCate.push(item[country])
          pSeriesData[0].data.push([item[country],Number(item[pay_money])]) //饼图数据

        pSeriesData[0].barCate=[bigpaymoney,minbigpaymoney,midpaymoney,litmidpaymoney,litpaymoney]
        let barArr=pSeriesData[0].barData;
        barArr.push({
          barTitle:item[country],
          data:[{
            name:pay_money,
            type:'bar',
            data:[
              Number(item[bigpaymoney]),
              Number(item[minbigpaymoney]),
              Number(item[midpaymoney]),
              Number(item[litmidpaymoney]),
              Number(item[litpaymoney])]
          }]
        })
        })
      var pieEvent=(e)=>{
        let select_name=e.point.name;
        let barTitle="";//e.point.series.options.barData.barTitle;//+"各充值区间充值人数";
        let barCate=e.point.series.options.barCate;
        let barData=e.point.series.options.barData;
        let barSeriesData=[];
        barData.forEach((item)=>{
          if(item.barTitle==select_name){
            barTitle=item.barTitle+"-各充值区间充值金额";
            barSeriesData=item.data;
          }
        })
        highchartUtil.drawBarChart(this.barUid,barCate,barSeriesData,barTitle)
      }
      highchartUtil.drawPieChart(this.pieUid,pSeriesData,pieEvent)
    }
  },
  watch:{
    chartData:{
      deep:true,
      handler(v,ov){
        if(v!=ov){
          this.drawChart()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-group{
  padding:10px;
  .charts {
  min-height: 300px;
  height: 300px;
  }
}
</style>