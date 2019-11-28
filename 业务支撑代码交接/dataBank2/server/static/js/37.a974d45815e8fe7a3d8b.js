webpackJsonp([37],{

/***/ 529:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(714)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(716),
  /* template */
  __webpack_require__(717),
  /* scopeId */
  "data-v-1c5045ec",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 714:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(715);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("5d21482a", content, true);

/***/ }),

/***/ 715:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".table-content[data-v-1c5045ec]{overflow:auto;width:100%;max-height:500px}", ""]);

// exports


/***/ }),

/***/ 716:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, Utils, highchartUtil) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(56);

var _assign2 = _interopRequireDefault(_assign);

var _moduleHeader = __webpack_require__(572);

var _moduleHeader2 = _interopRequireDefault(_moduleHeader);

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

var _elementTable = __webpack_require__(573);

var _elementTable2 = _interopRequireDefault(_elementTable);

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

exports.default = {
  name: 'index-trend',
  components: {
    moduleHeader: _moduleHeader2.default,
    card: _card2.default,
    normalTable: _elementTable2.default
  },
  data: function data() {
    return {
      datetype: 1,
      date1: moment().add(-7, 'day').format('YYYY-MM-DD'),
      date2: moment().add(-1, 'day').format('YYYY-MM-DD'),
      tableData: []
    };
  },
  mounted: function mounted() {
    this.query();
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
        isShowDatetype: true,
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
    reverseTableData: function reverseTableData() {
      if (this.systemId == 2) {
        return this.tableData;
      } else {
        var result = this.tableData.map(function (item) {
          return item;
        });
        result.reverse();
        return result;
      }
    }
  },
  methods: {
    datetypeChange: function datetypeChange(newVal) {
      this.datetype = newVal;
      if (newVal == 1) {
        this.date1 = moment().add(-7, 'day').format('YYYY-MM-DD');
        this.date2 = moment().add(-1, 'day').format('YYYY-MM-DD');
      } else if (newVal == 2) {
        this.date1 = moment().add(-7, 'week').day(1).format('YYYY-MM-DD');
        this.date2 = moment().add(-1, 'day').format('YYYY-MM-DD');
      } else if (newVal == 3) {
        this.date1 = moment().add(-6, 'month').date(1).format('YYYY-MM-DD');
        this.date2 = moment().add(-1, 'day').format('YYYY-MM-DD');
      }
      this.query();
    },
    getParams: function getParams() {
      if (this.systemId == 1) {
        return {
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: this.date1,
          in_date2: this.date2,
          in_type_id: this.datetype,
          in_gamezone_id: this.$store.getters['Agent/selectedIdList'],
          in_reg_channel: this.$store.getters['RegChannel/selectedIdList'],
          in_pay_channel: this.$store.getters['PayChannel/selectedIdList'],
          in_os: this.$store.getters['OS/nowOS'],
          is_all: this.$store.getters['RegChannel/isAllSelect'],
          isCache: 1
        };
      } else if (this.systemId == 2) {
        return {
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: this.date1,
          in_date2: this.date2,
          in_config_id: this.datetype,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_channel_id: this.$store.getters['RegChannel/selected2IdList'],
          in_package_id: this.$store.getters['RegChannel/selected3IdList'],
          isCache: 1
        };
      } else if (this.systemId == 3) {
        return {
          dataview: this.$store.state.common.nowmenu.dataView,
          in_date1: this.date1,
          in_date2: this.date2,
          in_config_id: '',
          date_type: this.datetype,
          in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
          in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
          in_platform: '1,2',
          isCache: 1
        };
      }
    },
    query: function query() {
      var _this2 = this;

      this.tableData = [];
      var params = this.getParams();
      _api2.default.user.getQuery(params).then(function (data) {
        if (data.code == 401) {
          _this2.tableData = data.state[0];
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
      if (this.systemId == 1) {
        this.drawChart_normal();
      } else if (this.systemId == 2) {
        this.drawChart_oversea();
      } else if (this.systemId == 3) {
        this.drawChart_e8();
      }
    },
    drawChart_normal: function drawChart_normal() {
      // let str = this.datetype==1?'day_':(this.datetype==2?'week_':'month_');
      var count_date = utils.getColumnByIndex(0, this.tableData); //utils.getColumnKey('统计时间',this.columnData);
      var reg_count = utils.getColumnByIndex(1, this.tableData); //utils.getColumnKey(str+'reg_count',this.columnData);
      var active_online = utils.getColumnByIndex(2, this.tableData); //utils.getColumnKey(str+'active_online',this.columnData);
      var max_online = utils.getColumnByIndex(3, this.tableData); //utils.getColumnKey(str+'max_online',this.columnData);
      var pay_count = utils.getColumnByIndex(4, this.tableData); //utils.getColumnKey(str+'pay_count',this.columnData);
      var pay = utils.getColumnByIndex(5, this.tableData); //utils.getColumnKey(str+'pay',this.columnData);
      var arpu = utils.getColumnByIndex(6, this.tableData); //utils.getColumnKey(str+'arpu',this.columnData);

      var categories = [];
      var seriesData = [];
      var filterName = [reg_count, active_online, max_online, pay_count, pay, arpu];
      var index = 0;
      filterName.forEach(function (item) {
        // if(index==filterName[this.datetype-1].length-1){//当付费金额时使用另一条Y轴,临时方案
        if (item == pay) {
          seriesData.push({ name: item, data: [], yAxis: 1 });
        } else {
          seriesData.push({ name: item, data: [], yAxis: 0 });
        }
        index++;
      });
      this.tableData.forEach(function (item) {
        categories.push(item[count_date]);
        seriesData[0].data.push(Number(item[reg_count].replace(/,/g, '')));
        seriesData[1].data.push(Number(item[active_online].replace(/,/g, '')));
        seriesData[2].data.push(Number(item[max_online].replace(/,/g, '')));
        seriesData[3].data.push(Number(item[pay_count].replace(/,/g, '')));
        seriesData[4].data.push(Number(item[pay].replace(/,/g, '')));
        seriesData[5].data.push(Number(item[arpu].replace(/,/g, '')));
      });
      highchartUtil.drawChart('indexTrendChart', 'spline', categories, seriesData);
    },
    drawChart_oversea: function drawChart_oversea() {
      var count_date = utils.getColumnByIndex(0, this.tableData); //utils.getColumnKey('count_date',this.columnData);
      var reg_count = utils.getColumnByIndex(1, this.tableData); //utils.getColumnKey('reg_count',this.columnData);
      var login_count = utils.getColumnByIndex(2, this.tableData); //utils.getColumnKey('login_count',this.columnData);
      var active_count = utils.getColumnByIndex(3, this.tableData);
      // let logincounts_avg=utils.getColumnByIndex(3,this.tableData)//utils.getColumnKey('logincounts_avg',this.columnData);
      // let paycount_avg=utils.getColumnByIndex(4,this.tableData)//utils.getColumnKey('paycount_avg',this.columnData);
      var pay_count = utils.getColumnByIndex(4, this.tableData); //utils.getColumnKey('pay_count',this.columnData);
      // let pay_point=utils.getColumnByIndex(6,this.tableData)//utils.getColumnKey('pay_point',this.columnData);
      var pay_money = utils.getColumnByIndex(5, this.tableData); //utils.getColumnKey('pay_money',this.columnData);
      var web_pay_count = utils.getColumnByIndex(6, this.tableData);
      var web_pay_money = utils.getColumnByIndex(7, this.tableData);

      var categories = [];
      var seriesData = [];
      // var filterName=[
      //   ['日注册用户数','日活跃用户数','人均登录次数','登付比','日付费用户数','日付费ARPU','日付费金额'],
      //   ['周注册用户数','周活跃用户数','人均登录次数','登付比','周付费用户数','周付费ARPU','周付费金额'],
      //   ['月注册用户数','月活跃用户数','人均登录次数','登付比','月付费用户数','月付费ARPU','月付费金额']
      // ]
      var filterName = [reg_count, login_count, active_count, pay_count, pay_money, web_pay_count, web_pay_money];
      // if(this.datetype){
      var index = 0;
      filterName.forEach(function (item) {
        // if(index==filterName[this.datetype-1].length-1){//当付费金额时使用另一条Y轴,临时方案
        if (item == pay_money) {
          seriesData.push({ name: item, data: [], yAxis: 1 });
        } else {
          seriesData.push({ name: item, data: [], yAxis: 0 });
        }
        index++;
      });
      // }
      // let chartData = this.tableData.sort((a, b) => {
      //   return moment(a[count_date]) - moment(b[count_date])
      // })
      var chartData = (0, _assign2.default)([], this.tableData);
      chartData.reverse();
      chartData.forEach(function (item) {
        categories.push(item[count_date]);
        seriesData[0].data.push(Number(item[reg_count]));
        seriesData[1].data.push(Number(item[login_count]));
        seriesData[2].data.push(Number(item[active_count]));
        seriesData[3].data.push(Number(item[pay_count]));
        seriesData[4].data.push(Number(item[pay_money]));
        seriesData[5].data.push(Number(item[web_pay_count]));
        seriesData[6].data.push(Number(item[web_pay_money]));
      });
      highchartUtil.drawChart('indexTrendChart', 'spline', categories, seriesData);
    },
    drawChart_e8: function drawChart_e8() {
      var count_date = utils.getColumnByIndex(0, this.tableData); //utils.getColumnKey('count_date',this.columnData);
      var reg_count = utils.getColumnByIndex(1, this.tableData); //utils.getColumnKey('reg_count',this.columnData);
      var login_count = utils.getColumnByIndex(2, this.tableData); //utils.getColumnKey('login_count',this.columnData);
      var logincounts_avg = utils.getColumnByIndex(3, this.tableData); //utils.getColumnKey('logincounts_avg',this.columnData);
      var paycount_avg = utils.getColumnByIndex(4, this.tableData); //utils.getColumnKey('paycount_avg',this.columnData);
      var pay_count = utils.getColumnByIndex(5, this.tableData); //utils.getColumnKey('pay_count',this.columnData);
      var pay_point = utils.getColumnByIndex(6, this.tableData); //utils.getColumnKey('pay_point',this.columnData);
      var pay_money = utils.getColumnByIndex(7, this.tableData); //utils.getColumnKey('pay_money',this.columnData);

      var categories = [];
      var seriesData = [];
      // var filterName=[
      //   ['日注册用户数','日活跃用户数','人均登录次数','登付比','日付费用户数','日付费ARPU','日付费金额'],
      //   ['周注册用户数','周活跃用户数','人均登录次数','登付比','周付费用户数','周付费ARPU','周付费金额'],
      //   ['月注册用户数','月活跃用户数','人均登录次数','登付比','月付费用户数','月付费ARPU','月付费金额']
      // ]
      var filterName = [reg_count, login_count, logincounts_avg, paycount_avg, pay_count, pay_point, pay_money];
      // if(this.datetype){
      var index = 0;
      filterName.forEach(function (item) {
        // if(index==filterName[this.datetype-1].length-1){//当付费金额时使用另一条Y轴,临时方案
        if (item == pay_money) {
          seriesData.push({ name: item, data: [], yAxis: 1 });
        } else {
          seriesData.push({ name: item, data: [], yAxis: 0 });
        }
        index++;
      });
      // }
      this.tableData.forEach(function (item) {
        categories.push(item[count_date]);
        seriesData[0].data.push(Number(item[reg_count]));
        seriesData[1].data.push(Number(item[login_count]));
        seriesData[2].data.push(Number(item[logincounts_avg]));
        seriesData[3].data.push(Number(item[paycount_avg]));
        seriesData[4].data.push(Number(item[pay_count]));
        seriesData[5].data.push(Number(item[pay_point]));
        seriesData[6].data.push(Number(item[pay_money]));
      });
      highchartUtil.drawChart('indexTrendChart', 'spline', categories, seriesData);
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(14), __webpack_require__(571)))

/***/ }),

/***/ 717:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "index-trend"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
      "datetype": _vm.datetype,
      "isShowReg": true,
      "dateList": _vm.dateList
    },
    on: {
      "datetypeChange": _vm.datetypeChange
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "content-body"
  }, [_c('card', [_c('div', {
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
      "id": "indexTrendChart"
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
      "tableData": _vm.reverseTableData
    }
  })], 1)])])], 1)])
},staticRenderFns: []}

/***/ })

});