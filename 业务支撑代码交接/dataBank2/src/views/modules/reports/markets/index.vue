<template>
  <div class="reports-market">
    <my-row class="selection-box">

      <div class="date-box-item">
        <span>系统</span>
        <el-select class="os" v-model="os" size="medium">
          <el-option v-for="item in options" :key="item.value" :label="item.txt" :value="item.os"></el-option>
        </el-select>
      </div>

      <div class="date-box-item">
        <el-date-picker size="medium" :picker-options="pickerOptions1" ref="picker1" v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" top="100">
        </el-date-picker>
      </div>

      <el-button size="medium" class="selection" @click="data.isShow=true">
        <span>已选择：</span>
        <span>{{_rcg}}</span>
      </el-button>

      <div class="date-box-item" v-if="tags_">
        <span>选择报表</span>
        <el-select class="os" v-model="taging_" size="medium" style="width: 150px; margin-right: 20px;">
          <el-option v-for="item in tags_" :key="item.tag" :label="item.label" :value="item.tag"></el-option>
        </el-select>
      </div>

      <el-button size="medium" class="search" @click="getData(taging_)">查询</el-button>

      <div class="mail">
        <el-button size="medium" @click="excel()">导出表格</el-button>

        <div style="position:relative;margin-left:10px">
          <el-date-picker ref="picker" v-model="value2" align="right" type="date" style="position:absolute;z-index:-1;width:200px;left:24px;visibility:hidden;" @change="pickerChange"></el-date-picker>
          <el-button size="medium" style="margin: 0 15px" @click="createMail()">
            邮件生成
          </el-button>

        </div>
        <el-button size="medium" @click="checkMail()">邮件查看</el-button>
      </div>
    </my-row>

    <my-row>
      <tsdp :data="data" v-if="data.isShow"></tsdp>
    </my-row>

    <my-row class="selection-box" v-if="_rcg_.length">
      <el-tag class="tag" v-for="(item, i) in _rcg_" :key="i">{{item}}</el-tag>
    </my-row>

    <my-row>
      <el-tabs v-model="taging" @tab-click="tagClick">
        <el-tab-pane v-if="_tagState[tag]" v-for="({ label }, tag) in tags" :key="tag" :label="label" :name="tag"></el-tab-pane>
        <component :is="main" :_config="_config" :_types="$data.types"></component>
      </el-tabs>
    </my-row>

    <!-- <MailCreation :date="$data.mailDate" /> -->
  </div>
</template>

<script>
import tsdp from "src/component/widget/tree-degree-select-box/index.vue";
import api from "src/services/api";
import http from "src/services/http";
import comprehensive from "./comprehensive.vue";
import daily from "./daily.vue";
import zone from "./zone.vue";
import channel from "./channel.vue";
import system from "./system.vue";

