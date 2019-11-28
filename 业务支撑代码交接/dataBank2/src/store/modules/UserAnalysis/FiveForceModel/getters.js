import store  from 'src/store'

export default {

  modelData(state) {
    if (state.data) {
      let
        tableData = state.data[0],
        column = (function(columnArray) {
          if (columnArray) {
            let column = {}
            columnArray.forEach(e => {
              column[e.columnValue] = e.columnName
            })
            return column
          } else {
            return null
          }
        })(state.data[1]),
        translate = (e) => {
          var e = Object.assign({}, e)
          if (column) {
            for (let n in column) {
              e[column[n]] = e[n]
            }
          } else {
            e['pointertype_name'] = e[utils.getColumnByIndex(1,tableData||[])] //e['指标名称']
          }
          return e
        },
        modelData = {}

      tableData.forEach(e => {
        switch (e.id) {
          case 13:
            modelData[13] = translate(e);
            break;
          case 14:
            modelData[14] = translate(e);
            break;
          case 27:
            modelData[27] = translate(e);
            break;
          case 20:
            modelData[20] = translate(e);
            break;
          case 6:
            modelData[6] = translate(e);
            break;
          case 5:
            modelData[5] = translate(e);
            break;
          case 4:
            modelData[4] = translate(e);
            break;
          case 8:
            modelData[8] = translate(e);
            break;
          case 2:
            modelData[2] = translate(e);
            break;
          case 9:
            modelData[9] = translate(e);
            break;
          case 1:
            modelData[1] = translate(e);
            break;
        }
      })
      // console.log(column, modelData)
      return modelData
    } else {
      return null
    }
  },



  tableData(state) {
    if (state.data)
      return state.data[0]
    else
      return []
  }

}