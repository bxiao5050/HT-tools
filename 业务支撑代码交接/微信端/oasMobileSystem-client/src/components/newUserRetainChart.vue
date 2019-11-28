<template>
  <div id="newUserRetainChart" class="newUserRetainChart"></div>
</template>
<script>
  import highchartUtil from '../utils/highchartUtil.js'
  export default {
    computed: {
      newUserRetainData: function () {
        return this.$store.state.userRetainstore.newUserRetainData;
      }
    },
    created: function () {
      this.$store.dispatch("setDrawChart", this.drawChart);
    },
    // watch: {
    //   'newUserRetainData': {
    //     deep: true,
    //     handler: function (newVal, oldVal) {
    //       this.drawChart();
    //     }
    //   }
    // },
    methods: {
      drawChart: function () {
        var data = this.formatChartData(this.newUserRetainData);
        data=data.sort(function(a,b){
          return window.moment(a.reg_date)-window.moment(b.reg_date);
        })
        var seriesData = [{
          name: '+1日留存率',
          data: [],
          tooltip: {
            valueSuffix: "%"
          }
        }, {
          name: '+7日留存率',
          data: [],
          tooltip: {
            valueSuffix: "%"
          }
        }, {
          name: '+30日留存率',
          data: [],
          tooltip: {
            valueSuffix: "%"
          }
        }];
        var categories = [];
        for (var i = 0; i < data.length; i++) {
          categories.push(data[i].reg_date);
          seriesData[0].data.push(Number(data[i]["+1日留存率"]));
          seriesData[1].data.push(Number(data[i]["+7日留存率"]));
          seriesData[2].data.push(Number(data[i]["+30日留存率"]));
        }

        highchartUtil.drawLineChart("newUserRetainChart", categories, seriesData);
      },
      formatChartData: function (data) {
        var newData = new Array();
        /*筛选图表需要的数据*/
        for (var i = 0; i < data.length; i++) {
          newData.push({
              reg_date: data[i].reg_date,
              "+1日留存率": data[i]["+1日留存率"] == "-" ? '0' : data[i]["+1日留存率"],
              "+7日留存率": data[i]["+7日留存率"] == "-" ? '0' : data[i]["+7日留存率"],
              "+30日留存率": data[i]["+30日留存率"] == "-" ? '0' : data[i]["+30日留存率"]
            })
        }

        /*替换无法识别的字符串*/
        for (var i = 0; i < newData.length; i++) {
          for (var index in newData[i]) {
            if (newData[i][index].toString().indexOf("%", 0) != -1) {
              newData[i][index] = Number(newData[i][index].toString().split("%")[0]);
            }
          }
        }
        return newData;
      }
    }
  }

</script>
<style>
  .newUserRetainChart {
    width: 100%;
    height: 12rem;
  }

</style>
