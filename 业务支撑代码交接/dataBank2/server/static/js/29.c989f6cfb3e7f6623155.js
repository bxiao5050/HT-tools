webpackJsonp([29],{

/***/ 524:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(620)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(622),
  /* template */
  __webpack_require__(655),
  /* scopeId */
  "data-v-7e7e8059",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(621);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("66ce9a02", content, true);

/***/ }),

/***/ 621:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".table-content[data-v-7e7e8059]{overflow:auto;width:100%}", ""]);

// exports


/***/ }),

/***/ 622:
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

exports.default = {
  name: 'five-minutes-view',
  components: {
    moduleHeader: _moduleHeader2.default,
    normalTable: _elementTable2.default,
    card: _card2.default
  },
  data: function data() {
    return {
      date1: moment().format('YYYY-MM-DD'),
      date2: moment().add(-1, 'day').format('YYYY-MM-DD'),
      date3: moment().add(-7, 'day').format('YYYY-MM-DD'),

      type: null,
      tableData: [],

      config: {
        1: {
          isShowRegChannel: true,
          isShowPayChannel: true,
          list: [{
            id: 1,
            name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Online')
          }, //'五分钟在线',
          {
            id: 2,
            name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Charge') + '(USD)'
          }, //'五分钟充值'
          {
            id: 3,
            name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Register')
          }, //'五分钟注册'
          {
            id: 4,
            name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Active')
          }, //'五分钟活跃'
          {
            id: 5,
            name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.CreateRole')
          }, //'五分钟活跃'
          {
            id: 6,
            name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.PayCount')
          }] //'五分钟付费人数'
        },
        2: {
          isShowRegChannel: true,
          isShowPayChannel: false,
          list: [{
            id: 3,
            name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Register')
          }, //'五分钟注册'
          {
            id: 2,
            name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Charge')
          }, //'五分钟充值'
          {
            id: 1,
            name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Online') //'五分钟在线',
          }]
        },
        3: {
          isShowRegChannel: true,
          isShowPayChannel: true
        }
      }
    };
  },

  computed: {
    dateList: function dateList() {
      var _this = this;

      return [{
        single: true,
        uid: 'date1',
        label: this.$t('common.BaseTime'), //'基准时间',
        startDate: this.date1,
        endDate: '',
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.query();
        }
      }, {
        single: true,
        uid: 'date2',
        label: this.$t('common.CompareTime'), //'对比时间',
        startDate: this.date2,
        endDate: '',
        change: function change(newDate) {
          _this.date2 = newDate.startDate;
          _this.query();
        }
      }, {
        single: true,
        uid: 'date3',
        label: this.$t('common.CompareTime'), //'对比时间',
        startDate: this.date3,
        endDate: '',
        change: function change(newDate) {
          _this.date3 = newDate.startDate;
          _this.query();
        }
      }];
    },

    // types() {
    //   let types = [
    //     {
    //       id: 1,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Online') //'五分钟在线'
    //     },
    //     {
    //       id: 2,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Charge') + '(USD)' //'五分钟充值'
    //     },
    //     {
    //       id: 3,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Register') //'五分钟注册'
    //     },
    //     {
    //       id: 4,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.Active') //'五分钟活跃'
    //     },
    //     {
    //       id: 5,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.CreateRole') //'五分钟活跃'
    //     },
    //     {
    //       id: 6,
    //       name: this.$t('fiveMin.fiveMin') + this.$t('fiveMin.PayCount') //'五分钟付费人数'
    //     }
    //   ]
    //   this.type = types[0]
    //   return types
    // },
    isCompact: function isCompact() {
      return this.$store.state.layout.isCompact;
    },
    systemId: function systemId() {
      return this.$store.state.common.systems.systemId;
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.type = this.config[this.systemId].list[0];
    window.fiveMinInterval = setInterval(function () {
      _this2.query();
    }, 300000);
    this.query();
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(window.fiveMinInterval);
  },

  methods: {
    getParams: function getParams() {
      if (this.systemId == 1) {
        return {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          in_date3: this.date3,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_pay_channel: this.$store.getters['PayChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          in_type_id: this.type.id
        };
      } else if (this.systemId == 2) {
        return {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          in_date3: this.date3,
          dataview: this.$store.state.common.nowmenu.dataView[0],
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_channel_id: this.$store.getters['RegChannel/selected2IdList'],
          in_package_id: this.$store.getters['RegChannel/selected3IdList'],
          in_type: this.type.id
        };
      }
    },
    query: function query() {
      var _this3 = this;

      this.tableData = [];
      var params = this.getParams();
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this3.tableData = data.state[0];
          _this3.drawChart();
        } else {
          Utils.Notification.error({
            message: data.message
          });
        }
      });
    },
    exportData: function exportData() {
      var params = this.getParams();
      _api2.default.user.exportData(params);
    },
    drawChart: function drawChart() {
      var _this4 = this;

      var count_date = utils.getColumnByIndex(0, this.tableData);
      var dateList = [this.date3, this.date2, this.date1];
      var categories = [];
      var seriesData = [];
      this.tableData.map(function (item) {
        categories.push(item[count_date]);
      });
      dateList.forEach(function (date) {
        seriesData.push({
          name: date,
          data: function () {
            var array = [];
            _this4.tableData.map(function (item) {
              array.push(item[date] ? Number(item[date].replace(/,/g, '')) : '');
            });
            return array;
          }(),
          max: function () {
            var max = '0';
            _this4.tableData.map(function (item) {
              // if(this.type.id==4){
              //   max += Number(item[date].replace(/,/g,'')*1)
              // }
              // else{
              if (Number(max.replace(/,/g, '')) < Number(item[date].replace(/,/g, ''))) {
                max = item[date];
              }
              // }
            });
            return max;
          }()
        });
      });
      window._1 = categories;
      window._2 = seriesData;
      highchartUtil.drawFiveMinLine('fiveMinChart', categories, seriesData);
    }
  },
  watch: {
    isCompact: function isCompact(v, ov) {
      if (v != ov) {
        this.query();
      }
    },

    type: {
      deep: true,
      handler: function handler(v, ov) {
        if (v != ov && ov) {
          this.query();
        }
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14), __webpack_require__(571)))

/***/ }),

/***/ 655:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "five-minutes-view"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "isShowReg": _vm.config[_vm.systemId].isShowRegChannel,
      "isShowPay": _vm.config[_vm.systemId].isShowPayChannel,
      "dateList": _vm.dateList
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
  }, [_vm._v(_vm._s(_vm.type ? _vm.type.name : '') + "(" + _vm._s(_vm.$t('fiveMin.delay10min')) + ")")]), _vm._v(" "), _c('div', {
    staticClass: "tabs"
  }, _vm._l((_vm.config[_vm.systemId].list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "tab-item",
      class: {
        'active': _vm.type && item.id == _vm.type.id
      },
      on: {
        "click": function($event) {
          _vm.type = item
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "fiveMinChart"
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