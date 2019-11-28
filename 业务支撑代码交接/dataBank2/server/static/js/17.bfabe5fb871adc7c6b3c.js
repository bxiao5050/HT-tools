webpackJsonp([17],{

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(957)
__webpack_require__(959)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(961),
  /* template */
  __webpack_require__(962),
  /* scopeId */
  "data-v-4d5072f7",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 957:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(958);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("6100b6e0", content, true);

/***/ }),

/***/ 958:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".item-content[data-v-4d5072f7]{margin-right:15px;float:left;line-height:30px}.item-content .bt-item[data-v-4d5072f7]{font-size:15px;cursor:pointer;padding:0 15px;float:left;background-color:#fff;border:1px solid #bbb;border-right:0;text-align:center}.item-content .bt-item[data-v-4d5072f7]:last-child{border-right:1px solid #bbb}.item-content .bt-item.check[data-v-4d5072f7]{font-weight:700;color:#fff;background-color:#fc9153}.clientName[data-v-4d5072f7]{margin-left:5px}.table-content[data-v-4d5072f7]{overflow:auto;width:100%;max-height:500px}.content-header[data-v-4d5072f7]{background:#fff}", ""]);

// exports


/***/ }),

/***/ 959:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(960);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("5cc5d9d8", content, true);

/***/ }),

/***/ 960:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".clientName input{line-height:32px;height:32px}", ""]);

// exports


/***/ }),

/***/ 961:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _input = __webpack_require__(273);

var _input2 = _interopRequireDefault(_input);

var _base = __webpack_require__(100);

var _base2 = _interopRequireDefault(_base);

var _input3 = __webpack_require__(41);

var _input4 = _interopRequireDefault(_input3);

var _moduleHeader = __webpack_require__(572);

var _moduleHeader2 = _interopRequireDefault(_moduleHeader);

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

var _normalTable = __webpack_require__(574);

var _normalTable2 = _interopRequireDefault(_normalTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'big-customer-trend',
  components: {
    moduleHeader: _moduleHeader2.default,
    card: _card2.default,
    normalTable: _normalTable2.default,
    'el-input': _input4.default
  },
  data: function data() {
    return {
      clientName: '',
      moneytypes: {
        default: 1,
        arr: [{
          val: 1,
          txt: '台币'
        }, {
          val: 2,
          txt: '美元'
        }]
      },
      moneyArea: {
        default: 1,
        arr: [{
          val: 1,
          txt: '全部'
        }, {
          val: 2,
          txt: '0~1000'
        }, {
          val: 3,
          txt: '1000~5000'
        }, {
          val: 4,
          txt: '5000~1万'
        }, {
          val: 5,
          txt: '1万~5万'
        }, {
          val: 6,
          txt: '5万以上'
        }]
      },
      header: {
        title: '大客户动向',
        definedContent: '',
        isShowIndex: false
      },
      date1: moment().add(-2, 'day').format("YYYY-MM-DD"),
      date2: moment().format("YYYY-MM-DD"),
      moneytype: 1,
      pay_money: 1
    };
  },
  mounted: function mounted() {
    this.query();
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
        isShowDatetype: false,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.query();
        }
      }];
    },
    tableData: function tableData() {
      return this.$store.state.BigCustomerTrend.data;
    }
  },
  methods: {
    query: function query() {
      this.$store.dispatch('BigCustomerTrend/data', {
        dataview: this.$store.state.common.nowmenu.dataView,
        isCache: 1,
        in_date1: this.date1,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_platform: '1,2',
        username: this.clientName,
        moneytype: this.moneytype,
        pay_money: this.pay_money
      });
    },
    moneytypeCheck: function moneytypeCheck(val) {
      this.moneytypes.default = this.moneytype = val;
    },
    moneyAreaCheck: function moneyAreaCheck(val) {
      this.moneyArea.default = this.pay_money = val;
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 962:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "big-customer-trend"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "header": _vm.header,
      "isShowReg": true,
      "dateList": _vm.dateList
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "switchs"
  }, [_c('div', {
    staticClass: "switch-group"
  }, [_c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("币种:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, _vm._l((_vm.moneytypes.arr), function(item) {
    return _c('div', {
      staticClass: "bt-item",
      class: _vm.moneytypes.default === item.val ? 'check' : '',
      on: {
        "click": function($event) {
          _vm.moneytypeCheck(item.val)
        }
      }
    }, [_vm._v(_vm._s(item.txt))])
  })), _vm._v(" "), _c('span', {
    staticClass: "item-header"
  }, [_vm._v("客户名称:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('el-input', {
    staticClass: "clientName",
    attrs: {
      "placeholder": "请输入用户名称"
    },
    model: {
      value: (_vm.clientName),
      callback: function($$v) {
        _vm.clientName = $$v
      },
      expression: "clientName"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("充值金额:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, _vm._l((_vm.moneyArea.arr), function(item) {
    return _c('div', {
      staticClass: "bt-item",
      class: _vm.moneyArea.default === item.val ? 'check' : '',
      on: {
        "click": function($event) {
          _vm.moneyAreaCheck(item.val)
        }
      }
    }, [_vm._v(_vm._s(item.txt))])
  }))])])])], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
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
  }, [_c('normalTable', {
    attrs: {
      "tableData": _vm.tableData
    }
  })], 1)])])], 1)])
},staticRenderFns: []}

/***/ })

});