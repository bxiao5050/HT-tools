const state = {
  zones: [], //区服数据源
  thirdZonesIndex: 0,
  firstLevel: null,
  secondLevel: null,
  thirdLevel: null,
  zoneSelected: [],
  search: {
    channel: '',
    server: ''
  },

  // shindousaigo
  curPly: 0,
  data: [],
  confirm: []
}

const mutations = {
  initZones(state, zones) {
    state.zones = zones
  },
  setFirstLevel(state, firstLevel) {
    state.firstLevel = firstLevel
  },
  setSecondLevel(state, secondLevel) {
    state.secondLevel = secondLevel
  },
  setThirdLevel(state, thirdZonesIndex) {
    state.thirdZonesIndex = thirdZonesIndex
  },
  setZoneSelected(state, zoneSelected) {
    state.zoneSelected = zoneSelected
  },
  modifyState(state, {
    level,
    states,
    item
  }) {
    switch (level) {
      case 1:
        state.zones.forEach(e => {
          if (item.region_id === e.region_id) {
            e.state = states
            e.children.forEach(e => {
              e.state = states
              e.children.forEach(e => {
                e.state = states
              })
            })
          }
        })
        break;
      case 2:
        item.state = states
        state.thirdZones.forEach(e => {
          if (item.agent_id === e.agent_id) {
            e.state = states;
          }
        });
        break;
      case 3:
        item.state = states
        state.secondZones.forEach(e => {
          if (item.agent_id === e.agent_id) {
            e.state = mutations.checkState(state.thirdZones)
          }
        })
        state.zones.forEach(e => {
          if (item.region_id === e.region_id) {
            e.state = mutations.checkState(state.secondZones);
          }
        })
        break;
    }
  },
  checkState(data) {
    var count = 0;
    var part = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].state == 2) {
        count++;
      } else if (data[i].state == 1) {
        part++;
      }
    }
    if (count == data.length) {
      return 2;
    } else if (count > 0 && count < data.length || part > 0) {
      return 1;
    } else if (count == 0) {
      return 0;
    }
  },

  // shindousaigo 
  zoneDataInit(state, data) {
    state.data = data
  },
  zoneDataConfirm(state) {
    state.confirm = state.data
  },
  zoneDataSelected(state, data) {
    if (data === 0)
      for (name in state.data) {
        if (typeof (state.data[name]) === 'object') state.data[name].select = 0
      }
    if (data === state.data.len)
      for (name in state.data) {
        if (typeof (state.data[name]) === 'object') state.data[name].select = 2
      }
    state.data.selected = data
  },
  curPlySetter(state, data) {
    state.curPly = data
  },
  reviseOptions(state, {
    e,
    ply
  }) {
    // console.log(e)
    switch (ply) {
      case 3:
        if (!e.hasOwnProperty('ply')) {

          let child = state.data[e.grandid][e.parentid][e.id]
          let parent = state.data[e.grandid][e.parentid]
          let grand = state.data[e.grandid]

          if (child.select === 0) {

            child.select = 2
            parent.selected++;
            grand.selected++;

            if (parent.selected === parent.len) {
              parent.select = 2
            } else {
              parent.select = 1
            }

            if (grand.selected === grand.len) {
              grand.select = 2
            } else {
              grand.select = 1
            }

          } else {

            child.select = 0
            parent.selected--;
            grand.selected--;

            if (parent.selected === 0) {
              parent.select = 0
            } else {
              parent.select = 1
            }

            if (grand.selected === 0) {
              grand.select = 0
            } else {
              grand.select = 1
            }

          }
        }

        if (e.hasOwnProperty('ply') && e.ply === 'child') {

          let parent = state.data[e.grandid][e.parentid]
          let grand = state.data[e.grandid]

          if (parent.select === 0) {

            parent.select = 2
            parent.selected = parent.len
            for (let n in parent) {
              let child = parent[n]
              if (typeof (child) === 'object') {
                if (child.select != 2) {
                  child.select = 2;
                  grand.selected++;
                }
              }
            }

            if (grand.selected === grand.len) {
              grand.select = 2
            } else {
              grand.select = 1
            }

          } else {

            parent.select = 0
            parent.selected = 0
            for (let n in parent) {
              let child = parent[n]
              if (typeof (child) === 'object') {
                if (child.select === 2) {
                  child.select = 0;
                  grand.selected--;
                }
              }
            }

            if (grand.selected === 0) {
              grand.select = 0
            } else {
              grand.select = 1
            }

          }

        }
        if (e.hasOwnProperty('ply') && e.ply === 'parent') {
          if (e.select === 0) {
            e.select = 2
            e.selected = e.len
            for (let n in e) {
              let p = e[n]
              if (typeof (p) === 'object') {
                p.select = 2
                p.selected = p.len
                for (let n in p) {
                  let c = p[n]
                  if (typeof (c) === 'object') {
                    c.select = 2
                    c.selected = c.len
                  }
                }
              }
            }
          } else {
            e.select = 0
            e.selected = 0
            for (let n in e) {
              let p = e[n]
              if (typeof (p) === 'object') {
                p.select = 0
                p.selected = 0
                for (let n in p) {
                  let c = p[n]
                  if (typeof (c) === 'object') {
                    c.select = 0
                    c.selected = 0
                  }
                }
              }
            }
          }

        }
        break;
    }
  }

}

