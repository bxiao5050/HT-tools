/**
 * Created by weiqiang.yu on 2016-06-15.
 */
/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('stillLookController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : 0;
    var curParams = null;
    $scope.hideDateType = true;
    $scope.realtimeCompareDate = true;
    $scope.datePickerType = 2;
    $scope.IsStillLook=true;
    /**
     * 通过接口获取数据
     * @param url
     */
    function getData() {
        $http({
            url: 'api/7roadReport/getPopularize_realtime',
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
                data.result.shift();
                data.result.shift();//特殊：第一个为无效数据 { "fn_oas_fivepower_day": null},



                $scope.tableData = [];
                for (var i = 0; i < data.result.length; i++) {
                    if (data.result[i].hasOwnProperty('num1')) {
                        $scope.tableData.push(data.result[i]);
                    }
                }
                $scope.tableData=$scope.tableData.sort(function (a,b) {
                    return b.num1- a.num1;
                });
                drawChart("chart1", data);
            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }
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
     * 画图表
     * @param chartID
     * @param data
     */
    function drawChart(chartID, data) {
        var chartData = data;
        var LineData1 = [];
        var LineData2 = [];
        for (var i = 0; i < chartData.result.length; i++) {
            if (chartData.result[i].hasOwnProperty('num2')) {
                LineData2.push(data.result[i]);
            }
            else if (chartData.result[i].hasOwnProperty('num1')) {
                LineData1.push(data.result[i]);
            }
        }

        LineData1.sort(function (a, b) {
            return a.num1 - b.num1
        });
        LineData2.sort(function (a, b) {
            return a.num2 - b.num2
        });
        var lineDate = new Date(moment().add(-10, 'minutes').format('YYYY-MM-DD HH:mm:ss'));

        var date1 = moment(curParams.curDate).format('YYYY-MM-DD');
        var date2 = moment(curParams.count_date).format('YYYY-MM-DD');
        var categories = [];
        var seriesData = [
            {name: date2, data: []},
            {name: date1, data: []}


        ];
        for (var i = 0; i < LineData1.length; i++) {
            var temp1 = LineData1[i];
            var temp2 = LineData2[i];
            var dataDate = new Date(curParams.curDate + ' ' + temp2['count_date']);

            categories.push(temp2['count_date']);

            seriesData[0].data.push(Number(temp2['installs']));
            if (dataDate < lineDate) {
            seriesData[1].data.push(Number(temp1['installs']));
            }

        }

        drawHighChartLine(categories, seriesData, chartID);
    }

    /**
     * 监听查询事件
     */
    $scope.$on("7roadReportQuery", function (event, params) {
        curParams = params;
        $scope.query();
    });
    function exportData(){
        $http({
            url: 'api/7roadReport/export/getPopularize_realtime',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if(data.code ==0){
                window.open(data.result);
            }else{
                pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }

    $scope.query = function () {
        refreshData();
    };

    $scope.export= function () {
        exportData();
    };
    function refreshData() {
        getData();
    }

    /**
     * 定时刷新数据
     */
    var interval = setInterval(function () {
        refreshData();
    }, 1000 * 60 * 30);
    $scope.$on('$destroy', function (e) {
        window.clearInterval(interval);
    });
}]);