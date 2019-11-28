webpackJsonp([18],{

/***/ 1118:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1119);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("41c02af6", content, true);

/***/ }),

/***/ 1119:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, ".month-picker[data-v-0e9decb6]{display:flex}.min-width[data-v-0e9decb6]{min-width:570px}.txtsp[data-v-0e9decb6]{margin-top:-1px}i[data-v-0e9decb6]{position:relative;top:-2px;padding-left:8px;padding-right:10px}.title[data-v-0e9decb6]{color:#5b5691;font-size:20px;font-family:\\\\9ED1\\4F53;margin-left:16px}.selection-box[data-v-0e9decb6]{margin-top:5px}.section-left[data-v-0e9decb6]{font-size:15px;padding-left:16px;margin-right:16px}.os[data-v-0e9decb6]{width:100px}.el-select-dropdown__item[data-v-0e9decb6]{text-align:center}.channel-list-card[data-v-0e9decb6]{margin:16px;padding:10px 0 0}.channel-list-card button[data-v-0e9decb6]{color:#fff;margin:0 10px 10px}.channel-list-card button.on[data-v-0e9decb6]{background:#5b5691!important}.channel-list-card button.red[data-v-0e9decb6]{background:red}.channel-list-card button.green[data-v-0e9decb6]{background:green}.cell-inline[data-v-0e9decb6]{border-right:2px solid #ebeef5;display:flex;height:175px;flex-direction:column;align-items:center;justify-content:center}.cell-inline div[data-v-0e9decb6]{height:100%;display:flex;justify-content:center;align-items:center;width:100%;border-bottom:1px solid #ebeef5}.cell-inline.my-pointer[data-v-0e9decb6]{cursor:pointer;user-select:none}", ""]);

// exports


/***/ }),

/***/ 1120:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1121);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(523)("1764540f", content, true);

/***/ }),

/***/ 1121:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(522)(false);
// imports


// module
exports.push([module.i, "td.complement-data-type{padding:0!important;height:175px}td.complement-data-type .cell{padding:0!important}td .cell-inline-input{width:100%;text-align:center;border:1px dashed #5b5691;outline:none}td .cell-inline .cell-inline-item{cursor:pointer}.cell-inline .pending{color:#fff;background:#5b5691}.complement th{padding:0;border-top:1px solid #ebeef5;border-right:2px solid #ebeef5}.complement th.pending .cell{color:#fff;background:#5b5691}.complement th .cell{line-height:36px}.complement .date-box-item label{margin-bottom:0}.complement-fixed{position:fixed;top:0;z-index:999}", ""]);

// exports


/***/ }),

/***/ 1122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(270);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _http = __webpack_require__(28);

var _http2 = _interopRequireDefault(_http);

var _index = __webpack_require__(594);

