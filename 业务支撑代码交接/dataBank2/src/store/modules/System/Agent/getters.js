export default {
  selectedList: (state) => {
    let array = [], data = state.data
    if (data === null) {
      return array
    } else if (state.ply === 1) {
      for (let n in data) {
        let child = data[n]
        if (typeof (child) === 'object') {
          if (child.select === 2) {
            array.push(child)
          }
        }
      }
      return array
    } else if (state.ply === 3) {
      for (let n in data) {
        let grand = data[n]
        if (typeof (grand) === 'object') {
          if (grand.select === 2) {
            array.push(grand)
          } else if (grand.select === 0) {
            continue;
          } else {
            for (let n in grand) {
              let parent = grand[n]
              if (typeof (parent) === 'object') {
                if (parent.select === 2) {
                  array.push(parent)
                } else if (parent.select === 0) {
                  continue;
                } else {
                  for (let n in parent) {
                    let child = parent[n];
                    if (typeof (child) === 'object') {
                      if (child.select === 2) {
                        array.push(child)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return array;
    }
  },
  selectedConfirmList: (state) => {
    let array = [], data = state.confirm
    if (data === null) {
      return array
    } else if (state.ply === 1) {
      for (let n in data) {
        let child = data[n]
        if (typeof (child) === 'object') {
          if (child.select === 2) {
            array.push(child)
          }
        }
      }
      return array
    } else if (state.ply === 3) {
      for (let n in data) {
        let grand = data[n]
        if (typeof (grand) === 'object') {
          if (grand.select === 2) {
            array.push(grand)
          } else if (grand.select === 0) {
            continue;
          } else {
            for (let n in grand) {
              let parent = grand[n]
              if (typeof (parent) === 'object') {
                if (parent.select === 2) {
                  array.push(parent)
                } else if (parent.select === 0) {
                  continue;
                } else {
                  for (let n in parent) {
                    let child = parent[n];
                    if (typeof (child) === 'object') {
                      if (child.select === 2) {
                        array.push(child)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return array;
    }
  },
  // 选中区服id(作为参数)
  selectedIdList: (state) => {
    let array = [], data = state.confirm
    if (data === null) {
      return ''
    } else if (state.ply === 1) {
      for (let n in data) {
        let child = data[n]
        if (typeof (child) === 'object') {
          if (child.select === 2) {
            array.push(child.id)
          }
        }
      }
    } else if (state.ply === 3) {
      for (let n in data) {
        let grand = data[n]
        if (typeof (grand) === 'object') {
          if (grand.select === 2) {
            //#region 代理商全选时传顶级代理商ID
            // array.push(grand.grandid)
            //#endregion
            //#region 代理商全选时传汇总代理商ID
            for (let n in grand) {
              let parent = grand[n]
              if (typeof (parent) === 'object') {
                if (parent.select === 2) {
                  array.push(parent.parentid)
                }
              }
            }
            //#endregion
          } else if (grand.select === 0) {
            continue;
          } else {
            for (let n in grand) {
              let parent = grand[n]
              if (typeof (parent) === 'object') {
                if (parent.select === 2) {
                  array.push(parent.parentid)
                } else if (parent.select === 0) {
                  continue;
                } else {
                  for (let n in parent) {
                    let child = parent[n];
                    if (typeof (child) === 'object') {
                      if (child.select === 2) {
                        array.push(child.id)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return array.join(',')
  }
}