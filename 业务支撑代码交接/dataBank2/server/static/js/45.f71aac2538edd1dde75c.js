webpackJsonp([45],{

/***/ 1124:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1125);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("b404bae8", content, true);

/***/ }),

/***/ 1125:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".pkg-del[data-v-05c3ca80]{cursor:pointer;user-select:none}.center[data-v-05c3ca80]{padding-left:16px}", ""]);

// exports


/***/ }),

/***/ 1126:
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

exports.default = {
  name: "pkg_manager",
  components: {},
  data: function data() {
    return {
      addLimit: 2000,
      game: "",
      pkg_name: "",
      os: null,
      options: [{
        os: "0",
        txt: "IOS"
      }, {
        os: "1",
        txt: "安卓"
      }]
    };
  },

  computed: {
    _state: function _state() {
      return this.$store.state.o_c_pkg_manager;
    },
    _gameList: function _gameList() {
      return this.$store.getters["overseas_common/getList2"];
    },
    _pkgList: function _pkgList() {
      return this.$store.getters["o_c_pkg_manager/getPkgList"];
    }
  },
  watch: {},
  methods: {
    init: function init() {},
    check: function check() {
      var _this = this;

      if (!this.os) {
        this.$notify({
          type: "error",
          message: "请选择系统"
        });
        return;
      } else if (!this.game.id) {
        this.$notify({
          type: "error",
          message: "请选择游戏"
        });
        return;
      } else if (!this.pkg_name) {
        this.$notify({
          type: "error",
          message: "添加的包名不能为空"
        });
        return;
      }
      if (this.check.ban) {
        return;
      } else {
        this.check["ban"] = true;
        setTimeout(function () {
          _this.check.ban = false;
        }, this.addLimit);
      }
      var this_ = this;
      this.$store.dispatch("o_c_pkg_manager/getPkgList", true).then(function () {
        if (this_._pkgList.hasOwnProperty(this_.game.name)) {
          if (this_._pkgList[this_.game.name][this_.os].hasOwnProperty(this_.pkg_name)) {
            this_.$notify({
              type: "error",
              message: "添加的包名已重复"
            });
          } else {
            this_.add();
          }
        } else {
          this_.add();
        }
      });
    },
    add: function add() {
      var _this2 = this;

      this.$store.dispatch("o_c_pkg_manager/addPkg", {
        in_app_id: this.game.id,
        in_app_name: this.game.name,
        in_package_name: this.pkg_name,
        in_os: this.os
      }).then(function () {
        _this2.$notify({
          type: "success",
          message: "添加成功"
        });
      });
    },
    formatterDel: function formatterDel(row, col, val) {
      var h = this.$createElement;
      var _state2 = this._state,
          keys = _state2.keys,
          index = _state2.index;
      var idIndex = index.idIndex,
          osIndex = index.osIndex,
          pkgIndex = index.pkgIndex,
          gameIndex = index.gameIndex;

      var in_app_id = row[keys[idIndex]];
      var in_package_name = row[keys[pkgIndex]];
      var in_os = row[keys[osIndex]];
      return h(
        "div",
        {
          "class": "pkg-del",
          on: {
            "click": this.pkgDel.bind(this, { in_os: in_os, in_app_id: in_app_id, in_package_name: in_package_name }, row[keys[gameIndex]])
          }
        },
        ["\u5220\u9664"]
      );
    },
    pkgDel: function pkgDel(param, game) {
      var _this3 = this;

      if (confirm("\u786E\u8BA4\u5220\u9664[" + param.in_package_name + "]\u5417")) this.$store.dispatch("o_c_pkg_manager/delPkg", { param: param, game: game }).then(function () {
        _this3.$notify({
          type: "success",
          message: "删除成功"
        });
      });
    },
    formatterOs: function formatterOs(row, col, val) {
      var _state3 = this._state,
          keys = _state3.keys,
          index = _state3.index;
      var osIndex = index.osIndex;

      var osKey = keys[osIndex];
      var os = row[osKey];
      if (col.label === osKey) {
        if (os) {
          return "安卓";
        } else {
          return "IOS";
        }
      }
      return val;
    }
  },
  created: function created() {
    this.init();
    this.$store.dispatch("overseas_common/getList2");
    this.$store.dispatch("o_c_pkg_manager/getPkgList");
  }
};

/***/ }),

/***/ 1127:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pkg_manager"
  }, [_c('my-row', [_c('el-select', {
    staticStyle: {
      "margin": "0 16px 0 16px"
    },
    attrs: {
      "filterable": "",
      "value-key": "id",
      "placeholder": "请选择游戏",
      "size": "medium"
    },
    model: {
      value: (_vm.game),
      callback: function($$v) {
        _vm.game = $$v
      },
      expression: "game"
    }
  }, _vm._l((_vm._gameList), function(item) {
    return _c('el-option', {
      key: item.id,
      attrs: {
        "label": item.name,
        "value": item
      }
    })
  })), _vm._v(" "), _c('el-select', {
    staticClass: "os",
    attrs: {
      "size": "medium"
    },
    model: {
      value: (_vm.os),
      callback: function($$v) {
        _vm.os = $$v
      },
      expression: "os"
    }
  }, _vm._l((_vm.options), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.txt,
        "value": item.os
      }
    })
  }))], 1), _vm._v(" "), _c('my-row', {
    staticStyle: {
      "margin": "16px 0 0 0"
    }
  }, [_c('el-input', {
    staticStyle: {
      "margin": "0 16px 0 16px",
      "width": "310px"
    },
    attrs: {
      "size": "medium",
      "placeholder": "请输入包名"
    },
    model: {
      value: (_vm.pkg_name),
      callback: function($$v) {
        _vm.pkg_name = $$v
      },
      expression: "pkg_name"
    }
  }, [_c('template', {
    slot: "prepend"
  }, [_vm._v("包名")])], 2), _vm._v(" "), _c('el-button', {
    staticStyle: {
      "margin": "0 16px 0 0"
    },
    attrs: {
      "size": "medium"
    },
    on: {
      "click": function($event) {
        _vm.check()
      }
    }
  }, [_vm._v("\n      添加\n    ")])], 1), _vm._v(" "), _c('my-row', {
    staticClass: "center"
  }, [(_vm._pkgList) ? _c('div', [_c('el-table', {
    attrs: {
      "data": _vm._pkgList.list
    }
  }, [_vm._l((_vm._state.tableKey), function(item, i) {
    return _c('el-table-column', {
      key: i,
      attrs: {
        "prop": item,
        "label": item,
        "width": i === 0 ? 150 : i === 2 ? 210 : 80,
        "formatter": _vm.formatterOs
      }
    })
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "删除",
      "formatter": _vm.formatterDel
    }
  })], 2)], 1) : _vm._e()])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1124)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1126),
  /* template */
  __webpack_require__(1127),
  /* scopeId */
  "data-v-05c3ca80",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

});