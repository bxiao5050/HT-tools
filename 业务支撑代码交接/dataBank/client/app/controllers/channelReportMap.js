/**
 * Created by weiqiang.yu on 2016/3/15.
 */
/**
 * Created by xiaoyi on 2015/7/24.
 */

'use strict';
app.controller('ChannelReportMapController', ['$rootScope', '$scope', '$http', '$timeout','$params','toaster',
    function ($rootScope, $scope, $http, $timeout, $params,toaster) {
    var curParams = null;
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };
    var getDate = function(date,day,month,year){
        var now_year = date.getFullYear();
        var now_month = date.getMonth()+1;
        var now_day = date.getDate();
        if(now_month == 0 && month == -1) {
            now_year = now_year - 1;
            now_month =  13;
        }
        if(now_month == 12 && month == 1) {
            now_year = now_year + 1;
            now_month = 0;
        }
        if(day == undefined)
            day = -now_day - 1;
        return (now_year+year)+'-'+(now_month+month)+'-'+(now_day+day);

    };
    var getPreDate = function(day){
        var result = new Date((new Date()) - day*1000*60*60*24);
        return result.getFullYear()+'-'+(result.getMonth()+1)+'-'+result.getDate();
    }
    var getLastDate = function(){
        var result = new Date((new Date().setDate(1)) - 1000*60*60*24);
        return result.getFullYear()+'-'+(result.getMonth()+1)+'-'+result.getDate();
    }
    var now = new Date();
    $scope.date = [];
    $scope.RealReportTime = '';
    $scope.dt_options = {
        ranges: {
            "今天": [
                getPreDate(0),
                getPreDate(0)
            ],
            "昨天": [
                getPreDate(1),
                getPreDate(1)
            ],
            "近7天": [
                getPreDate(8),
                getPreDate(1)
            ],
            "近30天": [
                getPreDate(31),
                getPreDate(1)
            ],
            "本月": [
                getDate(new Date(), undefined, 0, 0),
                getDate(new Date(), 0, 0, 0)
            ],
            "上月": [
                getDate(new Date(), undefined, -1, 0),
                getLastDate()
            ]
        },
        "alwaysShowCalendars": true,
        "linkedCalendars": false,
        startDate: getDate(now, 0, 0, 0),
        endDate: getDate(now, 0, 0, 0),
        opens: "left"
    };
    $scope.dataSource = [];
    $scope.os = {selected: {name: '全部', os: '0,1'}};
    $scope.areaSource = [];
    $scope.countrySource = [];
    $scope.gameSource = [];

    $scope.tipCountry = [];
    $scope.tipGame = [];

    $scope.areaLevel = null;
    $scope.isAllArea = true;
    $scope.isAllCountry = false;
    $scope.isAllGame = false;

    $scope.PageState = 0; //页面状态  0代表综合报表 /地区/国家 游戏报表(显示游戏下所有媒体) 1代表每日 综合/地区/国家报表 2代表每日媒体报表
    $scope.ModelState = 0;  //模块状态  PageState为0： 0代表综合报表  1代表 地区/国家 2代表游戏 PageState为1：0代表每日综合  1代表每日地区  2代表每日游戏  PageState为2时：0代表每日媒体

    $scope.ReportTitle = '报表';

    getOSSource();   //获取系统数据源
    getDataSource(); //获取数据源

    /**************************************************************************************/
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    var startDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    var endDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    $scope.initData = {
        flag: true,
        areaActive: false,
        countryActive: true,
        gameActive: false,
        countryDisabled: false,
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
    $scope.datetype = {selected: {id: 0, name: '自定义日期'}};
    $scope.dateTypes = [{id: 0, name: '自定义日期'},
        {id: 1, name: '今天'},
        {id: 2, name: '昨天'},
        {id: 3, name: '前天'},
        {id: 4, name: '本周'},
        {id: 5, name: '上周'},
        {id: 6, name: '本月'},
        {id: 7, name: '上月'}];
    $scope.$watch('datetype.selected', function (newValue, oldValue) {
        $scope.datetype.selected = newValue;
        $scope.dateChange($scope.datetype.selected.id);
    });
    $scope.dateChange = function (datetype) {
        switch (datetype) {
            case 0:
                $('#rangDateControl').focus();
                break;
            case 1:
                $scope.initData.rangeDate = {
                    startDate: moment().format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD')
                };
                break;
            case 2:
                $scope.initData.rangeDate = {
                    startDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
                    endDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD')
                };
                break;
            case 3:
                $scope.initData.rangeDate = {
                    startDate: moment().add($scope.datePickerDayDiff - 1, 'days').format('YYYY-MM-DD'),
                    endDate: moment().add($scope.datePickerDayDiff - 1, 'days').format('YYYY-MM-DD')
                };
                break;
            case 4:
                $scope.initData.rangeDate = {
                    startDate: moment().weekday(1).format('YYYY-MM-DD'),
                    endDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD')
                };
                break;
            case 5:
                $scope.initData.rangeDate = {
                    startDate: moment().add($scope.datePickerDayDiff, 'week').weekday(1).format('YYYY-MM-DD'),
                    endDate: moment().weekday(0).format('YYYY-MM-DD')
                };
                break;
            case 6:
                $scope.initData.rangeDate = {
                    startDate: moment().set('date', 1).format('YYYY-MM-DD'),
                    endDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD')
                };
                break;
            case 7:
                $scope.initData.rangeDate = {
                    startDate: moment().add($scope.datePickerDayDiff, 'month').set('date', 1).format('YYYY-MM-DD'),
                    endDate: moment().add($scope.datePickerDayDiff, 'month').endOf('month').format('YYYY-MM-DD')
                };
                break;

        }
    };
    // 初始化单时间选择控件
    //var initRangeDate = true;
    //$scope.$watch('initData.rangeDate', function (newValue, oldValue) {
    //    if (newValue && !initRangeDate) {
    //        //$scope.$emit("oasQuery", obj);
    //        //$scope.query();
    //    } else {
    //        initRangeDate = false;
    //    }
    //});

    //curParams.date1=moment(moment($scope.initData.curDate).format('YYYY-MM-DD')).format('YYYY-MM-DD'),  //取但是时间参数
    //curParams.date1= moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),   //取多时间参数

    /*********************************************************************************/


    /**
     * 显示选择地区国家游戏div
     * @param event
     */
    //$scope.showSelectDIV = function (event) {
    //    $('#agentContent').toggle();
    //    $('#agentContent').css('position', 'absolute');
    //    $('#agentContent').css('margin-top', '3px');
    //    $('#agentContent').css('z-index', 888);
    //};
    /**
     * 关闭选择地区国家游戏div
     * @param event
     */
    //$scope.closeSelectDIV = function () {
    //    $scope.showSelectDIV();
    //};

    /**
     * 选择地区时触发
     * @param areaItem
     */
    $scope.clickArea = function (areaItem) {
        $scope.ClickAreaSet(areaItem);
        $scope.query();

    };
    // 选择国家时触发
    $scope.clickCountry = function (countryItem) {
        $scope.ClickCountrySet(countryItem);
        $scope.query();
    };
    // 选择游戏时触发
    $scope.clickGame = function (gameItem) {
        $scope.ClickGameSet(gameItem);
        $scope.query();
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

        if ($scope.radioModel == 'ComReport') {
            //$scope.IsDaily = false;
            $scope.PageState = 0;
            $scope.ModelState = 0;
        }
        else if ($scope.radioModel == 'DailyReport') {
            $scope.PageState = 1;
            $scope.ModelState = 0;
        }
    };
    $scope.ClickCountrySet = function (countryItem) {
        $scope.countryLevel = {selected: countryItem};
        $scope.gameLevel = null;
        $scope.initData.gameDisabled = false;
        $scope.initData.gameActive = true;

        $scope.gameSource = [];
        getGameSource();
        if ($scope.radioModel == 'ComReport') {
            $scope.PageState = 0;
            $scope.ModelState = 1;
        }
        else if ($scope.radioModel == 'DailyReport') {
            $scope.PageState = 1;
            $scope.ModelState = 1;
        }
    };
    $scope.ClickGameSet = function (gameItem) {
        $scope.gameLevel = {selected: gameItem};

        //if ($('#agentContent').css('display') == 'block') {
        //    $scope.showSelectDIV();
        //}

        if ($scope.radioModel == 'ComReport') {
            //$scope.IsDaily = false;
            $scope.PageState = 0;
            $scope.ModelState = 2;
        }
        else if ($scope.radioModel == 'DailyReport') {
            $scope.PageState = 1;
            $scope.ModelState = 2;
        }
    };

    /**
     * 获取选中的游戏 国家 或者地区id
     * area_app_ids
     */
    function get_area_app_ids() {
        var result = '';

        if ($scope.gameLevel != null) {
            if ($scope.gameLevel.selected.unite_id == 0) {
                $scope.isAllGame = true;
                $scope.isAllCountry = false;
                $scope.isAllArea = false;
                for (var i = 0; i < $scope.gameSource.length; i++) {
                    if ($scope.gameSource[i].unite_id != 0) {
                        result += $scope.gameSource[i].unite_id + ',';
                    }
                }
                result = result.substr(0, result.length - 1);
            }
            else {
                $scope.isAllGame = false;
                $scope.isAllCountry = false;
                $scope.isAllArea = false;
                result = $scope.gameLevel.selected.unite_id;
            }

        }
        else {
            if ($scope.countryLevel != null) {
                if ($scope.countryLevel.selected.unite_id == 0) {
                    $scope.isAllGame = false;
                    $scope.isAllCountry = true;
                    $scope.isAllArea = false;
                    for (var i = 0; i < $scope.countrySource.length; i++) {
                        if ($scope.countrySource[i].unite_id != 0) {
                            result += $scope.countrySource[i].unite_id + ',';

                        }
                    }
                    result = result.substr(0, result.length - 1);
                }
                else {
                    $scope.isAllGame = false;
                    $scope.isAllCountry = false;
                    $scope.isAllArea = false;
                    result = $scope.countryLevel.selected.unite_id;
                }
            }
            else {
                if ($scope.areaLevel != null) {
                    if ($scope.areaLevel.selected.unite_id == 0) {
                        $scope.isAllGame = false;
                        $scope.isAllCountry = false;
                        $scope.isAllArea = true;
                        for (var i = 0; i < $scope.areaSource.length; i++) {
                            if ($scope.areaSource[i].unite_id != 0) {
                                result += $scope.areaSource[i].unite_id + ',';

                            }
                        }
                        result = result.substr(0, result.length - 1);
                    }
                    else {
                        $scope.isAllGame = false;
                        $scope.isAllCountry = false;
                        $scope.isAllArea = false;
                        result = $scope.areaLevel.selected.unite_id;
                    }
                }
            }
        }

        return result;
    }

    /**
     * 获取系统数据源
     */
    function getOSSource() {
        var data = {
            code: 0,
            result: [
                {name: '全部', os: '0,1'},
                {name: 'IOS', os: 0},
                {name: 'Android', os: 1}
            ],
            msg: ''
        };
        $scope.AppOS = data.result;
        console.log('OS初始化成功');
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
                getTipSource();
                getAreaSource();  //获取地区数据源
                getCountrySource();
                $scope.query();

                /**
                 * 监听页面状态
                 */
                $scope.$watch('PageState', function (newValue, oldValue) {
                    CheckPageState(newValue, oldValue);
                });
                /**
                 * 监听页面模块状态
                 */
                $scope.$watch('ModelState', function (newValue, oldValue) {
                    CheckPageState($scope.PageState, $scope.PageState);
                });

            } else {
                //pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            //pop('error','链接异常',data);
        });
    }

    $scope.radioModel = 'ComReport';
    /**
     * 监听是否每日报表
     */
    $scope.$watch('radioModel', function (newValue, oldValue) {
        CheckIsDaily(newValue, oldValue);
        $scope.query();
    });
    /**
     * 监测是否是每日报表
     */
    function CheckIsDaily(newValue, oldValue) {
        if (newValue) {
            if (newValue == 'ComReport') {
                $scope.PageState = 0;
            }
            else if (newValue == 'DailyReport') {
                $scope.PageState = 1;
            }
            if ($scope.PageState == 2) {
                //$scope.IsDaily = false;
                $scope.ModelState = 0;
            }
        }
    }

    /**
     * 监测页面状态方法
     */
    function CheckPageState(newValue, oldValue) {
        if (newValue == 0) {
            //$('#ComModel').add('show')
            //$('#dailyLabel').removeClass('btn-primary').addClass('btn-success');
            //$('#comLabel').removeClass('btn-success').addClass('btn-primary');
            $('#ComModel').removeClass('hidden').addClass('show');
            $('#DailyModel').removeClass('show').addClass('hidden');
            $('#MediaModel').removeClass('show').addClass('hidden');
            $('#comLabel').css('display', 'block');
            $('#dailyLabel').css('display', 'block');
            switch ($scope.ModelState) {
                case 1:
                    $scope.ReportTitle = '报表';
                    break;
                case 2:
                    $scope.ReportTitle = '报表';
                    break;
                default :
                    $scope.ReportTitle = '报表';
                    break;
            }
        }
        else if (newValue == 1) {
            //$('#DailyModel').tab('show')
            //$('#comLabel').removeClass('btn-primary').addClass('btn-success');
            //$('#dailyLabel').removeClass('btn-success').addClass('btn-primary');
            $('#ComModel').removeClass('show').addClass('hidden');
            $('#DailyModel').removeClass('hidden').addClass('show');
            $('#MediaModel').removeClass('show').addClass('hidden');
            $('#comLabel').css('display', 'block');
            $('#dailyLabel').css('display', 'block');
            switch ($scope.ModelState) {
                case 1:
                    $scope.ReportTitle = '每日报表';
                    break;
                case 2:
                    $scope.ReportTitle = '每日报表';
                    break;
                default :
                    $scope.ReportTitle = '每日报表';
                    break;
            }
        }
        else if (newValue == 2) {
            $('#ComModel').removeClass('show').addClass('hidden');
            $('#DailyModel').removeClass('show').addClass('hidden');
            $('#MediaModel').removeClass('hidden').addClass('show');
            $('#comLabel').css('display', 'none');
            $('#dailyLabel').css('display', 'none');
            $scope.ReportTitle = '每日媒体报表';
        }
    }

    $scope.tipIsOpen = false;
    $scope.tipIsOpenChange = function () {
        if (!$scope.tipIsOpen) {
            $scope.tipIsOpen = true;
        }
        else {
            $scope.tipIsOpen = false;
        }
    };
    $scope.$watch('tipIsOpen', function (newValue, oldValue) {
        if (newValue) {
            $('#ShowContainer').css('display', 'block');
        }
        else {
            $('#ShowContainer').css('display', 'none');
        }
    });
    $scope.tipHover = function () {
        if (!$scope.tipIsOpen) {
            $('#ShowContainer').css('display', 'block');
        }
    };
    $scope.tipOut = function () {
        if (!$scope.tipIsOpen) {
            $('#ShowContainer').css('display', 'none');
        }
    };
    var oldSelect = null;
    var parUL = null;
    $scope.selectedTipItem = function ($event) {
        var ele = $($event.currentTarget).next();
        oldSelect = ele;
        if (oldSelect.parent().hasClass('open')) return;
        parUL = ele.parent().parent();
        parUL.children().each(function () {
            $(this).removeClass('open');
            $(this).children('.submenu').css('display', 'none');
        });
        oldSelect.parent().addClass('open');
        oldSelect.css("display", "block");
        $event.stopPropagation();


    };

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

    function getTipSource() {
        //取地区
        var temarea = [];
        var temcountry = [];
        for (var i = 0; i < $scope.dataSource.length; i++) {
            if ($scope.dataSource[i].parent_id == 1) {
                temarea.push($scope.dataSource[i]);
            }
        }
        //取国家
        for (var i = 0; i < $scope.dataSource.length; i++) {
            for (var j = 0; j < temarea.length; j++)
                if ($scope.dataSource[i].parent_id == temarea[j].unite_id) {
                    temcountry.push($scope.dataSource[i]);
                    $scope.tipCountry.push($scope.dataSource[i]);
                }
        }
        //取游戏
        for (var i = 0; i < $scope.dataSource.length; i++) {
            for (var j = 0; j < temcountry.length; j++)
                if ($scope.dataSource[i].parent_id == temcountry[j].unite_id) {
                    $scope.tipGame.push($scope.dataSource[i]);
                }
        }
        $scope.tipCountry.sort(function (a, b) {
            return a.sort - b.sort
        });
        $scope.tipGame.sort(function (a, b) {
            return a.sort - b.sort
        });
    }

    /**
     * 综合报表页面点击国家时切换表格 同步切换选择的国家
     */
    $scope.$on('SelectTableCountry', function (event, item) {
        var select = {};
        for (var i = 0; i < $scope.dataSource.length; i++) {
            if ($scope.dataSource[i].unite_id == item) {
                select = $scope.dataSource[i];
            }
        }

        $scope.ClickAreaSet({unite_id: 0, parent_id: 0, area_app_name: '全部地区', sort: 0});
        $scope.ClickCountrySet(select);
        //getCountrySource();
        //$scope.countryLevel={selected:select};
        $scope.ModelState = 1;

        $scope.query();
    });

    /**
     * 综合报表页面点击游戏时切换表格 同步切换选择的游戏
     */
    $scope.$on('SelectTableGame', function (event, item) {
        var select = {};
        for (var i = 0; i < $scope.dataSource.length; i++) {
            if ($scope.dataSource[i].unite_id == item) {
                select = $scope.dataSource[i];
            }
        }
        $scope.ClickAreaSet({unite_id: 0, parent_id: 0, area_app_name: '全部地区', sort: 0});
        $scope.ClickCountrySet({unite_id: 0, parent_id: 0, area_app_name: '全部国家', sort: 0});
        $scope.ClickGameSet(select);

        $scope.ModelState = 2;
        $scope.query();
    });
    /**
     * 游戏报表点击媒体，跳转到每日媒体页面
     */
    $scope.$on('tableGameToMedia', function (event, item) {
        $scope.selectMedia = item.media;
        $scope.mediaList = item.mediaList;
        $scope.PageState = 2;
        $scope.ModelState = 0;
        $scope.query();
    });
    /**
     * 点击浮动框中游戏同步查询
     */
    $scope.clickTipGame = function (game_id) {
        var select = {};
        var count = {};
        for (var i = 0; i < $scope.dataSource.length; i++) {
            if ($scope.dataSource[i].unite_id == game_id) {
                select = $scope.dataSource[i];
            }
        }
        for (var i = 0; i < $scope.dataSource.length; i++) {
            if ($scope.dataSource[i].unite_id == select.parent_id) {
                count = $scope.dataSource[i];
            }
        }
        $scope.ClickAreaSet({unite_id: 0, parent_id: 0, area_app_name: '全部地区', sort: 0});
        $scope.ClickCountrySet(count);
        $scope.ClickGameSet(select);

        $scope.ModelState = 2;
        $scope.query();
    };
    $scope.mailImage = "";
	$scope.createMail = function () {
        var count_date = moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD');
        $http({
            url: '/api/reportmap/getMail',
            method: 'GET',
            params: {
                count_date:count_date
            }
        }).success(function (data, header, config, status) {
            $scope.mailImage = data.result.path;
            $('#showImageModel').modal('show')
        }).error(function (data, header, config, status) {
            pop('error','error',data.msg);
        })
    }
    $scope.getMail = function () {
        var count_date = moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD');
		$scope.mailImage = "/oasDownExcel/image/"+count_date+".jpeg";
        $('#showImageModel').modal('show')
    }
    $scope.sendMail = function () {
        var count_date = moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD');
        $http({
            url: '/api/reportmap/sendMail',
            method: 'GET',
            params: {
                count_date:count_date
            }
        }).success(function (data, header, config, status) {
            pop('success','success',data.result);
        }).error(function (data, header, config, status) {
            pop('error','error',data.msg);
        })
    }
    /**
     * 查询时间
     * 将参数提交到具体页面
     */
    $scope.query = function (isSysCompare) {
        $scope.titleAreaLevel = $scope.areaLevel;
        $scope.titleCountryLevel = $scope.countryLevel;
        $scope.titleGameLevel = $scope.gameLevel;
        CheckPageState($scope.PageState);
        curParams = {
            date1: moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),// $scope.date.startDate,     // moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD')
            date2: moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),//$scope.date.endDate,
            in_os: $scope.os.selected.os,
            area_app_ids: get_area_app_ids(),
            model_state: $scope.ModelState,  //页面判断条件,不用做查询条件
            is_all_game: $scope.isAllGame, //判断是否是点击所有游戏,不用做查询条件
            is_all_country: $scope.isAllCountry,//判断是否是点击所有国家,不用做查询条件
            is_all_area: $scope.isAllArea //判断是否是点击所有地区,不用做查询条件
        };
        switch ($scope.PageState) {
            case 0:
                if ($scope.ModelState == 0) {   //综合报表
                    $scope.$broadcast("reportComParams", curParams);  //传递查询参数到子模块
                }
                else if ($scope.ModelState == 1) {  //地区/国家报表
                    $scope.$broadcast("reportCountryParams", curParams);  //传递查询参数到子模块
                }
                else if ($scope.ModelState == 2) {  //游戏报表
                    if(isSysCompare)
                        curParams.isSysCompare = true;
                    else curParams.isSysCompare = false;
                    $scope.$broadcast("reportGameParams", curParams);  //传递查询参数到子模块
                }
                break;
            case 1:
                if ($scope.ModelState == 0) {   //每日综合
                    $scope.$broadcast("reportDailyComParams", curParams);  //传递查询参数到子模块
                }
                else if ($scope.ModelState == 1) { //每日地区/国家
                    $scope.$broadcast("reportDailyCountryParams", curParams);  //传递查询参数到子模块
                }
                else if ($scope.ModelState == 2) {  //每日游戏
                    $scope.$broadcast("reportDailyGameParams", curParams);  //传递查询参数到子模块
                }
                break;
            case 2:
                curParams.media = $scope.selectMedia;   //选中的媒体项
                curParams.mediaList = $scope.mediaList; //媒体列表
                $scope.$broadcast("reportDailyMediaParams", curParams);  //传递查询参数到子模块      //每日媒体
                break;

        }
    }

}]);