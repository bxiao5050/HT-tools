webpackJsonp([3],{

/***/ 1132:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1133);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("3f771734", content, true);

/***/ }),

/***/ 1133:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".viewApp{display:flex;flex-direction:column;height:100%}.viewMain{position:relative;margin-top:47px;display:flex;flex-grow:1}.viewMain .module{transition:all .3s ease-in-out;position:absolute;right:0;top:0;bottom:0;left:220px;display:flex;flex-direction:column}.viewMain .module.sm{left:60px}.viewMain .module .item-header,.viewMain .module .switch-group,.viewMain .module .switchs,.viewMain .module .switchs-item{display:flex;align-items:center}.viewMain .module .wrapper{height:100%;transition:all .3s ease-in-out}.viewMain .module .scroll{width:100%;height:100%;overflow-y:auto;overflow-x:auto}.viewMain .module .scroll .module-head{font-size:26px;font-weight:700;color:#5b5691;font-family:\\\\9ED1\\4F53;margin:15px;margin-left:18px;float:left;height:40px}.viewMain .module .scroll .components{width:100%;float:left;display:flex;flex-direction:column;font-size:13px;color:#000}.viewMain .module .scroll .components .content-header{margin-bottom:20px;background-color:#fff}.viewMain .module .scroll .components .content-header .switchs{margin-top:5px}.viewMain .module .scroll .components .content-header .switch-group{flex-wrap:wrap}.viewMain .module .scroll .components .content-header .switchs-item{margin:-2px -8px 15px 18px}.viewMain .module .scroll .components .content-header .switchs-item .item-header{margin:0 9px 0 4px}.viewMain .module .scroll .components .content-header .switchs-item .item-content{margin-right:15px;display:flex;justify-content:flex-start;align-items:flex-start;flex-wrap:wrap;line-height:30px}.viewMain .module .scroll .components .content-header .switchs-item .item-content .bt-item{cursor:pointer;padding:0 15px;float:left;background-color:#fff;border:1px solid #ddd;text-align:center}.viewMain .module .scroll .components .content-header .switchs-item .item-content .bt-item:last-child{border-right:1px solid #ddd}.viewMain .module .scroll .components .content-header .switchs-item .item-content .bt-item.check{font-weight:700;color:#fff;background-color:#fc9153;border:1px solid #fc9153}.viewMain .module .scroll .components .content-header .switchs-item input{border-radius:0}.viewMain .module .scroll .components .content-body{padding:10px 30px}.viewMain .module.hide-aside{transform:translateY(-100px)}.viewMain .module.hide-aside .wrapper{height:100%}.index-tip{color:#333}.index-tip .index-table{margin:15px 0;max-height:400px;overflow-y:auto}.index-tip .index-table::-webkit-scrollbar{width:5px}.index-tip .index-table::-webkit-scrollbar-track{border-radius:10px}.index-tip .index-table::-webkit-scrollbar-thumb{border-radius:10px;background:rgba(0,0,0,.1)}.index-tip .index-table::-webkit-scrollbar-thumb:window-inactive{background-color:#bbb}", ""]);

// exports


/***/ }),

/***/ 1134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Config) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _header = __webpack_require__(1135);

var _header2 = _interopRequireDefault(_header);

var _aside = __webpack_require__(1148);

var _aside2 = _interopRequireDefault(_aside);

var _sidebar = __webpack_require__(1231);

var _sidebar2 = _interopRequireDefault(_sidebar);

var _modal = __webpack_require__(580);

var _modal2 = _interopRequireDefault(_modal);

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

exports.default = {
  components: {
    viewHeader: _header2.default, viewSidebar: _sidebar2.default, viewAside: _aside2.default, Modal: _modal2.default, normalTable: _normalTable2.default
  },
  data: function data() {
    return {
      isShowTip: false,
      indicatorData: []
    };
  },

  computed: {
    Config: function (_Config) {
      function Config() {
        return _Config.apply(this, arguments);
      }

      Config.toString = function () {
        return _Config.toString();
      };

      return Config;
    }(function () {
      return Config;
    }),
    userInfo: function userInfo() {
      return this.$store.state.common.userInfo;
    },
    isCompact: function isCompact() {
      return this.$store.state.layout.isCompact;
    },
    nowmenu: function nowmenu() {
      return this.$store.state.common.nowmenu;
    },
    nowOS: function nowOS() {
      return this.$store.getters['OS/nowOS'];
    },
    zones: function zones() {
      return this.$store.getters['Agent/selectedIdList'];
    },
    regChannels: function regChannels() {
      return this.$store.getters['RegChannel/selectedIdList'];
    },
    payChannels: function payChannels() {
      return this.$store.getters['RegChannel/selectedIdList'];
    }
  },
  methods: {
    showTip: function showTip() {
      this.isShowTip = true;
      this.getIndicators();
    },
    getIndicators: function getIndicators() {
      var _this = this;

      var params = {
        menuId: this.nowmenu.menuId
      };
      _api2.default.user.getIndicators(params).then(function (data) {
        if (data.code == 401) {
          _this.indicatorData = data.state;
        } else {
          _this.$notify.warning({ message: '获取指标数据失败!' });
          _this.indicatorData = [];
        }
      });
    },
    refresh: function refresh() {
      this.$refs.components.query();
    }
  },
  watch: {
    nowOS: function nowOS(v, ov) {
      if (this.$store.state.Common.couldQuery && v != ov) {
        this.$refs.components.query();
      }
    },
    zones: function zones(v, ov) {
      if (this.$store.state.Common.couldQuery && v != ov) {
        this.$refs.components.query();
      }
    },
    regChannels: function regChannels(v, ov) {
      if (this.$store.state.Common.couldQuery && v != ov) {
        this.$refs.components.query();
      }
    },
    payChannels: function payChannels(v, ov) {
      if (this.$store.state.Common.couldQuery && v != ov) {
        this.$refs.components.query();
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),

/***/ 1135:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1136)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1138),
  /* template */
  __webpack_require__(1147),
  /* scopeId */
  "data-v-559a8126",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1136:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1137);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("43d92f20", content, true);

/***/ }),

/***/ 1137:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".header[data-v-559a8126]{z-index:2;display:flex;align-items:center;position:fixed;top:0;left:0;width:100%;color:#f2f1f7;height:47px;background-color:#212121}.header .logo[data-v-559a8126]{display:flex;align-items:center;margin-left:3vw;margin-right:5vw;height:37.6px}.header .logo h5[data-v-559a8126]{font-weight:600}.header .logo .icon-toggle-sm[data-v-559a8126]{cursor:pointer;color:#9da0a2;font-size:22px;margin:1px 16px 0 26px}.header .item-lr[data-v-559a8126]{display:flex;align-items:center;margin-right:0;height:39.95px;line-height:47px;font-size:15px;margin-left:auto}.header .item-lr .first-null-item[data-v-559a8126],.header .item-lr .items[data-v-559a8126]{height:47px;border-right:1px solid #020202}.header .item-lr .items[data-v-559a8126]{display:flex;align-items:center;flex-shrink:0;padding-right:15px;padding-left:15px;cursor:pointer;position:relative;border-left:1px solid #323232}.header .item-lr .items[data-v-559a8126]:nth-child(2){padding-right:106px}.header .item-lr .items[data-v-559a8126]:last-child{padding-right:30px}.header .item-lr .items[data-v-559a8126]:hover{background-color:#313131}.header .item-lr .items .badge[data-v-559a8126]{margin-left:3px}.header .item-lr .items .message-list[data-v-559a8126]{position:absolute;background-color:#313131;border:1px solid #9da0a2;top:47px;left:50%;width:206px;margin-left:-103px;max-height:250px;overflow-x:hidden;overflow-y:auto}.header .item-lr .items .message-list .message-item[data-v-559a8126]{line-height:26px;padding:6px 10px}.header .item-lr .items .message-list .message-item .message-content[data-v-559a8126]{width:100%;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.header .item-lr .items .message-list .message-item .message-time[data-v-559a8126]{font-size:12px;color:#f2f1f7}.header .item-lr .items .message-list .message-item[data-v-559a8126]:hover{background:#212121}.header .item-lr .icon[data-v-559a8126]{color:#9da0a2;font-size:24px;margin-right:6px;display:flex}.header .item-lr .icon.icon-header-language[data-v-559a8126]{z-index:10;margin-right:0}.header .item-lr .icon.icon-header-logout[data-v-559a8126]{margin-top:1px;font-size:27px}.header .item-lr .user-avatar img[data-v-559a8126]{height:37.6px;width:37.6px;border-radius:50%}.header .item-lr .user-avatar .userAvater[data-v-559a8126]{top:0;left:0;position:absolute;transform:matrix(1,0,0,1,-85,0);width:228px;height:190px;background:#000;opacity:0}", ""]);

// exports


/***/ }),

/***/ 1138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(TweenMax, Utils) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _change = __webpack_require__(1139);

var _change2 = _interopRequireDefault(_change);

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
//
//
//

exports.default = {
  components: {
    change: _change2.default
  },
  data: function data() {
    return {
      userAvater: false,
      imgs: {
        logo: __webpack_require__(1146)
        // userHead: require('src/assets/header/uh.png')
      },
      showMessageList: false,
      messageList: []
    };
  },
  computed: {
    userInfo: function userInfo() {
      return this.$store.state.common.userInfo;
    }
  },
  methods: {
    userAvaterToggle: function userAvaterToggle() {
      this.userAvater = !this.userAvater;
    },
    userAvaterEnter: function userAvaterEnter(el, done) {
      TweenMax.to(el, 0.3, {
        opacity: 1,
        y: 42,
        onComplete: done
      });
    },
    userAvaterLeave: function userAvaterLeave(el, done) {
      TweenMax.to(el, 0.3, {
        opacity: 0,
        y: 0,
        onComplete: done
      });
    },
    toggleSm: function toggleSm() {
      this.$store.commit('switchCompactStatus');
    },
    exitSystem: function exitSystem() {
      var _this = this;

      Utils.MessageBox.confirm('确认退出系统?', '提示').then(function () {
        _api2.default.user.logoutSystem({});
        setTimeout(function () {
          _this.$router.go({ path: 'login' });
        });
        // this.$store.commit('initUserInfo', null)
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(600), __webpack_require__(14)))

/***/ }),

/***/ 1139:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1140)
__webpack_require__(1142)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1144),
  /* template */
  __webpack_require__(1145),
  /* scopeId */
  "data-v-62b32e47",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1140:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1141);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("3227621f", content, true);

/***/ }),

/***/ 1141:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".change .el-select[data-v-62b32e47]{width:130px}.headerChange[data-v-62b32e47]{position:absolute;width:100%;left:0;top:0;z-index:11}", ""]);

// exports


/***/ }),

/***/ 1142:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1143);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("c30a387e", content, true);

/***/ }),

/***/ 1143:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".change .el-input__inner,.headerChange .el-input__inner{text-align:center}.headerChange .el-input__inner{background:transparent;color:#f2f1f7;border:0;padding-left:47px}.el-select-dropdown.change{overflow:hidden;background:#3d3971;border:0}.el-select-dropdown.change .el-select-dropdown__item{text-align:center;color:#fff;background:transparent}.el-select-dropdown.change .el-select-dropdown__item.hover,.el-select-dropdown.change .el-select-dropdown__item:hover{background-color:#34b58c}.el-select-dropdown.change{text-align:center}", ""]);

// exports


/***/ }),

/***/ 1144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Utils) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonMethod = __webpack_require__(99);

var _commonMethod2 = _interopRequireDefault(_commonMethod);

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

exports.default = {
  props: {
    config: {
      default: function _default() {
        return {
          className: 'change'
        };
      }
    }
  },
  data: function data() {
    return {
      cur: 'CHS', //this.$store.state.Language.cur,
      packs: [{ value: 'CHS', txt: '简体中文' }, { value: 'Tradition', txt: '繁体中文' }, { value: 'EN', txt: 'English' }]
    };
  },
  created: function created() {
    this.cur = localStorage.lang || 'CHS';
  },

  methods: {
    changeLang: function changeLang(cur) {
      localStorage.lang = this.$i18n.locale = cur;
      this.$emit('changeLang', cur);
      if (this.$store.state.common.userInfo) {
        // store.dispatch('Common/changeLanguage')
        this.changeLanguage();
      }
      // this.$store.commit('Language/cur', cur)
    },
    changeLanguage: function changeLanguage() {
      _api2.default.user.changeLanguage({
        language: this.cur
      }).then(function (data) {
        if (data.code == 303) {
          _commonMethod2.default.getSystemGames();
        } else {
          Utils.Notification.error({
            message: data.message
          });
        }
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),

/***/ 1145:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "language-component",
    class: _vm.config.className
  }, [_c('el-select', {
    attrs: {
      "popper-class": "change"
    },
    on: {
      "change": _vm.changeLang
    },
    model: {
      value: (_vm.cur),
      callback: function($$v) {
        _vm.cur = $$v
      },
      expression: "cur"
    }
  }, _vm._l((_vm.packs), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.txt,
        "value": item.value
      }
    })
  }))], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1146:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAAmCAYAAAD5hRiIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVCNzQ4NDE2OUNFNzExRTc4MzJGRTk1RDA1MEVGRUM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVCNzQ4NDE3OUNFNzExRTc4MzJGRTk1RDA1MEVGRUM4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUI2MEZCRDY5Q0U3MTFFNzgzMkZFOTVEMDUwRUZFQzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUI2MEZCRDc5Q0U3MTFFNzgzMkZFOTVEMDUwRUZFQzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz72g1w9AAAJUklEQVR42uxcaYwURRQu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"

/***/ }),

/***/ 1147:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header"
  }, [_c('div', {
    staticClass: "logo"
  }, [_c('h5', [_vm._v("业务支撑平台")]), _vm._v(" "), _c('i', {
    staticClass: "icon-toggle-sm",
    on: {
      "click": _vm.toggleSm
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "item-lr"
  }, [_c('div', {
    staticClass: "first-null-item"
  }), _vm._v(" "), _c('div', {
    staticClass: "items"
  }, [_c('i', {
    staticClass: "icon icon-header-language"
  }), _vm._v(" "), _c('change', {
    attrs: {
      "config": {
        className: 'headerChange'
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "items user-avatar"
  }, [_c('i', {
    staticClass: "icon icon-login-username"
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.userInfo.userName))])]), _vm._v(" "), _c('div', {
    staticClass: "items",
    on: {
      "click": _vm.exitSystem
    }
  }, [_c('i', {
    staticClass: "icon icon-header-logout"
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('header.logout')))])])])])
},staticRenderFns: []}

/***/ }),

/***/ 1148:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1149)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1151),
  /* template */
  __webpack_require__(1230),
  /* scopeId */
  "data-v-be0aabf0",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1149:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1150);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("44dbef29", content, true);

/***/ }),

/***/ 1150:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".aside[data-v-be0aabf0]{z-index:1;position:relative;font-size:14px;background-color:#e1e1e8}.aside .cur-game[data-v-be0aabf0]{position:absolute}.aside .box[data-v-be0aabf0]{background-color:#5b5691;width:100%;padding:0 30px;display:flex;align-items:center;border-left:1px solid #7a72c7;border-bottom:1px solid #3f3b73;overflow-x:auto}.aside .box[data-v-be0aabf0]::-webkit-scrollbar{height:3px}.aside .box[data-v-be0aabf0]::-webkit-scrollbar-track{border-radius:10px}.aside .box[data-v-be0aabf0]::-webkit-scrollbar-thumb{border-radius:10px;background:rgba(0,0,0,.1)}.aside .box[data-v-be0aabf0]::-webkit-scrollbar-thumb:window-inactive{background-color:#fff}.aside .box .game-list[data-v-be0aabf0]{display:flex}.aside .box .game-list .game-list-item[data-v-be0aabf0]{cursor:pointer;margin-right:10px}.aside .box .game-list .game-list-item .game-list-item-in[data-v-be0aabf0]{display:flex;flex-direction:column;align-items:center;padding:5px;height:97px;box-sizing:border-box}.aside .box .game-list .game-list-item .game-list-item-in .thumb[data-v-be0aabf0]{width:69px;height:69px;padding:5px;border-radius:17px}.aside .box .game-list .game-list-item .game-list-item-in span[data-v-be0aabf0]{font-size:13px;color:#fff;width:100%;line-height:20px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.aside .box .game-list .game-list-item.active[data-v-be0aabf0]{background:linear-gradient(#514b8e,#928dcf);border:1px solid #141414;box-shadow:1px 1px 4px 2px rgba(0,0,0,.3)}.aside .box .game-list .game-list-item.active .game-list-item-in[data-v-be0aabf0]{border:1px solid;border-right:2px solid;border-image:linear-gradient(#7a72c7,#cbc9e7) 30 30}.aside .box .toggleBox[data-v-be0aabf0]{margin-left:auto}.aside .icon-toggle-game-list[data-v-be0aabf0]{display:flex;flex-direction:column;align-items:center;font-size:48px;margin:0 12px;cursor:pointer}.aside .icon-toggle-game-list span[data-v-be0aabf0]{font-size:14px;white-space:nowrap}.aside .icon-toggle-game-list[data-v-be0aabf0]:hover{color:#fc9153}.aside .agent-options[data-v-be0aabf0]{margin-left:auto;background:#7e7aba;padding:5px 18px 5px 28px;max-width:200px;margin-right:5vw;position:relative;border-color:#bbb4d6;outline:1px solid #49457e;box-shadow:1px 1px 4px 2px rgba(0,0,0,.3);cursor:pointer}.aside .agent-options .el-icon-caret-bottom[data-v-be0aabf0]{position:absolute;font-size:12px;top:50%;right:8px;transform:translateY(-5px);color:#3d3971}.aside .agent-options .icon-users[data-v-be0aabf0]{color:#3d3971;position:absolute;font-size:22px;top:50%;left:10px;transform:translateY(-13px)}.aside .agent-options span[data-v-be0aabf0]{width:100%;padding:0 10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.aside .transition[data-v-be0aabf0]{overflow:hidden}.aside .transition .cover[data-v-be0aabf0]{position:fixed;width:200%;height:200%;background:transparent;left:-100%;top:-100%;z-index:10!important}.aside .transition>div[data-v-be0aabf0]{position:relative;z-index:11}.aside .show-game-content[data-v-be0aabf0]{position:absolute;right:20px;top:100%;color:#fff;background-color:#5b5691;padding:5px;border-radius:50px;cursor:pointer;font-weight:500;transition:all .3s ease-in-out;box-sizing:border-box}.aside .show-game-content.up[data-v-be0aabf0]{transform:rotate(-90deg)}.aside .show-game-content.up[data-v-be0aabf0]:hover{box-shadow:-2px -2px 2px 2px #928dcf;color:#fc9153}.aside .show-game-content.down[data-v-be0aabf0]{transform:rotate(90deg)}.aside .show-game-content.down[data-v-be0aabf0]:hover{box-shadow:2px 2px 2px 2px #928dcf;color:#fc9153}", ""]);

// exports


/***/ }),

/***/ 1151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(TweenMax) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gameList = __webpack_require__(1152);

var _gameList2 = _interopRequireDefault(_gameList);

var _agent = __webpack_require__(1170);

var _agent2 = _interopRequireDefault(_agent);

var _register = __webpack_require__(1204);

var _register2 = _interopRequireDefault(_register);

var _payment = __webpack_require__(1217);

var _payment2 = _interopRequireDefault(_payment);

var _commonMethod = __webpack_require__(99);

var _commonMethod2 = _interopRequireDefault(_commonMethod);

var _gameIconConfig = __webpack_require__(619);

var _gameIconConfig2 = _interopRequireDefault(_gameIconConfig);

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
  components: {
    gameList: _gameList2.default,
    agent: _agent2.default,
    channelRegister: _register2.default,
    channelPayment: _payment2.default
  },
  data: function data() {
    return {
      i: 0,
      transing: false,
      gameList: false,
      agentList: false,
      tfcr: false,
      aniAwait: false,
      ease: Back.easeOut.config(3)
    };
  },
  computed: {
    cover: function cover() {
      return this.$store.getters["cover"];
    },
    systemId: function systemId() {
      return this.$store.state.common.systems.systemId;
    },
    games: function games() {
      var _this = this;

      var games = this.$store.getters["games"];
      games.forEach(function (item) {
        item.icon = _gameIconConfig2.default.config[_this.systemId][item.id] || _gameIconConfig2.default.defaultIcon;
      });
      return games;
    },
    nowgame: function nowgame() {
      return this.$store.state.common.nowgame;
    },

    //判断是否需要代理商模块
    agents: function agents() {
      return this.$store.state.common.systems.systemId != 3;
    },
    selectedConfirmList: function selectedConfirmList() {
      return this.$store.getters["Agent/selectedConfirmList"];
    },
    selectedConfirmList_filter: function selectedConfirmList_filter() {
      var _this2 = this;

      var h = "";
      this.selectedConfirmList.forEach(function (e, i) {
        var n = e.name ? e.name : e.parentname ? e.parentname : e.grandname;
        var f = _this2.selectedConfirmList.length - i === 1 ? "" : ",";
        h += n + f;
      });
      return h;
    }
  },
  methods: {
    closeAll: function closeAll() {
      for (var n in this.$store.state.aside.isShow) {
        this.$store.state.aside.isShow[n] = false;
      }
    },
    gameSelect: function gameSelect(item) {
      // console.log(item.id)
      if (item.id != this.nowgame) {
        this.$store.commit("selectGame", item.id);
        _commonMethod2.default.changeGame();
      }
    },
    transition: function transition(element, done) {
      var _this3 = this;

      var h = element.offsetHeight;
      var d = (h * 0.001).toFixed(2);
      if (this.$store.state.aside.isShow[element.dataset.key]) {
        element.style.opacity = 0;
        element.style.height = 0;
        TweenMax.to(element, d * 3, {
          height: h,
          opacity: 1,
          ease: this.ease,
          onComplete: function onComplete() {
            requestAnimationFrame(function () {
              _this3.$store.state.aside.transing = false;
            });
            done();
          }
        });
      } else {
        TweenMax.to(element, d, {
          opacity: 0,
          height: 0,
          onComplete: function onComplete() {
            var state = _this3.$store.state.aside;
            if (state.async) {
              state.async = false;
              state.isShow[state.key] = true;
            } else {
              requestAnimationFrame(function () {
                _this3.$store.state.aside.transing = false;
              });
            }
            element.style.height = "auto";
            done();
          }
        });
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(600)))

/***/ }),

/***/ 1152:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1153)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1155),
  /* template */
  __webpack_require__(1169),
  /* scopeId */
  "data-v-4bd71de9",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1153:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1154);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("2f8f2bd1", content, true);

/***/ }),

/***/ 1154:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".game-list[data-v-4bd71de9]{color:#000;overflow:hidden}.game-list .ctn[data-v-4bd71de9]{padding:16px;display:flex;justify-content:flex-start;align-items:flex-start}.game-list .ctn .item[data-v-4bd71de9]{margin:0 0 0 20px;text-align:center;display:flex;flex-direction:column;align-items:center;padding:0 5px;height:87px;transition:all 1s;cursor:pointer}.game-list .ctn .item img[data-v-4bd71de9]{width:69px;height:69px;padding:5px}.game-list .ctn .item span[data-v-4bd71de9]{width:100%;line-height:20px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}", ""]);

// exports


/***/ }),

/***/ 1155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonMethod = __webpack_require__(99);

var _commonMethod2 = _interopRequireDefault(_commonMethod);

var _gameIconConfig = __webpack_require__(619);

var _gameIconConfig2 = _interopRequireDefault(_gameIconConfig);

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

exports.default = {
  data: function data() {
    return {};
  },
  methods: {
    gameSelect: function gameSelect(item, index) {
      if (item.id != this.nowgame) {
        this.$store.commit('selectGame', item.id);
        _commonMethod2.default.changeGame();

        this.games.splice(index, 1);
        this.games.unshift(item);
      }
    }
  },
  computed: {
    systemId: function systemId() {
      return this.$store.state.common.systems.systemId;
    },
    games: function games() {
      var _this = this;

      var games = this.$store.getters['games'];
      games.forEach(function (item) {
        item.icon = _gameIconConfig2.default.config[_this.systemId][item.id] || _gameIconConfig2.default.defaultIcon;
      });
      return games;
    }
  }
};

/***/ }),

/***/ 1156:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1157:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/DDT_.136df33.png";

/***/ }),

/***/ 1158:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/game_icon_10002.9ac920c.png";

/***/ }),

/***/ 1159:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/game_icon_1004.a8cb78d.png";

/***/ }),

/***/ 1160:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/game_icon_10052.1810359.png";

/***/ }),

/***/ 1161:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/game_icon_10062.3445af8.png";

/***/ }),

/***/ 1162:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/game_icon_10009.28e3e61.png";

/***/ }),

/***/ 1163:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/game_icon_1006.dda1af9.png";

/***/ }),

/***/ 1164:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/game_icon_10086.eff1c74.png";

/***/ }),

/***/ 1165:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1166:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1167:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1168:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1169:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "game-list"
  }, [_c('div', {
    staticClass: "ctn"
  }, _vm._l((_vm.games), function(item, index) {
    return (index >= 9) ? _c('div', {
      key: index,
      staticClass: "item",
      attrs: {
        "title": item.name
      },
      on: {
        "click": function($event) {
          _vm.gameSelect(item, index)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": item.icon
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.name))])]) : _vm._e()
  }))])
},staticRenderFns: []}

/***/ }),

/***/ 1170:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1171),
  /* template */
  __webpack_require__(1203),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ply = __webpack_require__(1172);

var _ply2 = _interopRequireDefault(_ply);

var _ply3 = __webpack_require__(1193);

var _ply4 = _interopRequireDefault(_ply3);

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


exports.default = {
  components: {
    plyone: _ply2.default, plythree: _ply4.default
  }
};

/***/ }),

/***/ 1172:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1173)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1175),
  /* template */
  __webpack_require__(1192),
  /* scopeId */
  "data-v-afd8604c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1173:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1174);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("1aedfa26", content, true);

/***/ }),

/***/ 1174:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".agent-list[data-v-afd8604c]{background:#fff;font-size:14px;margin:16px 0;padding:3px 16px 10px;transform:translateY(-16px)}.agent-list .title-list[data-v-afd8604c]{color:#000;font-size:16px;margin:13px 9px}.agent-list .checkbox[data-v-afd8604c]{color:#000;user-select:none;display:flex;align-items:center;width:65px;font-size:13px;margin:0 30px}.agent-list .checkbox label[data-v-afd8604c]{cursor:pointer;font-weight:700;width:30px;margin:3px 0 0 8px}.agent-list .search[data-v-afd8604c]{margin-left:auto;justify-content:flex-end;width:100%;max-width:250px;min-width:100px;padding:2px 0}.agent-list .box .box-item[data-v-afd8604c]{background-color:#fc9153;color:#fff}.agent-list .box .box-item[data-v-afd8604c]:hover{background-color:#fb6104}.agent-list .box.box-fixed[data-v-afd8604c]{height:218px;overflow:auto}.agent-list .box .btn[data-v-afd8604c]{font-size:13px;float:left;position:relative;width:150px;line-height:30px;height:30px;margin:8px 12px 0 0;border-radius:3px}.agent-list .box .btn .checkbox[data-v-afd8604c]{margin:-2px 5px 0 0;width:20px}.agent-list .box .btn span[data-v-afd8604c]{width:105px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.agent-list .confirm[data-v-afd8604c]{background-color:#5cb85c;color:#fff}.agent-list .confirm[data-v-afd8604c]:hover{background-color:#419641}.agent-list .confirm.btn[data-v-afd8604c]{margin:5px 13% 10px auto;padding:4px 20px}.btn-secondary[data-v-afd8604c],.btn-secondary[data-v-afd8604c]:hover{border:0}", ""]);

// exports


/***/ }),

/***/ 1175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Utils, $) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(583);

var _card2 = _interopRequireDefault(_card);

var _row = __webpack_require__(584);

var _row2 = _interopRequireDefault(_row);

var _search = __webpack_require__(585);

var _search2 = _interopRequireDefault(_search);

var _normal = __webpack_require__(576);

var _normal2 = _interopRequireDefault(_normal);

var _nav = __webpack_require__(586);

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    Card: _card2.default,
    Row: _row2.default,
    Search: _search2.default,
    Checkbox: _normal2.default,
    Navi: _nav2.default
  },
  // template: require('../templates/ply-1.html'),
  computed: {
    data: function data() {
      return this.$store.state.Agent.data;
    },
    confirm: function confirm() {
      return this.$store.state.Agent.confirm;
    }
  },
  data: function data() {
    return {
      activeId: null,
      searchtxt: '',
      effConfig: {
        default: '1',
        list: [{
          name: '平台',
          id: '1'
        }, {
          name: '联运',
          id: '2'
        }, {
          name: '平台+联运',
          id: '1,2'
        }]
      }

    };
  },
  methods: {
    searching: function searching(searchtxt) {
      this.searchtxt = searchtxt.toLowerCase();
    },
    searchFilter: function searchFilter(name) {
      if (name.indexOf(this.searchtxt) != -1) {
        return true;
      } else {
        return false;
      }
    },
    toConfirm: function toConfirm() {
      // 数据同步
      if (this.data.selected === 0) {
        Utils.Notification.error({
          message: "代理商不能为空~"
        });
      } else {
        this.$store.commit('Agent/confirm', $.extend(true, {}, this.data));
        this.$store.commit('AsideToggleShow', 1);
      }
    },
    toggle: function toggle(e) {
      this.$store.commit('Agent/toggle', {
        e: e
      });
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(32)))

/***/ }),

/***/ 1176:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1177);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("3aa65594", content, true);

/***/ }),

/***/ 1177:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".ui-card{box-sizing:border-box;color:#000;width:100%;height:250px;padding:15px;margin:15px 0;border:1px solid #cfd8dc}", ""]);

// exports


/***/ }),

/***/ 1178:
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

exports.default = {
  name: 'ui-card',
  props: ['config']
};

/***/ }),

/***/ 1179:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ui-card"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),

/***/ 1180:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1181);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("67268174", content, true);

/***/ }),

/***/ 1181:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".lo-row[data-v-b0b17a02]{display:flex;flex-direction:row;align-items:center}", ""]);

// exports


/***/ }),

/***/ 1182:
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

exports.default = {
  name: 'lo-row'
};

/***/ }),

/***/ 1183:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "lo-row"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),

/***/ 1184:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1185);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("77316f94", content, true);

/***/ }),

/***/ 1185:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".search[data-v-2c90af39]{font-size:13px;display:flex;align-items:center}.search button[data-v-2c90af39]{margin-left:5px;padding:0 2px}.search button.btn-outline-primary[data-v-2c90af39]{color:#fc9153;border-color:#fc9153}.search button.btn-outline-primary[data-v-2c90af39]:hover{color:#fff;background-color:#fc9153;border-color:#fc9153}.search button .icon-search[data-v-2c90af39]{display:flex;align-items:center;justify-content:center;width:24px;height:28px}.search input[data-v-2c90af39]{height:14px;line-height:14px;font-size:14px;box-sizing:content-box}", ""]);

// exports


/***/ }),

/***/ 1186:
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

exports.default = {
  data: function data() {
    return {
      value: ''
    };
  },
  props: ['params']
};

/***/ }),

/***/ 1187:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "search"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.value),
      expression: "value"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "search"
    },
    domProps: {
      "value": (_vm.value)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.value = $event.target.value
      }
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "btn btn-outline-primary",
    on: {
      "click": function($event) {
        _vm.params.click(_vm.value.toLowerCase())
      }
    }
  }, [_c('i', {
    staticClass: "icon-search"
  })])])
},staticRenderFns: []}

/***/ }),

/***/ 1188:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1189);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("26792159", content, true);

/***/ }),

/***/ 1189:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".ui-nav[data-v-7674f832],.ui-nav ul[data-v-7674f832]{display:flex;justify-content:flex-end}.ui-nav ul[data-v-7674f832]{list-style:none;color:#000;padding:0;margin:0}.ui-nav ul .nav-item[data-v-7674f832]{margin-left:3px;line-height:20px}.ui-nav ul .nav-item[data-v-7674f832]:first-child{margin-left:0}.ui-nav ul .nav-item .nav-link[data-v-7674f832]{text-align:center}.btn-orange[data-v-7674f832]{background-color:#fc9153;color:#fff}.btn-orange[data-v-7674f832]:hover{background-color:#fb6104}", ""]);

// exports


/***/ }),

/***/ 1190:
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


exports.default = {
  props: ['data']
};

/***/ }),

/***/ 1191:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ui-nav code-01"
  }, [_c('ul', _vm._l((_vm.data.list), function(item, index) {
    return (item[_vm.data.itemName]) ? _c('li', {
      staticClass: "nav-item btn",
      class: {
        'btn-orange': (_vm.data.cur === item[_vm.data.curName]), 'btn-secondary': (_vm.data.cur != item[_vm.data.curName])
      },
      on: {
        "click": function($event) {
          _vm.data.click(item, index)
        }
      }
    }, [_c('a', {
      staticClass: "nav-link"
    }, [_vm._v(_vm._s(item[_vm.data.itemName]))])]) : _vm._e()
  }))])
},staticRenderFns: []}

