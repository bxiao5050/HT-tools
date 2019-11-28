webpackJsonp([0],{

/***/ 1038:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1039);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("3875d673", content, true);

/***/ }),

/***/ 1039:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".wrap[data-v-578de879]{width:100%}.wrap .wrap-fir[data-v-578de879]{background:rgba(208,196,214,.5);margin:10px}.btn[data-v-578de879]{line-height:1;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;border-color:#dcdfe6;color:#606266;-webkit-appearance:none;text-align:center;box-sizing:border-box;outline:none;margin:0;transition:.1s;font-weight:500;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;padding:8px 16px;font-size:14px;border-radius:4px;float:left}.btn-box .btn[data-v-578de879]{margin:8px 0 0 8px}.btn.on[data-v-578de879]{background:#5b5691;color:#fff}.card[data-v-578de879]{margin:15px 15px 0;box-sizing:border-box}.end[data-v-578de879]{justify-content:flex-end}.end button[data-v-578de879]{font-size:16px;width:100px;text-align:center;height:38px;line-height:37px;padding:0;margin:0 15px 10px}.end button[data-v-578de879]:first-child{margin-right:0}", ""]);

// exports


/***/ }),

/***/ 1040:
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

exports.default = {
  name: 'TDSP',
  data: function data() {
    return {

      region: null,
      regionArr: [],
      regionClass: {},

      game: null,
      gameArr: [],
      gameClass: {},
      gameList: null
    };
  },
  watch: {
    regionArr: function regionArr() {
      var list = this.$store.getters['overseas_common/getList1'];
      if (this.regionArr.length > 1) {
        this.gameList = list.child;
      } else {
        var id = this.regionArr[0];
        this.gameList = list[id].children;
      }
    }
  },
  methods: {
    changeGame: function changeGame(id) {
      var _this = this;

      var style = {};
      if (this.gameClass[id]) {
        if (this.autoConfirm) {
          return;
        }
        this.gameArr = [];
        this.game = null;
      } else {
        var list = this.$store.getters['overseas_common/getList1'];
        style[id] = true;
        this.gameArr = [id];
        this.game = list[id].area_app_name;
      }
      this.$data.gameClass = style;
      if (this.autoConfirm) {
        setTimeout(function () {
          _this.confirm();
        }, 300);
      }
    },
    changeRegion: function changeRegion(id) {
      var list = this.$store.getters['overseas_common/getList1'];
      var style = {};
      if (id > 0) {
        // 单个地区
        style[id] = true;
        this.regionArr = [id];
        this.region = list[id].area_app_name;
      } else {
        // 所有地区
        style[0] = true;
        this.regionArr = list.parent.map(function (item) {
          return item.unite_id;
        });
        this.region = this.data.allTxt;
      }
      this.$data.regionClass = style;
    },
    close: function close() {
      this.data.isShow = false;
    },
    confirm: function confirm() {
      if (this.regionArr.length === 1) {
        var list = this.$store.getters['overseas_common/getList1'];
        var gameId = this.gameArr[0];
        var regionId = this.regionArr[0];
        if (gameId && list[gameId].parent_id != regionId) {
          this.game = null;
          this.gameArr = [];
        }
      }
      this.data.callback && this.data.callback([this.region, this.regionArr, this.game, this.gameArr]);
      this.close();
    },
    initData: function initData() {
      this.regionArr = this.data.regionArr;
      this.region = this.data.region;
      this.gameArr = this.data.gameArr;
      this.game = this.data.game;
    },
    initStyle: function initStyle() {
      var regionClass = {},
          regionId = 0,
          gameClass = {},
          gameId = 0;
      if (this.region) {
        if (this.regionArr.length === 1) {
          regionId = this.regionArr[0];
        }
        regionClass[regionId] = true;
      }
      if (this.game) {
        if (this.gameArr.length === 1) {
          gameId = this.gameArr[0];
        }
        gameClass[gameId] = true;
      }
      this.regionClass = regionClass;
      this.gameClass = gameClass;
    }
  },
  props: ["data", "autoConfirm"],
  beforeMount: function beforeMount() {
    this.initData();
    this.initStyle();
  },
  mounted: function mounted() {
    window.addEventListener("keydown", this.confirm);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener("keydown", this.confirm);
  }
};

/***/ }),

/***/ 1041:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('my-col', {
    staticClass: "wrap"
  }, [_c('my-col', {
    staticClass: "wrap-fir"
  }, [_c('my-card', {
    staticClass: "card"
  }, [_c('my-row', [_c('div', {
    class: _vm.regionClass[0] ? 'btn on' : 'btn',
    on: {
      "click": function($event) {
        _vm.changeRegion(0)
      }
    }
  }, [_vm._v(_vm._s(_vm.data.allTxt))])]), _vm._v(" "), _c('div', {
    staticClass: "btn-box"
  }, _vm._l((_vm.$store.getters['overseas_common/getList1'].parent), function(item, i) {
    return _c('div', {
      key: i,
      class: _vm.regionClass[item.unite_id] ? 'btn on' : 'btn',
      on: {
        "click": function($event) {
          _vm.changeRegion(item.unite_id)
        }
      }
    }, [_vm._v("\n          " + _vm._s(item.area_app_name) + "\n        ")])
  }))], 1), _vm._v(" "), _c('my-card', {
    staticClass: "card",
    staticStyle: {
      "margin-bottom": "15px"
    }
  }, [_c('div', {
    staticClass: "btn-box"
  }, _vm._l((_vm.gameList), function(item, i) {
    return _c('div', {
      key: i,
      class: _vm.gameClass[item.unite_id] ? 'btn on' : 'btn',
      on: {
        "click": function($event) {
          _vm.changeGame(item.unite_id)
        }
      }
    }, [_vm._v("\n          " + _vm._s(item.area_app_name) + "\n        ")])
  }))])], 1), _vm._v(" "), (!_vm.autoConfirm) ? _c('my-row', {
    staticClass: "end"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.confirm()
      }
    }
  }, [_vm._v("确认修改")]), _vm._v(" "), _c('el-button', {
    on: {
      "click": function($event) {
        _vm.close()
      }
    }
  }, [_vm._v("关闭窗口")])], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(647)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(649),
  /* template */
  __webpack_require__(650),
  /* scopeId */
  "data-v-0d9eeecc",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawSparkChart = exports.drawInlineChart = exports.drawBarChart = exports.drawPieChart = exports.drawOppositeBar = exports.drawFiveMinLine = exports.drawChart = exports.draw = undefined;

var _assign = __webpack_require__(56);

var _assign2 = _interopRequireDefault(_assign);

var _highcharts = __webpack_require__(269);

var _highcharts2 = _interopRequireDefault(_highcharts);

var _utils = __webpack_require__(575);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_highcharts2.default.setOptions({
  lang: {
    thousandsSep: ','
  },
  colors: ['#9B86D9', '#62C87F', '#FC863F', '#5D9CEC', '#F26262', '#2EC7C9', '#DDCC0B', '#95706D', '#8D98B3']
});
var optionConfig = {
  credits: {
    enabled: false
  },
  title: {
    text: null
  },
  subtitle: {
    text: null
  },
  tooltip: {
    crosshairs: [{
      width: 1,
      color: 'gray'
    }],
    shared: true
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'top',
    borderWidth: 0,
    margin: 0,
    padding: 0
  },
  plotOptions: {
    spline: {
      marker: {
        enabled: false,
        radius: 3,
        lineColor: '#FFFFFF',
        lineWidth: 1
      },
      lineWidth: 2,
      states: {
        hover: {
          lineWidth: 3
        }
      }
    },
    bar: {
      dataLabels: {
        enabled: false,
        allowOverlap: true
      }
    }
  }
};
var draw = function draw(option) {
  var options = (0, _assign2.default)({}, optionConfig);
  _utils2.default.mergeObject(options, option);
  return new _highcharts2.default.Chart(options);
};
var drawChart = function drawChart(chart_id, chartType, categories, series) {
  var isRate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var title = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

  var option = {
    chart: {
      renderTo: chart_id,
      type: chartType
    },
    subtitle: {
      text: title || "",
      align: 'left',
      verticalAlign: 'top'
    },
    xAxis: {
      categories: categories
    },
    yAxis: [{
      title: {
        text: null
      },
      labels: {
        formatter: function formatter() {
          return this.value;
        }
      },
      allowDecimals: true
    }, {
      title: {
        text: null
      },
      labels: {
        formatter: function formatter() {
          return isRate !== undefined && isRate ? this.value + "%" : this.value;
        }
      },
      allowDecimals: true,
      opposite: true
    }],
    series: series
  };
  return draw(option);
};

var drawFiveMinLine = function drawFiveMinLine(chart_id, categories, series) {
  var option = {
    chart: {
      renderTo: chart_id,
      type: 'line'
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function formatter() {
          return this.value;
        }
      },
      min: 0,
      allowDecimals: false
    },
    tooltip: {
      crosshairs: [{
        width: 1,
        color: 'gray'
      }],
      borderWidth: 1,
      shadow: false,
      shared: true,
      useHTML: true,
      headerFormat: '<small>{point.key}</small><table>',
      pointFormat: '<tr><td>{series.name}: </td><td>峰值:{series.options.max}</td><td style="text-align: right">当前值:{point.y}</td></tr>',
      footerFormat: '</table>',
      valueDecimals: 2,
      stickyTracking: false
    },
    series: series
  };
  return draw(option);
};
/**
 * 条形图  左右分隔
 * @param {*} chart_id 
 * @param {*} categories 
 * @param {*} seriesData 
 */
