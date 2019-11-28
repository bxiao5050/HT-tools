Array.prototype.unique = function () {
    this.sort();
    var re = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== re[re.length - 1]) {
            re.push(this[i]);
        }
    }
    return re;
}

//Switch Classes Function
function switchClasses(firstClass, secondClass) {

    var firstclasses = document.getElementsByClassName(firstClass);

    for (i = firstclasses.length - 1; i >= 0; i--) {
        if (!hasClass(firstclasses[i], 'dropdown-menu')) {
            addClass(firstclasses[i], firstClass + '-temp');
            removeClass(firstclasses[i], firstClass);
        }
    }

    var secondclasses = document.getElementsByClassName(secondClass);

    for (i = secondclasses.length - 1; i >= 0; i--) {
        if (!hasClass(secondclasses[i], 'dropdown-menu')) {
            addClass(secondclasses[i], firstClass);
            removeClass(secondclasses[i], secondClass);
        }
    }

    tempClasses = document.getElementsByClassName(firstClass + '-temp');

    for (i = tempClasses.length - 1; i >= 0; i--) {
        if (!hasClass(tempClasses[i], 'dropdown-menu')) {
            addClass(tempClasses[i], secondClass);
            removeClass(tempClasses[i], firstClass + '-temp');
        }
    }
}

//Add Classes Function
function addClass(elem, cls) {
    var oldCls = elem.className;
    if (oldCls) {
        oldCls += " ";
    }
    elem.className = oldCls + cls;
}

//Remove Classes Function
function removeClass(elem, cls) {
    var str = " " + elem.className + " ";
    elem.className = str.replace(" " + cls, "").replace(/^\s+/g, "").replace(/\s+$/g, "");
}

//Has Classes Function
function hasClass(elem, cls) {
    var str = " " + elem.className + " ";
    var testCls = " " + cls + " ";
    return (str.indexOf(testCls) != -1);
}

var highchartsColors = ['#a0d468', '#2dc3e8', '#fb6e52', '#e75b8d', '#ffce55'];
var credits = {
    text: '',//'changic 业务支撑系统',
    href: '#',
    position: {
        align: 'right', //水平居右
        verticalAlign: 'bottom' //垂直底部
    },
    style: {
        cursor: 'pointer', //鼠标样式为手型
        color: '#FF0000', //字体颜色
        fontSize: '10px' //字体大小
    }
};

/**
 * 分组柱形堆叠图
 * @param categories
 * @param seriesData
 * @param element
 */
function drawHighCharStacktLine(categories, seriesData, elementId) {
    $('#' + elementId).highcharts({
        chart: {
            type: 'column'
        },
        colors: highchartsColors,
        title: {
            text: null
        },
        credits: {enabled: false},//credits,
        xAxis: {
            categories: categories
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: null
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: seriesData
    });
}

function drawHighchartStatckColumn(categories, seriesData, elementId, title) {
    $('#' + elementId).highcharts({
        chart: {
            type: 'column'
        },
        colors: highchartsColors,
        title: {
            text: title
        },
        credits: {enabled: false},
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            title: {
                text: '设备数'
            }
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br>',
            shared: true,
            borderWidth: 0,
            shadow: false,
            backgroundColor: 'none'
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: seriesData
    });
}
function drawHighChartDoubleLine(categories, seriesData, elementId) {

    $('#' + elementId).highcharts({
        chart: {
            type: 'spline'
        },
        credits: {enabled: false},
        colors: highchartsColors,
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
                text: '设备数'
            },
            labels: {
                formatter: function () {
                    return this.value
                }
            }
        }, {
            title: {
                text: '金额'
            },
            labels: {
                formatter: function () {
                    return '$ ' + this.value
                }
            }, opposite: true
        }],
        tooltip: {
            crosshairs: [{
                width: 1,
                color: 'gray'
            }, {
                width: 1,
                color: 'gray'
            }],
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: seriesData
    });
}
function drawHighChartFiveMinteLine(categories, seriesData, elementId) {
    $('#' + elementId).highcharts({
        chart: {
            type: 'spline'
        },
        credits: {enabled: false},
        colors: highchartsColors,
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: categories,
            tickInterval: 18
        },
        yAxis: {
            title: {
                text: null
            },
            min: 0,
            allowDecimals: false
        },
        tooltip: {
            crosshairs: [{
                width: 1,
                color: 'gray'
            }, {
                width: 1,
                color: 'gray'
            }],
            shared: true,
            formatter: function () {
                var s = '<b>' + this.x + '</b>';
                $.each(this.points, function () {
                    s += '<br/>' + this.series.name + ':' + (this.y == -1 ? '当前无数据' : (this.y == -2 ? '未同步' : this.y)) + ' ' + (this.point.extra || '');
                });
                return s;
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'top'

        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: seriesData
    });
}
function drawHighChartLine(categories, seriesData, elementId) {
    $('#' + elementId).highcharts({
        chart: {
            type: 'spline'
        },
        credits: {enabled: false},
        colors: highchartsColors,
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: categories,
            dateTimeLabelFormats: {}
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
            min: 0
        },
        tooltip: {
            crosshairs: [{
                width: 1,
                color: 'gray'
            }, {
                width: 1,
                color: 'gray'
            }],
            shared: true,
            formatter: function () {
                var s = '<b>' + this.x + '</b>';
                $.each(this.points, function () {
                    s += '<br/>' + this.series.name + ':' + (this.y == -1 ? '当前无数据' : (this.y == -2 ? '未同步' : this.y)) + ' ' + (this.point.extra || '');
                });
                return s;
            }
        },
        legend: {
            verticalAlign: 'top',
            align: 'center'
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            },
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        series: seriesData
    });
}

