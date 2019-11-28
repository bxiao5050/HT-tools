/**
 * Created by linlin.zhang on 2016/7/15.
 */
app.controller('fbTotalViewController', ['$rootScope', '$scope', '$http', '$timeout', '$q', '$params', function ($rootScope, $scope, $http, $timeout, $q, $params) {
    $scope.$on("fbTotalViewQuery", function (event, params) {
        $scope.query(params);
    });
    $scope.$on("fbTotalViewExport", function (event, params) {
        var param = {
            date1:params.date1,
            date2:params.date2,
            os:params.in_os.os,
            type:params.type,
            syscompare:params.systemCompare
        };
        $scope.viewData.isCompare = params.systemCompare;
        switch (params.queryModel) {
            case 'countryModel':
                var game_ids = "";
                for(var i = 0;i<params.country.games.length;i++){
                    game_ids+=params.country.games[i].game_id+',';
                }
                param.game_ids = game_ids.substr(0,game_ids.length-1);
                break;
            case 'gameModel':
                param.game_ids =  params.game.id;
                break;
        }
        $scope.viewData.country = params.country;
        if(param.syscompare) {
            $http({
                url: '/api/fbReport/getTotalCompare',
                method: 'GET',
                params: param
            }).success(function (data, header, config, status) {
                if(data.code ==0){
                    window.open(data.result);
                }else{
                    pop('error','error',data.msg);
                }
            }).error(function (data, header, config, status) {
                //pop('error','链接异常',data);
            });
        }
        else{
            $http({
                url: '/api/fbReport/getTotalData',
                method: 'GET',
                params: param
            }).success(function (data, header, config, status) {
                if(data.code ==0){
                    window.open(data.result);
                }else{
                    pop('error','error',data.msg);
                }
            }).error(function (data, header, config, status) {
                //pop('error','链接异常',data);
            });
        }
    });
    $scope.viewData = {
        isCompare:false,
        currentPoint:1,
        viewModel:'',
        country:{
        }
    };
    Array.prototype.myFind = function(isSel){
        var result = [];
        for(var i = 0;i<this.length;i++)
        if(isSel(this[i])) result.push(this[i]);
        return result;
    }
    $scope.query = function (params) {
        var param = {
            date1:params.date1,
            date2:params.date2,
            os:params.in_os.os,
            type:params.type,
            syscompare:params.systemCompare,
            areacompare:params.areaCompare
        };
        $scope.viewData.viewModel = "totalViewModel";
        if(params.systemCompare)  $scope.viewData.viewModel = 'systemCompareModel';
        if(params.areaCompare) $scope.viewData.viewModel = 'areaCompareModel';
        switch (params.queryModel) {
            case 'countryModel':
                var game_ids = "";
                for(var i = 0;i<params.country.games.length;i++){
                    game_ids+=params.country.games[i].game_id+',';
                }
                param.game_ids = game_ids.substr(0,game_ids.length-1);
                break;
            case 'gameModel':
                param.game_ids =  params.game.id;
                break;
        }
        $scope.viewData.country = params.country;
        if(param.syscompare) {
            $http({
                url: '/api/fbReport/getTotalCompare',
                method: 'GET',
                params: param
            }).success(function (data, header, config, status) {
                $scope.viewData.isCompare = params.systemCompare;
                $scope.viewData.currentPoint = 1;
                if(params.country.id == 999)
                 renderGameCompareChart(data.result.myFind(function(ele){
                     if(ele.table_name == 't1')
                         return true;
                     else
                         return false;
                 }),'area_name');
                else  renderGameCompareChart(data.result.myFind(function(ele){
                    if(ele.table_name == 't2')
                        return true;
                    else
                        return false;
                }),'game_name');
                renderGameCompareTable(data.result.myFind(function(ele){
                    if(ele.table_name == 't1')
                        return true;
                    else return false;
                }));
                console.log(data);
            }).error(function (data, header, config, status) {
                //pop('error','链接异常',data)
                });
        }
        else if(param.areacompare){
            $scope.viewData.isCompare = params.areaCompare;
            var areaString = "";
                for(var i = 0;i<params.area.length;i++){
                    areaString+=params.area[i].country_code+',';
                }
            param.area_code = areaString.substr(0,areaString.length-1);
            $http({
                url: '/api/fbReport/getAreacompare',
                method: 'GET',
                params: param
            })
                .success(function (data, header, config, status) {
                    renderAreaChart(data.result);
                    renderAreaTable(data.result);
        }).error(function (data, header, config, status) {
                        //pop('error','链接异常',data);
                    });
        }
        else{
            $http({
                url: '/api/fbReport/getTotalData',
                method: 'GET',
                params: param
            }).success(function (data, header, config, status) {
                $scope.viewData.isCompare = false;
                if (param.syscompare) {
                    renderGameCompareChart(data.result);
                    renderGameCompareTable(data.result);
                } else {
                    if (data.result.length == 2)
                        renderOneGameChart(data.result);
                    else
                        renderCountryChart(data.result);
                    renderCountryTable(data.result);
                }
                console.log(data);
            }).error(function (data, header, config, status) {
                //pop('error','链接异常',data);
            });
        }

    }
    function renderAreaChart(data){
        chartData = data;
        var point = getPointName();
        var series = {
            xAxis:{
                categories:[]
            },
            title: {
                text: ''
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top'
            },
            yAxis: [{ // Primary yAxis
                title: {
                    text: null
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: '#595959'
                    }
                }, min:0
            }], tooltip: {
                shared: true
            },
            series:[
                {
                    name: point.name,
                    color: '#5B9BD5',
                    type: 'column',
                    yAxis: 0,
                    data: [],
                    tooltip: {
                        valueSuffix: ''
                    }
                }
            ]
        };
        for(var i = 1;i<data.length;i++){
            if(data[i].country_name!='total') {
                series.xAxis.categories.push(data[i].country_name);
                series.series[0].data.push(Number(data[i][point.column]));
            }
        }
        // drawHighChartDoubleLineCommon(series.xAxis.categories,series.series,'totalViewChart');
        $('#totalViewChart').highcharts(series);

    }
    function renderCountryChart(data){
        chartData = data;
        var point = getPointName();
        var series = {
            xAxis:{
                categories:[]
            },
            title: {
                text: ''
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top'
            },
            yAxis: [{ // Primary yAxis
                title: {
                    text: null
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: '#595959'
                    }
                }, min:0
            }], tooltip: {
                shared: true
            },
            series:[
                {
                    name: point.name,
                    color: '#5B9BD5',
                    type: 'column',
                    yAxis: 0,
                    data: [],
                    tooltip: {
                        valueSuffix: ''
                    }
                }
            ]
        };
        for(var i = 1;i<data.length;i++){
            if(data[i].game_name!='total') {
                series.xAxis.categories.push(data[i].game_name);
                series.series[0].data.push(Number(data[i][point.column]));
            }
        }
       // drawHighChartDoubleLineCommon(series.xAxis.categories,series.series,'totalViewChart');
        $('#totalViewChart').highcharts(series);

    }
    $scope.dataSource = [];
    function getPointName(){
        var item = {name:'花费',column:'spend'};
        switch( $scope.viewData.currentPoint)
        {
            case 1:item.name = '花费'; item.column = 'spend';break;
            case 2:item.name = 'CPI'; item.column = 'cpi';break;
            case 3:item.name = 'CPA';item.column = 'cpa';break;
            case 4:item.name = '激活率';item.column = 'install_rate';break;
            case 5:item.name = '点击率';item.column = 'click_rate';break;
            case 6:item.name = '注册率';item.column = 'reg_rate';break;
        }
        return item;
    }
    function renderAreaTable(data){

        var result = [];
        var column = ['地区','系统','激活','注册','花费','展示','点击','点击率','激活率','注册率','CPI','CPA','CPM'];
        for(var i = 1;i<data.length;i++){
            var current = null;
            for(var j = 0;j<result.length;j++){
                if(result[j].game_name == data[i].game_name) {
                    current = result[j];
                    break;
                }
            }
            if(current == null) {
                current = {
                    game_name:data[i].game_name,
                    columns:column,
                    data:[],
                    total:[]
                };
                result.push(current);
            }
            var item = [];
            //current.data.push(data[i].game_id);
            item.push({index:1, value:data[i].country_name});
            item.push({index:2, value:data[i].os});
            item.push({index:3, value:data[i].installs});
            item.push({index:4, value:data[i].regs});
            item.push({index:5, value:data[i].spend});
            item.push({index:6, value:data[i].impressions});
            item.push({index:8, value:data[i].clicks});
            item.push({index:9, value:data[i].click_rate+'%'});
            item.push({index:10, value:data[i].install_rate+'%'});
            item.push({index:11, value:data[i].reg_rate+'%'});
            item.push({index:12, value:data[i].cpi});
            item.push({index:13, value:data[i].cpa});
            item.push({index:15, value:data[i].cpm});
            current.data.push(item);
        }
        $scope.dataSource = result;
    }
    function renderCountryTable(data){

        var result = [];
        var column = ['游戏','系统','激活','注册','花费','展示','点击','点击率','激活率','注册率','CPI','CPA','CPM'];
        for(var i = 1;i<data.length;i++){
            var current = null;
            for(var j = 0;j<result.length;j++){
                if(result[j].country_name == data[i].area_name) {
                    current = result[j];
                    break;
                }
            }
            if(current == null) {
                current = {
                    country_name:data[i].area_name,
                    columns:column,
                    data:[],
                    total:[]
                };
                result.push(current);
            }
            var item = [];
            //current.data.push(data[i].game_id);
            item.push({index:1, value:data[i].game_name});
            item.push({index:2, value:data[i].os});
            item.push({index:3, value:data[i].installs});
            item.push({index:4, value:data[i].regs});
            item.push({index:5, value:data[i].spend});
            item.push({index:6, value:data[i].impressions});
            item.push({index:8, value:data[i].clicks});
            item.push({index:9, value:data[i].click_rate+'%'});
            item.push({index:10, value:data[i].install_rate+'%'});
            item.push({index:11, value:data[i].reg_rate+'%'});
            item.push({index:12, value:data[i].cpi});
            item.push({index:13, value:data[i].cpa});
            item.push({index:15, value:data[i].cpm});
            current.data.push(item);
        }
        console.log(result);
        $scope.dataSource = result;
    }
    function renderOneGameChart(data){
        chartData = data;
        var point = getPointName();
        var series = {
            xAxis:{
                categories:[point.name]
            },
            title: {
                text: ''
            },
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: '#89A54E'
                    }
                }, min:0,opposite: true}
            ], tooltip: {
                shared: true
            },legend:{enabled:false},
            series:[
                {
                    name:'数量',
                    color: '#5B9BD5',
                    type: 'column',
                    yAxis: 0,
                    data: [],
                    tooltip: {
                        valueSuffix: ''
                    }
                }
            ]
        };
        for(var i = 1;i<data.length;i++){
            series.series[0].data.push(Number(data[i][point.column]));
        }
        console.log(series);
        $('#totalViewChart').highcharts(series);
    }
    var chartData = null;
    $scope.switchPoint = function(index){
        $scope.viewData.currentPoint = index;

        if($scope.viewData.isCompare && $scope.viewData.viewModel == 'systemCompareModel') {
            if ($scope.viewData.country.id == 999)
                renderGameCompareChart(chartData, 'area_name');
            else  renderGameCompareChart(chartData, 'game_name');
            renderGameCompareTable(chartData);
        }
        if($scope.viewData.isCompare && $scope.viewData.viewModel == 'areaCompareModel'){
            renderAreaChart(chartData)
        }
        else{
            if ($scope.viewData.isCompare) {
                renderGameCompareChart(chartData);
                renderGameCompareTable(chartData);
            } else {
                if (chartData.length == 2)
                    renderOneGameChart(chartData);
                else
                    renderCountryChart(chartData);
                renderCountryTable(chartData);
            }
        }
       //var pointName,clumnName,unit;
       // $scope.viewData.currentPoint = index;
       // switch ($scope.viewData.currentPoint)
       // {
       //     case 1:
       //         pointName =  '花费';clumnName = 'spend';unit = '{value}$'
       //         break;
       //     case 2:
       //         pointName =  'CPI';clumnName = 'cpi';unit = '{value}$'
       //         break;
       //     case 3:
       //         pointName =  'CPA';clumnName = 'cpa';unit = '{value}$'
       //         break;
       //     case 4:
       //         pointName =  '激活率';clumnName = 'install_rate';unit = '{value}%'
       //         break;
       //     case 5:
       //         pointName =  '点击率';clumnName = 'click_rate';unit = '{value}%'
       //         break;
       //     case 6:
       //         pointName =  '注册率';clumnName = 'reg_rate';unit = '{value}%'
       //     break;
       // }
       // var serries = [
       //     {
       //         name: 'android',
       //         data: [],
       //         color:'#91C3D5',
       //         stack: pointName
       //     }, {
       //         name: 'ios',
       //         data: [],
       //         color:'#4198AF',
       //         stack: pointName
       //     }];
       // for(var i = 0;i<chartData.length;i++){
       //     if(chartData[i].os == 'android') {
       //         serries[0].data.push(Number(chartData[i][clumnName]));
       //     } else if(chartData[i].os == 'ios'){
       //         serries[1].data.push(Number(chartData[i][clumnName]));
       //     }
       // }
       // chartOption.yAxis[0].labels.format = unit;
       // chartOption.series = serries;
       // $('#totalViewChart').highcharts(chartOption);

    }
    function renderGameCompareChart(data,xAxisName){
        chartData = data;
        var point = getPointName();
        var series = {
            chart: {
                type: 'column'
            },
            xAxis:{
                categories:[]
            },
            title: {
                text: ''
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.x +'</b><br/>'+
                        this.series.name +': '+ this.y +'<br/>'+
                        'Total: '+ this.point.stackTotal;
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top'
            },
            yAxis: [{ // Primary yAxis
                title: {
                    text: null
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: '#89A54E'
                    }
                }, min:0,opposite: true}
            ], tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series:[
                {
                    name: 'ios',
                    data: [],
                    color:'#91C3D5',
                    stack: point.name
                }, {
                    name: 'android',
                    color:'#4198AF',
                    data: [],
                    stack: point.name
                }
,            ]
        };
        var categories = [];
        for(var i = 0;i<data.length;i++){
            var hasCate = false;
            for(var j = 0;j<data.length;j++){
                if(categories[j] == data[i][xAxisName])
                    hasCate = true;
            }
            if(!hasCate)
            categories.push(data[i][xAxisName]);
        }
        series.xAxis.categories = categories;
        for(var i = 0;i<data.length;i++){
            if(data[i].os == 'android') {
                series.series[1].data.push(Number(data[i][point.column]));
            } else if(data[i].os == 'ios'){
                series.series[0].data.push(Number(data[i][point.column]));
            }
        }
        $('#totalViewChart').highcharts(series);
    }
    function renderGameCompareTable(data){
        var result = [];
        var column = ['系统','激活','注册','花费','展示','点击','点击率','激活率','注册率','CPI','CPA','CPM'];
        for(var i = 0;i<data.length;i++){
            var current = null;
            for(var j = 0;j<result.length;j++){
                if(result[j].country_name == data[i].area_name) {
                    current = result[j];
                    break;
                }
            }
            if(current == null) {
                current = {
                    country_name:data[i].area_name,
                    //country_id:data[i].area_id,
                    columns:column,
                    data:[],
                    total:[]
                };
                current.total.push({index:1, value:'总计'});
                for(var z = 1;z<column.length;z++)
                    current.total.push({index:z, value:0});
                result.push(current);
            }
            var item = [];
            //current.data.push(data[i].game_id);
            item.push({index:1, value:data[i].os});
            item.push({index:2, value:data[i].installs});
            item.push({index:3, value:data[i].regs});
            item.push({index:4, value:data[i].spend});
            item.push({index:5, value:data[i].impressions});
            item.push({index:7, value:data[i].clicks});
            item.push({index:8, value:data[i].click_rate+'%'});
            item.push({index:9, value:data[i].install_rate+'%'});
            item.push({index:10, value:data[i].reg_rate+'%'});
            item.push({index:11, value:data[i].cpi});
            item.push({index:12, value:data[i].cpa});
            item.push({index:14, value:data[i].cpm});
            for(var z = 1;z<column.length;z++)
                current.total[z].value += Number(item[z].value);
            current.data.push(item);
        }
        console.log(result);
        $scope.dataSource = result;
    }

}]);