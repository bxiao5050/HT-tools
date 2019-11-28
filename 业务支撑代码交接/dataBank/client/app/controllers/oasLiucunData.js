/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('oasLiucunDataController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster','$params', function ($rootScope, $scope, $http, $timeout, $q, toaster,$params) {
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
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };



    /**
     * 显示五分钟注册数据
     */
    function getData(){
        $http({
            url: 'api/oas/liucun',
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

               // 折线图
               drawChart(data, 'liucunChart1');
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
     * 公共方法 画折线图
     * @param data
     * @param chartID
     */
    function drawChart(data,chartID){
        var categories = ['+1日留存','+2日留存','+3日留存','+4日留存','+5日留存','+6日留存','+7日留存','+14日留存','+30日留存'];
        var seriesData = [
            {
                name: curParams.date1,
                data:[]
            },
            {
                name: curParams.date2,
                data:[]
            }
        ];
        for(var i = 0; i < data.result.length; i++){
            var temp = data.result[i];
            if(temp.reg_date == curParams.date1 ){
                categories.push(temp.reg_date);
                seriesData[0].data.push(Number(temp.date1_value.split('%')[0]));
                seriesData[0].data.push(Number(temp.date2_value.split('%')[0]));
                seriesData[0].data.push(Number(temp.date3_value.split('%')[0]));
                seriesData[0].data.push(Number(temp.date4_value.split('%')[0]));
                seriesData[0].data.push(Number(temp.date5_value.split('%')[0]));
                seriesData[0].data.push(Number(temp.date6_value.split('%')[0]));
                seriesData[0].data.push(Number(temp.date7_value.split('%')[0]));
                seriesData[0].data.push(Number(temp.date14_value.split('%')[0]));
                seriesData[0].data.push(Number(temp.date30_value.split('%')[0]));
            }else if(temp.reg_date == curParams.date2){
                categories.push(temp.reg_date);
                seriesData[1].data.push(Number(temp.date1_value.split('%')[0]));
                seriesData[1].data.push(Number(temp.date2_value.split('%')[0]));
                seriesData[1].data.push(Number(temp.date3_value.split('%')[0]));
                seriesData[1].data.push(Number(temp.date4_value.split('%')[0]));
                seriesData[1].data.push(Number(temp.date5_value.split('%')[0]));
                seriesData[1].data.push(Number(temp.date6_value.split('%')[0]));
                seriesData[1].data.push(Number(temp.date7_value.split('%')[0]));
                seriesData[1].data.push(Number(temp.date14_value.split('%')[0]));
                seriesData[1].data.push(Number(temp.date30_value.split('%')[0]));
            }
        }
        drawHighChartLine(categories, seriesData, chartID);
    }
    /**
     * 监听查询事件
     */
    //$scope.$on("oasQuery", function (event, params) {
    //    curParams = params;
    //    refreshData();
    //})
    $scope.$on("oasQuery", function (event, params) {

        $scope.query();
    });
    //$params.query =  function (event, params) {
    $scope.query = function () {
        curParams = $params.getParams();
        getPageParam();
        refreshData();
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
    var initCurDate = true;
    $scope.$watch('initData.curDate', function (newValue, oldValue) {
        if (newValue && !initCurDate) {
            //$scope.$emit("oasQuery", obj);
            $scope.query();
        } else {
            initCurDate = false;
        }
    })
    //获取页面参数
    var getPageParam = function () {
        curParams. curDate= moment($scope.initData.curDate).format('YYYY-MM-DD'),         // 单个时间选择
            curParams.date1= moment($scope.initData.rangeDate.startDate).format('YYYY-MM-DD'),   // 时间范围选择 beginDate
            curParams.date2=moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),     // 时间范围选择 endDate
            curParams.date3=moment($scope.initData.rangeDate.endDate).add(-6, 'days').format('YYYY-MM-DD')
        return curParams;
    }

    /**
     * 刷新数据
     */
    var refreshData = function(){
        if(curParams){
            if($scope.radioModel ==='day'){
                getData('api/oas/trend-day');
            }else if($scope.radioModel ==='week'){
                getData('api/oas/trend-week');
            }else{
                getData('api/oas/trend-month');
            }
        }else{
            pop('error','error','参数有误，刷新查询失败！')
        }
    }


}]);