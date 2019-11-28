/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('oasStepLostController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    var startDate = moment().add($scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
    var endDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    $scope.initData = {
        //flag:true,
        //firstActive : true,
        //secondActive: false,
        //thirdActive: false,
        //secondDisabled: true,
        //thirdDisabled: true,
        //opened:false,
        curDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
        rangeDate: {startDate: startDate, endDate: endDate}
    }
    // $scope.rangeDate = { startDate: startDate, endDate: endDate };
    //try {
    //    document.updateQuestionTip('新手阶段留存指标说明','oas_stepLost_question.html');
    //}
    //catch(e){
    //    setTimeout(function () {
    //        document.updateQuestionTip('新手阶段留存指标说明','oas_stepLost_question.html');
    //    },3000)
    //}
    var showState = false;
    $scope.showModel =function(){
        if(showState == false){
            $("#myModal").modal('show');
            setTimeout(1000, function () {
                showState = true;
            })
        }
    };
    function updateQuestionTip(title,content) {
        $.get(
            './questionTip/'+content,function(response){
                $scope.questionTitle = title;
                $('#questionContent').html(response);
            }
        );
    }
    updateQuestionTip('新手阶段留存指标说明','oas_stepLost_question.html');


    $scope.today = function () {
        $scope.initData.curDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    };
    $scope.today();

    $scope.clear = function () {
        $scope.initData.curDate = null;
    };
    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.initData.opened = true;
    };


    // 当前选择的参数
    var curParams = null;
    // 选择使用单个时间选择框  1为时间范围
    $scope.datePickerDayDiff = -2; // 默认选择前天
    $scope.datePickerType = 2;
    // 1日、2日7日 选择
    $scope.radioModel = '1';
    // 监听日周月看盘切换事件
    $scope.$watch('radioModel', function (newValue, oldValue) {
        if (newValue && curParams) {
            refreshData();
        }
    })
    // 初始化提示框
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };


    /**
     * 获取开始时间8天内所有的时间
     * @returns {Array}
     */
    function getDays() {
        var date = [];

        var begin_date = curParams.curDate;
        if ($scope.radioModel == 'month') {
            begin_date = moment(curParams.curDate).startOf('month').format('YYYY-MM-DD');
        } else if ($scope.radioModel == 'week') {
            begin_date = moment(curParams.curDate).startOf('week').format('YYYY-MM-DD');
        }
        var i = 0;
        while (i <= 7) {
            date.push(moment(begin_date).add(0 - i, $scope.radioModel + 's').format('YYYY-MM-DD'));
            i = i + 1;
        }
        return date;
    }

//TODO
    function exportExcel() {

        curParams = $params.getParams();
        getPageParam();
        $http({
            url: '/api/oas/export/steplost-newuser',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            window.location.href = data.result;
        });

    }

    function drawHighChartTable(categories, seriesData, elementId) {
        $("#" + elementId).highcharts({
            title: {
                text: ''
            },
            credits: {
                text: '',
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
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                tickInterval: 1,
                categories: categories,
                lineColor: '#868686',
                tickColor: '#868686',
                labels: {
                    rotation: -25,
                    align: 'right',
                    style: {
                        fontSize: '12px',
                        fontFamily: '微软雅黑',
                        fontWeight: 'normal'
                    }
                }
            },
            yAxis: [{
                title: {
                    text: ''
                }
            }, {
                title: {
                    text: ''
                },
                labels: {
                    format: '{value}%'
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'horizontal',
                verticalAlign: 'top',
                borderWidth: 0,
                floating: false,
                backgroundColor: '#FFFFFF'
            },
            series: seriesData
        });
    }

    function getData(url) {
        $scope.dates = getDays();
        $http({
            url: url,
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length < 1) {
                    $scope.noData = true;
                    return;
                } else {
                    $scope.noData = false;
                }

                var result = data.result;
                result.shift();

                var categories = [];
                var seriesData = [{
                    type: 'column',
                    color: '#F27036',
                    name: '留存人数',
                    data: [],
                    tooltip: {
                        valueSuffix: '人'
                    }
                }, {
                    type: 'spline',
                    color: '#3EBA88',
                    name: '流失率',
                    yAxis: 1,
                    data: [],
                    tooltip: {
                        valueSuffix: '%'
                    }
                }
                ];

                for (var i = 0; i < 9; i++) {
                    var temp = result[i];
                    categories.push(result[i]['节点名称']);

                    seriesData[0].data.push(Number(temp['留存人数']));
                    seriesData[1].data.push(Number(temp['流失率']));
                }


                drawHighChartTable(categories, seriesData, 'stepLostChart1');
                //drawHighChartLine(categories, seriesData, 'stepLostChart1');
                $scope.tableData = data.result;

            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }

    /**
     * 监听查询事件
     */
        //$scope.$on("oasQuery", function (event, params) {
        //    curParams = params;
        //    refreshData();
        //})
    $scope.$on("oasQuery", function (event, params) {
        $scope.query();
    });

    $scope.export = function () {
        exportExcel()
    };

    //$params.query =  function (event, params) {
    $scope.query = function () {
        curParams = $params.getParams();
        getPageParam();
        refreshData();
    };
    // 切换单时间 和 时间范围控件显示
    $scope.$watch('datePickerType', function (newValue, oldValue) {
        if (newValue == 2) {
            $scope.singleDatePicker = true;
        } else {
            $scope.singleDatePicker = false;
        }
    });

    // 初始化单时间选择控件
    var initCurDate = true;
    $scope.$watch('initData.curDate', function (newValue, oldValue) {
        if (newValue && !initCurDate) {
            //$scope.$emit("oasQuery", obj);
            $scope.query();
        } else {
            initCurDate = false;
        }
    })
    //获取页面参数
    var getPageParam = function () {
        curParams.curDate = moment($scope.initData.curDate).format('YYYY-MM-DD'),         // 单个时间选择
            curParams.date1 = moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),   // 时间范围选择 beginDate
            curParams.date2 = moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),     // 时间范围选择 endDate
            curParams.date3 = moment($scope.initData.rangeDate.endDate).add(-6, 'days').format('YYYY-MM-DD')
        curParams.configid = $scope.radioModel;
        return curParams;
    }

    /**
     * 刷新数据
     */
    var refreshData = function () {
        if (curParams) {
            getData('/api/oas/steplost-newuser');
        } else {
            pop('error', 'error', '参数有误，刷新查询失败！')
        }
    }


}]);