var drawOppositeBar = function drawOppositeBar(chart_id, categories, seriesData) {
  var option = {
    chart: {
      renderTo: chart_id,
      type: 'bar'
    },
    xAxis: [{
      categories: categories,
      reversed: false,
      labels: {
        step: 1
      }
    }],
    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function formatter() {
          return Math.abs(this.value);
        }
      }
    },
    series: seriesData,
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    tooltip: {
      formatter: function formatter() {
        return '<b>' + this.series.name + '</b><br/> ' + this.point.category + ':' + _highcharts2.default.numberFormat(Math.abs(this.point.y), 0);
      }
    }
  };
  return draw(option);
};

/**
 * 
 * @param {String} chart_id - 容器id 
 * @param {Array} seriesData - data []
 * @param {*} clickPieItem - 触发事件
 */

var drawPieChart = function drawPieChart(chart_id, seriesData) {
  var clickPieItem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Function();

  var option = {
    chart: {
      renderTo: chart_id,
      type: 'pie'
    },
    series: seriesData,
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true,
        events: {
          click: clickPieItem
          // function(e) {
          //   clickPieItem(e)
          // }
        }
      }
    },
    tooltip: {
      headerFormat: '{series.name}<br>',
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    }
  };
  return draw(option);
};

var drawBarChart = function drawBarChart(chart_id, categories, seriesData, barTitle) {
  var isRate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  var option = {
    chart: {
      renderTo: chart_id,
      type: 'bar'
    },
    subtitle: {
      text: barTitle || "",
      align: 'left',
      verticalAlign: 'top'
    },
    xAxis: [{
      categories: categories,
      reversed: false,
      labels: {
        step: 1
      }
    }],
    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function formatter() {
          return isRate !== undefined && isRate ? Math.abs(this.value) + "%" : Math.abs(this.value);
        }
      }
    },
    series: seriesData,
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
          allowOverlap: true
        }
      }
    },
    tooltip: {
      shared: true
    }
  };
  return draw(option);
};

var drawInlineChart = function drawInlineChart(chart_id, categories, seriesData) {
  var option = {
    chart: {
      renderTo: chart_id,
      type: 'spline'
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: categories,
      labels: {
        enabled: false
      },
      tickWidth: 0,
      lineColor: '#fff'
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 0
    },
    plotOptions: {
      series: {
        lineWidth: 2,
        marker: {
          enabled: false
        },
        states: {
          hover: {
            lineWidth: 3
          }
        }
      }
    },
    tooltip: {
      useHTML: true,
      formatter: function formatter() {
        return this.y;
      }
    },
    legend: {
      enabled: false
    },
    series: seriesData
  };
  return draw(option);
};

var drawSparkChart = function drawSparkChart(chart_id, seriesData) {
  var option = {
    chart: {
      renderTo: chart_id,
      type: 'spline'
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      startOnTick: false,
      endOnTick: false,
      tickPositions: [],
      tickWidth: 0,
      lineColor: '#fff'
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      tickPositions: [0]
    },
    tooltip: {
      borderWidth: 0,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      shadow: false,
      useHTML: true,
      formatter: function formatter() {
        return this.y;
      }
    },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 2,
        shadow: false,
        states: {
          hover: {
            lineWidth: 2
          }
        },
        marker: {
          radius: 1,
          states: {
            hover: {
              radius: 2
            }
          }
        },
        fillOpacity: 0.25
      }
    },
    legend: {
      enabled: false
    },
    series: seriesData
  };
  return draw(option);
};

exports.draw = draw;
exports.drawChart = drawChart;
exports.drawFiveMinLine = drawFiveMinLine;
exports.drawOppositeBar = drawOppositeBar;
exports.drawPieChart = drawPieChart;
exports.drawBarChart = drawBarChart;
exports.drawInlineChart = drawInlineChart;
exports.drawSparkChart = drawSparkChart;

/***/ }),

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(623)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(625),
  /* template */
  __webpack_require__(646),
  /* scopeId */
  "data-v-62ebe656",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(651)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(653),
  /* template */
  __webpack_require__(654),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(659)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(661),
  /* template */
  __webpack_require__(662),
  /* scopeId */
  "data-v-606892f2",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 575:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeDate = undefined;

var _typeof2 = __webpack_require__(33);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  _isEmpty: function _isEmpty(value) {
    if (value == null || value == undefined) {
      return false;
    }
    if (Array.isArray(value) || typeof value == 'string' || typeof value.splice == 'function') {
      return !value.length;
    }
    if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) == 'object') {
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          return false;
        }
      }
    }
    return true;
  },
  mergeObject: function mergeObject(obj, newObj) {
    for (var i in newObj) {
      obj[i] = newObj[i];
    }
  },
  getColumnKey: function getColumnKey(col, columns) {
    for (var i = 0; i < columns.length; i++) {
      if (col == columns[i].columnName) {
        return columns[i].columnValue;
      }
    }
    return col;
  },
  getColumnByIndex: function getColumnByIndex(index, data) {
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      var count = 0;
      for (var j in obj) {
        if (count === index) {
          return j;
        }
        count++;
      }
    }
    return '';
  }
};
var changeDate = exports.changeDate = function changeDate(param) {
  var query = true;
  for (var name in param) {
    if (this[name] === param[name]) query = !query;
    this[name] = param[name];
  }
  if (query) this.query();
};

/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(685)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(687),
  /* template */
  __webpack_require__(688),
  /* scopeId */
  "data-v-67a3e21c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 580:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(673)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(675),
  /* template */
  __webpack_require__(676),
  /* scopeId */
  "data-v-811eebda",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(667), __esModule: true };

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1038)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1040),
  /* template */
  __webpack_require__(1041),
  /* scopeId */
  "data-v-578de879",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(637)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(639),
  /* template */
  __webpack_require__(640),
  /* scopeId */
  "data-v-da8fb732",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(275);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),

/***/ 603:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(787)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(789),
  /* template */
  __webpack_require__(790),
  /* scopeId */
  "data-v-67ee3036",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 623:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(624);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("55d10c50", content, true);

/***/ }),

/***/ 624:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".module-header[data-v-62ebe656]{display:flex;font-size:13px;padding:18px 0 0;flex-wrap:wrap;background-color:#fff}.module-header .switch-group[data-v-62ebe656]{margin-bottom:12px;display:flex}.module-header .switch-group .switchs-item[data-v-62ebe656]{flex-shrink:0;display:flex;align-items:center}.module-header .switch-group .switchs-item .item-header[data-v-62ebe656]{display:flex;align-items:center;margin-left:17px;margin-right:15px;flex-shrink:0}.module-header .switch-group .switchs-item .item-content[data-v-62ebe656]{margin-right:15px;float:left;line-height:30px}.module-header .switch-group .switchs-item .item-content .bt-item[data-v-62ebe656]{cursor:pointer;padding:0 15px;float:left;background-color:#fff;border:1px solid #ddd;border-right:0;text-align:center}.module-header .switch-group .switchs-item .item-content .bt-item[data-v-62ebe656]:last-child{border-right:1px solid #ddd}.module-header .switch-group .switchs-item .item-content .bt-item.check[data-v-62ebe656]{font-weight:700;color:#fff;background-color:#fc9153;border:1px solid #fc9153}.module-header select[data-v-62ebe656]{height:32px!important;padding:0 0 0 8px;box-sizing:border-box;border-right:0}", ""]);

// exports


/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datepicker = __webpack_require__(626);

var _datepicker2 = _interopRequireDefault(_datepicker);

var _trigger = __webpack_require__(601);

var _trigger2 = _interopRequireDefault(_trigger);

var _trigger3 = __webpack_require__(641);

var _trigger4 = _interopRequireDefault(_trigger3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'module-header',
  components: {
    datepicker: _datepicker2.default,
    regtrigger: _trigger2.default,
    paytrigger: _trigger4.default
  },
  props: {
    isShowReg: Boolean,
    isShowPay: Boolean,
    daypicker: Function,
    dayselect: Function,
    // header: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       title: '未定义模块名', //菜单模块标题
    //       definedContent: '', //自定义内容
    //       isShowIndex: false, //是否显示指标说明
    //     }
    //   }
    // },
    dateList: {
      type: Array,
      default: function _default() {
        return [{
          single: true, //是否为单日期组件
          uid: 'date1', //生成的日期组件唯一标识
          label: undefined.$t('common.Date'), //日期label说明
          startDate: moment().format('YYYY-MM-DD'), //开始日期
          endDate: '', //结束日期(当组件为单日期组件时传空值)
          isShowDatetype: false,
          change: function change(newDate) {
            return console.log(newDate);
          } //日期变化回调
        }];
      }
    }
  },
  data: function data() {
    return {
      datetype: 1,
      types: [{
        id: 1,
        name: this.$t('common.Day')
      }, {
        id: 2,
        name: this.$t('common.Week')
      }, {
        id: 3,
        name: this.$t('common.Month')
      }],
      isShowTip: false
    };
  },

  watch: {
    datetype: function datetype(v, ov) {
      if (v != ov) {
        this.$emit('datetypeChange', v);
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(627)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(629),
  /* template */
  __webpack_require__(636),
  /* scopeId */
  "data-v-130c57c6",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(628);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("50477aa8", content, true);

/***/ }),

/***/ 628:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".date-picker[data-v-130c57c6]{display:flex}.date-picker input[data-v-130c57c6]{font-size:13px!important;padding:0;text-align:center;height:32px;line-height:32px;width:198px}.date-picker input.single[data-v-130c57c6]{width:128px}", ""]);

// exports


/***/ }),

/***/ 629:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, $) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(630);

var _daypicker = __webpack_require__(631);

