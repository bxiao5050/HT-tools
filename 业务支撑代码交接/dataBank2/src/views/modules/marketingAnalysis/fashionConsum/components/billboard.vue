<!--风云榜-->
<template>
    <div>
      <!-- <table class="table table-bordered">
        <thead>
          <tr>
            <th v-for="(column,cindex) in columnArr" :key="cindex">{{column}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData" :key="index">
            <td v-for="(column,cindex) in columnArr" :key="cindex">
              <a href="javascript:void(0)" v-if="cindex==1" @click="showDetail(item)">{{item[column]}}</a>
              <span v-else>{{item[column]}}</span>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="tableData.length==0">
          <tr>
            <td :colspan="columnArr.length" align="center">无数据</td>
          </tr>
        </tfoot>
      </table> -->
       <el-table ref="singleTable" :data="tableData" @row-click="rowClick" :highlight-current-row="true" max-height="500" style="width:100%;" fit border>
      <el-table-column v-for="(column,cindex) in columnArr" :key="column" :prop="column" :label="column">
        <template slot-scope="scope">
          <a href="javascript:void(0)" v-if="cindex==1" @click="showDetail(scope.row)">{{scope.row[column]}}</a>
          <i v-else-if="cindex==2" :class="{'icon-arrow up':scope.row[column]>0,'icon-arrow right':scope.row[column]==0,'icon-arrow down':scope.row[column]<0}"></i>
          <span v-else>{{scope.row[column]}}</span>
        </template>
      </el-table-column>
  </el-table>
      <chartModal v-if="isShowDetail" :type="type" :moneyType="moneyType" :goodsType="goodsType" :searchKey="searchKey" :selectedItem="selectedItem" @close="isShowDetail=false"></chartModal>
    </div>
  </template>
  <script>
    import chartModal from './chartModal.vue'
    export default {
      name: 'billboard',
      components: {
        chartModal
      },
      props: ['tableData','type', 'moneyType', 'goodsType','searchKey'],
      data() {
        return {
          isShowDetail: false,
          selectedItem: null,
          size: 20,
          nowpage: 1,
        }
      },
      computed: {
        columnArr() {
          let list = []
          if (this.tableData && this.tableData.length > 0) {
            for (let i = 0; i < this.tableData.length; i++) {
              for (let index in this.tableData[i]) {
                list.push(index)
              }
              break
            }
          }
          return list
        },
        // 分页后总页面
        page() {
          if (this.tableDate && this.tableData.length > 0) {
            return parseInt(this.tableData.length / this.size)
          }
          return 1
        },
        nowListData() {
          return this.tableData.filter((item, index) => {
            return index > (this.nowpage - 1) * this.size && index < this.nowpage * this.size
          })
        }
      },
      methods: {
        rowClick(row){
          this.$refs.singleTable.setCurrentRow(row)
        },
        showDetail(item) {
          this.selectedItem = {
            item_id: item[this.columnArr[0]],
            item_name: item[this.columnArr[1]],
          }
          this.isShowDetail = true
        }
      }
    }
  
  </script>
  <style lang="scss" scoped>
    /* .table-content {
        overflow: auto;
        width: 100%;
        max-height: 500px;
        white-space: nowrap;
      } */
  </style>