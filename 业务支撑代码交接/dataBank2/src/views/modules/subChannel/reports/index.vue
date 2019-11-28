<template>

  <div class="sub-channel-reports">
    <my-row>
      <div class="time-picker">
        <el-date-picker @change="dateChange" size="medium" :picker-options="pickerOptions" ref="picker" v-model="pickerOptions.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" top="100">
        </el-date-picker>
      </div>

      <div class="system-sel">
        <el-button-group class="group">

          <el-button size="medium">
            <span>系统</span>
          </el-button>

          <el-select @change="osChange" class="os" v-model="osOptions.os" size="medium" style="width: 100px;">
            <el-option v-for="item in osOptions.list" :key="item.os" :label="item.txt" :value="item.os"></el-option>
          </el-select>

        </el-button-group>
      </div>

      <div class="game-sel">
        <el-button-group class="group">
          <el-button size="medium">
            <span>游戏</span>
          </el-button>
          <el-button size="medium" class="selection" @click="tsdp.isShow=!tsdp.isShow">
            <span>已选择：</span>
            <span>{{tsdp.game}}</span>
          </el-button>
        </el-button-group>
      </div>

      <div class="channel-sel">
        <el-button-group class="group">
          <el-button size="medium">
            <span>渠道</span>
          </el-button>
          <el-select class="channel" filterable v-model="channelOptions.channel" size="medium" @change="channelChange">
            <el-option v-for="item in channelOptions.list" :key="item.media_source" :label="item.media_source" :value="item.media_source"></el-option>
          </el-select>
        </el-button-group>
      </div>

    </my-row>

    <my-row style="margin: 16px 0 0 16px; width: auto">
      <div class="level-query">
        <el-input v-model="levelOptions.level" clearable @change="levelChange" style="width: 180px;">
          <template slot="prepend">等级点</template>
        </el-input>
      </div>

      <div class="excel">
        <el-button @click="ckeck() && excel()">
          导出表格
        </el-button>
      </div>

      <div class="query">
        <el-button @click="ckeck() && query()">
          查询
        </el-button>
      </div>

    </my-row>
    <my-row>
      <tsdp :data="tsdp" v-if="tsdp.isShow" :auto-confirm="true"></tsdp>
    </my-row>

    <my-row class="back-row">
      <div class="back" v-if="tableOptions.siteId">
        <el-tag>
          子渠道： {{this.tableOptions.siteId}}
        </el-tag>
        <el-button class="back-btn" @click="tableOptions.siteId=null" size="small">
          点击返回
        </el-button>
      </div>
    </my-row>

    <div class="table" v-if="__data" style="margin: 16px 0 0 0;">
      <el-table :data="__data.list" :cell-class-name="cellClassName" @cell-click="cellClick" :width="'2000px'">
        <el-table-column v-for="(item, i) in _config.tableKey" :key="i" :prop="item.key" :label="item.key" :formatter="formatter" :width="item.width" :min-width="item['min-width']" :sortable="item.sortable"></el-table-column>
        <div slot="append">
          <totalFloat :updateHook="updateHook" :params="{
            total: __data.total,
            tableKey: _config.tableKey
            }" />
        </div>
      </el-table>
    </div>

  </div>
</template>

