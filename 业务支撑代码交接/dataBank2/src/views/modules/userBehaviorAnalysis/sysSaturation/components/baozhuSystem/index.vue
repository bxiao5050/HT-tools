<template>
  <div class="system-view">
     <baozhuLevelOverview ref="baozhuLevelOverview" class="item-view" header="宝珠等级分布" :data="data1" :columnData="columnData"></baozhuLevelOverview> 
  </div>
</template>
<script>
import card from 'src/components/card.vue'
import baozhuLevelOverview from './views/baozhuLevelOverview.vue'
export default{
  name:'fashion-system',
  components:{
    card,
    baozhuLevelOverview
  },
  data(){
    return{
      data1:[], // 时装拥有人数 图表数据
      data2:[], // 时装拥有率 图表数据
      columnData:[], // 多语言列名数据
    }
  },
  methods:{
    dataProvider(pdata){
      this.$refs.baozhuLevelOverview.dataProvider(pdata)
    }
  },
}
</script>
<style lang="scss" scoped>
.system-view{
  display:flex;
  justify-content:flex-start;
  align-items:flex-start;
  flex-wrap:wrap;
  .item-view{
    // width:50%;
    width:100%;
    padding:10px;
  }
}
</style>