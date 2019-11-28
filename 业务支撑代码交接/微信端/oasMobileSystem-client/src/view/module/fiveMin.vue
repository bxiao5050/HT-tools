<template>
  <div>
    <div v-if="gameId==47">
    <div class="fastGroup">
      <div class="fastSelecter">
        <!--在线   充值     注册     创角   付费人数  活跃-->
        <v-touch tag="div" class="fast-item" :class="{now:type==3}" v-if="systemId!=3" v-on:tap="toggleType(3)">在 线</v-touch>
        <v-touch tag="div" class="fast-item" :class="{now:type==1}" v-on:tap="toggleType(1)">充 值</v-touch>
        <v-touch tag="div" class="fast-item" :class="{now:type==5}" v-if="gameId==47" v-on:tap="toggleType(5)">注册</v-touch>
      </div>
    </div>
    <div class="fastGroup">
    <div class="fastSelecter">
      <v-touch tag="div" class="fast-item" :class="{now:type==2}" v-on:tap="toggleType(2)">创 角</v-touch>
      <v-touch tag="div" class="fast-item" :class="{now:type==4}" v-if="systemId==1 || gameId == 47" v-on:tap="toggleType(4)">付费人数</v-touch>
      <v-touch tag="div" class="fast-item" :class="{now:type==6}" v-if="gameId==47" v-on:tap="toggleType(6)">活跃</v-touch>
    </div>
    </div>
    </div>
    <div v-if="gameId!=47" class="fastGroup">
      <div class="fastSelecter">
        <v-touch tag="div" class="fast-item" :class="{now:type==1}" v-on:tap="toggleType(1)">充 值</v-touch>
        <v-touch tag="div" class="fast-item" :class="{now:type==2}" v-on:tap="toggleType(2)">创 角</v-touch>
        <v-touch tag="div" class="fast-item" :class="{now:type==3}" v-if="systemId!=3" v-on:tap="toggleType(3)">在 线</v-touch>
        <v-touch tag="div" class="fast-item" :class="{now:type==4}" v-if="systemId==1 || gameId == 47" v-on:tap="toggleType(4)">付费人数</v-touch>
      </div>
    </div>
    <nv-date-picker :dateChange="dateChange" :date="date1"></nv-date-picker>
    <div class="max-value-group">
      <div class="now-max-value-item px1-b">
        <div id="maxFirstData" class="max-value">{{maxValue.firstData.value|toThousands}}</div>
        <div class="max-value-time">峰值 {{date1}} {{maxValue.firstData.count_time}}</div>
      </div>
      <div class="other-max-value-item">
        <div class="max-value-item px1-r">
          <div id="maxSecondData" class="max-value">{{maxValue.secondData.value|toThousands}}</div>
          <div class="max-value-time">峰值 {{date2}} {{maxValue.secondData.count_time}}</div>
        </div>
        <div class="max-value-item">
          <div id="maxThirdData" class="max-value">{{maxValue.thirdData.value|toThousands}}</div>
          <div class="max-value-time">峰值 {{date3}} {{maxValue.thirdData.count_time}}</div>
        </div>
      </div>
    </div>
    <fiveMinComparison :isShow="isShowModel" :reset="reset" :comporisonDate="comporisonDate" :comporisonDateChannge="comporisonDateChannge"></fiveMinComparison>
    <div class="chart-group">
      <div id="fiveMinChart" class="five-min-chart"></div>
      <div class="float-compare-box" @click="openComporeModel">
        +
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import nvDatePicker from '../../components/datepicker.vue'
  import fiveMinComparison from '../../components/fiveMinComparison.vue'
  import httpRequest from '../../utils/httpRequest.js'
  import highchartUtil from '../../utils/highchartUtil.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    components: {
      nvDatePicker,
      fiveMinComparison
    },
    data: function () {
      return {
        type: 1, //默认选中： 充值 创角
        date1: window.moment().format('YYYY-MM-DD'),
        date2: window.moment(this.date1).add(-1, "day").format('YYYY-MM-DD'),
        date3: window.moment(this.date1).add(-1, "week").format('YYYY-MM-DD'),
        isShowModel: false
      }
    },
    mounted: function () {
      this.query();
      window.fiveMinInterval = setInterval(() => {
        this.query();
      }, 1000 * 60 * 5);
    },
    beforeDestroy: function () {
      clearInterval(window.fiveMinInterval);
    },
    computed: {
      ...mapGetters(["fiveMinData"]),
      systemId: function () {
        return this.$store.state.basestore.nowgame.system_id;
      },
      gameId:function(){
        return this.$store.state.basestore.nowgame.game_id;
      },
      comporisonDate: function () {
        var obj = {
          date1: this.date1,
          date2: this.date2,
          date3: this.date3
        }
        return obj;
      },
      maxValue: function () {
        var nowDate = new Date(moment().add(-10, 'minutes').format('YYYY-MM-DD HH:mm:ss'));
        var maxVal = {
          firstData: {
            count_time: '',
            value: 0
          }, //对应date1的峰值
          secondData: {
            count_time: '',
            value: 0
          }, //对应date2的峰值
          thirdData: {
            count_time: '',
            value: 0
          } //对应date3的峰值
        }

        for (var i = 0; i < this.fiveMinData.length; i++) {
          // var dataDate = new Date(this.date1 + ' ' + this.fiveMinData[i]['count_time']);
          if (this.fiveMinData[i][this.date1] != "") {
            if (Number(this.fiveMinData[i][this.date1]) >= maxVal.firstData.value) {
              maxVal.firstData = {
                count_time: this.fiveMinData[i]["count_time"],
                value: Number(this.fiveMinData[i][this.date1])
              };
            }
          }
          if (this.fiveMinData[i][this.date2] != "") {
            if (Number(this.fiveMinData[i][this.date2]) >= maxVal.secondData.value) {
              maxVal.secondData = {
                count_time: this.fiveMinData[i]["count_time"],
                value: Number(this.fiveMinData[i][this.date2])
              };
            }
          }
          if (this.fiveMinData[i][this.date3] != "") {
            if (Number(this.fiveMinData[i][this.date3]) >= maxVal.thirdData.value) {
              maxVal.thirdData = {
                count_time: this.fiveMinData[i]["count_time"],
                value: Number(this.fiveMinData[i][this.date3])
              };
            }
          }
        }
        return maxVal;
      }
    },
    filters: {
      toThousands: function (val) {
        return val.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
      }
    },
    methods: {
      dateChange: function (newDate) {
        if (newDate == this.date2 || newDate == this.date3 || this.date2
          .time == this.date3) {
          Toast("不能选择相同日期，请重新选择!");
          return;
        }
        this.date1 = newDate;
      },
      comporisonDateChannge: function (date) {
        this.date2 = date.date2;
        this.date3 = date.date3;
      },
      reset: function () {
        this.date1 = window.moment().format('YYYY-MM-DD')
        this.date2 = window.moment(this.date1).add(-1, "day").format('YYYY-MM-DD')
        this.date3 = window.moment(this.date1).add(-1, "week").format('YYYY-MM-DD')
      },
      openComporeModel: function (item) {
        this.isShowModel = !this.isShowModel;
        // this.$store.state.fiveforcestore.drawChart();
      },
      toggleType: function (type) {
        this.type = type;
        this.query();
      },
      query: function () {
        var params = {
          type: this.type,
          date1: this.date1,
          date2: this.date2,
          date3: this.date3
        }
        httpRequest.getFiveMinData(params, (data) => {
          if (data.state == "successed") {
            this.$store.dispatch("setFiveMinData", data.result[0]);
            this.drawChart();
          } else {
            Toast(data.result.errorMsg);
          }
        })
      },
      //画图表
      drawChart: function () {
        // var nowDate = new Date(moment().add(-10, 'minutes').format('YYYY-MM-DD HH:mm:ss'));
        var seriesData = [{
          name: this.date3,
          data: []
        }, {
          name: this.date2,
          data: []
        }, {
          name: this.date1,
          data: []
        }];
        var categories = [];
        for (var i = 0; i < this.fiveMinData.length; i++) {
          categories.push(this.fiveMinData[i].count_time);
          var dataDate = new Date(this.date1 + ' ' + this.fiveMinData[i]['count_time']);
          seriesData[0].data.push(Number(this.fiveMinData[i][this.date3]));
          seriesData[1].data.push(Number(this.fiveMinData[i][this.date2]));
          if (this.fiveMinData[i][this.date1] != "") {
            seriesData[2].data.push(Number(this.fiveMinData[i][this.date1]));
          }
        }
        highchartUtil.drawFiveMinLine('fiveMinChart', categories, seriesData);
      }
    },
    watch: {
      'date1': function (newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.query();
        }
      },
      'date2': function (newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.query();
        }
      },
      'date3': function (newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.query();
        }
      }
    }
  }

