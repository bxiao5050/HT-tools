webpackJsonp([5],{

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(849)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(851),
  /* template */
  __webpack_require__(872),
  /* scopeId */
  "data-v-12ba3c56",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 849:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(850);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("41e10e74", content, true);

/***/ }),

/***/ 850:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".item-content[data-v-12ba3c56]{margin-right:15px;float:left;line-height:30px}.item-content .bt-item[data-v-12ba3c56]{cursor:pointer;padding:0 15px;float:left;background-color:#fff;border:1px solid #bbb;border-right:0;text-align:center}.item-content .bt-item[data-v-12ba3c56]:last-child{border-right:1px solid #bbb}.item-content .bt-item.check[data-v-12ba3c56]{font-weight:700;color:#fff;background-color:#fc9153}", ""]);

// exports


/***/ }),

/***/ 851:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, Utils) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moduleHeader = __webpack_require__(572);

var _moduleHeader2 = _interopRequireDefault(_moduleHeader);

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

var _marrySystem = __webpack_require__(852);

var _marrySystem2 = _interopRequireDefault(_marrySystem);

var _unionSystem = __webpack_require__(857);

var _unionSystem2 = _interopRequireDefault(_unionSystem);

var _petSystem = __webpack_require__(862);

var _petSystem2 = _interopRequireDefault(_petSystem);

var _armsSystem = __webpack_require__(867);

var _armsSystem2 = _interopRequireDefault(_armsSystem);

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

exports.default = {
  name: "sysParticiption",
  components: {
    moduleHeader: _moduleHeader2.default,
    marrySystem: _marrySystem2.default, // 结婚系统
    unionSystem: _unionSystem2.default, // 工会系统
    petSystem: _petSystem2.default, // 宠物系统
    armsSystem: _armsSystem2.default // 武器系统
  },
  data: function data() {
    return {
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      // dataProvider:[],

      now: null,
      config: [{
        id: 1,
        name: "结婚系统",
        view: "marrySystem",
        dataview: ""
      }, {
        id: 2,
        name: "工会系统",
        view: "unionSystem",
        dataview: ""
      }, {
        id: 3,
        name: "宠物系统",
        view: "petSystem",
        dataview: ""
      }, {
        id: 4,
        name: "武器系统",
        view: "armsSystem",
        dataview: ""
      }]
    };
  },
  mounted: function mounted() {
    this.now = this.config[0];
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
        isShowDatetype: false,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.query();
        }
      }];
    },
    currentView: function currentView() {
      if (this.now) return this.now.view;
      return this.config[0].view;
    }
  },
  methods: {
    getParams: function getParams(obj) {
      return {
        isCache: 1,
        in_date1: this.date1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters["Agent/selectedIdList"],
        in_reg_channel: this.$store.getters["RegChannel/selectedIdList"],
        // in_platform: '1,2',
        in_os: this.$store.getters["OS/nowOS"],
        in_type_id: this.now ? this.now.id : 1,
        in_select_id: obj ? obj.in_select_id : 1
      };
    },

    // 查询 第一个参数为子模块中的额外参数，通过emit触发,第二个参数为关键字，只做返回区分多个查询，不对其做任何处理
    query: function query(obj, key) {
      var _this2 = this;

      console.log('query', key);
      var params = this.getParams(obj);
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          // this.dataProvider= data.state
          _this2.$refs.participation.dataProvider(data.state, key);
        } else {
          Utils.Notification.error({
            message: data.message
          });
          console.error(data.message);
        }
      });
    },
    exportData: function exportData(obj) {
      var params = this.getParams(obj);
      _api2.default.user.exportData(params);
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14)))

/***/ }),

/***/ 852:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(853)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(855),
  /* template */
  __webpack_require__(856),
  /* scopeId */
  "data-v-38ddf248",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 853:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(854);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("415b6043", content, true);

/***/ }),

/***/ 854:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".chart-group[data-v-38ddf248]{padding:0 20px 20px;text-align:center}.chart-group .chart-desc[data-v-38ddf248]{line-height:30px;width:200px;display:inline-block;background-color:#f2f2f2}", ""]);

