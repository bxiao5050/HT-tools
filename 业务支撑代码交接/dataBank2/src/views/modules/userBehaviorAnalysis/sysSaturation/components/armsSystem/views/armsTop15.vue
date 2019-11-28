<template>
  <div>
    <card>
      <div slot="header">{{header||""}}</div>
      <div slot="body" class="table-content">
        <div id="armsTop15Chart" class="charts" v-show="showType==1"></div>
        <normalTable v-show="showType==2" :tableData="data" height="350"></normalTable>
      </div>
    </card>
  </div>
</template>
<script>
import card from 'src/components/card.vue'
import normalTable from 'src/components/table/element-table'
export default{
  components:{
    card,normalTable
  },
  props:['header','showType'],
  data(){
    return{
      data:[]
    }
  },
  mounted(){
  this.drawChart()
  },
  methods:{
    dataProvider(pdata){
      this.data = pdata
      this.drawChart()
    },
    drawChart(){
      let weapon_name = utils.getColumnByIndex(0,this.data)
      let user_count = utils.getColumnByIndex(1,this.data)

      let categories=[]
      let seriesData=[{
        name:user_count,
        data:[]
      }]
      if(this.data.length>0){
        this.data.forEach(item=>{
          categories.push(item[weapon_name])
          seriesData[0].data.push(Number(item[user_count]))
        })
      } else{
        categories=['烈火','黑白家电','大声公','畅通利器','愤怒小鸡']
        seriesData=[{name:'占比',data:[]}]
        seriesData[0].data=[0,0,0,0,0]
      }
      highchartUtil.drawChart('armsTop15Chart','column',categories,seriesData)
    }
  },
}
</script>
<style lang="scss" scoped>
.charts{
  height:350px;
}
</style>