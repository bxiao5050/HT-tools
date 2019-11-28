webpackJsonp([11],{

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(664)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(666),
  /* template */
  __webpack_require__(690),
  /* scopeId */
  "data-v-9e0ff584",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 664:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(665);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("eab1a96c", content, true);

/***/ }),

/***/ 665:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".steam-date[data-v-9e0ff584]{position:absolute;right:100px;color:orange}.form-input[data-v-9e0ff584]{border:1px solid rgba(0,0,0,.15)}.steam-group[data-v-9e0ff584]{width:100%;display:flex;justify-content:center;align-items:center;line-height:30px;padding:10px}.steam-group .steam-item[data-v-9e0ff584]{flex:3;height:110px;color:#fff;text-align:center;padding:10px 0;cursor:pointer}.steam-group .steam-item .steam-item-num[data-v-9e0ff584]{font-size:15px;font-weight:700}.steam-group .steam-item .border-text[data-v-9e0ff584]{border:2px solid #fff;display:initial;padding:3px}.steam-group .steam-item .index-desc[data-v-9e0ff584]{color:#eee;font-size:13px;margin-left:3px}.steam-group .steam-item[data-v-9e0ff584]:hover{transform:scale(1.15);box-shadow:1px 1px 4px 2px rgba(0,0,0,.3)}.steam-group .steam-item[data-v-9e0ff584]:first-child{background-color:#5e5e5e}.steam-group .steam-item[data-v-9e0ff584]:nth-child(3){background-color:#f26262}.steam-group .steam-item[data-v-9e0ff584]:nth-child(5){background-color:#5d9cec}.steam-group .steam-item[data-v-9e0ff584]:nth-child(7){background-color:#4dc16c}.steam-group .steam-item[data-v-9e0ff584]:nth-child(9){background-color:#9b86d9}.steam-group .active[data-v-9e0ff584]{transform:scale(1.15);box-shadow:1px 1px 4px 2px rgba(0,0,0,.3)}.steam-group .steam-equal[data-v-9e0ff584]{flex:1;display:block;position:relative}.steam-group .steam-equal[data-v-9e0ff584]:before{content:\"\";height:6px;width:2.5em;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 -6px #bbb,0 6px #bbb}.steam-group .steam-add[data-v-9e0ff584]{flex:1;box-sizing:border-box;display:inline-block;position:relative;font-size:20px;color:#bbb}.steam-group .steam-add[data-v-9e0ff584]:after,.steam-group .steam-add[data-v-9e0ff584]:before{content:\"\";pointer-events:none;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);box-shadow:inset 0 0 0 1em}.steam-group .steam-add[data-v-9e0ff584]:before{width:2em;height:6px}.steam-group .steam-add[data-v-9e0ff584]:after{height:2em;width:6px}.steam-group .steam-sub[data-v-9e0ff584]{flex:1;display:block;position:relative}.steam-group .steam-sub[data-v-9e0ff584]:before{content:\"\";height:6px;width:2.5em;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 6px #bbb}.currency-item[data-v-9e0ff584]{width:100px}.table-content[data-v-9e0ff584]{max-height:500px;overflow:auto;white-space:nowrap}.checkbox-group[data-v-9e0ff584]{max-height:300px;overflow:auto;display:flex;justify-content:flex-start;align-items:flex-start;flex-wrap:wrap}.checkbox-group .checkbox-item[data-v-9e0ff584]{width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer}", ""]);

// exports


/***/ }),

/***/ 666:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, Utils) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(593);

var _stringify2 = _interopRequireDefault(_stringify);

var _moduleHeader = __webpack_require__(572);

var _moduleHeader2 = _interopRequireDefault(_moduleHeader);

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

var _foldTable = __webpack_require__(668);

var _foldTable2 = _interopRequireDefault(_foldTable);

var _elementTable = __webpack_require__(573);

var _elementTable2 = _interopRequireDefault(_elementTable);

var _modal = __webpack_require__(580);

var _modal2 = _interopRequireDefault(_modal);

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

