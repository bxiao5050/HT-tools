export default {
  selectedList: state => {
    let arr = []
    let data = state.data
    if (data === null) {
      return arr
    } else if (state.ply === 1) {
      for (let n in data) {
        let child = data[n]
        if (typeof child === 'object') {
          if (child.select === 2) {
            arr.push(child.name)
          }
        }
      }
      return arr
    } else if (state.ply === 3) {
      for (let n in data) {
        let grand = data[n]
        if (typeof grand === 'object') {
          if (grand.select === 2) {
            arr.push(grand)
          } else if (grand.select === 0) {
            continue
          } else {
            for (let n in grand) {
              let parent = grand[n]
              if (typeof parent === 'object') {
                if (parent.select === 2) {
                  arr.push(parent)
                } else if (parent.select === 0) {
                  continue
                } else {
                  for (let n in parent) {
                    let child = parent[n]
                    if (typeof child === 'object') {
                      if (child.select === 2) {
                        arr.push(child)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return arr
    }
  },
  selectedConfirmList: state => {
    let arr = []
    let data = state.confirm
    if (data === null) {
      return arr
    } else if (state.ply === 1) {
      for (let n in data) {
        let child = data[n]
        if (typeof child === 'object') {
          if (child.select === 2) {
            arr.push(child)
          }
        }
      }
      return arr
    } else if (state.ply === 3) {
      for (let n in data) {
        let grand = data[n]
        if (typeof grand === 'object') {
          if (grand.select === 2) {
            arr.push(grand)
          } else if (grand.select === 0) {
            continue
          } else {
            for (let n in grand) {
              let parent = grand[n]
              if (typeof parent === 'object') {
                if (parent.select === 2) {
                  arr.push(parent)
                } else if (parent.select === 0) {
                  continue
                } else {
                  for (let n in parent) {
                    let child = parent[n]
                    if (typeof child === 'object') {
                      if (child.select === 2) {
                        arr.push(child)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return arr
    }
  },
  // 选中渠道ID列表(全选取父级，非全选取子级)
  selectedIdList: state => {
    let array = [],
      data = state.confirm
    if (data === null) {
      return array
    } else if (state.ply === 1) {
      for (let n in data) {
        let child = data[n]
        if (typeof child === 'object') {
          if (child.select === 2) {
            array.push(child.id)
          }
        }
      }
    } else if (state.ply === 2) {
    } else if (state.ply === 3) {
      for (let n in data) {
        let grand = data[n]
        if (typeof grand === 'object') {
          if (grand.select === 2) {
            //#region 渠道全选时传顶级渠道ID
            // array.push(grand.grandid)
            //#endregion
            //#region 渠道全选时传汇总渠道ID
            for (let n in grand) {
              let parent = grand[n]
              if (typeof parent === 'object') {
                if (parent.select === 2) {
                  array.push(parent.parentid)
                }
              }
            }
            //#endregion
          } else if (grand.select === 0) {
            continue
          } else {
            for (let n in grand) {
              let parent = grand[n]
              if (typeof parent === 'object') {
                if (parent.select === 2) {
                  array.push(parent.parentid)
                } else if (parent.select === 0) {
                  continue
                } else {
                  for (let n in parent) {
                    let child = parent[n]
                    if (typeof child === 'object') {
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
  },
  isAllSelect(state) {
    let data = state.confirm
    if (data === null) {
      return 1
    } else if (state.ply === 1) {
      if (data.selected === data.len) {
        return 1
      }
    }
    return 0
  },
  // 二级渠道ID列表，只在渠道层级为三级时生效
  selected2IdList(state) {
    let array = [],
      data = state.confirm
    if (data === null) {
      return array
    }
    for (let n in data) {
      let grand = data[n]
      if (typeof grand === 'object') {
        for (let n in grand) {
          let parent = grand[n]
          if (typeof parent === 'object') {
            if (parent.select === 2) {
              array.push(parent.parentid)
            }
          }
        }
      }
    }
    array = Array.from(new Set(array))
    return array.join(',')
  },
  // 三级渠道ID列表，只在渠道层级为三级时生效
  selected3IdList(state) {
    let array = [],
      data = state.confirm
    if (data === null) {
      return array
    }
    for (let n in data) {
      let grand = data[n]
      if (typeof grand === 'object') {
        for (let n in grand) {
          let parent = grand[n]
          for (let n in parent) {
            let child = parent[n]
            if (typeof child === 'object') {
              if (child.select === 2) {
                array.push(child.id)
              }
            }
          }
        }
      }
    }
    array = Array.from(new Set(array))
    return array.join(',')
  }
}
