webpackJsonp([15],{

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(810)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(812),
  /* template */
  __webpack_require__(818),
  /* scopeId */
  "data-v-1b869cc9",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 810:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(811);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("64a64c70", content, true);

/***/ }),

/***/ 811:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".overview-content[data-v-1b869cc9]{background-color:#eee;padding:20px}.overview-content .overview-row[data-v-1b869cc9]{width:100%;display:flex;justify-content:flex-start;align-items:flex-start}.overview-content .overview-row .small-card[data-v-1b869cc9]{flex:1;margin:10px;box-sizing:border-box}.overview-content .overview-row .middle-card[data-v-1b869cc9]{flex:2;margin:10px;box-sizing:border-box}.overview-content .overview-row .must-card[data-v-1b869cc9]{flex:3;margin:10px;box-sizing:border-box}.overview-content .overview-row .most-card[data-v-1b869cc9]{flex:4;margin:10px;box-sizing:border-box}.filters[data-v-1b869cc9]{width:100%;line-height:30px;padding:20px;display:flex;justify-content:flex-start;align-items:flex-start;background-color:#fff}.filters .filter-item[data-v-1b869cc9]{display:flex;justify-content:flex-start;align-items:center;padding:5px}.filters .filter-item .filter-label[data-v-1b869cc9]{max-width:120px}", ""]);

// exports


/***/ }),

