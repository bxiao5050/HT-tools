/**
 * Created by weiqiang.yu on 2016/3/14.
 */
/**
 * Created by weiqiang.yu on 2016/3/1.
 */

'use strict';
app.controller('oasLoginRateController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name="登陆比";
    $scope.questionTitle = "登陆比指标说明";
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;

    try {
        document.updateQuestionTip('oas_loginRate_question.html');
    }
    catch(e){
        setTimeout(function () {
            document.updateQuestionTip('oas_loginRate_question.html');
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

    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };


    /**
     * 显示五分钟注册数据
     */
    function getData() {
        $http({
            url: '/api/oas/loginrate',
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
                drawChart(data, 'loginRateChart1');
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
            url: '/api/oas/export/loginrate',
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
            var categories = [];
            var seriesData = [
                {
                    name: "一阶段登录比",
                    data: []
                }
                ,
                {
                    name: "二阶段登录比",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[data.result.length-1-i];
                categories.push( data.result[data.result.length-1-i]['数据日期']);
                seriesData[0].data.push(Number(temp['一阶段登录比']));
                seriesData[1].data.push(Number(temp['二阶段登录比']));
            }

        drawHighChartLine(categories, seriesData, chartID);
    }

    /**
     * 监听查询事件
     */
    $scope.$on("oasQuery", function (event, params) {
        curParams={
            date1:moment(params.date1).format("YYYY-MM-DD"),
            date2:moment(params.date2).format("YYYY-MM-DD"),
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