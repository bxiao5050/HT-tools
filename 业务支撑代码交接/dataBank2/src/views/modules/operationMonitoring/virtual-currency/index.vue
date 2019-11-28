<template>
  <div id="virtual-currency">
    <div class="content-header">
      <moduleHeader :isShowReg="true" :dateList="dateList"></moduleHeader>
      <!-- <div class="switchs"> -->
      <div class="switch-group">
        <div class="switchs-item">
          <span class="item-header">货币:</span>
          <div class="item-content">
            <div class="bt-item" :class="{'check':moneyType===1}" @click="moneyType=1">{{(config&&systemId&&gameId)?config[systemId][gameId].current[0]:'未定义'}}</div>
            <div class="bt-item" :class="{'check':moneyType===2}" @click="moneyType=2">{{(config&&systemId&&gameId)?config[systemId][gameId].current[1]:'未定义'}}</div>
          </div>
        </div>
        <div class="switchs-item" v-if="masterType!=5" style="margin-left:111px;">
          <span class="item-header">类型:</span>
          <div class="item-content">
            <input class="form-input" style="padding:0 5px;" readonly @click="isShowTypeList=true" v-model="selectedTypeStr" :title="selectedTypeStr"
            />
            <Modal headerName="类型选择" width="700" mbHeight="300" v-if="isShowTypeList" @close="checkTypeCancel">
              <div slot="modal-body">
                <div class="checkbox-group" v-if="sonTypeList&&sonTypeList.length>0">
                  <label class="checkbox-item" v-for="(item,index) in sonTypeList" :key="index">
                        <input type="checkbox" v-model="item.checked"/>{{item[columnData.template_name]}}
                     </label>
                </div>
              </div>
              <div slot="modal-footer">
                <button class="btn btn-primary" @click="checkTypeOK">确定</button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <div class="content-body">
      <card>
        <div slot="header">
          <div class="card-header-title">{{$t('common.IndexKey')}}</div>
          <div class="tabs">
            <div class="tab-item" :class="{'active':playerType==1}" @click="playerType=1">{{$t('virCurrency.normalPlayer')}}</div>
            <div class="tab-item" :class="{'active':playerType==2}" @click="playerType=2">{{$t('virCurrency.activePlayer')}}</div>
            <div class="tab-item" :class="{'active':playerType==3}" @click="playerType=3">{{$t('virCurrency.internalPlayer')}}</div>
          </div>
          <div class="steam-date">{{date2}}</div>
        </div>
        <div slot="body">
          <div class="steam-group">
            <div class="steam-item" :class="{active:masterType==5}" @click="masterType=5;">
              <div class="steam-item-num">{{(listData?listData.cha_e:-1)|toThousands}}</div>
              <div>日环比:{{listData?listData.cha_e_huanbi:-1}}%</div>
              <div>
                <span class="border-text">差额</span>
                <span class="index-desc">货币差额</span>
              </div>
            </div>
            <div class="steam-equal"></div>
            <div class="steam-item" :class="{active:masterType==1}" @click="masterType=1;">
              <div class="steam-item-num">{{(listData?listData.jin:-1)|toThousands}}</div>
              <div>日环比:{{listData?listData.jin_huanbi:-1}}%</div>
              <div>
                <span class="border-text">进</span>
                <span class="index-desc">充值或赠送货币</span>
              </div>
            </div>
            <div class="steam-add"></div>
            <div class="steam-item" :class="{active:masterType==4}" @click="masterType=4;">
              <div class="steam-item-num">{{(listData?listData.kai_cun:-1)|toThousands}}</div>
              <div>日环比:{{listData?listData.kai_cun_huanbi:-1}}%</div>
              <div>
                <span class="border-text">开存</span>
                <span class="index-desc">统计日前一日的库存</span>
              </div>
            </div>
            <div class="steam-sub"></div>
            <div class="steam-item" :class="{active:masterType==2}" @click="masterType=2;">
              <div class="steam-item-num">{{(listData?listData.xiao:-1)|toThousands}}</div>
              <div>日环比:{{listData?listData.xiao_huanbi:-1}}%</div>
              <div>
                <span class="border-text">消</span>
                <span class="index-desc">统计日消费的钻石</span>
              </div>
            </div>
            <div class="steam-sub"></div>
            <div class="steam-item" :class="{active:masterType==3}" @click="masterType=3;">
              <div class="steam-item-num">{{(listData?listData.shou_cun:-1)|toThousands}}</div>
              <div>日环比:{{listData?listData.shou_cun_huanbi:-1}}%</div>
              <div>
                <span class="border-text">收存</span>
                <span class="index-desc">统计日的库存</span>
              </div>
            </div>
          </div>
        </div>
      </card>
      <component ref="chartModel" :is="currentView" :chartData="tableData" :sonTypeList="sonTypeList"></component>
      <card>
        <div slot="header">
          <div class="card-header-title">{{$t('common.DataDetails')}}</div>
          <div class="export-link">
            <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
          </div>
        </div>
        <div slot="body">
          <div class="table-content">
            <foldTable v-if="masterType==5" :tableData="reverseTableData" :detailData="tableDetail" mergeKey="统计时间"></foldTable>
            <normalTable v-else :tableData="reverseTableData" :columnWidthObj="{0:150,1:150,2:150,3:150,4:150,5:150,6:150,7:150,8:150,9:150,10:150,11:150,12:150,13:150,14:150,15:150,16:150,17:150}"></normalTable>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
  import moduleHeader from 'src/views/modules/module-header'
  import card from 'src/components/card.vue'
  import foldTable from 'src/components/fold-table.vue'
  import normalTable from 'src/components/table/element-table.vue'
  import Modal from 'src/components/modal.vue'
  import api from 'src/services/api'
  import ChaeView from './components/chae.vue'
  import JXC from './components/JXC.vue'
  import Checkbox from 'src/components/form/checkbox/normal'
  import config from './config.js'
  export default {
    components: {
      moduleHeader,
      card,
      foldTable, normalTable, Modal,
      ChaeView,
      JXC//,XiaoView,KaicunView,ShoucunView
    },
    data() {
      return {
        date1: moment().add(-14, "day").format("YYYY-MM-DD"),
        date2: moment().add(-1, "day").format("YYYY-MM-DD"),
        moneyType: 1,//货币类型  钻石 1  绑定钻石 2
        playerType: 1,//用户类型  正常玩家 1  活跃玩家 2 内部账户 3
        masterType: 5,// 差额 5  进 1 开存 4 销 2 收存 3 
        type: 1,//差额 1   或者 进销存 2
        config: null,
        sonTypeList: [],

        selectedType: [],
        isShowTypeList: false,

        listData: null,//关键指标列表数据

        tableData: [],
        tableDetail: []
      }
    },
    computed: {
      dateList() {
        return [{
          single: false,
          uid: 'date1',
          label: this.$t('common.Date'),//'日期',
          startDate: this.date1,
          endDate: this.date2,
          isShowDatetype: false,
          change: (newDate) => {
            this.date1 = newDate.startDate;
            this.date2 = newDate.endDate;
            this.query();
          }
        }]
      },
      systemId() {
        return this.$store.state.common.systems.systemId
      },
      gameId() {
        return this.$store.state.common.nowgame
      },
      currentView() {
        if (this.masterType == 5) {
          return 'ChaeView' //差额
        }
        else {//if(this.masterType==1){
          return 'JXC' //进
        }
      },
      selectedTypeStr() {
        if (this.selectedType.length > 0) {
          return this.selectedType.map(item => { return item[this.columnData.template_name] }).join(',')
        }
        else {
          return '无'
        }
      },
      reverseTableData() {
        let result = this.tableData.map(item => {
          return item
        })
        result.reverse()
        return result
      },
      columnData() {
        return {
          template_name: utils.getColumnByIndex(1, this.sonTypeList)
        }
      }
    },
    filters: {
      toThousands: function (val) {
        return val.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
      }
    },
    created() {
      this.config = config
    },
    mounted() {
      this.query();
    },
    methods: {
      getParams() {
        return {
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: this.date1,
          in_date2: this.date2,
          in_user_type: this.playerType,
          in_money_type: this.moneyType,
          in_master_type: this.masterType,
          in_sontype_list: this.selectedType.map(item => { if (item.checked) { return item.sontype; } }).join(','),
          // in_type_id:this.type,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          isCache: 1
        }
      },
      query() {
        var params = this.getParams()
        api.user.getQuery(params).then((data) => {
          if (data.code == 401) {
            this.listData = data.state[0][0];
            if (this.masterType == 5) { //差额
              this.tableData = data.state[1];
              this.tableDetail = data.state[2] ? data.state[2] : [];
            }
            else { //进销开存收存
              this.tableData = data.state[1];
              this.tableDetail = [];
              this.sonTypeList = this.formatSonTypeList(data.state[2])
              this.selectedType = JSON.parse(JSON.stringify(this.sonTypeList));
            }

            // this.columnData = data.state[3] ? data.state[3] : [];


            // this.$refs.chartModel.drawChart();
          }
          else {
            Utils.Notification.error({ message: data.message })
            console.error(data.message);
          }
        })
      },
      exportData() {
        var params = this.getParams()
        api.user.exportData(params)
      },
      formatSonTypeList(list) {
        var result = list;
        result.forEach(item => {
          item.checked = true;
        })
        return result;
      },
      checkTypeOK() {
        this.selectedType = JSON.parse(JSON.stringify(this.sonTypeList));
        this.isShowTypeList = false;
        this.query();
      },
      checkTypeCancel() {
        this.sonTypeList = JSON.parse(JSON.stringify(this.selectedType));
        this.isShowTypeList = false;
      }
    },
    watch: {
      moneyType(v, ov) {
        if (v != ov) {
          this.sonTypeList = []
          this.selectedType = []
          this.query();
        }
      },
      playerType(v, ov) {
        if (v != ov) {
          this.sonTypeList = []
          this.selectedType = []
          this.query();
        }
      },
      masterType(v, ov) {
        if (v != ov) {
          this.sonTypeList = []
          this.selectedType = []
          this.query();
        }
      },
    }
  }

