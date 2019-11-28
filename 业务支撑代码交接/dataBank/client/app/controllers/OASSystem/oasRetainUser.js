/**
 * Created by weiqiang.yu on 2016/3/4.
 */
/**
 * Created by weiqiang.yu on 2016/3/3.
 */
/**
 * Created by weiqiang.yu on 2016/3/1.
 */

'use strict';
app.controller('oasRetainUserController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.module_name="留存用户";
    $scope.questionTitle="留存用户指标说明";
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;

    try {
        document.updateQuestionTip('oas_retainUser_question.html');
    }
    catch(e){
        setTimeout(function () {
            document.updateQuestionTip('oas_retainUser_question.html');
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
    $scope.radioModel = 'regRetain';
    // 监听 ACU PCU ACP/PCU AT 切换事件
    $scope.$watch('radioModel', function (newValue, oldValue) {
        if (newValue && curParams) {
            $scope.query();
        }
    });

    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };


    /**
     * 显示五分钟注册数据
     */
    function getData() {
        $http({
            url: 'api/oas/retainUser',
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
                drawChart(data, 'retainUserChart1');
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
            url: 'api/oas/export/retainUser',
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
                name: "次日留存率",
                data: []
            },
            {
                name: "7日留存率",
                data: []
            },
            {
                name: "30日留存率",
                data: []
            }
        ];
        for (var i = 0; i < data.result.length; i++) {
            var temp = data.result[data.result.length-1-i];
            //if(temp.reg_date == curParams.date1 ){
            categories.push( data.result[data.result.length-1-i].reg_date);
            seriesData[0].data.push(Number(temp['+1日留存率'].split('%')[0]));
            seriesData[1].data.push(Number(temp['+7日留存率'].split('%')[0]));
            seriesData[2].data.push(Number(temp['+30日留存率'].split('%')[0]));
        }
        drawHighChartArea(categories, seriesData, chartID);
    }

    /**
     * 监听查询事件
     */
    $scope.$on("oasQuery", function (event, params) {
        curParams={
            date1:moment(params.date1).format('YYYY-MM-DD'),
            date2:moment(params.date2).format('YYYY-MM-DD'),
            agent_id:params.agent_id,
            game_id:params.game_id,
            regchannel:params.regchannel,
            paychannel:params.paychannel
        };
        $scope.query();
    });
    $scope.query = function () {
        curParams.select_id= getSelect();
        refreshData();
    };
    $scope.export=function()
    {
        curParams.select_id= getSelect();
        exportData();
    };
    // 切换单时间 和 时间范围控件显示
    $scope.$watch('datePickerType', function (newValue, oldValue) {
        if(newValue == 2) {
            $scope.singleDatePicker = true;
        } else {
            $scope.singleDatePicker = false;
        }
    });

    // 初始化多时间选择控件
    var initRangeDate = true;
    $scope.$watch('initData.rangeDate', function (newValue, oldValue) {
        if (newValue && !initRangeDate) {
            //$scope.$emit("oasQuery", obj);
            $scope.query();
        } else {
            initRangeDate = false;
        }
    });
    function getSelect()
    {
        switch ($scope.radioModel)
        {
            case 'regRetain':return 1;
            case 'newRegRetain':return 2;
            case 'newDriverRetain':return 3;
        }
    }
    /**
     * 刷新数据
     */
    var refreshData = function () {
        if (curParams) {
            getData();
            //}
        } else {
            pop('error', 'error', '参数有误，刷新查询失败！')
        }
    }


}]);