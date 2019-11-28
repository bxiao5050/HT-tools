/**
 * Created by weiqiang.yu on 2016-06-15.
 */
/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('promotionDetailController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    var curParams=null;

    $scope.hideCountDate=true; //隐藏统计日期


    $scope.col = 'count_date';
    $scope.desc = 0;

    /**
     * 通过接口获取数据
     * @param url
     */
    function getData() {
        $http({
            url: 'api/7roadReport/getPopularize_list',
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
/*                $scope.totalData={
                    count_date:'',
                    installs:0,
                    regs:0,
                    roles:0,
                    logins:0,
                    costs:0,
                    charges:0,
                    reg_rate:0,
                    role_rate:0,
                    install_cpa:0,
                    reg_cpa:0,
                    role_cpa:0,
                    pay_count:0,
                    pay_costs:0,
                };
                var tem={count_date: '汇总',
                    installs: 0,
                    regs: 0,
                    roles: 0,
                    logins: 0,
                    costs: 0,
                    charges:0,
                    pay_count: 0};*/
                for(var i=0;i<data.result.length;i++)
                {
                    if(data.result[i]['count_date']!='汇总') {
                        var temDate;
                        temDate = new Date(data.result[i]["count_date"])
                        temDate = temDate.format("yyyy-MM-dd");
                        data.result[i]["count_date"] = temDate;
                    }
                    //for(var index in data.result[i]);
                    //{
                    //    if(index!="count_date"){
                    //        data.result[index]=Number(data.result[index]);
                    //    }
                    //}
               /*     tem={
                        count_date: '汇总',
                        installs: tem.installs+Number(data.result[i].installs),
                        regs: tem.regs+Number(data.result[i].regs),
                        roles: tem.roles+Number(data.result[i].roles),
                        logins: tem.logins+Number(data.result[i].logins),
                        costs: tem.costs+Number(data.result[i].costs),
                        charges: tem.charges+Number(data.result[i].charges),
                        pay_count: tem.pay_count+Number(data.result[i].pay_count)
                    };
*/
                    $scope.tableData.push({
                        count_date:data.result[i].count_date,
                        installs:Number(data.result[i].installs),
                        regs:Number(data.result[i].regs),
                        roles:Number(data.result[i].roles),
                        logins:Number(data.result[i].logins),
                        costs:Number(data.result[i].costs),
                        charges:Number(data.result[i].charges),
                        reg_rate:Number(data.result[i].reg_rate),
                        role_rate:Number(data.result[i].role_rate),
                        install_cpa:Number(data.result[i].install_cpa),
                        reg_cpa:Number(data.result[i].reg_cpa),
                        role_cpa:Number(data.result[i].role_cpa),
                        pay_count:Number(data.result[i].pay_count),
                        pay_costs:Number(data.result[i].pay_costs)
                    })
                }

              /*  $scope.totalData={
                    count_date: '汇总',
                    installs: tem.installs,
                    regs: tem.regs,
                    roles: tem.roles,
                    logins:tem.logins,
                    costs: tem.costs,
                    charges: tem.charges,
                    reg_rate:tem.installs!=0?Number((tem.regs/tem.installs*100).toFixed(2)):0,
                    role_rate: tem.regs!=0?Number((tem.roles/tem.regs*100).toFixed(2)):0,
                    install_cpa: tem.installs!=0?((tem.costs/tem.installs).toFixed(2)):0,
                    reg_cpa: tem.regs!=0?((tem.costs/tem.regs).toFixed(2)):0,
                    role_cpa: tem.roles!=0?((tem.costs/tem.roles).toFixed(2)):0,
                    pay_count: tem.pay_count,
                    pay_costs: tem.pay_count!=0?((tem.costs/tem.pay_count).toFixed(2)):0
                };*/


                drawChart1("chart1",data);
                drawChart2("chart2",data);

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
     * 日期格式化
     * @param fmt
     * @returns {*}
     */
    Date.prototype.format= function (fmt)
    {
        var o={
            "M+":this.getMonth()+1,
            "d+":this.getDate(),
            "h+":this.getHours(),
            "m+":this.getMinutes(),
            "s+":this.getSeconds(),
            "q+":Math.floor((this.getMonth()+3)/3),
            "S":this.getMilliseconds()
        }
        if(/(y+)/.test((fmt)))
        {
            fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
        }
        for(var k in o)
        {
            if(new RegExp("("+k+")").test(fmt))
            {
                fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]) :(("00"+o[k]).substr((""+o[k]).length)));
            }
        }
        return fmt;

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
            {name: "激活",data: [],yAxis:0,type:"column"},
            {name: "注册", data: [], yAxis:0,type:"column"},
            {name: "创角", data: [], yAxis:0,type:"column"},
            {name: "登录", data: [], yAxis:0,type:"column"},
            {name: "付费人数", data: [], yAxis:0,type:"column"},
            {name: "注册率", data: [], yAxis:1,type:"spline"},
            {name: "创角率", data: [], yAxis:1,type:"spline"}];
        for (var i = 0; i < data.result.length; i++) {
            var temp = data.result[i];
            if(temp['count_date']!='汇总')
            {
                categories.push(temp['count_date']);
                seriesData[0].data.push(Number(temp['installs']));
                seriesData[1].data.push(Number(temp['regs']));
                seriesData[2].data.push(Number(temp['roles']));
                seriesData[3].data.push(Number(temp['logins']));
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
            if(temp['count_date']!='汇总') {
                categories.push(temp['count_date']);
                seriesData[0].data.push(Number(temp['costs']));
                seriesData[1].data.push(Number(temp['charges']));
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
     * 监听查询事件
     */
    $scope.$on("7roadReportQuery",function(event,params)
    {
        curParams=params;
        $scope.query();
    });
    function exportData(){
        $http({
            url: 'api/7roadReport/export/getPopularize_list',
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
    $scope.export=function()
    {
        exportData();
    };
    function refreshData()
    {
        getData();
    }
}]);