// exports


/***/ }),

/***/ 855:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

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

exports.default = {
  name: 'marry-system',
  components: {
    card: _card2.default, normalTable: _elementTable2.default
  },
  props: ["now"],
  data: function data() {
    return {
      tableData: [],
      columnData: []
    };
  },
  mounted: function mounted() {
    this.$emit('query', { in_select_id: 1 });
    // this.initPage()
  },

  methods: {
    dataProvider: function dataProvider(pdata) {
      this.tableData = pdata[0] || [];
      this.drawPieChart();
    },
    exportData: function exportData() {
      this.$emit('exportData', { in_select_id: 1 });
    },
    drawPieChart: function drawPieChart() {
      var template_name = utils.getColumnByIndex(0, this.tableData);
      var marry_rate = utils.getColumnByIndex(6, this.tableData);
      var divorce_rate = utils.getColumnByIndex(7, this.tableData);
      var marrySeries = [{ name: '玩家结婚率', data: [] }];
      var divorceSeries = [{ name: '玩家离婚率', data: [] }];
      this.tableData.forEach(function (item) {
        marrySeries[0].data.push([item[template_name], Number(item[marry_rate].split('%')[0])]);
        divorceSeries[0].data.push([item[template_name], Number(item[divorce_rate].split('%')[0])]);
      });
      highchartUtil.drawPieChart('marryPie', marrySeries);
      highchartUtil.drawPieChart('divorcePie', divorceSeries);
    }
  }
  // watch:{
  //   dataProvider:{
  //     deep:true,
  //     handler(v,ov){
  //       if(v!=ov){
  //         this.initPage()
  //       }
  //     }
  //   }
  // }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(571)))

/***/ }),

/***/ 856:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v(_vm._s(_vm.now ? (_vm.now.name + '-') : '') + "关键指标")]), _vm._v(" "), _c('div', {
    staticClass: "row",
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "col-md-6 chart-group"
  }, [_c('div', {
    attrs: {
      "id": "marryPie"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "chart-desc"
  }, [_vm._v("玩家结婚率")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-6 chart-group"
  }, [_c('div', {
    attrs: {
      "id": "divorcePie"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "chart-desc"
  }, [_vm._v("玩家离婚率")])])])]), _vm._v(" "), _c('card', [_c('div', {
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
  })], 1)])])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 857:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(858)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(860),
  /* template */
  __webpack_require__(861),
  /* scopeId */
  "data-v-bf0eaf1c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 858:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(859);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("09948314", content, true);

/***/ }),

/***/ 859:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".tab-types[data-v-bf0eaf1c]{position:absolute;right:100px;top:10px;vertical-align:middle;line-height:30px}.tab-types .tab-type-item[data-v-bf0eaf1c]{width:100px;text-align:center;border:1px solid #bbb;float:left;background-color:#eee}.tab-types .tab-type-item.active[data-v-bf0eaf1c]{background-color:#bbb;color:#fff}.item-content[data-v-bf0eaf1c]{padding:0 0 10px;margin-right:15px;display:flex;justify-content:flex-start;align-items:flex-start;line-height:30px}.item-content .bt-item[data-v-bf0eaf1c]{cursor:pointer;padding:0 15px;width:150px;background-color:#fff;border:1px solid #ddd;border-right:0;text-align:center}.item-content .bt-item[data-v-bf0eaf1c]:last-child{border-right:1px solid #ddd}.item-content .bt-item.check[data-v-bf0eaf1c]{font-weight:700;color:#fff;background-color:#fc9153;border:1px solid #fc9153}", ""]);

// exports


/***/ }),

/***/ 860:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

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

