<template>
  <div class="chartModel" v-show="chartPopShow">
    <header>
      <div class="header">
        <v-touch tag="div" class="header-left" v-on:tap="closeChart">返回</v-touch>
        <h1 class="header-title">图表</h1>
        <div class="header-right"></div>
      </div>
    </header>
    <div class="chart-content">
      <date-picker :date="date" :dateChange="dateChange"></date-picker>
      <div id="keyIndexChart">
      </div>
    </div>
  </div>
</template>
<script>
  import nvDatePicker from './range-datepicker-common.vue'
  import highchartUtil from '../utils/highchartUtil.js'
  import httpRequest from '../utils/httpRequest.js'
  import commonMethod from '../utils/commonMethod.js'
  import { Toast } from 'mint-ui'
  export default {
    props: ["isShow", "chartType", "selectedId"],
    components: { 'date-picker': nvDatePicker, },
    data: function () {
      return {
        chartPopShow: false,
        date1: window.moment().add(-7, "days").format("YYYY-MM-DD"),
        date2: window.moment().add(-1, "days").format("YYYY-MM-DD"),
        chartData: null
      }
    },
    mounted: function () {
      var _self = this;
      var evt = "onorientationchange" in window ? "orientationchange" : "resize";
      window.addEventListener(evt, function () {
        _self.drawChart();
      });
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
    watch: {
      isShow: function (newVal, oldVal) {
        if (newVal) {
          this.chartPopShow = true;
        }
        else {
          this.chartPopShow = false;
        }
      },
      selectedId: function (newVal, oldVal) {
        this.query();
      }
    },

    methods: {
      showChart: function () {
        this.chartPopShow = true;
      },
      closeChart: function () {
        this.$emit("closeChart");
      },
      dateChange: function (newDate) {
        this.date1 = newDate.startTime;
        this.date2 = newDate.endTime;
        this.query();
      },
      query: function () {
        if (this.selectedId) {
          var param = {
            date1: this.date1,
            date2: this.date2,
            selected_id: this.selectedId,
          }
          httpRequest.getGameGKKeyChartData(param, (data) => {
            if (data.state == "successed") {
              this.chartData = data.result[0];
              this.drawChart();
            }
            else {
              Toast(data.result.errorMsg);
            }
          })
        }
      },
      drawChart: function () {
        var data = this.chartData;
        if (data) {
          var categories = [];
          for (var i = 0; i < data.length; i++) {
            categories.push(data[i].count_date);
          }
          var chartData = [];
          for (var index in data[0]) {
            if (index != "count_date") {
              var obj = {
                name: index,
                data: [],
                type: this.chartType,
                tooltip: {
                  valueSuffix: index.indexOf("率", 0) != -1 ? "%" : ''
                }
              };
              for (var i = 0; i < data.length; i++) {
                obj.data.push(data[i][index]);
              }
              chartData.push(obj);
            }
          }
          highchartUtil.drawFixedChart('keyIndexChart', this.chartType, categories, chartData,index.indexOf("率", 0) != -1 ? true : false);
        }
      }
    }
  }

</script>
<style lang="scss">
  .chartModel {
    width: 100%;
    height: 100%;
    background: #FFF;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    .chart-content{
      width:100%;
      height:auto;
      margin-top:50px;
       @media screen and (orientation:portrait){
         #keyIndexChart{
            width:100%;
            height:14rem;
        }
      }
      @media screen and (orientation:landscape){
         #keyIndexChart{
            width:100%;
            height:6rem;
        }
      }
    }
  }

</style>