function drawHighchartsSuperColumn(categories, seriesData, elementId, title, ytitle) {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: elementId,
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: ytitle
            }
        },
        colors: highchartsColors,
        credits: credits,
        plotOptions: {
            column: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            //根据是否进入钻取的状态重绘不同的图表
                            var drilldown = this.drilldown;
                            if (drilldown) { // drill down
                                setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);
                            } else { // restore
                                setChart(name, categories, seriesData);
                            }
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    color: highchartsColors[0],
                    style: {
                        fontWeight: 'bold'
                    },
                    formatter: function () {
                        return this.y + '%';
                    }
                }
            }
        },
        tooltip: {
            formatter: function () {
                var point = this.point,
                    s = this.x + ':<b>' + this.y + '% </b><br/>';
                if (point.drilldown) {
                    s += '点击查看 ' + point.category + ' 详情';
                } else {
                    s += '点击返回上层';
                }
                return s;
            }
        },
        series: seriesData,
        exporting: {
            enabled: false
        }
    });

    function setChart(name, categories, data, color) {
        //动态修改Categories
        chart.xAxis[0].setCategories(categories, false);
        //移除之前序列 如果有多个可以用for逐个移除
        chart.series[0].remove(false);
        //添加新的序列
        chart.addSeries({
            name: name,
            data: data,
            color: color || 'white'
        }, false);
        //重绘图表
        chart.redraw();
    };
}
function initTableOptions(data, titles) {
    return {
        //sAjaxSource: 'lib/jquery/datatable/data.json',
        //aoColumns: [
        //    { data: 'users.first_name' },
        //    { data: 'users.last_name' },
        //    { data: 'users.phone' },
        //    { data: 'sites.name' }
        //],
        "aaData": data,
        "aoColumns": null,
        //"aoColumns": [
        //    { "sTitle": "Install"},
        //    { "sTitle": "Reg"},
        //    {"sTitle": "Role"},
        //    {
        //        "sTitle": "Role Rate",
        //        "sClass": ""
        //    }
        //],
        "sDom": "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
        "iDisplayLength": 10,
        "oTableTools": {
            "aButtons": [
                "copy", "csv", "xls", "pdf", "print"
            ],
            "sSwfPath": "assets/swf/copy_csv_xls_pdf.swf"
        },
        "language": {
            "search": "",
            "sLengthMenu": "_MENU_",
            "oPaginate": {
                "sPrevious": "上一页",
                "sNext": "下一页"
            }
        },
        "aaSorting": []
    };
}

function drawHighChartArea(categories, seriesData, elementId) {
    $('#' + elementId).highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        credits: {enabled: false},
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            shared: true,
            formatter: function () {
                var s = '<b>' + this.x + '</b>';
                $.each(this.points, function () {
                    s += '<br/>' + this.series.name + ':' + (this.y == -1 ? '当前无数据' : (this.y == -2 ? '未同步' : this.y)) + ' ' + (this.point.extra || '');
                });
                return s;
            }
        },
        legend: {
            verticalAlign: 'top',
            align: 'center'
        },
        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: seriesData
    });
}
function drawHighChartDoubleLineCommon(categories, seriesData, elementId) {

    $('#' + elementId).highcharts({
        credits: {enabled: false},
        colors: highchartsColors,
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
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value
                }
            },
            min: 0
        }, {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value + "%"
                }
            }, opposite: true,
            min: 0
        }],
        tooltip: {
            crosshairs: [{
                width: 1,
                color: 'gray'
            }, {
                width: 1,
                color: 'gray'
            }],
            shared: true
        },
        legend: {
            verticalAlign: 'top',
            align: 'center'
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: seriesData
    });
}