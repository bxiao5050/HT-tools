webpackJsonp([12],{

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(819)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(821),
  /* template */
  __webpack_require__(832),
  /* scopeId */
  "data-v-95a994ac",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 819:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(820);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("12346d86", content, true);

/***/ }),

/***/ 820:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".key-index-group[data-v-95a994ac]{display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;line-height:40px}.key-index-group .key-index-item[data-v-95a994ac]{-webkit-box-flex:1;border-right:1px solid #bbb;text-align:center}.key-index-group .key-index-item .item-middle[data-v-95a994ac]{font-weight:700;vertical-align:middle}.key-index-group .key-index-item .item-middle .item-add-rate[data-v-95a994ac]{font-size:12px;font-weight:200;color:red;vertical-align:super}.key-index-group .key-index-item[data-v-95a994ac]:last-child{border:0}.recharge-chart-group[data-v-95a994ac]{width:100%}.recharge-chart-group .chart-comb[data-v-95a994ac]{width:100%;height:auto}.table-content[data-v-95a994ac]{width:100%;max-height:500px;overflow:auto;white-space:nowrap}", ""]);

// exports


/***/ }),

/***/ 821:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, Utils, highchartUtil) {

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

var _chartPayCount = __webpack_require__(822);

var _chartPayCount2 = _interopRequireDefault(_chartPayCount);

var _chartPayMoney = __webpack_require__(827);

var _chartPayMoney2 = _interopRequireDefault(_chartPayMoney);

var _utils = __webpack_require__(575);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'area-analysis',
  components: {
    card: _card2.default, moduleHeader: _moduleHeader2.default, normalTable: _normalTable2.default, chartPayCount: _chartPayCount2.default, chartPayMoney: _chartPayMoney2.default
  },
  data: function data() {
    return {
      date1: moment().add(-2, "day").format("YYYY-MM-DD"),
      date2: moment().format("YYYY-MM-DD"),
      nowTime: '',
      type: 0,
      tableData: [],
      columnData: [] //表格列名数据
    };
  },

  computed: {
    dateList: function dateList() {
      var _this = this;

      return [{
        single: false,
        uid: 'date1',
        label: '日期',
        startDate: this.date1,
        endDate: this.date2,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;_this.date2 = newDate.endDate;_this.query();
        }
      }];
    }
  },
  mounted: function mounted() {
    this.query();
  },

  methods: {
    query: function query() {
      var _this2 = this;

      var params = {
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date1: this.date1,
        in_date2: this.date2,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
        in_platform: '1,2',
        isCache: 1
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.tableData = data.state[0];
          _this2.columnData = data.state[1] ? data.state[1] : [];
          _this2.drawChart();
          _this2.initRechargeData();
        } else {
          Utils.Notification.error({ message: data.message });
          console.error(data.message);
        }
      });
    },
    drawChart: function drawChart() {
      var reg_count = _utils2.default.getColumnKey('reg_count', this.columnData);
      var login_count = _utils2.default.getColumnKey('login_count', this.columnData);
      var country = _utils2.default.getColumnKey('country', this.columnData);
      var categories = [];
      var seriesData = [{ name: reg_count, data: [] }, { name: login_count, data: [] }];
      this.tableData.forEach(function (item) {
        categories.push(item[country]);
        seriesData[0].data.push(Number(-item[reg_count]));
        seriesData[1].data.push(Number(item[login_count]));
      });
      highchartUtil.drawOppositeBar("areaChart", categories, seriesData);
    },
    initRechargeData: function initRechargeData() {
      this.$refs.countChart.drawChart();
      this.$refs.moneyChart.drawChart();
    }
  },
  watch: {
    type: function type(v, ov) {
      if (v != ov) {
        if (v == 0) {
          this.drawChart();
        } else if (v == 1) {
          this.initRechargeData();
        }
      }
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14), __webpack_require__(571)))

/***/ }),

/***/ 822:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(823)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(825),
  /* template */
  __webpack_require__(826),
  /* scopeId */
  "data-v-39d59d38",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 823:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(824);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("350de484", content, true);

