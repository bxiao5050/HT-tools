<template>
  <elTable ref="singleTable" :data="tableData" @row-click="rowClick" :show-header="!isHideHeader" :highlight-current-row="true" :max-height="maxHeight" :height="height" style="width:100%;" fit border>
      <elTableColumn v-for="(column,index) in columnArr" :key="column" :width="columnWidthObj[index]||''" :prop="column" :label="column">
        <template slot-scope="scope">
          <i v-if="trendCol&&trendCol==column" class="icon-arrow" :class="{'up':Number(scope.row[column])>0,'right':Number(scope.row[column])==0,'down':Number(scope.row[column])<0}" :title="scope.row[column]+'%'"></i>
          <span v-else>{{scope.row[column]}}</span>
        </template>
      </elTableColumn>
  </elTable>
</template>
<script>
export default{
  props:{
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
      trendCol: {
        default: ''
      },
      height:{
        type:[Number,String],
      },
      maxHeight:{
        type:[Number,String],
        default:500
      },
      columnWidthObj:{
        type:Object,
        default:function(){
          return {}
        }
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
    },
    methods:{
      rowClick(row){
        console.log('rowClick')
        this.$refs.singleTable.setCurrentRow(row)
      }
    },
}
</script>
<style lang="scss">
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color:#C4C2D8;
}
.el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
  background-color:transparent;
}
.el-table__body tr.current-row>td{
  background-color:#C4C2D8;
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