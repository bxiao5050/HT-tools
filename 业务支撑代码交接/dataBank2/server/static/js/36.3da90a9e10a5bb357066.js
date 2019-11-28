webpackJsonp([36],{

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(744)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(746),
  /* template */
  __webpack_require__(747),
  /* scopeId */
  "data-v-4bd417b3",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 744:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(745);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("0e42c262", content, true);

/***/ }),

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".progress[data-v-4bd417b3]{background-color:#dadcdd;cursor:pointer}.progress .lr-progress[data-v-4bd417b3]{background-color:#9d88db;text-align:left;color:#333}.progress .lr-progress span[data-v-4bd417b3]{margin-left:5px}", ""]);

// exports


/***/ }),

/***/ 746:
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

var _normalTable = __webpack_require__(574);

var _normalTable2 = _interopRequireDefault(_normalTable);

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

exports.default = {
  components: {
    moduleHeader: _moduleHeader2.default,
    card: _card2.default,
    normalTable: _normalTable2.default
  },
  data: function data() {
    return {
      date1: moment().add(-7, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      tableData: [],
      columnData: []
    };
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
          _this.date1 = newDate.startDate;
          _this.date2 = newDate.endDate;
          _this.query();
        }
      }];
    },
    progressArr: function progressArr() {
      var remain_valid_rate = utils.getColumnByIndex(6, this.tableData); //utils.getColumnKey('remain_valid_rate', this.columnData)
      var remain_valid_rate_second = utils.getColumnByIndex(7, this.tableData); //utils.getColumnKey('remain_valid_rate_second', this.columnData)
      return [remain_valid_rate, remain_valid_rate_second];
    },
    columnArr: function columnArr() {
      var result = [];
      if (this.tableData && this.tableData.length > 0) {
        for (var index in this.tableData[0]) {
          result.push(index);
        }
      }
      return result;
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
        in_date2: this.date2,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS']
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
          Utils.Notification.error({
            message: data.message
          });
        }
      });
    },
    exportData: function exportData() {
      var params = this.getParams();
      _api2.default.user.exportData(params);
    },
    drawChart: function drawChart() {
      var count_date = utils.getColumnByIndex(0, this.tableData); //utils.getColumnKey('统计时间', this.columnData)
      var remain_valid_rate = utils.getColumnByIndex(6, this.tableData); //utils.getColumnKey('remain_valid_rate', this.columnData)
      var remain_valid_rate_second = utils.getColumnByIndex(7, this.tableData); //utils.getColumnKey('remain_valid_rate_second', this.columnData)
      var categories = [];
      var seriesData = [{ name: remain_valid_rate, data: [], type: 'spline' }, { name: remain_valid_rate_second, data: [], type: 'spline' }];
      var chartData = this.tableData.map(function (item) {
        return item;
      });
      chartData.reverse();
      chartData.forEach(function (item) {
        categories.push(item[count_date]);
        seriesData[0].data.push(Number(item[remain_valid_rate]));
        seriesData[1].data.push(Number(item[remain_valid_rate_second]));
      });
      highchartUtil.drawChart('loginRateChart', 'spline', categories, seriesData, true);
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14), __webpack_require__(571)))

/***/ }),

/***/ 747:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "login-rate"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "isShowReg": true,
      "isShowPay": true,
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
  }, [_vm._v(_vm._s(_vm.$t('common.IndexKey')))]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "loginRateChart"
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
  }, [_c('table', {
    staticClass: "table table-bordered"
  }, [_c('thead', [_c('tr', _vm._l((_vm.columnArr), function(column) {
    return _c('th', {
      key: column
    }, [_vm._v(_vm._s(column))])
  }))]), _vm._v(" "), _c('tbody', _vm._l((_vm.tableData), function(item, index) {
    return (_vm.tableData) ? _c('tr', {
      key: index
    }, _vm._l((_vm.columnArr), function(column) {
      return _c('td', {
        key: column
      }, [(_vm.progressArr.length > 0 && _vm.progressArr.includes(column)) ? _c('div', {
        staticClass: "progress progress-xs progress-striped active",
        attrs: {
          "title": item[column] + '%'
        }
      }, [_c('div', {
        staticClass: "progress-bar progress-bar-success lr-progress",
        style: ({
          width: Number(item[column]) + '%'
        })
      }, [_c('span', [_vm._v(_vm._s(item[column] + '%'))])])]) : _c('span', [_vm._v(_vm._s(item[column]))])])
    })) : _vm._e()
  })), _vm._v(" "), (!_vm.tableData || _vm.tableData.length == 0) ? _c('tfoot', [_c('tr', [_c('td', [_vm._v("无数据")])])]) : _vm._e()])])])])], 1)])])
},staticRenderFns: []}

/***/ })

});