import MailCreation from "src/views/modules/MailCreation";
export default {
  name: "reports-market",
  components: {
    tsdp,
    comprehensive,
    daily,
    zone,
    channel,
    system,
    MailCreation
  },
  data() {
    return {
      mailDate: null,
      pickerOptions1: {
        onPick({ minDate, maxDate }) {
          if (!maxDate) {
            this._parentEl.querySelector("input").value = moment(
              minDate
            ).format("YYYY-MM-DD");
          }
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.dateShortcuts('今天', picker)
          }
        }, {
          text: '昨天',
          onClick(picker) {
            picker.dateShortcuts('昨天', picker)
          }
        }, {
          text: '近7天',
          onClick(picker) {
            picker.dateShortcuts('近7天', picker)
          }
        }, {
          text: '近15天',
          onClick(picker) {
            picker.dateShortcuts('近15天', picker)
          }
        }, {
          text: '近30天',
          onClick(picker) {
            picker.dateShortcuts('近30天', picker)
          }
        }, {
          text: '近30-60天',
          onClick(picker) {
            picker.dateShortcuts('近30-60天', picker)
          }
        }, {
          text: '本月',
          onClick(picker) {
            picker.dateShortcuts('本月', picker)
          }
        }, {
          text: '上月',
          onClick(picker) {
            picker.dateShortcuts('上月', picker)
          }
        }, {
          text: '今年',
          onClick(picker) {
            picker.dateShortcuts('今年', picker)
          }
        }, {
          text: '去年',
          onClick(picker) {
            picker.dateShortcuts('去年', picker)
          }
        }]

      },
      value2: null,
      main: null,
      data: {
        allTxt: "全部",
        isShow: false,
        callback: this.setRcg,
        region: null,
        regionArr: [],
        game: null,
        gameArr: []
      },
      date: null,
      os: null,
      options: [
        {
          os: "0,1",
          txt: "全部"
        },
        {
          os: "0",
          txt: "IOS"
        },
        {
          os: "1",
          txt: "安卓"
        }
      ],
      taging: null,
      tags: {
        comprehensive: {
          label: "综合报表",
          tag: "comprehensive"
        },
        daily: {
          label: "每日报表",
          tag: "daily"
        },
        channel: {
          label: "渠道报表",
          tag: "channel"
        },
        zone: {
          label: "地区报表",
          tag: "zone"
        },
        system: {
          label: "系统对比",
          tag: "system"
        }
      },
      tags_: null,
      taging_: null,
      types: {
        list: 1,
        comprehensive: 2,
        daily: 3,
        channel: 4,
        zone: 5,
        system: 6,
        1: "list",
        2: "comprehensive",
        3: "daily",
        4: "channel",
        5: "zone",
        6: "system",
        os: {
          "0,1": "全部",
          0: "IOS",
          1: "Android"
        }
      }
    };
  },
  computed: {
    _tagState() {
      return this.$store.getters["o_r_delivery/tellTagStatus"];
    },
    _rcg() {
      var str = "";
      var { regionArr, region, gameArr, game } = this.data;
      var arr = [];
      if (regionArr.length) {
        str += region;
        if (gameArr.length) {
          str += " - " + game;
          arr = [
            {
              label: "每日报表",
              tag: "daily"
            },
            {
              label: "渠道报表",
              tag: "channel"
            },
            {
              label: "地区报表",
              tag: "zone"
            },
            {
              label: "系统对比",
              tag: "system"
            }
          ];
          var list1 = this.$store.getters["overseas_common/getList1"];
          var gameId = gameArr[0];
        } else {
          str += " - " + "全部游戏";
          arr = [
            {
              label: "综合报表",
              tag: "comprehensive"
            },
            {
              label: "每日报表",
              tag: "daily"
            }
          ];
        }
        this.$data.tags_ = arr;
        this.$data.taging_ = arr[0].tag;
      }
      return str;
    },
    _rcg_() {
      var arr = [];
      var lastQueryParam = this._state.lastQueryParam[this.taging];
      if (lastQueryParam) {
        var { os, gameIds, begin_date, end_date, querytype } = lastQueryParam;
        var str = "";
        if (this.$store.getters["overseas_common/getList1"].hasOwnProperty(gameIds)) {
          if (this._state.region) {
            str += this._state.region;
            if (this._state.game) {
              str += " - " + this._state.game;
            } else {
              str += " - " + "全部游戏";
            }
          }
        }
        arr = [
          "（系统）" + this.types.os[os],
          begin_date + " 至 " + end_date,
          "（国家/地区）" + (str || this.data.allTxt),
          this.tags[this.types[querytype]].label
        ];
      }
      console.log("_rcg_", arr, this.main);
      return arr;
    },
    _state() {
      return this.$store.state.o_r_delivery;
    },
    _config() {
      return this.$store.state.o_r_delivery.configs[this.taging];
    },
    _key() {
      return this.$store.getters["o_r_delivery/getIdStr"];
    }
  },
  watch: {
    date(data) {
      var date = data.map(item => moment(item).format("YYYY-MM-DD"));
      this.$store.commit("o_r_delivery/setDate", date);
    },
    os(data) {
      this.$store.commit("o_r_delivery/setOs", data);
    }
  },
  methods: {
    dateShortcuts(txt, picker) {
      var date
      switch (txt) {
        case '今天':
          var date_ = new Date
          date = [date_, date_]
          break
        case '昨天':
          var date_ = new Date
          date_.setTime(Date.now() - 3600 * 1000 * 24);
          date = [date_, date_]
          break
        case '近7天':
          var dateBegin = new Date
          var dataEnd = new Date
          dateBegin.setTime(Date.now() - 3600 * 1000 * 24 * 7);
          dataEnd.setTime(Date.now() - 3600 * 1000 * 24);
          date = [dateBegin, dataEnd]
          break
        case '近15天':
          var dateBegin = new Date
          var dataEnd = new Date
          dateBegin.setTime(Date.now() - 3600 * 1000 * 24 * 15);
          dataEnd.setTime(Date.now() - 3600 * 1000 * 24);
          date = [dateBegin, dataEnd]
          break
        case '近30天':
          var dateBegin = new Date
          var dataEnd = new Date
          dateBegin.setTime(Date.now() - 3600 * 1000 * 24 * 30);
          dataEnd.setTime(Date.now() - 3600 * 1000 * 24);
          date = [dateBegin, dataEnd]
          break
        case '近30-60天':
          var dateBegin = new Date
          var dataEnd = new Date
          dateBegin.setTime(Date.now() - 3600 * 1000 * 24 * 60);
          dataEnd.setTime(Date.now() - 3600 * 1000 * 24 * 30);
          date = [dateBegin, dataEnd]
          break
        case '本月':
          var dataEnd = new Date
          var curyear = dataEnd.getFullYear()
          var curmonth = dataEnd.getMonth()
          dateBegin = new Date(curyear, curmonth, 1)
          date = [dateBegin, dataEnd]
          break
        case '上月':
          var dataEnd = new Date
          var curyear = dataEnd.getFullYear()
          var curmonth = dataEnd.getMonth()
          dateBegin = new Date(curyear, curmonth - 1, 1)
          dataEnd = new Date(curyear, curmonth, 0)
          date = [dateBegin, dataEnd]
          break
        case '今年':
          var dataEnd = new Date
          var curyear = dataEnd.getFullYear()
          dateBegin = new Date(curyear, 0, 1)
          date = [dateBegin, dataEnd]
          break
        case '去年':
          var dataEnd = new Date
          var curyear = dataEnd.getFullYear()
          var curmonth = dataEnd.getMonth()
          dateBegin = new Date(curyear - 1, 0, 1)
          dataEnd = new Date(curyear, 0, 0)
          date = [dateBegin, dataEnd]
          break
      }
      picker.$emit('pick', date);
    },
    excel() {
      var timestamp = Date.now()
      if (this.main === "comprehensive") {
        var data = this.$store.getters["o_r_delivery/getComprehensive"];
        var len = data.category.length
        for (var i = 0; i < len; i++) {
          var thead = document.querySelectorAll('.el-table__header thead')[i].innerHTML
          var tbody = document.querySelectorAll('.el-table__header-wrapper+.el-table__body-wrapper>table:first-child')[i].innerHTML
          var table = document.createElement('table')
          table.innerHTML = `<thead>${thead}</thead><tbody>${tbody}</tbody>`

          Utils.tableToExcel(
            table,
            false,
            (timestamp + i) + '.xls'
          )
        }
      } else {
        var thead = document.querySelector('.el-table__header thead').innerHTML
        var tbody = document.querySelector('.el-table__body tbody').innerHTML
        var table = document.createElement('table')
        table.innerHTML = `<thead>${thead}</thead><tbody>${tbody}</tbody>`
        Utils.tableToExcel(
          table,
          false,
          timestamp + '.xls'
        )
      }
    },
    getIdStr() {
      if (this.data.gameArr.length) {
        return this.data.gameArr[0];
      }
      if (this.data.regionArr.length) {
        return this.data.regionArr.join(",");
      }
      return "";
    },
    checkMail() {
      if (this._state.mailUrl) {
        window.open(http.host + this._state.mailUrl);
      } else {
        this.$notify({
          type: "warning",
          message: "点击生成邮件"
        });
      }
    },
    pickerChange() {
      var date = moment(this.value2).format("YYYY-MM-DD");
      if (confirm("确定生成" + date + "的邮件吗")) {
        this.$data.mailDate = date

        api.user
          .getMail({
            countDate: date,
            gameIds: '19,33,34,36,38,41,46,47,48,57,58,59,60'
          })
          .then(({ code, state }) => {
            if (code === 303) {
              this._state.mailUrl = state;
            } else {
              this.$notify({
                type: "warning",
                message: "邮件生成出现错误"
              });
            }
          });
      }
    },
    tagClick() {
      this.$store.commit("o_r_delivery/set_is2", false);
      var isQuery;
      // 对比查询参数是否一致
      var lastQueryParam = this._state.lastQueryParam[this.taging];
      if (lastQueryParam) {
        var same;
        same = [
          lastQueryParam.os === this.os,
          lastQueryParam.begin_date === this._state.date[0],
          lastQueryParam.end_date === this._state.date[1],
          lastQueryParam.gameIds === this.getIdStr()
        ];
        if (same.indexOf(false) !== -1) isQuery = true;
      } else {
        isQuery = true;
      }
      console.log("lastQueryParam", lastQueryParam, same);
      this.main = this.taging
      isQuery && this.getData();
    },
    setRcg([region, regionArr, game, gameArr]) {
      this.data.region = region;
      this.data.regionArr = regionArr;
      this.data.game = game;
      this.data.gameArr = gameArr;
    },
    dataInit() {
      if (this._state.taging) {
        this.main = this.taging = this._state.taging;
      } else {
        this.main = this.taging = "comprehensive";
      }
      if (this._state.os) {
        this.os = this._state.os;
      } else {
        this.os = "0,1";
      }
      if (this._state.date) {
        this.date = this._state.date;
      } else {
        this.date = [
          moment()
            .add(-1, "day")
            .format("YYYY-MM-DD"),
          moment()
            .add(-1, "day")
            .format("YYYY-MM-DD")
        ];
      }
      if (this._state.region) this.data.region = this._state.region;
      if (this._state.regionArr) this.data.regionArr = this._state.regionArr;
      if (this._state.game) this.data.game = this._state.game;
      if (this._state.gameArr) this.data.gameArr = this._state.gameArr;
    },
    getData(taging_) {
      if (taging_) this.taging = taging_;

      this.main = this.taging;
      this.$store.commit("o_r_delivery/setTaging", this.taging);
      this.$store.commit("o_r_delivery/setRegion", this.data.region);
      this.$store.commit("o_r_delivery/setRegionArr", this.data.regionArr);
      this.$store.commit("o_r_delivery/setGame", this.data.game);
      this.$store.commit("o_r_delivery/setGameArr", this.data.gameArr);

      var params = {
        querytype: this.types[this.taging],
        begin_date: this._state.date[0],
        end_date: this._state.date[1],
        os: this._state.os,
        gameIds: this._key,
        media_source: '',
        country: ''
      };
      this._state.lastQueryParam[this.taging] = params;
      this.$store.dispatch("o_r_delivery/getReportInfo", { params, tag: this.taging });
    },
    createMail() {
      this.$refs.picker.showPicker();
    },
    onKeyDown({ keyCode }) {
      switch (keyCode) {
        case 13:
          if (!this.data.isShow) {
            this.getData(this.taging_);
          }
          break;
      }
    }
  },
  created() {
    this.dataInit();

    this.$store.dispatch("overseas_common/getList1").then(data => {
      if (!this._state.region || !this._state.regionArr.length) {
        this.data.region = this.data.allTxt;
        this.data.regionArr = this.$store.state.overseas_common.list1All;
      }
      if (!this._state[this.taging][this._key]) this.getData();
    });
  },
  mounted() {
    this.$refs.picker.mountPicker();

    this.$refs.picker1.mountPicker();
    this.$refs.picker1.picker.dateShortcuts = this.dateShortcuts
    this.$refs.picker1.picker._parentEl = this.$refs.picker1.$el;
    window.addEventListener("keydown", this.onKeyDown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.onKeyDown);
  }
};
</script>

<style lang="scss" scoped>
.os {
  width: 100px;
}
.el-select-dropdown__item {
  text-align: center;
}
.el-tabs {
  width: 100%;
}
.selection {
  margin-left: 15px;
}
.selection-box {
  .tag {
    margin: 15px 0 15px 16px;
  }
  .r-g {
    font-size: 15px;
    padding-left: 15px;
  }
  margin-top: 5px;
  .mail {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    margin: -80px 10px 0 0;
  }
}
.date-box {
  margin-top: 15px;
}
.date-box-item {
  span {
    font-size: 15px;
    padding-right: 10px;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 15px;
}
</style>

<style lang="scss">
.el-table__row.total {
  font-weight: 700;
}
.el-tabs__nav-scroll {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.el-tabs__item {
  user-select: none;
  width: 150px;
  text-align: center;
  font-size: 16px;
}
.reports-market {
  .chart-area,
  .table-item {
    background: rgba(208, 196, 214, 0.5);
    margin: 12px;
    padding: 15px;
  }
}

.el-picker-panel__shortcut {
  line-height: 29px !important;
  // font-weight: 700;
  font-size: 1.02em;
}
.el-picker-panel__shortcut:hover {
  color: #fff !important;
  background: #409eff !important;
}
</style>
