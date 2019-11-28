<template>
  <div class="system-view">
     <warPetRateOverview ref="warPetRateOverview" :showType="showType" class="item-view" header="热门出战宠物分布"></warPetRateOverview> 
     <petLevelOverview ref="petLevelOverview" :showType="showType" class="item-view" header="宠物等级分布"></petLevelOverview>
     <warPetRateTable ref="warPetRateTable" class="item-view" header="出战宠物占比分布"></warPetRateTable>
     <petBelongOverview ref="petBelongOverview" class="item-view" header="紫色品质以上宠物拥有情况分布"></petBelongOverview>
  </div>
</template>
<script>
import card from 'src/components/card.vue'
import warPetRateOverview from './views/warPetRateOverview.vue'
import petLevelOverview from './views/petLevelOverview.vue'
import warPetRateTable from './views/warPetRateTable.vue'
import petBelongOverview from './views/petBelongOverview.vue'
export default{
  name:'pet-system',
  props:['showType'],
  components:{
    card,
    warPetRateOverview,
    petLevelOverview,
    warPetRateTable,
    petBelongOverview
  },
  methods:{
    dataProvider(pdata){
      this.$refs.warPetRateOverview.dataProvider(pdata[0])
      this.$refs.petLevelOverview.dataProvider(pdata[1])
      this.$refs.warPetRateTable.dataProvider([pdata[2],pdata[3]])
      this.$refs.petBelongOverview.dataProvider([pdata[4],pdata[5]])
    }
  }
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