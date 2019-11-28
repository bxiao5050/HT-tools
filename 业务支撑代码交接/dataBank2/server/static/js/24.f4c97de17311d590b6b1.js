webpackJsonp([24],{

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(845)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(847),
  /* template */
  __webpack_require__(848),
  /* scopeId */
  "data-v-4f4daadc",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 845:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(846);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("9a0c7cd4", content, true);

/***/ }),

/***/ 846:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".item-content[data-v-4f4daadc]{margin-right:15px;float:left;line-height:30px}.item-content .bt-item[data-v-4f4daadc]{cursor:pointer;padding:0 15px;float:left;background-color:#fff;border:1px solid #bbb;border-right:0;text-align:center}.item-content .bt-item[data-v-4f4daadc]:last-child{border-right:1px solid #bbb}.item-content .bt-item.check[data-v-4f4daadc]{font-weight:700;color:#fff;background-color:#fc9153}", ""]);

// exports


/***/ }),

/***/ 847:
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

var _normalTable = __webpack_require__(574);

var _normalTable2 = _interopRequireDefault(_normalTable);

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

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

exports.default = {
  name: "tourists-conversion",
  components: {
    card: _card2.default,
    moduleHeader: _moduleHeader2.default,
    normalTable: _normalTable2.default
  },
  data: function data() {
    return {
      date1: moment().add(-7, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),
      type: 0,
      typeList: [{
        id: 1,
        name: "普通"
      }, {
        id: 2,
        name: "困难"
      }, {
        id: 3,
        name: "英雄"
      }, {
        id: 4,
        name: "王者"
      }],
      tableData: [],
      columnData: []
    };
  },

  computed: {
    dateList: function dateList() {
      var _this = this;

      return [{
        single: false,
        uid: "date1",
        label: "日期",
        startDate: this.date1,
        endDate: this.date2,
        isShowDatetype: false,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.date2 = newDate.endDate;
          _this.query();
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
        in_date2: this.date2,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_reg_channel: this.$store.getters["RegChannel/selectedIdList"],
        in_gamezone_id: this.$store.getters["Agent/selectedIdList"],
        in_os: this.$store.getters["OS/nowOS"],
        in_type_id: this.type
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
      var template_name = utils.getColumnByIndex(0, this.tableData);

      var join_user = utils.getColumnByIndex(2, this.tableData);
      var pass_rate = utils.getColumnByIndex(3, this.tableData);

      var categories = [];
      var seriesData = [{
        name: join_user,
        data: []
      }, {
        name: pass_rate,
        data: []
      }];
      this.tableData.forEach(function (item) {
        categories.push(item[template_name]);
        seriesData[0].data.push(Number(item[join_user].split("%")[0]));
        seriesData[1].data.push(Number(item[pass_rate]));
      });

      highchartUtil.drawChart("copyChart", "spline", categories, seriesData);
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

/***/ 848:
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
  }, [_vm._v("副本难度:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.type === 0
    },
    on: {
      "click": function($event) {
        _vm.type = 0
      }
    }
  }, [_vm._v("全部")]), _vm._v(" "), _vm._l((_vm.typeList), function(item) {
    return _c('div', {
      staticClass: "bt-item",
      class: {
        'check': item.id === _vm.type
      },
      on: {
        "click": function($event) {
          _vm.type = item.id
        }
      }
    }, [_vm._v(_vm._s(item.name))])
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
      "id": "copyChart"
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
      "tableData": _vm.tableData
    }
  })], 1)])])], 1)])
},staticRenderFns: []}

/***/ })

});