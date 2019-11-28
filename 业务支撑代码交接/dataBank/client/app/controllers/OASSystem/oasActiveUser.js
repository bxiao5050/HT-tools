/**
 * Created by weiqiang.yu on 2016/3/3.
 */
/**
 * Created by weiqiang.yu on 2016/3/1.
 */

'use strict';
app.controller('oasActiveUserController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name="活跃用户";
    $scope.questionTitle = "活跃用户指标说明";
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;

    try {
        document.updateQuestionTip('oas_activeUser_question.html');
    }
    catch(e){
        setTimeout(function () {
            document.updateQuestionTip('oas_activeUser_question.html');
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

    // DAU WAU MAU DAU/WAU DAU?MAU  选择
    $scope.radioModel = 'DAU';
    // 监听 DAU WAU MAU DAU/WAU DAU?MAU 切换事件
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
            url: 'api/oas/activeUser',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if(data.code ==0){
                if(data.result.length < 1){
                    $scope.noData = true;
                    return;
                }else{
                    $scope.noData = false;
                }
                data.result.shift();
                // 折线图
                drawChart(data, 'activeUserChart1');
                // 表格
                $scope.tableData = data.result;
            }else{
                pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error','链接异常',data);
        });
    }

    /**
     * 导出
     */
    function exportData() {
        $http({
            url: 'api/oas/export/activeUser',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if(data.code ==0){
             window.open(data.result)
            }else{
                pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error','链接异常',data);
        });
    }

    /**
     * 公共方法 画折线图
     * @param data
     * @param chartID
     */
    function drawChart(data, chartID) {



            if ($scope.radioModel === 'DAU') {
                var categories = [];
                var seriesData = [
                    {
                        name: "新用户",
                        data: []
                    }
                    ,
                    {
                        name: "老用户",
                        data:[]
                    }
                ];
                for (var i = 0; i < data.result.length; i++) {
                    var temp = data.result[i];
                    categories.push(temp.count_date);
                    seriesData[0].data.push(Number(temp['DAU（日新用户）']));
                    seriesData[1].data.push(Number(temp['DAU（日老用户）']));
                }
            }
            else if ($scope.radioModel === 'WAU') {
                var categories = [];
                var seriesData = [
                    {
                        name: "周活跃用户",
                        data: []
                    }
                ];
                for (var i = 0; i < data.result.length; i++) {
                    var temp = data.result[i];
                    categories.push(temp.count_date);
                    seriesData[0].data.push(Number(temp['WAU（周活跃用户）']));
                }
            }
            else if ($scope.radioModel === 'MAU') {
                var categories = [];
                var seriesData = [
                    {
                        name: "月活跃用户",
                        data: []
                    }
                ];
                for (var i = 0; i < data.result.length; i++) {
                    var temp = data.result[i];
                    categories.push(temp.count_date);
                    seriesData[0].data.push(Number(temp['MAU（月活跃用户）']));
                }
            }
            else if ($scope.radioModel === 'DAU/WAU') {
                var categories = [];
                var seriesData = [
                    {
                        name: "周平均活跃天数",
                        data: []
                    }
                ];
                for (var i = 0; i < data.result.length; i++) {
                    var temp = data.result[i];
                    categories.push(temp.count_date);
                    seriesData[0].data.push(Number(temp['DAU/WAU（周平均活跃天数）']));
                }
            }
            else if ($scope.radioModel === 'DAU/MAU') {
                var categories = [];
                var seriesData = [
                    {
                        name: "月平均活跃天数",
                        data: []
                    }
                ];
                for (var i = 0; i < data.result.length; i++) {
                    var temp = data.result[i];
                    categories.push(temp.count_date);
                    seriesData[0].data.push(Number(temp['DAU/MAU（月平均活跃天数）']));
                }
            }
        drawHighChartLine(categories, seriesData, chartID);
    }

    /**
     * 监听查询事件
     */
    $scope.$on("oasQuery", function (event, params) {
        curParams={
            date1: moment(params.date1).format('YYYY-MM-DD'),   // 时间范围选择 beginDate
            date2: moment(params.date2).format('YYYY-MM-DD'),     // 时间范围选择 endDate
            game_id:params.game_id,
            agent_id:params.agent_id,
            regchannel:params.regchannel,
            paychannel:params.paychannel
        };
        $scope.query();
    });
    $scope.query = function () {
        refreshData();
    };
    $scope.export=function()
    {
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