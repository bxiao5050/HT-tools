/**
 * Created by xiaoyi on 2015/7/24.
 */

'use strict';
app.controller('ChannelDetailController', function ($rootScope, $scope, $http, $timeout) {
    // 表格默认排序字段
    $scope.sortingOrder = 'installs';

    var app_id = 10009, os = '1,2', begin_date = '2015-07-20', end_date = '2015-07-24', media_source = 'All';
    // 获取总数据
    function getTotalData() {
        $http({
            url: 'api/channel/total',
            method: 'GET',
            params: {
                app_id: app_id,
                os: os,
                begin_date: begin_date,
                end_date: end_date,
                media_source: media_source
            }
        }).success(function (data, header, config, status) {
            if(data.code != 0){
                alert(data.msg);
                return;
            }
            $scope.installs = data.result[0].installs;
            $scope.regs = data.result[0].regs;
            $scope.roles = data.result[0].roles;
            $scope.costs = data.result[0].costs;
            $scope.recharge = data.result[0].recharge;
            $scope.newServerregs = data.result[0].newServerregs;

        }).error(function (data, header, config, status) {
        });
    }

    // 获取每天激活、注册、创角、花费
    function getTotalDataPerDay() {
        $http({
            url: 'api/channel/total/perday',
            method: 'GET',
            params: {
                app_id: app_id,
                os: os,
                begin_date: begin_date,
                end_date: end_date,
                media_source: media_source
            }
        }).success(function (data, header, config, status) {
            if(data.code != 0){
                alert(data.msg);
                return;
            }
            var result = data.result
            var categories = [];
            // 顺序决定图表层级
            var seriesData2 = [
                {name: '激活', data: [], type: 'column', yAxis: 0},
                { name: '注册',data: [],type: 'column', yAxis: 0},
                {name: '创角', type: 'column', data: [], yAxis: 0},
                {name: '花费', type: 'spline', data: [], yAxis: 0}
            ];
            if (media_source == 'All') {
                seriesData2.push({name: '新服创角数', data: [], type: 'column', yAxis: 0});
            }
            seriesData2.push({name: '激活成本', type: 'spline', data: [], yAxis: 1});
            seriesData2.push({name: '注册成本', type: 'spline', data: [], yAxis: 1});
            seriesData2.push({name: '创角成本', type: 'spline', data: [], yAxis: 1});
            if (media_source == 'All') {
                seriesData2.push({name: '新服创角成本', type: 'spline', data: [], yAxis: 1});
            }


            for (var i = 0; i < result.length; i++) {
                var temp = result[i];
                categories.push(temp.categories);
                //seriesData[0].data.push(temp.installs);
                //seriesData[1].data.push(temp.regs);
                //seriesData[2].data.push(temp.roles);
                //seriesData[3].data.push(temp.costs);
                seriesData2[0].data.push(temp.installs);
                seriesData2[1].data.push(temp.regs);
                seriesData2[2].data.push(temp.roles);
                seriesData2[3].data.push(temp.costs);
                if (media_source == 'All'){
                    seriesData2[4].data.push(temp.newServerregs);
                    seriesData2[5].data.push(temp.per_installs);
                    seriesData2[6].data.push(temp.per_regs);
                    seriesData2[7].data.push(temp.per_roles);
                    seriesData2[8].data.push(temp.per_newServerRoles);
                }else{
                    seriesData2[4].data.push(temp.per_installs);
                    seriesData2[5].data.push(temp.per_regs);
                    seriesData2[6].data.push(temp.per_roles);
                }
            }
            //drawHighChartDoubleLine(categories,seriesData,'chart1' );
            drawHighChartDoubleLine(categories, seriesData2, 'channelDetailChart2');
        }).error(function (data, header, config, status) {
        });
    }

    //获取明细投放数据（激活、注册、创角、成本、花费）
    function getDetailDataPerDay() {
        $http({
            url: 'api/channel/detail/perday',
            method: 'GET',
            params: {
                app_id: app_id,
                os: os,
                begin_date: begin_date,
                end_date: end_date,
                media_source: media_source
            }
        }).success(function (data, header, config, status) {
            if(data.code != 0){
                alert(data.msg);
                return;
            }
            var result = data.result
            var categoriesArr = [];
            var seriesData = [];
            var obj = {};
            for (var i = 0; i < result.length; i++) {
                var temp = result[i];
                categoriesArr.push(temp.categories);
                if (temp.media_source) {
                    if (!obj[temp.media_source]) {
                        obj[temp.media_source] = {
                            name: temp.media_source,
                            data: []
                        }
                    }
                    obj[temp.media_source].data.push(temp.installs);
                } else {
                    if (!obj[temp.campaign]) {
                        obj[temp.campaign] = {
                            name: temp.campaign,
                            data: []
                        }
                    }
                    obj[temp.campaign].data.push(temp.installs);
                }

            }
            categoriesArr = categoriesArr.unique();
            for (var key in obj) {
                seriesData.push(obj[key]);
            }
            if (media_source != 'All') {
                drawHighchartStatckColumn(categoriesArr, seriesData, 'channelDetailChart3', '每天各Campaign的激活数据(不含录入渠道数据)');
            } else {
                drawHighchartStatckColumn(categoriesArr, seriesData, 'channelDetailChart3', '每天各Media source的激活数据');
            }

        }).error(function (data, header, config, status) {
        });
    }

    // 获取表格数据
    function getTableData() {
        $http({
            url: 'api/channel/all',
            method: 'GET',
            params: {
                app_id: app_id,
                os: os,
                media_source: media_source,
                begin_date: begin_date,
                end_date: end_date
            }
        }).success(function (data, header, config, status) {
            if(data.code != 0){
                alert(data.msg);
                return;
            }

            // 处理平均值
            var firstColumn = data.result.aaData[0];
            $scope.avgInstalls =firstColumn.avg_installs;
            $scope.avgRegs = firstColumn.avg_regs;
            $scope.avgRoles = firstColumn.avg_roles;
            $scope.avgRateRegs = firstColumn.avg_rate_reg;
            $scope.avgRateRoles = firstColumn.avg_rate_roles;
            $scope.avgRateLiucun = firstColumn.avg_rate_liucun;

            // 自然量数据放到表格最后
            for(var i = 0; i < data.result.aaData.length; i++){
                var temp = data.result.aaData[i];
                if(temp.categories === 'Organic'){
                    $scope.Organic = temp;
                    data.result.aaData.splice(i,1);
                    $scope.tableData = data.result.aaData;
                    break;
                }
            }

        }).error(function (data, header, config, status) {
        });

    };
    function getRemarkData() {
        $http({
            url: 'api/channel/remark',
            method: 'GET',
            params: {
                app_id: app_id,
                os: os,
                begin_date: begin_date,
                end_date: end_date
            }
        }).success(function (data, header, config, status) {
            if (data.code != 0) {
                alert(data.msg);
                return;
            }else{
                var result = data.result;
                var dom = '';
                if(result.length <1){
                    $scope.remark = '备注：无';
                }else{
                    for(var i =0; i < result.length; i++){
                        var temp = result[i];
                        dom += temp.begin_date + ' ~ ' + temp.end_date  + ' 备注: ' + temp.remark  + ';';
                    }
                    $scope.remark = dom;
                }

            }

        });
    };

    // 表格排序
    $scope.sort_by = function(newSortingOrder) {
        if ($scope.sortingOrder == newSortingOrder){
            $scope.reverse = !$scope.reverse;
        }
        $scope.sortingOrder = newSortingOrder;
        // icon setup
        $('th i').each(function(){
            // icon reset
            $(this).removeClass().addClass('fa fa-unsorted');
        });
        if ($scope.reverse){
            $('th.'+newSortingOrder+' i').removeClass().addClass('fa fa-sort-up');
        }else{
            $('th.'+newSortingOrder+' i').removeClass().addClass('fa fa-sort-down');
        }
    };

    /**
     * 生成颜色值
     * @param theValue
     * @param avgValue
     * @param isBiggerOk  值是否越大越好
     */
    $scope.getColor = function(theValue, avgValue, isBiggerOk){
        if(!theValue){
            return "background:none";
        }
        if(isBiggerOk){
            if(theValue >= avgValue){
                return "background:rgba(160, 212, 104," + (Math.abs(theValue - avgValue) / avgValue) + ");";
            }else{
                return "background:rgba(255, 206, 85," + (Math.abs(theValue - avgValue) / avgValue) + ");";
            }
        }else{
            if(theValue >= avgValue){
                return "background:rgba(255, 206, 85," + (Math.abs(theValue - avgValue) / avgValue) + ");";
            }else{
                return "background:rgba(160, 212, 104," + (Math.abs(theValue - avgValue) / avgValue) + ");";
            }
        }


    }
    $scope.$on("adQuery", function (event, data) {
        app_id = data.app_id;
        os = data.os;
        begin_date = data.begin_date;
        end_date = data.end_date;
        media_source = data.media_source;
        getTotalData();
        getTotalDataPerDay();
        getDetailDataPerDay();
        getTableData();
        getRemarkData();
    })

});