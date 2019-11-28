webpackJsonp([30],{

/***/ 1017:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1018);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("34d91ad1", content, true);

/***/ }),

/***/ 1018:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".chart-group-row[data-v-5fe65504]{width:100%;height:100%}.chart-group-row .chart-item[data-v-5fe65504]{width:33%;height:100%;display:inline-block;position:relative;padding-bottom:40px}.chart-group-row .chart-item .charts[data-v-5fe65504]{width:100%;height:400px}.chart-group-row .chart-item .chart-desc[data-v-5fe65504]{width:100px;background-color:#f2f2f2;border:1px solid #d7d7d7;padding:5px 10px;border-radius:3px;position:absolute;left:50%;transform:translateX(-50%)}.chart-nodata[data-v-5fe65504]{text-align:center;color:#5e7382}", ""]);

// exports


/***/ }),

/***/ 1019:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moduleHeader = __webpack_require__(572);

var _moduleHeader2 = _interopRequireDefault(_moduleHeader);

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

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
//
//
//
//
//
//
//

exports.default = {
  name: "pay-hot-plant",
  components: {
    // datepicker,
    moduleHeader: _moduleHeader2.default,
    card: _card2.default,
    normalTable: _elementTable2.default
  },
  data: function data() {
    return {
      datetype: 1,
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),

      tableData: []
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
        uid: "date1",
        label: "日期",
        startDate: this.date1,
        endDate: "",
        isShowDatetype: true,
        datetype: this.datetype,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.query();
        }
      }];
    },
    systemId: function systemId() {
      return this.$store.state.common.systems.systemId;
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
        this.date1 = moment().add(-1, "day").format("YYYY-MM-DD");
      } else if (newVal === 2) {
        this.date1 = moment().add(-1, "week").day(1).format("YYYY-MM-DD");
      } else if (newVal === 3) {
        this.date1 = moment().add(-1, "month").date(1).format("YYYY-MM-DD");
      }
      this.query();
    },
    query: function query() {
      var _this2 = this;

      var params = {
        isCache: 1,
        in_date1: this.date1,
        in_select_id: this.datetype, // 1 日 2 周 3 月
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters["Agent/selectedIdList"],
        in_reg_channel: this.$store.getters["RegChannel/selectedIdList"],
        in_os: this.$store.getters["OS/nowOS"]
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.tableData = data.state[0];
          _this2.drawChart();
        } else {
          _this2.$notify.error({
            message: data.message
          });
        }
      });
    },
    exportData: function exportData() {
      var params = {
        isCache: 1,
        in_date1: this.date1,
        in_select_id: this.datetype, // 1 日 2 周 3 月
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters["Agent/selectedIdList"],
        in_reg_channel: this.$store.getters["RegChannel/selectedIdList"],
        in_os: this.$store.getters["OS/nowOS"]
      };
      _api2.default.user.exportData(params);
    },
    drawChart: function drawChart() {
      this.drawChart1();
      this.drawChart2();
      this.drawChart3();
    },
    drawChart1: function drawChart1() {
      // 第一个饼图
      var payrange = utils.getColumnByIndex(0, this.tableData); // 消费区间
      var paycount = utils.getColumnByIndex(2, this.tableData); // 消费人数
      var pieData = [{
        name: "消费人数分布",
        data: []
      }];
      this.tableData.forEach(function (item) {
        console.log();
        pieData[0].data.push([item[payrange], Number(item[paycount].replace(/,/g, ''))]);
      });
      highchartUtil.drawPieChart("hotPayChart1", pieData);
    },
    drawChart2: function drawChart2() {
      // 第二个饼图
      var payrange = utils.getColumnByIndex(0, this.tableData); // 消费区间
      var paytotal = utils.getColumnByIndex(1, this.tableData); // 消费总额
      var pieData = [{
        name: "消费总额分布",
        data: []
      }];
      this.tableData.forEach(function (item) {
        pieData[0].data.push([item[payrange], Number(item[paytotal].replace(/,/g, ''))]);
      });
      highchartUtil.drawPieChart("hotPayChart2", pieData);
    },
    drawChart3: function drawChart3() {
      var payrange = utils.getColumnByIndex(0, this.tableData); // 消费区间
      var percentpay = utils.getColumnByIndex(3, this.tableData); // 消费总额
      var categories = [];
      var seriesData = [{
        name: percentpay,
        data: []
      }];
      this.tableData.forEach(function (item) {
        categories.push(item[payrange]);
        seriesData[0].data.push(Number(item[percentpay].replace(/,/g, '')));
      });
      highchartUtil.drawChart("hotPayChart3", "column", categories, seriesData);
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(571)))

/***/ }),

/***/ 1020:
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
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v("关键指标")])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.tableData.length > 0),
      expression: "tableData.length>0"
    }],
    staticClass: "chart-group-row"
  }, [_c('div', {
    staticClass: "chart-item"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "hotPayChart1"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "chart-desc"
  }, [_c('span', [_vm._v("消费人数分布")])])]), _vm._v(" "), _c('div', {
    staticClass: "chart-item"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "hotPayChart2"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "chart-desc"
  }, [_c('span', [_vm._v("消费总额分布")])])]), _vm._v(" "), _c('div', {
    staticClass: "chart-item"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "hotPayChart3"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "chart-desc"
  }, [_c('span', [_vm._v("人均消费分布")])])])]), _vm._v(" "), (_vm.tableData.length == 0) ? _c('div', {
    staticClass: "chart-nodata"
  }, [_vm._v("暂无数据")]) : _vm._e()])]), _vm._v(" "), _c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v("详细数据")]), _vm._v(" "), _c('div', {
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
  })], 1)])])], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1017)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1019),
  /* template */
  __webpack_require__(1020),
  /* scopeId */
  "data-v-5fe65504",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

});