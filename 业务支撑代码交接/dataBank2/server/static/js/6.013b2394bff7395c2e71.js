webpackJsonp([6],{

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(784)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(786),
  /* template */
  __webpack_require__(809),
  /* scopeId */
  "data-v-12cda3de",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(785);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("b113db3c", content, true);

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".overview-content[data-v-12cda3de]{background-color:#eee;padding:20px}.overview-content .overview-row[data-v-12cda3de]{width:100%;display:flex;justify-content:flex-start;align-items:flex-start}.overview-content .overview-row .small-card[data-v-12cda3de]{flex:1;margin:10px;box-sizing:border-box}.overview-content .overview-row .middle-card[data-v-12cda3de]{flex:2;margin:10px;box-sizing:border-box}.overview-content .overview-row .must-card[data-v-12cda3de]{flex:3;margin:10px;box-sizing:border-box}.overview-content .overview-row .most-card[data-v-12cda3de]{flex:4;margin:10px;box-sizing:border-box}.filters[data-v-12cda3de]{width:100%;line-height:30px;padding:20px;display:flex;justify-content:flex-start;align-items:flex-start;background-color:#fff}.filters .filter-item[data-v-12cda3de]{display:flex;justify-content:flex-start;align-items:center;padding:5px}.filters .filter-item .filter-label[data-v-12cda3de]{max-width:120px}.my-select[data-v-12cda3de]{width:193px;height:36px;border:1px solid #bfcbd9;color:#1f2d3d;border-radius:5px;padding:0 5px}", ""]);

// exports


/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, Utils) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = __webpack_require__(271);

var _set2 = _interopRequireDefault(_set);

var _from = __webpack_require__(272);

var _from2 = _interopRequireDefault(_from);

var _stringify = __webpack_require__(593);

var _stringify2 = _interopRequireDefault(_stringify);

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

var _radioBtnGroup = __webpack_require__(603);

var _radioBtnGroup2 = _interopRequireDefault(_radioBtnGroup);

var _onlineData = __webpack_require__(791);

var _onlineData2 = _interopRequireDefault(_onlineData);

var _overviewChart = __webpack_require__(799);

var _overviewChart2 = _interopRequireDefault(_overviewChart);

var _countryTable = __webpack_require__(804);

