webpackJsonp([7],{

/***/ 1000:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".search-input[data-v-4f20df75]{font-size:13px!important;padding:0;text-align:center;height:32px;line-height:32px;width:198px}.item-group .item-header[data-v-4f20df75]{white-space:nowrap}.item-group .item-content[data-v-4f20df75]{width:calc(100% - 80px);margin-right:15px;display:flex;justify-content:flex-start;align-items:flex-start;flex-wrap:wrap;line-height:30px}.item-group .item-content .bt-item[data-v-4f20df75]{width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;padding:0 15px;margin:5px 0;float:left;background-color:#fff;border:0!important;text-align:center}.item-group .item-content .bt-item.check[data-v-4f20df75]{font-weight:700;color:#fff;background-color:#fc9153}", ""]);

// exports


/***/ }),

/***/ 1001:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, Utils) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moduleHeader = __webpack_require__(572);

var _moduleHeader2 = _interopRequireDefault(_moduleHeader);

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

var _normalTable = __webpack_require__(574);

var _normalTable2 = _interopRequireDefault(_normalTable);

var _billboard = __webpack_require__(1002);

var _billboard2 = _interopRequireDefault(_billboard);

var _windvane = __webpack_require__(1011);

var _windvane2 = _interopRequireDefault(_windvane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'time-limit-consum',
  components: {
    moduleHeader: _moduleHeader2.default, card: _card2.default, normalTable: _normalTable2.default, billboard: _billboard2.default, windvane: _windvane2.default
  },
  data: function data() {
    return {
      // date1: moment().add(-7, "day").format("YYYY-MM-DD"),
      datetype: 1,
      date1: moment().add(-1, 'day').format("YYYY-MM-DD"),

      tableData: [],
      columnData: [],
      type: 1, // 1 消费风云榜  2 消费风向标
      moneyType: 2,
      goodsType: 0,
      hotType: 0,
      searchKey: '',

      goodsTypeList: [],
      hotGoodsList: []
    };
  },
  mounted: function mounted() {
    this.query();
  },

  computed: {
    dateList: function dateList() {
      var _this = this;

      return [{
        single: true,
        uid: 'date1',
        label: '日期',
        startDate: this.date1,
        endDate: '',
        isShowDatetype: true,
        datetype: this.datetype,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;_this.query();
        }
      }];
    },
    systemId: function systemId() {
      return this.$store.state.common.systems.systemId;
    },
    currentView: function currentView() {
      if (this.type == 1) {
        return 'billboard';
      } else {
        return 'windvane';
      }
    },
    columnDataArr: function columnDataArr() {
      return {
        template_id: utils.getColumnByIndex(0, this.goodsTypeList),
        template_name: utils.getColumnByIndex(1, this.goodsTypeList),
        item_id: utils.getColumnByIndex(2, this.hotGoodsList),
        item_name: utils.getColumnByIndex(3, this.hotGoodsList)
      };
    }
  },
  methods: {
    datetypeChange: function datetypeChange(newVal) {
      this.datetype = newVal;
      if (newVal === 1) {
        this.date1 = moment().add(-1, 'day').format('YYYY-MM-DD');
      } else if (newVal === 2) {
        this.date1 = moment().add(-1, 'week').day(1).format('YYYY-MM-DD');
      } else if (newVal === 3) {
        this.date1 = moment().add(-1, 'month').date(1).format('YYYY-MM-DD');
      }
      this.query();
    },
    query: function query() {
      if (this.type == 1) {
        this.getBillBoardData();
      } else {
        this.getHotGoodsData();
      }
    },
    exportData: function exportData(obj) {
      var params = null;
      if (this.type == 1) {
        // 消费风云榜
        params = {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date1,
          in_type_id: 1, // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询
          in_money_type: this.moneyType, // 货币类型
          in_item_type: this.goodsType, // 物品分类
          in_item_id: 0, // 热销物品id
          in_item_search: this.searchKey, // 查询字符串
          in_select_id: this.datetype, // 1 日 2 周 3 月
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_shop_id: 3 // 1 为时装消费 2 为热销消费 3 为限时消费
        };
        _api2.default.user.exportData(params);
      } else {
        // 消费风向标
        params = {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date1,
          in_type_id: 3, // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询
          in_money_type: this.moneyType, // 货币类型
          in_item_type: this.goodsType, // 物品分类
          in_item_id: this.searchKey ? 0 : this.hotType, // 热销物品id
          in_item_search: this.searchKey, // 查询字符串
          in_select_id: this.datetype, // 1 日 2 周 3 月
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_shop_id: 3 // 1 为时装消费 2 为热销消费 3 为限时消费
        };
        _api2.default.user.exportData(params);
      }
    },

    // 获取消费风云榜数据 消费风云榜
    getBillBoardData: function getBillBoardData() {
      var _this2 = this;

      var params = {
        isCache: 1,
        in_date1: this.date1,
        in_date2: this.date1,
        in_type_id: 1, // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询
        in_money_type: this.moneyType, // 货币类型
        in_item_type: this.goodsType, // 物品分类
        in_item_id: 0, // 热销物品id
        in_item_search: this.searchKey, // 查询字符串
        in_select_id: this.datetype, // 1 日 2 周 3 月
        dataview: 'fn_7road_oas_shop', //this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
        in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        in_shop_id: 3 // 1 为时装消费 2 为热销消费 3 为限时消费
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.tableData = data.state[0];
          _this2.goodsTypeList = data.state[1];
        } else {
          Utils.Notification.error({ message: data.message });
          console.error(data.message);
        }
      });
    },

    // 获取热销物品数据 消费风向标
    getHotGoodsData: function getHotGoodsData() {
      var _this3 = this;

      var params = {
        isCache: 1,
        in_date1: this.date1,
        in_date2: this.date1,
        in_type_id: 2, // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询
        in_money_type: this.moneyType, // 货币类型
        in_item_type: this.goodsType, // 物品分类
        in_item_id: 0, // 热销物品id
        in_item_search: '', // 查询字符串
        in_select_id: this.datetype, // 1 日 2 周 3 月
        dataview: 'fn_7road_oas_shop', //this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
        in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        in_shop_id: 3 // 1 为时装消费 2 为热销消费 3 为限时消费
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this3.hotGoodsList = data.state[0];
          if (_this3.hotGoodsList.length > 0) {
            _this3.hotType = _this3.hotGoodsList[0][_this3.columnDataArr.item_id];
          } else {
            _this3.hotType = 0;
          }
          _this3.getWindvaneData();
        } else {
          Utils.Notification.error({ message: data.message });
          console.error(data.message);
        }
      });
    },

    // 获取消费风向标数据 消费风向标
    getWindvaneData: function getWindvaneData() {
      var _this4 = this;

      var params = {
        isCache: 1,
        in_date1: this.date1,
        in_date2: this.date1,
        in_type_id: 3, // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询
        in_money_type: this.moneyType, // 货币类型
        in_item_type: this.goodsType, // 物品分类
        in_item_id: this.searchKey ? 0 : this.hotType, // 热销物品id
        in_item_search: this.searchKey, // 查询字符串
        in_select_id: this.datetype, // 1 日 2 周 3 月
        dataview: 'fn_7road_oas_shop', //this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
        in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        in_shop_id: 3 // 1 为时装消费 2 为热销消费 3 为限时消费
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this4.tableData = data.state[0];
        } else {
          Utils.Notification.error({ message: data.message });
          console.error(data.message);
        }
      });
    }
  },
  watch: {
    type: function type(v, ov) {
      if (v != ov) {
        this.tableData = [];
        this.hotGoodsList = [];
        this.query();
      }
    },
    moneyType: function moneyType(v, ov) {
      if (v != ov) {
        this.query();
      }
    },
    goodsType: function goodsType(v, ov) {
      if (v != ov && this.type == 2) {
        this.getHotGoodsData();
      } else {
        this.getBillBoardData();
      }
    },
    hotType: function hotType(v, ov) {
      if (v != 0 && v != ov) {
        this.getWindvaneData();
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14)))

