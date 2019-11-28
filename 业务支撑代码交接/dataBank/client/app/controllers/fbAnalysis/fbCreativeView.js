/**
 * Created by linlin.zhang on 2016/7/15.
 */
app.controller('fbCreativeViewController', ['$rootScope', '$scope', '$http', '$timeout', '$q', '$params', function ($rootScope, $scope, $http, $timeout, $q, $params) {
    $scope.$on("fbcreativeViewQuery", function (event, params) {
        $scope.query(params);
    });
    $scope.$on("fbcreativeViewExport", function (event, params) {
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
            url: '/api/fbReport/getCreativeData',
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
    };
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
    var chartSource;
    $scope.switchPoint = function(index){
        $scope.viewData.currentPoint = index;
        renderCreativeChart(chartSource);
    }
    function renderCreativeTable(data){

        var result = [],total;
        var column = ['素材','系统','激活','注册','花费','展示','点击','点击率','激活率','注册率','CPI','CPA','CPM'];
        for(var i = 1;i<data.length;i++){
            //current.data.push(data[i].game_id);
                var item = [];
                item.push({index: 0, value: data[i].creative_name});
				var addr = encodeURIComponent(data[i].image_url.substring(data[i].image_url.lastIndexOf("url")+4));
				var clientId = addr.substring(addr.lastIndexOf("image_hash")+11);
                var url = "http://119.28.63.37:4603/resource/image?clientId="+clientId+"&url=" +  addr;
            if(data[i].creative_name != 'total')
                item.push({index: 1, value: url});
                item.push({index: 2, value: data[i].os});
                item.push({index: 3, value: data[i].installs});
                item.push({index: 4, value: data[i].regs});
                item.push({index: 5, value: data[i].spend});
                item.push({index: 6, value: data[i].impressions});
                item.push({index: 8, value: data[i].clicks});
                item.push({index: 9, value: data[i].click_rate+'%'});
                item.push({index: 10, value: data[i].install_rate+'%'});
                item.push({index: 11, value: data[i].reg_rate+'%'});
                item.push({index: 12, value: data[i].cpi});
                item.push({index: 13, value: data[i].cpa});
                item.push({index: 15, value: data[i].cpm});
            if(data[i].creative_name == 'total')
            total = item;
            else
                result.push(item);
        }
        $scope.dataSource = {columns:column,data:result,total:total};
        console.log( $scope.dataSource);
    }
    function renderCreativeChart(data){
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
                }]
        };
        for(var i = 1;i<data.length;i++){
            if(data[i].creative_name != 'total') {
                series.xAxis.categories.push(data[i].creative_name);
                series.series[0].data.push(Number(data[i][point.column]));

            }
        }
        // drawHighChartDoubleLineCommon(series.xAxis.categories,series.series,'totalViewChart');
        $('#creativeViewChart').highcharts(series);

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
            url: '/api/fbReport/getCreativeData',
            method: 'GET',
            params: param
        }).success(function (data, header, config, status) {
            chartSource = data.result;
            renderCreativeTable(data.result);
            renderCreativeChart(data.result);
        })
            .error(function (data, header, config, status) {
                //pop('error','链接异常',data);
            });
    }
}]);