/**
 * Created by weiqiang.yu on 2016/3/1.
 */

'use strict';
app.controller('oasNewUserController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name="新增用户";
    $scope.questionTitle = "新增用户指标说明";
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;

    try {
        document.updateQuestionTip('oas_newUser_question.html');
    }
    catch(e){
        setTimeout(function () {
            document.updateQuestionTip('oas_newUser_question.html');
        },3000)
    }

    var curParams = null; // 当前选择的参数

    //$scope.datePickerType = 2;
    $scope.datePickerDayDiff = -2;

    // 新增用户和设备  新增活跃比 选择
    $scope.radioModel = 'newUserDevice';
    // 监听 新增用户和设备  新增活跃比 切换事件
    $scope.$watch('radioModel', function (newValue, oldValue) {
        if (newValue && curParams) {
            $scope.query();
        }
    });

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };

    /**
     * 显示五分钟注册数据
     */
    function getData() {
        $http({
            url: 'api/oas/newUser',
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
                drawChart(data, 'newUserChart1');
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
     * 导出excel文件
     */
    function exportData() {
        $http({
            url: 'api/oas/export/newUser',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if(data.code ==0){
                window.open(data.result);
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
        if ($scope.radioModel === 'newUserDevice') {
            var categories = [];
            var seriesData = [
                {
                    name: "注册用户",
                    data: []
                }
                ,
                {
                    name: "全新注册用户",
                    data: []
                }
                ,
                {
                    name: "新增设备(去重)",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp.count_date);
                seriesData[0].data.push(Number(temp['注册用户']));
                seriesData[1].data.push(Number(temp['全新注册用户']));
                seriesData[2].data.push(Number(temp['新增设备（去重）']));
            }
        }
        else if($scope.radioModel === 'newActiveRate'){
            var categories = [];
            var seriesData = [
                {
                    name: "新增活跃比",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp.count_date);
                seriesData[0].data.push(Number(temp.新增活跃比));
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
            date2:moment(params.date2).format('YYYY-MM-DD'),     // 时间范围选择 endDate
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