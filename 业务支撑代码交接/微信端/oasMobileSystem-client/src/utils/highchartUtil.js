import Highcharts from 'highcharts'
// require('highcharts/themes/gray')(Highcharts);
// import themes from 'highcharts/themes/gray';
// themes(Highcharts)

Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  },
  colors: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d']
});

const drawLineChart = (chart_id, categories, series, isRate) => {
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: chart_id,
      type: 'spline'
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        formatter: function () {
          return isRate != undefined && isRate ? (this.value + "%") : this.value
        }
      },
      min: 0,
      allowDecimals: false
    },
    tooltip: {
      crosshairs: [{
        width: 1,
        color: 'gray'
      }],
      shared: true
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      borderWidth: 0,
      margin: 0
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
          radius: 1,
          lineColor: '#666666',
          lineWidth: 1
        },
        lineWidth: 1
      }
    },
    series: series
  });
}


const drawFiveMinLine = (chart_id, categories, series) => {
  // $(chart_id).highcharts({
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: chart_id,
      type: 'spline'
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    xAxis: {
      categories: categories,
      tickInterval: 18,
      labels: {
        rotation: -90
      }
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return this.value
        }
      },
      min: 0,
      allowDecimals: false
    },
    tooltip: {
      crosshairs: [{
        width: 1,
        color: 'gray'
      }],
      shared: true
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      borderWidth: 0,
      margin: 0
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
          radius: 1,
          lineColor: '#666666',
          lineWidth: 1
        },
        lineWidth: 1
      }
    },
    series: series
  });
}

const drawTwoYaxisChart = (chart_id, categories, series, isRate) => {
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: chart_id,
      type: 'spline'
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    xAxis: {
      categories: categories
    },
    yAxis: [{
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return this.value
        }
      },
      min: 0,
      allowDecimals: false
    }, {
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return isRate != undefined && isRate ? (this.value + "%") : this.value
        }
      },
      min: 0,
      allowDecimals: false,
      opposite: true
    }],
    tooltip: {
      crosshairs: [{
        width: 1,
        color: 'gray'
      }],
      shared: true
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      borderWidth: 0,
      margin: 0
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
          radius: 1,
          lineColor: '#666666',
          lineWidth: 1
        },
        lineWidth: 1
      }
    },
    series: series
  });
}

const drawFixedChart = (chart_id, chartType, categories, series, isRate) => {
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: chart_id,
      type: chartType
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return isRate != undefined && isRate ? (this.value + "%") : this.value
        }
      },
      min: 0,
      allowDecimals: false
    },
    tooltip: {
      crosshairs: [{
        width: 1,
        color: 'gray'
      }],
      shared: true
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'top',
      borderWidth: 0,
      margin: 0
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
          radius: 1,
          lineColor: '#666666',
          lineWidth: 1
        },
        lineWidth: 1
      }
    },
    series: series
  });
}
export default {
  drawLineChart,
  drawFiveMinLine,
  drawTwoYaxisChart,
  drawFixedChart
}
