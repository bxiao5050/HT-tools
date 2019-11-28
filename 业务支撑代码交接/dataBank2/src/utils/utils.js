export default {
  _isEmpty: (value) => {
    if (value == null || value == undefined) {
      return false;
    }
    if (Array.isArray(value) || typeof value == 'string' || typeof value.splice == 'function') {
      return !value.length;
    }
    if (typeof value == 'object') {
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          return false;
        }
      }
    }
    return true
  },
  mergeObject: (obj, newObj) => {
    for (let i in newObj) {
      obj[i] = newObj[i];
    }
  },
  getColumnKey: (col, columns) => {
    for (let i = 0; i < columns.length; i++) {
      if (col == columns[i].columnName) {
        return columns[i].columnValue;
      }
    }
    return col;
  },
  getColumnByIndex(index, data) {
    for (let i = 0; i < data.length; i++) {
      let obj = data[i]
      let count = 0
      for (let j in obj) {
        if (count === index) {
          return j
        }
        count++
      }
    }
    return ''
  },
}



export const changeDate = function (param) {
  let query = true
  for (let name in param) {
    if (this[name] === param[name]) query = !query
    this[name] = param[name]
  }
  if (query) this.query()
}