/***/ }),

/***/ 1192:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.data) ? _c('div', {
    staticClass: "agent-list"
  }, [_c('Row', [_c('div', {
    staticClass: "title-list"
  }, [_vm._v("代理商列表")])]), _vm._v(" "), _c('Row', [_c('Navi', {
    staticClass: "navi",
    attrs: {
      "data": {
        list: _vm.effConfig.list,
        itemName: 'name',
        cur: _vm.effConfig.default,
        curName: 'id',
        click: function (item, index) {
          _vm.effConfig.default = item.id
        }
      }
    }
  }), _vm._v(" "), _c('div', {
    on: {
      "click": function($event) {
        _vm.toggle(_vm.data)
      }
    }
  }, [_c('Checkbox', {
    staticClass: "checkbox",
    attrs: {
      "state": _vm.data.len === _vm.data.selected ? 2 : _vm.data.selected === 0 ? 0 : 1
    }
  }, [_c('label', [_vm._v("全选")])])], 1), _vm._v(" "), _c('Search', {
    staticClass: "search",
    attrs: {
      "params": {
        click: _vm.searching
      }
    }
  })], 1), _vm._v(" "), _c('Card', {
    staticClass: "card"
  }, [_c('Row', [_c('div', {
    staticClass: "box box-fixed"
  }, _vm._l((_vm.data), function(e) {
    return (typeof(e) === 'object' && _vm.searchFilter(e.name.toLowerCase())) ? _c('div', {
      staticClass: "btn btn-secondary"
    }, [_c('div', {
      on: {
        "click": function($event) {
          _vm.toggle(e)
        }
      }
    }, [_c('Checkbox', {
      attrs: {
        "state": _vm.data.len === _vm.data.selected ? 2 : _vm.data.selected === 0 ? 0 : e.select
      }
    })], 1), _vm._v(" "), _c('span', {
      attrs: {
        "title": e.name
      }
    }, [_vm._v(_vm._s(e.name))])]) : _vm._e()
  }))])], 1), _vm._v(" "), _c('Row', [_c('button', {
    staticClass: "btn confirm",
    on: {
      "click": _vm.toConfirm
    }
  }, [_vm._v("确 定")])])], 1) : _vm._e()
},staticRenderFns: []}

/***/ }),

/***/ 1193:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1194)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1196),
  /* template */
  __webpack_require__(1202),
  /* scopeId */
  "data-v-afa00248",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1194:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1195);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("7a425d2c", content, true);

/***/ }),

/***/ 1195:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".agent-list[data-v-afa00248]{background:#fff;font-size:14px;margin:16px 0;padding:3px 16px 10px;transform:translateY(-16px)}.agent-list .title-list[data-v-afa00248]{color:#000;font-size:16px;margin:13px 9px}.agent-list .checkbox[data-v-afa00248]{color:#000;user-select:none;display:flex;align-items:center;width:65px;font-size:13px;margin:0 30px}.agent-list .checkbox label[data-v-afa00248]{cursor:pointer;font-weight:700;width:30px;margin:3px 0 0 8px}.agent-list .search[data-v-afa00248]{margin-left:auto;justify-content:flex-end;width:100%;max-width:250px;min-width:100px;padding:2px 0}.agent-list .box .box-item[data-v-afa00248]{background-color:#fc9153;color:#fff}.agent-list .box .box-item[data-v-afa00248]:hover{background-color:#fb6104}.agent-list .box.box-fixed[data-v-afa00248]{height:218px;overflow:auto}.agent-list .box .btn[data-v-afa00248]{font-size:13px;float:left;position:relative;width:150px;line-height:30px;height:30px;margin:8px 12px 0 0;border-radius:3px}.agent-list .box .btn .checkbox[data-v-afa00248]{margin:-2px 5px 0 0;width:20px}.agent-list .box .btn span[data-v-afa00248]{width:105px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.agent-list .confirm[data-v-afa00248]{background-color:#5cb85c;color:#fff}.agent-list .confirm[data-v-afa00248]:hover{background-color:#419641}.agent-list .confirm.btn[data-v-afa00248]{margin:5px 13% 10px auto;padding:4px 20px}.card[data-v-afa00248]:first-child{width:50%}.card[data-v-afa00248]:nth-child(2){margin:15px}.card[data-v-afa00248]:nth-child(3){width:35%}.btn-secondary[data-v-afa00248],.btn-secondary[data-v-afa00248]:hover{border:0}.selected[data-v-afa00248]{overflow:auto;height:170px}.selected .line[data-v-afa00248]{clear:both;float:left;cursor:default}.selected .line .icon-close[data-v-afa00248]{cursor:pointer;display:none}.selected .line:hover .icon-close[data-v-afa00248]{display:inline-block}", ""]);

// exports


/***/ }),

/***/ 1196:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Utils, $) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(583);

var _card2 = _interopRequireDefault(_card);

var _row = __webpack_require__(584);

var _row2 = _interopRequireDefault(_row);

var _search = __webpack_require__(585);

var _search2 = _interopRequireDefault(_search);

var _normal = __webpack_require__(576);

var _normal2 = _interopRequireDefault(_normal);

var _nav = __webpack_require__(586);

var _nav2 = _interopRequireDefault(_nav);

var _OS = __webpack_require__(1197);

var _OS2 = _interopRequireDefault(_OS);

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
    Card: _card2.default,
    Row: _row2.default,
    Search: _search2.default,
    Checkbox: _normal2.default,
    Navi: _nav2.default,
    OSGroup: _OS2.default
  },
  computed: {
    data: function data() {
      return this.$store.state.Agent.data;
    },
    confirm: function confirm() {
      return this.$store.state.Agent.confirm;
    },
    curGrandid: function curGrandid() {
      return this.$store.state.Agent.data.default;
    },
    curParentid: function curParentid() {
      return this.$store.state.Agent.data[this.$store.state.Agent.data.default].default;
    },
    selectedList: function selectedList() {
      return this.$store.getters['Agent/selectedList'];
    }
  },
  data: function data() {
    return {
      curId: null,
      searchTxt: ''
    };
  },
  methods: {
    naviClick: function naviClick(e, i) {
      var store = this.$store,
          data = store.state.Agent.data,
          _old = data.default,
          _new = e.grandid;

      if (_old !== _new) {
        if (data[_old].select !== 0) {
          store.commit('Agent/toggle', { e: data[_old] });
        }
        store.commit('Agent/toggle', { e: data[_new] });
        data.default = _new;
      }
    },
    toConfirm: function toConfirm() {
      // 数据同步
      if (this.data.selected === 0) {
        Utils.Notification.error({
          message: "代理商不能为空~"
        });
      } else {
        this.$store.commit('Agent/confirm', $.extend(true, {}, this.data));
        this.$store.commit('AsideToggleShow', 1);
      }
    },
    toggle: function toggle(e) {
      this.$store.commit('Agent/toggle', { e: e });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(32)))

/***/ }),

/***/ 1197:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1198)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1200),
  /* template */
  __webpack_require__(1201),
  /* scopeId */
  "data-v-1f5d804f",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1198:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1199);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("3f80be44", content, true);

/***/ }),

/***/ 1199:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".os-group[data-v-1f5d804f]{display:flex;justify-content:center;align-self:center;line-height:32px;background-color:#fff;color:#333;margin-left:25px;margin-bottom:10px}.os-group .os-head[data-v-1f5d804f]{margin-right:42px;line-height:39px}.os-group .os-list[data-v-1f5d804f]{display:flex}.os-group .os-list .os-item[data-v-1f5d804f]{font-size:0}.os-group .os-list .os-item .checkbox[data-v-1f5d804f]{color:#000;user-select:none;display:flex;align-items:center;width:65px;font-size:13px;margin:0 15px 0 0}.os-group .os-list .os-item .checkbox label[data-v-1f5d804f]{cursor:pointer;font-weight:400;width:30px;margin:3px 0 0 8px}", ""]);

// exports


/***/ }),

/***/ 1200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normal = __webpack_require__(576);

var _normal2 = _interopRequireDefault(_normal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'OS',
  components: {
    Checkbox: _normal2.default
  },
  computed: {
    OSList: function OSList() {
      return this.$store.state.OS.OSList;
    }
  },
  methods: {
    checkOS: function checkOS(item) {
      item.checked = !item.checked;
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

/***/ }),

/***/ 1201:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "os-group"
  }, [_c('div', {
    staticClass: "os-head"
  }, [_vm._v("系统选择：")]), _vm._v(" "), _c('div', {
    staticClass: "os-list"
  }, _vm._l((_vm.OSList), function(item) {
    return _c('div', {
      staticClass: "os-item",
      on: {
        "click": function($event) {
          _vm.checkOS(item)
        }
      }
    }, [_c('Checkbox', {
      attrs: {
        "state": item.checked ? 2 : 0
      }
    }, [_c('label', [_vm._v(_vm._s(item.name))])])], 1)
  }))])
},staticRenderFns: []}

/***/ }),

/***/ 1202:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.data) ? _c('div', {
    staticClass: "agent-list"
  }, [_c('Row', [_c('div', {
    staticClass: "title-list"
  }, [_vm._v("代理商列表")])]), _vm._v(" "), _c('Row', [_c('OSGroup')], 1), _vm._v(" "), _c('Row', [_c('Navi', {
    staticClass: "navi",
    attrs: {
      "data": {
        list: _vm.data,
        itemName: 'grandname',
        cur: _vm.curGrandid,
        curName: 'grandid',
        click: _vm.naviClick
      }
    }
  })], 1), _vm._v(" "), _c('Row', [_c('Card', {
    staticClass: "card"
  }, [_c('Row', [_c('div', {
    on: {
      "click": function($event) {
        _vm.toggle(_vm.data[_vm.curGrandid])
      }
    }
  }, [_c('Checkbox', {
    attrs: {
      "state": _vm.data[_vm.curGrandid].select
    }
  }, [_c('label', [_vm._v("全选")])])], 1), _vm._v(" "), _c('Search', {
    staticClass: "search"
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "box box-fixed"
  }, _vm._l((_vm.data[_vm.curGrandid]), function(e, i) {
    return (typeof(e) === 'object') ? _c('li', {
      key: i,
      staticClass: "btn",
      class: {
        'box-item': _vm.curParentid === e.parentid, 'btn-secondary': _vm.curParentid != e.parentid
      },
      on: {
        "click": function($event) {
          _vm.data[_vm.curGrandid].default = e.parentid
        }
      }
    }, [_c('div', {
      on: {
        "click": function($event) {
          _vm.toggle(_vm.data[e.grandid][e.parentid])
        }
      }
    }, [_c('Checkbox', {
      attrs: {
        "state": _vm.data[e.grandid][e.parentid].select
      }
    })], 1), _vm._v(" "), _c('span', {
      staticClass: "title",
      attrs: {
        "title": e.parentname
      }
    }, [_vm._v(_vm._s(e.parentname))])]) : _vm._e()
  }))], 1), _vm._v(" "), _c('Card', {
    staticClass: "card"
  }, [_c('Row', [_c('div', {
    on: {
      "click": function($event) {
        _vm.toggle(_vm.data[_vm.curGrandid][_vm.curParentid])
      }
    }
  }, [_c('Checkbox', {
    attrs: {
      "state": _vm.data[_vm.curGrandid][_vm.curParentid].select
    }
  }, [_c('label', [_vm._v("全选")])])], 1), _vm._v(" "), _c('Search', {
    staticClass: "search"
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "box box-fixed"
  }, _vm._l((_vm.data[_vm.curGrandid][_vm.curParentid]), function(e, i) {
    return (typeof(e) === 'object') ? _c('li', {
      key: i,
      staticClass: "btn",
      class: {
        'box-item': _vm.curId === e.id, 'btn-secondary': _vm.curId != e.id
      },
      on: {
        "click": function($event) {
          _vm.curId = e.id
        }
      }
    }, [_c('div', {
      on: {
        "click": function($event) {
          _vm.toggle(e)
        }
      }
    }, [_c('Checkbox', {
      attrs: {
        "state": e.select
      }
    })], 1), _vm._v(" "), _c('span', {
      staticClass: "title",
      attrs: {
        "title": e.name
      }
    }, [_vm._v(_vm._s(e.name))])]) : _vm._e()
  }))], 1), _vm._v(" "), _c('Card', {
    staticClass: "card"
  }, [_c('p', [_vm._v("已选中列表(" + _vm._s(_vm.selectedList ? _vm.selectedList.length : 0) + ")")]), _vm._v(" "), _c('div', {
    staticClass: "selected"
  }, _vm._l((_vm.selectedList), function(e, i) {
    return _c('span', {
      key: i,
      staticClass: "line"
    }, [_c('span', {
      domProps: {
        "innerHTML": _vm._s(e.name ? e.name : e.parentname ? e.parentname : e.grandname ? e.grandname : '')
      }
    }), _vm._v(" "), _c('i', {
      staticClass: "icon-close",
      on: {
        "click": function($event) {
          _vm.toggle(e)
        }
      }
    })])
  }))])], 1), _vm._v(" "), _c('Row', [_c('button', {
    staticClass: "btn confirm",
    on: {
      "click": _vm.toConfirm
    }
  }, [_vm._v("确 定")])])], 1) : _vm._e()
},staticRenderFns: []}

/***/ }),

/***/ 1203:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.$store.state.Agent.ply === 1) ? _c('plyone') : _vm._e(), _vm._v(" "), (_vm.$store.state.Agent.ply === 3) ? _c('plythree') : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1204:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1205),
  /* template */
  __webpack_require__(1216),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ply = __webpack_require__(1206);

var _ply2 = _interopRequireDefault(_ply);

var _ply3 = __webpack_require__(1211);

var _ply4 = _interopRequireDefault(_ply3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} Register
 * @property {plyone} plyone Schedules on a queue in the current event frame
 */
//
//
//
//

var register = {
  /**
   * 模板数据初始化，开始执行渲染
   * @property {number} plyone 
   */
  components: {
    plyone: _ply2.default,
    plythree: _ply4.default
  },
  computed: {
    ply: function ply() {
      return this.$store.state.RegChannel.ply;
    },
    curView: function curView() {
      return this.ply === 1 ? 'plyone' : this.ply === 3 ? 'plythree' : 'plytwo';
    }
  }
};
exports.default = register;

/***/ }),

/***/ 1206:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1207)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1209),
  /* template */
  __webpack_require__(1210),
  /* scopeId */
  "data-v-5ca19850",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1207:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1208);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("0dfcb70e", content, true);

/***/ }),

/***/ 1208:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".agent-list[data-v-5ca19850]{background:#fff;font-size:14px;margin-top:16px;padding:3px 16px 10px;transform:translateY(-16px)}.agent-list .title-list[data-v-5ca19850]{color:#000;font-size:16px;margin:13px 9px}.agent-list .checkbox[data-v-5ca19850]{color:#000;user-select:none;display:flex;align-items:center;width:65px;font-size:13px;margin:0 30px}.agent-list .checkbox label[data-v-5ca19850]{cursor:pointer;font-weight:700;width:30px;margin:3px 0 0 8px}.agent-list .search[data-v-5ca19850]{margin-left:auto;justify-content:flex-end;width:100%;max-width:250px;min-width:100px}.agent-list .box .box-item[data-v-5ca19850]{background-color:#fc9153;color:#fff}.agent-list .box .box-item[data-v-5ca19850]:hover{background-color:#fb6104}.agent-list .box.box-fixed[data-v-5ca19850]{height:218px;overflow:auto}.agent-list .box .btn[data-v-5ca19850]{font-size:13px;float:left;position:relative;width:120px;line-height:30px;height:30px;margin:8px 12px 0 0;border-radius:3px}.agent-list .box .btn .checkbox[data-v-5ca19850]{margin:-2px 5px 0 0;width:20px}.agent-list .box .btn span[data-v-5ca19850]{width:68px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.agent-list .confirm[data-v-5ca19850]{background-color:#5cb85c;color:#fff}.agent-list .confirm[data-v-5ca19850]:hover{background-color:#419641}.agent-list .confirm.btn[data-v-5ca19850]{margin:5px 13% 10px auto;padding:4px 20px}.title-list[data-v-5ca19850]{margin-top:12px!important}.card[data-v-5ca19850]{margin-top:10px}.btn-secondary[data-v-5ca19850],.btn-secondary[data-v-5ca19850]:hover{border:0}.selected[data-v-5ca19850]{overflow:auto;height:170px}.selected .line[data-v-5ca19850]{clear:both;float:left;cursor:default}.selected .line .icon-close[data-v-5ca19850]{cursor:pointer;display:none}.selected .line:hover .icon-close[data-v-5ca19850]{display:inline-block}", ""]);

// exports


/***/ }),

/***/ 1209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Utils, $) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(583);

var _card2 = _interopRequireDefault(_card);

var _row = __webpack_require__(584);

var _row2 = _interopRequireDefault(_row);

var _search = __webpack_require__(585);

var _search2 = _interopRequireDefault(_search);

var _normal = __webpack_require__(576);

var _normal2 = _interopRequireDefault(_normal);

var _nav = __webpack_require__(586);

var _nav2 = _interopRequireDefault(_nav);

var _vuex = __webpack_require__(268);

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

exports.default = {
  components: {
    Card: _card2.default, Row: _row2.default, Search: _search2.default, Checkbox: _normal2.default, Navi: _nav2.default
  },
  // template: require('../templates/ply-1.html'),
  computed: {
    data: function data() {
      var data = this.$store.state.RegChannel.data;
      return data;
    },
    confirm: function confirm() {
      return this.$store.state.RegChannel.confirm;
    }
  },
  data: function data() {
    return {
      curId: null,
      searchtxt: ''
    };
  },
  methods: {
    toConfirm: function toConfirm() {
      // 数据同步
      if (this.data.selected === 0) {
        Utils.Notification.error({
          message: "渠道不能为空~"
        });
      } else {
        this.$store.commit('RegChannel/confirm', $.extend(true, {}, this.data));
        this.$store.commit('AsideToggleShow', 2);
      }
    },
    toggle: function toggle(e) {
      this.$store.commit('RegChannel/toggle', { e: e });
    },

    /**
     * 
     * @function searching
    */
    searching: function searching(searchtxt) {
      this.searchtxt = searchtxt.toLowerCase();
    },
    searchFilter: function searchFilter(name) {
      if (name.indexOf(this.searchtxt) != -1) {
        return true;
      } else {
        return false;
      }
    }
  }

  // export default plyone

};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(32)))

/***/ }),

/***/ 1210:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.data) ? _c('div', {
    staticClass: "agent-list"
  }, [_c('Row', [_c('div', {
    staticClass: "title-list"
  }, [_vm._v("注册渠道")])]), _vm._v(" "), _c('Row', [_c('div', {
    on: {
      "click": function($event) {
        _vm.toggle(_vm.data)
      }
    }
  }, [_c('Checkbox', {
    attrs: {
      "state": _vm.data.len === _vm.data.selected ? 2 : _vm.data.selected === 0 ? 0 : 1
    }
  }, [_c('label', [_vm._v("全选")])])], 1), _vm._v(" "), _c('Search', {
    staticClass: "search",
    attrs: {
      "params": {
        click: _vm.searching
      }
    }
  })], 1), _vm._v(" "), _c('Card', {
    staticClass: "card"
  }, [_c('Row', [_c('div', {
    staticClass: "box box-fixed"
  }, _vm._l((_vm.data), function(e) {
    return (typeof(e) === 'object' && _vm.searchFilter(e.name.toLowerCase())) ? _c('div', {
      staticClass: "btn btn-secondary"
    }, [_c('div', {
      on: {
        "click": function($event) {
          _vm.toggle(e)
        }
      }
    }, [_c('Checkbox', {
      attrs: {
        "state": _vm.data.len === _vm.data.selected ? 2 : _vm.data.selected === 0 ? 0 : e.select
      }
    })], 1), _vm._v(" "), _c('span', {
      attrs: {
        "title": e.name
      }
    }, [_vm._v(_vm._s(e.name))])]) : _vm._e()
  }))])], 1), _vm._v(" "), _c('Row', [_c('button', {
    staticClass: "btn confirm",
    on: {
      "click": _vm.toConfirm
    }
  }, [_vm._v("确 定")])])], 1) : _vm._e()
},staticRenderFns: []}

/***/ }),

/***/ 1211:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1212)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1214),
  /* template */
  __webpack_require__(1215),
  /* scopeId */
  "data-v-5cbdc752",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1212:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1213);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("ceebf040", content, true);

/***/ }),

/***/ 1213:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".agent-list[data-v-5cbdc752]{background:#fff;font-size:14px;margin-top:16px;padding:3px 16px 10px;transform:translateY(-16px)}.agent-list .title-list[data-v-5cbdc752]{color:#000;font-size:16px;margin:13px 9px}.agent-list .checkbox[data-v-5cbdc752]{color:#000;user-select:none;display:flex;align-items:center;width:65px;font-size:13px;margin:0 30px}.agent-list .checkbox label[data-v-5cbdc752]{cursor:pointer;font-weight:700;width:30px;margin:3px 0 0 8px}.agent-list .search[data-v-5cbdc752]{margin-left:auto;justify-content:flex-end;width:100%;max-width:250px;min-width:100px}.agent-list .box .box-item[data-v-5cbdc752]{background-color:#fc9153;color:#fff}.agent-list .box .box-item[data-v-5cbdc752]:hover{background-color:#fb6104}.agent-list .box.box-fixed[data-v-5cbdc752]{height:218px;overflow:auto}.agent-list .box .btn[data-v-5cbdc752]{font-size:13px;float:left;position:relative;width:120px;line-height:30px;height:30px;margin:8px 12px 0 0;border-radius:3px}.agent-list .box .btn .checkbox[data-v-5cbdc752]{margin:-2px 5px 0 0;width:20px}.agent-list .box .btn span[data-v-5cbdc752]{width:68px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.agent-list .confirm[data-v-5cbdc752]{background-color:#5cb85c;color:#fff}.agent-list .confirm[data-v-5cbdc752]:hover{background-color:#419641}.agent-list .confirm.btn[data-v-5cbdc752]{margin:5px 13% 10px auto;padding:4px 20px}.card[data-v-5cbdc752]:nth-child(2){margin:16px 16px 0}.card[data-v-5cbdc752]:nth-child(3){width:45%}.btn-secondary[data-v-5cbdc752],.btn-secondary[data-v-5cbdc752]:hover{border:0}.selected[data-v-5cbdc752]{overflow:auto;height:170px}.selected .line[data-v-5cbdc752]{clear:both;float:left;cursor:default}.selected .line .icon-close[data-v-5cbdc752]{cursor:pointer;display:none}.selected .line:hover .icon-close[data-v-5cbdc752]{display:inline-block}", ""]);

// exports


/***/ }),

/***/ 1214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Utils, $) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(583);

var _card2 = _interopRequireDefault(_card);

var _row = __webpack_require__(584);

var _row2 = _interopRequireDefault(_row);

var _search = __webpack_require__(585);

var _search2 = _interopRequireDefault(_search);

var _normal = __webpack_require__(576);

var _normal2 = _interopRequireDefault(_normal);

var _nav = __webpack_require__(586);

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    Card: _card2.default,
    Row: _row2.default,
    Search: _search2.default,
    Checkbox: _normal2.default,
    Navi: _nav2.default
  },
  // template: require('../templates/ply-3.html'),
  computed: {
    data: function data() {
      // let data = this.$store.state.RegChannel.data;
      // if (data.len > 0) return data;
      // return false
      return this.$store.state.RegChannel.data;
    },
    confirm: function confirm() {
      return this.$store.state.RegChannel.confirm;
    },
    curGrandid: function curGrandid() {
      return this.$store.state.RegChannel.data.default;
    },
    curParentid: function curParentid() {
      return this.$store.state.RegChannel.data[this.$store.state.RegChannel.data.default].default;
    },
    selectedList: function selectedList() {
      return this.$store.getters['RegChannel/selectedList'];
    }
  },
  data: function data() {
    return {
      curId: null,
      searchTxt: ''
    };
  },
  methods: {
    naviClick: function naviClick(e, i) {
      // this.$store.state.RegChannel.data.default = e.grandid
      var store = this.$store,
          data = store.state.RegChannel.data,
          _old = data.default,
          _new = e.grandid;

      if (_old !== _new) {
        if (data[_old].select !== 0) {
          store.commit('RegChannel/toggle', { e: data[_old] });
        }
        store.commit('RegChannel/toggle', { e: data[_new] });
        data.default = _new;
      }
    },
    toConfirm: function toConfirm() {
      // 数据同步
      if (this.data.selected === 0) {
        Utils.Notification.error({
          message: "渠道不能为空~"
        });
      } else {
        this.$store.commit('RegChannel/confirm', $.extend(true, {}, this.data));
        this.$store.commit('AsideToggleShow', 2);
      }
    },
    toggle: function toggle(e) {
      this.$store.commit('RegChannel/toggle', {
        e: e
      });
    },
    setDefault: function setDefault(e) {
      this.$store.state.RegChannel.data.default = e.grandid;
      this.$store.state.RegChannel.data[this.$store.state.RegChannel.data.default].default = e.parentid;
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(32)))

/***/ }),

/***/ 1215:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.data) ? _c('div', {
    staticClass: "agent-list"
  }, [_c('Row', [_c('div', {
    staticClass: "title-list"
  }, [_vm._v("渠道列表")]), _vm._v(" "), _c('Navi', {
    staticClass: "navi",
    attrs: {
      "data": {
        list: _vm.data,
        itemName: 'grandname',
        cur: _vm.curGrandid,
        curName: 'grandid',
        click: _vm.naviClick
      }
    }
  })], 1), _vm._v(" "), _c('Row', [_c('Card', {
    staticClass: "card"
  }, [_c('Row', [_c('div', {
    on: {
      "click": function($event) {
        _vm.toggle(_vm.data[_vm.curGrandid])
      }
    }
  }, [_c('Checkbox', {
    attrs: {
      "state": _vm.data[_vm.curGrandid].select
    }
  }, [_c('label', [_vm._v("全选")])])], 1), _vm._v(" "), _c('Search', {
    staticClass: "search"
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "box box-fixed"
  }, _vm._l((_vm.data[_vm.curGrandid]), function(e, i) {
    return (typeof(e) === 'object') ? _c('li', {
      staticClass: "btn",
      class: {
        'box-item': _vm.curParentid === e.parentid, 'btn-secondary': _vm.curParentid != e.parentid
      },
      on: {
        "click": function($event) {
          _vm.setDefault(e)
        }
      }
    }, [_c('div', {
      on: {
        "click": function($event) {
          _vm.toggle(_vm.data[e.grandid][e.parentid])
        }
      }
    }, [_c('Checkbox', {
      attrs: {
        "state": _vm.data[e.grandid][e.parentid].select
      }
    })], 1), _vm._v(" "), _c('span', {
      staticClass: "title",
      attrs: {
        "title": e.parentname
      }
    }, [_vm._v(_vm._s(e.parentname))])]) : _vm._e()
  }))], 1), _vm._v(" "), _c('Card', {
    staticClass: "card"
  }, [_c('Row', [_c('div', {
    on: {
      "click": function($event) {
        _vm.toggle(_vm.data[_vm.curGrandid][_vm.curParentid])
      }
    }
  }, [_c('Checkbox', {
    attrs: {
      "state": _vm.data[_vm.curGrandid][_vm.curParentid].select
    }
  }, [_c('label', [_vm._v("全选")])])], 1), _vm._v(" "), _c('Search', {
    staticClass: "search"
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "box box-fixed"
  }, _vm._l((_vm.data[_vm.curGrandid][_vm.curParentid]), function(e, i) {
    return (typeof(e) === 'object') ? _c('li', {
      staticClass: "btn",
      class: {
        'box-item': _vm.curId === e.id, 'btn-secondary': _vm.curId != e.id
      },
      on: {
        "click": function($event) {
          _vm.curId = e.id
        }
      }
    }, [_c('div', {
      on: {
        "click": function($event) {
          _vm.toggle(e)
        }
      }
    }, [_c('Checkbox', {
      attrs: {
        "state": e.select
      }
    })], 1), _vm._v(" "), _c('span', {
      staticClass: "title",
      attrs: {
        "title": e.name
      }
    }, [_vm._v(_vm._s(e.name))])]) : _vm._e()
  }))], 1), _vm._v(" "), _c('Card', {
    staticClass: "card"
  }, [_c('p', [_vm._v("已选中列表")]), _vm._v(" "), _c('div', {
    staticClass: "selected"
  }, _vm._l((_vm.selectedList), function(e, i) {
    return _c('span', {
      staticClass: "line"
    }, [_c('span', {
      domProps: {
        "innerHTML": _vm._s(e.name ? e.name : e.parentname ? e.parentname : e.grandname ? e.grandname : '')
      }
    }), _c('i', {
      staticClass: "icon-close",
      on: {
        "click": function($event) {
          _vm.toggle(e)
        }
      }
    })])
  }))])], 1), _vm._v(" "), _c('Row', [_c('button', {
    staticClass: "btn confirm",
    on: {
      "click": _vm.toConfirm
    }
  }, [_vm._v("确 定")])])], 1) : _vm._e()
},staticRenderFns: []}

/***/ }),

/***/ 1216:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c(_vm.curView, {
    tag: "component"
  })], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1217:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1218),
  /* template */
  __webpack_require__(1229),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ply = __webpack_require__(1219);

var _ply2 = _interopRequireDefault(_ply);

var _ply3 = __webpack_require__(1224);

var _ply4 = _interopRequireDefault(_ply3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} payment
 * @property {plyone} plyone Schedules on a queue in the current event frame
 */
//
//
//
//
//
//
//
//
//


var payment = {

  /**
  * 模板数据初始化，开始执行渲染
  * 
  * @property {number} plyone 
  */
  components: {

    plyone: _ply2.default,
    plythree: _ply4.default
  }
};
exports.default = payment;

/***/ }),

/***/ 1219:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1220)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1222),
  /* template */
  __webpack_require__(1223),
  /* scopeId */
  "data-v-5dc67105",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1220:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1221);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("7a6bd9e2", content, true);

/***/ }),

/***/ 1221:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".pay-channel-list[data-v-5dc67105]{background:#fff;font-size:14px;margin-top:16px;padding:3px 16px 10px;transform:translateY(-16px)}.pay-channel-list .title-list[data-v-5dc67105]{color:#000;font-size:16px;margin-top:-12px}.pay-channel-list .navi[data-v-5dc67105]{margin-left:auto}.pay-channel-list .checkbox[data-v-5dc67105]{user-select:none;display:flex;align-items:center;width:65px;font-size:13px;margin:0 10px}.pay-channel-list .checkbox label[data-v-5dc67105]{cursor:pointer;font-weight:700;width:30px;margin:3px 0 0 8px}.pay-channel-list .search[data-v-5dc67105]{margin-left:auto;justify-content:flex-end;width:100%;max-width:250px;min-width:100px}.pay-channel-list .box .box-item[data-v-5dc67105]{background-color:#fc9153;color:#fff}.pay-channel-list .box .box-item[data-v-5dc67105]:hover{background-color:#fb6104}.pay-channel-list .box.box-fixed[data-v-5dc67105]{height:186px;margin-top:15px;overflow:auto;padding-bottom:10px}.pay-channel-list .box .btn[data-v-5dc67105]{font-size:13px;float:left;position:relative;width:120px;line-height:30px;height:30px;margin:8px 12px 0 0;border-radius:3px}.pay-channel-list .box .btn .checkbox[data-v-5dc67105]{margin:-2px 5px 0 0;width:20px}.pay-channel-list .box .btn span[data-v-5dc67105]{width:68px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.pay-channel-list .confirm[data-v-5dc67105]{background-color:#5cb85c;color:#fff}.pay-channel-list .confirm[data-v-5dc67105]:hover{background-color:#419641}.pay-channel-list .confirm.btn[data-v-5dc67105]{margin:5px 13% 10px auto;padding:4px 20px}.title-list[data-v-5dc67105]{margin-top:12px!important}.card[data-v-5dc67105]{margin-top:10px}.btn-secondary[data-v-5dc67105],.btn-secondary[data-v-5dc67105]:hover{border:0}.selected[data-v-5dc67105]{overflow:auto;height:170px}.selected .line[data-v-5dc67105]{clear:both;float:left;cursor:default}.selected .line .icon-close[data-v-5dc67105]{cursor:pointer;display:none}.selected .line:hover .icon-close[data-v-5dc67105]{display:inline-block}", ""]);

// exports


/***/ }),

/***/ 1222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Utils, $) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(583);

var _card2 = _interopRequireDefault(_card);

var _row = __webpack_require__(584);

var _row2 = _interopRequireDefault(_row);

var _search = __webpack_require__(585);

var _search2 = _interopRequireDefault(_search);

var _normal = __webpack_require__(576);