var _index2 = _interopRequireDefault(_index);

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
//
//
//
//
//
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
  name: "complement",
  components: {
    tsdp: _index2.default
  },
  data: function data() {
    return {
      isOn: null,
      loading: false,
      filter: [],
      data: {
        allTxt: "全部（国家/地区）",
        isShow: false,
        region: null,
        game: null,
        regionArr: [],
        gameArr: [],
        callback: this.setRcg
      },
      os: null,
      curChannel: null,
      curYear: null,
      curMonth: null,
      input: null,
      inputParent: null,
      editInput: null,
      editInputParent: null,
      pending: [],
      ctrling: 0,
      shifting: 0
    };
  },

  computed: {
    $$data: function $$data() {
      var _this = this;

      var data = this.$store.getters["o_c_complement/getList"];
      if (data && data.list.regions.length && !this.$data.loading) this.$nextTick(function () {
        _this.$_th = _this.$refs.table.$refs.headerWrapper.querySelectorAll("th");
      });
      return data;
    },
    _channelList: function _channelList() {
      return this.$store.getters["o_c_complement/getChannels"];
    },
    _rcg: function _rcg() {
      var str = "无";
      if (this.data.region) {
        if (this.data.game) {
          str = this.data.game;
        }
      }
      return str;
    },
    _state: function _state() {
      return this.$store.state.o_c_complement;
    },
    _date: function _date() {
      var end = moment(new Date(this.curYear, this.curMonth, 0)).format("YYYY-MM-DD");
      return [moment(new Date(this.curYear, this.curMonth - 1, 1)).format("YYYY-MM-DD"), end, end.slice(-2) * 1];
    }
  },
  watch: {
    curChannel: function curChannel(data) {
      this.$store.commit("o_c_complement/setCurChannel", data);
    },
    isOn: function isOn(data) {
      this.$store.commit("o_c_complement/setOnIndex", data);
    },
    curYear: function curYear(data) {
      this.$store.commit("o_c_complement/setCurYear", data);
    },
    curMonth: function curMonth(data) {
      this.$store.commit("o_c_complement/setCurMonth", data);
    }
  },
  methods: {
    changeOs: function changeOs(val) {
      this.$store.commit("o_c_complement/setOs", val);
      this.channelQuery();
    },
    channel_list_class: function channel_list_class(item, i) {
      var arr = [];
      if (i === this.isOn) {
        arr.push("on");
      }
      if (item.isBulu) {
        arr.push("green");
      } else {
        arr.push("red");
      }
      return arr.join(" ");
    },
    onblurEvent: function onblurEvent() {
      if (this.input.value >= "0") {
        this.inputParent.innerHTML = this.input.value;
      } else {
        this.inputParent.innerHTML = "0";
      }
      this.input.removeEventListener("blur", this.onblurEvent);
      this.input = this.inputParent = null;
    },
    onblurEvent_: function onblurEvent_() {
      var _this2 = this;

      this.editInputParent.innerHTML = "修改";
      if (this.editInput.value >= "0") {
        this.pending.forEach(function (target) {
          _this2.$_th[target.dataset.label * 1 + 1].classList.remove("pending");
          target.innerHTML = _this2.editInput.value;
          target.classList.remove("pending");
        });
        this.pending = [];
      }
      this.editInput.removeEventListener("blur", this.onblurEvent_);
      this.editInput = this.editInputParent = null;
    },
    cell_dbClick: function cell_dbClick(row, column, cell, event) {
      if (cell.classList.contains("editable")) {
        this.input = document.createElement("input");
        this.inputParent = event.target;
        if (this.inputParent.classList.contains("pending")) {
          this.inputParent.classList.remove("pending");
          this.pending.splice(this.pending.indexOf(this.inputParent), 1);
        }
        this.inputParent.innerHTML = "";
        this.inputParent.append(this.input);
        this.input.setAttribute("class", "cell-inline-input");
        this.input.focus();
        this.input.addEventListener("blur", this.onblurEvent);

        this.$_th[event.target.dataset.label * 1 + 1].classList.remove("pending");
      }
    },
    pendingClear: function pendingClear() {
      var _this3 = this;

      this.pending.forEach(function (target) {
        var i = target.dataset.label * 1 + 1;
        _this3.$_th[i].classList.remove("pending");
        target.classList.remove("pending");
      });
      this.pending = [];
    },
    cell_click: function cell_click(row, column, cell, _ref) {
      var _this4 = this;

      var target = _ref.target;

      if (cell.classList.contains("editable")) {
        var classList = target.classList,
            dataset = target.dataset;

        if (!this.inputParent) {
          if (classList.contains("pending")) {
            classList.remove("pending");
            var i = target.dataset.label * 1 + 1;
            this.$_th[i].classList.remove("pending");
            this.pending.splice(this.pending.indexOf(target), 1);
          } else {
            if (this.pending.length) {
              var isSameRegion = this.pending[0].dataset.region === dataset.region;
              var isSameKeyIndex = this.pending[0].dataset.index === dataset.index;
              if (!isSameRegion || !isSameKeyIndex) {
                this.pendingClear();
              }
            }
            console.log(new Date().getTime(), this.ctrling, this.shifting);
            if (!this.ctrling && !this.shifting) {
              this.pending.length && this.pendingClear();
            }
            if (this.shifting && this.pending.length) {
              var start = this.pending[this.pending.length - 1].dataset.label * 1;
              var end = dataset.label * 1;
              if (end - start > 1) {
                var list = document.querySelectorAll('.editable-item[data-region="' + dataset.region + '"][data-index="' + dataset.index + '"]');
                list.forEach(function (item, i) {
                  if (item.dataset.label * 1 > start && item.dataset.label * 1 < end) {
                    _this4.pending.push(item);
                  }
                });
              }
            }
            if (target.classList.contains('editable-item')) {
              this.pending.push(target);
            }

            this.pending.length > 1 && this.pending.sort(function (a, b) {
              return a.dataset.label - b.dataset.label;
            });

            this.pending.forEach(function (item) {
              var i = item.dataset.label * 1 + 1;
              !_this4.$_th[i].classList.contains("pending") && _this4.$_th[i].classList.add("pending");
              !item.classList.contains("pending") && item.classList.add("pending");
            });
          }
        }
      }
    },
    rowClassName: function rowClassName(_ref2) {
      var row = _ref2.row,
          rowIndex = _ref2.rowIndex;

      if (this.filter.length) {
        if (this.filter.indexOf(rowIndex) === -1) {
          return "hide";
        }
      }
      return "";
    },
    regionFormatter: function regionFormatter(row, column, cellValue) {
      var h = this.$createElement;

      return h(
        "div",
        { "class": "cell-inline" },
        [this.$store.state.overseas_common.regionMap[cellValue] || cellValue]
      );
    },
    myFormatter: function myFormatter(row, column, cellValue) {
      var h = this.$createElement;

      return h(
        "div",
        { "class": "cell-inline types" },
        [h("div", ["\u5355\u4EF7"]), h("div", ["\u6FC0\u6D3B"]), h("div", ["\u6CE8\u518C"]), h("div", ["\u521B\u89D2"]), h("div", ["\u82B1\u8D39"])]
      );
    },
    myFormatter_: function myFormatter_(row, column) {
      var h = this.$createElement;
      var _$$data = this.$$data,
          keys = _$$data.keys,
          index = _$$data.index,
          list = _$$data.list,
          types = _$$data.types;

      var region = row.region;
      var date = column.label.length === 1 ? "0" + column.label : column.label;
      var m = this.curMonth < 10 ? "0" + this.curMonth : this.curMonth;
      date = this.curYear + "-" + m + "-" + date;
      var data = list[region][date];

      return h(
        "div",
        { "class": "cell-inline my-pointer" },
        [types.map(function (keyIndex, i) {
          return h(
            "div",
            {
              "class": "editable-item",
              attrs: { "data-region": region,
                "data-label": column.label,
                "data-i": i,
                "data-index": keyIndex
              }
            },
            [Number(data[keys[keyIndex]])]
          );
        })]
      );
    },
    _myFormatter: function _myFormatter(row, column) {
      var _this5 = this;

      var h = this.$createElement;
      var _$$data2 = this.$$data,
          keys = _$$data2.keys,
          index = _$$data2.index,
          list = _$$data2.list,
          types = _$$data2.types;

      var region = row.region;
      return h(
        "div",
        { "class": "cell-inline" },
        [types.map(function (keyIndex, i) {
          return h(
            "div",
            {
              on: {
                "click": _this5.editVal.bind(_this5, { region: region, keyIndex: keyIndex })
              },

              "class": "cell-inline-item",
              attrs: { "data-region": region,
                "data-index": keyIndex
              }
            },
            ["\u4FEE\u6539"]
          );
        })]
      );
    },
    editVal: function editVal(_ref3) {
      var _this6 = this;

      var region = _ref3.region,
          keyIndex = _ref3.keyIndex;

      if (this.pending.length) {
        this.editInput = document.createElement("input");
        this.editInputParent = event.target;
        this.editInputParent.innerHTML = "";
        this.editInputParent.append(this.editInput);
        this.editInput.setAttribute("class", "cell-inline-input");
        this.editInput.focus();
        this.editInput.addEventListener("blur", this.onblurEvent_);
      } else {
        if (confirm("确认修改？")) {
          var param = {
            in_country: region,
            in_begin_date: this._date[0],
            in_end_date: this._date[1],
            in_unite_id: this.data.gameArr[0],
            in_os: this.os,
            in_mediasource: this.curChannel,
            in_val: function () {
              var map = [];
              var list = document.querySelectorAll('.editable-item[data-region="' + region + '"][data-index="' + keyIndex + '"]');
              list.forEach(function (item) {
                map.push(item.innerHTML * 1);
              });
              return map.join(",");
            }(),
            in_type: this.$$data.typeIndex[keyIndex]
          };
          var url = "/query/" + 'edit_repair_data';
          _http2.default.post(url, param).then(function (_ref4) {
            var code = _ref4.code;

            if (code === 401) {
              _this6.$notify({
                type: "success",
                message: "修改成功"
              });
            }
          });
        }
      }
    },
    editMonth: function editMonth(bool) {
      if (bool) {
        if (this.curMonth === 12) {
          this.curYear += 1;
          this.curMonth = 1;
        } else {
          this.curMonth += 1;
        }
      } else {
        if (this.curMonth === 1) {
          this.curYear -= 1;
          this.curMonth = 12;
        } else {
          this.curMonth -= 1;
        }
      }
      this.dataQuery();
    },
    c_list_handler: function c_list_handler(item, i) {
      if (this.isOn !== i) {
        this.isOn = i;
        this.curChannel = item.channelName;
        this.dataQuery();
      }
    },
    setRcg: function setRcg(_ref5) {
      var _ref6 = (0, _slicedToArray3.default)(_ref5, 4),
          region = _ref6[0],
          regionArr = _ref6[1],
          game = _ref6[2],
          gameArr = _ref6[3];

      this.data.region = region;
      this.data.regionArr = regionArr;
      this.data.game = game;
      this.data.gameArr = gameArr;
      this.channelQuery();
    },
    dataInit: function dataInit() {
      this.os = this._state.os;
      if (this._state.region) this.data.region = this._state.region;
      if (this._state.regionArr) this.data.regionArr = this._state.regionArr;
      if (this._state.game) this.data.game = this._state.game;
      if (this._state.gameArr) this.data.gameArr = this._state.gameArr;
      if (this._state.curChannel) this.curChannel = this._state.curChannel;
      if (this._state.onIndex) this.isOn = this._state.onIndex;
      if (this._state.curYear) this.curYear = this._state.curYear;
      if (this._state.curMonth) this.curMonth = this._state.curMonth;
    },
    dataQuery: function dataQuery() {
      var _this7 = this;

      this.loading = true;
      var param = {
        in_unite_id: this.data.gameArr[0],
        in_os: this.os,
        begin_date: this._date[0],
        end_date: this._date[1],
        media_source: this.curChannel
      };
      console.log(param);
      this.$store.dispatch('o_c_complement/query', param).then(function (data) {
        _this7.$nextTick(function () {
          _this7.loading = false;
        });
      });
    },
    channelQuery: function channelQuery() {
      var _this8 = this;

      if (!this.data.gameArr[0]) {
        this.$notify({
          type: "warning",
          message: "请选择游戏",
          offset: 50
        });
        return;
      }

      this.$store.commit("o_c_complement/setRegion", this.data.region);
      this.$store.commit("o_c_complement/setRegionArr", this.data.regionArr);
      this.$store.commit("o_c_complement/setGame", this.data.game);
      this.$store.commit("o_c_complement/setGameArr", this.data.gameArr);

      var param = {
        in_unite_id: this.data.gameArr[0],
        in_os: this._state.os,
        count_date: moment().add(-1, "day").format("YYYY-MM-DD")
      };
      // var url = "/query/" + this.$store.state.common.nowmenu.dataView[1];
      var url = "/query/" + "query_app_mediasource";
      this.curChannel = null;
      _http2.default.post(url, param).then(function (_ref7) {
        var state = _ref7.state,
            code = _ref7.code;

        if (code === 401) {
          _this8.isOn = null;
          _this8._state.channelData = state[0];
          _this8._channelList;
        }
      });
    },
    recalculate: function recalculate() {
      var _this9 = this;

      var param = {
        gameId: this.data.gameArr[0],
        begin_date: this._date[0],
        end_date: this._date[1],
        os: this.os,
        media_source: this.curChannel
      };
      this.$store.dispatch('o_c_complement/recalculate', param).then(function (data) {
        if (data.code === 401) {
          _this9.$notify({
            type: "success",
            message: "重算完成"
          });
          // this.dataQuery()
        }
      });
    },
    onKeyDown: function onKeyDown(_ref8) {
      var keyCode = _ref8.keyCode;

      switch (keyCode) {
        case 13:
          this.input && this.input.blur();
          this.editInput && this.editInput.blur();
          break;
        case 16:
          !this.shifting && this.$data.shifting++;
          break;
        case 17:
          !this.ctrling && this.$data.ctrling++;
          break;
      }
    },
    onKeyUp: function onKeyUp(_ref9) {
      var keyCode = _ref9.keyCode;

      switch (keyCode) {
        case 16:
          this.$data.shifting--;
          break;
        case 17:
          this.$data.ctrling--;
          break;
      }
    },
    tableClick: function tableClick(e) {
      e.stopPropagation();
    },
    windowClick: function windowClick() {
      this.pending.length && this.pendingClear();
    },
    windowScroll: function windowScroll(e) {
      if (this.$refs.table) {

        var table = this.$refs.table;
        var scroll = this.$root.$children[0].$refs.scroll;
        var header = table.$refs.headerWrapper.classList;

        if (scroll.scrollTop >= table.$el.offsetTop) {
          !header.contains("complement-fixed") && header.add("complement-fixed");
        } else {
          header.contains("complement-fixed") && header.remove("complement-fixed");
        }
      }
    }
  },
  created: function created() {
    var _this10 = this;

    var store = this.$store;
    this.dataInit();
    store.dispatch("overseas_common/getList1").then(function (item) {
      if (!_this10._state.region || !_this10._state.regionArr.length) {
        store.commit("o_c_complement/setRegion", _this10.data.allTxt);
        store.commit("o_c_complement/setRegionArr", store.state.overseas_common.list1All);
        _this10.data.region = _this10.data.allTxt;
        _this10.data.regionArr = store.state.overseas_common.list1All;
      }
    });
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("click", this.windowClick);
  },
  mounted: function mounted() {
    this.$root.$children[0].$refs.scroll.addEventListener("scroll", this.windowScroll);
  },
  destroyed: function destroyed() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("click", this.windowClick);
    this.$root.$children[0].$refs.scroll.removeEventListener("scroll", this.windowScroll);
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 1123:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "complement"
  }, [_c('my-row', {
    staticClass: "selection-box min-width"
  }, [_c('span', {
    staticClass: "section-left"
  }, [_vm._v("地区/游戏")]), _vm._v(" "), _c('el-button', {
    staticClass: "selection",
    on: {
      "click": function($event) {
        _vm.data.isShow = !_vm.data.isShow
      }
    }
  }, [_c('span', [_vm._v("已选择：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm._rcg))])]), _vm._v(" "), _c('div', {
    staticClass: "date-box-item"
  }, [_c('span', {
    staticClass: "section-left"
  }, [_vm._v("系统")]), _vm._v(" "), _c('el-radio-group', {
    attrs: {
      "size": "medium"
    },
    on: {
      "change": _vm.changeOs
    },
    model: {
      value: (_vm.os),
      callback: function($$v) {
        _vm.os = $$v
      },
      expression: "os"
    }
  }, [_c('el-radio-button', {
    attrs: {
      "label": "1"
    }
  }, [_vm._v("安卓")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "0"
    }
  }, [_vm._v("IOS")])], 1)], 1)], 1), _vm._v(" "), _c('my-row', [(_vm.data.isShow) ? _c('tsdp', {
    attrs: {
      "data": _vm.data,
      "auto-confirm": true
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('my-col', {
    staticClass: "min-width"
  }, [_c('my-row', {
    staticStyle: {
      "margin-top": "10px"
    }
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("渠道列表")]), _vm._v(" "), (!_vm._channelList) ? _c('span', [_c('span', {
    staticClass: "txtsp"
  }, [_c('i', [_vm._v("-")]), _vm._v(" 无渠道列表\n          "), _c('i', [_vm._v("-")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "size": "medium"
    },
    on: {
      "click": function($event) {
        _vm.channelQuery()
      }
    }
  }, [_vm._v("\n            再次查询\n          ")])], 1)]) : _vm._e(), _vm._v(" "), (_vm.data.game && _vm._state.os) ? _c('span', [_c('span', {
    staticClass: "txtsp"
  }, [_c('i', [_vm._v("-")]), _vm._v(_vm._s(_vm.data.game))]), _vm._v(" "), _c('span', {
    staticClass: "txtsp"
  }, [_c('i', [_vm._v("-")]), _vm._v(_vm._s(['IOS', '安卓'][_vm._state.os]))]), _vm._v(" "), (_vm.curChannel) ? _c('span', {
    staticClass: "txtsp"
  }, [_c('i', [_vm._v("-")]), _vm._v("\n          " + _vm._s(_vm.curChannel) + "\n          "), _c('i', [_vm._v("-")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "size": "medium"
    },
    on: {
      "click": function($event) {
        _vm.channelQuery()
      }
    }
  }, [_vm._v("\n            再次查询\n          ")])], 1) : _c('span', {
    staticClass: "txtsp"
  }, [_c('i', [_vm._v("-")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "size": "medium"
    },
    on: {
      "click": function($event) {
        _vm.channelQuery()
      }
    }
  }, [_vm._v("\n            再次查询\n          ")])], 1)]) : _vm._e()]), _vm._v(" "), (_vm._channelList) ? _c('my-card', {
    staticClass: "channel-list-card"
  }, _vm._l((_vm._channelList), function(item, i) {
    return _c('el-button', {
      key: i,
      class: _vm.channel_list_class(item, i),
      on: {
        "click": function($event) {
          _vm.c_list_handler(item, i)
        }
      }
    }, [_vm._v("\n        " + _vm._s(item.channelName) + " [最后补录日期：" + _vm._s(item.date) + "]\n      ")])
  })) : _vm._e()], 1), _vm._v(" "), _c('my-row', {
    staticStyle: {
      "margin-top": "10px"
    }
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("渠道数据")]), _vm._v(" "), (_vm.curChannel && _vm.$$data && _vm.$$data.list.regions.length && !_vm.loading) ? _c('span', [_c('el-button', {
    staticStyle: {
      "margin-left": "15px"
    },
    attrs: {
      "size": "medium"
    },
    on: {
      "click": function($event) {
        _vm.dataQuery()
      }
    }
  }, [_vm._v("\n        再次查询\n      ")]), _vm._v(" "), _c('i', [_vm._v("-")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "size": "medium"
    },
    on: {
      "click": function($event) {
        _vm.recalculate()
      }
    }
  }, [_vm._v("\n        数据重算\n      ")])], 1) : _c('span', [_c('span', {
    staticClass: "txtsp"
  }, [_c('i', [_vm._v("-")]), _vm._v(" 无渠道数据\n        "), _c('i', [_vm._v("-")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "size": "medium"
    },
    on: {
      "click": function($event) {
        _vm.dataQuery()
      }
    }
  }, [_vm._v("\n          再次查询\n        ")])], 1)]), _vm._v(" "), (_vm.curChannel) ? _c('div', {
    staticClass: "month-picker"
  }, [_c('el-button', {
    staticStyle: {
      "margin-left": "15px"
    },
    attrs: {
      "size": "small"
    },
    on: {
      "click": function($event) {
        _vm.editMonth(0)
      }
    }
  }, [_vm._v("\n        上个月\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v(" " + _vm._s(_vm.curChannel) + " - " + _vm._s(_vm.curYear) + "年" + _vm._s(_vm.curMonth) + "月")]), _vm._v(" "), _c('el-button', {
    staticStyle: {
      "margin-left": "15px"
    },
    attrs: {
      "size": "small"
    },
    on: {
      "click": function($event) {
        _vm.editMonth(1)
      }
    }
  }, [_vm._v("\n        下个月\n      ")])], 1) : _vm._e()]), _vm._v(" "), (_vm.curChannel && _vm.$$data && _vm.$$data.list.regions.length && !_vm.loading) ? _c('my-row', {
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('div', {
    staticClass: "section-left"
  }, [_vm._v("\n      过滤\n    ")]), _vm._v(" "), _c('el-select', {
    staticStyle: {
      "width": "250px"
    },
    attrs: {
      "filterable": "",
      "multiple": "",
      "size": "small",
      "placeholder": "国家"
    },
    model: {
      value: (_vm.filter),
      callback: function($$v) {
        _vm.filter = $$v
      },
      expression: "filter"
    }
  }, _vm._l((_vm.$$data.list.search), function(_, i) {
    return _c('el-option', {
      key: i,
      attrs: {
        "label": _.region,
        "value": i
      }
    })
  }))], 1) : _vm._e(), _vm._v(" "), _c('my-row', {
    staticStyle: {
      "margin-top": "20px"
    }
  }, [(_vm.curChannel && _vm.$$data && _vm.$$data.list.regions.length && !_vm.loading) ? _c('div', {
    on: {
      "click": _vm.tableClick
    }
  }, [_c('el-table', {
    ref: "table",
    attrs: {
      "data": _vm.$$data.list.regions,
      "row-class-name": _vm.rowClassName
    },
    on: {
      "cell-dblclick": _vm.cell_dbClick,
      "cell-click": _vm.cell_click
    }
  }, [_c('el-table-column', {
    attrs: {
      "class-name": "complement-data-type",
      "prop": "region",
      "label": _vm.$$data.keys[_vm.$$data.index.regionIndex],
      "width": "110",
      "formatter": _vm.regionFormatter
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "class-name": "complement-data-type",
      "label": "数据类型",
      "width": "78",
      "formatter": _vm.myFormatter
    }
  }), _vm._v(" "), _vm._l(([].concat( Array(_vm._date[2]) )), function(v, i) {
    return _c('el-table-column', {
      key: i,
      attrs: {
        "class-name": "complement-data-type editable",
        "label": i + 1 + '',
        "width": "40",
        "formatter": _vm.myFormatter_
      }
    })
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "class-name": "complement-data-type",
      "label": "操作",
      "width": "90",
      "formatter": _vm._myFormatter
    }
  })], 2)], 1) : _vm._e()])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 563:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1118)
__webpack_require__(1120)

var Component = __webpack_require__(31)(
  /* script */
  __webpack_require__(1122),
  /* template */
  __webpack_require__(1123),
  /* scopeId */
  "data-v-0e9decb6",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

});