</script>
<style lang="scss" scoped>
  .steam-date {
    position: absolute;
    right: 100px;
    color: orange;
    /* animation: ccolor 3s infinite; */
  }
  /* @keyframes ccolor {
    0% {
      color: orange;
    }
    50% {
      color: skyblue;
    }
    100% {
      color: orange;
    }
  } */

  .form-input {
    border: 1px solid rgba(0, 0, 0, 0.15);
  }

  .steam-group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 30px;
    padding: 10px;
    .steam-item {
      flex: 3;
      height: 110px;
      color: #FFF;
      text-align: center;
      padding: 10px 0;
      cursor: pointer;
      .steam-item-num {
        font-size: 15px;
        font-weight: bold;
      }
      .border-text {
        border: 2px solid #FFF;
        display: initial;
        padding: 3px;
      }
      .index-desc {
        color: #EEE;
        font-size: 13px;
        margin-left: 3px;
      }
      &:hover {
        transform: scale(1.15);
        box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.3);
      }
      &:nth-child(1) {
        background-color: #5E5E5E; //#646979;
      }
      &:nth-child(3) {
        background-color: #F26262; //#FA6567;
      }
      &:nth-child(5) {
        background-color: #5D9CEC; //#27A9E3;
      }
      &:nth-child(7) {
        background-color: #4DC16C; //#F5C110;
      }
      &:nth-child(9) {
        background-color: #9B86D9; //#27B779;
      }
    }

    .active {
      transform: scale(1.15);
      box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.3);
    }

    .steam-equal {
      flex: 1;
      display: block;
      position: relative;
      &:before {
        content: '';
        height: 6px;
        width: 2.5em;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 -6px #bbb, 0 6px #bbb;
      }
    }
    .steam-add {
      flex: 1;
      box-sizing: border-box;
      display: inline-block;
      position: relative;
      font-size: 20px;
      color: #BBB;
      &:before,
      &:after {
        content: '';
        pointer-events: none;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: inset 0 0 0 1em;
      }
      &:before {
        width: 2em;
        height: 6px;
      }
      &:after {
        height: 2em;
        width: 6px;
      }
    }
    .steam-sub {
      flex: 1;
      display: block;
      position: relative;
      &:before {
        content: '';
        height: 6px;
        width: 2.5em;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 6px #bbb;
      }
    }
  }

  .currency-item {
    width: 100px;
  }

  .table-content {
    max-height: 500px;
    overflow: auto;
    white-space: nowrap;
  }

  .checkbox-group {
    max-height: 300px;
    overflow: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    .checkbox-item {
      width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
  }
</style>