var _normal2 = _interopRequireDefault(_normal);

var _nav = __webpack_require__(586);

var _nav2 = _interopRequireDefault(_nav);

var _vuex = __webpack_require__(268);

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


exports.default = {
  components: {
    Card: _card2.default, Row: _row2.default, Search: _search2.default, Checkbox: _normal2.default, Navi: _nav2.default
  },
  // template: require('../templates/ply-1.html'),
  computed: {
    data: function data() {
      var data = this.$store.state.PayChannel.data;
      return data;
    },
    confirm: function confirm() {
      return this.$store.state.PayChannel.confirm;
    }
  },
  data: function data() {
    return {
      curId: null,
      searchtxt: ''
    };
  },
  methods: {
    toConfirm: function toConfirm() {
      // 数据同步
      if (this.data.selected === 0) {
        Utils.Notification.error({
          message: "渠道不能为空~"
        });
      } else {
        this.$store.commit('PayChannel/confirm', $.extend(true, {}, this.data));
        this.$store.commit('AsideToggleShow', 2);
      }
    },
    toggle: function toggle(e) {
      this.$store.commit('PayChannel/toggle', { e: e });
    },

    /**
     * 
     * @function searching
    */
    searching: function searching(searchtxt) {
      this.searchtxt = searchtxt.toLowerCase();
    },
    searchFilter: function searchFilter(name) {
      if (name.indexOf(this.searchtxt) != -1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(32)))

/***/ }),

/***/ 1223:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.data) ? _c('div', {
    staticClass: "pay-channel-list"
  }, [_c('Row', [_c('div', {
    staticClass: "title-list"
  }, [_vm._v("付费渠道")])]), _vm._v(" "), _c('Card', {
    staticClass: "card"
  }, [_c('Row', [_c('div', {
    on: {
      "click": function($event) {
        _vm.toggle(_vm.data)
      }
    }
  }, [_c('Checkbox', {
    attrs: {
      "state": _vm.data.len === _vm.data.selected ? 2 : _vm.data.selected === 0 ? 0 : 1
    }
  }, [_c('label', [_vm._v("全选")])])], 1), _vm._v(" "), _c('Search', {
    staticClass: "search",
    attrs: {
      "params": {
        click: _vm.searching
      }
    }
  })], 1), _vm._v(" "), _c('Row', [_c('div', {
    staticClass: "box box-fixed"
  }, _vm._l((_vm.data), function(e) {
    return (typeof(e) === 'object' && _vm.searchFilter(e.name.toLowerCase())) ? _c('div', {
      staticClass: "btn btn-secondary"
    }, [_c('div', {
      on: {
        "click": function($event) {
          _vm.toggle(e)
        }
      }
    }, [_c('Checkbox', {
      attrs: {
        "state": _vm.data.len === _vm.data.selected ? 2 : _vm.data.selected === 0 ? 0 : e.select
      }
    })], 1), _vm._v(" "), _c('span', {
      attrs: {
        "title": e.name
      }
    }, [_vm._v(_vm._s(e.name))])]) : _vm._e()
  }))])], 1), _vm._v(" "), _c('Row', [_c('button', {
    staticClass: "btn confirm",
    on: {
      "click": _vm.toConfirm
    }
  }, [_vm._v("确 定")])])], 1) : _vm._e()
},staticRenderFns: []}

/***/ }),

/***/ 1224:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1225)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1227),
  /* template */
  __webpack_require__(1228),
  /* scopeId */
  "data-v-5de2a007",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1225:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1226);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("4d8fbd9e", content, true);

/***/ }),

/***/ 1226:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".pay-channel-list[data-v-5de2a007]{background:#fff;font-size:14px;margin-top:16px;padding:3px 16px 10px;transform:translateY(-16px)}.pay-channel-list .title-list[data-v-5de2a007]{color:#000;font-size:16px;margin-top:-12px}.pay-channel-list .navi[data-v-5de2a007]{margin-left:auto}.pay-channel-list .checkbox[data-v-5de2a007]{user-select:none;display:flex;align-items:center;width:65px;font-size:13px;margin:0 10px}.pay-channel-list .checkbox label[data-v-5de2a007]{cursor:pointer;font-weight:700;width:30px;margin:3px 0 0 8px}.pay-channel-list .search[data-v-5de2a007]{margin-left:auto;justify-content:flex-end;width:100%;max-width:250px;min-width:100px}.pay-channel-list .box .box-item[data-v-5de2a007]{background-color:#fc9153;color:#fff}.pay-channel-list .box .box-item[data-v-5de2a007]:hover{background-color:#fb6104}.pay-channel-list .box.box-fixed[data-v-5de2a007]{height:186px;margin-top:15px;overflow:auto;padding-bottom:10px}.pay-channel-list .box .btn[data-v-5de2a007]{font-size:13px;float:left;position:relative;width:120px;line-height:30px;height:30px;margin:8px 12px 0 0;border-radius:3px}.pay-channel-list .box .btn .checkbox[data-v-5de2a007]{margin:-2px 5px 0 0;width:20px}.pay-channel-list .box .btn span[data-v-5de2a007]{width:68px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.pay-channel-list .confirm[data-v-5de2a007]{background-color:#5cb85c;color:#fff}.pay-channel-list .confirm[data-v-5de2a007]:hover{background-color:#419641}.pay-channel-list .confirm.btn[data-v-5de2a007]{margin:5px 13% 10px auto;padding:4px 20px}.card[data-v-5de2a007]:nth-child(2){margin:16px 16px 0}.card[data-v-5de2a007]:nth-child(3){width:45%}.btn-secondary[data-v-5de2a007],.btn-secondary[data-v-5de2a007]:hover{border:0}.selected[data-v-5de2a007]{overflow:auto;height:170px}.selected .line[data-v-5de2a007]{clear:both;float:left;cursor:default}.selected .line .icon-close[data-v-5de2a007]{cursor:pointer;display:none}.selected .line:hover .icon-close[data-v-5de2a007]{display:inline-block}", ""]);

// exports


/***/ }),

/***/ 1227:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Utils, $) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(583);

var _card2 = _interopRequireDefault(_card);

var _row = __webpack_require__(584);

var _row2 = _interopRequireDefault(_row);

var _search = __webpack_require__(585);

var _search2 = _interopRequireDefault(_search);

var _normal = __webpack_require__(576);

var _normal2 = _interopRequireDefault(_normal);

var _nav = __webpack_require__(586);

var _nav2 = _interopRequireDefault(_nav);

var _vuex = __webpack_require__(268);

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


exports.default = {
  components: {
    Card: _card2.default, Row: _row2.default, Search: _search2.default, Checkbox: _normal2.default, Navi: _nav2.default
  },
  // template: require('../templates/ply-3.html'),
  computed: {
    data: function data() {
      // let data = this.$store.state.channel.data;
      // if (data.len > 0) return data;
      // return false
      return this.$store.state.channel.data;
    },
    confirm: function confirm() {
      return this.$store.state.channel.confirm;
    },
    curGrandid: function curGrandid() {
      return this.$store.state.channel.data.default;
    },
    curParentid: function curParentid() {
      return this.$store.state.channel.data[this.$store.state.channel.data.default].default;
    },
    selectedList: function selectedList() {
      return this.$store.getters['channel/selectedList'];
    }
  },
  data: function data() {
    return {
      curId: null,
      searchTxt: ''
    };
  },
  methods: {
    naviClick: function naviClick(e, i) {
      this.$store.state.channel.data.default = e.grandid;
    },
    toConfirm: function toConfirm() {
      // 数据同步
      if (this.data.selected === 0) {
        Utils.Notification.error({
          message: "渠道不能为空~"
        });
      } else {
        this.$store.commit('channel/confirm', $.extend(true, {}, this.data));
        this.$store.commit('AsideToggleShow', 2);
      }
    },
    toggle: function toggle(e) {
      this.$store.commit('channel/toggle', { e: e });
    },
    setDefault: function setDefault(e) {
      this.$store.state.channel.data.default = e.grandid;
      this.$store.state.channel.data[this.$store.state.channel.data.default].default = e.parentid;
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(32)))

/***/ }),

/***/ 1228:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.data) ? _c('div', {
    staticClass: "pay-channel-list"
  }, [_c('Row', [_c('div', {
    staticClass: "title-list"
  }, [_vm._v("付费渠道")]), _vm._v(" "), _c('Navi', {
    staticClass: "navi",
    attrs: {
      "data": {
        list: _vm.data,
        itemName: 'grandname',
        cur: _vm.curGrandid,
        curName: 'grandid',
        click: _vm.naviClick
      }
    }
  })], 1), _vm._v(" "), _c('Row', [_c('Card', {
    staticClass: "card"
  }, [_c('Row', [_c('div', {
    on: {
      "click": function($event) {
        _vm.toggle(_vm.data[_vm.curGrandid])
      }
    }
  }, [_c('Checkbox', {
    attrs: {
      "state": _vm.data[_vm.curGrandid].select
    }
  }, [_c('label', [_vm._v("全选")])])], 1), _vm._v(" "), _c('Search', {
    staticClass: "search"
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "box box-fixed"
  }, _vm._l((_vm.data[_vm.curGrandid]), function(e, i) {
    return (typeof(e) === 'object') ? _c('li', {
      staticClass: "btn",
      class: {
        'box-item': _vm.curParentid === e.parentid, 'btn-secondary': _vm.curParentid != e.parentid
      },
      on: {
        "click": function($event) {
          _vm.setDefault(e)
        }
      }
    }, [_c('div', {
      on: {
        "click": function($event) {
          _vm.toggle(_vm.data[e.grandid][e.parentid])
        }
      }
    }, [_c('Checkbox', {
      attrs: {
        "state": _vm.data[e.grandid][e.parentid].select
      }
    })], 1), _vm._v(" "), _c('span', {
      staticClass: "title",
      attrs: {
        "title": e.parentname
      }
    }, [_vm._v(_vm._s(e.parentname))])]) : _vm._e()
  }))], 1), _vm._v(" "), _c('Card', {
    staticClass: "card"
  }, [_c('Row', [_c('div', {
    on: {
      "click": function($event) {
        _vm.toggle(_vm.data[_vm.curGrandid][_vm.curParentid])
      }
    }
  }, [_c('Checkbox', {
    attrs: {
      "state": _vm.data[_vm.curGrandid][_vm.curParentid].select
    }
  }, [_c('label', [_vm._v("全选")])])], 1), _vm._v(" "), _c('Search', {
    staticClass: "search"
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "box box-fixed"
  }, _vm._l((_vm.data[_vm.curGrandid][_vm.curParentid]), function(e, i) {
    return (typeof(e) === 'object') ? _c('li', {
      staticClass: "btn",
      class: {
        'box-item': _vm.curId === e.id, 'btn-secondary': _vm.curId != e.id
      },
      on: {
        "click": function($event) {
          _vm.curId = e.id
        }
      }
    }, [_c('div', {
      on: {
        "click": function($event) {
          _vm.toggle(e)
        }
      }
    }, [_c('Checkbox', {
      attrs: {
        "state": e.select
      }
    })], 1), _vm._v(" "), _c('span', {
      staticClass: "title",
      attrs: {
        "title": e.name
      }
    }, [_vm._v(_vm._s(e.name))])]) : _vm._e()
  }))], 1), _vm._v(" "), _c('Card', {
    staticClass: "card"
  }, [_c('p', [_vm._v("已选中列表")]), _vm._v(" "), _c('div', {
    staticClass: "selected"
  }, _vm._l((_vm.selectedList), function(e, i) {
    return _c('span', {
      staticClass: "line"
    }, [_c('span', {
      domProps: {
        "innerHTML": _vm._s(e.name ? e.name : e.parentname ? e.parentname : e.grandname ? e.grandname : '')
      }
    }), _c('i', {
      staticClass: "icon-close",
      on: {
        "click": function($event) {
          _vm.toggle(e)
        }
      }
    })])
  }))])], 1), _vm._v(" "), _c('Row', [_c('button', {
    staticClass: "btn confirm",
    on: {
      "click": _vm.toConfirm
    }
  }, [_vm._v("确 定")])])], 1) : _vm._e()
},staticRenderFns: []}

/***/ }),

/***/ 1229:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.$store.state.PayChannel.ply === 1) ? _c('plyone') : _vm._e(), _vm._v(" "), (_vm.$store.state.PayChannel.ply === 3) ? _c('plythree') : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 1230:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "aside",
    attrs: {
      "id": "aside"
    }
  }, [_c('div', {
    staticClass: "box"
  }, [(_vm.games) ? _c('div', {
    staticClass: "game-list"
  }, _vm._l((_vm.games), function(item, index) {
    return (index < 9) ? _c('div', {
      key: index,
      staticClass: "game-list-item",
      class: {
        active: item.id === _vm.nowgame
      },
      attrs: {
        "title": item.name
      },
      on: {
        "click": function($event) {
          _vm.gameSelect(item)
        }
      }
    }, [_c('div', {
      staticClass: "game-list-item-in"
    }, [_c('img', {
      staticClass: "thumb",
      attrs: {
        "src": item.icon
      }
    }), _vm._v(" "), _c('span', {
      attrs: {
        "noselect": ""
      }
    }, [_vm._v(_vm._s(item.name))])])]) : _vm._e()
  })) : _vm._e(), _vm._v(" "), (_vm.games && _vm.games.length > 9) ? _c('i', {
    staticClass: "icon-toggle-game-list",
    on: {
      "click": function($event) {
        _vm.$store.commit('AsideToggleShow', 0)
      }
    }
  }, [_c('span', {
    attrs: {
      "noselect": ""
    }
  }, [_vm._v(_vm._s(_vm.$t('aside.more')))])]) : _vm._e(), _vm._v(" "), (_vm.agents) ? _c('div', {
    staticClass: "agent-options btn btn-info",
    on: {
      "click": function($event) {
        _vm.$store.commit('AsideToggleShow', 1)
      }
    }
  }, [_c('i', {
    staticClass: "icon-users"
  }), _vm._v(" "), _c('span', {
    attrs: {
      "title": _vm.selectedConfirmList_filter
    }
  }, [_vm._v(_vm._s(_vm.selectedConfirmList_filter || '无代理商权限'))]), _vm._v(" "), _c('i', {
    staticClass: "el-icon-caret-bottom"
  })]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "transition",
    attrs: {
      "id": "aside-transition"
    }
  }, [_c('div', {
    staticClass: "cover",
    class: {
      'core-hide': _vm.cover
    },
    on: {
      "click": _vm.closeAll
    }
  }), _vm._v(" "), _c('transition', {
    on: {
      "enter": _vm.transition,
      "leave": _vm.transition
    }
  }, [_c('gameList', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.$store.state.aside.isShow['0']),
      expression: "$store.state.aside.isShow['0']"
    }],
    attrs: {
      "data-key": "0"
    }
  })], 1), _vm._v(" "), _c('transition', {
    on: {
      "enter": _vm.transition,
      "leave": _vm.transition
    }
  }, [_c('agent', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.$store.state.aside.isShow['1']),
      expression: "$store.state.aside.isShow['1']"
    }],
    attrs: {
      "data-key": "1"
    }
  })], 1), _vm._v(" "), _c('transition', {
    on: {
      "enter": _vm.transition,
      "leave": _vm.transition
    }
  }, [_c('channelRegister', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.$store.state.aside.isShow['2']),
      expression: "$store.state.aside.isShow['2']"
    }],
    attrs: {
      "data-key": "2"
    }
  })], 1), _vm._v(" "), _c('transition', {
    on: {
      "enter": _vm.transition,
      "leave": _vm.transition
    }
  }, [_c('channelPayment', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.$store.state.aside.isShow['3']),
      expression: "$store.state.aside.isShow['3']"
    }],
    attrs: {
      "data-key": "3"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "show-game-content",
    class: {
      up: !_vm.$store.state.common.hideAside, down: _vm.$store.state.common.hideAside
    },
    attrs: {
      "title": "游戏列表显示/隐藏"
    },
    on: {
      "click": function($event) {
        _vm.$store.commit('changeAside')
      }
    }
  }, [_c('i', {
    staticClass: "icon-arrow-right"
  })])])
},staticRenderFns: []}

/***/ }),

/***/ 1231:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1232)
__webpack_require__(1234)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1236),
  /* template */
  __webpack_require__(1239),
  /* scopeId */
  "data-v-74b5902c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1232:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1233);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("d7ee7344", content, true);

/***/ }),

/***/ 1233:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".sidebar[data-v-74b5902c]{transition:.3s ease-in-out;position:fixed;left:0;top:47px;width:220px;height:100%;background:#fff;display:flex;align-items:center;flex-direction:column}.sidebar header[data-v-74b5902c]{position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100px;background:#5b5691;border-right:1px solid #3f3b73;border-bottom:1px solid #3f3b73}.sidebar header .icon-system[data-v-74b5902c]{color:#fff;font-size:23px;margin:0 6px 0 0}.sidebar header .system[data-v-74b5902c]{width:168px}.sidebar main[data-v-74b5902c]{width:100%;height:calc(100% - 96px);box-shadow:2px 0 10px 0 rgba(0,0,0,.2)}.sidebar main .firMenu[data-v-74b5902c],.sidebar main[data-v-74b5902c]{position:relative;display:flex;flex-direction:column}.sidebar main .firMenu .name[data-v-74b5902c]{display:flex;position:relative;cursor:pointer;font-size:15px;width:100%;line-height:38px;height:38px;align-items:center;color:#333}.sidebar main .firMenu .name.active[data-v-74b5902c]{background:#5b5791;color:#fff;border-right:1px solid #5b5791}.sidebar main .firMenu .name.active .firMenuName[data-v-74b5902c]{font-weight:700}.sidebar main .firMenu .name.open[data-v-74b5902c]{background:#5b5791;color:#fff}.sidebar main .firMenu .name span[data-v-74b5902c]{display:block;width:148px;overflow:hidden;height:100%}.sidebar main .firMenu .name[data-v-74b5902c]:hover{background:#5b5791;color:#fff}.sidebar main .firMenu .name[data-v-74b5902c]:before{content:\"\";margin:0 0 0 16px}.sidebar main .firMenu .name[data-v-74b5902c]:after{transition:.3s ease-out;content:\"\\2039\";position:absolute;top:0;right:23px;transform:rotate(-90deg)}.sidebar main .firMenu .name.shut[data-v-74b5902c]:after{right:20px;top:2px;transform:rotate(-180deg)}.sidebar main .firMenu .name .icon[data-v-74b5902c]{margin:0 10px 0 5px}.sidebar main .firMenu .toggle[data-v-74b5902c]{display:flex;flex-direction:column}.sidebar main .firMenu .toggle .secMenu[data-v-74b5902c]{color:#5b5691;color:#333;text-decoration:none;display:block;cursor:pointer;width:100%;line-height:34px;font-size:13px;overflow:hidden;height:34px}.sidebar main .firMenu .toggle .secMenu.active[data-v-74b5902c],.sidebar main .firMenu .toggle .secMenu[data-v-74b5902c]:hover{color:#fff;background:#5b5691}.sidebar main .firMenu .toggle .secMenu[data-v-74b5902c]:before{content:\"\";padding:0 0 0 56px}.sidebar main .firMenu .toggle .secMenu.open.active[data-v-74b5902c]{border-left:3px solid #fff}.sidebar.sm[data-v-74b5902c]{width:60px}.sidebar.sm .toggle[data-v-74b5902c]{left:60px;text-align:center;width:150px;position:absolute}.sidebar.sm .secMenu[data-v-74b5902c]:before{display:none}.sidebar.sm header[data-v-74b5902c]:hover{background:#5b5691}.sidebar.sm .system[data-v-74b5902c]{position:absolute;width:100%;height:100%;left:0;background:transparent}.sidebar.sm .toggle[data-v-74b5902c]{top:0;background:#fff}.sidebar.sm .name[data-v-74b5902c]:after{content:\"\"!important;transform:rotate(-180deg)!important;position:absolute;width:100%;height:100%;top:0;left:0}.sidebar.sm .name .firMenuName[data-v-74b5902c]{display:none}", ""]);

// exports


/***/ }),

/***/ 1234:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1235);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("0b00921c", content, true);

/***/ }),

/***/ 1235:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".sidebar .system input{background:transparent;color:inherit;font-size:16px;border:0;padding:0 32px 0 0;text-align:center}.el-select-dropdown.sidebar{overflow:hidden;background:#3d3971;border:0}.el-select-dropdown.sidebar .el-select-dropdown__item{text-align:center;color:#fff;background:transparent}.el-select-dropdown.sidebar .el-select-dropdown__item.hover,.el-select-dropdown.sidebar .el-select-dropdown__item:hover{background:#34b58c}.sidebar.sm .system .el-input,.sidebar.sm .system input{position:absolute;width:100%;height:100%;color:transparent;user-select:none}.sidebar.sm .system .el-input__icon{display:none}", ""]);

// exports


/***/ }),

/***/ 1236:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, TweenMax) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commonMethod = __webpack_require__(99);

var _commonMethod2 = _interopRequireDefault(_commonMethod);

var _menuIconConfig = __webpack_require__(1237);

var _menuIconConfig2 = _interopRequireDefault(_menuIconConfig);

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

exports.default = {
  name: "sidebar",
  data: function data() {
    return {
      imgs: {
        logo: __webpack_require__(1238)
      },
      menuStatus: [],
      nowActive: 0,
      recordActive: 0
    };
  },
  computed: {
    system: function system() {
      return this.$store.getters.system;
    },
    systems: function systems() {
      return this.$store.state.common.systems;
    },
    menus: function menus() {
      var _this = this;

      this.setItemsHeight();
      requestAnimationFrame(function () {
        $(".list-nav").hover(function (e) {
          if (_this.isCompact) _this.nowActive = e.target.dataset.index;
        }, function () {
          if (_this.isCompact) _this.nowActive = _this.recordActive; // -1
        });
      });
      var menus = this.$store.state.common.menus;
      menus.forEach(function (menu, index) {
        _menuIconConfig2.default.forEach(function (item) {
          if (menu.menuId == item.menuId) {
            menu.icon = item.icon;
          }
        });
      });

      menus.forEach(function (menu, index) {
        menu.childrenMenu.forEach(function (child) {
          if (child.menuId == _this.nowmenu.menuId) {
            _this.recordActive = _this.nowActive = index;
          }
        });
      });
      return menus;
    },
    nowmenu: function nowmenu() {
      return this.$store.state.common.nowmenu;
    },
    isCompact: function isCompact() {
      return this.$store.state.layout.isCompact;
    }
  },
  watch: {
    isCompact: function isCompact() {
      this.toggleMenu();
    }
  },
  mounted: function mounted() {
    this.init = true;
    this.listItem = $(".sidebar.list-item");
    this.$listitems = $(".list-items");
    this.setItemsHeight();
    this.toggleMenu();
  },
  methods: {
    hover: function hover(_ref) {
      var firstMenu = _ref.firstMenu,
          type = _ref.type,
          index = _ref.index;

      if (this.isCompact) {
        if (type) {
          this.nowActive = -1;
        } else {
          this.nowActive = index;
        }
      }
    },
    goMenu: function goMenu(menu, index) {
      this.recordActive = this.nowActive = index;
      this.$store.commit("selectMenu", menu);
      this.$router.push(menu.menuUrl);
    },
    enter: function enter(ele, done) {
      var height = ele.dataset.height;
      TweenMax.to(ele, 0.5, {
        height: height,
        opacity: 1,
        onComplete: function onComplete() {
          done();
        }
      });
    },
    leave: function leave(ele, done) {
      var height = ele.dataset.height;
      TweenMax.to(ele, 0.5, {
        height: 0,
        opacity: 0,
        onComplete: function onComplete() {
          done();
        }
      });
    },
    toggleOpen: function toggleOpen(index) {
      if (!this.isCompact) {
        this.recordActive = this.nowActive = this.nowActive == index ? -1 : index;
      }
    },
    setItemsHeight: function setItemsHeight() {
      var _this2 = this;

      requestAnimationFrame(function () {
        $.each(_this2.listItem, function (k, e) {
          e.dataset.height = e.children.length * 34;
        });
      });
    },
    hoverToggle: function hoverToggle(index, isCompact) {
      if (this.isCompact) {
        this.nowActive = index;
      }
    },
    selectSystem: function selectSystem(item) {
      this.$store.commit("changeSystem", item);
      _commonMethod2.default.changeGame();
    },
    toggleMenu: function toggleMenu() {
      if (this.isCompact) {
        this.listItem.hide();
        this.recordActive = this.nowActive;
        this.nowActive = -1;
      } else {
        // this.$dropdownMenu.removeClass('core-hide')
        this.nowActive = this.recordActive;
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32), __webpack_require__(600)))

/***/ }),

/***/ 1237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 一级菜单图标配置文件
 */
exports.default = [{
  menuId: 1,
  icon: 'icon-menu-operate-monitor'
}, {
  menuId: 2,
  icon: 'icon-menu-user-analysis'
}, {
  menuId: 3,
  icon: 'icon-menu-user-behavior'
}, {
  menuId: 4,
  icon: 'icon-mall' //'icon-menu-data-view'
}, {
  menuId: 7,
  icon: 'icon-earth' //'icon-menu-data-view'
}, {
  menuId: 8,
  icon: 'icon-menu-system'
}, { // 投放报表
  menuId: 9,
  icon: 'icon-menu-system'
}, { //常用配置
  menuId: 10,
  icon: 'icon-menu-system'
}, { //常用配置
  menuId: 11,
  icon: 'icon-menu-system'
}, { //常用配置
  menuId: 12,
  icon: 'icon-menu-system'
}];

/***/ }),

/***/ 1238:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/7road.576b48a.png";

/***/ }),

/***/ 1239:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sidebar",
    class: {
      sm: _vm.isCompact
    }
  }, [_c('header', [_c('i', {
    staticClass: "icon-system"
  }), _vm._v(" "), _c('elSelect', {
    staticClass: "system",
    attrs: {
      "popper-class": "sidebar"
    },
    on: {
      "change": _vm.selectSystem
    },
    model: {
      value: (_vm.$store.state.common.systems.systemId),
      callback: function($$v) {
        _vm.$set(_vm.$store.state.common.systems, "systemId", $$v)
      },
      expression: "$store.state.common.systems.systemId"
    }
  }, _vm._l((_vm.systems), function(item) {
    return (item.id) ? _c('elOption', {
      key: item.id,
      attrs: {
        "label": item.name,
        "value": item.id
      }
    }) : _vm._e()
  }))], 1), _vm._v(" "), _c('main', _vm._l((_vm.menus), function(firstMenu, index) {
    return _c('div', {
      key: index,
      staticClass: "firMenu",
      attrs: {
        "data-index": index
      }
    }, [_c('div', {
      staticClass: "name",
      class: {
        active: _vm.nowActive === index, open: _vm.recordActive === index, shut: _vm.nowActive != index
      },
      attrs: {
        "data-index": index
      },
      on: {
        "click": function($event) {
          _vm.toggleOpen(index)
        },
        "mouseenter": function($event) {
          _vm.hover({
            firstMenu: firstMenu,
            index: index,
            type: 0
          })
        },
        "mouseout": function($event) {
          _vm.hover({
            firstMenu: firstMenu,
            index: index,
            type: 1
          })
        }
      }
    }, [_c('i', {
      staticClass: "icon",
      class: firstMenu.icon,
      on: {
        "mouseenter": function($event) {
          _vm.hover({
            firstMenu: firstMenu,
            index: index,
            type: 0
          })
        },
        "mouseout": function($event) {
          _vm.hover({
            firstMenu: firstMenu,
            index: index,
            type: 0
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "firMenuName"
    }, [_vm._v(_vm._s(firstMenu.menuName))])]), _vm._v(" "), _c('transition', {
      on: {
        "enter": _vm.enter,
        "leave": _vm.leave
      }
    }, [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.nowActive === index),
        expression: "nowActive===index"
      }],
      staticClass: "toggle",
      class: {
        active: _vm.nowActive === index
      },
      attrs: {
        "data-index": index,
        "data-height": ""
      }
    }, _vm._l((firstMenu.childrenMenu), function(secondMenu, i) {
      return _c('div', {
        key: i,
        staticClass: "secMenu",
        class: {
          active: secondMenu.menuId === _vm.nowmenu.menuId
        },
        attrs: {
          "data-index": i
        },
        on: {
          "mouseenter": function($event) {
            _vm.hover({
              firstMenu: firstMenu,
              index: index,
              type: 0
            })
          },
          "mouseout": function($event) {
            _vm.hover({
              firstMenu: firstMenu,
              index: index,
              type: 1
            })
          },
          "click": function($event) {
            _vm.goMenu(secondMenu, index)
          }
        }
      }, [_vm._v("\n            " + _vm._s(secondMenu.menuName) + "\n          ")])
    }))])], 1)
  }))])
},staticRenderFns: []}

/***/ }),