var _countryTable2 = _interopRequireDefault(_countryTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'data-overview',
  components: {
    radioBtnGroup: _radioBtnGroup2.default,
    onlineData: _onlineData2.default,
    overviewChart: _overviewChart2.default,
    countryTable: _countryTable2.default
  },
  data: function data() {
    return {
      datetype: 1,
      date: moment().add(-1, 'day').format('YYYY-MM-DD'),
      countryValue: 0,
      areaList: [],
      countryList: [],

      onlineData: [],
      chartData: [],
      tableData: []
    };
  },

  computed: {
    pickerOptions: function pickerOptions() {
      return {
        firstDayOfWeek: 1
      };
    }
  },
  mounted: function mounted() {
    this.getCountryList();
    this.query();
  },

  methods: {
    query: function query() {
      this.getOnlineData();
      this.getChartData();
      this.getTableData();
    },

    // 获取国家列表
    getCountryList: function getCountryList() {
      var _this = this;

      var params = {
        isCache: 1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date1: moment(this.date).format('YYYY-MM-DD'),
        in_date2: moment(this.date).format('YYYY-MM-DD'),
        in_game_id: this.countryValue,
        in_type: 4, // 国家列表
        in_selected: this.countryValue == 0 ? 1 : 2
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this.areaList = data.state[0];
          var list = [];
          _this.areaList.forEach(function (item) {
            list.push((0, _stringify2.default)({
              country_id: item.country_id,
              country_name: item.country_name
            }));
          });
          list = (0, _from2.default)(new _set2.default(list));
          list = list.map(function (item) {
            return JSON.parse(item);
          });
          _this.countryList = list;
        } else {
          Utils.Notification.error({ message: data.message });
          console.error(data.message);
        }
      });
    },

    // 获取top数据
    getOnlineData: function getOnlineData() {
      var _this2 = this;

      console.log('getOnlineData');
      var params = {
        isCache: 1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date1: moment(this.date).format('YYYY-MM-DD'),
        in_date2: moment(this.date).format('YYYY-MM-DD'),
        in_game_id: this.countryValue,
        in_type: this.datetype == 1 ? 1 : this.datetype == 2 ? 5 : 6, // 前N天数据 in_type 1 top日数据 5 top周数据 6 top月数据
        in_selected: this.countryValue == 0 ? 1 : 2
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.onlineData = data.state[0];
        } else {
          Utils.Notification.error({ message: data.message });
          console.error(data.message);
        }
      });
    },
    getDate: function getDate() {
      var dateObj = {
        date1: '',
        date2: ''
      };

      if (this.datetype == 1) {
        dateObj.date1 = moment(this.date).format('YYYY-MM-DD');
        dateObj.date2 = moment(this.date).format('YYYY-MM-DD');
      } else if (this.datetype == 2) {
        dateObj.date1 = moment(this.date).day(1).format('YYYY-MM-DD');
        dateObj.date2 = moment(this.date).day(7).format('YYYY-MM-DD');
      } else if (this.datetype == 3) {
        dateObj.date1 = moment(this.date).date(1).format('YYYY-MM-DD');
        dateObj.date2 = moment(this.date).add(1, 'month').date(1).add(-1, 'day').format('YYYY-MM-DD');
      }
      console.log('类型:', this.datetype);
      console.log('date1:', dateObj.date1);
      console.log('date2:', dateObj.date2);
      return dateObj;
    },

    // 获取图表数据
    getChartData: function getChartData() {
      var _this3 = this;

      var dateObj = this.getDate();
      console.log('getChartData');
      var params = {
        isCache: 1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date1: dateObj.date1,
        in_date2: dateObj.date2,
        in_game_id: this.countryValue,
        in_type: 2, // 图表数据
        in_selected: this.countryValue == 0 ? 1 : 2
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this3.chartData = data.state[0];
        } else {
          Utils.Notification.error({ message: data.message });
          console.error(data.message);
        }
      });
    },

    // 获取表格数据
    getTableData: function getTableData() {
      var _this4 = this;

      var dateObj = this.getDate();
      console.log('getTableData');
      var params = {
        isCache: 1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date1: dateObj.date1,
        in_date2: dateObj.date2,
        in_game_id: this.countryValue,
        in_type: 3, // 表格数据
        in_selected: this.countryValue == 0 ? 1 : 2
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
    datetype: function datetype(v, ov) {
      if (v != ov && ov) {
        // this.drawChart()
        // this.query()
        this.date = moment().add(-1, 'day');
      }
    },
    date: function date(v, ov) {
      if (v != ov && ov) {
        // this.drawChart()
        this.query();
      }
    },
    countryValue: function countryValue(v, ov) {
      if (v != ov) {
        // this.drawChart()
        this.query();
      }
    },
    overviewType: function overviewType(v, ov) {
      if (v != ov) {
        this.drawCommonChart();
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14)))

/***/ }),

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(792)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(794),
  /* template */
  __webpack_require__(798),
  /* scopeId */
  "data-v-17db5180",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 792:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(793);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("421668dd", content, true);

/***/ }),

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".overview-content[data-v-17db5180]{background-color:#eee;padding:20px}.overview-content .overview-row[data-v-17db5180]{width:100%;display:flex;justify-content:flex-start;align-items:flex-start}.overview-content .overview-row .small-card[data-v-17db5180]{flex:1;margin:10px;box-sizing:border-box}.overview-content .overview-row .middle-card[data-v-17db5180]{flex:2;margin:10px;box-sizing:border-box}.overview-content .overview-row .must-card[data-v-17db5180]{flex:3;margin:10px;box-sizing:border-box}.overview-content .overview-row .most-card[data-v-17db5180]{flex:4;margin:10px;box-sizing:border-box}.desc-group[data-v-17db5180]{display:flex;justify-content:flex-start;align-items:middle}.desc-group .desc-label[data-v-17db5180]{flex:1;line-height:30px;white-space:nowrap}.desc-group .desc-chart[data-v-17db5180]{flex:3}.desc-group .desc-chart .desc-trend[data-v-17db5180]{width:100%;height:100%}.charts[data-v-17db5180]{height:300px}", ""]);

// exports


/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

var _inlineChart = __webpack_require__(795);

var _inlineChart2 = _interopRequireDefault(_inlineChart);

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

