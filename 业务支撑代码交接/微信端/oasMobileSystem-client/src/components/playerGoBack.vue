<template>
  <div>
    <div class="lost-group-header">
      <div class="lost-group-icon"></div>
      <span class="index-header-text">回流用户数据</span>
    </div>
    <div class="type-content">
      <select class="player-type" v-model="user_type">
        <option value="0">全部玩家</option>
        <option value="1">付费玩家</option>
      </select>

      <div class="fastSelecter">
        <v-touch tag="div" class="fast-item" :class="{now:datetype==1}" v-on:tap="toggleDateType(1)">Day</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:datetype==2}" v-on:tap="toggleDateType(2)">Week
        </v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:datetype==3}" v-on:tap="toggleDateType(3)">Month
        </v-touch>
      </div>
    </div>
    <date-picker :date="date" :dateChange="dateChange" :datetype="datetype"></date-picker>
    <div id="goBackChart"></div>
  </div>
</template>
<script>
  import nvDatePicker from './range-datepicker-common.vue'
  import highchartUtil from '../utils/highchartUtil.js'
  import httpRequest from '../utils/httpRequest.js'
  import {Toast} from 'mint-ui'
  export default {
    components: {'date-picker': nvDatePicker,},
    data: function () {
      return {
        datetype: 1,
        date1: window.moment().add(-7, "days").format("YYYY-MM-DD"),
        date2: window.moment().add(-1, "days").format("YYYY-MM-DD"),
        user_type: 0,
        time_type: 7,
        chartData: null,
      }
    },
    computed: {
      date: function () {
        var obj = {
          startTime: this.date1,
          endTime: this.date2
        }
        return obj;
      },
    },
    methods: {
      toggleDateType: function (datetype) {
        this.datetype = datetype;
      },
      dateChange: function (newDate) {
        this.date1 = newDate.startTime;
        this.date2 = newDate.endTime;
        this.query();
      },
      query: function () {
        var param = {
          date1: this.date1,
          date2: this.date2,
          user_type: Number(this.user_type),
          time_type: this.time_type,
          config_id: 2,
        }
        httpRequest.getGameGKLoseRetainData(param, (data) => {
          if (data.state == "successed") {
            this.chartData = data.result[0];
            this.drawChart();
          }
          else {
            Toast(data.result.errorMsg);
          }
        })
      },
      drawChart: function () {
        var data = this.chartData;
        if (data) {
          var categories = [];
          for (var i = 0; i < data.length; i++) {
            categories.push(data[i].count_date);
          }
          var chartData = [];
          var chartData = [{name: '每日回流数', data: [], type: 'column', yAxis: 0},
            {name: '每日回流率', data: [], type: 'spline', tooltip: {valueSuffix: "%"}, yAxis: 1}];
          if (this.time_type == 7) {
            chartData[0].name = "每日回流数";
            chartData[1].name = "每日回流率";
          } else if (this.time_type == 14) {
            chartData[0].name = "每周回流数";
            chartData[1].name = "每周回流率";
          } else if (this.time_type == 30) {
            chartData[0].name = "每月回流数";
            chartData[1].name = "每月回流率";
          }
          for (var i = 0; i < data.length; i++) {
            chartData[0].data.push(Number(data[i][chartData[0].name]));
            chartData[1].data.push(Number(data[i][chartData[1].name]));
          }
          highchartUtil.drawTwoYaxisChart('goBackChart', categories, chartData, true);
        }
      },
    },
    watch: {
      datetype: function (newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          if (newVal == 1) {
            this.time_type = 7;
          }
          else if (newVal == 2) {
            this.time_type = 14;
          }
          else if (newVal == 3) {
            this.time_type = 30;
          }

        }
      },
      user_type: function (newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.query();
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .lost-group-header {
    width: 100%;
    text-align: left;
    font-size: 0.35rem;
    padding: 0.3rem;
    border-bottom: 1px dashed #bbb;
    .lost-group-icon {
      width: 0.2rem;
      height: 0.3rem;
      float: left;
      background-color: #9494A7;
    }
    .index-header-text {
      padding-left: 0.2rem;
      display: inline;
    }
  }

  .type-content {
    width: 100%;
    height: 1.06rem;
    line-height: 1.06rem;
    padding: 0.1rem;
    .player-type {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      padding: 0 0.2rem;
      height: 0.8rem;
      float: left;
      border-color: #D7D7D7;
    }
    .player-type > select::-ms-expand {
      display: none;
    }

    .fastSelecter {
      width: 4rem;
      height: 0.8rem;
      line-height: 0.8rem;
      float: right;
      display: -webkit-box;
      border: 1px solid #CAAD9D;
      .fast-item {
        -webkit-box-flex: 1;
        background: #FFFFFF;
        border-left-color: #CAAD9D;
        font-size: 0.35rem;
        font-family: '微软雅黑';
      }
      .fast-item.now {
        color: #5E5E5E;
        background-color: #EEEEEE;
        font-weight: bold;
      }
    }
  }

  #goBackChart {
    width: 100%;
    height: auto;
  }
</style>
