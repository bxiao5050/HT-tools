webpackJsonp([13],{

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(718)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(720),
  /* template */
  __webpack_require__(731),
  /* scopeId */
  "data-v-3c626bbd",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 718:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(719);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("69ce0906", content, true);

/***/ }),

/***/ 719:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".table-content[data-v-3c626bbd]{overflow:auto;width:100%;max-height:500px;white-space:nowrap}", ""]);

// exports


/***/ }),

/***/ 720:
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

var _elementTable = __webpack_require__(573);

var _elementTable2 = _interopRequireDefault(_elementTable);

var _chartModel_e = __webpack_require__(721);

var _chartModel_e2 = _interopRequireDefault(_chartModel_e);

var _chartModel = __webpack_require__(726);

var _chartModel2 = _interopRequireDefault(_chartModel);

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

exports.default = {
  name: 'active-user',
  components: {
    moduleHeader: _moduleHeader2.default, card: _card2.default, normalTable: _elementTable2.default, chartModel_e8: _chartModel_e2.default, chartModel: _chartModel2.default
  },
  data: function data() {
    return {
      date1: moment().add(-7, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),
      tableData: [],
      columnData: [],
      type: 1
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
        label: this.$t('common.Date'),
        startDate: this.date1,
        endDate: this.date2,
        isShowDatetype: false,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;_this.date2 = newDate.endDate;_this.query();
        }
      }];
    },
    currentView: function currentView() {
      var systemId = this.$store.state.common.systems.systemId;
      if (systemId == 3) {
        //Efunfun或者88box
        return 'chartModel_e8';
      } else {
        return 'chartModel';
      }
    },
    systemId: function systemId() {
      return this.$store.state.common.systems.systemId;
    },
    reverseTableData: function reverseTableData() {
      var result = this.tableData.map(function (item) {
        return item;
      });
      result.reverse();
      return result;
    }
  },
  methods: {
    changeType: function changeType(type) {
      this.type = type;
    },
    getParams: function getParams() {
      if (this.systemId == 1) {
        return {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS']
        };
      } else if (this.systemId == 3) {
        return {
          isCache: 1,
          in_date1: this.date1,
          in_date: this.date2,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
          in_platform: '1,2'
        };
      }
    },
    query: function query() {
      var _this2 = this;

      var params = this.getParams();
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.tableData = data.state[0];
          _this2.columnData = data.state[1] ? data.state[1] : [];
          _this2.$refs.chartModel.drawChart();
        } else {
          Utils.Notification.error({ message: data.message });
          console.error(data.message);
        }
      });
    },
    exportData: function exportData() {
      var params = this.getParams();
      _api2.default.user.exportData(params);
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14)))

/***/ }),

/***/ 721:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(722)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(724),
  /* template */
  __webpack_require__(725),
  /* scopeId */
  "data-v-3d20b373",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 722:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(723);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("17e396d7", content, true);

/***/ }),

/***/ 723:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".table-content[data-v-3d20b373]{overflow:auto;width:100%;max-height:500px}", ""]);

// exports


/***/ }),

/***/ 724:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil, moment) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

var _utils = __webpack_require__(575);

var _utils2 = _interopRequireDefault(_utils);

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

