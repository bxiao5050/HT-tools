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
app.controller('oasNewUserRegIncomeRateController', ['$rootScope', '$scope', '$http', '$timeout', '$q', 'toaster', '$params', function ($rootScope, $scope, $http, $timeout, $q, toaster, $params) {
    $scope.datePickerDayDiff = !isNaN($scope.datePickerDayDiff) ? $scope.datePickerDayDiff : -1;

    var startDate = moment().add($scope.datePickerDayDiff - 30, 'days').format('YYYY-MM-DD');
    var endDate = moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD');
    $scope.initData = {
        curDate: moment().add($scope.datePickerDayDiff, 'days').format('YYYY-MM-DD'),
        rangeDate: {startDate: startDate, endDate: endDate}
    };

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

    //try {
    //    document.updateQuestionTip('新用户注收比指标说明','oas_newUserRegIncomeRate_question.html');
    //}
    //catch(e){
    //    setTimeout(function () {
    //        document.updateQuestionTip('新用户注收比指标说明','oas_newUserRegIncomeRate_question.html');
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
    updateQuestionTip('新用户注收比指标说明','oas_newUserRegIncomeRate_question.html');

    $scope.regUser=1;
    $scope.$watch('regUser', function (newValue,oldValue) {
            if(curParams&&newValue)
            {
                $scope.query();
            }
        }
    );
    
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
    function getData() {
        $http({
            url: '/api/oas/regPayRate',
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
                //var tableData=[];
                //var chartData=[];
                //for (var i = 0; i <  data.result.length; i++) {
                //    if (data.result[i].hasOwnProperty('reg_date')) {
                //        tableData.push(data.result[i]);
                //    }
                //    else if (data.result[i].hasOwnProperty('list')) {
                //        chartData.push(data.result[i]);
                //    }
                //}
                //tableData= tableData.sort(function (a, b) {
                //    return new Date(b.reg_date) - new Date(a.reg_date)
                //});
                //chartData=chartData.sort(function (a, b) {
                //    return new Date(a.list) - new Date(b.list)
                //});
                // 折线图
                drawChart(data.result, 'newUserRegIncomeRateChart');

                var tableData=data.result;
                tableData=tableData.sort(function (a,b) {
                    return new Date(b["日期"])-new Date(a["日期"]);
                });
                // 表格
                $scope.tableData =tableData;

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
            url: 'api/oas/export/regPayRate',
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
        var chartData=data;
        chartData=chartData.sort(function (a,b) {
           return new Date(a["日期"])-new Date(b["日期"]);
        });

            var categories = [];
            var seriesData = [
                {
                    name: "1日注收比",
                    data: []
                },
                {
                    name: "7日注收比",
                    data: []
                },
                {
                    name: "30日注收比",
                    data: []
                }
            ];
            for (var i = 0; i < chartData.length; i++) {
                var temp = chartData[i];
                categories.push(temp['日期']);
                seriesData[0].data.push(Number(temp['1日注收比']));
                seriesData[1].data.push(Number(temp['7日注收比']));
                seriesData[2].data.push(Number(temp['30日注收比']));
            }
        drawHighChartLine(categories, seriesData, chartID);
    }

    /**
     * 监听查询事件
     */
    $scope.$on("oasQuery", function (event, params) {

        $scope.query();
    });
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
            curParams.select_id=$scope.regUser;
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