var _chae = __webpack_require__(677);

var _chae2 = _interopRequireDefault(_chae);

var _JXC = __webpack_require__(680);

var _JXC2 = _interopRequireDefault(_JXC);

var _normal = __webpack_require__(576);

var _normal2 = _interopRequireDefault(_normal);

var _config = __webpack_require__(689);

var _config2 = _interopRequireDefault(_config);

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
//
//
//
//
//
//
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
    moduleHeader: _moduleHeader2.default,
    card: _card2.default,
    foldTable: _foldTable2.default, normalTable: _elementTable2.default, Modal: _modal2.default,
    ChaeView: _chae2.default,
    JXC: _JXC2.default //,XiaoView,KaicunView,ShoucunView
  },
  data: function data() {
    return {
      date1: moment().add(-14, "day").format("YYYY-MM-DD"),
      date2: moment().add(-1, "day").format("YYYY-MM-DD"),
      moneyType: 1, //货币类型  钻石 1  绑定钻石 2
      playerType: 1, //用户类型  正常玩家 1  活跃玩家 2 内部账户 3
      masterType: 5, // 差额 5  进 1 开存 4 销 2 收存 3 
      type: 1, //差额 1   或者 进销存 2
      config: null,
      sonTypeList: [],

      selectedType: [],
      isShowTypeList: false,

      listData: null, //关键指标列表数据

      tableData: [],
      tableDetail: []
    };
  },

  computed: {
    dateList: function dateList() {
      var _this = this;

      return [{
        single: false,
        uid: 'date1',
        label: this.$t('common.Date'), //'日期',
        startDate: this.date1,
        endDate: this.date2,
        isShowDatetype: false,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.date2 = newDate.endDate;
          _this.query();
        }
      }];
    },
    systemId: function systemId() {
      return this.$store.state.common.systems.systemId;
    },
    gameId: function gameId() {
      return this.$store.state.common.nowgame;
    },
    currentView: function currentView() {
      if (this.masterType == 5) {
        return 'ChaeView'; //差额
      } else {
          //if(this.masterType==1){
          return 'JXC'; //进
        }
    },
    selectedTypeStr: function selectedTypeStr() {
      var _this2 = this;

      if (this.selectedType.length > 0) {
        return this.selectedType.map(function (item) {
          return item[_this2.columnData.template_name];
        }).join(',');
      } else {
        return '无';
      }
    },
    reverseTableData: function reverseTableData() {
      var result = this.tableData.map(function (item) {
        return item;
      });
      result.reverse();
      return result;
    },
    columnData: function columnData() {
      return {
        template_name: utils.getColumnByIndex(1, this.sonTypeList)
      };
    }
  },
  filters: {
    toThousands: function toThousands(val) {
      return val.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    }
  },
  created: function created() {
    this.config = _config2.default;
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
        in_user_type: this.playerType,
        in_money_type: this.moneyType,
        in_master_type: this.masterType,
        in_sontype_list: this.selectedType.map(function (item) {
          if (item.checked) {
            return item.sontype;
          }
        }).join(','),
        // in_type_id:this.type,
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
        in_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        isCache: 1
      };
    },
    query: function query() {
      var _this3 = this;

      var params = this.getParams();
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this3.listData = data.state[0][0];
          if (_this3.masterType == 5) {
            //差额
            _this3.tableData = data.state[1];
            _this3.tableDetail = data.state[2] ? data.state[2] : [];
          } else {
            //进销开存收存
            _this3.tableData = data.state[1];
            _this3.tableDetail = [];
            _this3.sonTypeList = _this3.formatSonTypeList(data.state[2]);
            _this3.selectedType = JSON.parse((0, _stringify2.default)(_this3.sonTypeList));
          }

          // this.columnData = data.state[3] ? data.state[3] : [];


          // this.$refs.chartModel.drawChart();
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
    formatSonTypeList: function formatSonTypeList(list) {
      var result = list;
      result.forEach(function (item) {
        item.checked = true;
      });
      return result;
    },
    checkTypeOK: function checkTypeOK() {
      this.selectedType = JSON.parse((0, _stringify2.default)(this.sonTypeList));
      this.isShowTypeList = false;
      this.query();
    },
    checkTypeCancel: function checkTypeCancel() {
      this.sonTypeList = JSON.parse((0, _stringify2.default)(this.selectedType));
      this.isShowTypeList = false;
    }
  },
  watch: {
    moneyType: function moneyType(v, ov) {
      if (v != ov) {
        this.sonTypeList = [];
        this.selectedType = [];
        this.query();
      }
    },
    playerType: function playerType(v, ov) {
      if (v != ov) {
        this.sonTypeList = [];
        this.selectedType = [];
        this.query();
      }
    },
    masterType: function masterType(v, ov) {
      if (v != ov) {
        this.sonTypeList = [];
        this.selectedType = [];
        this.query();
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14)))

