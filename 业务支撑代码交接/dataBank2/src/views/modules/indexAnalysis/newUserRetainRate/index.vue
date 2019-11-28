<template>
  <section id="new-user-retain-rate">
    <div class="content-header">
      <moduleHeader :isShowReg="config[systemId].isShowRegChannel" :isShowPay="config[systemId].isShowPayChannel" :dateList="dateList"></moduleHeader>
    </div>
    <div class="content-body">
      <div class="card-box">
        <card>
          <div slot="header">
            <div class="card-header-title">{{$t('common.IndexKey')}}</div>
            <div class="tabs" v-if="this.systemId==1">
              <div class="tab-item" :class="{'active':type==1}" @click="type=1">{{$t('newUserRetainRate.newUser')}}</div>
              <!-- <div class="tab-item" :class="{'active':type==2}" @click="type=2">{{$t('newUserRetainRate.activeDeviceNewUser')}}</div> -->
            </div>

            <div class="export-link">
              <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
            </div>
          </div>
          <div slot="body">
            <div class="tab-types">
              <div class="tab-type-item" :class="{'active':tabType==0}" @click="tabType=0">热力图</div>
              <div class="tab-type-item" :class="{'active':tabType==1}" @click="tabType=1">表格</div>
            </div>
            <div class="hot-table-content">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>{{columnArr[0]}}</th>
                    <th>{{columnArr[columnArr.length-1]}}</th>
                    <th v-for="(column,cindex) in columnArr" :key="cindex" v-if="cindex!=0&&cindex!=(columnArr.length-1)">{{column}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in tableData" :key="index" v-if="tableData">
                    <td>
                      <span>{{item[columnArr[0]]}}</span>
                    </td>
                    <td>
                      <span>{{item[columnArr[columnArr.length-1]]}}</span>
                    </td>
                    <td v-for="(column,cindex) in columnArr" :key="cindex" :style="{'background-color':getColor(item[column],cindex)}" v-if="cindex!=0&&cindex!=(columnArr.length-1)">
                      <span>{{item[column].split('%')[0]==0?'-':item[column]}}</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot v-if="!tableData||tableData.length==0">
                  <tr>
                    <td>无数据</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </card>
      </div>
    </div>
  </section>
</template>

<script>
import moduleHeader from 'src/views/modules/module-header'
import card from 'src/components/card.vue'
import api from 'src/services/api'
import normalTable from 'src/components/normal-table.vue'
// import notification from 'src/vendor/element-ui/packages/notification'
import utils from 'src/utils/utils'
export default {
  name: 'new-user-retain-rate',
  components: {
    card,
    moduleHeader
  },
  data() {
    return {
      date1: moment()
        .add(-8, 'day')
        .format('YYYY-MM-DD'),
      date2: moment()
        .add(-2, 'day')
        .format('YYYY-MM-DD'),
      tableData: [],
      columnData: [],

      type: 1,
      tabType: 0,

      config: {
        1: {
          isShowRegChannel: true,
          isShowPayChannel: false
        },
        2: {
          isShowRegChannel: true,
          isShowPayChannel: false
        },
        3: {
          isShowRegChannel: true,
          isShowPayChannel: true
        }
      }
    }
  },
  computed: {
    dateList() {
      return [
        {
          single: false,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: this.date2,
          change: newDate => {
            this.date1 = newDate.startDate
            this.date2 = newDate.endDate
            this.query()
          }
        }
      ]
    },
    columnArr() {
      let result = []
      if (this.tableData && this.tableData.length > 0) {
        for (let index in this.tableData[0]) {
          result.push(index)
        }
      }
      return result
    },
    systemId() {
      return this.$store.state.common.systems.systemId
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    getColor(value, index) {
      // let count_date,reg_count
      //   if(this.systemId==1){
      //     count_date = utils.getColumnKey('reg_date',this.columnData);
      //     reg_count = utils.getColumnKey('reg_count',this.columnData);
      //   }
      //   else if(this.systemId==3){
      //     count_date = utils.getColumnKey('count_date',this.columnData);
      //     reg_count = utils.getColumnKey('reg_count',this.columnData);
      //   }
      //  let count_date = utils.getColumnByIndex(0,this.tableData);
      //  let reg_count = utils.getColumnByIndex(this.tableData[0].length-1,this.tableData);
      // if (value == count_date || value == reg_count) {
      if (index == 0 || index == this.getObjLength(this.tableData[0]) - 1) {
        return 'transparent'
      } else {
        var colorList = [
          '#FFFFFF',
          '#F5F2FD',
          '#DED7F4',
          '#C9BEEB',
          '#B7A7E4',
          '#9D88DB'
        ]
        var num = Number(value.split('%')[0])
        var max = this.getMaxNum()
        var per = Number(num) / max
        if (this.tabType == 0) {
          if (num == 0) {
            return colorList[0]
          } else if (per <= 1 / 5) {
            return colorList[1]
          } else if (per <= 2 / 5) {
            return colorList[2]
          } else if (per <= 3 / 5) {
            return colorList[3]
          } else if (per <= 4 / 5) {
            return colorList[4]
          } else if (per <= 1) {
            return colorList[5]
          }
        }
        return colorList[0]
      }
    },
    getMaxNum() {
      var max = 0
      this.tableData.forEach(item => {
        let count = 0
        for (let index in item) {
          // if (index != count_date || index != reg_count) {
          if (count == 0 || count == this.getObjLength(item) - 1) {
          } else {
            let num = Number(item[index].split('%')[0])
            if (num > max) {
              max = num
            }
          }
          count++
        }
      })
      return max
    },
    getObjLength(obj) {
      let count = 0
      for (let index in obj) {
        count++
      }
      return count
    },
    getParams() {
      if (this.systemId == 1) {
        return {
          dataview: this.$store.state.common.nowmenu.dataView[0],
          in_date1: this.date1,
          in_date2: this.date2,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          select_id: this.type,
          isCache: 1
        }
      } else if (this.systemId == 2) {
        return {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          dataview: this.$store.state.common.nowmenu.dataView[0],
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_channel_id: this.$store.getters['RegChannel/selected2IdList'],
          in_package_id: this.$store.getters['RegChannel/selected3IdList'],
          in_config_id: 1
        }
      } else if (this.systemId == 3) {
        return {}
      }
    },
    query() {
      this.tableData = []
      var params = this.getParams()
      api.user.getQuery(params).then(data => {
        if (data.code == 401) {
          this.tableData = data.state[0]
          this.columnData = data.state[1] ? data.state[1] : []
        } else {
          Utils.Notification.error({
            message: data.message
          })
          console.error(data.message)
        }
      })
    },
    exportData() {
      var params = this.getParams()
      api.user.exportData(params)
    }
  },
  watch: {
    type(v, ov) {
      if (v != ov) {
        this.query()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hot-table-content {
  overflow-x: auto;
  width: 100%;
  // max-height: 500px;
  table {
    tr {
      th {
        font-weight: normal;
        white-space: nowrap;
      }
      td {
        white-space: nowrap;
      }
    }
  }
  // table {
  //   tr {
  //     th {
  //       white-space: nowrap;
  //       text-align: center;
  //       vertical-align: middle;
  //     }
  //     td {
  //       white-space: nowrap;
  //       text-align: center;
  //       vertical-align: middle;
  //     }
  //   }
  // }
}

.tab-types {
  // position: absolute;
  // right: 200px;
  // top: 10px; // float: right;
  float: right;
  vertical-align: middle;
  line-height: 30px;
  margin-bottom: 15px;
  vertical-align: middle;
  line-height: 30px;
  .tab-type-item {
    width: 100px;
    text-align: center;
    border: 1px solid #bbb;
    float: left;
    background-color: #eee;
  }
  .tab-type-item.active {
    background-color: #bbb;
    color: #fff;
  }
}
</style>