exports.default = {
  name: 'union-system',
  components: {
    card: _card2.default, normalTable: _elementTable2.default
  },
  props: ["date1", "now"],
  data: function data() {
    return {
      type: 1,

      tableData: []
    };
  },

  computed: {
    reverseTableData: function reverseTableData() {
      var result = this.tableData.map(function (item) {
        return item;
      });
      result.reverse();
      return result;
    }
  },
  mounted: function mounted() {
    this.$emit('query', { in_select_id: this.type });
  },

  methods: {
    dataProvider: function dataProvider(pdata) {
      this.tableData = pdata[0] || [];
      this.drawChart();
    },

    // initPage(){
    //   this.tableData = this.dataProvider[0]||[]
    //   this.drawChart()
    // },
    exportData: function exportData() {
      this.$emit('exportData', { in_select_id: this.type });
    },
    drawChart: function drawChart() {
      var count_date = utils.getColumnByIndex(0, this.tableData);
      var categories = [];
      var seriesData = [];
      for (var i = 0; i < this.tableData.length; i++) {
        for (var index in this.tableData[i]) {
          if (index != count_date) {
            if (this.type == 1) {
              seriesData.push({
                name: index,
                data: []
              });
            } else {
              seriesData.push({
                name: index,
                data: [],
                tooltip: {
                  valueSuffix: '%'
                }
              });
            }
          }
        }
        break;
      }
      this.tableData.forEach(function (item) {
        categories.push(item[count_date]);
        seriesData.forEach(function (serie) {
          serie.data.push(Number(item[serie.name].replace(/,/g, '').split('%')[0]));
        });
      });
      highchartUtil.drawChart('unionChart', 'spline', categories, seriesData);
    }
  },
  watch: {
    // dataProvider:{
    //   deep:true,
    //   handler(v,ov){
    //     if(v!=ov){
    //       this.initPage()
    //     }
    //   }
    // },
    date1: function date1(v, ov) {
      if (v != ov) {
        this.type = 1;
      }
    },
    type: function type(v, ov) {
      if (v != ov) {
        // this.drawChart()
        this.$emit('query', { in_select_id: this.type });
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(571)))

/***/ }),

/***/ 861:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v(_vm._s(_vm.now ? (_vm.now.name + '-') : '') + "关键指标\n      ")]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.type == 1
    },
    on: {
      "click": function($event) {
        _vm.type = 1
      }
    }
  }, [_vm._v("加入工会人数")]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.type == 2
    },
    on: {
      "click": function($event) {
        _vm.type = 2
      }
    }
  }, [_vm._v("占比")])]), _vm._v(" "), _c('div', {
    staticClass: "charts",
    attrs: {
      "id": "unionChart"
    }
  })])]), _vm._v(" "), _c('card', [_c('div', {
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
  })], 1)])])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 862:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(863)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(865),
  /* template */
  __webpack_require__(866),
  /* scopeId */
  "data-v-7b22247c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 863:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(864);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("7a756eed", content, true);

/***/ }),

/***/ 864:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".switchs-item[data-v-7b22247c]{padding:0 0 10px}.switchs-item .item-header[data-v-7b22247c]{width:80px;text-align:right}.switchs-item .item-content[data-v-7b22247c]{margin-right:15px;display:flex;justify-content:flex-start;align-items:flex-start;line-height:30px}.switchs-item .item-content .bt-item[data-v-7b22247c]{cursor:pointer;padding:0 15px;background-color:#fff;border:1px solid #ddd;border-right:0;text-align:center}.switchs-item .item-content .bt-item[data-v-7b22247c]:last-child{border-right:1px solid #ddd}.switchs-item .item-content .bt-item.check[data-v-7b22247c]{font-weight:700;color:#fff;background-color:#fc9153;border:1px solid #fc9153}.chart-nodata[data-v-7b22247c]{text-align:center;color:#5e7382}", ""]);

// exports


/***/ }),

/***/ 865:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

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
//
//
//
//
//
//
//