exports.default = {
  name: 'online-data',
  props: ['datetype', 'onlineData'],
  components: {
    inlineChart: _inlineChart2.default
  },
  data: function data() {
    return {
      data: []
    };
  },

  computed: {
    overviewList: function overviewList() {
      var _this = this;

      var result = [];
      if (this.onlineData && this.onlineData.length > 0) {
        for (var index in this.onlineData[0]) {
          if (index != '统计时间') {
            result.push({
              name: index,
              value: 0,
              list: []
            });
          }
        }
      }
      result.forEach(function (res) {
        var value = 0;
        var last = 0;
        _this.onlineData.forEach(function (item, index) {
          res.list.push(Number(item[res.name]));
          // value += Number(item[res.name])
          value = value >= item[res.name] ? value : Number(item[res.name]);

          last = index === _this.onlineData.length - 1 ? item[res.name] : 0;
        });
        res.value = last; // value.toFixed(2)
      });
      return result;
    }
  }
};

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(796),
  /* template */
  __webpack_require__(797),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//

exports.default = {
  name: 'inline-chart',
  props: ['chartId', 'data'],
  methods: {
    drawChart: function drawChart() {
      var categories = [];
      var seriesData = [{
        data: this.data,
        pointStart: 1,
        color: 'skyblue'
      }];
      highchartUtil.drawSparkChart(this.chartId, seriesData);
    }
  },
  mounted: function mounted() {
    this.drawChart();
  },

  watch: {
    data: {
      deep: true,
      handler: function handler(v, ov) {
        if (v != ov) {
          this.drawChart();
        }
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(571)))

/***/ }),

/***/ 797:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": _vm.chartId
    }
  })
},staticRenderFns: []}

/***/ }),

/***/ 798:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "overview-row"
  }, _vm._l((_vm.overviewList), function(item, index) {
    return _c('el-card', {
      key: index,
      staticClass: "small-card"
    }, [_c('div', {
      staticClass: "desc-group"
    }, [_c('div', {
      staticClass: "desc-label"
    }, [_c('div', {
      staticClass: "desc-label-name"
    }, [_vm._v("当" + _vm._s(_vm.datetype == 1 ? '日' : (_vm.datetype == 2 ? '周' : '月')) + _vm._s(item.name))]), _vm._v(" "), _c('div', {
      staticClass: "desc-label-value"
    }, [_vm._v(_vm._s((index == 0 || index == 2) ? Number(item.value).toFixed(0) : item.value))])]), _vm._v(" "), _c('div', {
      staticClass: "desc-chart"
    }, [_c('inlineChart', {
      staticClass: "desc-trend",
      attrs: {
        "chartId": 'inline-chart' + index,
        "data": item.list
      }
    })], 1)])])
  }))
},staticRenderFns: []}

/***/ }),

/***/ 799:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(800)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(802),
  /* template */
  __webpack_require__(803),
  /* scopeId */
  "data-v-7f4a0152",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(801);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("a8a380d2", content, true);

/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".overview-content[data-v-7f4a0152]{background-color:#eee;padding:20px}.overview-content .overview-row[data-v-7f4a0152]{width:100%;display:flex;justify-content:flex-start;align-items:flex-start}.overview-content .overview-row .small-card[data-v-7f4a0152]{flex:1;margin:10px;box-sizing:border-box}.overview-content .overview-row .middle-card[data-v-7f4a0152]{flex:2;margin:10px;box-sizing:border-box}.overview-content .overview-row .must-card[data-v-7f4a0152]{flex:3;margin:10px;box-sizing:border-box}.overview-content .overview-row .most-card[data-v-7f4a0152]{flex:4;margin:10px;box-sizing:border-box}.charts[data-v-7f4a0152]{height:300px}", ""]);

// exports


