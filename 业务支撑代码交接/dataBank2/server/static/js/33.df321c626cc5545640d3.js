webpackJsonp([33],{

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(772)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(774),
  /* template */
  __webpack_require__(775),
  /* scopeId */
  "data-v-cc48190c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 772:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(773);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("8b0601d0", content, true);

/***/ }),

/***/ 773:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".hot-table-content[data-v-cc48190c]{overflow-x:auto;width:100%}.hot-table-content table tr th[data-v-cc48190c]{font-weight:400;white-space:nowrap}.hot-table-content table tr td[data-v-cc48190c]{white-space:nowrap}.tab-types[data-v-cc48190c]{float:right;margin-bottom:15px;vertical-align:middle;line-height:30px}.tab-types .tab-type-item[data-v-cc48190c]{width:100px;text-align:center;border:1px solid #bbb;float:left;background-color:#eee}.tab-types .tab-type-item.active[data-v-cc48190c]{background-color:#bbb;color:#fff}", ""]);

// exports


/***/ }),

/***/ 774:
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

var _utils = __webpack_require__(575);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'new-user-retain-rate',
  components: {
    card: _card2.default,
    moduleHeader: _moduleHeader2.default
  },
  data: function data() {
    return {
      date1: moment().add(-8, 'day').format('YYYY-MM-DD'),
      date2: moment().add(-2, 'day').format('YYYY-MM-DD'),
      tableData: [],
      columnData: [],

      type: 1,
      tabType: 0,

      config: {
        1: {
          isShowRegChannel: true,
          isShowPayChannel: false
        },
        2: {
          isShowRegChannel: true,
          isShowPayChannel: false
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
        single: false,
        uid: 'date1',
        label: '日期',
        startDate: this.date1,
        endDate: this.date2,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.date2 = newDate.endDate;
          _this.query();
        }
      }];
    },
    columnArr: function columnArr() {
      var result = [];
      if (this.tableData && this.tableData.length > 0) {
        for (var index in this.tableData[0]) {
          result.push(index);
        }
      }
      return result;
    },
    systemId: function systemId() {
      return this.$store.state.common.systems.systemId;
    }
  },
  mounted: function mounted() {
    this.query();
  },

  methods: {
    getColor: function getColor(value, index) {
      // let count_date,reg_count
      //   if(this.systemId==1){
      //     count_date = utils.getColumnKey('reg_date',this.columnData);
      //     reg_count = utils.getColumnKey('reg_count',this.columnData);
      //   }
      //   else if(this.systemId==3){
      //     count_date = utils.getColumnKey('count_date',this.columnData);
      //     reg_count = utils.getColumnKey('reg_count',this.columnData);
      //   }
      //  let count_date = utils.getColumnByIndex(0,this.tableData);
      //  let reg_count = utils.getColumnByIndex(this.tableData[0].length-1,this.tableData);
      // if (value == count_date || value == reg_count) {
      if (index == 0 || index == this.getObjLength(this.tableData[0]) - 1) {
        return 'transparent';
      } else {
        var colorList = ['#FFFFFF', '#F5F2FD', '#DED7F4', '#C9BEEB', '#B7A7E4', '#9D88DB'];
        var num = Number(value.split('%')[0]);
        var max = this.getMaxNum();
        var per = Number(num) / max;
        if (this.tabType == 0) {
          if (num == 0) {
            return colorList[0];
          } else if (per <= 1 / 5) {
            return colorList[1];
          } else if (per <= 2 / 5) {
            return colorList[2];
          } else if (per <= 3 / 5) {
            return colorList[3];
          } else if (per <= 4 / 5) {
            return colorList[4];
          } else if (per <= 1) {
            return colorList[5];
          }
        }
        return colorList[0];
      }
    },
    getMaxNum: function getMaxNum() {
      var _this2 = this;

      var max = 0;
      this.tableData.forEach(function (item) {
        var count = 0;
        for (var index in item) {
          // if (index != count_date || index != reg_count) {
          if (count == 0 || count == _this2.getObjLength(item) - 1) {} else {
            var num = Number(item[index].split('%')[0]);
            if (num > max) {
              max = num;
            }
          }
          count++;
        }
      });
      return max;
    },
    getObjLength: function getObjLength(obj) {
      var count = 0;
      for (var index in obj) {
        count++;
      }
      return count;
    },
    getParams: function getParams() {
      if (this.systemId == 1) {
        return {
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: this.date1,
          in_date2: this.date2,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          select_id: this.type,
          isCache: 1
        };
      } else if (this.systemId == 2) {
        return {
          isCache: 1,
          in_date1: this.date1,
          in_date2: this.date2,
          dataview: this.$store.state.common.nowmenu.dataView,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_channel_id: this.$store.getters['RegChannel/selected2IdList'],
          in_package_id: this.$store.getters['RegChannel/selected3IdList'],
          in_config_id: 1
        };
      } else if (this.systemId == 3) {
        return {};
      }
    },
    query: function query() {
      var _this3 = this;

      this.tableData = [];
      var params = this.getParams();
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this3.tableData = data.state[0];
          _this3.columnData = data.state[1] ? data.state[1] : [];
        } else {
          Utils.Notification.error({
            message: data.message
          });
          console.error(data.message);
        }
      });
    },
    exportData: function exportData() {
      var params = this.getParams();
      _api2.default.user.exportData(params);
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
// import notification from 'src/vendor/element-ui/packages/notification'
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14)))