exports.default = {
  name: 'chart-model-e8',
  components: {
    card: _card2.default
  },
  props: ["type", "typeChange", "columnData", "chartData"],
  methods: {
    changeType: function changeType(type) {
      this.typeChange(type);
    },
    drawChart: function drawChart() {
      var categories = [];
      var chartData = this.formatData(this.chartData);
      highchartUtil.drawChart('activeUserChart', 'area', chartData.category, chartData.series);
    },
    formatData: function formatData(data) {
      var count_date = _utils2.default.getColumnKey('count_date', this.columnData);
      var newlogin_count = _utils2.default.getColumnKey('newlogin_count', this.columnData);
      var oldlogin_count = _utils2.default.getColumnKey('oldlogin_count', this.columnData);

      var newlogin_user = _utils2.default.getColumnKey('newlogin_user', this.columnData);
      var oldlogin_user = _utils2.default.getColumnKey('oldlogin_user', this.columnData);

      var logincounts_avg = _utils2.default.getColumnKey('logincounts_avg', this.columnData);

      var result = {
        category: [],
        series: []
      };
      var newData_obj = {};
      var newData = [];
      if (this.type == 1) {
        /*格式化数据*/
        data.forEach(function (item) {
          var date = item[count_date];
          if (!newData_obj.hasOwnProperty(item[count_date])) {
            newData_obj[date] = newData.push({
              count_time: date,
              serie1: Number(item[newlogin_count]),
              serie2: Number(item[oldlogin_count])
            });
          } else {
            newData[newData_obj[date] - 1].serie1 += item[newlogin_count] * 1;
            newData[newData_obj[date] - 1].serie2 += item[oldlogin_count] * 1;
          }
        });
        newData = newData.sort(function (a, b) {
          return moment(a.count_time) - moment(b.count_time);
        });
        result.category = [];
        result.series = [{
          name: newlogin_count,
          type: 'area',
          data: []
        }, {
          name: oldlogin_count,
          type: 'area',
          data: []
        }];
        newData.forEach(function (dt) {
          result.category.push(dt.count_time);
          result.series[0].data.push(dt.serie1);
          result.series[1].data.push(dt.serie2);
        });
        // result.category = category;
        // result.series = series;
      } else if (this.type == 2) {
        /*格式化数据*/
        data.forEach(function (item) {
          var date = item[count_date];
          if (!newData_obj.hasOwnProperty(item[count_date])) {
            newData_obj[date] = newData.push({
              count_time: date,
              serie1: Number(item[newlogin_user]),
              serie2: Number(item[oldlogin_user])
            });
          } else {
            newData[newData_obj[date] - 1].serie1 += item[newlogin_user] * 1;
            newData[newData_obj[date] - 1].serie2 += item[oldlogin_user] * 1;
          }
        });
        newData = newData.sort(function (a, b) {
          return moment(a.count_time) - moment(b.count_time);
        });
        result.category = [];
        result.series = [{
          name: newlogin_user,
          type: 'area',
          data: []
        }, {
          name: oldlogin_user,
          type: 'area',
          data: []
        }];
        newData.forEach(function (dt) {
          result.category.push(dt.count_time);
          result.series[0].data.push(dt.serie1);
          result.series[1].data.push(dt.serie2);
        });
      } else if (this.type == 3) {
        /*格式化数据*/
        data.forEach(function (item) {
          var date = item[count_date];
          if (!newData_obj.hasOwnProperty(item[count_date])) {
            newData_obj[date] = newData.push({
              count_time: date,
              serie1: Number(item[logincounts_avg])
            });
          } else {
            newData[newData_obj[date] - 1].serie1 += item[logincounts_avg] * 1;
          }
        });
        newData = newData.sort(function (a, b) {
          return moment(a.count_time) - moment(b.count_time);
        });
        result.category = [];
        result.series = [{
          name: logincounts_avg,
          type: 'area',
          data: []
        }];
        newData.forEach(function (dt) {
          result.category.push(dt.count_time);
          result.series[0].data.push(dt.serie1);
        });
      }
      //  result.category = category;
      //  result.series = series;
      return result;
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
    },
    type: function type(v, ov) {
      if (v != ov) {
        this.drawChart();
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(571), __webpack_require__(0)))

/***/ }),

/***/ 725:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('card', [_c('div', {
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
        _vm.changeType(1)
      }
    }
  }, [_vm._v("登录次数")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 2
    },
    on: {
      "click": function($event) {
        _vm.changeType(2)
      }
    }
  }, [_vm._v("活跃人数")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 3
    },
    on: {
      "click": function($event) {
        _vm.changeType(3)
      }
    }
  }, [_vm._v("平均登录次数")])])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "activeUserChart"
    }
  })])])
},staticRenderFns: []}