exports.default = {
  name: "pet-system",
  components: {
    card: _card2.default,
    normalTable: _elementTable2.default
  },
  props: ["date1", "now"],
  data: function data() {
    return {
      chartChargeType: 0,
      tableChargeType: 0,
      type: 1,
      payRange: ["全部", "大R", "中R", "中小R", "小R", "非R"],

      sourceData: [], // 包括全部充值区间的数据源
      chartData: []
    };
  },

  computed: {
    filterChartData: function filterChartData() {
      var paytype = utils.getColumnByIndex(1, this.chartData);
      var filterStr = "";
      filterStr = this.payRange[this.chartChargeType];
      var index = 0;
      return this.chartData.filter(function (item) {
        return item[paytype] === filterStr && index < 20 && ++index;
      });
    },
    filterTableData: function filterTableData() {
      var paytype = utils.getColumnByIndex(1, this.sourceData);
      var filterStr = "";
      filterStr = this.payRange[this.tableChargeType];
      return this.sourceData.filter(function (item) {
        return item[paytype] === filterStr;
      });
    },
    paytype: function paytype() {
      return utils.getColumnByIndex(1, this.sourceData);
    }
  },
  mounted: function mounted() {
    this.init();
  },

  methods: {
    init: function init() {
      this.$emit("query", { in_select_id: 2 }, "chart"); // 查询图表数据(人均战斗次数)
      this.$emit("query", { in_select_id: this.type }); // 查询表格数据
    },
    dataProvider: function dataProvider(pdata, key) {
      var sortStr = void 0;
      if (key && key === "chart") {
        sortStr = utils.getColumnByIndex(2, pdata[0]);
        this.chartData = pdata[0].sort(function (a, b) {
          return Number(b[sortStr]) - Number(a[sortStr]);
        }) || [];
        this.drawChart();
      } else {
        sortStr = utils.getColumnByIndex(2, pdata[0]);
        this.sourceData = pdata[0].sort(function (a, b) {
          return Number(b[sortStr]) - Number(a[sortStr]);
        }) || [];
      }
    },
    exportData: function exportData() {
      this.$emit("exportData", { in_select_id: this.type });
    },
    drawChart: function drawChart() {
      var petname = utils.getColumnByIndex(0, this.filterChartData);
      var payrange = utils.getColumnByIndex(1, this.filterChartData);
      var perwarcount = utils.getColumnByIndex(2, this.filterChartData);

      var categories = [];
      var seriesData = [];

      for (var i = 0; i < this.filterChartData.length; i++) {
        for (var index in this.filterChartData[i]) {
          if (index != petname && index != payrange && index != perwarcount) {
            seriesData.push({
              name: index,
              data: []
            });
          }
        }
        break;
      }
      this.filterChartData.forEach(function (item) {
        categories.push(item[petname]);
        seriesData.forEach(function (serie) {
          serie.data.push(Number(item[serie.name].replace(/,/g, "").split("%")[0]));
        });
      });

      highchartUtil.drawChart("petChart", "column", categories, seriesData);
    }
  },
  watch: {
    chartChargeType: function chartChargeType(v, ov) {
      if (v != ov) {
        this.drawChart();
      }
    },
    date1: function date1(v, ov) {
      if (v != ov) {
        this.type = 1;
        this.chartChargeType = 0;
        this.tableChargeType = 0;
        this.init();
      }
    },
    type: function type(v, ov) {
      if (v != ov) {
        // this.drawChart()
        this.$emit("query", { in_select_id: this.type });
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(571)))

/***/ }),

/***/ 866:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v(_vm._s(_vm.now ? (_vm.now.name + '-') : '') + "各等级玩家出战宠物人均战斗次数TOP20\n    ")]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("充值区间：")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, _vm._l((_vm.payRange), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "bt-item",
      class: {
        'check': _vm.chartChargeType == index
      },
      on: {
        "click": function($event) {
          _vm.chartChargeType = index
        }
      }
    }, [_vm._v(_vm._s(item))])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.chartData.length > 0),
      expression: "chartData.length>0"
    }],
    staticClass: "charts",
    attrs: {
      "id": "petChart"
    }
  }), _vm._v(" "), (_vm.chartData.length == 0) ? _c('div', {
    staticClass: "chart-nodata"
  }, [_vm._v("暂无数据")]) : _vm._e()])]), _vm._v(" "), _c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v(_vm._s(_vm.now ? (_vm.now.name + '-') : '') + "各等级玩家出战宠物战斗次数/人均战斗次数/占比分布")]), _vm._v(" "), _c('div', {
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
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("充值区间：")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, _vm._l((_vm.payRange), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "bt-item",
      class: {
        'check': _vm.tableChargeType == index
      },
      on: {
        "click": function($event) {
          _vm.tableChargeType = index
        }
      }
    }, [_vm._v(_vm._s(item))])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("类型：")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.type == 1
    },
    on: {
      "click": function($event) {
        _vm.type = 1
      }
    }
  }, [_vm._v("总战斗次数")]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.type == 2
    },
    on: {
      "click": function($event) {
        _vm.type = 2
      }
    }
  }, [_vm._v("人均战斗次数")]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.type == 3
    },
    on: {
      "click": function($event) {
        _vm.type = 3
      }
    }
  }, [_vm._v("占比")])])]), _vm._v(" "), _c('div', {
    staticClass: "table-content"
  }, [_c('normalTable', {
    attrs: {
      "hideColumn": _vm.paytype,
      "tableData": _vm.filterTableData
    }
  })], 1)])])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(868)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(870),
  /* template */
  __webpack_require__(871),
  /* scopeId */
  "data-v-9e5ae87c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(869);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("1fe03ab5", content, true);

