<template>
  <div class="overview-row">
        <el-card class="middle-card">
        <div slot="header">
          收入占比
        </div>
        <div id="over-chart-pie"  class="charts"></div>
      </el-card>
      <el-card class="most-card">
        <div slot="header">
          总览
          <div style="float:right;">
            <button title="柱形图" class="btn btn-primary" :class="{active:overviewType==1}" style="display: inline;" @click="overviewType=1"><i class="icon-bar-chart"></i></button>
            <button title="折线图" class="btn btn-primary" :class="{active:overviewType==2}" style="display: inline;" @click="overviewType=2"><i class="icon-linechart"></i></button>
          </div>
        </div>
        <div id="over-chart-common"  class="charts"></div>
      </el-card>
      <el-card class="must-card">
        <div slot="header">
          充值与{{datetype==1?'昨日':(datetype==2?'上周':'上月')}}对比
        </div>
        <div id="over-chart-bar"  class="charts"></div>
      </el-card>
      </div>
</template>
<script>
import api from 'src/services/api'
export default{
  name:'overview-chart',
  props:['datetype','chartData'],
  data(){
    return {
      overviewType:1, // 图表类型  1 柱形图  2 折线图
    }
  },
  methods:{
    drawChart(){
      this.drawPieChart()
      this.drawOverChart()
      this.drawBarChart()
    },
    // 饼图
    drawPieChart(){
      let seriesData=[{
        name:'充值',
        data:[]
      }]
        this.chartData.forEach(item=>{
          seriesData[0].data.push([item.name,Number(item['充值'])])
        })
      highchartUtil.drawPieChart('over-chart-pie',seriesData)
    },
    // 总览图表 柱形图/折线图
    drawOverChart(){
       let categories=[]
       let seriesData=[{
         name:'注册',data:[],
       },{
         name:'充值',data:[],
       },{
         name:'活跃',data:[],
       }
      //  ,{
      //    name:'次日留存',data:[],
      //  }
       ]
       this.chartData.forEach(item=>{
         categories.push(item.name)
         seriesData[0].data.push(Number(item['注册']))
         seriesData[1].data.push(Number(item['充值']))
         seriesData[2].data.push(Number(item['活跃']))
        //  seriesData[3].data.push(Number(item['次留']))
       })
       highchartUtil.drawChart('over-chart-common',this.overviewType==1?'column':'spline',categories,seriesData)
    },
    // 条形图
    drawBarChart(){
      let categories=[]
      let seriesData=[{
        name:(this.datetype==1?'昨日':(this.datetype==2?'上周':'上月'))+'充值',data:[],
      },{
        name:(this.datetype==1?'今日':(this.datetype==2?'本周':'本月'))+'充值',data:[],
      }]
      this.chartData.forEach(item=>{
        categories.push(item.name)
        seriesData[0].data.push(Number(item['前一日充值']))
        seriesData[1].data.push(Number(item['充值']))
      })
       highchartUtil.drawChart('over-chart-bar','bar',categories,seriesData)
    }
  },
  watch:{
    overviewType(v,ov){
      if(v!=ov){
        this.drawOverChart()
      }
    },
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
@import '../scss/overview.scss';
.charts{
  height:300px;
}
</style>