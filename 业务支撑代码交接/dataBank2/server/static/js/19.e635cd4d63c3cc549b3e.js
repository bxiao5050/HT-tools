webpackJsonp([19],{

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(841)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(843),
  /* template */
  __webpack_require__(844),
  /* scopeId */
  "data-v-253117d3",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 841:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(842);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("1fd78b21", content, true);

/***/ }),

/***/ 842:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".item-content[data-v-253117d3]{margin-right:15px;float:left;line-height:30px}.item-content .bt-item[data-v-253117d3]{cursor:pointer;padding:0 15px;float:left;background-color:#fff;border:1px solid #bbb;border-right:0;text-align:center}.item-content .bt-item[data-v-253117d3]:last-child{border-right:1px solid #bbb}.item-content .bt-item.check[data-v-253117d3]{font-weight:700;color:#fff;background-color:#fc9153}.flex-row[data-v-253117d3]{display:flex;justify-content:flex-start;align-items:flex-start}.flex-row .war-type-table[data-v-253117d3]{flex:4;white-space:nowrap;max-height:400px;overflow-y:auto}.flex-row .chart-group[data-v-253117d3]{flex:8}.table-content[data-v-253117d3]{white-space:nowrap;overflow-y:auto}", ""]);

// exports


/***/ }),

/***/ 843:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'war-type-analysis',
  components: {
    moduleHeader: _moduleHeader2.default, card: _card2.default, normalTable: _elementTable2.default
  },
  data: function data() {
    return {
      date1: moment().add(-7, 'day').format('YYYY-MM-DD'),
      date2: moment().add(-1, 'day').format('YYYY-MM-DD'),
      type: 1,

      templateList: [],
      tableData: [],

      selectedList: []
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
        isShowDatetype: false,
        change: function change(newDate) {
          _this.date1 = newDate.startDate;
          _this.date2 = newDate.endDate;
          _this.query();
        }
      }];
    },
    columnData: function columnData() {
      return {
        template_name: utils.getColumnByIndex(0, this.templateList),
        day_avg: utils.getColumnByIndex(1, this.templateList),
        rate: utils.getColumnByIndex(2, this.templateList)
      };
    },
    templateColumnArr: function templateColumnArr() {
      var result = [];
      if (this.templateList && this.templateList.length > 0) {
        for (var index in this.templateList[0]) {
          result.push(index);
        }
      }
      return result;
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
        isCache: 1,
        in_date1: this.date1,
        in_date2: this.date2,
        dataview: this.$store.state.common.nowmenu.dataView,
        in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
        in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
        in_os: this.$store.getters['OS/nowOS'],
        in_type_id: this.type
      };
    },
    query: function query() {
      var _this2 = this;

      var params = this.getParams();
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.templateList = data.state[0];
          _this2.tableData = data.state[1];
          _this2.columnData = data.state[2] ? data.state[2] : [];

          // if(this.selectedList.length===0){
          _this2.selectedList = [];
          for (var i = 0; i < _this2.templateList.length; i++) {
            if (i < 5) {
              _this2.selectedList.push(_this2.templateList[i]);
            }
          }
          // }
          _this2.drawChart();
        } else {
          // console.log(data)
          Utils.Notification.error({ message: data.message });
        }
      });
    },
    exportData: function exportData() {
      var params = this.getParams();
      _api2.default.user.exportData(params);
    },
    drawChart: function drawChart() {
      var template_name = utils.getColumnByIndex(0, this.templateList);

      var count_date = utils.getColumnByIndex(0, this.tableData);

      var categories = [];
      var seriesData = [];
      this.selectedList.forEach(function (list) {
        seriesData.push({
          name: list[template_name],
          data: []
        });
      });
      this.tableData.forEach(function (item) {
        categories.push(item[count_date]);
        seriesData.forEach(function (a) {
          a.data.push(Number(item[a.name].replace(/,/g, '')));
        });
      });
      highchartUtil.drawChart('warTypeChart', 'spline', categories, seriesData);
    }
  },
  watch: {
    type: function type(v, ov) {
      if (v != ov) {
        this.query();
      }
    },
    selectedList: function selectedList(v, ov) {
      if (v.length > 5) {
        Utils.Notification.warning({ message: '最多只能选择五个!' });
        this.selectedList = ov;
      } else {
        this.drawChart();
      }
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14), __webpack_require__(571)))

/***/ }),

/***/ 844:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "dateList": _vm.dateList,
      "isShowReg": true
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "switchs-item"
  }, [_c('span', {
    staticClass: "item-header"
  }, [_vm._v("指标:")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.type === 1
    },
    on: {
      "click": function($event) {
        _vm.type = 1
      }
    }
  }, [_vm._v("战斗人数")]), _vm._v(" "), _c('div', {
    staticClass: "bt-item",
    class: {
      'check': _vm.type === 2
    },
    on: {
      "click": function($event) {
        _vm.type = 2
      }
    }
  }, [_vm._v("战斗场次")])])])], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_vm._v(_vm._s(_vm.$t('common.IndexKey')))]), _vm._v(" "), _c('div', {
    staticClass: "flex-row",
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "war-type-table"
  }, [(_vm.selectedList.length > 0) ? _c('table', {
    staticClass: "table"
  }, [_c('thead', [_c('tr', [_c('th'), _vm._v(" "), _vm._l((_vm.templateColumnArr), function(item, index) {
    return [_c('th', [_vm._v(_vm._s(item))])]
  })], 2)]), _vm._v(" "), _c('tbody', _vm._l((_vm.templateList), function(item) {
    return _c('tr', [_c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.selectedList),
        expression: "selectedList"
      }],
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "value": item,
        "checked": Array.isArray(_vm.selectedList) ? _vm._i(_vm.selectedList, item) > -1 : (_vm.selectedList)
      },
      on: {
        "change": function($event) {
          var $$a = _vm.selectedList,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = item,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.selectedList = $$a.concat([$$v]))
            } else {
              $$i > -1 && (_vm.selectedList = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.selectedList = $$c
          }
        }
      }
    })]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item[_vm.columnData.template_name]))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item[_vm.columnData.day_avg]))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item[_vm.columnData.rate] + '%'))])])
  })), _vm._v(" "), _c('tfoot', [_c('tr', [_c('td', {
    staticStyle: {
      "color": "red"
    },
    attrs: {
      "colspan": "10"
    }
  }, [_vm._v("提示:最多只能选五个!")])])])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "chart-group"
  }, [_c('div', {
    staticClass: "charts",
    attrs: {
      "id": "warTypeChart"
    }
  })])])]), _vm._v(" "), _c('card', [_c('div', {
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
        13: 150
      }
    }
  })], 1)])])], 1)])
},staticRenderFns: []}

/***/ })

});