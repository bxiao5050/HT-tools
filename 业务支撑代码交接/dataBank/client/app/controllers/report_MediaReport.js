/**
 * Created by weiqiang.yu on 2016/3/16.
 */
'use strict';

app.controller('MediaReportController', function ($scope, $http, $timeout, $q) {

    var curParams = null;
    $scope.selecedAllLegent = function(){
        var chart = $('.chartcontainer>#MediaReportChart1').highcharts();
        for(var i = 0;i<chart.series.length;i++){
            chart.series[i].show();
        }
        console.log(chart);
    }
    $scope.unselecedAllLegent = function(){
        var chart = $('.chartcontainer>#MediaReportChart1').highcharts();
        for(var i = 0;i<chart.series.length;i++){
            chart.series[i].hide();
        }
        console.log(chart);
    }
    $scope.$on("reportDailyMediaParams", function (event, params) {
        $('#MediaReportChart1').children().remove();
        $('#scrollable').children().remove();
        curParams = params;
        $scope.media = curParams.media;
        $scope.mediaList = curParams.mediaList;
        refreshData();
    });

    $scope.mediaChange = function () {
        curParams.media = $scope.media;
        refreshData();
    };

    //表格排序
    $scope.clickType = null;
    $scope.sortType = 'sort';
    $scope.sortStatus = true;
    $scope.count = 0;
    $scope.sortBy = function () {

        if ($scope.clickType != $scope.sortType) {
            $scope.count = 1;
            $scope.sortType = $scope.clickType;
            $scope.sortStatus = true;
        } else {
            $scope.count = ($scope.count + 1) % 3;
            if ($scope.count == 0) {
                $scope.sortType = 'sort';
                $scope.sortStatus = true;
            } else if ($scope == 1) {
                $scope.sortType = $scope.clickType;
                $scope.sortStatus = true;
            } else {
                $scope.sortType = $scope.clickType;
                $scope.sortStatus = false;
            }
        }
    }


    function combineTableData(data) {
        var returnData = [];
        var mainData = data.result;
        for (var i = 0; i < mainData.length; i++) {
            var tmpData = {
                'sort': i,
                'count_date': mainData[i]['日期'],
                'source': mainData[i]['os来源'],
                'active': Number(mainData[i]['激活']),
                'register': Number(mainData[i]['注册']),
                'createRole': Number(mainData[i]['创角']),
                'costSort': Number(mainData[i]['花费'].replace(',', '')),
                'costDisplay': mainData[i]['花费'],
                'rechargeSort': Number(mainData[i]['充值'].replace(',', '')), //去逗号，转数字
                'rechargeDisplay': mainData[i]['充值'],
                'roi': Number(mainData[i]['roi']),
                'activationCost': Number(mainData[i]['激活成本']),
                'registerCost': Number(mainData[i]['注册成本']),
                'createRoleCost': Number(mainData[i]['创角成本']),
                'registerRate': Number(mainData[i]['注册率']),
                'createRoleRate': Number(mainData[i]['创角率']),
                'oneDayRetain': Number(mainData[i]['次日留存']),
                'threeDayRetain': Number(mainData[i]['三日留存']),
                'sevenDayRetain': Number(mainData[i]['七日留存']),
                'oneDayRetainRate': Number(mainData[i]['激活'])!=0? Number(mainData[i]['次日留存'])/ Number(mainData[i]['激活']):0,
                'threeDayRetainRate': Number(mainData[i]['激活'])!=0? Number(mainData[i]['三日留存'])/ Number(mainData[i]['激活']):0,
                'sevenDayRetainRate': Number(mainData[i]['激活'])!=0? Number(mainData[i]['七日留存'])/ Number(mainData[i]['激活']):0,
                'MonthRecharge': Number(mainData[i]['月充值']),
                'MonthInstall': Number(mainData[i]['月激活']),
                'LTV':Number(mainData[i]['月激活'])!=0?Number(mainData[i]['月充值'])/Number(mainData[i]['月激活']):0.00
            };

            returnData.push(tmpData);
        }

        return returnData;
    }


    function combineTotalData(data) {
        var totalMedia = {
            source: "",
            active: 0,
            register: 0,
            createRole: 0,
            cost: 0,
            costDisplay: 0,
            recharge: 0,
            rechargeDisplay: 0,
            roi: 0,
            activeCost: 0,
            registerCost: 0,
            createRoleCost: 0,
            registerRate: 0,
            createRoleRate: 0,
            oneDayRetain: 0,
            threeDayRetain: 0,
            sevenDayRetain: 0,
            oneDayRetainRate: 0,
            threeDayRetainRate: 0,
            sevenDayRetainRate: 0,
            MonthRecharge:0,
            MonthInstall:0,
            LTV:0
        };


        for (var i = 0; i < data.length; i++) {
            totalMedia.source = data[i].source;
            totalMedia.active += data[i]['active'];
            totalMedia.register += data[i]['register'];
            totalMedia.createRole += data[i]['createRole'];
            totalMedia.cost += data[i]['costSort'];
            //totalMedia.newServerCreateRole += data[i]['newServerCreateRole'];
            totalMedia.recharge += data[i]['rechargeSort'];
            totalMedia.oneDayRetain += data[i]['oneDayRetain'];
            totalMedia.threeDayRetain += data[i]['threeDayRetain'];
            totalMedia.sevenDayRetain += data[i]['sevenDayRetain'];

            totalMedia.MonthRecharge+=data[i]['MonthRecharge'];
            totalMedia.MonthInstall+=data[i]['MonthInstall'];
        }

        totalMedia.costDisplay = comma(totalMedia.cost);
        totalMedia.rechargeDisplay = comma(totalMedia.recharge);

        if (totalMedia.active == 0) {
            totalMedia.registerRate = 0.00;
            totalMedia.createRoleRate = 0.00;
            totalMedia.activeCost = 0.00;
            totalMedia.oneDayRetainRate=0.00;
                totalMedia.threeDayRetainRate= 0.00;
                totalMedia.sevenDayRetainRate= 0.00
        } else {
            totalMedia.registerRate = totalMedia.register / totalMedia.active;
            totalMedia.createRoleRate = totalMedia.createRole / totalMedia.active;
            totalMedia.activeCost = totalMedia.cost / totalMedia.active;
            totalMedia.oneDayRetainRate=totalMedia.oneDayRetain/totalMedia.active;
            totalMedia.threeDayRetainRate= totalMedia.threeDayRetain/totalMedia.active;
            totalMedia.sevenDayRetainRate= totalMedia.sevenDayRetain/totalMedia.active;
        }

        if (totalMedia.register == 0) {
            totalMedia.registerCost = 0;
        } else {
            totalMedia.registerCost = totalMedia.cost / totalMedia.register;
        }

        if (totalMedia.createRole == 0) {
            totalMedia.createRoleCost = 0;
        } else {
            totalMedia.createRoleCost = totalMedia.cost / totalMedia.createRole;
        }

        if (totalMedia.cost == 0) {
            //totalMedia.newServerCreateRoleCost = 0;
            totalMedia.roi = 0;
        } else {
            //totalMedia.newServerCreateRoleCost = totalMedia.newServerCreateRole / totalMedia.cost;
            totalMedia.roi = totalMedia.recharge / totalMedia.cost;
        }
        totalMedia.LTV = totalMedia.MonthInstall!=0?totalMedia.MonthRecharge/totalMedia.MonthInstall:0;
        return totalMedia;

    }

    function comma(num) {
        var number = Number(num).toFixed(2);
        var source = String(number).split(".");//按小数点分成2部分
        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");//只将整数部分进行都好分割
        return source.join(".");//再将小数部分合并进来
    }


    $scope.createTableStyle = function (data, mmaObj, mode) {
        if(mmaObj==undefined){
            mmaObj={
                min:0,
                max:0,
                avg:0
            }
        }
        var avg = mmaObj.avg;
        var isReversal = mmaObj.isReversal;
        if(avg == 0) return ;
        var color = {};
        if (isReversal == true) {
            color['background-color'] = g2r(data, avg);
        } else {
            color['background-color'] = r2g(data, avg);
        }
        return color;
    }

    //翻转
    function g2r(value, avg) {
        //if (value < min) {
        //    return 'rgba (0,255,0,0.9)';
        //}
        //
        //if (value > max) {
        //    return 'rgba (255,0,0,0.9)';
        //}
        //
        //var ll = max - avg; //左轴长度
        //var rl = avg - min; //右轴长度
        //
        ////点在左边
        //if (value <= avg) {
        //    var position = avg - value;
        //    var alpha = position / ll * 0.8 + 0.1;
        //    return 'rgba(0,255,0,' + alpha + ')'
        //} else {
        //    var position = value - avg;
        //    var alpha = position / rl * 0.8 + 0.1;
        //    return 'rgba(255,0,0,' + alpha + ')'
        //}
        var middle = avg / 0.5;
        var percent = value / middle;
        if (percent <= 0.2)
            return 'rgb(34,139,34)';
        else if (percent <= 0.4)
            return 'rgb(152,251,152)';
        else if (percent <= 0.6)
            return 'rgb(255,235,133)';
        else if (percent <= 0.8)
            return 'rgb(255,192,203)';
        else
            return 'rgb(249,104,106)';
    }

    /*
     深绿：34,139,34
     浅绿：152,251,152
     黄：255,235,133
     浅红：255,192,203
     深红：249，104，106
     * */
    function r2g(value, avg) {
        //if (value < min) {
        //    return 'rgba (0,255,0,0.9)';
        //}
        //
        //if (value > max) {
        //    return 'rgba (255,0,0,0.9)';
        //}
        //
        //var ll = max - avg; //左轴长度
        //var rl = avg - min; //右轴长度
        //
        ////点在左边
        //if (value <= avg) {
        //    var position = avg - value;
        //    var alpha = position / ll * 0.8 + 0.1;
        //
        //    return 'rgba(255,0,0,' + alpha + ')'
        //} else {
        //    var position = value - avg;
        //    var alpha = position / rl * 0.8 + 0.1;
        //
        //    return 'rgba(0,255,0,' + alpha + ')'
        //}
        var percent = value ;
        if (percent < 30)
            return 'rgb(249,104,106)';
        else if (percent <= 50)
            return 'rgb(255,192,203)';
        else if (percent <= 70)
            return 'rgb(255,235,133)';
        else if (percent <= 90)
            return 'rgb(152,251,152)';
        else
            return 'rgb(34,139,34)';


    }

    function minMaxAvg(data, colName) {
        if (data.length <= 0) {
            return;
        }
        var isReversal = false;
        switch (colName) {
            case 'registerRate':
            case 'createRoleRate':
            case 'oneDayRetainRate':
            case 'threeDayRetainRate':
            case 'sevenDayRetainRate':
            case 'roi':
            case 'LTV':
                isReversal = false;
                break;
            case 'activationCost':
            case 'registerCost':
            case 'createRoleCost':
            case 'newServerCreateRoleCost':
                isReversal = true;
                break;
        }
        var result = {
            'min': data[0][colName],
            'max': data[0][colName],
            'avg': data[0][colName],
            'isReversal': isReversal
        };
        var count = 0;
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i][colName] > result.max) {
                result.max = data[i][colName];
            }
            if (data[i][colName] < result.min) {
                result.min = data[i][colName];
            }
            if (data[i][colName] != 0) {
                count++;
            }
            sum += data[i][colName];
        }

        if (count != 0) {
            result.avg = sum / count;
        }

        return result;
    }

    function combineMinMaxAvg(data) {
        var mma = {};
        //mma.roi = minMaxAvg(data, 'roi');

        mma.activationCost = minMaxAvg(data, 'activationCost');
        mma.registerCost = minMaxAvg(data, 'registerCost');
        mma.createRoleCost = minMaxAvg(data, 'createRoleCost');

        mma.registerRate = minMaxAvg(data, 'registerRate');
        mma.createRoleRate = minMaxAvg(data, 'createRoleRate');

        //mma.oneDayRetainRate = minMaxAvg(data, 'oneDayRetainRate');
        //mma.threeDayRetainRate = minMaxAvg(data, 'threeDayRetainRate');
        //mma.sevenDayRetainRate = minMaxAvg(data, 'sevenDayRetainRate');
        //mma.LTV =minMaxAvg(data, 'LTV');
        return mma;
    }


    function getData() {
        $http({
            url: '/api/reportmap/mediaRp',
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
                data.result.shift();
                drawChart(data, 'MediaReportChart1');

                $scope.tableData = combineTableData(data);
                $scope.totalData = combineTotalData($scope.tableData);
                $scope.styleMma = combineMinMaxAvg($scope.tableData);

            } else {
                //pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            //pop('error','链接异常',data);
        });
    }

    function drawChart(data, chartID) {
        var categories = [];
        var seriesData = [
            {name: "激活", data: [],type:'column',yAxis:0},
            {name: "注册", data: [],type:'column',yAxis:0},
            {name: "创角", data: [],type:'column',yAxis:0},
            {name: "花费", data: [],type:'column',yAxis:0},
            {name: "充值", data: [],type:'column',yAxis:0},
            {name: "激活成本", data: [],type:'spline',yAxis:1},
            {name: "注册成本", data: [],type:'spline',yAxis:1},
            {name: "创角成本", data: [],type:'spline',yAxis:1},
            {name: "创角率", data: [],type:'spline',yAxis:1}
            //{name:"LTV",data:[],type:'spline',yAxis:1}
        ];
        for (var i = 0; i < data.result.length; i++) {
            var temp = data.result[i];
            categories.push(temp['日期']);
            seriesData[0].data.push(Number(temp['激活']));
            seriesData[1].data.push(Number(temp['注册']));
            seriesData[2].data.push(Number(temp['创角']));
            seriesData[3].data.push(Number(temp['花费']));
            seriesData[4].data.push(Number(temp['充值']));
            seriesData[5].data.push(Number(temp['激活成本']));
            seriesData[6].data.push(Number(temp['注册成本']));
            seriesData[7].data.push(Number(temp['创角成本']));
            seriesData[8].data.push(Number(temp['创角率']));
            //seriesData[9].data.push(temp['月激活']!=0?Number((temp['月充值']/temp['月激活']).toFixed(2)):0.00)
        }


        drawHighChartDoubleLineCommon(categories, seriesData, chartID);
    }
    app.filter('rateItems',function(){
        return function (item) {
            var str=item+"%";
            return str;
        }
    });
    $scope.col='count_date';
    $scope.desc=0;

    function refreshData() {
        if (curParams) {
            getData();
        }
    }
});