webpackJsonp([26],{

/***/ 1105:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1106);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("79edf836", content, true);

/***/ }),

/***/ 1106:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1107:
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
  data: function data() {
    return {
      data: {
        isShow: false,
        region: null,
        game: null,
        regionArr: [],
        gameArr: []
      },
      os: null,
      options: [{
        os: '0',
        txt: 'IOS'
      }, {
        os: '1',
        txt: '安卓'
      }]
    };
  },
  computed: {
    _rcg: function _rcg() {
      var str = '';
      if (this.data.region) {
        str += this.data.region;
        if (this.data.game) {
          str += ' - ' + this.data.game;
        } else {
          str += ' - ' + '全部游戏';
        }
      }
      return str;
    }
  },
  methods: {
    dataInit: function dataInit() {}
  },
  created: function created() {
    this.dataInit();
  }
};

/***/ }),

/***/ 1108:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "daiding"
  })
},staticRenderFns: []}

/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1105)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1107),
  /* template */
  __webpack_require__(1108),
  /* scopeId */
  "data-v-3d8ed9d2",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

});