/***/ }),

/***/ 668:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(669)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(671),
  /* template */
  __webpack_require__(672),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 669:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(670);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("1836b8dd", content, true);

/***/ }),

/***/ 670:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 671:
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
//

exports.default = {
  props: {
    /**
    * 表格基本数据
    */
    tableData: {
      type: Array,
      default: []
    },
    /**
    * 表格详细数据
    */
    detailData: {
      type: Array,
      default: []
    },
    /**
     * 折叠关键字
     */
    mergeKey: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      foldTableData: []
    };
  },

  computed: {
    /**
    * 计算列名数组
    */
    columnArr: function columnArr() {
      var result = [];
      if (this.tableData.length > 0) {
        for (var index in this.tableData[0]) {
          result.push(index);
        }
      }
      return result;
    }
  },
  methods: {
    /**
    * 初始化表格数据
    */
    initFoldTable: function initFoldTable() {
      var _this = this;

      this.foldTableData = [];
      var mergeList = this.tableData.map(function (item) {
        return item[_this.mergeKey];
      });
      mergeList.forEach(function (merge) {
        _this.foldTableData.push({
          mergeStr: merge,
          tableData: [],
          detailData: [],
          open: false
        });
      });

      this.foldTableData.forEach(function (foldData) {
        _this.tableData.forEach(function (tdata) {
          if (tdata[_this.mergeKey] == foldData.mergeStr) {
            foldData.tableData.push(tdata);
          }
        });
        _this.detailData.forEach(function (dtdata) {
          if (dtdata[_this.mergeKey] == foldData.mergeStr) {
            foldData.detailData.push(dtdata);
          }
        });
      });
    },

    /**
    * 点击展开或折叠详细信息
    */
    toggleRowItem: function toggleRowItem(tbItem) {
      tbItem.open = !tbItem.open;
    }
  },
  watch: {
    tableData: function tableData(v, ov) {
      if (v != ov) {
        this.initFoldTable();
      }
    },
    detailData: function detailData(v, ov) {
      if (v != ov) {
        this.initFoldTable();
      }
    }
  }
};

/***/ }),

