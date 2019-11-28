webpackJsonp([2],{

/***/ 1109:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1110);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("6c907862", content, true);

/***/ }),

/***/ 1110:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".sub-channel-reports .ellipsis .cell{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sub-channel-reports .sub-channel{cursor:pointer}.sub-channel-reports .sub-channel:hover{background:#5b5691!important;color:#fff}.sub-channel-reports .channel-sel,.sub-channel-reports .excel,.sub-channel-reports .game-sel,.sub-channel-reports .query,.sub-channel-reports .system-sel,.sub-channel-reports .time-picker{margin-left:16px}.sub-channel-reports .back-row{margin-top:16px;justify-content:center;align-items:center}.sub-channel-reports .back-row .back{margin-left:-16px}.sub-channel-reports .channel{min-width:160px;max-width:160px}.sub-channel-reports .channel-sel .group,.sub-channel-reports .game-sel .group,.sub-channel-reports .system-sel .group{display:flex;flex-wrap:nowrap}", ""]);

// exports


/***/ }),

/***/ 1111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, Utils) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(270);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _index = __webpack_require__(594);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(1112);

var _index4 = _interopRequireDefault(_index3);

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'sub-channel-reports',
  components: {
    tsdp: _index2.default, totalFloat: _index4.default
  },
  data: function data() {
    return {
      SMN: 'o_s_c_reports',
      updateHook: 0,

      tableOptions: {
        siteId: null

      },

      // 日期选择
      pickerOptions: {
        onPick: function onPick(_ref) {
          var minDate = _ref.minDate,
              maxDate = _ref.maxDate;

          if (!maxDate) {
            this._parentEl.querySelector("input").value = moment(minDate).format("YYYY-MM-DD");
          }
        },

        date: null
      },

      // 系统选择

      osOptions: {
        os: null,
        list: [{
          os: "0",
          txt: "IOS"
        }, {
          os: "1",
          txt: "安卓"
        }]
      },

      tsdp: {
        allTxt: "全部（国家/地区）",
        isShow: false,
        region: null,
        game: null,
        regionArr: [],
        gameArr: [],
        callback: this.tsdpCb
      },

      // level query
      levelOptions: {
        level: null
      },

      channelOptions: {
        channel: null,
        list: []
      }

    };
  },

  computed: {
    _state: function _state() {
      return this.$store.state[this.SMN];
    },
    __data: function __data() {
      this.updateHook += 1;
      if (this.tableOptions.siteId) {
        return this.$store.getters[this.SMN + '/subChannelRegionData'];
      }
      return this.$store.getters[this.SMN + '/subChannelData'];
    },
    _config: function _config() {
      if (this.tableOptions.siteId) {
        return this._state.subChannelRegionConfig;
      }
      return this._state.subChannelConfig;
    }
  },
  methods: {
    excel: function excel() {
      var thead = document.querySelector('.el-table__header thead').innerHTML;
      var tbody = document.querySelector('.el-table__body tbody').innerHTML;
      var table = document.createElement('table');
      table.innerHTML = "<thead>" + thead + "</thead><tbody>" + tbody + "</tbody>";
      Utils.tableToExcel(table, false, new Date().getTime() + '.xls');
    },
    cellClassName: function cellClassName(_ref2) {
      var row = _ref2.row,
          column = _ref2.column,
          rowIndex = _ref2.rowIndex,
          columnIndex = _ref2.columnIndex;

      if (!columnIndex) {
        if (!this.tableOptions.siteId) return 'ellipsis sub-channel';
      }
    },
    tsdpCb: function tsdpCb(_ref3) {
      var _ref4 = (0, _slicedToArray3.default)(_ref3, 4),
          region = _ref4[0],
          regionArr = _ref4[1],
          game = _ref4[2],
          gameArr = _ref4[3];

      this.tsdp.region = region;
      this.tsdp.regionArr = regionArr;
      this.tsdp.game = game;
      this.tsdp.gameArr = gameArr;

      this.channelOptions.channel = null;
      this.channelQuery();
    },
    dateChange: function dateChange(value) {
      var arr = [];
      value.forEach(function (date) {
        arr.push(moment(date).format("YYYY-MM-DD"));
      });
      this.$store.commit(this.SMN + '/setDate', arr);
    },
    osChange: function osChange(value) {
      this.$store.commit(this.SMN + '/setOs', value);
    },
    channelChange: function channelChange(value) {
      this.$store.commit(this.SMN + '/setChannel', value);
    },
    levelChange: function levelChange(value) {
      var number = parseInt(value);
      this.levelOptions.level = isNaN(number) ? null : number;
      this.$store.commit(this.SMN + '/setLevel', this.levelOptions.level * 1);
    },
    formatter: function formatter(row, column, value) {
      var label = column.label;
      var _config2 = this._config,
          keys = _config2.keys,
          index = _config2.index;

      if (label === keys[index.registerRateIndex] || label === keys[index.createRateIndex] || label === keys[index.levelAfRateIndex]) {
        value += '%';
      }
      if (this.tableOptions.siteId && column.label === keys[index.regionIndex]) {
        value = this.$store.state.overseas_common.regionMap[value] || value;
      }
      return value;
    },
    cellClick: function cellClick(row, column, cell, event) {
      var _this = this;

      if (cell.classList.contains('sub-channel') && !this.tableOptions.siteId) {
        var param = {
          begin_date: this._state.date[0],
          end_date: this._state.date[1],
          os: this._state.os,
          game_id: this._state.gameArr[0],
          media_source: this._state.channel,
          site_id: row[column.label],
          level: this._state.level
        };
        this.$store.dispatch(this.SMN + '/subChannelRegionData', param).then(function (data) {
          _this.tableOptions.siteId = param.site_id;
        });
      }
    },
    channelQuery: function channelQuery() {
      var _this2 = this;

      if (!this.osOptions.os) {
        this.$notify({
          type: "warning",
          message: "请选择操作系统"
        });
        return;
      }
      if (!this.tsdp.gameArr[0]) {
        this.$notify({
          type: "warning",
          message: "请选择游戏",
          offset: 50
        });
        return;
      }

      this.$store.commit(this.SMN + "/setRegion", this.tsdp.region);
      this.$store.commit(this.SMN + "/setRegionArr", this.tsdp.regionArr);
      this.$store.commit(this.SMN + "/setGame", this.tsdp.game);
      this.$store.commit(this.SMN + "/setGameArr", this.tsdp.gameArr);

      var param = {
        in_unite_id: this.tsdp.gameArr[0],
        in_os: this.osOptions.os,
        count_date: moment().add(-1, "day").format("YYYY-MM-DD")
      };

      this.$store.dispatch('overseas_common/getChannels1', param).then(function (data) {

        if (data.code === 401) {
          _this2.channelOptions.list = data.state[0];
          _this2.$store.commit(_this2.SMN + '/setChannelList', _this2.channelOptions.list);
        }
      }).catch(function (err) {
        _this2.$notify({
          type: "error",
          message: err
        });
      });
    },
    ckeck: function ckeck() {
      if (!this._state.gameArr.length) {
        this.$notify({
          type: "warning",
          message: "请选择游戏"
        });
        return false;
      }
      if (!this._state.channel) {
        this.$notify({
          type: "warning",
          message: "请选择渠道"
        });
        return false;
      }
      return true;
    },
    query: function query() {
      var param = {
        begin_date: this._state.date[0],
        end_date: this._state.date[1],
        in_os: this._state.os,
        area_app_id: this._state.gameArr[0],
        media_source: this._state.channel,
        level: this._state.level
      };
      console.log(param);
      this.$store.dispatch(this.SMN + '/subChannelData', param).then(function (data) {});
    }
  },
  mounted: function mounted() {
    var picker = this.$refs.picker;
    picker.mountPicker();
    picker.picker._parentEl = picker.$el;
  },
  created: function created() {
    var _this3 = this;

    this.pickerOptions.date = this._state.date;
    this.osOptions.os = this._state.os;
    this.levelOptions.level = this._state.level;
    if (this._state.region) this.tsdp.region = this._state.region;
    if (this._state.regionArr) this.tsdp.regionArr = this._state.regionArr;
    if (this._state.game) this.tsdp.game = this._state.game;
    if (this._state.gameArr) this.tsdp.gameArr = this._state.gameArr;
    if (this._state.channel) this.channelOptions.channel = this._state.channel;
    if (this._state.channelList) this.channelOptions.list = this._state.channelList;

    this.$store.dispatch("overseas_common/getList1").then(function (item) {
      if (!_this3._state.region || !_this3._state.regionArr.length) {
        _this3.$store.commit(_this3.SMN + "/setRegion", _this3.tsdp.allTxt);
        _this3.$store.commit(_this3.SMN + "/setRegionArr", _this3.$store.state.overseas_common.list1All);
        _this3.tsdp.region = _this3.tsdp.allTxt;
        _this3.tsdp.regionArr = _this3.$store.state.overseas_common.list1All;
      }
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14)))

