<template>
  <div>
    <card>
      <div slot="header">{{header||""}}</div>
      <div slot="body" class="table-content">
        <div id="warPetOverviewChart" class="charts" v-show="showType==1"></div>
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
      let pet_name = utils.getColumnByIndex(0,this.data)
      let rate = utils.getColumnByIndex(1,this.data)

      let categories=[]
      let seriesData=[{
        name:rate,data:[],tooltip:{
                  valueSuffix:'%'
                }
      }]
      if(this.data.length>0){
        this.data.forEach(item=>{
          categories.push(item[pet_name])
          seriesData[0].data.push(Number(item[rate].split('%')[0]))
        })
      } else{
        categories=['冰晶凤凰','巨炮龙','雷霆领主','水精灵']
        seriesData=[{name:'占比',data:[],tooltip:{
                  valueSuffix:'%'
                }}]
        seriesData[0].data=[0,0,0,0]
      }
      highchartUtil.drawChart('warPetOverviewChart','column',categories,seriesData)
    }
  }
}
</script>
<style lang="scss" scoped>
.charts{
  height:350px;
}
</style>