/***/ 1240:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "viewApp"
  }, [_c('viewHeader'), _vm._v(" "), _c('div', {
    staticClass: "viewMain"
  }, [_c('div', {
    staticClass: "module",
    class: {
      sm: _vm.isCompact, 'hide-aside': _vm.$store.state.common.hideAside
    }
  }, [(_vm.$store.state.common.systems.systemId !== _vm.Config.OverseasReleaseSysId) ? _c('viewAside') : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "wrapper"
  }, [_c('div', {
    ref: "scroll",
    staticClass: "scroll"
  }, [_c('div', {
    staticClass: "module-head"
  }, [_vm._v("\n            " + _vm._s(_vm.nowmenu ? _vm.nowmenu.menuName : 'null') + "\n            "), _c('i', {
    staticClass: "icon-quest",
    staticStyle: {
      "color": "#b9bec2",
      "cursor": "pointer"
    },
    on: {
      "click": _vm.showTip
    }
  }), _vm._v(" "), (_vm.userInfo && _vm.userInfo.userName == 'jishan.fan') ? _c('a', {
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": _vm.refresh
    }
  }, [_vm._v("刷新")]) : _vm._e()]), _vm._v(" "), _c('router-view', {
    ref: "components",
    staticClass: "components"
  })], 1)])], 1), _vm._v(" "), _c('viewSidebar'), _vm._v(" "), _c('Modal', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShowTip),
      expression: "isShowTip"
    }],
    staticClass: "index-tip",
    attrs: {
      "headerName": "指标说明",
      "width": "800"
    },
    on: {
      "close": function($event) {
        _vm.isShowTip = false
      }
    }
  }, [_c('div', {
    staticClass: "index-table",
    attrs: {
      "slot": "modal-body"
    },
    slot: "modal-body"
  }, [_c('table', {
    staticClass: "table table-hover"
  }, [_c('tbody', _vm._l((_vm.indicatorData), function(item, index) {
    return _c('tr', {
      key: index
    }, [_c('td', [_vm._v(_vm._s(item['indicatorName']))]), _vm._v(" "), _c('td', {
      staticStyle: {
        "width": "70%"
      }
    }, [_vm._v(_vm._s(item['getIndicatorDescription']))])])
  })), _vm._v(" "), _c('tfoot', [(_vm.indicatorData.length == 0) ? _c('tr', [_c('td', {
    attrs: {
      "colspan": "2"
    }
  }, [_vm._v("无数据")])]) : _vm._e()])])])])], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1132)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1134),
  /* template */
  __webpack_require__(1240),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1176)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1178),
  /* template */
  __webpack_require__(1179),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1180)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1182),
  /* template */
  __webpack_require__(1183),
  /* scopeId */
  "data-v-b0b17a02",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1184)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1186),
  /* template */
  __webpack_require__(1187),
  /* scopeId */
  "data-v-2c90af39",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1188)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1190),
  /* template */
  __webpack_require__(1191),
  /* scopeId */
  "data-v-7674f832",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 600:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * VERSION: 1.20.5
 * DATE: 2018-05-21
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

	"use strict";

	_gsScope._gsDefine("TweenMax", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {

		var _slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val(i, targets[i]) : val[i % val.length];
				}
				delete vars.cycle;
			},
			TweenMax = function(target, duration, vars) {
				TweenLite.call(this, target, duration, vars);
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true || !!this.vars.yoyoEase);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				if (this._repeat) {
					this._uncache(true); //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.
				}
				this.render = TweenMax.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = TweenLite._internals,
			_isSelector = TweenLiteInternals.isSelector,
			_isArray = TweenLiteInternals.isArray,
			p = TweenMax.prototype = TweenLite.to({}, 0.1, {}),
			_blankArray = [];

		TweenMax.version = "1.20.5";
		p.constructor = TweenMax;
		p.kill()._gc = false;
		TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = TweenLite.killTweensOf;
		TweenMax.getTweensOf = TweenLite.getTweensOf;
		TweenMax.lagSmoothing = TweenLite.lagSmoothing;
		TweenMax.ticker = TweenLite.ticker;
		TweenMax.render = TweenLite.render;

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true || !!this.vars.yoyoEase);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._yoyoEase = null;
			this._uncache(true);
			return TweenLite.prototype.invalidate.call(this);
		};
		
		p.updateTo = function(vars, resetDuration) {
			var curRatio = this.ratio,
				immediate = this.vars.immediateRender || vars.immediateRender,
				p;
			if (resetDuration && this._startTime < this._timeline._time) {
				this._startTime = this._timeline._time;
				this._uncache(false);
				if (this._gc) {
					this._enabled(true, false);
				} else {
					this._timeline.insert(this, this._startTime - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			for (p in vars) {
				this.vars[p] = vars[p];
			}
			if (this._initted || immediate) {
				if (resetDuration) {
					this._initted = false;
					if (immediate) {
						this.render(0, true, true);
					}
				} else {
					if (this._gc) {
						this._enabled(true, false);
					}
					if (this._notifyPluginsOfEnabled && this._firstPT) {
						TweenLite._onPluginEvent("_onDisable", this); //in case a plugin like MotionBlur must perform some cleanup tasks
					}
					if (this._time / this._duration > 0.998) { //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards. 
						var prevTime = this._totalTime;
						this.render(0, true, false);
						this._initted = false;
						this.render(prevTime, true, false);
					} else {
						this._initted = false;
						this._init();
						if (this._time > 0 || immediate) {
							var inv = 1 / (1 - curRatio),
								pt = this._firstPT, endValue;
							while (pt) {
								endValue = pt.s + pt.c;
								pt.c *= inv;
								pt.s = endValue - pt.c;
								pt = pt._next;
							}
						}
					}
				}
			}
			return this;
		};
				
		p.render = function(time, suppressEvents, force) {
			if (!this._initted) if (this._duration === 0 && this.vars.repeat) { //zero duration tweens that render immediately have render() called from TweenLite's constructor, before TweenMax's constructor has finished setting _repeat, _repeatDelay, and _yoyo which are critical in determining totalDuration() so we need to call invalidate() which is a low-kb way to get those set properly.
				this.invalidate();
			}
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevTotalTime = this._totalTime, 
				prevCycle = this._cycle,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, cycleDuration, r, type, pow, rawPrevTime, yoyoEase;
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = totalDur;
				this._cycle = this._repeat;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = 0;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				} else {
					this._time = duration;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				}
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}
				
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = this._cycle = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTotalTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;
				if (this._repeat !== 0) {
					cycleDuration = duration + this._repeatDelay;
					this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)
					if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
						this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
					}
					this._time = this._totalTime - (this._cycle * cycleDuration);
					if (this._yoyo) if ((this._cycle & 1) !== 0) {
						this._time = duration - this._time;
						yoyoEase = this._yoyoEase || this.vars.yoyoEase; //note: we don't set this._yoyoEase in _init() like we do other properties because it's TweenMax-specific and doing it here allows us to optimize performance (most tweens don't have a yoyoEase). Note that we also must skip the this.ratio calculation further down right after we _init() in this function, because we're doing it here.
						if (yoyoEase) {
							if (!this._yoyoEase) {
								if (yoyoEase === true && !this._initted) { //if it's not initted and yoyoEase is true, this._ease won't have been populated yet so we must discern it here.
									yoyoEase = this.vars.ease;
									this._yoyoEase = yoyoEase = !yoyoEase ? TweenLite.defaultEase : (yoyoEase instanceof Ease) ? yoyoEase : (typeof(yoyoEase) === "function") ? new Ease(yoyoEase, this.vars.easeParams) : Ease.map[yoyoEase] || TweenLite.defaultEase;
								} else {
									this._yoyoEase = yoyoEase = (yoyoEase === true) ? this._ease : (yoyoEase instanceof Ease) ? yoyoEase : Ease.map[yoyoEase];
								}
							}
							this.ratio = yoyoEase ? 1 - yoyoEase.getRatio((duration - this._time) / duration) : 0;
						}
					}
					if (this._time > duration) {
						this._time = duration;
					} else if (this._time < 0) {
						this._time = 0;
					}
				}
				if (this._easeType && !yoyoEase) {
					r = this._time / duration;
					type = this._easeType;
					pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (this._time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else if (!yoyoEase) {
					this.ratio = this._ease.getRatio(this._time / duration);
				}
				
			}
				
			if (prevTime === this._time && !force && prevCycle === this._cycle) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) { //we stick it in the queue for rendering at the very end of the tick - this is a performance optimization because browsers invalidate styles and force a recalculation if you read, write, and then read style data (so it's better to read/read/read/write/write/write than read/write/read/write/read/write). The down side, of course, is that usually you WANT things to render immediately because you may have code running right after that which depends on the change. Like imagine running TweenLite.set(...) and then immediately after that, creating a nother tween that animates the same property to another value; the starting values of that 2nd tween wouldn't be accurate if lazy is true.
					this._time = prevTime;
					this._totalTime = prevTotalTime;
					this._rawPrevTime = prevRawPrevTime;
					this._cycle = prevCycle;
					TweenLiteInternals.lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete && !yoyoEase) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd && !yoyoEase) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) {
				this._lazy = false;
			}

			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTotalTime === 0) {
				if (this._initted === 2 && time > 0) {
					//this.invalidate();
					this._init(); //will just apply overwriting since _initted of (2) means it was a from() tween that had immediateRender:true
				}
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, true, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._totalTime !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}
			
			if (this._onUpdate) {
				if (time < 0) if (this._startAt && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._totalTime !== prevTotalTime || callback) {
					this._callback("onUpdate");
				}
			}
			if (this._cycle !== prevCycle) if (!suppressEvents) if (!this._gc) if (this.vars.onRepeat) {
				this._callback("onRepeat");
			}
			if (callback) if (!this._gc || force) { //check gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};
		
//---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------
		
		TweenMax.to = function(target, duration, vars) {
			return new TweenMax(target, duration, vars);
		};
		
		TweenMax.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenMax(target, duration, vars);
		};
		
		TweenMax.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenMax(target, duration, toVars);
		};
		
		TweenMax.staggerTo = TweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			stagger = stagger || 0;
			var delay = 0,
				a = [],
				finalComplete = function() {
					if (vars.onComplete) {
						vars.onComplete.apply(vars.onCompleteScope || this, arguments);
					}
					onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
				},
				cycle = vars.cycle,
				fromCycle = (vars.startAt && vars.startAt.cycle),
				l, copy, i, p;
			if (!_isArray(targets)) {
				if (typeof(targets) === "string") {
					targets = TweenLite.selector(targets) || targets;
				}
				if (_isSelector(targets)) {
					targets = _slice(targets);
				}
			}
			targets = targets || [];
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			l = targets.length - 1;
			for (i = 0; i <= l; i++) {
				copy = {};
				for (p in vars) {
					copy[p] = vars[p];
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				if (fromCycle) {
					fromCycle = copy.startAt = {};
					for (p in vars.startAt) {
						fromCycle[p] = vars.startAt[p];
					}
					_applyCycle(copy.startAt, targets, i);
				}
				copy.delay = delay + (copy.delay || 0);
				if (i === l && onCompleteAll) {
					copy.onComplete = finalComplete;
				}
				a[i] = new TweenMax(targets[i], duration, copy);
				delay += stagger;
			}
			return a;
		};
		
		TweenMax.staggerFrom = TweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
		
		TweenMax.staggerFromTo = TweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
				
		TweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenMax(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, useFrames:useFrames, overwrite:0});
		};
		
		TweenMax.set = function(target, vars) {
			return new TweenMax(target, 0, vars);
		};
		
		TweenMax.isTweening = function(target) {
			return (TweenLite.getTweensOf(target, true).length > 0);
		};
		
		var _getChildrenOf = function(timeline, includeTimelines) {
				var a = [],
					cnt = 0,
					tween = timeline._first;
				while (tween) {
					if (tween instanceof TweenLite) {
						a[cnt++] = tween;
					} else {
						if (includeTimelines) {
							a[cnt++] = tween;
						}
						a = a.concat(_getChildrenOf(tween, includeTimelines));
						cnt = a.length;
					}
					tween = tween._next;
				}
				return a;
			}, 
			getAllTweens = TweenMax.getAllTweens = function(includeTimelines) {
				return _getChildrenOf(Animation._rootTimeline, includeTimelines).concat( _getChildrenOf(Animation._rootFramesTimeline, includeTimelines) );
			};
		
		TweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {
			if (tweens == null) {
				tweens = true;
			}
			if (delayedCalls == null) {
				delayedCalls = true;
			}
			var a = getAllTweens((timelines != false)),
				l = a.length,
				allTrue = (tweens && delayedCalls && timelines),
				isDC, tween, i;
			for (i = 0; i < l; i++) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					if (complete) {
						tween.totalTime(tween._reversed ? 0 : tween.totalDuration());
					} else {
						tween._enabled(false, false);
					}
				}
			}
		};
		
		TweenMax.killChildTweensOf = function(parent, complete) {
			if (parent == null) {
				return;
			}
			var tl = TweenLiteInternals.tweenLookup,
				a, curParent, p, i, l;
			if (typeof(parent) === "string") {
				parent = TweenLite.selector(parent) || parent;
			}
			if (_isSelector(parent)) {
				parent = _slice(parent);
			}
			if (_isArray(parent)) {
				i = parent.length;
				while (--i > -1) {
					TweenMax.killChildTweensOf(parent[i], complete);
				}
				return;
			}
			a = [];
			for (p in tl) {
				curParent = tl[p].target.parentNode;
				while (curParent) {
					if (curParent === parent) {
						a = a.concat(tl[p].tweens);
					}
					curParent = curParent.parentNode;
				}
			}
			l = a.length;
			for (i = 0; i < l; i++) {
				if (complete) {
					a[i].totalTime(a[i].totalDuration());
				}
				a[i]._enabled(false, false);
			}
		};

		var _changePause = function(pause, tweens, delayedCalls, timelines) {
			tweens = (tweens !== false);
			delayedCalls = (delayedCalls !== false);
			timelines = (timelines !== false);
			var a = getAllTweens(timelines),
				allTrue = (tweens && delayedCalls && timelines),
				i = a.length,
				isDC, tween;
			while (--i > -1) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					tween.paused(pause);
				}
			}
		};
		
		TweenMax.pauseAll = function(tweens, delayedCalls, timelines) {
			_changePause(true, tweens, delayedCalls, timelines);
		};
		
		TweenMax.resumeAll = function(tweens, delayedCalls, timelines) {
			_changePause(false, tweens, delayedCalls, timelines);
		};

		TweenMax.globalTimeScale = function(value) {
			var tl = Animation._rootTimeline,
				t = TweenLite.ticker.time;
			if (!arguments.length) {
				return tl._timeScale;
			}
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
			tl = Animation._rootFramesTimeline;
			t = TweenLite.ticker.frame;
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
			tl._timeScale = Animation._rootTimeline._timeScale = value;
			return value;
		};
		
	
//---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------
		
		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};
		
		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, suppressEvents);
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.duration = function(value) {
			if (!arguments.length) {
				return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated TweenMax and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
			}
			return Animation.prototype.duration.call(this, value);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					//instead of Infinity, we use 999999999999 so that we can accommodate reverses
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};
		
		
		return TweenMax;
		
	}, true);








/*
 * ----------------------------------------------------------------
 * TimelineLite
 * ----------------------------------------------------------------
 */
	_gsScope._gsDefine("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {

		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren === true);
				this.smoothChildTiming = (this.vars.smoothChildTiming === true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var v = this.vars,
					val, p;
				for (p in v) {
					val = v[p];
					if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {
						v[p] = this._swapSelfInParams(val);
					}
				}
				if (_isArray(v.tweens)) {
					this.add(v.tweens, 0, v.align, v.stagger);
				}
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = TweenLite._internals,
			_internals = TimelineLite._internals = {},
			_isSelector = TweenLiteInternals.isSelector,
			_isArray = TweenLiteInternals.isArray,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _gsScope._gsDefine.globals,
			_copy = function(vars) {
				var copy = {}, p;
				for (p in vars) {
					copy[p] = vars[p];
				}
				return copy;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val(i, targets[i]) : val[i % val.length];
				}
				delete vars.cycle;
			},
			_pauseCallback = _internals.pauseCallback = function() {},
			_slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			p = TimelineLite.prototype = new SimpleTimeline();

		TimelineLite.version = "1.20.4";
		p.constructor = TimelineLite;
		p.kill()._gc = p._forcingPlayhead = p._hasPause = false;

		/* might use later...
		//translates a local time inside an animation to the corresponding time on the root/global timeline, factoring in all nesting and timeScales.
		function localToGlobal(time, animation) {
			while (animation) {
				time = (time / animation._timeScale) + animation._startTime;
				animation = animation.timeline;
			}
			return time;
		}

		//translates the supplied time on the root/global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
		function globalToLocal(time, animation) {
			var scale = 1;
			time -= localToGlobal(0, animation);
			while (animation) {
				scale *= animation._timeScale;
				animation = animation.timeline;
			}
			return time * scale;
		}
		*/

		p.to = function(target, duration, vars, position) {
			var Engine = (vars.repeat && _globals.TweenMax) || TweenLite;
			return duration ? this.add( new Engine(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function(target, duration, vars, position) {
			return this.add( ((vars.repeat && _globals.TweenMax) || TweenLite).from(target, duration, vars), position);
		};

		p.fromTo = function(target, duration, fromVars, toVars, position) {
			var Engine = (toVars.repeat && _globals.TweenMax) || TweenLite;
			return duration ? this.add( Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, callbackScope:onCompleteAllScope, smoothChildTiming:this.smoothChildTiming}),
				cycle = vars.cycle,
				copy, i;
			if (typeof(targets) === "string") {
				targets = TweenLite.selector(targets) || targets;
			}
			targets = targets || [];
			if (_isSelector(targets)) { //senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice(targets);
			}
			stagger = stagger || 0;
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			for (i = 0; i < targets.length; i++) {
				copy = _copy(vars);
				if (copy.startAt) {
					copy.startAt = _copy(copy.startAt);
					if (copy.startAt.cycle) {
						_applyCycle(copy.startAt, targets, i);
					}
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				tl.to(targets[i], duration, copy, i * stagger);
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = (vars.immediateRender != false);
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function(callback, params, scope, position) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.set = function(target, vars, position) {
			position = this._parseTimeOrLabel(position, 0, true);
			if (vars.immediateRender == null) {
				vars.immediateRender = (position === this._time && !this._paused);
			}
			return this.add( new TweenLite(target, 0, vars), position);
		};

		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline,
				hasNegativeStart, time,	tween, next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {
					time = tween._startTime - tween._delay;
					if (time < 0) {
						hasNegativeStart = 1;
					}
					tl.add(tween, time);
				}
				tween = next;
			}
			root.add(tl, 0);
			if (hasNegativeStart) { //calling totalDuration() will force the adjustment necessary to shift the children forward so none of them start before zero, and moves the timeline backwards the same amount, so the playhead is still aligned where it should be globally, but the timeline doesn't have illegal children that start before zero.
				tl.totalDuration();
			}
			return tl;
		};

		p.add = function(value, position, align, stagger) {
			var curTime, l, i, child, tl, beforeRawTime;
			if (typeof(position) !== "number") {
				position = this._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof Animation)) {
				if ((value instanceof Array) || (value && value.push && _isArray(value))) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if (_isArray(child = value[i])) {
							child = new TimelineLite({tweens:child});
						}
						this.add(child, curTime);
						if (typeof(child) !== "string" && typeof(child) !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + (child.totalDuration() / child._timeScale);
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return this._uncache(true);
				} else if (typeof(value) === "string") {
					return this.addLabel(value, position);
				} else if (typeof(value) === "function") {
					value = TweenLite.delayedCall(0, value);
				} else {
					throw("Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.");
				}
			}

			SimpleTimeline.prototype.add.call(this, value, position);

			if (value._time) { //in case, for example, the _startTime is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
				value.render((this.rawTime() - value._startTime) * value._timeScale, false, false);
			}

			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.
			if (this._gc || this._time === this._duration) if (!this._paused) if (this._duration < this.duration()) {
				//in case any of the ancestors had completed but should now be enabled...
				tl = this;
				beforeRawTime = (tl.rawTime() > value._startTime); //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.
				while (tl._timeline) {
					if (beforeRawTime && tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
					} else if (tl._gc) {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return this;
		};

		p.remove = function(value) {
			if (value instanceof Animation) {
				this._remove(value, false);
				var tl = value._timeline = value.vars.useFrames ? Animation._rootFramesTimeline : Animation._rootTimeline; //now that it's removed, default it to the root timeline so that if it gets played again, it doesn't jump back into this timeline.
				value._startTime = (value._paused ? value._pauseTime : tl._time) - ((!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale); //ensure that if it gets played again, the timing is correct.
				return this;
			} else if (value instanceof Array || (value && value.push && _isArray(value))) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p._remove = function(tween, skipDisable) {
			SimpleTimeline.prototype._remove.call(this, tween, skipDisable);
			var last = this._last;
			if (!last) {
				this._time = this._totalTime = this._duration = this._totalDuration = 0;
			} else if (this._time > this.duration()) {
				this._time = this._duration;
				this._totalTime = this._totalDuration;
			}
			return this;
		};

		p.append = function(value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function(value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function(label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.addPause = function(position, callback, params, scope) {
			var t = TweenLite.delayedCall(0, _pauseCallback, params, scope || this);
			t.vars.onComplete = t.vars.onReverseComplete = callback;
			t.data = "isPause";
			this._hasPause = true;
			return this.add(t, position);
		};

		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var clippedDuration, i;
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof Animation && ignore.timeline === this) {
				this.remove(ignore);
			} else if (ignore && ((ignore instanceof Array) || (ignore.push && _isArray(ignore)))) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			clippedDuration = (typeof(timeOrLabel) === "number" && !offsetOrLabel) ? 0 : (this.duration() > 99999999999) ? this.recent().endTime(false) : this._duration; //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
			if (typeof(offsetOrLabel) === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - clippedDuration : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? (this._labels[timeOrLabel] = clippedDuration + offsetOrLabel) : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : clippedDuration;
			} else if (timeOrLabel == null) {
				timeOrLabel = clippedDuration;
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function(position, suppressEvents) {
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};

		p.stop = function() {
			return this.paused(true);
		};

		p.gotoAndPlay = function(position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function(position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var prevTime = this._time,
				totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevPaused = this._paused,
				tween, isComplete, next, callback, internalForce, pauseTween, curTime;
			if (prevTime !== this._time) { //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
				time += this._time - prevTime;
			}
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || this._rawPrevTime < 0 || this._rawPrevTime === _tinyNum) if (this._rawPrevTime !== time && this._first) {
						internalForce = true;
						if (this._rawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime !== _tinyNum && (this._rawPrevTime > 0 || (time < 0 && this._rawPrevTime >= 0)))) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) { //ensures proper GC if a timeline is resumed after it's finished reversing.
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (this._rawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}

			} else {

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					if (time >= prevTime) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

				this._totalTime = this._time = this._rawPrevTime = time;
			}
			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._time !== prevTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0 || !this._duration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= curTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}

			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
				tween = this._first,
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof TweenLite) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function(target, nested) {
			var disabled = this._gc,
				a = [],
				cnt = 0,
				tweens, i;
			if (disabled) {
				this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.
			}
			tweens = TweenLite.getTweensOf(target);
			i = tweens.length;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			if (disabled) {
				this._enabled(false, true);
			}
			return a;
		};

		p.recent = function() {
			return this._recent;
		};

		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		};

		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
				labels = this._labels,
				p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function(vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length,
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return Animation.prototype.invalidate.call(this);;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			this._forcingPlayhead = true;
			var val = Animation.prototype.totalTime.apply(this, arguments);
			this._forcingPlayhead = false;
			return val;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
						tween = this._last,
						prevStart = 999999999999,
						prev, end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused && !this._calculatingDuration) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this._calculatingDuration = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add(), like _parseTimeOrLabel().
							this.add(tween, tween._startTime - tween._delay);
							this._calculatingDuration = 0;
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (this._timeline.smoothChildTiming) {
								this._startTime += tween._startTime / this._timeScale;
								this._time -= tween._startTime;
								this._totalTime -= tween._startTime;
								this._rawPrevTime -= tween._startTime;
							}
							this.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + (tween._totalDuration / tween._timeScale);
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (value && this.totalDuration()) ? this.timeScale(this._totalDuration / value) : this;
		};

		p.paused = function(value) {
			if (!value) { //if there's a pause directly at the spot from where we're unpausing, skip it.
				var tween = this._first,
					time = this._time;
				while (tween) {
					if (tween._startTime === time && tween.data === "isPause") {
						tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
					}
					tween = tween._next;
				}
			}
			return Animation.prototype.paused.apply(this, arguments);
		};

		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		};

		p.rawTime = function(wrapRepeats) {
			return (wrapRepeats && (this._paused || (this._repeat && this.time() > 0 && this.totalProgress() < 1))) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
		};

		return TimelineLite;

	}, true);








	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * TimelineMax
 * ----------------------------------------------------------------
 */
	_gsScope._gsDefine("TimelineMax", ["TimelineLite","TweenLite","easing.Ease"], function(TimelineLite, TweenLite, Ease) {

		var TimelineMax = function(vars) {
				TimelineLite.call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._dirty = true;
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = TweenLite._internals,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _gsScope._gsDefine.globals,
			_easeNone = new Ease(null, null, 1, 0),
			p = TimelineMax.prototype = new TimelineLite();

		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = "1.20.4";

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TimelineLite.prototype.invalidate.call(this);
		};

		p.addCallback = function(callback, position, params, scope) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.removeCallback = function(callback, position) {
			if (callback) {
				if (position == null) {
					this._kill(null, callback);
				} else {
					var a = this.getTweensOf(callback, false),
						i = a.length,
						time = this._parseTimeOrLabel(position);
					while (--i > -1) {
						if (a[i]._startTime === time) {
							a[i]._enabled(false, false);
						}
					}
				}
			}
			return this;
		};

		p.removePause = function(position) {
			return this.removeCallback(TimelineLite._internals.pauseCallback, position);
		};

		p.tweenTo = function(position, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, useFrames:this.usesFrames(), immediateRender:false, lazy:false},
				Engine = (vars.repeat && _globals.TweenMax) || TweenLite,
				duration, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(position);
			duration = (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001;
			t = new Engine(this, duration, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time !== t.target.time() && duration === t.duration() && !t.isFromTo) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale ).render(t.time(), true, true); //render() right away to ensure that things look right, especially in the case of .tweenTo(0).
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					vars.onStart.apply(vars.onStartScope || vars.callbackScope || t, vars.onStartParams || []); //don't use t._callback("onStart") or it'll point to the copy.onStart and we'll get a recursion error.
				}
			};
			return t;
		};

		p.tweenFromTo = function(fromPosition, toPosition, vars) {
			vars = vars || {};
			fromPosition = this._parseTimeOrLabel(fromPosition);
			vars.startAt = {onComplete:this.seek, onCompleteParams:[fromPosition], callbackScope:this};
			vars.immediateRender = (vars.immediateRender !== false);
			var t = this.tweenTo(toPosition, vars);
			t.isFromTo = 1; //to ensure we don't mess with the duration in the onStart (we've got the start and end values here, so lock it in)
			return t.duration((Math.abs( t.vars.time - fromPosition) / this._timeScale) || 0.001);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var prevTime = this._time,
				totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				dur = this._duration,
				prevTotalTime = this._totalTime,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused,
				prevCycle = this._cycle,
				tween, isComplete, next, callback, internalForce, cycleDuration, pauseTween, curTime;
			if (prevTime !== this._time) { //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
				time += this._time - prevTime;
			}
			if (time >= totalDur - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time && this._first) {
						internalForce = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = time = 0;
				} else {
					this._time = dur;
					time = dur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7. We cannot do less then 0.0001 because the same issue can occur when the duration is extremely large like 999999999999 in which case adding 0.00000001, for example, causes it to act like nothing was added.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || (time < 0 && prevRawPrevTime >= 0)) && !this._locked)) { //edge case for checking time < 0 && prevRawPrevTime >= 0: a zero-duration fromTo() tween inside a zero-duration timeline (yeah, very rare)
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) {
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (prevRawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (dur || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}

			} else {
				if (dur === 0 && prevRawPrevTime < 0) { //without this, zero-duration repeating timelines (like with a simple callback nested at the very beginning and a repeatDelay) wouldn't render the first time through.
					internalForce = true;
				}
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						cycleDuration = dur + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) !== 0) {
							this._time = dur - this._time;
						}
						if (this._time > dur) {
							this._time = dur;
							time = dur + 0.0001; //to avoid occasional floating point rounding error
						} else if (this._time < 0) {
							this._time = time = 0;
						} else {
							time = this._time;
						}
					}
				}

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					time = this._time;
					if (time >= prevTime || (this._repeat && prevCycle !== this._cycle)) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween && pauseTween._startTime < dur) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

			}

			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the timeline are rendered properly. If, for example,
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work.
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;

				this._totalTime = prevCycle * dur;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += dur;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.

				this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.0001 : prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : dur;
				this.render(prevTime, suppressEvents, (dur === 0));
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this._cycle = recCycle; //in case the onRepeat alters the playhead or invalidates(), we shouldn't stay locked or use the previous cycle.
						this._locked = false;
						this._callback("onRepeat");
					}
				}
				if (prevTime !== this._time) { //in case there's a callback like onComplete in a nested tween/timeline that changes the playhead position, like via seek(), we should just abort.
					return;
				}
				if (wrap) {
					this._cycle = prevCycle; //if there's an onRepeat, we reverted this above, so make sure it's set properly again. We also unlocked in that scenario, so reset that too.
					this._locked = true;
					prevTime = (backwards) ? dur + 0.0001 : -0.0001;
					this.render(prevTime, true, false);
				}
				this._locked = false;
				if (this._paused && !prevPaused) { //if the render() triggered callback that paused this timeline, we should abort (very rare, but possible)
					return;
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
			}

			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._totalTime !== prevTotalTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0 || !this._totalDuration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [],
				all = this.getChildren(nested, tweens, timelines),
				cnt = 0,
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				if (tween.isActive()) {
					a[cnt++] = tween;
				}
			}
			return a;
		};


		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		};

		p.invalidate = function() {
			this._locked = false; //unlock and set cycle in case invalidate() is called from inside an onRepeat
			return TimelineLite.prototype.invalidate.call(this);
		};


//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------

		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? (this._time / this.duration()) || 0 : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};

		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? (this._totalTime / this.totalDuration()) || 0 : this.totalTime( this.totalDuration() * value, suppressEvents);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					TimelineLite.prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat === -1 || !value) ? this : this.timeScale( this.totalDuration() / value );
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};

		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};

		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};

		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		};

		return TimelineMax;

	}, true);
	




	
	
	
	
	

	
