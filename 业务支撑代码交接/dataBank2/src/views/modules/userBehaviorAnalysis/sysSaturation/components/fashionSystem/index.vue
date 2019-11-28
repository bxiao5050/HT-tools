<template>
  <div class="system-view">
     <fashionOwner ref="fashionOwner" class="item-view" @query="query" @exportData="exportData" header="时装拥有情况分布"></fashionOwner> 
  </div>
</template>
<script>
import card from 'src/components/card.vue'
import fashionOwner from './views/fashionOwner.vue'
export default{
  name:'fashion-system',
  components:{
    card,
    fashionOwner
  },
  methods:{
    query(obj){
      this.$emit('query',obj)
    },
    exportData(obj){
      this.$emit('exportData',obj)
    },
    dataProvider(pdata){
      this.$refs.fashionOwner.dataProvider(pdata)
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
    // width:50%;
    width:100%;
    padding:10px;
  }
}
</style>