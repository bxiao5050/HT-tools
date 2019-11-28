<template>
  <div>
    <card>
      <div slot="header">{{header||""}}</div>
      <div slot="body" class="table-content">
        <div id="armsStrengthenOverviewChart" class="charts" v-show="showType==1"></div>
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
      let streng_level = utils.getColumnByIndex(0,this.data)

      let categories=[]
      let seriesData=[]
      this.data.every(item=>{
        categories.push(item[streng_level])

        if(seriesData.length==0){
          for(let index in item){
            if(index!=streng_level){
              seriesData.push({
                name:index,
                data:[],
                tooltip:{
                  valueSuffix:'%'
                }
              })
            }
          }
        }
        return true
        
      })
      this.data.forEach(item=>{
        seriesData.forEach(serie=>{
          serie.data.push(Number(item[serie.name].split('%')[0]))
        })
      })

      highchartUtil.drawChart('armsStrengthenOverviewChart','column',categories,seriesData,true)
    }
  }
}
</script>
<style lang="scss" scoped>
.charts{
  height:350px;
}

.table-content{
  // height:350px;
  // overflow:hidden;
}
</style>