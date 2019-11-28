import Highcharts from 'highcharts'
import utils from './utils'
Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  },
  colors: [
    '#9B86D9',
    '#62C87F',
    '#FC863F',
    '#5D9CEC',
    '#F26262',
    '#2EC7C9',
    '#DDCC0B',
    '#95706D',
    '#8D98B3'
  ]
});
const optionConfig = {
  credits: {
    enabled: false
  },
  title: {
    text: null
  },
  subtitle: {
    text: null
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
    margin: 0,
    padding: 0,
  },
  plotOptions: {
    spline: {
      marker: {
        enabled: false,
        radius: 3,
        lineColor: '#FFFFFF',
        lineWidth: 1
      },
      lineWidth: 2,
      states: {
        hover: {
          lineWidth: 3
        }
      },
    },
    bar: {
      dataLabels: {
        enabled: false,
        allowOverlap: true
      }
    }
  }
}
const draw = (option) => {
  let options = Object.assign({}, optionConfig)
  utils.mergeObject(options, option);
  return new Highcharts.Chart(options)
}
const drawChart = (chart_id, chartType, categories, series, isRate = 0, title = '') => {
  let option = {
    chart: {
      renderTo: chart_id,
      type: chartType
    },
    subtitle: {
      text: title || "",
      align: 'left',
      verticalAlign: 'top'
    },
    xAxis: {
      categories: categories,
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
      allowDecimals: true
    }, {
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return isRate !== undefined && isRate ?
            (this.value + "%") :
            this.value
        }
      },
      allowDecimals: true,
      opposite: true
    }],
    series: series
  };
  return draw(option);
}

const drawFiveMinLine = (chart_id, categories, series) => {
  let option = {
    chart: {
      renderTo: chart_id,
      type: 'line'
    },
    xAxis: {
      categories: categories,
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
      borderWidth: 1,
      shadow: false,
      shared: true,
      useHTML: true,
      headerFormat: '<small>{point.key}</small><table>',
      pointFormat: '<tr><td>{series.name}: </td><td>峰值:{series.options.max}</td><td style="text-align: right">当前值:{point.y}</td></tr>',
      footerFormat: '</table>',
      valueDecimals: 2,
      stickyTracking: false
    },
    series: series
  }
  return draw(option)
}
/**
 * 条形图  左右分隔
 * @param {*} chart_id 
 * @param {*} categories 
 * @param {*} seriesData 
 */
const drawOppositeBar = (chart_id, categories, seriesData) => {
  let option = {
    chart: {
      renderTo: chart_id,
      type: 'bar'
    },
    xAxis: [{
      categories: categories,
      reversed: false,
      labels: {
        step: 1
      }
    }],
    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return Math.abs(this.value);
        }
      }
    },
    series: seriesData,
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/> ' + this.point.category + ':' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
      }
    }
  };
  return draw(option)
}

/**
 * 
 * @param {String} chart_id - 容器id 
 * @param {Array} seriesData - data []
 * @param {*} clickPieItem - 触发事件
 */

const drawPieChart = (chart_id, seriesData, clickPieItem = new Function) => {
  let option = {
    chart: {
      renderTo: chart_id,
      type: 'pie'
    },
    series: seriesData,
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true,
        events: {
          click: clickPieItem
          // function(e) {
          //   clickPieItem(e)
          // }
        }
      }
    },
    tooltip: {
      headerFormat: '{series.name}<br>',
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    }
  };
  return draw(option)
}

const drawBarChart = (chart_id, categories, seriesData, barTitle, isRate = 0) => {
  let option = {
    chart: {
      renderTo: chart_id,
      type: 'bar'
    },
    subtitle: {
      text: barTitle || "",
      align: 'left',
      verticalAlign: 'top'
    },
    xAxis: [{
      categories: categories,
      reversed: false,
      labels: {
        step: 1
      }
    }],
    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return isRate !== undefined && isRate ? (Math.abs(this.value) + "%") : Math.abs(this.value);
        }
      }
    },
    series: seriesData,
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
          allowOverlap: true
        }
      }
    },
    tooltip: {
      shared: true
    }
  };
  return draw(option)
}

const drawInlineChart = (chart_id, categories, seriesData) => {
  let option = {
    chart: {
      renderTo: chart_id,
      type: 'spline'
    },
    title: {
      text: '',
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: categories,
      labels: {
        enabled: false
      },
      tickWidth: 0,
      lineColor: '#fff'
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 0
    },
    plotOptions: {
      series: {
        lineWidth: 2,
        marker: {
          enabled: false
        },
        states: {
          hover: {
            lineWidth: 3
          }
        }
      }
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        return this.y;
      }
    },
    legend: {
      enabled: false
    },
    series: seriesData
  }
  return draw(option)
}

const drawSparkChart = (chart_id, seriesData) => {
  let option = {
    chart: {
      renderTo: chart_id,
      type: 'spline'
    },
    title: {
      text: '',
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      startOnTick: false,
      endOnTick: false,
      tickPositions: [],
      tickWidth: 0,
      lineColor: '#fff'
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      tickPositions: [0]
    },
    tooltip: {
      borderWidth: 0,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      shadow: false,
      useHTML: true,
      formatter: function () {
        return this.y;
      }
    },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 2,
        shadow: false,
        states: {
          hover: {
            lineWidth: 2
          }
        },
        marker: {
          radius: 1,
          states: {
            hover: {
              radius: 2
            }
          }
        },
        fillOpacity: 0.25
      }
    },
    legend: {
      enabled: false
    },
    series: seriesData
  }
  return draw(option)
}

export {
  draw,
  drawChart,
  drawFiveMinLine,
  drawOppositeBar,
  drawPieChart,
  drawBarChart,
  drawInlineChart,
  drawSparkChart
}