/***/ }),

/***/ 869:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".switchs-item[data-v-9e5ae87c]{padding:0 0 10px}.switchs-item .item-header[data-v-9e5ae87c]{width:80px;text-align:right}.switchs-item .item-content[data-v-9e5ae87c]{margin-right:15px;display:flex;justify-content:flex-start;align-items:flex-start;line-height:30px}.switchs-item .item-content .bt-item[data-v-9e5ae87c]{cursor:pointer;padding:0 15px;background-color:#fff;border:1px solid #ddd;border-right:0;text-align:center}.switchs-item .item-content .bt-item[data-v-9e5ae87c]:last-child{border-right:1px solid #ddd}.switchs-item .item-content .bt-item.check[data-v-9e5ae87c]{font-weight:700;color:#fff;background-color:#fc9153;border:1px solid #fc9153}.chart-nodata[data-v-9e5ae87c]{text-align:center;color:#5e7382}", ""]);

// exports


/***/ }),

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

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
//
//
//
//
//
//
//

exports.default = {
  name: "arms-system",
  components: {
    card: _card2.default,
    normalTable: _elementTable2.default
  },
  props: ["date1", "now"],
  data: function data() {
    return {
      chartChargeType: 0,
      tableChargeType: 0,
      type: 1,

      payRange: ["全部", "大R", "中R", "中小R", "小R", "非R"],
      sourceData: [], // 包括全部充值区间的数据源
      chartData: []
    };
  },

  computed: {
    filterChartData: function filterChartData() {
      var paytype = utils.getColumnByIndex(1, this.chartData);
      var filterStr = "";
      filterStr = this.payRange[this.chartChargeType];
      var index = 0;
      return this.chartData.filter(function (item) {
        return item[paytype] === filterStr && index < 20 && ++index;
      });
    },
    filterTableData: function filterTableData() {
      var paytype = utils.getColumnByIndex(1, this.sourceData);
      var filterStr = "";
      filterStr = this.payRange[this.tableChargeType];
      return this.sourceData.filter(function (item) {
        return item[paytype] === filterStr;
      });
    },
    paytype: function paytype() {
      return utils.getColumnByIndex(1, this.sourceData);
    }
  },
  mounted: function mounted() {
    this.init();
  },

  methods: {
    init: function init() {
      this.$emit("query", { in_select_id: 2 }, "chart"); // 查询图表数据(人均战斗次数)
      this.$emit("query", { in_select_id: this.type }); // 查询表格数据
    },
    dataProvider: function dataProvider(pdata, key) {
      var sortStr = utils.getColumnByIndex(2, pdata[0]);
      if (key && key === "chart") {
        this.chartData = pdata[0].sort(function (a, b) {
          return Number(b[sortStr]) - Number(a[sortStr]);
        }) || [];
        this.drawChart();
      } else {
        this.sourceData = pdata[0].sort(function (a, b) {
          return Number(b[sortStr]) - Number(a[sortStr]);
        }) || [];
      }
    },
    exportData: function exportData() {
      this.$emit("exportData", { in_select_id: this.type });
    },
    drawChart: function drawChart() {
      var filterChartData = this.filterChartData;
      var petname = utils.getColumnByIndex(0, filterChartData);
      var payrange = utils.getColumnByIndex(1, filterChartData);
      var perwarcount = utils.getColumnByIndex(2, filterChartData);

      var categories = [];
      var seriesData = [];
      for (var i = 0; i < filterChartData.length; i++) {
        for (var index in filterChartData[i]) {
          if (index != petname && index != payrange && index != perwarcount) {
            seriesData.push({
              name: index,
              data: []
            });
          }
        }
        break;
      }
      filterChartData.forEach(function (item) {
        categories.push(item[petname]);
        seriesData.forEach(function (serie) {
          serie.data.push(Number(item[serie.name].replace(/,/g, "").split("%")[0]));
        });
      });
      highchartUtil.drawChart("petChart", "column", categories, seriesData);
    }
  },
  watch: {
    chartChargeType: function chartChargeType(v, ov) {
      if (v != ov) {
        this.drawChart();
      }
    },
    date1: function date1(v, ov) {
      if (v != ov) {
        this.type = 1;
        this.chartChargeType = 0;
        this.tableChargeType = 0;
        this.init();
      }
    },
    type: function type(v, ov) {
      if (v != ov) {
        // this.drawChart()
        this.$emit("query", { in_select_id: this.type });
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(571)))

/***/ }),

