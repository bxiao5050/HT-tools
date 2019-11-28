webpackJsonp([16],{

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(949)
__webpack_require__(951)
__webpack_require__(953)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(955),
  /* template */
  __webpack_require__(956),
  /* scopeId */
  "data-v-2aad861d",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 949:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(950);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("23207ca1", content, true);

/***/ }),

/***/ 950:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".table-content .detail-column{color:#333;border:1px solid #bbb;border-radius:3px;background-color:#eee;padding:3px 5px;text-decoration:none}.table-content .detail-column:hover{background-color:#ddd}.table-content .detail-column:active{background-color:#ccc}", ""]);

// exports


/***/ }),

/***/ 951:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(952);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("0b97905a", content, true);

/***/ }),

/***/ 952:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".item-content[data-v-2aad861d]{float:left;line-height:30px;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center}.item-content .bt-item[data-v-2aad861d]{padding:0 10px;-webkit-box-flex:1;background-color:#fff;border:1px solid #bbb;text-align:center;white-space:nowrap}.item-content .bt-item.check[data-v-2aad861d]{background-color:orange}.table-content[data-v-2aad861d]{overflow:auto;width:100%;max-height:500px;white-space:nowrap}.chartDesc[data-v-2aad861d]{text-align:center}.chart-body[data-v-2aad861d]{position:relative}.chart-body .charts[data-v-2aad861d]{float:left;width:65%;margin-bottom:16px}.chart-body .charts[data-v-2aad861d]:first-child{width:35%}.dayselect[data-v-2aad861d]{display:flex;margin-left:15px}.dayselect .el-select[data-v-2aad861d]{width:138px!important}.dayselect .btn-primary[data-v-2aad861d]{cursor:pointer;line-height:32px;margin-left:15px;width:54px;border-radius:3px;text-align:center;font-size:14px;font-weight:700}li.el-select-dropdown__item[data-v-2aad861d]{text-align:center!important}", ""]);

// exports


/***/ }),

/***/ 953:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(954);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("3247e042", content, true);

/***/ }),

/***/ 954:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".dayselect .el-input input{height:32px;border-radius:0}", ""]);

// exports


/***/ }),

/***/ 955:
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

var _highcharts = __webpack_require__(269);

var _highcharts2 = _interopRequireDefault(_highcharts);

var _utils = __webpack_require__(575);

var _utils2 = _interopRequireDefault(_utils);

var _modal = __webpack_require__(580);