/***/ }),

/***/ 1002:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1003)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1005),
  /* template */
  __webpack_require__(1010),
  /* scopeId */
  "data-v-6253c6b3",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1003:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1004);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("587b5bfe", content, true);

/***/ }),

/***/ 1004:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1005:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chartModal = __webpack_require__(606);

var _chartModal2 = _interopRequireDefault(_chartModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'billboard',
  components: {
    chartModal: _chartModal2.default
  },
  props: ['tableData', 'type', 'moneyType', 'goodsType', 'searchKey'],
  data: function data() {
    return {
      isShowDetail: false,
      selectedItem: null,
      size: 20,
      nowpage: 1
    };
  },

  computed: {
    columnArr: function columnArr() {
      var list = [];
      if (this.tableData && this.tableData.length > 0) {
        for (var i = 0; i < this.tableData.length; i++) {
          for (var index in this.tableData[i]) {
            list.push(index);
          }
          break;
        }
      }
      return list;
    },

    // 分页后总页面
    page: function page() {
      if (this.tableDate && this.tableData.length > 0) {
        return parseInt(this.tableData.length / this.size);
      }
      return 1;
    },
    nowListData: function nowListData() {
      var _this = this;

      return this.tableData.filter(function (item, index) {
        return index > (_this.nowpage - 1) * _this.size && index < _this.nowpage * _this.size;
      });
    }
  },
  methods: {
    rowClick: function rowClick(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    showDetail: function showDetail(item) {
      this.selectedItem = {
        item_id: item[this.columnArr[0]],
        item_name: item[this.columnArr[1]]
      };
      this.isShowDetail = true;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 1006:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1007);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("37c0db0d", content, true);

/***/ }),

/***/ 1007:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".chart-group .charts[data-v-4830c7ab]{height:300px}", ""]);

