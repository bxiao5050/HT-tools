/**
 * Created by xiaoyi on 2015/8/4.
 */
'use strict';
app.controller('oasKanpanDataController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster','$params', function ($rootScope, $scope, $http, $timeout, $q, toaster,$params) {
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
    $scope.radioModel = 'day';
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Body'
    };
    var pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };






    $scope.$watch('radioModel',function(newValue, oldValue){
        if(newValue && curParams){
            refreshData();
        }
    })

    /**
     * 显示五分钟注册数据
     */
    function getData(url){
        $http({
            url: url,
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
               drawChart(data, 'kanpanChart1');
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
        var categories = [];
        var seriesData = [
            {
                name:'注册人数',
                data:[]
            },
            {
                name:'登录人数',
                data:[]
            },
            {
                name:'活跃人数',
                data:[]
            },
            {
                name:'在线峰值',
                data:[]
            },
            {
                name:'付费人数',
                data:[]
            },
            {
                name:'付费金额',
                data:[]
            }
        ];
        for(var i = data.result.length - 1; i >=0; i --){
            var temp = data.result[i];
            categories.push(temp.count_date);
            seriesData[0].data.push(Number(temp.reg_count));
            seriesData[1].data.push(Number(temp.login_count));
            seriesData[2].data.push(Number(temp.active_count));
            seriesData[3].data.push(Number(temp.max_online));
            seriesData[4].data.push(Number(temp.pay_count));
            seriesData[5].data.push(Number(temp.pay_money));
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
            curParams. date2=moment($scope.initData.rangeDate.endDate).format('YYYY-MM-DD'),     // 时间范围选择 endDate
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