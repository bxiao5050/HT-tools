<template>
  <card>
    <div slot="header">{{$t('common.TrendChart')}}</div>
    <div slot="body">
        <div id="virtualChart" class="charts"></div>
    </div>
  </card>
</template>
<script>
import card from 'src/components/card.vue'
export default{
  name:'chaeView',
  props:['chartData','columnData'],
  components:{
    card
  },
  methods:{
    drawChart(){
      let count_date = utils.getColumnByIndex(0,this.chartData)//utils.getColumnKey('统计时间',this.columnData);
      let chae = utils.getColumnByIndex(6,this.chartData)//utils.getColumnKey('cha_e',this.columnData);
        var categories = [];
        var seriesData = [{name: chae ,data: []}]
        this.chartData.forEach( item => {
          categories.push(item[count_date]);
          seriesData[0].data.push(Number(item[chae].replace(/,/g,'')))
        })
        highchartUtil.drawChart('virtualChart', 'spline', categories, seriesData, true)
      }
  },
  watch:{
    chartData(v,ov){
      if(v!=ov){
        this.drawChart();
      }
    }
  }
}
</script>