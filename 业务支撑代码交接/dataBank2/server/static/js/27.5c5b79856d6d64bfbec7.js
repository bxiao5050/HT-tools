webpackJsonp([27],{

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(656)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(658),
  /* template */
  __webpack_require__(663),
  /* scopeId */
  "data-v-1bb2f5af",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(657);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("6e4b6d02", content, true);

/***/ }),

/***/ 657:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".key-index-group[data-v-1bb2f5af]{display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;line-height:40px}.key-index-group .key-index-item[data-v-1bb2f5af]{-webkit-box-flex:1;border-right:1px solid #bbb;text-align:center}.key-index-group .key-index-item .item-middle[data-v-1bb2f5af]{font-weight:700;vertical-align:middle}.key-index-group .key-index-item .item-middle .item-add-rate[data-v-1bb2f5af]{font-size:12px;font-weight:200;color:red;vertical-align:super}.key-index-group .key-index-item[data-v-1bb2f5af]:last-child{border:0}.online-time[data-v-1bb2f5af]{position:fixed;right:0;top:30%;padding:5px 10px;line-height:30px;background-color:#00a65a;color:#fff;font-weight:700;white-space:nowrap}.online-time .time-text[data-v-1bb2f5af]{display:none}.online-time:hover .time-text[data-v-1bb2f5af]{display:inline-block}", ""]);

// exports


/***/ }),

/***/ 658:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, Utils, highchartUtil) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moduleHeader = __webpack_require__(572);

var _moduleHeader2 = _interopRequireDefault(_moduleHeader);

var _trigger = __webpack_require__(601);

var _trigger2 = _interopRequireDefault(_trigger);

var _card = __webpack_require__(570);

var _card2 = _interopRequireDefault(_card);

var _api = __webpack_require__(16);

var _api2 = _interopRequireDefault(_api);

var _normalTable = __webpack_require__(574);

