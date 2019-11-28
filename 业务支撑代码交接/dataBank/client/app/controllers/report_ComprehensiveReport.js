app.controller('ComReportController', ['$rootScope', '$scope', '$http', '$timeout', '$q', '$params', function ($rootScope, $scope, $http, $timeout, $q, $params) {

    var curParams = null;
    $scope.IsShowCountry = true;
    $scope.IsShowGame = true;
    $scope.IsSystemCompare = false;
    $scope.mediaList = [];
    $scope.dataSource = [];
    getDataSource();
    $scope.selecedAllLegent = function(){
        var chart = $('.chartcontainer>.show').highcharts();
        for(var i = 0;i<chart.series.length;i++){
            chart.series[i].show();
        }
        console.log(chart);
    }
    $scope.unselecedAllLegent = function(){
        var chart = $('.chartcontainer>.show').highcharts();
        for(var i = 0;i<chart.series.length;i++){
            chart.series[i].hide();
        }
        console.log(chart);
    }
    $scope.$on("reportComParams", function (event, params) {
        $('#MarketReportChart1').children().remove();
        $scope.areatableData = [];
        curParams = params;
        $scope.model = curParams.model_state;
        refreshData();
    });
    $scope.$on("reportCountryParams", function (event, params) {
        $('#MarketReportChart2').children().remove();
        $scope.countrytableData = [];
        curParams = params;
        $scope.model = curParams.model_state;
        refreshData();
    });
    $scope.$on("reportGameParams", function (event, params) {
        $('#MarketReportChart3').children().remove();
        $scope.gametableData = [];
        curParams = params;
        $scope.IsSystemCompare = curParams.isSysCompare;
        $scope.model = curParams.model_state;
        refreshData();
    });
    $scope.$watch('model', function (newValue, oldValue) {
        if (newValue == 0) {
            $('#areaTable').removeClass('hidden').addClass('show');
            $('#countryTable').removeClass('show').addClass('hidden');
            $('#gameTable').removeClass('show').addClass('hidden');
            $('#MarketReportChart1').removeClass('hidden').addClass('show');
            $('#MarketReportChart2').removeClass('show').addClass('hidden');
            $('#MarketReportChart3').removeClass('show').addClass('hidden');
        }
        else if (newValue == 1) {
            $('#areaTable').removeClass('show').addClass('hidden');
            $('#countryTable').removeClass('hidden').addClass('show');
            $('#gameTable').removeClass('show').addClass('hidden');
            $('#MarketReportChart1').removeClass('show').addClass('hidden');
            $('#MarketReportChart2').removeClass('hidden').addClass('show');
            $('#MarketReportChart3').removeClass('show').addClass('hidden');
        }
        else if (newValue == 2) {
            $('#areaTable').removeClass('show').addClass('hidden');
            $('#countryTable').removeClass('show').addClass('hidden');
            $('#gameTable').removeClass('hidden').addClass('show');
            $('#MarketReportChart1').removeClass('show').addClass('hidden');
            $('#MarketReportChart2').removeClass('show').addClass('hidden');
            $('#MarketReportChart3').removeClass('hidden').addClass('show');
        }
    });

    /**
     * 点击表格国家
     */
    $scope.tableCountryClick = function (item) {
        $scope.$emit('SelectTableCountry', item);
        //curParams.area_app_ids=item;
    };

    /**
     * 点击表格游戏
     */
    $scope.tableGameClick = function (item) {
        $scope.$emit('SelectTableGame', item);
    };
    /**
     * 点击游戏下媒体
     */
    $scope.tableMediaClick = function (item) {
        var mediaParams = {};
        mediaParams.media = item;
        mediaParams.mediaList = $scope.mediaList;


        $scope.$emit('tableGameToMedia', mediaParams);
    };

    function getMediaList(data) {
        var result = [];
        for (var i = 0; i < data.result.length; i++) {
            result[i] = data.result[i]['媒体'];
        }

        return result;
    }

    //表格排序
    $scope.clickType = [];
    $scope.sortType = [];
    $scope.sortStatus = [];
    $scope.count = [];
    $scope.sortBy = function (i) {
        if ($scope.clickType[i] != $scope.sortType[i]) {
            $scope.count[i] = 1;
            $scope.sortType[i] = $scope.clickType[i];
            $scope.sortStatus[i] = true;
        } else {
            $scope.count[i] = ($scope.count[i] + 1) % 3;
            if ($scope.count[i] == 0) {
                $scope.sortType[i] = 'sort';
                $scope.sortStatus[i] = true;
            } else if ($scope.count[i] == 1) {
                $scope.sortType[i] = $scope.clickType[i];
                $scope.sortStatus[i] = true;
            } else {
                $scope.sortType[i] = $scope.clickType[i];
                $scope.sortStatus[i] = false;
            }
        }
    };


    //媒体排序
    $scope.mediaClickType = null;
    $scope.mediaSortType = "active";
    $scope.mediaSortStatus = true;
    $scope.mediaCount = 0;
    $scope.mediaSortBy = function () {
        if ($scope.mediaClickType != $scope.mediaSortType) {
            $scope.mediaCount = 1;
            $scope.mediaSortType = $scope.mediaClickType;
            $scope.mediaSortStatus = true;
        } else {
            $scope.mediaCount = ($scope.mediaCount + 1) % 3;
            if ($scope.mediaCount == 0) {

                $scope.mediaSortType = 'sort';
                $scope.mediaSortStatus = true;
            } else if ($scope.mediaCount == 1) {

                $scope.mediaSortType = $scope.mediaClickType;
                $scope.mediaSortStatus = true;
            } else {

                $scope.mediaSortType = $scope.mediaClickType;
                $scope.mediaSortStatus = false;
            }
        }
    }

    //千位分割,两位小数
    //function comma(num) {
    //    var number = Number(num).toFixed(2);
    //    var source = String(number).split(".");//按小数点分成2部分
    //    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");//只将整数部分进行都好分割
    //    return source.join(".");//再将小数部分合并进来
    //}

    function combineComTableData(data) {
        var returnData = [];
        var mainData = data.result;
        for (var i = 0; i < mainData.length; i++) {
            var tmpData = {
                'sort': i,
                'area_id': mainData[i]['area_id'],
                'area': mainData[i]['地区'],
                'country_id': mainData[i]['country_id'],
                'country': mainData[i]['国家'],
                'app_id': mainData[i]['app_id'],
                'game': mainData[i]['游戏'],
                'source': mainData[i]['维度'],
                'active': Number(mainData[i]['激活']),
                'register': Number(mainData[i]['注册']),
                'createRole': Number(mainData[i]['创角']),
                'costSort': Number((mainData[i]['花费'] || '0').replace(',', '')),
                'costDisplay': mainData[i]['花费'],
                'registerRate': Number(mainData[i]['注册率']),
                'createRoleRate': Number(mainData[i]['创角率']),
                'activationCost': Number(mainData[i]['激活成本']),
                'registerCost': Number(mainData[i]['注册成本']),
                'createRoleCost': Number(mainData[i]['创角成本']),
                // 'newServerCreateRole': Number(mainData[i]['新服创角']),
                // 'newServerCreateRoleCost': Number(mainData[i]['新服创角成本']),
                'oneDayRetain': Number(mainData[i]['次日留存']),
                'threeDayRetain': Number(mainData[i]['3日留存']),
                'sevenDayRetain': Number(mainData[i]['7日留存']),
                'oneDayRetainRate': Number(mainData[i]['激活'] != 0) ? Number(mainData[i]['次日留存']) / Number(mainData[i]['激活']) : 0.00,
                'threeDayRetainRate': Number(mainData[i]['激活'] != 0) ? Number(mainData[i]['3日留存']) / Number(mainData[i]['激活']) : 0.00,
                'sevenDayRetainRate': Number(mainData[i]['激活'] != 0) ? Number(mainData[i]['7日留存']) / Number(mainData[i]['激活']) : 0.00,
                'rechargeSort': Number(mainData[i]['充值'].replace(',', '')), //去逗号，转数字
                'rechargeDisplay': Number(mainData[i]['充值']),
                'roi': Number(mainData[i]['ROI']),
                'MonthCharge': Number(mainData[i]['MonthCharge']),
                'MonthInstall': Number(mainData[i]['MonthInstall']),
                'LTV': Number(mainData[i]['MonthInstall']) != 0 ? (Number(mainData[i]['MonthCharge']) / Number(mainData[i]['MonthInstall'])) : 0.00
            };

            returnData.push(tmpData);
        }
        return returnData;
    }


    function combineMediaTableData(data) {
        var returnData = [];
        var mainData = data.result;
        for (var i = 0; i < mainData.length; i++) {
            var tmpData = {
                'sort': i,
                'media': mainData[i]['媒体'],
                'source': mainData[i]['纬度'],
                'active': Number(mainData[i]['激活']),
                'register': Number(mainData[i]['注册']),
                'createRole': Number(mainData[i]['创角']),
                'costSort': Number(mainData[i]['花费'].replace(',', '')),
                'costDisplay': mainData[i]['花费'],
                'registerRate': Number(mainData[i]['注册率']),
                'createRoleRate': Number(mainData[i]['创角率']),
                'registerCost': Number(mainData[i]['注册成本']),
                'activeCost': Number(mainData[i]['激活成本']),
                'createRoleCost': Number(mainData[i]['创角成本']),
                // 'newServerCreateRole': Number(mainData[i]['新服创角']),
                // 'newServerCreateRoleCost': Number(mainData[i]['新服创角成本']),
                'oneDayRetain': Number(mainData[i]['次日留存']),
                'threeDayRetain': Number(mainData[i]['3日留存']),
                'sevenDayRetain': Number(mainData[i]['7日留存']),
                'oneDayRetainRate': Number(mainData[i]['激活']) != 0 ? Number(mainData[i]['次日留存']) / Number(mainData[i]['激活']) : 0.00,
                'threeDayRetainRate': Number(mainData[i]['激活']) != 0 ? Number(mainData[i]['3日留存']) / Number(mainData[i]['激活']) : 0.00,
                'sevenDayRetainRate': Number(mainData[i]['激活']) != 0 ? Number(mainData[i]['7日留存']) / Number(mainData[i]['激活']) : 0.00,
                'rechargeSort': Number(mainData[i]['充值'].replace(',', '')), //去逗号，转数字
                'rechargeDisplay': mainData[i]['充值'],
                'roi': Number(mainData[i]['ROI']),
                'MonthCharge': Number(mainData[i]['MonthCharge']),
                'MonthInstall': Number(mainData[i]['MonthInstall']),
                'LTV': Number(mainData[i]['MonthInstall']) != 0 ? (Number(mainData[i]['MonthCharge']) / Number(mainData[i]['MonthInstall'])) : 0.00
            };

            returnData.push(tmpData);
        }
        return returnData;
    }


    $scope.createTableStyle = function (data, mmaObj, mode) {
        if (mmaObj == undefined) {
            mmaObj = {
                min: 0,
                max: 0,
                avg: 0
            }
        }
        var avg = mmaObj.avg;
        if(avg == 0) return ;
        var isReversal = mmaObj.isReversal;
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
     90%以上 深绿    70%-90% 浅绿    50%-70% 黄色    30%-50% 浅红   30%以下  深红

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
        //var middle = avg / 0.5;
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
            case 'activeCost':
            case 'registerCost':
            case 'createRoleCost':
            // case 'newServerCreateRoleCost':
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
        var mmas = [];
        for (var i = 0; i < data.length; i++) {
            var mma = {};
            mma.registerRate = minMaxAvg(data[i].games, 'registerRate');
            mma.createRoleRate = minMaxAvg(data[i].games, 'createRoleRate');
            mma.activationCost = minMaxAvg(data[i].games, 'activationCost');
            mma.registerCost = minMaxAvg(data[i].games, 'registerCost');
            mma.createRoleCost = minMaxAvg(data[i].games, 'createRoleCost');
            //mma.newServerCreateRoleCost = minMaxAvg(data[i].games, 'newServerCreateRoleCost');
            //mma.oneDayRetainRate = minMaxAvg(data[i].games, 'oneDayRetainRate');
            //mma.threeDayRetainRate = minMaxAvg(data[i].games, 'threeDayRetainRate');
            //mma.sevenDayRetainRate = minMaxAvg(data[i].games, 'sevenDayRetainRate');
           // mma.roi = minMaxAvg(data[i].games, 'roi');
          //  mma.LTV = minMaxAvg(data[i].games, 'LTV');

            mmas.push(mma);
        }
        return mmas;
    }


    function combineMediaMinMaxAvg(data) {
        var mma = {};
        mma.registerRate = minMaxAvg(data, 'registerRate');
        mma.createRoleRate = minMaxAvg(data, 'createRoleRate');
        mma.registerCost = minMaxAvg(data, 'registerCost');
        mma.activeCost = minMaxAvg(data, 'activeCost');
        mma.createRoleCost = minMaxAvg(data, 'createRoleCost');
        //mma.newServerCreateRoleCost = minMaxAvg(data, 'newServerCreateRoleCost');
        //mma.oneDayRetainRate = minMaxAvg(data, 'oneDayRetainRate');
        //mma.threeDayRetainRate = minMaxAvg(data, 'threeDayRetainRate');
        //mma.sevenDayRetainRate = minMaxAvg(data, 'sevenDayRetainRate');
        //mma.roi = minMaxAvg(data, 'roi');
        //mma.LTV = minMaxAvg(data, 'LTV');
        return mma;
    }


    function getComData() {

        $http({
            url: '/api/reportmap/comprehensiveReport',
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
                if ($scope.model == 0) {
                    var result = renderTableData(combineComTableData(data));
                    $scope.areatableData = result;
                    bindComTotal(result);
                    $scope.styleMmas = combineMinMaxAvg(result);

                    drawChart(data, 'MarketReportChart1');
                }
                else if ($scope.model == 1) {
                    var result = renderTableData(combineComTableData(data));
                    $scope.countrytableData = result;
                    bindComTotal(result);
                    $scope.styleMmas = combineMinMaxAvg(result);
                    drawChart(data, 'MarketReportChart2');
                }
            } else {
                //pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            //pop('error','链接异常',data);
        });
    }

    function bindComTotal(comData) {
        $scope.totalComObj = {
            source: [],
            active: [],
            register: [],
            createRole: [],
            cost: [],
            registerRate: [],
            createRoleRate: [],
            activeCost: [],
            registerCost: [],
            createRoleCost: [],
            // newServerCreateRole: [],
            // newServerCreateRoleCost: [],
            oneDayRetain: [],
            threeDayRetain: [],
            sevenDayRetain: [],
            oneDayRetainRate: [],
            threeDayRetainRate: [],
            sevenDayRetainRate: [],
            rechage: [],
            roi: [],
            costDisplay: [],
            rechageDisplay: [],
            MonthCharge: [],
            MonthInstall: [],
            LTV: []
        };

        for (var i = 0; i < comData.length; i++) {
            var medData = comData[i]['games'];
            $scope.totalComObj.source[i] = medData[0]['source'];
            $scope.totalComObj.active[i] = 0;
            $scope.totalComObj.register[i] = 0;
            $scope.totalComObj.createRole[i] = 0;
            $scope.totalComObj.cost[i] = 0;
            // $scope.totalComObj.newServerCreateRole[i] = 0;
            // $scope.totalComObj.oneDayRetain[i] = 0;
            $scope.totalComObj.threeDayRetain[i] = 0;
            $scope.totalComObj.sevenDayRetain[i] = 0;
            $scope.totalComObj.rechage[i] = 0;
            $scope.totalComObj.MonthCharge[i] = 0;
            $scope.totalComObj.MonthInstall[i] = 0;
            $scope.totalComObj.LTV[i] = 0;


            for (var j = 0; j < medData.length; j++) {
                $scope.totalComObj.active[i] += medData[j]['active'];
                $scope.totalComObj.register[i] += medData[j]['register'];
                $scope.totalComObj.createRole[i] += medData[j]['createRole'];
                $scope.totalComObj.cost[i] += medData[j]['costSort'];
                // $scope.totalComObj.newServerCreateRole[i] = medData[j]['newServerCreateRole'];
                $scope.totalComObj.rechage[i] += medData[j]['rechargeSort'];
                $scope.totalComObj.oneDayRetain[i] += medData[j]['oneDayRetain'];
                $scope.totalComObj.threeDayRetain[i] += medData[j]['threeDayRetain'];
                $scope.totalComObj.sevenDayRetain[i] += medData[j]['sevenDayRetain'];

                $scope.totalComObj.MonthCharge[i] += medData[j]['MonthCharge'];
                $scope.totalComObj.MonthInstall[i] += medData[j]['MonthInstall'];
            }

            $scope.totalComObj.costDisplay[i] = $scope.totalComObj.cost[i];
            $scope.totalComObj.rechageDisplay[i] = $scope.totalComObj.rechage[i];

            if ($scope.totalComObj.active[i] == 0) {
                $scope.totalComObj.registerRate[i] = 0.00;
                $scope.totalComObj.createRoleRate[i] = 0.00;
                $scope.totalComObj.activeCost[i] = 0.00;
                $scope.totalComObj.oneDayRetainRate[i] = 0.00;
                $scope.totalComObj.threeDayRetainRate[i] = 0.00;
                $scope.totalComObj.sevenDayRetainRate[i] = 0.00;
            } else {
                $scope.totalComObj.registerRate[i] = $scope.totalComObj.register[i] / $scope.totalComObj.active[i];
                $scope.totalComObj.createRoleRate[i] = $scope.totalComObj.createRole[i] / $scope.totalComObj.active[i];
                $scope.totalComObj.activeCost[i] = $scope.totalComObj.cost[i] / $scope.totalComObj.active[i];
                $scope.totalComObj.oneDayRetainRate[i] = $scope.totalComObj.oneDayRetain[i] / $scope.totalComObj.active[i];
                $scope.totalComObj.threeDayRetainRate[i] = $scope.totalComObj.threeDayRetain[i] / $scope.totalComObj.active[i];
                $scope.totalComObj.sevenDayRetainRate[i] = $scope.totalComObj.sevenDayRetain[i] / $scope.totalComObj.active[i];
            }

            if ($scope.totalComObj.register[i] == 0) {
                $scope.totalComObj.registerCost[i] = 0;
            } else {
                $scope.totalComObj.registerCost[i] = $scope.totalComObj.cost[i] / $scope.totalComObj.register[i];
            }

            if ($scope.totalComObj.createRole[i] == 0) {
                $scope.totalComObj.createRoleCost[i] = 0;
            } else {
                $scope.totalComObj.createRoleCost[i] = $scope.totalComObj.cost[i] / $scope.totalComObj.createRole[i];
            }

            if ($scope.totalComObj.cost[i] == 0) {
                $scope.totalComObj.roi[i] = 0;
            } else {
                $scope.totalComObj.roi[i] = $scope.totalComObj.rechage[i] / $scope.totalComObj.cost[i];
            }
            // if ($scope.totalComObj.newServerCreateRole[i] == 0) {
            //     $scope.totalComObj.newServerCreateRoleCost[i] = 0;
            // }
            // else {
            //     $scope.totalComObj.newServerCreateRoleCost[i] = $scope.totalComObj.cost[i] / $scope.totalComObj.newServerCreateRole[i];
            // }
            $scope.totalComObj.LTV[i] = $scope.totalComObj.MonthInstall[i] != 0 ? $scope.totalComObj.MonthCharge[i] / $scope.totalComObj.MonthInstall[i] : 0;

        }
    }


    function bindMedTotal(medData) {
        var totalMedia = {
            source: "",
            active: 0,
            register: 0,
            createRole: 0,
            cost: 0,
            costDisplay: 0,
            registerRate: 0,
            createRoleRate: 0,
            registerCost: 0,
            activeCost: 0,
            createRoleCost: 0,
            // newServerCreateRole: 0,
            // newServerCreateRoleCost: 0,
            oneDayRetain: 0,
            threeDayRetain: 0,
            sevenDayRetain: 0,
            oneDayRetainRate: 0,
            threeDayRetainRate: 0,
            sevenDayRetainRate: 0,
            rechage: 0,
            roi: 0,
            MonthCharge: 0,
            MonthInstall: 0,
            LTV: 0
        };


        for (var i = 0; i < medData.length; i++) {
            totalMedia.source = medData[i].source;
            totalMedia.active += medData[i]['active'];
            totalMedia.register += medData[i]['register'];
            totalMedia.createRole += medData[i]['createRole'];
            totalMedia.cost += medData[i]['costSort'];
            // totalMedia.newServerCreateRole = medData[i]['newServerCreateRole'];
            totalMedia.rechage += medData[i]['rechargeSort'];
            totalMedia.oneDayRetain += medData[i]['oneDayRetain'];
            totalMedia.threeDayRetain += medData[i]['threeDayRetain'];
            totalMedia.sevenDayRetain += medData[i]['sevenDayRetain'];

            totalMedia.MonthCharge += medData[i]['MonthCharge'];
            totalMedia.MonthInstall += medData[i]['MonthInstall'];
        }

        totalMedia.costDisplay = totalMedia.cost;
        totalMedia.rechageDisplay = totalMedia.rechage;

        if (totalMedia.active == 0) {
            totalMedia.registerRate = 0.00;
            totalMedia.createRoleRate = 0.00;
            totalMedia.activeCost = 0.00;
            totalMedia.oneDayRetainRate[i] = 0.00;
            totalMedia.threeDayRetainRate[i] = 0.00;
            totalMedia.sevenDayRetainRate[i] = 0.00;
        } else {
            totalMedia.registerRate = totalMedia.register / totalMedia.active;
            totalMedia.createRoleRate = totalMedia.createRole / totalMedia.active;
            totalMedia.activeCost = totalMedia.cost / totalMedia.active;
            totalMedia.oneDayRetainRate = totalMedia.oneDayRetain / totalMedia.active;
            totalMedia.threeDayRetainRate = totalMedia.threeDayRetain / totalMedia.active;
            totalMedia.sevenDayRetainRate = totalMedia.sevenDayRetain / totalMedia.active;
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

            totalMedia.roi = 0;
        } else {

            totalMedia.roi = totalMedia.rechage / totalMedia.cost;
        }

        // if (totalMedia.newServerCreateRole == 0) {
        //     totalMedia.newServerCreateRoleCost = 0;
        // }
        // else {
        //     totalMedia.newServerCreateRoleCost = totalMedia.cost / totalMedia.newServerCreateRole;
        // }
        totalMedia.LTV = totalMedia.MonthInstall != 0 ? totalMedia.MonthCharge / totalMedia.MonthInstall : 0;

        $scope.totalMedia = totalMedia;
    }

    function getMediaData() {

        $http({
            url:$scope.IsSystemCompare? '/api/reportmap/sysCompare': '/api/reportmap/datamediaRp',
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
                $scope.mediaList = getMediaList(data);

                $scope.gametableData = combineMediaTableData(data);
                $scope.styltyMediaMma = combineMediaMinMaxAvg($scope.gametableData);

                if($scope.IsSystemCompare) {
                    stackChartData = data.result;
                    $scope.stackTable = getMediaTable(data.result);
                    renderStackingChart(stackChartData,'激活');
                }else{
                    bindMedTotal($scope.gametableData);
                    drawChart(data, 'MarketReportChart3');
                }
            }
        }).error(function (data, header, config, status) {
            //pop('error','链接异常',data);
        });
    }
    $scope.stackTable = [];
    function  getMediaTable(data) {
        var result = [];
        for(var i = 0;i<data.length;i++){
            if(i%2==0) {
                result.push({mediaName:data[i].媒体,sort:"激活",asc:true,rows:[{
                    系统:data[i].纬度,
                    激活:Number(data[i].激活).toFixed(0),
                    注册:Number(data[i].注册).toFixed(0),
                    创角:Number(data[i].创角).toFixed(0),
                    花费:data[i].花费,
                    注册率:data[i].注册率,
                    创角率:data[i].创角率,
                    激活成本:data[i].激活成本,
                    注册成本:data[i].注册成本,
                    创角成本:data[i].创角成本,
                    充值:data[i].充值,
                    ROI:data[i].ROI,
                    LTV:Number(data[i].MonthInstall) == 0?0:(Number(data[i].MonthCharge)*100/Number(data[i].MonthInstall)).toFixed(2),
                    次日留存:data[i].次日留存,
                    "3日留存":data[i]["3日留存"],
                    "7日留存":data[i]["7日留存"]}]})
            }
            else result[result.length-1].rows.push({
                系统:data[i].纬度,
                激活:Number(data[i].激活).toFixed(0),
                注册:Number(data[i].注册).toFixed(0),
                创角:Number(data[i].创角).toFixed(0),
                花费:data[i].花费,
                注册率:data[i].注册率,
                创角率:data[i].创角率,
                激活成本:data[i].激活成本,
                注册成本:data[i].注册成本,
                创角成本:data[i].创角成本,
                充值:data[i].充值,
                ROI:data[i].ROI,
                LTV:Number(data[i].MonthInstall) == 0?0:(Number(data[i].MonthCharge)*100/Number(data[i].MonthInstall)).toFixed(2),
                次日留存:data[i].次日留存,
                "3日留存":data[i]["3日留存"],
                "7日留存":data[i]["7日留存"]});
        }

        //计算total
        for(var i = 0;i<result.length;i++){
            var item = result[i];
            item.total = {
                系统:'全部',
                激活:0,
                注册:0,
                创角:0,
                花费:0,
                注册率:0,
                创角率:0,
                激活成本:0,
                注册成本:0,
                创角成本:0,
                充值:0,
                ROI:0,
                LTV:0
            };
            item.total["次日留存"] = 0;
            item.total["3日留存"] = 0;
            item.total["7日留存"] = 0;
            for(var j = 0;j<item.rows.length;j++) {
                item.total.激活 += Number(item.rows[j].激活);
                item.total.注册 += Number(item.rows[j].注册);
                item.total.创角 += Number(item.rows[j].创角);
                item.total.花费 += Number(item.rows[j].花费);
                item.total.充值 += Number(item.rows[j].充值);
                item.total.ROI += Number(item.rows[j].ROI);
                item.total.LTV += Number(item.rows[j].LTV);
                item.total["次日留存"] += Number(item.rows[j]["次日留存"]);
                item.total["3日留存"] += Number(item.rows[j]["3日留存"]);
                item.total["7日留存"] += Number(item.rows[j]["7日留存"]);

            }
            item.total.注册率 = (item.total.注册*100/item.total.激活).toFixed(2);
            item.total.创角率 = (item.total.创角*100/item.total.激活).toFixed(2);
            item.total.激活 = item.total.激活.toFixed(0)
            item.total.花费 = item.total.花费.toFixed(2)
            item.total.注册 =  item.total.注册.toFixed(0);
            item.total.创角 = item.total.创角.toFixed(0)
            item.total.充值 = item.total.充值.toFixed(2);
            item.total.LTV =  item.total.LTV.toFixed(2);

            if(item.total.激活 != 0)
            item.total.激活成本 = (item.total.花费/item.total.激活).toFixed(2);
            if(item.total.注册 != 0)
            item.total.注册成本 = (Number(item.total.花费)/item.total.注册).toFixed(2);
            if(item.total.创角 != 0)
            item.total.创角成本 = (Number(item.total.花费)/item.total.创角).toFixed(2);
        }
        return result;
    }
    function caculateByArea(data) {
        var tem = data.result;
        var result = [];
        if (curParams.is_all_area) { //全部地区
            var area_ids = get_son_ids(curParams.area_app_ids).toString().split(',');
            for (var i = 0; i < area_ids.length; i++) {
                var temresult = {
                    area_id: 0,
                    area: '',
                    country_id: 0,
                    country: '',
                    source: 0,
                    active: 0,
                    register: 0,
                    createRole: 0,
                    cost: 0,
                    // newServerCreateRole: 0,
                    oneDayRetain: 0,
                    threeDayRetain: 0,
                    sevenDayRetain: 0,
                    rechage: 0,
                    registerRate: 0,
                    createRoleRate: 0,
                    activeCost: 0,
                    registerCost: 0,
                    createRoleCost: 0,
                    // newServerCreateRoleCost: 0,
                    roi: 0,
                    MonthCharge: 0,
                    MonthInstall: 0,
                    LTV: 0
                };
                for (var j = 0; j < tem.length; j++) {
                    if (Number(area_ids[i]) == tem[j].area_id) {
                        temresult.area_id = tem[j]['area_id'];
                        temresult.area = tem[j]['地区'];
                        temresult.country_id = tem[j]['country_id'];
                        temresult.country = tem[j]['国家'];
                        temresult.source = tem[j]['维度'];
                        temresult.active += Number(tem[j]['激活']);
                        temresult.register += Number(tem[j]['注册']);
                        temresult.createRole += Number(tem[j]['创角']);
                        temresult.cost += Number(tem[j]['花费']);
                        // temresult.newServerCreateRole += Number(tem[j]['新服创角']);
                        temresult.oneDayRetain += Number(tem[j]['次日留存']);
                        temresult.threeDayRetain += Number(tem[j]['3日留存']);
                        temresult.sevenDayRetain += Number(tem[j]['7日留存']);
                        temresult.rechage += Number(tem[j]['充值']);
                        temresult.MonthCharge += Number(tem[j]['MonthCharge']);
                        temresult.MonthInstall += Number(tem[j]['MonthInstall']);
                    }
                }
                temresult.registerRate = temresult.active != 0 ? Number((temresult.register / temresult.active).toFixed(2)) : 0;
                temresult.createRoleRate = temresult.active != 0 ? Number((temresult.createRole / temresult.active).toFixed(2)) : 0;
                temresult.activeCost = temresult.active != 0 ? Number((temresult.cost / temresult.active).toFixed(2)) : 0;
                temresult.registerCost = temresult.register != 0 ? Number((temresult.cost / temresult.register).toFixed(2)) : 0;
                temresult.createRoleCost = temresult.createRole != 0 ? Number((temresult.cost / temresult.createRole).toFixed(2)) : 0;
               // temresult.newServerCreateRoleCost = temresult.newServerCreateRole != 0 ? Number((temresult.cost / temresult.newServerCreateRole).toFixed(2)) : 0;
                temresult.roi = temresult.cost != 0 ? Number((temresult.recharge / temresult.cost)).toFixed(2) : 0;
                temresult.LTV = temresult.MonthInstall != 0 ? Number((temresult.MonthCharge / temresult.MonthInstall).toFixed(2)) : 0;
                result.push(temresult);
            }
        }
        else {//单个地区
            var country_ids = get_son_ids(curParams.area_app_ids).toString().split(',');
            for (var i = 0; i < country_ids.length; i++) {
                var temresult = {
                    area_id: 0,
                    area: '',
                    country_id: 0,
                    country: '',
                    source: 0,
                    active: 0,
                    register: 0,
                    createRole: 0,
                    cost: 0,
                    //newServerCreateRole: 0,
                    oneDayRetain: 0,
                    threeDayRetain: 0,
                    sevenDayRetain: 0,
                    rechage: 0,
                    registerRate: 0,
                    createRoleRate: 0,
                    activeCost: 0,
                    registerCost: 0,
                    createRoleCost: 0,
                   //newServerCreateRoleCost: 0,
                    roi: 0,
                    MonthCharge: 0,
                    MonthInstall: 0,
                    LTV: 0
                };
                for (var j = 0; j < tem.length; j++) {
                    if (Number(country_ids[i]) == tem[j].country_id) {
                        temresult.area_id = tem[j]['area_id'];
                        temresult.area = tem[j]['地区'];
                        temresult.country_id = tem[j]['country_id'];
                        temresult.country = tem[j]['国家'];
                        temresult.source = tem[j]['维度'];
                        temresult.active += Number(tem[j]['激活']);
                        temresult.register += Number(tem[j]['注册']);
                        temresult.createRole += Number(tem[j]['创角']);
                        temresult.cost += Number(tem[j]['花费']);

                        //temresult.newServerCreateRole += Number(tem[j]['新服创角']);
                        temresult.oneDayRetain += Number(tem[j]['次日留存']);
                        temresult.threeDayRetain += Number(tem[j]['3日留存']);
                        temresult.sevenDayRetain += Number(tem[j]['7日留存']);
                        temresult.rechage += Number(tem[j]['充值']);

                        temresult.MonthCharge += Number(tem[j]['MonthCharge']);
                        temresult.MonthInstall += Number(tem[j]['MonthInstall']);
                    }
                }
                temresult.registerRate = temresult.active != 0 ? Number((temresult.register / temresult.active).toFixed(2)) : 0;
                temresult.createRoleRate = temresult.active != 0 ? Number((temresult.createRole / temresult.active).toFixed(2)) : 0;
                temresult.activeCost = temresult.active != 0 ? Number((temresult.cost / temresult.active).toFixed(2)) : 0;
                temresult.registerCost = temresult.register != 0 ? Number((temresult.cost / temresult.register).toFixed(2)) : 0;
                temresult.createRoleCost = temresult.createRole != 0 ? Number((temresult.cost / temresult.createRole).toFixed(2)) : 0;
                //temresult.newServerCreateRoleCost = temresult.newServerCreateRole != 0 ? Number((temresult.cost / temresult.newServerCreateRole).toFixed(2)) : 0;
                temresult.roi = temresult.cost != 0 ? Number((temresult.recharge / temresult.cost)).toFixed(2) : 0;
                temresult.LTV = temresult.MonthInstall != 0 ? Number((temresult.MonthCharge / temresult.MonthInstall).toFixed(2)) : 0;
                result.push(temresult);
            }
        }
        return result;
    }

    function caculateByCountry(data) {

        var tem = data.result;
        var result = [];
        if (curParams.is_all_country) {
            var country_ids = get_son_ids(curParams.area_app_ids).toString().split(',');
            for (var i = 0; i < country_ids.length; i++) {
                var temresult = {
                    area_id: 0,
                    area: '',
                    country_id: 0,
                    country: '',
                    game: '',
                    app_id: 0,
                    source: 0,
                    active: 0,
                    register: 0,
                    createRole: 0,
                    cost: 0,
                    //newServerCreateRole: 0,
                    oneDayRetain: 0,
                    threeDayRetain: 0,
                    sevenDayRetain: 0,
                    rechage: 0,
                    registerRate: 0,
                    createRoleRate: 0,
                    activeCost: 0,
                    registerCost: 0,
                    createRoleCost: 0,
                   // newServerCreateRoleCost: 0,
                    roi: 0,
                    MonthCharge: 0,
                    MonthInstall: 0,
                    LTV: 0
                };
                for (var j = 0; j < tem.length; j++) {
                    if (Number(country_ids[i]) == tem[j].country_id) {
                        temresult.area_id = tem[j]['area_id'];
                        temresult.area = tem[j]['地区'];
                        temresult.country_id = tem[j]['country_id'];
                        temresult.country = tem[j]['国家'];
                        temresult.app_id = tem[j]['app_id'];
                        temresult.game = tem[j]['游戏'];
                        temresult.source = tem[j]['维度'];
                        temresult.active += Number(tem[j]['激活']);
                        temresult.register += Number(tem[j]['注册']);
                        temresult.createRole += Number(tem[j]['创角']);
                        temresult.cost += Number(tem[j]['花费']);

                        //temresult.newServerCreateRole += Number(tem[j]['新服创角']);
                        temresult.oneDayRetain += Number(tem[j]['次日留存']);
                        temresult.threeDayRetain += Number(tem[j]['3日留存']);
                        temresult.sevenDayRetain += Number(tem[j]['7日留存']);
                        temresult.rechage += Number(tem[j]['充值']);

                        temresult.MonthCharge += Number(tem[j]['MonthCharge']);
                        temresult.MonthInstall += Number(tem[j]['MonthInstall']);
                    }
                }
                temresult.registerRate = temresult.active != 0 ? Number((temresult.register / temresult.active).toFixed(2)) : 0;
                temresult.createRoleRate = temresult.active != 0 ? Number((temresult.createRole / temresult.active).toFixed(2)) : 0;
                temresult.activeCost = temresult.active != 0 ? Number((temresult.cost / temresult.active).toFixed(2)) : 0;
                temresult.registerCost = temresult.register != 0 ? Number((temresult.cost / temresult.register).toFixed(2)) : 0;
                temresult.createRoleCost = temresult.createRole != 0 ? Number((temresult.cost / temresult.createRole).toFixed(2)) : 0;
                //temresult.newServerCreateRoleCost = temresult.newServerCreateRole != 0 ? Number((temresult.cost / temresult.newServerCreateRole).toFixed(2)) : 0;
                temresult.roi = temresult.cost != 0 ? Number((temresult.recharge / temresult.cost)).toFixed(2) : 0;
                temresult.LTV = temresult.MonthInstall != 0 ? Number((temresult.MonthCharge / temresult.MonthInstall).toFixed(2)) : 0;
                result.push(temresult);
            }
        }

        else {
            var game_ids = get_son_ids(curParams.area_app_ids).toString().split(',');
            var temresult = {};
            for (var i = 0; i < game_ids.length; i++) {
                for (var j = 0; j < tem.length; j++) {
                    if (Number(game_ids[i]) == tem[j].app_id) {

                        temresult = tem[j];
                    }
                }
                result.push(temresult);
            }
        }
        return result;
    }

    function drawChart(data, chartID) {
        if ($scope.model == 0) {
            var chartData = caculateByArea(data);
            var categories = [];
            var seriesData = [
                {name: "激活", type: 'column', data: [], yAxis: 0},
                {name: "注册", type: 'column', data: [], yAxis: 0},
                {name: "创角", type: 'column', data: [], yAxis: 0},
                {name: "花费", type: 'column', data: [], yAxis: 0},
                {name: "新服创角", type: 'column', data: [], yAxis: 0},
                {name: "激活成本", type: 'column', data: [], yAxis: 1},
                {name: "注册成本", type: 'column', data: [], yAxis: 1},
                {name: "创角成本", type: 'column', data: [], yAxis: 1}
                //{name: "新服创角成本", type: 'column', data: [], yAxis: 1},
                //{name: "LTV", type: 'column', data: [], yAxis: 1}
            ];
            if (curParams.is_all_area) {
                var area_ids = get_son_ids(curParams.area_app_ids).toString().split(',');
                for (var i = 0; i < area_ids.length; i++) {
                    for (var j = 0; j < chartData.length; j++) {
                        if (chartData[j].area_id == Number(area_ids[i])) {
                            categories.push(chartData[j].area);
                            seriesData[0].data.push(chartData[j].active);
                            seriesData[1].data.push(chartData[j].register);
                            seriesData[2].data.push(chartData[j].createRole);
                            seriesData[3].data.push(chartData[j].cost);
                            //seriesData[4].data.push(chartData[j].newServerCreateRole);
                            seriesData[5].data.push(chartData[j].activeCost);
                            seriesData[6].data.push(chartData[j].registerCost);
                            seriesData[7].data.push(chartData[j].createRoleCost);
                            //seriesData[8].data.push(chartData[j].newServerCreateRoleCost);
                            //seriesData[9].data.push(chartData[j].LTV);
                        }
                    }
                }
            }
            else {
                var country_ids = get_son_ids(curParams.area_app_ids).toString().split(',');
                for (var i = 0; i < country_ids.length; i++) {
                    for (var j = 0; j < chartData.length; j++) {
                        if (chartData[j].country_id == Number(country_ids[i])) {
                            categories.push(chartData[j].country);
                            seriesData[0].data.push(chartData[j].active);
                            seriesData[1].data.push(chartData[j].register);
                            seriesData[2].data.push(chartData[j].createRole);
                            seriesData[3].data.push(chartData[j].cost);
                            //seriesData[4].data.push(chartData[j].newServerCreateRole);
                            seriesData[5].data.push(chartData[j].activeCost);
                            seriesData[6].data.push(chartData[j].registerCost);
                            seriesData[7].data.push(chartData[j].createRoleCost);
                            //seriesData[8].data.push(chartData[j].newServerCreateRoleCost);
                            //seriesData[9].data.push(chartData[j].LTV);
                        }
                    }
                }
            }
        }
        else if ($scope.model == 1) {
            var chartData = caculateByCountry(data);

            var categories = [];
            var seriesData = [
                {name: "激活", type: 'column', data: [], yAxis: 0},
                {name: "注册", type: 'column', data: [], yAxis: 0},
                {name: "创角", type: 'column', data: [], yAxis: 0},
                {name: "花费", type: 'column', data: [], yAxis: 0},
                {name: "激活成本", type: 'column', data: [], yAxis: 1},
                {name: "注册成本", type: 'column', data: [], yAxis: 1},
                {name: "创角成本", type: 'column', data: [], yAxis: 1}
                //{name: "LTV", type: 'column', data: [], yAxis: 1}
            ];
            if (curParams.is_all_country) {
                var country_ids = get_son_ids(curParams.area_app_ids).toString().split(',');
                for (var i = 0; i < data.result.length; i++) {
                    for (var j = 0; j < chartData.length; j++) {
                        if (chartData[j].country_id == Number(country_ids[i])) {
                            categories.push(chartData[j]['country']);
                            seriesData[0].data.push(chartData[j].active);
                            seriesData[1].data.push(chartData[j].register);
                            seriesData[2].data.push(chartData[j].createRole);
                            seriesData[3].data.push(chartData[j].cost);
                            seriesData[4].data.push(chartData[j].activeCost);
                            seriesData[5].data.push(chartData[j].registerCost);
                            seriesData[6].data.push(chartData[j].createRoleCost);
                            //seriesData[7].data.push(chartData[j].LTV);
                        }
                    }
                }
            }
            else {
                var game_ids = get_son_ids(curParams.area_app_ids).toString().split(',');
                for (var i = 0; i < data.result.length; i++) {
                    for (var j = 0; j < chartData.length; j++) {
                        if (chartData[j].app_id == Number(game_ids[i])) {
                            categories.push(chartData[j]['游戏']);
                            seriesData[0].data.push(Number(chartData[j]['激活']));
                            seriesData[1].data.push(Number(chartData[j]['注册']));
                            seriesData[2].data.push(Number(chartData[j]['创角']));
                            seriesData[3].data.push(Number(chartData[j]['花费']));
                            seriesData[4].data.push(Number(chartData[j]['激活成本']));
                            seriesData[5].data.push(Number(chartData[j]['注册成本']));
                            seriesData[6].data.push(Number(chartData[j]['创角成本']));
                            //seriesData[7].data.push(chartData[i]['MonthInstall'] != 0 ? Number((chartData[i]['MonthCharge'] / chartData[i]['MonthInstall']).toFixed(2)) : 0.00);
                        }
                    }
                }
            }
        }
        else if ($scope.model == 2) {
            var categories = [];
            var seriesData = [
                {name: "激活", type: 'column', data: [], yAxis: 0},
                {name: "注册", type: 'column', data: [], yAxis: 0},
                {name: "创角", type: 'column', data: [], yAxis: 0},
                {name: "花费", type: 'column', data: [], yAxis: 0},
                //{name: "新服创角", type: 'column', data: [],yAxis:0},
                {name: "激活成本", type: 'column', data: [], yAxis: 1},
                {name: "注册成本", type: 'column', data: [], yAxis: 1},
                {name: "创角成本", type: 'column', data: [], yAxis: 1}
                //{name: "新服创角成本", type: 'column', data: [],yAxis:1}
                //{name: "LTV", type: 'column', data: [], yAxis: 1}
            ];
            for (var i = 0; i < (data.result.length > 10 ? 10 : data.result.length); i++) {
                categories.push(data.result[i]['媒体']);
                seriesData[0].data.push(Number(data.result[i]['激活']));
                seriesData[1].data.push(Number(data.result[i]['注册']));
                seriesData[2].data.push(Number(data.result[i]['创角']));
                seriesData[3].data.push(Number(data.result[i]['花费']));
                //seriesData[4].data.push(Number(data.result[i]['新服创角']));
                seriesData[4].data.push(Number(data.result[i]['激活成本']));
                seriesData[5].data.push(Number(data.result[i]['注册成本']));
                seriesData[6].data.push(Number(data.result[i]['创角成本']));
                //seriesData[7].data.push(data.result[i]['MonthInstall'] != 0 ? Number((data.result[i]['MonthCharge'] / data.result[i]['MonthInstall']).toFixed(2)) : 0.00);
                //seriesData[8].data.push(Number(data.result[i]['新服创角成本']));
            }
        }
        drawHighChartDoubleLineCommon(categories, seriesData, chartID);
    }

    /**
     * 绑定排序参数
     * @param data
     * @returns {Array}
     */
    function renderTableData(data) {
        var result = [];
        var temdata = data;
        $scope.sortType = [];
        $scope.sortStatus = [];
        $scope.clickType = [];

        for (var i = 0; i < temdata.length; i++) {
            if (i == 0) {
                result.push({
                    area: temdata[i]["area"],
                    area_id: temdata[i]["area_id"],
                    country: temdata[i]["country"],
                    country_id: temdata[i]['country_id'],
                    games: [temdata[i]],
                    sortType: "sort",
                    sortStatus: false,
                    sortCount: 0,
                    clickType: null
                });
                $scope.sortType.push("active");
                $scope.sortStatus.push(true);
                $scope.count.push(0);
                $scope.clickType.push(null);
            }
            else if (temdata[i]["country"] != temdata[i - 1]["country"]) {
                result.push({
                    area: temdata[i]["area"],
                    area_id: temdata[i]["area_id"],
                    country: temdata[i]["country"],
                    country_id: temdata[i]['country_id'],
                    games: [temdata[i]],
                    sortType: "sort",
                    sortStatus: false,
                    sortCount: 0,
                    clickType: null
                });
                $scope.sortType.push("active");
                $scope.sortStatus.push(true);
                $scope.clickType.push(null);
            }
            else {
                result[result.length - 1].games.push(temdata[i]);
            }
        }
        return result;
    }


    /**
     * 获取地区 国家 游戏 数据源
     */
    function getDataSource() {
        $http({
            url: '/api/reportmap/getAreaCountryGame',
            method: 'GET'
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length < 1) {
                    $scope.noData = true;
                    return;
                } else {
                    $scope.noData = false;
                }

                $scope.dataSource = data.result;

            } else {
                //pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            //pop('error','链接异常',data);
        });
    }

    function get_son_ids(area_app_ids) {
        var result = '';

        if ($scope.model == '0') {
            if (curParams.is_all_area) {//多id即为全部返回本身
                return area_app_ids;
            }
            else {//单id在自动查找子级id返回子级id
                for (var i = 0; i < $scope.dataSource.length; i++) {
                    if (area_app_ids == $scope.dataSource[i].parent_id) {
                        result += $scope.dataSource[i].unite_id + ',';
                    }
                }
                result = result.substr(0, result.length - 1);
                return result;
            }
        }
        else if ($scope.model == '1') {
            if (curParams.is_all_country) {//多id即为全部返回本身
                return area_app_ids;
            }
            else {//单id在自动查找子级id返回子级id
                for (var i = 0; i < $scope.dataSource.length; i++) {
                    if (area_app_ids == $scope.dataSource[i].parent_id) {
                        result += $scope.dataSource[i].unite_id + ',';
                    }
                }
                result = result.substr(0, result.length - 1);
                return result;
            }
        }
        else if ($scope.model == '2') {
            return area_app_ids;
        }
    }

    app.filter('rateItems', function () {
        return function (item) {
            var str = item + "%";
            return str;
        }
    });
    $scope.area_col = 'active';
    $scope.area_desc = 1;
    $scope.country_col = 'active';
    $scope.country_desc = 1;
    $scope.game_col = 'media';
    $scope.game_desc = 0;

    function refreshData() {
        if (curParams) {
            if (curParams.model_state == 0) {
                getComData();
            }
            else if (curParams.model_state == 1) {
                getComData();
            }
            else if (curParams.model_state == 2) {
                getMediaData();
            }

        }
    }
    function renderStackingChart(data,type){
        var series = [{
                name: 'Android',
                data: []
            }, {
                name: 'IOS',
                data: []
            }
        ];
        var categories = [];
        for(var i = 0;i<data.length;i++){
            if(i%2==0) {
                    categories.push(data[i].媒体)
                if(type == 'CPA') {
                    if (Number(data[i]["创角"]) == 0) series[0].data.push(0);
                    else
                        series[0].data.push(Number((Number(data[i]["花费"]) / Number(data[i]["创角"])).toFixed(2)));
                }
                else
                    series[0].data.push(Number(data[i][type]));
            }else {
                if (type == 'CPA') {
                if (Number(data[i]["创角"]) == 0) series[1].data.push(0);
                else
                    series[1].data.push(Number((Number(data[i]["花费"]) / Number(data[i]["创角"])).toFixed(2)));
                }
                else
                     series[1].data.push(Number(data[i][type]));
            }

        }
        $('#MarketReportChart3').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: type
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: type
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        '总量: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: series
        });
    }
    var stackChartData = [];
    $scope.changeStackState = function (type) {
        switch (type){
            case 1:renderStackingChart(stackChartData,'花费');break;
            case 2:renderStackingChart(stackChartData,'激活');break;
            case 3:renderStackingChart(stackChartData,'注册');break;
            case 4:renderStackingChart(stackChartData,'CPA');break;
            case 5:renderStackingChart(stackChartData,'注册率');break;
        }


    }
}])

/**
 * Created by weiqiang.yu on 2016/3/15.
 */
'use strict';
;