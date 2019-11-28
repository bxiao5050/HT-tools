<template>
  <section id="recharge-order">
    <div class="content-header">
      <moduleHeader :header="header" :dateList="dateList" :payment="true"></moduleHeader>
      <div class="switchs">
        <div class="switch-group">
          <div class="switchs-item">
            <span class="item-header">订单号:</span>
            <input type="text" class="item-input" v-model="orderId" placeholder="输入订单号"></input>
          </div>
          <div class="switchs-item">
            <span class="item-header">帐号:</span>
            <input type="text" class="item-input" v-model="accountId" placeholder="输入帐号名称"></input>
          </div>
        </div>
        <div class="switch-group row">
          <label class="switchs-item">
            <input type="radio" name="ordertype" value="1" v-model="orderType">
            <span>到账订单</span>
          </label>
          <label class="switchs-item">
            <input type="radio" name="ordertype" value="2" v-model="orderType">
            <span>失败订单</span>
          </label>
          <label class="switchs-item">
            <input type="radio" name="ordertype" value="3" v-model="orderType">
            <span>待审核订单</span>
          </label>
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
  import api from 'src/services/api'
  import normalTable from 'src/components/normal-table.vue'
  export default {
    name: 'recharge-order',
    components: {
      moduleHeader,
      card,
      normalTable
    },
    data() {
      return {
        header: {
          title: '充值订单',
          definedContent: '',
          isShowIndex: true,
        },
        date1: moment().add(-1, "day").format("YYYY-MM-DD"),
        date2: moment().format("YYYY-MM-DD"),
        orderId: "",
        accountId: "",
        payType: 0,
        regType: 0,

        orderType: 1,
        tableData: [],
      }
    },
    mounted() {
      this.query();
    },
    computed: {
      dateList() {
        return [{
          single: false,
          uid: 'date1',
          label: '日期',
          startDate: this.date1,
          endDate: this.date2,
          isShowDatetype: false,
          change: (newDate) => {
            this.date1 = newDate.startDate;
            this.date2 = newDate.endDate;
            this.query();
          }
        }]
      }
    },
    methods: {
      query() {
        var params = {
          in_date1: this.date1,
          in_date2: this.date2,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_platform: '1,2',
          user_id: this.orderId,
          username: this.accountId,
          pay_channel: this.$store.getters['PayChannel/selectedIdList'],
          reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          is_success: this.orderType,
          isCache: 1,
        }
        api.user.getQuery(params).then((data) => {
          if (data.code == 401) {
            this.tableData = data.state[0];
          } else {
            Utils.Notification.error({
              message: data.message
            })
          }
        })
      }
    },
    watch: {
      orderType(v, ov) {
        if (v != ov) {
          this.query();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .item-content {
      float: left;
      line-height: 30px;
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: center;
      .bt-item {
        padding: 0 10px;
        -webkit-box-flex: 1;
        background-color: #FFF;
        border: 1px solid #bbb;
        text-align: center;
        white-space: nowrap;
      }
      .bt-item.check {
        background-color: orange;
      }
    }
      .table-content {
        overflow: auto;
        width: 100%;
        max-height: 500px;
      }
  
  .charts {
    min-height: 300px;
    height: 300px;
  }
  
  .switchs,
  .switch-group,
  .switchs-item {
    font-size: 15px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-shrink: 0;
    flex-wrap: wrap;
  }
  
  .switchs {
    margin-left: 3px;
    .switch-group.row {
      width: 100%;
      .switchs-item {
        margin: 15px -5px 0 26px;
      }
    }
    .switchs-item {
      margin: 0;
      flex-shrink: 0;
      .item-header {
        flex-shrink: 0;
        margin: 0 10px 0 8px;
      }
    }
  }
</style>