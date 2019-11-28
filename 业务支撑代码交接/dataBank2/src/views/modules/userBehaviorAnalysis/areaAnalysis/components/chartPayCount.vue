<template>
  <div class="chart-group">
    <h6>各地区充值人数分布</h6>
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
      let pay_count=utils.getColumnKey('pay_count',this.columnData)
      let bigpaycount=utils.getColumnKey('bigpaycount',this.columnData)
      let midbigpaycount=utils.getColumnKey('midbigpaycount',this.columnData)
      let minpaycount=utils.getColumnKey('minpaycount',this.columnData)
      let litmidpaycount=utils.getColumnKey('litmidpaycount',this.columnData)
      let litpaycount=utils.getColumnKey('litpaycount',this.columnData)

       var pSeriesData=[{
        name:pay_count,
        type:'pie',
        data:[],
        barTitle:'111',
        barCate:[],
        barData:[]
        }];
        this.chartData.forEach((item)=>{
          pSeriesData[0].barCate.push(item[country])
          pSeriesData[0].data.push([item[country],Number(item[pay_count])]) //饼图数据

        pSeriesData[0].barCate=[bigpaycount,midbigpaycount,minpaycount,litmidpaycount,litpaycount]
        let barArr=pSeriesData[0].barData;
        barArr.push({
          barTitle:item[country],
          data:[{
            name:pay_count,
            type:'bar',
            data:[
              Number(item[bigpaycount]),
              Number(item[midbigpaycount]),
              Number(item[minpaycount]),
              Number(item[litmidpaycount]),
              Number(item[litpaycount])]
          }]
        })
        })
      var pieEvent=(e)=>{
        // console.log(e)
        let select_name=e.point.name;
        let barTitle="";//e.point.series.options.barData.barTitle;//+"各充值区间充值人数";
        let barCate=e.point.series.options.barCate;
        let barData=e.point.series.options.barData;
        let barSeriesData=[];
        barData.forEach((item)=>{
          if(item.barTitle==select_name){
            barTitle=item.barTitle+"-各充值区间充值人数";
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