/*
 * ----------------------------------------------------------------
 * BezierPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var _RAD2DEG = 180 / Math.PI,
			_r1 = [],
			_r2 = [],
			_r3 = [],
			_corProps = {},
			_globals = _gsScope._gsDefine.globals,
			Segment = function(a, b, c, d) {
				if (c === d) { //if c and d match, the final autoRotate value could lock at -90 degrees, so differentiate them slightly.
					c = d - (d - b) / 1000000;
				}
				if (a === b) { //if a and b match, the starting autoRotate value could lock at -90 degrees, so differentiate them slightly.
					b = a + (c - a) / 1000000;
				}
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.da = d - a;
				this.ca = c - a;
				this.ba = b - a;
			},
			_correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
			cubicToQuadratic = function(a, b, c, d) {
				var q1 = {a:a},
					q2 = {},
					q3 = {},
					q4 = {c:d},
					mab = (a + b) / 2,
					mbc = (b + c) / 2,
					mcd = (c + d) / 2,
					mabc = (mab + mbc) / 2,
					mbcd = (mbc + mcd) / 2,
					m8 = (mbcd - mabc) / 8;
				q1.b = mab + (a - mab) / 4;
				q2.b = mabc + m8;
				q1.c = q2.a = (q1.b + q2.b) / 2;
				q2.c = q3.a = (mabc + mbcd) / 2;
				q3.b = mbcd - m8;
				q4.b = mcd + (d - mcd) / 4;
				q3.c = q4.a = (q3.b + q4.b) / 2;
				return [q1, q2, q3, q4];
			},
			_calculateControlPoints = function(a, curviness, quad, basic, correlate) {
				var l = a.length - 1,
					ii = 0,
					cp1 = a[0].a,
					i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl;
				for (i = 0; i < l; i++) {
					seg = a[ii];
					p1 = seg.a;
					p2 = seg.d;
					p3 = a[ii+1].d;

					if (correlate) {
						r1 = _r1[i];
						r2 = _r2[i];
						tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);
						m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : (r1 !== 0 ? tl / r1 : 0));
						m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : (r2 !== 0 ? tl / r2 : 0));
						mm = p2 - (m1 + (((m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4) || 0));
					} else {
						m1 = p2 - (p2 - p1) * curviness * 0.5;
						m2 = p2 + (p3 - p2) * curviness * 0.5;
						mm = p2 - (m1 + m2) / 2;
					}
					m1 += mm;
					m2 += mm;

					seg.c = cp2 = m1;
					if (i !== 0) {
						seg.b = cp1;
					} else {
						seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
					}

					seg.da = p2 - p1;
					seg.ca = cp2 - p1;
					seg.ba = cp1 - p1;

					if (quad) {
						qb = cubicToQuadratic(p1, cp1, cp2, p2);
						a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
						ii += 4;
					} else {
						ii++;
					}

					cp1 = m2;
				}
				seg = a[ii];
				seg.b = cp1;
				seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.
				seg.da = seg.d - seg.a;
				seg.ca = seg.c - seg.a;
				seg.ba = cp1 - seg.a;
				if (quad) {
					qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
					a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
				}
			},
			_parseAnchors = function(values, p, correlate, prepend) {
				var a = [],
					l, i, p1, p2, p3, tmp;
				if (prepend) {
					values = [prepend].concat(values);
					i = values.length;
					while (--i > -1) {
						if (typeof( (tmp = values[i][p]) ) === "string") if (tmp.charAt(1) === "=") {
							values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
						}
					}
				}
				l = values.length - 2;
				if (l < 0) {
					a[0] = new Segment(values[0][p], 0, 0, values[0][p]);
					return a;
				}
				for (i = 0; i < l; i++) {
					p1 = values[i][p];
					p2 = values[i+1][p];
					a[i] = new Segment(p1, 0, 0, p2);
					if (correlate) {
						p3 = values[i+2][p];
						_r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
						_r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
					}
				}
				a[i] = new Segment(values[i][p], 0, 0, values[i+1][p]);
				return a;
			},
			bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
				var obj = {},
					props = [],
					first = prepend || values[0],
					i, p, a, j, r, l, seamless, last;
				correlate = (typeof(correlate) === "string") ? ","+correlate+"," : _correlate;
				if (curviness == null) {
					curviness = 1;
				}
				for (p in values[0]) {
					props.push(p);
				}
				//check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)
				if (values.length > 1) {
					last = values[values.length - 1];
					seamless = true;
					i = props.length;
					while (--i > -1) {
						p = props[i];
						if (Math.abs(first[p] - last[p]) > 0.05) { //build in a tolerance of +/-0.05 to accommodate rounding errors.
							seamless = false;
							break;
						}
					}
					if (seamless) {
						values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens
						if (prepend) {
							values.unshift(prepend);
						}
						values.push(values[1]);
						prepend = values[values.length - 3];
					}
				}
				_r1.length = _r2.length = _r3.length = 0;
				i = props.length;
				while (--i > -1) {
					p = props[i];
					_corProps[p] = (correlate.indexOf(","+p+",") !== -1);
					obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
				}
				i = _r1.length;
				while (--i > -1) {
					_r1[i] = Math.sqrt(_r1[i]);
					_r2[i] = Math.sqrt(_r2[i]);
				}
				if (!basic) {
					i = props.length;
					while (--i > -1) {
						if (_corProps[p]) {
							a = obj[props[i]];
							l = a.length - 1;
							for (j = 0; j < l; j++) {
								r = (a[j+1].da / _r2[j] + a[j].da / _r1[j]) || 0;
								_r3[j] = (_r3[j] || 0) + r * r;
							}
						}
					}
					i = _r3.length;
					while (--i > -1) {
						_r3[i] = Math.sqrt(_r3[i]);
					}
				}
				i = props.length;
				j = quadratic ? 4 : 1;
				while (--i > -1) {
					p = props[i];
					a = obj[p];
					_calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties
					if (seamless) {
						a.splice(0, j);
						a.splice(a.length - j, j);
					}
				}
				return obj;
			},
			_parseBezierData = function(values, type, prepend) {
				type = type || "soft";
				var obj = {},
					inc = (type === "cubic") ? 3 : 2,
					soft = (type === "soft"),
					props = [],
					a, b, c, d, cur, i, j, l, p, cnt, tmp;
				if (soft && prepend) {
					values = [prepend].concat(values);
				}
				if (values == null || values.length < inc + 1) { throw "invalid Bezier data"; }
				for (p in values[0]) {
					props.push(p);
				}
				i = props.length;
				while (--i > -1) {
					p = props[i];
					obj[p] = cur = [];
					cnt = 0;
					l = values.length;
					for (j = 0; j < l; j++) {
						a = (prepend == null) ? values[j][p] : (typeof( (tmp = values[j][p]) ) === "string" && tmp.charAt(1) === "=") ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
						if (soft) if (j > 1) if (j < l - 1) {
							cur[cnt++] = (a + cur[cnt-2]) / 2;
						}
						cur[cnt++] = a;
					}
					l = cnt - inc + 1;
					cnt = 0;
					for (j = 0; j < l; j += inc) {
						a = cur[j];
						b = cur[j+1];
						c = cur[j+2];
						d = (inc === 2) ? 0 : cur[j+3];
						cur[cnt++] = tmp = (inc === 3) ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
					}
					cur.length = cnt;
				}
				return obj;
			},
			_addCubicLengths = function(a, steps, resolution) {
				var inc = 1 / resolution,
					j = a.length,
					d, d1, s, da, ca, ba, p, i, inv, bez, index;
				while (--j > -1) {
					bez = a[j];
					s = bez.a;
					da = bez.d - s;
					ca = bez.c - s;
					ba = bez.b - s;
					d = d1 = 0;
					for (i = 1; i <= resolution; i++) {
						p = inc * i;
						inv = 1 - p;
						d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
						index = j * resolution + i - 1;
						steps[index] = (steps[index] || 0) + d * d;
					}
				}
			},
			_parseLengthData = function(obj, resolution) {
				resolution = resolution >> 0 || 6;
				var a = [],
					lengths = [],
					d = 0,
					total = 0,
					threshold = resolution - 1,
					segments = [],
					curLS = [], //current length segments array
					p, i, l, index;
				for (p in obj) {
					_addCubicLengths(obj[p], a, resolution);
				}
				l = a.length;
				for (i = 0; i < l; i++) {
					d += Math.sqrt(a[i]);
					index = i % resolution;
					curLS[index] = d;
					if (index === threshold) {
						total += d;
						index = (i / resolution) >> 0;
						segments[index] = curLS;
						lengths[index] = total;
						d = 0;
						curLS = [];
					}
				}
				return {length:total, lengths:lengths, segments:segments};
			},



			BezierPlugin = _gsScope._gsDefine.plugin({
					propName: "bezier",
					priority: -1,
					version: "1.3.8",
					API: 2,
					global:true,

					//gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
					init: function(target, vars, tween) {
						this._target = target;
						if (vars instanceof Array) {
							vars = {values:vars};
						}
						this._func = {};
						this._mod = {};
						this._props = [];
						this._timeRes = (vars.timeResolution == null) ? 6 : parseInt(vars.timeResolution, 10);
						var values = vars.values || [],
							first = {},
							second = values[0],
							autoRotate = vars.autoRotate || tween.vars.orientToBezier,
							p, isFunc, i, j, prepend;

						this._autoRotate = autoRotate ? (autoRotate instanceof Array) ? autoRotate : [["x","y","rotation",((autoRotate === true) ? 0 : Number(autoRotate) || 0)]] : null;
						for (p in second) {
							this._props.push(p);
						}

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];

							this._overwriteProps.push(p);
							isFunc = this._func[p] = (typeof(target[p]) === "function");
							first[p] = (!isFunc) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
							if (!prepend) if (first[p] !== values[0][p]) {
								prepend = first;
							}
						}
						this._beziers = (vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft") ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, (vars.type === "thruBasic"), vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
						this._segCount = this._beziers[p].length;

						if (this._timeRes) {
							var ld = _parseLengthData(this._beziers, this._timeRes);
							this._length = ld.length;
							this._lengths = ld.lengths;
							this._segments = ld.segments;
							this._l1 = this._li = this._s1 = this._si = 0;
							this._l2 = this._lengths[0];
							this._curSeg = this._segments[0];
							this._s2 = this._curSeg[0];
							this._prec = 1 / this._curSeg.length;
						}

						if ((autoRotate = this._autoRotate)) {
							this._initialRotations = [];
							if (!(autoRotate[0] instanceof Array)) {
								this._autoRotate = autoRotate = [autoRotate];
							}
							i = autoRotate.length;
							while (--i > -1) {
								for (j = 0; j < 3; j++) {
									p = autoRotate[i][j];
									this._func[p] = (typeof(target[p]) === "function") ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ] : false;
								}
								p = autoRotate[i][2];
								this._initialRotations[i] = (this._func[p] ? this._func[p].call(this._target) : this._target[p]) || 0;
								this._overwriteProps.push(p);
							}
						}
						this._startRatio = tween.vars.runBackwards ? 1 : 0; //we determine the starting ratio when the tween inits which is always 0 unless the tween has runBackwards:true (indicating it's a from() tween) in which case it's 1.
						return true;
					},

					//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
					set: function(v) {
						var segments = this._segCount,
							func = this._func,
							target = this._target,
							notStart = (v !== this._startRatio),
							curIndex, inv, i, p, b, t, val, l, lengths, curSeg;
						if (!this._timeRes) {
							curIndex = (v < 0) ? 0 : (v >= 1) ? segments - 1 : (segments * v) >> 0;
							t = (v - (curIndex * (1 / segments))) * segments;
						} else {
							lengths = this._lengths;
							curSeg = this._curSeg;
							v *= this._length;
							i = this._li;
							//find the appropriate segment (if the currently cached one isn't correct)
							if (v > this._l2 && i < segments - 1) {
								l = segments - 1;
								while (i < l && (this._l2 = lengths[++i]) <= v) {	}
								this._l1 = lengths[i-1];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s2 = curSeg[(this._s1 = this._si = 0)];
							} else if (v < this._l1 && i > 0) {
								while (i > 0 && (this._l1 = lengths[--i]) >= v) { }
								if (i === 0 && v < this._l1) {
									this._l1 = 0;
								} else {
									i++;
								}
								this._l2 = lengths[i];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
								this._s2 = curSeg[this._si];
							}
							curIndex = i;
							//now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)
							v -= this._l1;
							i = this._si;
							if (v > this._s2 && i < curSeg.length - 1) {
								l = curSeg.length - 1;
								while (i < l && (this._s2 = curSeg[++i]) <= v) {	}
								this._s1 = curSeg[i-1];
								this._si = i;
							} else if (v < this._s1 && i > 0) {
								while (i > 0 && (this._s1 = curSeg[--i]) >= v) {	}
								if (i === 0 && v < this._s1) {
									this._s1 = 0;
								} else {
									i++;
								}
								this._s2 = curSeg[i];
								this._si = i;
							}
							t = ((i + (v - this._s1) / (this._s2 - this._s1)) * this._prec) || 0;
						}
						inv = 1 - t;

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];
							b = this._beziers[p][curIndex];
							val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
							if (this._mod[p]) {
								val = this._mod[p](val, target);
							}
							if (func[p]) {
								target[p](val);
							} else {
								target[p] = val;
							}
						}

						if (this._autoRotate) {
							var ar = this._autoRotate,
								b2, x1, y1, x2, y2, add, conv;
							i = ar.length;
							while (--i > -1) {
								p = ar[i][2];
								add = ar[i][3] || 0;
								conv = (ar[i][4] === true) ? 1 : _RAD2DEG;
								b = this._beziers[ar[i][0]];
								b2 = this._beziers[ar[i][1]];

								if (b && b2) { //in case one of the properties got overwritten.
									b = b[curIndex];
									b2 = b2[curIndex];

									x1 = b.a + (b.b - b.a) * t;
									x2 = b.b + (b.c - b.b) * t;
									x1 += (x2 - x1) * t;
									x2 += ((b.c + (b.d - b.c) * t) - x2) * t;

									y1 = b2.a + (b2.b - b2.a) * t;
									y2 = b2.b + (b2.c - b2.b) * t;
									y1 += (y2 - y1) * t;
									y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;

									val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];

									if (this._mod[p]) {
										val = this._mod[p](val, target); //for modProps
									}

									if (func[p]) {
										target[p](val);
									} else {
										target[p] = val;
									}
								}
							}
						}
					}
			}),
			p = BezierPlugin.prototype;


		BezierPlugin.bezierThrough = bezierThrough;
		BezierPlugin.cubicToQuadratic = cubicToQuadratic;
		BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite
		BezierPlugin.quadraticToCubic = function(a, b, c) {
			return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
		};

		BezierPlugin._cssRegister = function() {
			var CSSPlugin = _globals.CSSPlugin;
			if (!CSSPlugin) {
				return;
			}
			var _internals = CSSPlugin._internals,
				_parseToProxy = _internals._parseToProxy,
				_setPluginRatio = _internals._setPluginRatio,
				CSSPropTween = _internals.CSSPropTween;
			_internals._registerComplexSpecialProp("bezier", {parser:function(t, e, prop, cssp, pt, plugin) {
				if (e instanceof Array) {
					e = {values:e};
				}
				plugin = new BezierPlugin();
				var values = e.values,
					l = values.length - 1,
					pluginValues = [],
					v = {},
					i, p, data;
				if (l < 0) {
					return pt;
				}
				for (i = 0; i <= l; i++) {
					data = _parseToProxy(t, values[i], cssp, pt, plugin, (l !== i));
					pluginValues[i] = data.end;
				}
				for (p in e) {
					v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
				}
				v.values = pluginValues;
				pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
				pt.data = data;
				pt.plugin = plugin;
				pt.setRatio = _setPluginRatio;
				if (v.autoRotate === 0) {
					v.autoRotate = true;
				}
				if (v.autoRotate && !(v.autoRotate instanceof Array)) {
					i = (v.autoRotate === true) ? 0 : Number(v.autoRotate);
					v.autoRotate = (data.end.left != null) ? [["left","top","rotation",i,false]] : (data.end.x != null) ? [["x","y","rotation",i,false]] : false;
				}
				if (v.autoRotate) {
					if (!cssp._transform) {
						cssp._enableTransforms(false);
					}
					data.autoRotate = cssp._target._gsTransform;
					data.proxy.rotation = data.autoRotate.rotation || 0;
					cssp._overwriteProps.push("rotation");
				}
				plugin._onInitTween(data.proxy, v, cssp._tween);
				return pt;
			}});
		};

		p._mod = function(lookup) {
			var op = this._overwriteProps,
				i = op.length,
				val;
			while (--i > -1) {
				val = lookup[op[i]];
				if (val && typeof(val) === "function") {
					this._mod[op[i]] = val;
				}
			}
		};

		p._kill = function(lookup) {
			var a = this._props,
				p, i;
			for (p in this._beziers) {
				if (p in lookup) {
					delete this._beziers[p];
					delete this._func[p];
					i = a.length;
					while (--i > -1) {
						if (a[i] === p) {
							a.splice(i, 1);
						}
					}
				}
			}
			a = this._autoRotate;
			if (a) {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i][2]]) {
						a.splice(i, 1);
					}
				}
			}
			return this._super._kill.call(this, lookup);
		};

	}());






	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * CSSPlugin
 * ----------------------------------------------------------------
 */
	_gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin","TweenLite"], function(TweenPlugin, TweenLite) {

		/** @constructor **/
		var CSSPlugin = function() {
				TweenPlugin.call(this, "css");
				this._overwriteProps.length = 0;
				this.setRatio = CSSPlugin.prototype.setRatio; //speed optimization (avoid prototype lookup on this "hot" method)
			},
			_globals = _gsScope._gsDefine.globals,
			_hasPriority, //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
			_suffixMap, //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
			_cs, //computed style (we store this in a shared variable to conserve memory and make minification tighter
			_overwriteProps, //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
			_specialProps = {},
			p = CSSPlugin.prototype = new TweenPlugin("css");

		p.constructor = CSSPlugin;
		CSSPlugin.version = "1.20.5";
		CSSPlugin.API = 2;
		CSSPlugin.defaultTransformPerspective = 0;
		CSSPlugin.defaultSkewType = "compensated";
		CSSPlugin.defaultSmoothOrigin = true;
		p = "px"; //we'll reuse the "p" variable to keep file size down
		CSSPlugin.suffixMap = {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p, lineHeight:""};


		var _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
			_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
			_valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
			_NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, //also allows scientific notation and doesn't kill the leading -/+ in -= and +=
			_suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
			_opacityExp = /opacity *= *([^)]*)/i,
			_opacityValExp = /opacity:([^;]*)/i,
			_alphaFilterExp = /alpha\(opacity *=.+?\)/i,
			_rgbhslExp = /^(rgb|hsl)/,
			_capsExp = /([A-Z])/g,
			_camelExp = /-([a-z])/gi,
			_urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
			_camelFunc = function(s, g) { return g.toUpperCase(); },
			_horizExp = /(?:Left|Right|Width)/i,
			_ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			_ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			_commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, //finds any commas that are not within parenthesis
			_complexExp = /[\s,\(]/i, //for testing a string to find if it has a space, comma, or open parenthesis (clues that it's a complex value)
			_DEG2RAD = Math.PI / 180,
			_RAD2DEG = 180 / Math.PI,
			_forcePT = {},
			_dummyElement = {style:{}},
			_doc = _gsScope.document || {createElement: function() {return _dummyElement;}},
			_createElement = function(type, ns) {
				return _doc.createElementNS ? _doc.createElementNS(ns || "http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
			},
			_tempDiv = _createElement("div"),
			_tempImg = _createElement("img"),
			_internals = CSSPlugin._internals = {_specialProps:_specialProps}, //provides a hook to a few internal methods that we need to access from inside other plugins
			_agent = (_gsScope.navigator || {}).userAgent || "",
			_autoRound,
			_reqSafariFix, //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).

			_isSafari,
			_isFirefox, //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
			_isSafariLT6, //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
			_ieVers,
			_supportsOpacity = (function() { //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
				var i = _agent.indexOf("Android"),
					a = _createElement("a");
				_isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || parseFloat(_agent.substr(i+8, 2)) > 3));
				_isSafariLT6 = (_isSafari && (parseFloat(_agent.substr(_agent.indexOf("Version/")+8, 2)) < 6));
				_isFirefox = (_agent.indexOf("Firefox") !== -1);
				if ((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent) || (/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(_agent)) {
					_ieVers = parseFloat( RegExp.$1 );
				}
				if (!a) {
					return false;
				}
				a.style.cssText = "top:1px;opacity:.55;";
				return /^0.55/.test(a.style.opacity);
			}()),
			_getIEOpacity = function(v) {
				return (_opacityExp.test( ((typeof(v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
			},
			_log = function(s) {//for logging messages, but in a way that won't throw errors in old versions of IE.
				if (_gsScope.console) {
					console.log(s);
				}
			},
			_target, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
			_index, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params

			_prefixCSS = "", //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
			_prefix = "", //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".

			// @private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
			_checkPropPrefix = function(p, e) {
				e = e || _tempDiv;
				var s = e.style,
					a, i;
				if (s[p] !== undefined) {
					return p;
				}
				p = p.charAt(0).toUpperCase() + p.substr(1);
				a = ["O","Moz","ms","Ms","Webkit"];
				i = 5;
				while (--i > -1 && s[a[i]+p] === undefined) { }
				if (i >= 0) {
					_prefix = (i === 3) ? "ms" : a[i];
					_prefixCSS = "-" + _prefix.toLowerCase() + "-";
					return _prefix + p;
				}
				return null;
			},

			_getComputedStyle = (typeof(window) !== "undefined" ? window : _doc.defaultView || {getComputedStyle:function() {}}).getComputedStyle,

			/**
			 * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
			 * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
			 *
			 * @param {!Object} t Target element whose style property you want to query
			 * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
			 * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
			 * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
			 * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
			 * @return {?string} The current property value
			 */
			_getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
				var rv;
				if (!_supportsOpacity) if (p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
					return _getIEOpacity(t);
				}
				if (!calc && t.style[p]) {
					rv = t.style[p];
				} else if ((cs = cs || _getComputedStyle(t))) {
					rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
				} else if (t.currentStyle) {
					rv = t.currentStyle[p];
				}
				return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv;
			},

			/**
			 * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
			 * @param {!Object} t Target element
			 * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
			 * @param {!number} v Value
			 * @param {string=} sfx Suffix (like "px" or "%" or "em")
			 * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
			 * @return {number} value in pixels
			 */
			_convertToPixels = _internals.convertToPixels = function(t, p, v, sfx, recurse) {
				if (sfx === "px" || (!sfx && p !== "lineHeight")) { return v; }
				if (sfx === "auto" || !v) { return 0; }
				var horiz = _horizExp.test(p),
					node = t,
					style = _tempDiv.style,
					neg = (v < 0),
					precise = (v === 1),
					pix, cache, time;
				if (neg) {
					v = -v;
				}
				if (precise) {
					v *= 100;
				}
				if (p === "lineHeight" && !sfx) { //special case of when a simple lineHeight (without a unit) is used. Set it to the value, read back the computed value, and then revert.
					cache = _getComputedStyle(t).lineHeight;
					t.style.lineHeight = v;
					pix = parseFloat(_getComputedStyle(t).lineHeight);
					t.style.lineHeight = cache;
				} else if (sfx === "%" && p.indexOf("border") !== -1) {
					pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
				} else {
					style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";
					if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
						node = t.parentNode || _doc.body;
						if (_getStyle(node, "display").indexOf("flex") !== -1) { //Edge and IE11 have a bug that causes offsetWidth to report as 0 if the container has display:flex and the child is position:relative. Switching to position: absolute solves it.
							style.position = "absolute";
						}
						cache = node._gsCache;
						time = TweenLite.ticker.frame;
						if (cache && horiz && cache.time === time) { //performance optimization: we record the width of elements along with the ticker frame so that we can quickly get it again on the same tick (seems relatively safe to assume it wouldn't change on the same tick)
							return cache.width * v / 100;
						}
						style[(horiz ? "width" : "height")] = v + sfx;
					} else {
						style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
					}
					node.appendChild(_tempDiv);
					pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
					node.removeChild(_tempDiv);
					if (horiz && sfx === "%" && CSSPlugin.cacheWidths !== false) {
						cache = node._gsCache = node._gsCache || {};
						cache.time = time;
						cache.width = pix / v * 100;
					}
					if (pix === 0 && !recurse) {
						pix = _convertToPixels(t, p, v, sfx, true);
					}
				}
				if (precise) {
					pix /= 100;
				}
				return neg ? -pix : pix;
			},
			_calculateOffset = _internals.calculateOffset = function(t, p, cs) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
				if (_getStyle(t, "position", cs) !== "absolute") { return 0; }
				var dim = ((p === "left") ? "Left" : "Top"),
					v = _getStyle(t, "margin" + dim, cs);
				return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
			},

			// @private returns at object containing ALL of the style properties in camelCase and their associated values.
			_getAllStyles = function(t, cs) {
				var s = {},
					i, tr, p;
				if ((cs = cs || _getComputedStyle(t, null))) {
					if ((i = cs.length)) {
						while (--i > -1) {
							p = cs[i];
							if (p.indexOf("-transform") === -1 || _transformPropCSS === p) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p);
							}
						}
					} else { //some browsers behave differently - cs.length is always 0, so we must do a for...in loop.
						for (i in cs) {
							if (i.indexOf("Transform") === -1 || _transformProp === i) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[i] = cs[i];
							}
						}
					}
				} else if ((cs = t.currentStyle || t.style)) {
					for (i in cs) {
						if (typeof(i) === "string" && s[i] === undefined) {
							s[i.replace(_camelExp, _camelFunc)] = cs[i];
						}
					}
				}
				if (!_supportsOpacity) {
					s.opacity = _getIEOpacity(t);
				}
				tr = _getTransform(t, cs, false);
				s.rotation = tr.rotation;
				s.skewX = tr.skewX;
				s.scaleX = tr.scaleX;
				s.scaleY = tr.scaleY;
				s.x = tr.x;
				s.y = tr.y;
				if (_supports3D) {
					s.z = tr.z;
					s.rotationX = tr.rotationX;
					s.rotationY = tr.rotationY;
					s.scaleZ = tr.scaleZ;
				}
				if (s.filters) {
					delete s.filters;
				}
				return s;
			},

			// @private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
			_cssDif = function(t, s1, s2, vars, forceLookup) {
				var difs = {},
					style = t.style,
					val, p, mpt;
				for (p in s2) {
					if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p])) if (p.indexOf("Origin") === -1) if (typeof(val) === "number" || typeof(val) === "string") {
						difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.
						if (style[p] !== undefined) { //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
							mpt = new MiniPropTween(style, p, style[p], mpt);
						}
					}
				}
				if (vars) {
					for (p in vars) { //copy properties (except className)
						if (p !== "className") {
							difs[p] = vars[p];
						}
					}
				}
				return {difs:difs, firstMPT:mpt};
			},
			_dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
			_margins = ["marginLeft","marginRight","marginTop","marginBottom"],

			/**
			 * @private Gets the width or height of an element
			 * @param {!Object} t Target element
			 * @param {!string} p Property name ("width" or "height")
			 * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
			 * @return {number} Dimension (in pixels)
			 */
			_getDimension = function(t, p, cs) {
				if ((t.nodeName + "").toLowerCase() === "svg") { //Chrome no longer supports offsetWidth/offsetHeight on SVG elements.
					return (cs || _getComputedStyle(t))[p] || 0;
				} else if (t.getCTM && _isSVG(t)) {
					return t.getBBox()[p] || 0;
				}
				var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
					a = _dimensions[p],
					i = a.length;
				cs = cs || _getComputedStyle(t, null);
				while (--i > -1) {
					v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
					v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
				}
				return v;
			},

			// @private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
			_parsePosition = function(v, recObj) {
				if (v === "contain" || v === "auto" || v === "auto auto") { //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
					return v + " ";
				}
				if (v == null || v === "") {
					v = "0 0";
				}
				var a = v.split(" "),
					x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
					y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1],
					i;
				if (a.length > 3 && !recObj) { //multiple positions
					a = v.split(", ").join(",").split(",");
					v = [];
					for (i = 0; i < a.length; i++) {
						v.push(_parsePosition(a[i]));
					}
					return v.join(",");
				}
				if (y == null) {
					y = (x === "center") ? "50%" : "0";
				} else if (y === "center") {
					y = "50%";
				}
				if (x === "center" || (isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1)) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
					x = "50%";
				}
				v = x + " " + y + ((a.length > 2) ? " " + a[2] : "");
				if (recObj) {
					recObj.oxp = (x.indexOf("%") !== -1);
					recObj.oyp = (y.indexOf("%") !== -1);
					recObj.oxr = (x.charAt(1) === "=");
					recObj.oyr = (y.charAt(1) === "=");
					recObj.ox = parseFloat(x.replace(_NaNExp, ""));
					recObj.oy = parseFloat(y.replace(_NaNExp, ""));
					recObj.v = v;
				}
				return recObj || v;
			},

			/**
			 * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
			 * @param {(number|string)} e End value which is typically a string, but could be a number
			 * @param {(number|string)} b Beginning value which is typically a string but could be a number
			 * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
			 */
			_parseChange = function(e, b) {
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				return (typeof(e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : (parseFloat(e) - parseFloat(b)) || 0;
			},

			/**
			 * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @return {number} Parsed value
			 */
			_parseVal = function(v, d) {
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				return (v == null) ? d : (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0;
			},

			/**
			 * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
			 * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
			 * @return {number} parsed angle in radians
			 */
			_parseAngle = function(v, d, p, directionalEnd) {
				var min = 0.000001,
					cap, split, dif, result, isRelative;
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				if (v == null) {
					result = d;
				} else if (typeof(v) === "number") {
					result = v;
				} else {
					cap = 360;
					split = v.split("_");
					isRelative = (v.charAt(1) === "=");
					dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * ((v.indexOf("rad") === -1) ? 1 : _RAD2DEG) - (isRelative ? 0 : d);
					if (split.length) {
						if (directionalEnd) {
							directionalEnd[p] = d + dif;
						}
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					result = d + dif;
				}
				if (result < min && result > -min) {
					result = 0;
				}
				return result;
			},

			_colorLookup = {aqua:[0,255,255],
				lime:[0,255,0],
				silver:[192,192,192],
				black:[0,0,0],
				maroon:[128,0,0],
				teal:[0,128,128],
				blue:[0,0,255],
				navy:[0,0,128],
				white:[255,255,255],
				fuchsia:[255,0,255],
				olive:[128,128,0],
				yellow:[255,255,0],
				orange:[255,165,0],
				gray:[128,128,128],
				purple:[128,0,128],
				green:[0,128,0],
				red:[255,0,0],
				pink:[255,192,203],
				cyan:[0,255,255],
				transparent:[255,255,255,0]},

			_hue = function(h, m1, m2) {
				h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
				return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
			},

			/**
			 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
			 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
			 * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
			 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
			 */
			_parseColor = CSSPlugin.parseColor = function(v, toHSL) {
				var a, r, g, b, h, s, l, max, min, d, wasHSL;
				if (!v) {
					a = _colorLookup.black;
				} else if (typeof(v) === "number") {
					a = [v >> 16, (v >> 8) & 255, v & 255];
				} else {
					if (v.charAt(v.length - 1) === ",") { //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
						v = v.substr(0, v.length - 1);
					}
					if (_colorLookup[v]) {
						a = _colorLookup[v];
					} else if (v.charAt(0) === "#") {
						if (v.length === 4) { //for shorthand like #9F0
							r = v.charAt(1);
							g = v.charAt(2);
							b = v.charAt(3);
							v = "#" + r + r + g + g + b + b;
						}
						v = parseInt(v.substr(1), 16);
						a = [v >> 16, (v >> 8) & 255, v & 255];
					} else if (v.substr(0, 3) === "hsl") {
						a = wasHSL = v.match(_numExp);
						if (!toHSL) {
							h = (Number(a[0]) % 360) / 360;
							s = Number(a[1]) / 100;
							l = Number(a[2]) / 100;
							g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
							r = l * 2 - g;
							if (a.length > 3) {
								a[3] = Number(a[3]);
							}
							a[0] = _hue(h + 1 / 3, r, g);
							a[1] = _hue(h, r, g);
							a[2] = _hue(h - 1 / 3, r, g);
						} else if (v.indexOf("=") !== -1) { //if relative values are found, just return the raw strings with the relative prefixes in place.
							return v.match(_relNumExp);
						}
					} else {
						a = v.match(_numExp) || _colorLookup.transparent;
					}
					a[0] = Number(a[0]);
					a[1] = Number(a[1]);
					a[2] = Number(a[2]);
					if (a.length > 3) {
						a[3] = Number(a[3]);
					}
				}
				if (toHSL && !wasHSL) {
					r = a[0] / 255;
					g = a[1] / 255;
					b = a[2] / 255;
					max = Math.max(r, g, b);
					min = Math.min(r, g, b);
					l = (max + min) / 2;
					if (max === min) {
						h = s = 0;
					} else {
						d = max - min;
						s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
						h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
						h *= 60;
					}
					a[0] = (h + 0.5) | 0;
					a[1] = (s * 100 + 0.5) | 0;
					a[2] = (l * 100 + 0.5) | 0;
				}
				return a;
			},
			_formatColors = function(s, toHSL) {
				var colors = s.match(_colorExp) || [],
					charIndex = 0,
					parsed = "",
					i, color, temp;
				if (!colors.length) {
					return s;
				}
				for (i = 0; i < colors.length; i++) {
					color = colors[i];
					temp = s.substr(charIndex, s.indexOf(color, charIndex)-charIndex);
					charIndex += temp.length + color.length;
					color = _parseColor(color, toHSL);
					if (color.length === 3) {
						color.push(1);
					}
					parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
				}
				return parsed + s.substr(charIndex);
			},
			_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		for (p in _colorLookup) {
			_colorExp += "|" + p + "\\b";
		}
		_colorExp = new RegExp(_colorExp+")", "gi");

		CSSPlugin.colorStringFilter = function(a) {
			var combined = a[0] + " " + a[1],
				toHSL;
			if (_colorExp.test(combined)) {
				toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
				a[0] = _formatColors(a[0], toHSL);
				a[1] = _formatColors(a[1], toHSL);
			}
			_colorExp.lastIndex = 0;
		};

		if (!TweenLite.defaultStringFilter) {
			TweenLite.defaultStringFilter = CSSPlugin.colorStringFilter;
		}

		/**
		 * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
		 * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
		 * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
		 * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
		 * @return {Function} formatter function
		 */
		var _getFormatter = function(dflt, clr, collapsible, multi) {
				if (dflt == null) {
					return function(v) {return v;};
				}
				var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
					dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
					pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
					sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
					delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
					numVals = dVals.length,
					dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
					formatter;
				if (!numVals) {
					return function(v) {return v;};
				}
				if (clr) {
					formatter = function(v) {
						var color, vals, i, a;
						if (typeof(v) === "number") {
							v += dSfx;
						} else if (multi && _commasOutsideParenExp.test(v)) {
							a = v.replace(_commasOutsideParenExp, "|").split("|");
							for (i = 0; i < a.length; i++) {
								a[i] = formatter(a[i]);
							}
							return a.join(",");
						}
						color = (v.match(_colorExp) || [dColor])[0];
						vals = v.split(color).join("").match(_valuesExp) || [];
						i = vals.length;
						if (numVals > i--) {
							while (++i < numVals) {
								vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
							}
						}
						return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
					};
					return formatter;

				}
				formatter = function(v) {
					var vals, a, i;
					if (typeof(v) === "number") {
						v += dSfx;
					} else if (multi && _commasOutsideParenExp.test(v)) {
						a = v.replace(_commasOutsideParenExp, "|").split("|");
						for (i = 0; i < a.length; i++) {
							a[i] = formatter(a[i]);
						}
						return a.join(",");
					}
					vals = v.match(_valuesExp) || [];
					i = vals.length;
					if (numVals > i--) {
						while (++i < numVals) {
							vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
						}
					}
					return pfx + vals.join(delim) + sfx;
				};
				return formatter;
			},

			/**
			 * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
			 * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
			 * @return {Function} a formatter function
			 */
			_getEdgeParser = function(props) {
				props = props.split(",");
				return function(t, e, p, cssp, pt, plugin, vars) {
					var a = (e + "").split(" "),
						i;
					vars = {};
					for (i = 0; i < 4; i++) {
						vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)];
					}
					return cssp.parse(t, vars, pt, plugin);
				};
			},

			// @private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
			_setPluginRatio = _internals._setPluginRatio = function(v) {
				this.plugin.setRatio(v);
				var d = this.data,
					proxy = d.proxy,
					mpt = d.firstMPT,
					min = 0.000001,
					val, pt, i, str, p;
				while (mpt) {
					val = proxy[mpt.v];
					if (mpt.r) {
						val = mpt.r(val);
					} else if (val < min && val > -min) {
						val = 0;
					}
					mpt.t[mpt.p] = val;
					mpt = mpt._next;
				}
				if (d.autoRotate) {
					d.autoRotate.rotation = d.mod ? d.mod.call(this._tween, proxy.rotation, this.t, this._tween) : proxy.rotation; //special case for ModifyPlugin to hook into an auto-rotating bezier
				}
				//at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method. Same for "b" at the beginning.
				if (v === 1 || v === 0) {
					mpt = d.firstMPT;
					p = (v === 1) ? "e" : "b";
					while (mpt) {
						pt = mpt.t;
						if (!pt.type) {
							pt[p] = pt.s + pt.xs0;
						} else if (pt.type === 1) {
							str = pt.xs0 + pt.s + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt[p] = str;
						}
						mpt = mpt._next;
					}
				}
			},

			/**
			 * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
			 * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
			 * @param {!string} p property name
			 * @param {(number|string|object)} v value
			 * @param {MiniPropTween=} next next MiniPropTween in the linked list
			 * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
			 */
			MiniPropTween = function(t, p, v, next, r) {
				this.t = t;
				this.p = p;
				this.v = v;
				this.r = r;
				if (next) {
					next._prev = this;
					this._next = next;
				}
			},

			/**
			 * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
			 * This method returns an object that has the following properties:
			 *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
			 *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
			 *  - firstMPT: the first MiniPropTween in the linked list
			 *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
			 * @param {!Object} t target object to be tweened
			 * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
			 * @param {!CSSPlugin} cssp The CSSPlugin instance
			 * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
			 * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
			 * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
			 * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
			 */
			_parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
				var bpt = pt,
					start = {},
					end = {},
					transform = cssp._transform,
					oldForce = _forcePT,
					i, p, xp, mpt, firstPT;
				cssp._transform = null;
				_forcePT = vars;
				pt = firstPT = cssp.parse(t, vars, pt, plugin);
				_forcePT = oldForce;
				//break off from the linked list so the new ones are isolated.
				if (shallow) {
					cssp._transform = transform;
					if (bpt) {
						bpt._prev = null;
						if (bpt._prev) {
							bpt._prev._next = null;
						}
					}
				}
				while (pt && pt !== bpt) {
					if (pt.type <= 1) {
						p = pt.p;
						end[p] = pt.s + pt.c;
						start[p] = pt.s;
						if (!shallow) {
							mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
							pt.c = 0;
						}
						if (pt.type === 1) {
							i = pt.l;
							while (--i > 0) {
								xp = "xn" + i;
								p = pt.p + "_" + xp;
								end[p] = pt.data[xp];
								start[p] = pt[xp];
								if (!shallow) {
									mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
								}
							}
						}
					}
					pt = pt._next;
				}
				return {proxy:start, end:end, firstMPT:mpt, pt:firstPT};
			},



			/**
			 * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
			 * CSSPropTweens have the following optional properties as well (not defined through the constructor):
			 *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
			 *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
			 *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
			 *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
			 *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
			 * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
			 * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
			 * @param {number} s Starting numeric value
			 * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
			 * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
			 * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
			 * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
			 * @param {boolean=} r If true, the value(s) should be rounded
			 * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
			 * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
			 * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
			 */
			CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
				this.t = t; //target
				this.p = p; //property
				this.s = s; //starting value
				this.c = c; //change value
				this.n = n || p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)
				if (!(t instanceof CSSPropTween)) {
					_overwriteProps.push(this.n);
				}
				this.r = !r ? r : (typeof(r) === "function") ? r : Math.round; //round (boolean)
				this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work
				if (pr) {
					this.pr = pr;
					_hasPriority = true;
				}
				this.b = (b === undefined) ? s : b;
				this.e = (e === undefined) ? s + c : e;
				if (next) {
					this._next = next;
					next._prev = this;
				}
			},

			_addNonTweeningNumericPT = function(target, prop, start, end, next, overwriteProp) { //cleans up some code redundancies and helps minification. Just a fast way to add a NUMERIC non-tweening CSSPropTween
				var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
				pt.b = start;
				pt.e = pt.xs0 = end;
				return pt;
			},

			/**
			 * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
			 * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
			 * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
			 * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
			 *
			 * @param {!Object} t Target whose property will be tweened
			 * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
			 * @param {string} b Beginning value
			 * @param {string} e Ending value
			 * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
			 * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
			 * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
			 * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
			 * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
			 * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
			 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
			 */
			_parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
				//DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
				b = b || dflt || "";
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, false, pr, b, e);
				e += ""; //ensures it's a string
				if (clrs && _colorExp.test(e + b)) { //if colors are found, normalize the formatting to rgba() or hsla().
					e = [b, e];
					CSSPlugin.colorStringFilter(e);
					b = e[0];
					e = e[1];
				}
				var ba = b.split(", ").join(",").split(" "), //beginning array
					ea = e.split(", ").join(",").split(" "), //ending array
					l = ba.length,
					autoRound = (_autoRound !== false),
					i, xi, ni, bv, ev, bnums, enums, bn, hasAlpha, temp, cv, str, useHSL;
				if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
					if ((e + b).indexOf("rgb") !== -1 || (e + b).indexOf("hsl") !== -1) { //keep rgb(), rgba(), hsl(), and hsla() values together! (remember, we're splitting on spaces)
						ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
						ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					} else {
						ba = ba.join(" ").split(",").join(", ").split(" ");
						ea = ea.join(" ").split(",").join(", ").split(" ");
					}
					l = ba.length;
				}
				if (l !== ea.length) {
					//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
					ba = (dflt || "").split(" ");
					l = ba.length;
				}
				pt.plugin = plugin;
				pt.setRatio = setRatio;
				_colorExp.lastIndex = 0;
				for (i = 0; i < l; i++) {
					bv = ba[i];
					ev = ea[i] + "";
					bn = parseFloat(bv);
					//if the value begins with a number (most common). It's fine if it has a suffix like px
					if (bn || bn === 0) {
						pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1) ? Math.round : false, true);

					//if the value is a color
					} else if (clrs && _colorExp.test(bv)) {
						str = ev.indexOf(")") + 1;
						str = ")" + (str ? ev.substr(str) : ""); //if there's a comma or ) at the end, retain it.
						useHSL = (ev.indexOf("hsl") !== -1 && _supportsOpacity);
						temp = ev; //original string value so we can look for any prefix later.
						bv = _parseColor(bv, useHSL);
						ev = _parseColor(ev, useHSL);
						hasAlpha = (bv.length + ev.length > 6);
						if (hasAlpha && !_supportsOpacity && ev[3] === 0) { //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
							pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
							pt.e = pt.e.split(ea[i]).join("transparent");
						} else {
							if (!_supportsOpacity) { //old versions of IE don't support rgba().
								hasAlpha = false;
							}
							if (useHSL) {
								pt.appendXtra(temp.substr(0, temp.indexOf("hsl")) + (hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true)
									.appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false)
									.appendXtra("", bv[2], _parseChange(ev[2], bv[2]), (hasAlpha ? "%," : "%" + str), false);
							} else {
								pt.appendXtra(temp.substr(0, temp.indexOf("rgb")) + (hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", Math.round, true)
									.appendXtra("", bv[1], ev[1] - bv[1], ",", Math.round)
									.appendXtra("", bv[2], ev[2] - bv[2], (hasAlpha ? "," : str), Math.round);
							}

							if (hasAlpha) {
								bv = (bv.length < 4) ? 1 : bv[3];
								pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, false);
							}
						}
						_colorExp.lastIndex = 0; //otherwise the test() on the RegExp could move the lastIndex and taint future results.

					} else {
						bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array

						//if no number is found, treat it as a non-tweening value and just append the string to the current xs.
						if (!bnums) {
							pt["xs" + pt.l] += (pt.l || pt["xs" + pt.l]) ? " " + ev : ev;

						//loop through all the numbers that are found and construct the extra values on the pt.
						} else {
							enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5
							if (!enums || enums.length !== bnums.length) {
								//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
								return pt;
							}
							ni = 0;
							for (xi = 0; xi < bnums.length; xi++) {
								cv = bnums[xi];
								temp = bv.indexOf(cv, ni);
								pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px") ? Math.round : false, (xi === 0));
								ni = temp + cv.length;
							}
							pt["xs" + pt.l] += bv.substr(ni);
						}
					}
				}
				//if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.
				if (e.indexOf("=") !== -1) if (pt.data) {
					str = pt.xs0 + pt.data.s;
					for (i = 1; i < pt.l; i++) {
						str += pt["xs" + i] + pt.data["xn" + i];
					}
					pt.e = str + pt["xs" + i];
				}
				if (!pt.l) {
					pt.type = -1;
					pt.xs0 = pt.e;
				}
				return pt.xfirst || pt;
			},
			i = 9;


		p = CSSPropTween.prototype;
		p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.
		while (--i > 0) {
			p["xn" + i] = 0;
			p["xs" + i] = "";
		}
		p.xs0 = "";
		p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;


		/**
		 * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
		 * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
		 * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
		 * @param {string=} pfx Prefix (if any)
		 * @param {!number} s Starting value
		 * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
		 * @param {string=} sfx Suffix (if any)
		 * @param {boolean=} r Round (if true).
		 * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
		 * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
		 */
		p.appendXtra = function(pfx, s, c, sfx, r, pad) {
			var pt = this,
				l = pt.l;
			pt["xs" + l] += (pad && (l || pt["xs" + l])) ? " " + pfx : pfx || "";
			if (!c) if (l !== 0 && !pt.plugin) { //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
				pt["xs" + l] += s + (sfx || "");
				return pt;
			}
			pt.l++;
			pt.type = pt.setRatio ? 2 : 1;
			pt["xs" + pt.l] = sfx || "";
			if (l > 0) {
				pt.data["xn" + l] = s + c;
				pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)
				pt["xn" + l] = s;
				if (!pt.plugin) {
					pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
					pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
				}
				return pt;
			}
			pt.data = {s:s + c};
			pt.rxp = {};
			pt.s = s;
			pt.c = c;
			pt.r = r;
			return pt;
		};

		/**
		 * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
		 * @param {!string} p Property name (like "boxShadow" or "throwProps")
		 * @param {Object=} options An object containing any of the following configuration options:
		 *                      - defaultValue: the default value
		 *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
		 *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
		 *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
		 *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
		 *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
		 *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
		 *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
		 *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
		 */
		var SpecialProp = function(p, options) {
				options = options || {};
				this.p = options.prefix ? _checkPropPrefix(p) || p : p;
				_specialProps[p] = _specialProps[this.p] = this;
				this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
				if (options.parser) {
					this.parse = options.parser;
				}
				this.clrs = options.color;
				this.multi = options.multi;
				this.keyword = options.keyword;
				this.dflt = options.defaultValue;
				this.pr = options.priority || 0;
			},

			//shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
			_registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
				if (typeof(options) !== "object") {
					options = {parser:defaults}; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
				}
				var a = p.split(","),
					d = options.defaultValue,
					i, temp;
				defaults = defaults || [d];
				for (i = 0; i < a.length; i++) {
					options.prefix = (i === 0 && options.prefix);
					options.defaultValue = defaults[i] || d;
					temp = new SpecialProp(a[i], options);
				}
			},

			//creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
			_registerPluginProp = _internals._registerPluginProp = function(p) {
				if (!_specialProps[p]) {
					var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
					_registerComplexSpecialProp(p, {parser:function(t, e, p, cssp, pt, plugin, vars) {
						var pluginClass = _globals.com.greensock.plugins[pluginName];
						if (!pluginClass) {
							_log("Error: " + pluginName + " js file not loaded.");
							return pt;
						}
						pluginClass._cssRegister();
						return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
					}});
				}
			};


		p = SpecialProp.prototype;

		/**
		 * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
		 * @param {!Object} t target element
		 * @param {(string|number|object)} b beginning value
		 * @param {(string|number|object)} e ending (destination) value
		 * @param {CSSPropTween=} pt next CSSPropTween in the linked list
		 * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
		 * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
		 * @return {CSSPropTween=} First CSSPropTween in the linked list
		 */
		p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
			var kwd = this.keyword,
				i, ba, ea, l, bi, ei;
			//if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)
			if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
				ba = b.replace(_commasOutsideParenExp, "|").split("|");
				ea = e.replace(_commasOutsideParenExp, "|").split("|");
			} else if (kwd) {
				ba = [b];
				ea = [e];
			}
			if (ea) {
				l = (ea.length > ba.length) ? ea.length : ba.length;
				for (i = 0; i < l; i++) {
					b = ba[i] = ba[i] || this.dflt;
					e = ea[i] = ea[i] || this.dflt;
					if (kwd) {
						bi = b.indexOf(kwd);
						ei = e.indexOf(kwd);
						if (bi !== ei) {
							if (ei === -1) { //if the keyword isn't in the end value, remove it from the beginning one.
								ba[i] = ba[i].split(kwd).join("");
							} else if (bi === -1) { //if the keyword isn't in the beginning, add it.
								ba[i] += " " + kwd;
							}
						}
					}
				}
				b = ba.join(", ");
				e = ea.join(", ");
			}
			return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
		};

		/**
		 * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
		 * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
		 * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
		 * @param {!Object} t Target object whose property is being tweened
		 * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
		 * @param {!string} p Property name
		 * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
		 * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
		 * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
		 * @param {Object=} vars Original vars object that contains the data for parsing.
		 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
		 */
		p.parse = function(t, e, p, cssp, pt, plugin, vars) {
			return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
		};

		/**
		 * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
		 *  1) Target object whose property should be tweened (typically a DOM element)
		 *  2) The end/destination value (could be a string, number, object, or whatever you want)
		 *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
		 *
		 * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
		 *
		 * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
		 *      var start = target.style.width;
		 *      return function(ratio) {
		 *              target.style.width = (start + value * ratio) + "px";
		 *              console.log("set width to " + target.style.width);
		 *          }
		 * }, 0);
		 *
		 * Then, when I do this tween, it will trigger my special property:
		 *
		 * TweenLite.to(element, 1, {css:{myCustomProp:100}});
		 *
		 * In the example, of course, we're just changing the width, but you can do anything you want.
		 *
		 * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
		 * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
		 * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
		 */
		CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
			_registerComplexSpecialProp(name, {parser:function(t, e, p, cssp, pt, plugin, vars) {
				var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
				rv.plugin = plugin;
				rv.setRatio = onInitTween(t, e, cssp._tween, p);
				return rv;
			}, priority:priority});
		};






		//transform-related methods and properties
		CSSPlugin.useSVGTransformAttr = true; //Safari and Firefox both have some rendering bugs when applying CSS transforms to SVG elements, so default to using the "transform" attribute instead (users can override this).
		var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent").split(","),
			_transformProp = _checkPropPrefix("transform"), //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
			_transformPropCSS = _prefixCSS + "transform",
			_transformOriginProp = _checkPropPrefix("transformOrigin"),
			_supports3D = (_checkPropPrefix("perspective") !== null),
			Transform = _internals.Transform = function() {
				this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
				this.force3D = (CSSPlugin.defaultForce3D === false || !_supports3D) ? false : CSSPlugin.defaultForce3D || "auto";
			},
			_SVGElement = _gsScope.SVGElement,
			_useSVGTransformAttr,
			//Some browsers (like Firefox and IE) don't honor transform-origin properly in SVG elements, so we need to manually adjust the matrix accordingly. We feature detect here rather than always doing the conversion for certain browsers because they may fix the problem at some point in the future.

			_createSVG = function(type, container, attributes) {
				var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
					reg = /([a-z])([A-Z])/g,
					p;
				for (p in attributes) {
					element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
				}
				container.appendChild(element);
				return element;
			},
			_docElement = _doc.documentElement || {},
			_forceSVGTransformAttr = (function() {
				//IE and Android stock don't support CSS transforms on SVG elements, so we must write them to the "transform" attribute. We populate this variable in the _parseTransform() method, and only if/when we come across an SVG element
				var force = _ieVers || (/Android/i.test(_agent) && !_gsScope.chrome),
					svg, rect, width;
				if (_doc.createElementNS && !force) { //IE8 and earlier doesn't support SVG anyway
					svg = _createSVG("svg", _docElement);
					rect = _createSVG("rect", svg, {width:100, height:50, x:100});
					width = rect.getBoundingClientRect().width;
					rect.style[_transformOriginProp] = "50% 50%";
					rect.style[_transformProp] = "scaleX(0.5)";
					force = (width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D)); //note: Firefox fails the test even though it does support CSS transforms in 3D. Since we can't push 3D stuff into the transform attribute, we force Firefox to pass the test here (as long as it does truly support 3D).
					_docElement.removeChild(svg);
				}
				return force;
			})(),
			_parseSVGOrigin = function(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
				var tm = e._gsTransform,
					m = _getMatrix(e, true),
					v, x, y, xOrigin, yOrigin, a, b, c, d, tx, ty, determinant, xOriginOld, yOriginOld;
				if (tm) {
					xOriginOld = tm.xOrigin; //record the original values before we alter them.
					yOriginOld = tm.yOrigin;
				}
				if (!absolute || (v = absolute.split(" ")).length < 2) {
					b = e.getBBox();
					if (b.x === 0 && b.y === 0 && b.width + b.height === 0) { //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.
						b = {x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0, y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0, width:0, height:0};
					}
					local = _parsePosition(local).split(" ");
					v = [(local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x,
						 (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y];
				}
				decoratee.xOrigin = xOrigin = parseFloat(v[0]);
				decoratee.yOrigin = yOrigin = parseFloat(v[1]);
				if (absolute && m !== _identity2DMatrix) { //if svgOrigin is being set, we must invert the matrix and determine where the absolute point is, factoring in the current transforms. Otherwise, the svgOrigin would be based on the element's non-transformed position on the canvas.
					a = m[0];
					b = m[1];
					c = m[2];
					d = m[3];
					tx = m[4];
					ty = m[5];
					determinant = (a * d - b * c);
					if (determinant) { //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
						x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + ((c * ty - d * tx) / determinant);
						y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - ((a * ty - b * tx) / determinant);
						xOrigin = decoratee.xOrigin = v[0] = x;
						yOrigin = decoratee.yOrigin = v[1] = y;
					}
				}
				if (tm) { //avoid jump when transformOrigin is changed - adjust the x/y values accordingly
					if (skipRecord) {
						decoratee.xOffset = tm.xOffset;
						decoratee.yOffset = tm.yOffset;
						tm = decoratee;
					}
					if (smoothOrigin || (smoothOrigin !== false && CSSPlugin.defaultSmoothOrigin !== false)) {
						x = xOrigin - xOriginOld;
						y = yOrigin - yOriginOld;
						//originally, we simply adjusted the x and y values, but that would cause problems if, for example, you created a rotational tween part-way through an x/y tween. Managing the offset in a separate variable gives us ultimate flexibility.
						//tm.x -= x - (x * m[0] + y * m[2]);
						//tm.y -= y - (x * m[1] + y * m[3]);
						tm.xOffset += (x * m[0] + y * m[2]) - x;
						tm.yOffset += (x * m[1] + y * m[3]) - y;
					} else {
						tm.xOffset = tm.yOffset = 0;
					}
				}
				if (!skipRecord) {
					e.setAttribute("data-svg-origin", v.join(" "));
				}
			},
			_getBBoxHack = function(swapIfPossible) { //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
				var svg = _createElement("svg", (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"),
					oldParent = this.parentNode,
					oldSibling = this.nextSibling,
					oldCSS = this.style.cssText,
					bbox;
				_docElement.appendChild(svg);
				svg.appendChild(this);
				this.style.display = "block";
				if (swapIfPossible) {
					try {
						bbox = this.getBBox();
						this._originalGetBBox = this.getBBox;
						this.getBBox = _getBBoxHack;
					} catch (e) { }
				} else if (this._originalGetBBox) {
					bbox = this._originalGetBBox();
				}
				if (oldSibling) {
					oldParent.insertBefore(this, oldSibling);
				} else {
					oldParent.appendChild(this);
				}
				_docElement.removeChild(svg);
				this.style.cssText = oldCSS;
				return bbox;
			},
			_getBBox = function(e) {
				try {
					return e.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
				} catch (error) {
					return _getBBoxHack.call(e, true);
				}
			},
			_isSVG = function(e) { //reports if the element is an SVG on which getBBox() actually works
				return !!(_SVGElement && e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
			},
			_identity2DMatrix = [1,0,0,1,0,0],
			_getMatrix = function(e, force2D) {
				var tm = e._gsTransform || new Transform(),
					rnd = 100000,
					style = e.style,
					isDefault, s, m, n, dec, none;
				if (_transformProp) {
					s = _getStyle(e, _transformPropCSS, null, true);
				} else if (e.currentStyle) {
					//for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
					s = e.currentStyle.filter.match(_ieGetMatrixExp);
					s = (s && s.length === 4) ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",") : "";
				}
				isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
				if (_transformProp && ((none = (!_getComputedStyle(e) || _getComputedStyle(e).display === "none")) || !e.parentNode)) { //note: Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
					if (none) { //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
						n = style.display;
						style.display = "block";
					}
					if (!e.parentNode) {
						dec = 1; //flag
						_docElement.appendChild(e);
					}
					s = _getStyle(e, _transformPropCSS, null, true);
					isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
					if (n) {
						style.display = n;
					} else if (none) {
						_removeProp(style, "display");
					}
					if (dec) {
						_docElement.removeChild(e);
					}
				}
				if (tm.svg || (e.getCTM && _isSVG(e))) {
					if (isDefault && (style[_transformProp] + "").indexOf("matrix") !== -1) { //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values
						s = style[_transformProp];
						isDefault = 0;
					}
					m = e.getAttribute("transform");
					if (isDefault && m) {
						m = e.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.
						s = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")";
						isDefault = 0;
					}
				}
				if (isDefault) {
					return _identity2DMatrix;
				}
				//split the matrix values out into an array (m for matrix)
				m = (s || "").match(_numExp) || [];
				i = m.length;
				while (--i > -1) {
					n = Number(m[i]);
					m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
				}
				return (force2D && m.length > 6) ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m;
			},

			/**
			 * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
			 * @param {!Object} t target element
			 * @param {Object=} cs computed style object (optional)
			 * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
			 * @param {boolean=} parse if true, we'll ignore any _gsTransform values that already exist on the element, and force a reparsing of the css (calculated style)
			 * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
			 */
			_getTransform = _internals.getTransform = function(t, cs, rec, parse) {
				if (t._gsTransform && rec && !parse) {
					return t._gsTransform; //if the element already has a _gsTransform, use that. Note: some browsers don't accurately return the calculated style for the transform (particularly for SVG), so it's almost always safest to just use the values we've already applied rather than re-parsing things.
				}
				var tm = rec ? t._gsTransform || new Transform() : new Transform(),
					invX = (tm.scaleX < 0), //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
					min = 0.00002,
					rnd = 100000,
					zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin  || 0 : 0,
					defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0,
					m, i, scaleX, scaleY, rotation, skewX;

				tm.svg = !!(t.getCTM && _isSVG(t));
				if (tm.svg) {
					_parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));
					_useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr;
				}
				m = _getMatrix(t);
				if (m !== _identity2DMatrix) {

					if (m.length === 16) {
						//we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
						var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3],
							a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7],
							a13 = m[8], a23 = m[9], a33 = m[10],
							a14 = m[12], a24 = m[13], a34 = m[14],
							a43 = m[11],
							angle = Math.atan2(a32, a33),
							t1, t2, t3, t4, cos, sin;
						//we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari
						if (tm.zOrigin) {
							a34 = -tm.zOrigin;
							a14 = a13*a34-m[12];
							a24 = a23*a34-m[13];
							a34 = a33*a34+tm.zOrigin-m[14];
						}
						//note for possible future consolidation: rotationX: Math.atan2(a32, a33), rotationY: Math.atan2(-a31, Math.sqrt(a33 * a33 + a32 * a32)), rotation: Math.atan2(a21, a11), skew: Math.atan2(a12, a22). However, it doesn't seem to be quite as reliable as the full-on backwards rotation procedure.
						tm.rotationX = angle * _RAD2DEG;
						//rotationX
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a12*cos+a13*sin;
							t2 = a22*cos+a23*sin;
							t3 = a32*cos+a33*sin;
							a13 = a12*-sin+a13*cos;
							a23 = a22*-sin+a23*cos;
							a33 = a32*-sin+a33*cos;
							a43 = a42*-sin+a43*cos;
							a12 = t1;
							a22 = t2;
							a32 = t3;
						}
						//rotationY
						angle = Math.atan2(-a31, a33);
						tm.rotationY = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a11*cos-a13*sin;
							t2 = a21*cos-a23*sin;
							t3 = a31*cos-a33*sin;
							a23 = a21*sin+a23*cos;
							a33 = a31*sin+a33*cos;
							a43 = a41*sin+a43*cos;
							a11 = t1;
							a21 = t2;
							a31 = t3;
						}
						//rotationZ
						angle = Math.atan2(a21, a11);
						tm.rotation = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(angle);
							sin = Math.sin(angle);
							t1 = a11*cos+a21*sin;
							t2 = a12*cos+a22*sin;
							t3 = a13*cos+a23*sin;
							a21 = a21*cos-a11*sin;
							a22 = a22*cos-a12*sin;
							a23 = a23*cos-a13*sin;
							a11 = t1;
							a12 = t2;
							a13 = t3;
						}

						if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) { //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
							tm.rotationX = tm.rotation = 0;
							tm.rotationY = 180 - tm.rotationY;
						}

						//skewX
						angle = Math.atan2(a12, a22);

						//scales
						tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21 + a31 * a31) * rnd + 0.5) | 0) / rnd;
						tm.scaleY = ((Math.sqrt(a22 * a22 + a32 * a32) * rnd + 0.5) | 0) / rnd;
						tm.scaleZ = ((Math.sqrt(a13 * a13 + a23 * a23 + a33 * a33) * rnd + 0.5) | 0) / rnd;
						a11 /= tm.scaleX;
						a12 /= tm.scaleY;
						a21 /= tm.scaleX;
						a22 /= tm.scaleY;
						if (Math.abs(angle) > min) {
							tm.skewX = angle * _RAD2DEG;
							a12 = 0; //unskews
							if (tm.skewType !== "simple") {
								tm.scaleY *= 1 / Math.cos(angle); //by default, we compensate the scale based on the skew so that the element maintains a similar proportion when skewed, so we have to alter the scaleY here accordingly to match the default (non-adjusted) skewing that CSS does (stretching more and more as it skews).
							}

						} else {
							tm.skewX = 0;
						}

						/* //for testing purposes
						var transform = "matrix3d(",
							comma = ",",
							zero = "0";
						a13 /= tm.scaleZ;
						a23 /= tm.scaleZ;
						a31 /= tm.scaleX;
						a32 /= tm.scaleY;
						a33 /= tm.scaleZ;
						transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
						transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
						transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
						transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
						transform += a14 + comma + a24 + comma + a34 + comma + (tm.perspective ? (1 + (-a34 / tm.perspective)) : 1) + ")";
						console.log(transform);
						document.querySelector(".test").style[_transformProp] = transform;
						*/

						tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
						tm.x = a14;
						tm.y = a24;
						tm.z = a34;
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
							tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
						}

					} else if ((!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY))) { //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
						var k = (m.length >= 6),
							a = k ? m[0] : 1,
							b = m[1] || 0,
							c = m[2] || 0,
							d = k ? m[3] : 1;
						tm.x = m[4] || 0;
						tm.y = m[5] || 0;
						scaleX = Math.sqrt(a * a + b * b);
						scaleY = Math.sqrt(d * d + c * c);
						rotation = (a || b) ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
						skewX = (c || d) ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
						tm.scaleX = scaleX;
						tm.scaleY = scaleY;
						tm.rotation = rotation;
						tm.skewX = skewX;
						if (_supports3D) {
							tm.rotationX = tm.rotationY = tm.z = 0;
							tm.perspective = defaultTransformPerspective;
							tm.scaleZ = 1;
						}
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
							tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
						}
					}
					if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) {
						if (invX) {
							tm.scaleX *= -1;
							tm.skewX += (tm.rotation <= 0) ? 180 : -180;
							tm.rotation += (tm.rotation <= 0) ? 180 : -180;
						} else {
							tm.scaleY *= -1;
							tm.skewX += (tm.skewX <= 0) ? 180 : -180;
						}
					}
					tm.zOrigin = zOrigin;
					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.
					for (i in tm) {
						if (tm[i] < min) if (tm[i] > -min) {
							tm[i] = 0;
						}
					}
				}
				//DEBUG: _log("parsed rotation of " + t.getAttribute("id")+": "+(tm.rotationX)+", "+(tm.rotationY)+", "+(tm.rotation)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective+ ", origin: "+ tm.xOrigin+ ","+ tm.yOrigin);
				if (rec) {
					t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
					if (tm.svg) { //if we're supposed to apply transforms to the SVG element's "transform" attribute, make sure there aren't any CSS transforms applied or they'll override the attribute ones. Also clear the transform attribute if we're using CSS, just to be clean.
						if (_useSVGTransformAttr && t.style[_transformProp]) {
							TweenLite.delayedCall(0.001, function(){ //if we apply this right away (before anything has rendered), we risk there being no transforms for a brief moment and it also interferes with adjusting the transformOrigin in a tween with immediateRender:true (it'd try reading the matrix and it wouldn't have the appropriate data in place because we just removed it).
								_removeProp(t.style, _transformProp);
							});
						} else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
							TweenLite.delayedCall(0.001, function(){
								t.removeAttribute("transform");
							});
						}
					}
				}
				return tm;
			},

			//for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
			_setIETransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					ang = -t.rotation * _DEG2RAD,
					skew = ang + t.skewX * _DEG2RAD,
					rnd = 100000,
					a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
					b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
					c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
					d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
					style = this.t.style,
					cs = this.t.currentStyle,
					filters, val;
				if (!cs) {
					return;
				}
				val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
				b = -c;
				c = -val;
				filters = cs.filter;
				style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
				var w = this.t.offsetWidth,
					h = this.t.offsetHeight,
					clip = (cs.position !== "absolute"),
					m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
					ox = t.x + (w * t.xPercent / 100),
					oy = t.y + (h * t.yPercent / 100),
					dx, dy;

				//if transformOrigin is being used, adjust the offset x and y
				if (t.ox != null) {
					dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
					dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
					ox += dx - (dx * a + dy * b);
					oy += dy - (dx * c + dy * d);
				}

				if (!clip) {
					m += ", sizingMethod='auto expand')";
				} else {
					dx = (w / 2);
					dy = (h / 2);
					//translate to ensure that transformations occur around the correct origin (default is center).
					m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
				}
				if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
					style.filter = filters.replace(_ieSetMatrixExp, m);
				} else {
					style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
				}

				//at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
				if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(" && filters.indexOf("Alpha")) === -1) {
					style.removeAttribute("filter");
				}

				//we must set the margins AFTER applying the filter in order to avoid some bugs in IE8 that could (in rare scenarios) cause them to be ignored intermittently (vibration).
				if (!clip) {
					var mult = (_ieVers < 8) ? 1 : -1, //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
						marg, prop, dif;
					dx = t.ieOffsetX || 0;
					dy = t.ieOffsetY || 0;
					t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
					t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
					for (i = 0; i < 4; i++) {
						prop = _margins[i];
						marg = cs[prop];
						//we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
						val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
						if (val !== t[prop]) {
							dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
						} else {
							dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY;
						}
						style[prop] = (t[prop] = Math.round( val - dif * ((i === 0 || i === 2) ? 1 : mult) )) + "px";
					}
				}
			},

			/* translates a super small decimal to a string WITHOUT scientific notation
			_safeDecimal = function(n) {
				var s = (n < 0 ? -n : n) + "",
					a = s.split("e-");
				return (n < 0 ? "-0." : "0.") + new Array(parseInt(a[1], 10) || 0).join("0") + a[0].split(".").join("");
			},
			*/

			_setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					style = this.t.style,
					angle = t.rotation,
					rotationX = t.rotationX,
					rotationY = t.rotationY,
					sx = t.scaleX,
					sy = t.scaleY,
					sz = t.scaleZ,
					x = t.x,
					y = t.y,
					z = t.z,
					isSVG = t.svg,
					perspective = t.perspective,
					force3D = t.force3D,
					skewY = t.skewY,
					skewX = t.skewX,
					t1,	a11, a12, a13, a21, a22, a23, a31, a32, a33, a41, a42, a43,
					zOrigin, min, cos, sin, t2, transform, comma, zero, skew, rnd;
				if (skewY) { //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
					skewX += skewY;
					angle += skewY;
				}

				//check to see if we should render as 2D (and SVGs must use 2D when _useSVGTransformAttr is true)
				if (((((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime)) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1) || (_useSVGTransformAttr && isSVG) || !_supports3D) { //on the final render (which could be 0 for a from tween), if there are no 3D aspects, render in 2D to free up memory and improve performance especially on mobile devices. Check the tween's totalTime/totalDuration too in order to make sure it doesn't happen between repeats if it's a repeating tween.

					//2D
					if (angle || skewX || isSVG) {
						angle *= _DEG2RAD;
						skew = skewX * _DEG2RAD;
						rnd = 100000;
						a11 = Math.cos(angle) * sx;
						a21 = Math.sin(angle) * sx;
						a12 = Math.sin(angle - skew) * -sy;
						a22 = Math.cos(angle - skew) * sy;
						if (skew && t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan(skew - skewY * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							a12 *= t1;
							a22 *= t1;
							if (skewY) {
								t1 = Math.tan(skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
						if (isSVG) {
							x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
							y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
							if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) { //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the matrix to simulate it.
								min = this.t.getBBox();
								x += t.xPercent * 0.01 * min.width;
								y += t.yPercent * 0.01 * min.height;
							}
							min = 0.000001;
							if (x < min) if (x > -min) {
								x = 0;
							}
							if (y < min) if (y > -min) {
								y = 0;
							}
						}
						transform = (((a11 * rnd) | 0) / rnd) + "," + (((a21 * rnd) | 0) / rnd) + "," + (((a12 * rnd) | 0) / rnd) + "," + (((a22 * rnd) | 0) / rnd) + "," + x + "," + y + ")";
						if (isSVG && _useSVGTransformAttr) {
							this.t.setAttribute("transform", "matrix(" + transform);
						} else {
							//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
							style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
						}
					} else {
						style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
					}
					return;

				}
				if (_isFirefox) { //Firefox has a bug (at least in v25) that causes it to render the transparent part of 32-bit PNG images as black when displayed inside an iframe and the 3D scale is very small and doesn't change sufficiently enough between renders (like if you use a Power4.easeInOut to scale from 0 to 1 where the beginning values only change a tiny amount to begin the tween before accelerating). In this case, we force the scale to be 0.00002 instead which is visually the same but works around the Firefox issue.
					min = 0.0001;
					if (sx < min && sx > -min) {
						sx = sz = 0.00002;
					}
					if (sy < min && sy > -min) {
						sy = sz = 0.00002;
					}
					if (perspective && !t.z && !t.rotationX && !t.rotationY) { //Firefox has a bug that causes elements to have an odd super-thin, broken/dotted black border on elements that have a perspective set but aren't utilizing 3D space (no rotationX, rotationY, or z).
						perspective = 0;
					}
				}
				if (angle || skewX) {
					angle *= _DEG2RAD;
					cos = a11 = Math.cos(angle);
					sin = a21 = Math.sin(angle);
					if (skewX) {
						angle -= skewX * _DEG2RAD;
						cos = Math.cos(angle);
						sin = Math.sin(angle);
						if (t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan((skewX - skewY) * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							cos *= t1;
							sin *= t1;
							if (t.skewY) {
								t1 = Math.tan(skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
					}
					a12 = -sin;
					a22 = cos;

				} else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) { //if we're only translating and/or 2D scaling, this is faster...
					style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z +"px)" + ((sx !== 1 || sy !== 1) ? " scale(" + sx + "," + sy + ")" : "");
					return;
				} else {
					a11 = a22 = 1;
					a12 = a21 = 0;
				}
				// KEY  INDEX   AFFECTS a[row][column]
				// a11  0       rotation, rotationY, scaleX
				// a21  1       rotation, rotationY, scaleX
				// a31  2       rotationY, scaleX
				// a41  3       rotationY, scaleX
				// a12  4       rotation, skewX, rotationX, scaleY
				// a22  5       rotation, skewX, rotationX, scaleY
				// a32  6       rotationX, scaleY
				// a42  7       rotationX, scaleY
				// a13  8       rotationY, rotationX, scaleZ
				// a23  9       rotationY, rotationX, scaleZ
				// a33  10      rotationY, rotationX, scaleZ
				// a43  11      rotationY, rotationX, perspective, scaleZ
				// a14  12      x, zOrigin, svgOrigin
				// a24  13      y, zOrigin, svgOrigin
				// a34  14      z, zOrigin
				// a44  15
				// rotation: Math.atan2(a21, a11)
				// rotationY: Math.atan2(a13, a33) (or Math.atan2(a13, a11))
				// rotationX: Math.atan2(a32, a33)
				a33 = 1;
				a13 = a23 = a31 = a32 = a41 = a42 = 0;
				a43 = (perspective) ? -1 / perspective : 0;
				zOrigin = t.zOrigin;
				min = 0.000001; //threshold below which browsers use scientific notation which won't work.
				comma = ",";
				zero = "0";
				angle = rotationY * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					a31 = -sin;
					a41 = a43*-sin;
					a13 = a11*sin;
					a23 = a21*sin;
					a33 = cos;
					a43 *= cos;
					a11 *= cos;
					a21 *= cos;
				}
				angle = rotationX * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a12*cos+a13*sin;
					t2 = a22*cos+a23*sin;
					a32 = a33*sin;
					a42 = a43*sin;
					a13 = a12*-sin+a13*cos;
					a23 = a22*-sin+a23*cos;
					a33 = a33*cos;
					a43 = a43*cos;
					a12 = t1;
					a22 = t2;
				}
				if (sz !== 1) {
					a13*=sz;
					a23*=sz;
					a33*=sz;
					a43*=sz;
				}
				if (sy !== 1) {
					a12*=sy;
					a22*=sy;
					a32*=sy;
					a42*=sy;
				}
				if (sx !== 1) {
					a11*=sx;
					a21*=sx;
					a31*=sx;
					a41*=sx;
				}

				if (zOrigin || isSVG) {
					if (zOrigin) {
						x += a13*-zOrigin;
						y += a23*-zOrigin;
						z += a33*-zOrigin+zOrigin;
					}
					if (isSVG) { //due to bugs in some browsers, we need to manage the transform-origin of SVG manually
						x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
						y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
					}
					if (x < min && x > -min) {
						x = zero;
					}
					if (y < min && y > -min) {
						y = zero;
					}
					if (z < min && z > -min) {
						z = 0; //don't use string because we calculate perspective later and need the number.
					}
				}

				//optimized way of concatenating all the values into a string. If we do it all in one shot, it's slower because of the way browsers have to create temp strings and the way it affects memory. If we do it piece-by-piece with +=, it's a bit slower too. We found that doing it in these sized chunks works best overall:
				transform = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(");
				transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
				transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
				if (rotationX || rotationY || sz !== 1) { //performance optimization (often there's no rotationX or rotationY, so we can skip these calculations)
					transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
					transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
				} else {
					transform += ",0,0,0,0,1,0,";
				}
				transform += x + comma + y + comma + z + comma + (perspective ? (1 + (-z / perspective)) : 1) + ")";

				style[_transformProp] = transform;
			};

		p = Transform.prototype;
		p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
		p.scaleX = p.scaleY = p.scaleZ = 1;

		_registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {parser:function(t, e, parsingProp, cssp, pt, plugin, vars) {
			if (cssp._lastParsedTransform === vars) { return pt; } //only need to parse the transform once, and only if the browser supports it.
			cssp._lastParsedTransform = vars;
			var scaleFunc = (vars.scale && typeof(vars.scale) === "function") ? vars.scale : 0, //if there's a function-based "scale" value, swap in the resulting numeric value temporarily. Otherwise, if it's called for both scaleX and scaleY independently, they may not match (like if the function uses Math.random()).
				swapFunc;
			if (typeof(vars[parsingProp]) === "function") { //whatever property triggers the initial parsing might be a function-based value in which case it already got called in parse(), thus we don't want to call it again in here. The most efficient way to avoid this is to temporarily swap the value directly into the vars object, and then after we do all our parsing in this function, we'll swap it back again.
				swapFunc = vars[parsingProp];
				vars[parsingProp] = e;
			}
			if (scaleFunc) {
				vars.scale = scaleFunc(_index, t);
			}
			var originalGSTransform = t._gsTransform,
				style = t.style,
				min = 0.000001,
				i = _transformProps.length,
				v = vars,
				endRotations = {},
				transformOriginString = "transformOrigin",
				m1 = _getTransform(t, _cs, true, v.parseTransform),
				orig = v.transform && ((typeof(v.transform) === "function") ? v.transform(_index, _target) : v.transform),
				m2, copy, has3D, hasChange, dr, x, y, matrix, p;
			m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;
			cssp._transform = m1;
			if (orig && typeof(orig) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
				copy = _tempDiv.style; //don't use the original target because it might be SVG in which case some browsers don't report computed style correctly.
				copy[_transformProp] = orig;
				copy.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.
				copy.position = "absolute";
				if (orig.indexOf("%") !== -1) { //%-based translations will fail unless we set the width/height to match the original target...
					copy.width = _getStyle(t, "width");
					copy.height = _getStyle(t, "height");
				}
				_doc.body.appendChild(_tempDiv);
				m2 = _getTransform(_tempDiv, null, false);
				if (m1.skewType === "simple") { //the default _getTransform() reports the skewX/scaleY as if skewType is "compensated", thus we need to adjust that here if skewType is "simple".
					m2.scaleY *= Math.cos(m2.skewX * _DEG2RAD);
				}
				if (m1.svg) { //if it's an SVG element, x/y part of the matrix will be affected by whatever we use as the origin and the offsets, so compensate here...
					x = m1.xOrigin;
					y = m1.yOrigin;
					m2.x -= m1.xOffset;
					m2.y -= m1.yOffset;
					if (v.transformOrigin || v.svgOrigin) { //if this tween is altering the origin, we must factor that in here. The actual work of recording the transformOrigin values and setting up the PropTween is done later (still inside this function) so we cannot leave the changes intact here - we only want to update the x/y accordingly.
						orig = {};
						_parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, true);
						x = orig.xOrigin;
						y = orig.yOrigin;
						m2.x -= orig.xOffset - m1.xOffset;
						m2.y -= orig.yOffset - m1.yOffset;
					}
					if (x || y) {
						matrix = _getMatrix(_tempDiv, true);
						m2.x -= x - (x * matrix[0] + y * matrix[2]);
						m2.y -= y - (x * matrix[1] + y * matrix[3]);
					}
				}
				_doc.body.removeChild(_tempDiv);
				if (!m2.perspective) {
					m2.perspective = m1.perspective; //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
				}
				if (v.xPercent != null) {
					m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
				}
				if (v.yPercent != null) {
					m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
				}
			} else if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
				m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
					scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
					scaleZ:_parseVal(v.scaleZ, m1.scaleZ),
					x:_parseVal(v.x, m1.x),
					y:_parseVal(v.y, m1.y),
					z:_parseVal(v.z, m1.z),
					xPercent:_parseVal(v.xPercent, m1.xPercent),
					yPercent:_parseVal(v.yPercent, m1.yPercent),
					perspective:_parseVal(v.transformPerspective, m1.perspective)};
				dr = v.directionalRotation;
				if (dr != null) {
					if (typeof(dr) === "object") {
						for (copy in dr) {
							v[copy] = dr[copy];
						}
					} else {
						v.rotation = dr;
					}
				}
				if (typeof(v.x) === "string" && v.x.indexOf("%") !== -1) {
					m2.x = 0;
					m2.xPercent = _parseVal(v.x, m1.xPercent);
				}
				if (typeof(v.y) === "string" && v.y.indexOf("%") !== -1) {
					m2.y = 0;
					m2.yPercent = _parseVal(v.y, m1.yPercent);
				}

				m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : ("rotationZ" in v) ? v.rotationZ : m1.rotation, m1.rotation, "rotation", endRotations);
				if (_supports3D) {
					m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
					m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
				}
				m2.skewX = _parseAngle(v.skewX, m1.skewX);
				m2.skewY = _parseAngle(v.skewY, m1.skewY);
			}
			if (_supports3D && v.force3D != null) {
				m1.force3D = v.force3D;
				hasChange = true;
			}

			has3D = (m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
			if (!has3D && v.scale != null) {
				m2.scaleZ = 1; //no need to tween scaleZ.
			}

			while (--i > -1) {
				p = _transformProps[i];
				orig = m2[p] - m1[p];
				if (orig > min || orig < -min || v[p] != null || _forcePT[p] != null) {
					hasChange = true;
					pt = new CSSPropTween(m1, p, m1[p], orig, pt);
					if (p in endRotations) {
						pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
					}
					pt.xs0 = 0; //ensures the value stays numeric in setRatio()
					pt.plugin = plugin;
					cssp._overwriteProps.push(pt.n);
				}
			}

			orig = v.transformOrigin;
			if (m1.svg && (orig || v.svgOrigin)) {
				x = m1.xOffset; //when we change the origin, in order to prevent things from jumping we adjust the x/y so we must record those here so that we can create PropTweens for them and flip them at the same time as the origin
				y = m1.yOffset;
				_parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);
				pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString); //note: if there wasn't a transformOrigin defined yet, just start with the destination one; it's wasteful otherwise, and it causes problems with fromTo() tweens. For example, TweenLite.to("#wheel", 3, {rotation:180, transformOrigin:"50% 50%", delay:1}); TweenLite.fromTo("#wheel", 3, {scale:0.5, transformOrigin:"50% 50%"}, {scale:1, delay:2}); would cause a jump when the from values revert at the beginning of the 2nd tween.
				pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);
				if (x !== m1.xOffset || y !== m1.yOffset) {
					pt = _addNonTweeningNumericPT(m1, "xOffset", (originalGSTransform ? x : m1.xOffset), m1.xOffset, pt, transformOriginString);
					pt = _addNonTweeningNumericPT(m1, "yOffset", (originalGSTransform ? y : m1.yOffset), m1.yOffset, pt, transformOriginString);
				}
				orig = "0px 0px"; //certain browsers (like firefox) completely botch transform-origin, so we must remove it to prevent it from contaminating transforms. We manage it ourselves with xOrigin and yOrigin
			}
			if (orig || (_supports3D && has3D && m1.zOrigin)) { //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
				if (_transformProp) {
					hasChange = true;
					p = _transformOriginProp;
					orig = (orig || _getStyle(t, p, _cs, false, "50% 50%")) + ""; //cast as string to avoid errors
					pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
					pt.b = style[p];
					pt.plugin = plugin;
					if (_supports3D) {
						copy = m1.zOrigin;
						orig = orig.split(" ");
						m1.zOrigin = ((orig.length > 2 && !(copy !== 0 && orig[2] === "0px")) ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.
						pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!
						pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)
						pt.b = copy;
						pt.xs0 = pt.e = m1.zOrigin;
					} else {
						pt.xs0 = pt.e = orig;
					}

					//for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).
				} else {
					_parsePosition(orig + "", m1);
				}
			}
			if (hasChange) {
				cssp._transformType = (!(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3)) ? 3 : 2; //quicker than calling cssp._enableTransforms();
			}
			if (swapFunc) {
				vars[parsingProp] = swapFunc;
			}
			if (scaleFunc) {
				vars.scale = scaleFunc;
			}
			return pt;
		}, prefix:true});

		_registerComplexSpecialProp("boxShadow", {defaultValue:"0px 0px 0px 0px #999", prefix:true, color:true, multi:true, keyword:"inset"});

		_registerComplexSpecialProp("borderRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			e = this.format(e);
			var props = ["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
				style = t.style,
				ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
			w = parseFloat(t.offsetWidth);
			h = parseFloat(t.offsetHeight);
			ea1 = e.split(" ");
			for (i = 0; i < props.length; i++) { //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
				if (this.p.indexOf("border")) { //older browsers used a prefix
					props[i] = _checkPropPrefix(props[i]);
				}
				bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
				if (bs.indexOf(" ") !== -1) {
					bs2 = bs.split(" ");
					bs = bs2[0];
					bs2 = bs2[1];
				}
				es = es2 = ea1[i];
				bn = parseFloat(bs);
				bsfx = bs.substr((bn + "").length);
				rel = (es.charAt(1) === "=");
				if (rel) {
					en = parseInt(es.charAt(0)+"1", 10);
					es = es.substr(2);
					en *= parseFloat(es);
					esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
				} else {
					en = parseFloat(es);
					esfx = es.substr((en + "").length);
				}
				if (esfx === "") {
					esfx = _suffixMap[p] || bsfx;
				}
				if (esfx !== bsfx) {
					hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.
					vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number
					if (esfx === "%") {
						bs = (hn / w * 100) + "%";
						bs2 = (vn / h * 100) + "%";
					} else if (esfx === "em") {
						em = _convertToPixels(t, "borderLeft", 1, "em");
						bs = (hn / em) + "em";
						bs2 = (vn / em) + "em";
					} else {
						bs = hn + "px";
						bs2 = vn + "px";
					}
					if (rel) {
						es = (parseFloat(bs) + en) + esfx;
						es2 = (parseFloat(bs2) + en) + esfx;
					}
				}
				pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
			}
			return pt;
		}, prefix:true, formatter:_getFormatter("0px 0px 0px 0px", false, true)});
		_registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, false, "0px 0px")), this.format(e), false, "0px", pt);
		}, prefix:true, formatter:_getFormatter("0px 0px", false, true)});
		_registerComplexSpecialProp("backgroundPosition", {defaultValue:"0 0", parser:function(t, e, p, cssp, pt, plugin) {
			var bp = "background-position",
				cs = (_cs || _getComputedStyle(t, null)),
				bs = this.format( ((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
				es = this.format(e),
				ba, ea, i, pct, overlap, src;
			if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1) && es.split(",").length < 2) {
				src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
				if (src && src !== "none") {
					ba = bs.split(" ");
					ea = es.split(" ");
					_tempImg.setAttribute("src", src); //set the temp IMG's src to the background-image so that we can measure its width/height
					i = 2;
					while (--i > -1) {
						bs = ba[i];
						pct = (bs.indexOf("%") !== -1);
						if (pct !== (ea[i].indexOf("%") !== -1)) {
							overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
							ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%";
						}
					}
					bs = ba.join(" ");
				}
			}
			return this.parseComplex(t.style, bs, es, pt, plugin);
		}, formatter:_parsePosition});
		_registerComplexSpecialProp("backgroundSize", {defaultValue:"0 0", formatter:function(v) {
			v += ""; //ensure it's a string
			return (v.substr(0,2) === "co") ? v : _parsePosition(v.indexOf(" ") === -1 ? v + " " + v : v); //if set to something like "100% 100%", Safari typically reports the computed style as just "100%" (no 2nd value), but we should ensure that there are two values, so copy the first one. Otherwise, it'd be interpreted as "100% 0" (wrong). Also remember that it could be "cover" or "contain" which we can't tween but should be able to set.
		}});
		_registerComplexSpecialProp("perspective", {defaultValue:"0px", prefix:true});
		_registerComplexSpecialProp("perspectiveOrigin", {defaultValue:"50% 50%", prefix:true});
		_registerComplexSpecialProp("transformStyle", {prefix:true});
		_registerComplexSpecialProp("backfaceVisibility", {prefix:true});
		_registerComplexSpecialProp("userSelect", {prefix:true});
		_registerComplexSpecialProp("margin", {parser:_getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")});
		_registerComplexSpecialProp("padding", {parser:_getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")});
		_registerComplexSpecialProp("clip", {defaultValue:"rect(0px,0px,0px,0px)", parser:function(t, e, p, cssp, pt, plugin){
			var b, cs, delim;
			if (_ieVers < 9) { //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
				cs = t.currentStyle;
				delim = _ieVers < 8 ? " " : ",";
				b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
				e = this.format(e).split(",").join(delim);
			} else {
				b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
				e = this.format(e);
			}
			return this.parseComplex(t.style, b, e, pt, plugin);
		}});
		_registerComplexSpecialProp("textShadow", {defaultValue:"0px 0px 0px #999", color:true, multi:true});
		_registerComplexSpecialProp("autoRound,strictUnits", {parser:function(t, e, p, cssp, pt) {return pt;}}); //just so that we can ignore these properties (not tween them)
		_registerComplexSpecialProp("border", {defaultValue:"0px solid #000", parser:function(t, e, p, cssp, pt, plugin) {
			var bw = _getStyle(t, "borderTopWidth", _cs, false, "0px"),
				end = this.format(e).split(" "),
				esfx = end[0].replace(_suffixExp, "");
			if (esfx !== "px") { //if we're animating to a non-px value, we need to convert the beginning width to that unit.
				bw = (parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx)) + esfx;
			}
			return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), end.join(" "), pt, plugin);
			}, color:true, formatter:function(v) {
				var a = v.split(" ");
				return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
			}});
		_registerComplexSpecialProp("borderWidth", {parser:_getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}); //Firefox doesn't pick up on borderWidth set in style sheets (only inline).
		_registerComplexSpecialProp("float,cssFloat,styleFloat", {parser:function(t, e, p, cssp, pt, plugin) {
			var s = t.style,
				prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
			return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
		}});

		//opacity-related
		var _setIEOpacityRatio = function(v) {
				var t = this.t, //refers to the element's style property
					filters = t.filter || _getStyle(this.data, "filter") || "",
					val = (this.s + this.c * v) | 0,
					skip;
				if (val === 100) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
					if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
						t.removeAttribute("filter");
						skip = (!_getStyle(this.data, "filter")); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
					} else {
						t.filter = filters.replace(_alphaFilterExp, "");
						skip = true;
					}
				}
				if (!skip) {
					if (this.xn1) {
						t.filter = filters = filters || ("alpha(opacity=" + val + ")"); //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
					}
					if (filters.indexOf("pacity") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8). We omit the "O" to avoid case-sensitivity issues
						if (val !== 0 || !this.xn1) { //bugs in IE7/8 won't render the filter properly if opacity is ADDED on the same frame/render as "visibility" changes (this.xn1 is 1 if this tween is an "autoAlpha" tween)
							t.filter = filters + " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
						}
					} else {
						t.filter = filters.replace(_opacityExp, "opacity=" + val);
					}
				}
			};
		_registerComplexSpecialProp("opacity,alpha,autoAlpha", {defaultValue:"1", parser:function(t, e, p, cssp, pt, plugin) {
			var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
				style = t.style,
				isAutoAlpha = (p === "autoAlpha");
			if (typeof(e) === "string" && e.charAt(1) === "=") {
				e = ((e.charAt(0) === "-") ? -1 : 1) * parseFloat(e.substr(2)) + b;
			}
			if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) { //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
				b = 0;
			}
			if (_supportsOpacity) {
				pt = new CSSPropTween(style, "opacity", b, e - b, pt);
			} else {
				pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
				pt.xn1 = isAutoAlpha ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
				style.zoom = 1; //helps correct an IE issue.
				pt.type = 2;
				pt.b = "alpha(opacity=" + pt.s + ")";
				pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
				pt.data = t;
				pt.plugin = plugin;
				pt.setRatio = _setIEOpacityRatio;
			}
			if (isAutoAlpha) { //we have to create the "visibility" PropTween after the opacity one in the linked list so that they run in the order that works properly in IE8 and earlier
				pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, ((b !== 0) ? "inherit" : "hidden"), ((e === 0) ? "hidden" : "inherit"));
				pt.xs0 = "inherit";
				cssp._overwriteProps.push(pt.n);
				cssp._overwriteProps.push(p);
			}
			return pt;
		}});


		var _removeProp = function(s, p) {
				if (p) {
					if (s.removeProperty) {
						if (p.substr(0,2) === "ms" || p.substr(0,6) === "webkit") { //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
							p = "-" + p;
						}
						s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
					} else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
						s.removeAttribute(p);
					}
				}
			},
			_setClassNameRatio = function(v) {
				this.t._gsClassPT = this;
				if (v === 1 || v === 0) {
					this.t.setAttribute("class", (v === 0) ? this.b : this.e);
					var mpt = this.data, //first MiniPropTween
						s = this.t.style;
					while (mpt) {
						if (!mpt.v) {
							_removeProp(s, mpt.p);
						} else {
							s[mpt.p] = mpt.v;
						}
						mpt = mpt._next;
					}
					if (v === 1 && this.t._gsClassPT === this) {
						this.t._gsClassPT = null;
					}
				} else if (this.t.getAttribute("class") !== this.e) {
					this.t.setAttribute("class", this.e);
				}
			};
		_registerComplexSpecialProp("className", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			var b = t.getAttribute("class") || "", //don't use t.className because it doesn't work consistently on SVG elements; getAttribute("class") and setAttribute("class", value") is more reliable.
				cssText = t.style.cssText,
				difData, bs, cnpt, cnptLookup, mpt;
			pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClassNameRatio;
			pt.pr = -11;
			_hasPriority = true;
			pt.b = b;
			bs = _getAllStyles(t, _cs);
			//if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)
			cnpt = t._gsClassPT;
			if (cnpt) {
				cnptLookup = {};
				mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.
				while (mpt) {
					cnptLookup[mpt.p] = 1;
					mpt = mpt._next;
				}
				cnpt.setRatio(1);
			}
			t._gsClassPT = pt;
			pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
			t.setAttribute("class", pt.e);
			difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
			t.setAttribute("class", b);
			pt.data = difData.firstMPT;
			t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
			pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)
			return pt;
		}});


		var _setClearPropsRatio = function(v) {
			if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") { //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that and if the tween is the zero-duration one that's created internally to render the starting values in a from() tween, ignore that because otherwise, for example, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in).
				var s = this.t.style,
					transformParse = _specialProps.transform.parse,
					a, p, i, clearTransform, transform;
				if (this.e === "all") {
					s.cssText = "";
					clearTransform = true;
				} else {
					a = this.e.split(" ").join("").split(",");
					i = a.length;
					while (--i > -1) {
						p = a[i];
						if (_specialProps[p]) {
							if (_specialProps[p].parse === transformParse) {
								clearTransform = true;
							} else {
								p = (p === "transformOrigin") ? _transformOriginProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
							}
						}
						_removeProp(s, p);
					}
				}
				if (clearTransform) {
					_removeProp(s, _transformProp);
					transform = this.t._gsTransform;
					if (transform) {
						if (transform.svg) {
							this.t.removeAttribute("data-svg-origin");
							this.t.removeAttribute("transform");
						}
						delete this.t._gsTransform;
					}
				}

			}
		};
		_registerComplexSpecialProp("clearProps", {parser:function(t, e, p, cssp, pt) {
			pt = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClearPropsRatio;
			pt.e = e;
			pt.pr = -10;
			pt.data = cssp._tween;
			_hasPriority = true;
			return pt;
		}});

		p = "bezier,throwProps,physicsProps,physics2D".split(",");
		i = p.length;
		while (i--) {
			_registerPluginProp(p[i]);
		}








		p = CSSPlugin.prototype;
		p._firstPT = p._lastParsedTransform = p._transform = null;

		//gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
		p._onInitTween = function(target, vars, tween, index) {
			if (!target.nodeType) { //css is only for dom elements
				return false;
			}
			this._target = _target = target;
			this._tween = tween;
			this._vars = vars;
			_index = index;
			_autoRound = vars.autoRound;
			_hasPriority = false;
			_suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
			_cs = _getComputedStyle(target, "");
			_overwriteProps = this._overwriteProps;
			var style = target.style,
				v, pt, pt2, first, last, next, zIndex, tpt, threeD;
			if (_reqSafariFix) if (style.zIndex === "") {
				v = _getStyle(target, "zIndex", _cs);
				if (v === "auto" || v === "") {
					//corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
					this._addLazySet(style, "zIndex", 0);
				}
			}

			if (typeof(vars) === "string") {
				first = style.cssText;
				v = _getAllStyles(target, _cs);
				style.cssText = first + ";" + vars;
				v = _cssDif(target, v, _getAllStyles(target)).difs;
				if (!_supportsOpacity && _opacityValExp.test(vars)) {
					v.opacity = parseFloat( RegExp.$1 );
				}
				vars = v;
				style.cssText = first;
			}

			if (vars.className) { //className tweens will combine any differences they find in the css with the vars that are passed in, so {className:"myClass", scale:0.5, left:20} would work.
				this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars);
			} else {
				this._firstPT = pt = this.parse(target, vars, null);
			}

			if (this._transformType) {
				threeD = (this._transformType === 3);
				if (!_transformProp) {
					style.zoom = 1; //helps correct an IE issue.
				} else if (_isSafari) {
					_reqSafariFix = true;
					//if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).
					if (style.zIndex === "") {
						zIndex = _getStyle(target, "zIndex", _cs);
						if (zIndex === "auto" || zIndex === "") {
							this._addLazySet(style, "zIndex", 0);
						}
					}
					//Setting WebkitBackfaceVisibility corrects 3 bugs:
					// 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
					// 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
					// 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
					//Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.
					if (_isSafariLT6) {
						this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
					}
				}
				pt2 = pt;
				while (pt2 && pt2._next) {
					pt2 = pt2._next;
				}
				tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
				this._linkCSSP(tpt, null, pt2);
				tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
				tpt.data = this._transform || _getTransform(target, _cs, true);
				tpt.tween = tween;
				tpt.pr = -1; //ensures that the transforms get applied after the components are updated.
				_overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.
			}

			if (_hasPriority) {
				//reorders the linked list in order of pr (priority)
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				this._firstPT = first;
			}
			return true;
		};


		p.parse = function(target, vars, pt, plugin) {
			var style = target.style,
				p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
			for (p in vars) {
				es = vars[p]; //ending value string
				if (typeof(es) === "function") {
					es = es(_index, _target);
				}
				sp = _specialProps[p]; //SpecialProp lookup.
				if (sp) {
					pt = sp.parse(target, es, p, this, pt, plugin, vars);
				} else if (p.substr(0,2) === "--") { //for tweening CSS variables (which always start with "--"). To maximize performance and simplicity, we bypass CSSPlugin altogether and just add a normal property tween to the tween instance itself.
					this._tween._propLookup[p] = this._addTween.call(this._tween, target.style, "setProperty", _getComputedStyle(target).getPropertyValue(p) + "", es + "", p, false, p);
					continue;
				} else {
					bs = _getStyle(target, p, _cs) + "";
					isStr = (typeof(es) === "string");
					if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
						if (!isStr) {
							es = _parseColor(es);
							es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")";
						}
						pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);

					} else if (isStr && _complexExp.test(es)) {
						pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);

					} else {
						bn = parseFloat(bs);
						bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

						if (bs === "" || bs === "auto") {
							if (p === "width" || p === "height") {
								bn = _getDimension(target, p, _cs);
								bsfx = "px";
							} else if (p === "left" || p === "top") {
								bn = _calculateOffset(target, p, _cs);
								bsfx = "px";
							} else {
								bn = (p !== "opacity") ? 0 : 1;
								bsfx = "";
							}
						}

						rel = (isStr && es.charAt(1) === "=");
						if (rel) {
							en = parseInt(es.charAt(0) + "1", 10);
							es = es.substr(2);
							en *= parseFloat(es);
							esfx = es.replace(_suffixExp, "");
						} else {
							en = parseFloat(es);
							esfx = isStr ? es.replace(_suffixExp, "") : "";
						}

						if (esfx === "") {
							esfx = (p in _suffixMap) ? _suffixMap[p] : bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
						}

						es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.
						//if the beginning/ending suffixes don't match, normalize them...
						if (bsfx !== esfx) if (esfx !== "" || p === "lineHeight") if (en || en === 0) if (bn) { //note: if the beginning value (bn) is 0, we don't need to convert units!
							bn = _convertToPixels(target, p, bn, bsfx);
							if (esfx === "%") {
								bn /= _convertToPixels(target, p, 100, "%") / 100;
								if (vars.strictUnits !== true) { //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
									bs = bn + "%";
								}

							} else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
								bn /= _convertToPixels(target, p, 1, esfx);

							//otherwise convert to pixels.
							} else if (esfx !== "px") {
								en = _convertToPixels(target, p, en, esfx);
								esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
							}
							if (rel) if (en || en === 0) {
								es = (en + bn) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
							}
						}

						if (rel) {
							en += bn;
						}

						if ((bn || bn === 0) && (en || en === 0)) { //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
							pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, (_autoRound !== false && (esfx === "px" || p === "zIndex")), 0, bs, es);
							pt.xs0 = esfx;
							//DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
						} else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
							_log("invalid " + p + " tween value: " + vars[p]);
						} else {
							pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
							pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
							//DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
						}
					}
				}
				if (plugin) if (pt && !pt.plugin) {
					pt.plugin = plugin;
				}
			}
			return pt;
		};


		//gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val, str, i;
			//at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).
			if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
				while (pt) {
					if (pt.type !== 2) {
						if (pt.r && pt.type !== -1) {
							val = pt.r(pt.s + pt.c);
							if (!pt.type) {
								pt.t[pt.p] = val + pt.xs0;
							} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
								i = pt.l;
								str = pt.xs0 + val + pt.xs1;
								for (i = 1; i < pt.l; i++) {
									str += pt["xn"+i] + pt["xs"+(i+1)];
								}
								pt.t[pt.p] = str;
							}
						} else {
							pt.t[pt.p] = pt.e;
						}
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			} else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = pt.r(val);
					} else if (val < min) if (val > -min) {
						val = 0;
					}
					if (!pt.type) {
						pt.t[pt.p] = val + pt.xs0;
					} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
						i = pt.l;
						if (i === 2) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
						} else if (i === 3) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
						} else if (i === 4) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
						} else if (i === 5) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
						} else {
							str = pt.xs0 + val + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.t[pt.p] = str;
						}

					} else if (pt.type === -1) { //non-tweening value
						pt.t[pt.p] = pt.xs0;

					} else if (pt.setRatio) { //custom setRatio() for things like SpecialProps, external plugins, etc.
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			//if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
			} else {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.b;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}
			}
		};

		/**
		 * @private
		 * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
		 * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
		 * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
		 * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
		 * doesn't have any transform-related properties of its own. You can call this method as many times as you
		 * want and it won't create duplicate CSSPropTweens.
		 *
		 * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
		 */
		p._enableTransforms = function(threeD) {
			this._transform = this._transform || _getTransform(this._target, _cs, true); //ensures that the element has a _gsTransform property with the appropriate values.
			this._transformType = (!(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3)) ? 3 : 2;
		};

		var lazySet = function(v) {
			this.t[this.p] = this.e;
			this.data._linkCSSP(this, this._next, null, true); //we purposefully keep this._next even though it'd make sense to null it, but this is a performance optimization, as this happens during the while (pt) {} loop in setRatio() at the bottom of which it sets pt = pt._next, so if we null it, the linked list will be broken in that loop.
		};
		/** @private Gives us a way to set a value on the first render (and only the first render). **/
		p._addLazySet = function(t, p, v) {
			var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
			pt.e = v;
			pt.setRatio = lazySet;
			pt.data = this;
		};

		/** @private **/
		p._linkCSSP = function(pt, next, prev, remove) {
			if (pt) {
				if (next) {
					next._prev = pt;
				}
				if (pt._next) {
					pt._next._prev = pt._prev;
				}
				if (pt._prev) {
					pt._prev._next = pt._next;
				} else if (this._firstPT === pt) {
					this._firstPT = pt._next;
					remove = true; //just to prevent resetting this._firstPT 5 lines down in case pt._next is null. (optimized for speed)
				}
				if (prev) {
					prev._next = pt;
				} else if (!remove && this._firstPT === null) {
					this._firstPT = pt;
				}
				pt._next = next;
				pt._prev = prev;
			}
			return pt;
		};

		p._mod = function(lookup) {
			var pt = this._firstPT;
			while (pt) {
				if (typeof(lookup[pt.p]) === "function") { //only gets called by RoundPropsPlugin (ModifyPlugin manages all the rendering internally for CSSPlugin properties that need modification). Remember, we handle rounding a bit differently in this plugin for performance reasons, leveraging "r" as an indicator that the value should be rounded internally.
					pt.r = lookup[pt.p];
				}
				pt = pt._next;
			}
		};

		//we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
		p._kill = function(lookup) {
			var copy = lookup,
				pt, p, xfirst;
			if (lookup.autoAlpha || lookup.alpha) {
				copy = {};
				for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
					copy[p] = lookup[p];
				}
				copy.opacity = 1;
				if (copy.autoAlpha) {
					copy.visibility = 1;
				}
			}
			if (lookup.className && (pt = this._classNamePT)) { //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
				xfirst = pt.xfirst;
				if (xfirst && xfirst._prev) {
					this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev
				} else if (xfirst === this._firstPT) {
					this._firstPT = pt._next;
				}
				if (pt._next) {
					this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
				}
				this._classNamePT = null;
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.plugin && pt.plugin !== p && pt.plugin._kill) { //for plugins that are registered with CSSPlugin, we should notify them of the kill.
					pt.plugin._kill(lookup);
					p = pt.plugin;
				}
				pt = pt._next;
			}
			return TweenPlugin.prototype._kill.call(this, copy);
		};



		//used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.
		var _getChildStyles = function(e, props, targets) {
				var children, i, child, type;
				if (e.slice) {
					i = e.length;
					while (--i > -1) {
						_getChildStyles(e[i], props, targets);
					}
					return;
				}
				children = e.childNodes;
				i = children.length;
				while (--i > -1) {
					child = children[i];
					type = child.type;
					if (child.style) {
						props.push(_getAllStyles(child));
						if (targets) {
							targets.push(child);
						}
					}
					if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
						_getChildStyles(child, props, targets);
					}
				}
			};

		/**
		 * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
		 * and then compares the style properties of all the target's child elements at the tween's start and end, and
		 * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
		 * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
		 * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
		 * is because it creates entirely new tweens that may have completely different targets than the original tween,
		 * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
		 * and it would create other problems. For example:
		 *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
		 *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
		 *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
		 *
		 * @param {Object} target object to be tweened
		 * @param {number} Duration in seconds (or frames for frames-based tweens)
		 * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
		 * @return {Array} An array of TweenLite instances
		 */
		CSSPlugin.cascadeTo = function(target, duration, vars) {
			var tween = TweenLite.to(target, duration, vars),
				results = [tween],
				b = [],
				e = [],
				targets = [],
				_reservedProps = TweenLite._internals.reservedProps,
				i, difs, p, from;
			target = tween._targets || tween.target;
			_getChildStyles(target, b, targets);
			tween.render(duration, true, true);
			_getChildStyles(target, e);
			tween.render(0, true, true);
			tween._enabled(true);
			i = targets.length;
			while (--i > -1) {
				difs = _cssDif(targets[i], b[i], e[i]);
				if (difs.firstMPT) {
					difs = difs.difs;
					for (p in vars) {
						if (_reservedProps[p]) {
							difs[p] = vars[p];
						}
					}
					from = {};
					for (p in difs) {
						from[p] = b[i][p];
					}
					results.push(TweenLite.fromTo(targets[i], duration, from, difs));
				}
			}
			return results;
		};

		TweenPlugin.activate([CSSPlugin]);
		return CSSPlugin;

	}, true);

	
	
	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * RoundPropsPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var RoundPropsPlugin = _gsScope._gsDefine.plugin({
				propName: "roundProps",
				version: "1.7.0",
				priority: -1,
				API: 2,

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween) {
					this._tween = tween;
					return true;
				}

			}),
			_getRoundFunc = function(v) { //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
				var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1; //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed()
				return function(n) {
					return ((Math.round(n / v) * v * p) | 0) / p;
				};
			},
			_roundLinkedList = function(node, mod) {
				while (node) {
					if (!node.f && !node.blob) {
						node.m = mod || Math.round;
					}
					node = node._next;
				}
			},
			p = RoundPropsPlugin.prototype;

		p._onInitAllProps = function() {
			var tween = this._tween,
				rp = tween.vars.roundProps,
				lookup = {},
				rpt = tween._propLookup.roundProps,
				pt, next, i, p;
			if (typeof(rp) === "object" && !rp.push) {
				for (p in rp) {
					lookup[p] = _getRoundFunc(rp[p]);
				}
			} else {
				if (typeof(rp) === "string") {
					rp = rp.split(",");
				}
				i = rp.length;
				while (--i > -1) {
					lookup[rp[i]] = Math.round;
				}
			}

			for (p in lookup) {
				pt = tween._firstPT;
				while (pt) {
					next = pt._next; //record here, because it may get removed
					if (pt.pg) {
						pt.t._mod(lookup);
					} else if (pt.n === p) {
						if (pt.f === 2 && pt.t) { //a blob (text containing multiple numeric values)
							_roundLinkedList(pt.t._firstPT, lookup[p]);
						} else {
							this._add(pt.t, p, pt.s, pt.c, lookup[p]);
							//remove from linked list
							if (next) {
								next._prev = pt._prev;
							}
							if (pt._prev) {
								pt._prev._next = next;
							} else if (tween._firstPT === pt) {
								tween._firstPT = next;
							}
							pt._next = pt._prev = null;
							tween._propLookup[p] = rpt;
						}
					}
					pt = next;
				}
			}
			return false;
		};

		p._add = function(target, p, s, c, mod) {
			this._addTween(target, p, s, s + c, p, mod || Math.round);
			this._overwriteProps.push(p);
		};

	}());










