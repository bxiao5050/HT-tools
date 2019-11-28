/**
 * ChargeHotList 模块
 */

export default {

  tableData(state) {
    if (state.data) return state.data[0]
  },

  chartData(state) {
    if (state.data) return state.data[1]
  },

  detailData(state){
    return state.detailData
  }
  // columnData(state) {
  //   if (state.data) return state.data[2]
  // },

}