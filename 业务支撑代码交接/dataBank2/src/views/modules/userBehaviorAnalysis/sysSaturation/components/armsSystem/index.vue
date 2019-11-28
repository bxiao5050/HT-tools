<template>
  <div class="system-view">
     <armsStrengthenOverview ref="armsStrengthenOverview" :showType="showType" class="item-view" header="武器强化分布"></armsStrengthenOverview> 
     <armsTop15 ref="armsTop15" :showType="showType" class="item-view" header="使用人气TOP15武器"></armsTop15>
     <armsLevelOverview ref="armsLevelOverview" class="item-view" header="武器突破等级分布"></armsLevelOverview>
     <useArmsOverview ref="useArmsOverview" class="item-view" header="使用武器分布"></useArmsOverview>
  </div>
</template>
<script>
import card from 'src/components/card.vue'
import armsStrengthenOverview from './views/armsStrengthenOverview.vue'
import armsTop15 from './views/armsTop15.vue'
import armsLevelOverview from './views/armsLevelOverview.vue'
import useArmsOverview from './views/useArmsOverview.vue'
export default{
  name:'pet-system',
  components:{
    card,
    armsStrengthenOverview,
    armsTop15,
    armsLevelOverview,
    useArmsOverview
  },
  props:['showType'],
  methods:{
    dataProvider(pdata){
      this.$refs.armsStrengthenOverview.dataProvider(pdata[0])
      this.$refs.armsTop15.dataProvider(pdata[1])
      this.$refs.armsLevelOverview.dataProvider([pdata[2],pdata[3]])
      this.$refs.useArmsOverview.dataProvider([pdata[4],pdata[5]])
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
    width:50%;
    padding:10px;
  }
}
</style>