/*
 * ----------------------------------------------------------------
 * AttrPlugin
 * ----------------------------------------------------------------
 */

	(function() {

		_gsScope._gsDefine.plugin({
			propName: "attr",
			API: 2,
			version: "0.6.1",

			//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
			init: function(target, value, tween, index) {
				var p, end;
				if (typeof(target.setAttribute) !== "function") {
					return false;
				}
				for (p in value) {
					end = value[p];
					if (typeof(end) === "function") {
						end = end(index, target);
					}
					this._addTween(target, "setAttribute", target.getAttribute(p) + "", end + "", p, false, p);
					this._overwriteProps.push(p);
				}
				return true;
			}

		});

	}());










/*
 * ----------------------------------------------------------------
 * DirectionalRotationPlugin
 * ----------------------------------------------------------------
 */
	_gsScope._gsDefine.plugin({
		propName: "directionalRotation",
		version: "0.3.1",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween, index) {
			if (typeof(value) !== "object") {
				value = {rotation:value};
			}
			this.finals = {};
			var cap = (value.useRadians === true) ? Math.PI * 2 : 360,
				min = 0.000001,
				p, v, start, end, dif, split;
			for (p in value) {
				if (p !== "useRadians") {
					end = value[p];
					if (typeof(end) === "function") {
						end = end(index, target);
					}
					split = (end + "").split("_");
					v = split[0];
					start = parseFloat( (typeof(target[p]) !== "function") ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() );
					end = this.finals[p] = (typeof(v) === "string" && v.charAt(1) === "=") ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
					dif = end - start;
					if (split.length) {
						v = split.join("_");
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					if (dif > min || dif < -min) {
						this._addTween(target, p, start, start + dif, p);
						this._overwriteProps.push(p);
					}
				}
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			var pt;
			if (ratio !== 1) {
				this._super.setRatio.call(this, ratio);
			} else {
				pt = this._firstPT;
				while (pt) {
					if (pt.f) {
						pt.t[pt.p](this.finals[pt.p]);
					} else {
						pt.t[pt.p] = this.finals[pt.p];
					}
					pt = pt._next;
				}
			}
		}

	})._autoCSS = true;







	
	
	
	
/*
 * ----------------------------------------------------------------
 * EasePack
 * ----------------------------------------------------------------
 */
	_gsScope._gsDefine("easing.Back", ["easing.Ease"], function(Ease) {
		
		var w = (_gsScope.GreenSockGlobals || _gsScope),
			gs = w.com.greensock,
			_2PI = Math.PI * 2,
			_HALF_PI = Math.PI / 2,
			_class = gs._class,
			_create = function(n, f) {
				var C = _class("easing." + n, function(){}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				return C;
			},
			_easeReg = Ease.register || function(){}, //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
			_wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
				var C = _class("easing."+name, {
					easeOut:new EaseOut(),
					easeIn:new EaseIn(),
					easeInOut:new EaseInOut()
				}, true);
				_easeReg(C, name);
				return C;
			},
			EasePoint = function(time, value, next) {
				this.t = time;
				this.v = value;
				if (next) {
					this.next = next;
					next.prev = this;
					this.c = next.v - value;
					this.gap = next.t - time;
				}
			},

			//Back
			_createBack = function(n, f) {
				var C = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new C(overshoot);
				};
				return C;
			},

			Back = _wrap("Back",
				_createBack("BackOut", function(p) {
					return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
				}),
				_createBack("BackIn", function(p) {
					return p * p * ((this._p1 + 1) * p - this._p1);
				}),
				_createBack("BackInOut", function(p) {
					return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
				})
			),


			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio !== 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode === true);
			}, true),
			p = SlowMo.prototype = new Ease(),
			SteppedEase, ExpoScaleEase, RoughEase, _createElastic;

		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? (p === 1 ? 0 : 1 - (p = (p - this._p3) / this._p1) * p) : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p); //added p === 1 ? 0 to avoid floating point rounding errors from affecting the final value, like 1 - 0.7 = 0.30000000000000004 instead of 0.3
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);

		p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};


		//SteppedEase
		SteppedEase = _class("easing.SteppedEase", function(steps, immediateStart) {
				steps = steps || 1;
				this._p1 = 1 / steps;
				this._p2 = steps + (immediateStart ? 0 : 1);
				this._p3 = immediateStart ? 1 : 0;
			}, true);
		p = SteppedEase.prototype = new Ease();
		p.constructor = SteppedEase;
		p.getRatio = function(p) {
			if (p < 0) {
				p = 0;
			} else if (p >= 1) {
				p = 0.999999999;
			}
			return (((this._p2 * p) | 0) + this._p3) * this._p1;
		};
		p.config = SteppedEase.config = function(steps, immediateStart) {
			return new SteppedEase(steps, immediateStart);
		};

		//ExpoScaleEase
		ExpoScaleEase = _class("easing.ExpoScaleEase", function(start, end, ease) {
			this._p1 = Math.log(end / start);
			this._p2 = end - start;
			this._p3 = start;
			this._ease = ease;
		}, true);
		p = ExpoScaleEase.prototype = new Ease();
		p.constructor = ExpoScaleEase;
		p.getRatio = function(p) {
			if (this._ease) {
				p = this._ease.getRatio(p);
			}
			return (this._p3 * Math.exp(this._p1 * p) - this._p3) / this._p2;
		};
		p.config = ExpoScaleEase.config = function(start, end, ease) {
			return new ExpoScaleEase(start, end, ease);
		};


		//RoughEase
		RoughEase = _class("easing.RoughEase", function(vars) {
			vars = vars || {};
			var taper = vars.taper || "none",
				a = [],
				cnt = 0,
				points = (vars.points || 20) | 0,
				i = points,
				randomize = (vars.randomize !== false),
				clamp = (vars.clamp === true),
				template = (vars.template instanceof Ease) ? vars.template : null,
				strength = (typeof(vars.strength) === "number") ? vars.strength * 0.4 : 0.4,
				x, y, bump, invX, obj, pnt;
			while (--i > -1) {
				x = randomize ? Math.random() : (1 / points) * i;
				y = template ? template.getRatio(x) : x;
				if (taper === "none") {
					bump = strength;
				} else if (taper === "out") {
					invX = 1 - x;
					bump = invX * invX * strength;
				} else if (taper === "in") {
					bump = x * x * strength;
				} else if (x < 0.5) {  //"both" (start)
					invX = x * 2;
					bump = invX * invX * 0.5 * strength;
				} else {				//"both" (end)
					invX = (1 - x) * 2;
					bump = invX * invX * 0.5 * strength;
				}
				if (randomize) {
					y += (Math.random() * bump) - (bump * 0.5);
				} else if (i % 2) {
					y += bump * 0.5;
				} else {
					y -= bump * 0.5;
				}
				if (clamp) {
					if (y > 1) {
						y = 1;
					} else if (y < 0) {
						y = 0;
					}
				}
				a[cnt++] = {x:x, y:y};
			}
			a.sort(function(a, b) {
				return a.x - b.x;
			});

			pnt = new EasePoint(1, 1, null);
			i = points;
			while (--i > -1) {
				obj = a[i];
				pnt = new EasePoint(obj.x, obj.y, pnt);
			}

			this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next);
		}, true);
		p = RoughEase.prototype = new Ease();
		p.constructor = RoughEase;
		p.getRatio = function(p) {
			var pnt = this._prev;
			if (p > pnt.t) {
				while (pnt.next && p >= pnt.t) {
					pnt = pnt.next;
				}
				pnt = pnt.prev;
			} else {
				while (pnt.prev && p <= pnt.t) {
					pnt = pnt.prev;
				}
			}
			this._prev = pnt;
			return (pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c);
		};
		p.config = function(vars) {
			return new RoughEase(vars);
		};
		RoughEase.ease = new RoughEase();


		//Bounce
		_wrap("Bounce",
			_create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				}
				return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
			}),
			_create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
				}
				return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
			}),
			_create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			})
		);


		//CIRC
		_wrap("Circ",
			_create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			_create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			_create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			})
		);


		//Elastic
		_createElastic = function(n, f, def) {
			var C = _class("easing." + n, function(amplitude, period) {
					this._p1 = (amplitude >= 1) ? amplitude : 1; //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
					this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
					this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
					this._p2 = _2PI / this._p2; //precalculate to optimize
				}, true),
				p = C.prototype = new Ease();
			p.constructor = C;
			p.getRatio = f;
			p.config = function(amplitude, period) {
				return new C(amplitude, period);
			};
			return C;
		};
		_wrap("Elastic",
			_createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * this._p2 ) + 1;
			}, 0.3),
			_createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2 ));
			}, 0.3),
			_createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * this._p2 ) * 0.5 + 1;
			}, 0.45)
		);


		//Expo
		_wrap("Expo",
			_create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			_create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			_create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			})
		);


		//Sine
		_wrap("Sine",
			_create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			_create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			_create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			})
		);

		_class("easing.EaseLookup", {
				find:function(s) {
					return Ease.map[s];
				}
			}, true);

		//register the non-standard eases
		_easeReg(w.SlowMo, "SlowMo", "ease,");
		_easeReg(RoughEase, "RoughEase", "ease,");
		_easeReg(SteppedEase, "SteppedEase", "ease,");

		return Back;
		
	}, true);


});