/***/ }),

/***/ 726:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(727)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(729),
  /* template */
  __webpack_require__(730),
  /* scopeId */
  "data-v-2f74266f",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(728);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("48a399bc", content, true);

/***/ }),

/***/ 728:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".table-content[data-v-2f74266f]{overflow:auto;width:100%;max-height:500px}", ""]);

// exports


/***/ }),

/***/ 729:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

var _utils = __webpack_require__(575);

var _utils2 = _interopRequireDefault(_utils);

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

exports.default = {
  name: 'chart-model-e8',
  components: {
    card: _card2.default
  },
  props: ["type", "typeChange", "columnData", "chartData"],
  methods: {
    changeType: function changeType(type) {
      this.typeChange(type);
    },
    drawChart: function drawChart() {
      var categories = [];
      var chartData = this.formatData(this.chartData);
      highchartUtil.drawChart('activeUserChart', 'area', chartData.category, chartData.series);
    },
    formatData: function formatData(data) {
      var count_date = _utils2.default.getColumnByIndex(0, this.chartData); //utils.getColumnKey('统计时间',this.columnData);
      var day_add_usr = _utils2.default.getColumnByIndex(1, this.chartData); //utils.getColumnKey('DAU（day_add_usr）',this.columnData);
      var day_old_user = _utils2.default.getColumnByIndex(2, this.chartData); //utils.getColumnKey('DAU（day_old_user）',this.columnData);

      var week_active_user = _utils2.default.getColumnByIndex(4, this.chartData); //utils.getColumnKey('WAU（week_active_user）',this.columnData);

      var month_active_user = _utils2.default.getColumnByIndex(5, this.chartData); //utils.getColumnKey('MAU（month_active_user）',this.columnData);

      var week_avg_active_days = _utils2.default.getColumnByIndex(6, this.chartData); //utils.getColumnKey('DAU/WAU（week_avg_active_days）',this.columnData);

      var month_avg_active_days = _utils2.default.getColumnByIndex(7, this.chartData); //utils.getColumnKey('DAU/MAU（month_avg_active_days）',this.columnData);

      var result = {
        category: [],
        series: []
      };
      var newData = [];
      if (this.type == 1) {
        /*格式化数据*/
        data.forEach(function (item) {
          // if(newData.length==0){
          newData.push({
            count_time: item[count_date],
            serie1: Number(item[day_add_usr].replace(/,/g, '')),
            serie2: Number(item[day_old_user].replace(/,/g, ''))
          });
          // }
          // else{
          //   newData.forEach((res)=>{
          //     if(item[count_date]==res['count_time']){
          //       res['serie1']+=Number(item.day_add_usr);
          //       res['serie2']+=Number(item.day_old_user);
          //     }
          //   })
          // }
        });
        // console.log(newData)
        var category = [];
        var series = [{ name: day_add_usr, type: 'area', data: [] }, { name: day_old_user, type: 'area', data: [] }];
        newData.forEach(function (dt) {
          category.push(dt.count_time);
          series[0].data.push(dt.serie1);
          series[1].data.push(dt.serie2);
        });
        result.category = category;
        result.series = series;
      } else if (this.type == 2) {
        /*格式化数据*/
        data.forEach(function (item) {
          // if(newData.length==0){
          newData.push({
            count_time: item[count_date],
            serie1: Number(item[week_active_user].replace(/,/g, ''))
          });
          // }
          // else{
          //   newData.forEach((res)=>{
          //     if(item[count_date]==res['count_time']){
          //       res['serie1']+=Number(item[week_active_user]);
          //     }
          //   })
          // }
        });
        var _category = [];
        var _series = [{ name: week_active_user, type: 'area', data: [] }];
        newData.forEach(function (dt) {
          _category.push(dt.count_time);
          _series[0].data.push(dt.serie1);
        });
        result.category = _category;
        result.series = _series;
      } else if (this.type == 3) {
        /*格式化数据*/
        data.forEach(function (item) {
          // if(newData.length==0){
          newData.push({
            count_time: item[count_date],
            serie1: Number(item[month_active_user].replace(/,/g, ''))
          });
          // }
          // else{
          //   newData.forEach((res)=>{
          //     if(item[count_date]==res['count_time']){
          //       res['serie1']+=Number(item[month_active_user]);
          //     }
          //   })
          // }
        });
        var _category2 = [];
        var _series2 = [{ name: month_active_user, type: 'area', data: [] }];
        newData.forEach(function (dt) {
          _category2.push(dt.count_time);
          _series2[0].data.push(dt.serie1);
        });
        result.category = _category2;
        result.series = _series2;
      } else if (this.type == 4) {
        /*格式化数据*/
        data.forEach(function (item) {
          // if(newData.length==0){
          newData.push({
            count_time: item[count_date],
            serie1: Number(item[week_avg_active_days].replace(/,/g, ''))
          });
          // }
          // else{
          //   newData.forEach((res)=>{
          //     if(item[count_date]==res['count_time']){
          //       res['serie1']+=Number(item[week_avg_active_days]);
          //     }
          //   })
          // }
        });
        var _category3 = [];
        var _series3 = [{ name: week_avg_active_days, type: 'area', data: [] }];
        newData.forEach(function (dt) {
          _category3.push(dt.count_time);
          _series3[0].data.push(dt.serie1);
        });
        result.category = _category3;
        result.series = _series3;
      } else if (this.type == 5) {
        /*格式化数据*/
        data.forEach(function (item) {
          // if(newData.length==0){
          newData.push({
            count_time: item[count_date],
            serie1: Number(item[month_avg_active_days].replace(/,/g, '')) //平均登录次数
          });
          // }
          // else{
          //   newData.forEach((res)=>{
          //     if(item[count_date]==res['count_time']){
          //       res['serie1']+=Number(item[month_avg_active_days]);
          //     }
          //   })
          // }
        });
        var _category4 = [];
        var _series4 = [{ name: month_avg_active_days, type: 'area', data: [] }];
        newData.forEach(function (dt) {
          _category4.push(dt.count_time);
          _series4[0].data.push(dt.serie1);
        });
        result.category = _category4;
        result.series = _series4;
      }
      return result;
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
    },
    type: function type(v, ov) {
      if (v != ov) {
        this.drawChart();
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(571)))

/***/ }),

