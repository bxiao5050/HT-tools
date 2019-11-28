<template>
  <div class="table-group">
    <table class="table table-border table-hover">
      <tr>
        <th>指标名称</th>
        <th>{{dateArr[5]}}</th>
        <th>{{dateArr[6]}}</th>
        <th>{{dateArr[7]}}</th>
      </tr>
      <tr v-for="item in indexData">
        <td>{{item["pointertype_name"]}}</td>
        <td>{{item[dateArr[5]]|percentFilter(item.pointertype_name) }}</td>
        <td>{{item[dateArr[6]]|percentFilter(item.pointertype_name) }}</td>
        <td>{{item[dateArr[7]]|percentFilter(item.pointertype_name) }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    props: ["dateArr"],
    computed: {
      ...mapGetters(["indexData"]),
      tableData:function(){
        var data=this.indexData;
        for(var i=0;i<data.length;i++){
          if(data[i].pointertype_name.indexOf('率',0)!=-1){
            data[i][this.dateArr[5]]=data[i][this.dateArr[5]]+"%";
            data[i][this.dateArr[6]]=data[i][this.dateArr[6]]+"%";
            data[i][this.dateArr[7]]=data[i][this.dateArr[7]]+"%";
          }
        }
        return data;
      }
    },
    filters:{
      percentFilter:function(val,name){
        if(name.indexOf('率',0)!=-1){
          return val+"%";
        }
        else return val;
      }
    }
  }

</script>
<style lang="scss" scoped>
.table-group{
    width:100%;
    height:12.6rem;
    margin: 0 0 0.26rem 0;
    overflow: auto !important;
    -webkit-overflow-scrolling: touch;
}
</style>
