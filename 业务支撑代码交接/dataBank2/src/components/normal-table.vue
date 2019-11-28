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
      /**
       *表格数据(必须)
       */
      tableData: {
        type: Array,
        default: []
      },
      isHideHeader:{
        type:Boolean,
        default:false
      },
      hideColumn: {
        default: ""
      },
      /**
       * 特殊列
       * Array
       */
      trendCol: {
        default: ''
      }
      // [
      //   {
      //     key: 'trend',
      //     type: 'trend',
      //     icon: ['icon-arrow up','icon-arrow right','icon-arrow down']
      //   },
      // ]
    },
    data(){
      return {
        selectedIndex:-1
      }
    },
    computed: {
      columnArr() {
        let result = [];
        if (this.tableData && this.tableData.length > 0) {
          for (let index in this.tableData[0]) {
            if (Array.isArray(this.hideColumn)) {
              this.hideColumn.forEach((hideItem) => {
                if (index != hideItem) {
                  result.push(index);
                }
              })
            } else if (typeof(this.hideColumn) == "string") {
              if (index != this.hideColumn) {
                result.push(index);
              }
            }
          }
        }
        return result;
      }
    }
  }
</script>
<style lang="scss" scoped>
  table {
    th,
    td {
      font-weight: normal;
      border-top: 0;
      vertical-align: middle;
      text-align: center;
      // white-space: nowrap;
    }
    tr.selected{
      background-color:#C4C2D8;
      &:hover{
        background-color:#C4C2D8;
      }
    }
  }
  
  .icon-arrow {
    font-size: 14px;
    display: block;
    &.up {
      transform: rotate(0deg);
      color: #14D7B1;
    }
    &.down {
      transform: rotate(180deg);
      color: #FE5545;
    }
    &.right {
      transform: rotate(90deg);
      color: orange;
    }
  }
</style>