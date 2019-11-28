export default {
  selectedList: (state) => {
    let arr = []
    let data = state.data
    if (data === null) {
      return arr
    } else if (state.ply === 1) {
      for (let n in data) {
        let child = data[n]
        if (typeof(child) === 'object') {
          if (child.select === 2) {
            arr.push(child.name)
          }
        }
      }
      return arr
    } else if (state.ply === 3) {
      for (let n in data) {
        let grand = data[n]
        if (typeof(grand) === 'object') {
          if (grand.select === 2) {
            arr.push(grand)
          } else if (grand.select === 0) {
            continue;
          } else {
            for (let n in grand) {
              let parent = grand[n]
              if (typeof(parent) === 'object') {
                if (parent.select === 2) {
                  arr.push(parent)
                } else if (parent.select === 0) {
                  continue;
                } else {
                  for (let n in parent) {
                    let child = parent[n];
                    if (typeof(child) === 'object') {
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
      return arr;
    }
  },
  selectedConfirmList: (state) => {
    let arr = []
    let data = state.confirm
    if (data === null) {
      return arr
    } else if (state.ply === 1) {
      for (let n in data) {
        let child = data[n]
        if (typeof(child) === 'object') {
          if (child.select === 2) {
            arr.push(child)
          }
        }
      }
      return arr
    } else if (state.ply === 3) {
      for (let n in data) {
        let grand = data[n]
        if (typeof(grand) === 'object') {
          if (grand.select === 2) {
            arr.push(grand)
          } else if (grand.select === 0) {
            continue;
          } else {
            for (let n in grand) {
              let parent = grand[n]
              if (typeof(parent) === 'object') {
                if (parent.select === 2) {
                  arr.push(parent)
                } else if (parent.select === 0) {
                  continue;
                } else {
                  for (let n in parent) {
                    let child = parent[n];
                    if (typeof(child) === 'object') {
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
      return arr;
    }
  },
  selectedIdList: (state) => {
    let
      array = [],
      data = state.confirm
    if (data === null) {
      return array
    } else if (state.ply === 1) {
      for (let n in data) {
        let child = data[n]
        if (typeof(child) === 'object') {
          if (child.select === 2) {
            array.push(child.id)
          }
        }
      }
    } else if (state.ply === 2) {

    } else if (state.ply === 3) {
      for (let n in data) {
        let grand = data[n]
        if (typeof(grand) === 'object') {
          if (grand.select === 2) {
            array.push(grand.id)
          } else if (grand.select === 0) {
            continue;
          } else {
            for (let n in grand) {
              let parent = grand[n]
              if (typeof(parent) === 'object') {
                if (parent.select === 0) {
                  continue;
                } else {
                  for (let n in parent) {
                    let child = parent[n];
                    if (typeof(child) === 'object') {
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