/***/ }),

/***/ 1112:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1113)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1115),
  /* template */
  __webpack_require__(1116),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1113:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1114);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("1e12c085", content, true);

/***/ }),

/***/ 1114:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".fixed[total-float]{position:fixed;bottom:0;z-index:999;overflow:hidden}", ""]);

// exports


/***/ }),

/***/ 1115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Utils) {

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

exports.default = {
  props: ['params', 'updateHook'],
  data: function data() {
    return {
      height: 0
    };
  },

  watch: {
    updateHook: function updateHook() {
      var _this = this;

      if (this.updateHook) {
        this.$nextTick(function () {
          _this.init();
        });
      }
    }
  },
  methods: {
    getTotalWidth: function getTotalWidth() {
      var width = 0;
      this.params.tableKey.forEach(function (item) {
        if (!item.hide) width += item.width;
      });
      return width + 'px';
    },
    init: function init() {
      this.height = Utils.getElementTop(this.$refs.total);
      this.windowScroll();
    },
    windowScroll: function windowScroll() {
      var total = this.$refs.total.classList;
      var scrollTop = this.$root.$children[0].$refs.scroll.scrollTop;
      var appHeight = this.$root.$el.clientHeight;
      if (this.height <= appHeight + scrollTop) {
        if (total.contains('fixed')) {
          total.remove('fixed');
          this.$refs.table.style.transform = 'translateX(0px)';
        }
      } else {
        if (!total.contains('fixed')) {
          total.add('fixed');
          if (this.totalScroll.scrollLeft) this.$refs.table.style.transform = 'translateX(-' + this.totalScroll.scrollLeft + 'px)';
        }
      }
    },
    totalScroll: function totalScroll(e) {
      this.totalScroll.scrollLeft = e.target.scrollLeft;
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$root.$children[0].$refs.scroll.addEventListener('scroll', this.windowScroll);
    this.$refs.total && this.$refs.total.parentElement.parentElement.parentElement.addEventListener('scroll', this.totalScroll);
    this.$nextTick(function () {
      _this2.init();
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$root.$children[0].$refs.scroll.removeEventListener('scroll', this.windowScroll);
    this.$refs.total && this.$refs.total.parentElement.parentElement.parentElement.removeEventListener('scroll', this.totalScroll);
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),

/***/ 1116:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "total",
    staticClass: "total-float",
    attrs: {
      "total-float": ""
    }
  }, [_c('table', {
    ref: "table",
    staticClass: "el-table__body",
    style: ({
      width: _vm.getTotalWidth()
    }),
    attrs: {
      "cellspacing": "0",
      "cellpadding": "0",
      "border": "0"
    }
  }, [_c('colgroup', _vm._l((_vm.params.tableKey), function(item, i) {
    return (!item.hide) ? _c('col', {
      key: i,
      class: 'el-table_1_column_' + (i++),
      attrs: {
        "width": item.width
      }
    }) : _vm._e()
  })), _vm._v(" "), _c('tbody', [_c('tr', {
    staticClass: "el-table__row total"
  }, _vm._l((_vm.params.tableKey), function(item, i) {
    return (!item.hide) ? _c('td', {
      key: i,
      class: 'el-table_1_column_' + (i++)
    }, [_c('div', {
      staticClass: "cell"
    }, [_vm._v(_vm._s(_vm.params.total[item.key]))])]) : _vm._e()
  }))])])])
},staticRenderFns: []}

/***/ }),

