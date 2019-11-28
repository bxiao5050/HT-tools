webpackJsonp([41],{

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(768)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(770),
  /* template */
  __webpack_require__(771),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(769);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("b4155450", content, true);

/***/ }),

/***/ 769:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 770:
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
//
//
//
//
//
//
//
//
//
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
    moduleHeader: _moduleHeader2.default, card: _card2.default
  },
  data: function data() {
    return {
      header: {
        title: '新增用户',
        definedContent: '',
        isShowIndex: true
      },
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      currencyType: 0,

      type: 0,

      tableData: []
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
        isShowDatetype: false,
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
      this.drawChart();
    },
    drawChart: function drawChart() {
      var categories = ["00:00", "00:05", "00:10", "00:15", "00:20"];
      var seriesData = [{ name: this.date1, data: [1, 2, 1, 2, 1], max: 2 }];
      highchartUtil.drawChart('addedUserChart', 'spline', categories, seriesData, true);
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(571)))

/***/ }),

/***/ 771:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "add-user"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "header": _vm.header,
      "dateList": _vm.dateList
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
      'active': _vm.type == 0
    },
    on: {
      "click": function($event) {
        _vm.type = 0
      }
    }
  }, [_vm._v("新增用户和设备")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 1
    },
    on: {
      "click": function($event) {
        _vm.type = 1
      }
    }
  }, [_vm._v("新增活跃比")])])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "addedUserChart"
    }
  })])])], 1), _vm._v(" "), _c('div', {
    staticClass: "card-box"
  }, [_c('card', [_c('div', {
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
  }, [_c('table', {
    staticClass: "table table-bordered table-hover"
  }, [_c('thead', [_c('tr', [_c('th', [_vm._v("日期")]), _vm._v(" "), _c('th', [_vm._v("注册用户")]), _vm._v(" "), _c('th', [_vm._v("全新注册用户")]), _vm._v(" "), _c('th', [_vm._v("活跃用户")]), _vm._v(" "), _c('th', [_vm._v("新增设备(去重)")]), _vm._v(" "), _c('th', [_vm._v("新增活跃比")])])]), _vm._v(" "), _c('tbody', _vm._l((_vm.tableData), function(item) {
    return _c('tr', [_c('td', [_vm._v("1")]), _vm._v(" "), _c('td', [_vm._v("1")]), _vm._v(" "), _c('td', [_vm._v("1")]), _vm._v(" "), _c('td', [_vm._v("1")]), _vm._v(" "), _c('td', [_vm._v("1")]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "progress progress-xs progress-striped active"
    }, [_c('div', {
      staticClass: "progress-bar progress-bar-success",
      staticStyle: {
        "width": "90%"
      }
    })])])])
  })), _vm._v(" "), _c('tfoot', [(_vm.tableData.length == 0) ? _c('tr', [_c('td', {
    attrs: {
      "colspan": "10"
    }
  }, [_vm._v("无数据")])]) : _vm._e()])])])])])], 1)])])
},staticRenderFns: []}

/***/ })

});