/***/ 672:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('table', {
    staticClass: "table table-bordered table-hover"
  }, [_c('thead', [_c('tr', [_c('th'), _vm._v(" "), _vm._l((_vm.columnArr), function(column) {
    return _c('th', [_vm._v(_vm._s(column))])
  })], 2)]), _vm._v(" "), _c('tbody', {
    attrs: {
      "id": "tb"
    }
  }, [_vm._l((_vm.foldTableData), function(tb) {
    return [_vm._l((tb.tableData), function(item) {
      return _c('tr', [_c('td', {
        attrs: {
          "width": "50px"
        },
        on: {
          "click": function($event) {
            _vm.toggleRowItem(tb)
          }
        }
      }, [_c('i', {
        class: {
          'icon-plus': !tb.open, 'icon-minus': tb.open
        }
      })]), _vm._v(" "), _vm._l((_vm.columnArr), function(column) {
        return _c('td', [_vm._v(_vm._s(item[column]))])
      })], 2)
    }), _vm._v(" "), _vm._l((tb.detailData), function(item) {
      return (tb.detailData.length > 0 && tb.open) ? _c('tr', [_c('td'), _vm._v(" "), _vm._l((_vm.columnArr), function(column) {
        return _c('td', [_vm._v(_vm._s(item[column]))])
      })], 2) : _vm._e()
    }), _vm._v(" "), (tb.detailData.length == 0) ? _c('tr', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (tb.open),
        expression: "tb.open"
      }]
    }, [_c('td'), _vm._v(" "), _c('td', {
      attrs: {
        "colspan": _vm.columnArr.length
      }
    }, [_vm._v("无详细数据")])]) : _vm._e()]
  })], 2), _vm._v(" "), (_vm.tableData.length == 0) ? _c('tfoot', [_c('tr', [_c('td', {
    attrs: {
      "colspan": _vm.columnArr.length
    }
  }, [_vm._v("无数据")])])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 677:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(678),
  /* template */
  __webpack_require__(679),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'chaeView',
  props: ['chartData', 'columnData'],
  components: {
    card: _card2.default
  },
  methods: {
    drawChart: function drawChart() {
      var count_date = utils.getColumnByIndex(0, this.chartData); //utils.getColumnKey('统计时间',this.columnData);
      var chae = utils.getColumnByIndex(6, this.chartData); //utils.getColumnKey('cha_e',this.columnData);
      var categories = [];
      var seriesData = [{ name: chae, data: [] }];
      this.chartData.forEach(function (item) {
        categories.push(item[count_date]);
        seriesData[0].data.push(Number(item[chae].replace(/,/g, '')));
      });
      highchartUtil.drawChart('virtualChart', 'spline', categories, seriesData, true);
    }
  },
  watch: {
    chartData: function chartData(v, ov) {
      if (v != ov) {
        this.drawChart();
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(571)))

/***/ }),

/***/ 679:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v(_vm._s(_vm.$t('common.TrendChart')))]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "virtualChart"
    }
  })])])
},staticRenderFns: []}

/***/ }),

/***/ 680:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(681)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(683),
  /* template */
  __webpack_require__(684),
  /* scopeId */
  "data-v-08c47300",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 681:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(682);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("7b676e42", content, true);

/***/ }),

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".charts[data-v-08c47300]{min-height:300px;height:300px}", ""]);

// exports


