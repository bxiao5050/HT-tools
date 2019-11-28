webpackJsonp([43],{

/***/ 1021:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1022);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("28a04eac", content, true);

/***/ }),

/***/ 1022:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".item-content[data-v-61ea0f11]{float:left;line-height:30px;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center}.item-content .bt-item[data-v-61ea0f11]{padding:0 10px;-webkit-box-flex:1;background-color:#fff;border:1px solid #bbb;text-align:center;white-space:nowrap}.item-content .bt-item.check[data-v-61ea0f11]{background-color:orange}.table-content[data-v-61ea0f11]{overflow:auto;width:100%;max-height:500px}.charts[data-v-61ea0f11]{min-height:300px;height:300px}.switch-group[data-v-61ea0f11],.switchs-item[data-v-61ea0f11],.switchs[data-v-61ea0f11]{font-size:15px;display:flex;align-items:center;flex-shrink:0;flex-wrap:wrap}.switchs[data-v-61ea0f11]{margin-left:3px}.switchs .switch-group.row[data-v-61ea0f11]{width:100%}.switchs .switch-group.row .switchs-item[data-v-61ea0f11]{margin:15px -5px 0 26px}.switchs .switchs-item[data-v-61ea0f11]{margin:0;flex-shrink:0}.switchs .switchs-item .item-header[data-v-61ea0f11]{flex-shrink:0;margin:0 10px 0 8px}", ""]);

// exports


/***/ }),

/***/ 1023:
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
//
//
//
//
//
//
//
//
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
  name: 'recharge-order',
  components: {
    moduleHeader: _moduleHeader2.default,
    card: _card2.default,
    normalTable: _normalTable2.default
  },
  data: function data() {
    return {
      header: {
        title: '充值订单',
        definedContent: '',
        isShowIndex: true
      },
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      date2: moment().format("YYYY-MM-DD"),
      orderId: "",
      accountId: "",
      payType: 0,
      regType: 0,

      orderType: 1,
      tableData: []
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
        isShowDatetype: false,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.date2 = newDate.endDate;
          _this.query();
        }
      }];
    }
  },
  methods: {
    query: function query() {
      var _this2 = this;

      var params = {
        in_date1: this.date1,
        in_date2: this.date2,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_platform: '1,2',
        user_id: this.orderId,
        username: this.accountId,
        pay_channel: this.$store.getters['PayChannel/selectedIdList'],
        reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        is_success: this.orderType,
        isCache: 1
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.tableData = data.state[0];
        } else {
          Utils.Notification.error({
            message: data.message
          });
        }
      });
    }
  },
  watch: {
    orderType: function orderType(v, ov) {
      if (v != ov) {
        this.query();
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14)))

/***/ }),

/***/ 1024:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "recharge-order"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "header": _vm.header,
      "dateList": _vm.dateList,
      "payment": true
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "switchs"
  }, [_c('div', {
    staticClass: "switch-group"
  }, [_c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("订单号:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.orderId),
      expression: "orderId"
    }],
    staticClass: "item-input",
    attrs: {
      "type": "text",
      "placeholder": "输入订单号"
    },
    domProps: {
      "value": (_vm.orderId)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.orderId = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("帐号:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.accountId),
      expression: "accountId"
    }],
    staticClass: "item-input",
    attrs: {
      "type": "text",
      "placeholder": "输入帐号名称"
    },
    domProps: {
      "value": (_vm.accountId)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.accountId = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "switch-group row"
  }, [_c('label', {
    staticClass: "switchs-item"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.orderType),
      expression: "orderType"
    }],
    attrs: {
      "type": "radio",
      "name": "ordertype",
      "value": "1"
    },
    domProps: {
      "checked": _vm._q(_vm.orderType, "1")
    },
    on: {
      "change": function($event) {
        _vm.orderType = "1"
      }
    }
  }), _vm._v(" "), _c('span', [_vm._v("到账订单")])]), _vm._v(" "), _c('label', {
    staticClass: "switchs-item"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.orderType),
      expression: "orderType"
    }],
    attrs: {
      "type": "radio",
      "name": "ordertype",
      "value": "2"
    },
    domProps: {
      "checked": _vm._q(_vm.orderType, "2")
    },
    on: {
      "change": function($event) {
        _vm.orderType = "2"
      }
    }
  }), _vm._v(" "), _c('span', [_vm._v("失败订单")])]), _vm._v(" "), _c('label', {
    staticClass: "switchs-item"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.orderType),
      expression: "orderType"
    }],
    attrs: {
      "type": "radio",
      "name": "ordertype",
      "value": "3"
    },
    domProps: {
      "checked": _vm._q(_vm.orderType, "3")
    },
    on: {
      "change": function($event) {
        _vm.orderType = "3"
      }
    }
  }), _vm._v(" "), _c('span', [_vm._v("待审核订单")])])])])], 1), _vm._v(" "), _c('div', {
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

/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1021)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1023),
  /* template */
  __webpack_require__(1024),
  /* scopeId */
  "data-v-61ea0f11",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

});