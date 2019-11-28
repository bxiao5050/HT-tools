// 获取渠道列表并初始化数据存储
import api from 'src/services/api'
import store  from 'src/store'


class Data {
  serviceData
  data = {
    selected: 0,
    len: 0
  }
  configs = {
    1: {
      ply: 1,
      id: 'channel_id',
      name: 'channel_name'
    },
    2: {
      ply: 3,
      grandid: 'region_id',
      grandname: 'region_name',
      parentid: 'agent_id',
      parentname: 'agent_name',
      id: 'game_zone_id',
      name: 'game_zone_name'
    },
    3: {
      ply: 1,
      id: 'id',
      name: 'name'
    }
  }
  config
  constructor({ resolve, reject }) {
    api
      .user
      .getPayChannels({ isCache: 1 })
      .done(data => {
        if (data.code == 401) {
          this.config = this.configs[store.state.common.systems.systemId]
          if (data.state.length > 0 && data.state[0].length>0) {
            this.serviceData = data.state[0]
            this.dataFormat()
          } else {
            this.serviceData = [];
            Utils.Notification.error({ message: "无支付渠道权限!" })
          }
          resolve()
        } else {
          reject()
          Utils.Notification.error({ message: data.message })
        }
      })
  }

  test() {
    let data = {}
    this
      .serviceData
      .forEach(e => {
        // console.log(e.payway_group)
        if (!data.hasOwnProperty(e.payway_group))
          data[e.payway_group] = e.id
      })
    // console.log(data)
  }

  /**
   * 代理商数据格式化
   */
  dataFormat() {
    switch (this.config.ply) {
      case 1:
        this.dataSetByOnePly();
        break;
      case 2:
        this.dataSetByTwoPly();
        break;
      case 3:
        this.dataSetByThreePly();
        break;
    }
    store.commit('PayChannel/ply', this.config.ply)
  }

  /**
   * 单层数据结构构建
   */
  dataSetByOnePly() {
    this
      .serviceData
      .forEach(e => {
        this.data[e[this.config.id]] = {
          id: e[this.config.id],
          name: e[this.config.name],
          select: 2
        }
      })
    this.data.selected = this.data.len = this.serviceData.length
    this.data.ply = 'child'
    store.commit('PayChannel/data', this.data)
    store.commit('PayChannel/confirm', $.extend(true, {}, this.data))
  }

  /**
   * 三层数据结构构建
   */
  dataSetByThreePly() {
    const grandDefault = this.serviceData = this
      .serviceData
      .sort((a, b) => {
        return a.channel_id - b.channel_id;
      })
    this
      .serviceData
      .forEach(e => {

        let grandid = e[this.config.grandid],
          grandname = e[this.config.grandname].trim(),
          parentid = e[this.config.parentid],
          parentname = e[this.config.parentname].trim(),
          id = e[this.config.id],
          name = e[this.config.name].trim();

        // grand
        let grand = this.data
        if (!grand.hasOwnProperty(grandid)) {
          !grand.hasOwnProperty('ply') && (grand.ply = 'grand');
          if (!grand.hasOwnProperty('default'))
            grand.default = grandid
          grand[grandid] = {
            grandid: grandid,
            grandname: grandname,
            len: 0,
            selected: 0,
            select: grand.default === grandid ?
              2 :
              0
          };
        }
        // parent
        let parent = grand[grandid]
        if (!parent.hasOwnProperty(parentid)) {
          !parent.hasOwnProperty('ply') && (parent.ply = 'parent');
          !parent.hasOwnProperty('default') && (parent.default = parentid);
          parent[parentid] = {
            grandid: grandid,
            grandname: grandname,
            parentid: parentid,
            parentname: parentname,
            len: 0,
            selected: 0,
            select: grand.default === grandid ?
              2 :
              0
          };
        }
        // child
        let child = parent[parentid];
        if (!child.hasOwnProperty(id)) {
          !child.hasOwnProperty('ply') && (child.ply = 'child');
          child[id] = {
            grandid: grandid,
            grandname: grandname,
            parentid: parentid,
            parentname: parentname,
            id: id,
            name: name,
            select: grand.default === grandid ?
              2 :
              0
          };
          child.len++;
          parent.len++;
          grand.len++;
          if (grand.default === grandid) {
            parent.selected++;
            child.selected++;
            grand.selected++
          }
        }
      })
    store.commit('PayChannel/data', this.data)
    store.commit('PayChannel/confirm', $.extend(true, {}, this.data))
  }
}

/**
 * default
 */
export default {
  data() {
    return new Promise((resolve, reject) => {
      new Data({ resolve, reject })
    })
  }
}