if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); } //necessary in case TweenLite was already loaded separately.











/*
 * ----------------------------------------------------------------
 * Base classes like TweenLite, SimpleTimeline, Ease, Ticker, etc.
 * ----------------------------------------------------------------
 */
(function(window, moduleName) {

		"use strict";
		var _exports = {},
			_doc = window.document,
			_globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
		if (_globals.TweenLite) {
			return _globals.TweenLite; //in case the core set of classes is already loaded, don't instantiate twice.
		}
		var _namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_tinyNum = 0.0000000001,
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++])) {}
				return b;
			},
			_emptyFunc = function() {},
			_isArray = (function() { //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
				var toString = Object.prototype.toString,
					array = toString.call([]);
				return function(obj) {
					return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
				};
			}()),
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/TweenMax.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/TweenMax.js"></script>
			 * <script>
			 *     gs.TweenLite.to(...); //would use v1.7
			 *     TweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (global) {
							_globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							if (typeof(module) !== "undefined" && module.exports) { //node
								if (ns === moduleName) {
									module.exports = _exports[moduleName] = cl;
									for (i in _exports) {
										cl[i] = _exports[i];
									}
								} else if (_exports[moduleName]) {
									_exports[moduleName][n] = cl;
								}
							} else if (true){ //AMD
								!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() { return cl; }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
							}
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
				return new Definition(ns, dependencies, func, global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				if (i > 1) {
					list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
				}
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener) {
						if (listener.up) {
							listener.c.call(listener.s || t, {type:type, target:t});
						} else {
							listener.c.call(listener.s || t);
						}
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();},
			_lastUpdate = _getTime();

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame) ? "auto" : false,
				_lagThreshold = 500,
				_adjustedLag = 33,
				_tickWord = "tick", //helps reduce gc burden
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					var elapsed = _getTime() - _lastUpdate,
						overlap, dispatch;
					if (elapsed > _lagThreshold) {
						_startTime += elapsed - _adjustedLag;
					}
					_lastUpdate += elapsed;
					_self.time = (_lastUpdate - _startTime) / 1000;
					overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						dispatch = true;
					}
					if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
						_id = _req(_tick);
					}
					if (dispatch) {
						_self.dispatchEvent(_tickWord);
					}
				};

			EventDispatcher.call(_self);
			_self.time = _self.frame = 0;
			_self.tick = function() {
				_tick(true);
			};

			_self.lagSmoothing = function(threshold, adjustedLag) {
				if (!arguments.length) { //if lagSmoothing() is called with no arguments, treat it like a getter that returns a boolean indicating if it's enabled or not. This is purposely undocumented and is for internal use.
					return (_lagThreshold < 1 / _tinyNum);
				}
				_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
			};

			_self.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			_self.wake = function(seamless) {
				if (_id !== null) {
					_self.sleep();
				} else if (seamless) {
					_startTime += -_lastUpdate + (_lastUpdate = _getTime());
				} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
					_lastUpdate = _getTime() - _lagThreshold + 5;
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			_self.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			_self.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF === "auto" && _self.frame < 5 && (_doc || {}).visibilityState !== "hidden") {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(vars.delay) || 0;
				this._timeScale = 1;
				this._active = (vars.immediateRender === true);
				this.data = vars.data;
				this._reversed = (vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;


		//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
		var _checkTimeout = function() {
				if (_tickerActive && _getTime() - _lastUpdate > 2000 && ((_doc || {}).visibilityState !== "hidden" || !_ticker.lagSmoothing())) { //note: if the tab is hidden, we should still wake if lagSmoothing has been disabled.
					_ticker.wake();
				}
				var t = setTimeout(_checkTimeout, 2000);
				if (t.unref) {
					// allows a node process to exit even if the timeout’s callback hasn't been invoked. Without it, the node process could hang as this function is called every two seconds.
					t.unref();
				}
			};
		_checkTimeout();


		p.play = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (atTime != null) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (from != null) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function(time, suppressEvents, force) {
			//stub - we override this method in subclasses.
		};

		p.invalidate = function() {
			this._time = this._totalTime = 0;
			this._initted = this._gc = false;
			this._rawPrevTime = -1;
			if (this._gc || !this.timeline) {
				this._enabled(true);
			}
			return this;
		};

		p.isActive = function() {
			var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.
				startTime = this._startTime,
				rawTime;
			return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - 0.0000001));
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = this.isActive();
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

		p._swapSelfInParams = function(params) {
			var i = params.length,
				copy = params.concat();
			while (--i > -1) {
				if (params[i] === "{self}") {
					copy[i] = this;
				}
			}
			return copy;
		};

		p._callback = function(type) {
			var v = this.vars,
				callback = v[type],
				params = v[type + "Params"],
				scope = v[type + "Scope"] || v.callbackScope || this,
				l = params ? params.length : 0;
			switch (l) { //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
				case 0: callback.call(scope); break;
				case 1: callback.call(scope, params[0]); break;
				case 2: callback.call(scope, params[0], params[1]); break;
				default: callback.apply(scope, params);
			}
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if ((type || "").substr(0,2) === "on") {
				var v = this.vars;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
					v[type + "Scope"] = scope;
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
					if (tl._timeline) {
						while (tl._timeline) {
							if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
								tl.totalTime(tl._totalTime, true);
							}
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time || this._duration === 0) {
					if (_lazyTweens.length) {
						_lazyRender();
					}
					this.render(time, suppressEvents, false);
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
						_lazyRender();
					}
				}
			}
			return this;
		};

		p.progress = p.totalProgress = function(value, suppressEvents) {
			var duration = this.duration();
			return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents);
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.endTime = function(includeRepeats) {
			return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			var pauseTime, t;
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				pauseTime = this._pauseTime;
				t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			t = this.timeline;
			while (t && t.timeline) { //must update the duration/totalDuration of all ancestor timelines immediately in case in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
				t._dirty = true;
				t.totalDuration();
				t = t.timeline;
			}
			return this;
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			var tl = this._timeline,
				raw, elapsed;
			if (value != this._paused) if (tl) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				raw = tl.rawTime();
				elapsed = raw - this._pauseTime;
				if (!value && tl.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = this.isActive();
				if (!value && elapsed !== 0 && this._initted && this.duration()) {
					raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
					this.render(raw, (raw === this._totalTime), true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = p._recent = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = this.rawTime() - (child._timeline.rawTime() - child._pauseTime);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			this._recent = child;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				tween._next = tween._prev = tween.timeline = null;
				if (tween === this._recent) {
					this._recent = this._last;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused && !tween._gc)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};

/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);
				this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(Math.min(0, -this._delay)); //in case delay is negative
				}
			}, true),
			_isSelector = function(v) {
				return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = p._lazy = false;

		TweenLite.version = "1.20.5";
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		TweenLite.autoSleep = 120;
		TweenLite.lagSmoothing = function(threshold, adjustedLag) {
			_ticker.lagSmoothing(threshold, adjustedLag);
		};

		TweenLite.selector = window.$ || window.jQuery || function(e) {
			var selector = window.$ || window.jQuery;
			if (selector) {
				TweenLite.selector = selector;
				return selector(e);
			}
			if (!_doc) { //in some dev environments (like Angular 6), GSAP gets loaded before the document is defined! So re-query it here if/when necessary.
				_doc = window.document;
			}
			return (!_doc) ? e : (_doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
		};

		var _lazyTweens = [],
			_lazyLookup = {},
			_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			_relExp = /[\+-]=-?[\.\d]/,
			//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
			_setRatio = function(v) {
				var pt = this._firstPT,
					min = 0.000001,
					val;
				while (pt) {
					val = !pt.blob ? pt.c * v + pt.s : (v === 1 && this.end != null) ? this.end : v ? this.join("") : this.start;
					if (pt.m) {
						val = pt.m.call(this._tween, val, this._target || pt.t, this._tween);
					} else if (val < min) if (val > -min && !pt.blob) { //prevents issues with converting very small numbers to strings in the browser
						val = 0;
					}
					if (!pt.f) {
						pt.t[pt.p] = val;
					} else if (pt.fp) {
						pt.t[pt.p](pt.fp, val);
					} else {
						pt.t[pt.p](val);
					}
					pt = pt._next;
				}
			},
			//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
			_blobDif = function(start, end, filter, pt) {
				var a = [],
					charIndex = 0,
					s = "",
					color = 0,
					startNums, endNums, num, i, l, nonNumbers, currentNum;
				a.start = start;
				a.end = end;
				start = a[0] = start + ""; //ensure values are strings
				end = a[1] = end + "";
				if (filter) {
					filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
					start = a[0];
					end = a[1];
				}
				a.length = 0;
				startNums = start.match(_numbersExp) || [];
				endNums = end.match(_numbersExp) || [];
				if (pt) {
					pt._next = null;
					pt.blob = 1;
					a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
				}
				l = endNums.length;
				for (i = 0; i < l; i++) {
					currentNum = endNums[i];
					nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex)-charIndex);
					s += (nonNumbers || !i) ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
					charIndex += nonNumbers.length;
					if (color) { //sense rgba() values and round them.
						color = (color + 1) % 5;
					} else if (nonNumbers.substr(-5) === "rgba(") {
						color = 1;
					}
					if (currentNum === startNums[i] || startNums.length <= i) {
						s += currentNum;
					} else {
						if (s) {
							a.push(s);
							s = "";
						}
						num = parseFloat(startNums[i]);
						a.push(num);
						a._firstPT = {_next: a._firstPT, t:a, p: a.length-1, s:num, c:((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0, f:0, m:(color && color < 4) ? Math.round : 0};
						//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
					}
					charIndex += currentNum.length;
				}
				s += end.substr(charIndex);
				if (s) {
					a.push(s);
				}
				a.setRatio = _setRatio;
				if (_relExp.test(end)) { //if the end string contains relative values, delete it so that on the final render (in _setRatio()), we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
					a.end = null;
				}
				return a;
			},
			//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
			_addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
				if (typeof(end) === "function") {
					end = end(index || 0, target);
				}
				var type = typeof(target[prop]),
					getterName = (type !== "function") ? "" : ((prop.indexOf("set") || typeof(target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3)),
					s = (start !== "get") ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
					isRelative = (typeof(end) === "string" && end.charAt(1) === "="),
					pt = {t:target, p:prop, s:s, f:(type === "function"), pg:0, n:overwriteProp || prop, m:(!mod ? 0 : (typeof(mod) === "function") ? mod : Math.round), pr:0, c:isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0},
					blob;

				if (typeof(s) !== "number" || (typeof(end) !== "number" && !isRelative)) {
					if (funcParam || isNaN(s) || (!isRelative && isNaN(end)) || typeof(s) === "boolean" || typeof(end) === "boolean") {
						//a blob (string that has multiple numbers in it)
						pt.fp = funcParam;
						blob = _blobDif(s, (isRelative ? (parseFloat(pt.s) + pt.c) + (pt.s + "").replace(/[0-9\-\.]/g, "") : end), stringFilter || TweenLite.defaultStringFilter, pt);
						pt = {t: blob, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: overwriteProp || prop, pr: 0, m: 0}; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
					} else {
						pt.s = parseFloat(s);
						if (!isRelative) {
							pt.c = (parseFloat(end) - pt.s) || 0;
						}
					}
				}
				if (pt.c) { //only add it to the linked list if there's a change.
					if ((pt._next = this._firstPT)) {
						pt._next._prev = pt;
					}
					this._firstPT = pt;
					return pt;
				}
			},
			_internals = TweenLite._internals = {isArray:_isArray, isSelector:_isSelector, lazyTweens:_lazyTweens, blobDif:_blobDif}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},
			_tweenLookup = _internals.tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1, callbackScope:1, stringFilter:1, id:1, yoyoEase:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
			_nextGCFrame = 30,
			_lazyRender = _internals.lazyRender = function() {
				var i = _lazyTweens.length,
					tween;
				_lazyLookup = {};
				while (--i > -1) {
					tween = _lazyTweens[i];
					if (tween && tween._lazy !== false) {
						tween.render(tween._lazy[0], tween._lazy[1], true);
						tween._lazy = false;
					}
				}
				_lazyTweens.length = 0;
			};

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

		Animation._updateRoot = TweenLite.render = function() {
				var i, a, p;
				if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
					_lazyRender();
				}
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (_lazyTweens.length) {
					_lazyRender();
				}
				if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
					_nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
				var func = overwrittenTween.vars.onOverwrite, r1, r2;
				if (func) {
					r1 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				func = TweenLite.onOverwrite;
				if (func) {
					r2 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				return (r1 !== false && r2 !== false);
			},
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) {
								if (curTween._kill(null, target, tween)) {
									changed = true;
								}
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + _tinyNum,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target, tween)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
						if (mode !== 2 && !_onOverwrite(curTween, tween)) {
							continue;
						}
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum;
			};


