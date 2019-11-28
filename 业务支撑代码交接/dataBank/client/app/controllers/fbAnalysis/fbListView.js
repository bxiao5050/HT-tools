/**
 * Created by linlin.zhang on 2016/7/15.
 */
app.controller('fbListViewController', ['$rootScope', '$scope', '$http', '$timeout', '$q', '$params', function ($rootScope, $scope, $http, $timeout, $q, $params) {
    $scope.$on("fblistViewQuery", function (event, params) {
        $scope.query(params);
    });
    $scope.$on("fblistViewExport", function (event, params) {
        var param = {
            date1:params.date1,
            date2:params.date2,
            type:params.type,
            os:params.in_os.os
        };
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
        $http({
            url: '/api/fbReport/getListData',
            method: 'GET',
            params: param
        })
            .success(function (data, header, config, status) {
                if(data.code ==0){
                    window.open(data.result);
                }else{
                    pop('error','error',data.msg);
                }
        })
            .error(function (data, header, config, status) {
                //pop('error','链接异常',data);
            });
    });
    $scope.viewData = {
        currentPoint:1
    }
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
    var chartSource;
    $scope.switchPoint = function(index){
        $scope.viewData.currentPoint = index;
        renderCountryChart(chartSource);
    }
    function renderCountryChart(data){
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
                    type: 'line',
                    yAxis: 0,
                    data: [],
                    tooltip: {
                        valueSuffix: ''
                    }
                }
            ]
        };
        var temdata = data.slice(0,data.length-1).sort(function(a,b){
            var date1 = new Date(a.count_date),date2 = new Date(b.count_date);
           if(date1> date2)
               return 1;
           else
               return -1;
        });
        for(var i = 0;i<temdata.length;i++){
            if(temdata[i].count_date != 'total') {
                series.xAxis.categories.push(temdata[i].count_date);
                series.series[0].data.push(Number(temdata[i][point.column]));
            }
        }
        console.log(series);
        // drawHighChartDoubleLineCommon(series.xAxis.categories,series.series,'totalViewChart');
        $('#listViewChart').highcharts(series);

    }
    $scope.dataSource = [];
    function renderCountryTable(data){
        data = data.sort(function(a,b){
            if(a.count_date == 'total') return  1;
            if(b.count_date == 'total') return -1;
            var date1 = new Date(a.count_date),date2 = new Date(b.count_date);

            if(date1< date2)
                return 1;
            else
                return -1;
        });
        var result = [];
        var column = ['日期','系统','激活','注册','花费','展示','点击','点击率','激活率','注册率','CPI','CPA','CPM'];
        for(var i = 0;i<data.length;i++){
            //current.data.push(data[i].game_id);
            var item = [];
            item.push({index:1, value:data[i].count_date});
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
            result.push(item);
        }
        $scope.dataSource = {columns:column,data:result};
        console.log( $scope.dataSource);
    }
    $scope.query = function(params){
        var param = {
            date1:params.date1,
            date2:params.date2,
            type:params.type,
            os:params.in_os.os
        };
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
        $http({
            url: '/api/fbReport/getListData',
            method: 'GET',
            params: param
        }).success(function (data, header, config, status) {
            chartSource = data.result.slice(1);
            renderCountryChart(chartSource);
            renderCountryTable(chartSource);
        })
            .error(function (data, header, config, status) {
                //pop('error','链接异常',data);
            });
    }

}]);
