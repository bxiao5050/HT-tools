webpackJsonp([35],{

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(756)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(758),
  /* template */
  __webpack_require__(759),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(757);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("e3b03b64", content, true);

/***/ }),

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".item-content{margin-right:15px;float:left;line-height:30px}.item-content .bt-item{cursor:pointer;padding:0 15px;float:left;background-color:#fff;border:1px solid #bbb;border-right:0;text-align:center}.item-content .bt-item:last-child{border-right:1px solid #bbb}.item-content .bt-item.check{font-weight:700;color:#fff;background-color:#fc9153}", ""]);

// exports


/***/ }),

/***/ 758:
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

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

var _elementTable = __webpack_require__(573);

var _elementTable2 = _interopRequireDefault(_elementTable);

var _utils = __webpack_require__(575);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    moduleHeader: _moduleHeader2.default, card: _card2.default, normalTable: _elementTable2.default
  },
  data: function data() {
    return {
      date1: moment().add(-7, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),

      playerType: 1,
      type: 0,

      tableData: [],
      columnData: []
    };
  },

  computed: {
    dateList: function dateList() {
      var _this = this;

      return [{
        single: false,
        uid: 'date1',
        label: this.$t('common.Date'),
        startDate: this.date1,
        endDate: this.date2,
        isShowDatetype: false,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;_this.date2 = newDate.endDate;_this.query();
        }
      }];
    },
    reverseTableData: function reverseTableData() {
      var result = this.tableData.map(function (item) {
        return item;
      });
      result.reverse();
      return result;
    }
  },
  mounted: function mounted() {
    this.query();
  },

  methods: {
    getParams: function getParams() {
      return {
        dataview: this.$store.state.common.nowmenu.dataView,
        in_date1: this.date1,
        in_date2: this.date2,
        in_type_id: this.playerType,
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
        in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        isCache: 1
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
          Utils.Notification.error({ message: data.message });
          console.error(data.message);
        }
      });
    },
    exportData: function exportData() {
      var params = this.getParams();
      _api2.default.user.exportData(params);
    },
    drawChart: function drawChart() {
      var _this3 = this;

      var count_date = _utils2.default.getColumnByIndex(0, this.tableData); //utils.getColumnKey('统计时间',this.columnData)
      var lost_user = _utils2.default.getColumnByIndex(1, this.tableData); //utils.getColumnKey('lost_user',this.columnData)
      var lost_rate = _utils2.default.getColumnByIndex(2, this.tableData); //utils.getColumnKey('lost_rate',this.columnData)

      var lost_user_level = _utils2.default.getColumnByIndex(0, this.tableData); //utils.getColumnKey('lost_user_level',this.columnData)
      var zhanbi = _utils2.default.getColumnByIndex(2, this.tableData); //utils.getColumnKey('zhanbi',this.columnData)

      var lost_user_paymoney = _utils2.default.getColumnByIndex(0, this.tableData); //utils.getColumnKey('lost_user_paymoney',this.columnData)

      var lost_user_paycount = _utils2.default.getColumnByIndex(0, this.tableData); //utils.getColumnKey('lost_user_paycount',this.columnData)

      var lost_user_life = _utils2.default.getColumnByIndex(0, this.tableData); //utils.getColumnKey('lost_user_life',this.columnData)

      var categories = [];
      var seriesData = [];
      if (this.playerType == 1 || this.playerType == 2) {
        seriesData = [{ name: lost_user, data: [], type: 'column' }, { name: lost_rate, data: [], type: 'spline' }];
        this.tableData.forEach(function (item) {
          categories.push(item[count_date]);
          seriesData[0].data.push(Number(item[lost_user].replace(/,/g, '')));
          seriesData[1].data.push(Number(item[lost_rate]));
        });
      } else {
        seriesData = [{ name: lost_user, data: [], type: 'column' }, { name: zhanbi, data: [], type: 'spline' }];
        this.tableData.forEach(function (item) {
          var str = void 0;
          if (_this3.playerType == 3) {
            str = lost_user_level;
          } else if (_this3.playerType == 4) {
            str = lost_user_paymoney;
          } else if (_this3.playerType == 5) {
            str = lost_user_paycount;
          } else if (_this3.playerType == 6) {
            str = lost_user_life;
          }
          categories.push(item[str]);
          seriesData[0].data.push(Number(item[lost_user].replace(/,/g, '')));
          seriesData[1].data.push(Number(item[lost_rate].split('%')[0]));
        });
      }
      highchartUtil.drawChart('loseUserChart', 'spline', categories, seriesData, true);
    }
  },
  watch: {
    type: function type(v, ov) {
      if (v != ov) {
        if (v == 0) {
          this.playerType = 1;
        } else {
          this.playerType = 3;
        }
      }
    },
    playerType: function playerType(v, ov) {
      if (v != ov) {
        this.query();
      }
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14), __webpack_require__(571)))

/***/ }),

/***/ 759:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "lose-user"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
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
  }, [_vm._v(_vm._s(_vm.$t('loseUser.filterConditions')) + ":")]), _vm._v(" "), (_vm.type == 0) ? _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.playerType === 1
    },
    on: {
      "click": function($event) {
        _vm.playerType = 1
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('loseUser.allPlayer')))]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.playerType === 2
    },
    on: {
      "click": function($event) {
        _vm.playerType = 2
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('loseUser.payPlayer')))])]) : _vm._e(), _vm._v(" "), (_vm.type == 1) ? _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.playerType === 3
    },
    on: {
      "click": function($event) {
        _vm.playerType = 3
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('loseUser.loseLevel')))]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.playerType === 4
    },
    on: {
      "click": function($event) {
        _vm.playerType = 4
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('loseUser.payMoney')))]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.playerType === 5
    },
    on: {
      "click": function($event) {
        _vm.playerType = 5
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('loseUser.payCount')))]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.playerType === 6
    },
    on: {
      "click": function($event) {
        _vm.playerType = 6
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('loseUser.userLifeCycle')))])]) : _vm._e()])])])], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c('div', {
    staticClass: "card-box"
  }, [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v(_vm._s(_vm.$t('common.IndexKey')))]), _vm._v(" "), _c('div', {
    staticClass: "tabs"
  }, [_c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 0
    },
    on: {
      "click": function($event) {
        _vm.type = 0
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('loseUser.loseRate')))]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 1
    },
    on: {
      "click": function($event) {
        _vm.type = 1
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('loseUser.loseDetailAnalysis')))])])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "loseUserChart"
    }
  })])])], 1), _vm._v(" "), _c('div', {
    staticClass: "card-box"
  }, [_c('card', [_c('div', {
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
      "tableData": _vm.reverseTableData
    }
  })], 1)])])], 1)])])
},staticRenderFns: []}

/***/ })

});