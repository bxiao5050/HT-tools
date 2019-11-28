export default class ChannelMutations {

  static data = (state, data) => {
    state.data = data
  }
  static confirm = (state, data) => {
    state.confirm = data
  }
  static ply = (state, data) => {
    state.ply = data
  }
  static toggle = (state, { e }) => {
    switch (state.ply) {
      case 3:
        if (!e.hasOwnProperty('ply')) {

          let child = state.data[e.grandid][e.parentid][e.id]
          let parent = state.data[e.grandid][e.parentid]
          let grand = state.data[e.grandid]

          if (child.select === 0) {

            child.select = 2
            parent.selected++;
            grand.selected++;
            state.data.selected++;

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
            state.data.selected--;

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
              if (typeof(child) === 'object') {
                if (child.select != 2) {
                  child.select = 2;
                  grand.selected++;
                  state.data.selected++
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
              if (typeof(child) === 'object') {
                if (child.select === 2) {
                  child.select = 0;
                  grand.selected--;
                  state.data.selected--
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
            state.data.selected += e.len
            for (let n in e) {
              let p = e[n]
              if (typeof(p) === 'object') {
                p.select = 2
                p.selected = p.len
                for (let n in p) {
                  let c = p[n]
                  if (typeof(c) === 'object') {
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
              if (typeof(p) === 'object') {
                p.select = 0
                p.selected = 0
                for (let n in p) {
                  let c = p[n]
                  if (typeof(c) === 'object') {
                    if (c.select != 0) {
                      c.select = 0
                      state.data.selected--
                    }
                    c.selected = 0
                  }
                }
              }
            }
          }

        }
        break;
      case 1:
        // let data = state.data
        // if (e.hasOwnProperty('ply')) {
        //   if (data.selected != 0) {
        //     data.selected = 0
        //     for (let n in data) {
        //       let child = data[n]
        //       if (typeof(child) === 'object') child.select = 0
        //     }
        //   } else {
        //     data.selected = data.len
        //     for (let n in data) {
        //       let child = data[n]
        //       if (typeof(child) === 'object') child.select = 2
        //     }
        //   }
        // } else {
        //   if (e.select === 0) {
        //     e.select = 2
        //     data.selected++
        //   } else {
        //     e.select = 0
        //     data.selected--
        //   }
        // }
        if (e.hasOwnProperty('selected')) {
          if (e.selected === 0) {
            e.selected = e.len
            for (let n in state.data) {
              let child = state.data[n]
              if (typeof(child) === 'object')
                child.select = 2
            }
          } else {
            e.selected = 0
            for (let n in state.data) {
              let child = state.data[n]
              if (typeof(child) === 'object')
                child.select = 0
            }
          }
        } else {
          if (e.select === 0) {
            e.select = 2
            state.data.selected++
          } else {
            e.select = 0
            state.data.selected--
          }
        }
        break;
    }
  }

}