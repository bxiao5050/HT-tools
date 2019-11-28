<template>
  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th></th>
        <th v-for="column in columnArr">{{column}}</th>
      </tr>
    </thead>
    <tbody id="tb">
      <template v-for="tb in foldTableData">
        <tr v-for="item in tb.tableData">
          <td @click="toggleRowItem(tb)" width="50px"><i :class="{'icon-plus':!tb.open,'icon-minus':tb.open}"></i></td>
          <td v-for="column in columnArr">{{item[column]}}</td>
        </tr>
        <tr v-for="item in tb.detailData" v-if="tb.detailData.length>0&&tb.open">
          <td></td>
          <td v-for="column in columnArr">{{item[column]}}</td>
        </tr>
        <tr v-if="tb.detailData.length==0" v-show="tb.open">
          <td></td>
          <td :colspan="columnArr.length">无详细数据</td>
        </tr>
      </template>
    </tbody>
    <tfoot v-if="tableData.length==0">
      <tr>
        <td :colspan="columnArr.length">无数据</td>
      </tr>
    </tfoot>
  </table>
</template>
<script>
export default {
  props: {
    /**
    * 表格基本数据
    */
    tableData: {
      type: Array,
      default: []
    },
    /**
    * 表格详细数据
    */
    detailData: {
      type: Array,
      default: []
    },
    /**
     * 折叠关键字
     */
    mergeKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      foldTableData: []
    }
  },
  computed: {
    /**
    * 计算列名数组
    */
    columnArr() {
      let result = [];
      if (this.tableData.length > 0) {
        for (let index in this.tableData[0]) {
          result.push(index);
        }
      }
      return result;
    }
  },
  methods: {
    /**
    * 初始化表格数据
    */
    initFoldTable() {
      this.foldTableData=[];
      var mergeList = this.tableData.map((item) => { return item[this.mergeKey] });
      mergeList.forEach((merge) => {
        this.foldTableData.push({
          mergeStr:merge,
          tableData: [],
          detailData: [],
          open:false
        })
      })

      this.foldTableData.forEach((foldData)=>{
        this.tableData.forEach((tdata) => {
          if (tdata[this.mergeKey] == foldData.mergeStr) {
            foldData.tableData.push(tdata)
          }
        })
        this.detailData.forEach((dtdata) => {
          if (dtdata[this.mergeKey] == foldData.mergeStr) {
            foldData.detailData.push(dtdata)
          }
        })
      })
    },
    /**
    * 点击展开或折叠详细信息
    */
    toggleRowItem(tbItem) {
      tbItem.open=!tbItem.open;
    }

  },
  watch:{
    tableData(v,ov){
      if(v!=ov){
        this.initFoldTable()
      }
    },
    detailData(v,ov){
      if(v!=ov){
        this.initFoldTable()
      }
    }
  }
}
</script>
<style lang="scss">
</style>
