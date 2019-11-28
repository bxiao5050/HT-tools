/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('oas5MinDataController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster','$params', function ($rootScope, $scope, $http, $timeout, $q, toaster,$params) {
    $scope.module_name="五分钟视图";
    $scope.questionTitle = "五分钟视图指标说明";
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;

    try {
        document.updateQuestionTip( 'oas_5min_question.html');
    }
    catch(e){
        setTimeout(function () {
            document.updateQuestionTip( 'oas_5min_question.html');
        },3000)
    }

    var curParams = null; // 当前选择的参数
    $scope.datePickerType = 2;
    $scope.datePickerDayDiff = 0;
    $scope.hideChannelList = false;
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
    function getFiveMinRegData(){
        $http({
            url: 'api/oas/5min-reg',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
           if(data.code ==0){
               drawChart(data, 'realTimeRegChart');
           }else{
               pop('error','error',data.msg);
           }
        }).error(function (data, header, config, status) {
            pop('error','链接异常',data);
        });
    }

    /**
     * 显示五分钟充值数据
     */
    function getFiveMinRechargeData(){
        $http({
            url: 'api/oas/5min-recharge',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if(data.code ==0){
                drawChart(data, 'realTimeRechargeChart');
            }else{
                pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error','链接异常',data);
        });
    }

    /**
     * 显示五分钟在线数据
     */
    function getFiveMinOnlineData(){
        $http({
            url: 'api/oas/5min-online',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if(data.code ==0){
                drawChart(data, 'realTimeOnlineChart');
            }else{
                pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error','链接异常',data);
        });
    }

    /**
     * 导出五分钟视图模块
     */
    function exportFiveMinModule(url)
    {

        $http({
            url: url, //'/api/oas/export/5min',
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
    function drawChart(data,chartID){
        var categories = [];
        var seriesData = [
            {
                name:curParams.date3,
                data:[]
            },
            {
                name:curParams.date2,
                data:[]
            },
            {
                name:curParams.date1,
                data:[]
            }
        ];
        var lineDate = new Date(moment().add(-10,'minutes').format('YYYY-MM-DD HH:mm:ss'));
        for(var i = 1; i < data.result.length; i++){
            var temp = data.result[i];

            categories.push(temp.count_date);
            var dataDate = new Date(curParams.date1 + ' ' +temp['count_date']);

            seriesData[0].data.push(Number(temp[curParams.date3]));
            seriesData[1].data.push(Number(temp[curParams.date2]));
            if(dataDate <lineDate){
                seriesData[2].data.push(Number(temp[curParams.date1]));
            }

        }
        drawHighChartFiveMinteLine(categories, seriesData, chartID);
    }
    /**
     * 监听查询事件
     */
    $scope.$on("oasQuery",function(event,params)
    {
        curParams = {
            date1:moment(params.curDate).format('YYYY-MM-DD'),
            date2:moment(params.curDate).add(-1, 'days').format('YYYY-MM-DD'),
            date3:moment(params.curDate).add(-7, 'days').format('YYYY-MM-DD'),
            game_id:params.game_id,
            agent_id:params.agent_id,
            regchannel:params.regchannel,
            paychannel:params.paychannel
        };
        $scope.query();
    });
    $scope.query=function(){
        refreshData();
    };
    $scope.export=function(type)
    {
        switch (type){
            case '1':exportFiveMinModule('/api/oas/export/5min-online');break;
            case '2':exportFiveMinModule('/api/oas/export/5min-pay');break;
            case '3':exportFiveMinModule('/api/oas/export/5min-reg');break;
        }
    };
    /**
     * 刷新数据
     */
    var refreshData = function(){
        if(curParams){
            getFiveMinRegData('/api/oas/export/5min-online');
            getFiveMinRechargeData('/api/oas/export/5min');
            getFiveMinOnlineData('/api/oas/export/5min');
        }else{
            pop('error','error','参数有误，刷新查询失败！')
        }

    };
    /**
     * 五分钟定时刷新数据
     */
    var interval = setInterval(function(){
        refreshData();
    },1000 * 60 *5);
    $scope.$on('$destroy', function(e) {
        window.clearInterval(interval);
    });

}]);