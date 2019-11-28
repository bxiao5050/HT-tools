/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('oasStepLostController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name="新手阶段留存";
    $scope.questionTitle="新手阶段留存指标说明";
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;

    try {
        document.updateQuestionTip('oas_stepLost_question.html');
    }
    catch(e){
        setTimeout(function () {
            document.updateQuestionTip('oas_stepLost_question.html');
        },3000)
    }

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
            $scope.query();
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

//TODO
    function exportExcel() {
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
    $scope.$on("oasQuery", function (event, params) {
        curParams={
            curDate:moment(params.curDate).format('YYYY-MM-DD'),         // 单个时间选择
            game_id:params.game_id,
            agent_id:params.agent_id,
            regchannel:params.regchannel,
            paychannel:params.paychannel
        };
        $scope.query();
    });

    $scope.export = function () {
        curParams.configid= $scope.radioModel;
        exportExcel()
    };
    $scope.query = function () {
        curParams.configid= $scope.radioModel;
        refreshData();
    };


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