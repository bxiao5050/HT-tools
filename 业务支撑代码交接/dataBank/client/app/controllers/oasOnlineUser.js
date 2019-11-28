/**
 * Created by weiqiang.yu on 2016/3/3.
 */
/**
 * Created by weiqiang.yu on 2016/3/3.
 */
/**
 * Created by weiqiang.yu on 2016/3/1.
 */

'use strict';
app.controller('oasOnlineUserController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;
    //$scope.datetype=$('#datetype').val();
    $scope.datetype=1;
    $scope.app =  {selected: {id:1,name:'日'}};
    $scope.apps=[{id:1,name:'日'},{id:2,name:'周'},{id:3,name:'月'}];


    function Datachange() {
        switch ($scope.datetype)
        {
            case 1:
                var startDate = moment().add($scope.datePickerDayDiff - 6, 'days').format('YYYY-MM-DD');
                var endDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
                $scope.initData = {
                    curDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
                    rangeDate: {startDate: startDate, endDate: endDate}
                };
                break;
            case 2:
                var startDate = moment().add($scope.datePickerDayDiff - 6, 'week').day(-6).format('YYYY-MM-DD');
                var endDate = moment().add($scope.datePickerDayDiff+1, 'day').day(0).format('YYYY-MM-DD');
                $scope.initData = {
                    curDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
                    rangeDate: {startDate: startDate, endDate: endDate}
                }
                break;
            case 3:
                var startDate = moment().add($scope.datePickerDayDiff - 6, 'month').set('date',1).format('YYYY-MM-DD');
                var endDate = moment().add($scope.datePickerDayDiff+1, 'month').set('date',1).format('YYYY-MM-DD');
                $scope.initData = {
                    curDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
                    rangeDate: {startDate: startDate, endDate: endDate}
                }
                break;
        }
    }
    Datachange();
    //try {
    //    document.updateQuestionTip('在线用户指标说明','oas_onlineUser_question.html');
    //}
    //catch(e){
    //    setTimeout(function () {
    //        document.updateQuestionTip('在线用户指标说明','oas_onlineUser_question.html');
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
    updateQuestionTip('在线用户指标说明','oas_onlineUser_question.html');

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

    // ACU PCU ACP/PCU AT  选择
    $scope.radioModel = 'ACU';
    // 监听 ACU PCU ACP/PCU AT 切换事件
    $scope.$watch('radioModel', function (newValue, oldValue) {
        if (newValue && curParams) {
           $scope.query();
        }
    })

    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };

    $scope.$watch('app.selected', function (newValue,oldValue) {
        $scope.app.selected=newValue;
        $scope.datetype=$scope.app.selected.id;
        $scope.datechange();
    });

    /**
     * 显示五分钟注册数据
     */
    function getData() {
        $http({
            url: '/api/oas/onlineUser',
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
                drawChart(data, 'onlineUserChart1');
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
     * 导出
     */
    function exportData() {
        $http({
            url: '/api/oas/export/onlineUser',
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
        if ($scope.radioModel === 'ACU') {
            var categories = [];
            var seriesData = [
                {
                    name: "ACU",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp['日期']);
                seriesData[0].data.push(Number(temp['在线均值（ACU）']));
            }
        }
        else if ($scope.radioModel === 'PCU') {
            var categories = [];
            var seriesData = [
                {
                    name: "PCU",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp['日期']);
                seriesData[0].data.push(Number(temp['在线峰值（PCU）']));
            }
        }
        else if ($scope.radioModel === 'ACU/PCU') {
            var categories = [];
            var seriesData = [
                {
                    name: "ACU/PCU",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp['日期']);
                seriesData[0].data.push(Number(temp['在线平高比（ACU/PCU）']));
            }
        }
        else if ($scope.radioModel === 'AT') {
            var categories = [];
            var seriesData = [
                {
                    name: "AT",
                    data: []
                }
            ];
            for (var i = 0; i < data.result.length; i++) {
                var temp = data.result[i];
                categories.push(temp['日期']);
                seriesData[0].data.push(Number(temp['户均在线时长（AT）']));
            }
        }
        drawHighChartArea(categories, seriesData, chartID);
    }

    /**
     * 监听查询事件
     */
    $scope.$on("oasQuery", function (event, params) {

        $scope.query();
    });
    $scope.datechange=function()
    {
        Datachange();
        //$scope.query();
    }
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

    // 初始化多时间选择控件
    var initRangeDate = true;
    $scope.$watch('initData.rangeDate', function (newValue, oldValue) {
        if (newValue && !initRangeDate) {
            //$scope.$emit("oasQuery", obj);
            $scope.query();
        } else {
            initRangeDate = false;
        }
    })
    //获取页面参数
    var getPageParam = function () {
        curParams. curDate= moment($scope.initData.curDate).format('YYYY-MM-DD');         // 单个时间选择
            curParams.date1= moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD');  // 时间范围选择 beginDate
            curParams. date2=moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD');     // 时间范围选择 endDate
            curParams.date3=moment($scope.initData.rangeDate.endDate).add(-6, 'days').format('YYYY-MM-DD');
            curParams.datetype=$scope.datetype;
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