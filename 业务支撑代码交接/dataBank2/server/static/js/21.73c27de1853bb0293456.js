webpackJsonp([21],{

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(833)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(835),
  /* template */
  __webpack_require__(836),
  /* scopeId */
  "data-v-ba51326a",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 833:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(834);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("64aa2a72", content, true);

/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".table-content[data-v-ba51326a]{overflow:auto;width:100%;max-height:500px}.charts[data-v-ba51326a]{min-height:300px;height:300px}", ""]);

// exports


/***/ }),

/***/ 835:
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

var _utils = __webpack_require__(575);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'recharge-mode',
  components: {
    moduleHeader: _moduleHeader2.default,
    card: _card2.default,
    normalTable: _normalTable2.default
  },
  data: function data() {
    return {
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      date2: moment().format("YYYY-MM-DD"),
      tableData: [],
      columnData: []
    };
  },
  mounted: function mounted() {
    this.query();
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
        isShowDatetype: false,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.date2 = newDate.endDate;
          _this.query();
        }
      }];
    }
  },
  methods: {
    query: function query() {
      var _this2 = this;

      var params = {
        isCache: 1,
        in_date1: this.date1,
        in_date2: this.date2,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
        in_platform: '1,2'
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.tableData = data.state[0];
          _this2.columnData = data.state[1];
          _this2.drawMoneyRate();
          _this2.drawMoneyCount();
        } else {
          Utils.Notification.error({
            message: data.message
          });
          console.error(data.message);
        }
      });
    },
    drawMoneyRate: function drawMoneyRate() {
      var payway = _utils2.default.getColumnKey('payway', this.columnData);
      var pay_moneypercent = _utils2.default.getColumnKey('pay_moneypercent', this.columnData);

      var categories = [];
      var seriesData = [{
        name: pay_moneypercent,
        data: []
      }];
      this.tableData.forEach(function (item) {
        categories.push(item[payway]);
        seriesData[0].data.push(Number(item[pay_moneypercent].split('%')[0]));
      });
      highchartUtil.drawBarChart('rechargeChart1', categories, seriesData, null, true);
    },
    drawMoneyCount: function drawMoneyCount() {
      var payway = _utils2.default.getColumnKey('payway', this.columnData);
      var pay_user = _utils2.default.getColumnKey('pay_user', this.columnData);
      var paymoney = _utils2.default.getColumnKey('paymoney', this.columnData);

      var categories = [];
      var seriesData = [{
        name: pay_user,
        type: 'bar',
        data: []
      }, {
        name: paymoney,
        type: 'bar',
        data: []
      }];
      this.tableData.forEach(function (item) {
        categories.push(item[payway]);
        seriesData[0].data.push(Number(item[pay_user]));
        seriesData[1].data.push(Number(item[paymoney]));
      });
      highchartUtil.drawBarChart('rechargeChart2', categories, seriesData, null);
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14), __webpack_require__(571)))

/***/ }),

/***/ 836:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "recharge-mode"
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
  }, [_vm._v("趋势图")]), _vm._v(" "), _c('div', {
    staticClass: "row",
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "charts col-md-6 col-sm-6 col-xs-6",
    attrs: {
      "id": "rechargeChart1"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "charts col-md-6 col-sm-6 col-xs-6",
    attrs: {
      "id": "rechargeChart2"
    }
  })])]), _vm._v(" "), _c('card', [_c('div', {
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