var _daypicker2 = _interopRequireDefault(_daypicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    daypicker: _daypicker2.default
    // dayselect
  },
  props: {
    daypicker: _daypicker2.default,
    // dayselect,
    uid: {
      default: "datepicker"
    },
    date: {
      default: function _default() {
        return {
          startDate: moment().format("YYYY-MM-DD"),
          endDate: moment().format("YYYY-MM-DD")
        };
      }
    },
    single: {
      default: false
    },
    changeDate: {
      type: Function
    }
  },
  data: function data() {
    return {
      rangeDate: {
        startDate: "",
        endDate: ""
      }
    };
  },
  mounted: function mounted() {
    this.$id = $("#" + this.uid);
    this.renderDatePicker();
  },
  beforeDestroy: function beforeDestroy() {
    this.$id.data("daterangepicker").remove();
  },

  methods: {
    renderDatePicker: function renderDatePicker() {
      var _this = this;

      var options = {
        locale: {
          format: 'YYYY-MM-DD',
          customRangeLabel: "自定义",
          applyLabel: '确定',
          cancelLabel: '取消'
        },
        "ranges": {
          "今天": [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
          "昨天": [moment().add(-1, "days").format("YYYY-MM-DD"), moment().add(-1, "days").format("YYYY-MM-DD")],
          "过去7天": [moment().add(-7, "days").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
          "过去30天": [moment().add(-30, "days").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
          "本月": [moment().date(1).format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
          "上月": [moment().add(-1, "month").date(1).format("YYYY-MM-DD"), moment().date(1).add(-1, "days").format("YYYY-MM-DD")]
        },
        "alwaysShowCalendars": true,
        "opens": "right",
        "drops": "down",
        "singleDatePicker": this.single ? true : false,
        "startDate": "",
        "endDate": ""
      };
      if (this.single) {
        options.startDate = this.date.startDate;
      } else {
        options.startDate = this.date.startDate;
        options.endDate = this.date.endDate;
      }
      this.$id.daterangepicker(options, function (start, end, label) {
        _this.rangeDate = {
          startDate: moment(start).format('YYYY-MM-DD'), // moment(start).format('YYYY-MM-DD'),
          endDate: moment(end).format('YYYY-MM-DD') //moment(end).format('YYYY-MM-DD')
        };

        _this.changeDate(_this.rangeDate);
      });
    }
  },
  watch: {
    date: {
      deep: true,
      handler: function handler(v, ov) {
        if (v != ov) {
          this.renderDatePicker();
        }
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(32)))

/***/ }),

/***/ 630:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
* @version: 2.1.30
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2017 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: http://www.daterangepicker.com/
*/
// Follow the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
(function (root, factory) {
    if (true) {
        // AMD. Make globaly available as well
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(32)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (moment, jquery) {
            if (!jquery.fn) jquery.fn = {}; // webpack server rendering
            return factory(moment, jquery);
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module === 'object' && module.exports) {
        // Node / Browserify
        //isomorphic issue
        var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;
        if (!jQuery) {
            jQuery = require('jquery');
            if (!jQuery.fn) jQuery.fn = {};
        }
        var moment = (typeof window != 'undefined' && typeof window.moment != 'undefined') ? window.moment : require('moment');
        module.exports = factory(moment, jQuery);
    } else {
        // Browser globals
        root.daterangepicker = factory(root.moment, root.jQuery);
    }
}(this, function(moment, $) {
    var DateRangePicker = function(element, options, cb) {

        //default settings for options
        this.parentEl = 'body';
        this.element = $(element);
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.minDate = false;
        this.maxDate = false;
        this.dateLimit = false;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.showISOWeekNumbers = false;
        this.showCustomRangeLabel = true;
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.linkedCalendars = true;
        this.autoUpdateInput = true;
        this.alwaysShowCalendars = false;
        this.ranges = {};

        this.opens = 'right';
        if (this.element.hasClass('pull-right'))
            this.opens = 'left';

        this.drops = 'down';
        if (this.element.hasClass('dropup'))
            this.drops = 'up';

        this.buttonClasses = 'btn btn-sm';
        this.applyClass = 'btn-success';
        this.cancelClass = 'btn-default';

        this.locale = {
            direction: 'ltr',
            format: moment.localeData().longDateFormat('L'),
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };

        this.callback = function() { };

        //some state information
        this.isShowing = false;
        this.leftCalendar = {};
        this.rightCalendar = {};

        //custom options from user
        if (typeof options !== 'object' || options === null)
            options = {};

        //allow setting options with data attributes
        //data-api options will be overwritten with custom javascript options
        options = $.extend(this.element.data(), options);

        //html template for the picker UI
        if (typeof options.template !== 'string' && !(options.template instanceof $))
            options.template = '<div class="daterangepicker dropdown-menu">' +
                '<div class="calendar left">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini form-control" type="text" name="daterangepicker_start" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="calendar right">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini form-control" type="text" name="daterangepicker_end" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="ranges">' +
                    '<div class="range_inputs">' +
                        '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                        '<button class="cancelBtn" type="button"></button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(options.template).appendTo(this.parentEl);

        //
        // handle all the possible options overriding defaults
        //

        if (typeof options.locale === 'object') {

            if (typeof options.locale.direction === 'string')
                this.locale.direction = options.locale.direction;

            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;

            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;

            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

            if (typeof options.locale.monthNames === 'object')
              this.locale.monthNames = options.locale.monthNames.slice();

            if (typeof options.locale.firstDay === 'number')
              this.locale.firstDay = options.locale.firstDay;

            if (typeof options.locale.applyLabel === 'string')
              this.locale.applyLabel = options.locale.applyLabel;

            if (typeof options.locale.cancelLabel === 'string')
              this.locale.cancelLabel = options.locale.cancelLabel;

            if (typeof options.locale.weekLabel === 'string')
              this.locale.weekLabel = options.locale.weekLabel;

            if (typeof options.locale.customRangeLabel === 'string'){
                //Support unicode chars in the custom range name.
                var elem = document.createElement('textarea');
                elem.innerHTML = options.locale.customRangeLabel;
                var rangeHtml = elem.value;
                this.locale.customRangeLabel = rangeHtml;
            }
        }
        this.container.addClass(this.locale.direction);

        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);

        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);

        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);

        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);

        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);

        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);

        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);

        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);

        // sanity check for bad options
        if (this.minDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();

        // sanity check for bad options
        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();

        if (typeof options.applyClass === 'string')
            this.applyClass = options.applyClass;

        if (typeof options.cancelClass === 'string')
            this.cancelClass = options.cancelClass;

        if (typeof options.dateLimit === 'object')
            this.dateLimit = options.dateLimit;

        if (typeof options.opens === 'string')
            this.opens = options.opens;

        if (typeof options.drops === 'string')
            this.drops = options.drops;

        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;

        if (typeof options.showISOWeekNumbers === 'boolean')
            this.showISOWeekNumbers = options.showISOWeekNumbers;

        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;

        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');

        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;

        if (typeof options.showCustomRangeLabel === 'boolean')
            this.showCustomRangeLabel = options.showCustomRangeLabel;

        if (typeof options.singleDatePicker === 'boolean') {
            this.singleDatePicker = options.singleDatePicker;
            if (this.singleDatePicker)
                this.endDate = this.startDate.clone();
        }

        if (typeof options.timePicker === 'boolean')
            this.timePicker = options.timePicker;

        if (typeof options.timePickerSeconds === 'boolean')
            this.timePickerSeconds = options.timePickerSeconds;

        if (typeof options.timePickerIncrement === 'number')
            this.timePickerIncrement = options.timePickerIncrement;

        if (typeof options.timePicker24Hour === 'boolean')
            this.timePicker24Hour = options.timePicker24Hour;

        if (typeof options.autoApply === 'boolean')
            this.autoApply = options.autoApply;

        if (typeof options.autoUpdateInput === 'boolean')
            this.autoUpdateInput = options.autoUpdateInput;

        if (typeof options.linkedCalendars === 'boolean')
            this.linkedCalendars = options.linkedCalendars;

        if (typeof options.isInvalidDate === 'function')
            this.isInvalidDate = options.isInvalidDate;

        if (typeof options.isCustomDate === 'function')
            this.isCustomDate = options.isCustomDate;

        if (typeof options.alwaysShowCalendars === 'boolean')
            this.alwaysShowCalendars = options.alwaysShowCalendars;

        // update day names order to firstDay
        if (this.locale.firstDay != 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }

        var start, end, range;

        //if no start/end dates set, check if an input element contains initial values
        if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
            if ($(this.element).is('input[type=text]')) {
                var val = $(this.element).val(),
                    split = val.split(this.locale.separator);

                start = end = null;

                if (split.length == 2) {
                    start = moment(split[0], this.locale.format);
                    end = moment(split[1], this.locale.format);
                } else if (this.singleDatePicker && val !== "") {
                    start = moment(val, this.locale.format);
                    end = moment(val, this.locale.format);
                }
                if (start !== null && end !== null) {
                    this.setStartDate(start);
                    this.setEndDate(end);
                }
            }
        }

        if (typeof options.ranges === 'object') {
            for (range in options.ranges) {

                if (typeof options.ranges[range][0] === 'string')
                    start = moment(options.ranges[range][0], this.locale.format);
                else
                    start = moment(options.ranges[range][0]);

                if (typeof options.ranges[range][1] === 'string')
                    end = moment(options.ranges[range][1], this.locale.format);
                else
                    end = moment(options.ranges[range][1]);

                // If the start or end date exceed those allowed by the minDate or dateLimit
                // options, shorten the range to the allowable period.
                if (this.minDate && start.isBefore(this.minDate))
                    start = this.minDate.clone();

                var maxDate = this.maxDate;
                if (this.dateLimit && maxDate && start.clone().add(this.dateLimit).isAfter(maxDate))
                    maxDate = start.clone().add(this.dateLimit);
                if (maxDate && end.isAfter(maxDate))
                    end = maxDate.clone();

                // If the end of the range is before the minimum or the start of the range is
                // after the maximum, don't display this range option at all.
                if ((this.minDate && end.isBefore(this.minDate, this.timepicker ? 'minute' : 'day')) 
                  || (maxDate && start.isAfter(maxDate, this.timepicker ? 'minute' : 'day')))
                    continue;

                //Support unicode chars in the range names.
                var elem = document.createElement('textarea');
                elem.innerHTML = range;
                var rangeHtml = elem.value;

                this.ranges[rangeHtml] = [start, end];
            }

            var list = '<ul>';
            for (range in this.ranges) {
                list += '<li data-range-key="' + range + '">' + range + '</li>';
            }
            if (this.showCustomRangeLabel) {
                list += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + '</li>';
            }
            list += '</ul>';
            this.container.find('.ranges').prepend(list);
        }

        if (typeof cb === 'function') {
            this.callback = cb;
        }

        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
            this.endDate = this.endDate.endOf('day');
            this.container.find('.calendar-time').hide();
        }

        //can't be used together for now
        if (this.timePicker && this.autoApply)
            this.autoApply = false;

        if (this.autoApply && typeof options.ranges !== 'object') {
            this.container.find('.ranges').hide();
        } else if (this.autoApply) {
            this.container.find('.applyBtn, .cancelBtn').addClass('hide');
        }

        if (this.singleDatePicker) {
            this.container.addClass('single');
            this.container.find('.calendar.left').addClass('single');
            this.container.find('.calendar.left').show();
            this.container.find('.calendar.right').hide();
            this.container.find('.daterangepicker_input input, .daterangepicker_input > i').hide();
            if (this.timePicker) {
                this.container.find('.ranges ul').hide();
            } else {
                this.container.find('.ranges').hide();
            }
        }

        if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {
            this.container.addClass('show-calendar');
        }

        this.container.addClass('opens' + this.opens);

        //swap the position of the predefined ranges if opens right
        if (typeof options.ranges !== 'undefined' && this.opens == 'right') {
            this.container.find('.ranges').prependTo( this.container.find('.calendar.left').parent() );
        }

        //apply CSS classes and labels to buttons
        this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //
        // event listeners
        //

        this.container.find('.calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('mousedown.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
            .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))
            .on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this))
            .on('focus.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsFocused, this))
            .on('blur.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsBlurred, this))
            .on('change.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this))
            .on('keydown.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsKeydown, this));

        this.container.find('.ranges')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
            .on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this))
            .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));

        if (this.element.is('input') || this.element.is('button')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.elementChanged, this),
                'keydown.daterangepicker': $.proxy(this.keydown, this) //IE 11 compatibility
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
            this.element.on('keydown.daterangepicker', $.proxy(this.toggle, this));
        }

        //
        // if attached to a text input, set the initial value
        //

        if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.trigger('change');
        } else if (this.element.is('input') && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format));
            this.element.trigger('change');
        }

    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.minDate && this.startDate.isBefore(this.minDate)) {
                this.startDate = this.minDate.clone();
                if (this.timePicker && this.timePickerIncrement)
                    this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }

            if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
                this.startDate = this.maxDate.clone();
                if (this.timePicker && this.timePickerIncrement)
                    this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (!this.timePicker)
                this.endDate = this.endDate.add(1,'d').startOf('day').subtract(1,'second');

            if (this.timePicker && this.timePickerIncrement)
                this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.endDate.isBefore(this.startDate))
                this.endDate = this.startDate.clone();

            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate.clone();

            if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                this.endDate = this.startDate.clone().add(this.dateLimit);

            this.previousRightTime = this.endDate.clone();

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        isInvalidDate: function() {
            return false;
        },

        isCustomDate: function() {
            return false;
        },

        updateView: function() {
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
                if (!this.endDate) {
                    this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                } else {
                    this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                }
            }
            if (this.endDate) {
                this.container.find('input[name="daterangepicker_end"]').removeClass('active');
                this.container.find('input[name="daterangepicker_start"]').addClass('active');
            } else {
                this.container.find('input[name="daterangepicker_end"]').addClass('active');
                this.container.find('input[name="daterangepicker_start"]').removeClass('active');
            }
            this.updateMonthsInView();
            this.updateCalendars();
            this.updateFormInputs();
        },

        updateMonthsInView: function() {
            if (this.endDate) {

                //if both dates are visible already, do nothing
                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                    (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    &&
                    (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    ) {
                    return;
                }

                this.leftCalendar.month = this.startDate.clone().date(2);
                if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                    this.rightCalendar.month = this.endDate.clone().date(2);
                } else {
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }

            } else {
                if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            }
            if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
              this.rightCalendar.month = this.maxDate.clone().date(2);
              this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
            }
        },

        updateCalendars: function() {

            if (this.timePicker) {
                var hour, minute, second;
                if (this.endDate) {
                    hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                } else {
                    hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                }
                this.leftCalendar.month.hour(hour).minute(minute).second(second);
                this.rightCalendar.month.hour(hour).minute(minute).second(second);
            }

            this.renderCalendar('left');
            this.renderCalendar('right');

            //highlight any predefined range matching the current start and end dates
            this.container.find('.ranges li').removeClass('active');
            if (this.endDate == null) return;

            this.calculateChosenLabel();
        },

        renderCalendar: function(side) {

            //
            // Build the matrix of dates that will populate the calendar
            //

            var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
            var month = calendar.month.month();
            var year = calendar.month.year();
            var hour = calendar.month.hour();
            var minute = calendar.month.minute();
            var second = calendar.month.second();
            var daysInMonth = moment([year, month]).daysInMonth();
            var firstDay = moment([year, month, 1]);
            var lastDay = moment([year, month, daysInMonth]);
            var lastMonth = moment(firstDay).subtract(1, 'month').month();
            var lastYear = moment(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;

            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

            var col, row;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);

                if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                    calendar[row][col] = this.minDate.clone();
                }

                if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }

            }

            //make the calendar object available to hoverDate/clickDate
            if (side == 'left') {
                this.leftCalendar.calendar = calendar;
            } else {
                this.rightCalendar.calendar = calendar;
            }

            //
            // Display the calendar
            //

            var minDate = side == 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            var selected = side == 'left' ? this.startDate : this.endDate;
            var arrow = this.locale.direction == 'ltr' ? {left: 'chevron-left', right: 'chevron-right'} : {left: 'chevron-right', right: 'chevron-left'};

            var html = '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th></th>';

            if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                html += '<th class="prev available"><i class="fa fa-' + arrow.left + ' glyphicon glyphicon-' + arrow.left + '"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                var minYear = (minDate && minDate.year()) || (currentYear - 50);
                var inMinYear = currentYear == minYear;
                var inMaxYear = currentYear == maxYear;

                var monthHtml = '<select class="monthselect">';
                for (var m = 0; m < 12; m++) {
                    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            ">" + this.locale.monthNames[m] + "</option>";
                    } else {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                    }
                }
                monthHtml += "</select>";

                var yearHtml = '<select class="yearselect">';
                for (var y = minYear; y <= maxYear; y++) {
                    yearHtml += '<option value="' + y + '"' +
                        (y === currentYear ? ' selected="selected"' : '') +
                        '>' + y + '</option>';
                }
                yearHtml += '</select>';

                dateHtml = monthHtml + yearHtml;
            }

            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                html += '<th class="next available"><i class="fa fa-' + arrow.right + ' glyphicon glyphicon-' + arrow.right + '"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //adjust maxDate to reflect the dateLimit setting in order to
            //grey out end dates beyond the dateLimit
            if (this.endDate == null && this.dateLimit) {
                var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    maxDate = maxLimit;
                }
            }

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';
                else if (this.showISOWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].isoWeek() + '</td>';

                for (var col = 0; col < 7; col++) {

                    var classes = [];

                    //highlight today's date
                    if (calendar[row][col].isSame(new Date(), "day"))
                        classes.push('today');

                    //highlight weekends
                    if (calendar[row][col].isoWeekday() > 5)
                        classes.push('weekend');

                    //grey out the dates in other months displayed at beginning and end of this calendar
                    if (calendar[row][col].month() != calendar[1][1].month())
                        classes.push('off');

                    //don't allow selection of dates before the minimum date
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of dates after the maximum date
                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of date if a custom function decides it's invalid
                    if (this.isInvalidDate(calendar[row][col]))
                        classes.push('off', 'disabled');

                    //highlight the currently selected start date
                    if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                        classes.push('active', 'start-date');

                    //highlight the currently selected end date
                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                        classes.push('active', 'end-date');

                    //highlight dates in-between the selected dates
                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                        classes.push('in-range');

                    //apply custom classes for this date
                    var isCustom = this.isCustomDate(calendar[row][col]);
                    if (isCustom !== false) {
                        if (typeof isCustom === 'string')
                            classes.push(isCustom);
                        else
                            Array.prototype.push.apply(classes, isCustom);
                    }

                    var cname = '', disabled = false;
                    for (var i = 0; i < classes.length; i++) {
                        cname += classes[i] + ' ';
                        if (classes[i] == 'disabled')
                            disabled = true;
                    }
                    if (!disabled)
                        cname += 'available';

                    html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';

            this.container.find('.calendar.' + side + ' .calendar-table').html(html);

        },

        renderTimePicker: function(side) {

            // Don't bother updating the time picker if it's currently disabled
            // because an end date hasn't been clicked yet
            if (side == 'right' && !this.endDate) return;

            var html, selected, minDate, maxDate = this.maxDate;

            if (this.dateLimit && (!this.maxDate || this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)))
                maxDate = this.startDate.clone().add(this.dateLimit);

            if (side == 'left') {
                selected = this.startDate.clone();
                minDate = this.minDate;
            } else if (side == 'right') {
                selected = this.endDate.clone();
                minDate = this.startDate;

                //Preserve the time already selected
                var timeSelector = this.container.find('.calendar.right .calendar-time div');
                if (timeSelector.html() != '') {

                    selected.hour(timeSelector.find('.hourselect option:selected').val() || selected.hour());
                    selected.minute(timeSelector.find('.minuteselect option:selected').val() || selected.minute());
                    selected.second(timeSelector.find('.secondselect option:selected').val() || selected.second());

                    if (!this.timePicker24Hour) {
                        var ampm = timeSelector.find('.ampmselect option:selected').val();
                        if (ampm === 'PM' && selected.hour() < 12)
                            selected.hour(selected.hour() + 12);
                        if (ampm === 'AM' && selected.hour() === 12)
                            selected.hour(0);
                    }

                }

                if (selected.isBefore(this.startDate))
                    selected = this.startDate.clone();

                if (maxDate && selected.isAfter(maxDate))
                    selected = maxDate.clone();

            }

            //
            // hours
            //

            html = '<select class="hourselect">';

            var start = this.timePicker24Hour ? 0 : 1;
            var end = this.timePicker24Hour ? 23 : 12;

            for (var i = start; i <= end; i++) {
                var i_in_24 = i;
                if (!this.timePicker24Hour)
                    i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

                var time = selected.clone().hour(i_in_24);
                var disabled = false;
                if (minDate && time.minute(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.minute(0).isAfter(maxDate))
                    disabled = true;

                if (i_in_24 == selected.hour() && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                } else {
                    html += '<option value="' + i + '">' + i + '</option>';
                }
            }

            html += '</select> ';

            //
            // minutes
            //

            html += ': <select class="minuteselect">';

            for (var i = 0; i < 60; i += this.timePickerIncrement) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().minute(i);

                var disabled = false;
                if (minDate && time.second(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.second(0).isAfter(maxDate))
                    disabled = true;

                if (selected.minute() == i && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                } else {
                    html += '<option value="' + i + '">' + padded + '</option>';
                }
            }

            html += '</select> ';

            //
            // seconds
            //

            if (this.timePickerSeconds) {
                html += ': <select class="secondselect">';

                for (var i = 0; i < 60; i++) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().second(i);

                    var disabled = false;
                    if (minDate && time.isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.isAfter(maxDate))
                        disabled = true;

                    if (selected.second() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }

                html += '</select> ';
            }

            //
            // AM/PM
            //

            if (!this.timePicker24Hour) {
                html += '<select class="ampmselect">';

                var am_html = '';
                var pm_html = '';

                if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                    am_html = ' disabled="disabled" class="disabled"';

                if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                    pm_html = ' disabled="disabled" class="disabled"';

                if (selected.hour() >= 12) {
                    html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                } else {
                    html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                }

                html += '</select>';
            }

            this.container.find('.calendar.' + side + ' .calendar-time div').html(html);

        },

        updateFormInputs: function() {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format));
            if (this.endDate)
                this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format));

            if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }

        },

        move: function() {
            var parentOffset = { top: 0, left: 0 },
                containerTop;
            var parentRightEdge = $(window).width();
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
            }

            if (this.drops == 'up')
                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
            else
                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');

            if (this.opens == 'left') {
                this.container.css({
                    top: containerTop,
                    right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else if (this.opens == 'center') {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                            - this.container.outerWidth() / 2,
                    right: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        show: function(e) {
            if (this.isShowing) return;

            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);

            // Bind global datepicker mousedown for hiding and
            $(document)
              .on('mousedown.daterangepicker', this._outsideClickProxy)
              // also support mobile devices
              .on('touchend.daterangepicker', this._outsideClickProxy)
              // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
              .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
              // and also close when focus changes to outside the picker (eg. tabbing between controls)
              .on('focusin.daterangepicker', this._outsideClickProxy);

            // Reposition the picker if the window is resized while it's open
            $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();
            this.previousRightTime = this.endDate.clone();

            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        },

        hide: function(e) {
            if (!this.isShowing) return;

            //incomplete date selection, revert to last values
            if (!this.endDate) {
                this.startDate = this.oldStartDate.clone();
                this.endDate = this.oldEndDate.clone();
            }

            //if a new date range was selected, invoke the user callback function
            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.callback(this.startDate, this.endDate, this.chosenLabel);

            //if picker is attached to a text input, update it
            this.updateElement();

            $(document).off('.daterangepicker');
            $(window).off('.daterangepicker');
            this.container.hide();
            this.element.trigger('hide.daterangepicker', this);
            this.isShowing = false;
        },

        toggle: function(e) {
            if (this.isShowing) {
                this.hide();
            } else {
                this.show();
            }
        },

        outsideClick: function(e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                // ie modal dialog fix
                e.type == "focusin" ||
                target.closest(this.element).length ||
                target.closest(this.container).length ||
                target.closest('.calendar-table').length
                ) return;
            this.hide();
            this.element.trigger('outsideClick.daterangepicker', this);
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
            this.element.trigger('showCalendar.daterangepicker', this);
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
            this.element.trigger('hideCalendar.daterangepicker', this);
        },

        hoverRange: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            var label = e.target.getAttribute('data-range-key');

            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.locale.format));
                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.locale.format));
            }

        },

        clickRange: function(e) {
            var label = e.target.getAttribute('data-range-key');
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];
                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }

                if (!this.alwaysShowCalendars)
                    this.hideCalendars();
                this.clickApply();
            }
        },

        clickPrev: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract(1, 'month');
                if (this.linkedCalendars)
                    this.rightCalendar.month.subtract(1, 'month');
            } else {
                this.rightCalendar.month.subtract(1, 'month');
            }
            this.updateCalendars();
        },

        clickNext: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add(1, 'month');
            } else {
                this.rightCalendar.month.add(1, 'month');
                if (this.linkedCalendars)
                    this.leftCalendar.month.add(1, 'month');
            }
            this.updateCalendars();
        },

        hoverDate: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            //if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
            //    return;

            //ignore dates that can't be selected
            if (!$(e.target).hasClass('available')) return;

            //have the text inputs above calendars reflect the date being hovered over
            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            if (this.endDate && !this.container.find('input[name=daterangepicker_start]').is(":focus")) {
                this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));
            } else if (!this.endDate && !this.container.find('input[name=daterangepicker_end]').is(":focus")) {
                this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));
            }

            //highlight the dates between the start date and the date being hovered as a potential end date
            var leftCalendar = this.leftCalendar;
            var rightCalendar = this.rightCalendar;
            var startDate = this.startDate;
            if (!this.endDate) {
                this.container.find('.calendar tbody td').each(function(index, el) {

                    //skip week numbers, only look at dates
                    if ($(el).hasClass('week')) return;

                    var title = $(el).attr('data-title');
                    var row = title.substr(1, 1);
                    var col = title.substr(3, 1);
                    var cal = $(el).parents('.calendar');
                    var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                    if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {
                        $(el).addClass('in-range');
                    } else {
                        $(el).removeClass('in-range');
                    }

                });
            }

        },

        clickDate: function(e) {

            if (!$(e.target).hasClass('available')) return;

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            //
            // this function needs to do a few things:
            // * alternate between selecting a start and end date for the range,
            // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
            // * if autoapply is enabled, and an end date was chosen, apply the selection
            // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
            // * if one of the inputs above the calendars was focused, cancel that manual input
            //

            if (this.endDate || date.isBefore(this.startDate, 'day')) { //picking start
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.endDate = null;
                this.setStartDate(date.clone());
            } else if (!this.endDate && date.isBefore(this.startDate)) {
                //special case: clicking the same date for start/end,
                //but the time of the end date is before the start date
                this.setEndDate(this.startDate.clone());
            } else { // picking end
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.setEndDate(date.clone());
                if (this.autoApply) {
                  this.calculateChosenLabel();
                  this.clickApply();
                }
            }

            if (this.singleDatePicker) {
                this.setEndDate(this.startDate);
                if (!this.timePicker)
                    this.clickApply();
            }

            this.updateView();

            //This is to cancel the blur event handler if the mouse was in one of the inputs
            e.stopPropagation();

        },

        calculateChosenLabel: function () {
            var customRange = true;
            var i = 0;
            for (var range in this.ranges) {
              if (this.timePicker) {
                    var format = this.timePickerSeconds ? "YYYY-MM-DD hh:mm:ss" : "YYYY-MM-DD hh:mm";
                    //ignore times when comparing dates if time picker seconds is not enabled
                    if (this.startDate.format(format) == this.ranges[range][0].format(format) && this.endDate.format(format) == this.ranges[range][1].format(format)) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                } else {
                    //ignore times when comparing dates if time picker is not enabled
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                }
                i++;
            }
            if (customRange) {
                if (this.showCustomRangeLabel) {
                    this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
                } else {
                    this.chosenLabel = null;
                }
                this.showCalendars();
            }
        },

        clickApply: function(e) {
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function(e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        monthOrYearChanged: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            if (!isLeft) {
                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }

            if (this.minDate) {
                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }

            if (this.maxDate) {
                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }

            if (isLeft) {
                this.leftCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            } else {
                this.rightCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
            this.updateCalendars();
        },

        timeChanged: function(e) {

            var cal = $(e.target).closest('.calendar'),
                isLeft = cal.hasClass('left');

            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);
            var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

            if (!this.timePicker24Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }

            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                start.second(second);
                this.setStartDate(start);
                if (this.singleDatePicker) {
                    this.endDate = this.startDate.clone();
                } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                    this.setEndDate(start.clone());
                }
            } else if (this.endDate) {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                end.second(second);
                this.setEndDate(end);
            }

            //update the calendars so all clickable dates reflect the new time component
            this.updateCalendars();

            //update the form inputs above the calendars with the new time
            this.updateFormInputs();

            //re-render the time pickers because changing one selection can affect what's enabled in another
            this.renderTimePicker('left');
            this.renderTimePicker('right');

        },

        formInputsChanged: function(e) {
            var isRight = $(e.target).closest('.calendar').hasClass('right');
            var start = moment(this.container.find('input[name="daterangepicker_start"]').val(), this.locale.format);
            var end = moment(this.container.find('input[name="daterangepicker_end"]').val(), this.locale.format);

            if (start.isValid() && end.isValid()) {

                if (isRight && end.isBefore(start))
                    start = end.clone();

                this.setStartDate(start);
                this.setEndDate(end);

                if (isRight) {
                    this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format));
                } else {
                    this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format));
                }

            }

            this.updateView();
        },

        formInputsFocused: function(e) {

            // Highlight the focused input
            this.container.find('input[name="daterangepicker_start"], input[name="daterangepicker_end"]').removeClass('active');
            $(e.target).addClass('active');

            // Set the state such that if the user goes back to using a mouse, 
            // the calendars are aware we're selecting the end of the range, not
            // the start. This allows someone to edit the end of a date range without
            // re-selecting the beginning, by clicking on the end date input then
            // using the calendar.
            var isRight = $(e.target).closest('.calendar').hasClass('right');
            if (isRight) {
                this.endDate = null;
                this.setStartDate(this.startDate.clone());
                this.updateView();
            }

        },

        formInputsBlurred: function(e) {

            // this function has one purpose right now: if you tab from the first
            // text input to the second in the UI, the endDate is nulled so that
            // you can click another, but if you tab out without clicking anything
            // or changing the input value, the old endDate should be retained

            if (!this.endDate) {
                var val = this.container.find('input[name="daterangepicker_end"]').val();
                var end = moment(val, this.locale.format);
                if (end.isValid()) {
                    this.setEndDate(end);
                    this.updateView();
                }
            }

        },

        formInputsKeydown: function(e) {
            // This function ensures that if the 'enter' key was pressed in the input, then the calendars
            // are updated with the startDate and endDate.
            // This behaviour is automatic in Chrome/Firefox/Edge but not in IE 11 hence why this exists.
            // Other browsers and versions of IE are untested and the behaviour is unknown.
            if (e.keyCode === 13) {
                // Prevent the calendar from being updated twice on Chrome/Firefox/Edge
                e.preventDefault(); 
                this.formInputsChanged(e);
            }
        },


        elementChanged: function() {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;

            var dateString = this.element.val().split(this.locale.separator),
                start = null,
                end = null;

            if (dateString.length === 2) {
                start = moment(dateString[0], this.locale.format);
                end = moment(dateString[1], this.locale.format);
            }

            if (this.singleDatePicker || start === null || end === null) {
                start = moment(this.element.val(), this.locale.format);
                end = start;
            }

            if (!start.isValid() || !end.isValid()) return;

            this.setStartDate(start);
            this.setEndDate(end);
            this.updateView();
        },

        keydown: function(e) {
            //hide on tab or enter
            if ((e.keyCode === 9) || (e.keyCode === 13)) {
                this.hide();
            }

            //hide on esc and prevent propagation
            if (e.keyCode === 27) {
                e.preventDefault();
                e.stopPropagation();

                this.hide();
            }
        },

        updateElement: function() {
            if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.element.trigger('change');
            } else if (this.element.is('input') && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format));
                this.element.trigger('change');
            }
        },

        remove: function() {
            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData();
        }

    };

    $.fn.daterangepicker = function(options, callback) {
        var implementOptions = $.extend(true, {}, $.fn.daterangepicker.defaultOptions, options);
        this.each(function() {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, implementOptions, callback));
        });
        return this;
    };

    return DateRangePicker;

}));