/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'overview-chart',
  props: ['datetype', 'chartData'],
  data: function data() {
    return {
      overviewType: 1 // 图表类型  1 柱形图  2 折线图
    };
  },

  methods: {
    drawChart: function drawChart() {
      this.drawPieChart();
      this.drawOverChart();
      this.drawBarChart();
    },

    // 饼图
    drawPieChart: function drawPieChart() {
      var seriesData = [{
        name: '充值',
        data: []
      }];
      this.chartData.forEach(function (item) {
        seriesData[0].data.push([item.name, Number(item['充值'])]);
      });
      highchartUtil.drawPieChart('over-chart-pie', seriesData);
    },

    // 总览图表 柱形图/折线图
    drawOverChart: function drawOverChart() {
      var categories = [];
      var seriesData = [{
        name: '注册', data: []
      }, {
        name: '充值', data: []
      }, {
        name: '活跃', data: []
        //  ,{
        //    name:'次日留存',data:[],
        //  }
      }];
      this.chartData.forEach(function (item) {
        categories.push(item.name);
        seriesData[0].data.push(Number(item['注册']));
        seriesData[1].data.push(Number(item['充值']));
        seriesData[2].data.push(Number(item['活跃']));
        //  seriesData[3].data.push(Number(item['次留']))
      });
      highchartUtil.drawChart('over-chart-common', this.overviewType == 1 ? 'column' : 'spline', categories, seriesData);
    },

    // 条形图
    drawBarChart: function drawBarChart() {
      var categories = [];
      var seriesData = [{
        name: (this.datetype == 1 ? '昨日' : this.datetype == 2 ? '上周' : '上月') + '充值', data: []
      }, {
        name: (this.datetype == 1 ? '今日' : this.datetype == 2 ? '本周' : '本月') + '充值', data: []
      }];
      this.chartData.forEach(function (item) {
        categories.push(item.name);
        seriesData[0].data.push(Number(item['前一日充值']));
        seriesData[1].data.push(Number(item['充值']));
      });
      highchartUtil.drawChart('over-chart-bar', 'bar', categories, seriesData);
    }
  },
  watch: {
    overviewType: function overviewType(v, ov) {
      if (v != ov) {
        this.drawOverChart();
      }
    },

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
//
//
//
//
//
//
//
//
//
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

/***/ 803:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "overview-row"
  }, [_c('el-card', {
    staticClass: "middle-card"
  }, [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v("\n        收入占比\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "charts",
    attrs: {
      "id": "over-chart-pie"
    }
  })]), _vm._v(" "), _c('el-card', {
    staticClass: "most-card"
  }, [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v("\n        总览\n        "), _c('div', {
    staticStyle: {
      "float": "right"
    }
  }, [_c('button', {
    staticClass: "btn btn-primary",
    class: {
      active: _vm.overviewType == 1
    },
    staticStyle: {
      "display": "inline"
    },
    attrs: {
      "title": "柱形图"
    },
    on: {
      "click": function($event) {
        _vm.overviewType = 1
      }
    }
  }, [_c('i', {
    staticClass: "icon-bar-chart"
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-primary",
    class: {
      active: _vm.overviewType == 2
    },
    staticStyle: {
      "display": "inline"
    },
    attrs: {
      "title": "折线图"
    },
    on: {
      "click": function($event) {
        _vm.overviewType = 2
      }
    }
  }, [_c('i', {
    staticClass: "icon-linechart"
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "charts",
    attrs: {
      "id": "over-chart-common"
    }
  })]), _vm._v(" "), _c('el-card', {
    staticClass: "must-card"
  }, [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v("\n        充值与" + _vm._s(_vm.datetype == 1 ? '昨日' : (_vm.datetype == 2 ? '上周' : '上月')) + "对比\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "charts",
    attrs: {
      "id": "over-chart-bar"
    }
  })])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 804:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(805)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(807),
  /* template */
  __webpack_require__(808),
  /* scopeId */
  "data-v-bfc8830a",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(806);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("01d45135", content, true);

/***/ }),

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".overview-content[data-v-bfc8830a]{background-color:#eee;padding:20px}.overview-content .overview-row[data-v-bfc8830a]{width:100%;display:flex;justify-content:flex-start;align-items:flex-start}.overview-content .overview-row .small-card[data-v-bfc8830a]{flex:1;margin:10px;box-sizing:border-box}.overview-content .overview-row .middle-card[data-v-bfc8830a]{flex:2;margin:10px;box-sizing:border-box}.overview-content .overview-row .must-card[data-v-bfc8830a]{flex:3;margin:10px;box-sizing:border-box}.overview-content .overview-row .most-card[data-v-bfc8830a]{flex:4;margin:10px;box-sizing:border-box}.icon-arrow-right[data-v-bfc8830a]{display:inline-block;transform:rotate(270deg)}.icon-arrow-right.desc[data-v-bfc8830a]{transform:rotate(90deg)}", ""]);

// exports


/***/ }),

