<template>
  <section id="fashion-consum">
    <div class="content-header">
      <moduleHeader :dateList="dateList" :isShowReg="true" @datetypeChange="datetypeChange"></moduleHeader>
      <div class="switch-group">
        <div class="switchs-item item-group">
          <span class="item-header">货币类型:</span>
          <div class="item-content">
            <div class="bt-item" :class="{'check':moneyType===1}" @click="moneyType=1">点券购买</div>
            <div class="bt-item" :class="{'check':moneyType===2}" @click="moneyType=2">钻石购买</div>
          </div>
        </div>
        <div class="switchs-item">
          <div class="item-input">
            <!-- <input class="form-control search-input" v-model="searchKey" @keyup.enter="query" placeholder="请输入物品名称或ID" /> -->
            <div class="input-group form-item search-input">
        <input class="form-control search-input" v-model="searchKey" @keyup.enter="query" placeholder="请输入物品名称或ID" />
        <span class="input-group-addon" @click="query" style="cursor:pointer;">
          <i class="icon-search"></i>
        </span>
        </div>
          </div>
        </div>
      </div>
      <div class="switch-group">
        <div class="switchs-item item-group">
          <span class="item-header">物品分类:</span>
          <div class="item-content">
            <div class="bt-item" :class="{'check':goodsType===0}" @click="goodsType=0">全部</div>
            <div class="bt-item" v-for="item in goodsTypeList" :class="{'check':goodsType===item[columnDataArr.template_id]}" @click="goodsType=item[columnDataArr.template_id]" :title="item[columnDataArr.template_name]">{{item[columnDataArr.template_name]}}</div>
          </div>
        </div>
      </div>
      <div class="switch-group">
        <div class="switchs-item item-group" v-if="type==2">
          <span class="item-header">热销物品:</span>
          <div class="item-content">
            <div v-if="hotGoodsList.length==0">无</div>
            <div class="bt-item" v-for="item in hotGoodsList" :class="{'check':hotType===item[columnDataArr.item_id]}" @click="hotType=item[columnDataArr.item_id]" :title="item[columnDataArr.item_name]">{{item[columnDataArr.item_name]}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <card>
        <div slot="header">
          <div class="card-header-title">详细数据</div>
          <div class="tabs">
            <div class="tab-item" :class="{'active':type==1}" @click="type=1">风云榜</div>
            <div class="tab-item" :class="{'active':type==2}" @click="type=2">风向标</div>
          </div>
          <div class="export-link">
            <a href="javascript:void(0)" @click="exportData"><i class="icon-download"></i>导出数据</a>
          </div>
        </div>
        <div slot="body">
          <div class="table-content">
            <component :is="currentView" :type="type" :moneyType="moneyType" :searchKey="searchKey" :goodsType="goodsType" :tableData="tableData"></component>
            <!-- <normalTable :tableData="tableData"></normalTable> -->
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
  import billboard from './components/billboard.vue'
  import windvane from './components/windvane.vue'
  export default {
    name: 'hot-consum',
    components: {
      moduleHeader, card, normalTable, billboard, windvane
    },
    data() {
      return {
        datetype: 1,
        date1: moment().add(-1,'day').format("YYYY-MM-DD"),
        tableData: [],
        columnData: [],
        type: 1,  // 1 消费风云榜  2 消费风向标
        moneyType: 1,
        goodsType: 0,
        hotType: 0,
        searchKey: '',
        goodsTypeList: [],
        hotGoodsList: []
      }
    },
    mounted() {
      this.query()
    },
    computed: {
      dateList() {
        return [
          {
            single: true,
            uid: 'date1',
            label: '日期',
            startDate: this.date1,
            endDate: '',
            isShowDatetype: true,
            datetype: this.datetype,
            change: (newDate) => { this.date1 = newDate.startDate; this.query(); }
          }]
      },
      systemId() {
        return this.$store.state.common.systems.systemId;
      },
      currentView() {
        if (this.type == 1) {
          return 'billboard'
        } else {
          return 'windvane'
        }
      },
      columnDataArr() {
        return {
          template_id: utils.getColumnByIndex(0, this.goodsTypeList),
          template_name: utils.getColumnByIndex(1, this.goodsTypeList),
          item_id: utils.getColumnByIndex(2, this.hotGoodsList),
          item_name: utils.getColumnByIndex(3, this.hotGoodsList),
        }
      }
    },
    methods: {
      datetypeChange(newVal) {
        this.datetype = newVal
        if (newVal === 1) {
          this.date1 = moment().add(-1, 'day').format('YYYY-MM-DD')
        } else if (newVal === 2) {
          this.date1 = moment().add(-1, 'week').day(1).format('YYYY-MM-DD')
        } else if (newVal === 3) {
          this.date1 = moment().add(-1, 'month').date(1).format('YYYY-MM-DD')
        }
        this.query()
      },
      query() {
        if (this.type == 1) {
          this.getBillBoardData()
        } else {
          this.getHotGoodsData()
        }
      },
       exportData(obj){
      let params = null
      if (this.type == 1) { // 消费风云榜
        params={
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date1,
          in_type_id: 1,  // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询
          in_money_type: this.moneyType,  // 货币类型
          in_item_type: this.goodsType,  // 物品分类
          in_item_id: 0,  // 热销物品id
          in_item_search: this.searchKey,  // 查询字符串
          in_select_id: this.datetype,  // 1 日 2 周 3 月
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_shop_id:2, // 1 为时装消费 2 为热销消费 3 为限时消费
        }
          api.user.exportData(params)
        } else { // 消费风向标
          params = {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date1,
          in_type_id: 3,  // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询
          in_money_type: this.moneyType,  // 货币类型
          in_item_type: this.goodsType,  // 物品分类
          in_item_id: this.searchKey ? 0 : this.hotType,  // 热销物品id
          in_item_search: this.searchKey,  // 查询字符串
          in_select_id: this.datetype,  // 1 日 2 周 3 月
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_shop_id:2, // 1 为时装消费 2 为热销消费 3 为限时消费
        }
          api.user.exportData(params)
        }
      },
      // 获取消费风云榜数据 消费风云榜
      getBillBoardData() {
        let params = {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date1,
          in_type_id: 1,  // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询
          in_money_type: this.moneyType,  // 货币类型
          in_item_type: this.goodsType,  // 物品分类
          in_item_id: 0,  // 热销物品id
          in_item_search: this.searchKey,  // 查询字符串
          in_select_id: this.datetype,  // 1 日 2 周 3 月
          dataview: 'fn_7road_oas_shop',//this.$store.state.common.nowmenu.dataView,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_shop_id:2, // 1 为时装消费 2 为热销消费 3 为限时消费
        }
        api.user.getQuery(params).then((data) => {
          if (data.code == 401) {
            this.tableData = data.state[0]
            this.goodsTypeList = data.state[1]
          }
          else {
            Utils.Notification.error({ message: data.message })
            console.error(data.message);
          }
        })
      },
      // 获取热销物品数据 消费风向标
      getHotGoodsData() {
        let params = {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date1,
          in_type_id: 2,  // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询
          in_money_type: this.moneyType,  // 货币类型
          in_item_type: this.goodsType,  // 物品分类
          in_item_id: 0,  // 热销物品id
          in_item_search: '',  // 查询字符串
          in_select_id: this.datetype,  // 1 日 2 周 3 月
          dataview: 'fn_7road_oas_shop',//this.$store.state.common.nowmenu.dataView,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_shop_id:2, // 1 为时装消费 2 为热销消费 3 为限时消费
        }
        api.user.getQuery(params).then((data) => {
          if (data.code == 401) {
            this.hotGoodsList = data.state[0]
            if (this.hotGoodsList.length > 0) {
              this.hotType = this.hotGoodsList[0][this.columnDataArr.item_id]
            } else {
              this.hotType = 0
            }
            this.getWindvaneData()
          }
          else {
            Utils.Notification.error({ message: data.message })
            console.error(data.message);
          }
        })
      },
      // 获取消费风向标数据 消费风向标
      getWindvaneData() {
        let params = {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date1,
          in_type_id: 3,  // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询
          in_money_type: this.moneyType,  // 货币类型
          in_item_type: this.goodsType,  // 物品分类
          in_item_id: this.searchKey ? 0 : this.hotType,  // 热销物品id
          in_item_search: this.searchKey,  // 查询字符串
          in_select_id: this.datetype,  // 1 日 2 周 3 月
          dataview: 'fn_7road_oas_shop',//this.$store.state.common.nowmenu.dataView,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_shop_id:2, // 1 为时装消费 2 为热销消费 3 为限时消费
        }
        api.user.getQuery(params).then((data) => {
          if (data.code == 401) {
            this.tableData = data.state[0]
          }
          else {
            Utils.Notification.error({ message: data.message })
            console.error(data.message);
          }
        })
      }
    },
    watch: {
      type(v, ov) {
        if (v != ov) {
          this.tableData = []
          this.hotGoodsList = []
          this.query()
        }
      },
      moneyType(v, ov) {
        if (v != ov) {
          this.query()
        }
      },
      goodsType(v, ov) {
        if (v != ov && this.type == 2) {
          this.getHotGoodsData()
        } else {
          this.getBillBoardData()
        }
      },
      hotType(v, ov) {
        if (v != 0 && v != ov) {
          this.getWindvaneData()
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .search-input {
    font-size: 13px !important;
    padding: 0;
    text-align: center;
    height: 32px;
    line-height: 32px;
    width: 198px;
  }

  .item-group {
    .item-header {
      /* width: 80px; */
      white-space: nowrap;
    }
    .item-content {
      width: calc(100% - 80px);
      margin-right: 15px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      line-height: 30px;
      .bt-item {
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        padding: 0 15px;
        margin:5px 0;
        float: left;
        background-color: #fff;
        /* border: 1px solid #bbb; */
        border:0!important;
        text-align: center;
        /* &:last-child { */
          /* border-right: 1px solid #bbb; */
        /* } */
      }
      .bt-item.check {
        font-weight: 700;
        color: #fff;
        background-color: #fc9153;
      }
    }
  }

  // .table-content {
  //   overflow: auto;
  //   width: 100%;
  //   max-height: 400px;
  //   white-space: nowrap;
  // }
</style>