/***/ }),

/***/ 631:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(632)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(634),
  /* template */
  __webpack_require__(635),
  /* scopeId */
  "data-v-3e521910",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 632:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(633);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("3908314e", content, true);

/***/ }),

/***/ 633:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".day-picker[data-v-3e521910]{position:relative;display:flex}.day-picker input[data-v-3e521910]{margin-left:15px;width:108px}.day-picker .board[data-v-3e521910]{padding:3px;padding-bottom:35px;border:1px solid rgba(0,0,0,.15);width:258%;height:245px;position:absolute;left:-15px;top:34px;background:#fff;z-index:999;display:flex;flex-wrap:wrap;justify-content:space-around;align-items:center}.day-picker .board .item[data-v-3e521910]{font-size:14px;display:flex;justify-content:center;align-items:center;width:18%}.day-picker .board .item.start[data-v-3e521910]{border-top-left-radius:4px;border-bottom-left-radius:4px}.day-picker .board .item.end[data-v-3e521910]{border-top-right-radius:4px;border-bottom-right-radius:4px}.day-picker .board .item.cover[data-v-3e521910]{cursor:pointer;color:#292b2c;background-color:#e6e6e6;border-color:#adadad}.day-picker .board .confirm[data-v-3e521910]{right:6px}.day-picker .board .cancel[data-v-3e521910],.day-picker .board .confirm[data-v-3e521910]{font-size:14px;width:55px;display:flex;align-items:center;justify-content:center;position:absolute;bottom:4px;height:28px}.day-picker .board .cancel[data-v-3e521910]{right:66px}", ""]);