// exports


/***/ }),

/***/ 1008:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, Utils, highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moduleHeader = __webpack_require__(572);

var _moduleHeader2 = _interopRequireDefault(_moduleHeader);

var _modal = __webpack_require__(580);

var _modal2 = _interopRequireDefault(_modal);

var _elementTable = __webpack_require__(573);

var _elementTable2 = _interopRequireDefault(_elementTable);

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'chartModal',
  components: {
    Modal: _modal2.default, normalTable: _elementTable2.default, moduleHeader: _moduleHeader2.default
  },
  props: ['type', 'moneyType', 'goodsType', 'searchKey', 'selectedItem'],
  data: function data() {
    return {
      datetype: 1,
      date1: moment().add(-7, 'day').format('YYYY-MM-DD'),
      date2: moment().add(-1, 'day').format('YYYY-MM-DD'),
      tableData: [],
      chartData: [],

      showType: 1
    };
  },

  computed: {
    dateList: function dateList() {
      var _this = this;

      return [{
        single: false,
        uid: 'dates',
        label: '日期',
        startDate: this.date1,
        endDate: this.date2,
        isShowDatetype: true,
        datetype: this.datetype,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;_this.date2 = newDate.endDate;_this.getChartData();
        }
      }];
    },
    modalTitle: function modalTitle() {
      if (this.type == 1) {
        return this.selectedItem.item_name + '详细数据';
      } else {
        return this.selectedItem.agent_name + '详细数据';
      }
    }
  },
  mounted: function mounted() {
    this.getChartData();
  },

  methods: {
    datetypeChange: function datetypeChange(newVal) {
      this.datetype = newVal;
      if (newVal === 1) {
        this.date1 = moment().add(-7, 'day').format('YYYY-MM-DD');
        this.date2 = moment().add(-1, 'day').format('YYYY-MM-DD');
      } else if (newVal === 2) {
        this.date1 = moment().add(-7, 'week').day(1).format('YYYY-MM-DD');
        this.date2 = moment().add(-1, 'week').day(1).format('YYYY-MM-DD');
      } else if (newVal === 3) {
        this.date1 = moment().add(-7, 'month').date(1).format('YYYY-MM-DD');
        this.date2 = moment().add(-1, 'month').date(1).format('YYYY-MM-DD');
      }
      this.getChartData();
    },
    getChartData: function getChartData() {
      var _this2 = this;

      var params = {
        isCache: 1,
        in_date1: this.date1,
        in_date2: this.date2,
        in_type_id: 4, // 1 消费风云榜查询  2 热销物品查询  3 消费风向标查询 4 查询图标明细数据
        in_money_type: this.moneyType, // 货币类型
        in_item_type: this.goodsType, // 物品分类
        in_item_id: this.type == 1 ? this.selectedItem ? this.selectedItem.item_id : 0 : 0, // 热销物品id
        in_item_search: this.searchKey, // 查询字符串
        in_select_id: this.datetype, // 1 日 2 周 3 月
        dataview: 'fn_7road_oas_shop', //this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.type == 1 ? this.$store.getters['Agent/selectedIdList'] : this.selectedItem ? this.selectedItem.agent_id.toString() : '',
        in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        in_shop_id: 3 // 1 为时装消费 2 为热销消费 3 为限时消费
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.chartData = data.state[0];
          _this2.tableData = data.state[1];
          _this2.drawChart();
        } else {
          Utils.Notification.error({ message: data.message });
          console.error(data.message);
        }
      });
    },
    drawChart: function drawChart() {
      var count_date = utils.getColumnByIndex(0, this.chartData);
      var buy_money = utils.getColumnByIndex(1, this.chartData);
      var buy_money_point = utils.getColumnByIndex(2, this.chartData);
      var buy_money_diamond = utils.getColumnByIndex(3, this.chartData);
      var buy_count = utils.getColumnByIndex(4, this.chartData);
      var buy_count_point = utils.getColumnByIndex(5, this.chartData);
      var buy_count_diamond = utils.getColumnByIndex(6, this.chartData);

      var categories = [];
      var chartSeries1 = [{
        name: buy_money,
        data: []
      }, {
        name: buy_money_point,
        data: []
      }, {
        name: buy_money_diamond,
        data: []
      }];
      var chartSeries2 = [{
        name: buy_count,
        data: []
      }, {
        name: buy_count_point,
        data: []
      }, {
        name: buy_count_diamond,
        data: []
      }];

      this.chartData.forEach(function (item) {
        categories.push(item[count_date]);
        chartSeries1[0].data.push(item[buy_money]);
        chartSeries1[1].data.push(item[buy_money_point]);
        chartSeries1[2].data.push(item[buy_money_diamond]);
        chartSeries2[0].data.push(item[buy_count]);
        chartSeries2[1].data.push(item[buy_count_point]);
        chartSeries2[2].data.push(item[buy_count_diamond]);
      });
      highchartUtil.drawChart('payMoneyChart', 'spline', categories, chartSeries1, true);
      highchartUtil.drawChart('payCountChart', 'spline', categories, chartSeries2, true);
    }
  },
  watch: {
    showType: function showType(v, ov) {
      if (v != ov) {
        this.drawChart();
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14), __webpack_require__(571)))

