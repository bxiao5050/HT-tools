/**
 * Created by weiqiang.yu on 2016-06-15.
 */
/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('promotionTotalController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    var curParams=null;
    $scope.col = 'channel_name';
    $scope.desc = 0;

    /**
     * 通过接口获取数据
     * @param url
     */
    function getData() {
        $http({
            url: 'api/7roadReport/getPopularize_total',
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

                data.result.shift();//特殊：第一个为无效数据 { "fn_oas_fivepower_day": null},
                $scope.tableData=[];
                /*$scope.totalData={
                    channel_name:'',
                    installs:0,
                    regs:0,
                    roles:0,
                    login:0,
                    costs:0,
                    money:0,
                    reg_rate:0,
                    role_rate:0,
                    install_cpa:0,
                    reg_cpa:0,
                    role_cpa:0,
                    roi_total:0,
                    roi_7:0,
                    roi_15:0,
                    roi_30:0,
                    roi_60:0,
                    roi_90:0,
                    pay_count:0,
                    pay_costs:0
                };
                var tem={
                    channel_name:'',
                    installs:0,
                    regs:0,
                    roles:0,
                    login:0,
                    costs:0,
                    money:0,
                    pay_count:0
                };*/

                for(var i=0;i<data.result.length;i++)
                {
                   /* tem={
                        count_date: '汇总',
                        installs: tem.installs+Number(data.result[i].installs),
                        regs: tem.regs+Number(data.result[i].regs),
                        roles: tem.roles+Number(data.result[i].roles),
                        login: tem.logins+Number(data.result[i].logins),
                        costs: tem.costs+Number(data.result[i].costs),
                        money: tem.charges+Number(data.result[i].money),
                        pay_count: tem.pay_count+Number(data.result[i].pay_count)
                    };*/
                    $scope.tableData.push({
                        channel_name:data.result[i].channel_name,
                        installs:Number(data.result[i].installs),
                        regs:Number(data.result[i].regs),
                        roles:Number(data.result[i].roles),
                        login:Number(data.result[i].login),
                        costs:Number(data.result[i].costs),
                        money:Number(data.result[i].money),
                        reg_rate:Number(data.result[i].reg_rate),
                        role_rate:Number(data.result[i].role_rate),
                        install_cpa:Number(data.result[i].install_cpa),
                        reg_cpa:Number(data.result[i].reg_cpa),
                        role_cpa:Number(data.result[i].role_cpa),
                        roi_total:Number(data.result[i].roi_total),
                        roi_7:Number(data.result[i].roi_7),
                        roi_15:Number(data.result[i].roi_15),
                        roi_30:Number(data.result[i].roi_30),
                        roi_60:Number(data.result[i].roi_60),
                        roi_90:Number(data.result[i].roi_90),
                        pay_count:Number(data.result[i].pay_count),
                        pay_costs:Number(data.result[i].pay_costs)
                    })
                }
              /*  $scope.totalData={
                    channel_name:'汇总',
                    installs:tem.installs,
                    regs:tem.regs,
                    roles:tem.roles,
                    login:tem.login,
                    costs:tem.costs,
                    money:tem.money,
                    reg_rate:tem.installs!=0?Number((tem.regs/tem.installs*100).toFixed(2)):0,
                    role_rate:tem.regs!=0?Number((tem.roles/tem.regs*100).toFixed(2)):0,
                    install_cpa:tem.installs!=0?Number((tem.costs/tem.installs).toFixed(2)):0,
                    reg_cpa:tem.regs!=0?Number((tem.costs/tem.regs).toFixed(2)):0,
                    role_cpa:tem.roles!=0?Number((tem.costs/tem.roles).toFixed(2)):0,
                    roi_total:tem.costs!=0?Number((tem.money/tem.costs).toFixed(2)):0,
                    roi_7:$scope.totalData.roi_7+Number(data.result[i].roi_7),
                    roi_15:$scope.totalData.roi_15+Number(data.result[i].roi_15),
                    roi_30:$scope.totalData.roi_30+Number(data.result[i].roi_30),
                    roi_60:$scope.totalData.roi_60+Number(data.result[i].roi_60),
                    roi_90:$scope.totalData.roi_90+Number(data.result[i].roi_90),
                    pay_count:tem.pay_count,
                    pay_costs:tem.pay_count!=0?Number((tem.costs/tem.pay_count).toFixed(2)):0
                };*/

                drawChart1("chart1",data);
                drawChart2("chart2",data);
                drawChart3("chart3",data);

                //$scope.tableData=data.result;

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
     * 画图表1
     * @param chartID
     * @param data
     */
    function drawChart1(chartID,data)
    {
        var categories = [];
        var seriesData = [
            {name: "激活",data: [],yAxis:0,type:'column'},
            {name: "注册", data: [], yAxis:0,type:'column'},
            {name: "创角", data: [], yAxis:0,type:'column'},
            {name: "登录", data: [], yAxis:0,type:'column'},
            {name: "付费人数", data: [], yAxis:0,type:'column'},
            {name: "注册率", data: [], yAxis:1,type:'spline'},
            {name: "创角率", data: [], yAxis:1,type:'spline'}];
        for (var i = 0; i < data.result.length; i++) {
            var temp = data.result[i];
            if (temp['channel_name'] != "汇总") {
                categories.push(temp['channel_name']);
                seriesData[0].data.push(Number(temp['installs']));
                seriesData[1].data.push(Number(temp['regs']));
                seriesData[2].data.push(Number(temp['roles']));
                seriesData[3].data.push(Number(temp['login']));
                seriesData[4].data.push(Number(temp['costs']));
                seriesData[5].data.push(Number(temp['reg_rate']));
                seriesData[6].data.push(Number(temp['role_rate']));
            }
        }

        drawHighChartDoubleLineCommon(categories, seriesData, chartID);
        var chart=$('#'+chartID).highcharts();
        for(var i = 0;i<chart.series.length;i++){
            if(chart.series[i].name!='激活')
            {
                chart.series[i].hide();
            }
        }
    }
    /**
     * 画图表2
     * @param chartID
     * @param data
     */
    function drawChart2(chartID,data)
    {
        var categories = [];
        var seriesData = [
            {name: "消耗",data: [],type:'column'},
            {name: "充值", data: [],type:'column'},
            {name: "激活cpa", data: [],type:'column'},
            {name: "注册cpa", data: [],type:'column'},
            {name: "创角cpa", data: [],type:'column'}];
        for (var i = 0; i < data.result.length; i++) {
            var temp = data.result[i];
            if (temp['channel_name'] != "汇总") {
                categories.push(temp['channel_name']);
                seriesData[0].data.push(Number(temp['costs']));
                seriesData[1].data.push(Number(temp['money']));
                seriesData[2].data.push(Number(temp['install_cpa']));
                seriesData[3].data.push(Number(temp['reg_cpa']));
                seriesData[4].data.push(Number(temp['role_cpa']));
            }
        }

        drawHighChartLine(categories, seriesData, chartID);
        var chart=$('#'+chartID).highcharts();
        for(var i = 0;i<chart.series.length;i++){
            if(chart.series[i].name!='充值')
            {
                chart.series[i].hide();
            }
        }
    }
    /**
     * 画图表3
     * @param chartID
     * @param data
     */
    function drawChart3(chartID,data)
    {
        var categories = [];
        var seriesData = [
            {name: "累计roi",data: [],type:"column"},
            {name: "7日roi", data: [],type:"column"},
            {name: "15日roi", data: [],type:"column"},
            {name: "30日roi", data: [],type:"column"},
            {name: "60日roi", data: [],type:"column"},
            {name: "90日roi", data: [],type:"column"}];
        for (var i = 0; i < data.result.length; i++) {
            var temp = data.result[i];
            if (temp['channel_name'] != "汇总") {
                categories.push(temp['channel_name']);
                seriesData[0].data.push(Number(temp['roi_total']));
                seriesData[1].data.push(Number(temp['roi_7']));
                seriesData[2].data.push(Number(temp['roi_15']));
                seriesData[3].data.push(Number(temp['roi_30']));
                seriesData[4].data.push(Number(temp['roi_60']));
                seriesData[5].data.push(Number(temp['roi_90']));
            }
        }

        drawHighChartLine(categories, seriesData, chartID);
    }
    /**
     * 监听查询事件
     */
    $scope.$on("7roadReportQuery",function(event,params)
    {
        curParams=params;
        $scope.query();
    });
    function exportData(){
        $http({
            url: 'api/7roadReport/export/getPopularize_total',
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

    $scope.query= function () {
        refreshData();
    };

    $scope.export= function () {
        exportData();
    };

    function refreshData()
    {
        getData();
    }
}]);