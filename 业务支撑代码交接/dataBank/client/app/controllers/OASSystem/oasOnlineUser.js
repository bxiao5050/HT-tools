/**
 * Created by weiqiang.yu on 2016/3/3.
 */
/**
 * Created by weiqiang.yu on 2016/3/3.
 */
/**
 * Created by weiqiang.yu on 2016/3/1.
 */

'use strict';
app.controller('oasOnlineUserController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name="在线用户";
    $scope.questionTitle = "在线用户指标说明";
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    $scope.IsShowDatetypeList=true;

    try {
        document.updateQuestionTip('oas_onlineUser_question.html');
    }
    catch(e){
        setTimeout(function () {
            document.updateQuestionTip('oas_onlineUser_question.html');
        },3000)
    }

    var curParams = null; // 当前选择的参数

    //$scope.datePickerType = 2;
    $scope.datePickerDayDiff = -2;
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };

    // ACU PCU ACP/PCU AT  选择
    $scope.radioModel = 'ACU';
    // 监听 ACU PCU ACP/PCU AT 切换事件
    $scope.$watch('radioModel', function (newValue, oldValue) {
        if (newValue && curParams) {
            $scope.query();
        }
    })

    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };

    /**
     * 显示五分钟注册数据
     */
    function getData() {
        $http({
            url: '/api/oas/onlineUser',
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
                // 折线图
                drawChart(data, 'onlineUserChart1');
                // 表格
                $scope.tableData = data.result;

            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }

    /**
     * 导出
     */
    function exportData() {
        $http({
            url: '/api/oas/export/onlineUser',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                window.open(data.result);
            } else {
                pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error', '链接异常', data);
        });
    }

    /**
     * 公共方法 画折线图
     * @param data
     * @param chartID
     */
    function drawChart(data, chartID) {
        if ($scope.radioModel === 'ACU') {
            var categories = [];
            var seriesData = [
                {
                    name: "ACU",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp['日期']);
                seriesData[0].data.push(Number(temp['在线均值（ACU）']));
            }
        }
        else if ($scope.radioModel === 'PCU') {
            var categories = [];
            var seriesData = [
                {
                    name: "PCU",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp['日期']);
                seriesData[0].data.push(Number(temp['在线峰值（PCU）']));
            }
        }
        else if ($scope.radioModel === 'ACU/PCU') {
            var categories = [];
            var seriesData = [
                {
                    name: "ACU/PCU",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp['日期']);
                seriesData[0].data.push(Number(temp['在线平高比（ACU/PCU）']));
            }
        }
        else if ($scope.radioModel === 'AT') {
            var categories = [];
            var seriesData = [
                {
                    name: "AT",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp['日期']);
                seriesData[0].data.push(Number(temp['户均在线时长（AT）']));
            }
        }
        drawHighChartArea(categories, seriesData, chartID);
    }

    /**
     * 监听查询事件
     */
    $scope.$on("oasQuery", function (event, params) {
        curParams = {
            date1: moment(params.date1).format('YYYY-MM-DD'),  // 时间范围选择 beginDate
            date2: moment(params.date2).format('YYYY-MM-DD'),     // 时间范围选择 endDate
            game_id: params.game_id,
            agent_id: params.agent_id,
            regchannel: params.regchannel,
            paychannel:params.paychannel,
            datetype:params.datetype
        };
        $scope.query();
    });
    $scope.query = function () {
        refreshData();
    };
    $scope.export = function () {
        exportData();
    };

    /**
     * 刷新数据
     */
    var refreshData = function () {
        if (curParams) {
            getData();
        } else {
            pop('error', 'error', '参数有误，刷新查询失败！')
        }
    }


}]);