/***/ }),

/***/ 1009:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('Modal', {
    attrs: {
      "headerName": _vm.modalTitle,
      "width": "800"
    },
    on: {
      "close": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_c('div', {
    attrs: {
      "slot": "modal-body"
    },
    slot: "modal-body"
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "dateList": _vm.dateList
    },
    on: {
      "datetypeChange": _vm.datetypeChange
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "switch-group"
  }, [_c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("显示类型:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.showType === 1
    },
    on: {
      "click": function($event) {
        _vm.showType = 1
      }
    }
  }, [_vm._v("图形")]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.showType === 2
    },
    on: {
      "click": function($event) {
        _vm.showType = 2
      }
    }
  }, [_vm._v("表格")])])])])], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showType == 1),
      expression: "showType==1"
    }],
    staticClass: "chart-group"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "payMoneyChart"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "charts",
    attrs: {
      "id": "payCountChart"
    }
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showType == 2),
      expression: "showType==2"
    }],
    staticClass: "table-content"
  }, [_c('normalTable', {
    attrs: {
      "tableData": _vm.tableData
    }
  })], 1)])])
},staticRenderFns: []}

/***/ }),

/***/ 1010:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-table', {
    ref: "singleTable",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.tableData,
      "highlight-current-row": true,
      "max-height": "500",
      "fit": "",
      "border": ""
    },
    on: {
      "row-click": _vm.rowClick
    }
  }, _vm._l((_vm.columnArr), function(column, cindex) {
    return _c('el-table-column', {
      key: column,
      attrs: {
        "prop": column,
        "label": column
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function(scope) {
          return [(cindex == 1) ? _c('a', {
            attrs: {
              "href": "javascript:void(0)"
            },
            on: {
              "click": function($event) {
                _vm.showDetail(scope.row)
              }
            }
          }, [_vm._v(_vm._s(scope.row[column]))]) : (cindex == 2) ? _c('i', {
            class: {
              'icon-arrow up': scope.row[column] > 0, 'icon-arrow right': scope.row[column] == 0, 'icon-arrow down': scope.row[column] < 0
            }
          }) : _c('span', [_vm._v(_vm._s(scope.row[column]))])]
        }
      }])
    })
  })), _vm._v(" "), (_vm.isShowDetail) ? _c('chartModal', {
    attrs: {
      "type": _vm.type,
      "moneyType": _vm.moneyType,
      "goodsType": _vm.goodsType,
      "searchKey": _vm.searchKey,
      "selectedItem": _vm.selectedItem
    },
    on: {
      "close": function($event) {
        _vm.isShowDetail = false
      }
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1011:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1012)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1014),
  /* template */
  __webpack_require__(1015),
  /* scopeId */
  "data-v-53147134",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1012:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1013);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("c4fcc8a8", content, true);