/***/ 807:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'country-table',
  props: ['countryValue', 'tableData'],
  data: function data() {
    return {
      sortKey: '',
      desc: false
    };
  },

  computed: {
    // columnArr(){
    //   let arr = []
    //   if(this.tableData&&this.tableData.length>0){
    //     for(let i=0;i<this.tableData.length;i++){
    //       for(let index in this.tableData[i]){
    //         arr.push(index)
    //       }
    //       break
    //     }
    //   }
    //   return arr
    // },
    sortTable: function sortTable() {
      var _this = this;

      var sortTable = this.tableData.sort(function (a, b) {
        var data1 = void 0,
            data2 = void 0;
        if (typeof a[_this.sortKey] === 'number') {
          data1 = a[_this.sortKey];
          data2 = b[_this.sortKey];
        } else if (typeof a[_this.sortKey] === 'string') {
          if (a[_this.sortKey].indexOf('%') != -1) {
            data1 = Number(a[_this.sortKey].split('%')[0]);
            data2 = Number(b[_this.sortKey].split('%')[0]);
          }
          if (a[_this.sortKey].indexOf(',') != -1) {
            data1 = Number(a[_this.sortKey].replace(/,/g, ""));
            data2 = Number(b[_this.sortKey].replace(/,/g, ""));
          }
          data1 = Number(a[_this.sortKey]);
          data2 = Number(b[_this.sortKey]);
        }
        if (!_this.desc) {
          return data1 - data2;
        } else {
          return data2 - data1;
        }
      });
      return sortTable;
    },
    totalData: function totalData() {
      var total = {
        reg: 0,
        active: 0,
        pay: 0,
        globlePayRate: 0,
        cost: 0,
        divided: 0,
        todayProfit: 0
      };
      var totalPay = 0;
      this.tableData.forEach(function (item) {
        totalPay += Number(item['充值']);
      });
      this.tableData.forEach(function (item) {
        total.reg += Number(item['注册']);
        total.active += Number(item['活跃']);
        total.pay += Number(item['充值']);
        total.globlePayRate += totalPay == 0 ? 0 : Number(item['充值']) / totalPay * 100;
        total.cost += Number(item['花费']);
        total.divided += Number(item['分成']);
        total.todayProfit += Number(item['当天利润']);
      });
      return {
        reg: Number(total.reg).toFixed(2),
        active: Number(total.active).toFixed(2),
        pay: Number(total.pay).toFixed(2),
        globlePayRate: Number(total.globlePayRate).toFixed(2),
        cost: Number(total.cost).toFixed(2),
        divided: Number(total.divided).toFixed(2),
        todayProfit: Number(total.todayProfit).toFixed(2)
      };
    }
  }
};

/***/ }),