/***/ 871:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v(_vm._s(_vm.now ? (_vm.now.name + '-') : '') + "各等级玩家携带的武器人均战斗次数TOP20\n    ")]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("充值区间：")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, _vm._l((_vm.payRange), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "bt-item",
      class: {
        'check': _vm.chartChargeType == index
      },
      on: {
        "click": function($event) {
          _vm.chartChargeType = index
        }
      }
    }, [_vm._v(_vm._s(item))])
  }))]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.chartData.length > 0),
      expression: "chartData.length>0"
    }],
    staticClass: "charts",
    attrs: {
      "id": "petChart"
    }
  }), _vm._v(" "), (_vm.chartData.length == 0) ? _c('div', {
    staticClass: "chart-nodata"
  }, [_vm._v("暂无数据")]) : _vm._e()])]), _vm._v(" "), _c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v(_vm._s(_vm.now ? (_vm.now.name + '-') : '') + "各等级玩家携带的武器战斗次数/人均战斗次数/占比分布")]), _vm._v(" "), _c('div', {
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
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("充值区间：")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, _vm._l((_vm.payRange), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "bt-item",
      class: {
        'check': _vm.tableChargeType == index
      },
      on: {
        "click": function($event) {
          _vm.tableChargeType = index
        }
      }
    }, [_vm._v(_vm._s(item))])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("类型：")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.type == 1
    },
    on: {
      "click": function($event) {
        _vm.type = 1
      }
    }
  }, [_vm._v("总战斗次数")]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.type == 2
    },
    on: {
      "click": function($event) {
        _vm.type = 2
      }
    }
  }, [_vm._v("人均战斗次数")]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.type == 3
    },
    on: {
      "click": function($event) {
        _vm.type = 3
      }
    }
  }, [_vm._v("占比")])])]), _vm._v(" "), _c('div', {
    staticClass: "table-content"
  }, [_c('normalTable', {
    attrs: {
      "hideColumn": _vm.paytype,
      "tableData": _vm.filterTableData
    }
  })], 1)])])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 872:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "dateList": _vm.dateList,
      "isShowReg": true
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("选择系统:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, _vm._l((_vm.config), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "bt-item",
      class: {
        'check': _vm.now && item.id === _vm.now.id
      },
      on: {
        "click": function($event) {
          _vm.now = item
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('div')], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c(_vm.currentView, {
    ref: "participation",
    tag: "component",
    attrs: {
      "now": _vm.now,
      "date1": _vm.date1
    },
    on: {
      "query": _vm.query,
      "exportData": _vm.exportData
    }
  })], 1)])
},staticRenderFns: []}

/***/ })

});