<template>
  <div :id="chartId"></div>
</template>
<script>
export default {
  name: 'inline-chart',
  props: ['chartId', 'data'],
  methods: {
    drawChart: function () {
      let categories = []
      let seriesData = [{
        data: this.data,
        pointStart: 1,
        color: 'skyblue'
      }]
      highchartUtil.drawSparkChart(this.chartId, seriesData)
    }
  },
  mounted() {
    this.drawChart()
  },
  watch: {
    data: {
      deep: true,
      handler: function (v, ov) {
        if (v != ov) {
          this.drawChart()
        }
      }
    }
  }
}
</script>