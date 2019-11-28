/**
 * Created by weiqiang.yu on 2016/3/1.
 */

'use strict';
app.controller('oasNewUserController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    var startDate = moment().add($scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
    var endDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    $scope.initData = {
        //flag:true,
        //firstActive : true,
        //secondActive: false,
        //thirdActive: false,
        //secondDisabled: true,
        //thirdDisabled: true,
        //opened:false,
        curDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
        rangeDate: {startDate: startDate, endDate: endDate}
    }
    // $scope.rangeDate = { startDate: startDate, endDate: endDate };
    //
    //try {
    //    document.updateQuestionTip('新增用户指标说明','oas_newUser_question.html');
    //}
    //catch(e){
    //    setTimeout(function () {
    //        document.updateQuestionTip('新增用户指标说明','oas_newUser_question.html');
    //    },3000)
    //}
    var showState = false;
    $scope.showModel =function(){
        if(showState == false){
            $("#myModal").modal('show');
            setTimeout(1000, function () {
                showState = true;
            })
        }
    };
    function updateQuestionTip(title,content) {
        $.get(
            './questionTip/'+content,function(response){
                $scope.questionTitle = title;
                $('#questionContent').html(response);
            }
        );
    }
    updateQuestionTip('新增用户指标说明','oas_newUser_question.html');
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

    var curParams = null; // 当前选择的参数

    //$scope.datePickerType = 2;
    $scope.datePickerDayDiff = -2;
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    // 新增用户和设备  新增活跃比 选择
    $scope.radioModel = 'newUserDevice';
    // 监听 新增用户和设备  新增活跃比 切换事件
    $scope.$watch('radioModel', function (newValue, oldValue) {
        if (newValue && curParams) {
            refreshData();
        }
    })

    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };

    $scope

    /**
     * 显示五分钟注册数据
     */
    function getData() {
        $http({
            url: 'api/oas/newUser',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if(data.code ==0){
                if(data.result.length < 1){
                    $scope.noData = true;
                    return;
                }else{
                    $scope.noData = false;
                }

                data.result.shift();
                // 折线图
                drawChart(data, 'newUserChart1');
                // 表格
                $scope.tableData = data.result;
            }else{
                pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error','链接异常',data);
        });
    }
    /**
     * 导出excel文件
     */
    function exportData() {
        $http({
            url: 'api/oas/export/newUser',
            method: 'GET',
            params: curParams
        }).success(function (data, header, config, status) {
            if(data.code ==0){
                window.open(data.result);
            }else{
                pop('error','error',data.msg);
            }
        }).error(function (data, header, config, status) {
            pop('error','链接异常',data);
        });
    }
    /**
     * 公共方法 画折线图
     * @param data
     * @param chartID
     */
    function drawChart(data, chartID) {
        if ($scope.radioModel === 'newUserDevice') {
            var categories = [];
            var seriesData = [
                {
                    name: "注册用户",
                    data: []
                }
                ,
                {
                    name: "全新注册用户",
                    data: []
                }
                ,
                {
                    name: "新增设备(去重)",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp.count_date);
                seriesData[0].data.push(Number(temp['注册用户']));
                seriesData[1].data.push(Number(temp['全新注册用户']));
                seriesData[2].data.push(Number(temp['新增设备（去重）']));
            }
        }
        else if($scope.radioModel === 'newActiveRate'){
            var categories = [];
            var seriesData = [
                {
                    name: "新增活跃比",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp.count_date);
                seriesData[0].data.push(Number(temp.新增活跃比));
            }
        }

        drawHighChartLine(categories, seriesData, chartID);
    }

    /**
     * 监听查询事件
     */
    $scope.$on("oasQuery", function (event, params) {

        $scope.query();
    });
    //$params.query =  function (event, params) {
    $scope.query = function () {
        curParams =$params.getParams();
        getPageParam();
        refreshData();
    };
    $scope.export=function()
    {
        curParams = $params.getParams();
        getPageParam();
        exportData();
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
    var initRangeDate = true;
    $scope.$watch('initData.rangeDate', function (newValue, oldValue) {
        if (newValue && !initRangeDate) {
            //$scope.$emit("oasQuery", obj);
            $scope.query();
        } else {
            initRangeDate = false;
        }
    });
    //获取页面参数
    var getPageParam = function () {
            curParams. curDate= moment($scope.initData.curDate).format('YYYY-MM-DD'),         // 单个时间选择
            curParams.date1= moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),   // 时间范围选择 beginDate
            curParams. date2=moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),     // 时间范围选择 endDate
            curParams.date3=moment($scope.initData.rangeDate.endDate).add(-6, 'days').format('YYYY-MM-DD')
        return curParams;
    }

    /**
     * 刷新数据
     */
    var refreshData = function () {
        if (curParams) {
            getData();
        } else {
            pop('error', 'error', '参数有误，刷新查询失败！')
        }
    }


}]);