/***/ }),

/***/ 775:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "new-user-retain-rate"
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
  }, [_c('div', {
    staticClass: "card-box"
  }, [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v(_vm._s(_vm.$t('common.IndexKey')))]), _vm._v(" "), (this.systemId == 1) ? _c('div', {
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
  }, [_vm._v(_vm._s(_vm.$t('newUserRetainRate.newUser')))])]) : _vm._e(), _vm._v(" "), _c('div', {
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
    staticClass: "tab-types"
  }, [_c('div', {
    staticClass: "tab-type-item",
    class: {
      'active': _vm.tabType == 0
    },
    on: {
      "click": function($event) {
        _vm.tabType = 0
      }
    }
  }, [_vm._v("热力图")]), _vm._v(" "), _c('div', {
    staticClass: "tab-type-item",
    class: {
      'active': _vm.tabType == 1
    },
    on: {
      "click": function($event) {
        _vm.tabType = 1
      }
    }
  }, [_vm._v("表格")])]), _vm._v(" "), _c('div', {
    staticClass: "hot-table-content"
  }, [_c('table', {
    staticClass: "table table-bordered"
  }, [_c('thead', [_c('tr', [_c('th', [_vm._v(_vm._s(_vm.columnArr[0]))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.columnArr[_vm.columnArr.length - 1]))]), _vm._v(" "), _vm._l((_vm.columnArr), function(column, cindex) {
    return (cindex != 0 && cindex != (_vm.columnArr.length - 1)) ? _c('th', {
      key: cindex
    }, [_vm._v(_vm._s(column))]) : _vm._e()
  })], 2)]), _vm._v(" "), _c('tbody', _vm._l((_vm.tableData), function(item, index) {
    return (_vm.tableData) ? _c('tr', {
      key: index
    }, [_c('td', [_c('span', [_vm._v(_vm._s(item[_vm.columnArr[0]]))])]), _vm._v(" "), _c('td', [_c('span', [_vm._v(_vm._s(item[_vm.columnArr[_vm.columnArr.length - 1]]))])]), _vm._v(" "), _vm._l((_vm.columnArr), function(column, cindex) {
      return (cindex != 0 && cindex != (_vm.columnArr.length - 1)) ? _c('td', {
        key: cindex,
        style: ({
          'background-color': _vm.getColor(item[column], cindex)
        })
      }, [_c('span', [_vm._v(_vm._s(item[column].split('%')[0] == 0 ? '-' : item[column]))])]) : _vm._e()
    })], 2) : _vm._e()
  })), _vm._v(" "), (!_vm.tableData || _vm.tableData.length == 0) ? _c('tfoot', [_c('tr', [_c('td', [_vm._v("无数据")])])]) : _vm._e()])])])])], 1)])])
},staticRenderFns: []}

/***/ })

});