// exports


/***/ }),

/***/ 634:
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

exports.default = {
  data: function data() {
    return {
      board: false,
      start: 0,
      end: 24,
      start_c: 0,
      end_c: 24,
      flag: 0
    };
  },

  computed: {
    hours: function hours() {
      var filter = this.start_c < 10 ? '0' + this.start_c : this.start_c;
      return filter + ':00-' + this.end_c + ':00';
    }
  },

  methods: {
    picker: function picker(e) {
      this.board = true;
    },
    confirm: function confirm() {
      this.start_c = this.start;
      this.end_c = this.end;
      this.board = false;
    },
    onclick: function onclick(i) {
      if (i === this.end || i === this.start) {
        return;
      }

      if (this.flag === 0) {
        // start default
        this.end = null;
        this.start = i;
        this.flag = 1;
      } else {
        // end
        if (i < this.start) {
          this.start = i;
          this.flag = 1;
        } else {
          this.end = i;
          this.flag = 0;
        }
      }
    }
  }
};

/***/ }),

/***/ 635:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "day-picker",
    on: {
      "mousedown": _vm.picker
    }
  }, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.hours
    }
  }), _vm._v(" "), (_vm.board) ? _c('div', {
    staticClass: "board"
  }, [_vm._l((25), function(e, i) {
    return _c('div', {
      staticClass: "item btn",
      class: _vm.start === i ? 'btn-primary start' : _vm.end === i ? 'btn-primary end' : (_vm.end != null && _vm.start != null && i < _vm.end && i > _vm.start) ? 'btn-secondary cover' : 'btn-secondary',
      on: {
        "click": function($event) {
          _vm.onclick(i)
        }
      }
    }, [_vm._v(_vm._s(i <
      10 ? '0' + i : i) + ":00 ")])
  }), _vm._v(" "), _c('div', {
    staticClass: "btn btn-secondary cancel",
    on: {
      "click": function($event) {
        _vm.board = false;
        _vm.start = _vm.start_c;
        _vm.end = _vm.end_c
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn btn-success confirm",
    on: {
      "click": _vm.confirm
    }
  }, [_vm._v("确定")])], 2) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 636:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "date-picker"
  }, [_c('input', {
    staticClass: "form-control",
    class: {
      single: _vm.single
    },
    attrs: {
      "type": "text",
      "id": _vm.uid,
      "name": "daterange"
    }
  }), _vm._v(" "), (_vm.daypicker) ? _c('daypicker') : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(638);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("393bdaa9", content, true);

/***/ }),

