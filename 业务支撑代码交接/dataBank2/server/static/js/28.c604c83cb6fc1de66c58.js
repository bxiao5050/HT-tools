webpackJsonp([28],{

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(691)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(693),
  /* template */
  __webpack_require__(694),
  /* scopeId */
  "data-v-530f48c8",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 691:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(692);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("bba5b8ec", content, true);

/***/ }),

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".table-content[data-v-530f48c8]{overflow:auto;width:100%;max-height:500px;white-space:nowrap}", ""]);

// exports


/***/ }),

/***/ 693:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moduleHeader = __webpack_require__(572);

var _moduleHeader2 = _interopRequireDefault(_moduleHeader);

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

var _normalTable = __webpack_require__(574);

var _normalTable2 = _interopRequireDefault(_normalTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'new-server-monitor',
  components: {
    card: _card2.default, moduleHeader: _moduleHeader2.default, normalTable: _normalTable2.default
  },
  computed: {
    data: function data() {
      return this.$store.state.NewServerMonitor.data;
    }
  },
  data: function data() {
    var _this = this;

    return {
      header: {
        title: '新服监测',
        definedContent: '',
        isShowIndex: false
      },
      dateList: [{
        single: true,
        uid: 'date1',
        label: '日期',
        startDate: this.date1,
        endDate: '',
        change: function change(newDate) {
          _this.date1 = newDate.startDate;_this.query();
        }
      }],

      date1: moment().format("YYYY-MM-DD"),
      tableData: []
    };
  },
  mounted: function mounted() {
    this.query();
  },

  methods: {
    changeDate: function changeDate(newDate) {
      this.date1 = newDate.startDate;
      // console.log(newDate.startDate)
    },
    query: function query() {
      this.$store.dispatch('NewServerMonitor/data', {
        isCache: 1,
        in_date1: this.date1,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
        in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
        platformId: '1,2'
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "new-server-monitor"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "header": _vm.header,
      "isShowReg": true,
      "dateList": _vm.dateList
    }
  })], 1), _vm._v(" "), _c('div', {
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
      "tableData": _vm.data
    }
  })], 1)])])], 1)])
},staticRenderFns: []}

/***/ })

});