var _normalTable2 = _interopRequireDefault(_normalTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'online-data',
	components: {
		card: _card2.default, moduleHeader: _moduleHeader2.default, trigger: _trigger2.default, normalTable: _normalTable2.default
	},
	data: function data() {
		return {
			date1: moment().format("YYYY-MM-DD"),
			nowTime: '',
			type: 1,

			payMoneyData: [],
			payCountData: [],
			regCountData: [],
			roleCountData: [],
			payARPUData: [],
			detailData: [],

			columnData: [] //表格列名数组
		};
	},

	computed: {
		dateList: function dateList() {
			var _this = this;

			return [{
				single: true,
				uid: 'date1',
				label: this.$t('common.Date'),
				startDate: this.date1,
				endDate: '',
				change: function change(newDate) {
					_this.date1 = newDate.startDate;_this.query();
				}
			}];
		}
	},
	mounted: function mounted() {
		var _this2 = this;

		window.timeInterval = setInterval(function () {
			_this2.getDateTime();
		}, 1000);
		this.getDateTime();
		this.query();
	},
	beforeDestroy: function beforeDestroy() {
		clearInterval(window.timeInterval);
	},

	methods: {
		getDateTime: function getDateTime() {
			this.nowTime = moment().format("HH:mm:ss");
		},
		query: function query() {
			this.getPayMoney(); //获取付费金额
			this.getPayCount(); //获取付费用户数
			this.getRegCount(); //获取注册用户数
			this.getRoleCount(); //获取创角用户数
			this.getPayARPU(); //获取付费ARPU
			this.getDetailData(); //获取详细信息
		},
		getPayMoney: function getPayMoney() {
			var _this3 = this;

			this.getQuery(1).then(function (data) {
				if (data.code == 401) {
					_this3.payMoneyData = data.state[0];
					if (_this3.type == 1) {
						_this3.drawChart(_this3.payMoneyData);
					}
				} else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			});
		},
		getPayCount: function getPayCount() {
			var _this4 = this;

			this.getQuery(2).then(function (data) {
				if (data.code == 401) {
					_this4.payCountData = data.state[0];
					if (_this4.type == 2) {
						_this4.drawChart(_this4.payCountData);
					}
				} else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			});
		},
		getRegCount: function getRegCount() {
			var _this5 = this;

			this.getQuery(3).then(function (data) {
				if (data.code == 401) {
					_this5.regCountData = data.state[0];
					if (_this5.type == 3) {
						_this5.drawChart(_this5.regCountData);
					}
				} else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			});
		},
		getRoleCount: function getRoleCount() {
			var _this6 = this;

			this.getQuery(4).then(function (data) {
				if (data.code == 401) {
					_this6.roleCountData = data.state[0];
					if (_this6.type == 4) {
						_this6.drawChart(_this6.roleCountData);
					}
				} else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			});
		},
		getPayARPU: function getPayARPU() {
			var _this7 = this;

			this.getQuery(5).then(function (data) {
				if (data.code == 401) {
					_this7.payARPUData = data.state[0];
					if (_this7.type == 5) {
						_this7.drawChart(_this7.payARPUData);
					}
				} else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			});
		},
		getDetailData: function getDetailData() {
			var _this8 = this;

			this.getQuery(6).then(function (data) {
				if (data.code == 401) {
					_this8.detailData = data.state[0];

					_this8.columnData = data.state[1];
				} else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			});
		},
		getQuery: function getQuery(select_type) {
			var params = {
				isCache: 1,
				in_date1: this.date1,
				in_date2: moment(this.date1).add(-1, 'day').format('YYYY-MM-DD'),
				in_date3: moment(this.date1).add(-7, 'day').format('YYYY-MM-DD'),
				dataview: this.$store.state.common.nowmenu.dataView,
				in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
				in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
				in_platform: '1,2',
				select_type: select_type
			};
			return _api2.default.user.getQuery(params);
		},
		drawChart: function drawChart(data) {
			var chartData = data.reverse();
			var date1 = this.date1;
			var date2 = moment(this.date1).add(-1, 'day').format('YYYY-MM-DD');
			var date3 = moment(this.date1).add(-7, 'day').format('YYYY-MM-DD');

			var dateList = [date1, date2, date3];
			var categories = [];
			var seriesData = [];
			data.map(function (item) {
				categories.push(item.count_time);
			});
			dateList.forEach(function (date) {
				seriesData.push({
					name: date,
					data: function () {
						var array = [];
						data.map(function (item) {
							array.push(item[date] * 1);
						});
						return array;
					}(),
					max: 0 });
			});
			highchartUtil.drawFiveMinLine('hourChart', categories, seriesData);
		}
	},
	watch: {
		type: function type(v, ov) {
			if (v != ov) {
				if (v == 1) {
					this.getPayMoney(); //获取付费金额
				} else if (v == 2) {
					this.getPayCount(); //获取付费用户数
				} else if (v == 3) {
					this.getRegCount(); //获取注册用户数
				} else if (v == 4) {
					this.getRoleCount(); //获取创角用户数
				} else if (v == 5) {
					this.getPayARPU(); //获取付费ARPU
				}
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
//
//
//
//
//
//
//
//
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

/***/ 663:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    attrs: {
      "id": "ss-data"
    }
  }, [_c('div', {
    staticClass: "content-header"
  }, [_c('moduleHeader', {
    attrs: {
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
  }, [_vm._v(_vm._s(_vm.$t('common.IndexKey')))]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    staticClass: "key-index-group"
  }, [_c('div', {
    staticClass: "key-index-item"
  }, [_c('div', {
    staticClass: "item-top"
  }, [_vm._v(_vm._s(_vm.$t('onlineData.PayUser')))]), _vm._v(" "), _c('div', {
    staticClass: "item-middle"
  }, [_vm._v("3301\n\t\t\t\t\t\t\t"), _c('span', {
    staticClass: "item-add-rate"
  }, [_vm._v("+156.2")])]), _vm._v(" "), _c('div', {
    staticClass: "item-bottom"
  }, [_vm._v(_vm._s(_vm.$t('onlineData.Day')) + " 1.10%")])]), _vm._v(" "), _c('div', {
    staticClass: "key-index-item"
  }, [_c('div', {
    staticClass: "item-top"
  }, [_vm._v(_vm._s(_vm.$t('onlineData.PayMoney')))]), _vm._v(" "), _c('div', {
    staticClass: "item-middle"
  }, [_vm._v("3301\n\t\t\t\t\t\t\t"), _c('span', {
    staticClass: "item-add-rate"
  }, [_vm._v("+156.2")])]), _vm._v(" "), _c('div', {
    staticClass: "item-bottom"
  }, [_vm._v(_vm._s(_vm.$t('onlineData.Day')) + " 1.10%")])]), _vm._v(" "), _c('div', {
    staticClass: "key-index-item"
  }, [_c('div', {
    staticClass: "item-top"
  }, [_vm._v(_vm._s(_vm.$t('onlineData.RegUserNew')))]), _vm._v(" "), _c('div', {
    staticClass: "item-middle"
  }, [_vm._v("3301\n\t\t\t\t\t\t\t"), _c('span', {
    staticClass: "item-add-rate"
  }, [_vm._v("+156.2")])]), _vm._v(" "), _c('div', {
    staticClass: "item-bottom"
  }, [_vm._v(_vm._s(_vm.$t('onlineData.Day')) + " 1.10%")])]), _vm._v(" "), _c('div', {
    staticClass: "key-index-item"
  }, [_c('div', {
    staticClass: "item-top"
  }, [_vm._v(_vm._s(_vm.$t('onlineData.CreateRoles')))]), _vm._v(" "), _c('div', {
    staticClass: "item-middle"
  }, [_vm._v("3301\n\t\t\t\t\t\t\t"), _c('span', {
    staticClass: "item-add-rate"
  }, [_vm._v("+156.2")])]), _vm._v(" "), _c('div', {
    staticClass: "item-bottom"
  }, [_vm._v(_vm._s(_vm.$t('onlineData.Day')) + " 1.10%")])])])])]), _vm._v(" "), _c('card', [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "card-header-title"
  }, [_vm._v(_vm._s(_vm.$t('onlineData.HourData')))]), _vm._v(" "), _c('div', {
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
  }, [_vm._v(_vm._s(_vm.$t('onlineData.PayMoney')))]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 2
    },
    on: {
      "click": function($event) {
        _vm.type = 2
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('onlineData.PayUser')))]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 3
    },
    on: {
      "click": function($event) {
        _vm.type = 3
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('onlineData.RegUserNew')))]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 4
    },
    on: {
      "click": function($event) {
        _vm.type = 4
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('onlineData.CreateRoles')))]), _vm._v(" "), _c('div', {
    staticClass: "tab-item",
    class: {
      'active': _vm.type == 5
    },
    on: {
      "click": function($event) {
        _vm.type = 5
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('onlineData.PayArpu')))])])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    attrs: {
      "id": "hourChart"
    }
  })])]), _vm._v(" "), _c('card', [_c('div', {
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
      "tableData": _vm.detailData
    }
  })], 1)])])], 1), _vm._v(" "), _c('div', {
    staticClass: "online-time"
  }, [_c('i', {
    staticClass: "icon-time"
  }), _vm._v(" "), _c('span', {
    staticClass: "time-text"
  }, [_vm._v("当前时间:" + _vm._s(_vm.nowTime))])])])
},staticRenderFns: []}

/***/ })

});