const getters = {
  filter(state) {
    if (state.zones.length > 0) {
      state.zones.forEach(e => {
        if (state.firstLevel.region_id === e.region_id) {
          state.secondZones = e.children;
          state.secondZones.forEach(e => {
            if (state.secondLevel.agent_id === e.agent_id) {
              state.thirdZones = e.children;
              state.thirdLevel = state.thirdZones[state.thirdZonesIndex];
            }
          })
        }
      })
      return {
        secondZones: state.secondZones,
        thirdZones: state.thirdZones,
        thirdLevel: state.thirdLevel
      }
    } else {
      return {
        secondZones: [],
        thirdZones: [],
        thirdLevel: {}
      }
    }
  },
  agentSecectedList() {
    if (state.zones.length > 0) {
      var result = [];
      state.zones.forEach(e => {
        if (e.state === 2) {
          result.push({
            id: e.region_id,
            name: e.region_name,
          })
        } else {
          e.children.forEach(e => {
            if (e.state === 2) {
              result.push({
                id: e.agent_id,
                name: e.agent_name
              })
            } else {
              e.children.forEach(e => {
                if (e.state == 2) {
                  result.push({
                    id: e.game_zone_id,
                    name: e.game_zone_name,
                  })
                }
              })
            }
          })

        }
      })
      return result;
    } else {
      return []
    }
  },

  // shindousaigo 

  /**
   * 获取已选中列表集合
   * @param {*} state 
   */
  selectedList(state) {
    let data = state.data
    if (data.length === 0) {
      return []
    } else {
      let arr = []
      for (let name in data) {
        let cur = data[name]
        if (typeof (cur) === 'object') {
          if (cur.select === 2) {
            arr.push(cur.grandname)
          } else if (cur.select === 0) {
            continue;
          } else {
            for (let n in cur) {
              let cur_ = cur[n]
              if (typeof (cur_) === 'object') {
                if (cur_.select === 2) {
                  arr.push(cur_.parentname)
                } else if (cur.select === 0) {
                  continue;
                } else {
                  for (let na in cur_) {
                    let _cur = cur_[na];
                    if (typeof (_cur) === 'object') {
                      if (_cur.select === 2) {
                        arr.push(_cur.name)
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
  zoneConfirmParam(state) {
    let arr = []
    let data = state.confirm
    if (data.length === 0) {
      return arr
    } else if (state.curPly === 1) {
      for (let n in data) {
        let child = data[n]
        if (typeof (child) === 'object') {
          if (child.select === 2) {
            arr.push(child.id)
          }
        }
      }
    } else if (state.curPly === 2) {

    } else if (state.curPly === 3) {
       for (let n in data) {
        let grand = data[n]
        if (typeof(grand) === 'object') {
          if (grand.select === 2) {
            arr.push(grand.id)
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
                        arr.push(child.id)
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
    return arr
  }
}

export default {
  state,
  mutations,
  getters
}