/***/ }),

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'chaeView',
  props: ['chartData', 'columnData', 'sonTypeList'],
  components: {
    card: _card2.default
  },
  methods: {
    drawChart: function drawChart() {
      var _this = this;

      var count_date = utils.getColumnByIndex(0, this.chartData); //utils.getColumnKey('统计时间',this.columnData);
      var point = utils.getColumnByIndex(1, this.chartData); //utils.getColumnKey('point',this.columnData);
      var huanbi = utils.getColumnByIndex(2, this.chartData); //utils.getColumnKey('huanbi',this.columnData);
      var template_name = utils.getColumnByIndex(1, this.sonTypeList);
      var pSeriesData = [{
        name: point,
        type: 'pie',
        data: [],
        subTitle: '',
        lineData: []
      }];
      //初始化饼图数据结构
      for (var i = 0; i < this.sonTypeList.length; i++) {
        if (i < 7) {
          pSeriesData[0].data.push([this.sonTypeList[i][template_name], Number(this.sonTypeList[i][point])]); //饼图数据
        } else if (i == 7) {
          pSeriesData[0].data.push(['其他', 0]); //饼图数据
        } else {
          pSeriesData[0].data[7][1] += Number(this.sonTypeList[i][point]);
        }
      }
      var lineData = pSeriesData[0].lineData;
      pSeriesData[0].data.forEach(function (item) {
        var tem_name = item[0];
        var cates = [];
        var obj = {
          subTitle: tem_name,
          cates: [],
          data: [{
            name: point,
            data: []
          }, {
            name: tem_name,
            data: []
          }]
        };
        _this.chartData.forEach(function (cd) {
          obj.cates.push(cd[count_date]);
          obj.data[0].data.push(Number(cd[point].replace(/,/g, '')));
          var count = 0;
          if (tem_name == '其他') {
            for (var index in cd) {
              if (index != count_date && index != point && index != huanbi && index != tem_name) {
                count += Number(cd[index].replace(/,/g, ''));
              }
            }
            obj.data[1].data.push(count);
          } else {
            obj.data[1].data.push(Number(cd[tem_name].replace(/,/g, '')));
          }
        });
        lineData.push(obj);
      });
      var pieEvent = function pieEvent(e) {
        if (!e.point.sliced) {
          _this.drawSpecial(e);
        } else {
          _this.drawSimple();
        }
      };
      highchartUtil.drawPieChart('virtualPieChart', pSeriesData, pieEvent);
      this.drawSimple();
    },
    drawSimple: function drawSimple() {
      var count_date = utils.getColumnByIndex(0, this.chartData); //utils.getColumnKey('统计时间',this.columnData);
      var point = utils.getColumnByIndex(1, this.chartData); //utils.getColumnKey('point',this.columnData);
      var categories = [];
      var seriesData = [{ name: point, data: [] }];
      this.chartData.forEach(function (item) {
        categories.push(item[count_date]);
        seriesData[0].data.push(Number(item[point].replace(/,/g, '')));
      });
      highchartUtil.drawChart('virtualSplineChart', 'spline', categories, seriesData, true);
    },
    drawSpecial: function drawSpecial(e) {
      var select_name = e.point.name;
      // let subTitle;
      var lineCate = [];
      var lineData = e.point.series.options.lineData;
      var lineSeriesData = [];
      lineData.forEach(function (item) {
        if (item.subTitle == select_name) {
          // subTitle=item.subTitle+"-各充值区间充值人数";
          lineCate = item.cates;
          lineSeriesData = item.data;
        }
      });

      highchartUtil.drawChart('virtualSplineChart', 'spline', lineCate, lineSeriesData, true);
    }
  },
  watch: {
    chartData: function chartData(v, ov) {
      if (v != ov) {
        this.drawChart();
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(571)))

/***/ }),

/***/ 684:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v(_vm._s(_vm.$t('common.TrendChart')))]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "charts col-md-4 col-sm-4 col-xs-4",
    attrs: {
      "id": "virtualPieChart"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "charts col-md-8 col-sm-8 col-xs-8",
    attrs: {
      "id": "virtualSplineChart"
    }
  })])])])
},staticRenderFns: []}

/***/ }),

/***/ 689:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  //system_id 自研业务分析系统
  1: {
    //game_id 手游弹弹堂
    101: {
      current: ['点券', '钻石']
    }
  },
  //system_id 海外发行分析系统
  2: {
    // 1: {//game_id
    //   current: ['钻石', '绑定钻石']
    // }
  },
  //system_id efunfun分析系统
  3: {
    // 1:{//game_id
    //   current: ['钻石', '绑定钻石']
    // }
  }
};

/***/ }),

