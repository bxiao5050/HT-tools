/**
 * Created by xiaoyi on 2015/7/24.
 */

'use strict';
app.controller('ChannelDetailController', function ($rootScope, $scope, $http, $timeout) {

    var app_id = 10009,os = '1,2', begin_date = '2015-07-20', end_date = '2015-07-24',media_source = '_all';
    function getTotalData(){
        $http({
            url:'api/channel/total',
            method:'GET',
            params:{
                app_id:app_id,
                os :os,
                begin_date:begin_date,
                end_date:end_date
            }
        }).success(function(data,header,config,status){
            console.log(data);
            $scope.installs = data.result[0].installs;
            $scope.regs = data.result[0].regs;
            $scope.roles = data.result[0].roles;
            $scope.costs = data.result[0].costs;

        }).error(function(data,header,config,status){
        });
    }
    function getTotalDataPerDay(){
        $http({
            url:'api/channel/total/perday',
            method:'GET',
            params:{
                app_id:app_id,
                os :os,
                begin_date:begin_date,
                end_date:end_date,
                media_source:media_source
            }
        }).success(function(data,header,config,status){
            console.log(data);
            var result = data.result
            var categories = [];
            var seriesData = [{name:'激活',data:[], yAxis: 0},{name:'注册',data:[], yAxis: 0},{name:'创角',data:[], yAxis: 0},{name:'花费',data:[], yAxis: 1}];
            var seriesData2 = [{name:'激活',data:[],type: 'column', yAxis: 0},{name:'注册',data:[],type: 'column',  yAxis: 0},{name:'创角',type: 'column', data:[], yAxis: 0},{name:'激活成本',type: 'spline', data:[], yAxis: 1},{name:'注册成本',type: 'spline', data:[], yAxis: 1},{name:'创角成本',type: 'spline', data:[], yAxis: 1}];
            for(var i = 0; i < result.length; i++){
                var temp = result[i];
                categories.push(temp.categories);
                seriesData[0].data.push(temp.installs);
                seriesData[1].data.push(temp.regs);
                seriesData[2].data.push(temp.roles);
                seriesData[3].data.push(temp.costs);
                seriesData2[0].data.push(temp.installs);
                seriesData2[1].data.push(temp.regs);
                seriesData2[2].data.push(temp.roles);
                seriesData2[3].data.push(temp.per_installs);
                seriesData2[4].data.push(temp.per_regs);
                seriesData2[5].data.push(temp.per_roles);
            }
            drawHighChartDoubleLine(categories,seriesData,'chart1' );
            drawHighChartDoubleLine(categories,seriesData2,'chart2' );
        }).error(function(data,header,config,status){
        });
    }
    function getDetailDataPerDay(){
        $http({
            url:'api/channel/detail/perday',
            method:'GET',
            params:{
                app_id:app_id,
                os :os,
                begin_date:begin_date,
                end_date:end_date,
                media_source:media_source
            }
        }).success(function(data,header,config,status){
            console.log(data);
            var result = data.result
            var categoriesArr = [];
            var seriesData = [];
            var obj = {};
            for(var i = 0; i < result.length; i++){
                var temp = result[i];
                categoriesArr.push(temp.categories);
                if(!obj[temp.media_source]){
                    obj[temp.media_source] = {
                        name:temp.media_source,
                        data:[]
                    }
                }
                obj[temp.media_source].data.push(temp.installs);
            }
            categoriesArr.unique();
            for(var key in obj){
                seriesData.push(obj[key]);
            }
            if(!media_source){
                drawHighchartStatckColumn(categoriesArr,seriesData,'chart3','每天各Campaign的激活数据');
            }else{
                drawHighchartStatckColumn(categoriesArr,seriesData,'chart3','每天各Media source的激活数据');
            }

        }).error(function(data,header,config,status){
        });
    }
    getTotalData();
    getTotalDataPerDay();
    getDetailDataPerDay();

    function getTableData(){
        $http({
            url:'api/channel/all',
            method:'GET',
            params:{
                app_id:app_id,
                os :os,
                begin_date:begin_date,
                end_date:end_date,
                media_source:media_source
            }
        }).success(function(data,header,config,status){
            console.log(data);
            var result = data.result;
            //var column_titles = [ { "sTitle": "categories"}, { "sTitle": "点击数"}, { "sTitle": "激活数"}, { "sTitle": "注册数"}, { "sTitle": "创角数"}, { "sTitle": "激活成本"}
            //    , { "sTitle": "注册成本"}, { "sTitle": "创角成本"}, { "sTitle": "注册率"}, { "sTitle": "创角率"}, { "sTitle": "次日留存数"}, { "sTitle": "次日留存率"}];
                //'点击数','激活数','注册数','创角数','激活成本','注册成本','创角成本','注册率','创角率','次日留存数','次日留存率'];
            //var data = [[],[],[],[],[],[],[],[],[],[],[],[]];
            var data = [[]];
            var column_titles = [ { "sTitle": "categories"}];
            for(var i =0; i < result.length; i++){
                var temp = result[i];
                data[0].push(temp.categories);
                //data[1].push(temp.installs);
                //data[2].push(temp.regs);
                //data[3].push(temp.roles);
                //data[4].push(temp.costs);
                //data[5].push(temp.per_installs);
                //data[6].push(temp.per_regs);
                //data[7].push(temp.per_roles);
                //data[8].push(temp.rate_regs);
                //data[9].push(temp.rage_roles);
                //data[10].push(temp.liucun);
                //data[11].push(temp.rate_liucun);
            }
            $scope.simpleTableOptions =  {
                "aaData":data,
                "aoColumns": [ { "sTitle": "categories"}],
                "sDom": "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
                "iDisplayLength": 10,
                "oTableTools": {
                    "aButtons": [
                        "copy", "csv", "xls", "pdf", "print"
                    ],
                    "sSwfPath": "assets/swf/copy_csv_xls_pdf.swf"
                },
                "language": {
                    "search": "",
                    "sLengthMenu": "_MENU_",
                    "oPaginate": {
                        "sPrevious": "上一页",
                        "sNext": "下一页"
                    }
                },
                "aaSorting": []
            };;
        }).error(function(data,header,config,status){
        });
    }
    getTableData();
    var categories = ['MSIE', 'Firefox', 'Chrome', 'Safari', 'Opera'],
        name = '主流浏览器',
        data = [{
            name:'份额',
            data:[
            {
                y: 55.11,
                //一级钻取
                drilldown: {
                    name: 'MSIE versions',
                    categories: ['MSIE 6.0', 'MSIE 7.0', 'MSIE 8.0', 'MSIE 9.0'],
                    data: [{
                        y: 10.85,
                        //二级钻取
                        drilldown: {
                            name: 'MSIE 6.0',
                            categories: ['MSIE 6.001', 'MSIE 7.001', 'MSIE 8.001', 'MSIE 9.001'],
                            data:[2,3,6,7]
                        }
                    }, 7.35, 33.06, 2.81]
                }
            }, {
                y: 21.63,
                drilldown: {
                    name: 'Firefox versions',
                    categories: ['Firefox 2.0', 'Firefox 3.0', 'Firefox 3.5', 'Firefox 3.6', 'Firefox 4.0'],
                    data: [0.20, 0.83, 1.58, 13.12, 5.43]
                }
            }, {
                y: 11.94,
                drilldown: {
                    name: 'Chrome versions',
                    categories: ['Chrome 5.0', 'Chrome 6.0', 'Chrome 7.0', 'Chrome 8.0', 'Chrome 9.0',
                        'Chrome 10.0', 'Chrome 11.0', 'Chrome 12.0'],
                    data: [0.12, 0.19, 0.12, 0.36, 0.32, 9.91, 0.50, 0.22]
                }
            }, {
                y: 7.15,
                drilldown: {
                    name: 'Safari versions',
                    categories: ['Safari 5.0', 'Safari 4.0', 'Safari Win 5.0', 'Safari 4.1', 'Safari/Maxthon',
                        'Safari 3.1', 'Safari 4.1'],
                    data: [4.55, 1.42, 0.23, 0.21, 0.20, 0.19, 0.14]
                }
            }, {
                y: 2.14,
                drilldown: {
                    name: 'Opera versions',
                    categories: ['Opera 9.x', 'Opera 10.x', 'Opera 11.x'],
                    data: [0.12, 0.37, 1.65]
                }
            }]
        }];
    drawHighchartsSuperColumn(categories, data, 'Schart','Media source激活份额占比 ToP 6', '市场份额');
});