/***/ 1117:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sub-channel-reports"
  }, [_c('my-row', [_c('div', {
    staticClass: "time-picker"
  }, [_c('el-date-picker', {
    ref: "picker",
    attrs: {
      "size": "medium",
      "picker-options": _vm.pickerOptions,
      "type": "daterange",
      "range-separator": "至",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      "top": "100"
    },
    on: {
      "change": _vm.dateChange
    },
    model: {
      value: (_vm.pickerOptions.date),
      callback: function($$v) {
        _vm.$set(_vm.pickerOptions, "date", $$v)
      },
      expression: "pickerOptions.date"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "system-sel"
  }, [_c('el-button-group', {
    staticClass: "group"
  }, [_c('el-button', {
    attrs: {
      "size": "medium"
    }
  }, [_c('span', [_vm._v("系统")])]), _vm._v(" "), _c('el-select', {
    staticClass: "os",
    staticStyle: {
      "width": "100px"
    },
    attrs: {
      "size": "medium"
    },
    on: {
      "change": _vm.osChange
    },
    model: {
      value: (_vm.osOptions.os),
      callback: function($$v) {
        _vm.$set(_vm.osOptions, "os", $$v)
      },
      expression: "osOptions.os"
    }
  }, _vm._l((_vm.osOptions.list), function(item) {
    return _c('el-option', {
      key: item.os,
      attrs: {
        "label": item.txt,
        "value": item.os
      }
    })
  }))], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "game-sel"
  }, [_c('el-button-group', {
    staticClass: "group"
  }, [_c('el-button', {
    attrs: {
      "size": "medium"
    }
  }, [_c('span', [_vm._v("游戏")])]), _vm._v(" "), _c('el-button', {
    staticClass: "selection",
    attrs: {
      "size": "medium"
    },
    on: {
      "click": function($event) {
        _vm.tsdp.isShow = !_vm.tsdp.isShow
      }
    }
  }, [_c('span', [_vm._v("已选择：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.tsdp.game))])])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "channel-sel"
  }, [_c('el-button-group', {
    staticClass: "group"
  }, [_c('el-button', {
    attrs: {
      "size": "medium"
    }
  }, [_c('span', [_vm._v("渠道")])]), _vm._v(" "), _c('el-select', {
    staticClass: "channel",
    attrs: {
      "filterable": "",
      "size": "medium"
    },
    on: {
      "change": _vm.channelChange
    },
    model: {
      value: (_vm.channelOptions.channel),
      callback: function($$v) {
        _vm.$set(_vm.channelOptions, "channel", $$v)
      },
      expression: "channelOptions.channel"
    }
  }, _vm._l((_vm.channelOptions.list), function(item) {
    return _c('el-option', {
      key: item.media_source,
      attrs: {
        "label": item.media_source,
        "value": item.media_source
      }
    })
  }))], 1)], 1)]), _vm._v(" "), _c('my-row', {
    staticStyle: {
      "margin": "16px 0 0 16px",
      "width": "auto"
    }
  }, [_c('div', {
    staticClass: "level-query"
  }, [_c('el-input', {
    staticStyle: {
      "width": "180px"
    },
    attrs: {
      "clearable": ""
    },
    on: {
      "change": _vm.levelChange
    },
    model: {
      value: (_vm.levelOptions.level),
      callback: function($$v) {
        _vm.$set(_vm.levelOptions, "level", $$v)
      },
      expression: "levelOptions.level"
    }
  }, [_c('template', {
    slot: "prepend"
  }, [_vm._v("等级点")])], 2)], 1), _vm._v(" "), _c('div', {
    staticClass: "excel"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.ckeck() && _vm.excel()
      }
    }
  }, [_vm._v("\n        导出表格\n      ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "query"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.ckeck() && _vm.query()
      }
    }
  }, [_vm._v("\n        查询\n      ")])], 1)]), _vm._v(" "), _c('my-row', [(_vm.tsdp.isShow) ? _c('tsdp', {
    attrs: {
      "data": _vm.tsdp,
      "auto-confirm": true
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('my-row', {
    staticClass: "back-row"
  }, [(_vm.tableOptions.siteId) ? _c('div', {
    staticClass: "back"
  }, [_c('el-tag', [_vm._v("\n        子渠道： " + _vm._s(this.tableOptions.siteId) + "\n      ")]), _vm._v(" "), _c('el-button', {
    staticClass: "back-btn",
    attrs: {
      "size": "small"
    },
    on: {
      "click": function($event) {
        _vm.tableOptions.siteId = null
      }
    }
  }, [_vm._v("\n        点击返回\n      ")])], 1) : _vm._e()]), _vm._v(" "), (_vm.__data) ? _c('div', {
    staticClass: "table",
    staticStyle: {
      "margin": "16px 0 0 0"
    }
  }, [_c('el-table', {
    attrs: {
      "data": _vm.__data.list,
      "cell-class-name": _vm.cellClassName,
      "width": '2000px'
    },
    on: {
      "cell-click": _vm.cellClick
    }
  }, [_vm._l((_vm._config.tableKey), function(item, i) {
    return _c('el-table-column', {
      key: i,
      attrs: {
        "prop": item.key,
        "label": item.key,
        "formatter": _vm.formatter,
        "width": item.width,
        "min-width": item['min-width'],
        "sortable": item.sortable
      }
    })
  }), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "append"
    },
    slot: "append"
  }, [_c('totalFloat', {
    attrs: {
      "updateHook": _vm.updateHook,
      "params": {
        total: _vm.__data.total,
        tableKey: _vm._config.tableKey
      }
    }
  })], 1)], 2)], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1109)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1111),
  /* template */
  __webpack_require__(1117),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

});