webpackJsonp([39],{

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(736)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(738),
  /* template */
  __webpack_require__(739),
  /* scopeId */
  "data-v-2b7eb72f",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 736:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(737);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("6b263590", content, true);

/***/ }),

/***/ 737:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 738:
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

exports.default = {
  name: 'dish-plate',
  components: {
    moduleHeader: _moduleHeader2.default,
    card: _card2.default,
    normalTable: _normalTable2.default
  },
  data: function data() {
    return {
      type: 1,
      datetype: 1,
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),
      tableData: [],

      dates: []
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
        label: '日期',
        startDate: this.date1,
        endDate: this.date2,
        isShowDatetype: true,
        datetype: this.datetype,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.date2 = newDate.endDate;
          _this.query();
        }
      }];
    }
  },
  methods: {
    datetypeChange: function datetypeChange(newVal) {
      this.datetype = newVal;
      if (newVal == 1) {
        this.date1 = moment().add(-1, "day").format('YYYY-MM-DD');
        this.date2 = moment().add(-1, "day").format('YYYY-MM-DD');
      } else if (newVal == 2) {
        this.date1 = moment().add(-1, "week").day(1).format('YYYY-MM-DD');
        this.date2 = moment().add(-1, "week").day(7).format('YYYY-MM-DD');
      } else if (newVal == 3) {
        this.date1 = moment().add(-1, "month").date(1).format('YYYY-MM-DD');
        this.date2 = moment().date(1).add(-1, 'day').format('YYYY-MM-DD');
      }
      this.query();
    },
    query: function query() {
      var _this2 = this;

      var params = {
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date1: this.date1,
        in_date2: this.date2,
        in_config_id: this.type,
        date_type: this.datetype,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
        in_platform: '1,2',
        isCache: 1
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.tableData = data.state[0];
        } else {
          Utils.Notification.error({ message: data.message });
          console.error(data.message);
        }
      });
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14)))

/***/ }),

/***/ 739:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "dish-plate"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "isShowReg": true,
      "dateList": _vm.dateList
    },
    on: {
      "datetypeChange": _vm.datetypeChange
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v("关键指标分析")]), _vm._v(" "), _c('div', {
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
  }, [_vm._v("注册用户数")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 2
    },
    on: {
      "click": function($event) {
        _vm.type = 2
      }
    }
  }, [_vm._v("活跃用户数")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 3
    },
    on: {
      "click": function($event) {
        _vm.type = 3
      }
    }
  }, [_vm._v("付费用户数")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 4
    },
    on: {
      "click": function($event) {
        _vm.type = 4
      }
    }
  }, [_vm._v("付费金额")]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 5
    },
    on: {
      "click": function($event) {
        _vm.type = 5
      }
    }
  }, [_vm._v("付费ARPU")])])]), _vm._v(" "), _c('div', {
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