/***/ 638:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".channel-trigger[data-v-da8fb732]{display:flex;width:220px;position:relative;height:32px}.channel-trigger .btn[data-v-da8fb732]{width:100%;line-height:30px;padding:0 8px;padding-right:32px}.channel-trigger .btn span[data-v-da8fb732]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.channel-trigger i[data-v-da8fb732]{position:absolute;right:15px;top:10px;font-size:14px;color:#888}", ""]);

// exports


/***/ }),

/***/ 639:
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

// class trigger {
//   computed = {
//     txt() {
//       let data = this.$store.getters["RegChannel/selectedConfirmList"];
//       let len = data.length - 1;
//       let h = "";
//       if (data.length > 0) {
//         switch (this.$store.state.RegChannel.ply) {
//           case 1:
//             data.forEach((e, i) => {
//               let d = len === i ? "" : ",";
//               h += e.name + d;
//             });
//             break;
//           case 3:
//             data.forEach((e, i) => {
//               let d = len === i ? "" : ",";
//               let name = e.name
//                 ? e.name
//                 : e.parentname ? e.parentname : e.grandname ? e.grandname : "";
//               h += name + d;
//             });
//             break;
//         }
//       } else {
//         h = "空";
//       }
//       return h;
//     }
//   };
//   methods = {
//     toggle() {
//       this.$store.commit("AsideToggleShow", 2);
//     }
//   };
//   template = require("../templates/trigger.html");
// }

/**
 * @ignore
 */
// export default new trigger();
exports.default = {
  computed: {
    txt: function txt() {
      var data = this.$store.getters["RegChannel/selectedConfirmList"];
      var len = data.length - 1;
      var h = "";
      if (data.length > 0) {
        switch (this.$store.state.RegChannel.ply) {
          case 1:
            data.forEach(function (e, i) {
              var d = len === i ? "" : ",";
              h += e.name + d;
            });
            break;
          case 3:
            data.forEach(function (e, i) {
              var d = len === i ? "" : ",";
              var name = e.name ? e.name : e.parentname ? e.parentname : e.grandname ? e.grandname : "";
              h += name + d;
            });
            break;
        }
      } else {
        h = "空";
      }
      return h;
    }
  },
  methods: {
    toggle: function toggle() {
      this.$store.commit("AsideToggleShow", 2);
    }
  }
};