/***/ 812:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, highchartUtil) {

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

var _detailTable = __webpack_require__(813);

var _detailTable2 = _interopRequireDefault(_detailTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'data-overview',
  components: {
    radioBtnGroup: _radioBtnGroup2.default,
    detailTable: _detailTable2.default
  },
  data: function data() {
    return {
      datetype: 0,
      date: moment().add(-1, 'day').format('YYYY-MM-DD'),

      gameSelect: null,
      gameList: [],

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
    this.getGameList();
  },

  methods: {
    query: function query() {
      this.getChartData();
      this.getTableData();
    },
    getGameList: function getGameList() {
      var _this = this;

      var params = {
        isCache: 1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date1: moment(this.date).format('YYYY-MM-DD'),
        in_date2: moment(this.date).format('YYYY-MM-DD'),
        in_game_id: '-1',
        in_type_id: 4, // 游戏列表
        in_selected_id: this.datetype
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          var gameList = data.state[0];
          var list = [];
          var game_name = utils.getColumnByIndex(1, gameList);
          gameList.forEach(function (item) {
            list.push((0, _stringify2.default)({
              game_id: item.game_id,
              game_name: item[game_name]
            }));
          });
          list = (0, _from2.default)(new _set2.default(list));
          list = list.map(function (item) {
            return JSON.parse(item);
          });
          _this.gameList = list;
          _this.gameSelect = list.length > 0 ? list[0] : null;

          // this.query()
        } else {
          _this.$notify.error({ message: data.message });
          console.error(data.message);
        }
      });
    },
    getChartData: function getChartData() {
      var _this2 = this;

      if (this.gameSelect) {
        var dateObj = this.getDate();
        var params = {
          isCache: 1,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: dateObj.date1,
          in_date2: dateObj.date2,
          in_game_id: this.gameSelect.game_id,
          in_type_id: 1, // 图表数据
          in_selected_id: this.datetype
        };
        _api2.default.user.getQuery(params).then(function (data) {
          if (data.code == 401) {
            _this2.chartData = data.state[0];
            _this2.drawLine();
          } else {
            _this2.$notify.error({ message: data.message });
            console.error(data.message);
          }
        });
      }
    },
    getTableData: function getTableData() {
      var _this3 = this;

      if (this.gameSelect) {
        var dateObj = this.getDate();
        var params = {
          isCache: 1,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: dateObj.date1,
          in_date2: dateObj.date2,
          in_game_id: this.gameSelect.game_id,
          in_type_id: 2, // 表格
          in_selected_id: this.datetype
        };
        _api2.default.user.getQuery(params).then(function (data) {
          if (data.code == 401) {
            _this3.tableData = data.state[0].sort(function (a, b) {
              return Number(b['充值']) - Number(a['充值']);
            });
            _this3.drawPie();
          } else {
            _this3.$notify.error({ message: data.message });
            console.error(data.message);
          }
        });
      }
    },
    getDate: function getDate() {
      var dateObj = {
        date1: '',
        date2: ''
      };

      if (this.datetype == 0) {
        dateObj.date1 = moment(this.date).format('YYYY-MM-DD');
        dateObj.date2 = moment(this.date).format('YYYY-MM-DD');
      } else if (this.datetype == 1) {
        dateObj.date1 = moment(this.date).day(1).format('YYYY-MM-DD');
        dateObj.date2 = moment(this.date).day(7).format('YYYY-MM-DD');
      } else if (this.datetype == 2) {
        dateObj.date1 = moment(this.date).date(1).format('YYYY-MM-DD');
        dateObj.date2 = moment(this.date).add(1, 'month').date(1).add(-1, 'day').format('YYYY-MM-DD');
      }
      console.log('类型:', this.datetype);
      console.log('date1:', dateObj.date1);
      console.log('date2:', dateObj.date2);
      return dateObj;
    },

    // drawChart() {
    //   this.drawPie()
    //   this.drawLine()
    // },
    drawPie: function drawPie() {
      console.log('drawPie');
      var game_name = utils.getColumnByIndex(0, this.tableData);
      var pay = utils.getColumnByIndex(2, this.tableData);
      var seriesData = [{
        name: '充值占比',
        data: []
      }];
      this.tableData.forEach(function (item) {
        seriesData[0].data.push([item[game_name], Number(item[pay])]);
      });
      highchartUtil.drawPieChart('over-chart-pie', seriesData);
    },
    drawLine: function drawLine() {
      console.log('drawLine');
      var count_date = utils.getColumnByIndex(0, this.chartData);
      var create_role = utils.getColumnByIndex(1, this.chartData);
      var pay = utils.getColumnByIndex(2, this.chartData);
      var active = utils.getColumnByIndex(3, this.chartData);

      var categories = [];
      var seriesData = [{
        name: '创角',
        data: []
      }, {
        name: '充值',
        data: []
      }, {
        name: '活跃',
        data: []
      }];
      this.chartData.forEach(function (item) {
        categories.push(item[count_date]);
        seriesData[0].data.push(Number(item[create_role]));
        seriesData[1].data.push(Number(item[pay]));
        seriesData[2].data.push(Number(item[active]));
      });
      highchartUtil.drawChart('over-chart-common', 'spline', categories, seriesData);
    }
  },
  watch: {
    datetype: function datetype(v, ov) {
      if (v != ov) {
        // this.drawChart()
        // this.query()
        if (v == 0) {
          this.date = moment().add(-1, 'day');
        } else if (v == 1) {
          this.date = moment().add(-1, 'day').add(-1, 'week');
        } else if (v == 2) {
          this.date = moment().add(-1, 'day').add(-1, 'month');
        }
      }
    },
    date: function date(v, ov) {
      if (v != ov) {
        // this.drawChart()
        this.query();
      }
    },
    gameSelect: function gameSelect(v, ov) {
      if (v != ov) {
        // this.drawChart()
        this.query();
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(571)))

/***/ }),

/***/ 813:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(814)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(816),
  /* template */
  __webpack_require__(817),
  /* scopeId */
  "data-v-56964562",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 814:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(815);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("f81adf40", content, true);

/***/ }),

/***/ 815:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".overview-content[data-v-56964562]{background-color:#eee;padding:20px}.overview-content .overview-row[data-v-56964562]{width:100%;display:flex;justify-content:flex-start;align-items:flex-start}.overview-content .overview-row .small-card[data-v-56964562]{flex:1;margin:10px;box-sizing:border-box}.overview-content .overview-row .middle-card[data-v-56964562]{flex:2;margin:10px;box-sizing:border-box}.overview-content .overview-row .must-card[data-v-56964562]{flex:3;margin:10px;box-sizing:border-box}.overview-content .overview-row .most-card[data-v-56964562]{flex:4;margin:10px;box-sizing:border-box}.icon-arrow-right[data-v-56964562]{display:inline-block;transform:rotate(270deg)}.icon-arrow-right.desc[data-v-56964562]{transform:rotate(90deg)}", ""]);

// exports


/***/ }),

/***/ 816:
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