/***/ 730:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v(_vm._s(_vm.$t('common.IndexKey')))]), _vm._v(" "), _c('div', {
    staticClass: "tabs"
  }, [_c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 1
    },
    on: {
      "click": function($event) {
        _vm.changeType(1)
      }
    }
  }, [_vm._v("DAU")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 2
    },
    on: {
      "click": function($event) {
        _vm.changeType(2)
      }
    }
  }, [_vm._v("WAU")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 3
    },
    on: {
      "click": function($event) {
        _vm.changeType(3)
      }
    }
  }, [_vm._v("MAU")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 4
    },
    on: {
      "click": function($event) {
        _vm.changeType(4)
      }
    }
  }, [_vm._v("DAU/WAU")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 5
    },
    on: {
      "click": function($event) {
        _vm.changeType(5)
      }
    }
  }, [_vm._v("DAU/MAU")])])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "activeUserChart"
    }
  })])])
},staticRenderFns: []}

/***/ }),

/***/ 731:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "active-user"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "isShowReg": true,
      "dateList": _vm.dateList
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c(_vm.currentView, {
    ref: "chartModel",
    tag: "component",
    attrs: {
      "type": _vm.type,
      "typeChange": _vm.changeType,
      "columnData": _vm.columnData,
      "chartData": _vm.tableData
    }
  }), _vm._v(" "), _c('card', [_c('div', {
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
      "tableData": _vm.reverseTableData
    }
  })], 1)])])], 1)])
},staticRenderFns: []}

/***/ })

});