/***/ }),

/***/ 640:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "channel-trigger",
    on: {
      "click": _vm.toggle
    }
  }, [_vm._t("default"), _vm._v(" "), _c('div', {
    staticClass: "btn btn-secondary",
    attrs: {
      "title": _vm.txt
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.txt))])]), _vm._v(" "), _c('i', {
    staticClass: "el-icon-caret-bottom"
  })], 2)
},staticRenderFns: []}

/***/ }),

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(642)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(644),
  /* template */
  __webpack_require__(645),
  /* scopeId */
  "data-v-43ecb848",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 642:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(643);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("46bdae81", content, true);

/***/ }),

/***/ 643:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".channel-trigger[data-v-43ecb848]{display:flex;width:220px;position:relative;height:32px}.channel-trigger .btn[data-v-43ecb848]{width:100%;line-height:30px;padding:0 8px;padding-right:32px}.channel-trigger .btn span[data-v-43ecb848]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.channel-trigger i[data-v-43ecb848]{position:absolute;right:8px;top:10px;font-size:14px;color:#888}", ""]);

// exports


/***/ }),

/***/ 644:
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

// class trigger {
//   computed = {
//     txt() {
//       let data = this.$store.getters["PayChannel/selectedConfirmList"];
//       let len = data.length - 1;
//       let h = "";
//       if (data.length > 0) {
//         switch (this.$store.state.PayChannel.ply) {
//           case 1:
//             data.forEach((e, i) => {
//               let d = len === i ? "" : ",";
//               h += e.name + d;
//             });
//             break;
//           case 3:
//             data.forEach((e, i) => {
//               let d = len === i ? "" : ",";
//               let name = e.name
//                 ? e.name
//                 : e.parentname ? e.parentname : e.grandname ? e.grandname : "";
//               h += name + d;
//             });
//             break;
//         }
//       } else {
//         h = "空";
//       }
//       return h;
//     }
//   };
//   methods = {
//     toggle() {
//       this.$store.commit("AsideToggleShow", 3);
//     }
//   };
//   template = require("../templates/trigger.html");
// }

/**
 * @ignore
 */
// export default new trigger();
exports.default = {
  computed: {
    txt: function txt() {
      var data = this.$store.getters["PayChannel/selectedConfirmList"];
      var len = data.length - 1;
      var h = "";
      if (data.length > 0) {
        switch (this.$store.state.PayChannel.ply) {
          case 1:
            data.forEach(function (e, i) {
              var d = len === i ? "" : ",";
              h += e.name + d;
            });
            break;
          case 3:
            data.forEach(function (e, i) {
              var d = len === i ? "" : ",";
              var name = e.name ? e.name : e.parentname ? e.parentname : e.grandname ? e.grandname : "";
              h += name + d;
            });
            break;
        }
      } else {
        h = "空";
      }
      return h;
    }
  },
  methods: {
    toggle: function toggle() {
      this.$store.commit("AsideToggleShow", 3);
    }
  }
  // template = require("../templates/trigger.html");
};

/***/ }),

/***/ 645:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "channel-trigger",
    on: {
      "click": _vm.toggle
    }
  }, [_vm._t("default"), _vm._v(" "), _c('div', {
    staticClass: "btn btn-secondary",
    attrs: {
      "title": _vm.txt
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.txt))])]), _vm._v(" "), _c('i', {
    staticClass: "el-icon-caret-bottom"
  })], 2)
},staticRenderFns: []}

/***/ }),

/***/ 646:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "module-header"
  }, [_c('div', {
    staticClass: "switch-group"
  }, _vm._l((_vm.dateList), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "switchs-item"
    }, [_c('span', {
      staticClass: "item-header"
    }, [_vm._v(_vm._s(item.label) + ":")]), _vm._v(" "), (item.isShowDatetype) ? _c('div', {
      staticClass: "item-content"
    }, _vm._l((_vm.types), function(item, index) {
      return _c('div', {
        key: index,
        staticClass: "bt-item",
        class: {
          'check': _vm.datetype === item.id
        },
        on: {
          "click": function($event) {
            _vm.datetype = item.id
          }
        }
      }, [_vm._v(_vm._s(item.name))])
    })) : _vm._e(), _vm._v(" "), _c('datepicker', {
      staticClass: "item-input",
      class: {
        'item-input-range': !item.single
      },
      attrs: {
        "daypicker": _vm.daypicker,
        "uid": item.uid,
        "date": {
          startDate: item.startDate,
          endDate: item.endDate
        },
        "single": item.single,
        "changeDate": item.change
      }
    }), _vm._v(" "), _vm._t("after-datepicker")], 2)
  })), _vm._v(" "), (_vm.isShowReg) ? _c('div', {
    staticClass: "switch-group"
  }, [_c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v(_vm._s(_vm.$t('common.RegChannel')) + ":")]), _vm._v(" "), _c('regtrigger', {
    staticClass: "item-input"
  })], 1), _vm._v(" "), (_vm.isShowPay) ? _c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v(_vm._s(_vm.$t('common.PayChannel')) + ":")]), _vm._v(" "), _c('paytrigger', {
    staticClass: "item-input"
  })], 1) : _vm._e()]) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 647:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(648);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("312f92c2", content, true);

/***/ }),

/***/ 648:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".card-box[data-v-0d9eeecc]{margin:0 0 30px}.card-box .card[data-v-0d9eeecc]{margin:0;border:1px solid #d1dbe5;border-radius:4px;background-color:#fff;overflow:hidden;box-shadow:0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04)}.card-box .card .card-header[data-v-0d9eeecc]{line-height:45px;padding:0 20px;display:flex;align-items:center;font-size:14px;background-color:#fff;position:relative}.card-box .card .card-header .icons[data-v-0d9eeecc]{cursor:pointer;margin-left:auto}.card-box .card .card-header .icons i[data-v-0d9eeecc]{display:block;padding:5px;margin-top:2px}.card-box .card .card-header .card-header-title[data-v-0d9eeecc]{padding:0 20px 0 0;float:left}.card-box .card .card-header .tabs[data-v-0d9eeecc]{position:relative;float:left;vertical-align:middle}.card-box .card .card-header .tabs .tab-item[data-v-0d9eeecc]{padding:0 20px;text-align:center;border-left:1px solid #ddd;float:left}.card-box .card .card-header .tabs .tab-item[data-v-0d9eeecc]:last-child{border-right:1px solid #ddd}.card-box .card .card-header .tabs .tab-item.active[data-v-0d9eeecc]{background-color:#fc9153;color:#fff}.card-box .card .card-header .export-link[data-v-0d9eeecc]{position:absolute;right:75px}.card-box .card .card-body[data-v-0d9eeecc]{padding:20px}.card-box .card .card-body .no-data[data-v-0d9eeecc]{line-height:40px;text-align:center;font-size:13px}.card-box .card .icon-win-max[data-v-0d9eeecc]{font-weight:700}", ""]);

// exports


/***/ }),

/***/ 649:
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

exports.default = {
  data: function data() {
    return {
      isCollapse: false
    };
  }
};

/***/ }),

/***/ 650:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "card-box"
  }, [_c('div', {
    staticClass: "card"
  }, [_c('div', {
    staticClass: "card-header"
  }, [_vm._t("header"), _vm._v(" "), _c('div', {
    staticClass: "icons"
  }, [_c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.isCollapse),
      expression: "!isCollapse"
    }],
    staticClass: "icon-win-min",
    on: {
      "click": function($event) {
        _vm.isCollapse = true
      }
    }
  }), _vm._v(" "), _c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isCollapse),
      expression: "isCollapse"
    }],
    staticClass: "icon-win-max",
    on: {
      "click": function($event) {
        _vm.isCollapse = false
      }
    }
  })])], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.isCollapse),
      expression: "!isCollapse"
    }],
    staticClass: "card-body"
  }, [_vm._t("body")], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.isCollapse),
      expression: "!isCollapse"
    }]
  }, [_vm._t("footer")], 2)])])
},staticRenderFns: []}

/***/ }),

/***/ 651:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(652);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("dbc56c62", content, true);

/***/ }),

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".el-table--enable-row-hover .el-table__body tr:hover>td{background-color:#c4c2d8}.el-table__footer-wrapper thead div,.el-table__header-wrapper thead div{background-color:transparent}.el-table__body tr.current-row>td{background-color:#c4c2d8}.icon-arrow{font-size:14px;display:block}.icon-arrow.up{transform:rotate(0deg);color:#14d7b1}.icon-arrow.down{transform:rotate(180deg);color:#fe5545}.icon-arrow.right{transform:rotate(90deg);color:orange}", ""]);

// exports


/***/ }),

/***/ 653:
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

exports.default = {
  props: {
    tableData: {
      type: Array,
      default: []
    },
    isHideHeader: {
      type: Boolean,
      default: false
    },
    hideColumn: {
      default: ""
    },
    trendCol: {
      default: ''
    },
    height: {
      type: [Number, String]
    },
    maxHeight: {
      type: [Number, String],
      default: 500
    },
    columnWidthObj: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    columnArr: function columnArr() {
      var _this = this;

      var result = [];
      if (this.tableData && this.tableData.length > 0) {
        var _loop = function _loop(index) {
          if (Array.isArray(_this.hideColumn)) {
            _this.hideColumn.forEach(function (hideItem) {
              if (index != hideItem) {
                result.push(index);
              }
            });
          } else if (typeof _this.hideColumn == "string") {
            if (index != _this.hideColumn) {
              result.push(index);
            }
          }
        };

        for (var index in this.tableData[0]) {
          _loop(index);
        }
      }
      return result;
    }
  },
  methods: {
    rowClick: function rowClick(row) {
      console.log('rowClick');
      this.$refs.singleTable.setCurrentRow(row);
    }
  }
};

/***/ }),

