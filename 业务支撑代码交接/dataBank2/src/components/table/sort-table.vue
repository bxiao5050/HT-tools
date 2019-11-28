<template>
  <table class="table table-bordered">
    <thead v-if="!isHideHeader">
      <tr>
        <th v-for="column in columnArr" :key="column">{{column}}</th>
      </tr>
    </thead>
    <tbody v-if="tableData">
      <tr v-for="(item,index) in tableData" :key="index" :class="{selected:selectedIndex === index}" @click="selectedIndex=index">
        <td v-for="column in columnArr" :key="column">
          <i v-if="trendCol&&trendCol==column" class="icon-arrow" :class="{'up':Number(item[column])>0,'right':Number(item[column])==0,'down':Number(item[column])<0}"></i>
          <span v-else>{{item[column]}}</span>
        </td>
      </tr>
    </tbody>
    <tfoot v-if="!tableData||tableData.length==0">
      <tr>
        <td>无数据</td>
      </tr>
    </tfoot>
  </table>
</template>
<script>
export default {
  props: {
    // 表格数据(必须)
    tableData: {
      type: Array,
      default: []
    },
    // 汇总数据 不存在时不显示
    totalData:{
      type:Object,
      default: null
    },
    // 列的顺序 为空或者长度为零时按默认顺序
    columnSort:{
      type:Array,
      default:[]
    },
    // 不需要排序的列的下标
    noSortIndex:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      sortKey: '',
      desc: false
    }
  },
  computed: {
    columnArr(){
      let arr = []
      if(this.tableData&&this.tableData.length>0){
        for(let i=0;i<this.tableData.length;i++){
          for(let index in this.tableData[i]){
            arr.push(index)
          }
          break
        }
      }
      return arr
    },
    sortTable(){
      let sortTable = this.tableData.sort((a,b)=>{
        let data1,data2
        if(typeof a[this.sortKey] === 'number'){
          data1 = a[this.sortKey]
          data2 = b[this.sortKey]
        } else if(typeof a[this.sortKey] === 'string'){
          if(a[this.sortKey].indexOf('%')!=-1){
            data1 = Number(a[this.sortKey].split('%')[0])
            data2 = Number(b[this.sortKey].split('%')[0])
          }
          if(a[this.sortKey].indexOf(',')!=-1){
            data1 = Number(a[this.sortKey].replace(/,/g,""))
            data2 = Number(b[this.sortKey].replace(/,/g,""))
          }
          data1 = Number(a[this.sortKey])
          data2 = Number(b[this.sortKey])
        }
        if(!this.desc){
          return data1 - data2
        } else{
          return data2 - data1
        }
      })
      return sortTable
    }
  }
}
</script>
<style lang="scss" scoped>
// table {
//   th,
//   td {
//     font-weight: normal;
//     border-top: 0;
//     vertical-align: middle;
//     text-align: center;
//     // white-space: nowrap;
//   }
//   tr.selected{
//     background-color:#C4C2D8;
//     &:hover{
//       background-color:#C4C2D8;
//     }
//   }
// }

.icon-arrow-right {
  display: inline-block;
  transform: rotate(270deg);
  &.desc {
    transform: rotate(90deg);
  }
}
</style>