var _modal2 = _interopRequireDefault(_modal);

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'recharge-hot-plant',
  components: {
    moduleHeader: _moduleHeader2.default,
    card: _card2.default,
    normalTable: _elementTable2.default,
    Modal: _modal2.default
    // dayselect
  },
  data: function data() {
    return {
      time_type: 1,
      date1: moment().format('YYYY-MM-DD'),
      categories: ['[1-5]', '[5-100]', '[100-300]', '[300-500]', '[500-1000]', '[1000->]'], // efunfun暂时写死范围
      isShowDetail: false,

      current: 1, // 当前页数,支持sync
      size: 10 // 每页显示数
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
        isShowDatetype: false,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.checkDate();
        }
      }];
    },
    dayOption: function dayOption() {
      var arr = [],
          i = 9;
      for (var n = 0; n <= 16; n++) {
        switch (n) {
          case 1:
            arr.push({
              value: n,
              key: "00:00-09:00"
            });
            break;
          case 0:
            arr.push({
              value: n,
              key: "00:00-24:00"
            });
            break;
          default:
            var key = i + ':00-' + ++i + ':00';
            arr.push({
              value: n,
              key: key
            });
            break;
        }
      }
      return arr;
    },
    columnArr: function columnArr() {
      var result = [];
      if (this.tableData && this.tableData.length > 0) {
        for (var index in this.tableData[0]) {
          result.push(index);
        }
      }
      return result;
    },
    chartData: function chartData() {
      return this.$store.getters['ChargeHotList/chartData'] || [];
    },
    tableData: function tableData() {
      return this.$store.getters['ChargeHotList/tableData'] || [];
    },
    detailData: function detailData() {
      return this.$store.getters['ChargeHotList/detailData'] || [];
    },
    filterData: function filterData() {
      var _this2 = this;

      return this.tableData.filter(function (item, index) {
        return index >= (_this2.current - 1) * _this2.size && index < _this2.current * _this2.size;
      });
    }
  },
  methods: {
    // 切换时间
    changeSelected: function changeSelected(selected) {
      // this.time_type = selected
      this.query();
    },
    checkDate: function checkDate() {
      var nowDate = moment(); // 当前时间
      var inDate = this.date1; // 选中日期
      if (moment(nowDate).format('YYYY-MM-DD') === moment(inDate).format('YYYY-MM-DD')) {
        // 今天
        this.time_type = 1;
      } else if (moment(nowDate) < moment(moment(inDate).format('YYYY-MM-DD'))) {
        // 选中日期大于今天
        return;
      } else if (moment(nowDate) > moment(moment(inDate).format('YYYY-MM-DD'))) {
        // 选中日期小于今天
        this.time_type = 0;
      }
      this.query();
    },

    // 禁用选项
    disabledOption: function disabledOption(item) {
      var nowDate = moment(); // 当前时间
      var inDate = this.date1; // 选中日期

      var range = item.key.split('-');
      var start = range[0];
      var end = range[1];
      if (moment(nowDate).format('YYYY-MM-DD') === moment(inDate).format('YYYY-MM-DD')) {
        // 今天
        if (moment(inDate + " " + end) < moment(nowDate)) return false;
        return true;
      } else if (moment(nowDate) < moment(moment(inDate).format('YYYY-MM-DD'))) {
        // 选中日期大于今天
        return true;
      } else if (moment(nowDate) > moment(moment(inDate).format('YYYY-MM-DD'))) {
        // 选中日期小于今天
        return false;
      }
      return false;
    },

    // 页面变化时
    pageChange: function pageChange(current) {
      this.current = current;
    },
    rowClick: function rowClick(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    getParams: function getParams() {
      var systemId = this.$store.state.common.systems.systemId;
      if (systemId == 1) {
        return {
          isCache: 1,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date: this.date1,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'], // 主界面默认传选择的屈服id，详细界面传用户区服id
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_pay_channel: this.$store.getters['PayChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_type_id: this.time_type, // 时间id
          in_role_id: 0, // 查询明细时 用户id
          in_select_id: 1 // 1为主界面  2为明细
        };
      } else if (systemId == 3) {
        return {
          isCache: 1,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: this.date1,
          time_type: this.time_type,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
          in_platform: '1,2'
        };
      }
    },
    query: function query() {
      var params = this.getParams();
      // this.drawChart();
      this.current = 1;
      this.$store.dispatch('ChargeHotList/data', params);
    },
    exportData: function exportData() {
      var params = this.getParams();
      _api2.default.user.exportData(params);
    },
    draw: function draw() {
      var systemId = this.$store.state.common.systems.systemId;
      if (systemId == 1) {
        var columns = {
          pay_range: _utils2.default.getColumnByIndex(0, this.chartData),
          pay_count: _utils2.default.getColumnByIndex(1, this.chartData),
          pay_times: _utils2.default.getColumnByIndex(2, this.chartData),
          pay_money: _utils2.default.getColumnByIndex(3, this.chartData)
        };
        var categories = [];
        this.chartData.forEach(function (e, i) {
          categories.push(e[columns.pay_range]);
        });
        this.drawChart(categories, columns);
      } else if (systemId == 3) {
        var _categories = this.categories;
        var _columns = {
          pay_count: _utils2.default.getColumnByIndex(3, this.chartData),
          pay_times: _utils2.default.getColumnByIndex(2, this.chartData),
          pay_money: _utils2.default.getColumnByIndex(1, this.chartData)
        };
        this.drawChart(_categories, _columns);
      }
    },
    drawChart: function drawChart(categories, columns) {
      // requestAnimationFrame(() => {
      var array1 = [],
          array2 = [],
          array3 = [],
          array4 = [];

      if (this.chartData) {
        this.chartData.forEach(function (e, i) {
          array1.push([// 充值金额占比
          categories[i], e[columns.pay_money] * 1]);
          array2.push( // 充值人数
          // this.categories[i],
          e[columns.pay_count] * 1);
          array3.push( // 充值次数
          // this.categories[i],
          e[columns.pay_times] * 1);
          array4.push( // 充值金额
          // this.categories[i],
          e[columns.pay_money] * 1);
        });
        highchartUtil.drawPieChart('hotPie', [{
          name: '充值金额占比',
          data: array1
        }]);

        highchartUtil.draw({
          chart: {
            renderTo: 'hotChart'
            // zoomType: 'xy'
          },
          xAxis: [{
            categories: categories
          }],
          yAxis: [{ // Primary yAxis
            labels: {
              format: '{value}',
              style: {
                color: _highcharts2.default.getOptions().colors[0]
              }
            },
            title: {
              text: columns.pay_count,
              style: {
                color: _highcharts2.default.getOptions().colors[0]
              }
            }
          }, { // Secondary yAxis
            gridLineWidth: 0,
            labels: {
              format: '{value}',
              style: {
                color: _highcharts2.default.getOptions().colors[1]
              }
            },
            title: {
              text: columns.pay_times,
              style: {
                color: _highcharts2.default.getOptions().colors[1]
              }
            }
          }, {
            labels: {
              format: '{value}',
              style: {
                color: _highcharts2.default.getOptions().colors[2]
              }
            },
            title: {
              text: columns.pay_money,
              style: {
                color: _highcharts2.default.getOptions().colors[2]
              }
            },
            opposite: true
          }],
          series: [{
            name: columns.pay_count,
            type: 'spline',
            yAxis: 0,
            data: array2
          }, {
            name: columns.pay_times,
            type: 'spline',
            yAxis: 1,
            data: array3,
            lineWidth: 3
          }, {
            name: columns.pay_money,
            type: 'column',
            data: array4,
            lineWidth: 3,
            yAxis: 2
          }]
        });
      }
      // })
    },
    showDetail: function showDetail(item) {
      var _this3 = this;

      var pay_detail = _utils2.default.getColumnByIndex(this.columnArr.length - 1, this.tableData);
      var gamezone = item[pay_detail].split('_')[1];
      var roleId = item[pay_detail].split('_')[0].split('#')[1];
      var params = {
        isCache: 1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date: this.date1,
        in_gamezone_id: gamezone, // 主界面默认传选择的屈服id，详细界面传用户区服id
        in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_pay_channel: this.$store.getters['PayChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        in_type_id: this.time_type, // 时间id
        in_role_id: roleId, // 查询明细时 用户id
        in_select_id: 2 // 1为主界面  2为明细
      };
      this.$store.dispatch('ChargeHotList/detailData', params).then(function () {
        _this3.isShowDetail = true;
      });
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler: function handler(v, ov) {
        if (v != ov) {
          this.draw();
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(571)))

/***/ }),

/***/ 956:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "recharge-hot-plant"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "isShowReg": true,
      "isShowPay": true,
      "dateList": _vm.dateList,
      "disabledOption": _vm.disabledOption
    }
  }, [_c('div', {
    staticClass: "dayselect",
    attrs: {
      "slot": "after-datepicker"
    },
    slot: "after-datepicker"
  }, [_c('elSelect', {
    attrs: {
      "placeholder": "请选择"
    },
    on: {
      "change": _vm.changeSelected
    },
    model: {
      value: (_vm.time_type),
      callback: function($$v) {
        _vm.time_type = $$v
      },
      expression: "time_type"
    }
  }, _vm._l((_vm.dayOption), function(item, index) {
    return _c('elOption', {
      key: index,
      attrs: {
        "label": item.key,
        "value": item.value,
        "disabled": _vm.disabledOption(item, index)
      }
    })
  }))], 1)])], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v("趋势图")]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "chart-body"
  }, [_c('div', {
    staticClass: "charts"
  }, [_c('div', {
    attrs: {
      "id": "hotPie"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "chartDesc"
  }, [_vm._v("充值金额占比")])]), _vm._v(" "), _c('div', {
    staticClass: "charts"
  }, [_c('div', {
    attrs: {
      "id": "hotChart"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "chartDesc"
  }, [_vm._v("充值金额、次数、人数分布")])])])])]), _vm._v(" "), _c('card', [_c('div', {
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
  }, [_c('el-table', {
    ref: "singleTable",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.filterData,
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
          return [(cindex == (_vm.columnArr.length - 1)) ? _c('a', {
            staticClass: "detail-column",
            attrs: {
              "href": "javascript:void(0)"
            },
            on: {
              "click": function($event) {
                _vm.showDetail(scope.row)
              }
            }
          }, [_vm._v("详")]) : _c('span', [_vm._v(_vm._s(scope.row[column]))])]
        }
      }])
    })
  }))], 1)]), _vm._v(" "), _c('div', {
    staticStyle: {
      "line-height": "30px",
      "text-align": "center",
      "padding-bottom": "20px"
    },
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-pagination', {
    attrs: {
      "layout": "prev, pager, next",
      "total": _vm.tableData.length,
      "current-page": _vm.current,
      "page-size": _vm.size
    },
    on: {
      "update:currentPage": function($event) {
        _vm.current = $event
      },
      "current-change": _vm.pageChange
    }
  })], 1)])], 1), _vm._v(" "), (_vm.isShowDetail) ? _c('Modal', {
    attrs: {
      "headerName": "充值明细",
      "width": "1000"
    },
    on: {
      "close": function($event) {
        _vm.isShowDetail = false
      }
    }
  }, [_c('normalTable', {
    attrs: {
      "slot": "modal-body",
      "tableData": _vm.detailData,
      "columnWidthObj": {
        0: 200,
        1: 150,
        2: 150,
        5: 200
      }
    },
    slot: "modal-body"
  })], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ })

});