/***/ 808:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "overview-row"
  }, [_c('el-card', {
    staticClass: "small-card"
  }, [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v("\r\n          详细数据\r\n        ")]), _vm._v(" "), _c('div', {
    staticClass: "overview-table-content"
  }, [_c('table', {
    staticClass: "table table-hover"
  }, [_c('thead', [_c('tr', [_c('th', [_vm._v(_vm._s(_vm.countryValue === 0 ? '国家' : '游戏'))]), _vm._v(" "), _c('th', {
    on: {
      "click": function($event) {
        _vm.sortKey = '注册';
        _vm.desc = !_vm.desc
      }
    }
  }, [_vm._v("注册"), (_vm.sortKey == '注册') ? _c('i', {
    staticClass: "icon-arrow-right",
    class: {
      'desc': _vm.desc
    }
  }) : _vm._e()]), _vm._v(" "), _c('th', {
    on: {
      "click": function($event) {
        _vm.sortKey = '活跃';
        _vm.desc = !_vm.desc
      }
    }
  }, [_vm._v("活跃"), (_vm.sortKey == '活跃') ? _c('i', {
    staticClass: "icon-arrow-right",
    class: {
      'desc': _vm.desc
    }
  }) : _vm._e()]), _vm._v(" "), _c('th', {
    on: {
      "click": function($event) {
        _vm.sortKey = '充值';
        _vm.desc = !_vm.desc
      }
    }
  }, [_vm._v("充值"), (_vm.sortKey == '充值') ? _c('i', {
    staticClass: "icon-arrow-right",
    class: {
      'desc': _vm.desc
    }
  }) : _vm._e()]), _vm._v(" "), _c('th', {
    on: {
      "click": function($event) {
        _vm.sortKey = '充值占比';
        _vm.desc = !_vm.desc
      }
    }
  }, [_vm._v("充值占比"), (_vm.sortKey == '充值占比') ? _c('i', {
    staticClass: "icon-arrow-right",
    class: {
      'desc': _vm.desc
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('tbody', [_vm._l((_vm.sortTable), function(item, index) {
    return _c('tr', {
      key: index
    }, [_c('td', [_vm._v(_vm._s(item['name']))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Number(item['注册']).toFixed(0)))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Number(item['活跃']).toFixed(0)))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item['充值']))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item['充值占比']) + "%")])])
  }), _vm._v(" "), (_vm.tableData.length <= 0) ? _c('tr', [_c('td', {
    attrs: {
      "colspan": "100"
    }
  }, [_vm._v("无数据")])]) : _vm._e()], 2), _vm._v(" "), _c('tfoot', [(_vm.tableData.length > 0) ? _c('tr', {
    staticStyle: {
      "color": "#0A95FE"
    }
  }, [_c('td', [_vm._v("汇总")]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Number(_vm.totalData.reg).toFixed(0)))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Number(_vm.totalData.active).toFixed(0)))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm.totalData.pay))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm.totalData.globlePayRate) + "%")])]) : _vm._e()])])])])], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 809:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "filters"
  }, [_c('div', {
    staticClass: "filter-item"
  }, [_c('radio-btn-group', {
    attrs: {
      "startIndex": 1,
      "list": ['日', '周', '月']
    },
    model: {
      value: (_vm.datetype),
      callback: function($$v) {
        _vm.datetype = $$v
      },
      expression: "datetype"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "filter-item"
  }, [_c('div', {
    staticClass: "filter-label"
  }, [_vm._v("日期：")]), _vm._v(" "), _c('el-date-picker', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.datetype === 1),
      expression: "datetype===1"
    }],
    attrs: {
      "clearable": false,
      "picker-options": _vm.pickerOptions,
      "placeholder": "选择日期范围"
    },
    model: {
      value: (_vm.date),
      callback: function($$v) {
        _vm.date = $$v
      },
      expression: "date"
    }
  }), _vm._v(" "), _c('el-date-picker', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.datetype === 2),
      expression: "datetype===2"
    }],
    attrs: {
      "clearable": false,
      "type": "week",
      "picker-options": _vm.pickerOptions,
      "format": "yyyy 第 WW 周",
      "placeholder": "选择日期范围"
    },
    model: {
      value: (_vm.date),
      callback: function($$v) {
        _vm.date = $$v
      },
      expression: "date"
    }
  }), _vm._v(" "), _c('el-date-picker', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.datetype === 3),
      expression: "datetype===3"
    }],
    attrs: {
      "clearable": false,
      "type": "month",
      "placeholder": "选择日期范围"
    },
    model: {
      value: (_vm.date),
      callback: function($$v) {
        _vm.date = $$v
      },
      expression: "date"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "filter-item"
  }, [_c('div', {
    staticClass: "filter-label"
  }, [_vm._v("国家：")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.countryValue),
      expression: "countryValue"
    }],
    staticClass: "filter-content my-select",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.countryValue = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    domProps: {
      "value": 0
    }
  }, [_vm._v("全球")]), _vm._v(" "), _vm._l((_vm.countryList), function(item) {
    return _c('option', {
      key: item.country_id,
      domProps: {
        "value": item.country_id
      }
    }, [_vm._v(_vm._s(item.country_name))])
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "overview-content"
  }, [_c('onlineData', {
    ref: "onlineData",
    attrs: {
      "datetype": _vm.datetype,
      "onlineData": _vm.onlineData
    }
  }), _vm._v(" "), _c('overviewChart', {
    ref: "overviewChart",
    attrs: {
      "datetype": _vm.datetype,
      "chartData": _vm.chartData
    }
  }), _vm._v(" "), _c('countryTable', {
    attrs: {
      "countryValue": _vm.countryValue,
      "tableData": _vm.tableData
    }
  })], 1)])
},staticRenderFns: []}

/***/ })

});