//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				immediate = !!v.immediateRender,
				ease = v.ease,
				i, initPlugins, pt, p, startVars, l;
			if (v.startAt) {
				if (this._startAt) {
					this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
					this._startAt.kill();
				}
				startVars = {};
				for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
					startVars[p] = v.startAt[p];
				}
				startVars.data = "isStart";
				startVars.overwrite = false;
				startVars.immediateRender = true;
				startVars.lazy = (immediate && v.lazy !== false);
				startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
				startVars.onUpdate = v.onUpdate;
				startVars.onUpdateParams = v.onUpdateParams;
				startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
				this._startAt = TweenLite.to(this.target || {}, 0, startVars);
				if (immediate) {
					if (this._time > 0) {
						this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					} else if (dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt.kill();
					this._startAt = null;
				} else {
					if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
						immediate = false;
					}
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
					pt.lazy = (immediate && v.lazy !== false);
					pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
					this._startAt = TweenLite.to(this.target, 0, pt);
					if (!immediate) {
						this._startAt._init(); //ensures that the initial values are recorded
						this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
						if (this.vars.immediateRender) {
							this._startAt = null;
						}
					} else if (this._time === 0) {
						return;
					}
				}
			}
			this._ease = ease = (!ease) ? TweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			if (v.easeParams instanceof Array && ease.config) {
				this._ease = ease.config.apply(ease, v.easeParams);
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				l = this._targets.length;
				for (i = 0; i < l; i++) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null), i) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
			}

			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
			var p, i, initPlugins, plugin, pt, v;
			if (target == null) {
				return false;
			}

			if (_lazyLookup[target._gsTweenID]) {
				_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
			}

			if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				v = this.vars[p];
				if (_reservedProps[p]) {
					if (v) if ((v instanceof Array) || (v.push && _isArray(v))) if (v.join("").indexOf("{self}") !== -1) {
						this.vars[p] = v = this._swapSelfInParams(v, this);
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					//m - mod           [function | 0]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:1, n:p, pg:1, pr:plugin._priority, m:0};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else {
					propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
				_lazyLookup[target._gsTweenID] = true;
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, rawPrevTime;
			if (time >= duration - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed ) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted || (this._startAt && this._startAt.progress())) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately. Also, we check progress() because if startAt has already rendered at its end, we should force a render at its beginning. Otherwise, if you put the playhead directly on top of where a fromTo({immediateRender:false}) starts, and then move it backwards, the from() won't revert its values.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / duration);
				}
			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) {
					this._time = this._totalTime = prevTime;
					this._rawPrevTime = prevRawPrevTime;
					_lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
				this._lazy = false;
			}
			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, true, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._time !== prevTime || isComplete || force) {
					this._callback("onUpdate");
				}
			}
			if (callback) if (!this._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
					this._startAt.render(time, true, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};

		p._kill = function(vars, target, overwritingTween) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				this._lazy = false;
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
				i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i], overwritingTween)) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
						for (p in killProps) {
							if (propLookup[p]) {
								if (!killed) {
									killed = [];
								}
								killed.push(p);
							}
						}
						if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
							return false;
						}
					}

					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (simultaneousOverwrite) { //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
								if (pt.f) {
									pt.t[pt.p](pt.s);
								} else {
									pt.t[pt.p] = pt.s;
								}
								changed = true;
							}
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
			this._notifyPluginsOfEnabled = this._active = this._lazy = false;
			this._propLookup = (this._targets) ? {} : [];
			Animation.prototype.invalidate.call(this);
			if (this.vars.immediateRender) {
				this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
				this.render(Math.min(0, -this._delay)); //in case delay is negative.
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----TweenLite static methods -----------------------------------------------------

		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};

		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenLite(target, duration, vars);
		};

		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenLite(target, duration, toVars);
		};

		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
		};

		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};

		TweenLite.getTweensOf = function(target, onlyActive) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
			var i, a, j, t;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else if (target._gsTweenID) {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc || (onlyActive && !a[i].isActive())) {
						a.splice(i, 1);
					}
				}
			}
			return a || [];
		};

		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
			if (typeof(onlyActive) === "object") {
				vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
				onlyActive = false;
			}
			var a = TweenLite.getTweensOf(target, onlyActive),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.19.0";
		TweenPlugin.API = 2;
		p._firstPT = null;
		p._addTween = _addPropTween;
		p.setRatio = _setRatio;

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._mod = p._roundProps = function(lookup) {
			var pt = this._firstPT,
				val;
			while (pt) {
				val = lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ]);
				if (val && typeof(val) === "function") { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					if (pt.f === 2) {
						pt.t._applyPT.m = val;
					} else {
						pt.m = val;
					}
				}
				pt = pt._next;
			}
		};

		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_mod", mod:"_mod", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: " + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})((typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window, "TweenMax");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 619:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  defaultIcon: __webpack_require__(1156),
  config: {
    1: { // 自研业务分析系统
      101: __webpack_require__(1157) // 手游弹弹堂
    },
    2: { // 海外发行分析系统
      1: __webpack_require__(1158), // 越南超级英雄
      2: __webpack_require__(1159), // 越南攻城掠地
      3: __webpack_require__(1160), // 泰国口袋3DS
      4: __webpack_require__(1161), // 越南口袋3DS
      5: __webpack_require__(1162), // 越南全民主公

      11: __webpack_require__(1163), // 泰国攻城掠地
      12: __webpack_require__(1164), // 港台口袋妖怪
      13: __webpack_require__(1165), // 印尼口袋3DS

      14: __webpack_require__(1166), // 德国口袋3DS
      15: __webpack_require__(1167), // 韩国口袋3DS
      16: __webpack_require__(1168) // 法国口袋3DS

    },
    3: {// efunfun分析系统

    }
  }
};

/***/ })

});