/***/ }),

/***/ 824:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".chart-group[data-v-39d59d38]{padding:10px}.chart-group .charts[data-v-39d59d38]{min-height:300px;height:300px}", ""]);

// exports


/***/ }),

/***/ 825:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(575);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ['pieUid', 'barUid', 'chartData', 'columnData'],
  methods: {
    drawChart: function drawChart() {
      var _this = this;

      var country = _utils2.default.getColumnKey('country', this.columnData);
      var pay_count = _utils2.default.getColumnKey('pay_count', this.columnData);
      var bigpaycount = _utils2.default.getColumnKey('bigpaycount', this.columnData);
      var midbigpaycount = _utils2.default.getColumnKey('midbigpaycount', this.columnData);
      var minpaycount = _utils2.default.getColumnKey('minpaycount', this.columnData);
      var litmidpaycount = _utils2.default.getColumnKey('litmidpaycount', this.columnData);
      var litpaycount = _utils2.default.getColumnKey('litpaycount', this.columnData);

      var pSeriesData = [{
        name: pay_count,
        type: 'pie',
        data: [],
        barTitle: '111',
        barCate: [],
        barData: []
      }];
      this.chartData.forEach(function (item) {
        pSeriesData[0].barCate.push(item[country]);
        pSeriesData[0].data.push([item[country], Number(item[pay_count])]); //饼图数据

        pSeriesData[0].barCate = [bigpaycount, midbigpaycount, minpaycount, litmidpaycount, litpaycount];
        var barArr = pSeriesData[0].barData;
        barArr.push({
          barTitle: item[country],
          data: [{
            name: pay_count,
            type: 'bar',
            data: [Number(item[bigpaycount]), Number(item[midbigpaycount]), Number(item[minpaycount]), Number(item[litmidpaycount]), Number(item[litpaycount])]
          }]
        });
      });
      var pieEvent = function pieEvent(e) {
        // console.log(e)
        var select_name = e.point.name;
        var barTitle = ""; //e.point.series.options.barData.barTitle;//+"各充值区间充值人数";
        var barCate = e.point.series.options.barCate;
        var barData = e.point.series.options.barData;
        var barSeriesData = [];
        barData.forEach(function (item) {
          if (item.barTitle == select_name) {
            barTitle = item.barTitle + "-各充值区间充值人数";
            barSeriesData = item.data;
          }
        });
        highchartUtil.drawBarChart(_this.barUid, barCate, barSeriesData, barTitle);
      };
      highchartUtil.drawPieChart(this.pieUid, pSeriesData, pieEvent);
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler: function handler(v, ov) {
        if (v != ov) {
          this.drawChart();
        }
      }
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(571)))

/***/ }),

/***/ 826:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "chart-group"
  }, [_c('h6', [_vm._v("各地区充值人数分布")]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "charts col-md-6 col-sm-6 col-xs-6",
    attrs: {
      "id": _vm.pieUid
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "charts col-md-6 col-sm-6 col-xs-6",
    attrs: {
      "id": _vm.barUid
    }
  })])])
},staticRenderFns: []}

/***/ }),

/***/ 827:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(828)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(830),
  /* template */
  __webpack_require__(831),
  /* scopeId */
  "data-v-2c60c095",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 828:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(829);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("0ba31040", content, true);

/***/ }),

/***/ 829:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".chart-group[data-v-2c60c095]{padding:10px}.chart-group .charts[data-v-2c60c095]{min-height:300px;height:300px}", ""]);

// exports


/***/ }),