/***/ 690:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "virtual-currency"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "isShowReg": true,
      "dateList": _vm.dateList
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "switch-group"
  }, [_c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("货币:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.moneyType === 1
    },
    on: {
      "click": function($event) {
        _vm.moneyType = 1
      }
    }
  }, [_vm._v(_vm._s((_vm.config && _vm.systemId && _vm.gameId) ? _vm.config[_vm.systemId][_vm.gameId].current[0] : '未定义'))]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.moneyType === 2
    },
    on: {
      "click": function($event) {
        _vm.moneyType = 2
      }
    }
  }, [_vm._v(_vm._s((_vm.config && _vm.systemId && _vm.gameId) ? _vm.config[_vm.systemId][_vm.gameId].current[1] : '未定义'))])])]), _vm._v(" "), (_vm.masterType != 5) ? _c('div', {
    staticClass: "switchs-item",
    staticStyle: {
      "margin-left": "111px"
    }
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("类型:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.selectedTypeStr),
      expression: "selectedTypeStr"
    }],
    staticClass: "form-input",
    staticStyle: {
      "padding": "0 5px"
    },
    attrs: {
      "readonly": "",
      "title": _vm.selectedTypeStr
    },
    domProps: {
      "value": (_vm.selectedTypeStr)
    },
    on: {
      "click": function($event) {
        _vm.isShowTypeList = true
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.selectedTypeStr = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.isShowTypeList) ? _c('Modal', {
    attrs: {
      "headerName": "类型选择",
      "width": "700",
      "mbHeight": "300"
    },
    on: {
      "close": _vm.checkTypeCancel
    }
  }, [_c('div', {
    attrs: {
      "slot": "modal-body"
    },
    slot: "modal-body"
  }, [(_vm.sonTypeList && _vm.sonTypeList.length > 0) ? _c('div', {
    staticClass: "checkbox-group"
  }, _vm._l((_vm.sonTypeList), function(item, index) {
    return _c('label', {
      key: index,
      staticClass: "checkbox-item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.checked),
        expression: "item.checked"
      }],
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": Array.isArray(item.checked) ? _vm._i(item.checked, null) > -1 : (item.checked)
      },
      on: {
        "change": function($event) {
          var $$a = item.checked,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = null,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.$set(item, "checked", $$a.concat([$$v])))
            } else {
              $$i > -1 && (_vm.$set(item, "checked", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
            }
          } else {
            _vm.$set(item, "checked", $$c)
          }
        }
      }
    }), _vm._v(_vm._s(item[_vm.columnData.template_name]) + "\n                   ")])
  })) : _vm._e()]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "modal-footer"
    },
    slot: "modal-footer"
  }, [_c('button', {
    staticClass: "btn btn-primary",
    on: {
      "click": _vm.checkTypeOK
    }
  }, [_vm._v("确定")])])]) : _vm._e()], 1)]) : _vm._e()])], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
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
      'active': _vm.playerType == 1
    },
    on: {
      "click": function($event) {
        _vm.playerType = 1
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('virCurrency.normalPlayer')))]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.playerType == 2
    },
    on: {
      "click": function($event) {
        _vm.playerType = 2
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('virCurrency.activePlayer')))]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.playerType == 3
    },
    on: {
      "click": function($event) {
        _vm.playerType = 3
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('virCurrency.internalPlayer')))])]), _vm._v(" "), _c('div', {
    staticClass: "steam-date"
  }, [_vm._v(_vm._s(_vm.date2))])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "steam-group"
  }, [_c('div', {
    staticClass: "steam-item",
    class: {
      active: _vm.masterType == 5
    },
    on: {
      "click": function($event) {
        _vm.masterType = 5;
      }
    }
  }, [_c('div', {
    staticClass: "steam-item-num"
  }, [_vm._v(_vm._s(_vm._f("toThousands")((_vm.listData ? _vm.listData.cha_e : -1))))]), _vm._v(" "), _c('div', [_vm._v("日环比:" + _vm._s(_vm.listData ? _vm.listData.cha_e_huanbi : -1) + "%")]), _vm._v(" "), _c('div', [_c('span', {
    staticClass: "border-text"
  }, [_vm._v("差额")]), _vm._v(" "), _c('span', {
    staticClass: "index-desc"
  }, [_vm._v("货币差额")])])]), _vm._v(" "), _c('div', {
    staticClass: "steam-equal"
  }), _vm._v(" "), _c('div', {
    staticClass: "steam-item",
    class: {
      active: _vm.masterType == 1
    },
    on: {
      "click": function($event) {
        _vm.masterType = 1;
      }
    }
  }, [_c('div', {
    staticClass: "steam-item-num"
  }, [_vm._v(_vm._s(_vm._f("toThousands")((_vm.listData ? _vm.listData.jin : -1))))]), _vm._v(" "), _c('div', [_vm._v("日环比:" + _vm._s(_vm.listData ? _vm.listData.jin_huanbi : -1) + "%")]), _vm._v(" "), _c('div', [_c('span', {
    staticClass: "border-text"
  }, [_vm._v("进")]), _vm._v(" "), _c('span', {
    staticClass: "index-desc"
  }, [_vm._v("充值或赠送货币")])])]), _vm._v(" "), _c('div', {
    staticClass: "steam-add"
  }), _vm._v(" "), _c('div', {
    staticClass: "steam-item",
    class: {
      active: _vm.masterType == 4
    },
    on: {
      "click": function($event) {
        _vm.masterType = 4;
      }
    }
  }, [_c('div', {
    staticClass: "steam-item-num"
  }, [_vm._v(_vm._s(_vm._f("toThousands")((_vm.listData ? _vm.listData.kai_cun : -1))))]), _vm._v(" "), _c('div', [_vm._v("日环比:" + _vm._s(_vm.listData ? _vm.listData.kai_cun_huanbi : -1) + "%")]), _vm._v(" "), _c('div', [_c('span', {
    staticClass: "border-text"
  }, [_vm._v("开存")]), _vm._v(" "), _c('span', {
    staticClass: "index-desc"
  }, [_vm._v("统计日前一日的库存")])])]), _vm._v(" "), _c('div', {
    staticClass: "steam-sub"
  }), _vm._v(" "), _c('div', {
    staticClass: "steam-item",
    class: {
      active: _vm.masterType == 2
    },
    on: {
      "click": function($event) {
        _vm.masterType = 2;
      }
    }
  }, [_c('div', {
    staticClass: "steam-item-num"
  }, [_vm._v(_vm._s(_vm._f("toThousands")((_vm.listData ? _vm.listData.xiao : -1))))]), _vm._v(" "), _c('div', [_vm._v("日环比:" + _vm._s(_vm.listData ? _vm.listData.xiao_huanbi : -1) + "%")]), _vm._v(" "), _c('div', [_c('span', {
    staticClass: "border-text"
  }, [_vm._v("消")]), _vm._v(" "), _c('span', {
    staticClass: "index-desc"
  }, [_vm._v("统计日消费的钻石")])])]), _vm._v(" "), _c('div', {
    staticClass: "steam-sub"
  }), _vm._v(" "), _c('div', {
    staticClass: "steam-item",
    class: {
      active: _vm.masterType == 3
    },
    on: {
      "click": function($event) {
        _vm.masterType = 3;
      }
    }
  }, [_c('div', {
    staticClass: "steam-item-num"
  }, [_vm._v(_vm._s(_vm._f("toThousands")((_vm.listData ? _vm.listData.shou_cun : -1))))]), _vm._v(" "), _c('div', [_vm._v("日环比:" + _vm._s(_vm.listData ? _vm.listData.shou_cun_huanbi : -1) + "%")]), _vm._v(" "), _c('div', [_c('span', {
    staticClass: "border-text"
  }, [_vm._v("收存")]), _vm._v(" "), _c('span', {
    staticClass: "index-desc"
  }, [_vm._v("统计日的库存")])])])])])]), _vm._v(" "), _c(_vm.currentView, {
    ref: "chartModel",
    tag: "component",
    attrs: {
      "chartData": _vm.tableData,
      "sonTypeList": _vm.sonTypeList
    }
  }), _vm._v(" "), _c('card', [_c('div', {
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
  }, [(_vm.masterType == 5) ? _c('foldTable', {
    attrs: {
      "tableData": _vm.reverseTableData,
      "detailData": _vm.tableDetail,
      "mergeKey": "统计时间"
    }
  }) : _c('normalTable', {
    attrs: {
      "tableData": _vm.reverseTableData,
      "columnWidthObj": {
        0: 150,
        1: 150,
        2: 150,
        3: 150,
        4: 150,
        5: 150,
        6: 150,
        7: 150,
        8: 150,
        9: 150,
        10: 150,
        11: 150,
        12: 150,
        13: 150,
        14: 150,
        15: 150,
        16: 150,
        17: 150
      }
    }
  })], 1)])])], 1)])
},staticRenderFns: []}

/***/ })

});