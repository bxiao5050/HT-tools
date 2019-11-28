webpackJsonp([20],{

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(776)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(778),
  /* template */
  __webpack_require__(779),
  /* scopeId */
  "data-v-d8d74106",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(777);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("64591f8d", content, true);

/***/ }),

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".item-content[data-v-d8d74106]{margin-right:15px;float:left;line-height:30px}.item-content .bt-item[data-v-d8d74106]{cursor:pointer;padding:0 15px;float:left;background-color:#fff;border:1px solid #bbb;border-right:0;text-align:center}.item-content .bt-item[data-v-d8d74106]:last-child{border-right:1px solid #bbb}.item-content .bt-item.check[data-v-d8d74106]{font-weight:700;color:#fff;background-color:#fc9153}", ""]);

// exports


/***/ }),

/***/ 778:
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

var _utils = __webpack_require__(575);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'tourists-conversion',
  components: {
    card: _card2.default, moduleHeader: _moduleHeader2.default, normalTable: _elementTable2.default
  },
  data: function data() {
    return {
      date1: moment().add(-1, 'day').format('YYYY-MM-DD'),
      datetype: 1,
      plate_id: 0,

      plateList: [],

      tableData: [],
      columnData: []
    };
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
        isShowDatetype: true,
        datetype: this.datetype,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.query();
        }
      }];
    },
    reverseTableData: function reverseTableData() {
      var result = this.tableData.map(function (item) {
        return item;
      });
      result.reverse();
      return result;
    }
  },
  mounted: function mounted() {
    this.query();
  },

  methods: {
    datetypeChange: function datetypeChange(newVal) {
      this.datetype = newVal;
      if (newVal === 1) {
        this.date1 = moment().add(-1, 'day').format('YYYY-MM-DD');
      } else if (newVal === 2) {
        this.date1 = moment().add(-1, 'week').format('YYYY-MM-DD');
      } else if (newVal === 3) {
        this.date1 = moment().add(-1, 'month').format('YYYY-MM-DD');
      }
      this.query();
    },
    getParams: function getParams() {
      return {
        isCache: 1,
        in_date1: this.date1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
        in_plate_id: this.plate_id,
        in_select_id: this.datetype
      };
    },
    query: function query() {
      var _this2 = this;

      var params = this.getParams();
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.plateList = data.state[0];
          _this2.tableData = data.state[1];
          _this2.columnData = data.state[2] ? data.state[2] : [];
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
      var count_date = _utils2.default.getColumnByIndex(0, this.tableData);
      var guest_reg_count = _utils2.default.getColumnByIndex(1, this.tableData);
      var guest_bind_count = _utils2.default.getColumnByIndex(2, this.tableData);
      var guest_pay_count = _utils2.default.getColumnByIndex(3, this.tableData);
      var categories = [];
      var seriesData = [{
        name: guest_reg_count,
        data: []
      }, {
        name: guest_bind_count,
        data: []
      }, {
        name: guest_pay_count,
        data: []
      }];
      this.tableData.forEach(function (item) {
        categories.push(item[count_date]);
        seriesData[0].data.push(Number(item[guest_reg_count].replace(/,/g, '')));
        seriesData[1].data.push(Number(item[guest_bind_count].replace(/,/g, '')));
        seriesData[2].data.push(Number(item[guest_pay_count].replace(/,/g, '')));
      });

      highchartUtil.drawChart('touristChart', 'spline', categories, seriesData);
    }
  },
  watch: {
    plate_id: function plate_id(v, ov) {
      if (v != ov) {
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14), __webpack_require__(571)))

/***/ }),

/***/ 779:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "dateList": _vm.dateList
    },
    on: {
      "datetypeChange": _vm.datetypeChange
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("渠道:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.plate_id === 0
    },
    on: {
      "click": function($event) {
        _vm.plate_id = 0
      }
    }
  }, [_vm._v("全部")]), _vm._v(" "), _vm._l((_vm.plateList), function(item) {
    return _c('div', {
      staticClass: "bt-item",
      class: {
        'check': item.plat_id === _vm.plate_id
      },
      on: {
        "click": function($event) {
          _vm.plate_id = item.plat_id
        }
      }
    }, [_vm._v(_vm._s(item.plat_desc))])
  })], 2)])], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v("关键指标数据")]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "touristChart"
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
  })], 1)])])], 1)])
},staticRenderFns: []}

/***/ })

});