/***/ 654:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('elTable', {
    ref: "singleTable",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.tableData,
      "show-header": !_vm.isHideHeader,
      "highlight-current-row": true,
      "max-height": _vm.maxHeight,
      "height": _vm.height,
      "fit": "",
      "border": ""
    },
    on: {
      "row-click": _vm.rowClick
    }
  }, _vm._l((_vm.columnArr), function(column, index) {
    return _c('elTableColumn', {
      key: column,
      attrs: {
        "width": _vm.columnWidthObj[index] || '',
        "prop": column,
        "label": column
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function(scope) {
          return [(_vm.trendCol && _vm.trendCol == column) ? _c('i', {
            staticClass: "icon-arrow",
            class: {
              'up': Number(scope.row[column]) > 0, 'right': Number(scope.row[column]) == 0, 'down': Number(scope.row[column]) < 0
            },
            attrs: {
              "title": scope.row[column] + '%'
            }
          }) : _c('span', [_vm._v(_vm._s(scope.row[column]))])]
        }
      }])
    })
  }))
},staticRenderFns: []}

/***/ }),

/***/ 659:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(660);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("25ee342e", content, true);

/***/ }),

/***/ 660:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, "table td[data-v-606892f2],table th[data-v-606892f2]{font-weight:400;border-top:0;vertical-align:middle;text-align:center}table tr.selected[data-v-606892f2],table tr.selected[data-v-606892f2]:hover{background-color:#c4c2d8}.icon-arrow[data-v-606892f2]{font-size:14px;display:block}.icon-arrow.up[data-v-606892f2]{transform:rotate(0deg);color:#14d7b1}.icon-arrow.down[data-v-606892f2]{transform:rotate(180deg);color:#fe5545}.icon-arrow.right[data-v-606892f2]{transform:rotate(90deg);color:orange}", ""]);

// exports


/***/ }),

/***/ 661:
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

exports.default = {
  props: {
    /**
     *表格数据(必须)
     */
    tableData: {
      type: Array,
      default: []
    },
    isHideHeader: {
      type: Boolean,
      default: false
    },
    hideColumn: {
      default: ""
    },
    /**
     * 特殊列
     * Array
     */
    trendCol: {
      default: ''
      // [
      //   {
      //     key: 'trend',
      //     type: 'trend',
      //     icon: ['icon-arrow up','icon-arrow right','icon-arrow down']
      //   },
      // ]
    } },
  data: function data() {
    return {
      selectedIndex: -1
    };
  },

  computed: {
    columnArr: function columnArr() {
      var _this = this;

      var result = [];
      if (this.tableData && this.tableData.length > 0) {
        var _loop = function _loop(index) {
          if (Array.isArray(_this.hideColumn)) {
            _this.hideColumn.forEach(function (hideItem) {
              if (index != hideItem) {
                result.push(index);
              }
            });
          } else if (typeof _this.hideColumn == "string") {
            if (index != _this.hideColumn) {
              result.push(index);
            }
          }
        };

        for (var index in this.tableData[0]) {
          _loop(index);
        }
      }
      return result;
    }
  }
};

/***/ }),

/***/ 662:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('table', {
    staticClass: "table table-bordered"
  }, [(!_vm.isHideHeader) ? _c('thead', [_c('tr', _vm._l((_vm.columnArr), function(column) {
    return _c('th', {
      key: column
    }, [_vm._v(_vm._s(column))])
  }))]) : _vm._e(), _vm._v(" "), (_vm.tableData) ? _c('tbody', _vm._l((_vm.tableData), function(item, index) {
    return _c('tr', {
      key: index,
      class: {
        selected: _vm.selectedIndex === index
      },
      on: {
        "click": function($event) {
          _vm.selectedIndex = index
        }
      }
    }, _vm._l((_vm.columnArr), function(column) {
      return _c('td', {
        key: column
      }, [(_vm.trendCol && _vm.trendCol == column) ? _c('i', {
        staticClass: "icon-arrow",
        class: {
          'up': Number(item[column]) > 0, 'right': Number(item[column]) == 0, 'down': Number(item[column]) < 0
        }
      }) : _c('span', [_vm._v(_vm._s(item[column]))])])
    }))
  })) : _vm._e(), _vm._v(" "), (!_vm.tableData || _vm.tableData.length == 0) ? _c('tfoot', [_vm._m(0)]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('tr', [_c('td', [_vm._v("无数据")])])
}]}

/***/ }),

/***/ 667:
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(5);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ 673:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(674);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("1d2c8dc8", content, true);

/***/ }),

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".modal-mask[data-v-811eebda]{font-size:14px;position:fixed;z-index:9998;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);display:block;transition:opacity .3s ease}.modal-mask .modal-wrapper[data-v-811eebda]{vertical-align:middle}.modal-mask .modal-wrapper .modal-container[data-v-811eebda]{margin:0 auto;padding:10px;background-color:#fff;border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.33);transition:all .3s ease;font-family:Helvetica,Arial,sans-serif;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.modal-mask .modal-wrapper .modal-container .modal-header[data-v-811eebda]{padding:10px}.modal-mask .modal-wrapper .modal-container .modal-body[data-v-811eebda]{margin:0;position:relative}.modal-mask .modal-wrapper .modal-container .modal-footer[data-v-811eebda]{text-align:center}.modal-enter[data-v-811eebda],.modal-leave-active[data-v-811eebda]{opacity:0}.modal-enter .modal-container[data-v-811eebda],.modal-leave-active .modal-container[data-v-811eebda]{-webkit-transform:scale(1.1);transform:scale(1.1)}", ""]);

// exports


/***/ }),

/***/ 675:
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

exports.default = {
  name: "Modal",
  props: ["headerName", "width", "mbHeight"],
  data: function data() {
    return {};
  }
};

/***/ }),

/***/ 676:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "modal"
    }
  }, [_c('div', {
    staticClass: "modal-mask"
  }, [_c('div', {
    staticClass: "modal-wrapper"
  }, [_c('div', {
    staticClass: "modal-container",
    style: ({
      width: _vm.width + 'px' || 'auto'
    })
  }, [_c('div', {
    staticClass: "modal-header"
  }, [_c('h6', {
    staticClass: "modal-title"
  }, [_vm._v(_vm._s(_vm.headerName))]), _vm._v(" "), _c('button', {
    staticClass: "close",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_c('span', [_vm._v("×")])])]), _vm._v(" "), _c('div', {
    staticClass: "modal-body",
    style: ({
      height: _vm.mbHeight + 'px' || 'auto'
    })
  }, [_vm._t("modal-body")], 2), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [_vm._t("modal-footer")], 2)])])])])
},staticRenderFns: []}

/***/ }),

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(686);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("554a9b79", content, true);

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".checkbox .box[data-v-67a3e21c]{cursor:pointer;display:flex;align-items:center;justify-content:center;width:14px;height:14px;background:#fff;color:#000;box-shadow:0 2px 5px rgba(0,0,0,.3)}.checkbox .box i.icon-form-checkbox-normal-g[data-v-67a3e21c]{font-size:20px}.checkbox .box i.icon-form-checkbox-normal-h[data-v-67a3e21c]{font-size:12px}.checkbox .icon-form-checkbox-normal-h2[data-v-67a3e21c]{width:10px;height:10px;background:#f0ad4e;box-shadow:0 1px 1px rgba(0,0,0,.3)}", ""]);

// exports


/***/ }),

/***/ 687:
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

exports.default = {
  props: ['state'],
  data: function data() {
    return {
      className: ['', 'icon-form-checkbox-normal-h2', 'icon-form-checkbox-normal-g']
    };
  }
};

/***/ }),

/***/ 688:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "checkbox"
  }, [_c('div', {
    staticClass: "box"
  }, [_c('i', {
    class: _vm.className[_vm.state]
  })]), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),

/***/ 787:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(788);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("4b140156", content, true);

/***/ }),

/***/ 788:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".radio-btn-group[data-v-67ee3036]{margin-right:15px;display:flex;justify-content:flex-start;align-items:flex-start;flex-wrap:wrap;line-height:30px}.radio-btn-group .btn-item[data-v-67ee3036]{cursor:pointer;padding:2px 20px;float:left;background-color:#fff;border:1px solid #ddd;text-align:center}.radio-btn-group .btn-item[data-v-67ee3036]:first-child{border-radius:5px 0 0 5px}.radio-btn-group .btn-item[data-v-67ee3036]:last-child{border-right:1px solid #ddd;border-radius:0 5px 5px 0}.radio-btn-group .btn-item.active[data-v-67ee3036]{font-weight:400;color:#fff;background-color:#fc9153;border:1px solid #fc9153}", ""]);

// exports


/***/ }),

/***/ 789:
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

exports.default = {
  name: 'radio-btn-group',
  props: {
    // 激活的匹配项的值
    value: {
      type: [Number, String]
    },
    // 列表数组 内容可为数字字符串和对象
    list: {
      type: Array,
      default: []
    },
    // 当list中存储的是字符串或数字时，初始值，后续递增，默认为下标值
    startIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 对list数据进行过滤处理
    filterList: function filterList() {
      var _this = this;

      var result = [];
      this.list.forEach(function (item, index) {
        if (typeof item === 'string' || typeof item === 'number') {
          // 字符串或者数字
          result.push({
            name: item,
            value: _this.startIndex + index
          });
        } else {
          //对象
          result.push({
            name: item.name,
            value: item.value
          });
        }
      });
      return result;
    }
  }
};

/***/ }),

/***/ 790:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "radio-btn-group"
  }, _vm._l((_vm.filterList), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "btn-item",
      class: {
        'active': item.value == _vm.value
      },
      on: {
        "click": function($event) {
          _vm.$emit('change', item.value);
          _vm.$emit('input', item.value);
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))
},staticRenderFns: []}

/***/ })

});