<script>
import tsdp from "src/component/widget/tree-degree-select-box/index.vue";
import totalFloat from "src/component/widget/total-float/index.vue"
export default {
  name: 'sub-channel-reports',
  components: {
    tsdp, totalFloat
  },
  data() {
    return {
      SMN: 'o_s_c_reports',
      updateHook: 0,

      tableOptions: {
        siteId: null

      },

      // 日期选择
      pickerOptions: {
        onPick({ minDate, maxDate }) {
          if (!maxDate) {
            this._parentEl.querySelector("input").value = moment(
              minDate
            ).format("YYYY-MM-DD");
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

    }
  },
  computed: {
    _state() {
      return this.$store.state[this.SMN];
    },
    __data() {
      this.updateHook += 1
      if (this.tableOptions.siteId) {
        return this.$store.getters[this.SMN + '/subChannelRegionData'];
      }
      return this.$store.getters[this.SMN + '/subChannelData'];
    },
    _config() {
      if (this.tableOptions.siteId) {
        return this._state.subChannelRegionConfig
      }
      return this._state.subChannelConfig
    },
  },
  methods: {
    excel() {
      var thead = document.querySelector('.el-table__header thead').innerHTML
      var tbody = document.querySelector('.el-table__body tbody').innerHTML
      var table = document.createElement('table')
      table.innerHTML = `<thead>${thead}</thead><tbody>${tbody}</tbody>`
      Utils.tableToExcel(
        table,
        false,
        new Date().getTime() + '.xls'
      )
    },
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (!columnIndex) {
        if (!this.tableOptions.siteId)
          return 'ellipsis sub-channel'
      }
    },
    tsdpCb([region, regionArr, game, gameArr]) {
      this.tsdp.region = region;
      this.tsdp.regionArr = regionArr;
      this.tsdp.game = game;
      this.tsdp.gameArr = gameArr;

      this.channelOptions.channel = null
      this.channelQuery();
    },
    dateChange(value) {
      var arr = []
      value.forEach(date => {
        arr.push(moment(date).format("YYYY-MM-DD"))
      })
      this.$store.commit(this.SMN + '/setDate', arr)
    },
    osChange(value) {
      this.$store.commit(this.SMN + '/setOs', value)
    },
    channelChange(value) {
      this.$store.commit(this.SMN + '/setChannel', value)
    },
    levelChange(value) {
      var number = parseInt(value)
      this.levelOptions.level = isNaN(number) ? null : number
      this.$store.commit(this.SMN + '/setLevel', this.levelOptions.level * 1)
    },
    formatter(row, column, value) {
      var { label } = column
      var { keys, index } = this._config
      if (label === keys[index.registerRateIndex] || label === keys[index.createRateIndex] || label === keys[index.levelAfRateIndex]) {
        value += '%'
      }
      if (this.tableOptions.siteId && column.label === keys[index.regionIndex]) {
        value = this.$store.state.overseas_common.regionMap[value] || value
      }
      return value
    },
    cellClick(row, column, cell, event) {
      if (cell.classList.contains('sub-channel') && !this.tableOptions.siteId) {
        var param = {
          begin_date: this._state.date[0],
          end_date: this._state.date[1],
          os: this._state.os,
          game_id: this._state.gameArr[0],
          media_source: this._state.channel,
          site_id: row[column.label],
          level: this._state.level,
        }
        this.$store.dispatch(this.SMN + '/subChannelRegionData', param).then(data => {
          this.tableOptions.siteId = param.site_id
        })
      }
    },
    channelQuery() {
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
        count_date: moment()
          .add(-1, "day")
          .format("YYYY-MM-DD")
      }

      this.$store.dispatch('overseas_common/getChannels1', param).then(data => {

        if (data.code === 401) {
          this.channelOptions.list = data.state[0]
          this.$store.commit(this.SMN + '/setChannelList', this.channelOptions.list)
        }

      }).catch(err => {
        this.$notify({
          type: "error",
          message: err
        });
      })

    },
    ckeck() {
      if (!this._state.gameArr.length) {
        this.$notify({
          type: "warning",
          message: "请选择游戏"
        })
        return false
      }
      if (!this._state.channel) {
        this.$notify({
          type: "warning",
          message: "请选择渠道"
        })
        return false
      }
      return true
    },
    query() {
      var param = {
        begin_date: this._state.date[0],
        end_date: this._state.date[1],
        in_os: this._state.os,
        area_app_id: this._state.gameArr[0],
        media_source: this._state.channel,
        level: this._state.level
      }
      console.log(param)
      this.$store.dispatch(this.SMN + '/subChannelData', param).then(data => { })
    }
  },
  mounted() {
    var picker = this.$refs.picker
    picker.mountPicker();
    picker.picker._parentEl = picker.$el;
  },
  created() {
    this.pickerOptions.date = this._state.date
    this.osOptions.os = this._state.os
    this.levelOptions.level = this._state.level
    if (this._state.region) this.tsdp.region = this._state.region
    if (this._state.regionArr) this.tsdp.regionArr = this._state.regionArr
    if (this._state.game) this.tsdp.game = this._state.game
    if (this._state.gameArr) this.tsdp.gameArr = this._state.gameArr
    if (this._state.channel) this.channelOptions.channel = this._state.channel
    if (this._state.channelList) this.channelOptions.list = this._state.channelList

    this.$store.dispatch("overseas_common/getList1").then(item => {
      if (!this._state.region || !this._state.regionArr.length) {
        this.$store.commit(this.SMN + "/setRegion", this.tsdp.allTxt);
        this.$store.commit(
          this.SMN + "/setRegionArr",
          this.$store.state.overseas_common.list1All
        );
        this.tsdp.region = this.tsdp.allTxt;
        this.tsdp.regionArr = this.$store.state.overseas_common.list1All;
      }
    })


  }
}
</script>

<style  lang="scss">
.sub-channel-reports {
  .ellipsis {
    .cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .sub-channel {
    cursor: pointer;
    &:hover {
      background: #5b5691 !important;
      color: #fff;
    }
  }
  .time-picker,
  .system-sel,
  .game-sel,
  .channel-sel,
  .query,
  .excel {
    margin-left: 16px;
  }

  .back-row {
    margin-top: 16px;
    justify-content: center;
    align-items: center;
    .back {
      margin-left: -16px;
    }
  }

  .channel {
    min-width: 160px;
    max-width: 160px;
  }

  .system-sel,
  .game-sel,
  .channel-sel {
    .group {
      display: flex;
      flex-wrap: nowrap;
    }
  }
}
</style>