/***/ 830:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(575);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ['pieUid', 'barUid', 'chartData', 'columnData'],
  methods: {
    drawChart: function drawChart() {
      var _this = this;

      var country = _utils2.default.getColumnKey('country', this.columnData);
      var pay_money = _utils2.default.getColumnKey('pay_money', this.columnData);
      var bigpaymoney = _utils2.default.getColumnKey('bigpaymoney', this.columnData);
      var minbigpaymoney = _utils2.default.getColumnKey('minbigpaymoney', this.columnData);
      var midpaymoney = _utils2.default.getColumnKey('midpaymoney', this.columnData);
      var litmidpaymoney = _utils2.default.getColumnKey('litmidpaymoney', this.columnData);
      var litpaymoney = _utils2.default.getColumnKey('litpaymoney', this.columnData);
      var pSeriesData = [{
        name: pay_money,
        type: 'pie',
        data: [],
        barTitle: '111',
        barCate: [],
        barData: []
      }];
      this.chartData.forEach(function (item) {
        pSeriesData[0].barCate.push(item[country]);
        pSeriesData[0].data.push([item[country], Number(item[pay_money])]); //饼图数据

        pSeriesData[0].barCate = [bigpaymoney, minbigpaymoney, midpaymoney, litmidpaymoney, litpaymoney];
        var barArr = pSeriesData[0].barData;
        barArr.push({
          barTitle: item[country],
          data: [{
            name: pay_money,
            type: 'bar',
            data: [Number(item[bigpaymoney]), Number(item[minbigpaymoney]), Number(item[midpaymoney]), Number(item[litmidpaymoney]), Number(item[litpaymoney])]
          }]
        });
      });
      var pieEvent = function pieEvent(e) {
        var select_name = e.point.name;
        var barTitle = ""; //e.point.series.options.barData.barTitle;//+"各充值区间充值人数";
        var barCate = e.point.series.options.barCate;
        var barData = e.point.series.options.barData;
        var barSeriesData = [];
        barData.forEach(function (item) {
          if (item.barTitle == select_name) {
            barTitle = item.barTitle + "-各充值区间充值金额";
            barSeriesData = item.data;
          }
        });
        highchartUtil.drawBarChart(_this.barUid, barCate, barSeriesData, barTitle);
      };
      highchartUtil.drawPieChart(this.pieUid, pSeriesData, pieEvent);
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler: function handler(v, ov) {
        if (v != ov) {
          this.drawChart();
        }
      }
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(571)))

/***/ }),

/***/ 831:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "chart-group"
  }, [_c('h6', [_vm._v("各地区充值金额分布")]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "charts col-md-6 col-sm-6 col-xs-6",
    attrs: {
      "id": _vm.pieUid
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "charts col-md-6 col-sm-6 col-xs-6",
    attrs: {
      "id": _vm.barUid
    }
  })])])
},staticRenderFns: []}

/***/ }),

/***/ 832:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "area-analysis"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "dateList": _vm.dateList
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v("关键指标分析")]), _vm._v(" "), _c('div', {
    staticClass: "tabs"
  }, [_c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 0
    },
    on: {
      "click": function($event) {
        _vm.type = 0
      }
    }
  }, [_vm._v("新老用户")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 1
    },
    on: {
      "click": function($event) {
        _vm.type = 1
      }
    }
  }, [_vm._v("充值数据")])])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.type == 0),
      expression: "type==0"
    }],
    staticClass: "charts",
    attrs: {
      "id": "areaChart"
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.type == 1),
      expression: "type==1"
    }],
    staticClass: "recharge-chart-group"
  }, [_c('chartPayCount', {
    ref: "countChart",
    attrs: {
      "pieUid": "rechargeCountPie",
      "barUid": "rechargeCountBar",
      "chartData": _vm.tableData,
      "columnData": _vm.columnData
    }
  }), _vm._v(" "), _c('chartPayMoney', {
    ref: "moneyChart",
    attrs: {
      "pieUid": "rechargeMoneyPie",
      "barUid": "rechargeMoneyBar",
      "chartData": _vm.tableData,
      "columnData": _vm.columnData
    }
  })], 1)])]), _vm._v(" "), _c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v("详细数据")]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "table-content"
  }, [_c('normalTable', {
    attrs: {
      "tableData": _vm.tableData
    }
  })], 1)])])], 1)])
},staticRenderFns: []}

/***/ })

});