</script>
<style lang="scss">
  .max-value-group {
    width: 100%;
    height: 4.5rem;
    .now-max-value-item {
      width: 100%;
      height: 50%;
      /*display: -webkit-flex;
      -webkit-align-items: center;
      -webkit-flex-direction: column;
      -webkit-justify-content: center;*/
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: center;
      -webkit-box-orient: vertical;
      text-align: center;
      .max-value {
        font-size: 0.53rem;
        font-weight: 400;
      }
      .max-value-time {
        margin-top: 0.3rem;
      }
    }
    .other-max-value-item {
      width: 100%;
      height: 50%;
      /*display: -webkit-flex;*/
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: justify;
      text-align: center;
      .max-value-item {
        /*-webkit-flex: 1;*/
        /*display: -webkit-flex;
        -webkit-align-items: center;
        -webkit-flex-direction: column;
        -webkit-justify-content: center;*/
        -webkit-box-flex: 1;
        .max-value {
          font-size: 0.53rem;
          font-weight: 400;
        }
        .max-value-time {
          margin-top: 0.3rem;
        }
      }
    }
  }

  .chart-group {
    width: 100%;
    height: 8rem;
    .float-compare-box {
      width: 0.8rem;
      height: 0.8rem;
      padding: 0.1rem;
      line-height: 0.5rem;
      position: fixed;
      top: 50%;
      right: 0;
      font-weight: bold;
      font-family: '微软雅黑';
      font-size: 0.6rem;
      text-align: center;
      transform: translateY(-50%);
      background-color: #8F8F8F;
      color: #FFF;
      border-radius: 20px;
    }
    .five-min-chart {
      width: 100%;
      height: 8rem;
    }
  }

</style>
