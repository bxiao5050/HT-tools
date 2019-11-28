<template>
  <section id="big-customer-trend">
    <div class="content-header">
      <moduleHeader :header="header" :isShowReg="true" :dateList="dateList"></moduleHeader>
      <div class="switchs">
        <div class="switch-group">
          <div class="switchs-item">
            <span class="item-header">币种:</span>
            <div class="item-content">
              <div class="bt-item" :class="moneytypes.default===item.val?'check':''" v-for="item in moneytypes.arr" @click="moneytypeCheck(item.val)">{{item.txt}}</div>
            </div>
            <span class="item-header">客户名称:</span>
            <div class="item-content">
              <el-input class="clientName" v-model="clientName" placeholder="请输入用户名称"></el-input>
            </div>
          </div>
          <div class="switchs-item">
            <span class="item-header">充值金额:</span>
            <div class="item-content">
              <div class="bt-item" :class="moneyArea.default===item.val?'check':''" v-for="item in moneyArea.arr" @click="moneyAreaCheck(item.val)">{{item.txt}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
        <card>
          <div slot="header">详细数据</div>
          <div slot="body">
            <div class="table-content">
              <normalTable :tableData="tableData"></normalTable>
            </div>
          </div>
        </card>
    </div>
  </section>
</template>

<script>
  import moduleHeader from 'src/views/modules/module-header'
  import card from 'src/components/card.vue'
  import normalTable from 'src/components/normal-table.vue'
  import {input} from 'element-ui'
  export default {
    name: 'big-customer-trend',
    components: {
      moduleHeader,
      card,
      normalTable,
      'el-input': input
    },
    data() {
      return {
        clientName: '',
        moneytypes: {
          default: 1,
          arr: [{
            val: 1,
            txt: '台币'
          }, {
            val: 2,
            txt: '美元'
          }]
        },
        moneyArea: {
          default: 1,
          arr: [{
            val: 1,
            txt: '全部'
          }, {
            val: 2,
            txt: '0~1000'
          }, {
            val: 3,
            txt: '1000~5000'
          }, {
            val: 4,
            txt: '5000~1万'
          }, {
            val: 5,
            txt: '1万~5万'
          }, {
            val: 6,
            txt: '5万以上'
          }]
        },
        header: {
          title: '大客户动向',
          definedContent: '',
          isShowIndex: false,
        },
        date1: moment().add(-2, 'day').format("YYYY-MM-DD"),
        date2: moment().format("YYYY-MM-DD"),
        moneytype: 1,
        pay_money: 1
      }
    },
    mounted() {
      this.query();
    },
    computed: {
      dateList() {
        return [{
          single: true,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: '',
          isShowDatetype: false,
          change: (newDate) => {
            this.date1 = newDate.startDate;
            this.query();
          }
        }]
      },
      tableData() {
        return this.$store.state.BigCustomerTrend.data
      }
    },
    methods: {
      query() {
        this.$store.dispatch('BigCustomerTrend/data', {
          dataview: this.$store.state.common.nowmenu.dataView,
          isCache: 1,
          in_date1: this.date1,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_platform: '1,2',
          username: this.clientName,
          moneytype: this.moneytype,
          pay_money: this.pay_money
        })
      },
      moneytypeCheck(val) {
        this.moneytypes.default = this.moneytype = val
      },
      moneyAreaCheck(val) {
        this.moneyArea.default = this.pay_money = val
      }
    }
  }
</script>

<style lang="scss" scoped>
  .item-content {
    margin-right: 15px;
    float: left;
    line-height: 30px;
    .bt-item {
      font-size: 15px;
      cursor: pointer;
      /* width: 100px; */
      padding: 0 15px;
      float: left;
      background-color: #fff;
      border: 1px solid #bbb;
      border-right: 0;
      text-align: center;
      &:last-child {
        border-right: 1px solid #bbb;
      }
    }
    .bt-item.check {
      font-weight: 700;
      color: #fff;
      background-color: #fc9153;
    }
  }
  
  .clientName {
    margin-left: 5px;
  }
  
  .table-content {
    overflow: auto;
    width: 100%;
    max-height: 500px;
  }
  
  .content-header {
    background: #fff;
    
  }
</style>
<style lang="scss">
  .clientName {
    input {
      line-height: 32px;
      height: 32px;
    }
  }
</style>