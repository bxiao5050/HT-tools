webpackJsonp([42],{

/***/ 1029:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1030);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("52b14d9a", content, true);

/***/ }),

/***/ 1030:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".table-content[data-v-5795d62f]{overflow:auto;width:100%;max-height:500px}.charts[data-v-5795d62f]{min-height:300px;height:300px}", ""]);

// exports


/***/ }),

/***/ 1031:
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

exports.default = {
  name: 'reg-detail',
  components: {
    moduleHeader: _moduleHeader2.default,
    card: _card2.default,
    normalTable: _normalTable2.default
  },
  data: function data() {
    return {
      header: {
        title: '注册明细',
        definedContent: '',
        isShowIndex: true
      },
      date1: moment().add(-1, "day").format("YYYY-MM-DD"),
      date2: moment().format("YYYY-MM-DD"),

      userId: "",
      userName: "",

      tableData: [],
      columnData: [] //表格列名数组
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
        isCache: 1,
        in_date1: this.date1,
        in_date2: this.date2,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_platform: '1,2',
        user_id: this.userId,
        username: this.userName
      };
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.tableData = data.state[0];
          _this2.columnData = data.state[1];
        } else {
          Utils.Notification.error({
            message: data.message
          });
          console.error(data.message);
        }
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14)))

/***/ }),

/***/ 1032:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "reg-detail"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "header": _vm.header,
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
  }, [_vm._v("ID:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userId),
      expression: "userId"
    }],
    staticClass: "item-input",
    attrs: {
      "type": "text",
      "placeholder": "输入ID"
    },
    domProps: {
      "value": (_vm.userId)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.query($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.userId = $event.target.value
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
      value: (_vm.userName),
      expression: "userName"
    }],
    staticClass: "item-input",
    attrs: {
      "type": "text",
      "placeholder": "输入帐号名称"
    },
    domProps: {
      "value": (_vm.userName)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.query($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.userName = $event.target.value
      }
    }
  })])])])], 1), _vm._v(" "), _c('div', {
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

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1029)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1031),
  /* template */
  __webpack_require__(1032),
  /* scopeId */
  "data-v-5795d62f",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

});