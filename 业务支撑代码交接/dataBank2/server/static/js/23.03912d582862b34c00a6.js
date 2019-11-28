webpackJsonp([23],{

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(837)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(839),
  /* template */
  __webpack_require__(840),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 837:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(838);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("014a1be1", content, true);

/***/ }),

/***/ 838:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 839:
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

var _elementTable = __webpack_require__(573);

var _elementTable2 = _interopRequireDefault(_elementTable);

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
  components: {
    moduleHeader: _moduleHeader2.default, card: _card2.default, normalTable: _elementTable2.default
  },
  data: function data() {
    return {
      datetype: 1,
      date1: moment().add(-7, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      tableData: [],
      type: 1
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
        isShowDatetype: true,
        datetype: this.datetype,
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
    datetypeChange: function datetypeChange(newVal) {
      this.datetype = newVal;
      if (newVal == 1) {
        this.date1 = moment().add(-7, "day").format('YYYY-MM-DD');
        this.date2 = moment().add(-1, "day").format('YYYY-MM-DD');
      } else if (newVal == 2) {
        this.date1 = moment().add(-7, "week").day(1).format('YYYY-MM-DD');
        this.date2 = moment().add(-1, "week").day(7).format('YYYY-MM-DD');
      } else if (newVal == 3) {
        this.date1 = moment().add(-7, "month").date(1).format('YYYY-MM-DD');
        this.date2 = moment().date(1).add(-1, 'day').format('YYYY-MM-DD');
      }
      this.query();
    },
    getParams: function getParams() {
      return {
        isCache: 1,
        in_date1: this.date1,
        in_date2: this.date2,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_pay_channel: this.$store.getters['PayChannel/selectedIdList'],
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        in_type: this.type,
        in_select_id: this.datetype
      };
    },
    query: function query() {
      var _this2 = this;

      var params = this.getParams();
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.tableData = data.state[0];
          _this2.columnData = data.state[1] ? data.state[1] : [];
          _this2.drawChart();
        } else {
          // console.log(data)
          Utils.Notification.error({ message: data.message });
        }
      });
    },
    exportData: function exportData() {
      var params = this.getParams();
      _api2.default.user.exportData(params);
    },
    drawChart: function drawChart() {
      var template_name = utils.getColumnByIndex(0, this.tableData);
      var user_count = utils.getColumnByIndex(1, this.tableData);
      var pay_money = utils.getColumnByIndex(2, this.tableData);
      var arpu = utils.getColumnByIndex(3, this.tableData);
      var categories = [];
      var seriesData = [{ name: user_count, data: [] }, { name: pay_money, data: [] }, { name: arpu, data: [] }];
      this.tableData.forEach(function (item) {
        categories.push(item[template_name]);
        seriesData[0].data.push(Number(item[user_count].replace(/,/g, '')));
        seriesData[1].data.push(Number(item[pay_money].replace(/,/g, '')));
        seriesData[2].data.push(Number(item[arpu].replace(/,/g, '')));
      });
      highchartUtil.drawChart('firstPayChart', 'spline', categories, seriesData, true);
    }
  },
  watch: {
    type: function type(v, ov) {
      if (v != ov) {
        this.query();
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14), __webpack_require__(571)))

/***/ }),

/***/ 840:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "first-pay"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "isShowReg": true,
      "isShowPay": true,
      "dateList": _vm.dateList
    },
    on: {
      "datetypeChange": _vm.datetypeChange
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c('div', {
    staticClass: "card-box"
  }, [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v("关键指标数据")]), _vm._v(" "), _c('div', {
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
  }, [_vm._v("按等级")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 2
    },
    on: {
      "click": function($event) {
        _vm.type = 2
      }
    }
  }, [_vm._v("按充值区间")])])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "firstPayChart"
    }
  })])])], 1), _vm._v(" "), _c('div', {
    staticClass: "card-box"
  }, [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v(_vm._s(_vm.$t('common.DataDetails')))]), _vm._v(" "), _c('div', {
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
  }, [_c('normalTable', {
    attrs: {
      "tableData": _vm.tableData
    }
  })], 1)])])], 1)])])
},staticRenderFns: []}

/***/ })

});