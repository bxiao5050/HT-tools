<template>
  <div>
    <card>
      <div slot="header">{{header||""}}</div>
      <div slot="body" class="table-content">
        <div id="petLevelOverviewChart" class="charts" v-show="showType==1"></div>
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
  methods:{
    dataProvider(pdata){
      this.data = pdata
      this.drawChart()
    },
    drawChart(){
      let pet_level = utils.getColumnByIndex(0,this.data)

      let categories=[]
      let seriesData=[]
      this.data.every(item=>{
        seriesData.push({
                name:item[pet_level],
                data:[],
                tooltip:{
                  valueSuffix:'%'
                }
              })
        if(categories.length==0){
          for(let index in item){
            if(index!=pet_level){
             categories.push(index)
            }
          }
        }
        return true
      })
      seriesData.forEach(serie=>{
        this.data.forEach(item=>{
          if(item[pet_level] == serie.name){
            for(let index in item){
               if(index!= pet_level){
                serie.data.push(Number(item[index].split('%')[0]))
               }
            }
          }
        })
      })
      highchartUtil.drawChart('petLevelOverviewChart','column',categories,seriesData)
    }
  }
}
</script>
<style lang="scss" scoped>
.charts{
  height:350px;
}
</style>