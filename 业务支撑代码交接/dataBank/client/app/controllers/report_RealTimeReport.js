/**
 * Created by weiqiang.yu on 2016/3/16.
 */
'use strict';
app.controller('RealTimeReportController', function ($rootScope, $scope, $http, $timeout) {

    $scope.os = {selected: {name: 'IOS&Android', os: '0,1'}};
    $scope.dataSource = [];
    $scope.areaSource = [];
    $scope.countrySource = [];
    $scope.gameSource = [];

    $scope.areaLevel = {};
    getOSSource();
    getDataSource();

    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    $scope.datePickerType=2;
    var startDate = moment().add($scope.datePickerDayDiff - 1, 'days').format('YYYY-MM-DD');
    var endDate = moment().add($scope.datePickerDayDiff - 1, 'days').format('YYYY-MM-DD');
    $scope.initData = {
        flag: true,
        areaActive: true,
        countryActive: false,
        gameActive: false,
        countryDisabled: true,
        gameDisabled: true,
        opened: false,
        curDate: moment().format('YYYY-MM-DD'),
        rangeDate: {startDate: startDate, endDate: endDate}
    };
    $scope.today = function () {
        $scope.initData.curDate = moment().format('YYYY-MM-DD');
    };
    $scope.today();

    $scope.clear = function () {
        $scope.initData.curDate = null;
    };
    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.initData.opened = true;
    };

    // 切换单时间 和 时间范围控件显示
    $scope.$watch('datePickerType', function (newValue, oldValue) {
        if (newValue == 2) {
            $scope.singleDatePicker = true;
        } else {
            $scope.singleDatePicker = false;
        }
    });

    // 初始化单时间选择控件
    //var initCurDate = true;
    //$scope.$watch('initData.curDate', function (newValue, oldValue) {
    //    if (newValue && !initCurDate) {
    //        //$scope.$emit("oasQuery", obj);
    //        $scope.query();
    //    } else {
    //        initCurDate = false;
    //    }
    //});

    /**
     * 显示选择地区国家游戏div
     * @param event
     */
    $scope.showSelectDIV = function (event) {
        $('#agentContent').toggle();
        $('#agentContent').css('position', 'absolute');
        $('#agentContent').css('margin-top', '3px');
        $('#agentContent').css('z-index', 888);
    };
    /**
     * 关闭选择地区国家游戏div
     * @param event
     */
    $scope.closeSelectDIV = function () {
        $scope.showSelectDIV();
    };
    /**
     * 选择地区时触发
     * @param areaItem
     */
    $scope.clickArea = function (areaItem) {
        $scope.ClickAreaSet(areaItem);

    };
    // 选择国家时触发
    $scope.clickCountry = function (countryItem) {
        $scope.ClickCountrySet(countryItem);
    };
    // 选择游戏时触发
    $scope.clickGame = function (gameItem) {
        $scope.ClickGameSet(gameItem);
    };
    $scope.ClickAreaSet = function (areaItem) {
        $scope.areaLevel = {selected: areaItem};
        $scope.countryLevel = null;
        $scope.gameLevel = null;
        $scope.initData.countryDisabled = false;
        $scope.initData.countryActive = true;
        $scope.initData.gameDisabled = true;
        $scope.initData.gameActive = false;

        $scope.countrySource = [];
        getCountrySource();
    };
    $scope.ClickCountrySet = function (countryItem) {
        $scope.countryLevel = {selected: countryItem};
        $scope.gameLevel = null;
        $scope.initData.gameDisabled = false;
        $scope.initData.gameActive = true;

        $scope.gameSource = [];
        getGameSource();
    };
    $scope.ClickGameSet = function (gameItem) {
        $scope.gameLevel = {selected: gameItem};
        if ($('#agentContent').css('display') == 'block') {
            $scope.showSelectDIV();
        }
    };

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
                getAreaSource();  //获取地区数据源
                $scope.query();

            } else {
                //pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            //pop('error','链接异常',data);
        });
    }
    /**
     * 获取地区数据源
     */
    function getAreaSource() {
        $scope.areaSource.push({unite_id: 0, parent_id: 0, area_app_name: '全部地区', sort: 0});
        $scope.areaLevel = {selected: $scope.areaSource[0]};
        for (var i = 0; i < $scope.dataSource.length; i++) {
            var temp = $scope.dataSource[i];
            if (temp.parent_id == 1) {
                $scope.areaSource.push(temp);
            }
        }
        $scope.areaSource.sort(function (a, b) {
            return a.sort - b.sort
        });
        console.log('地区初始化成功');
    }

    /**
     * 获取国家数据源
     */
    function getCountrySource() {
        $scope.countrySource.push({unite_id: 0, parent_id: 0, area_app_name: '全部国家', sort: 0});

        if ($scope.areaLevel.selected.unite_id != 0) {

            for (var i = 0; i < $scope.dataSource.length; i++) {
                if ($scope.areaLevel.selected.unite_id == $scope.dataSource[i].parent_id) {
                    $scope.countrySource.push($scope.dataSource[i]);
                }
            }
        }
        else {
            //取地区
            var temarea = [];
            for (var i = 0; i < $scope.areaSource.length; i++) {
                if ($scope.areaSource[i].unite_id != 0) {
                    temarea.push($scope.areaSource[i]);
                }
            }
            //取国家
            for (var i = 0; i < $scope.dataSource.length; i++) {
                for (var j = 0; j < temarea.length; j++)
                    if ($scope.dataSource[i].parent_id == temarea[j].unite_id) {
                        $scope.countrySource.push($scope.dataSource[i]);
                    }
            }
        }
        $scope.countrySource.sort(function (a, b) {
            return a.sort - b.sort
        });
        console.log('国家初始化成功');
    }


    /**
     * 获取游戏数据源
     */
    function getGameSource() {
        $scope.gameSource.push({unite_id: 0, parent_id: 0, area_app_name: '全部游戏', sort: 0});
        if ($scope.countryLevel.selected.unite_id == 0)   //全部国家
        {
            if ($scope.areaLevel.selected.unite_id == 0) {
                //取地区
                var temarea = [];
                var temcountry = [];
                for (var i = 0; i < $scope.areaSource.length; i++) {
                    if ($scope.areaSource[i].unite_id != 0) {
                        temarea.push($scope.areaSource[i]);
                    }
                }
                //取国家
                for (var i = 0; i < $scope.dataSource.length; i++) {
                    for (var j = 0; j < temarea.length; j++)
                        if ($scope.dataSource[i].parent_id == temarea[j].unite_id) {
                            temcountry.push($scope.dataSource[i]);
                        }
                }
                //取游戏
                for (var i = 0; i < $scope.dataSource.length; i++) {
                    for (var j = 0; j < temcountry.length; j++)
                        if ($scope.dataSource[i].parent_id == temcountry[j].unite_id) {
                            $scope.gameSource.push($scope.dataSource[i]);
                        }
                }

            }
            else {
                //取国家
                var temcountry = [];
                for (var i = 0; i < $scope.countrySource.length; i++) {
                    if ($scope.countrySource[i].unite_id != 0) {
                        temcountry.push($scope.countrySource[i]);
                    }
                }
                //取游戏
                for (var i = 0; i < $scope.dataSource.length; i++) {
                    for (var j = 0; j < temcountry.length; j++)
                        if ($scope.dataSource[i].parent_id == temcountry[j].unite_id) {
                            $scope.gameSource.push($scope.dataSource[i]);
                        }
                }
            }
        }
        else {
            for (var i = 0; i < $scope.dataSource.length; i++) {
                var temp = $scope.dataSource[i];
                if ($scope.countryLevel.selected.unite_id == temp.parent_id) {
                    $scope.gameSource.push(temp);
                }
            }
        }
        $scope.gameSource.sort(function (a, b) {
            return a.sort - b.sort
        });
        console.log('游戏初始化成功');
    }
    /**
     * 获取系统数据源
     */
    function getOSSource() {
        var data = {
            code: 0,
            result: [
                {name: 'IOS&Android', os: '0,1'},
                {name: 'IOS', os: 0},
                {name: 'Android', os: 1}
            ],
            msg: ''
        };
        $scope.AppOS = data.result;
        console.log('OS初始化成功');
    }



    var curParams = null;
    $scope.$on("reportRealTimeComParams", function (event, params) {
        curParams = params;
        refreshData();
    });


    var firstTimeExcuteFunction = true;
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
        ;
    }
    function drawRealtimeChart(table) {
        var installs = [],regs = [],acts = [],catagory = [];
        for(var i = 0;i<table.length;i++){
            var data = table[i];
            if(i == 0) catagory = data.data.map(function (di) {
                return di.count_time;
            });
            installs.push({name:data.count_date,data:data.data.map(function (di) {
                return di.installs;
            })});
        }
        for(var i = 0;i<table.length;i++){
            var data = table[i];
            regs.push({name:data.count_date,data:data.data.map(function (di) {
                return di.regs;
            })});
        }
        for(var i = 0;i<table.length;i++){
            var data = table[i];
            acts.push({name:data.count_date,data:data.data.map(function (di) {
                return di.acts;
            })});
        }
        drawHighChartLine(catagory,installs,"realTimeInstallChart");
        drawHighChartLine(catagory,regs,"realTimeRegChart");
        drawHighChartLine(catagory,acts,"realTimeActChart");
    }
    function getDayData(count_date,data) {
        var result = [];
        for(var i = 0;i<data.length;i++) {
            var di = data[i];
            if (di.count_time.indexOf(count_date) >= 0)
                    result.push({
                        count_time: moment(di.count_time).format("HH:mm"),
                        installs: Number(di.激活),
                        regs: Number(di.注册),
                        acts: Number(di.创角)
                    });
        }
        return {
            count_date:count_date,
            data:result};
    }
    function getData() {
        $http({
            url: '/api/reportmap/hourlyRp',
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
                var result = [];
                result.push(getDayData(curParams.date1,data.result));
                result.push(getDayData(moment(curParams.date1).add(1,'days').format('YYYY-MM-DD'),data.result));
                result.push(getDayData(moment(curParams.date1).add(2,'days').format('YYYY-MM-DD'),data.result));
                drawRealtimeChart(result);

            } else {

            }
        }).error(function () {

        });
    }

    /**
     * 获取选中的游戏 国家 或者地区id
     * area_app_ids
     */
    function get_area_app_ids() {
        var result = '';

        if ($scope.gameLevel != null) {
            if ($scope.gameLevel.selected.unite_id == 0) {
                for (var i = 0; i < $scope.gameSource.length; i++) {
                    if ($scope.gameSource[i].unite_id != 0) {
                        result += $scope.gameSource[i].unite_id + ',';
                    }
                }
                result = result.substr(0, result.length - 1);
            }
            else {
                result = $scope.gameLevel.selected.unite_id;
            }

        }
        else {
            if ($scope.countryLevel != null) {
                if ($scope.countryLevel.selected.unite_id == 0) {
                    for (var i = 0; i < $scope.countrySource.length; i++) {
                        if ($scope.countrySource[i].unite_id != 0) {
                            result += $scope.countrySource[i].unite_id + ',';

                        }
                    }
                    result = result.substr(0, result.length - 1);
                }
                else {
                    result = $scope.countryLevel.selected.unite_id;
                }
            }
            else {
                if ($scope.areaLevel != null) {
                    if ($scope.areaLevel.selected.unite_id == 0) {
                        for (var i = 0; i < $scope.areaSource.length; i++) {
                            if ($scope.areaSource[i].unite_id != 0) {
                                result += $scope.areaSource[i].unite_id + ',';

                            }
                        }
                        result = result.substr(0, result.length - 1);
                    }
                    else {
                        result = $scope.areaLevel.selected.unite_id;
                    }
                }
            }
        }

        return result;
    }
    $scope.query= function () {
        curParams = {
            date1: moment($scope.initData.curDate).subtract(2,'days').format('YYYY-MM-DD'),// $scope.date.startDate,     // moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD')
            date2: moment($scope.initData.curDate).format('YYYY-MM-DD'),//$scope.date.endDate,
            in_os: $scope.os.selected.os,
            area_app_ids: get_area_app_ids()
        };
        refreshData();
    };
    function refreshData() {
        if (curParams) {
            getData();
        }
    }

    function excFunc() {
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();

        var wait = 61 - min;
        if (wait > 60) {
            wait = min - 60;
        }
        if (firstTimeExcuteFunction) {
            firstTimeExcuteFunction = false;
        } else {
            if ($("#RealtimeModel").hasClass('show')) {
                refreshData();
            } else {

            }
        }
        setTimeout(excFunc, wait * 60000);
    }

    excFunc();

});