exports.default = {
  name: 'country-table',
  props: ['tableData'],
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
        pay: 0
        // globlePayRate: 0,
        // cost: 0,
        // divided: 0,
        // todayProfit: 0

        // let totalPay = 0
        // this.tableData.forEach(item=>{
        //   totalPay+=Number(item['充值'])
        // })
      };this.tableData.forEach(function (item) {
        total.reg += Number(item['创角']);
        total.active += Number(item['活跃']);
        total.pay += Number(item['充值']);
        // total.globlePayRate += totalPay==0?0:Number(item['充值'])/totalPay*100
        // total.cost += Number(item['花费'])
        // total.divided += Number(item['分成'])
        // total.todayProfit += Number(item['当天利润'])
      });
      return {
        reg: Number(total.reg).toFixed(2),
        active: Number(total.active).toFixed(2),
        pay: Number(total.pay).toFixed(2)
        // globlePayRate: Number(total.globlePayRate).toFixed(2),
        // cost: Number(total.cost).toFixed(2),
        // divided: Number(total.divided).toFixed(2),
        // todayProfit: Number(total.todayProfit).toFixed(2),
      };
    }
  }
};

/***/ }),

/***/ 817:
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
  }, [_c('thead', [_c('tr', [_c('th', [_vm._v("游戏名")]), _vm._v(" "), _c('th', {
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
        _vm.sortKey = '创角';
        _vm.desc = !_vm.desc
      }
    }
  }, [_vm._v("创角"), (_vm.sortKey == '创角') ? _c('i', {
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
  }) : _vm._e()])])]), _vm._v(" "), _c('tbody', [_vm._l((_vm.sortTable), function(item, index) {
    return _c('tr', {
      key: index
    }, [_c('td', [_vm._v(_vm._s(item['游戏名']))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item['充值']))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Number(item['创角']).toFixed(0)))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Number(item['活跃']).toFixed(0)))])])
  }), _vm._v(" "), (_vm.sortTable.length <= 0) ? _c('tr', [_c('td', {
    attrs: {
      "colspan": "100"
    }
  }, [_vm._v("无数据")])]) : _vm._e()], 2), _vm._v(" "), _c('tfoot', [(_vm.tableData.length > 0) ? _c('tr', {
    staticStyle: {
      "color": "#0A95FE"
    }
  }, [_c('td', [_vm._v("汇总")]), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm.totalData.pay))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Number(_vm.totalData.reg).toFixed(0)))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Number(_vm.totalData.active).toFixed(0)))])]) : _vm._e()])])])])], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 818:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "filters"
  }, [_c('div', {
    staticClass: "filter-item"
  }, [_c('radio-btn-group', {
    attrs: {
      "startIndex": 0,
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
      value: (_vm.datetype === 0),
      expression: "datetype===0"
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
      value: (_vm.datetype === 1),
      expression: "datetype===1"
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
      value: (_vm.datetype === 2),
      expression: "datetype===2"
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
  }, [_vm._v("游戏：")]), _vm._v(" "), _c('el-select', {
    staticClass: "filter-content",
    attrs: {
      "value-key": "game_id"
    },
    model: {
      value: (_vm.gameSelect),
      callback: function($$v) {
        _vm.gameSelect = $$v
      },
      expression: "gameSelect"
    }
  }, _vm._l((_vm.gameList), function(item) {
    return _c('el-option', {
      key: item.game_id,
      attrs: {
        "value": item,
        "label": item.game_name
      }
    })
  }))], 1)]), _vm._v(" "), _c('div', {
    staticClass: "overview-content"
  }, [_c('div', {
    staticClass: "overview-row"
  }, [_c('el-card', {
    staticClass: "most-card"
  }, [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v("\n          " + _vm._s(_vm.gameSelect ? _vm.gameSelect.game_name : '') + "总览\n        ")]), _vm._v(" "), _c('div', {
    staticClass: "overview-row"
  }, [_c('div', {
    staticClass: "middle-card"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "over-chart-pie"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "most-card"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "over-chart-common"
    }
  })])])])], 1), _vm._v(" "), _c('detailTable', {
    attrs: {
      "tableData": _vm.tableData
    }
  })], 1)])
},staticRenderFns: []}

/***/ })

});