/***/ }),

/***/ 1013:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1014:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chartModal = __webpack_require__(606);

var _chartModal2 = _interopRequireDefault(_chartModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'billboard',
  components: {
    chartModal: _chartModal2.default
  },
  props: ['tableData', 'type', 'moneyType', 'goodsType', 'searchKey'],
  data: function data() {
    return {
      isShowDetail: false,
      selectedItem: null,
      size: 20,
      nowpage: 1
    };
  },

  computed: {
    columnArr: function columnArr() {
      var list = [];
      if (this.tableData && this.tableData.length > 0) {
        for (var i = 0; i < this.tableData.length; i++) {
          for (var index in this.tableData[i]) {
            list.push(index);
          }
          break;
        }
      }
      return list;
    },

    // 分页后总页面
    page: function page() {
      if (this.tableDate && this.tableData.length > 0) {
        return parseInt(this.tableData.length / this.size);
      }
      return 1;
    },
    nowListData: function nowListData() {
      var _this = this;

      return this.tableData.filter(function (item, index) {
        return index > (_this.nowpage - 1) * _this.size && index < _this.nowpage * _this.size;
      });
    }
  },
  methods: {
    rowClick: function rowClick(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    showDetail: function showDetail(item) {
      this.selectedItem = {
        agent_id: item[this.columnArr[0]],
        agent_name: item[this.columnArr[2]]
      };
      this.isShowDetail = true;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 1015:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-table', {
    ref: "singleTable",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.tableData,
      "highlight-current-row": true,
      "max-height": "500",
      "fit": "",
      "border": ""
    },
    on: {
      "row-click": _vm.rowClick
    }
  }, _vm._l((_vm.columnArr), function(column, cindex) {
    return (cindex != 1) ? _c('el-table-column', {
      key: column,
      attrs: {
        "prop": column,
        "label": column
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function(scope) {
          return [(cindex == 2) ? _c('a', {
            attrs: {
              "href": "javascript:void(0)"
            },
            on: {
              "click": function($event) {
                _vm.showDetail(scope.row)
              }
            }
          }, [_vm._v(_vm._s(scope.row[column]))]) : (cindex == 3) ? _c('i', {
            class: {
              'icon-arrow up': scope.row[column] > 0, 'icon-arrow right': scope.row[column] == 0, 'icon-arrow down': scope.row[column] < 0
            }
          }) : _c('span', [_vm._v(_vm._s(scope.row[column]))])]
        }
      }])
    }) : _vm._e()
  })), _vm._v(" "), (_vm.isShowDetail) ? _c('chartModal', {
    attrs: {
      "type": _vm.type,
      "moneyType": _vm.moneyType,
      "goodsType": _vm.goodsType,
      "searchKey": _vm.searchKey,
      "selectedItem": _vm.selectedItem
    },
    on: {
      "close": function($event) {
        _vm.isShowDetail = false
      }
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1016:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "fashion-consum"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "dateList": _vm.dateList,
      "isShowReg": true
    },
    on: {
      "datetypeChange": _vm.datetypeChange
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "switch-group"
  }, [_c('div', {
    staticClass: "switchs-item item-group"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("货币类型:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.moneyType === 2
    },
    on: {
      "click": function($event) {
        _vm.moneyType = 2
      }
    }
  }, [_vm._v("钻石购买")]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.moneyType === 3
    },
    on: {
      "click": function($event) {
        _vm.moneyType = 3
      }
    }
  }, [_vm._v("金币购买")])])]), _vm._v(" "), _c('div', {
    staticClass: "switchs-item"
  }, [_c('div', {
    staticClass: "item-input"
  }, [_c('div', {
    staticClass: "input-group form-item search-input"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.searchKey),
      expression: "searchKey"
    }],
    staticClass: "form-control search-input",
    attrs: {
      "placeholder": "请输入物品名称或ID"
    },
    domProps: {
      "value": (_vm.searchKey)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.query($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.searchKey = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "input-group-addon",
    staticStyle: {
      "cursor": "pointer"
    },
    on: {
      "click": _vm.query
    }
  }, [_c('i', {
    staticClass: "icon-search"
  })])])])])]), _vm._v(" "), _c('div', {
    staticClass: "switch-group"
  }, [_c('div', {
    staticClass: "switchs-item item-group"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("物品分类:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.goodsType === 0
    },
    on: {
      "click": function($event) {
        _vm.goodsType = 0
      }
    }
  }, [_vm._v("全部")]), _vm._v(" "), _vm._l((_vm.goodsTypeList), function(item) {
    return _c('div', {
      staticClass: "bt-item",
      class: {
        'check': _vm.goodsType === item[_vm.columnDataArr.template_id]
      },
      attrs: {
        "title": item[_vm.columnDataArr.template_name]
      },
      on: {
        "click": function($event) {
          _vm.goodsType = item[_vm.columnDataArr.template_id]
        }
      }
    }, [_vm._v(_vm._s(item[_vm.columnDataArr.template_name]))])
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "switch-group"
  }, [(_vm.type == 2) ? _c('div', {
    staticClass: "switchs-item item-group"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("热销物品:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [(_vm.hotGoodsList.length == 0) ? _c('div', [_vm._v("无")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.hotGoodsList), function(item) {
    return _c('div', {
      staticClass: "bt-item",
      class: {
        'check': _vm.hotType === item[_vm.columnDataArr.item_id]
      },
      attrs: {
        "title": item[_vm.columnDataArr.item_name]
      },
      on: {
        "click": function($event) {
          _vm.hotType = item[_vm.columnDataArr.item_id]
        }
      }
    }, [_vm._v(_vm._s(item[_vm.columnDataArr.item_name]))])
  })], 2)]) : _vm._e()])], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v("详细数据")]), _vm._v(" "), _c('div', {
    staticClass: "tabs"
  }, [_c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 1
    },
    on: {
      "click": function($event) {
        _vm.type = 1
      }
    }
  }, [_vm._v("风云榜")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 2
    },
    on: {
      "click": function($event) {
        _vm.type = 2
      }
    }
  }, [_vm._v("风向标")])]), _vm._v(" "), _c('div', {
    staticClass: "export-link"
  }, [_c('a', {
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": _vm.exportData
    }
  }, [_c('i', {
    staticClass: "icon-download"
  }), _vm._v("导出数据")])])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "table-content"
  }, [_c(_vm.currentView, {
    tag: "component",
    attrs: {
      "type": _vm.type,
      "moneyType": _vm.moneyType,
      "searchKey": _vm.searchKey,
      "goodsType": _vm.goodsType,
      "tableData": _vm.tableData
    }
  })], 1)])])], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(999)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1001),
  /* template */
  __webpack_require__(1016),
  /* scopeId */
  "data-v-4f20df75",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 606:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1006)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1008),
  /* template */
  __webpack_require__(1009),
  /* scopeId */
  "data-v-4830c7ab",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 999:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1000);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("2fab88e7", content, true);

/***/ })

});