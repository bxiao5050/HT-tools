<template>
  <div>
    <div class="fastGroup">
      <div class="fastSelecter">
        <v-touch tag="div" class="fast-item" :class="{now:datetype==1}" v-on:tap="toggleDatetype(1)">昨天</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:datetype==2}" v-on:tap="toggleDatetype(2)">近7天</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:datetype==3}" v-on:tap="toggleDatetype(3)">近30天</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:datetype==4}" v-on:tap="toggleDatetype(4)">本月</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:datetype==5}" v-on:tap="toggleDatetype(5)">上个月</v-touch>
      </div>
    </div>
    <date-picker :date="date" :dateChange="dateChange" :datetype="datetype"></date-picker>
    <div id="totalReportChart" class="total-report-chart"></div>
    <report-table></report-table>
  </div>
</template>
<script>
  import nvDatePicker from '../../components/range-datepicker.vue'
  import reportTable from '../../components/launchReport/totalReportTable.vue'
  import httpRequest from '../../utils/httpRequest.js'
  import highchartUtil from '../../utils/highchartUtil.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    components: {
      'date-picker': nvDatePicker,
      "report-table": reportTable
    },
    data: function () {
      return {
        date1: window.moment().add(-1, "days").format("YYYY-MM-DD"),
        date2: window.moment().add(-1, "days").format("YYYY-MM-DD"),
        datetype: 1
      }
    },
    mounted: function () {
      var oldMenu = this.$store.state.launchAreaStore.oldMenu;
      var nowmenu = this.$store.state.basestore.nowmenu;
      if (oldMenu == null || oldMenu.menu_id != nowmenu.menu_id) {
        this.$store.dispatch("setAppData", this.$store.state.launchAreaStore.appData);
        this.$store.dispatch("setOldMenu", nowmenu);
      }
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
      chartData: function () {
        return this.$store.state.launchAreaStore.launchReportChartData;
      }
    },
    methods: {
      dateChange: function (newDate) {
        this.date1 = newDate.startTime;
        this.date2 = newDate.endTime;
        this.query();
      },
      toggleDatetype: function (datetype) {
        this.datetype = datetype;
        this.query();
      },
      query: function () {
        var params = {
          begin_date: this.date1,
          end_date: this.date2
        }
        httpRequest.getLaunchReportData(params, (data) => {
          if (data.state == "successed") {
            var reportData;
            var reportChartData;
            if (data.result.length == 0) {
              Toast("查询结果为空!");
              reportData = [];
              reportChartData = [];
            } else {
              reportData = data.result[0];
              reportChartData = data.result[1];
              this.$store.dispatch("setLaunchReportData", reportData);
              this.$store.dispatch("setLaunchReportChartData", reportChartData);
              this.drawChart();
            }
          } else {
            Toast(data.result.errorMsg);
          }
        })
      },
      drawChart: function () {
        var categories = [];
        var seriesData = [{
          name: "激活",
          type: 'column',
          data: []
        }, {
          name: "注册",
          type: 'column',
          data: []
        }, {
          name: "创角",
          type: 'column',
          data: []
        }, {
          name: "花费",
          type: 'column',
          data: []
        }, {
          name: "新服创角",
          type: 'column',
          data: []
        }, {
          name: "激活成本",
          type: 'column',
          data: []
        }, {
          name: "注册成本",
          type: 'column',
          data: []
        }, {
          name: "创角成本",
          type: 'column',
          data: []
        }];
        for (var i = 0; i < this.chartData.length; i++) {
          categories.push(this.chartData[i].name);
        }

        for (var i = 0; i < this.chartData.length; i++) {
          for (var j = 0; j < seriesData.length; j++) {
            seriesData[j].data.push(this.chartData[i][seriesData[j].name]);
          }
        }

        highchartUtil.drawLineChart("totalReportChart", categories, seriesData);
      }
    }

  }

</script>
<style lang="scss">
  .total-report-chart {
    width: 100%;
  }

</style>
