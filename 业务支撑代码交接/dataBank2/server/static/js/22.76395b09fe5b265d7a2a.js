webpackJsonp([22],{

/***/ 535:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(748)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(750),
  /* template */
  __webpack_require__(751),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 748:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(749);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("6b19815a", content, true);

/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 750:
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

var _elementTable = __webpack_require__(573);

var _elementTable2 = _interopRequireDefault(_elementTable);

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import utils from 'src/utils/utils.js'
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      // date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      tableData: [],
      columnData: [],

      type: 1
    };
  },

  computed: {
    dateList: function dateList() {
      var _this = this;

      return [{
        single: true,
        uid: 'date1',
        label: this.$t('common.Date'),
        startDate: this.date1,
        endDate: '',
        isShowDatetype: false,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;_this.query();
        }
      }];
    }
  },
  mounted: function mounted() {
    this.query();
  },

  methods: {
    getParams: function getParams() {
      return {
        isCache: 1,
        in_date1: this.date1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        in_configid: this.type
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
      var node_name = utils.getColumnByIndex(1, this.tableData); //utils.getColumnKey('node_name',this.columnData);
      var remain_user = utils.getColumnByIndex(2, this.tableData); //utils.getColumnKey('remain_user',this.columnData);
      var lost_user = utils.getColumnByIndex(4, this.tableData); //utils.getColumnKey('lost_user',this.columnData);
      var categories = [];
      var seriesData = [{ name: remain_user, type: 'column', yAxis: 0, data: [] }, { name: lost_user, type: 'spline', yAxis: 1, data: [] }];
      var count = 0;
      this.tableData.forEach(function (item) {
        if (count <= 9) {
          categories.push(item[node_name]);
          seriesData[0].data.push(Number(item[remain_user].replace(/,/g, '')));
          seriesData[1].data.push(Number(item[lost_user].replace(/,/g, '')));
        }
        count++;
      });
      highchartUtil.drawChart('stepUserChart', 'spline', categories, seriesData, true);
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

/***/ 751:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "new-user-step-retain"
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
  }, [_c('div', {
    staticClass: "card-box"
  }, [_c('card', [_c('div', {
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
        _vm.type = 1
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('newUserStepRetain.oneDayRetain')))]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 2
    },
    on: {
      "click": function($event) {
        _vm.type = 2
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('newUserStepRetain.twoDayRetain')))]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 7
    },
    on: {
      "click": function($event) {
        _vm.type = 7
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('newUserStepRetain.sevenDayRetain')))])])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "stepUserChart"
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
      "tableData": _vm.tableData,
      "columnWidthObj": {
        1: 300
      }
    }
  })], 1)])])], 1)])])
},staticRenderFns: []}

/***/ })

});