/**
 * Created by guiwei.su on 2016/4/11.
 */
app.controller('ROIServiceStatus', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', '$filter', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params, $filter) {
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    var startDate = moment().add($scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
    var endDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    $scope.initData = {
        flag:true,
        opened: false,
        curDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
        rangeDate: {startDate: startDate, endDate: endDate}
    };
    // $scope.rangeDate = { startDate: startDate, endDate: endDate };

    $scope.today = function () {
        $scope.initData.curDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
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
    $scope.datePickerType=2;
// 切换单时间 和 时间范围控件显示
    $scope.$watch('datePickerType', function (newValue, oldValue) {
        if (newValue == 2) {
            $scope.singleDatePicker = true;
        } else {
            $scope.singleDatePicker = false;
        }
    });

    //初始化单时间选择控件
    //var initCurDate = true;
    //$scope.$watch('initData.curDate', function (newValue, oldValue) {
    //    if (newValue && !initCurDate) {
    //        //$scope.$emit("oasQuery", obj);
    //        //$scope.query();
    //    } else {
    //        initCurDate = false;
    //    }
    //});
    //$scope.$watch('initData.rangeDate', function (newValue, oldValue) {
    //    if (newValue && !initCurDate) {
    //
    //        //$scope.query();
    //    } else {
    //        initCurDate = false;
    //    }
    //})
    /*----------------------------------------------*/
    var curParams = null;
    $scope.gameSource = [];   //游戏数据源
    $scope.gameLevel = {};   //选中的游戏
    app.filter('rateItems',function(){
        return function (item) {
            var str=item+"%";
            return str;
        }
    });
    $scope.col='openServerDate';
    $scope.desc=1;
    getGameSource();

    function getGameSource() {
        $http({
            url: 'api/roi/getGames',
            method: 'GET'
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length < 1) {
                    return;
                } else {
                    $scope.gameSource = data.result;
                    $scope.gameLevel = {selected: $scope.gameSource[0]};

                    $scope.query();
                }

            } else {
                //pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            //pop('error', '链接异常', data);
        });


    }

    $scope.gameClick = function (gameItem) {
        $scope.gameLevel = {selected: gameItem};
        $scope.query();
    };

    function getTotalParams(){
        var totalParams={
            begin_date:moment($scope.initData.curDate).format('YYYY-MM-DD'),
            end_date:moment($scope.initData.curDate).format('YYYY-MM-DD'),
            app_ids:$scope.gameLevel.selected.game_id,
            agent_ids:'NULL',
            date_type:0
        };
        return totalParams;
    }

    function getTotalTableData(){
        $http({
            url: 'api/roi/getROITotalData',
            method: 'GET',
            params: getTotalParams()
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length <= 1) {
                    return;
                } else {
                    data.result.shift();
                    $scope.totalTableData=data.result;
                }
            } else {
                //pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            //pop('error', '链接异常', data);
        });
    }

    function getData() {
        $http({
            url: 'api/roi/getROIAgentData',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if (data.code == 0) {
                if (data.result.length <= 1) {
                    $scope.tableData=[];
                    $scope.tableNoData = true;
                    return;
                } else {
                    data.result.shift();
                    $scope.tableNoData = false;

                    drawChart('ROIChart1',data);

                    $scope.tableData=[];
                    for (var i = 0; i < data.result.length; i++) {
                        var temp = data.result[i];
                        $scope.tableData.push({
                            game_zone_name: temp['game_zone_name'],
                            openServerDate: temp['开服日期'],
                            openServerDays:Number(temp['开服天数']),
                            inCome: Number(temp['收入']),
                            TotalInCome: Number(temp['总收入']),
                            throwCost: Number(temp['投放成本']),
                            TotalROI: Number(temp['总ROI']),
                            predictRecoveryDays: Number(temp['预计回本天数']),
                            surplusRecoveryDays: Number(temp['剩余回本天数']),
                            gains: Number(temp['盈利'])
                        });
                    }
                }
            } else {
                //pop('error', 'error', data.msg);
            }
        }).error(function (data, header, config, status) {
            //pop('error', '链接异常', data);
        });
    }
    function drawChart(chartID,data){
        if ($scope.radioModel == '0') {
            var categories = [];
            var seriesData = [
                {
                    name: "日收入",
                    data: []
                }
                ,
                {
                    name: "日花费",
                    data:[]
                }
                ,
                {
                    name: "总收入",
                    data:[]
                }
                ,
                {
                    name: "总成本",
                    data:[]
                }
                ,
                {
                    name: "总盈利",
                    data:[]
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp.count_date);
                seriesData[0].data.push(Number(temp['日收入']));
                seriesData[1].data.push(Number(temp['日花费']));
                seriesData[2].data.push(Number(temp['总收入']));
                seriesData[3].data.push(Number(temp['总成本']));
                seriesData[4].data.push(Number(temp['总收益']));
            }
        }
        else if ($scope.radioModel == '1') {
            var categories = [];
            var seriesData = [
                {
                    name: "周收入",
                    data: []
                }
                ,
                {
                    name: "周花费",
                    data:[]
                }
                ,
                {
                    name: "总收入",
                    data:[]
                }
                ,
                {
                    name: "总成本",
                    data:[]
                }
                ,
                {
                    name: "总盈利",
                    data:[]
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp.count_date);
                seriesData[0].data.push(Number(temp['日收入']));
                seriesData[1].data.push(Number(temp['日花费']));
                seriesData[2].data.push(Number(temp['总收入']));
                seriesData[3].data.push(Number(temp['总成本']));
                seriesData[4].data.push(Number(temp['总收益']));
            }
        }
        else if ($scope.radioModel == '2') {
            var categories = [];
            var seriesData = [
                {
                    name: "月收入",
                    data: []
                }
                ,
                {
                    name: "月花费",
                    data:[]
                }
                ,
                {
                    name: "总收入",
                    data:[]
                }
                ,
                {
                    name: "总成本",
                    data:[]
                }
                ,
                {
                    name: "总盈利",
                    data:[]
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp.count_date);
                seriesData[0].data.push(Number(temp['日收入']));
                seriesData[1].data.push(Number(temp['日花费']));
                seriesData[2].data.push(Number(temp['总收入']));
                seriesData[3].data.push(Number(temp['总成本']));
                seriesData[4].data.push(Number(temp['总收益']));
            }
        }
        drawHighChartLine(categories, seriesData, chartID);
    }
    /**
     * 导出excel文件
     */
    function exportData() {
        $http({
            url: '/api/roi/export/ROIAgentData',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if(data.code ==0){
                window.open(data.result);
            }else{
                //pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            //pop('error','链接异常',data);
        });
    }
    $scope.query= function () {
        curParams={
            begin_date:moment($scope.initData.curDate).format('YYYY-MM-DD'),
            app_id:$scope.gameLevel.selected.game_id
        };
        refreshData();
    };
    $scope.export=function()
    {
        curParams={
            begin_date:moment($scope.initData.curDate).format('YYYY-MM-DD'),
            app_id:$scope.gameLevel.selected.game_id
        };
        exportData();
    };

    function refreshData(){
        if(curParams){
            getTotalTableData();
            getData();
        }

    }
}]);